import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import {
  indexablePaths,
  renderPaths,
  pageInfo,
  safeJson,
} from "../client/src/lib/seo";
import { SITE_URL } from "../client/src/lib/paths";
const out = path.resolve("dist/public");
const template = await fs.readFile(path.join(out, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("Execute vite build antes do prerender: o template já contém HTML renderizado.");
}
const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
  for (const route of [...renderPaths, "/404"]) {
    const info = pageInfo(route);
    let html = template
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escape(info.title)} — Mitologia Nórdica</title>`,
      )
      .replace(
        /<meta name="description"[^>]*>/,
        `<meta name="description" content="${escape(info.description)}" />`,
      )
      .replace(
        /<link rel="canonical"[^>]*>/,
        `<link rel="canonical" href="${escape(info.canonical)}" />`,
      )
      .replace(/<meta property="og:[^"]+"[^>]*>/g, "");
    const head = `<meta name="robots" content="${info.indexable ? "index,follow,max-image-preview:large" : "noindex,follow"}" />
      <meta property="og:title" content="${escape(info.title)}" />
      <meta property="og:description" content="${escape(info.description)}" />
      <meta property="og:url" content="${escape(info.canonical)}" />
      <meta property="og:image" content="${escape(info.image)}" />
      <meta property="og:type" content="${info.item ? "article" : "website"}" />
      <script id="page-schema" type="application/ld+json">${safeJson(info.schema)}</script>`;
    html = html
      .replace("</head>", head + "</head>")
      .replace(
        '<div id="root"></div>',
        () => '<div id="root">' + render(route) + "</div>",
      );
    const destination = path.join(
      out,
      route === "/" ? "index.html" : route.slice(1) + ".html",
    );
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html);
  }
  const urls = indexablePaths.map((route) => {
    return `  <url><loc>${escape(SITE_URL + route)}</loc></url>`;
  });
  // Dates are deliberately omitted: publication date is not evidence of last modification.
  await fs.writeFile(
    path.join(out, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.join("\n") +
      "\n</urlset>\n",
  );
  console.log(
    `Prerender: ${indexablePaths.length} páginas com HTML, canonical e dados estruturados; sitemap atualizado.`,
  );
} finally {
  await server.close();
}
