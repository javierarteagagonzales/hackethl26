import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LOGO_SRC } from "@/lib/asset-path";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";

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
  description: "The premier Web3 hybrid hackathon in Latin America. July 2026, Lima & Virtual. $15,000+ in prizes, expert mentorship, and global networking.",
  keywords: ["Ethereum", "Hackathon", "Lima", "Peru", "Web3", "Blockchain", "Arbitrum", "Solidity", "Crypto"],
  authors: [{ name: "ETH Lima Team" }],
  alternates: {
    canonical: "https://ethlima.com",
    languages: {
      "en": "https://ethlima.com/en",
      "es": "https://ethlima.com/es",
      "pt": "https://ethlima.com/pt",
    },
  },
  openGraph: {
    title: "ETH Lima Hackathon 2026",
    description: "Build the future of Web3 at the premier hybrid hackathon in Latin America.",
    url: "https://ethlima.com",
    siteName: "ETH Lima",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETH Lima Hackathon 2026",
    description: "Build the future of Web3 at the premier hybrid hackathon in Latin America.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href={LOGO_SRC} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

