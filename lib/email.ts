import { Resend } from "resend";
import { ADMIN_EMAIL, BRAND_NAME, INTERNAL_NOTIFICATION_EMAIL, PAYMENTS_EMAIL, SUPPORT_EMAIL } from "@/lib/contact-info";

type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export { ADMIN_EMAIL, BRAND_NAME, INTERNAL_NOTIFICATION_EMAIL, PAYMENTS_EMAIL, SUPPORT_EMAIL };

const getResendClient = () => new Resend(process.env.RESEND_API_KEY || "re_dummy");

export const getEmailClient = getResendClient;

function getInternalRecipient() {
  return process.env.INTERNAL_NOTIFICATION_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NOTIFICATION_GMAIL || INTERNAL_NOTIFICATION_EMAIL;
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://business.editandproofread.com").replace(/\/$/, "");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function paragraphize(value: unknown) {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}

function formatMoney(amount: unknown, currency = "USD") {
  const numeric = Number(amount || 0);
  return `${currency === "USD" ? "$" : `${currency} `}${numeric.toFixed(2)}`;
}

function brandedEmail({
  preheader,
  title,
  children,
  footerNote,
}: {
  preheader: string;
  title: string;
  children: string;
  footerNote?: string;
}) {
  const logoUrl = `${getSiteUrl()}/assets/logo.png`;
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body style="margin:0; padding:0; background:#f4f2ec; font-family: Georgia, 'Times New Roman', serif; color:#171717;">
        <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">${escapeHtml(preheader)}</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f2ec; margin:0; padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; background:#fffdf8; border:1px solid #e4dccd;">
                <tr>
                  <td style="padding:24px 28px; border-bottom:1px solid #e4dccd;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img src="${logoUrl}" width="118" alt="${escapeHtml(BRAND_NAME)}" style="display:block; max-width:118px; height:auto; border:0;" />
                        </td>
                        <td align="right" style="vertical-align:middle; font-family: Arial, sans-serif; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:#1f5f8f;">
                          Editorial Desk
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 28px 12px;">
                    <h1 style="margin:0; font-size:30px; line-height:1.15; font-weight:400; color:#11110f;">${escapeHtml(title)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 28px 32px; font-family: Arial, sans-serif; font-size:15px; line-height:1.75; color:#2d2b27;">
                    ${children}
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 28px; border-top:1px solid #e4dccd; font-family: Arial, sans-serif; font-size:13px; line-height:1.65; color:#6d665b;">
                    <p style="margin:0 0 8px;">${footerNote || `If you have questions, reply to this email or contact <a href="mailto:${SUPPORT_EMAIL}" style="color:#1f5f8f; text-decoration:underline;">${SUPPORT_EMAIL}</a>.`}</p>
                    <p style="margin:0;">Thank you,<br/><strong style="color:#171717;">${escapeHtml(BRAND_NAME)}</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function detailList(items: Array<[string, unknown]>) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:18px 0; border-collapse:collapse; border:1px solid #e4dccd;">
      ${items.map(([label, value]) => `
        <tr>
          <td style="padding:11px 14px; border-bottom:1px solid #e4dccd; font-size:12px; letter-spacing:1px; text-transform:uppercase; color:#6d665b; width:38%;">${escapeHtml(label)}</td>
          <td style="padding:11px 14px; border-bottom:1px solid #e4dccd; color:#171717;">${escapeHtml(value || "N/A")}</td>
        </tr>
      `).join("")}
    </table>
  `;
}

function messageCard(content: unknown) {
  return `
    <div style="margin:18px 0; padding:18px; background:#f8f5ee; border:1px solid #e4dccd; color:#171717;">
      ${paragraphize(content)}
    </div>
  `;
}

export async function sendEmail({
  to,
  from,
  replyTo,
  subject,
  html,
  headers,
  attachments,
}: {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  headers?: Record<string, string>;
  attachments?: EmailAttachment[];
}) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      replyTo,
      subject,
      html,
      headers,
      attachments,
    });

    if (error) {
      console.error("Email delivery failed:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email delivery error:", error);
    return { success: false, error };
  }
}

export async function sendContactNotificationEmail(message: {
  name: string;
  email: string;
  subject: string;
  content: string;
  source: string;
  userId?: string | null;
  projectId?: string | null;
  threadUrl?: string | null;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: message.email,
    to: getInternalRecipient(),
    subject: `New ${message.source}: ${message.subject}`,
    html: brandedEmail({
      preheader: `New ${message.source} from ${message.email}`,
      title: "New message received",
      children: `
        ${detailList([
          ["Source", message.source],
          ["Name", message.name],
          ["Email", message.email],
          ["Subject", message.subject],
          ...(message.userId ? [["User ID", message.userId] as [string, unknown]] : []),
          ...(message.projectId ? [["Related project", message.projectId] as [string, unknown]] : []),
        ])}
        ${messageCard(message.content)}
        ${message.threadUrl ? `<p><a href="${escapeHtml(message.threadUrl)}" style="color:#1f5f8f; font-weight:700;">Open this thread in Admin Messages</a></p>` : `<p>Log in to the admin dashboard to review and reply.</p>`}
      `,
      footerNote: `This notification was sent to the internal admin address. Do not forward private client content outside ${escapeHtml(BRAND_NAME)}.`,
    }),
  });
}

export async function sendMessageReplyEmail(to: string, recipientName: string | null, subject: string, reply: string, options?: {
  threadId?: string;
  inReplyTo?: string | null;
  references?: string | null;
  attachment?: EmailAttachment | null;
}) {
  const threadReplyTo = options?.threadId
    ? `support+thread-${options.threadId}@business.editandproofread.com`
    : SUPPORT_EMAIL;

  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: threadReplyTo,
    to,
    subject,
    headers: {
      ...(options?.threadId ? { "X-MEP-Thread-ID": options.threadId } : {}),
      ...(options?.inReplyTo ? { "In-Reply-To": options.inReplyTo } : {}),
      ...(options?.references ? { References: options.references } : {}),
    },
    attachments: options?.attachment ? [options.attachment] : undefined,
    html: brandedEmail({
      preheader: `${BRAND_NAME} has replied to your message.`,
      title: "Support reply",
      children: `
        <p>Hello ${escapeHtml(recipientName || "there")},</p>
        <p>${escapeHtml(BRAND_NAME)} has replied to your message.</p>
        ${messageCard(reply)}
        <p>If you have questions, simply reply to this email.</p>
      `,
    }),
  });
}

export async function sendPaymentSuccessEmail(to: string, project: {
  clientName?: string | null;
  friendlyId: string;
  service: string;
  targetJournal?: string | null;
  wordCount: number;
  turnaround: string;
  amount: number;
  currency?: string | null;
  paymentDate?: string | null;
  paymentMethod?: string | null;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${PAYMENTS_EMAIL}>`,
    replyTo: PAYMENTS_EMAIL,
    to,
    subject: "Payment received for your editing order",
    html: brandedEmail({
      preheader: `Payment received for ${project.friendlyId}.`,
      title: "Payment received",
      children: `
        <p>Hello ${escapeHtml(project.clientName || "there")},</p>
        <p>We have received your payment for your editing order.</p>
        ${detailList([
          ["Order ID", project.friendlyId],
          ["Service", project.service],
          ["Target journal", project.targetJournal || "Not provided"],
          ["Word count", Number(project.wordCount || 0).toLocaleString()],
          ["Turnaround", project.turnaround],
          ["Amount paid", formatMoney(project.amount, project.currency || "USD")],
          ["Payment date", project.paymentDate || new Date().toLocaleString()],
          ...(project.paymentMethod ? [["Payment method", project.paymentMethod] as [string, unknown]] : []),
        ])}
        <p>Your document is now recorded in our system. If we need any additional information, our support team will contact you.</p>
      `,
      footerNote: `For payment questions, reply to this email or contact <a href="mailto:${PAYMENTS_EMAIL}" style="color:#1f5f8f; text-decoration:underline;">${PAYMENTS_EMAIL}</a>.`,
    }),
  });
}

export async function sendDocumentReceivedEmail(to: string, project: {
  clientName?: string | null;
  friendlyId: string;
  documentName?: string | null;
  service: string;
  targetJournal?: string | null;
  turnaround: string;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: "We have received your document",
    html: brandedEmail({
      preheader: `We have received your document for ${project.friendlyId}.`,
      title: "Document received",
      children: `
        <p>Hello ${escapeHtml(project.clientName || "there")},</p>
        <p>Thank you for submitting your document. Our team has received your file and will review it according to your selected service and turnaround.</p>
        ${detailList([
          ["Project ID", project.friendlyId],
          ...(project.documentName ? [["Document", project.documentName] as [string, unknown]] : []),
          ["Service", project.service],
          ["Target journal", project.targetJournal || "Not provided"],
          ["Turnaround", project.turnaround],
        ])}
      `,
    }),
  });
}

export async function sendProjectSubmittedEmail(to: string, project: {
  clientName?: string | null;
  friendlyId: string;
  service: string;
  wordCount: number;
  turnaround: string;
  paymentStatus?: string | null;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: "Your project has been submitted",
    html: brandedEmail({
      preheader: `Project ${project.friendlyId} has been submitted.`,
      title: "Project submitted successfully",
      children: `
        <p>Hello ${escapeHtml(project.clientName || "there")},</p>
        <p>We've received your document and project details.</p>
        ${detailList([
          ["Project ID", project.friendlyId],
          ["Service", project.service],
          ["Word count", Number(project.wordCount || 0).toLocaleString()],
          ["Turnaround", project.turnaround],
          ["Payment status", project.paymentStatus || "Unpaid"],
        ])}
        <p>Once payment is confirmed, our team will begin working on your document. You can complete payment anytime from your dashboard.</p>
      `,
    }),
  });
}

export async function sendEditorNotificationEmail(project: {
  friendlyId: string;
  clientName?: string | null;
  clientEmail?: string | null;
  amount: number;
  currency?: string | null;
  wordCount: number;
  service: string;
  targetJournal?: string | null;
  turnaround: string;
  paymentStatus?: string | null;
  documentPath?: string | null;
  projectUrl?: string | null;
  paid?: boolean;
}) {
  const isPaid = project.paid ?? project.paymentStatus === "paid";
  return sendEmail({
    from: `${BRAND_NAME} <${ADMIN_EMAIL}>`,
    replyTo: ADMIN_EMAIL,
    to: getInternalRecipient(),
    subject: isPaid ? "New paid project received" : "New unpaid project submitted",
    html: brandedEmail({
      preheader: `${isPaid ? "New paid project" : "New unpaid project"} ${project.friendlyId}.`,
      title: isPaid ? "New paid project received" : "New unpaid project submitted",
      children: `
        <p>${isPaid ? "A new paid project has been submitted." : "A new project has been submitted and is waiting for payment."}</p>
        ${detailList([
          ["Client", project.clientName || "Client"],
          ["Email", project.clientEmail || "Not available"],
          ["Project ID", project.friendlyId],
          ["Service", project.service],
          ["Target journal", project.targetJournal || "Not provided"],
          ["Word count", Number(project.wordCount || 0).toLocaleString()],
          ["Turnaround", project.turnaround],
          [isPaid ? "Amount paid" : "Amount due", formatMoney(project.amount, project.currency || "USD")],
          ["Payment status", project.paymentStatus || (isPaid ? "paid" : "unpaid")],
          ...(project.documentPath ? [["Document path", project.documentPath] as [string, unknown]] : []),
        ])}
        ${project.projectUrl ? `<p><a href="${escapeHtml(project.projectUrl)}" style="color:#1f5f8f; font-weight:700;">Open project dashboard</a></p>` : ""}
      `,
      footerNote: `This internal notification was sent to the admin address ${escapeHtml(getInternalRecipient())}.`,
    }),
  });
}

export async function sendProjectReadyEmail(to: string, friendlyId: string) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: `Project ready for download - ${friendlyId}`,
    html: brandedEmail({
      preheader: `Your document for ${friendlyId} is ready.`,
      title: "Your document is ready",
      children: `
        <p>The editorial review for project <strong>${escapeHtml(friendlyId)}</strong> is complete.</p>
        <p>Please log in to your dashboard to download your files and review the editor's notes.</p>
      `,
    }),
  });
}

export async function sendProjectDeliveryEmail(to: string, project: {
  clientName?: string | null;
  friendlyId: string;
  note?: string | null;
  attachment: EmailAttachment;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: `Completed file for ${project.friendlyId}`,
    attachments: [project.attachment],
    html: brandedEmail({
      preheader: `Your completed file for ${project.friendlyId} is attached.`,
      title: "Completed file attached",
      children: `
        <p>Hello ${escapeHtml(project.clientName || "there")},</p>
        <p>Your completed file for project <strong>${escapeHtml(project.friendlyId)}</strong> is attached to this email.</p>
        ${project.note ? messageCard(project.note) : ""}
        <p>If you have questions or need a revision clarification, simply reply to this email.</p>
      `,
    }),
  });
}
