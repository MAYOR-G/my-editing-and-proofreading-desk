import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Read how My Editing and Proofreading Desk collects, uses, protects, retains, and handles personal information and uploaded documents.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <LegalSection title="1. Introduction">
        <p>At MEP (editandproofread.com), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following types of information:</p>
        <LegalList>
          <li>Personal Information: Name, email address, billing details, and contact information.</li>
          <li>Document Content: Files you upload for editing or proofreading.</li>
          <li>Technical Data: IP address, browser type, device information, and cookies.</li>
          <li>Communication Records: Emails or messages exchanged with our support team.</li>
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
          <li>All files and personal data are stored securely.</li>
          <li>Access is restricted to authorized staff only.</li>
          <li>We use encryption and secure servers to protect your information.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Sharing of Information">
        <p>We do not sell, rent, or trade your personal data. We may share information only in these cases:</p>
        <LegalList>
          <li>With trusted payment processors (for billing).</li>
          <li>When required by law or legal proceedings.</li>
          <li>To protect our rights, safety, or property.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Cookies and Tracking">
        <LegalList>
          <li>Our website may use cookies to enhance user experience.</li>
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
          <li>Documents are retained only as long as necessary to complete your order.</li>
          <li>Personal data is stored for legal and accounting purposes, then securely deleted.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="9. Third-Party Links">
        <p>Our website may contain links to external sites. We are not responsible for the privacy practices of those websites.</p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.</p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>For questions or requests regarding your privacy, please contact: 📧 [support@business.editandproofread.com](mailto:support@business.editandproofread.com)</p>
      </LegalSection>
    </LegalPage>
  );
}
