import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LOGO_SRC } from "@/lib/asset-path";
import { AuthProvider } from "@/components/providers/session-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
        <link rel="preload" as="image" href={LOGO_SRC} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
