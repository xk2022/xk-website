import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { createWebsiteJsonLd, serializeJsonLd } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  // Each Unicode subset already contains all weights; declare it only once.
  weight: "variable",
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.tagline,
  // The foundation is preview content. Review this setting at website launch.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${notoSansTC.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        {children}
        <script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(createWebsiteJsonLd(siteConfig)) }}
        />
      </body>
    </html>
  );
}
