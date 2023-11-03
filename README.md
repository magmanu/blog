# blog
<img src="./my-website/static/img/logo_bw_light.png" alt="social-card" width="15%" align="right"/>

| Link | 🇬🇧 | 🇧🇷  |
| --- | :---: | :---: |
| Tech Blog | [Link](https://magmanu.github.io/blog/tech) \| [RSS](https://magmanu.github.io/blog/tech/rss.xml) | [Link](https://magmanu.github.io/blog/tech) \| [RSS](https://magmanu.github.io/blog/pt-br/tech/rss.xml)|
| Personal Blog | [Link](https://magmanu.github.io/blog/personal) \| [RSS](https://magmanu.github.io/blog/personal/rss.xml) | [Link](https://magmanu.github.io/blog/pt-br/personal) \| [RSS](https://magmanu.github.io/blog/pt-br/personal/rss.xml) |

## Welcome! / Boas-vindas!

| 🇬🇧 | 🇧🇷  |
| --- | --- |
| This is where I collect my thoughts. Currently this is a collection of a technical blog and a personal one, in EN and PTBR. You might notice I express myself more freely in Portuguese, though, especially for personal stuff. Give it a read! | Aqui é onde tento arrumar os pensamentos. No momento, minha página reúne um blog técnico e outro pessoal, em PTBR e EN. Como vc talvez note, eu fico mais soltinha em português. Dá uma olhada lá! |

## Implementation / Implementação

| 🇬🇧 | 🇧🇷  |
| --- | --- |
| **How is this different from regular Docusaurus websites?** <br/> This repo houses the UI only. The content is managed in a separate, private repository. When an article is raised to production quality, the content repo pushed a webhook to this repo, which then pulls the content and builds the website. <br/> <br/> I decided to make it so mainly because <br/><br/>1. I realy don't like to make my drafts public <br/>2. GitHub Actions is cool <br/>3. For some reason I want to version the frontend | **O que esse blog tem de diferente de um site Docusaurus normal?**  <br/> Este repo contém apenas a UI. O conteúdo fica em um repo privado e separado. Quando um artigo fica printo para publicação, o repo de conteúdo espoleta um webhook neste repo, que então puxa o conteúdo e faz um build do site.<br/> <br/> Decidi fazer assim principalmente porque <br/><br/> 1. Não gosto que leiam meus rascunhos <br/> 2. GitHub Actions é legal <br/> 3. Sei lá por que mas quero versionar o frontend |

## Local Dev / Desenvolvimento local

`blog`: `tech|personal`

| Command | Description |
| --- | --- |
| make preview | Builds website locally |
| make translateUI | Extracts UI for PTBR translation |
| make translateBR blog=MY_BLOG folder=YYY-MM-DD-slug | Move folder to PTBR section |
