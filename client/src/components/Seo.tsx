import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { pageInfo, safeJson } from "@/lib/seo";
export default function Seo() {
  const [path] = useLocation();
  const search = useSearch();
  useEffect(() => {
    const info = pageInfo(path, search);
    document.title = info.title + " — Mitologia Nórdica";
    const meta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([key, value]) =>
        el!.setAttribute(key, value),
      );
    };
    meta('meta[name="description"]', {
      name: "description",
      content: info.description,
    });
    meta('meta[name="robots"]', {
      name: "robots",
      content: info.indexable
        ? "index,follow,max-image-preview:large"
        : "noindex,follow",
    });
    for (const [property, content] of Object.entries({
      "og:title": info.title,
      "og:description": info.description,
      "og:url": info.canonical,
      "og:image": info.image,
      "og:type": info.item ? "article" : "website",
    }))
      meta(`meta[property="${property}"]`, { property, content });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", info.canonical);
    let script = document.getElementById("page-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "page-schema";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = safeJson(info.schema);
  }, [path, search]);
  return null;
}
