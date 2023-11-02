"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[885],{3905:(e,a,r)=>{r.d(a,{Zo:()=>u,kt:()=>f});var o=r(7294);function t(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function n(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?n(Object(r),!0).forEach((function(a){t(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function s(e,a){if(null==e)return{};var r,o,t=function(e,a){if(null==e)return{};var r,o,t={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],a.indexOf(r)>=0||(t[r]=e[r]);return t}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var l=o.createContext({}),m=function(e){var a=o.useContext(l),r=a;return e&&(r="function"==typeof e?e(a):i(i({},a),e)),r},u=function(e){var a=m(e.components);return o.createElement(l.Provider,{value:a},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var a=e.children;return o.createElement(o.Fragment,{},a)}},d=o.forwardRef((function(e,a){var r=e.components,t=e.mdxType,n=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=m(r),d=t,f=p["".concat(l,".").concat(d)]||p[d]||c[d]||n;return r?o.createElement(f,i(i({ref:a},u),{},{components:r})):o.createElement(f,i({ref:a},u))}));function f(e,a){var r=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var n=r.length,i=new Array(n);i[0]=d;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s[p]="string"==typeof e?e:t,i[1]=s;for(var m=2;m<n;m++)i[m]=r[m];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7489:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>n,metadata:()=>s,toc:()=>m});var o=r(7462),t=(r(7294),r(3905));const n={slug:"terraform-ternary-error",title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",authors:"manu",tags:["infra","terraform","gambiarra","devops"]},i=void 0,s={permalink:"/blog/pt-BR/tech/terraform-ternary-error",source:"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2023-03-18-terraform-ternary-errors/index.md",title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",description:"Voc\xea j\xe1 encontrou esse erro no Terraform, quando o que voc\xea queria era exatamente ter tipos diferentes no resultado do tern\xe1rio?",date:"2023-03-18T00:00:00.000Z",formattedDate:"18 de mar\xe7o de 2023",tags:[{label:"infra",permalink:"/blog/pt-BR/tech/tags/infra"},{label:"terraform",permalink:"/blog/pt-BR/tech/tags/terraform"},{label:"gambiarra",permalink:"/blog/pt-BR/tech/tags/gambiarra"},{label:"devops",permalink:"/blog/pt-BR/tech/tags/devops"}],readingTime:2.68,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"DevSecOps Engineer",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"terraform-ternary-error",title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",authors:"manu",tags:["infra","terraform","gambiarra","devops"]},prevItem:{title:"Como Gerar JSON Din\xe2mico no Terraform",permalink:"/blog/pt-BR/tech/dynamic-json-in-terraform"},nextItem:{title:"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify",permalink:"/blog/pt-BR/tech/migrate-codecommit-to-github"}},l={authorsImageUrls:[void 0]},m=[{value:"Exemplo simples",id:"exemplo-simples",level:2},{value:"Pera, como \xe9 que \xe9?",id:"pera-como-\xe9-que-\xe9",level:3},{value:"Um exemplo menos simples",id:"um-exemplo-menos-simples",level:2}],u={toc:m},p="wrapper";function c(e){let{components:a,...r}=e;return(0,t.kt)(p,(0,o.Z)({},u,r,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("p",null,"Voc\xea j\xe1 encontrou esse erro no Terraform, quando o que voc\xea queria era exatamente ter tipos diferentes no resultado do tern\xe1rio?"),(0,t.kt)("blockquote",null,(0,t.kt)("p",{parentName:"blockquote"},"The true and false result expressions must have consistent types",(0,t.kt)("br",{parentName:"p"}),"\n",(0,t.kt)("em",{parentName:"p"},"Express\xf5es com resultado true ou false devem ter tipos consistentes"))),(0,t.kt)("p",null,"Vou dar dois exemplos de como contornar esse problema, mas a regra geral \xe9 esta aqui:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-terraform"},"atributo = [\n    <valor caso true>, \n    <valor caso false>\n    ][<condicional> ? 0 : 1]\n")),(0,t.kt)("h2",{id:"exemplo-simples"},"Exemplo simples"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-hcl"},'locals {\n    valor_dinamico = [\n      {"regiao": "${var.regiao}"}, \n      "indispon\xedvel"\n      ][var.regiao == "eu-west-1" ? 0 : 1 ]\n}\n')),(0,t.kt)("p",null,"No exemplo acima, ",(0,t.kt)("inlineCode",{parentName:"p"},"local.valor_dinamico")," vai ser avaliado como ",(0,t.kt)("inlineCode",{parentName:"p"},'{"regiao: "eu-west-1"}'),", que \xe9 um ",(0,t.kt)("inlineCode",{parentName:"p"},"objeto"),", se a regi\xe3o da AWS for a Irlanda; e retorna ",(0,t.kt)("inlineCode",{parentName:"p"},'"indispon\xedvel"'),", que \xe9 uma ",(0,t.kt)("inlineCode",{parentName:"p"},"string"),", se for alguma outra regi\xe3o."),(0,t.kt)("h3",{id:"pera-como-\xe9-que-\xe9"},"Pera, como \xe9 que \xe9?"),(0,t.kt)("p",null,"Em vez de usar o tern\xe1rio da maneira tradicional, n\xf3s usamos uma tupla (tamb\xe9m conhecida como lista com tipos mistos) e aproveitamos a estrutura do tern\xe1rio para avaliar qual \xedndice cont\xe9m o valor de que precisamos."),(0,t.kt)("p",null,"No fundo, estamos selecionando se queremos o primeiro ou segundo valor que est\xe1 na tupla, como se fosse  ",(0,t.kt)("inlineCode",{parentName:"p"},"tupla[0]")," ou ",(0,t.kt)("inlineCode",{parentName:"p"},"tupla[1]"),"."),(0,t.kt)("p",null,"Obrigada Mariux pelo truque."),(0,t.kt)("h2",{id:"um-exemplo-menos-simples"},"Um exemplo menos simples"),(0,t.kt)("p",null,"Tamb\xe9m d\xe1 pra fazer coisas mais complexas e din\xe2micas. N\xe3o estou dizendo fica bonito ou que seja recomend\xe1vel, mas \xe0s vezes a gente faz o que tem que ser feito."),(0,t.kt)("p",null,"No meu caso, a l\xf3gica tern\xe1ria que eu precisava era usada em uma Step Function. Eu tinha um objeto, e se esse objeto tivesse s\xf3 uma chave (key), eu precisava de um JSON. Se o objeto tivesse mais do que uma chave, eu precisava de um JSON diferente. "),(0,t.kt)("p",null,"A coisa fica meio feia porque tem l\xf3gica em tudo quanto \xe9 lugar, mas aqui vai o resultado:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-hcl"},'variable "ssm_params" {\n    description = "Par\xe2metro exigido pelo SSM Documents para ativar rota\xe7\xe3o de chaves KMS"\n    default     = [{"KeyId": "States.Array($.KeyId)",\n                    "AutomationAssumeRole": "States.Array($.AutomationAssumeRole)"}]\n}\n\nlocals {\n  choices = [for item in var.ssm_params: [\n    merge(flatten([\n      # Caso: Existe apenas uma condi\xe7\xe3o (isTrue)\n      for key, value in item: {\n        "IsPresent": true,\n        "Next": "SSM-${key}",\n        "Variable": "$.${key}"\n      }\n    ])...), \n    merge([\n      # Caso: Existem v\xe1rias condi\xe7\xf5es (AND) \n      { "And" : [\n          for key, value in item: \n            {\n              "IsPresent": true,\n              "Variable": "$.${key}"\n            }\n        ],\n      "Next": "SSM-${join("", sort([keys(item)]...))}"\n      }\n    ]...)\n    ][length(flatten([keys(item)])) == 1 ? 0 : 1]\n]\n}\n')),(0,t.kt)("p",null,"Minha tupla tem dois valores, os dois come\xe7am com ",(0,t.kt)("inlineCode",{parentName:"p"},"merge")," e resultam em um array de objetos com valores gerados dinamicamente. E como d\xe1 pra ver, a estrutura dos objetos \xe9 em cada caso \xe9 diferente, e foi por isso que a solu\xe7\xe3o padr\xe3o para tern\xe1rios n\xe3o funcionaria."),(0,t.kt)("p",null,"A seguir, a parte do condicional tamb\xe9m \xe9 din\xe2mica. A gente extrai as chaves do objeto, coloca as chaves em um \xfanico array usando ",(0,t.kt)("inlineCode",{parentName:"p"},"flatten")," e avalia o tamanho desse array. Se tiver s\xf3 um elemento no array, o resultado final ser\xe1 o primeiro valor da tupla. Caso contr\xe1rio, o resultado final ser\xe1 o segundo valor da tupla."),(0,t.kt)("p",null,"N\xe3o me pergunte como eu n\xe3o joguei o computador pela janela. Mas funcionou. E eu nunca mais quero precisar fazer uma coisa dessas, porque se a coisa \xe9 declarativa n\xe3o era pra ter l\xf3gica complexa, n\xe9. Enfim. :P"))}c.isMDXComponent=!0}}]);