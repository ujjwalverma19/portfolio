import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ujjwal.studio"),
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Ujjwal Verma — Product Builder",
    description:
      "Studying people. Building products. Shaping the future.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "UV Monogram Logo"
      }
    ],
  },
  twitter: {
    card: "summary",
    title: "Ujjwal Verma — Product Builder",
    description:
      "Studying people. Building products. Shaping the future.",
    images: ["/images/logo.png"],
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
