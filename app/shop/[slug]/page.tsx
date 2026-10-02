// KIT PAGE (ecommerce) — FIXED FILE, do not edit. One page per product slug in
// content/pages.json "shop.slugs"; the view (copy in messages "product.*" + "shop.products").
import ProductView from "@/components/kit/ProductView";
import { pageData } from "@/lib/content";
import { pageMetadata } from "@/lib/kit-meta";

export function generateStaticParams() {
  return pageData("shop").slugs.map((slug) => ({ slug }));
}

export const metadata = pageMetadata("shop");

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductView slug={slug} />;
}
