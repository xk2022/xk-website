import Link from "next/link";
import { ArrowUpRight, Globe, Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactCopyEmail } from "@/components/sections/contact/contact-copy-email";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { verifiedContactChannels, type ContactChannel } from "@/config/contact";
import { createInquiryHref } from "@/config/inquiry";
import { contactAvailability, contactPage } from "@/config/contact-page";

/** Shared presentation; the public page supplies only the verified registry. */
export function ContactChannelList({ channels }: { channels: readonly ContactChannel[] }) {
  return (
    <ul className="grid min-w-0 gap-6 md:grid-cols-2">
      {channels.map((channel) => {
        const isEmail = channel.href.startsWith("mailto:");
        const Icon = isEmail ? Mail : Globe;
        const destination = isEmail ? new URL(channel.href).pathname : channel.href;

        return (
          <li key={channel.href} className="min-w-0">
            <Card className="h-full">
              <p className="type-caption font-semibold text-primary">{isEmail ? "商務詢問信箱" : "已確認聯絡管道"}</p>
              <a
                href={createInquiryHref(channel.href)}
                className="group flex min-h-11 w-full min-w-0 max-w-full items-start gap-4 rounded-sm text-secondary underline-offset-4 hover:underline"
              >
                <Icon aria-hidden="true" className="mt-1 size-5 shrink-0" />
                <span className="type-body min-w-0 flex-1 break-words font-semibold">{channel.label}</span>
                <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0" />
              </a>
              <p className="type-body-lg min-w-0 max-w-full break-all font-semibold text-primary select-text">{destination}</p>
              {isEmail && <ContactCopyEmail email={destination} />}
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

export function ContactChannels() {
  const { channels } = contactPage;

  return (
    <Section
      id="contact-channels"
      aria-labelledby="contact-channels-title"
      data-contact-availability={contactAvailability}
      className="scroll-mt-8"
    >
      <Container>
        <SectionHeading id="contact-channels-title" eyebrow="CONTACT CHANNELS" titleLang="zh-TW" title={channels.title} description={channels.description} />
        {contactAvailability === "channels-only" ? (
          <ContactChannelList channels={verifiedContactChannels} />
        ) : (
          <Card className="gap-5 bg-surface sm:p-8">
            <h3 className="type-h3 text-primary">{channels.emptyTitle}</h3>
            <p className="type-body max-w-3xl text-muted-foreground">{channels.emptyDescription}</p>
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              {channels.fallbackLinks.map((link) => (
                <Button key={link.href} asChild variant="outline">
                  <Link href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>
                </Button>
              ))}
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}
