import { Link } from "wouter";
import { allContent } from "@/lib/content";
import { sections } from "@/lib/sections";
import { contentPath, categoryPath } from "@/lib/paths";
export default function ContentIndex() {
  return (
    <main className="container py-12 max-w-5xl">
      <h1 className="font-display text-4xl text-gold mb-6">
        Índice de conteúdos
      </h1>
      <p className="text-muted-foreground mb-8">
        Explore os temas do portal e encontre cada verbete pelo nome. Para
        consultar as obras antigas, visite nossa{" "}
        <Link href="/fontes" className="text-gold underline">
          biblioteca de fontes
        </Link>
        .
      </p>
      {sections.map((section) => (
        <section key={section.slug} className="mb-12">
          <h2 className="font-display text-2xl text-gold mb-4">
            <Link href={"/" + section.slug}>{section.title}</Link>
          </h2>
          {section.categories
            .filter((c) => c.slug !== "todos")
            .map((category) => {
              const items = allContent
                .filter(
                  (i) =>
                    i.section === section.slug && i.category === category.slug,
                )
                .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
              if (!items.length) return null;
              return (
                <div key={category.slug} className="mb-8">
                  <h3 className="font-display text-lg mb-3">
                    <Link href={categoryPath(section.slug, category.slug)}>
                      {category.title}
                    </Link>
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          className="text-muted-foreground hover:text-gold underline underline-offset-4"
                          href={contentPath(item)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </section>
      ))}
    </main>
  );
}
