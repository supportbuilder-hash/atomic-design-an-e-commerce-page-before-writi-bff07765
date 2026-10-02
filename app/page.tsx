"use client";

// Home page: real content lives here directly (merged from the former view.tsx) so the
// route is self-contained. Copy comes from messages catalog "home" namespace (products
// from "shop.products"); layout variant and images come from content/pages.json.
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import ProductGrid from "@/components/blocks/ProductGrid";
import Testimonials, { type TestimonialItem } from "@/components/blocks/Testimonials";
import { list, pageData, type Feature, type Product } from "@/lib/content";
import { primaryCta } from "@/lib/data";

const LAYOUTS = {
  a: { hero: "mesh", products: "default", columns: 4, perks: "minimal", testimonials: "glass", cta: "gradient" },
  b: { hero: "background", products: "overlay", columns: 4, perks: "glass", testimonials: "single", cta: "split" },
  c: { hero: "centered", products: "default", columns: 3, perks: "list", testimonials: "masonry", cta: "card" },
} as const;

export default function HomePage() {
  const t = useTranslations("home");
  const tShop = useTranslations("shop");
  const p = pageData("home");
  const shop = pageData("shop");
  const l = LAYOUTS[p.variant];
  const heroImage = p.image("hero", t("hero.title"));
  const products = list<Product>(tShop.raw("products"))
    .slice(0, l.columns)
    .map((prod, i) => {
      const slot = "products." + i;
      return {
        name: prod.name,
        price: prod.price,
        description: prod.description,
        badge: prod.badge,
        image: shop.image(slot, prod.name),
        href: shop.slugs[i] ? "/shop/" + shop.slugs[i] : "/shop",
        ctaLabel: tShop("viewLabel"),
      };
    });
  return (
    <main>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={{ label: t("hero.cta"), href: "/shop" }}
        secondaryCta={{ label: t("hero.secondaryCta"), href: "/about" }}
        image={heroImage}
        variant={l.hero}
      />
      <ProductGrid
        eyebrow={t("featured.eyebrow")}
        title={t("featured.title")}
        subtitle={t("featured.subtitle")}
        products={products}
        columns={l.columns}
        variant={l.products}
      />
      <FeatureGrid
        eyebrow={t("perks.eyebrow")}
        title={t("perks.title")}
        subtitle={t("perks.subtitle")}
        items={list<Feature>(t.raw("perks.items"))}
        variant={l.perks}
      />
      <Testimonials
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        items={list<TestimonialItem>(t.raw("testimonials.items"))}
        variant={l.testimonials}
      />
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
