// FIXED FILE (starter kit) — do not edit. Typed access to content/pages.json: the
// NON-text data of every kit page (layout variant, image URLs, slugs), keyed by page id.
// All visible copy lives in messages/<locale>.json under the same page id namespace.
import type { BlockImage } from "@/components/blocks/shared";
import data from "@/content/pages.json";

/** Layout variant of a kit page: each page maps it to its blocks' variants. */
export type PageVariant = "a" | "b" | "c";
export type PageData = { variant?: string; images?: Record<string, string>; slugs?: string[] };

// Item shapes of the catalog lists (mirror app/services/kit_service.py schemas).
export type Feature = { title: string; description: string };
export type Dish = { name: string; description: string; price: string; badge?: string };
export type MenuCategory = { name: string; description: string; dishes: unknown };
export type Plan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: unknown;
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
};
export type Product = { name: string; price: string; description: string; badge?: string; details: unknown };
export type Service = { name: string; description: string; duration: string; price: string };
export type Member = { name: string; role: string; bio: string };
export type Project = { title: string; category: string; description: string };
export type Post = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  body: unknown;
};
export type Session = { time: string; title: string; speaker: string; description: string };
export type Detail = { label: string; value: string };

const PAGES = data as Record<string, PageData | undefined>;

/** A catalog list read via t.raw(): arrays, or objects keyed "0","1",… (translatable). */
export function list<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, T>;
    return Object.keys(obj)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => obj[k] as T);
  }
  return [];
}

export function pageData(id: string) {
  const d = PAGES[id] ?? {};
  const variant: PageVariant = d.variant === "b" || d.variant === "c" ? d.variant : "a";
  return {
    variant,
    slugs: Array.isArray(d.slugs) ? d.slugs : [],
    image(slot: string, alt: string): BlockImage | undefined {
      const src = d.images?.[slot];
      return typeof src === "string" && src ? { src, alt } : undefined;
    },
  };
}

/** Index of `slug` in a page's slug list (-1 when unknown). */
export function slugIndex(id: string, slug: string): number {
  return pageData(id).slugs.indexOf(slug);
}
