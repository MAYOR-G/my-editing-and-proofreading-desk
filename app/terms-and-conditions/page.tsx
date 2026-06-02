import { LegalList, LegalPage, LegalSection } from "@/components/LegalPage";

export default function TermsAndConditionsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      
      <LegalSection title="1. Introduction">
        <p>Welcome to MEP (editandproofread.com). By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.</p>
      </LegalSection>

      <LegalSection title="2. Services Provided">
        <LegalList>
          <li>We offer editing, proofreading, and related language services for academic, professional, and personal documents.</li>
          <li>Services are delivered based on the information and files provided by the client.</li>
          <li>We do not guarantee publication, acceptance, or external approval of edited documents.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. User Responsibilities">
        <LegalList>
          <li>You must provide accurate, complete, and lawful content for editing.</li>
          <li>You retain full responsibility for the originality, accuracy, and legality of your documents.</li>
          <li>You agree not to upload or request work involving illegal, defamatory, or plagiarized material.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <LegalList>
          <li>All content you submit remains your intellectual property.</li>
          <li>We claim no ownership of your documents.</li>
          <li>Our edits and suggestions are provided solely for your use and may not be resold or redistributed without permission.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Payment and Refunds">
        <LegalList>
          <li>Payment must be made in full before services are delivered.</li>
          <li>Refunds are only available if services have not yet commenced.</li>
          <li>Once editing/proofreading begins, fees are non-refundable.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Confidentiality">
        <LegalList>
          <li>We treat all documents as confidential.</li>
          <li>Files are stored securely and are not shared with third parties, except as required by law.</li>
          <li>You are responsible for maintaining your own copies of submitted documents.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <LegalList>
          <li>We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.</li>
          <li>Our maximum liability is limited to the amount paid for the specific service in question.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="8. Termination">
        <LegalList>
          <li>We reserve the right to refuse service or terminate accounts that violate these Terms.</li>
          <li>You may discontinue use of our services at any time.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <LegalList>
          <li>These Terms are governed by the laws of the United States.</li>
          <li>Any disputes will be resolved in the courts of that jurisdiction.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="10. Changes to Terms">
        <LegalList>
          <li>We may update these Terms at any time.</li>
          <li>Continued use of the website after changes indicates acceptance of the revised Terms.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="11. Contact Information">
        <p>For questions or concerns, please contact us at: 📧 [support@business.editandproofread.com](mailto:support@business.editandproofread.com)</p>
      </LegalSection>
    </LegalPage>
  );
}
