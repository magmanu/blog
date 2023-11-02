"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7114],{3905:(e,a,o)=>{o.d(a,{Zo:()=>s,kt:()=>b});var t=o(7294);function i(e,a,o){return a in e?Object.defineProperty(e,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[a]=o,e}function r(e,a){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),o.push.apply(o,t)}return o}function n(e){for(var a=1;a<arguments.length;a++){var o=null!=arguments[a]?arguments[a]:{};a%2?r(Object(o),!0).forEach((function(a){i(e,a,o[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(o,a))}))}return e}function p(e,a){if(null==e)return{};var o,t,i=function(e,a){if(null==e)return{};var o,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)o=r[t],a.indexOf(o)>=0||(i[o]=e[o]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)o=r[t],a.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}var l=t.createContext({}),m=function(e){var a=t.useContext(l),o=a;return e&&(o="function"==typeof e?e(a):n(n({},a),e)),o},s=function(e){var a=m(e.components);return t.createElement(l.Provider,{value:a},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},d=t.forwardRef((function(e,a){var o=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=m(o),d=i,b=u["".concat(l,".").concat(d)]||u[d]||c[d]||r;return o?t.createElement(b,n(n({ref:a},s),{},{components:o})):t.createElement(b,n({ref:a},s))}));function b(e,a){var o=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var r=o.length,n=new Array(r);n[0]=d;var p={};for(var l in a)hasOwnProperty.call(a,l)&&(p[l]=a[l]);p.originalType=e,p[u]="string"==typeof e?e:i,n[1]=p;for(var m=2;m<r;m++)n[m]=o[m];return t.createElement.apply(null,n)}return t.createElement.apply(null,o)}d.displayName="MDXCreateElement"},3205:(e,a,o)=>{o.r(a),o.d(a,{assets:()=>l,contentTitle:()=>n,default:()=>c,frontMatter:()=>r,metadata:()=>p,toc:()=>m});var t=o(7462),i=(o(7294),o(3905));const r={slug:"migrate-codecommit-to-github",title:"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify",authors:"manu",tags:["infra","github","amplify","aws","ci/cd","tutorial"]},n=void 0,p={permalink:"/blog/pt-BR/tech/migrate-codecommit-to-github",source:"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2021-10-13-migrate-codecommit-to-github/index.md",title:"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify",description:"Este tutorial inclui orienta\xe7\xf5es para tr\xeas cen\xe1rios de administra\xe7\xe3o no GitHub:",date:"2021-10-13T00:00:00.000Z",formattedDate:"13 de outubro de 2021",tags:[{label:"infra",permalink:"/blog/pt-BR/tech/tags/infra"},{label:"github",permalink:"/blog/pt-BR/tech/tags/github"},{label:"amplify",permalink:"/blog/pt-BR/tech/tags/amplify"},{label:"aws",permalink:"/blog/pt-BR/tech/tags/aws"},{label:"ci/cd",permalink:"/blog/pt-BR/tech/tags/ci-cd"},{label:"tutorial",permalink:"/blog/pt-BR/tech/tags/tutorial"}],readingTime:4.895,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"Engenheira de DevSecOps",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"migrate-codecommit-to-github",title:"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify",authors:"manu",tags:["infra","github","amplify","aws","ci/cd","tutorial"]},prevItem:{title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",permalink:"/blog/pt-BR/tech/terraform-ternary-error"}},l={authorsImageUrls:[void 0]},m=[{value:"Migrando o Repo",id:"migrando-o-repo",level:2},{value:"Confirme",id:"confirme",level:3},{value:"Arrume",id:"arrume",level:3},{value:"Redirecionando a pipeline do Amplify",id:"redirecionando-a-pipeline-do-amplify",level:2},{value:"Execute o comando <code>update-app</code>",id:"execute-o-comando-update-app",level:3},{value:"Reautentique o app Amplify",id:"reautentique-o-app-amplify",level:3},{value:"A Abordagem via Webhook",id:"a-abordagem-via-webhook",level:3},{value:"Limita\xe7\xf5es do webhook",id:"limita\xe7\xf5es-do-webhook",level:3}],s={toc:m},u="wrapper";function c(e){let{components:a,...r}=e;return(0,i.kt)(u,(0,t.Z)({},s,r,{components:a,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Este tutorial inclui orienta\xe7\xf5es para tr\xeas cen\xe1rios de administra\xe7\xe3o no GitHub:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Quando o repo est\xe1 na sua conta pessoal;"),(0,i.kt)("li",{parentName:"ol"},"Quando o repo est\xe1 dentro de uma organiza\xe7\xe3o no GitHub e a galera da administra\xe7\xe3o te d\xe1 as permiss\xf5es necess\xe1rias; e"),(0,i.kt)("li",{parentName:"ol"},"Quando o repo est\xe1 dentro de uma organiza\xe7\xe3o no GitHub e a galera da administra\xe7\xe3o N\xc3O te d\xe1 as permiss\xf5es necess\xe1rias.")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Pr\xe9-requisitos: Acesso e permiss\xf5es relevantes para CodeCommit e Amplify. Voc\xea tamb\xe9m precisa de uma conta ativa no GitHub.")),(0,i.kt)("h2",{id:"migrando-o-repo"},"Migrando o Repo"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Abra o terminal e fa\xe7a cd para a pasta onde est\xe1 o repo do CodeCommit."),(0,i.kt)("li",{parentName:"ol"},"Execute ",(0,i.kt)("inlineCode",{parentName:"li"},"git remote get-url origin")," para obter o URL para clonar o projeto a ser migrado para o GitHub."),(0,i.kt)("li",{parentName:"ol"},"Crie uma pasta tempor\xe1ria executando ",(0,i.kt)("inlineCode",{parentName:"li"},"mkdir ../temp-clone")," e abra-a na CLI executando ",(0,i.kt)("inlineCode",{parentName:"li"},"cd ../temp-clone"),"."),(0,i.kt)("li",{parentName:"ol"},"Execute ",(0,i.kt)("inlineCode",{parentName:"li"},"git clone --bare")," seguido do URL que voc\xea pegou na etapa 2. Um exemplo seria ",(0,i.kt)("inlineCode",{parentName:"li"},"git clone --bare <https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/nome-do-diretorio-do-codecommit>"),".")),(0,i.kt)("br",null),(0,i.kt)("admonition",{title:"Nota Educativa",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"O sufixo (flag) ",(0,i.kt)("inlineCode",{parentName:"p"},"--bare")," \xe9 uma forma de clonar o repo cortando todos os v\xednculos com o remoto (CodeCommit, neste caso). Voc\xea ainda vai ter todos os branches, tags e tal, mas o repo clonado fica completamente independente do remoto.")),(0,i.kt)("br",null),(0,i.kt)("ol",{start:5},(0,i.kt)("li",{parentName:"ol"},"Crie um novo repo no GitHub. Para evitar problemas, n\xe3o adicione nenhum README, .gitignore nem nada. Depois de clicar em \u201cCreate repo\u201d (Criar repo), a \xfanica coisa a fazer \xe9 copiar o URL como mostrado abaixo. N\xe3o execute nenhum git init, n\xe3o fa\xe7a um commit inicial, nada. S\xf3 copia o link.")),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Git clone SSH",src:o(2150).Z,width:"1400",height:"508"})),(0,i.kt)("br",null),(0,i.kt)("ol",{start:6},(0,i.kt)("li",{parentName:"ol"},"Voltando ao terminal, execute ",(0,i.kt)("inlineCode",{parentName:"li"},"cd nome-do-diretorio-do-codecommit.git"),", e depois fa\xe7a um push mirror seguido pelo URL que voc\xea obteve na etapa 5. No exemplo acima, o comando seria ",(0,i.kt)("inlineCode",{parentName:"li"},"git push --mirror <https://github.com/my-username/my-project.git>"),".")),(0,i.kt)("p",null,"\xc9 isso, a migra\xe7\xe3o acabou."),(0,i.kt)("h3",{id:"confirme"},"Confirme"),(0,i.kt)("p",null,"Para confirmar que deu tudo certo, volte ao GitHub e atualize a p\xe1gina. O repo vai estar todo bonitinho l\xe1, com hist\xf3rico de commits, as branches e o resto todo.",(0,i.kt)("br",{parentName:"p"}),"\n","Para usar repo migrado para o GitHub, \xe9 s\xf3 fazer o clone de sempre e seguir com a vida :)"),(0,i.kt)("h3",{id:"arrume"},"Arrume"),(0,i.kt)("p",null,"Se voc\xea seguiu as instru\xe7\xf5es, agora \xe9 hora de excluir sua pasta tempor\xe1ria. Volte para o terminal e execute ",(0,i.kt)("inlineCode",{parentName:"p"},"cd ../..")," e ",(0,i.kt)("inlineCode",{parentName:"p"},"rm -rf temp-clone"),". Se voc\xea usou a pasta tmp do sistema operacional, pode pular essa etapa."),(0,i.kt)("h2",{id:"redirecionando-a-pipeline-do-amplify"},"Redirecionando a pipeline do Amplify"),(0,i.kt)("p",null,"Agora que voc\xea migrou o c\xf3digo para o GitHub, como voc\xea mant\xe9m a pipeline Amplify que estava ligada ao repo no CodeCommit?"),(0,i.kt)("h3",{id:"execute-o-comando-update-app"},"Execute o comando ",(0,i.kt)("inlineCode",{parentName:"h3"},"update-app")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"AWS_PROFILE=PERFIL AWS_DEFAULT_REGION=REGI\xc3O aws amplify update-app --app-id AMPLIFY_APP_ID --repository REPOSITORY_URL --access-token ACCESS_TOKEN\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"AMPLIFY_APP_ID"),": para encontrar a ID da sua aplica\xe7\xe3o, acesse o console do Amplify. Em App settings (Configura\xe7\xf5es do aplicativo), clique em General (Geral) e procure o ARN da aplica\xe7\xe3o. A ID da aplica\xe7\xe3o \xe9 a sequ\xeancia alfanum\xe9rica no final do ARN. A ID \xe9 mostrada como REDACTED na imagem abaixo:"),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Amplify App Id",src:o(6397).Z,width:"1400",height:"459"})),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"REPOSITORY_URL"),": \xc9 o URL que voc\xea usou na etapa 5 da migra\xe7\xe3o.",(0,i.kt)("br",{parentName:"p"}),"\n",(0,i.kt)("inlineCode",{parentName:"p"},"ACCESS_TOKEN"),": o token de acesso \xe9 um token que voc\xea pode gerar no GitHub. Pode ser o PAT (token de acesso pessoal) de quem administra o repo, mas se for um projeto profissional, prefira usar um ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/pt/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app"},"token de acesso do usu\xe1rio gerado por um app no GitHub"),"."),(0,i.kt)("h3",{id:"reautentique-o-app-amplify"},"Reautentique o app Amplify"),(0,i.kt)("admonition",{title:"XP da vida real",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"As empresas podem restringir bastante quais apps s\xe3o aprovados no GitHub. Se por algum motivo o app Amplify n\xe3o for aprovado, pule para a se\xe7\xe3o ",(0,i.kt)("a",{parentName:"p",href:"#a-abordagem-via-webhook"},'"A abordagem via Webhook"'),".")),(0,i.kt)("p",null,"Agora voc\xea pode reconectar sua aplica\xe7\xe3o. Na mesma p\xe1gina em que obteve o ARN, acima do ARN tem o bot\xe3o \u201cReconnect repository\u201d (Reconectar reposit\xf3rio). Ao clicar nele, a p\xe1gina de aprova\xe7\xe3o no GitHub \xe9 aberta."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Se o reposit\xf3rio migrado N\xc3O estiver em uma Organiza\xe7\xe3o"),", clique no bot\xe3o \u201cAuthorize aws-amplify-console\u201d (Autorizar aws-amplify-console). O console do Amplify vai abrir, e l\xe1 voc\xea pode selecionar o repo. Pronto, fim."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Se o reposit\xf3rio migrado estiver em uma Organiza\xe7\xe3o"),", clique no bot\xe3o para solicitar a permiss\xe3o OAuth para o app Amplify. Uma mensagem de solicita\xe7\xe3o pendente fica dispon\xedvel at\xe9 que a administra\xe7\xe3o a aprove (voc\xea vai receber um e-mail quando isso acontecer).")),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Authorize Amplify Github App",src:o(1035).Z,width:"1186",height:"1206"})),(0,i.kt)("br",null),(0,i.kt)("p",null,"Depois da aprova\xe7\xe3o, volte para o app Amplify e clique em \u201cReconnect repository\u201d (Reconectar reposit\xf3rio) novamente. Os repos da sua organiza\xe7\xe3o e da sua pr\xf3pria conta aparecem, para voc\xea escolher um deles. Fim."),(0,i.kt)("h3",{id:"a-abordagem-via-webhook"},"A Abordagem via Webhook"),(0,i.kt)("p",null,"Se voc\xea n\xe3o puder usar o app Amplify no GitHub, voc\xea pode usar um webhook. Para isso, em App settings (Configura\xe7\xf5es do aplicativo), clique em General (Geral), selecione Build Settings (Configura\xe7\xf5es de compila\xe7\xe3o) e clique em Create Webhook (Criar Webhook),  ambos mostrados em laranja abaixo."),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Amplify Build Settings",src:o(1603).Z,width:"1181",height:"295"})),(0,i.kt)("br",null),(0,i.kt)("p",null,"No pop-up, digite um nome e selecione um branch para fazer o build. O novo webhook ser\xe1 exibido na interface do Amplify. Copie o URL porque vamos precisar dele no GitHub."),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Amplify Incming Webhooks",src:o(4831).Z,width:"769",height:"234"})),(0,i.kt)("br",null),(0,i.kt)("p",null,"Agora volte para o repo no GitHub, selecione Configura\xe7\xf5es > Webhooks e clique no bot\xe3o Add webhook (Adicionar webhook)."),(0,i.kt)("br",null),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Adding GitHub Webhooks",src:o(3926).Z,width:"1264",height:"868"})),(0,i.kt)("p",null,"Acabou, finalmente."),(0,i.kt)("h3",{id:"limita\xe7\xf5es-do-webhook"},"Limita\xe7\xf5es do webhook"),(0,i.kt)("p",null,"Se voc\xea usar o webhook, lembre-se de que:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Se precisar conectar v\xe1rios branches ao Amplify, voc\xea vai precisar de um webhook no Amplify para cada branch, e vai precisar adicionar cada webhook ao GitHub, um por um. Se bater a tenta\xe7\xe3o de fazer um script, converse com a galera que faz admin do Github na sua empresa e tenta aprovar o app Amplify. Ningu\xe9m merece viver na gambiarra.  "),(0,i.kt)("li",{parentName:"ul"},"Qualquer git push vai espuletar o webhook em cada deploy no Amplify. Em outras palavras, se voc\xea tiver as branches \u201cmain\u201d, \u201crelease\u201d, \u201cdev\u201d, \u201cfeature/a\u201d e \u201cfeature/b\u201d, toda vez que algu\xe9m fizer um push em \u201cdev\u201d, a pipeline vai espuletar em todas as cinco branches.")),(0,i.kt)("p",null,"Espero ter sido \xfatil, at\xe9 mais!"))}c.isMDXComponent=!0},1603:(e,a,o)=>{o.d(a,{Z:()=>t});const t=o.p+"assets/images/amplify_build_settings-937fb3f3220996941f487bd5ed440afe.webp"},6397:(e,a,o)=>{o.d(a,{Z:()=>t});const t=o.p+"assets/images/amplify_data-ed02eb0516b95e7d3782a0b619920733.webp"},4831:(e,a,o)=>{o.d(a,{Z:()=>t});const t=o.p+"assets/images/amplify_incoming_webhooks-e4c6bd369f275c88df521b33d531b072.webp"},1035:(e,a,o)=>{o.d(a,{Z:()=>t});const t=o.p+"assets/images/authorize_amplify_app-0c09d0e0746dd8ee0e5bf2f70539c74a.webp"},2150:(e,a,o)=>{o.d(a,{Z:()=>t});const t=o.p+"assets/images/clone_ssh-5be730cf4d2ec7e3548855fc55af9e16.webp"},3926:(e,a,o)=>{o.d(a,{Z:()=>t});const t=o.p+"assets/images/github_webhooks-143154a73be16465c0004e7d5de274d3.webp"}}]);