import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ujjwal Verma — Product Builder",
  description:
    "Studying people. Building products. Shaping the future. Portfolio of Ujjwal Verma — Aspiring Product Manager, Product Builder, AI Enthusiast.",
  keywords: [
    "Ujjwal Verma",
    "Product Manager",
    "Portfolio",
    "Veilory",
    "Orivan",
    "Product Thinking",
  ],
  authors: [{ name: "Ujjwal Verma" }],
  openGraph: {
    title: "Ujjwal Verma — Product Builder",
    description:
      "Studying people. Building products. Shaping the future.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Verma — Product Builder",
    description:
      "Studying people. Building products. Shaping the future.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* Moving Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
