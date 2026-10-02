// FIXED FILE (starter kit) — do not edit. Server-side <title> / meta description for
// kit pages, from the default-locale catalog: "<page>.hero.title" / "<page>.hero.subtitle".
import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

type PageCopy = { hero?: { title?: unknown; subtitle?: unknown } };

const CATALOGS = { en, es } as unknown as Record<string, Record<string, PageCopy | undefined> | undefined>;
const LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en";

export function pageMetadata(id: string): Metadata {
  const hero = (CATALOGS[LOCALE] ?? CATALOGS.en)?.[id]?.hero;
  const title = typeof hero?.title === "string" ? hero.title : "";
  const description = typeof hero?.subtitle === "string" ? hero.subtitle : BRAND.tagline;
  return { title: title && id !== "home" ? `${title} | ${BRAND.name}` : BRAND.name, description };
}
