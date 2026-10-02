"use client";

// FIXED FILE (starter kit) — do not edit. Product detail view for app/shop/[slug].
import { Check } from 'lucide-react';
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BlockImg } from "@/components/blocks/shared";
import SiteLink from "@/components/SiteLink";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { list, pageData, slugIndex, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

const LAYOUTS = {
  a: "md:grid-cols-2",
  b: "md:grid-cols-2 md:[&>*:first-child]:order-2",
  c: "md:grid-cols-[3fr_2fr]",
} as const;

export default function ProductView({ slug }: { slug: string }) {
  const t = useTranslations("product");
  const tShop = useTranslations("shop");
  const shop = pageData("shop");
  const idx = slugIndex("shop", slug);
  const product = list<Product>(tShop.raw("products"))[idx];
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg text-muted-foreground">{t("notFound")}</p>
        <SiteLink href="/shop" className={buttonVariants({ variant: "outline", className: "mt-6" })}>
          {t("backToShop")}
        </SiteLink>
      </main>
    );
  }

  const image = shop.image(`products.${idx}`, product.name);
  const details = list<string>(product.details);
  return (
    <main className="bg-background text-foreground">
      <Reveal className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SiteLink href="/shop" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; {t("backToShop")}
        </SiteLink>
        <div className={cn("mt-8 grid items-start gap-12", LAYOUTS[pageData("product").variant])}>
          <div className="overflow-hidden rounded-lg bg-muted">
            {image && <BlockImg image={image} eager className="aspect-square w-full" />}
          </div>
          <div>
            {product.badge && <Badge className="mb-4">{product.badge}</Badge>}
            <h1 className="font-display text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold text-primary">{product.price}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.description}</p>
            <Button
              size="lg"
              className="mt-8 w-full sm:w-auto"
              onClick={() => {
                addToCart(slug);
                setAdded(true);
              }}
            >
              {added ? t("added") : t("addToCart")}
            </Button>
            {added && (
              <SiteLink href="/cart" className={buttonVariants({ variant: "link", className: "ml-2" })}>
                {t("viewCart")}
              </SiteLink>
            )}
            {details.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-lg font-semibold">{t("detailsTitle")}</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {details.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-8 text-sm text-muted-foreground">{t("shippingNote")}</p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
