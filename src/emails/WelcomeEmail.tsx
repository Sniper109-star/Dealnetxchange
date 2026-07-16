import { Button, Heading, Text } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

export interface WelcomeEmailProps {
  name: string;
  dashboardUrl: string;
}

export default function WelcomeEmail({ name, dashboardUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout preview={`Welcome to Dealnetxchange, ${name}`}>
      <Heading style={{ fontSize: 22, color: "#092838", margin: "0 0 12px" }}>
        Welcome aboard, {name} 👋
      </Heading>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 20px" }}>
        Your Dealnetxchange account is ready. Explore investment plans, fund your
        wallet, and start growing your portfolio with insights built for emerging
        blockchain investors.
      </Text>
      <Button
        href={dashboardUrl}
        style={{ backgroundColor: "#7423fe", color: "#ffffff", padding: "12px 24px", borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}
      >
        Go to your dashboard
      </Button>
      <Text style={{ fontSize: 13, color: "#7a8a99", marginTop: 20 }}>
        If the button doesn&rsquo;t work, paste this link: {dashboardUrl}
      </Text>
    </EmailLayout>
  );
}

WelcomeEmail.PreviewProps = {
  name: "Alex",
  dashboardUrl: "https://dealnetxchange.com/dashboard",
} satisfies WelcomeEmailProps;
