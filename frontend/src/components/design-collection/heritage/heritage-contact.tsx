import Link from "next/link";
import { ArrowDown, ArrowUpRight, Globe, Mail } from "lucide-react";

import { ContactCopyEmail } from "@/components/sections/contact/contact-copy-email";
import { ContactInquiryForm } from "@/components/sections/contact/contact-inquiry-form";
import { createInquiryHref } from "@/config/inquiry";
import { getDesignContent } from "@/lib/design-collection/content";
import { createDesignInteractionScope } from "@/lib/design-collection/interactions";

import { heritageHref } from "./heritage-links";
import { HeritageBadge, HeritageLink, HeritageList, HeritageSection } from "./heritage-ui";

/** Editorial composition over the shared public content and original draft controller. */
export function HeritageContact() {
  const { contact, site } = getDesignContent();
  const { hero, channels, preparation, process, dataNote, cta } = contact.page;
  const scope = createDesignInteractionScope("heritage", "contact");
  const businessEmail = contact.channels.find(({ href }) => href.startsWith("mailto:"))?.href.slice("mailto:".length);

  return (
    <div className="htg-contact" data-heritage-interaction="contact">
      <section id="contact-hero" aria-labelledby="contact-page-title" className="htg-hero">
        <div className="htg-container">
          <nav aria-label="麵包屑導覽" className="htg-contact-links">
            <HeritageLink href={heritageHref("/")}>首頁</HeritageLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">聯絡我們</span>
          </nav>
          <p className="htg-eyebrow" lang="en">{hero.englishTitle}</p>
          <div className="htg-hero-grid">
            <div className="htg-hero-copy">
              <h1 id="contact-page-title">{hero.title}</h1>
              <p className="htg-hero-description">{hero.description}</p>
              <p lang="en">{site.tagline}</p>
              <div className="htg-contact-links">
                <HeritageLink href="#contact-form" primary>填寫詢問內容<ArrowDown aria-hidden="true" /></HeritageLink>
                <HeritageLink href={heritageHref(contact.action.href)} aria-describedby="contact-hero-email-note">{contact.action.label}<ArrowUpRight aria-hidden="true" /></HeritageLink>
              </div>
              <p id="contact-hero-email-note" className="htg-contact-note">{contact.action.label}：{contact.action.description}</p>
              {businessEmail && <p className="htg-contact-email">商務 Email：{businessEmail}</p>}
              <HeritageLink href={heritageHref(hero.secondaryCta.href)}>{hero.secondaryCta.label}<ArrowUpRight aria-hidden="true" /></HeritageLink>
            </div>
            <aside className="htg-hero-aside" aria-label="聯絡頁導讀">
              <HeritageBadge>需求整理 · 自行寄信</HeritageBadge>
              <p lang="en">{site.name}</p>
              <p lang="en">{site.slogan}</p>
              <nav aria-label="聯絡頁章節" className="htg-contact-links">
                <HeritageLink href="#contact-form">01 · 整理詢問內容</HeritageLink>
                <HeritageLink href="#contact-channels">02 · 商務聯絡管道</HeritageLink>
                <HeritageLink href="#contact-preparation">03 · 準備專案需求</HeritageLink>
              </nav>
            </aside>
          </div>
        </div>
      </section>

      <HeritageSection id="contact-form" eyebrow="PROJECT INQUIRY" title={contact.inquiry.title} description={contact.inquiry.description} variant="surface">
        <div className="htg-contact-grid">
          <ContactInquiryForm key={scope.remountKey} styleId="heritage" />
          <aside className="htg-contact-note" aria-labelledby="heritage-contact-memory-title">
            <h3 id="heritage-contact-memory-title">填寫內容只留在這一頁</h3>
            <p>切換設計系列或離開本頁時，填寫內容與草稿會清除，不會帶往 Modern 或其他頁面。需要保留時，請先自行複製。</p>
            <HeritageLink href="#contact-data-note">分享資訊前的提醒<ArrowDown aria-hidden="true" /></HeritageLink>
          </aside>
        </div>
      </HeritageSection>

      <HeritageSection id="contact-channels" eyebrow="CONTACT CHANNELS" title={channels.title} description={channels.description} data-contact-availability={contact.availability}>
        {contact.availability === "channels-only" ? (
          <ul className="htg-contact-grid">
            {contact.channels.map((channel) => {
              const isEmail = channel.href.startsWith("mailto:");
              const Icon = isEmail ? Mail : Globe;
              const destination = isEmail ? new URL(channel.href).pathname : channel.href;
              return (
                <li key={channel.href} className="htg-contact-channel">
                  <p className="htg-eyebrow">{isEmail ? "商務詢問信箱" : "已確認聯絡管道"}</p>
                  <a href={createInquiryHref(channel.href)} className="htg-link"><Icon aria-hidden="true" /><span>{channel.label}</span><ArrowUpRight aria-hidden="true" /></a>
                  <p className="htg-contact-email">{destination}</p>
                  {isEmail && <ContactCopyEmail email={destination} />}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="htg-contact-note">
            <h3>{channels.emptyTitle}</h3>
            <p>{channels.emptyDescription}</p>
            <div className="htg-contact-links">{channels.fallbackLinks.map((link) => <HeritageLink key={link.href} href={heritageHref(link.href)}>{link.label}<ArrowUpRight aria-hidden="true" /></HeritageLink>)}</div>
          </div>
        )}
      </HeritageSection>

      <HeritageSection id="contact-preparation" eyebrow="PREPARE YOUR REQUIREMENTS" title={preparation.title} description={preparation.description} variant="surface">
        <ol className="htg-contact-steps">
          {preparation.items.map((item, index) => <li key={item.title}><span className="htg-eyebrow" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}
        </ol>
        <nav aria-label={preparation.servicesLabel} className="htg-contact-note">
          <h3>{preparation.servicesLabel}</h3>
          <ul className="htg-contact-links">{contact.serviceLinks.map((service) => <li key={service.id}><HeritageLink href={heritageHref(service.href)}>{service.label}<ArrowUpRight aria-hidden="true" /></HeritageLink></li>)}</ul>
        </nav>
      </HeritageSection>

      <HeritageSection id="contact-process" eyebrow="DISCUSSING THE NEXT STEP" title={process.title} description={process.description}>
        <ol className="htg-contact-steps">
          {process.steps.map((step, index) => <li key={step.title}><span className="htg-eyebrow" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
        </ol>
      </HeritageSection>

      <HeritageSection id="contact-data-note" eyebrow="BEFORE SHARING INFORMATION" title={dataNote.title} description={dataNote.description} variant="surface">
        <HeritageList items={dataNote.notes} />
      </HeritageSection>

      <HeritageSection id="contact-next-step" eyebrow="EXPLORE XK" title={cta.title} description={cta.description}>
        <div className="htg-contact-links">{cta.links.map((link, index) => <HeritageLink key={link.href} href={heritageHref(link.href)} primary={index === 0}>{link.label}<ArrowUpRight aria-hidden="true" /></HeritageLink>)}</div>
        <Link href="/contact" className="htg-link">返回 Modern 聯絡頁（不攜帶填寫內容）<ArrowUpRight aria-hidden="true" /></Link>
      </HeritageSection>
    </div>
  );
}
