"use client";

// Contact page: real content lives here directly (merged from the former view.tsx).
// Copy: messages/<locale>.json "contact.*"; layout variant: content/pages.json "contact".
import { useTranslations } from "next-intl";
import ContactForm from "@/components/blocks/ContactForm";
import { Section } from "@/components/blocks/shared";
import { list, pageData, type Detail } from "@/lib/content";

const LAYOUTS = { a: "split", b: "card", c: "simple" } as const;

export default function ContactPage() {
  const t = useTranslations("contact");
  const p = pageData("contact");
  return (
    <main>
      <Section compact className="bg-muted/40">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("hero.eyebrow")}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{t("hero.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("hero.subtitle")}</p>
        </div>
      </Section>
      <ContactForm
        id="contact"
        nameLabel={t("form.nameLabel")}
        emailLabel={t("form.emailLabel")}
        messageLabel={t("form.messageLabel")}
        submitLabel={t("form.submitLabel")}
        successMessage={t("form.successMessage")}
        details={list<Detail>(t.raw("form.details"))}
        variant={LAYOUTS[p.variant]}
      />
    </main>
  );
}
