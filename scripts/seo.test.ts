import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { allContent } from "../client/src/lib/content";
import { contentPath, SITE_URL } from "../client/src/lib/paths";
import { pageInfo, renderPaths, indexablePaths } from "../client/src/lib/seo";
import { contextualLinks } from "../client/src/lib/editorial-links";

test("cada artigo usa seu próprio contexto ao renderizar links", () => {
  for (const item of allContent) {
    const article = html(contentPath(item)).match(/<article\s+class="prose[\s\S]*?<\/article>/)?.[0] || "";
    assert(!article.includes('href="' + contentPath(item) + '"'), "Link para o próprio artigo: " + item.slug);
    const contextual=[...article.matchAll(/href="\/(?:glossario|historias)\//g)];
    assert(contextual.length<=8, "Excesso de links contextuais: "+item.slug);
  }
});

const html = (route: string) =>
  fs.readFileSync(
    "dist/public/" + (route === "/" ? "index" : route.slice(1)) + ".html",
    "utf8",
  );
const decode = (s: string) =>
  s.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
test("links contextuais preservam links existentes, código e nomes parciais", () => {
  const item = allContent.find((x) => x.slug === "sleipnir")!;
  const linker = contextualLinks(item);
  const tree: any = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [{ type: "text", value: "Thor Thorin Odin Odin Sleipnir" }],
      },
      { type: "heading", children: [{ type: "text", value: "Freyja" }] },
      {
        type: "paragraph",
        children: [
          {
            type: "link",
            url: "/fontes",
            children: [{ type: "text", value: "Freyr" }],
          },
          { type: "inlineCode", value: "Ymir" },
        ],
      },
    ],
  };
  linker.plugin()(tree);
  const links = tree.children[0].children.filter((n: any) => n.type === "link");
  assert.deepEqual(
    links.map((n: any) => n.children[0].value),
    ["Thor", "Odin"],
  );
  assert.equal(tree.children[1].children[0].type, "text");
  assert.equal(tree.children[2].children[0].children[0].type, "text");
});
test("URLs antigas de filtros têm a mesma canonical das páginas de tema", () => {
  assert.equal(
    pageInfo("/glossario", "categoria=criaturas&subcategoria=monstros")
      .canonical,
    SITE_URL + "/glossario/criaturas/monstros",
  );
  assert.equal(pageInfo("/nao-existe").indexable, false);
});
test("todos os documentos possuem conteúdo HTML, canonical única e JSON-LD válido", () => {
  for (const route of renderPaths) {
    const body = html(route);
    assert(body.includes("<h1"), route);
    assert.equal((body.match(/rel="canonical"/g) || []).length, 1, route);
    assert(body.includes('href="' + SITE_URL + route + '"'), route);
    const match = body.match(
      /<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    assert(match, route);
    const data = JSON.parse(match[1]);
    assert.equal(data[0].url, SITE_URL + route);
    assert(
      !body.includes('style="opacity:0'),
      "Conteúdo invisível sem JS: " + route,
    );
  }
});
test("grafo de navegação sem destinos internos ausentes e sem artigos órfãos", () => {
  const valid = new Set(renderPaths);
  const graph = new Map<string, string[]>();
  for (const route of renderPaths) {
    const targets = [...html(route).matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)].map(
      (m) => decode(m[1]).split(/[?#]/)[0],
    );
    for (const target of targets)
      assert(valid.has(target), route + " -> " + target);
    graph.set(route, targets);
  }
  const seen = new Set<string>();
  const queue = ["/"];
  while (queue.length) {
    const route = queue.shift()!;
    if (seen.has(route)) continue;
    seen.add(route);
    queue.push(...(graph.get(route) || []).filter((x) => !seen.has(x)));
  }
  for (const item of allContent)
    assert(seen.has(contentPath(item)), "Artigo órfão: " + item.slug);
});
test("índice lista todos os artigos e sitemap corresponde ao catálogo", () => {
  const index = html("/indice");
  const sitemap = fs.readFileSync("dist/public/sitemap.xml", "utf8");
  for (const item of allContent)
    assert(index.includes('href="' + contentPath(item) + '"'), item.slug);
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => m[1],
  );
  assert.equal(new Set(locations).size, locations.length);
  assert.deepEqual(
    locations,
    indexablePaths.map((p) => SITE_URL + p),
  );
  assert(!sitemap.includes("<lastmod>"), "Não inventar data de atualização");
});
test("Sleipnir contém link contextual de Odin no HTML e fontes legíveis", () => {
  const body = html(
    contentPath(allContent.find((x) => x.slug === "sleipnir")!),
  );
  assert.match(
    body,
    /<a[^>]*href="\/glossario\/deuses\/aesir\/odin"[^>]*>Odin<\/a>/,
  );
  assert(body.includes("sacred-texts.com/book/the-prose-edda/gylfaginning"));
  assert(
    !body.includes('target="_blank"'),
    "Links editoriais não devem abrir nova aba",
  );
});
