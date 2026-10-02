"use client";

// About page: real content lives here directly (merged from the former view.tsx).
// Copy: messages/<locale>.json "about.*"; layout variant + images: content/pages.json "about".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import { Section } from "@/components/blocks/shared";
import StatsBand, { type StatItem } from "@/components/blocks/StatsBand";
import { list, pageData, type Feature } from "@/lib/content";
import { primaryCta } from "@/lib/data";

const LAYOUTS = {
  a: { hero: "mesh", values: "glass", stats: "plain", cta: "gradient" },
  b: { hero: "background", values: "minimal", stats: "primary", cta: "card" },
  c: { hero: "centered", values: "list", stats: "glass", cta: "split" },
} as const;

export default function AboutPage() {
  const t = useTranslations("about");
  const p = pageData("about");
  const l = LAYOUTS[p.variant];
  const heroImage = p.image("hero", t("hero.title"));
  const paragraphs = list<string>(t.raw("story.paragraphs"));
  return (
    <main>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image={heroImage}
        variant={l.hero}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("story.title")}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </Section>
      <FeatureGrid
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        subtitle={t("values.subtitle")}
        items={list<Feature>(t.raw("values.items"))}
        variant={l.values}
      />
      <StatsBand items={list<StatItem>(t.raw("stats"))} variant={l.stats} />
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        image={heroImage}
        variant={l.cta}
      />
    </main>
  );
}
