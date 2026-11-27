import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactInquiryForm } from "@/components/sections/contact/contact-inquiry-form";
import { contactInquiry } from "@/config/contact-inquiry";

export function ContactInquiry() {
  return (
    <Section id="contact-form" background="surface" aria-labelledby="contact-form-title" className="scroll-mt-8">
      <Container>
        <SectionHeading id="contact-form-title" eyebrow="PROJECT INQUIRY" titleLang="zh-TW" title={contactInquiry.title} description={contactInquiry.description} />
        <ContactInquiryForm />
      </Container>
    </Section>
  );
}
