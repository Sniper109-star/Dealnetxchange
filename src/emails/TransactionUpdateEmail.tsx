import { Heading, Text, Hr, Row, Column } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

export interface TransactionUpdateEmailProps {
  name: string;
  type: "deposit" | "withdrawal";
  amount: string;
  action: "approved" | "rejected";
  dashboardUrl: string;
}

export default function TransactionUpdateEmail({
  name,
  type,
  amount,
  action,
  dashboardUrl,
}: TransactionUpdateEmailProps) {
  const title = action === "approved" ? "approved" : "rejected";
  const verb = type === "deposit" ? "Deposit" : "Withdrawal";
  return (
    <EmailLayout preview={`Your ${type} of ${amount} was ${title}`}>
      <Heading style={{ fontSize: 22, color: "#092838", margin: "0 0 12px" }}>
        {verb} {title}
      </Heading>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 16px" }}>
        Hi {name}, your {type} of <b>{amount}</b> has been <b>{title}</b> by our team.
      </Text>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Row>
        <Column>
          <Text style={{ fontSize: 13, color: "#7a8a99", margin: 0 }}>Type</Text>
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#092838", margin: "4px 0 0" }}>{verb}</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 13, color: "#7a8a99", margin: 0 }}>Status</Text>
          <Text style={{ fontSize: 16, fontWeight: 700, color: action === "approved" ? "#16a34a" : "#dc2626", margin: "4px 0 0" }}>{title}</Text>
        </Column>
      </Row>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Text style={{ fontSize: 14, color: "#4a5a68" }}>
        See details in your{" "}
        <a href={dashboardUrl} style={{ color: "#7423fe", fontWeight: 600 }}>dashboard</a>.
      </Text>
    </EmailLayout>
  );
}

TransactionUpdateEmail.PreviewProps = {
  name: "Alex",
  type: "deposit",
  amount: "$1,000.00",
  action: "approved",
  dashboardUrl: "https://dealnetxchange.com/dashboard",
} satisfies TransactionUpdateEmailProps;
