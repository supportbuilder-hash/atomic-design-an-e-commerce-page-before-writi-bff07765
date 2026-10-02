"use client";

// KIT PAGE — FIXED FILE, do not edit. Copy: messages/<locale>.json "contact.*";
// layout variant: content/pages.json "contact".
import { useTranslations } from "next-intl";
import ContactForm from "@/components/blocks/ContactForm";
import { list, pageData, type Detail } from "@/lib/content";

const LAYOUTS = { a: "split", b: "card", c: "simple" } as const;

export default function ContactPage() {
  const t = useTranslations("contact");
  const p = pageData("contact");
  return (
    <main>
      <ContactForm
        id="contact"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
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
