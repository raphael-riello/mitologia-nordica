# Imagens responsivas

`ResponsiveImage` usa `client/src/lib/image-variants.json` para servir WebP em
480, 960 e 1600 pixels (sem ampliar imagens menores). Os PNG/JPEG originais
permanecem disponíveis para referências existentes e compartilhamento social.
Imagens sem entrada no manifesto continuam funcionando com a URL original.

Depois de adicionar ou alterar imagens em `client/public/images`, execute:

```sh
node scripts/optimize-images.mjs /caminho/para/node_modules/sharp
```

É necessário ter o pacote `sharp` instalado no ambiente de geração. Se ele
estiver instalado no projeto, o argumento pode ser omitido. A geração não faz
parte do build: inclua os WebP e o manifesto gerados junto com as alterações.

O componente mantém as proporções intrínsecas, usa `srcSet` e `sizes` e preserva
o recorte definido pelo CSS. Os banners acima da dobra recebem prioridade alta;
cards e imagens abaixo da dobra mantêm carregamento lazy.
