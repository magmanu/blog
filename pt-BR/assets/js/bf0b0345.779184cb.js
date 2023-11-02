"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7046],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>d});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=o.createContext({}),p=function(e){var r=o.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=p(e.components);return o.createElement(s.Provider,{value:r},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},f=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(t),f=n,d=m["".concat(s,".").concat(f)]||m[f]||u[f]||a;return t?o.createElement(d,i(i({ref:r},c),{},{components:t})):o.createElement(d,i({ref:r},c))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=f;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l[m]="string"==typeof e?e:n,i[1]=l;for(var p=2;p<a;p++)i[p]=t[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}f.displayName="MDXCreateElement"},925:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var o=t(7462),n=(t(7294),t(3905));const a={slug:"terraform-ternary-error",title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",authors:"manu",tags:["infra","terraform","gambiarra","devops"]},i=void 0,l={permalink:"/blog/pt-BR/tech/terraform-ternary-error",source:"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2023-03-18-terraform-ternary-errors/index.md",title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",description:"Voc\xea j\xe1 encontrou esse erro no Terraform, quando o que voc\xea queria era exatamente ter tipos diferentes no resultado do tern\xe1rio?",date:"2023-03-18T00:00:00.000Z",formattedDate:"18 de mar\xe7o de 2023",tags:[{label:"infra",permalink:"/blog/pt-BR/tech/tags/infra"},{label:"terraform",permalink:"/blog/pt-BR/tech/tags/terraform"},{label:"gambiarra",permalink:"/blog/pt-BR/tech/tags/gambiarra"},{label:"devops",permalink:"/blog/pt-BR/tech/tags/devops"}],readingTime:2.68,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"DevSecOps Engineer",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"terraform-ternary-error",title:"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes",authors:"manu",tags:["infra","terraform","gambiarra","devops"]},prevItem:{title:"Como Gerar JSON Din\xe2mico no Terraform",permalink:"/blog/pt-BR/tech/dynamic-json-in-terraform"},nextItem:{title:"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify",permalink:"/blog/pt-BR/tech/migrate-codecommit-to-github"}},s={authorsImageUrls:[void 0]},p=[],c={toc:p},m="wrapper";function u(e){let{components:r,...t}=e;return(0,n.kt)(m,(0,o.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Voc\xea j\xe1 encontrou esse erro no Terraform, quando o que voc\xea queria era exatamente ter tipos diferentes no resultado do tern\xe1rio?"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"The true and false result expressions must have consistent types",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("em",{parentName:"p"},"Express\xf5es com resultado true ou false devem ter tipos consistentes"))),(0,n.kt)("p",null,"Vou dar dois exemplos de como contornar esse problema, mas a regra geral \xe9 esta aqui:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-terraform"},"atributo = [\n    <valor caso true>, \n    <valor caso false>\n    ][<condicional> ? 0 : 1]\n")))}u.isMDXComponent=!0}}]);