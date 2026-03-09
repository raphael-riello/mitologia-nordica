import type { SectionConfig } from "./types";

export const HERO_IMAGES = {
  main: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029020766/ZhNJbXi9mFAmjRkZ6fvmTk/hero-main-esHfV9cVshjkFJeAGetwJV.webp",
  historias: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029020766/ZhNJbXi9mFAmjRkZ6fvmTk/hero-historias-htvPSeL8BgBiVmymsYfm7W.webp",
  glossario: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029020766/ZhNJbXi9mFAmjRkZ6fvmTk/hero-glossario-cwwhntUdSGcuhguVBZiTxG.webp",
  jogos: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029020766/ZhNJbXi9mFAmjRkZ6fvmTk/hero-jogos-MFsFdCyPaDHUhdySWP4cTK.webp",
  comunidade: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029020766/ZhNJbXi9mFAmjRkZ6fvmTk/hero-comunidade-SuqrED7egBraBXw6VehRf5.webp",
};

export const sections: SectionConfig[] = [
  {
    slug: "historias",
    title: "Histórias",
    description: "Contos épicos, sagas ancestrais e narrativas dos Nove Mundos",
    heroImage: HERO_IMAGES.historias,
    categories: [
      { slug: "historia-completa", title: "História Completa", description: "Sagas completas da mitologia nórdica", icon: "📜" },
      { slug: "contos-curtos", title: "Contos Curtos", description: "Narrativas breves do universo nórdico", icon: "⚔️" },
      { slug: "contos-infantis", title: "Histórias Infantis", description: "Contos adaptados para jovens exploradores", icon: "🌟" },
    ],
  },

  {
    slug: "glossario",
    title: "Glossário",
    description: "Enciclopédia dos deuses, criaturas e mundos nórdicos",
    heroImage: HERO_IMAGES.glossario,
    categories: [
      {
        slug: "deuses",
        title: "Deuses",
        description: "Os Aesir e Vanir — divindades nórdicas",
        icon: "⚡",
        subcategories: [
          { slug: "aesir", title: "Aesir" },
          { slug: "vanir", title: "Vanir" },
          { slug: "outras-entidades", title: "Outras Entidades" },
        ],
      },

      {
        slug: "criaturas",
        title: "Criaturas",
        description: "Bestas e seres míticos",
        icon: "🐉",
        subcategories: [
          { slug: "gigantes", title: "Gigantes" },
          { slug: "monstros", title: "Monstros" },
          { slug: "espiritos", title: "Espíritos" },
          { slug: "animais-miticos", title: "Animais Míticos" },
          { slug: "anoes", title: "Anões" },
        ],
      },

      { slug: "herois", title: "Heróis", description: "Guerreiros e heróis lendários", icon: "🛡️" },

      { slug: "mundos", title: "Mundos", description: "Os Nove Mundos de Yggdrasil", icon: "🌍" },

      { slug: "runas", title: "Runas", description: "Símbolos sagrados do Elder Futhark", icon: "ᚱ" },
    ],
  },

  {
    slug: "jogos",
    title: "Jogos",
    description: "Games inspirados no universo viking e nórdico",
    heroImage: HERO_IMAGES.jogos,
    categories: [
      { slug: "todos", title: "Todos", description: "Todos os jogos nórdicos", icon: "🎮" },
      { slug: "multiplayer", title: "Multiplayer", description: "Jogos para jogar com amigos", icon: "👥" },
      { slug: "singleplayer", title: "Singleplayer", description: "Aventuras solo épicas", icon: "🗡️" },
      { slug: "novidades", title: "Novidades", description: "Lançamentos e anúncios recentes", icon: "🆕" },
    ],
  },

  {
    slug: "conteudo",
    title: "Conteúdo",
    description: "Livros, filmes, séries e músicas sobre mitologia nórdica",
    heroImage: HERO_IMAGES.historias,
    categories: [
      { slug: "livros", title: "Livros", description: "Obras literárias sobre mitologia nórdica", icon: "📚" },
      { slug: "filmes", title: "Filmes", description: "Filmes com temática viking e nórdica", icon: "🎬" },
      { slug: "series", title: "Séries", description: "Séries de TV sobre vikings e deuses", icon: "📺" },
      { slug: "animes", title: "Animes", description: "Animes inspirados na mitologia nórdica", icon: "🎌" },
      { slug: "musicas", title: "Músicas", description: "Bandas e músicas de temática nórdica", icon: "🎵" },
    ],
  },

  {
    slug: "comunidade",
    title: "Comunidade",
    description: "Conecte-se com outros entusiastas da mitologia nórdica",
    heroImage: HERO_IMAGES.comunidade,
    categories: [
      { slug: "forum", title: "Fórum", description: "Discussões sobre mitologia nórdica", icon: "💬" },
      { slug: "artes", title: "Artes", description: "Galeria de arte da comunidade", icon: "🎨" },
      { slug: "servidores", title: "Servidores", description: "Servidores de jogos nórdicos", icon: "🖥️" },
    ],
  },
];

export function getSectionBySlug(slug: string): SectionConfig | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getCategoryBySlug(sectionSlug: string, categorySlug: string) {
  const section = getSectionBySlug(sectionSlug);
  return section?.categories.find((c) => c.slug === categorySlug);
}

export function getSubcategoryBySlug(
  sectionSlug: string,
  categorySlug: string,
  subcategorySlug: string
) {
  const category = getCategoryBySlug(sectionSlug, categorySlug);
  return category?.subcategories?.find((s) => s.slug === subcategorySlug);
}
