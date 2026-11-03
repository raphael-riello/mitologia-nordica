import { useState, useMemo, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { categoryPath } from "@/lib/paths";
import { getSectionBySlug } from "@/lib/sections";
import { getContentBySection, getContentBySectionAndCategory } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCard from "@/components/ContentCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 9;

interface SectionListingProps {
  sectionSlug: string;
  categorySlug?: string;
  subcategorySlug?: string;
}

export default function SectionListing({ sectionSlug, categorySlug, subcategorySlug }: SectionListingProps) {
  const section = getSectionBySlug(sectionSlug);
  const search = useSearch();

  const urlParams = useMemo(() => new URLSearchParams(search), [search]);

  const category = section?.categories.find((item) => item.slug === (categorySlug || urlParams.get("categoria")));
  const activeCategory = category?.slug || "todos";
  const activeSubcategory = category?.subcategories?.find(
    (item) => item.slug === (subcategorySlug || urlParams.get("subcategoria"))
  )?.slug;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [sectionSlug, activeCategory, activeSubcategory]);


  if (!section) return null;

  const allItems =
    activeCategory === "todos"
      ? getContentBySection(sectionSlug)
      : getContentBySectionAndCategory(sectionSlug, activeCategory, activeSubcategory);

  const filteredItems = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allItems;

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <HeroSection
        title={category?.subcategories?.find(s=>s.slug===activeSubcategory)?.title || category?.title || section.title}
        subtitle={category?.description || section.description}
        image={section.heroImage}
      />

      <section className="container py-10">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: section.title },
          ]}
        />

        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <nav aria-label="Categorias" className="flex flex-wrap gap-2">
              {[{slug:"todos",title:"Todos"}, ...section.categories.filter(c=>c.slug!=="todos")].map(cat=><Link
                key={cat.slug} href={categoryPath(sectionSlug,cat.slug)} aria-current={activeCategory===cat.slug?"page":undefined}
                className={`px-4 py-2 font-display text-xs uppercase tracking-widest border ${activeCategory===cat.slug?"border-gold bg-gold text-black":"border-border text-muted-foreground hover:text-gold"}`}>{cat.title}</Link>)}
            </nav>

            <SearchBar
              inline
              placeholder="Buscar nesta seleção..."
              onFilter={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
          </div>

          {!!category?.subcategories?.length && (
            <fieldset className="border border-border rounded-xl p-4">
              <legend className="px-2 font-display text-xs uppercase tracking-widest text-gold">
                Filtrar {category.title}
              </legend>
              <div className="flex flex-wrap gap-2">
                {[{ slug: "", title: "Todos" }, ...category.subcategories].map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={categoryPath(sectionSlug,activeCategory,subcategory.slug || undefined)}
                    aria-current={(activeSubcategory || "") === subcategory.slug ? "page" : undefined}
                    className={`px-4 py-2 font-display text-xs uppercase tracking-widest border rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                      (activeSubcategory || "") === subcategory.slug
                        ? "border-gold bg-gold text-black"
                        : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                  >
                    {subcategory.title}
                  </Link>
                ))}
              </div>
            </fieldset>
          )}

          <p className="text-sm text-muted-foreground" role="status">
            {filteredItems.length} {filteredItems.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}
          </p>
          <p className="text-sm text-muted-foreground">Consulte o <Link href="/indice" className="text-gold underline">índice completo por tema</Link> e as <Link href="/fontes" className="text-gold underline">fontes dos relatos nórdicos</Link>.</p>

          {paginatedItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((item, i) => (
                  <ContentCard key={item.slug} item={item} index={i} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="py-20 text-center border border-border rounded-2xl bg-card/30">
              <span className="text-6xl block mb-4">ᚱ</span>
              <h2 className="font-display text-2xl text-foreground mb-2">
                Nenhum conteúdo encontrado
              </h2>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou a busca
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
