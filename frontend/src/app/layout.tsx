import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { createWebsiteJsonLd, serializeJsonLd } from "@/lib/seo";

import { notoSansTC } from "./fonts/core-font";

import "./globals.css";
import "./fonts/noto-sans-tc.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
