import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealnetxchange | Digital Solutions for Blockchain Investors",
  description:
    "Dealnetxchange is a globally trusted digital finance platform delivering insightful analysis, blockchain solutions, and investment strategies for emerging investors.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#092838",
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
