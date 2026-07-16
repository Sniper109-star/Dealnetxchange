import "server-only";
import { Resend } from "resend";
import * as React from "react";

import WelcomeEmail from "@/emails/WelcomeEmail";
import DepositEmail from "@/emails/DepositEmail";
import WithdrawalEmail from "@/emails/WithdrawalEmail";
import TransactionUpdateEmail from "@/emails/TransactionUpdateEmail";
import ContactEmail from "@/emails/ContactEmail";
import { ContactConfirmationEmail } from "@/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM || "Dealnetxchange <onboarding@resend.dev>";
const REPLY_TO = process.env.EMAIL_REPLY_TO || "support@dealnetxchange.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function appUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

interface SendArgs {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}

export async function sendEmail({ to, subject, react }: SendArgs) {
  // If no API key is configured (local dev), log instead of failing the request.
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("placeholder")) {
    console.info("[email:dev] would send", { to, subject });
    return { id: "dev-noop" };
  }
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject,
    react,
  });
  if (error) {
    console.error("[email] failed to send", error);
    throw new Error(error.message);
  }
  return data;
}

export function sendWelcomeEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: `Welcome to Dealnetxchange, ${name}`,
    react: <WelcomeEmail name={name} dashboardUrl={appUrl("/dashboard")} />,
  });
}

export function sendDepositEmail(to: string, name: string, amount: string, method: string) {
  return sendEmail({
    to,
    subject: "Your deposit request was received",
    react: (
      <DepositEmail
        name={name}
        amount={amount}
        method={method}
        dashboardUrl={appUrl("/dashboard/deposits")}
      />
    ),
  });
}

export function sendWithdrawalEmail(to: string, name: string, amount: string, wallet: string) {
  return sendEmail({
    to,
    subject: "Your withdrawal request was received",
    react: (
      <WithdrawalEmail
        name={name}
        amount={amount}
        wallet={wallet}
        dashboardUrl={appUrl("/dashboard/withdrawals")}
      />
    ),
  });
}

export function sendTransactionUpdateEmail(
  to: string,
  name: string,
  opts: { type: "deposit" | "withdrawal"; amount: string; action: "approved" | "rejected" },
) {
  return sendEmail({
    to,
    subject: `Your ${opts.type} of ${opts.amount} was ${opts.action}`,
    react: (
      <TransactionUpdateEmail
        name={name}
        type={opts.type}
        amount={opts.amount}
        action={opts.action}
        dashboardUrl={appUrl("/dashboard")}
      />
    ),
  });
}

export function sendContactEmail(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return sendEmail({
    to: REPLY_TO,
    subject: `New contact enquiry from ${input.name}`,
    react: <ContactEmail {...input} />,
  });
}

export function sendContactConfirmationEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: "We received your message — Dealnetxchange",
    react: <ContactConfirmationEmail name={name} />,
  });
}
