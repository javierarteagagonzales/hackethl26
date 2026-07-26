import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LOGO_SRC } from "@/lib/asset-path";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { CountdownBanner } from "@/components/ui/countdown-banner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackathon.ethlima.org"),
  title: {
    default: "ETH Lima Hackathon 2026 — Build the Decentralized Future",
    template: "%s | ETH Lima Hackathon 2026",
  },
  description:
    "The premier Web3 hybrid hackathon in Latin America. July 2026, Lima & Virtual. $15,000+ in prizes, expert mentorship, and global networking.",
  keywords: [
    "Ethereum",
    "Hackathon",
    "Lima",
    "Peru",
    "Web3",
    "Blockchain",
    "Arbitrum",
    "Solidity",
    "Crypto",
    "DeFi",
    "Smart Contracts",
    "Web3 Latam",
  ],
  authors: [{ name: "ETH Lima Team", url: "https://hackathon.ethlima.org" }],
  creator: "ETH Lima",
  publisher: "ETH Lima",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      es: "/es",
      pt: "/pt",
    },
  },
  openGraph: {
    title: "ETH Lima Hackathon 2026",
    description:
      "Build the future of Web3 at the premier hybrid hackathon in Latin America. Join us in Lima or virtually.",
    url: "https://hackathon.ethlima.org",
    siteName: "ETH Lima Hackathon",
    images: [
      {
        url: "/portada.webp",
        width: 1200,
        height: 630,
        alt: "ETH Lima Hackathon 2026 Hero Image",
      },
    ],
    locale: "es_PE",
    alternateLocale: ["en_US", "pt_BR"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETH Lima Hackathon 2026",
    description: "Build the future of Web3 at the premier hybrid hackathon in Latin America.",
    creator: "@ETHLima",
    images: {
      url: "/portada.webp",
      alt: "ETH Lima Hackathon 2026 Hero Image",
    },
  },
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href={LOGO_SRC} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CountdownBanner />
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
