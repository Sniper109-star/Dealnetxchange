import { Heading, Text, Hr, Row, Column } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

export interface DepositEmailProps {
  name: string;
  amount: string;
  method: string;
  dashboardUrl: string;
}

export default function DepositEmail({ name, amount, method, dashboardUrl }: DepositEmailProps) {
  return (
    <EmailLayout preview={`Deposit received: ${amount}`}>
      <Heading style={{ fontSize: 22, color: "#092838", margin: "0 0 12px" }}>
        Deposit submitted
      </Heading>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 16px" }}>
        Hi {name}, we&rsquo;ve received your deposit request. Our team will review it
        and credit your balance once approved.
      </Text>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Row>
        <Column>
          <Text style={{ fontSize: 13, color: "#7a8a99", margin: 0 }}>Amount</Text>
          <Text style={{ fontSize: 18, fontWeight: 700, color: "#092838", margin: "4px 0 0" }}>{amount}</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 13, color: "#7a8a99", margin: 0 }}>Method</Text>
          <Text style={{ fontSize: 18, fontWeight: 700, color: "#092838", margin: "4px 0 0" }}>{method}</Text>
        </Column>
      </Row>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Text style={{ fontSize: 14, color: "#4a5a68" }}>
        Track the status anytime in your{" "}
        <a href={dashboardUrl} style={{ color: "#7423fe", fontWeight: 600 }}>dashboard</a>.
      </Text>
    </EmailLayout>
  );
}

DepositEmail.PreviewProps = {
  name: "Alex",
  amount: "$1,000.00",
  method: "Bitcoin",
  dashboardUrl: "https://dealnetxchange.com/dashboard/deposits",
} satisfies DepositEmailProps;
