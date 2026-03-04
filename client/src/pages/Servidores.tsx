import { useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCard from "@/components/ContentCard";
import { HERO_IMAGES } from "@/lib/sections";
import { getContentBySectionAndCategory } from "@/lib/content";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Servidores() {
  useDocumentTitle("Servidores de Jogos");
  const servidores = useMemo(() => getContentBySectionAndCategory("comunidade", "servidores"), []);

  return (
    <>
      <HeroSection
        title="Servidores"
        subtitle="Servidores de jogos nórdicos mantidos pela comunidade — Valheim, Tribes of Midgard e mais"
        image={HERO_IMAGES.jogos}
        compact
      />
      <div className="container py-10">
        <Breadcrumb
          items={[
            { label: "Comunidade", href: "/comunidade" },
            { label: "Servidores" },
          ]}
        />

        {servidores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servidores.map((item, i) => (
              <ContentCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🖥️</span>
            <p className="font-display text-lg text-muted-foreground">
              Nenhum servidor listado ainda
            </p>
          </div>
        )}
      </div>
    </>
  );
}
