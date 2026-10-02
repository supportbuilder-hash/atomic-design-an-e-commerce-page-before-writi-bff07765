"use client";

// KIT PAGE (ecommerce) — FIXED FILE, do not edit. Copy: messages/<locale>.json "shop.*";
// layout variant + images + product slugs: content/pages.json "shop".
import { useTranslations } from "next-intl";
import ProductGrid from "@/components/blocks/ProductGrid";
import { Section, SectionHeader } from "@/components/blocks/shared";
import { list, pageData, type Product } from "@/lib/content";

const LAYOUTS = {
  a: { products: "default", columns: 3 },
  b: { products: "overlay", columns: 4 },
  c: { products: "default", columns: 4 },
} as const;

export default function ShopPage() {
  const t = useTranslations("shop");
  const p = pageData("shop");
  const l = LAYOUTS[p.variant];
  const products = list<Product>(t.raw("products")).map((prod, i) => ({
    name: prod.name,
    price: prod.price,
    description: prod.description,
    badge: prod.badge,
    image: p.image(`products.${i}`, prod.name),
    href: p.slugs[i] ? `/shop/${p.slugs[i]}` : "/shop",
    ctaLabel: t("viewLabel"),
  }));
  return (
    <main>
      <Section compact className="bg-muted/40">
        <SectionHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
      </Section>
      <ProductGrid id="products" products={products} columns={l.columns} variant={l.products} />
    </main>
  );
}
