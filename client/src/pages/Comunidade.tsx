import { Link } from "wouter";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Breadcrumb from "@/components/Breadcrumb";
import { HERO_IMAGES } from "@/lib/sections";
import { MessageSquare, Palette, Server, ArrowRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const communityLinks = [
  {
    icon: MessageSquare,
    title: "Fórum de Discussão",
    description: "Participe de discussões sobre mitologia, cultura viking, jogos e muito mais. Compartilhe conhecimento e aprenda com a comunidade.",
    href: "/comunidade/forum",
    cta: "Acessar Fórum",
  },
  {
    icon: Palette,
    title: "Artes da Comunidade",
    description: "Galeria de ilustrações, pinturas digitais e criações artísticas inspiradas no universo nórdico, feitas por membros da comunidade.",
    href: "/comunidade/artes",
    cta: "Ver Galeria",
  },
  {
    icon: Server,
    title: "Servidores de Jogos",
    description: "Encontre servidores brasileiros de Valheim, Tribes of Midgard e outros jogos com temática nórdica para jogar com a comunidade.",
    href: "/comunidade/servidores",
    cta: "Ver Servidores",
  },
];

export default function Comunidade() {
  useDocumentTitle("Comunidade");
  return (
    <>
      <HeroSection
        title="Comunidade"
        subtitle="Conecte-se com outros entusiastas da mitologia nórdica"
        image={HERO_IMAGES.comunidade}
        compact
      />
      <div className="container py-10">
        <Breadcrumb items={[{ label: "Comunidade" }]} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityLinks.map((link, i) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={link.href} className="block group h-full">
                <div className="card-norse p-6 h-full flex flex-col">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-4 group-hover:border-gold group-hover:bg-gold/10 transition-all">
                    <link.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-gold transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                    {link.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-gold">
                    {link.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
