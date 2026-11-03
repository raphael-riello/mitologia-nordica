# Estratégia de links, SEO e GEO

## Diagnóstico e objetivo

Antes desta alteração, as rotas recebiam o mesmo HTML com um root vazio e canonical da página inicial. O sitemap mantido manualmente não cobria todo o catálogo. Filtros de subcategoria eram botões, e os relacionados eram os primeiros itens da categoria, sem relação editorial com o texto.

O objetivo é permitir descobrir e ler os conteúdos sem depender de JavaScript, estabelecer relações úteis entre entidades e tornar as fontes identificáveis. Isso não garante posição, indexação, rich results ou citação em respostas de IA.

## Implementação

- Links contextuais em menções a entidades com verbete existente. Dicionário editorial de nomes e variantes, até oito destinos por artigo, uma ocorrência por destino. Não altera títulos, código, imagens ou links já existentes; não cria links para nomes parciais ou para o próprio artigo.
- Nomes ambíguos (por exemplo Hel, que pode designar personagem ou reino; e Dvalinn, com homônimos) não recebem ligação automática. Não usar tags genéricas como dicionário de entidades.
- Relacionados classificados por menções cruzadas, tags compartilhadas e categoria.
- Categorias/subcategorias com URLs próprias e elementos a/href. Redirecionamentos permanentes dos filtros antigos configurados na Vercel.
- /indice oferece links organizados para todos os artigos, ligado do rodapé e do corpo dos verbetes.
- /fontes identifica cinco textos, edições e o escopo de cada referência. Dezenove verbetes antigos recebem referências adicionais com capítulos/episódios; os trinta verbetes recentes preservam as fontes já publicadas.
- Pré-renderização do mesmo aplicativo React usado pelo leitor, em todas as rotas conhecidas, sem versão especial para robôs. Conteúdo visível sem JavaScript; sem opacity zero inicial.
- Canonical, descrição, Open Graph, Article/WebPage/CollectionPage/WebSite e BreadcrumbList por página. As citações estruturadas correspondem aos links oferecidos ao leitor. Não são inventados autores, avaliações ou datas de modificação.
- Sitemap gerado a partir do catálogo em cada build. Categorias vazias continuam acessíveis, mas recebem noindex e ficam fora do sitemap. Rotas desconhecidas recebem 404 pela hospedagem estática.
- Quatro descrições ausentes foram preenchidas. A categoria inconsistente do conto de Yggdrasil foi corrigida para contos-infantis, com redirecionamento do endereço anterior. Datas de publicação são exibidas sem recuar um dia pelo fuso.

## Resultado da auditoria local

- 165 artigos.
- 281 links contextuais em 91 artigos, além de breadcrumbs, navegação, índice, fontes e relacionados.
- 201 rotas renderizadas, 199 indexáveis; página 404 gerada separadamente.
- Todos os artigos alcançáveis a partir da página inicial pelo grafo de links.
- Nenhum destino interno ausente nos documentos renderizados.
- Sete testes de SEO, TypeScript e build aprovados antes da publicação.

## Manutenção e validação

A rotina de publicação é npm run build: Vite, scripts/prerender.ts e os testes de SEO. npm run test:seo também valida separadamente os arquivos já gerados em dist/public. Não editar dist nem manter outro sitemap manual.

Novos artigos entram automaticamente no índice, no sitemap e na pré-renderização. Para criar uma associação contextual, acrescente nomes inequívocos a client/src/lib/editorial-links.ts. Para novas referências, indique obra, edição, passagem e o que ela efetivamente sustenta em client/src/lib/references.ts.

Ao criar categorias, atualizar também os redirecionamentos de filtros antigos em vercel.json. A canonical dos filtros legados é calculada pelo mesmo catálogo no cliente.

## Fontes editoriais verificadas

- Gylfaginning, Snorri Sturluson, tradução de A. G. Brodeur, 1916: https://sacred-texts.com/book/the-prose-edda/gylfaginning
- Skáldskaparmál, mesma edição: https://sacred-texts.com/book/the-prose-edda/skaldskaparmal
- Völuspá, tradução de H. A. Bellows, 1923: https://sacred-texts.com/book/the-poetic-edda/voluspo
- Grímnismál, mesma edição: https://sacred-texts.com/book/the-poetic-edda/grimnismol
- Fáfnismál, mesma edição: https://sacred-texts.com/book/the-poetic-edda/fafnismol

## Próximos passos editoriais e medição

O acervo antigo contém interpretações simbólicas e personagens/adaptações de Tolkien. A biblioteca explica essas distinções; adicionar links não substitui uma revisão factual de cada afirmação. Revisar prioritariamente verbetes de anões e runas, separando testemunho medieval, interpretação moderna e ficção.

No Search Console, reenviar /sitemap.xml e acompanhar páginas indexadas, canonical escolhida, impressões e cliques por categoria nas semanas seguintes. Inspecionar páginas representativas (Odin, Sleipnir, Fafnir e hubs). Não foi presumido acesso ao Search Console nem submetida uma solicitação de indexação por esta tarefa.

Para GEO, medir referências reais às páginas e tráfego identificado de ferramentas de IA, quando disponível. Não atribuir resultados a um link isolado, não prometer rankings e não usar schema ou arquivos especiais como substituto de conteúdo claro e fontes confiáveis.

## Base técnica consultada

- Links rastreáveis e âncoras: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- SEO de JavaScript: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Recursos de IA e fundamentos de SEO: https://developers.google.com/search/docs/appearance/ai-features
- Article: https://developers.google.com/search/docs/appearance/structured-data/article
- Configuração e redirecionamentos Vercel: https://vercel.com/docs/project-configuration e https://vercel.com/docs/routing/redirects

