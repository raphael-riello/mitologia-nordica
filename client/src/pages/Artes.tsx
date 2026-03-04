import { useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCard from "@/components/ContentCard";
import { HERO_IMAGES } from "@/lib/sections";
import { getContentBySectionAndCategory } from "@/lib/content";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Artes() {
  useDocumentTitle("Artes da Comunidade");
  const artes = useMemo(() => getContentBySectionAndCategory("comunidade", "artes"), []);

  return (
    <>
      <HeroSection
        title="Artes da Comunidade"
        subtitle="Galeria de ilustrações, pinturas e criações artísticas inspiradas na mitologia nórdica"
        image={HERO_IMAGES.comunidade}
        compact
      />
      <div className="container py-10">
        <Breadcrumb
          items={[
            { label: "Comunidade", href: "/comunidade" },
            { label: "Artes" },
          ]}
        />

        {artes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artes.map((item, i) => (
              <ContentCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🎨</span>
            <p className="font-display text-lg text-muted-foreground">
              Nenhuma arte publicada ainda
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Em breve a comunidade poderá enviar suas criações
            </p>
          </div>
        )}
      </div>
    </>
  );
}
