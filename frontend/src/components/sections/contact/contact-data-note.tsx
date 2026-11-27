import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { contactPage } from "@/config/contact-page";

export function ContactDataNote() {
  const { dataNote } = contactPage;

  return (
    <Section id="contact-data-note" background="surface" aria-labelledby="contact-data-note-title" className="border-y">
      <Container>
        <SectionHeading id="contact-data-note-title" eyebrow="BEFORE SHARING INFORMATION" titleLang="zh-TW" title={dataNote.title} description={dataNote.description} />
        <ul className="type-body max-w-4xl space-y-5 text-muted-foreground">
          {dataNote.notes.map((note) => (
            <li key={note} className="flex min-w-0 items-start gap-3">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
              <span className="min-w-0 break-words">{note}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
