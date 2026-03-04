import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Breadcrumb from "@/components/Breadcrumb";
import { HERO_IMAGES } from "@/lib/sections";
import { MessageSquare, Users, Shield, BookOpen } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const forumCategories = [
  {
    icon: BookOpen,
    title: "Mitologia & Lore",
    description: "Discussões sobre mitos, sagas e interpretações das fontes primárias",
    topics: 142,
    posts: 1893,
  },
  {
    icon: Shield,
    title: "Cultura Viking",
    description: "História, arqueologia, costumes e vida cotidiana dos nórdicos",
    topics: 98,
    posts: 1247,
  },
  {
    icon: MessageSquare,
    title: "Mídia & Entretenimento",
    description: "Filmes, séries, jogos, livros e músicas com temática nórdica",
    topics: 215,
    posts: 3421,
  },
  {
    icon: Users,
    title: "Comunidade Geral",
    description: "Apresentações, off-topic e conversas livres entre membros",
    topics: 67,
    posts: 892,
  },
];

export default function Forum() {
  useDocumentTitle("Fórum de Discussão");
  return (
    <>
      <HeroSection
        title="Fórum de Discussão"
        subtitle="Conecte-se com outros entusiastas da mitologia nórdica"
        image={HERO_IMAGES.comunidade}
        compact
      />
      <div className="container py-10">
        <Breadcrumb
          items={[
            { label: "Comunidade", href: "/comunidade" },
            { label: "Fórum" },
          ]}
        />

        {/* Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gold/30 bg-gold/5 p-6 mb-10"
        >
          <h2 className="font-display text-lg text-gold mb-2">Fórum em Desenvolvimento</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Estamos preparando nosso fórum de discussão com integração ao{" "}
            <strong className="text-foreground">Discourse</strong>. Em breve você poderá criar tópicos,
            participar de discussões e interagir com a comunidade diretamente por aqui.
            Enquanto isso, confira as categorias planejadas abaixo.
          </p>
        </motion.div>

        {/* Categories Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forumCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-norse p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                  <cat.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base text-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground/70 font-display uppercase tracking-wider">
                    <span>{cat.topics} tópicos</span>
                    <span>{cat.posts} posts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Instructions */}
        <div className="mt-12 p-6 bg-secondary border border-border">
          <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-4">
            Instruções para Integração com Discourse
          </h3>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              Para integrar o Discourse ao site, siga os passos:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Instale o Discourse em um subdomínio (ex: <code className="text-gold/80">forum.mitologianordica.com.br</code>)</li>
              <li>Configure o SSO (Single Sign-On) para autenticação unificada</li>
              <li>Utilize a API do Discourse para exibir tópicos recentes nesta página</li>
              <li>Personalize o tema do Discourse para combinar com o design do site</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
