import { Link } from "wouter";
import { references } from "@/lib/references";
export default function Sources() {
  return (
    <main className="container max-w-4xl py-12">
      <h1 className="font-display text-4xl text-gold mb-6">
        Fontes e referências
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-6">
        A mitologia nórdica chegou até nós por poemas, narrativas e registros
        preservados em épocas diferentes. Esta seleção reúne traduções públicas
        de textos medievais para comparar os relatos com os verbetes do{" "}
        <Link href="/glossario" className="text-gold underline">
          glossário
        </Link>
        .
      </p>
      <h2 className="font-display text-2xl mb-4">Como ler as fontes</h2>
      <p className="text-muted-foreground mb-6">
        As Eddas não formam um relato único e sem divergências. Uma tradução
        também contém escolhas do tradutor. Distinga o que o texto relata das
        interpretações simbólicas e das adaptações modernas. Leituras
        esotéricas contemporâneas não devem ser tratadas como
        testemunhos medievais. Uma referência de leitura não valida
        automaticamente todas as interpretações de um verbete.
      </p>
      <h2 className="font-display text-2xl mb-4">Critérios editoriais</h2>
      <p className="text-muted-foreground mb-6">
        Nos verbetes revistos, indicamos capítulos ou estrofes e a edição
        utilizada. Um nome em um catálogo não comprova poderes, personalidade ou
        uma biografia. Separamos interpretações editoriais dos relatos; em runas,
        distinguimos escrita, poemas históricos e recepção contemporânea. As
        capas são interpretações artísticas, não reconstruções documentais.
        As notas de tradutores também devem ser distinguidas dos textos que traduzem.
      </p>
      {references.map((ref) => (
        <section
          key={ref.id}
          id={ref.id}
          className="border-t border-border py-6"
        >
          <h2 className="font-display text-xl mb-2">
            <a className="text-gold underline" href={ref.url}>
              {ref.title}
            </a>
          </h2>
          <p className="text-sm text-muted-foreground mb-2">{ref.edition}</p>
          <p className="text-muted-foreground">{ref.scope}</p>
        </section>
      ))}
      <p className="mt-6">
        <Link href="/indice" className="text-gold underline">
          Explorar o índice completo de conteúdos
        </Link>
      </p>
    </main>
  );
}
