import type { Metadata } from "next";

import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { ContactCta } from "@/components/sections/contact/contact-cta";
import { ContactDataNote } from "@/components/sections/contact/contact-data-note";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactPreparation } from "@/components/sections/contact/contact-preparation";
import { ContactProcess } from "@/components/sections/contact/contact-process";
import { contactPage } from "@/config/contact-page";
import { siteConfig } from "@/config/site";

const { title, description, path } = contactPage.metadata;
const url = new URL(path, siteConfig.url).href;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: { title, description, url, siteName: siteConfig.name, locale: "zh_TW", type: "website" },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
      <ContactPreparation />
      <ContactProcess />
      <ContactDataNote />
      <ContactCta />
    </>
  );
}
