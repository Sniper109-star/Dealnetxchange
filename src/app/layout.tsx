import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealnetxchange | Digital Solutions for Blockchain Investors",
  description:
    "Dealnetxchange is a globally trusted digital finance platform delivering insightful analysis, blockchain solutions, and investment strategies for emerging investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
