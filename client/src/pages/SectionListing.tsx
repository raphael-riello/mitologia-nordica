import { useState, useMemo, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { getSectionBySlug } from "@/lib/sections";
import { getContentBySection, getContentBySectionAndCategory } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryFilter from "@/components/CategoryFilter";
import ContentCard from "@/components/ContentCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const ITEMS_PER_PAGE = 9;

interface SectionListingProps {
  sectionSlug: string;
}

export default function SectionListing({ sectionSlug }: SectionListingProps) {
  const section = getSectionBySlug(sectionSlug);
  const [, setLocation] = useLocation();
  const search = useSearch();

  const urlParams = useMemo(() => new URLSearchParams(search), [search]);

  const category = section?.categories.find((item) => item.slug === urlParams.get("categoria"));
  const activeCategory = category?.slug || "todos";
  const activeSubcategory = category?.subcategories?.find(
    (item) => item.slug === urlParams.get("subcategoria")
  )?.slug;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [sectionSlug, activeCategory, activeSubcategory]);

  useDocumentTitle(section?.title || "");

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

  function handleCategoryChange(slug: string) {
    setCurrentPage(1);

    if (slug === "todos") {
      setLocation(`/${sectionSlug}`);
    } else {
      setLocation(`/${sectionSlug}?categoria=${slug}`);
    }
  }

  function handleSubcategoryChange(slug?: string) {
    const params = new URLSearchParams({ categoria: activeCategory });
    if (slug) params.set("subcategoria", slug);
    setCurrentPage(1);
    setLocation(`/${sectionSlug}?${params.toString()}`);
  }

  return (
    <>
      <HeroSection
        title={section.title}
        subtitle={section.description}
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
            <CategoryFilter
              categories={section.categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

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
                  <button
                    key={subcategory.slug}
                    type="button"
                    aria-pressed={(activeSubcategory || "") === subcategory.slug}
                    onClick={() => handleSubcategoryChange(subcategory.slug || undefined)}
                    className={`px-4 py-2 font-display text-xs uppercase tracking-widest border rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                      (activeSubcategory || "") === subcategory.slug
                        ? "border-gold bg-gold text-black"
                        : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                  >
                    {subcategory.title}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <p className="text-sm text-muted-foreground" role="status">
            {filteredItems.length} {filteredItems.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}
          </p>

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
