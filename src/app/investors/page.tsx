import { LegalPage } from "@/components/LegalPage";

export default function Investors() {
  return (
    <LegalPage
      eyebrow="Company"
      title="Investors Relation"
      subtitle="Information for current and prospective investors in Dealnetxchange."
      sections={[
        {
          heading: "1. Our Vision",
          body: [
            "Dealnetxchange is committed to delivering superior long-term returns with minimal risk exposure through a creative approach to investment management.",
          ],
        },
        {
          heading: "2. Performance",
          body: [
            "Our investment plans are designed to suit everyone irrespective of their income and financial background, with returns ranging from 15% to 100% across plan tiers.",
          ],
        },
        {
          heading: "3. Governance",
          body: [
            "We maintain transparent reporting and strong internal controls to protect investor interests and ensure regulatory compliance.",
          ],
        },
        {
          heading: "4. Contact",
          body: [
            "Investor enquiries can be directed to our support team, available 24/7.",
          ],
        },
      ]}
    />
  );
}
