import { Heading, Text, Hr, Row, Column } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

export interface WithdrawalEmailProps {
  name: string;
  amount: string;
  wallet: string;
  dashboardUrl: string;
}

export default function WithdrawalEmail({ name, amount, wallet, dashboardUrl }: WithdrawalEmailProps) {
  return (
    <EmailLayout preview={`Withdrawal requested: ${amount}`}>
      <Heading style={{ fontSize: 22, color: "#092838", margin: "0 0 12px" }}>
        Withdrawal requested
      </Heading>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 16px" }}>
        Hi {name}, we&rsquo;ve received your withdrawal request. It will be processed
        after review by our team.
      </Text>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Row>
        <Column>
          <Text style={{ fontSize: 13, color: "#7a8a99", margin: 0 }}>Amount</Text>
          <Text style={{ fontSize: 18, fontWeight: 700, color: "#092838", margin: "4px 0 0" }}>{amount}</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 13, color: "#7a8a99", margin: 0 }}>Wallet</Text>
          <Text style={{ fontSize: 13, fontWeight: 600, color: "#092838", margin: "4px 0 0", wordBreak: "break-all" }}>{wallet}</Text>
        </Column>
      </Row>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Text style={{ fontSize: 14, color: "#4a5a68" }}>
        View status in your{" "}
        <a href={dashboardUrl} style={{ color: "#7423fe", fontWeight: 600 }}>dashboard</a>.
      </Text>
    </EmailLayout>
  );
}

WithdrawalEmail.PreviewProps = {
  name: "Alex",
  amount: "$2,000.00",
  wallet: "0xCLIENT0000000000000000000000000000000001",
  dashboardUrl: "https://dealnetxchange.com/dashboard/withdrawals",
} satisfies WithdrawalEmailProps;
