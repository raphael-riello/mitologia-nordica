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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-gold text-2xl">ᚱ</span>
            <span className="font-display text-sm sm:text-base uppercase tracking-widest text-foreground">
              Mitologia<span className="text-gold"> Nórdica</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {sections.map((section) => (
              <div
                key={section.slug}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/${section.slug}`}
                  className={`flex items-center gap-1 px-3 py-2 font-display text-xs uppercase tracking-widest transition-colors ${
                    location.startsWith(`/${section.slug}`)
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.title}
                  <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === section.slug ? "rotate-180" : ""}`} />
                </Link>
                <AnimatePresence>
                  {openDropdown === section.slug && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-0 w-56 bg-card border border-border shadow-xl"
                      onMouseEnter={() => handleMouseEnter(section.slug)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-1">
                        {section.categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={
                              section.slug === "comunidade"
                                ? `/comunidade/${cat.slug}`
                                : `/${section.slug}?categoria=${cat.slug}`
                            }
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          >
                            <span className="mr-2">{cat.icon}</span>
                            {cat.title}
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
              className="overflow-hidden border-t border-border"
            >
              <div className="py-4">
                <SearchBar />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <nav className="container py-4 space-y-1">
              {sections.map((section) => (
                <div key={section.slug}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === section.slug ? null : section.slug)}
                    className="w-full flex items-center justify-between py-2.5 font-display text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {section.title}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === section.slug ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === section.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 space-y-0.5">
                          <Link
                            href={`/${section.slug}`}
                            className="block py-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                          >
                            Ver todos
                          </Link>
                          {section.categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={
                                section.slug === "comunidade"
                                  ? `/comunidade/${cat.slug}`
                                  : `/${section.slug}?categoria=${cat.slug}`
                              }
                              className="block py-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                            >
                              <span className="mr-2">{cat.icon}</span>
                              {cat.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
