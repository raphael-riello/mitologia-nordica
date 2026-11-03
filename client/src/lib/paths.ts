import type { ContentItem } from "./types";
export const SITE_URL = "https://www.mitologianordica.com.br";
export function contentPath(item: ContentItem) {
  return ["", item.section, item.category, item.subcategory, item.slug]
    .filter((x) => x !== undefined)
    .join("/");
}
export function categoryPath(
  section: string,
  category?: string,
  subcategory?: string,
) {
  if (!category || category === "todos") return `/${section}`;
  return ["", section, category, subcategory]
    .filter((x) => x !== undefined)
    .join("/");
}
