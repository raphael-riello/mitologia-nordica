import { useMemo, type ComponentProps } from "react";
import { Link } from "wouter";
import { Streamdown, defaultRemarkPlugins } from "streamdown";
import { contextualLinks } from "@/lib/editorial-links";
import { furtherReading } from "@/lib/references";
import type { ContentItem } from "@/lib/types";
const oneBlock = (markdown: string) => [markdown];
const components = {
  a: ({ href, children }: ComponentProps<"a">) =>
    href?.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href}>{children}</a>
    ),
};
export default function ArticleBody({ item }: { item: ContentItem }) {
  const links = useMemo(() => contextualLinks(item), [item]);
  const reading = furtherReading(item.slug);
  return (
    <>
      <Streamdown
        key={item.slug}
        mode="static"
        components={components}
        parseIncompleteMarkdown={false}
        parseMarkdownIntoBlocksFn={oneBlock}
        // Streamdown caches processors by plugin name + serialized options.
        // Keep article identity in that cache key to avoid reusing another article's exclusions.
        remarkPlugins={[...Object.values(defaultRemarkPlugins), [links.plugin, { slug: item.slug }]]}
      >
        {item.content}
      </Streamdown>
      {reading.length > 0 && (
        <section aria-label="Referências para aprofundar">
          <h2>Referências para aprofundar</h2>
          <ul>
            {reading.map((ref) => (
              <li key={ref.id}>
                <a href={ref.url}>{ref.title}</a> — {ref.note}{" "}
                <span>{ref.edition}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p>
        <a href="/fontes">Conheça as fontes e edições consultadas</a> ou{" "}
        <a href="/indice">explore todos os conteúdos por tema</a>.
      </p>
    </>
  );
}
