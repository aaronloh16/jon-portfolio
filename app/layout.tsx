import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jonathan Loh | Mechanical Engineering Portfolio",
  description:
    "Mechanical engineering portfolio showcasing CAD design, capstone projects, assemblies, and engineering drawings. McMaster University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
