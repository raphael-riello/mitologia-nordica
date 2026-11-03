export const references = [
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
