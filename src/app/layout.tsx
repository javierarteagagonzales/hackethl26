import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "ETH Lima Hackathon 2026 — Build the Decentralized Future",
  description: "The premier Web3 hybrid hackathon in Latin America. July 2026, Lima & Virtual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} font-sans h-full antialiased dark`}
    >
      <head>
        {/* Set base path for all relative URLs (images, links) */}
        <base href={BASE ? `${BASE}/` : "/"} />
        {/* Preload logo using the filename which is now relative to <base> */}
        <link rel="preload" as="image" href="Ethlogo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
