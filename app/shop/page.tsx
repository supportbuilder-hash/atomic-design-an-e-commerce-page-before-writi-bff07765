"use client";

// Shop page: real content lives here directly (merged from the former view.tsx).
// Copy comes from messages catalog "shop" namespace; layout variant, images and
// product slugs come from content/pages.json "shop".
import { useTranslations } from "next-intl";
import ProductGrid from "@/components/blocks/ProductGrid";
import { Section } from "@/components/blocks/shared";
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
  const products = list<Product>(t.raw("products")).map((prod, i) => {
    const slot = "products." + i;
    return {
      name: prod.name,
      price: prod.price,
      description: prod.description,
      badge: prod.badge,
      image: p.image(slot, prod.name),
      href: p.slugs[i] ? "/shop/" + p.slugs[i] : "/shop",
      ctaLabel: t("viewLabel"),
    };
  });

  return (
    <main>
      <Section compact className="bg-muted/40">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("hero.eyebrow")}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{t("hero.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("hero.subtitle")}</p>
        </div>
      </Section>
      <ProductGrid id="products" products={products} columns={l.columns} variant={l.products} />
    </main>
  );
}
