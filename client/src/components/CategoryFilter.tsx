import type { CategoryConfig } from "@/lib/types";

interface CategoryFilterProps {
  categories: CategoryConfig[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  showAll?: boolean;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange, showAll = true }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {showAll && (
        <button
          onClick={() => onCategoryChange("todos")}
          className={`px-4 py-2 font-display text-xs uppercase tracking-widest border transition-all duration-300 ${
            activeCategory === "todos"
              ? "border-gold bg-gold text-black"
              : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
          }`}
        >
          Todos
        </button>
      )}
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`px-4 py-2 font-display text-xs uppercase tracking-widest border transition-all duration-300 ${
            activeCategory === cat.slug
              ? "border-gold bg-gold text-black"
              : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
          }`}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.title}
        </button>
      ))}
    </div>
  );
}
