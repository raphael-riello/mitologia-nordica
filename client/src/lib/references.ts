export const references = [
  {
    id: "lokasenna",
    title: "Lokasenna — Edda Poética",
    url: "https://sacred-texts.com/book/the-poetic-edda/lokasenna",
    edition: "Poema anônimo; tradução inglesa de Henry Adams Bellows (1923).",
    scope: "Disputa verbal no banquete de Ægir. Distinguir acusações dos personagens de uma descrição neutra dos acontecimentos.",
  },
  {
    id: "baldrs-draumar",
    title: "Baldrs draumar — Edda Poética",
    url: "https://sacred-texts.com/book/the-poetic-edda/baldrs-draumar",
    edition: "Poema anônimo; tradução inglesa de Henry Adams Bellows (1923).",
    scope: "A viagem de Odin à profetisa e os presságios da morte de Baldr.",
  },
  {
    id: "poemas-runicos",
    title: "Poemas rúnicos — textos, traduções e notas",
    url: "https://www.arild-hauge.com/PDF/Runic%20and%20heroic%20poems%20of%20the%20old%20Teutonic%20peoples.pdf",
    edition: "Bruce Dickins, Runic and Heroic Poems of the Old Teutonic Peoples (1915), pp. 12–33. Fac-símile em PDF.",
    scope: "Comparação das tradições anglo-saxã, norueguesa e islandesa. Os poemas pertencem a alfabetos diferentes e não constituem uma tabela de divinação do Futhark antigo.",
  },
  {
    id: "gylfaginning",
    title: "Gylfaginning — Edda em Prosa",
    url: "https://sacred-texts.com/book/the-prose-edda/gylfaginning",
    edition:
      "Snorri Sturluson; tradução inglesa de Arthur Gilchrist Brodeur (1916).",
    scope:
      "Criação, deuses, Yggdrasil, animais míticos e Ragnarök. Consulte os capítulos indicados em cada verbete.",
  },
  {
    id: "skaldskaparmal",
    title: "Skáldskaparmál — Edda em Prosa",
    url: "https://sacred-texts.com/book/the-prose-edda/skaldskaparmal",
    edition:
      "Snorri Sturluson; tradução inglesa de Arthur Gilchrist Brodeur (1916).",
    scope:
      "Linguagem poética e relatos sobre os tesouros divinos, Iðunn, o hidromel da poesia e o ouro de Andvari.",
  },
  {
    id: "voluspo",
    title: "Völuspá — Edda Poética",
    url: "https://sacred-texts.com/book/the-poetic-edda/voluspo",
    edition: "Poema anônimo; tradução inglesa de Henry Adams Bellows (1923).",
    scope:
      "Cosmogonia, catálogo de anões e profecia do Ragnarök. O catálogo de nomes não é uma biografia de cada anão.",
  },
  {
    id: "grimnismol",
    title: "Grímnismál — Edda Poética",
    url: "https://sacred-texts.com/book/the-poetic-edda/grimnismol",
    edition: "Poema anônimo; tradução inglesa de Henry Adams Bellows (1923).",
    scope: "Salões divinos, corvos de Odin, animais de Valhalla e Yggdrasil.",
  },
  {
    id: "fafnismol",
    title: "Fáfnismál — Edda Poética",
    url: "https://sacred-texts.com/book/the-poetic-edda/fafnismol",
    edition: "Poema anônimo; tradução inglesa de Henry Adams Bellows (1923).",
    scope:
      "O encontro de Sigurd com Fafnir e suas consequências no ciclo heroico.",
  },
];
const passages: Record<string, { id: string; note: string }[]> = {
  hod: [{ id: "gylfaginning", note: "Capítulos 28, 49 e 53: Höðr na versão de Snorri, a morte de Baldr e o mundo renovado." }],
  vili: [{ id: "gylfaginning", note: "Capítulos 6–9: os filhos de Borr e a criação. Leituras sobre a vontade são interpretações, não uma biografia adicional." }],
  ve: [{ id: "gylfaginning", note: "Capítulos 6–9: os irmãos de Odin e a criação. Distinguir o relato de interpretações arquetípicas." }],
  vidar: [{ id: "gylfaginning", note: "Capítulos 29 e 51–53: o deus silencioso, o sapato e o confronto com Fenrir." }],
  vali: [{ id: "baldrs-draumar", note: "Estrofe 11 na edição de Bellows: Rind, o nascimento de Váli e a vingança." }, { id: "gylfaginning", note: "Capítulos 30 e 53: parentesco e sobrevivência no mundo renovado." }],
  bragi: [{ id: "gylfaginning", note: "Capítulo 26: Bragi, eloquência e poesia." }],
  var: [{ id: "gylfaginning", note: "Capítulo 35: Vár, os acordos e os juramentos." }],
  liosalfar: [{ id: "gylfaginning", note: "Capítulo 17: distinção de Snorri entre elfos da luz e elfos escuros. Não generalizar essa classificação para todas as fontes." }],
  docalfar: [{ id: "gylfaginning", note: "Capítulo 17: descrição dos Dökkálfar. A relação entre elfos escuros e anões não é uma taxonomia uniforme." }],
  asgard: [{ id: "gylfaginning", note: "Capítulos 9, 14 e 42: morada dos deuses, salões e construção da muralha." }],
  vanaheim: [{ id: "gylfaginning", note: "Capítulo 23: origem de Njord entre os Vanir. A fonte não descreve uma geografia detalhada de Vanaheim." }],
  alfheim: [{ id: "gylfaginning", note: "Capítulo 17: Álfheimr e os elfos da luz." }, { id: "grimnismol", note: "Estrofe 5: Álfheimr dado a Freyr." }],
  midgard: [{ id: "gylfaginning", note: "Capítulo 8: a construção de Midgard com as sobrancelhas de Ymir." }],
  jotunheim: [{ id: "gylfaginning", note: "Capítulos 45–47: viagem de Thor e o domínio de Útgarða-Loki." }],
  muspelheim: [{ id: "gylfaginning", note: "Capítulos 4–5 e 51: o calor primordial, Surtr e a batalha final." }],
  niflheim: [{ id: "gylfaginning", note: "Capítulos 4–5 e 15: Hvergelmir, o frio primordial e a raiz de Yggdrasil." }],
  svartalfheim: [{ id: "gylfaginning", note: "Capítulo 34: a viagem de Skírnir aos anões para obter Gleipnir." }],
  helheim: [{ id: "gylfaginning", note: "Capítulos 34 e 49: o domínio de Hel e a viagem de Hermóðr. Diferenciar a governante do lugar." }],
  "ragnarok-o-crepusculo-dos-deuses": [
    {
      id: "voluspo",
      note: "A profecia da destruição e renovação do mundo; compare a sequência do poema com a narrativa de Snorri.",
    },
  ],
  odin: [
    {
      id: "gylfaginning",
      note: "Capítulos 20 e 38: Odin e os corvos que lhe trazem notícias.",
    },
  ],
  thor: [
    {
      id: "gylfaginning",
      note: "Capítulos 21, 44 e 48: atributos de Thor, os bodes e a pescaria.",
    },
  ],
  tyr: [
    { id: "gylfaginning", note: "Capítulos 25, 34 e 51: Týr, Fenrir e Garm." },
  ],
  heimdall: [
    {
      id: "gylfaginning",
      note: "Capítulo 27: o guardião da ponte dos deuses.",
    },
  ],
  hermod: [
    {
      id: "gylfaginning",
      note: "Capítulo 49: a viagem ao reino de Hel após a morte de Baldr.",
    },
  ],
  njord: [
    {
      id: "gylfaginning",
      note: "Capítulo 23: Njord, Nóatún e sua união com Skadi.",
    },
  ],
  freyr: [
    {
      id: "gylfaginning",
      note: "Capítulos 24 e 37: Freyr e o relato de Gerd.",
    },
  ],
  freya: [
    { id: "gylfaginning", note: "Capítulos 24 e 35: Freyja e seus atributos." },
  ],
  kvasir: [
    {
      id: "skaldskaparmal",
      note: "A narrativa do hidromel da poesia: Kvasir, os anões e Odin.",
    },
  ],
  iduna: [
    {
      id: "skaldskaparmal",
      note: "O relato inicial do rapto de Iðunn por Thiazi.",
    },
  ],
  sif: [
    {
      id: "skaldskaparmal",
      note: "Capítulo 35: os cabelos de Sif e a fabricação dos tesouros divinos.",
    },
  ],
  brokkr: [
    {
      id: "skaldskaparmal",
      note: "Capítulo 35: a aposta dos ferreiros com Loki.",
    },
  ],
  eitri: [
    {
      id: "skaldskaparmal",
      note: "Capítulo 35: o ferreiro chamado Sindri nesta tradução.",
    },
  ],
  andvari: [
    {
      id: "skaldskaparmal",
      note: "Capítulos 39–40: o resgate de Ótr e o ouro amaldiçoado.",
    },
  ],
  reginn: [
    {
      id: "skaldskaparmal",
      note: "Capítulos 39–40 e sequência: a família de Hreidmar e o tesouro.",
    },
  ],
  fafnir: [
    {
      id: "fafnismol",
      note: "O diálogo entre Sigurd e Fafnir; compare o poema com interpretações posteriores.",
    },
  ],
  sigurd: [
    { id: "fafnismol", note: "O episódio de Fafnir no ciclo de Sigurd." },
  ],
  nornir: [
    {
      id: "gylfaginning",
      note: "Capítulos 15–16: as Nornas e o cuidado de Yggdrasil.",
    },
  ],
};
export function furtherReading(slug: string) {
  return (passages[slug] || []).map((p) => ({
    ...references.find((r) => r.id === p.id)!,
    note: p.note,
  }));
}
