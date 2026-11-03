import { allContent, getContentBySectionAndCategory } from "./content";
import { sections } from "./sections";
import { contentPath, categoryPath, SITE_URL } from "./paths";
import { furtherReading } from "./references";
import type { ContentItem } from "./types";

export const hubs = sections
  .filter((s) => s.slug !== "comunidade")
  .flatMap((section) =>
    section.categories
      .filter((c) => c.slug !== "todos")
      .flatMap((category) => [
        {
          path: categoryPath(section.slug, category.slug),
          section,
          category,
          subcategory: undefined as { slug: string; title: string } | undefined,
        },
        ...(category.subcategories || []).map((subcategory) => ({
          path: categoryPath(section.slug, category.slug, subcategory.slug),
          section,
          category,
          subcategory,
        })),
      ]),
  );
export function descriptionFor(item: ContentItem) {
  return (
    item.description ||
    item.content
      .replace(/[#*`\[\]]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  ).slice(0, 250);
}
export function pageInfo(pathname: string, search = "") {
  let path = pathname.replace(/\/$/, "") || "/";
  const section = sections.find((s) => "/" + s.slug === path);
  if (section) {
    const q = new URLSearchParams(search);
    const requested = categoryPath(
      section.slug,
      q.get("categoria") || undefined,
      q.get("subcategoria") || undefined,
    );
    if (hubs.some((h) => h.path === requested)) path = requested;
  }
  const item = allContent.find((i) => contentPath(i) === path);
  const hub = hubs.find((h) => h.path === path);
  const title =
    item?.title ||
    (hub
      ? (hub.subcategory?.title || hub.category.title) +
        " — " +
        hub.section.title
      : path === "/fontes"
        ? "Fontes e referências"
        : path === "/indice"
          ? "Índice de conteúdos"
          : section?.title ||
            (path === "/"
              ? "Mitologia Nórdica Brasil"
              : path.startsWith("/comunidade/")
                ? "Comunidade — " + path.split("/").pop()
                : "Página não encontrada"));
  const description = item
    ? descriptionFor(item)
    : hub
      ? `Explore ${hub.subcategory?.title || hub.category.title} na mitologia nórdica: verbetes, histórias e conexões para continuar sua leitura.`
      : path === "/fontes"
        ? "Consulte as Eddas, conheça as edições e veja como distinguir relatos medievais, interpretações e adaptações."
        : path === "/indice"
          ? "Encontre todos os conteúdos do portal organizados por tema, com links diretos para cada página."
          : section?.description ||
            "Explore histórias, deuses, criaturas e mundos da mitologia nórdica.";
  const canonical = SITE_URL + path;
  const image =
    item?.cover ||
    hub?.section.heroImage ||
    section?.heroImage ||
    "/images/heroes/main.png";
  const citations = item
    ? [
        ...new Set([
          ...[...item.content.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)].map(
            (m) => m[1],
          ),
          ...furtherReading(item.slug).map((r) => r.url),
        ]),
      ]
    : [];
  const crumbs: { name: string; item: string }[] = [
    { name: "Início", item: SITE_URL + "/" },
  ];
  if (item) {
    const s = sections.find((s) => s.slug === item.section);
    const c = s?.categories.find((c) => c.slug === item.category);
    crumbs.push({
      name: s?.title || item.section,
      item: SITE_URL + "/" + item.section,
    });
    if (hubs.some((h) => h.path === categoryPath(item.section, item.category)))
      crumbs.push({
        name: c?.title || item.category,
        item: SITE_URL + categoryPath(item.section, item.category),
      });
    if (
      item.subcategory &&
      hubs.some(
        (h) =>
          h.path ===
          categoryPath(item.section, item.category, item.subcategory),
      )
    )
      crumbs.push({
        name:
          c?.subcategories?.find((s) => s.slug === item.subcategory)?.title ||
          item.subcategory,
        item:
          SITE_URL +
          categoryPath(item.section, item.category, item.subcategory),
      });
  }
  if (path !== "/") crumbs.push({ name: title, item: canonical });
  const schema: object[] = [
    {
      "@context": "https://schema.org",
      "@type": item
        ? "Article"
        : path === "/"
          ? "WebSite"
          : path === "/fontes"
            ? "WebPage"
            : "CollectionPage",
      "@id": canonical + "#page",
      url: canonical,
      ...(item
        ? {
            headline: title,
            datePublished: item.date,
            mainEntityOfPage: canonical,
            articleSection: item.category,
            citation: citations,
            ...(item.author
              ? { author: { "@type": "Person", name: item.author } }
              : {}),
          }
        : { name: title }),
      description,
      inLanguage: "pt-BR",
      image: new URL(image, SITE_URL).href,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...c,
      })),
    },
  ];
  const known =
    !!item ||
    !!hub ||
    !!section ||
    [
      "/",
      "/fontes",
      "/indice",
      "/comunidade/forum",
      "/comunidade/artes",
      "/comunidade/servidores",
    ].includes(path);
  const indexable =
    known &&
    (!hub ||
      getContentBySectionAndCategory(
        hub.section.slug,
        hub.category.slug,
        hub.subcategory?.slug,
      ).length > 0);
  return {
    path,
    title,
    description,
    canonical,
    image: new URL(image, SITE_URL).href,
    schema,
    item,
    known,
    indexable,
  };
}
export const renderPaths = [
  ...new Set([
    "/",
    "/indice",
    "/fontes",
    ...sections.map((s) => "/" + s.slug),
    "/comunidade/forum",
    "/comunidade/artes",
    "/comunidade/servidores",
    ...hubs.map((h) => h.path),
    ...allContent.map(contentPath),
  ]),
];
export const indexablePaths = renderPaths.filter((p) => pageInfo(p).indexable);
export function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
