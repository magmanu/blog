"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6771],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=c(r),g=a,f=p["".concat(u,".").concat(g)]||p[g]||m[g]||o;return r?n.createElement(f,i(i({ref:t},s),{},{components:r})):n.createElement(f,i({ref:t},s))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=g;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},6325:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={slug:"migrate-codecommit-to-github",title:"How to Migrate CodeCommit to GitHub \u2014 and Keep your Amplify Pipeline",authors:"manu",tags:["infra","github","amplify","aws","ci/cd","tutorial"]},i=void 0,l={permalink:"/blog/tech/migrate-codecommit-to-github",source:"@site/tech/2021-10-13-migrate-codecommit-to-github/index.md",title:"How to Migrate CodeCommit to GitHub \u2014 and Keep your Amplify Pipeline",description:"This tutorial includes guidance for three different scenarios in your GitHub administration:",date:"2021-10-13T00:00:00.000Z",formattedDate:"October 13, 2021",tags:[{label:"infra",permalink:"/blog/tech/tags/infra"},{label:"github",permalink:"/blog/tech/tags/github"},{label:"amplify",permalink:"/blog/tech/tags/amplify"},{label:"aws",permalink:"/blog/tech/tags/aws"},{label:"ci/cd",permalink:"/blog/tech/tags/ci-cd"},{label:"tutorial",permalink:"/blog/tech/tags/tutorial"}],readingTime:5.07,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"DevSecOps Engineer",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"migrate-codecommit-to-github",title:"How to Migrate CodeCommit to GitHub \u2014 and Keep your Amplify Pipeline",authors:"manu",tags:["infra","github","amplify","aws","ci/cd","tutorial"]},prevItem:{title:"Bypassing Terraform error: \u201cThe true and false result expressions must have consistent types\u201d",permalink:"/blog/tech/terraform-ternary-error"}},u={authorsImageUrls:[void 0]},c=[],s={toc:c},p="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This tutorial includes guidance for three different scenarios in your GitHub administration:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"when your repo is in your personal account;"),(0,a.kt)("li",{parentName:"ol"},"when your app is under a GitHub Org and admins grant you the permissions you need; and"),(0,a.kt)("li",{parentName:"ol"},"when your repo is under a GitHub Org and admins do NOT grant you the permissions you need.")),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Pre-requisites: Relevant access and permissions for CodeCommit and Amplify. You also need a working GitHub account.")))}m.isMDXComponent=!0}}]);