import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";
import { allContent } from "@/lib/content";
import type { ContentItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onFilter?: (query: string) => void;
  inline?: boolean;
}

export default function SearchBar({ placeholder = "Buscar nos Nove Mundos...", className = "", onFilter, inline = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ContentItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(allContent, {
        keys: ["title", "description", "tags", "category"],
        threshold: 0.4,
        includeScore: true,
      }),
    []
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (onFilter) {
      onFilter(value);
      return;
    }
    if (value.trim().length > 1) {
      const res = fuse.search(value).slice(0, 8);
      setResults(res.map((r) => r.item));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }

  function handleSelect(item: ContentItem) {
    setQuery("");
    setIsOpen(false);
    navigate(`/${item.section}/${item.category}/${item.slug}`);
  }

  if (inline) {
    return (
      <div className={`relative ${className}`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
        />
        {query && (
          <button onClick={() => handleChange("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
      />
      {query && (
        <button onClick={() => { setQuery(""); setResults([]); setIsOpen(false); }} className="absolute right-4 top-1/2 -translate-y-1/2">
          <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
        </button>
      )}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border z-50 max-h-96 overflow-y-auto shadow-xl"
          >
            {results.map((item) => (
              <button
                key={`${item.section}-${item.slug}`}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border/50 last:border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</p>
                  </div>
                  <span className="text-[10px] font-display uppercase tracking-widest text-gold/70 shrink-0 mt-1">
                    {item.section}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
