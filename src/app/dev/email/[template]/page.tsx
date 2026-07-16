import { notFound } from "next/navigation";
import * as React from "react";
import { render } from "@react-email/render";

import WelcomeEmail from "@/emails/WelcomeEmail";
import DepositEmail from "@/emails/DepositEmail";
import WithdrawalEmail from "@/emails/WithdrawalEmail";
import TransactionUpdateEmail from "@/emails/TransactionUpdateEmail";
import ContactEmail from "@/emails/ContactEmail";
import { ContactConfirmationEmail } from "@/emails/ContactEmail";

const SITE = "https://dealnetxchange.com";

const templates: Record<string, React.ReactElement> = {
  welcome: <WelcomeEmail name="Alex" dashboardUrl={`${SITE}/dashboard`} />,
  deposit: (
    <DepositEmail name="Alex" amount="$1,000.00" method="Bitcoin" dashboardUrl={`${SITE}/dashboard/deposits`} />
  ),
  withdrawal: (
    <WithdrawalEmail name="Alex" amount="$2,000.00" wallet="0xCLIENT..." dashboardUrl={`${SITE}/dashboard/withdrawals`} />
  ),
  "transaction-update": (
    <TransactionUpdateEmail name="Alex" type="deposit" amount="$1,000.00" action="approved" dashboardUrl={`${SITE}/dashboard`} />
  ),
  contact: (
    <ContactEmail name="Jordan Lee" email="jordan@example.com" phone="+1 555 0100" message="I'd like to learn more." />
  ),
  "contact-confirmation": <ContactConfirmationEmail name="Jordan" />,
};

export default async function EmailPreview({ params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  const element = templates[template];
  if (!element) notFound();

  const html = await render(element);
  return (
    <div
      style={{ margin: 0, padding: 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export async function generateStaticParams() {
  return Object.keys(templates).map((template) => ({ template }));
}
