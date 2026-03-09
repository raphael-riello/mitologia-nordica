import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { sections } from "@/lib/sections";
import SearchBar from "./SearchBar";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }, [location]);

  function handleMouseEnter(slug: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(slug);
  }

  function handleMouseLeave() {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-display text-2xl text-gold group-hover:text-gold-light transition-colors">
            ᚱ
          </span>
          <span className="font-display text-lg text-foreground tracking-wide hidden sm:block">
            Mitologia Nórdica
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {sections.map((section) => (
            <div
              key={section.slug}
              className="relative"
              onMouseEnter={() => handleMouseEnter(section.slug)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/${section.slug}`}
                className="flex items-center gap-1 font-display text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
              >
                {section.title}
                <ChevronDown className="w-3 h-3" />
              </Link>

              <AnimatePresence>
                {openDropdown === section.slug && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-3 w-72 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-3"
                    onMouseEnter={() => handleMouseEnter(section.slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mb-2 px-2 py-1">
                      <p className="font-display text-[11px] uppercase tracking-[0.22em] text-gold">
                        {section.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href={`/${section.slug}`}
                        className="flex items-center rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        Ver todos
                      </Link>

                      {section.categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/${section.slug}?categoria=${cat.slug}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.title}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-muted-foreground hover:text-gold transition-colors"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container py-4">
              <SearchBar onSearch={() => {}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container py-4">
              {sections.map((section) => (
                <div key={section.slug} className="border-b border-border/50 last:border-0 py-2">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === section.slug ? null : section.slug)
                    }
                    className="w-full flex items-center justify-between py-2.5 font-display text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {section.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === section.slug ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === section.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-3 pl-2 space-y-1">
                          <Link
                            href={`/${section.slug}`}
                            className="block py-2 text-sm text-foreground hover:text-gold transition-colors"
                          >
                            Ver todos
                          </Link>

                          {section.categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${section.slug}?categoria=${cat.slug}`}
                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <span>{cat.icon}</span>
                              <span>{cat.title}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
