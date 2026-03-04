import { Link } from "wouter";
import { sections } from "@/lib/sections";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-gold text-3xl">ᚱ</span>
              <span className="font-display text-sm uppercase tracking-widest text-foreground">
                Mitologia<span className="text-gold"> Nórdica</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Portal dedicado ao universo da mitologia nórdica. Explore histórias, deuses, criaturas e muito mais.
            </p>
          </div>

          {/* Section Links */}
          {sections.slice(0, 4).map((section) => (
            <div key={section.slug}>
              <h4 className="font-display text-xs uppercase tracking-widest text-gold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${section.slug}?categoria=${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="runic-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Mitologia Nórdica — Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            <Link href="/comunidade/forum" className="text-xs text-muted-foreground hover:text-gold transition-colors font-display uppercase tracking-wider">
              Comunidade
            </Link>
            <span className="text-border">|</span>
            <a href="https://www.mitologianordica.com.br" className="text-xs text-muted-foreground hover:text-gold transition-colors font-display uppercase tracking-wider">
              mitologianordica.com.br
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
