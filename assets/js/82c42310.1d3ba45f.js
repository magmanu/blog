"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1446],{3905:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>g});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=a.createContext({}),p=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=p(t.components);return a.createElement(s.Provider,{value:e},t.children)},m="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),m=p(n),d=r,g=m["".concat(s,".").concat(d)]||m[d]||c[d]||l;return n?a.createElement(g,i(i({ref:e},u),{},{components:n})):a.createElement(g,i({ref:e},u))}));function g(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[m]="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2585:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const l={slug:"github-actions-data-flow",title:"GitHub Actions: Data Flow & Data Persistence",authors:"manu",tags:["github actions","ci/cd","pipeline"]},i=void 0,o={permalink:"/blog/tech/github-actions-data-flow",source:"@site/tech/2023-10-31-github-actions-data-flow/index.md",title:"GitHub Actions: Data Flow & Data Persistence",description:"In Github Actions, by default, data is not inherently persistent or available to the whole pipeline. Every step has is its own process, every job has its own runner. By default, whatever data emerges in a job, ends with it.",date:"2023-10-31T00:00:00.000Z",formattedDate:"October 31, 2023",tags:[{label:"github actions",permalink:"/blog/tech/tags/github-actions"},{label:"ci/cd",permalink:"/blog/tech/tags/ci-cd"},{label:"pipeline",permalink:"/blog/tech/tags/pipeline"}],readingTime:9.54,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"DevSecOps Engineer",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"github-actions-data-flow",title:"GitHub Actions: Data Flow & Data Persistence",authors:"manu",tags:["github actions","ci/cd","pipeline"]},nextItem:{title:"Generating Dynamic JSON in Terraform",permalink:"/blog/tech/dynamic-json-in-terraform"}},s={authorsImageUrls:[void 0]},p=[],u={toc:p},m="wrapper";function c(t){let{components:e,...n}=t;return(0,r.kt)(m,(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"In Github Actions, by default, data is not inherently persistent or available to the whole pipeline. Every step has is its own process, every job has its own runner. By default, whatever data emerges in a job, ends with it."),(0,r.kt)("p",null,"How do we pass data from one process to the other, or save it for the next process?"),(0,r.kt)("p",null,"A short sweet answer:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Strategy"),(0,r.kt)("th",{parentName:"tr",align:null},"Data"),(0,r.kt)("th",{parentName:"tr",align:null},"Scope"),(0,r.kt)("th",{parentName:"tr",align:null},"Persistence"),(0,r.kt)("th",{parentName:"tr",align:null},"Explanation"),(0,r.kt)("th",{parentName:"tr",align:null},"Example"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"env")),(0,r.kt)("td",{parentName:"tr",align:null},"Values"),(0,r.kt)("td",{parentName:"tr",align:null},"Job (internal)"),(0,r.kt)("td",{parentName:"tr",align:null},"Ephemeral"),(0,r.kt)("td",{parentName:"tr",align:null},"Propagates ",(0,r.kt)("em",{parentName:"td"},"data")," ",(0,r.kt)("br",null)," between ",(0,r.kt)("em",{parentName:"td"},"steps")," ",(0,r.kt)("br",null),"  in the same ",(0,r.kt)("em",{parentName:"td"},"job")),(0,r.kt)("td",{parentName:"tr",align:null},"Pass a boolean to control whether the next step should run")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"outputs")),(0,r.kt)("td",{parentName:"tr",align:null},"Values"),(0,r.kt)("td",{parentName:"tr",align:null},"Workflow (internal)"),(0,r.kt)("td",{parentName:"tr",align:null},"Ephemeral"),(0,r.kt)("td",{parentName:"tr",align:null},"Propagates ",(0,r.kt)("em",{parentName:"td"},"data")," ",(0,r.kt)("br",null)," between ",(0,r.kt)("em",{parentName:"td"},"jobs/steps")," ",(0,r.kt)("br",null),"  in the same ",(0,r.kt)("em",{parentName:"td"},"workflow")),(0,r.kt)("td",{parentName:"tr",align:null},"Pass a deployment id to the next job")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"artefacts"),(0,r.kt)("td",{parentName:"tr",align:null},"Files"),(0,r.kt)("td",{parentName:"tr",align:null},"Workflow (internal & external)"),(0,r.kt)("td",{parentName:"tr",align:null},"Persistent"),(0,r.kt)("td",{parentName:"tr",align:null},"Propagates ",(0,r.kt)("em",{parentName:"td"},"files")," ",(0,r.kt)("br",null)," between ",(0,r.kt)("em",{parentName:"td"},"jobs/workflows")),(0,r.kt)("td",{parentName:"tr",align:null},"Pass the project build to different test jobs running in parallel  ",(0,r.kt)("br",null),(0,r.kt)("br",null)," ",(0,r.kt)("em",{parentName:"td"},"Intended for frequently changing data. Files are available for download after the workflow finishes."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache"),(0,r.kt)("td",{parentName:"tr",align:null},"Files"),(0,r.kt)("td",{parentName:"tr",align:null},"Workflow (internal & external)"),(0,r.kt)("td",{parentName:"tr",align:null},"Persistent"),(0,r.kt)("td",{parentName:"tr",align:null},"Propagates ",(0,r.kt)("em",{parentName:"td"},"files")," ",(0,r.kt)("br",null)," inside and between ",(0,r.kt)("em",{parentName:"td"},"workflows")," ",(0,r.kt)("br",null),"  in the same ",(0,r.kt)("em",{parentName:"td"},"repository")),(0,r.kt)("td",{parentName:"tr",align:null},"Cache npm packages for use in different workflow runs. ",(0,r.kt)("br",null),(0,r.kt)("br",null)," ",(0,r.kt)("em",{parentName:"td"},"Intended for files that don't change much."))))),(0,r.kt)("p",null,"For a completer answer: read on.",(0,r.kt)("br",{parentName:"p"}),"\n","All the workflow examples in this article ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/magmanu/blog/tree/main/demos/github-actions-data-flow"},"can be found as files here"),", along with a copy of the respective redacted logs."))}c.isMDXComponent=!0}}]);