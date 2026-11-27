import { ArrowDown, ArrowUpRight, Globe, Mail } from "lucide-react";

import { ContactCopyEmail } from "@/components/sections/contact/contact-copy-email";
import { ContactInquiryForm } from "@/components/sections/contact/contact-inquiry-form";
import { createInquiryHref } from "@/config/inquiry";
import { getDesignContent } from "@/lib/design-collection/content";
import { createDesignInteractionScope } from "@/lib/design-collection/interactions";

import { luxuryHref } from "./luxury-links";
import { LuxuryBadge, LuxuryDisclosure, LuxuryLink, LuxurySection } from "./luxury-ui";

/** Luxury presentation of the shared contact facts and original local-draft form. */
export function LuxuryContact() {
  const { contact, site } = getDesignContent();
  const { hero, channels, preparation, process, dataNote, cta } = contact.page;
  const scope = createDesignInteractionScope("luxury", "contact");
  const emailChannel = contact.channels.find(({ href }) => href.startsWith("mailto:"));

  return (
    <div className="lx-contact" data-luxury-interaction="contact">
      <section id="contact-hero" className="lx-hero" aria-labelledby="contact-page-title">
        <div className="lx-container">
          <nav aria-label="麵包屑導覽" className="lx-actions">
            <LuxuryLink href={luxuryHref("/")}>首頁</LuxuryLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">聯絡我們</span>
          </nav>
          <span className="lx-accent-rule" aria-hidden="true" />
          <p lang="en" className="lx-eyebrow">{hero.englishTitle}</p>
          <h1 id="contact-page-title">{hero.title}</h1>
          <p className="lx-hero-description">{hero.description}</p>
          <div className="lx-hero-content lx-stack">
            <p lang="en">{site.tagline}</p>
            <div className="lx-actions">
              <LuxuryLink href="#contact-form" variant="button">填寫詢問內容<ArrowDown aria-hidden="true" /></LuxuryLink>
              <LuxuryLink href={luxuryHref(contact.action.href)} aria-describedby="contact-hero-email-note">{contact.action.label}<ArrowUpRight aria-hidden="true" /></LuxuryLink>
              <LuxuryLink href={luxuryHref(hero.secondaryCta.href)}>{hero.secondaryCta.label}<ArrowUpRight aria-hidden="true" /></LuxuryLink>
            </div>
            <p id="contact-hero-email-note">{contact.action.label}：{contact.action.description}</p>
            {emailChannel && <p className="lx-contact-email">商務 Email：{emailChannel.href.slice("mailto:".length)}</p>}
            <p lang="en">{site.name} · {site.slogan}</p>
          </div>
        </div>
      </section>

      <LuxurySection id="contact-form" eyebrow="PROJECT INQUIRY" title={contact.inquiry.title} description={contact.inquiry.description}>
        <div className="lx-stack">
          <div className="lx-note">
            <LuxuryBadge>本頁記憶體限定</LuxuryBadge>
            <p>切換至 Modern、其他設計系列或離開本頁，填寫內容與草稿都會清除；返回時需要重新填寫。需要保留內容時，請先自行複製。</p>
          </div>
          <ContactInquiryForm key={scope.remountKey} styleId="luxury" />
        </div>
      </LuxurySection>

      <LuxurySection id="contact-channels" eyebrow="CONTACT CHANNELS" title={channels.title} description={channels.description} data-contact-availability={contact.availability}>
        {contact.availability === "channels-only" ? (
          <ul className="lx-contact-channels">
            {contact.channels.map((channel) => {
              const isEmail = channel.href.startsWith("mailto:");
              const Icon = isEmail ? Mail : Globe;
              const destination = isEmail ? new URL(channel.href).pathname : channel.href;
              return (
                <li key={channel.href} className="lx-stack">
                  <p className="lx-eyebrow">{isEmail ? "商務詢問信箱" : "已確認聯絡管道"}</p>
                  <a href={createInquiryHref(channel.href)} className="lx-link"><Icon aria-hidden="true" /><span>{channel.label}</span><ArrowUpRight aria-hidden="true" /></a>
                  <p className="lx-contact-email">{destination}</p>
                  {isEmail && <ContactCopyEmail email={destination} />}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="lx-note lx-stack">
            <h3>{channels.emptyTitle}</h3>
            <p>{channels.emptyDescription}</p>
            <div className="lx-actions">{channels.fallbackLinks.map((link) => <LuxuryLink key={link.href} href={luxuryHref(link.href)}>{link.label}<ArrowUpRight aria-hidden="true" /></LuxuryLink>)}</div>
          </div>
        )}
      </LuxurySection>

      <LuxurySection id="contact-preparation" eyebrow="PREPARE YOUR REQUIREMENTS" title={preparation.title} description={preparation.description}>
        <ol className="lx-stack">
          {preparation.items.map((item, index) => (
            <li key={item.title}>
              <LuxuryDisclosure open={index === 0} title={<h3>{item.title}</h3>}>
                <p>{item.description}</p>
              </LuxuryDisclosure>
            </li>
          ))}
        </ol>
        <nav aria-label={preparation.servicesLabel} className="lx-note lx-stack">
          <h3>{preparation.servicesLabel}</h3>
          <ul className="lx-actions">{contact.serviceLinks.map((service) => <li key={service.id}><LuxuryLink href={luxuryHref(service.href)}>{service.label}<ArrowUpRight aria-hidden="true" /></LuxuryLink></li>)}</ul>
        </nav>
      </LuxurySection>

      <LuxurySection id="contact-process" eyebrow="DISCUSSING THE NEXT STEP" title={process.title} description={process.description}>
        <ol className="lx-stack">
          {process.steps.map((step) => (
            <li key={step.title}>
              <LuxuryDisclosure title={<h3>{step.title}</h3>}>
                <p>{step.description}</p>
              </LuxuryDisclosure>
            </li>
          ))}
        </ol>
      </LuxurySection>

      <LuxurySection id="contact-data-note" eyebrow="BEFORE SHARING INFORMATION" title={dataNote.title} description={dataNote.description}>
        <ul className="lx-list">{dataNote.notes.map((note) => <li key={note}>{note}</li>)}</ul>
      </LuxurySection>

      <LuxurySection id="contact-next-step" eyebrow="EXPLORE XK" title={cta.title} description={cta.description}>
        <div className="lx-actions">{cta.links.map((link, index) => <LuxuryLink key={link.href} href={luxuryHref(link.href)} variant={index === 0 ? "button" : "text"}>{link.label}<ArrowUpRight aria-hidden="true" /></LuxuryLink>)}</div>
      </LuxurySection>
    </div>
  );
}
