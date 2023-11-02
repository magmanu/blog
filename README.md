# blog

🇬🇧 This is where I collect my thoughts. Currently this is a collection of a technical blog and a personal one, in EN and PTBR.
You might notice I express myself more freely in Portuguese, though, especially for personal stuff. Go give it a read at [https://magmanu.github.io/blog/](https://magmanu.github.io/blog/) and select the language of your choice.

🇧🇷 Aqui é onde eu tento arrumar os pensamentos. No momento, minha página reúne um blog técnico e outro pessoal, em PTBR e EN. Como vc talvez note, eu fico mais soltinha em português. Dá uma olhada lá: [https://magmanu.github.io/blog/pt-br](https://magmanu.github.io/blog/pt-BR) e escolha o idioma que preferir.

## Implementation/Implementação

🇬🇧  
**- How is this different from regular Docusaurus websites?**  

This repo houses the UI only. The content is managed in a separate, private repository. When an article is raised to production quality, the content repo pushed a webhook to this repo, which then pulls the content and builds the website.

I decided to make it that way mainly because  
1. I realy don't like to make my drafts public
2. GitHub Actions is cool
3. For some reason I want to version the frontend

🇧🇷
**- O que esse blog tem de diferente de um site Docusaurus normal?**

Este repo contém apenas a UI. O conteúdo fica em um repo privado e separado. Quando um artigo fica printo para publicação, o repo de conteúdo espoleta um webhook neste repo, que então puxa o conteúdo e faz um build do site.

Decidi fazer assim principalmente porque
1. Não gosto que leiam meus rascunhos
2. GitHub Actions é legal
3. Sei lá porque mas quero versionar o frontend

## Commands/Comandos

`blog`: `tech|personal`

| Command | Description |
| --- | --- |
| make preview | Builds website locally |
| make translateUI | Extracts UI for PTBR translation |
| make translateBR blog=MY_BLOG folder=YYY-MM-DD-slug | Move folder to PTBR section |
