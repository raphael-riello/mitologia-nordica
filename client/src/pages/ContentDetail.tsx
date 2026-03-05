import { useMemo } from "react";
import { useLocation } from "wouter";
import { getContentBySlug, getContentBySectionAndCategory } from "@/lib/content";
import { getSectionBySlug, getCategoryBySlug, getSubcategoryBySlug } from "@/lib/sections";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCard from "@/components/ContentCard";
import { Streamdown } from "streamdown";
import { motion } from "framer-motion";
import { Calendar, Tag, User, Gamepad2, Users } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

interface ContentDetailProps {
  section: string;
  category: string;
  slug: string;
  subcategory?: string;
}

export default function ContentDetail({
  section,
  category,
  slug,
  subcategory,
}: ContentDetailProps) {
  const [, navigate] = useLocation();

  const sectionConfig = getSectionBySlug(section);
  const categoryConfig = getCategoryBySlug(section, category);
  const subcategoryConfig = subcategory
    ? getSubcategoryBySlug(section, category, subcategory)
    : undefined;

  // Busca do item:
  // 1) tenta bater com section + category (+ subcategory) + slug (mais seguro)
  // 2) fallback para section + slug (compatibilidade)
  const item = useMemo(() => {
    const bySectionAndCategory = getContentBySectionAndCategory(section, category);

    const precise = bySectionAndCategory.find((i) => {
      if (i.slug !== slug) return false;

      // se a rota veio com subcategory, o item tem que bater
      if (subcategory) return i.subcategory === subcategory;

      // se a rota não veio com subcategory, aceita item sem subcategory
      // (mantém compatível com o que já existe)
      return !i.subcategory;
    });

    return precise || getContentBySlug(section, slug);
  }, [section, category, subcategory, slug]);

  useDocumentTitle(item?.title || "Não encontrado");

  const relatedItems = useMemo(() => {
    if (!item) return [];

    // começa com a mesma categoria
    let list = getContentBySectionAndCategory(section, category).filter((i) => i.slug !== slug);

    // se estamos dentro de uma subcategory, prioriza relacionados da mesma subcategory
    if (subcategory) {
      const sameSub = list.filter((i) => i.subcategory === subcategory);
      if (sameSub.length > 0) list = sameSub;
    }

    return list.slice(0, 3);
  }, [section, category, subcategory, slug, item]);

  if (!item || !sectionConfig) {
    return (
      <div className="container py-20 text-center">
        <span className="text-6xl block mb-4">ᚱ</span>
        <h1 className="font-display text-2xl text-foreground mb-2">Conteúdo não encontrado</h1>
        <p className="text-muted-foreground mb-6">O item que você procura não existe nos Nove Mundos.</p>
        <button
          onClick={() => navigate(`/${section}`)}
          className="px-6 py-3 bg-gold text-black font-display text-xs uppercase tracking-widest hover:bg-gold-dark transition-colors"
        >
          Voltar para {sectionConfig?.title || "início"}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hero Cover */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        {item.cover ? (
          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>

      <div className="container -mt-24 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb
            items={[
              { label: sectionConfig.title, href: `/${section}` },

              // categoria sempre aparece
              { label: categoryConfig?.title || category, href: `/${section}?categoria=${category}` },

              // se existir subcategory, insere no breadcrumb
              ...(subcategory
                ? [
                    {
                      label: subcategoryConfig?.title || subcategory,
                      href: `/${section}?categoria=${category}&subcategoria=${subcategory}`,
                    },
                  ]
                : []),

              { label: item.title },
            ]}
          />

          <div className="max-w-3xl">
            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-gold-glow mb-6 leading-tight">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold/70" />
                <time>
                  {new Date(item.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              {item.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gold/70" />
                  <span>{item.author}</span>
                </div>
              )}

              {item.platform && (
                <div className="flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4 text-gold/70" />
                  <span>{item.platform}</span>
                </div>
              )}

              {item.players && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gold/70" />
                  <span>{item.players}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-display uppercase tracking-wider border border-border text-muted-foreground"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 border-l-2 border-gold pl-4">
              {item.description}
            </p>

            {/* Content */}
            <article
              className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-foreground prose-headings:tracking-wide
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-gold
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-li:text-muted-foreground
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
              prose-ul:list-disc prose-ol:list-decimal
            "
            >
              <Streamdown>{item.content}</Streamdown>
            </article>
          </div>
        </motion.div>

        {/* Related */}
        {relatedItems.length > 0 && (
          <div className="mt-16 pt-10 border-t border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gold" />
              <h2 className="font-display text-xs uppercase tracking-[0.3em] text-gold">
                Conteúdo Relacionado
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((ri, i) => (
                <ContentCard key={ri.slug} item={ri} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
