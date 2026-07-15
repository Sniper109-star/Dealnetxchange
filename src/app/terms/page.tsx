import { LegalPage } from "@/components/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Company"
      title="Terms & Conditions"
      subtitle="The terms governing your use of the Dealnetxchange platform."
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: [
            "By accessing or using Dealnetxchange you agree to these Terms & Conditions. If you do not agree, please do not use the platform.",
          ],
        },
        {
          heading: "2. Account Responsibilities",
          body: [
            "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
          ],
        },
        {
          heading: "3. Investment Risk",
          body: [
            "All investments carry risk. Returns shown are indicative and past performance does not guarantee future results.",
          ],
        },
        {
          heading: "4. Withdrawals",
          body: [
            "Withdrawals are processed using cryptocurrency. Clients in the USA, Canada, Australia, New Zealand and Ecuador may receive coins directly to a Coinbase wallet.",
          ],
        },
        {
          heading: "5. Changes to Terms",
          body: [
            "We may update these terms from time to time. Continued use of the platform constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
