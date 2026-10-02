"use client";

// KIT PAGE (ecommerce) — FIXED FILE, do not edit. Copy: messages/<locale>.json "cart.*"
// (products: "shop.products"); cart lines: lib/cart.ts (localStorage).
import { useTranslations } from "next-intl";
import { BlockImg, Section, SectionHeader } from "@/components/blocks/shared";
import SiteLink from "@/components/SiteLink";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatLike, parsePrice, removeFromCart, useCart } from "@/lib/cart";
import { list, pageData, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

const LAYOUTS = {
  a: "lg:grid-cols-[2fr_1fr]",
  b: "lg:grid-cols-[3fr_2fr]",
  c: "max-w-3xl mx-auto",
} as const;

export default function CartPage() {
  const t = useTranslations("cart");
  const tShop = useTranslations("shop");
  const shop = pageData("shop");
  const products = list<Product>(tShop.raw("products"));
  const lines = useCart()
    .map((line) => {
      const idx = shop.slugs.indexOf(line.slug);
      const product = products[idx];
      return product ? { ...line, idx, product } : null;
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);
  const sample = lines[0]?.product.price ?? "";
  const subtotal = lines.reduce((sum, l) => sum + parsePrice(l.product.price) * l.qty, 0);

  return (
    <main>
      <Section compact>
        <SectionHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
        {lines.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">{t("empty")}</p>
            <SiteLink href="/shop" className={buttonVariants({ className: "mt-6" })}>
              {t("emptyCta")}
            </SiteLink>
          </div>
        ) : (
          <div className={cn("grid gap-8", LAYOUTS[pageData("cart").variant])}>
            <ul className="divide-y divide-border">
              {lines.map((l) => {
                const image = shop.image(`products.${l.idx}`, l.product.name);
                return (
                  <li key={l.slug} className="flex items-center gap-4 py-4">
                    {image && <BlockImg image={image} className="h-20 w-20 rounded-md" />}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{l.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("quantity")}: {l.qty} &middot; {l.product.price}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(l.slug)}>
                      {t("remove")}
                    </Button>
                  </li>
                );
              })}
            </ul>
            <Card className="h-fit p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span className="text-2xl font-bold">{formatLike(sample, subtotal)}</span>
              </div>
              <Button size="lg" className="mt-6 w-full">
                {t("checkout")}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">{t("checkoutNote")}</p>
            </Card>
          </div>
        )}
      </Section>
    </main>
  );
}
