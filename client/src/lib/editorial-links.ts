import { allContent } from "./content";
import { contentPath } from "./paths";
import type { ContentItem } from "./types";

// Curated aliases only: no linking ambiguous short names, generic tags, or Tolkien names.
const aliases: Record<string, string[]> = {
  odin: ["Odin", "Óðinn"],
  thor: ["Thor", "Þórr"],
  tyr: ["Tyr", "Týr"],
  heimdall: ["Heimdall", "Heimdallr"],
  hermod: ["Hermód", "Hermóðr"],
  iduna: ["Idun", "Iduna", "Iðunn"],
  njord: ["Njord", "Njörðr"],
  freyr: ["Freyr"],
  freya: ["Freyja", "Freya"],
  kvasir: ["Kvasir"],
  ymir: ["Ymir"],
  surtr: ["Surtr", "Surtur"],
  thrym: ["Thrym", "Þrymr"],
  skadi: ["Skadi", "Skaði"],
  "utgard-loki": ["Utgard-Loki", "Útgarða-Loki"],
  hymir: ["Hymir"],
  angrboda: ["Angrboda", "Angrboða"],
  gerd: ["Gerd", "Gerðr"],
  thiazi: ["Thiazi", "Þjazi"],
  aegir: ["Aegir", "Ægir"],
  fenrir: ["Fenrir"],
  jormungandr: ["Jormungandr", "Jörmungandr"],
  bestla: ["Bestla"],
  gunnlod: ["Gunnlod", "Gunnlöð"],
  hyrrokkin: ["Hyrrokkin"],
  jarnsaxa: ["Járnsaxa", "Jarnsaxa"],
  aurboda: ["Aurboða", "Aurboda"],
  nidhogg: ["Níðhöggr", "Nidhogg"],
  garm: ["Garmr", "Garm"],
  sleipnir: ["Sleipnir"],
  "huginn-e-muninn": ["Huginn e Muninn"],
  "skoll-e-hati": ["Sköll e Hati", "Skoll e Hati"],
  ratatosk: ["Ratatosk", "Ratatöskr"],
  audumla: ["Auðhumla", "Audumla"],
  gullinbursti: ["Gullinbursti"],
  heidrun: ["Heiðrún", "Heidrun"],
  eikthyrnir: ["Eikþyrnir", "Eikthyrnir"],
  asgard: ["Asgard", "Ásgarðr"],
  midgard: ["Midgard", "Miðgarðr"],
  jotunheim: ["Jotunheim", "Jötunheim"],
  muspelheim: ["Muspelheim"],
  niflheim: ["Niflheim"],
  vanaheim: ["Vanaheim"],
  alfheim: ["Alfheim"],
  svartalfheim: ["Svartalfheim"],
  helheim: ["Helheim"],
  fafnir: ["Fáfnir", "Fafnir"],
  andvari: ["Andvari"],
  brokkr: ["Brokkr"],
  eitri: ["Eitri", "Sindri"],
  reginn: ["Reginn"],
  hreidmar: ["Hreiðmarr", "Hreidmar"],
  sigurd: ["Sigurd", "Sigurðr"],
  "ragnarok-o-crepusculo-dos-deuses": ["Ragnarök", "Ragnarok"],
};
const entries = Object.entries(aliases)
  .flatMap(([slug, names]) => {
    const item = allContent.find((x) => x.slug === slug);
    if (!item) throw new Error(`Missing editorial link target: ${slug}`);
    return names.map((name) => ({ name, item }));
  })
  .sort((a, b) => b.name.length - a.name.length);
const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = new RegExp(
  `(?<![\\p{L}\\p{N}-])(${entries.map((x) => escapeRegex(x.name)).join("|")})(?![\\p{L}\\p{N}-])`,
  "gu",
);
const byName = new Map(entries.map((x) => [x.name, x.item]));
type Node = { type: string; value?: string; url?: string; children?: Node[] };
const ignored = new Set([
  "link",
  "linkReference",
  "image",
  "imageReference",
  "code",
  "inlineCode",
  "html",
  "heading",
]);
export function contextualLinks(item: ContentItem) {
  const seen = new Set<string>([contentPath(item)]);
  const used: ContentItem[] = [];
  const transform = (node: Node) => {
    if (ignored.has(node.type) || !node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type !== "text" || !child.value) {
        transform(child);
        return [child];
      }
      const out: Node[] = [];
      let cursor = 0;
      for (const match of child.value.matchAll(pattern)) {
        const target = byName.get(match[0])!;
        const url = contentPath(target);
        if (seen.has(url) || used.length >= 8) continue;
        out.push({
          type: "text",
          value: child.value.slice(cursor, match.index),
        });
        out.push({
          type: "link",
          url,
          children: [{ type: "text", value: match[0] }],
        });
        seen.add(url);
        used.push(target);
        cursor = match.index! + match[0].length;
      }
      out.push({ type: "text", value: child.value.slice(cursor) });
      return out;
    });
  };
  // Reserve existing destinations, never nest or duplicate an editorial hyperlink.
  for (const match of item.content.matchAll(/\]\((\/[^\s)]+)\)/g))
    seen.add(match[1]);
  return {
    plugin: () => (tree: Node) => {
      seen.clear();
      seen.add(contentPath(item));
      used.length = 0;
      for (const match of item.content.matchAll(/\]\((\/[^\s)]+)\)/g))
        seen.add(match[1]);
      transform(tree);
    },
    used,
  };
}
export function mentionedItems(item: ContentItem): ContentItem[] {
  const found = new Map<string, ContentItem>();
  for (const match of item.content.matchAll(pattern)) {
    const target = byName.get(match[0])!;
    if (target.slug !== item.slug) found.set(target.slug, target);
  }
  return [...found.values()].slice(0, 8);
}
export function relatedContent(item: ContentItem) {
  const mentions = mentionedItems(item);
  const scores = allContent
    .filter((x) => x.slug !== item.slug)
    .map((candidate) => {
      let score = mentions.some((x) => x.slug === candidate.slug) ? 20 : 0;
      score += mentionedItems(candidate).some((x) => x.slug === item.slug)
        ? 10
        : 0;
      score += candidate.tags.filter((t) => item.tags.includes(t)).length;
      score +=
        candidate.section === item.section &&
        candidate.category === item.category
          ? 2
          : 0;
      return { candidate, score };
    });
  return scores
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.candidate);
}
