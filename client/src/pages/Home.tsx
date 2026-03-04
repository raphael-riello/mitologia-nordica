import { Link } from "wouter";
import { motion } from "framer-motion";
import { HERO_IMAGES, sections } from "@/lib/sections";
import { allContent } from "@/lib/content";
import ContentCard from "@/components/ContentCard";
import SearchBar from "@/components/SearchBar";
import { ArrowRight } from "lucide-react";

const recentContent = allContent.slice(0, 6);

const sectionHighlights = sections.slice(0, 4);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGES.main}
            alt="Yggdrasil, a Árvore do Mundo"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>
        <div className="relative h-full container flex flex-col justify-end pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-display text-xs uppercase tracking-[0.3em] text-gold">
                Portal dos Nove Mundos
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-4">
              Mitologia
              <br />
              <span className="text-gold text-gold-glow">Nórdica</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Explore as sagas ancestrais, os deuses poderosos e as criaturas míticas
              que moldaram a cosmovisão dos povos nórdicos.
            </p>
            <div className="max-w-md">
              <SearchBar placeholder="Buscar deuses, histórias, criaturas..." />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="container py-16 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-gold" />
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-gold">
            Explorar
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectionHighlights.map((section, i) => (
            <motion.div
              key={section.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/${section.slug}`} className="block group">
                <div className="relative h-48 overflow-hidden border border-border group-hover:border-gold/50 transition-all duration-500">
                  <img
                    src={section.heroImage}
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-lg text-white mb-1 group-hover:text-gold transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-2">{section.description}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Content */}
      <section className="container pb-16 md:pb-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gold" />
            <h2 className="font-display text-xs uppercase tracking-[0.3em] text-gold">
              Conteúdo Recente
            </h2>
            <div className="h-px w-16 bg-border hidden sm:block" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentContent.map((item, i) => (
            <ContentCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGES.comunidade}
            alt="Comunidade Viking"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative container py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              Junte-se à <span className="text-gold">Comunidade</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Participe de discussões, compartilhe suas artes e conecte-se com outros
              entusiastas da mitologia nórdica.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/comunidade/forum"
                className="px-6 py-3 bg-gold text-black font-display text-xs uppercase tracking-widest hover:bg-gold-dark transition-colors"
              >
                Fórum
              </Link>
              <Link
                href="/comunidade/artes"
                className="px-6 py-3 border border-border text-foreground font-display text-xs uppercase tracking-widest hover:border-gold/50 transition-colors"
              >
                Galeria de Artes
              </Link>
              <Link
                href="/comunidade/servidores"
                className="px-6 py-3 border border-border text-foreground font-display text-xs uppercase tracking-widest hover:border-gold/50 transition-colors"
              >
                Servidores
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
