import { LegalList, LegalPage, LegalSection, LegalSubList } from "@/components/LegalPage";

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy">
      <LegalSection title="1. General Policy">
        <p>At MEP (editandproofread.com), we strive to provide high-quality editing and proofreading services. Because our work involves intellectual effort and time investment, refunds are limited and subject to the conditions below.</p>
      </LegalSection>

      <LegalSection title="2. Eligibility for Refunds">
        <LegalList>
          <li>
            Before Work Begins:
            <LegalSubList>
              <li>Full refunds are available if you cancel your order before we start working on your document.</li>
            </LegalSubList>
          </li>
          <li>
            After Work Has Started:
            <LegalSubList>
              <li>Once editing/proofreading has commenced, refunds are not available, as the service has already been rendered in part.</li>
            </LegalSubList>
          </li>
          <li>
            Completed Work:
            <LegalSubList>
              <li>No refunds are issued after services are fully delivered.</li>
            </LegalSubList>
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Exceptional Circumstances">
        <p>Refunds may be considered in the following cases:</p>
        <LegalList>
          <li>Duplicate Payment: If you were charged twice for the same order.</li>
          <li>Service Not Delivered: If we fail to deliver your document within the agreed timeframe and no prior communication was made.</li>
          <li>Technical Errors: If a system or payment error occurred on our platform.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Non-Refundable Situations">
        <p>Refunds will not be issued for:</p>
        <LegalList>
          <li>Dissatisfaction with style preferences (editing is subjective).</li>
          <li>Failure to achieve external outcomes (e.g., journal acceptance, job offers, grades).</li>
          <li>Documents containing plagiarism, illegal, or offensive content.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Refund Process">
        <LegalList>
          <li>Refund requests must be submitted via email to [support@business.editandproofread.com](mailto:support@business.editandproofread.com) within 7 days of your order.</li>
          <li>Approved refunds will be processed within 10 business days to the original payment method.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>For refund inquiries, please contact: 📧 [support@business.editandproofread.com](mailto:support@business.editandproofread.com)</p>
      </LegalSection>
    </LegalPage>
  );
}
