import { Resend } from "resend";

// We instantiate inside functions or use a fallback so builds don't fail if the key is empty
const getResendClient = () => new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function sendPaymentSuccessEmail(to: string, friendlyId: string, amount: number) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: "My Editing Desk <business@editandproofread.com>", // Update with verified domain
      to: [to],
      subject: `Payment Received - Project ${friendlyId}`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Payment Successful</h2>
          <p>Thank you for your payment of $${amount.toFixed(2)} for project <strong>${friendlyId}</strong>.</p>
          <p>Your document is now entering the editorial queue. You can track its status directly from your dashboard.</p>
          <br/>
          <p>Best regards,</p>
          <p>My Editing and Proofreading Desk</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Email error:", err);
    return { success: false, error: err };
  }
}

export async function sendProjectReadyEmail(to: string, friendlyId: string) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: "My Editing Desk <business@editandproofread.com>", // Update with verified domain
      to: [to],
      subject: `Project Ready for Download - ${friendlyId}`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Your Document is Ready</h2>
          <p>The editorial review for project <strong>${friendlyId}</strong> is complete.</p>
          <p>Please log in to your dashboard to download your files and review the editor's notes.</p>
          <br/>
          <p>Best regards,</p>
          <p>My Editing and Proofreading Desk</p>
        </div>
      `,
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function sendEditorNotificationEmail(friendlyId: string, wordCount: number, service: string, deadline: string) {
  try {
    const editorEmail = process.env.ADMIN_EMAIL || "admin@editandproofread.com";
    const resend = getResendClient();
    
    const { data, error } = await resend.emails.send({
      from: "My Editing Desk <system@editandproofread.com>",
      to: [editorEmail],
      subject: `New Project Alert - ${friendlyId}`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>New Project Submitted</h2>
          <p>A new project (<strong>${friendlyId}</strong>) has been uploaded and paid for.</p>
          <ul>
            <li><strong>Service:</strong> ${service}</li>
            <li><strong>Word Count:</strong> ${wordCount.toLocaleString()} words</li>
            <li><strong>Turnaround:</strong> ${deadline}</li>
          </ul>
          <p>Log in to the Admin Desk to review the details and download the document.</p>
        </div>
      `,
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
