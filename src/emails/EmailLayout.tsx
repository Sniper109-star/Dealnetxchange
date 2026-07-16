import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

const brand = "#092838";
const accent = "#7423fe";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f4f7fa", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: "32px 28px", border: "1px solid #e6edf3" }}>
            <Text style={{ fontSize: 20, fontWeight: 800, color: brand, margin: "0 0 20px" }}>
              Dealnet<span style={{ color: accent }}>xchange</span>
            </Text>
            {children}
          </Section>
          <Hr style={{ borderColor: "#e6edf3", margin: "20px 0" }} />
          <Text style={{ fontSize: 12, color: "#7a8a99", textAlign: "center", lineHeight: 1.6 }}>
            Dealnetxchange &mdash; Digital Solutions for Blockchain Investors.
            <br />
            You are receiving this email because you have an account with us.
            <br />
            <Link href="https://dealnetxchange.com" style={{ color: accent }}>
              dealnetxchange.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
