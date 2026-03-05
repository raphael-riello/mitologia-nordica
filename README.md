# Mitologia Nórdica — Portal dos Nove Mundos

Portal completo sobre Mitologia Nórdica com histórias, glossário de deuses e criaturas, jogos, conteúdo multimídia e comunidade.

**Domínio:** [www.mitologianordica.com.br](https://www.mitologianordica.com.br)

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Pré-requisitos](#pré-requisitos)
5. [Instalação](#instalação)
6. [Desenvolvimento Local](#desenvolvimento-local)
7. [Build de Produção](#build-de-produção)
8. [Deploy](#deploy)
   - [Vercel (Recomendado para SPA)](#vercel-recomendado-para-spa)
   - [Netlify](#netlify)
   - [Servidor VPS (Nginx)](#servidor-vps-nginx)
   - [Servidor Node.js (Express)](#servidor-nodejs-express)
   - [Hospedagem Compartilhada (cPanel)](#hospedagem-compartilhada-cpanel)
9. [Gerenciamento de Conteúdo](#gerenciamento-de-conteúdo)
10. [Gerenciamento de Imagens](#gerenciamento-de-imagens)
11. [SEO](#seo)
12. [Personalização](#personalização)
13. [Estrutura de Arquivos Detalhada](#estrutura-de-arquivos-detalhada)

---

## Visão Geral

O site possui as seguintes seções:

| Seção | Rota | Categorias |
|-------|------|------------|
| **Histórias** | `/historias` | História Completa, Contos Curtos, Histórias Infantis |
| **Glossário** | `/glossario` | Deuses, Heróis, Mundos, Criaturas, Runas, Anões |
| **Jogos** | `/jogos` | Todos, Multiplayer, Singleplayer, Novidades |
| **Conteúdo** | `/conteudo` | Livros, Filmes, Séries, Animes, Músicas |
| **Comunidade** | `/comunidade` | Fórum (placeholder Discourse), Artes, Servidores |

### Funcionalidades

- **Busca global** com Fuse.js (fuzzy search client-side)
- **Filtros por categoria** em cada seção
- **Paginação** nas listagens
- **Breadcrumbs** em todas as páginas internas
- **SEO** com meta tags dinâmicas, sitemap.xml e robots.txt
- **Design responsivo** (desktop e mobile) com menu hamburger
- **Animações** com Framer Motion
- **Tema nórdico** escuro com tipografia Cinzel/Crimson Text

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 19.x | Framework UI |
| TypeScript | 5.6 | Tipagem estática |
| Vite | 7.x | Build tool e dev server |
| Tailwind CSS | 4.x | Estilização |
| Wouter | 3.x | Roteamento client-side |
| Fuse.js | 7.x | Busca fuzzy client-side |
| Framer Motion | 12.x | Animações |
| Streamdown | 1.x | Renderização de Markdown |
| Express | 4.x | Servidor de produção (opcional) |
| pnpm | 10.x | Gerenciador de pacotes |

---

## Estrutura do Projeto

```
mitologia-nordica/
├── client/                          # Código-fonte do frontend
│   ├── index.html                   # HTML principal (fontes, meta tags, SEO)
│   ├── public/                      # Arquivos estáticos
│   │   ├── robots.txt               # Regras para crawlers
│   │   └── sitemap.xml              # Mapa do site para SEO
│   └── src/
│       ├── App.tsx                   # Rotas e layout principal
│       ├── main.tsx                  # Entry point React
│       ├── index.css                 # Tema global (cores, fontes, componentes)
│       ├── components/              # Componentes reutilizáveis
│       │   ├── Breadcrumb.tsx       # Navegação breadcrumb
│       │   ├── CategoryFilter.tsx   # Filtro por categoria (tabs)
│       │   ├── ContentCard.tsx      # Card de conteúdo
│       │   ├── Footer.tsx           # Rodapé com links
│       │   ├── Header.tsx           # Header com menu dropdown + mobile
│       │   ├── HeroSection.tsx      # Banner hero reutilizável
│       │   ├── Layout.tsx           # Wrapper Header + Footer
│       │   ├── Pagination.tsx       # Paginação numérica
│       │   ├── SearchBar.tsx        # Busca com Fuse.js
│       │   └── ui/                  # Componentes shadcn/ui (base)
│       ├── contexts/
│       │   └── ThemeContext.tsx      # Contexto de tema (dark/light)
│       ├── hooks/
│       │   └── useDocumentTitle.ts   # Hook para título dinâmico
│       ├── lib/
│       │   ├── content.ts           # ⭐ DADOS DE CONTEÚDO (editar aqui)
│       │   ├── sections.ts          # Configuração das seções e categorias
│       │   ├── types.ts             # Interfaces TypeScript
│       │   └── utils.ts             # Utilitários (cn)
│       └── pages/
│           ├── Home.tsx             # Página inicial
│           ├── SectionListing.tsx   # Listagem genérica (histórias, glossário, etc.)
│           ├── ContentDetail.tsx    # Página de detalhe de conteúdo
│           ├── Comunidade.tsx       # Hub da comunidade
│           ├── Forum.tsx            # Fórum (placeholder Discourse)
│           ├── Artes.tsx            # Galeria de artes
│           ├── Servidores.tsx       # Servidores de jogos
│           └── NotFound.tsx         # Página 404
├── server/
│   └── index.ts                     # Servidor Express (produção)
├── shared/
│   └── const.ts                     # Constantes compartilhadas
├── package.json                     # Dependências e scripts
├── tsconfig.json                    # Configuração TypeScript
├── vite.config.ts                   # Configuração Vite
└── README.md                        # Este arquivo
```

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.x ou superior — [Download](https://nodejs.org/)
- **pnpm** 10.x — Instale com: `npm install -g pnpm`

Para verificar:

```bash
node --version    # v18.0.0 ou superior
pnpm --version    # 10.x
```

---

## Instalação

1. **Extraia o arquivo ZIP** do projeto (ou clone o repositório):

```bash
unzip mitologia-nordica.zip
cd mitologia-nordica
```

2. **Instale as dependências:**

```bash
pnpm install
```

---

## Desenvolvimento Local

Para iniciar o servidor de desenvolvimento com hot-reload:

```bash
pnpm dev
```

O site estará disponível em: **http://localhost:3000**

### Outros comandos úteis:

```bash
pnpm check      # Verificar erros de TypeScript
pnpm format     # Formatar código com Prettier
pnpm preview    # Preview do build de produção
```

---

## Build de Produção

Para gerar os arquivos otimizados para produção:

```bash
pnpm build
```

Os arquivos serão gerados em **`dist/public/`**. Esta pasta contém:

- `index.html` — HTML principal
- `assets/` — JavaScript, CSS e outros assets com hash no nome (cache-busting)
- `robots.txt` — Regras para crawlers
- `sitemap.xml` — Mapa do site

---

## Deploy

### Vercel (Recomendado para SPA)

A Vercel é a opção mais simples para deploy de SPAs React/Vite.

1. Instale a CLI da Vercel:
```bash
npm install -g vercel
```

2. Crie um arquivo `vercel.json` na raiz do projeto:
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/public",
  "installCommand": "pnpm install",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

3. Faça o deploy:
```bash
vercel
```

4. Para produção:
```bash
vercel --prod
```

5. Configure seu domínio `www.mitologianordica.com.br` nas configurações do projeto na Vercel.

---

### Netlify

1. Crie um arquivo `netlify.toml` na raiz:
```toml
[build]
  command = "pnpm build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Faça o deploy via CLI ou conectando seu repositório Git no painel da Netlify.

3. Configure o domínio personalizado nas configurações do site.

---

### Servidor VPS (Nginx)

Se você tem um VPS (DigitalOcean, AWS EC2, Contabo, etc.):

1. **Faça o build localmente:**
```bash
pnpm build
```

2. **Envie a pasta `dist/public/` para o servidor:**
```bash
scp -r dist/public/* usuario@seu-servidor:/var/www/mitologianordica/
```

3. **Configure o Nginx** (`/etc/nginx/sites-available/mitologianordica`):

```nginx
server {
    listen 80;
    server_name www.mitologianordica.com.br mitologianordica.com.br;
    root /var/www/mitologianordica;
    index index.html;

    # Compressão gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 1000;

    # Cache de assets estáticos (com hash no nome)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache de imagens
    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # SPA fallback — redireciona todas as rotas para index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

4. **Ative o site e reinicie o Nginx:**
```bash
sudo ln -s /etc/nginx/sites-available/mitologianordica /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Configure HTTPS com Certbot (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d www.mitologianordica.com.br -d mitologianordica.com.br
```

---

### Servidor Node.js (Express)

O projeto inclui um servidor Express em `server/index.ts` que serve os arquivos estáticos:

1. **Faça o build:**
```bash
pnpm build
```

2. **Inicie o servidor:**
```bash
pnpm start
```

O servidor roda na porta 3000 (ou na variável de ambiente `PORT`).

3. **Para produção com PM2:**
```bash
npm install -g pm2
pm2 start dist/index.js --name mitologia-nordica
pm2 save
pm2 startup
```

---

### Hospedagem Compartilhada (cPanel)

Se você usa hospedagem compartilhada (Hostgator, Locaweb, etc.):

1. **Faça o build localmente:**
```bash
pnpm build
```

2. **Envie o conteúdo de `dist/public/`** para a pasta `public_html` via FTP ou Gerenciador de Arquivos do cPanel.

3. **Crie um arquivo `.htaccess`** na pasta `public_html`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
</IfModule>
```

---

## Gerenciamento de Conteúdo

Todo o conteúdo do site é gerenciado no arquivo:

```
client/src/lib/content.ts
```

### Estrutura de um item de conteúdo

Cada item segue a interface `ContentItem`:

```typescript
{
  slug: "nome-em-kebab-case",           // URL amigável (único)
  title: "Título do Conteúdo",          // Título exibido
  description: "Descrição breve...",    // Resumo para cards e SEO
  category: "nome-da-categoria",        // Deve corresponder a uma categoria da seção
  section: "historias",                 // historias | glossario | jogos | conteudo | comunidade
  date: "2025-01-15",                   // Data no formato YYYY-MM-DD
  cover: "/images/secao/categoria/imagem.jpg",  // Caminho da imagem de capa
  tags: ["tag1", "tag2"],               // Tags para busca e exibição
  content: `## Título                   // Conteúdo em Markdown
  
  Texto do conteúdo...`,
  
  // Campos opcionais:
  author: "Nome do Autor",              // Para livros, artes
  rating: 9.5,                          // Nota (0-10)
  platform: "PS5, PC",                  // Para jogos
  players: "1-10",                      // Para jogos
  genre: "Ação/Aventura",              // Gênero
  year: 2022,                           // Ano de lançamento
}
```

### Para adicionar novo conteúdo

1. Abra `client/src/lib/content.ts`
2. Adicione um novo objeto ao array `allContent`
3. Certifique-se de que:
   - O `slug` é único e está em kebab-case
   - A `section` corresponde a uma seção existente
   - A `category` corresponde a uma categoria da seção
   - A `date` está no formato `YYYY-MM-DD`
4. Salve o arquivo e faça o rebuild

### Categorias disponíveis por seção

| Seção | Categorias válidas |
|-------|-------------------|
| `historias` | `historia-completa`, `contos-curtos`, `historias-infantis` |
| `glossario` | `deuses`, `herois`, `mundos`, `criaturas`, `runas`, `anoes` |
| `jogos` | `multiplayer`, `singleplayer`, `novidades` |
| `conteudo` | `livros`, `filmes`, `series`, `animes`, `musicas` |
| `comunidade` | `artes`, `servidores` |

---

## Gerenciamento de Imagens

### Imagens de capa (cover)

As imagens de capa dos itens de conteúdo devem ser referenciadas no campo `cover` de cada item.

**Opção 1 — Imagens externas (CDN):**
Use URLs completas para imagens hospedadas externamente:
```typescript
cover: "https://seu-cdn.com/images/odin.jpg"
```

**Opção 2 — Imagens locais:**
Coloque as imagens na pasta `client/public/images/` seguindo a estrutura:
```
client/public/images/
├── historias/
│   ├── historia-completa/
│   │   └── ragnarok.jpg
│   ├── contos-curtos/
│   │   └── thor-serpente.jpg
│   └── historias-infantis/
│       └── yggdrasil.jpg
├── glossario/
│   ├── deuses/
│   │   ├── odin.jpg
│   │   └── thor.jpg
│   ├── criaturas/
│   │   └── fenrir.jpg
│   └── mundos/
│       └── asgard.jpg
├── jogos/
│   ├── singleplayer/
│   │   └── god-of-war.jpg
│   └── multiplayer/
│       └── valheim.jpg
└── conteudo/
    ├── livros/
    │   └── neil-gaiman.jpg
    └── series/
        └── vikings.jpg
```

E referencie no `cover`:
```typescript
cover: "/images/glossario/deuses/odin.jpg"
```

### Imagens hero (banners)

As imagens hero das seções estão configuradas em `client/src/lib/sections.ts` no objeto `HERO_IMAGES`. Atualmente usam URLs de CDN. Para usar imagens locais, coloque-as em `client/public/images/heroes/` e atualize as URLs.

---

## SEO

### Meta tags dinâmicas

O hook `useDocumentTitle` em `client/src/hooks/useDocumentTitle.ts` atualiza o título da página dinamicamente. Cada página usa esse hook para definir seu título.

### Sitemap

O arquivo `client/public/sitemap.xml` contém todas as URLs do site. **Atualize-o manualmente** quando adicionar novas páginas ou conteúdo significativo.

### Robots.txt

O arquivo `client/public/robots.txt` permite todos os crawlers e aponta para o sitemap.

### Open Graph

As meta tags Open Graph estão definidas no `client/index.html`. Para imagens OG específicas por página, implemente meta tags dinâmicas via `useEffect` nas páginas desejadas.

---

## Personalização

### Cores do tema

Edite as variáveis CSS em `client/src/index.css`:

```css
:root {
  --background: oklch(0.12 0.01 260);    /* Fundo principal */
  --foreground: oklch(0.92 0.01 85);     /* Texto principal */
  --color-gold: oklch(0.78 0.12 85);     /* Dourado (acento) */
  --color-gold-dark: oklch(0.65 0.12 85); /* Dourado escuro */
  --card: oklch(0.16 0.01 260);          /* Fundo dos cards */
  --border: oklch(0.28 0.02 260);        /* Cor das bordas */
}
```

### Fontes

As fontes são carregadas via Google Fonts no `client/index.html`:
- **Cinzel** — Títulos e elementos de destaque
- **Crimson Text** — Corpo de texto

Para alterar, modifique o link do Google Fonts e as variáveis `--font-display` e `--font-body` no CSS.

### Adicionar novas seções

1. Adicione a configuração da seção em `client/src/lib/sections.ts`
2. Adicione conteúdo em `client/src/lib/content.ts`
3. Adicione a rota em `client/src/App.tsx`
4. Atualize o `sitemap.xml`

### Adicionar novas categorias

1. Adicione a categoria no array `categories` da seção correspondente em `sections.ts`
2. Adicione conteúdo com a nova `category` em `content.ts`

---

## Estrutura de Arquivos Detalhada

### Componentes Principais

| Arquivo | Descrição |
|---------|-----------|
| `Header.tsx` | Barra de navegação com menu dropdown por seção (desktop) e menu hamburger (mobile) |
| `Footer.tsx` | Rodapé com links organizados por seção |
| `Layout.tsx` | Wrapper que inclui Header e Footer em todas as páginas |
| `SearchBar.tsx` | Campo de busca com Fuse.js — exibe resultados em dropdown |
| `ContentCard.tsx` | Card de conteúdo com imagem, tags, título e descrição |
| `CategoryFilter.tsx` | Tabs de filtro por categoria |
| `Pagination.tsx` | Paginação numérica com navegação |
| `Breadcrumb.tsx` | Navegação breadcrumb com ícone Home |
| `HeroSection.tsx` | Banner hero reutilizável com imagem de fundo |

### Páginas

| Arquivo | Rota | Descrição |
|---------|------|-----------|
| `Home.tsx` | `/` | Página inicial com hero, seções e conteúdo recente |
| `SectionListing.tsx` | `/historias`, `/glossario`, `/jogos`, `/conteudo` | Listagem com filtros, busca e paginação |
| `ContentDetail.tsx` | `/:secao/:categoria/:slug` | Página de detalhe com conteúdo Markdown |
| `Comunidade.tsx` | `/comunidade` | Hub da comunidade com links |
| `Forum.tsx` | `/comunidade/forum` | Placeholder para integração com Discourse |
| `Artes.tsx` | `/comunidade/artes` | Galeria de artes da comunidade |
| `Servidores.tsx` | `/comunidade/servidores` | Lista de servidores de jogos |
| `NotFound.tsx` | `*` | Página 404 personalizada |

### Dados

| Arquivo | Descrição |
|---------|-----------|
| `content.ts` | **Arquivo principal de conteúdo** — todos os itens do site |
| `sections.ts` | Configuração das seções, categorias e imagens hero |
| `types.ts` | Interfaces TypeScript (`ContentItem`, `SectionConfig`, `CategoryConfig`) |

---

## Integração Futura com Discourse (Fórum)

A página `/comunidade/forum` está preparada como placeholder. Para integrar o Discourse:

1. Instale o Discourse em um subdomínio (ex: `forum.mitologianordica.com.br`)
2. Configure SSO para autenticação unificada
3. Use a API do Discourse para exibir tópicos recentes na página do fórum
4. Personalize o tema do Discourse para combinar com o design do site

---

## Licença

MIT

---

## Suporte

Para dúvidas ou sugestões, entre em contato através do site [www.mitologianordica.com.br](https://www.mitologianordica.com.br).


TESTE FINAL
