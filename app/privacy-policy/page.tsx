import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/site";
import { SUPPORT_EMAIL } from "@/lib/contact-info";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Edit and Proofread",
  description: "Read how My Editing and Proofreading Desk collects, uses, protects, retains, and handles personal information and uploaded documents.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy">
      <LegalSection title="1. Introduction">
        <p>My Editing and Proofreading Desk (editandproofread.com) provides online editorial services and a limited AI-assisted editing tool. This policy explains the information involved, why it is used, which service providers may process it, and the choices available to you.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following types of information:</p>
        <LegalList>
          <li>Personal Information: Name, email address, billing details, and contact information.</li>
          <li>Document Content: Files you upload for editing or proofreading.</li>
          <li>Technical Data: IP address, browser type, device information, and cookies.</li>
          <li>Communication Records: Emails or messages exchanged with our support team.</li>
          <li>AI Tool Content: Text you paste into the free AI tool and its generated response.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>Your information is used to:</p>
        <LegalList>
          <li>Provide editing and proofreading services.</li>
          <li>Process payments and issue invoices.</li>
          <li>Communicate with you regarding your orders.</li>
          <li>Improve our website and services.</li>
          <li>Comply with legal obligations.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Data Security">
        <LegalList>
          <li>Account and document access is restricted through authentication, private storage, and authorization rules.</li>
          <li>Files are transferred over encrypted HTTPS connections and delivered through signed, time-limited links where applicable.</li>
          <li>No online system can promise absolute security. Contact us promptly if you believe your account or document has been exposed.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Sharing of Information">
        <p>We do not sell personal data. We use service providers only where needed to operate the platform, communicate, prevent abuse, process payments, or provide a feature:</p>
        <LegalList>
          <li>Supabase provides account, database, and private file-storage infrastructure.</li>
          <li>Payment providers process checkout and payment verification; we do not store full card details.</li>
          <li>Resend supports transactional email, Cloudflare Turnstile helps prevent automated abuse, and Tawk supports website chat.</li>
          <li>OpenRouter and the model provider selected for a request process text submitted to the free AI tool. The tool requests zero-data-retention routing, but provider policies can vary. Do not submit confidential, unpublished, privileged, or personally sensitive material to it.</li>
          <li>When required by law or legal proceedings.</li>
          <li>To protect our rights, safety, or property.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Cookies and Tracking">
        <LegalList>
          <li>Authentication, payment, security, and chat features may use cookies or similar browser storage.</li>
          <li>You can disable cookies in your browser settings, but some features may not function properly.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="7. Your Rights">
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <LegalList>
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections or updates.</li>
          <li>Request deletion of your data.</li>
          <li>Withdraw consent for data processing.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="8. Data Retention">
        <LegalList>
          <li>Order files and account records are kept while needed to provide the service, support the account, resolve disputes, meet legal or accounting obligations, and protect platform integrity.</li>
          <li>The platform does not currently promise one automatic deletion period for every data category. You may request deletion; some transaction or security records may need to be retained where law or legitimate operational needs require it.</li>
          <li>The application does not intentionally save free AI-tool input in the project database. It is transmitted to OpenRouter and an eligible model provider to generate the requested response.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="9. Third-Party Links">
        <p>Our website may contain links to external sites. We are not responsible for the privacy practices of those websites.</p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>We may update this Privacy Policy as providers or platform features change. Material updates will be posted on this page. Last updated: July 18, 2026.</p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>For privacy questions, access requests, corrections, or deletion requests, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
