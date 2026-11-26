import type { Metadata } from "next";

import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { ContactCta } from "@/components/sections/contact/contact-cta";
import { ContactDataNote } from "@/components/sections/contact/contact-data-note";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactInquiry } from "@/components/sections/contact/contact-inquiry";
import { ContactPreparation } from "@/components/sections/contact/contact-preparation";
import { ContactProcess } from "@/components/sections/contact/contact-process";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/contact"), siteConfig);

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInquiry />
      <ContactChannels />
      <ContactPreparation />
      <ContactProcess />
      <ContactDataNote />
      <ContactCta />
    </>
  );
}
