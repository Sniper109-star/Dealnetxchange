import { LegalPage } from "@/components/LegalPage";

export default function Legal() {
  return (
    <LegalPage
      eyebrow="Company"
      title="Legal"
      subtitle="The legal framework governing your use of Dealnetxchange."
      sections={[
        {
          heading: "1. Introduction",
          body: [
            "Dealnetxchange provides digital financial services including blockchain solutions, advisory accounts and investment planning. By accessing our platform you agree to be bound by these legal provisions.",
            "These terms are governed by applicable laws and regulations in the jurisdictions where we operate.",
          ],
        },
        {
          heading: "2. Regulatory Compliance",
          body: [
            "We operate in accordance with anti-money laundering (AML) and counter-terrorist financing (CTF) regulations, and cooperate with relevant authorities.",
          ],
        },
        {
          heading: "3. Intellectual Property",
          body: [
            "All content, trademarks and software on this platform are the property of Dealnetxchange and may not be reproduced without written permission.",
          ],
        },
        {
          heading: "4. Limitation of Liability",
          body: [
            "Digital financing carries risk. While we apply rigorous analysis, we do not guarantee returns and are not liable for losses arising from market movements.",
          ],
        },
      ]}
    />
  );
}
