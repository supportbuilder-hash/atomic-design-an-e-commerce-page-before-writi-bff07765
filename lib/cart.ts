"use client";

// FIXED FILE (starter kit) — do not edit. Tiny localStorage cart shared by the
// product and cart pages (no backend). Lines reference products by slug.
import { useEffect, useState } from "react";

export type CartLine = { slug: string; qty: number };

const KEY = "kit_cart";
const EVENT = "kit-cart-change";

function read(): CartLine[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw)
      ? raw.filter((l): l is CartLine => !!l && typeof l.slug === "string" && typeof l.qty === "number")
      : [];
  } catch {
    return [];
  }
}

function write(lines: CartLine[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function addToCart(slug: string): void {
  const cur = read();
  const hit = cur.some((l) => l.slug === slug);
  write(hit ? cur.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l)) : [...cur, { slug, qty: 1 }]);
}

export function removeFromCart(slug: string): void {
  write(read().filter((l) => l.slug !== slug));
}

export function useCart(): CartLine[] {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    const sync = () => setLines(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return lines;
}

/** "$1,299.00" / "12,50 €" -> 1299 / 12.5 (0 when unparseable). */
export function parsePrice(price: string): number {
  const digits = price.replace(/[^0-9.,]/g, "");
  const normalized = /,\d{2}$/.test(digits) ? digits.replace(/\./g, "").replace(",", ".") : digits.replace(/,/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

/** Formats `amount` like `sample` (keeps its currency symbol / position). */
export function formatLike(sample: string, amount: number): string {
  const m = sample.match(/[\d.,]+/);
  return m ? sample.replace(m[0], amount.toFixed(2)) : amount.toFixed(2);
}
