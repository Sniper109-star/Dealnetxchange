import { Heading, Text, Hr } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

export interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactEmail({ name, email, phone, message }: ContactEmailProps) {
  return (
    <EmailLayout preview={`New enquiry from ${name}`}>
      <Heading style={{ fontSize: 22, color: "#092838", margin: "0 0 12px" }}>
        New contact enquiry
      </Heading>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 8px" }}>
        <b>Name:</b> {name}
      </Text>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 8px" }}>
        <b>Email:</b> {email}
      </Text>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: "0 0 16px" }}>
        <b>Phone:</b> {phone}
      </Text>
      <Hr style={{ borderColor: "#e6edf3", margin: "16px 0" }} />
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
        {message}
      </Text>
    </EmailLayout>
  );
}

ContactEmail.PreviewProps = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  phone: "+1 555 0100",
  message: "Hi, I'd like to learn more about your investment plans.",
} satisfies ContactEmailProps;

export interface ContactConfirmationEmailProps {
  name: string;
}

export function ContactConfirmationEmail({ name }: ContactConfirmationEmailProps) {
  return (
    <EmailLayout preview="We received your message">
      <Heading style={{ fontSize: 22, color: "#092838", margin: "0 0 12px" }}>
        Thanks for reaching out{name ? `, ${name}` : ""}!
      </Heading>
      <Text style={{ fontSize: 15, color: "#4a5a68", lineHeight: 1.7, margin: 0 }}>
        Our support team has received your message and will get back to you within
        24 hours. We appreciate your interest in Dealnetxchange.
      </Text>
    </EmailLayout>
  );
}
