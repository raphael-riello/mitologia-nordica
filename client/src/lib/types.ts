export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  section: string;
  date: string;
  cover: string;
  tags: string[];
  content: string;
  author?: string;
  rating?: number;
  platform?: string;
  players?: string;
  genre?: string;
  year?: number;
}

export interface SectionConfig {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  categories: CategoryConfig[];
}

export type SubcategoryConfig = {
  slug: string;
  title: string;
};

export type CategoryConfig = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  subcategories?: SubcategoryConfig[];
}

export type Section = "historias" | "glossario" | "jogos" | "conteudo" | "comunidade";
