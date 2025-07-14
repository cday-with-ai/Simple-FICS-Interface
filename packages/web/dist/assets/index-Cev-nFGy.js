import{u as Ye,j as s,a as Le,b as Lt,c as Mr,d as sn,e as Tt,V as Uo,f as qo,l as An,R as Yo}from"./shared-CvgWrd_O.js";import{a as Vo,r as p,R as re}from"./vendor-cxkclgJA.js";import{o as Z}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var Lr,Nn=Vo;Lr=Nn.createRoot,Nn.hydrateRoot;var wn={};Object.defineProperty(wn,"__esModule",{value:!0});wn.parse=ti;wn.serialize=ni;const Ko=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,Xo=/^[\u0021-\u003A\u003C-\u007E]*$/,Jo=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,Qo=/^[\u0020-\u003A\u003D-\u007E]*$/,Zo=Object.prototype.toString,ei=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function ti(e,t){const n=new ei,r=e.length;if(r<2)return n;const o=t?.decode||ri;let i=0;do{const a=e.indexOf("=",i);if(a===-1)break;const d=e.indexOf(";",i),l=d===-1?r:d;if(a>l){i=e.lastIndexOf(";",a-1)+1;continue}const u=Dn(e,i,a),c=On(e,a,u),h=e.slice(u,c);if(n[h]===void 0){let f=Dn(e,a+1,l),g=On(e,l,f);const $=o(e.slice(f,g));n[h]=$}i=l+1}while(i<r);return n}function Dn(e,t,n){do{const r=e.charCodeAt(t);if(r!==32&&r!==9)return t}while(++t<n);return n}function On(e,t,n){for(;t>n;){const r=e.charCodeAt(--t);if(r!==32&&r!==9)return t+1}return n}function ni(e,t,n){const r=n?.encode||encodeURIComponent;if(!Ko.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=r(t);if(!Xo.test(o))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+o;if(!n)return i;if(n.maxAge!==void 0){if(!Number.isInteger(n.maxAge))throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);i+="; Max-Age="+n.maxAge}if(n.domain){if(!Jo.test(n.domain))throw new TypeError(`option domain is invalid: ${n.domain}`);i+="; Domain="+n.domain}if(n.path){if(!Qo.test(n.path))throw new TypeError(`option path is invalid: ${n.path}`);i+="; Path="+n.path}if(n.expires){if(!oi(n.expires)||!Number.isFinite(n.expires.valueOf()))throw new TypeError(`option expires is invalid: ${n.expires}`);i+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(i+="; HttpOnly"),n.secure&&(i+="; Secure"),n.partitioned&&(i+="; Partitioned"),n.priority)switch(typeof n.priority=="string"?n.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${n.priority}`)}if(n.sameSite)switch(typeof n.sameSite=="string"?n.sameSite.toLowerCase():n.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${n.sameSite}`)}return i}function ri(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function oi(e){return Zo.call(e)==="[object Date]"}var Fn="popstate";function ii(e={}){function t(r,o){let{pathname:i,search:a,hash:d}=r.location;return an("",{pathname:i,search:a,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:ot(o)}return ai(t,n,null,e)}function X(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ye(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function si(){return Math.random().toString(36).substring(2,10)}function Bn(e,t){return{usr:e.state,key:e.key,idx:t}}function an(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Ve(t):t,state:n,key:t&&t.key||r||si()}}function ot({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Ve(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ai(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:i=!1}=r,a=o.history,d="POP",l=null,u=c();u==null&&(u=0,a.replaceState({...a.state,idx:u},""));function c(){return(a.state||{idx:null}).idx}function h(){d="POP";let k=c(),x=k==null?null:k-u;u=k,l&&l({action:d,location:y.location,delta:x})}function f(k,x){d="PUSH";let j=an(y.location,k,x);u=c()+1;let R=Bn(j,u),P=y.createHref(j);try{a.pushState(R,"",P)}catch(M){if(M instanceof DOMException&&M.name==="DataCloneError")throw M;o.location.assign(P)}i&&l&&l({action:d,location:y.location,delta:1})}function g(k,x){d="REPLACE";let j=an(y.location,k,x);u=c();let R=Bn(j,u),P=y.createHref(j);a.replaceState(R,"",P),i&&l&&l({action:d,location:y.location,delta:0})}function $(k){return ci(k)}let y={get action(){return d},get location(){return e(o,a)},listen(k){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(Fn,h),l=k,()=>{o.removeEventListener(Fn,h),l=null}},createHref(k){return t(o,k)},createURL:$,encodeLocation(k){let x=$(k);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:f,replace:g,go(k){return a.go(k)}};return y}function ci(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),X(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:ot(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Tr(e,t,n="/"){return li(e,t,n,!1)}function li(e,t,n,r){let o=typeof t=="string"?Ve(t):t,i=ke(o.pathname||"/",n);if(i==null)return null;let a=zr(e);di(a);let d=null;for(let l=0;d==null&&l<a.length;++l){let u=vi(i);d=bi(a[l],u,r)}return d}function zr(e,t=[],n=[],r=""){let o=(i,a,d)=>{let l={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};l.relativePath.startsWith("/")&&(X(l.relativePath.startsWith(r),`Absolute route path "${l.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),l.relativePath=l.relativePath.slice(r.length));let u=we([r,l.relativePath]),c=n.concat(l);i.children&&i.children.length>0&&(X(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${u}".`),zr(i.children,t,c,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:yi(u,i.index),routesMeta:c})};return e.forEach((i,a)=>{if(i.path===""||!i.path?.includes("?"))o(i,a);else for(let d of Ir(i.path))o(i,a,d)}),t}function Ir(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let a=Ir(r.join("/")),d=[];return d.push(...a.map(l=>l===""?i:[i,l].join("/"))),o&&d.push(...a),d.map(l=>e.startsWith("/")&&l===""?"/":l)}function di(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:xi(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var ui=/^:[\w-]+$/,hi=3,pi=2,mi=1,fi=10,gi=-2,Wn=e=>e==="*";function yi(e,t){let n=e.split("/"),r=n.length;return n.some(Wn)&&(r+=gi),t&&(r+=pi),n.filter(o=>!Wn(o)).reduce((o,i)=>o+(ui.test(i)?hi:i===""?mi:fi),r)}function xi(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function bi(e,t,n=!1){let{routesMeta:r}=e,o={},i="/",a=[];for(let d=0;d<r.length;++d){let l=r[d],u=d===r.length-1,c=i==="/"?t:t.slice(i.length)||"/",h=Pt({path:l.relativePath,caseSensitive:l.caseSensitive,end:u},c),f=l.route;if(!h&&u&&n&&!r[r.length-1].route.index&&(h=Pt({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},c)),!h)return null;Object.assign(o,h.params),a.push({params:o,pathname:we([i,h.pathname]),pathnameBase:Si(we([i,h.pathnameBase])),route:f}),h.pathnameBase!=="/"&&(i=we([i,h.pathnameBase]))}return a}function Pt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=$i(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:r.reduce((u,{paramName:c,isOptional:h},f)=>{if(c==="*"){let $=d[f]||"";a=i.slice(0,i.length-$.length).replace(/(.)\/+$/,"$1")}const g=d[f];return h&&!g?u[c]=void 0:u[c]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:a,pattern:e}}function $i(e,t=!1,n=!0){ye(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,d,l)=>(r.push({paramName:d,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function vi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ye(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ke(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function wi(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Ve(e):e;return{pathname:n?n.startsWith("/")?n:ki(n,t):t,search:Pi(r),hash:ji(o)}}function ki(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function Gt(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ci(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Ar(e){let t=Ci(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Nr(e,t,n,r=!1){let o;typeof e=="string"?o=Ve(e):(o={...e},X(!o.pathname||!o.pathname.includes("?"),Gt("?","pathname","search",o)),X(!o.pathname||!o.pathname.includes("#"),Gt("#","pathname","hash",o)),X(!o.search||!o.search.includes("#"),Gt("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,d;if(a==null)d=n;else{let h=t.length-1;if(!r&&a.startsWith("..")){let f=a.split("/");for(;f[0]==="..";)f.shift(),h-=1;o.pathname=f.join("/")}d=h>=0?t[h]:"/"}let l=wi(o,d),u=a&&a!=="/"&&a.endsWith("/"),c=(i||a===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(u||c)&&(l.pathname+="/"),l}var we=e=>e.join("/").replace(/\/\/+/g,"/"),Si=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Pi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ji=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ri(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Dr=["POST","PUT","PATCH","DELETE"];new Set(Dr);var Ei=["GET",...Dr];new Set(Ei);var Ke=p.createContext(null);Ke.displayName="DataRouter";var zt=p.createContext(null);zt.displayName="DataRouterState";var Or=p.createContext({isTransitioning:!1});Or.displayName="ViewTransition";var Mi=p.createContext(new Map);Mi.displayName="Fetchers";var Li=p.createContext(null);Li.displayName="Await";var xe=p.createContext(null);xe.displayName="Navigation";var ct=p.createContext(null);ct.displayName="Location";var Ce=p.createContext({outlet:null,matches:[],isDataRoute:!1});Ce.displayName="Route";var kn=p.createContext(null);kn.displayName="RouteError";function Ti(e,{relative:t}={}){X(lt(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=p.useContext(xe),{hash:o,pathname:i,search:a}=dt(e,{relative:t}),d=i;return n!=="/"&&(d=i==="/"?n:we([n,i])),r.createHref({pathname:d,search:a,hash:o})}function lt(){return p.useContext(ct)!=null}function De(){return X(lt(),"useLocation() may be used only in the context of a <Router> component."),p.useContext(ct).location}var Fr="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Br(e){p.useContext(xe).static||p.useLayoutEffect(e)}function zi(){let{isDataRoute:e}=p.useContext(Ce);return e?qi():Ii()}function Ii(){X(lt(),"useNavigate() may be used only in the context of a <Router> component.");let e=p.useContext(Ke),{basename:t,navigator:n}=p.useContext(xe),{matches:r}=p.useContext(Ce),{pathname:o}=De(),i=JSON.stringify(Ar(r)),a=p.useRef(!1);return Br(()=>{a.current=!0}),p.useCallback((l,u={})=>{if(ye(a.current,Fr),!a.current)return;if(typeof l=="number"){n.go(l);return}let c=Nr(l,JSON.parse(i),o,u.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:we([t,c.pathname])),(u.replace?n.replace:n.push)(c,u.state,u)},[t,n,i,o,e])}p.createContext(null);function dt(e,{relative:t}={}){let{matches:n}=p.useContext(Ce),{pathname:r}=De(),o=JSON.stringify(Ar(n));return p.useMemo(()=>Nr(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function Ai(e,t){return Wr(e,t)}function Wr(e,t,n,r){X(lt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=p.useContext(xe),{matches:i}=p.useContext(Ce),a=i[i.length-1],d=a?a.params:{},l=a?a.pathname:"/",u=a?a.pathnameBase:"/",c=a&&a.route;{let x=c&&c.path||"";Hr(l,!c||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let h=De(),f;if(t){let x=typeof t=="string"?Ve(t):t;X(u==="/"||x.pathname?.startsWith(u),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${u}" but pathname "${x.pathname}" was given in the \`location\` prop.`),f=x}else f=h;let g=f.pathname||"/",$=g;if(u!=="/"){let x=u.replace(/^\//,"").split("/");$="/"+g.replace(/^\//,"").split("/").slice(x.length).join("/")}let y=Tr(e,{pathname:$});ye(c||y!=null,`No routes matched location "${f.pathname}${f.search}${f.hash}" `),ye(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let k=Bi(y&&y.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:we([u,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?u:we([u,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),i,n,r);return t&&k?p.createElement(ct.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...f},navigationType:"POP"}},k):k}function Ni(){let e=Ui(),t=Ri(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=p.createElement(p.Fragment,null,p.createElement("p",null,"💿 Hey developer 👋"),p.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",p.createElement("code",{style:i},"ErrorBoundary")," or"," ",p.createElement("code",{style:i},"errorElement")," prop on your route.")),p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},t),n?p.createElement("pre",{style:o},n):null,a)}var Di=p.createElement(Ni,null),Oi=class extends p.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?p.createElement(Ce.Provider,{value:this.props.routeContext},p.createElement(kn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Fi({routeContext:e,match:t,children:n}){let r=p.useContext(Ke);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),p.createElement(Ce.Provider,{value:e},n)}function Bi(e,t=[],n=null,r=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=n?.errors;if(i!=null){let l=o.findIndex(u=>u.route.id&&i?.[u.route.id]!==void 0);X(l>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,l+1))}let a=!1,d=-1;if(n)for(let l=0;l<o.length;l++){let u=o[l];if((u.route.HydrateFallback||u.route.hydrateFallbackElement)&&(d=l),u.route.id){let{loaderData:c,errors:h}=n,f=u.route.loader&&!c.hasOwnProperty(u.route.id)&&(!h||h[u.route.id]===void 0);if(u.route.lazy||f){a=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((l,u,c)=>{let h,f=!1,g=null,$=null;n&&(h=i&&u.route.id?i[u.route.id]:void 0,g=u.route.errorElement||Di,a&&(d<0&&c===0?(Hr("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,$=null):d===c&&(f=!0,$=u.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,c+1)),k=()=>{let x;return h?x=g:f?x=$:u.route.Component?x=p.createElement(u.route.Component,null):u.route.element?x=u.route.element:x=l,p.createElement(Fi,{match:u,routeContext:{outlet:l,matches:y,isDataRoute:n!=null},children:x})};return n&&(u.route.ErrorBoundary||u.route.errorElement||c===0)?p.createElement(Oi,{location:n.location,revalidation:n.revalidation,component:g,error:h,children:k(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):k()},null)}function Cn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Wi(e){let t=p.useContext(Ke);return X(t,Cn(e)),t}function Hi(e){let t=p.useContext(zt);return X(t,Cn(e)),t}function _i(e){let t=p.useContext(Ce);return X(t,Cn(e)),t}function Sn(e){let t=_i(e),n=t.matches[t.matches.length-1];return X(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Gi(){return Sn("useRouteId")}function Ui(){let e=p.useContext(kn),t=Hi("useRouteError"),n=Sn("useRouteError");return e!==void 0?e:t.errors?.[n]}function qi(){let{router:e}=Wi("useNavigate"),t=Sn("useNavigate"),n=p.useRef(!1);return Br(()=>{n.current=!0}),p.useCallback(async(o,i={})=>{ye(n.current,Fr),n.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var Hn={};function Hr(e,t,n){!t&&!Hn[e]&&(Hn[e]=!0,ye(!1,n))}p.memo(Yi);function Yi({routes:e,future:t,state:n}){return Wr(e,void 0,n,t)}function _r(e){X(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Vi({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:i=!1}){X(!lt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),d=p.useMemo(()=>({basename:a,navigator:o,static:i,future:{}}),[a,o,i]);typeof n=="string"&&(n=Ve(n));let{pathname:l="/",search:u="",hash:c="",state:h=null,key:f="default"}=n,g=p.useMemo(()=>{let $=ke(l,a);return $==null?null:{location:{pathname:$,search:u,hash:c,state:h,key:f},navigationType:r}},[a,l,u,c,h,f,r]);return ye(g!=null,`<Router basename="${a}"> is not able to match the URL "${l}${u}${c}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:p.createElement(xe.Provider,{value:d},p.createElement(ct.Provider,{children:t,value:g}))}function Ki({children:e,location:t}){return Ai(cn(e),t)}function cn(e,t=[]){let n=[];return p.Children.forEach(e,(r,o)=>{if(!p.isValidElement(r))return;let i=[...t,o];if(r.type===p.Fragment){n.push.apply(n,cn(r.props.children,i));return}X(r.type===_r,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),X(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=cn(r.props.children,i)),n.push(a)}),n}var bt="get",$t="application/x-www-form-urlencoded";function It(e){return e!=null&&typeof e.tagName=="string"}function Xi(e){return It(e)&&e.tagName.toLowerCase()==="button"}function Ji(e){return It(e)&&e.tagName.toLowerCase()==="form"}function Qi(e){return It(e)&&e.tagName.toLowerCase()==="input"}function Zi(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function es(e,t){return e.button===0&&(!t||t==="_self")&&!Zi(e)}var pt=null;function ts(){if(pt===null)try{new FormData(document.createElement("form"),0),pt=!1}catch{pt=!0}return pt}var ns=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ut(e){return e!=null&&!ns.has(e)?(ye(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$t}"`),null):e}function rs(e,t){let n,r,o,i,a;if(Ji(e)){let d=e.getAttribute("action");r=d?ke(d,t):null,n=e.getAttribute("method")||bt,o=Ut(e.getAttribute("enctype"))||$t,i=new FormData(e)}else if(Xi(e)||Qi(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||d.getAttribute("action");if(r=l?ke(l,t):null,n=e.getAttribute("formmethod")||d.getAttribute("method")||bt,o=Ut(e.getAttribute("formenctype"))||Ut(d.getAttribute("enctype"))||$t,i=new FormData(d,e),!ts()){let{name:u,type:c,value:h}=e;if(c==="image"){let f=u?`${u}.`:"";i.append(`${f}x`,"0"),i.append(`${f}y`,"0")}else u&&i.append(u,h)}}else{if(It(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=bt,r=null,o=$t,a=e}return i&&o==="text/plain"&&(a=i,i=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:i,body:a}}function Pn(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function os(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function is(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function ss(e,t,n){let r=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let a=await os(i,n);return a.links?a.links():[]}return[]}));return ds(r.flat(1).filter(is).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function _n(e,t,n,r,o,i){let a=(l,u)=>n[u]?l.route.id!==n[u].route.id:!0,d=(l,u)=>n[u].pathname!==l.pathname||n[u].route.path?.endsWith("*")&&n[u].params["*"]!==l.params["*"];return i==="assets"?t.filter((l,u)=>a(l,u)||d(l,u)):i==="data"?t.filter((l,u)=>{let c=r.routes[l.route.id];if(!c||!c.hasLoader)return!1;if(a(l,u)||d(l,u))return!0;if(l.route.shouldRevalidate){let h=l.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function as(e,t,{includeHydrateFallback:n}={}){return cs(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function cs(e){return[...new Set(e)]}function ls(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function ds(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let i=JSON.stringify(ls(o));return n.has(i)||(n.add(i),r.push({key:i,link:o})),r},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var us=new Set([100,101,204,205]);function hs(e,t){let n=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n.pathname==="/"?n.pathname="_root.data":t&&ke(n.pathname,t)==="/"?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}function Gr(){let e=p.useContext(Ke);return Pn(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ps(){let e=p.useContext(zt);return Pn(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var jn=p.createContext(void 0);jn.displayName="FrameworkContext";function Ur(){let e=p.useContext(jn);return Pn(e,"You must render this element inside a <HydratedRouter> element"),e}function ms(e,t){let n=p.useContext(jn),[r,o]=p.useState(!1),[i,a]=p.useState(!1),{onFocus:d,onBlur:l,onMouseEnter:u,onMouseLeave:c,onTouchStart:h}=t,f=p.useRef(null);p.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let y=x=>{x.forEach(j=>{a(j.isIntersecting)})},k=new IntersectionObserver(y,{threshold:.5});return f.current&&k.observe(f.current),()=>{k.disconnect()}}},[e]),p.useEffect(()=>{if(r){let y=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(y)}}},[r]);let g=()=>{o(!0)},$=()=>{o(!1),a(!1)};return n?e!=="intent"?[i,f,{}]:[i,f,{onFocus:Je(d,g),onBlur:Je(l,$),onMouseEnter:Je(u,g),onMouseLeave:Je(c,$),onTouchStart:Je(h,g)}]:[!1,f,{}]}function Je(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function fs({page:e,...t}){let{router:n}=Gr(),r=p.useMemo(()=>Tr(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?p.createElement(ys,{page:e,matches:r,...t}):null}function gs(e){let{manifest:t,routeModules:n}=Ur(),[r,o]=p.useState([]);return p.useEffect(()=>{let i=!1;return ss(e,t,n).then(a=>{i||o(a)}),()=>{i=!0}},[e,t,n]),r}function ys({page:e,matches:t,...n}){let r=De(),{manifest:o,routeModules:i}=Ur(),{basename:a}=Gr(),{loaderData:d,matches:l}=ps(),u=p.useMemo(()=>_n(e,t,l,o,r,"data"),[e,t,l,o,r]),c=p.useMemo(()=>_n(e,t,l,o,r,"assets"),[e,t,l,o,r]),h=p.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let $=new Set,y=!1;if(t.forEach(x=>{let j=o.routes[x.route.id];!j||!j.hasLoader||(!u.some(R=>R.route.id===x.route.id)&&x.route.id in d&&i[x.route.id]?.shouldRevalidate||j.hasClientLoader?y=!0:$.add(x.route.id))}),$.size===0)return[];let k=hs(e,a);return y&&$.size>0&&k.searchParams.set("_routes",t.filter(x=>$.has(x.route.id)).map(x=>x.route.id).join(",")),[k.pathname+k.search]},[a,d,r,o,u,t,e,i]),f=p.useMemo(()=>as(c,o),[c,o]),g=gs(c);return p.createElement(p.Fragment,null,h.map($=>p.createElement("link",{key:$,rel:"prefetch",as:"fetch",href:$,...n})),f.map($=>p.createElement("link",{key:$,rel:"modulepreload",href:$,...n})),g.map(({key:$,link:y})=>p.createElement("link",{key:$,...y})))}function xs(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var qr=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{qr&&(window.__reactRouterVersion="7.6.3")}catch{}function bs({basename:e,children:t,window:n}){let r=p.useRef();r.current==null&&(r.current=ii({window:n,v5Compat:!0}));let o=r.current,[i,a]=p.useState({action:o.action,location:o.location}),d=p.useCallback(l=>{p.startTransition(()=>a(l))},[a]);return p.useLayoutEffect(()=>o.listen(d),[o,d]),p.createElement(Vi,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:o})}var Yr=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Vr=p.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:i,replace:a,state:d,target:l,to:u,preventScrollReset:c,viewTransition:h,...f},g){let{basename:$}=p.useContext(xe),y=typeof u=="string"&&Yr.test(u),k,x=!1;if(typeof u=="string"&&y&&(k=u,qr))try{let H=new URL(window.location.href),b=u.startsWith("//")?new URL(H.protocol+u):new URL(u),v=ke(b.pathname,$);b.origin===H.origin&&v!=null?u=v+b.search+b.hash:x=!0}catch{ye(!1,`<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let j=Ti(u,{relative:o}),[R,P,M]=ms(r,f),D=ks(u,{replace:a,state:d,target:l,preventScrollReset:c,relative:o,viewTransition:h});function A(H){t&&t(H),H.defaultPrevented||D(H)}let _=p.createElement("a",{...f,...M,href:k||j,onClick:x||i?t:A,ref:xs(g,P),target:l,"data-discover":!y&&n==="render"?"true":void 0});return R&&!y?p.createElement(p.Fragment,null,_,p.createElement(fs,{page:j})):_});Vr.displayName="Link";var $s=p.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:i,to:a,viewTransition:d,children:l,...u},c){let h=dt(a,{relative:u.relative}),f=De(),g=p.useContext(zt),{navigator:$,basename:y}=p.useContext(xe),k=g!=null&&Rs(h)&&d===!0,x=$.encodeLocation?$.encodeLocation(h).pathname:h.pathname,j=f.pathname,R=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(j=j.toLowerCase(),R=R?R.toLowerCase():null,x=x.toLowerCase()),R&&y&&(R=ke(R,y)||R);const P=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let M=j===x||!o&&j.startsWith(x)&&j.charAt(P)==="/",D=R!=null&&(R===x||!o&&R.startsWith(x)&&R.charAt(x.length)==="/"),A={isActive:M,isPending:D,isTransitioning:k},_=M?t:void 0,H;typeof r=="function"?H=r(A):H=[r,M?"active":null,D?"pending":null,k?"transitioning":null].filter(Boolean).join(" ");let b=typeof i=="function"?i(A):i;return p.createElement(Vr,{...u,"aria-current":_,className:H,ref:c,style:b,to:a,viewTransition:d},typeof l=="function"?l(A):l)});$s.displayName="NavLink";var vs=p.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:i,method:a=bt,action:d,onSubmit:l,relative:u,preventScrollReset:c,viewTransition:h,...f},g)=>{let $=Ps(),y=js(d,{relative:u}),k=a.toLowerCase()==="get"?"get":"post",x=typeof d=="string"&&Yr.test(d),j=R=>{if(l&&l(R),R.defaultPrevented)return;R.preventDefault();let P=R.nativeEvent.submitter,M=P?.getAttribute("formmethod")||a;$(P||R.currentTarget,{fetcherKey:t,method:M,navigate:n,replace:o,state:i,relative:u,preventScrollReset:c,viewTransition:h})};return p.createElement("form",{ref:g,method:k,action:y,onSubmit:r?l:j,...f,"data-discover":!x&&e==="render"?"true":void 0})});vs.displayName="Form";function ws(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Kr(e){let t=p.useContext(Ke);return X(t,ws(e)),t}function ks(e,{target:t,replace:n,state:r,preventScrollReset:o,relative:i,viewTransition:a}={}){let d=zi(),l=De(),u=dt(e,{relative:i});return p.useCallback(c=>{if(es(c,t)){c.preventDefault();let h=n!==void 0?n:ot(l)===ot(u);d(e,{replace:h,state:r,preventScrollReset:o,relative:i,viewTransition:a})}},[l,d,u,n,r,t,e,o,i,a])}var Cs=0,Ss=()=>`__${String(++Cs)}__`;function Ps(){let{router:e}=Kr("useSubmit"),{basename:t}=p.useContext(xe),n=Gi();return p.useCallback(async(r,o={})=>{let{action:i,method:a,encType:d,formData:l,body:u}=rs(r,t);if(o.navigate===!1){let c=o.fetcherKey||Ss();await e.fetch(c,n,o.action||i,{preventScrollReset:o.preventScrollReset,formData:l,body:u,formMethod:o.method||a,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:l,body:u,formMethod:o.method||a,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,n])}function js(e,{relative:t}={}){let{basename:n}=p.useContext(xe),r=p.useContext(Ce);X(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),i={...dt(e||".",{relative:t})},a=De();if(e==null){i.search=a.search;let d=new URLSearchParams(i.search),l=d.getAll("index");if(l.some(c=>c==="")){d.delete("index"),l.filter(h=>h).forEach(h=>d.append("index",h));let c=d.toString();i.search=c?`?${c}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:we([n,i.pathname])),ot(i)}function Rs(e,t={}){let n=p.useContext(Or);X(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Kr("useViewTransitionState"),o=dt(e,{relative:t.relative});if(!n.isTransitioning)return!1;let i=ke(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=ke(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Pt(o.pathname,a)!=null||Pt(o.pathname,i)!=null}[...us];const Xr={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Es={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Ms={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Jr={colors:Es,...Xr},Ls={colors:Ms,...Xr},Ts={light:Jr,dark:Ls},zs=Jr;var ne=function(){return ne=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},ne.apply(this,arguments)};function it(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,i;r<o;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}var V="-ms-",rt="-moz-",G="-webkit-",Qr="comm",At="rule",Rn="decl",Is="@import",Zr="@keyframes",As="@layer",eo=Math.abs,En=String.fromCharCode,ln=Object.assign;function Ns(e,t){return te(e,0)^45?(((t<<2^te(e,0))<<2^te(e,1))<<2^te(e,2))<<2^te(e,3):0}function to(e){return e.trim()}function ve(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,n){return e.replace(t,n)}function vt(e,t,n){return e.indexOf(t,n)}function te(e,t){return e.charCodeAt(t)|0}function _e(e,t,n){return e.slice(t,n)}function fe(e){return e.length}function no(e){return e.length}function Qe(e,t){return t.push(e),e}function Ds(e,t){return e.map(t).join("")}function Gn(e,t){return e.filter(function(n){return!ve(n,t)})}var Nt=1,Ge=1,ro=0,he=0,Q=0,Xe="";function Dt(e,t,n,r,o,i,a,d){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:Nt,column:Ge,length:a,return:"",siblings:d}}function Re(e,t){return ln(Dt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Fe(e){for(;e.root;)e=Re(e.root,{children:[e]});Qe(e,e.siblings)}function Os(){return Q}function Fs(){return Q=he>0?te(Xe,--he):0,Ge--,Q===10&&(Ge=1,Nt--),Q}function pe(){return Q=he<ro?te(Xe,he++):0,Ge++,Q===10&&(Ge=1,Nt++),Q}function Ie(){return te(Xe,he)}function wt(){return he}function Ot(e,t){return _e(Xe,e,t)}function dn(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Bs(e){return Nt=Ge=1,ro=fe(Xe=e),he=0,[]}function Ws(e){return Xe="",e}function qt(e){return to(Ot(he-1,un(e===91?e+2:e===40?e+1:e)))}function Hs(e){for(;(Q=Ie())&&Q<33;)pe();return dn(e)>2||dn(Q)>3?"":" "}function _s(e,t){for(;--t&&pe()&&!(Q<48||Q>102||Q>57&&Q<65||Q>70&&Q<97););return Ot(e,wt()+(t<6&&Ie()==32&&pe()==32))}function un(e){for(;pe();)switch(Q){case e:return he;case 34:case 39:e!==34&&e!==39&&un(Q);break;case 40:e===41&&un(e);break;case 92:pe();break}return he}function Gs(e,t){for(;pe()&&e+Q!==57;)if(e+Q===84&&Ie()===47)break;return"/*"+Ot(t,he-1)+"*"+En(e===47?e:pe())}function Us(e){for(;!dn(Ie());)pe();return Ot(e,he)}function qs(e){return Ws(kt("",null,null,null,[""],e=Bs(e),0,[0],e))}function kt(e,t,n,r,o,i,a,d,l){for(var u=0,c=0,h=a,f=0,g=0,$=0,y=1,k=1,x=1,j=0,R="",P=o,M=i,D=r,A=R;k;)switch($=j,j=pe()){case 40:if($!=108&&te(A,h-1)==58){vt(A+=O(qt(j),"&","&\f"),"&\f",eo(u?d[u-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:A+=qt(j);break;case 9:case 10:case 13:case 32:A+=Hs($);break;case 92:A+=_s(wt()-1,7);continue;case 47:switch(Ie()){case 42:case 47:Qe(Ys(Gs(pe(),wt()),t,n,l),l);break;default:A+="/"}break;case 123*y:d[u++]=fe(A)*x;case 125*y:case 59:case 0:switch(j){case 0:case 125:k=0;case 59+c:x==-1&&(A=O(A,/\f/g,"")),g>0&&fe(A)-h&&Qe(g>32?qn(A+";",r,n,h-1,l):qn(O(A," ","")+";",r,n,h-2,l),l);break;case 59:A+=";";default:if(Qe(D=Un(A,t,n,u,c,o,d,R,P=[],M=[],h,i),i),j===123)if(c===0)kt(A,t,D,D,P,i,h,d,M);else switch(f===99&&te(A,3)===110?100:f){case 100:case 108:case 109:case 115:kt(e,D,D,r&&Qe(Un(e,D,D,0,0,o,d,R,o,P=[],h,M),M),o,M,h,d,r?P:M);break;default:kt(A,D,D,D,[""],M,0,d,M)}}u=c=g=0,y=x=1,R=A="",h=a;break;case 58:h=1+fe(A),g=$;default:if(y<1){if(j==123)--y;else if(j==125&&y++==0&&Fs()==125)continue}switch(A+=En(j),j*y){case 38:x=c>0?1:(A+="\f",-1);break;case 44:d[u++]=(fe(A)-1)*x,x=1;break;case 64:Ie()===45&&(A+=qt(pe())),f=Ie(),c=h=fe(R=A+=Us(wt())),j++;break;case 45:$===45&&fe(A)==2&&(y=0)}}return i}function Un(e,t,n,r,o,i,a,d,l,u,c,h){for(var f=o-1,g=o===0?i:[""],$=no(g),y=0,k=0,x=0;y<r;++y)for(var j=0,R=_e(e,f+1,f=eo(k=a[y])),P=e;j<$;++j)(P=to(k>0?g[j]+" "+R:O(R,/&\f/g,g[j])))&&(l[x++]=P);return Dt(e,t,n,o===0?At:d,l,u,c,h)}function Ys(e,t,n,r){return Dt(e,t,n,Qr,En(Os()),_e(e,2,-2),0,r)}function qn(e,t,n,r,o){return Dt(e,t,n,Rn,_e(e,0,r),_e(e,r+1,-1),r,o)}function oo(e,t,n){switch(Ns(e,t)){case 5103:return G+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return G+e+e;case 4789:return rt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return G+e+rt+e+V+e+e;case 5936:switch(te(e,t+11)){case 114:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return G+e+V+e+e;case 6165:return G+e+V+"flex-"+e+e;case 5187:return G+e+O(e,/(\w+).+(:[^]+)/,G+"box-$1$2"+V+"flex-$1$2")+e;case 5443:return G+e+V+"flex-item-"+O(e,/flex-|-self/g,"")+(ve(e,/flex-|baseline/)?"":V+"grid-row-"+O(e,/flex-|-self/g,""))+e;case 4675:return G+e+V+"flex-line-pack"+O(e,/align-content|flex-|-self/g,"")+e;case 5548:return G+e+V+O(e,"shrink","negative")+e;case 5292:return G+e+V+O(e,"basis","preferred-size")+e;case 6060:return G+"box-"+O(e,"-grow","")+G+e+V+O(e,"grow","positive")+e;case 4554:return G+O(e,/([^-])(transform)/g,"$1"+G+"$2")+e;case 6187:return O(O(O(e,/(zoom-|grab)/,G+"$1"),/(image-set)/,G+"$1"),e,"")+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,G+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,G+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+G+e+e;case 4200:if(!ve(e,/flex-|baseline/))return V+"grid-column-align"+_e(e,t)+e;break;case 2592:case 3360:return V+O(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ve(r.props,/grid-\w+-end/)})?~vt(e+(n=n[t].value),"span",0)?e:V+O(e,"-start","")+e+V+"grid-row-span:"+(~vt(n,"span",0)?ve(n,/\d+/):+ve(n,/\d+/)-+ve(e,/\d+/))+";":V+O(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ve(r.props,/grid-\w+-start/)})?e:V+O(O(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,G+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(fe(e)-1-t>6)switch(te(e,t+1)){case 109:if(te(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,"$1"+G+"$2-$3$1"+rt+(te(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~vt(e,"stretch",0)?oo(O(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,i,a,d,l,u){return V+o+":"+i+u+(a?V+o+"-span:"+(d?l:+l-+i)+u:"")+e});case 4949:if(te(e,t+6)===121)return O(e,":",":"+G)+e;break;case 6444:switch(te(e,te(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+G+(te(e,14)===45?"inline-":"")+"box$3$1"+G+"$2$3$1"+V+"$2box$3")+e;case 100:return O(e,":",":"+V)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,"scroll-","scroll-snap-")+e}return e}function jt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Vs(e,t,n,r){switch(e.type){case As:if(e.children.length)break;case Is:case Rn:return e.return=e.return||e.value;case Qr:return"";case Zr:return e.return=e.value+"{"+jt(e.children,r)+"}";case At:if(!fe(e.value=e.props.join(",")))return""}return fe(n=jt(e.children,r))?e.return=e.value+"{"+n+"}":""}function Ks(e){var t=no(e);return function(n,r,o,i){for(var a="",d=0;d<t;d++)a+=e[d](n,r,o,i)||"";return a}}function Xs(e){return function(t){t.root||(t=t.return)&&e(t)}}function Js(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Rn:e.return=oo(e.value,e.length,n);return;case Zr:return jt([Re(e,{value:O(e.value,"@","@"+G)})],r);case At:if(e.length)return Ds(n=e.props,function(o){switch(ve(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Fe(Re(e,{props:[O(o,/:(read-\w+)/,":"+rt+"$1")]})),Fe(Re(e,{props:[o]})),ln(e,{props:Gn(n,r)});break;case"::placeholder":Fe(Re(e,{props:[O(o,/:(plac\w+)/,":"+G+"input-$1")]})),Fe(Re(e,{props:[O(o,/:(plac\w+)/,":"+rt+"$1")]})),Fe(Re(e,{props:[O(o,/:(plac\w+)/,V+"input-$1")]})),Fe(Re(e,{props:[o]})),ln(e,{props:Gn(n,r)});break}return""})}}var Qs={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},de={},Ue=typeof process<"u"&&de!==void 0&&(de.REACT_APP_SC_ATTR||de.SC_ATTR)||"data-styled",io="active",so="data-styled-version",Ft="6.1.19",Mn=`/*!sc*/
`,Rt=typeof window<"u"&&typeof document<"u",Zs=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&de!==void 0&&de.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&de.REACT_APP_SC_DISABLE_SPEEDY!==""?de.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&de.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&de!==void 0&&de.SC_DISABLE_SPEEDY!==void 0&&de.SC_DISABLE_SPEEDY!==""&&de.SC_DISABLE_SPEEDY!=="false"&&de.SC_DISABLE_SPEEDY),ea={},Bt=Object.freeze([]),qe=Object.freeze({});function ao(e,t,n){return n===void 0&&(n=qe),e.theme!==n.theme&&e.theme||t||n.theme}var co=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ta=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,na=/(^-|-$)/g;function Yn(e){return e.replace(ta,"-").replace(na,"")}var ra=/(a)(d)/gi,mt=52,Vn=function(e){return String.fromCharCode(e+(e>25?39:97))};function hn(e){var t,n="";for(t=Math.abs(e);t>mt;t=t/mt|0)n=Vn(t%mt)+n;return(Vn(t%mt)+n).replace(ra,"$1-$2")}var Yt,lo=5381,Be=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},uo=function(e){return Be(lo,e)};function ho(e){return hn(uo(e)>>>0)}function oa(e){return e.displayName||e.name||"Component"}function Vt(e){return typeof e=="string"&&!0}var po=typeof Symbol=="function"&&Symbol.for,mo=po?Symbol.for("react.memo"):60115,ia=po?Symbol.for("react.forward_ref"):60112,sa={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},aa={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},fo={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ca=((Yt={})[ia]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Yt[mo]=fo,Yt);function Kn(e){return("type"in(t=e)&&t.type.$$typeof)===mo?fo:"$$typeof"in e?ca[e.$$typeof]:sa;var t}var la=Object.defineProperty,da=Object.getOwnPropertyNames,Xn=Object.getOwnPropertySymbols,ua=Object.getOwnPropertyDescriptor,ha=Object.getPrototypeOf,Jn=Object.prototype;function go(e,t,n){if(typeof t!="string"){if(Jn){var r=ha(t);r&&r!==Jn&&go(e,r,n)}var o=da(t);Xn&&(o=o.concat(Xn(t)));for(var i=Kn(e),a=Kn(t),d=0;d<o.length;++d){var l=o[d];if(!(l in aa||n&&n[l]||a&&l in a||i&&l in i)){var u=ua(t,l);try{la(e,l,u)}catch{}}}}return e}function Ae(e){return typeof e=="function"}function Ln(e){return typeof e=="object"&&"styledComponentId"in e}function ze(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function pn(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function st(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function mn(e,t,n){if(n===void 0&&(n=!1),!n&&!st(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=mn(e[r],t[r]);else if(st(t))for(var r in t)e[r]=mn(e[r],t[r]);return e}function Tn(e,t){Object.defineProperty(e,"toString",{value:t})}function Ne(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var pa=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,i=o;t>=i;)if((i<<=1)<0)throw Ne(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(r),this.length=i;for(var a=o;a<i;a++)this.groupSizes[a]=0}for(var d=this.indexOfGroup(t+1),l=(a=0,n.length);a<l;a++)this.tag.insertRule(d,n[a])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var i=r;i<o;i++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),i=o+r,a=o;a<i;a++)n+="".concat(this.tag.getRule(a)).concat(Mn);return n},e}(),Ct=new Map,Et=new Map,St=1,ft=function(e){if(Ct.has(e))return Ct.get(e);for(;Et.has(St);)St++;var t=St++;return Ct.set(e,t),Et.set(t,e),t},ma=function(e,t){St=t+1,Ct.set(e,t),Et.set(t,e)},fa="style[".concat(Ue,"][").concat(so,'="').concat(Ft,'"]'),ga=new RegExp("^".concat(Ue,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ya=function(e,t,n){for(var r,o=n.split(","),i=0,a=o.length;i<a;i++)(r=o[i])&&e.registerName(t,r)},xa=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Mn),o=[],i=0,a=r.length;i<a;i++){var d=r[i].trim();if(d){var l=d.match(ga);if(l){var u=0|parseInt(l[1],10),c=l[2];u!==0&&(ma(c,u),ya(e,c,l[3]),e.getTag().insertRules(u,o)),o.length=0}else o.push(d)}}},Qn=function(e){for(var t=document.querySelectorAll(fa),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Ue)!==io&&(xa(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function ba(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var yo=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(d){var l=Array.from(d.querySelectorAll("style[".concat(Ue,"]")));return l[l.length-1]}(n),i=o!==void 0?o.nextSibling:null;r.setAttribute(Ue,io),r.setAttribute(so,Ft);var a=ba();return a&&r.setAttribute("nonce",a),n.insertBefore(r,i),r},$a=function(){function e(t){this.element=yo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,i=r.length;o<i;o++){var a=r[o];if(a.ownerNode===n)return a}throw Ne(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),va=function(){function e(t){this.element=yo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),wa=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Zn=Rt,ka={isServer:!Rt,useCSSOMInjection:!Zs},Mt=function(){function e(t,n,r){t===void 0&&(t=qe),n===void 0&&(n={});var o=this;this.options=ne(ne({},ka),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Rt&&Zn&&(Zn=!1,Qn(this)),Tn(this,function(){return function(i){for(var a=i.getTag(),d=a.length,l="",u=function(h){var f=function(x){return Et.get(x)}(h);if(f===void 0)return"continue";var g=i.names.get(f),$=a.getGroup(h);if(g===void 0||!g.size||$.length===0)return"continue";var y="".concat(Ue,".g").concat(h,'[id="').concat(f,'"]'),k="";g!==void 0&&g.forEach(function(x){x.length>0&&(k+="".concat(x,","))}),l+="".concat($).concat(y,'{content:"').concat(k,'"}').concat(Mn)},c=0;c<d;c++)u(c);return l}(o)})}return e.registerId=function(t){return ft(t)},e.prototype.rehydrate=function(){!this.server&&Rt&&Qn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(ne(ne({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new wa(o):r?new $a(o):new va(o)}(this.options),new pa(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(ft(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(ft(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(ft(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ca=/&/g,Sa=/^\s*\/\/.*$/gm;function xo(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=xo(n.children,t)),n})}function Pa(e){var t,n,r,o=qe,i=o.options,a=i===void 0?qe:i,d=o.plugins,l=d===void 0?Bt:d,u=function(f,g,$){return $.startsWith(n)&&$.endsWith(n)&&$.replaceAll(n,"").length>0?".".concat(t):f},c=l.slice();c.push(function(f){f.type===At&&f.value.includes("&")&&(f.props[0]=f.props[0].replace(Ca,n).replace(r,u))}),a.prefix&&c.push(Js),c.push(Vs);var h=function(f,g,$,y){g===void 0&&(g=""),$===void 0&&($=""),y===void 0&&(y="&"),t=y,n=g,r=new RegExp("\\".concat(n,"\\b"),"g");var k=f.replace(Sa,""),x=qs($||g?"".concat($," ").concat(g," { ").concat(k," }"):k);a.namespace&&(x=xo(x,a.namespace));var j=[];return jt(x,Ks(c.concat(Xs(function(R){return j.push(R)})))),j};return h.hash=l.length?l.reduce(function(f,g){return g.name||Ne(15),Be(f,g.name)},lo).toString():"",h}var ja=new Mt,fn=Pa(),bo=re.createContext({shouldForwardProp:void 0,styleSheet:ja,stylis:fn});bo.Consumer;re.createContext(void 0);function gn(){return p.useContext(bo)}var Ra=function(){function e(t,n){var r=this;this.inject=function(o,i){i===void 0&&(i=fn);var a=r.name+i.hash;o.hasNameForId(r.id,a)||o.insertRules(r.id,a,i(r.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Tn(this,function(){throw Ne(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=fn),this.name+t.hash},e}(),Ea=function(e){return e>="A"&&e<="Z"};function er(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Ea(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var $o=function(e){return e==null||e===!1||e===""},vo=function(e){var t,n,r=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!$o(i)&&(Array.isArray(i)&&i.isCss||Ae(i)?r.push("".concat(er(o),":"),i,";"):st(i)?r.push.apply(r,it(it(["".concat(o," {")],vo(i),!1),["}"],!1)):r.push("".concat(er(o),": ").concat((t=o,(n=i)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in Qs||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Ee(e,t,n,r){if($o(e))return[];if(Ln(e))return[".".concat(e.styledComponentId)];if(Ae(e)){if(!Ae(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return Ee(o,t,n,r)}var i;return e instanceof Ra?n?(e.inject(n,r),[e.getName(r)]):[e]:st(e)?vo(e):Array.isArray(e)?Array.prototype.concat.apply(Bt,e.map(function(a){return Ee(a,t,n,r)})):[e.toString()]}function wo(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ae(n)&&!Ln(n))return!1}return!0}var Ma=uo(Ft),La=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&wo(t),this.componentId=n,this.baseHash=Be(Ma,n),this.baseStyle=r,Mt.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=ze(o,this.staticRulesId);else{var i=pn(Ee(this.rules,t,n,r)),a=hn(Be(this.baseHash,i)>>>0);if(!n.hasNameForId(this.componentId,a)){var d=r(i,".".concat(a),void 0,this.componentId);n.insertRules(this.componentId,a,d)}o=ze(o,a),this.staticRulesId=a}else{for(var l=Be(this.baseHash,r.hash),u="",c=0;c<this.rules.length;c++){var h=this.rules[c];if(typeof h=="string")u+=h;else if(h){var f=pn(Ee(h,t,n,r));l=Be(l,f+c),u+=f}}if(u){var g=hn(l>>>0);n.hasNameForId(this.componentId,g)||n.insertRules(this.componentId,g,r(u,".".concat(g),void 0,this.componentId)),o=ze(o,g)}}return o},e}(),at=re.createContext(void 0);at.Consumer;function Ta(e){var t=re.useContext(at),n=p.useMemo(function(){return function(r,o){if(!r)throw Ne(14);if(Ae(r)){var i=r(o);return i}if(Array.isArray(r)||typeof r!="object")throw Ne(8);return o?ne(ne({},o),r):r}(e.theme,t)},[e.theme,t]);return e.children?re.createElement(at.Provider,{value:n},e.children):null}var Kt={};function za(e,t,n){var r=Ln(e),o=e,i=!Vt(e),a=t.attrs,d=a===void 0?Bt:a,l=t.componentId,u=l===void 0?function(P,M){var D=typeof P!="string"?"sc":Yn(P);Kt[D]=(Kt[D]||0)+1;var A="".concat(D,"-").concat(ho(Ft+D+Kt[D]));return M?"".concat(M,"-").concat(A):A}(t.displayName,t.parentComponentId):l,c=t.displayName,h=c===void 0?function(P){return Vt(P)?"styled.".concat(P):"Styled(".concat(oa(P),")")}(e):c,f=t.displayName&&t.componentId?"".concat(Yn(t.displayName),"-").concat(t.componentId):t.componentId||u,g=r&&o.attrs?o.attrs.concat(d).filter(Boolean):d,$=t.shouldForwardProp;if(r&&o.shouldForwardProp){var y=o.shouldForwardProp;if(t.shouldForwardProp){var k=t.shouldForwardProp;$=function(P,M){return y(P,M)&&k(P,M)}}else $=y}var x=new La(n,f,r?o.componentStyle:void 0);function j(P,M){return function(D,A,_){var H=D.attrs,b=D.componentStyle,v=D.defaultProps,w=D.foldedComponentIds,S=D.styledComponentId,I=D.target,B=re.useContext(at),U=gn(),K=D.shouldForwardProp||U.shouldForwardProp,le=ao(A,B,v)||qe,q=function($e,C,N){for(var z,L=ne(ne({},C),{className:void 0,theme:N}),T=0;T<$e.length;T+=1){var E=Ae(z=$e[T])?z(L):z;for(var W in E)L[W]=W==="className"?ze(L[W],E[W]):W==="style"?ne(ne({},L[W]),E[W]):E[W]}return C.className&&(L.className=ze(L.className,C.className)),L}(H,A,le),se=q.as||I,ee={};for(var ae in q)q[ae]===void 0||ae[0]==="$"||ae==="as"||ae==="theme"&&q.theme===le||(ae==="forwardedAs"?ee.as=q.forwardedAs:K&&!K(ae,se)||(ee[ae]=q[ae]));var be=function($e,C){var N=gn(),z=$e.generateAndInjectStyles(C,N.styleSheet,N.stylis);return z}(b,q),Se=ze(w,S);return be&&(Se+=" "+be),q.className&&(Se+=" "+q.className),ee[Vt(se)&&!co.has(se)?"class":"className"]=Se,_&&(ee.ref=_),p.createElement(se,ee)}(R,P,M)}j.displayName=h;var R=re.forwardRef(j);return R.attrs=g,R.componentStyle=x,R.displayName=h,R.shouldForwardProp=$,R.foldedComponentIds=r?ze(o.foldedComponentIds,o.styledComponentId):"",R.styledComponentId=f,R.target=r?o.target:e,Object.defineProperty(R,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=r?function(M){for(var D=[],A=1;A<arguments.length;A++)D[A-1]=arguments[A];for(var _=0,H=D;_<H.length;_++)mn(M,H[_],!0);return M}({},o.defaultProps,P):P}}),Tn(R,function(){return".".concat(R.styledComponentId)}),i&&go(R,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),R}function tr(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var nr=function(e){return Object.assign(e,{isCss:!0})};function ge(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ae(e)||st(e))return nr(Ee(tr(Bt,it([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Ee(r):nr(Ee(tr(r,t)))}function yn(e,t,n){if(n===void 0&&(n=qe),!t)throw Ne(1,t);var r=function(o){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,n,ge.apply(void 0,it([o],i,!1)))};return r.attrs=function(o){return yn(e,t,ne(ne({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return yn(e,t,ne(ne({},n),o))},r}var ko=function(e){return yn(za,e)},m=ko;co.forEach(function(e){m[e]=ko(e)});var Ia=function(){function e(t,n){this.rules=t,this.componentId=n,this.isStatic=wo(t),Mt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,n,r,o){var i=o(pn(Ee(this.rules,n,r,o)),""),a=this.componentId+t;r.insertRules(a,a,i)},e.prototype.removeStyles=function(t,n){n.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,n,r,o){t>2&&Mt.registerId(this.componentId+t),this.removeStyles(t,r),this.createStyles(t,n,r,o)},e}();function Aa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=ge.apply(void 0,it([e],t,!1)),o="sc-global-".concat(ho(JSON.stringify(r))),i=new Ia(r,o),a=function(l){var u=gn(),c=re.useContext(at),h=re.useRef(u.styleSheet.allocateGSInstance(o)).current;return u.styleSheet.server&&d(h,l,u.styleSheet,c,u.stylis),re.useLayoutEffect(function(){if(!u.styleSheet.server)return d(h,l,u.styleSheet,c,u.stylis),function(){return i.removeStyles(h,u.styleSheet)}},[h,l,u.styleSheet,c,u.stylis]),null};function d(l,u,c,h,f){if(i.isStatic)i.renderStyles(l,ea,c,f);else{var g=ne(ne({},u),{theme:ao(u,h,a.defaultProps)});i.renderStyles(l,g,c,f)}}return re.memo(a)}const Co=p.createContext(void 0),So=()=>{const e=p.useContext(Co);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Na=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Da=Z(({children:e})=>{const t=Ye(),n=t.preferences.theme||"system",o=n==="system"?Na():n,i=Ts[o]||zs,a={theme:i,themeName:o,themePreference:n,setTheme:d=>{t.updatePreference("theme",d)},toggleTheme:()=>{const d=o==="light"?"dark":"light";t.updatePreference("theme",d)},isDarkMode:o==="dark"};return p.useEffect(()=>{if(n==="system"&&typeof window<"u"&&window.matchMedia){const d=window.matchMedia("(prefers-color-scheme: dark)"),l=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return d.addEventListener("change",l),()=>d.removeEventListener("change",l)}},[n,t]),p.useEffect(()=>{if(typeof document<"u"){const d=document.documentElement;Object.entries(i.colors).forEach(([l,u])=>{d.style.setProperty(`--color-${l}`,u)}),Object.entries(i.spacing).forEach(([l,u])=>{d.style.setProperty(`--spacing-${l}`,u)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[i,o]),s.jsx(Co.Provider,{value:a,children:s.jsx(Ta,{theme:i,children:e})})});function Oa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Fa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var Xt=typeof window<"u",Ba=function(e){p.useEffect(e,[])},Wa=function(e){var t=p.useRef(e);t.current=e,Ba(function(){return function(){return t.current()}})},Ha=function(e){var t=p.useRef(0),n=p.useState(e),r=n[0],o=n[1],i=p.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Wa(function(){cancelAnimationFrame(t.current)}),[r,i]},Po=function(e){var t={},n=t.initialWidth,r=n===void 0?1/0:n,o=t.initialHeight,i=o===void 0?1/0:o,a=t.onChange,d=Ha({width:Xt?window.innerWidth:r,height:Xt?window.innerHeight:i}),l=d[0],u=d[1];return p.useEffect(function(){if(Xt){var c=function(){var h=window.innerWidth,f=window.innerHeight;u({width:h,height:f}),a&&a(h,f)};return Oa(window,"resize",c),function(){Fa(window,"resize",c)}}},[]),l};const jo=()=>{const{width:e=0,height:t=0}=Po();return{width:e,height:t}},_a=()=>{const{width:e=0,height:t=0}=Po();return e>t?"landscape":"portrait"},Ga=()=>{const{width:e}=jo(),{theme:t}=So(),n={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=n.large?"large":e>=n.desktop?"desktop":e>=n.tablet?"tablet":e>=n.mobileLandscape?"mobileLandscape":"mobilePortrait"},Ua=()=>{const[e,t]=p.useState(!1);return p.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Wt=()=>{const e=jo(),t=_a(),n=Ga(),r=Ua();return{orientation:t,breakpoint:n,dimensions:e,isMobile:n==="mobilePortrait"||n==="mobileLandscape",isTablet:n==="tablet",isDesktop:n==="desktop"||n==="large",isTouch:r}},qa=p.createContext(void 0),Ya=({children:e})=>{const t=Ye(),n=Wt(),[r,o]=p.useState(!0),[i,a]=p.useState(["chat","moves"]),[d,l]=p.useState(!1),u=t.preferences.layout,c=p.useMemo(()=>u==="auto"?n.orientation:u,[u,n.orientation]),h=p.useMemo(()=>n.isMobile||n.dimensions.width<768,[n.isMobile,n.dimensions.width]),f=y=>{t.updatePreference("layout",y)},g=y=>{a(k=>k.includes(y)?k.filter(x=>x!==y):[...k,y])};p.useEffect(()=>{l(!0),o(k=>{const x=!h;return k!==x?x:k}),a(k=>{if(h&&c==="portrait"){const x=["chat"];return JSON.stringify(k)!==JSON.stringify(x)?x:k}else if(c==="landscape"&&!h){const x=["chat","moves","analysis"];return JSON.stringify(k)!==JSON.stringify(x)?x:k}return k});const y=setTimeout(()=>{l(!1)},300);return()=>clearTimeout(y)},[c,h]);const $={...n,layoutPreference:u,setLayoutPreference:f,activeLayout:c,isCompactMode:h,showSidebar:r,setSidebarVisible:o,activePanels:i,togglePanel:g,isTransitioning:d};return s.jsx(qa.Provider,{value:$,children:e})};m.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: ${({isTransitioning:e,theme:t})=>e?`all ${t.transitions.normal}`:"none"};
`;m.main`
    flex: 1;
    display: flex;
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ge`
                flex-direction: column;
            `:ge`
                flex-direction: row;
            `}
`;m.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ge`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `:ge`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `}
`;m.aside`
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`all ${e.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t,showSidebar:n})=>n?e==="portrait"||t?ge`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme:r})=>r.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `:ge`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme:r})=>r.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `:ge`
                width: 0;
                height: 0;
                opacity: 0;
                border: none;
            `}
`;m.div`
    display: grid;
    grid-template-columns: repeat(
    auto-fit,
    minmax(${({minColumnWidth:e})=>e||"250px"}, 1fr)
  );
    grid-gap: ${({gap:e,theme:t})=>e||t.spacing.md};
    width: 100%;

    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }
`;m.div`
    display: flex;
    flex-direction: ${({direction:e})=>e||"row"};
    justify-content: ${({justify:e})=>e||"start"};
    align-items: ${({align:e})=>e||"stretch"};
    gap: ${({gap:e,theme:t})=>e||t.spacing.md};
    flex-wrap: ${({wrap:e})=>e?"wrap":"nowrap"};

    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        flex-direction: column;
    }
`;m.div`
    ${({showOn:e,hideOn:t,theme:n})=>{let r="";return t?.includes("mobile")&&(r+=`
        @media (max-width: ${n.breakpoints.tablet}) {
          display: none;
        }
      `),t?.includes("tablet")&&(r+=`
        @media (min-width: ${n.breakpoints.tablet}) and (max-width: ${n.breakpoints.desktop}) {
          display: none;
        }
      `),t?.includes("desktop")&&(r+=`
        @media (min-width: ${n.breakpoints.desktop}) {
          display: none;
        }
      `),e?.length&&(r+="display: none;",e.includes("mobile")&&(r+=`
          @media (max-width: ${n.breakpoints.tablet}) {
            display: block;
          }
        `),e.includes("tablet")&&(r+=`
          @media (min-width: ${n.breakpoints.tablet}) and (max-width: ${n.breakpoints.desktop}) {
            display: block;
          }
        `),e.includes("desktop")&&(r+=`
          @media (min-width: ${n.breakpoints.desktop}) {
            display: block;
          }
        `)),ge`${r}`}}
`;m.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;m.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    background: ${({theme:e})=>e.colors.background};
`;m.header`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
`;m.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme:e})=>e.spacing.lg};
    min-height: 0; // Important for flexbox to allow shrinking
`;m.aside`
    width: ${({width:e,$isCollapsed:t})=>t?"0px":`${e}px`};
    height: 100vh;
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-left: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`width ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;m.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.sm};
    flex-shrink: 0;
`;m.button`
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    border: 1px solid ${({theme:e})=>e.colors.border};
    border-radius: 4px;
    background: ${({theme:e,$isActive:t})=>t?e.colors.primary:e.colors.surface};
    color: ${({theme:e,$isActive:t})=>t?e.colors.textInverse:e.colors.text};
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
    cursor: pointer;
    transition: ${({theme:e})=>`all ${e.transitions.fast}`};

    &:hover {
        background: ${({theme:e,$isActive:t})=>t?e.colors.primaryHover:e.colors.surfaceHover};
    }
`;m.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.md};
`;m.div`
    width: 4px;
    height: 100%;
    background: transparent;
    cursor: col-resize;
    position: absolute;
    left: -2px;
    top: 0;

    &:hover {
        background: ${({theme:e})=>e.colors.primary};
    }
`;m.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;m.header`
    height: 50px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
`;m.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};
    padding: ${({theme:e})=>e.spacing.sm};
    min-height: 0; // Important for flexbox
    max-height: 65vh; // Leave room for bottom panels
`;m.div`
    height: ${({$isExpanded:e,$panelHeight:t})=>e?`${t}px`:"60px"};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-top: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`height ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;m.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.xs};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    background: ${({theme:e})=>e.colors.backgroundTertiary};
    overflow-x: auto;
    flex-shrink: 0;
`;m.button`
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    border: 1px solid ${({theme:e})=>e.colors.border};
    border-radius: 6px;
    background: ${({theme:e,$isActive:t})=>t?e.colors.primary:e.colors.surface};
    color: ${({theme:e,$isActive:t})=>t?e.colors.textInverse:e.colors.text};
    font-size: ${({theme:e})=>e.typography.fontSize.xs};
    font-weight: ${({theme:e})=>e.typography.fontWeight.medium};
    cursor: pointer;
    transition: ${({theme:e})=>`all ${e.transitions.fast}`};
    white-space: nowrap;
    min-width: 60px;

    &:hover {
        background: ${({theme:e,$isActive:t})=>t?e.colors.primaryHover:e.colors.surfaceHover};
    }
`;m.button`
    margin-left: auto;
    padding: ${({theme:e})=>e.spacing.xs};
    border: 1px solid ${({theme:e})=>e.colors.border};
    border-radius: 4px;
    background: ${({theme:e})=>e.colors.surface};
    color: ${({theme:e})=>e.colors.text};
    cursor: pointer;
    transition: ${({theme:e})=>`all ${e.transitions.fast}`};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    &:hover {
        background: ${({theme:e})=>e.colors.surfaceHover};
    }

    &::before {
        content: '${({$isExpanded:e})=>e?"▼":"▲"}';
        font-size: 12px;
    }
`;m.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.sm};
`;m.div`
    width: 100%;
    height: 100%;
    touch-action: pan-y; // Allow vertical scrolling but capture horizontal swipes
`;m.button`
    position: fixed;
    bottom: 80px;
    right: 16px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.textInverse};
    font-size: 24px;
    cursor: pointer;
    box-shadow: ${({theme:e})=>e.shadows.lg};
    transition: ${({theme:e})=>`all ${e.transitions.fast}`};
    z-index: ${({theme:e})=>e.zIndices.overlay};

    &:hover {
        background: ${({theme:e})=>e.colors.primaryHover};
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;const Va=m.header`
  height: 56px;
  background-color: ${e=>e.theme.colors.surface};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${e=>e.theme.spacing[2]};
  position: relative;
  z-index: 100;
  
  @media (min-width: 640px) {
    height: 64px;
    padding: 0 ${e=>e.theme.spacing[4]};
  }
`,Ka=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Xa=m.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${e=>e.theme.borderRadius.md};
  color: ${e=>e.theme.colors.text};
  transition: background-color ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
`,Ja=m.img`
  width: 160px;
  height: 40px;
  display: block;
  
  @media (min-width: 640px) {
    width: 200px;
    height: 50px;
    margin-right: ${e=>e.theme.spacing[2]};
  }
`;m.h1`
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  color: ${e=>e.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;const Qa=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Jt=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Qt=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Zt=m.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,Pe=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  border: none;
  background-color: ${e=>e.$isActive?e.theme.colors.surface:"transparent"};
  color: ${e=>e.$isActive?e.theme.colors.text:e.theme.colors.textSecondary};
  border-radius: ${e=>e.theme.borderRadius.sm};
  cursor: ${e=>e.$isDisabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$isDisabled?.5:1};
  transition: all ${e=>e.theme.transitions.fast};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.$isActive?e.theme.typography.fontWeight.medium:"normal"};
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background-color: ${e=>e.$isActive?e.theme.colors.surface:e.theme.colors.backgroundTertiary};
    color: ${e=>e.theme.colors.text};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`,Ro=Z(({onMenuClick:e})=>{const{preferencesStore:t}=Le(),{viewMode:n,chessOrientation:r}=t.preferences,{themePreference:o,setTheme:i}=So(),a=c=>{t.updatePreference("viewMode",c)},d=c=>{t.updatePreference("chessOrientation",c)},l=c=>{i(c)},u=n==="chat-only";return s.jsxs(Va,{children:[s.jsxs(Ka,{children:[s.jsx(Xa,{onClick:e,"aria-label":"Menu",children:"☰"}),s.jsx(Ja,{src:"/simpleficsinterface.svg",alt:"Simple FICS Interface",title:"Simple FICS Interface"})]}),s.jsxs(Qa,{children:[s.jsxs(Jt,{children:[s.jsx(Qt,{children:"Theme:"}),s.jsxs(Zt,{children:[s.jsx(Pe,{$isActive:o==="light",onClick:()=>l("light"),title:"Light Theme",children:"☀"}),s.jsx(Pe,{$isActive:o==="dark",onClick:()=>l("dark"),title:"Dark Theme",children:"☾"}),s.jsx(Pe,{$isActive:o==="system",onClick:()=>l("system"),title:"System Theme",children:"◐"})]})]}),s.jsxs(Jt,{children:[s.jsx(Qt,{children:"Orient:"}),s.jsxs(Zt,{children:[s.jsx(Pe,{$isActive:r==="landscape",$isDisabled:u,onClick:()=>!u&&d("landscape"),disabled:u,title:"Landscape",children:"▭"}),s.jsx(Pe,{$isActive:r==="portrait",$isDisabled:u,onClick:()=>!u&&d("portrait"),disabled:u,title:"Portrait",children:"▯"})]})]}),s.jsxs(Jt,{children:[s.jsx(Qt,{children:"Mode:"}),s.jsxs(Zt,{children:[s.jsx(Pe,{$isActive:n==="chess-only",onClick:()=>a("chess-only"),title:"Chess Only",children:"♔"}),s.jsx(Pe,{$isActive:n==="chess-and-chat",onClick:()=>a("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),s.jsx(Pe,{$isActive:n==="chat-only",onClick:()=>a("chat-only"),title:"Chat Only",children:"▤"})]})]})]})]})});Ro.displayName="AppHeader";const Za=m.img`
  width: 93%;
  height: 93%;
  user-select: none;
  -webkit-user-drag: none;
  cursor: ${e=>e.$isDragging?"grabbing":"grab"};
  filter: ${e=>e.$isDragging?"drop-shadow(0 4px 8px rgba(0,0,0,0.3))":"none"};
  transition: filter 0.2s ease;
  
  &:hover {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }
`,ec={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Me=({piece:e,size:t,isDragging:n=!1,style:r})=>{const o=ec[e];if(!o)return null;const i=`/pieces/cburnett/${o}.svg`;return s.jsx(Za,{className:"chess-piece",src:i,alt:o,$isDragging:n,draggable:!1,style:r})};Me.displayName="ChessPiece";const tc=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,nc=m.div`
  position: absolute;
  left: ${e=>e.$x}px;
  top: ${e=>e.$y}px;
  transform: translate(-50%, -50%);
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[3]};
  box-shadow: ${e=>e.theme.shadows.xl};
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
`,rc=m.button`
  width: 60px;
  height: 60px;
  border: 2px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    border-color: ${e=>e.theme.colors.primary};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`,Eo=({isOpen:e,color:t,onSelect:n,onCancel:r,position:o})=>{if(!o)return null;const i=["Q","R","B","N"],a=d=>t==="white"?d:d.toLowerCase();return s.jsx(tc,{$isOpen:e,onClick:r,children:s.jsx(nc,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:i.map(d=>s.jsx(rc,{onClick:()=>n(d.toLowerCase()),children:s.jsx(Me,{piece:a(d),size:50})},d))})})};Eo.displayName="PromotionDialog";const oc=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,ic=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,sc=m.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: ${e=>e.$isSelected?e.theme.colors.board.selected:e.$isLastMoveSquare?e.$isLight?e.theme.colors.board.lastMoveLight:e.theme.colors.board.lastMoveDark:e.$isLight?e.theme.colors.board.light:e.theme.colors.board.dark};
  
  &:hover {
    background-color: ${e=>e.$isLight?e.theme.colors.board.hoverLight:e.theme.colors.board.hoverDark};
  }
  
  ${e=>e.$isHighlighted&&`
    &::after {
      content: '';
      position: absolute;
      width: 30%;
      height: 30%;
      background-color: ${e.theme.colors.board.highlight};
      border-radius: 50%;
      opacity: 0.8;
    }
  `}
  
  ${e=>e.$isPossibleMove&&`
    &::before {
      content: '';
      position: absolute;
      width: ${e.$isLight||e.$isLastMoveSquare?"35%":"30%"};
      height: ${e.$isLight||e.$isLastMoveSquare?"35%":"30%"};
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 50%;
    }
  `}
`,rr=m.div`
  position: absolute;
  font-size: ${e=>Math.max(6,Math.min(14,e.$size*.15))}px;
  font-weight: 600;
  color: ${e=>e.$isLight?e.theme.colors.board.dark:e.theme.colors.board.light};
  opacity: 0.8;
  user-select: none;
  line-height: 1;
  
  ${e=>e.$type==="file"?`
    bottom: 3px;
    right: 3px;
  `:`
    top: 3px;
    left: 3px;
  `}
`,ac=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,cc=m.div.attrs(e=>({style:{transform:`translate(
      ${e.$fromX+(e.$toX-e.$fromX)*e.$progress}px,
      ${e.$fromY+(e.$toY-e.$fromY)*e.$progress}px
    )`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,We=["a","b","c","d","e","f","g","h"],He=["8","7","6","5","4","3","2","1"];function lc(e,t){return(e+t)%2===0}function dc(e,t,n){const r=n?We[7-e]:We[e],o=n?He[7-t]:He[t];return`${r}${o}`}function uc(e){const t=new Map,[n]=e.split(" ");return n.split("/").forEach((o,i)=>{let a=0;for(const d of o)if(d>="1"&&d<="8")a+=parseInt(d);else{const l=`${We[a]}${He[i]}`;t.set(l,d),a++}}),t}const xn=Z(({position:e,size:t,flipped:n=!1,showCoordinates:r=!0,onMove:o,onDrop:i,highlightedSquares:a=new Set,lastMove:d,interactive:l=!0,onSizeCalculated:u,selectedCapturedPiece:c,onCapturedPieceSelect:h})=>{Wt();const f=Ye(),g=Lt(),$=p.useRef(null),[y,k]=p.useState(t||200),[x,j]=p.useState(null),[R,P]=p.useState(new Set),[M,D]=p.useState(null),[A,_]=p.useState([]),H=p.useRef(),[b,v]=p.useState(null),[w,S]=p.useState(!1),I=p.useMemo(()=>uc(e),[e]),B=p.useRef(new Map),U=p.useCallback((C,N)=>{const z=We.indexOf(C[0]),L=He.indexOf(C[1]),T=N/8,E=n?(7-z)*T:z*T,W=n?(7-L)*T:L*T;return{x:E,y:W}},[n]),K=p.useCallback((C,N,z)=>{const L=C.toLowerCase()==="p",T=z[1];return L&&(T==="8"||T==="1")},[]),le=p.useCallback(C=>{C.preventDefault(),g.isPlaying&&g.clearPremove()},[g]);p.useEffect(()=>{if(t){k(t);return}const C=()=>{if(!$.current)return;const E=$.current.parentElement;if(!E)return;const{width:W,height:F}=E.getBoundingClientRect();$.current.getBoundingClientRect();const J=16,Y=W-J,oe=F-J,ie=Math.floor(Math.min(Y,oe)),Te=Math.max(100,Math.floor(ie/8)*8);Te!==y&&(k(Te),u?.(Te))},N=setTimeout(C,50);C();let z;const L=()=>{clearTimeout(z),z=setTimeout(C,100)};window.addEventListener("resize",L);let T=null;return $.current&&$.current.parentElement&&(T=new ResizeObserver(()=>{L()}),T.observe($.current.parentElement)),()=>{window.removeEventListener("resize",L),clearTimeout(z),clearTimeout(N),T&&T.disconnect()}},[t,y]);const q=y/8,se=p.useMemo(()=>{if(!f.preferences.animateMoves)return!1;if(g.isPlaying&&f.preferences.disableAnimationLowTime){const C=g.currentGame,N=g.playingColor;if(C&&N&&(N==="white"?C.white.time:C.black.time)<10)return!1}return!0},[f.preferences.animateMoves,f.preferences.disableAnimationLowTime,g.isPlaying,g.currentGame,g.playingColor]);p.useEffect(()=>{if(!se||w){B.current=new Map(I);return}const C=B.current,N=[];C.forEach((z,L)=>{I.has(L)||I.forEach((T,E)=>{T===z&&!C.has(E)&&d&&d.from===L&&d.to===E&&N.push({piece:z,from:L,to:E,startTime:Date.now()})})}),N.length>0&&_(z=>[...z,...N]),B.current=new Map(I)},[I,d,se,w]),p.useEffect(()=>{if(w){const C=setTimeout(()=>{S(!1)},50);return()=>clearTimeout(C)}},[e,w]),p.useEffect(()=>{if(A.length===0)return;const C=()=>{const N=Date.now(),z=f.preferences.animationDuration;_(L=>{const T=L.filter(E=>N-E.startTime<z);return T.length>0&&(H.current=requestAnimationFrame(C)),T})};return H.current=requestAnimationFrame(C),()=>{H.current&&cancelAnimationFrame(H.current)}},[A.length,f.preferences.animationDuration]),p.useEffect(()=>{if(c)try{const C=g.currentPosition;g.chessBoard.getFen()!==C&&g.chessBoard.loadFen(C);const z=g.chessBoard.getLegalMoves().filter(T=>T.from==="@"&&T.san.toLowerCase().startsWith(c.toLowerCase())),L=new Set(z.map(T=>T.to));P(L),j(null)}catch(C){console.error("Error getting drop moves:",C),P(new Set)}},[c,g]);const ee=p.useCallback((C,N)=>{if(!l)return;const z=I.get(C);if(c){R.has(C)?(i?.(c,C),h?.(null),P(new Set)):(h?.(null),P(new Set));return}if(x)if(R.has(C)){const L=I.get(x);if(L&&K(L,x,C)){const T=L===L.toUpperCase()?"white":"black";if(g.isPlaying){const E=f.preferences.autoPromotionPiece;g.isMyTurn?(S(!0),o?.(x,C,E)):g.setPremove(x,C,E)}else{const E=N?.currentTarget.getBoundingClientRect();v({from:x,to:C,color:T,position:E?{x:E.left+E.width/2,y:E.top+E.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else g.isPlaying&&!g.isMyTurn?g.setPremove(x,C):(S(!0),o?.(x,C));j(null),P(new Set)}else if(C===x)j(null),P(new Set);else if(z)if(j(C),f.preferences.showLegalMoves)try{const L=g.currentPosition;g.chessBoard.getFen()!==L&&g.chessBoard.loadFen(L);const T=g.chessBoard.getLegalMoves(C),E=new Set(T.map(W=>W.to));P(E)}catch(L){console.error("Error getting legal moves:",L),P(new Set)}else P(new Set);else j(null),P(new Set);else if(z){j(C);try{const L=g.currentPosition;g.chessBoard.getFen()!==L&&g.chessBoard.loadFen(L);const T=z===z.toUpperCase(),E=g.chessBoard.getActiveColor();if(T&&E==="w"||!T&&E==="b")if(f.preferences.showLegalMoves){const F=g.chessBoard.getLegalMoves(C),J=new Set(F.map(Y=>Y.to));P(J)}else P(new Set);else P(new Set),j(null)}catch(L){console.error("Error getting legal moves:",L),P(new Set)}}},[x,R,I,o,i,l,K,g,f.preferences.autoPromotionPiece,c,h]),ae=p.useCallback((C,N,z)=>{if(!l)return;const L=C.clientX,T=C.clientY;let E=!1,W=!1;const J=C.currentTarget.getBoundingClientRect().width,Y=ie=>{const Te=Math.abs(ie.clientX-L),_t=Math.abs(ie.clientY-T);(Te>3||_t>3)&&z&&!W?(E=!0,W=!0,be(N,z,ie,J)):W&&D(Oe=>Oe?{...Oe,x:ie.clientX,y:ie.clientY}:null)},oe=ie=>{document.removeEventListener("mousemove",Y),document.removeEventListener("mouseup",oe),W?Se(ie,N,z):E?(D(null),j(null),P(new Set)):ee(N,C)};document.addEventListener("mousemove",Y),document.addEventListener("mouseup",oe)},[l,ee]),be=p.useCallback((C,N,z,L)=>{if(j(C),f.preferences.showLegalMoves)try{const E=g.currentPosition;g.chessBoard.getFen()!==E&&g.chessBoard.loadFen(E);const W=N===N.toUpperCase(),F=g.chessBoard.getActiveColor();if(W&&F==="w"||!W&&F==="b"){const Y=g.chessBoard.getLegalMoves(C),oe=new Set(Y.map(ie=>ie.to));P(oe)}else P(new Set)}catch(E){console.error("Error getting legal moves for drag:",E),P(new Set)}else P(new Set);const T={piece:N,from:C,x:z.clientX,y:z.clientY,size:L};D(T)},[f.preferences.showLegalMoves,g]),Se=p.useCallback((C,N,z)=>{try{const E=document.elementsFromPoint(C.clientX,C.clientY).find(W=>W.getAttribute("data-square"))?.getAttribute("data-square");if(E&&E!==N)if(K(z,N,E)){const W=z===z.toUpperCase()?"white":"black";if(g.isPlaying){const F=f.preferences.autoPromotionPiece;g.isMyTurn?(S(!0),o?.(N,E,F)):g.setPremove(N,E,F)}else v({from:N,to:E,color:W,position:{x:C.clientX,y:C.clientY}})}else g.isPlaying&&!g.isMyTurn?g.setPremove(N,E):(S(!0),o?.(N,E))}catch(L){console.error("Error in handleDragEnd:",L)}D(null),j(null),P(new Set)},[o,K,g,f.preferences.autoPromotionPiece]),$e=p.useMemo(()=>{const C=[];for(let N=0;N<8;N++)for(let z=0;z<8;z++){const L=lc(z,N),T=dc(z,N,n),E=I.get(T),W=a.has(T),F=d&&(d.from===T||d.to===T),J=x===T,Y=R.has(T),oe=M?.from===T,ie=A.some(Oe=>Oe.to===T),Te=r&&N===7,_t=r&&z===0;C.push(s.jsxs(sc,{"data-square":T,$isLight:L,$isHighlighted:W,$isLastMoveSquare:!!F,$isSelected:J,$isPossibleMove:Y,onMouseDown:Oe=>ae(Oe,T,E),children:[E&&!oe&&!ie&&s.jsx(Me,{piece:E,size:q}),Te&&s.jsx(rr,{$type:"file",$isLight:L,$size:q,children:n?We[7-z]:We[z]}),_t&&s.jsx(rr,{$type:"rank",$isLight:L,$size:q,children:n?He[7-N]:He[N]})]},T))}return C},[n,r,I,a,d,x,R,M,q,ee,ae]);return s.jsxs(s.Fragment,{children:[s.jsxs(oc,{ref:$,$size:y,onContextMenu:le,children:[s.jsx(ic,{children:$e}),A.map((C,N)=>{const z=U(C.from,y),L=U(C.to,y),T=Date.now()-C.startTime,E=f.preferences.animationDuration,W=Math.min(T/E,1),J=(Y=>Y<.5?4*Y*Y*Y:1-Math.pow(-2*Y+2,3)/2)(W);return s.jsx(cc,{$fromX:z.x,$fromY:z.y,$toX:L.x,$toY:L.y,$progress:J,$size:q,children:s.jsx(Me,{piece:C.piece,size:q})},`${C.from}-${C.to}-${C.startTime}`)})]}),M&&s.jsx(s.Fragment,{children:s.jsx(ac,{$x:M.x,$y:M.y,$size:M.size,children:s.jsx(Me,{piece:M.piece,size:M.size,isDragging:!0})})}),b&&s.jsx(Eo,{isOpen:!0,color:b.color,position:b.position,onSelect:C=>{S(!0),o?.(b.from,b.to,C),v(null)},onCancel:()=>v(null)})]})});xn.displayName="ChessBoardWithPieces";const hc=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,pc=m.span`
    display: inline-block;
    padding: ${({theme:e,$compact:t})=>t?`4px ${e.spacing[2]}`:`${e.spacing[1]} ${e.spacing[2]}`};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    color: ${({theme:e,$isLowTime:t})=>t?e.colors.error:e.colors.text};
    border-radius: ${({theme:e})=>e.borderRadius.md};
    box-shadow: ${({theme:e})=>e.shadows.sm};
    border: 2px solid transparent;
    transition: all ${({theme:e})=>e.transitions.fast};

    ${({$isLowTime:e,theme:t})=>e&&`
    color: ${t.colors.error};
    font-weight: bold;
  `}
`,Mo=({time:e,size:t="medium",isActive:n=!1,isFinished:r=!1,lowTimeThreshold:o=30,showTenths:i=!1,className:a,compact:d=!1})=>{const l=c=>{const h=Math.floor(c/3600),f=Math.floor(c%3600/60),g=Math.floor(c%60),$=Math.floor(c%1*10),y=n&&Math.floor(c)%2===0?" ":":";return h>0?`${h}${y}${f.toString().padStart(2,"0")}${y}${g.toString().padStart(2,"0")}`:c<o&&i?`${f}${y}${g.toString().padStart(2,"0")}.${$}`:`${f}${y}${g.toString().padStart(2,"0")}`},u=e<=o&&e>0;return s.jsx(hc,{size:t,className:a,children:s.jsx(pc,{$isLowTime:u,$isActive:n,$compact:d,$isFinished:r,children:l(e)})})},mc=m.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: ${({theme:e})=>e.shadows.container};
    border-radius: 10px;
    font-size: ${e=>e.$size||"20px"};
    font-family: ${e=>e.theme.typography.fontFamilyDigital};
    min-width: 70px;
    border: 3px solid;
    transition: all 0.3s ease;
    line-height: 0.9;
    padding: 0.05em 0;
    
    /* Active state - light blue background, dark teal text */
    ${e=>e.$isActive&&`
        background-color: ${e.theme.colors.background==="#ffffff"?"#e0f7fa":"#1a4d5c"};
        color: ${e.theme.colors.background==="#ffffff"?"#006064":"#a3e9ec"};
        border-color: ${e.theme.colors.background==="#ffffff"?"#006064":"#2d7a84"};
    `}
    
    /* Inactive state - gray background and text */
    ${e=>!e.$isActive&&!e.$isFinished&&`
        background-color: ${e.theme.colors.backgroundTertiary};
        color: ${e.theme.colors.textSecondary};
        border-color: ${e.theme.colors.border};
    `}
    
    /* Finished state - similar to inactive but with reduced opacity */
    ${e=>e.$isFinished&&`
        background-color: ${e.theme.colors.backgroundTertiary};
        color: ${e.theme.colors.textSecondary};
        border-color: ${e.theme.colors.border};
        opacity: 0.8;
    `}
    
    /* Low time warning - override colors and animate */
    ${e=>e.$isLowTime&&`
        color: ${e.theme.colors.error} !important;
        border-color: ${e.theme.colors.error} !important;
        font-weight: bold;
        animation: pulse 1s infinite;
    `}
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
`,fc=({time:e,size:t="large",isActive:n=!1,isFinished:r=!1,lowTimeThreshold:o=30,showTenths:i=!1,className:a})=>{const d=c=>{const h=Math.floor(c/3600),f=Math.floor(c%3600/60),g=Math.floor(c%60),$=Math.floor(c%1*10),y=n&&Math.floor(c)%2===0?" ":":";return h>0?`${h}${y}${f.toString().padStart(2,"0")}${y}${g.toString().padStart(2,"0")}`:c<o&&i?`${f}${y}${g.toString().padStart(2,"0")}.${$}`:`${f}${y}${g.toString().padStart(2,"0")}`},l=e<=o&&e>0,u=t==="large"?"48px":t==="medium"?"36px":"24px";return s.jsx(mc,{className:a,$isLowTime:l,$isActive:n,$isFinished:r,$size:u,children:d(e)})},ut=m(fc)`
    /* Additional GameClock-specific styles if needed */
`;m(Mo).attrs({size:"small"})`
    font-size: 12px;
`;m(Mo).attrs({size:"medium"})`
    font-size: 16px;
`;const gc=m.div`
  position: fixed;
  left: ${e=>e.$x}px;
  top: ${e=>e.$y}px;
  background-color: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.lg};
  min-width: 160px;
  z-index: 1000;
  padding: ${e=>e.theme.spacing[1]} 0;
`,yc=m.button`
  display: block;
  width: 100%;
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  text-align: left;
  background: none;
  border: none;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: background-color ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundSecondary};
  }
  
  &:active {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
`,xc=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Lo=Z(({playerName:e,position:t,onClose:n})=>{const r=Mr(),o=Ye(),i=p.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];p.useEffect(()=>{const l=c=>{i.current&&!i.current.contains(c.target)&&n()},u=c=>{c.key==="Escape"&&n()};return setTimeout(()=>{document.addEventListener("mousedown",l),document.addEventListener("keydown",u)},0),()=>{document.removeEventListener("mousedown",l),document.removeEventListener("keydown",u)}},[n]),p.useEffect(()=>{if(i.current){const l=i.current.getBoundingClientRect(),u=window.innerWidth,c=window.innerHeight;let h=t.x,f=t.y;l.right>u&&(h=u-l.width-10),l.bottom>c&&(f=c-l.height-10),(h!==t.x||f!==t.y)&&(i.current.style.left=`${h}px`,i.current.style.top=`${f}px`)}},[t]);const d=l=>{const u=l.replace("{player}",e);r.sendCommand(u),n()};return s.jsx(gc,{ref:i,$x:t.x,$y:t.y,children:a.map((l,u)=>"divider"in l&&l.divider?s.jsx(xc,{},u):"command"in l?s.jsx(yc,{onClick:()=>d(l.command),children:l.label},u):null)})});Lo.displayName="PlayerContextMenu";const bc=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,ht=({name:e,className:t,style:n})=>{const[r,o]=p.useState(null),i=a=>{a.preventDefault(),a.stopPropagation(),o({x:a.clientX,y:a.clientY})};return s.jsxs(s.Fragment,{children:[s.jsx(bc,{className:t,style:n,onClick:i,children:e}),r&&s.jsx(Lo,{playerName:e,position:r,onClose:()=>o(null)})]})};ht.displayName="PlayerName";const $c=m.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.$compact?"2px":e.theme.spacing[1]};
  padding: ${e=>e.$compact?"4px 8px":e.theme.spacing[2]};
  background-color: ${e=>e.$isActive?e.theme.colors.surface:e.theme.colors.backgroundTertiary};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  border: 2px solid transparent;
  transition: all ${e=>e.theme.transitions.fast};
  width: 100%;
  position: relative;
`,vc=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,wc=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,kc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Cc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  margin-left: 4px;
`;m.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${e=>e.$isWhite?"#ffffff":"#000000"};
  border: 1px solid ${e=>e.$isWhite?"#000000":"#ffffff"};
  box-shadow: ${e=>e.theme.shadows.sm};
`;const Ze=Z(({name:e,rating:t,time:n,isActive:r,isWhite:o,orientation:i="horizontal",hideClockInCard:a=!1,onlyInfo:d=!1,compact:l=!1})=>{const u=s.jsxs(s.Fragment,{children:[s.jsx(vc,{children:s.jsxs(wc,{children:[s.jsx(kc,{children:s.jsx(ht,{name:e})}),s.jsx(Cc,{children:t})]})}),!a&&!d&&s.jsx(ut,{time:n,isActive:r,showTenths:n<10,lowTimeThreshold:30,size:i==="horizontal"?"medium":"small"})]});return d?u:s.jsx($c,{$isActive:r,$orientation:i,$compact:l,children:u})});Ze.displayName="PlayerCard";const Sc=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,en=m.div`
  padding: ${e=>e.theme.spacing[2]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[3]};
`,tn=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,ue=m.button`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  font-size: 10px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.primaryHover};
  }
  
  &:active {
    transform: scale(0.9);
  }
`,Pc=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,or=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,jc=m.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,ir=m.span`
  flex: 1;
  padding: 2px ${e=>e.theme.spacing[1]};
  border-radius: ${e=>e.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color ${e=>e.theme.transitions.fast};
  background-color: ${e=>e.$isCurrentMove?e.theme.colors.primary:"transparent"};
  color: ${e=>e.$isCurrentMove?e.theme.colors.textInverse:e.theme.colors.text};
  
  &:hover {
    background-color: ${e=>e.$isCurrentMove?e.theme.colors.primaryHover:e.theme.colors.backgroundTertiary};
  }
`,Ht=Z(({moves:e,currentMoveIndex:t,onMoveClick:n,onNavigate:r,showHeader:o=!0,extraControls:i,className:a,disableAutoScroll:d=!1})=>{const l=p.useRef(null);p.useEffect(()=>{if(!d&&l.current&&t!==void 0){const c=l.current.querySelector(`[data-move-index="${t}"]`);c&&c.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const u=()=>{const c=[];for(let h=0;h<e.length;h+=2){const f=Math.floor(h/2)+1,g=e[h],$=e[h+1];c.push(s.jsxs(or,{children:[s.jsxs(jc,{children:[f,"."]}),s.jsx(ir,{$isCurrentMove:t===h,onClick:()=>n?.(h),"data-move-index":h,children:sn(g.san)}),$&&s.jsx(ir,{$isCurrentMove:t===h+1,onClick:()=>n?.(h+1),"data-move-index":h+1,children:sn($.san)})]},h))}return c};return s.jsxs(Sc,{className:a,children:[o?s.jsx(en,{children:s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("span",{children:"Moves"}),s.jsxs(tn,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})]})})}):i?s.jsxs(en,{children:[i,s.jsxs(tn,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})]}):s.jsx(en,{children:s.jsxs(tn,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})}),s.jsx(Pc,{ref:l,children:e.length===0?s.jsx(or,{children:s.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):u()})]})});Ht.displayName="MoveList";const Rc=m(ut)`
    height: 100%;
    flex-shrink: 0;

    > div {
        height: 100%;
        display: flex;
        align-items: center;
    }

    span {
        display: flex;
        align-items: center;
        height: 100%;
        padding-top: 0;
        padding-bottom: 0;
    }
`,Ec=m(ut)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,et=Z(({player:e,isActive:t,size:n="small",compact:r=!0,variant:o="portrait"})=>{const i=Lt(),a=o==="landscape"?Ec:Rc;return s.jsx(a,{time:e.time,isActive:t,isFinished:i.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:n,compact:r})});et.displayName="ObservableClock";const Mc=m.div`
  position: relative;
  display: inline-block;
`,Lc=m.button`
  width: ${e=>e.$size==="small"?"36px":"44px"};
  height: ${e=>e.$size==="small"?"36px":"44px"};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${e=>e.theme.transitions.fast};
  padding: 4px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.primaryHover};
  }
  
  &:active {
    transform: scale(0.95);
  }
`,Tc=m.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: ${e=>e.theme.spacing[1]};
  background-color: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing[1]};
  box-shadow: ${e=>e.theme.shadows.lg};
  gap: ${e=>e.theme.spacing[1]};
  z-index: 100;
`,zc=m.button`
  width: ${e=>e.$size==="small"?"32px":"40px"};
  height: ${e=>e.$size==="small"?"32px":"40px"};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.primaryHover};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`,zn=Z(({color:e,size:t="small"})=>{const n=Ye(),[r,o]=p.useState(!1),i=p.useRef(null),a=["Q","R","B","N"],d=n.preferences.autoPromotionPiece,l=h=>e==="white"?h:h.toLowerCase();p.useEffect(()=>{const h=f=>{i.current&&!i.current.contains(f.target)&&o(!1)};if(r)return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[r]);const u=h=>{n.updatePreference("autoPromotionPiece",h),o(!1)},c=t==="small"?28:36;return s.jsxs(Mc,{ref:i,children:[s.jsx(Lc,{$size:t,onClick:()=>o(!r),title:"Select promotion piece",children:s.jsx(Me,{piece:l(d),size:c})}),s.jsx(Tc,{$isOpen:r,children:a.map(h=>s.jsx(zc,{$size:t,onClick:()=>u(h),title:`Promote to ${h==="Q"?"Queen":h==="R"?"Rook":h==="B"?"Bishop":"Knight"}`,children:s.jsx(Me,{piece:l(h),size:c})},h))})]})});zn.displayName="PromotionPieceSelector";const Ic=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,ce=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[1]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  ${e=>{switch(e.$variant){case"danger":return`
          background-color: ${e.theme.colors.error};
          color: ${e.theme.colors.textInverse};
          &:hover {
            background-color: ${e.theme.colors.error}dd;
          }
        `;case"primary":return`
          background-color: ${e.theme.colors.secondary};
          color: ${e.theme.colors.textInverse};
          &:hover {
            background-color: ${e.theme.colors.secondaryHover};
          }
        `;default:return`
          background-color: ${e.theme.colors.primary};
          color: ${e.theme.colors.textInverse};
          &:hover {
            background-color: ${e.theme.colors.primaryHover};
          }
        `}}}
  
  &:active {
    transform: scale(0.95);
  }
`,To=Z(({perspective:e,onDraw:t,onResign:n,onAbort:r,onAnalysis:o,onUnobserve:i,onUnexamine:a,onSetupFEN:d,onFlipBoard:l,isAnalysisActive:u,isDrawOffered:c,canAbort:h,className:f})=>{const g=Lt(),$=()=>s.jsxs(s.Fragment,{children:[h&&s.jsx(ce,{onClick:r,$variant:"secondary",children:"Abort"}),s.jsx(ce,{onClick:t,$variant:"secondary",children:"Draw"}),g.currentGame&&g.currentGame.moveNumber>=2&&s.jsx(ce,{onClick:n,$variant:"secondary",children:"Resign"}),s.jsx(ce,{onClick:l,$variant:"secondary",children:"Flip"}),s.jsx(zn,{color:g.playingColor||"white",size:"medium"})]}),y=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:i,$variant:"secondary",children:"Unobserve"}),s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:l,$variant:"secondary",children:"Flip"})]}),k=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:a,$variant:"secondary",children:"Unexamine"}),s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:l,$variant:"secondary",children:"Flip"})]}),x=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:l,$variant:"secondary",children:"Flip"}),s.jsx(ce,{onClick:d,$variant:"secondary",children:"FEN"})]});return s.jsxs(Ic,{className:f,children:[e==="playing"&&$(),e==="observing"&&y(),e==="examining"&&k(),e==="freestyle"&&x()]})}),me=m(ce)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;To.displayName="GameControls";const sr=m.div`
  position: relative;
  background-color: #f5f5f5;
  border: 1px solid #444;
  border-radius: ${e=>e.theme.borderRadius.container};
  overflow: hidden;
  box-shadow: ${e=>e.theme.shadows.container};
  ${e=>e.$orientation==="vertical"?`
    width: 18px;
    height: 100%;
  `:`
    width: 100%;
    height: 18px;
  `}
`,ar=m.div`
  position: absolute;
  font-weight: ${e=>e.theme.typography.fontWeight.normal};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.textTertiary};
  z-index: 2;
  ${e=>e.$orientation==="vertical"?`
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  `:`
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
  `}
`,Ac=m.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: ${e=>e.theme.typography.fontSize.xs};
  font-weight: ${e=>e.theme.typography.fontWeight.normal};
  color: ${e=>e.$isLight?e.theme.colors.textTertiary:e.theme.colors.background};
  z-index: 3;
  text-shadow: ${e=>e.$isLight?"0 1px 2px rgba(0,0,0,0.3)":"0 1px 2px rgba(255,255,255,0.3)"};
`,cr=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,gt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,lr=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,zo=Z(({evaluation:e,percent:t,orientation:n="vertical",className:r})=>{const i=Tt().isBottomPlayerWinning;let a,d,l;if(t===50)a=47,d=6,l=47;else if(t>50){const c=t-50;a=50-c,d=c,l=50}else{const c=50-t;a=50,d=c,l=50-c}const u=t===50?"#FFC107":i?"#2E7D32":"#C62828";if(n==="vertical"){const c=t<80;return s.jsxs(sr,{$orientation:n,className:r,children:[s.jsx(ar,{$orientation:n,children:e}),s.jsx(Ac,{$isLight:c,children:e}),s.jsxs(cr,{$orientation:n,children:[s.jsx(gt,{style:{height:`${a}%`}}),s.jsx(lr,{$color:u,style:{height:`${d}%`}}),s.jsx(gt,{style:{height:`${l}%`}})]})]})}else return s.jsxs(sr,{$orientation:n,className:r,children:[s.jsx(ar,{$orientation:n,children:e}),s.jsxs(cr,{$orientation:n,children:[s.jsx(gt,{style:{width:`${l}%`}}),s.jsx(lr,{$color:u,style:{width:`${d}%`}}),s.jsx(gt,{style:{width:`${a}%`}})]})]})});zo.displayName="EvaluationBar";const Nc=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,Dc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  width: 100%;
  
  .depth {
    color: ${e=>e.theme.colors.textTertiary};
    font-size: ${e=>e.theme.typography.fontSize.xs};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .line {
    font-family: ${e=>e.theme.typography.fontFamilyMono};
    color: ${e=>e.theme.colors.textTertiary};
    font-size: ${e=>e.theme.typography.fontSize.xs};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,bn=Z(({orientation:e="vertical",boardSize:t})=>{const n=Tt();return s.jsx(Nc,{$orientation:e,$boardSize:t,children:s.jsx(zo,{evaluation:n.evaluation,percent:n.evaluationPercent,orientation:e})})}),$n=Z(({className:e})=>{const t=Tt();return s.jsxs(Dc,{className:e,children:[s.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),s.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});bn.displayName="AnalysisDisplay";$n.displayName="AnalysisInfoDisplay";const Oc=m.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`,Fc=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Bc=m.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Io=m.input`
  width: 100%;
  padding: ${e=>e.theme.spacing[3]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[2]};
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,Wc=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Hc=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,_c=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,dr=m.button`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[4]};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${e=>e.$variant==="primary"?`
    background-color: ${e.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${e.theme.colors.primaryHover};
    }
  `:`
    background-color: transparent;
    color: ${e.theme.colors.textSecondary};
    border: 1px solid ${e.theme.colors.border};
    
    &:hover {
      background-color: ${e.theme.colors.surface};
    }
  `}
`,Gc=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  margin-right: ${e=>e.theme.spacing[2]};
  margin-bottom: ${e=>e.theme.spacing[2]};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  background-color: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${e=>e.theme.colors.primaryHover};
  }
`,ur=m.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,hr=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Uc=m(Io)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Ao=Z(({isOpen:e,onClose:t})=>{const{gameStore:n}=Le(),[r,o]=p.useState(""),[i,a]=p.useState(""),d=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",l=p.useCallback(g=>{o(g.target.value),a("")},[]),u=p.useCallback(()=>{try{n.loadPosition(r.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[r,n,t]),c=p.useCallback(g=>{const $=typeof g=="function"?g():g;o($),a("");try{n.loadPosition($)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[n,t]),h=p.useCallback(g=>{g.key==="Enter"&&r.trim()?u():g.key==="Escape"&&t()},[r,u,t]),f=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>Uo.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?s.jsx(Oc,{$isOpen:e,onClick:t,children:s.jsxs(Fc,{onClick:g=>g.stopPropagation(),children:[s.jsx(Bc,{children:"Set Position from FEN"}),s.jsx(Hc,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),s.jsxs(ur,{children:[s.jsx(hr,{children:"Current position:"}),s.jsx(Uc,{type:"text",value:d,readOnly:!0,onClick:g=>g.currentTarget.select()})]}),s.jsxs(ur,{children:[s.jsx(hr,{children:"Preset position:"}),f.map(g=>s.jsx(Gc,{onClick:()=>c(g.fen),children:g.name},g.name))]}),s.jsx(Io,{type:"text",value:r,onChange:l,onKeyDown:h,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),i&&s.jsx(Wc,{children:i}),s.jsxs(_c,{children:[s.jsx(dr,{onClick:t,children:"Cancel"}),s.jsx(dr,{$variant:"primary",onClick:u,disabled:!r.trim(),children:"Set Position"})]})]})}):null});Ao.displayName="FENDialog";const qc=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Yc=m.div`
  display: ${e=>e.$orientation==="horizontal"?"grid":"flex"};
  ${e=>e.$orientation==="horizontal"?`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
  `:`
    flex-direction: column;
    gap: 0;
  `}
  align-items: center;
`,Vc=m.div`
  position: relative;
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${e=>e.theme.colors.board.hoverLight}20;
    border-radius: 4px;
  }
`,Kc=m.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 50%;
  width: 14px;
  height: 14px;
  font-size: 9px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`,Xc=m(Me)`
  width: 100%;
  height: 100%;
`,tt=Z(({orientation:e="horizontal",isWhitePieces:t=!0,className:n,boardSize:r,onPieceClick:o})=>{const{gameStore:i}=Le(),a=i.capturedPieces,d=t?a.white:a.black,l=p.useMemo(()=>{const h={};return d.forEach(f=>{h[f]=(h[f]||0)+1}),h},[d]),u=["p","n","b","r","q"],c=r?r/8:32;return s.jsx(qc,{$orientation:e,$size:c,className:n,children:s.jsx(Yc,{$orientation:e,children:u.map(h=>{const f=l[h]||0,g=t?h.toUpperCase():h;return s.jsx(Vc,{$size:c,onClick:f>0&&o?()=>o(g):void 0,style:{cursor:f>0&&o?"pointer":"default"},children:f>0&&s.jsxs(s.Fragment,{children:[s.jsx(Xc,{piece:g,size:c}),f>1&&s.jsx(Kc,{children:f})]})},h)})})})});tt.displayName="CapturedPieces";const Jc=m.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,Qc=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Zc=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,el=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,tl=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,pr=m.button`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[4]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  ${e=>e.$variant==="primary"?`
    background-color: ${e.theme.colors.error};
    color: ${e.theme.colors.textInverse};
    &:hover {
      background-color: ${e.theme.colors.error}dd;
    }
  `:`
    background-color: ${e.theme.colors.primary};
    color: ${e.theme.colors.textInverse};
    &:hover {
      background-color: ${e.theme.colors.primaryHover};
    }
  `}
`,nl=({isOpen:e,title:t,message:n,confirmText:r="Confirm",cancelText:o="Cancel",onConfirm:i,onCancel:a})=>s.jsx(Jc,{$isOpen:e,onClick:a,children:s.jsxs(Qc,{onClick:d=>d.stopPropagation(),children:[s.jsx(Zc,{children:t}),s.jsx(el,{children:n}),s.jsxs(tl,{children:[s.jsx(pr,{$variant:"secondary",onClick:a,children:o}),s.jsx(pr,{$variant:"primary",onClick:i,children:r})]})]})}),rl=m.div`
    width: 100%;
    height: 100%;
    display: ${e=>e.$orientation==="landscape"?"grid":"flex"};
    ${e=>e.$orientation==="landscape"?`
    grid-template-columns: ${e.$hasChat?"minmax(0, 1fr) auto":"1fr auto"};
  `:`
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  `}
    gap: ${e=>e.$orientation==="landscape"?e.theme.spacing[3]:e.theme.spacing[1]};
    padding: ${e=>e.theme.spacing[1]};
`,mr=m.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${e=>e.theme.spacing[2]};
    flex: ${e=>e.$orientation==="portrait"?"0 0 auto":"1"};
    width: 100%;
    height: ${e=>e.$orientation==="portrait"?"auto":"100%"};
    justify-content: ${e=>e.$orientation==="portrait"?"flex-start":"center"};
    ${e=>e.$orientation==="portrait"&&`
    padding-top: ${e.theme.spacing[1]};
  `}
    overflow: ${e=>e.$orientation==="portrait"?"visible":"hidden"};
    min-width: 0;
    /* Reserve minimum height for analysis info to prevent jumps */

    & > *:last-child {
        min-height: 28px;
    }
`;m.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    white-space: nowrap;
`;const ol=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: center;
`,fr=m.div`
    width: ${e=>e.$size}px;
    height: ${e=>e.$size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`,il=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,sl=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,al=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,No=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Do=m.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,cl=m(No)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,ll=m(Do)`
    margin-top: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,dl=m(No)`
    margin-bottom: ${e=>e.theme.spacing[2]};
    padding: 0 30px;
    position: relative;
`,ul=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 10;
`,hl=m(Do)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,gr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,yr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,xr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,br=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,$r=m.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${e=>e.$orientation==="portrait"?`
    width: min(100vw - 32px, calc(100vh - 280px));
    height: min(100vw - 32px, calc(100vh - 280px));
    max-width: 600px;
    max-height: 600px;
  `:`
    width: min(calc(100vh - 120px), calc(100vw - 400px));
    height: min(calc(100vh - 120px), calc(100vw - 400px));
    max-width: 100%;
    max-height: 100%;
  `}
`,pl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,ml=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,fl=m.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;m.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    z-index: 1;
    box-shadow: ${e=>e.theme.shadows.sm};
`;m.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    display: flex;
    gap: ${e=>e.theme.spacing[4]};
    align-items: center;
    white-space: nowrap;
`;const gl=m.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    flex: ${e=>(e.$orientation==="landscape","0 0 auto")};
    min-width: ${e=>e.$orientation==="landscape"?"280px":"auto"};
    max-width: ${e=>e.$orientation==="landscape"?"320px":"none"};
    overflow: ${e=>e.$orientation==="portrait"?"visible":"hidden"};
    ${e=>e.$orientation==="portrait"&&`
    width: 100%;
    max-width: min(100vw - 32px, 600px);
    margin: 0 auto;
    padding-bottom: ${e.theme.spacing[3]};
  `}
`;m.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: ${e=>e.theme.spacing[3]};
`;const yl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[3]};
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: ${e=>e.theme.spacing[2]};
    width: 100%;
    position: relative;
`;m.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`;m.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[3]};
    align-items: flex-start;
`;m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;const xl=m.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`,bl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: ${e=>e.theme.colors.surface};
    border-radius: ${e=>e.theme.borderRadius.container};
    box-shadow: ${e=>e.theme.shadows.container};
    padding: 0 ${e=>e.theme.spacing[1]};
    width: 180px;
    
    /* Remove all borders, shadows and backgrounds from child components */
    & > * {
        box-shadow: none !important;
        background-color: transparent !important;
        border: none !important;
        border-radius: 0 !important;
    }
    
    /* Add specific margins only where needed */
    & > div:nth-child(2) {
        /* GameControls - override its padding */
        padding: ${e=>e.theme.spacing[1]} !important;
        margin-bottom: ${e=>e.theme.spacing[1]};
    }
    
    & > div:nth-child(3) {
        margin-bottom: ${e=>e.theme.spacing[1]};
    }
    
    /* Specifically target nested components */
    div[class*="CardContainer"],
    div[class*="MoveListContainer"],
    div[class*="PlayerCard"] {
        box-shadow: none !important;
        background-color: transparent !important;
        margin-bottom: 0;
    }
    
    /* Remove top padding from MoveList header (nav buttons) */
    div[class*="MoveListHeader"] {
        padding-top: 0 !important;
    }
`;m.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[1]};
    align-items: flex-start;
    width: 100%;
`;const vr=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;m(Ht)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const $l=m(Ht)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;m(ut)`
    height: 100%;
    flex-shrink: 0;

    > div {
        height: 100%;
        display: flex;
        align-items: center;
    }

    span {
        display: flex;
        align-items: center;
        height: 100%;
        padding-top: 0;
        padding-bottom: 0;
    }
`;const wr=m.div`
    flex: 1;
    display: flex;
`;m(ut)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    justify-content: center;
    width: 100%;
`;const vl=m.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    width: 100%;
    padding: 0 11px;
`;m.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    padding: ${e=>e.theme.spacing[2]};
    align-items: center;
`;m.div`
    min-height: 28px;
`;const wl=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,kl=m.div`
    display: flex;
    align-items: flex-start;
    padding-top: ${e=>{const t=e.$squareSize||0,n=24,r=40,o=(e.$squareSize||0)*.25;return t+n+r+8-o}}px;
`,Oo=Z(({className:e,hasChat:t=!1})=>{const n=Lt(),r=Ye(),o=Tt(),i=Mr(),a=qo();Wt();const[d,l]=p.useState(!1),[u,c]=p.useState(!1),[h,f]=p.useState(0),[g,$]=p.useState(!1),[y,k]=p.useState(!1),[x,j]=p.useState(null),R=r.preferences.chessOrientation==="landscape",P=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",M=p.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),D=p.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:r.preferences.showCapturedPieces,[n.currentGame?.variant,r.preferences.showCapturedPieces]),A=p.useCallback((F,J,Y)=>{try{n.makeMove(F,J,Y)||(console.error("Invalid move:",F,J),a.playIllegal())}catch(oe){console.error("Error making move:",oe),a.playIllegal()}},[n,a]),_=p.useCallback((F,J)=>{try{const Y=F.toLowerCase();n.makeSANMove(`${F.toUpperCase()}@${J}`)||(console.error("Invalid drop:",F,J),a.playIllegal())}catch(Y){console.error("Error making drop:",Y),a.playIllegal()}},[n,a]),H=p.useCallback(F=>{j(x===F?null:F)},[x]);p.useMemo(()=>{if(n.currentGameInfo){const{white:F,black:J,timeControl:Y,variant:oe}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${oe} ${Y}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const b=(()=>{const F=n.moveHistory.length;if(F>0){const J=n.moveHistory[F-1],Y=Math.ceil(F/2),oe=F%2===1,ie=sn(J.san);return`${Y}.${oe?"":".."} ${ie}`}return"Starting position"})(),v=n.currentOpening,w=n.currentGame,S=w||n.lastGameState,I=S?.white||{name:"White",rating:1500,time:900},B=S?.black||{name:"Black",rating:1500,time:900},U=!w||w.turn==="w",K=n.shouldShowFlippedBoard,le=K?I:B,q=K?B:I,se=K,ee=K?U:!U,ae=p.useCallback(F=>{n.goToMove(F)},[n]);p.useEffect(()=>{o.initialize()},[o]),p.useEffect(()=>{y&&n.isPlaying&&n.currentGame&&i.sendCommand("draw")},[n.moveHistory.length,y,n.isPlaying,i]),p.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&k(!1)},[n.currentGame,n.isPlaying]),p.useEffect(()=>{d&&o.isEngineReady?o.startAnalysis(P):o.stopAnalysis()},[d,P,o]);const be=p.useCallback(()=>{l(F=>!F)},[]),Se=p.useCallback(()=>{c(!0)},[]),$e=p.useCallback(()=>{r.updatePreference("boardFlipped",!r.preferences.boardFlipped)},[r]),C=p.useCallback(()=>{n.currentGame&&i.sendCommand(`unobs ${n.currentGame.gameId}`)},[i,n.currentGame]),N=p.useCallback(()=>{i.sendCommand("unexamine")},[i]),z=p.useCallback(()=>{$(!0)},[]),L=p.useCallback(()=>{i.sendCommand("resign"),$(!1)},[i]),T=p.useCallback(()=>{i.sendCommand("draw"),k(!y)},[i,y]),E=p.useCallback(()=>{i.sendCommand("abort")},[i]),W=()=>s.jsxs(s.Fragment,{children:[s.jsx(mr,{$orientation:"portrait",children:s.jsx(pl,{children:s.jsxs(ml,{children:[d&&s.jsx(kl,{$squareSize:h?h/8:0,children:s.jsx(bn,{orientation:"vertical",boardSize:h})}),s.jsxs(fl,{children:[s.jsx(fr,{$size:h?h/8:0}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[s.jsxs(dl,{children:[s.jsxs(gr,{children:["Game #",S?.gameId||"?"]}),s.jsx(yr,{children:S?.timeControl||"?"}),s.jsxs(ul,{children:[M==="playing"&&s.jsxs(s.Fragment,{children:[n.moveHistory.length<=1&&s.jsx(me,{onClick:E,$variant:"secondary",children:"Abort"}),s.jsx(me,{onClick:T,$variant:"secondary",children:"Draw"}),s.jsx(me,{onClick:z,$variant:"secondary",children:"Resign"}),s.jsx(zn,{color:n.playingColor||"white",size:"small"})]}),M==="observing"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:C,$variant:"secondary",children:"Unobserve"}),s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"})]}),M==="examining"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:N,$variant:"secondary",children:"Unexamine"}),s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"})]}),M==="freestyle"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"}),s.jsx(me,{onClick:$e,$variant:"secondary",children:"Flip"}),s.jsx(me,{onClick:Se,$variant:"secondary",children:"FEN"})]})]})]}),s.jsxs(vr,{children:[s.jsx(et,{player:le,isActive:ee,size:"small",compact:!0}),s.jsx(wr,{children:s.jsx(Ze,{name:le.name,rating:le.rating,time:0,isActive:ee,isWhite:se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsx($r,{$orientation:"portrait",children:s.jsx(xn,{position:P,flipped:K,showCoordinates:!0,onMove:A,onDrop:_,interactive:M==="playing"||M==="freestyle"||M==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:x,onCapturedPieceSelect:j})}),s.jsxs(vr,{children:[s.jsx(et,{player:q,isActive:!ee,size:"small",compact:!0}),s.jsx(wr,{children:s.jsx(Ze,{name:q.name,rating:q.rating,time:0,isActive:!ee,isWhite:!se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsxs(hl,{children:[s.jsx(xr,{children:n.premove?`Premove: ${An(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,P)}`:b!=="Starting position"?`Last move: ${b}`:"Last move: none"}),v&&s.jsx(br,{children:v})]}),d&&s.jsx(wl,{children:s.jsx($n,{})})]}),s.jsx(fr,{$size:h?h/8:0})]}),D&&s.jsx(sl,{$squareSize:h?h/8:0,children:s.jsxs(al,{$squareSize:h?h/8:0,children:[s.jsx(tt,{orientation:"vertical",isWhitePieces:K,boardSize:h,onPieceClick:H}),s.jsx(tt,{orientation:"vertical",isWhitePieces:!K,boardSize:h,onPieceClick:H})]})})]})})}),s.jsx(gl,{$orientation:"portrait",children:s.jsx(Ht,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:ae,disableAutoScroll:!0,onNavigate:F=>{if(n.isExamining)switch(F){case"first":i.sendCommand("back 500");break;case"prev":i.sendCommand("back");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 500");break}else switch(F){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return s.jsxs(rl,{className:e,$orientation:R?"landscape":"portrait",$hasChat:t,children:[R?s.jsx(s.Fragment,{children:s.jsx(mr,{$orientation:"landscape",children:s.jsxs(yl,{$hasAnalysis:d,children:[s.jsxs(ol,{children:[s.jsxs(cl,{children:[s.jsxs(gr,{children:["Game #",S?.gameId||"?"]}),s.jsx(yr,{children:S?.timeControl||"?"})]}),s.jsxs(il,{children:[d&&s.jsx(bn,{orientation:"vertical"}),s.jsx($r,{$orientation:"landscape",children:s.jsx(xn,{position:P,flipped:K,showCoordinates:!0,onMove:A,onDrop:_,interactive:M==="playing"||M==="freestyle"||M==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:x,onCapturedPieceSelect:j})})]}),s.jsxs(ll,{children:[s.jsx(xr,{children:n.premove?`Premove: ${An(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,P)}`:b!=="Starting position"?`Last move: ${b}`:"Last move: none"}),v&&s.jsx(br,{children:v})]}),d&&s.jsx(vl,{children:s.jsx($n,{})})]}),s.jsxs(xl,{children:[D&&s.jsx(tt,{orientation:"horizontal",isWhitePieces:se,boardSize:h,onPieceClick:H}),s.jsx(et,{player:le,isActive:ee,size:"small",compact:!0,variant:"landscape"}),s.jsxs(bl,{children:[s.jsx(Ze,{name:le.name,rating:le.rating,time:0,isActive:ee,isWhite:se,orientation:"vertical",hideClockInCard:!0,compact:!0}),s.jsx(To,{perspective:M,canAbort:n.moveHistory.length<=1,onAnalysis:be,onFlipBoard:$e,onSetupFEN:Se,onUnobserve:C,onUnexamine:N,onResign:z,onDraw:T,onAbort:E,isAnalysisActive:d,isDrawOffered:y}),s.jsx($l,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:ae,showHeader:!1,onNavigate:F=>{if(n.isExamining)switch(F){case"first":i.sendCommand("backward 999");break;case"prev":i.sendCommand("backward");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 999");break}else switch(F){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),s.jsx(Ze,{name:q.name,rating:q.rating,time:0,isActive:!ee,isWhite:!se,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),s.jsx(et,{player:q,isActive:!ee,size:"small",compact:!0,variant:"landscape"}),D&&s.jsx(tt,{orientation:"horizontal",isWhitePieces:!se,boardSize:h,onPieceClick:H})]})]})})}):W(),s.jsx(Ao,{isOpen:u,onClose:()=>c(!1)}),s.jsx(nl,{isOpen:g,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:L,onCancel:()=>$(!1)})]})});Oo.displayName="ChessGameLayout";const Cl=m.div`
  display: flex;
  background-color: ${e=>e.theme.colors.surface};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  overflow-x: auto;
  min-height: 32px;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: thin;
  scrollbar-color: ${e=>e.theme.colors.border} transparent;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${e=>e.theme.colors.border};
    border-radius: 2px;
  }
`,Sl=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  margin-right: ${e=>e.theme.spacing[2]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.lg} ${e=>e.theme.borderRadius.lg} 0 0;
  background-color: ${e=>e.$active?e.theme.colors.background:"transparent"};
  color: ${e=>e.$active?e.theme.colors.text:e.theme.colors.textSecondary};
  cursor: ${e=>e.$dragging?"grabbing":"pointer"};
  white-space: nowrap;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  transition: all ${e=>e.theme.transitions.fast};
  position: relative;
  min-width: 60px;
  opacity: ${e=>e.$dragging?.5:1};
  user-select: none;
  
  ${e=>e.$dragOver&&!e.$dragging&&`
    border-left: 2px solid ${e.theme.colors.primary};
  `}
  
  &:hover {
    background-color: ${e=>e.$active?e.theme.colors.background:e.theme.colors.backgroundTertiary};
    color: ${e=>e.theme.colors.text};
  }
  
  ${e=>e.$active&&`
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${e.theme.colors.primary};
    }
  `}
`,Pl=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,jl=m.span`
  background-color: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  padding: 0 4px;
  border-radius: 8px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`,Rl=m.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin-left: ${e=>e.theme.spacing[1]};
  border: none;
  background: transparent;
  color: ${e=>e.theme.colors.textTertiary};
  cursor: pointer;
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: 12px;
  line-height: 1;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.border};
    color: ${e=>e.theme.colors.text};
  }
`,El=m.span`
  font-size: 12px;
  opacity: 0.7;
`,Fo=Z(()=>{const{chatStore:e}=Le(),t=e.sortedTabs,[n,r]=re.useState(null),[o,i]=re.useState(null),a=(h,f)=>{r(f),h.dataTransfer.effectAllowed="move"},d=(h,f)=>{h.preventDefault(),h.dataTransfer.dropEffect="move",i(f)},l=()=>{i(null)},u=(h,f)=>{h.preventDefault(),n&&n!==f&&e.reorderTabs(n,f),r(null),i(null)},c=()=>{r(null),i(null)};return s.jsx(Cl,{children:t.map(h=>s.jsxs(Sl,{$active:h.id===e.activeTabId,$hasUnread:h.unreadCount>0,$dragging:h.id===n,$dragOver:h.id===o,draggable:!0,onDragStart:f=>a(f,h.id),onDragOver:f=>d(f,h.id),onDragLeave:l,onDrop:f=>u(f,h.id),onDragEnd:c,onClick:()=>e.setActiveTab(h.id),children:[h.type!=="console"&&s.jsx(El,{$type:h.type}),s.jsx(Pl,{children:h.type==="channel"?`(${h.name})`:h.name}),h.unreadCount>0&&s.jsx(jl,{children:h.unreadCount>99?"99+":h.unreadCount}),h.id!=="console"&&s.jsx(Rl,{onClick:f=>{f.stopPropagation(),e.closeTab(h.id)},title:"Close tab",children:"×"})]},h.id))})});Fo.displayName="ChatTabs";function Ml(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function Ll(e){e.scrollTop=e.scrollHeight}function Tl(e,t=10){Ml(e,t)&&Ll(e)}const kr=m.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
  
  &:visited {
    color: inherit;
  }
`,zl=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Il=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Al=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Nl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Dl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Ol=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,je=/(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,Cr=/["']([^"']+)["']/g,Sr=/\[(\w+)\]/g,Pr=new Set(["abort","accept","addlist","adjourn","alias","allobservers","assess","clear","set","backward","bell","best","boards","bsetup","bugwho","cbest","clearmessages","convert_bcf","convert_elo","convert_uscf","copygame","crank","cshout","date","decline","draw","examine","finger","flag","flip","fmessage","follow","forward","games","getgame","gnotify","goboard","handles","hbest","help","history","hrank","inchannel","index","info","it","jkill","jsave","kibitz","limits","llogons","logons","mailhelp","mailmess","mailmoves","mailoldmoves","mailsource","mailstored","match","messages","mexamine","moretime","moves","news","next","observe","oldmoves","open","password","pause","pending","pfollow","play","pobserve","promote","pstat","qtell","quit","rank","refresh","resign","resume","revert","say","seek","servers","set","shout","showadmins","showlist","simabort","simallabort","simadjourn","simalladjourn","simgames","simmatch","simnext","simobserve","simopen","simpass","simprev","smoves","smposition","sought","sposition","statistics","stored","style","sublist","switch","takeback","tell","time","unalias","unexamine","unobserve","unpause","unseek","uptime","variables","whisper","who","withdraw","xkibitz","xtell","xwhisper","znotify"]),Fl=/^(\w+(?:\([A-Z]\))?) \((?:\+{4}|-{4}|\+*\d+)\) seeking/;let nn=null,rn=null;const nt=({text:e,className:t,onCommandClick:n})=>{const r=[];if(!!!n){je.lastIndex=0;let b;for(;(b=je.exec(e))!==null;)r.push({type:"url",match:b[0],content:b[0],index:b.index,length:b[0].length});const v=[];let w=0;return r.forEach((S,I)=>{S.index>w&&v.push(e.substring(w,S.index));let B=S.content;S.content.match(/^(?:https?|ftp):\/\//)||S.content.includes(".")&&(B="https://"+S.content),v.push(s.jsx(kr,{href:B,target:"_blank",rel:"noopener noreferrer",onClick:U=>U.stopPropagation(),children:S.content},`url-${I}`)),w=S.index+S.length}),w<e.length&&v.push(e.substring(w)),s.jsx("span",{className:t,children:v.length>0?v:e})}const i=e.includes("players displayed")||/^\s*(?:\d{3,4}|----|\+{4})/.test(e)&&!e.match(/^\d{4}\s+\(/)&&!e.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/),a=/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+(?:\([A-Z]\))?\s+\d+\s+\d+\s+(?:unrated|rated)/.test(e)&&!e.includes("games displayed")&&!e.includes(" - "),d=e.includes("games displayed")||/^\s*\d{1,3}\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.test(e)&&e.includes(" - ")&&e.includes("(")&&!a,l=/^\s*Channel\s+\d+(?:\s+"[^"]+")?\s*:/.test(e)||/^\s*\\\s+\w+/.test(e),u=/\w+\s+\(\d+\)\s+vs\.\s+\w+\s+\(\d+\)/.test(e),c=/^Game \d+:/.test(e),h=/^\:\[\d{2}:\d{2}:\d{2}\]/.test(e),f=/^(?:Present company includes:|Your arrival was noted by:)/.test(e),g=/^\s*--\s+\w+\s+list:/.test(e),$=/^\s*\d+:\s*\w+(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.test(e),y=/^\s*Finger of\s+\w+/.test(e),k=/^\s*\d+:\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+\w+/.test(e)||/History for \w+:/.test(e),x=/^\s*%\d+:\s+\w+/.test(e)||/Journal for \w+:/.test(e),j=/\w+\s+\((?:\d+|\+{4})\)\s+seeking.*\("play\s+(\d+)"\s+to\s+respond\)/.test(e),R=/^\s*\d+\.\s+\w+\s+\d{4}/.test(e)||/^\s+\w+\s+\d{4}\s+\d+\.\s+\w+\s+\d{4}/.test(e),P=/^\d{4}\s+\(\w{3},\s+\w{3}\s+\d+\)/.test(e)||e.includes("Index of new news items:")||e.includes("Index of the last few news items:"),M=/^Notification:\s+\w+\s+has\s+(?:arrived|departed)/.test(e),D=/^\(told \d+ players? in channel \d+/.test(e)||/^\(told \w+\)/.test(e),A=e.length>10&&!e.match(/^\s/)&&!e.match(/^Channel\s+\d+/)&&!e.match(/^[A-Z]/)&&!e.match(/^\w+\s+\(\d+\)/)&&!e.match(/^Game\s+\d+/)&&!e.includes("displayed")&&!e.match(/^--/)&&!e.match(/^\d{4}\s+\(\w{3},/)&&!e.match(/^\d+\s+\(/)&&!e.match(/^\d+:\s+[+-=]/)&&!e.match(/^%\d+:/)&&e.split(/\s+/).length>3;if(j){const b=/\w+\s+\((?:\d+|\+{4})\)\s+seeking.*?\("play\s+(\d+)"\s+to\s+respond\)/g;let v;for(;(v=b.exec(e))!==null;){const w=v[1];r.push({type:"command",match:v[0],content:`play ${w}`,index:v.index,length:v[0].length,isSeekLine:!0})}}else if((D||A)&&!P){je.lastIndex=0;let b;for(;(b=je.exec(e))!==null;)r.push({type:"url",match:b[0],content:b[0],index:b.index,length:b[0].length})}else if(i&&!d){const b=/(?:^|\s)((?:\d{3,4}|----|\+{4})\s*)([.^:#&]?)([A-Za-z]\w*)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g;let v;for(;(v=b.exec(e))!==null;){const[w,S,I,B]=v,U=v.index+v[0].indexOf(B);r.push({type:"player",match:B,content:B,index:U,length:B.length})}}else if(d){const v=/^\s*(\d{1,3})\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.exec(e);if(v){const w=v[1];r.push({type:"command",match:e,content:`observe ${w}`,index:0,length:e.length,isGamesLine:!0})}}else if(l)if(e.trim().startsWith("\\")){const b=e.substring(e.indexOf("\\")+1),v=/\{?(\w+)(?:\([A-Z*]+\))?\}?/g;let w;for(;(w=v.exec(b))!==null;){const S=w[1];if(!S||S.trim()==="")continue;const B=w[0].indexOf(S),U=e.indexOf("\\")+1+w.index+B;r.push({type:"player",match:S,content:S,index:U,length:S.length})}}else{const b=e.indexOf(":");if(b!==-1){const v=e.substring(b+1),w=/\{?(\w+)(?:\([A-Z*]+\))?\}?/g;let S;for(;(S=w.exec(v))!==null;){const I=S[1];if(!I||I.trim()==="")continue;const U=S[0].indexOf(I),K=b+1+S.index+U;r.push({type:"player",match:I,content:I,index:K,length:I.length})}}}else if(u){const v=/(\w+)\s+\(\d+\)\s+vs\.\s+(\w+)\s+\(\d+\)/.exec(e);if(v){const[w,S,I]=v,B=v.index,U=B+w.indexOf(S);r.push({type:"player",match:S,content:S,index:U,length:S.length});const K=B+w.indexOf(I);r.push({type:"player",match:I,content:I,index:K,length:I.length})}}else if(c){const v=/^Game \d+:\s+(\w+)\s+(?:offers|declines|accepts|requests|forfeits)/.exec(e);if(v){const I=v[1],B=e.indexOf(I);r.push({type:"player",match:I,content:I,index:B,length:I.length})}const S=/Game \d+\s*\((\w+)\s+vs\.\s+(\w+)\)/.exec(e);if(S){const[I,B,U]=S,K=S.index,le=e.indexOf(B,K);r.push({type:"player",match:B,content:B,index:le,length:B.length});const q=e.indexOf(U,K);r.push({type:"player",match:U,content:U,index:q,length:U.length})}}else if(h){const v=/^\:\[\d{2}:\d{2}:\d{2}\]\s+(\w+):/.exec(e);if(v){const S=v[1],I=e.indexOf(S,v.index);r.push({type:"player",match:S,content:S,index:I,length:S.length})}je.lastIndex=0;let w;for(;(w=je.exec(e))!==null;)r.push({type:"url",match:w[0],content:w[0],index:w.index,length:w[0].length})}else if(f){const b=e.indexOf(":");if(b!==-1){const v=e.substring(b+1),w=/(\w+)(?=\s|\.|\.|$)/g;let S;for(;(S=w.exec(v))!==null;){const I=S[1],B=b+1+S.index;r.push({type:"player",match:I,content:I,index:B,length:I.length})}}}else if(g){if(!e.includes(" list:")){const b=/\b(\w+)\b/g;let v;for(;(v=b.exec(e))!==null;){const w=v[1];r.push({type:"player",match:w,content:w,index:v.index,length:w.length})}}}else if($){const v=/^\s*\d+:\s*(\w+)(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.exec(e);if(v){const w=v[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else if(y){const v=/^\s*Finger of\s+(\w+)/.exec(e);if(v){const w=v[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else if(k){const v=/History for (\w+):/.exec(e);if(v)nn=v[1];else if(nn){const S=/^\s*(\d+):\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+(\w+)/.exec(e);if(S){const I=S[1];r.push({type:"command",match:e,content:`examine ${nn} ${I}`,index:0,length:e.length,isHistoryLine:!0})}}}else if(x){const v=/Journal for (\w+):/.exec(e);if(v)rn=v[1];else if(rn){const S=/^(\s*)(%\d+):/.exec(e);if(S){const[I,B,U]=S;r.push({type:"command",match:e,content:`examine ${rn} ${U}`,index:0,length:e.length,isJournalLine:!0})}}}else if(a){const v=/^\s*(\d+)\s+(?:\d{3,4}|----|\+{4})\s+\w+/.exec(e);if(v){const w=v[1];r.push({type:"command",match:e,content:`play ${w}`,index:0,length:e.length,isSoughtLine:!0})}}else if(R){if(!(e.includes("Blitz")&&e.includes("Standard")&&e.includes("Lightning"))){const b=/(?:(\d+)\.\s+)?(\w+)\s+(\d{4})/g;let v;for(;(v=b.exec(e))!==null;){const[w,S,I,B]=v,U=v.index+(S?S.length+2:0);r.push({type:"player",match:I,content:I,index:U,length:I.length})}}}else if(P){if(!(e.includes("Index of new news items:")||e.includes("Index of the last few news items:"))){const v=/^(\d{4})\s+\(/.exec(e);if(v){const w=v[1];n!=null&&r.push({type:"command",match:w,content:`news ${w}`,index:0,length:w.length})}}}else if(M){const v=/^Notification:\s+(\w+)\s+has\s+(?:arrived|departed)/.exec(e);if(v){const w=v[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else{je.lastIndex=0;let b;for(;(b=je.exec(e))!==null;)r.push({type:"url",match:b[0],content:b[0],index:b.index,length:b[0].length})}if(n!=null&&!i&&!d&&!l&&!u&&!c&&!h&&!f&&!g&&!$&&!y&&!k&&!x&&!a&&!R&&!P&&!M){const b=Fl.exec(e);if(b){const v=b[1];r.push({type:"player",match:v,content:v.replace(/\([A-Z]\)$/,""),index:0,length:v.length})}}if(n!=null){Cr.lastIndex=0;let b;for(;(b=Cr.exec(e))!==null;){const S=b[1].trim().split(/\s+/),I=S[0].toLowerCase();(Pr.has(I)||S.length>1&&Pr.has(I)&&S[1].startsWith("/"))&&r.push({type:"command",match:b[0],content:b[1],index:b.index,length:b[0].length})}Sr.lastIndex=0;let v;for(;(v=Sr.exec(e))!==null;){const w=v[1].toLowerCase();["next","more","back","prev","previous","done","quit"].includes(w)&&r.push({type:"command",match:v[0],content:w,index:v.index,length:v[0].length})}}r.sort((b,v)=>b.index-v.index);const _=[];let H=0;return r.forEach((b,v)=>{if(b.index>H&&_.push(e.substring(H,b.index)),b.type==="url"){let w=b.content;b.content.match(/^(?:https?|ftp):\/\//)||b.content.includes(".")&&(w="https://"+b.content),_.push(s.jsx(kr,{href:w,target:"_blank",rel:"noopener noreferrer",onClick:S=>S.stopPropagation(),children:b.content},`url-${v}`))}else b.type==="command"?b.isHistoryLine?_.push(s.jsx(Il,{onClick:w=>{w.stopPropagation(),n(b.content)},title:`Click to examine game: ${b.content}`,children:b.match},`hist-${v}`)):b.isJournalLine?_.push(s.jsx(Al,{onClick:w=>{w.stopPropagation(),n(b.content)},title:`Click to examine game: ${b.content}`,children:b.match},`journal-${v}`)):b.isSoughtLine?_.push(s.jsx(Nl,{onClick:w=>{w.stopPropagation(),n(b.content)},title:`Click to play game: ${b.content}`,children:b.match},`sought-${v}`)):b.isGamesLine?_.push(s.jsx(Dl,{onClick:w=>{w.stopPropagation(),n(b.content)},title:`Click to observe game: ${b.content}`,children:b.match},`games-${v}`)):b.isSeekLine?_.push(s.jsx(Ol,{onClick:w=>{w.stopPropagation(),n(b.content)},title:`Click to accept challenge: ${b.content}`,children:b.match},`seek-${v}`)):_.push(s.jsx(zl,{onClick:w=>{w.stopPropagation(),n(b.content)},title:`Click to send: ${b.content}`,children:b.match},`cmd-${v}`)):b.type==="player"&&_.push(s.jsx(ht,{name:b.content},`player-${v}`));H=b.index+b.length}),H<e.length&&_.push(e.substring(H)),_.length===0?s.jsx("span",{className:t,children:e}):s.jsx("span",{className:t,children:_})};nt.displayName="LinkifiedText";const Bl=m.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
  
  &:visited {
    color: inherit;
  }
`,Wl=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,on=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Hl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,jr=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,vn=({parsedMessage:e,className:t})=>{const{ficsStore:n}=Le(),{content:r,elements:o=[],metadata:i}=e;if(i?.seekNumber&&o.some(c=>c.type==="seekNumber")){const c=i.seekNumber;return s.jsx(on,{className:t,onClick:h=>{h.stopPropagation(),n.sendCommand(`play ${c}`)},title:`Click to accept challenge: play ${c}`,children:r})}if(o.length===0)return s.jsx("span",{className:t,children:r});const d=[];let l=0;return[...o].sort((c,h)=>c.start-h.start).forEach((c,h)=>{switch(c.start>l&&d.push(s.jsx("span",{children:r.substring(l,c.start)},`text-${h}`)),c.type){case"player":d.push(s.jsx(ht,{name:c.text},`player-${h}`));break;case"url":d.push(s.jsx(Bl,{href:c.action,target:"_blank",rel:"noopener noreferrer",onClick:y=>y.stopPropagation(),children:c.text},`url-${h}`));break;case"command":const f=c.action.startsWith("examine "),g=c.action.startsWith("play "),$=c.action.startsWith("observe ");f?d.push(s.jsx(Hl,{onClick:y=>{y.stopPropagation(),n.sendCommand(c.action)},title:`Click to ${c.action}`,children:c.text},`cmd-${h}`)):g?d.push(s.jsx(on,{onClick:y=>{y.stopPropagation(),n.sendCommand(c.action)},title:`Click to accept challenge: ${c.action}`,children:c.text},`cmd-${h}`)):$?d.push(s.jsx(jr,{onClick:y=>{y.stopPropagation(),n.sendCommand(c.action)},title:`Click to ${c.action}`,children:c.text},`cmd-${h}`)):d.push(s.jsx(Wl,{onClick:y=>{y.stopPropagation(),n.sendCommand(c.action)},title:`Click to send: ${c.action}`,children:c.text},`cmd-${h}`));break;case"seekNumber":d.push(s.jsx(on,{onClick:y=>{y.stopPropagation(),n.sendCommand(c.action)},title:`Click to accept challenge: ${c.action}`,children:c.text},`seek-${h}`));break;case"gameNumber":d.push(s.jsx(jr,{onClick:y=>{y.stopPropagation(),n.sendCommand(c.action)},title:`Click to observe game: ${c.action}`,children:c.text},`game-${h}`));break;default:d.push(s.jsx("span",{children:c.text},`unknown-${h}`))}l=c.end}),l<r.length&&d.push(s.jsx("span",{children:r.substring(l)},"text-final")),s.jsx("span",{className:t,children:d})};vn.displayName="InteractiveText";const yt=m.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,xt=m.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${e=>e.theme.spacing[3]};
  min-height: 0;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${e=>e.theme.colors.border} transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${e=>e.theme.colors.border};
    border-radius: 4px;
    
    &:hover {
      background-color: ${e=>e.theme.colors.borderHover};
    }
  }
`,In=m.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: 10px;
  flex-shrink: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 50px;
`,_l=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover ${In} {
    opacity: 1;
  }
`;m.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
`;const Rr=m.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
  font-size: 11px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  line-height: 1.3;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  flex: 1;
  
  ${e=>e.$color?`
    color: ${e.$color} !important;
  `:e.$type==="system"?`
    color: ${e.theme.colors.textSecondary};
  `:e.$type==="whisper"?`
    color: ${e.theme.colors.primary};
  `:e.$type==="announcement"?`
    color: ${e.theme.colors.warning};
    font-weight: ${e.theme.typography.fontWeight.semibold};
  `:`
    color: ${e.theme.colors.text};
  `}
`;m.div`
  position: relative;
  
  &:hover ${In} {
    opacity: 1;
  }
`;m(In)`
  position: absolute;
  left: 0;
  top: 0;
  background: ${e=>e.theme.colors.background};
  padding: 0 4px;
  z-index: 1;
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
`;const Gl=m.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
`,Ul=m.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,Er=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,ql=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Bo=Z(({onMessageHover:e})=>{const{chatStore:t,ficsStore:n,preferencesStore:r}=Le(),o=p.useRef(null),i=t.activeTab,a=i?.messages||[],d=n.username||"You",l=c=>{n.sendCommand(c)};if(p.useEffect(()=>{if(o.current&&a.length>0){const c=o.current,h=setTimeout(()=>{i?.type==="console"?c.scrollTop=c.scrollHeight:Tl(c,50)},50);return()=>clearTimeout(h)}},[a.length,a[a.length-1]?.id]),p.useEffect(()=>{if(o.current&&a.length>0){const c=o.current;requestAnimationFrame(()=>{c.scrollTop=c.scrollHeight})}},[i?.id]),!i)return s.jsx(yt,{children:s.jsx(xt,{className:"chat-messages-container",children:s.jsx(Er,{children:"No active chat"})})});if(a.length===0)return s.jsx(yt,{children:s.jsx(xt,{className:"chat-messages-container",children:s.jsx(Er,{children:i.type==="channel"?`No messages in (${i.name}) yet`:i.type==="private"?`No messages with ${i.name} yet`:"Connecting to freechess.org..."})})});const u=[];return a.forEach((c,h)=>{const f=h>0?a[h-1]:null,g=f?new Date(c.timestamp).getTime()-new Date(f.timestamp).getTime():1/0;f&&f.sender===c.sender&&f.type===c.type&&g<6e4?u[u.length-1].messages.push(c):u.push({sender:c.sender,timestamp:new Date(c.timestamp),messages:[c]})}),i.type==="console"?s.jsx(yt,{children:s.jsx(xt,{ref:o,className:"chat-messages-container",children:a.map(c=>{let h;if(c.metadata?.consoleType){const f=r.getConsoleColor(c.metadata.consoleType,c.metadata.channelNumber);f&&(h=f)}return s.jsx(Rr,{$type:c.type,$color:h,onMouseEnter:()=>e?.(c.timestamp),onMouseLeave:()=>e?.(null),children:h?s.jsx("span",{style:{color:h},children:c.metadata?.parsedMessage?s.jsx(vn,{parsedMessage:c.metadata.parsedMessage}):s.jsx(nt,{text:c.content,onCommandClick:l})}):c.metadata?.parsedMessage?s.jsx(vn,{parsedMessage:c.metadata.parsedMessage}):s.jsx(nt,{text:c.content,onCommandClick:l})},c.id)})})}):s.jsx(yt,{children:s.jsx(xt,{ref:o,className:"chat-messages-container",children:u.map((c,h)=>{const f=c.messages[0],g=c.sender.toLowerCase()===d.toLowerCase();if(f.type==="system")return s.jsx(ql,{children:c.messages.map((y,k)=>s.jsxs(re.Fragment,{children:[k>0&&`
`,s.jsx(nt,{text:y.content,onCommandClick:l})]},y.id))},h);let $;if(i.type==="channel"&&f.metadata?.consoleType==="channel"){const y=r.getConsoleColor(f.metadata.consoleType,f.metadata.channelNumber);y&&($=y)}return s.jsx(_l,{onMouseEnter:()=>e?.(c.timestamp),onMouseLeave:()=>e?.(null),children:s.jsxs(Rr,{$type:f.type,$color:$,children:[s.jsx(Gl,{$isYou:g,children:g?c.sender:s.jsx(ht,{name:c.sender})}),s.jsx(Ul,{children:c.messages.map((y,k)=>s.jsxs(re.Fragment,{children:[k>0&&`
`,s.jsx(nt,{text:y.content})]},y.id))})]})},h)})})})});Bo.displayName="ChatMessages";const Yl=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  padding-top: ${e=>e.theme.spacing[1]};
  background-color: transparent;
  margin: ${e=>e.theme.spacing[2]};
  margin-top: 0;
`,Vl=m.input`
  flex: 1;
  padding: ${e=>e.theme.spacing[2]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.container};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  box-shadow: ${e=>e.theme.shadows.container};
  outline: none;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:focus {
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: ${e=>e.theme.shadows.container}, 0 0 0 2px ${e=>e.theme.colors.primary}20;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${e=>e.theme.colors.textTertiary};
  }
`,Kl=m.button`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  outline: none;
  
  &:hover:not(:disabled) {
    background-color: ${e=>e.theme.colors.primaryHover};
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary}40;
  }
`,Wo=({value:e,onChange:t,onSend:n,onHistoryNavigate:r,placeholder:o="Type a message...",disabled:i=!1})=>{const a=p.useRef(null),d=u=>{u.key==="Enter"&&!u.shiftKey?(u.preventDefault(),e.trim()&&n(e.trim())):u.key==="ArrowUp"&&!e?(u.preventDefault(),r?.("up")):u.key==="ArrowDown"&&(u.preventDefault(),r?.("down"))},l=()=>{e.trim()&&n(e.trim())};return s.jsxs(Yl,{children:[s.jsx(Vl,{ref:a,type:"text",value:e,onChange:u=>t(u.target.value),onKeyDown:d,placeholder:o,disabled:i,autoComplete:"off",spellCheck:"true"}),s.jsx(Kl,{onClick:l,disabled:i||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};Wo.displayName="ChatInput";const Xl=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,Jl=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Ql=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Zl=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,ed=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,td=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  padding: ${e=>e.theme.spacing[2]};
  padding-top: 0;
  padding-bottom: 0;
`,Ho=Z(({className:e,compact:t=!1})=>{const{chatStore:n,ficsStore:r}=Le(),[o,i]=p.useState(""),[a,d]=p.useState(!1),[l,u]=p.useState(null);re.useEffect(()=>{!r.connected&&!r.connecting&&(console.log("Auto-connecting to FICS..."),r.connect())},[r]),re.useEffect(()=>{r.error&&n.addMessage("console",{channel:"console",sender:"System",content:`Error: ${r.error}`,timestamp:new Date,type:"system"})},[r.error,n]);const c=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!!f.trim()){if(n.addToHistory(f),f==="/help"||f==="\\help"){n.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
guest - Login as guest
<username> - Login with username (will prompt for password)
tell <user> <message> - Send private message
tell <channel> <message> - Send channel message
who - List online users
games - List current games
observe <game> - Observe a game
seek <time> <inc> - Seek a game
quit - Disconnect from FICS

Local commands:
/help - Show this help`,timestamp:new Date,type:"system"}),i("");return}if(n.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),f.startsWith("/")||f.startsWith("\\"))r.sendCommand(f.substring(1));else{const g=n.activeTab;if(!g)return;if(g.type==="channel"){const $=g.id.replace("channel-","");r.sendCommand(`tell ${$} ${f}`)}else g.type==="private"?r.sendCommand(`tell ${g.id} ${f}`):r.sendCommand(f)}i("")}},h=f=>{const g=n.navigateHistory(f);g!==null&&i(g)};return s.jsxs(Xl,{className:e,$compact:t,children:[!t&&s.jsxs(Jl,{children:[s.jsx(Ql,{children:"Chat"}),r.averagePing!==null&&s.jsxs(ed,{children:["Ping: ",r.averagePing,"ms"]}),l&&s.jsxs(Zl,{children:["Received: ",new Date(l).toLocaleTimeString()]})]}),s.jsxs(td,{children:[s.jsx(Fo,{}),s.jsx(Bo,{onMessageHover:u}),s.jsx(Wo,{value:o,onChange:i,onSend:c,onHistoryNavigate:h,placeholder:n.activeTab?.type==="channel"?`Message (${n.activeTab.name})...`:n.activeTab?.type==="private"?`Message ${n.activeTab.name}...`:"Enter command..."})]})]})});Ho.displayName="ChatPanel";const nd=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,rd=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,od=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,id=m.div`
  width: ${e=>e.$fullWidth?"100%":e.$isVisible?"600px":"0"};
  display: ${e=>e.$isVisible?"flex":"none"};
  flex-direction: column;
  background-color: ${e=>e.theme.colors.surface};
  border-left: ${e=>e.$fullWidth?"none":"1px solid "+e.theme.colors.border};
  overflow: hidden;
  flex: ${e=>e.$fullWidth?"1":"initial"};
  
  @media (max-width: 768px) {
    width: ${e=>e.$isVisible?"100%":"0"};
  }
`,sd=m.div`
  width: ${e=>e.$isVisible?"4px":"0"};
  display: ${e=>e.$isVisible?"block":"none"};
  background-color: ${e=>e.theme.colors.border};
  cursor: col-resize;
  position: relative;
  
  &:hover {
    background-color: ${e=>e.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2px;
    right: -2px;
  }
`,_o=Z(()=>{const{preferencesStore:e}=Le(),{viewMode:t,autoViewMode:n}=e.preferences,r=Wt(),[o,i]=p.useState(600),[a,d]=p.useState(!1);p.useEffect(()=>{n&&(r.isMobile||r.isTablet?e.updatePreference("viewMode","chess-only"):e.updatePreference("viewMode","chess-and-chat"))},[r.isMobile,r.isTablet,n,e]);const l=f=>{f.preventDefault(),d(!0)};p.useEffect(()=>{if(!a)return;const f=$=>{const y=window.innerWidth-$.clientX;i(Math.max(300,Math.min(600,y))),window.dispatchEvent(new Event("resize"))},g=()=>{d(!1)};return document.addEventListener("mousemove",f),document.addEventListener("mouseup",g),()=>{document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",g)}},[a]);const u=t==="chess-only"||t==="chess-and-chat",c=t==="chat-only"||t==="chess-and-chat",h=t==="chess-and-chat"&&!r.isMobile;return s.jsxs(nd,{children:[s.jsx(Ro,{}),s.jsxs(rd,{children:[s.jsx(od,{$isVisible:u,children:s.jsx(Oo,{hasChat:c})}),h&&s.jsx(sd,{$isVisible:!0,onMouseDown:l,style:{cursor:a?"col-resize":"ew-resize"}}),s.jsx(id,{$isVisible:c,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:c&&!r.isMobile?`${o}px`:void 0},children:s.jsx(Ho,{})})]})]})});_o.displayName="AppLayout";const ad=Aa`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        width: 100%;
        height: 100%;
        font-family: ${({theme:e})=>e.typography.fontFamily};
        font-size: ${({theme:e})=>e.typography.fontSize.md};
        color: ${({theme:e})=>e.colors.text};
        background: ${({theme:e})=>e.colors.background};
        overflow: hidden;
    }

    #root {
        width: 100%;
        height: 100%;
    }

    /* Chess board specific styles */
    .chess-square {
        position: relative;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
    }

    .chess-square.light {
        background-color: var(--color-chessBoardLight);
    }

    .chess-square.dark {
        background-color: var(--color-chessBoardDark);
    }

    .chess-square.highlighted {
        background-color: var(--color-chessHighlight) !important;
    }

    .chess-square.last-move {
        background-color: var(--color-chessLastMove) !important;
    }

    .chess-square.check {
        background-color: var(--color-chessCheck) !important;
    }

    .chess-square.legal-move::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30%;
        height: 30%;
        border-radius: 50%;
        background: var(--color-chessLegalMove);
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: ${({theme:e})=>e.colors.backgroundSecondary};
    }

    ::-webkit-scrollbar-thumb {
        background: ${({theme:e})=>e.colors.border};
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${({theme:e})=>e.colors.borderHover};
    }

    /* Focus styles */
    button:focus,
    input:focus,
    textarea:focus,
    select:focus {
        outline: none;
        box-shadow: ${({theme:e})=>e.shadows.focus};
    }

    /* Transitions for theme switching */
    * {
        transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }

    /* Responsive typography */
    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        html {
            font-size: 14px;
        }
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.mobileLandscape}) {
        html {
            font-size: 13px;
        }
    }

    /* Disable text selection on UI elements */
    button,
    .ui-element {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .chess-square.light {
            background-color: #ffffff;
        }

        .chess-square.dark {
            background-color: #000000;
        }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }

    /* Print styles */
    @media print {
        * {
            background: transparent !important;
            color: black !important;
            box-shadow: none !important;
        }
    }
`,cd=()=>s.jsx(Yo,{children:s.jsxs(Da,{children:[s.jsx(ad,{}),s.jsx(bs,{children:s.jsx(Ki,{children:s.jsx(_r,{path:"/",element:s.jsx(Ya,{children:s.jsx(_o,{})})})})})]})}),Go=document.getElementById("root");if(!Go)throw new Error("Root element not found");const ld=Lr(Go);ld.render(s.jsx(cd,{}));
