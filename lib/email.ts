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
      <body style="margin:0; padding:0; background:#f5f7fb; font-family: Arial, Helvetica, sans-serif; color:#111827;">
        <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">${escapeHtml(preheader)}</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb; margin:0; padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; background:#ffffff; border:1px solid #dce4ee; border-radius:18px; overflow:hidden;">
                <tr>
                  <td style="padding:22px 28px; border-bottom:4px solid #174a7c; background:#ffffff;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img src="${logoUrl}" width="112" alt="${escapeHtml(BRAND_NAME)}" style="display:block; max-width:112px; height:auto; border:0;" />
                        </td>
                        <td align="right" style="vertical-align:middle;">
                          <p style="margin:0; font-size:16px; line-height:1.25; font-weight:700; color:#111827;">${escapeHtml(BRAND_NAME)}</p>
                          <p style="margin:4px 0 0; font-size:10px; letter-spacing:2.4px; text-transform:uppercase; color:#174a7c;">Editorial Desk</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:34px 28px 10px;">
                    <h1 style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:30px; line-height:1.18; font-weight:400; color:#11110f;">${escapeHtml(title)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 28px 34px; font-size:15px; line-height:1.75; color:#334155;">
                    ${children}
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 28px; border-top:1px solid #dce4ee; background:#f8fafc; font-size:13px; line-height:1.65; color:#64748b;">
                    <p style="margin:0 0 8px;">${footerNote || `If you have questions, reply to this email or contact <a href="mailto:${SUPPORT_EMAIL}" style="color:#174a7c; text-decoration:underline;">${SUPPORT_EMAIL}</a>.`}</p>
                    <p style="margin:0;"><strong style="color:#111827;">${escapeHtml(BRAND_NAME)}</strong><br/>Editing, proofreading, and academic polish.</p>
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
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0; border-collapse:separate; border-spacing:0; border:1px solid #dce4ee; border-radius:14px; overflow:hidden;">
      ${items.map(([label, value]) => `
        <tr>
          <td style="padding:12px 14px; border-bottom:1px solid #dce4ee; background:#f8fafc; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#64748b; width:38%;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px; border-bottom:1px solid #dce4ee; color:#111827; font-weight:600;">${escapeHtml(value || "N/A")}</td>
        </tr>
      `).join("")}
    </table>
  `;
}

function messageCard(content: unknown) {
  return `
    <div style="margin:20px 0; padding:18px 20px; background:#f8fafc; border:1px solid #dce4ee; border-left:4px solid #174a7c; border-radius:14px; color:#111827;">
      ${paragraphize(content)}
    </div>
  `;
}

function ctaButton(label: string, href: string) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:22px 0 4px;">
      <tr>
        <td style="border-radius:999px; background:#174a7c;">
          <a href="${escapeHtml(href)}" style="display:inline-block; padding:13px 22px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; border-radius:999px;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>
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
          ...(message.projectId ? [["Related project", message.projectId] as [string, unknown]] : []),
        ])}
        ${messageCard(message.content)}
        ${message.threadUrl ? `<p><a href="${escapeHtml(message.threadUrl)}" style="color:#1f5f8f; font-weight:700;">Open this thread in Admin Messages</a></p>` : `<p>Log in to the admin dashboard to review and reply.</p>`}
      `,
      footerNote: `This notification was sent to the internal admin address. Do not forward private client content outside ${escapeHtml(BRAND_NAME)}.`,
    }),
  });
}

export async function sendContactConfirmationEmail(message: {
  name: string;
  email: string;
  subject: string;
  source: string;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to: message.email,
    subject: "We received your message",
    html: brandedEmail({
      preheader: "Your message has reached My Editing and Proofreading Desk.",
      title: "Message received",
      children: `
        <p>Hello ${escapeHtml(message.name || "there")},</p>
        <p>Thank you for contacting us. Your message has been received, and our support team will review it carefully.</p>
        ${detailList([
          ["Subject", message.subject],
          ["Source", message.source],
          ["Response window", "Within one business day"],
        ])}
        <p>You can reply directly to this email if you need to add anything before we respond.</p>
      `,
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
        <p>Our support team has replied to your message.</p>
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
        ${ctaButton("Open your dashboard", `${getSiteUrl()}/dashboard/active`)}
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
        ${ctaButton("View your project", `${getSiteUrl()}/dashboard/active`)}
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
        ${ctaButton("Continue to dashboard", `${getSiteUrl()}/dashboard/active`)}
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
        ${project.projectUrl ? ctaButton("Open project dashboard", project.projectUrl) : ""}
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
        ${ctaButton("Download from dashboard", `${getSiteUrl()}/dashboard/downloads`)}
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
        ${ctaButton("Open dashboard", `${getSiteUrl()}/dashboard/downloads`)}
      `,
    }),
  });
}

export async function sendProjectMessageEmail(to: string, message: {
  recipientName?: string | null;
  friendlyId?: string | null;
  content: string;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: `New message${message.friendlyId ? ` for ${message.friendlyId}` : ""}`,
    html: brandedEmail({
      preheader: "You have a new message from the editorial team.",
      title: "New project message",
      children: `
        <p>Hello ${escapeHtml(message.recipientName || "there")},</p>
        <p>You have a new message from the editorial team${message.friendlyId ? ` about project <strong>${escapeHtml(message.friendlyId)}</strong>` : ""}.</p>
        ${messageCard(message.content)}
        ${ctaButton("Reply in dashboard", `${getSiteUrl()}/dashboard/active`)}
      `,
    }),
  });
}

export async function sendInternalProjectMessageEmail(message: {
  clientName?: string | null;
  clientEmail?: string | null;
  content: string;
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: message.clientEmail || SUPPORT_EMAIL,
    to: getInternalRecipient(),
    subject: `New client message from ${message.clientName || message.clientEmail || "client"}`,
    html: brandedEmail({
      preheader: "A client sent a new project message.",
      title: "New client message",
      children: `
        ${detailList([
          ["Client", message.clientName || "Client"],
          ["Email", message.clientEmail || "Not available"],
        ])}
        ${messageCard(message.content)}
        ${ctaButton("Open Admin Desk", `${getSiteUrl()}/admin`)}
      `,
      footerNote: `This internal notification was sent to ${escapeHtml(getInternalRecipient())}.`,
    }),
  });
}
