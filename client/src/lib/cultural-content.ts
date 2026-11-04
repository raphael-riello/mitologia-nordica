import type { ContentItem } from "./types";

type CulturalEntry = {
  slug: string;
  title: string;
  category: string;
  description: string;
  cover: string;
  tags: string[];
  overview: string;
  connection: string;
  suggestion: string;
  source: [string, string];
};

const entries: CulturalEntry[] = [
  {
    slug: "edda-poetica", title: "Edda Poética — Poemas de Deuses e Heróis", category: "livros",
    description: "Uma porta de entrada para os poemas medievais que preservam narrativas sobre Odin, Thor, o destino dos deuses e os heróis nórdicos.",
    cover: "/images/glossario/deuses/aesir/odin.png", tags: ["edda", "poesia", "fontes medievais"],
    overview: "A Edda Poética reúne poemas anônimos de assunto mitológico e heroico. Não é um romance contínuo: cada composição tem sua própria voz, situação e forma de apresentar os personagens. Edições modernas oferecem traduções, introduções e notas que ajudam a acompanhar esse universo.",
    connection: "É uma das principais fontes escritas para estudar a mitologia nórdica. Ler seus poemas permite comparar a tradição preservada nos textos com as versões de deuses e heróis encontradas em filmes, jogos e recontos atuais.",
    suggestion: "Comece pelos poemas mitológicos e leia a introdução da edição escolhida. Uma tradução comentada é especialmente útil para nomes e alusões. A edição de Jackson Crawford indicada abaixo é em inglês; ao procurar uma edição em português, confira tradutor e conteúdo, pois as seleções podem variar.",
    source: ["Hackett — The Poetic Edda, tradução de Jackson Crawford", "https://hackettpublishing.com/the-poetic-edda"],
  },
  {
    slug: "o-homem-do-norte", title: "O Homem do Norte — The Northman", category: "filmes",
    description: "O épico de vingança de Robert Eggers aproxima o espectador de um universo viking atravessado por destino, violência e crenças.",
    cover: "/images/heroes/comunidade.png", tags: ["cinema", "vikings", "vingança"],
    overview: "Dirigido por Robert Eggers, The Northman acompanha um príncipe viking empenhado em vingar o assassinato do pai. A narrativa combina drama familiar, aventura e uma atmosfera sombria, colocando a busca por vingança no centro das escolhas do protagonista.",
    connection: "É uma ficção ambientada no universo viking, não uma adaptação integral das Eddas. Para o leitor do portal, o interesse está em observar como o cinema articula a ideia de destino e a presença do sagrado na experiência de seus personagens.",
    suggestion: "Uma opção para quem prefere cinema de atmosfera intensa e conflitos trágicos. O filme contém violência e não deve ser confundido com uma produção infantil. Depois de assistir, compare a visão de heroísmo apresentada aqui com os personagens das sagas e com outros dramas históricos da seção.",
    source: ["Focus Features — The Northman", "https://www.focusfeatures.com/the-northman"],
  },
  {
    slug: "ragnarok-serie", title: "Ragnarok — Os Mitos na Noruega Contemporânea", category: "series",
    description: "Uma cidade norueguesa e um jovem que descobre poderes incomuns servem de cenário para uma releitura moderna dos conflitos nórdicos.",
    cover: "/images/glossario/mundos/midgard.png", tags: ["serie", "fantasia", "ragnarok"],
    overview: "Ragnarok transporta elementos da mitologia nórdica para uma história contemporânea. A série acompanha um jovem em uma cidade norueguesa ameaçada por poluição e pelo derretimento das geleiras, combinando conflitos pessoais com uma dimensão fantástica.",
    connection: "O título aponta para o fim e a renovação do mundo presentes na tradição nórdica, mas a produção constrói personagens e situações próprios. A ambientação atual permite observar como temas antigos podem ganhar novas leituras quando associados a problemas ambientais e relações de poder.",
    suggestion: "Indicada para quem gosta de fantasia urbana e drama juvenil. Assista como uma interpretação autoral: reconhecer referências é parte da experiência, mas a série não substitui a leitura das fontes medievais. A página oficial reúne sinopse e informações da produção; a disponibilidade depende do catálogo da região.",
    source: ["Netflix — Ragnarok", "https://www.netflix.com/title/80232926"],
  },
  {
    slug: "record-of-ragnarok", title: "Record of Ragnarok — Deuses na Arena", category: "animes",
    description: "Um torneio entre deuses e representantes da humanidade mistura tradições mitológicas em uma fantasia de combate.",
    cover: "/images/glossario/deuses/aesir/thor.png", tags: ["anime", "batalhas", "deuses"],
    overview: "Record of Ragnarok, também conhecido como Shūmatsu no Valkyrie, parte de uma disputa pela sobrevivência da humanidade: treze confrontos individuais colocam deuses e humanos em lados opostos. O anime adapta o mangá ilustrado por Azychika, com história de Shinya Umemura e composição de Takumi Fukui.",
    connection: "A obra mistura figuras de diferentes tradições em um mesmo universo. O nome Ragnarök funciona dentro dessa premissa de combate e julgamento da humanidade; não significa que o roteiro esteja recontando a sequência de acontecimentos das fontes nórdicas.",
    suggestion: "Uma escolha para quem procura ação, rivalidades e versões estilizadas de personagens míticos. Vale comparar as caracterizações com os verbetes do glossário, mantendo separadas as regras do torneio ficcional e as narrativas antigas. A violência faz parte da proposta da obra.",
    source: ["Netflix Media Center — Record of Ragnarok", "https://media.netflix.com/en/only-on-netflix/81281579"],
  },
  {
    slug: "heilung", title: "Heilung — Vozes, Percussão e História Amplificada", category: "musicas",
    description: "Um projeto de música experimental que transforma referências históricas, vozes e instrumentos em performances de caráter ritual.",
    cover: "/images/glossario/runas/algiz.png", tags: ["musica", "neofolk", "performance"],
    overview: "Heilung apresenta sua proposta como história amplificada. Vozes, percussão e instrumentos de materiais variados se combinam em uma experiência que também depende da presença cênica. O projeto se aproxima do neofolk e da experimentação sonora, em vez de seguir o formato habitual de uma banda de rock.",
    connection: "Seu imaginário dialoga com tradições antigas do norte da Europa, mas não se limita a uma única narrativa nórdica. O resultado é uma criação artística contemporânea inspirada no passado, não um registro de como toda a música da Era Viking realmente soava.",
    suggestion: "Comece por uma apresentação ao vivo para perceber a relação entre som, movimento e cenário; depois explore os discos pelo catálogo oficial. É uma boa continuação para quem chegou à seção por Wardruna e quer conhecer uma abordagem mais percussiva e teatral.",
    source: ["Season of Mist — biografia e catálogo de Heilung", "https://www.season-of-mist.com/bands/heilung/"],
  },
  {
    slug: "edda-em-prosa", title: "Edda em Prosa — Snorri Sturluson", category: "livros",
    description: "Mitologia e linguagem poética se encontram em uma das obras centrais para conhecer as tradições nórdicas preservadas na Islândia medieval.",
    cover: "/images/glossario/deuses/aesir/bragi.png", tags: ["edda", "snorri", "fontes medievais"],
    overview: "Associada a Snorri Sturluson, a Edda em Prosa organiza narrativas mitológicas e explicações sobre a linguagem dos poetas. Sua leitura ajuda a compreender por que certos nomes, objetos e acontecimentos funcionam como referências recorrentes na poesia nórdica.",
    connection: "Gylfaginning apresenta muitos dos relatos mais conhecidos sobre o mundo e os deuses. Skáldskaparmál aproxima essas histórias da dicção poética. A obra é uma fonte medieval fundamental, mas precisa ser lida considerando o contexto em que foi escrita e as diferenças entre suas versões e outros textos.",
    suggestion: "Para começar, procure uma edição com introdução e notas. Confira se o volume traz o texto completo ou uma seleção: a edição da University of California Press indicada aqui inclui Gylfaginning e uma seleção de narrativas de Skáldskaparmál. Compare a leitura com a Edda Poética para perceber diferenças de forma e perspectiva.",
    source: ["University of California Press — The Prose Edda", "https://www.ucpress.edu/books/the-prose-edda/paper"],
  },
  {
    slug: "thor-filme-2011", title: "Thor — A Releitura da Marvel", category: "filmes",
    description: "O filme de Kenneth Branagh transforma Thor, Loki e Asgard em personagens e cenários de uma aventura de super-heróis.",
    cover: "/images/glossario/mundos/asgard.png", tags: ["cinema", "marvel", "thor"],
    overview: "Lançado em 2011 e dirigido por Kenneth Branagh, Thor acompanha o herdeiro de Asgard depois de ser banido para a Terra por Odin. Privado de seus poderes, ele precisa enfrentar as consequências de sua arrogância enquanto conflitos se desenvolvem em seu mundo de origem.",
    connection: "A produção adapta os quadrinhos da Marvel. Nomes como Thor, Loki e Odin vêm da tradição nórdica, mas suas relações e trajetórias pertencem à continuidade ficcional dos super-heróis. Essa distinção ajuda a aproveitar o filme sem tomar suas escolhas como uma apresentação direta das Eddas.",
    suggestion: "Uma entrada acessível para quem prefere aventura e drama familiar. Depois do filme, visite os verbetes de Thor e Loki para comparar as interpretações. O contraste entre o personagem mitológico e sua versão cinematográfica é uma boa forma de explorar como os mitos continuam sendo recriados.",
    source: ["Marvel — Thor (2011)", "https://www.marvel.com/movies/thor"],
  },
  {
    slug: "the-last-kingdom", title: "The Last Kingdom — Entre Saxões e Dinamarqueses", category: "series",
    description: "Uhtred atravessa disputas de território, lealdade e identidade em um drama histórico sobre o encontro de saxões e dinamarqueses.",
    cover: "/images/heroes/historias.png", tags: ["serie", "ficcao historica", "vikings"],
    overview: "The Last Kingdom acompanha Uhtred, nascido saxão e criado entre dinamarqueses. Sua trajetória coloca em conflito origens, afetos e alianças políticas, enquanto reinos disputam poder e território. O foco é o drama histórico, com batalhas e escolhas pessoais, e não uma aventura protagonizada pelos deuses.",
    connection: "A série interessa ao público de temática viking por apresentar encontros e tensões entre comunidades com diferentes referências culturais e religiosas. Essa proximidade com o tema não transforma a produção em documentário: personagens e acontecimentos são organizados para construir uma narrativa dramática.",
    suggestion: "Uma boa escolha para quem gostou de Vikings e quer acompanhar outro ponto de vista sobre conflitos desse universo. Observe como pertencimento e crença influenciam as decisões dos personagens. Para estudar história, use a série como ponto de partida para perguntas e complemente com bibliografia especializada.",
    source: ["Netflix — The Last Kingdom", "https://www.netflix.com/title/80074249"],
  },
  {
    slug: "mythical-detective-loki-ragnarok", title: "Mythical Detective Loki Ragnarok", category: "animes",
    description: "Loki ganha uma identidade de detetive em um anime que mistura mistério sobrenatural, humor e referências aos deuses nórdicos.",
    cover: "/images/glossario/deuses/aesir/loki.png", tags: ["anime", "loki", "misterio"],
    overview: "The Mythical Detective Loki Ragnarok, também chamado Matantei Loki Ragnarok, adapta o mangá de Sakura Kinoshita. A premissa coloca Loki no mundo humano sob a aparência de uma criança, envolvido em investigações sobrenaturais e encontros com figuras inspiradas na mitologia nórdica.",
    connection: "O interesse está na transformação dos personagens míticos em um elenco de fantasia e mistério. A obra reorganiza identidades, aparências e relações para atender à sua própria história; a agência de detetives e esse cenário moderno não fazem parte dos relatos medievais.",
    suggestion: "Vale conhecer se você busca uma proposta diferente dos combates de Record of Ragnarok e do drama histórico de Vinland Saga. Compare o papel de Loki nas investigações com sua atuação nas narrativas do glossário. O link de referência abaixo reúne informações sobre a obra; não é uma indicação de serviço de streaming.",
    source: ["Referência sobre The Mythical Detective Loki Ragnarok", "https://en.wikipedia.org/wiki/The_Mythical_Detective_Loki_Ragnarok"],
  },
  {
    slug: "amon-amarth", title: "Amon Amarth — Metal e Narrativas Nórdicas", category: "musicas",
    description: "Guitarras pesadas e histórias de temática nórdica oferecem outro caminho musical para explorar deuses, batalhas e destino.",
    cover: "/images/glossario/mundos/muspelheim.png", tags: ["musica", "metal", "ragnarok"],
    overview: "Amon Amarth é uma opção para quem procura uma experiência mais pesada nesta seleção. O catálogo inclui Twilight of the Thunder God, cujo título oferece um ponto de entrada para a aproximação entre linguagem do metal e imaginário nórdico.",
    connection: "Assim como no cinema e nos jogos, a música pode selecionar imagens e personagens míticos e reorganizá-los em uma expressão própria. A presença de temas nórdicos em uma canção não a transforma em uma fonte medieval, nem define por si só como eram as crenças históricas.",
    suggestion: "Comece por Twilight of the Thunder God e siga para outros discos pelo catálogo da banda. Compare a energia de guitarras e vocais com o uso de vozes e percussão em Heilung ou Wardruna. São caminhos artísticos distintos para quem deseja explorar música inspirada nesse universo.",
    source: ["Amon Amarth — discografia oficial", "https://amonamarth.com/discography/"],
  },
  {
    slug: "the-norse-myths-crossley-holland", title: "The Norse Myths — Kevin Crossley-Holland", category: "livros",
    description: "Uma coletânea de recontos em prosa, acompanhada de material de apoio para orientar a exploração dos mitos nórdicos.",
    cover: "/images/heroes/main.png", tags: ["livro", "recontos", "mitologia"],
    overview: "Kevin Crossley-Holland apresenta os mitos nórdicos em prosa moderna. A edição indicada pela Penguin Random House inclui introdução, notas e glossário, recursos úteis para leitores que desejam acompanhar as histórias sem perder o contexto dos nomes e referências.",
    connection: "Trata-se de um reconto contemporâneo, não de uma tradução integral de um único manuscrito medieval. Essa diferença importa: o autor seleciona e organiza narrativas para oferecer uma experiência de leitura própria, enquanto as fontes antigas apresentam formas e perspectivas variadas.",
    suggestion: "É uma opção para quem lê em inglês e quer avançar de uma primeira aproximação para uma leitura com apoio contextual. Leia as notas junto das histórias e depois compare um episódio com sua apresentação nas Eddas. A edição e o idioma devem ser conferidos antes da compra.",
    source: ["Penguin Random House — The Norse Myths", "https://www.penguinrandomhouse.com/books/33854/the-norse-myths-by-kevin-crossley-holland/"],
  },
  {
    slug: "crepusculo-dos-deuses", title: "Crepúsculo dos Deuses — Twilight of the Gods", category: "series",
    description: "Uma série de animação adulta que transforma o universo dos deuses nórdicos em uma jornada de amor, perda e vingança.",
    cover: "/images/glossario/deuses/aesir/sif.png", tags: ["serie", "animacao adulta", "deuses"],
    overview: "Twilight of the Gods apresenta uma visão animada da mitologia nórdica associada a Zack Snyder. Sua proposta acompanha uma jornada de amor, perda e vingança através de terras fantásticas, campos de batalha e conflitos com divindades.",
    connection: "A série usa o repertório nórdico como base para uma história autoral. O espectador pode reconhecer referências sem esperar uma adaptação fiel de cada passagem das Eddas. O modo como os deuses são caracterizados pertence às escolhas narrativas da produção.",
    suggestion: "Uma opção para quem procura fantasia animada de tom adulto. A violência é parte importante de sua apresentação, por isso animação aqui não significa conteúdo infantil. Ela fica na categoria Séries por ser uma animação ocidental; a categoria Animes reúne as produções japonesas do catálogo.",
    source: ["Netflix Media Center — Twilight of the Gods", "https://media.netflix.com/en/only-on-netflix/81153122"],
  },
  {
    slug: "skald", title: "SKÁLD — Uma Escuta de Inspiração Nórdica", category: "musicas",
    description: "Um projeto musical contemporâneo para ampliar a seleção de sonoridades inspiradas na cultura e no imaginário nórdicos.",
    cover: "/images/glossario/deuses/aesir/iduna.png", tags: ["musica", "skald", "folk nordico"],
    overview: "SKÁLD integra esta seleção como mais um caminho de exploração musical ao lado de Wardruna e Heilung. A proposta dialoga com o imaginário nórdico por meio de uma linguagem contemporânea, destinada à escuta e à performance.",
    connection: "O nome remete aos escaldos, poetas da tradição nórdica. Essa referência convida a explorar a ligação entre palavra, ritmo e memória, sem supor que uma produção atual reproduza exatamente a experiência musical da Idade Média.",
    suggestion: "Use o site oficial para encontrar os lançamentos e canais do projeto. Compare diferentes gravações prestando atenção às vozes e à construção da atmosfera. Para aprofundar o lado literário dessa experiência, a Edda em Prosa oferece uma entrada para o universo da linguagem poética e de suas referências mitológicas.",
    source: ["SKÁLD — site oficial", "https://skaldmusic.com/"],
  },
];

export const culturalContent: ContentItem[] = entries.map(({ overview, connection, suggestion, source, ...entry }) => ({
  ...entry,
  section: "conteudo",
  date: "2026-11-04",
  content: `## Sobre a obra\n\n${overview}\n\n## Relação com o universo nórdico\n\n${connection}\n\n## Por onde começar\n\n${suggestion}\n\n## Referência\n\n[${source[0]}](${source[1]})\n\n*Imagem de abertura: ilustração temática do portal, não uma capa ou um cartaz oficial.*`,
}));
