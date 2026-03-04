import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm font-display uppercase tracking-wider flex-wrap">
        <li>
          <Link href="/" className="text-muted-foreground hover:text-gold transition-colors inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Início</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            {item.href ? (
              <Link href={item.href} className="text-muted-foreground hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
