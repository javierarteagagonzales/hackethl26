import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LOGO_SRC } from "@/lib/asset-path";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { CountdownBanner } from "@/components/ui/countdown-banner";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  TWITTER_HANDLE,
} from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "ETH Lima Hackathon 2026",
  description: SITE_DESCRIPTION,
  startDate: "2026-07-31T00:00:00-05:00",
  endDate: "2026-08-12T23:59:00-05:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: "Lima, Peru",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressCountry: "PE",
      },
    },
    {
      "@type": "VirtualLocation",
      url: SITE_URL,
    },
  ],
  image: [SITE_IMAGE],
  organizer: {
    "@type": "Organization",
    name: "Ethereum Lima",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    url: `${SITE_URL}/register`,
    availability: "https://schema.org/InStock",
  },
  sameAs: ["https://x.com/eth_lima"],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en", "es", "pt"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | ETH Lima Hackathon 2026",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
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
  authors: [{ name: "ETH Lima Team", url: SITE_URL }],
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
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_PE",
    alternateLocale: ["en_US", "pt_BR"],
    images: [
      {
        url: SITE_IMAGE,
        width: 1483,
        height: 834,
        alt: "ETH Lima Hackathon 2026 — Build the Decentralized Future",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [SITE_IMAGE],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
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
