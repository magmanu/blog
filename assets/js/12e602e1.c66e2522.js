"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4667],{2304:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>r,toc:()=>d});var i=t(4848),s=t(8453),a=t(4252);const l={slug:"matrices-github-actions",title:"An Ultimate Guide to Matrices in GitHub Actions, from Basic to Advanced",authors:"manu",tags:["github actions","ci/cd","devops"]},o=void 0,r={permalink:"/blog/tech/matrices-github-actions",source:"@site/tech/2025-03-28-matrices-github-actions/index.mdx",title:"An Ultimate Guide to Matrices in GitHub Actions, from Basic to Advanced",description:"Listen, I feel the boldest of girls for calling this *an* ultimate guide. But it's just because this will be the one post about matrices I'll update over time as I experience more. All info in a single place for easier retrieval, enjoy!",date:"2025-03-28T00:00:00.000Z",tags:[{label:"github actions",permalink:"/blog/tech/tags/github-actions"},{label:"ci/cd",permalink:"/blog/tech/tags/ci-cd"},{label:"devops",permalink:"/blog/tech/tags/devops"}],readingTime:17.52,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"DevSecOps Engineer",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"matrices-github-actions",title:"An Ultimate Guide to Matrices in GitHub Actions, from Basic to Advanced",authors:"manu",tags:["github actions","ci/cd","devops"]},unlisted:!1,nextItem:{title:"GitHub Actions: Data Flow & Data Persistence",permalink:"/blog/tech/github-actions-data-flow"}},c={authorsImageUrls:[void 0]},d=[{value:"Basics: Simple Matrix",id:"basics-simple-matrix",level:2},{value:"Multidimensional Matrices (Matrix with Multiple Keys)",id:"multidimensional-matrices-matrix-with-multiple-keys",level:2}];function u(e){const n={code:"code",em:"em",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components},{Details:l}=n;return l||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["Listen, I feel the boldest of girls for calling this ",(0,i.jsx)(n.em,{children:"an"})," ultimate guide. But it's just because this will be the one post about matrices I'll update over time as I experience more. All info in a single place for easier retrieval, enjoy!"]})}),"\n",(0,i.jsx)(n.p,{children:"Matrices keep workflows DRY: you setup a job once and let the matrix do the boring work of multiplying it with all the different configurations required."}),"\n",(0,i.jsx)("h3",{children:"An Ultimate Guide"}),"\n","\n",(0,i.jsx)(a.A,{toc:d}),"\n",(0,i.jsx)(n.h2,{id:"basics-simple-matrix",children:"Basics: Simple Matrix"}),"\n",(0,i.jsx)(n.p,{children:"Use a matrix to run the same job multiple times, with different configurations."}),"\n",(0,i.jsxs)(n.p,{children:["Matrices are set at the job level, under the ",(0,i.jsx)(n.code,{children:"strategy"})," key. Then, at the step level, reference the matrix values with ",(0,i.jsx)(n.code,{children:"${{ matrix.key_name}}"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Let's follow the classic workflow example, of course: running CI tests in different versions of Node.js."}),"\n",(0,i.jsxs)(l,{children:[(0,i.jsx)("summary",{children:(0,i.jsx)(n.p,{children:"Show code"})}),(0,i.jsx)("div",{children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title=".github/workflows/testing.yaml" showLineNumbers',children:"(...)\njobs:\n  unit-tests:\n    // highlight-start\n    strategy:\n      matrix:\n        # I named it `node-version`, but you can name it however you want\n        node-version: [16, 18] \n    // highlight-end\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        (...)\n\n      // highlight-start\n      # And to reference it, use `${{ matrix.key_name}}`\n      - name: Use Node.js ${{ matrix.node-version }}\n      // highlight-end\n        uses: actions/setup-node@v4\n        with:\n        // highlight-next-line\n          node-version: ${{ matrix.node-version }}\n\n      (...)\n"})})})]}),"\n",(0,i.jsxs)(l,{children:[(0,i.jsx)("summary",{children:(0,i.jsx)(n.p,{children:"Show pipeline"})}),(0,i.jsx)("div",{children:(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"screenshot",src:t(6557).A+"",width:"624",height:"436"})})})]}),"\n",(0,i.jsx)(n.h2,{id:"multidimensional-matrices-matrix-with-multiple-keys",children:"Multidimensional Matrices (Matrix with Multiple Keys)"}),"\n",(0,i.jsxs)(n.p,{children:["Of course this can get more complex. If you want to run your tests in Node.js 16 & 18, ",(0,i.jsx)(n.strong,{children:"and"})," test each node version in a different OS, you can use a matrix with multiple keys (aka matrix of matrices, or multidimensional matrices)."]}),"\n",(0,i.jsx)(n.p,{children:"Please note: in a matrix of matrices, the number of jobs is the product of the matrix sizes - that is, the number of items in matrix A multiplied by the number of items in matrix B."}),"\n",(0,i.jsx)(n.p,{children:"So if we specify two node versions and two OSs, like this..."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title=".github/workflows/testing.yaml" showLineNumbers',children:"matrix:\n  os: [ubuntu-latest, windows-latest]\n  node-version: [16, 18]\n"})}),"\n",(0,i.jsx)(n.p,{children:"... we'll end up with 4 jobs (2*2):"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"ubuntu-latest + node 16"}),"\n",(0,i.jsx)(n.li,{children:"ubuntu-latest + node 18"}),"\n",(0,i.jsx)(n.li,{children:"windows-latest + node 16"}),"\n",(0,i.jsx)(n.li,{children:"windows-latest + node 18"}),"\n"]}),"\n",(0,i.jsxs)(l,{children:[(0,i.jsx)("summary",{children:(0,i.jsx)(n.p,{children:"Show code"})}),(0,i.jsx)("div",{children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title=".github/workflows/testing.yaml" showLineNumbers',children:"(...)\n  unit-tests:\n    strategy:\n      matrix:\n      // highlight-start\n        os: [ubuntu-latest, windows-latest]\n        node-version: [16, 18]\n    runs-on: ${{ matrix.os }}\n    // highlight-end\n    steps:\n      - name: Checkout\n        (...)\n\n      // highlight-next-line\n      - name: Use Node.js ${{ matrix.node-version }} in ${{ matrix.os }}\n        uses: actions/setup-node@v2\n        with:\n          node-version: ${{ matrix.node-version }}\n\n      (...)\n"})})})]}),"\n",(0,i.jsxs)(l,{children:[(0,i.jsx)("summary",{children:(0,i.jsx)(n.p,{children:"Show pipeline"})}),(0,i.jsx)("div",{children:(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"screenshot",src:t(1698).A+"",width:"628",height:"616"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["You can have as many keys you want, but keep in mind that the number of jobs ",(0,i.jsx)(n.strong,{children:"can grow exponentially"}),". For example, if you have 4 matrices keys with 3 values each, you'll end up with 81 jobs (3*3*3*3)."]})]})}function m(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},4252:(e,n,t)=>{t.d(n,{A:()=>l});t(6540);var i=t(5195);const s={tableOfContentsInline:"tableOfContentsInline_prmo"};var a=t(4848);function l(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:l}=e;return(0,a.jsx)("div",{className:s.tableOfContentsInline,children:(0,a.jsx)(i.A,{toc:n,minHeadingLevel:t,maxHeadingLevel:l,className:"table-of-contents",linkClassName:null})})}},5195:(e,n,t)=>{t.d(n,{A:()=>x});var i=t(6540),s=t(6342);function a(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);n.forEach(((e,n)=>{const i=t.slice(2,e.level);e.parentIndex=Math.max(...i),t[e.level]=n}));const i=[];return n.forEach((e=>{const{parentIndex:t,...s}=e;t>=0?n[t].children.push(s):i.push(s)})),i}function l(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:i}=e;return n.flatMap((e=>{const n=l({toc:e.children,minHeadingLevel:t,maxHeadingLevel:i});return function(e){return e.level>=t&&e.level<=i}(e)?[{...e,children:n}]:n}))}function o(e){const n=e.getBoundingClientRect();return n.top===n.bottom?o(e.parentNode):n}function r(e,n){let{anchorTopOffset:t}=n;const i=e.find((e=>o(e).top>=t));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(o(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function c(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:n}}=(0,s.p)();return(0,i.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function d(e){const n=(0,i.useRef)(void 0),t=c();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:s,minHeadingLevel:a,maxHeadingLevel:l}=e;function o(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),o=function(e){let{minHeadingLevel:n,maxHeadingLevel:t}=e;const i=[];for(let s=n;s<=t;s+=1)i.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:a,maxHeadingLevel:l}),c=r(o,{anchorTopOffset:t.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(s),e.classList.add(s),n.current=e):e.classList.remove(s)}(e,e===d)}))}return document.addEventListener("scroll",o),document.addEventListener("resize",o),o(),()=>{document.removeEventListener("scroll",o),document.removeEventListener("resize",o)}}),[e,t])}var u=t(8774),m=t(4848);function h(e){let{toc:n,className:t,linkClassName:i,isChild:s}=e;return n.length?(0,m.jsx)("ul",{className:s?void 0:t,children:n.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(u.A,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(h,{isChild:!0,toc:e.children,className:t,linkClassName:i})]},e.id)))}):null}const g=i.memo(h);function x(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:r,minHeadingLevel:c,maxHeadingLevel:u,...h}=e;const x=(0,s.p)(),f=c??x.tableOfContents.minHeadingLevel,p=u??x.tableOfContents.maxHeadingLevel,v=function(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:s}=e;return(0,i.useMemo)((()=>l({toc:a(n),minHeadingLevel:t,maxHeadingLevel:s})),[n,t,s])}({toc:n,minHeadingLevel:f,maxHeadingLevel:p});return d((0,i.useMemo)((()=>{if(o&&r)return{linkClassName:o,linkActiveClassName:r,minHeadingLevel:f,maxHeadingLevel:p}}),[o,r,f,p])),(0,m.jsx)(g,{toc:v,className:t,linkClassName:o,...h})}},6557:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/screenshot_13-dbe2b35893fc8c71efef371454d33c33.png"},1698:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/screenshot_14-607ec4e34cabe7d266a6c6cd502f4a66.png"},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>o});var i=t(6540);const s={},a=i.createContext(s);function l(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);