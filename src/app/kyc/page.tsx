import { LegalPage } from "@/components/LegalPage";

export default function Kyc() {
  return (
    <LegalPage
      eyebrow="Company"
      title="KYC Policy"
      subtitle="Know Your Customer procedures that keep the platform secure and compliant."
      sections={[
        {
          heading: "1. Why We Verify",
          body: [
            "KYC helps us prevent fraud, money laundering and unauthorized account usage. Verification is required before funding an account or withdrawing funds.",
          ],
        },
        {
          heading: "2. Information We Collect",
          body: [
            "We collect identity documents, proof of address and contact details necessary to confirm the identity of each client.",
          ],
        },
        {
          heading: "3. Data Protection",
          body: [
            "All personal data is encrypted and stored securely. We never share client information with third parties except where required by law.",
          ],
        },
        {
          heading: "4. Ongoing Monitoring",
          body: [
            "We continuously monitor account activity to detect and prevent suspicious transactions in line with AML regulations.",
          ],
        },
      ]}
    />
  );
}
