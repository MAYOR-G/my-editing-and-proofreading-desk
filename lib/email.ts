import { Resend } from "resend";
import { ADMIN_EMAIL, BRAND_NAME, INTERNAL_NOTIFICATION_EMAIL, PAYMENTS_EMAIL, SUPPORT_EMAIL } from "@/lib/contact-info";

export { ADMIN_EMAIL, BRAND_NAME, INTERNAL_NOTIFICATION_EMAIL, PAYMENTS_EMAIL, SUPPORT_EMAIL };

const getResendClient = () => new Resend(process.env.RESEND_API_KEY || "re_dummy");

function getInternalRecipient() {
  return process.env.INTERNAL_NOTIFICATION_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NOTIFICATION_GMAIL || INTERNAL_NOTIFICATION_EMAIL;
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

export async function sendEmail({
  to,
  from,
  replyTo,
  subject,
  html,
}: {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      replyTo,
      subject,
      html,
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
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: message.email,
    to: getInternalRecipient(),
    subject: `New ${message.source}: ${message.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
        <h2>New message received</h2>
        <p><strong>Source:</strong> ${escapeHtml(message.source)}</p>
        <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
        ${message.userId ? `<p><strong>User ID:</strong> ${escapeHtml(message.userId)}</p>` : ""}
        ${message.projectId ? `<p><strong>Related project:</strong> ${escapeHtml(message.projectId)}</p>` : ""}
        <p><strong>Subject:</strong> ${escapeHtml(message.subject)}</p>
        <div style="margin-top: 18px; padding: 16px; background: #f7f4ec; border: 1px solid #e8dfcf;">
          ${paragraphize(message.content)}
        </div>
        <p style="margin-top: 18px;">Log in to the admin dashboard to review and reply.</p>
      </div>
    `,
  });
}

export async function sendMessageReplyEmail(to: string, recipientName: string | null, subject: string, reply: string) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
        <p>Hello ${escapeHtml(recipientName || "there")},</p>
        <p>${BRAND_NAME} has replied to your message.</p>
        <div style="margin: 18px 0; padding: 16px; background: #f7f4ec; border: 1px solid #e8dfcf;">
          ${paragraphize(reply)}
        </div>
        <p>If you have questions, reply to this email or contact ${SUPPORT_EMAIL}.</p>
        <p>Thank you,<br/>${BRAND_NAME}</p>
      </div>
    `,
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
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
        <p>Hello ${escapeHtml(project.clientName || "there")},</p>
        <p>We have received your payment for your editing order.</p>
        <ul>
          <li><strong>Order ID:</strong> ${escapeHtml(project.friendlyId)}</li>
          <li><strong>Service:</strong> ${escapeHtml(project.service)}</li>
          <li><strong>Target journal:</strong> ${escapeHtml(project.targetJournal || "Not provided")}</li>
          <li><strong>Word count:</strong> ${Number(project.wordCount || 0).toLocaleString()}</li>
          <li><strong>Turnaround:</strong> ${escapeHtml(project.turnaround)}</li>
          <li><strong>Amount paid:</strong> ${formatMoney(project.amount, project.currency || "USD")}</li>
          <li><strong>Payment date:</strong> ${escapeHtml(project.paymentDate || new Date().toLocaleString())}</li>
          ${project.paymentMethod ? `<li><strong>Payment method:</strong> ${escapeHtml(project.paymentMethod)}</li>` : ""}
        </ul>
        <p>Your document is now recorded in our system. If we need any additional information, our support team will contact you.</p>
        <p>Thank you,<br/>${BRAND_NAME}</p>
      </div>
    `,
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
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
        <p>Hello ${escapeHtml(project.clientName || "there")},</p>
        <p>Thank you for submitting your document. Our team has received your file and will review it according to your selected service and turnaround.</p>
        <ul>
          <li><strong>Project ID:</strong> ${escapeHtml(project.friendlyId)}</li>
          ${project.documentName ? `<li><strong>Document:</strong> ${escapeHtml(project.documentName)}</li>` : ""}
          <li><strong>Service:</strong> ${escapeHtml(project.service)}</li>
          <li><strong>Target journal:</strong> ${escapeHtml(project.targetJournal || "Not provided")}</li>
          <li><strong>Turnaround:</strong> ${escapeHtml(project.turnaround)}</li>
        </ul>
        <p>If you have questions, reply to this email or contact ${SUPPORT_EMAIL}.</p>
        <p>Thank you,<br/>${BRAND_NAME}</p>
      </div>
    `,
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
}) {
  return sendEmail({
    from: `${BRAND_NAME} <${ADMIN_EMAIL}>`,
    replyTo: ADMIN_EMAIL,
    to: getInternalRecipient(),
    subject: "New paid project received",
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
        <h2>New paid project received</h2>
        <p>A new paid project has been submitted.</p>
        <ul>
          <li><strong>Client:</strong> ${escapeHtml(project.clientName || "Client")}</li>
          <li><strong>Email:</strong> ${escapeHtml(project.clientEmail || "Not available")}</li>
          <li><strong>Project ID:</strong> ${escapeHtml(project.friendlyId)}</li>
          <li><strong>Service:</strong> ${escapeHtml(project.service)}</li>
          <li><strong>Target journal:</strong> ${escapeHtml(project.targetJournal || "Not provided")}</li>
          <li><strong>Word count:</strong> ${Number(project.wordCount || 0).toLocaleString()}</li>
          <li><strong>Turnaround:</strong> ${escapeHtml(project.turnaround)}</li>
          <li><strong>Amount paid:</strong> ${formatMoney(project.amount, project.currency || "USD")}</li>
          <li><strong>Payment status:</strong> ${escapeHtml(project.paymentStatus || "paid")}</li>
          ${project.documentPath ? `<li><strong>Document path:</strong> ${escapeHtml(project.documentPath)}</li>` : ""}
          ${project.projectUrl ? `<li><strong>Project dashboard:</strong> <a href="${escapeHtml(project.projectUrl)}">${escapeHtml(project.projectUrl)}</a></li>` : ""}
        </ul>
        <p>Log in to the admin dashboard to review the project and download the document.</p>
      </div>
    `,
  });
}

export async function sendProjectReadyEmail(to: string, friendlyId: string) {
  return sendEmail({
    from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: `Project ready for download - ${friendlyId}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
        <h2>Your document is ready</h2>
        <p>The editorial review for project <strong>${escapeHtml(friendlyId)}</strong> is complete.</p>
        <p>Please log in to your dashboard to download your files and review the editor's notes.</p>
        <p>Thank you,<br/>${BRAND_NAME}</p>
      </div>
    `,
  });
}
