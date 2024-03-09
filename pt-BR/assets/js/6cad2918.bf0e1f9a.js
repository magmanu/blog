"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8366],{3905:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>h});var o=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,o,n=function(e,a){if(null==e)return{};var t,o,n={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=o.createContext({}),u=function(e){var a=o.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},p=function(e){var a=u(e.components);return o.createElement(l.Provider,{value:a},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return o.createElement(o.Fragment,{},a)}},c=o.forwardRef((function(e,a){var t=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(t),c=n,h=d["".concat(l,".").concat(c)]||d[c]||m[c]||r;return t?o.createElement(h,i(i({ref:a},p),{},{components:t})):o.createElement(h,i({ref:a},p))}));function h(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var r=t.length,i=new Array(r);i[0]=c;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s[d]="string"==typeof e?e:n,i[1]=s;for(var u=2;u<r;u++)i[u]=t[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}c.displayName="MDXCreateElement"},7942:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>u});var o=t(7462),n=(t(7294),t(3905));const r={slug:"github-actions-data-flow",title:"GitHub Actions: Fluxo e Persist\xeancia de Dados em Workflows",authors:"manu",tags:["github actions","ci/cd","pipeline"]},i=void 0,s={permalink:"/blog/pt-BR/tech/github-actions-data-flow",source:"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2023-10-31-github-actions-data-flow/index.md",title:"GitHub Actions: Fluxo e Persist\xeancia de Dados em Workflows",description:"Quando se trata de Github Actions, os dados n\xe3o s\xe3o persistentes por natureza, nem ficam dispon\xedveis para todo o pipeline. Cada etapa (step) tem seu pr\xf3prio processo, cada trabalho (job) tem seu pr\xf3prio executor (runner). Por padr\xe3o, quaisquer dados que surjam em um trabalho terminam com ele.",date:"2023-10-31T00:00:00.000Z",formattedDate:"31 de outubro de 2023",tags:[{label:"github actions",permalink:"/blog/pt-BR/tech/tags/github-actions"},{label:"ci/cd",permalink:"/blog/pt-BR/tech/tags/ci-cd"},{label:"pipeline",permalink:"/blog/pt-BR/tech/tags/pipeline"}],readingTime:9.08,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"Engenheira de DevSecOps",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"github-actions-data-flow",title:"GitHub Actions: Fluxo e Persist\xeancia de Dados em Workflows",authors:"manu",tags:["github actions","ci/cd","pipeline"]},nextItem:{title:"Como Gerar JSON Din\xe2mico no Terraform",permalink:"/blog/pt-BR/tech/dynamic-json-in-terraform"}},l={authorsImageUrls:[void 0]},u=[{value:"Como usar <code>env</code>",id:"como-usar-env",level:2},{value:"Dica de debug",id:"dica-de-debug",level:4},{value:"Como usar <code>outputs</code>",id:"como-usar-outputs",level:2},{value:"Como usar  artefatos",id:"como-usar--artefatos",level:2},{value:"Subir artefatos",id:"subir-artefatos",level:3},{value:"Baixar artefatos",id:"baixar-artefatos",level:3},{value:"Apagar artefatos",id:"apagar-artefatos",level:3},{value:"Como usar cache",id:"como-usar-cache",level:2}],p={toc:u},d="wrapper";function m(e){let{components:a,...t}=e;return(0,n.kt)(d,(0,o.Z)({},p,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Quando se trata de Github Actions, os dados n\xe3o s\xe3o persistentes por natureza, nem ficam dispon\xedveis para todo o pipeline. Cada etapa (step) tem seu pr\xf3prio processo, cada trabalho (job) tem seu pr\xf3prio executor (runner). Por padr\xe3o, quaisquer dados que surjam em um trabalho terminam com ele."),(0,n.kt)("p",null,"Ent\xe3o, como podemos passar dados de um processo para outro, ou salvar dados para uma execu\xe7\xe3o futura?"),(0,n.kt)("p",null,"A resposta r\xe1pida e certeira \xe9 essa:"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Estrat\xe9gia"),(0,n.kt)("th",{parentName:"tr",align:null},"Dados"),(0,n.kt)("th",{parentName:"tr",align:null},"Escopo"),(0,n.kt)("th",{parentName:"tr",align:null},"Persist\xeancia"),(0,n.kt)("th",{parentName:"tr",align:null},"Detalhes"),(0,n.kt)("th",{parentName:"tr",align:null},"Exemplo"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"env")),(0,n.kt)("td",{parentName:"tr",align:null},"Valores"),(0,n.kt)("td",{parentName:"tr",align:null},"Trabalho (interno)"),(0,n.kt)("td",{parentName:"tr",align:null},"Ef\xeamero"),(0,n.kt)("td",{parentName:"tr",align:null},"Propaga ",(0,n.kt)("em",{parentName:"td"},"dados")," ",(0,n.kt)("br",null)," entre ",(0,n.kt)("em",{parentName:"td"},"etapas")," ",(0,n.kt)("br",null)," no mesmo ",(0,n.kt)("em",{parentName:"td"},"trabalho")),(0,n.kt)("td",{parentName:"tr",align:null},"Passar um booleano para determinar se a pr\xf3xima estapa deve ser executada")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"outputs")),(0,n.kt)("td",{parentName:"tr",align:null},"Valores"),(0,n.kt)("td",{parentName:"tr",align:null},"Fluxo de trabalho (interno)"),(0,n.kt)("td",{parentName:"tr",align:null},"Ef\xeamero"),(0,n.kt)("td",{parentName:"tr",align:null},"Propaga ",(0,n.kt)("em",{parentName:"td"},"dados")," ",(0,n.kt)("br",null)," entre ",(0,n.kt)("em",{parentName:"td"},"trabalhos/etapas")," ",(0,n.kt)("br",null)," no mesmo ",(0,n.kt)("em",{parentName:"td"},"fluxo de trabalho")),(0,n.kt)("td",{parentName:"tr",align:null},"Passar um ID  para o pr\xf3ximo trabalho")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"artefatos"),(0,n.kt)("td",{parentName:"tr",align:null},"Arquivos"),(0,n.kt)("td",{parentName:"tr",align:null},"Fluxo de trabalho (interno e externo)"),(0,n.kt)("td",{parentName:"tr",align:null},"Persistente"),(0,n.kt)("td",{parentName:"tr",align:null},"Propaga ",(0,n.kt)("em",{parentName:"td"},"arquivos")," ",(0,n.kt)("br",null)," entre ",(0,n.kt)("em",{parentName:"td"},"trabalhos/fluxos de trabalho")),(0,n.kt)("td",{parentName:"tr",align:null},"Passar o build de um projeto para diferentes trabalhos de teste executados em paralelo ",(0,n.kt)("br",null),(0,n.kt)("br",null)," ",(0,n.kt)("em",{parentName:"td"},"Prefer\xeancia a dados que mudam frequentemente. Os arquivos ficam dispon\xedveis para download ap\xf3s o t\xe9rmino do fluxo de trabalho."))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"cache"),(0,n.kt)("td",{parentName:"tr",align:null},"Arquivos"),(0,n.kt)("td",{parentName:"tr",align:null},"Fluxo de trabalho (interno e externo)"),(0,n.kt)("td",{parentName:"tr",align:null},"Persistente"),(0,n.kt)("td",{parentName:"tr",align:null},"Propaga ",(0,n.kt)("em",{parentName:"td"},"arquivos")," ",(0,n.kt)("br",null)," dentro e entre ",(0,n.kt)("em",{parentName:"td"},"fluxos de trabalho")," ",(0,n.kt)("br",null)," no mesmo ",(0,n.kt)("em",{parentName:"td"},"reposit\xf3rio")),(0,n.kt)("td",{parentName:"tr",align:null},"Armazenar pacotes npm em cache para uso em diferentes execu\xe7\xf5es de fluxo de trabalho. ",(0,n.kt)("br",null),(0,n.kt)("br",null)," ",(0,n.kt)("em",{parentName:"td"},"Destinado a arquivos que n\xe3o mudam muito."))))),(0,n.kt)("p",null,"Para uma resposta mais completa, continue lendo.\nTodos os exemplos de fluxo de trabalho neste artigo \u200b\u200b",(0,n.kt)("a",{parentName:"p",href:"https://github.com/magmanu/blog/tree/main/demos/github-actions-data-flow"},"est\xe3o disponiveis em formato de arquivo aqui"),", junto com uma c\xf3pia dos respectivos logs editados (em ingl\xeas)."),(0,n.kt)("h2",{id:"como-usar-env"},"Como usar ",(0,n.kt)("inlineCode",{parentName:"h2"},"env")),(0,n.kt)("p",null,"\xc9 muito simples transferir dados entre etapas: defina um par chave-valor (key/value) e grave-o no arquivo de ambiente ",(0,n.kt)("inlineCode",{parentName:"p"},"GITHUB_ENV"),", usando a sintaxe apropriada para seu shell. Veja exemplos abaixo em bash e python:"),(0,n.kt)("details",null,(0,n.kt)("summary",null,"Exibir c\xf3digo"),(0,n.kt)("div",null,(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="/.github/workflows/using_env.yaml"',title:'"/.github/workflows/using_env.yaml"'},'    steps:\n      - name: Duas formas de definir vari\xe1veis de ambiente\n      # Aviso: nesta etapa, o input n\xe3o foi sanitizado nem validado\n        shell: bash\n        run: |\n          # N\xe3o exibe a vari\xe1vel nos logs.\n          wikipedia_aleatorio_1=$(curl -L -X GET "https://en.wikipedia.org/api/rest_v1/page/random/summary" | jq .title)\n          echo "$wikipedia_aleatorio_1"\n          echo "ARTIGO_1=$wikipedia_aleatorio_1" >> "$GITHUB_ENV"\n          # \ud83d\udc09 Exibe a vari\xe1vel nos logs: use apenas com dados que n\xe3o sejam confidenciais!\n          wikipedia_aleatorio_2=$(curl -L -X GET "https://en.wikipedia.org/api/rest_v1/page/random/summary" | jq .title)\n          echo "ARTIGO_2=$wikipedia_aleatorio_2" | tee -a "$GITHUB_ENV"\n\n      - name: Definir vari\xe1veis de ambiente em python\n        shell: python\n        # se usar "write", use \\n ao criar mais de uma vari\xe1vel\n        # com "print", \\n n\xe3o \xe9 necess\xe1rio\n        run: |\n          from os import environ as env\n          with open(env.get(\'GITHUB_ENV\', None), \'a\') as ghenv:\n            ghenv.write("SUJEITO=Sun\\n")\n            print("ESTADO=radiant", file=ghenv)\n            print("DIA=today", file=ghenv)\n          \n      - name: \ud83d\udee1\ufe0f Recuperando valores de forma segura\n        # observe que ARTIGO_1 n\xe3o foi sanitizado ou validado, por isso, est\xe1 vulner\xe1vel a ataques de inje\xe7\xe3o.\n        # A abordagem abaixo evita o problema ao passar ARTIGO_1 como argumento para o script.\n        # Tamb\xe9m \xe9 poss\xedvel renamear as vari\xe1veis\n        env:\n          QUEM: ${{ env.SUJEITO }}\n          QUE: ${{ env.ARTIGO_1 }}\n          QUANDO: ${{ env.DIA }}\n        run: |\n          echo "$QUEM leu sobre $QUE $QUANDO."\n        \n      - name: \ud83d\udc09 Recuperando valores de forma potencialmente vulner\xe1vel\n        # Esta abordagem \xe9 vulner\xe1vel a ataques de inje\xe7\xe3o!\n        # Use apenas se voc\xea tiver controle sobre o input\n        shell: bash\n        run: |\n          echo "${{ env.SUJEITO }} est\xe1 ${{ env.ESTADO }} ${{ env.DIA }}."\n')))),(0,n.kt)("h4",{id:"dica-de-debug"},"Dica de debug"),(0,n.kt)("p",null,"Para listar todas as vari\xe1veis \u200b\u200bde ambiente dispon\xedveis em um trabalho, adicione esta pequena etapa:"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"- run: env")),(0,n.kt)("h2",{id:"como-usar-outputs"},"Como usar ",(0,n.kt)("inlineCode",{parentName:"h2"},"outputs")),(0,n.kt)("p",null,"Os outputs ficam dispon\xedveis para todas as etapas do mesmo trabalho e para qualquer trabalho subsequente que precise deles.\nOutputs sempre s\xe3o ",(0,n.kt)("strong",{parentName:"p"},"strings")," unicode."),(0,n.kt)("p",null,"E obviamente, trabalhos que dependem de um ",(0,n.kt)("inlineCode",{parentName:"p"},"output")," n\xe3o ser\xe3o executados em paralelo com o trabalho que produz o output."),(0,n.kt)("details",null,(0,n.kt)("summary",null,"Mostrar c\xf3digo"),(0,n.kt)("div",null,(0,n.kt)("p",null,"Para simplificar, o output foi definido em bash, mas voc\xea pode usar o shell que preferir."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="/.github/workflows/outputs-for-different-job.yaml"',title:'"/.github/workflows/outputs-for-different-job.yaml"'},'jobs:\n  definicao-de-output:\n    runs-on: ubuntu-latest\n    // highlight-start\n    outputs:  # Obrigat\xf3rio: defina o output no trabalho para que fique dispon\xedvel a outros trabalhos\n      nome: ${{ steps.valor-estatico.outputs.NOME }}\n      lugar: ${{ steps.valor-dinamico.outputs.LUGAR }}\n    // highlight-end\n    steps:\n      - id: valor-estatico\n        run: |\n          // highlight-next-line\n          echo "NOME=Marcela" >> "$GITHUB_OUTPUT"\n      \n      - id: valor-dinamico\n        # Observe o use de jq -c para obter o valor como uma \xfanica linha\n        run: |\n          lugar=$(curl -H "Accept: application/json" https://randomuser.me/api/ | jq -c .results[].lugar)\n          // highlight-next-line\n          echo "LUGAR=$lugar" > "$GITHUB_OUTPUT"\n\n  recuperacao-de--outputs:\n    runs-on: ubuntu-latest\n    needs: definicao-de-output\n    steps:\n      - name: boas-vindas\n        run: |\n          PAIS=$(echo $GEODATA | jq -r . | jq .PAIS)\n          echo "Ol\xe1 $nome! $PAIS \xe9/s\xe3o um lindo pa\xeds, divirta-se!"\n         // highlight-start\n        env:\n          name: ${{needs.definicao-de-output.outputs.nome}}\n          GEODATA: ${{ needs.definicao-de-output.outputs.lugar }}\n        // highlight-end\n')))),(0,n.kt)("p",null,"Embora seja recomendado usar ",(0,n.kt)("inlineCode",{parentName:"p"},"env")," para passar dados entre etapas, ",(0,n.kt)("inlineCode",{parentName:"p"},"outputs")," tamb\xe9m pode ser usado. Isso \xe9 \xfatil quando um valor \xe9 necess\xe1rio tanto no trabalho atual quanto nos trabalhos a seguir."),(0,n.kt)("details",null,(0,n.kt)("summary",null,"Mostrar c\xf3digo"),(0,n.kt)("div",null,(0,n.kt)("p",null,"O exemplo anterior mostrou como usar outputs em diferentes trabalhos.\nPara usar um output no trabalho em que ele \xe9 definido, basta adicionar o c\xf3digo em destaque abaixo."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="/.github/workflows/outputs-for-same-job.yaml"',title:'"/.github/workflows/outputs-for-same-job.yaml"'},'jobs:\n  definicao-de-output:\n    runs-on: ubuntu-latest\n    outputs:\n      name: ${{ steps.valor-estatico.outputs.NOME }}\n      lugar: ${{ steps.valor-dinamico.outputs.LUGAR }}\n    steps:\n      - id: valor-estatico\n        run: |\n          echo "NOME=Marcela" >> "$GITHUB_OUTPUT"\n      // highlight-start\n      - name: Consumir o output no mesmo trabalho\n        run: |\n          echo "$NOME, $GEODATA \xe9 sua localiza\xe7\xe3o. Atualizamos seu fuso hor\xe1rio para GMT$OFFSET."\n        env:\n          NOME: ${{ steps.valor-estatico.outputs.NOME }}\n          # Use fromJSON() direto no env ao filtrar o valor do output ainda no env\n          # Veja mais sobre filtragem de objetos em  \n          # https://docs.github.com/en/actions/learn-github-actions/expressions#object-filters\n          GEODATA: ${{ fromJSON(steps.valor-dinamico.outputs.LUGAR).country }}\n          OFFSET: ${{ fromJSON(steps.valor-dinamico.outputs.LUGAR).timezone.offset }}\n      // highlight-end\n\n    (...)\n')))),(0,n.kt)("admonition",{title:"Dica de debug",type:"info"},(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},"Um output individual deve ter no m\xe1ximo 1 MB."),(0,n.kt)("li",{parentName:"ul"},"Todos os outputs combinados n\xe3o devem exceder 50MB."))),(0,n.kt)("br",null),(0,n.kt)("admonition",{title:"XP da vida Real",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("inlineCode",{parentName:"p"},"GITHUB_OUTPUT")," espera uma string de apenas uma linha.\nSe precisar de um output com v\xe1rias linhas, atribua-as a uma vari\xe1vel e construa o output assim:"),(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'echo "NOME_DO_PAYLOAD<<EOF"$\'\\n\'"$valor_do_payload"$\'\\n\'EOF >> "$GITHUB_OUTPUT".\n'))),(0,n.kt)("h2",{id:"como-usar--artefatos"},"Como usar  artefatos"),(0,n.kt)("p",null,"A documenta\xe7\xe3o diz: ",(0,n.kt)("em",{parentName:"p"},"Use artefatos quando desejar salvar arquivos produzidos por um trabalho para visualiza\xe7\xe3o ap\xf3s o t\xe9rmino da execu\xe7\xe3o do fluxo de trabalho, como bin\xe1rios compilados ou logs de compila\xe7\xe3o"),". (tradu\xe7\xe3o livre)"),(0,n.kt)("h3",{id:"subir-artefatos"},"Subir artefatos"),(0,n.kt)("p",null,"Voc\xea pode:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"selecionar um ou v\xe1rios arquivos para serem agrupados como um artefato."),(0,n.kt)("li",{parentName:"ul"},"usar curingas (wildcards), v\xe1rios caminhos (paths) e padr\xf5es (patterns) de exclus\xe3o com a sintaxe de sempre do GitHub Actions."),(0,n.kt)("li",{parentName:"ul"},"definir um per\xedodo de reten\xe7\xe3o para o artefato.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="/.github/workflows/handle-artefacts.yaml"',title:'"/.github/workflows/handle-artefacts.yaml"'},"jobs:\n  upload:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n      - name: Fazer upload de logs\n        uses: actions/upload-artifact@v4\n        with:\n          name: todos-os-logs       # nome do artefato\n          path: |                   # caminho dos arquivos inclu\xeddos no artefato\n            **/log*.txt             # caminhos relativos t\xeam como base o $GITHUB_WORKSPACE\n          retention-days: 1\n          if-no-files-found: error  # for\xe7ar etapa a falhar se o conte\xfado a ser inclu\xeddo no artefato n\xe3o for encontrado\n")),(0,n.kt)("p",null,"Observe que o per\xedodo m\xe1ximo de reten\xe7\xe3o ",(0,n.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration#artifact-and-log-retention-policy"},"pode ser definido em n\xedvel de reposit\xf3rio, organiza\xe7\xe3o ou empresa"),". H\xe1 um m\xe1ximo de 90 dias para reposit\xf3rios p\xfablicos e de 400 dias para reposit\xf3rios privados. Se voc\xea diminuir o per\xedodo de reten\xe7\xe3o, ter\xe1 mais espa\xe7o de gra\xe7a ;)"),(0,n.kt)("h3",{id:"baixar-artefatos"},"Baixar artefatos"),(0,n.kt)("p",null,"Para recuperar o artefato, voc\xea pode usar:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a ",(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/actions/managing-workflow-runs/downloading-workflow-artifacts"},"UI do GitHub")),(0,n.kt)("li",{parentName:"ul"},"a ",(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/rest/actions/artifacts?apiVersion=2022-11-28#download-an-artifact"},"API do GitHub")),(0,n.kt)("li",{parentName:"ul"},"o ",(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/actions/managing-workflow-runs/downloading-workflow-artifacts?tool=cli"},(0,n.kt)("inlineCode",{parentName:"a"},"gh")," cli")),(0,n.kt)("li",{parentName:"ul"},"a a\xe7\xe3o oficial ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/marketplace/actions/download-a-build-artifact"},(0,n.kt)("inlineCode",{parentName:"a"},"actions/download-artifact")),", se precisar recuperar artefatos de maneira program\xe1tica. A partir da ",(0,n.kt)("inlineCode",{parentName:"li"},"v4"),", a a\xe7\xe3o permite baixar artefatos de diferentes fluxos de trabalho ou reposit\xf3rios, desde que voc\xea forne\xe7a um token. (\ud83d\udee1\ufe0f: \xe9 recomendado usar um aplicativo GitHub em vez de um PAT em projetos profissionais.)")),(0,n.kt)("p",null,"Vamos ver como recuperar o artefato que criamos no exemplo anterior usando ",(0,n.kt)("inlineCode",{parentName:"p"},"actions/download-artifact"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="/.github/workflows/handle-artefacts.yaml"',title:'"/.github/workflows/handle-artefacts.yaml"'},'download:\n    runs-on: ubuntu-latest\n    needs: upload\n    steps:\n      - name: Baixar artefatos\n        id: baixar-artefatos\n        uses: actions/download-artifact@v4\n        with:\n          name: todos-os-logs  # \xe9 o nome definido na etapa de upload\n        \n      - name: Usar o artefato em um c\xf3digo python\n        shell: python\n        run: |\n          import os\n          from glob import glob\n          caminho_artefato = os.environ.get("CAMINHO", "")\n          glob_list = glob(caminho_artefato + "/*.txt")\n          for nome_arquivo in glob_list:\n              with open(nome_arquivo, "r", encoding="UTF-8") as f:\n                  conteudo = f.read()\n                  print(conteudo)\n        env:\n          CAMINHO: ${{ steps.baixar-artefatos.outputs.download-path }}\n')),(0,n.kt)("p",null,"As a\xe7\xf5es de upload e download gerenciam o zip e o unzip dos artefatos automaticamente."),(0,n.kt)("h3",{id:"apagar-artefatos"},"Apagar artefatos"),(0,n.kt)("p",null,"Para excluir um artefato, voc\xea pode:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"usar a ",(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/actions/managing-workflow-runs/removing-workflow-artifacts"},"UI do GitHub")),(0,n.kt)("li",{parentName:"ul"},"usar a ",(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/rest/reference/actions#delete-an-artifact"},"API do GitHub")),(0,n.kt)("li",{parentName:"ul"},"escrever um ",(0,n.kt)("a",{parentName:"li",href:"https://gist.github.com/qwe321qwe321qwe321/efae4569576006624c34f23b2dd76a58"},"script personalizado usando a API do Github")," ou usar uma ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/GeekyEggo/delete-artifact"},"a\xe7\xe3o criada pela comunidade"),".")),(0,n.kt)("h2",{id:"como-usar-cache"},"Como usar cache"),(0,n.kt)("admonition",{title:"\ud83d\udc09 Aviso de seguran\xe7a",type:"danger"},(0,n.kt)("p",{parentName:"admonition"},"N\xe3o armazene informa\xe7\xf5es confidenciais no cache (cuidado com arquivos de configura\xe7\xe3o contendo senhas!), pois o cache \xe9 acess\xedvel a qualquer pessoa com direito de criar um PR no reposit\xf3rio - isso inclui forks!")),(0,n.kt)("p",null,"Este post j\xe1 est\xe1 grande demais. Vou tentar ser mais objetiva ao explicar cache:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Se voc\xea estiver usando executores auto-hospedados (self-hosted runners), a op\xe7\xe3o de armazenar o cache na sua pr\xf3pria infra s\xf3 est\xe1 dispon\xedvel nos planos Enterprise.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"A a\xe7\xe3o de cache requer um ",(0,n.kt)("inlineCode",{parentName:"p"},"path")," para o cache e uma ",(0,n.kt)("inlineCode",{parentName:"p"},"key"),". A ",(0,n.kt)("inlineCode",{parentName:"p"},"key")," \xe9 usada para recuperar o cache e recri\xe1-lo numa pr\xf3xima vez.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Quando o trabalho termina, a a\xe7\xe3o injeta automaticamente uma etapa p\xf3s-cache que atualiza o cache caso novas depend\xeancias sejam instaladas.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Esta a\xe7\xe3o gerencia o cache de forma central. Isso significa que o cache fica dispon\xedvel (e atualiz\xe1vel) a todos os trabalhos no mesmo reposit\xf3rio, e tamb\xe9m a outros fluxos de trabalho.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Leia mais sobre ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/actions/cache/blob/main/caching-strategies.md"},"estrat\xe9gias de cache aqui")," (em ingl\xeas)."))),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="/.github/workflows/cache.yaml"',title:'"/.github/workflows/cache.yaml"'},"jobs:\n  cache:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: '3.12'\n          cache: 'pip'\n          cache-dependency-path: |\n            **/requirements.txt\n      \n      - name: Obter diret\xf3rio de cache do  pip\n        id: pip-cache\n        run: |\n          echo \"dir=$(pip cache dir)\" >> $GITHUB_OUTPUT\n\n      - name: Controlar cache para depend\xeancias do python\n        uses: actions/cache@v3\n        id: cache\n        with:\n          path: ${{ steps.pip-cache.outputs.dir }}\n          key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}\n        \n      - name: Instalar depend\xeancias quando cache n\xe3o for id\xeantico\n        if: steps.cache.outputs.cache-hit != 'true'\n        run: pip install -r requirements.txt\n")),(0,n.kt)("p",null,"Se quiser ver a prova do crime, veja os logs salvos (em ingl\xeas):"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://raw.githubusercontent.com/magmanu/blog/main/demos/github-actions-data-flow/31_data_flow_cache_set-cache.txt"},"logs da defini\xe7\xe3o do cache"),": primeira execu\xe7\xe3o, n\xe3o h\xe1 cache, ent\xe3o o cache \xe9 definido"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://raw.githubusercontent.com/magmanu/blog/main/demos/github-actions-data-flow/32_data_flow_cache_use-cache.txt"},"logs do uso do cache"),": na segunda execu\xe7\xe3o, o cache \xe9 encontrado e usado"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://raw.githubusercontent.com/magmanu/blog/main/demos/github-actions-data-flow/33_data_flow_cache_update-cache.txt"},"logs de atualiza\xe7\xe3o do cache"),": o arquivo requirements.txt foi alterado, ent\xe3o o cache n\xe3o coincide. As depend\xeancias s\xe3o reinstaladas e o cache \xe9 atualizado.")),(0,n.kt)("p",null,"Curiosidade: voc\xea notou a fun\xe7\xe3o ",(0,n.kt)("inlineCode",{parentName:"p"},"hashFiles")," usada na etapa acima?",(0,n.kt)("br",{parentName:"p"}),"\n","\xc9 uma fun\xe7\xe3o fornecida pelo GitHub Actions para criar um valor hash exclusivo ligado a um arquivo. Quando o valor do hash n\xe3o coincide, significa que as depend\xeancias foram alteradas, o que invalida o cache. Assim, as depend\xeancias s\xe3o instaladas e o cache \xe9 atualizado em uma tarefa p\xf3s-cache."),(0,n.kt)("p",null,"At\xe9 mais! :)"))}m.isMDXComponent=!0}}]);