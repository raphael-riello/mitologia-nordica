import { Link } from "wouter";
import type { ContentItem } from "@/lib/types";
import { motion } from "framer-motion";

interface ContentCardProps {
  item: ContentItem;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  const href = `/${item.section}/${item.category}/${item.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={href} className="block group">
        <article className="card-norse h-full flex flex-col">
          <div className="aspect-[16/10] bg-secondary overflow-hidden relative">
            {item.cover ? (
              <img
                src={item.cover}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                <span className="font-display text-4xl text-gold/30">ᚱ</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex gap-2">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-display uppercase tracking-wider px-2 py-0.5 bg-gold/90 text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors duration-300 mb-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
              {item.description}
            </p>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <time className="text-xs text-muted-foreground font-display uppercase tracking-wider">
                {new Date(item.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
              <span className="text-xs text-gold font-display uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                Ler mais →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
