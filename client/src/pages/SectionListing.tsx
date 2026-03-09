import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
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
  const [location, setLocation] = useLocation();

  const urlParams = useMemo(
    () => new URLSearchParams(location.split("?")[1] || ""),
    [location]
  );

  const initialCategory = urlParams.get("categoria") || "todos";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cat = urlParams.get("categoria") || "todos";
    setActiveCategory(cat);
    setCurrentPage(1);
  }, [urlParams]);

  useDocumentTitle(section?.title || "");

  if (!section) return null;

  const allItems =
    activeCategory === "todos"
      ? getContentBySection(sectionSlug)
      : getContentBySectionAndCategory(sectionSlug, activeCategory);

  const filteredItems = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allItems;

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    setCurrentPage(1);

    if (slug === "todos") {
      setLocation(`/${sectionSlug}`);
    } else {
      setLocation(`/${sectionSlug}?categoria=${slug}`);
    }
  }

  return (
    <>
      <HeroSection
        title={section.title}
        description={section.description}
        backgroundImage={section.heroImage}
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
              onChange={handleCategoryChange}
            />

            <SearchBar
              onSearch={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
          </div>

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
