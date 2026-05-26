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
  description: "The premier Web3 hybrid hackathon in Latin America. July 2026, Lima & Virtual. $15,000+ in prizes, expert mentorship, and global networking.",
  keywords: ["Ethereum", "Hackathon", "Lima", "Peru", "Web3", "Blockchain", "Arbitrum", "Solidity", "Crypto"],
  authors: [{ name: "ETH Lima Team" }],
  openGraph: {
    title: "ETH Lima Hackathon 2026",
    description: "Build the future of Web3 at the premier hybrid hackathon in Latin America.",
    url: "https://ethlima.com",
    siteName: "ETH Lima",
    images: [
      {
        url: "/og-image.png", // User should provide this or I can generate a suggestion
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
      className={`${outfit.variable} ${jetbrainsMono.variable} font-sans h-full antialiased dark`}
      data-scroll-container
    >
      <head>
        <link rel="preload" as="image" href={LOGO_SRC} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                import('locomotive-scroll').then(({ default: LocomotiveScroll }) => {
                  new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true,
                    multiplier: 1.2,
                    lerp: 0.1,
                    class: 'is-reveal'
                  });
                }).catch(() => {});
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky-header">
          <nav className="flex items-center justify-between h-16 px-6 md:px-8 container mx-auto">
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold bg-gradient-to-r from-brand-accent to-brand-accent/60 bg-clip-text text-transparent">
                ETH Lima
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#tracks"
                className="hidden md:inline-block text-sm font-medium text-fg/70 hover:text-fg transition-colors"
              >
                Tracks
              </a>
              <a
                href="#sponsors"
                className="hidden md:inline-block text-sm font-medium text-fg/70 hover:text-fg transition-colors"
              >
                Sponsors
              </a>
              <a
                href="#timeline"
                className="hidden md:inline-block text-sm font-medium text-fg/70 hover:text-fg transition-colors"
              >
                Timeline
              </a>
            </div>
          </nav>
        </header>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
