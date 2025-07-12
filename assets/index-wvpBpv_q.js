import{u as Ke,j as s,a as Oe,b as yn,c as Rr,d as tn,e as Tt,V as _o,f as Go,l as Ln,R as Uo}from"./shared-CpneYOZX.js";import{a as qo,r as h,R as re}from"./vendor-B9TH31lo.js";import{o as Z}from"./mobx-DYHm8Bkn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var Er,In=qo;Er=In.createRoot,In.hydrateRoot;var xn={};Object.defineProperty(xn,"__esModule",{value:!0});xn.parse=Zo;xn.serialize=ei;const Yo=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,Vo=/^[\u0021-\u003A\u003C-\u007E]*$/,Ko=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,Jo=/^[\u0020-\u003A\u003D-\u007E]*$/,Xo=Object.prototype.toString,Qo=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function Zo(e,t){const n=new Qo,r=e.length;if(r<2)return n;const o=t?.decode||ti;let i=0;do{const a=e.indexOf("=",i);if(a===-1)break;const d=e.indexOf(";",i),c=d===-1?r:d;if(a>c){i=e.lastIndexOf(";",a-1)+1;continue}const l=An(e,i,a),p=Nn(e,a,l),u=e.slice(l,p);if(n[u]===void 0){let f=An(e,a+1,c),g=Nn(e,c,f);const v=o(e.slice(f,g));n[u]=v}i=c+1}while(i<r);return n}function An(e,t,n){do{const r=e.charCodeAt(t);if(r!==32&&r!==9)return t}while(++t<n);return n}function Nn(e,t,n){for(;t>n;){const r=e.charCodeAt(--t);if(r!==32&&r!==9)return t+1}return n}function ei(e,t,n){const r=n?.encode||encodeURIComponent;if(!Yo.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=r(t);if(!Vo.test(o))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+o;if(!n)return i;if(n.maxAge!==void 0){if(!Number.isInteger(n.maxAge))throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);i+="; Max-Age="+n.maxAge}if(n.domain){if(!Ko.test(n.domain))throw new TypeError(`option domain is invalid: ${n.domain}`);i+="; Domain="+n.domain}if(n.path){if(!Jo.test(n.path))throw new TypeError(`option path is invalid: ${n.path}`);i+="; Path="+n.path}if(n.expires){if(!ni(n.expires)||!Number.isFinite(n.expires.valueOf()))throw new TypeError(`option expires is invalid: ${n.expires}`);i+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(i+="; HttpOnly"),n.secure&&(i+="; Secure"),n.partitioned&&(i+="; Partitioned"),n.priority)switch(typeof n.priority=="string"?n.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${n.priority}`)}if(n.sameSite)switch(typeof n.sameSite=="string"?n.sameSite.toLowerCase():n.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${n.sameSite}`)}return i}function ti(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function ni(e){return Xo.call(e)==="[object Date]"}var Dn="popstate";function ri(e={}){function t(r,o){let{pathname:i,search:a,hash:d}=r.location;return nn("",{pathname:i,search:a,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:st(o)}return ii(t,n,null,e)}function J(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ye(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function oi(){return Math.random().toString(36).substring(2,10)}function On(e,t){return{usr:e.state,key:e.key,idx:t}}function nn(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Je(t):t,state:n,key:t&&t.key||r||oi()}}function st({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Je(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ii(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:i=!1}=r,a=o.history,d="POP",c=null,l=p();l==null&&(l=0,a.replaceState({...a.state,idx:l},""));function p(){return(a.state||{idx:null}).idx}function u(){d="POP";let k=p(),y=k==null?null:k-l;l=k,c&&c({action:d,location:b.location,delta:y})}function f(k,y){d="PUSH";let j=nn(b.location,k,y);l=p()+1;let R=On(j,l),P=b.createHref(j);try{a.pushState(R,"",P)}catch(M){if(M instanceof DOMException&&M.name==="DataCloneError")throw M;o.location.assign(P)}i&&c&&c({action:d,location:b.location,delta:1})}function g(k,y){d="REPLACE";let j=nn(b.location,k,y);l=p();let R=On(j,l),P=b.createHref(j);a.replaceState(R,"",P),i&&c&&c({action:d,location:b.location,delta:0})}function v(k){return si(k)}let b={get action(){return d},get location(){return e(o,a)},listen(k){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Dn,u),c=k,()=>{o.removeEventListener(Dn,u),c=null}},createHref(k){return t(o,k)},createURL:v,encodeLocation(k){let y=v(k);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:f,replace:g,go(k){return a.go(k)}};return b}function si(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),J(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:st(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Mr(e,t,n="/"){return ai(e,t,n,!1)}function ai(e,t,n,r){let o=typeof t=="string"?Je(t):t,i=ke(o.pathname||"/",n);if(i==null)return null;let a=Tr(e);ci(a);let d=null;for(let c=0;d==null&&c<a.length;++c){let l=bi(i);d=yi(a[c],l,r)}return d}function Tr(e,t=[],n=[],r=""){let o=(i,a,d)=>{let c={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(J(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length));let l=we([r,c.relativePath]),p=n.concat(c);i.children&&i.children.length>0&&(J(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),Tr(i.children,t,p,l)),!(i.path==null&&!i.index)&&t.push({path:l,score:fi(l,i.index),routesMeta:p})};return e.forEach((i,a)=>{if(i.path===""||!i.path?.includes("?"))o(i,a);else for(let d of zr(i.path))o(i,a,d)}),t}function zr(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let a=zr(r.join("/")),d=[];return d.push(...a.map(c=>c===""?i:[i,c].join("/"))),o&&d.push(...a),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function ci(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:gi(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var li=/^:[\w-]+$/,di=3,ui=2,hi=1,pi=10,mi=-2,Fn=e=>e==="*";function fi(e,t){let n=e.split("/"),r=n.length;return n.some(Fn)&&(r+=mi),t&&(r+=ui),n.filter(o=>!Fn(o)).reduce((o,i)=>o+(li.test(i)?di:i===""?hi:pi),r)}function gi(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function yi(e,t,n=!1){let{routesMeta:r}=e,o={},i="/",a=[];for(let d=0;d<r.length;++d){let c=r[d],l=d===r.length-1,p=i==="/"?t:t.slice(i.length)||"/",u=Pt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},p),f=c.route;if(!u&&l&&n&&!r[r.length-1].route.index&&(u=Pt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},p)),!u)return null;Object.assign(o,u.params),a.push({params:o,pathname:we([i,u.pathname]),pathnameBase:ki(we([i,u.pathnameBase])),route:f}),u.pathnameBase!=="/"&&(i=we([i,u.pathnameBase]))}return a}function Pt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=xi(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:r.reduce((l,{paramName:p,isOptional:u},f)=>{if(p==="*"){let v=d[f]||"";a=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const g=d[f];return u&&!g?l[p]=void 0:l[p]=(g||"").replace(/%2F/g,"/"),l},{}),pathname:i,pathnameBase:a,pattern:e}}function xi(e,t=!1,n=!0){ye(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,d,c)=>(r.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function bi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ye(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ke(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function $i(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Je(e):e;return{pathname:n?n.startsWith("/")?n:vi(n,t):t,search:Ci(r),hash:Si(o)}}function vi(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function _t(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function wi(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Lr(e){let t=wi(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Ir(e,t,n,r=!1){let o;typeof e=="string"?o=Je(e):(o={...e},J(!o.pathname||!o.pathname.includes("?"),_t("?","pathname","search",o)),J(!o.pathname||!o.pathname.includes("#"),_t("#","pathname","hash",o)),J(!o.search||!o.search.includes("#"),_t("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,d;if(a==null)d=n;else{let u=t.length-1;if(!r&&a.startsWith("..")){let f=a.split("/");for(;f[0]==="..";)f.shift(),u-=1;o.pathname=f.join("/")}d=u>=0?t[u]:"/"}let c=$i(o,d),l=a&&a!=="/"&&a.endsWith("/"),p=(i||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(l||p)&&(c.pathname+="/"),c}var we=e=>e.join("/").replace(/\/\/+/g,"/"),ki=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ci=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Si=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Pi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Ar=["POST","PUT","PATCH","DELETE"];new Set(Ar);var ji=["GET",...Ar];new Set(ji);var Xe=h.createContext(null);Xe.displayName="DataRouter";var zt=h.createContext(null);zt.displayName="DataRouterState";var Nr=h.createContext({isTransitioning:!1});Nr.displayName="ViewTransition";var Ri=h.createContext(new Map);Ri.displayName="Fetchers";var Ei=h.createContext(null);Ei.displayName="Await";var xe=h.createContext(null);xe.displayName="Navigation";var dt=h.createContext(null);dt.displayName="Location";var Ce=h.createContext({outlet:null,matches:[],isDataRoute:!1});Ce.displayName="Route";var bn=h.createContext(null);bn.displayName="RouteError";function Mi(e,{relative:t}={}){J(ut(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=h.useContext(xe),{hash:o,pathname:i,search:a}=ht(e,{relative:t}),d=i;return n!=="/"&&(d=i==="/"?n:we([n,i])),r.createHref({pathname:d,search:a,hash:o})}function ut(){return h.useContext(dt)!=null}function Fe(){return J(ut(),"useLocation() may be used only in the context of a <Router> component."),h.useContext(dt).location}var Dr="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Or(e){h.useContext(xe).static||h.useLayoutEffect(e)}function Ti(){let{isDataRoute:e}=h.useContext(Ce);return e?Gi():zi()}function zi(){J(ut(),"useNavigate() may be used only in the context of a <Router> component.");let e=h.useContext(Xe),{basename:t,navigator:n}=h.useContext(xe),{matches:r}=h.useContext(Ce),{pathname:o}=Fe(),i=JSON.stringify(Lr(r)),a=h.useRef(!1);return Or(()=>{a.current=!0}),h.useCallback((c,l={})=>{if(ye(a.current,Dr),!a.current)return;if(typeof c=="number"){n.go(c);return}let p=Ir(c,JSON.parse(i),o,l.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:we([t,p.pathname])),(l.replace?n.replace:n.push)(p,l.state,l)},[t,n,i,o,e])}h.createContext(null);function ht(e,{relative:t}={}){let{matches:n}=h.useContext(Ce),{pathname:r}=Fe(),o=JSON.stringify(Lr(n));return h.useMemo(()=>Ir(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function Li(e,t){return Fr(e,t)}function Fr(e,t,n,r){J(ut(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=h.useContext(xe),{matches:i}=h.useContext(Ce),a=i[i.length-1],d=a?a.params:{},c=a?a.pathname:"/",l=a?a.pathnameBase:"/",p=a&&a.route;{let y=p&&p.path||"";Br(c,!p||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let u=Fe(),f;if(t){let y=typeof t=="string"?Je(t):t;J(l==="/"||y.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${y.pathname}" was given in the \`location\` prop.`),f=y}else f=u;let g=f.pathname||"/",v=g;if(l!=="/"){let y=l.replace(/^\//,"").split("/");v="/"+g.replace(/^\//,"").split("/").slice(y.length).join("/")}let b=Mr(e,{pathname:v});ye(p||b!=null,`No routes matched location "${f.pathname}${f.search}${f.hash}" `),ye(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let k=Oi(b&&b.map(y=>Object.assign({},y,{params:Object.assign({},d,y.params),pathname:we([l,o.encodeLocation?o.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?l:we([l,o.encodeLocation?o.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),i,n,r);return t&&k?h.createElement(dt.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...f},navigationType:"POP"}},k):k}function Ii(){let e=_i(),t=Pi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=h.createElement(h.Fragment,null,h.createElement("p",null,"💿 Hey developer 👋"),h.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",h.createElement("code",{style:i},"ErrorBoundary")," or"," ",h.createElement("code",{style:i},"errorElement")," prop on your route.")),h.createElement(h.Fragment,null,h.createElement("h2",null,"Unexpected Application Error!"),h.createElement("h3",{style:{fontStyle:"italic"}},t),n?h.createElement("pre",{style:o},n):null,a)}var Ai=h.createElement(Ii,null),Ni=class extends h.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?h.createElement(Ce.Provider,{value:this.props.routeContext},h.createElement(bn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Di({routeContext:e,match:t,children:n}){let r=h.useContext(Xe);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),h.createElement(Ce.Provider,{value:e},n)}function Oi(e,t=[],n=null,r=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=n?.errors;if(i!=null){let c=o.findIndex(l=>l.route.id&&i?.[l.route.id]!==void 0);J(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,d=-1;if(n)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(d=c),l.route.id){let{loaderData:p,errors:u}=n,f=l.route.loader&&!p.hasOwnProperty(l.route.id)&&(!u||u[l.route.id]===void 0);if(l.route.lazy||f){a=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,l,p)=>{let u,f=!1,g=null,v=null;n&&(u=i&&l.route.id?i[l.route.id]:void 0,g=l.route.errorElement||Ai,a&&(d<0&&p===0?(Br("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,v=null):d===p&&(f=!0,v=l.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,p+1)),k=()=>{let y;return u?y=g:f?y=v:l.route.Component?y=h.createElement(l.route.Component,null):l.route.element?y=l.route.element:y=c,h.createElement(Di,{match:l,routeContext:{outlet:c,matches:b,isDataRoute:n!=null},children:y})};return n&&(l.route.ErrorBoundary||l.route.errorElement||p===0)?h.createElement(Ni,{location:n.location,revalidation:n.revalidation,component:g,error:u,children:k(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):k()},null)}function $n(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Fi(e){let t=h.useContext(Xe);return J(t,$n(e)),t}function Bi(e){let t=h.useContext(zt);return J(t,$n(e)),t}function Wi(e){let t=h.useContext(Ce);return J(t,$n(e)),t}function vn(e){let t=Wi(e),n=t.matches[t.matches.length-1];return J(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Hi(){return vn("useRouteId")}function _i(){let e=h.useContext(bn),t=Bi("useRouteError"),n=vn("useRouteError");return e!==void 0?e:t.errors?.[n]}function Gi(){let{router:e}=Fi("useNavigate"),t=vn("useNavigate"),n=h.useRef(!1);return Or(()=>{n.current=!0}),h.useCallback(async(o,i={})=>{ye(n.current,Dr),n.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var Bn={};function Br(e,t,n){!t&&!Bn[e]&&(Bn[e]=!0,ye(!1,n))}h.memo(Ui);function Ui({routes:e,future:t,state:n}){return Fr(e,void 0,n,t)}function Wr(e){J(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function qi({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:i=!1}){J(!ut(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),d=h.useMemo(()=>({basename:a,navigator:o,static:i,future:{}}),[a,o,i]);typeof n=="string"&&(n=Je(n));let{pathname:c="/",search:l="",hash:p="",state:u=null,key:f="default"}=n,g=h.useMemo(()=>{let v=ke(c,a);return v==null?null:{location:{pathname:v,search:l,hash:p,state:u,key:f},navigationType:r}},[a,c,l,p,u,f,r]);return ye(g!=null,`<Router basename="${a}"> is not able to match the URL "${c}${l}${p}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:h.createElement(xe.Provider,{value:d},h.createElement(dt.Provider,{children:t,value:g}))}function Yi({children:e,location:t}){return Li(rn(e),t)}function rn(e,t=[]){let n=[];return h.Children.forEach(e,(r,o)=>{if(!h.isValidElement(r))return;let i=[...t,o];if(r.type===h.Fragment){n.push.apply(n,rn(r.props.children,i));return}J(r.type===Wr,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),J(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=rn(r.props.children,i)),n.push(a)}),n}var bt="get",$t="application/x-www-form-urlencoded";function Lt(e){return e!=null&&typeof e.tagName=="string"}function Vi(e){return Lt(e)&&e.tagName.toLowerCase()==="button"}function Ki(e){return Lt(e)&&e.tagName.toLowerCase()==="form"}function Ji(e){return Lt(e)&&e.tagName.toLowerCase()==="input"}function Xi(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Qi(e,t){return e.button===0&&(!t||t==="_self")&&!Xi(e)}var mt=null;function Zi(){if(mt===null)try{new FormData(document.createElement("form"),0),mt=!1}catch{mt=!0}return mt}var es=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Gt(e){return e!=null&&!es.has(e)?(ye(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$t}"`),null):e}function ts(e,t){let n,r,o,i,a;if(Ki(e)){let d=e.getAttribute("action");r=d?ke(d,t):null,n=e.getAttribute("method")||bt,o=Gt(e.getAttribute("enctype"))||$t,i=new FormData(e)}else if(Vi(e)||Ji(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||d.getAttribute("action");if(r=c?ke(c,t):null,n=e.getAttribute("formmethod")||d.getAttribute("method")||bt,o=Gt(e.getAttribute("formenctype"))||Gt(d.getAttribute("enctype"))||$t,i=new FormData(d,e),!Zi()){let{name:l,type:p,value:u}=e;if(p==="image"){let f=l?`${l}.`:"";i.append(`${f}x`,"0"),i.append(`${f}y`,"0")}else l&&i.append(l,u)}}else{if(Lt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=bt,r=null,o=$t,a=e}return i&&o==="text/plain"&&(a=i,i=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:i,body:a}}function wn(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function ns(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function rs(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function os(e,t,n){let r=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let a=await ns(i,n);return a.links?a.links():[]}return[]}));return cs(r.flat(1).filter(rs).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Wn(e,t,n,r,o,i){let a=(c,l)=>n[l]?c.route.id!==n[l].route.id:!0,d=(c,l)=>n[l].pathname!==c.pathname||n[l].route.path?.endsWith("*")&&n[l].params["*"]!==c.params["*"];return i==="assets"?t.filter((c,l)=>a(c,l)||d(c,l)):i==="data"?t.filter((c,l)=>{let p=r.routes[c.route.id];if(!p||!p.hasLoader)return!1;if(a(c,l)||d(c,l))return!0;if(c.route.shouldRevalidate){let u=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof u=="boolean")return u}return!0}):[]}function is(e,t,{includeHydrateFallback:n}={}){return ss(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function ss(e){return[...new Set(e)]}function as(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function cs(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let i=JSON.stringify(as(o));return n.has(i)||(n.add(i),r.push({key:i,link:o})),r},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var ls=new Set([100,101,204,205]);function ds(e,t){let n=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n.pathname==="/"?n.pathname="_root.data":t&&ke(n.pathname,t)==="/"?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}function Hr(){let e=h.useContext(Xe);return wn(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function us(){let e=h.useContext(zt);return wn(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var kn=h.createContext(void 0);kn.displayName="FrameworkContext";function _r(){let e=h.useContext(kn);return wn(e,"You must render this element inside a <HydratedRouter> element"),e}function hs(e,t){let n=h.useContext(kn),[r,o]=h.useState(!1),[i,a]=h.useState(!1),{onFocus:d,onBlur:c,onMouseEnter:l,onMouseLeave:p,onTouchStart:u}=t,f=h.useRef(null);h.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=y=>{y.forEach(j=>{a(j.isIntersecting)})},k=new IntersectionObserver(b,{threshold:.5});return f.current&&k.observe(f.current),()=>{k.disconnect()}}},[e]),h.useEffect(()=>{if(r){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[r]);let g=()=>{o(!0)},v=()=>{o(!1),a(!1)};return n?e!=="intent"?[i,f,{}]:[i,f,{onFocus:Ze(d,g),onBlur:Ze(c,v),onMouseEnter:Ze(l,g),onMouseLeave:Ze(p,v),onTouchStart:Ze(u,g)}]:[!1,f,{}]}function Ze(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function ps({page:e,...t}){let{router:n}=Hr(),r=h.useMemo(()=>Mr(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?h.createElement(fs,{page:e,matches:r,...t}):null}function ms(e){let{manifest:t,routeModules:n}=_r(),[r,o]=h.useState([]);return h.useEffect(()=>{let i=!1;return os(e,t,n).then(a=>{i||o(a)}),()=>{i=!0}},[e,t,n]),r}function fs({page:e,matches:t,...n}){let r=Fe(),{manifest:o,routeModules:i}=_r(),{basename:a}=Hr(),{loaderData:d,matches:c}=us(),l=h.useMemo(()=>Wn(e,t,c,o,r,"data"),[e,t,c,o,r]),p=h.useMemo(()=>Wn(e,t,c,o,r,"assets"),[e,t,c,o,r]),u=h.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let v=new Set,b=!1;if(t.forEach(y=>{let j=o.routes[y.route.id];!j||!j.hasLoader||(!l.some(R=>R.route.id===y.route.id)&&y.route.id in d&&i[y.route.id]?.shouldRevalidate||j.hasClientLoader?b=!0:v.add(y.route.id))}),v.size===0)return[];let k=ds(e,a);return b&&v.size>0&&k.searchParams.set("_routes",t.filter(y=>v.has(y.route.id)).map(y=>y.route.id).join(",")),[k.pathname+k.search]},[a,d,r,o,l,t,e,i]),f=h.useMemo(()=>is(p,o),[p,o]),g=ms(p);return h.createElement(h.Fragment,null,u.map(v=>h.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),f.map(v=>h.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),g.map(({key:v,link:b})=>h.createElement("link",{key:v,...b})))}function gs(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Gr=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Gr&&(window.__reactRouterVersion="7.6.3")}catch{}function ys({basename:e,children:t,window:n}){let r=h.useRef();r.current==null&&(r.current=ri({window:n,v5Compat:!0}));let o=r.current,[i,a]=h.useState({action:o.action,location:o.location}),d=h.useCallback(c=>{h.startTransition(()=>a(c))},[a]);return h.useLayoutEffect(()=>o.listen(d),[o,d]),h.createElement(qi,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:o})}var Ur=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,qr=h.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:i,replace:a,state:d,target:c,to:l,preventScrollReset:p,viewTransition:u,...f},g){let{basename:v}=h.useContext(xe),b=typeof l=="string"&&Ur.test(l),k,y=!1;if(typeof l=="string"&&b&&(k=l,Gr))try{let W=new URL(window.location.href),x=l.startsWith("//")?new URL(W.protocol+l):new URL(l),$=ke(x.pathname,v);x.origin===W.origin&&$!=null?l=$+x.search+x.hash:y=!0}catch{ye(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let j=Mi(l,{relative:o}),[R,P,M]=hs(r,f),D=vs(l,{replace:a,state:d,target:c,preventScrollReset:p,relative:o,viewTransition:u});function I(W){t&&t(W),W.defaultPrevented||D(W)}let _=h.createElement("a",{...f,...M,href:k||j,onClick:y||i?t:I,ref:gs(g,P),target:c,"data-discover":!b&&n==="render"?"true":void 0});return R&&!b?h.createElement(h.Fragment,null,_,h.createElement(ps,{page:j})):_});qr.displayName="Link";var xs=h.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:i,to:a,viewTransition:d,children:c,...l},p){let u=ht(a,{relative:l.relative}),f=Fe(),g=h.useContext(zt),{navigator:v,basename:b}=h.useContext(xe),k=g!=null&&Ps(u)&&d===!0,y=v.encodeLocation?v.encodeLocation(u).pathname:u.pathname,j=f.pathname,R=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(j=j.toLowerCase(),R=R?R.toLowerCase():null,y=y.toLowerCase()),R&&b&&(R=ke(R,b)||R);const P=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let M=j===y||!o&&j.startsWith(y)&&j.charAt(P)==="/",D=R!=null&&(R===y||!o&&R.startsWith(y)&&R.charAt(y.length)==="/"),I={isActive:M,isPending:D,isTransitioning:k},_=M?t:void 0,W;typeof r=="function"?W=r(I):W=[r,M?"active":null,D?"pending":null,k?"transitioning":null].filter(Boolean).join(" ");let x=typeof i=="function"?i(I):i;return h.createElement(qr,{...l,"aria-current":_,className:W,ref:p,style:x,to:a,viewTransition:d},typeof c=="function"?c(I):c)});xs.displayName="NavLink";var bs=h.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:i,method:a=bt,action:d,onSubmit:c,relative:l,preventScrollReset:p,viewTransition:u,...f},g)=>{let v=Cs(),b=Ss(d,{relative:l}),k=a.toLowerCase()==="get"?"get":"post",y=typeof d=="string"&&Ur.test(d),j=R=>{if(c&&c(R),R.defaultPrevented)return;R.preventDefault();let P=R.nativeEvent.submitter,M=P?.getAttribute("formmethod")||a;v(P||R.currentTarget,{fetcherKey:t,method:M,navigate:n,replace:o,state:i,relative:l,preventScrollReset:p,viewTransition:u})};return h.createElement("form",{ref:g,method:k,action:b,onSubmit:r?c:j,...f,"data-discover":!y&&e==="render"?"true":void 0})});bs.displayName="Form";function $s(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Yr(e){let t=h.useContext(Xe);return J(t,$s(e)),t}function vs(e,{target:t,replace:n,state:r,preventScrollReset:o,relative:i,viewTransition:a}={}){let d=Ti(),c=Fe(),l=ht(e,{relative:i});return h.useCallback(p=>{if(Qi(p,t)){p.preventDefault();let u=n!==void 0?n:st(c)===st(l);d(e,{replace:u,state:r,preventScrollReset:o,relative:i,viewTransition:a})}},[c,d,l,n,r,t,e,o,i,a])}var ws=0,ks=()=>`__${String(++ws)}__`;function Cs(){let{router:e}=Yr("useSubmit"),{basename:t}=h.useContext(xe),n=Hi();return h.useCallback(async(r,o={})=>{let{action:i,method:a,encType:d,formData:c,body:l}=ts(r,t);if(o.navigate===!1){let p=o.fetcherKey||ks();await e.fetch(p,n,o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,n])}function Ss(e,{relative:t}={}){let{basename:n}=h.useContext(xe),r=h.useContext(Ce);J(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),i={...ht(e||".",{relative:t})},a=Fe();if(e==null){i.search=a.search;let d=new URLSearchParams(i.search),c=d.getAll("index");if(c.some(p=>p==="")){d.delete("index"),c.filter(u=>u).forEach(u=>d.append("index",u));let p=d.toString();i.search=p?`?${p}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:we([n,i.pathname])),st(i)}function Ps(e,t={}){let n=h.useContext(Nr);J(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Yr("useViewTransitionState"),o=ht(e,{relative:t.relative});if(!n.isTransitioning)return!1;let i=ke(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=ke(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Pt(o.pathname,a)!=null||Pt(o.pathname,i)!=null}[...ls];const Vr={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},js={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#ffffff",surfaceElevated:"#ffffff",surfaceHover:"#f9fafb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Rs={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Kr={colors:js,...Vr},Es={colors:Rs,...Vr},Ms={light:Kr,dark:Es},Ts=Kr;var ne=function(){return ne=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},ne.apply(this,arguments)};function at(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,i;r<o;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}var V="-ms-",it="-moz-",G="-webkit-",Jr="comm",It="rule",Cn="decl",zs="@import",Xr="@keyframes",Ls="@layer",Qr=Math.abs,Sn=String.fromCharCode,on=Object.assign;function Is(e,t){return te(e,0)^45?(((t<<2^te(e,0))<<2^te(e,1))<<2^te(e,2))<<2^te(e,3):0}function Zr(e){return e.trim()}function ve(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,n){return e.replace(t,n)}function vt(e,t,n){return e.indexOf(t,n)}function te(e,t){return e.charCodeAt(t)|0}function Ue(e,t,n){return e.slice(t,n)}function fe(e){return e.length}function eo(e){return e.length}function et(e,t){return t.push(e),e}function As(e,t){return e.map(t).join("")}function Hn(e,t){return e.filter(function(n){return!ve(n,t)})}var At=1,qe=1,to=0,he=0,Q=0,Qe="";function Nt(e,t,n,r,o,i,a,d){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:At,column:qe,length:a,return:"",siblings:d}}function Re(e,t){return on(Nt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function We(e){for(;e.root;)e=Re(e.root,{children:[e]});et(e,e.siblings)}function Ns(){return Q}function Ds(){return Q=he>0?te(Qe,--he):0,qe--,Q===10&&(qe=1,At--),Q}function pe(){return Q=he<to?te(Qe,he++):0,qe++,Q===10&&(qe=1,At++),Q}function Ae(){return te(Qe,he)}function wt(){return he}function Dt(e,t){return Ue(Qe,e,t)}function sn(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Os(e){return At=qe=1,to=fe(Qe=e),he=0,[]}function Fs(e){return Qe="",e}function Ut(e){return Zr(Dt(he-1,an(e===91?e+2:e===40?e+1:e)))}function Bs(e){for(;(Q=Ae())&&Q<33;)pe();return sn(e)>2||sn(Q)>3?"":" "}function Ws(e,t){for(;--t&&pe()&&!(Q<48||Q>102||Q>57&&Q<65||Q>70&&Q<97););return Dt(e,wt()+(t<6&&Ae()==32&&pe()==32))}function an(e){for(;pe();)switch(Q){case e:return he;case 34:case 39:e!==34&&e!==39&&an(Q);break;case 40:e===41&&an(e);break;case 92:pe();break}return he}function Hs(e,t){for(;pe()&&e+Q!==57;)if(e+Q===84&&Ae()===47)break;return"/*"+Dt(t,he-1)+"*"+Sn(e===47?e:pe())}function _s(e){for(;!sn(Ae());)pe();return Dt(e,he)}function Gs(e){return Fs(kt("",null,null,null,[""],e=Os(e),0,[0],e))}function kt(e,t,n,r,o,i,a,d,c){for(var l=0,p=0,u=a,f=0,g=0,v=0,b=1,k=1,y=1,j=0,R="",P=o,M=i,D=r,I=R;k;)switch(v=j,j=pe()){case 40:if(v!=108&&te(I,u-1)==58){vt(I+=O(Ut(j),"&","&\f"),"&\f",Qr(l?d[l-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:I+=Ut(j);break;case 9:case 10:case 13:case 32:I+=Bs(v);break;case 92:I+=Ws(wt()-1,7);continue;case 47:switch(Ae()){case 42:case 47:et(Us(Hs(pe(),wt()),t,n,c),c);break;default:I+="/"}break;case 123*b:d[l++]=fe(I)*y;case 125*b:case 59:case 0:switch(j){case 0:case 125:k=0;case 59+p:y==-1&&(I=O(I,/\f/g,"")),g>0&&fe(I)-u&&et(g>32?Gn(I+";",r,n,u-1,c):Gn(O(I," ","")+";",r,n,u-2,c),c);break;case 59:I+=";";default:if(et(D=_n(I,t,n,l,p,o,d,R,P=[],M=[],u,i),i),j===123)if(p===0)kt(I,t,D,D,P,i,u,d,M);else switch(f===99&&te(I,3)===110?100:f){case 100:case 108:case 109:case 115:kt(e,D,D,r&&et(_n(e,D,D,0,0,o,d,R,o,P=[],u,M),M),o,M,u,d,r?P:M);break;default:kt(I,D,D,D,[""],M,0,d,M)}}l=p=g=0,b=y=1,R=I="",u=a;break;case 58:u=1+fe(I),g=v;default:if(b<1){if(j==123)--b;else if(j==125&&b++==0&&Ds()==125)continue}switch(I+=Sn(j),j*b){case 38:y=p>0?1:(I+="\f",-1);break;case 44:d[l++]=(fe(I)-1)*y,y=1;break;case 64:Ae()===45&&(I+=Ut(pe())),f=Ae(),p=u=fe(R=I+=_s(wt())),j++;break;case 45:v===45&&fe(I)==2&&(b=0)}}return i}function _n(e,t,n,r,o,i,a,d,c,l,p,u){for(var f=o-1,g=o===0?i:[""],v=eo(g),b=0,k=0,y=0;b<r;++b)for(var j=0,R=Ue(e,f+1,f=Qr(k=a[b])),P=e;j<v;++j)(P=Zr(k>0?g[j]+" "+R:O(R,/&\f/g,g[j])))&&(c[y++]=P);return Nt(e,t,n,o===0?It:d,c,l,p,u)}function Us(e,t,n,r){return Nt(e,t,n,Jr,Sn(Ns()),Ue(e,2,-2),0,r)}function Gn(e,t,n,r,o){return Nt(e,t,n,Cn,Ue(e,0,r),Ue(e,r+1,-1),r,o)}function no(e,t,n){switch(Is(e,t)){case 5103:return G+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return G+e+e;case 4789:return it+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return G+e+it+e+V+e+e;case 5936:switch(te(e,t+11)){case 114:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return G+e+V+e+e;case 6165:return G+e+V+"flex-"+e+e;case 5187:return G+e+O(e,/(\w+).+(:[^]+)/,G+"box-$1$2"+V+"flex-$1$2")+e;case 5443:return G+e+V+"flex-item-"+O(e,/flex-|-self/g,"")+(ve(e,/flex-|baseline/)?"":V+"grid-row-"+O(e,/flex-|-self/g,""))+e;case 4675:return G+e+V+"flex-line-pack"+O(e,/align-content|flex-|-self/g,"")+e;case 5548:return G+e+V+O(e,"shrink","negative")+e;case 5292:return G+e+V+O(e,"basis","preferred-size")+e;case 6060:return G+"box-"+O(e,"-grow","")+G+e+V+O(e,"grow","positive")+e;case 4554:return G+O(e,/([^-])(transform)/g,"$1"+G+"$2")+e;case 6187:return O(O(O(e,/(zoom-|grab)/,G+"$1"),/(image-set)/,G+"$1"),e,"")+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,G+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,G+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+G+e+e;case 4200:if(!ve(e,/flex-|baseline/))return V+"grid-column-align"+Ue(e,t)+e;break;case 2592:case 3360:return V+O(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ve(r.props,/grid-\w+-end/)})?~vt(e+(n=n[t].value),"span",0)?e:V+O(e,"-start","")+e+V+"grid-row-span:"+(~vt(n,"span",0)?ve(n,/\d+/):+ve(n,/\d+/)-+ve(e,/\d+/))+";":V+O(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ve(r.props,/grid-\w+-start/)})?e:V+O(O(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,G+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(fe(e)-1-t>6)switch(te(e,t+1)){case 109:if(te(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,"$1"+G+"$2-$3$1"+it+(te(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~vt(e,"stretch",0)?no(O(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,i,a,d,c,l){return V+o+":"+i+l+(a?V+o+"-span:"+(d?c:+c-+i)+l:"")+e});case 4949:if(te(e,t+6)===121)return O(e,":",":"+G)+e;break;case 6444:switch(te(e,te(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+G+(te(e,14)===45?"inline-":"")+"box$3$1"+G+"$2$3$1"+V+"$2box$3")+e;case 100:return O(e,":",":"+V)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,"scroll-","scroll-snap-")+e}return e}function jt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function qs(e,t,n,r){switch(e.type){case Ls:if(e.children.length)break;case zs:case Cn:return e.return=e.return||e.value;case Jr:return"";case Xr:return e.return=e.value+"{"+jt(e.children,r)+"}";case It:if(!fe(e.value=e.props.join(",")))return""}return fe(n=jt(e.children,r))?e.return=e.value+"{"+n+"}":""}function Ys(e){var t=eo(e);return function(n,r,o,i){for(var a="",d=0;d<t;d++)a+=e[d](n,r,o,i)||"";return a}}function Vs(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ks(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Cn:e.return=no(e.value,e.length,n);return;case Xr:return jt([Re(e,{value:O(e.value,"@","@"+G)})],r);case It:if(e.length)return As(n=e.props,function(o){switch(ve(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":We(Re(e,{props:[O(o,/:(read-\w+)/,":"+it+"$1")]})),We(Re(e,{props:[o]})),on(e,{props:Hn(n,r)});break;case"::placeholder":We(Re(e,{props:[O(o,/:(plac\w+)/,":"+G+"input-$1")]})),We(Re(e,{props:[O(o,/:(plac\w+)/,":"+it+"$1")]})),We(Re(e,{props:[O(o,/:(plac\w+)/,V+"input-$1")]})),We(Re(e,{props:[o]})),on(e,{props:Hn(n,r)});break}return""})}}var Js={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},de={},Ye=typeof process<"u"&&de!==void 0&&(de.REACT_APP_SC_ATTR||de.SC_ATTR)||"data-styled",ro="active",oo="data-styled-version",Ot="6.1.19",Pn=`/*!sc*/
`,Rt=typeof window<"u"&&typeof document<"u",Xs=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&de!==void 0&&de.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&de.REACT_APP_SC_DISABLE_SPEEDY!==""?de.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&de.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&de!==void 0&&de.SC_DISABLE_SPEEDY!==void 0&&de.SC_DISABLE_SPEEDY!==""&&de.SC_DISABLE_SPEEDY!=="false"&&de.SC_DISABLE_SPEEDY),Qs={},Ft=Object.freeze([]),Ve=Object.freeze({});function io(e,t,n){return n===void 0&&(n=Ve),e.theme!==n.theme&&e.theme||t||n.theme}var so=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Zs=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ea=/(^-|-$)/g;function Un(e){return e.replace(Zs,"-").replace(ea,"")}var ta=/(a)(d)/gi,ft=52,qn=function(e){return String.fromCharCode(e+(e>25?39:97))};function cn(e){var t,n="";for(t=Math.abs(e);t>ft;t=t/ft|0)n=qn(t%ft)+n;return(qn(t%ft)+n).replace(ta,"$1-$2")}var qt,ao=5381,He=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},co=function(e){return He(ao,e)};function lo(e){return cn(co(e)>>>0)}function na(e){return e.displayName||e.name||"Component"}function Yt(e){return typeof e=="string"&&!0}var uo=typeof Symbol=="function"&&Symbol.for,ho=uo?Symbol.for("react.memo"):60115,ra=uo?Symbol.for("react.forward_ref"):60112,oa={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ia={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},po={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},sa=((qt={})[ra]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},qt[ho]=po,qt);function Yn(e){return("type"in(t=e)&&t.type.$$typeof)===ho?po:"$$typeof"in e?sa[e.$$typeof]:oa;var t}var aa=Object.defineProperty,ca=Object.getOwnPropertyNames,Vn=Object.getOwnPropertySymbols,la=Object.getOwnPropertyDescriptor,da=Object.getPrototypeOf,Kn=Object.prototype;function mo(e,t,n){if(typeof t!="string"){if(Kn){var r=da(t);r&&r!==Kn&&mo(e,r,n)}var o=ca(t);Vn&&(o=o.concat(Vn(t)));for(var i=Yn(e),a=Yn(t),d=0;d<o.length;++d){var c=o[d];if(!(c in ia||n&&n[c]||a&&c in a||i&&c in i)){var l=la(t,c);try{aa(e,c,l)}catch{}}}}return e}function Ne(e){return typeof e=="function"}function jn(e){return typeof e=="object"&&"styledComponentId"in e}function Ie(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ln(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function ct(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function dn(e,t,n){if(n===void 0&&(n=!1),!n&&!ct(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=dn(e[r],t[r]);else if(ct(t))for(var r in t)e[r]=dn(e[r],t[r]);return e}function Rn(e,t){Object.defineProperty(e,"toString",{value:t})}function De(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ua=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,i=o;t>=i;)if((i<<=1)<0)throw De(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(r),this.length=i;for(var a=o;a<i;a++)this.groupSizes[a]=0}for(var d=this.indexOfGroup(t+1),c=(a=0,n.length);a<c;a++)this.tag.insertRule(d,n[a])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var i=r;i<o;i++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),i=o+r,a=o;a<i;a++)n+="".concat(this.tag.getRule(a)).concat(Pn);return n},e}(),Ct=new Map,Et=new Map,St=1,gt=function(e){if(Ct.has(e))return Ct.get(e);for(;Et.has(St);)St++;var t=St++;return Ct.set(e,t),Et.set(t,e),t},ha=function(e,t){St=t+1,Ct.set(e,t),Et.set(t,e)},pa="style[".concat(Ye,"][").concat(oo,'="').concat(Ot,'"]'),ma=new RegExp("^".concat(Ye,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),fa=function(e,t,n){for(var r,o=n.split(","),i=0,a=o.length;i<a;i++)(r=o[i])&&e.registerName(t,r)},ga=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Pn),o=[],i=0,a=r.length;i<a;i++){var d=r[i].trim();if(d){var c=d.match(ma);if(c){var l=0|parseInt(c[1],10),p=c[2];l!==0&&(ha(p,l),fa(e,p,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(d)}}},Jn=function(e){for(var t=document.querySelectorAll(pa),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Ye)!==ro&&(ga(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function ya(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var fo=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(d){var c=Array.from(d.querySelectorAll("style[".concat(Ye,"]")));return c[c.length-1]}(n),i=o!==void 0?o.nextSibling:null;r.setAttribute(Ye,ro),r.setAttribute(oo,Ot);var a=ya();return a&&r.setAttribute("nonce",a),n.insertBefore(r,i),r},xa=function(){function e(t){this.element=fo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,i=r.length;o<i;o++){var a=r[o];if(a.ownerNode===n)return a}throw De(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),ba=function(){function e(t){this.element=fo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),$a=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Xn=Rt,va={isServer:!Rt,useCSSOMInjection:!Xs},Mt=function(){function e(t,n,r){t===void 0&&(t=Ve),n===void 0&&(n={});var o=this;this.options=ne(ne({},va),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Rt&&Xn&&(Xn=!1,Jn(this)),Rn(this,function(){return function(i){for(var a=i.getTag(),d=a.length,c="",l=function(u){var f=function(y){return Et.get(y)}(u);if(f===void 0)return"continue";var g=i.names.get(f),v=a.getGroup(u);if(g===void 0||!g.size||v.length===0)return"continue";var b="".concat(Ye,".g").concat(u,'[id="').concat(f,'"]'),k="";g!==void 0&&g.forEach(function(y){y.length>0&&(k+="".concat(y,","))}),c+="".concat(v).concat(b,'{content:"').concat(k,'"}').concat(Pn)},p=0;p<d;p++)l(p);return c}(o)})}return e.registerId=function(t){return gt(t)},e.prototype.rehydrate=function(){!this.server&&Rt&&Jn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(ne(ne({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new $a(o):r?new xa(o):new ba(o)}(this.options),new ua(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(gt(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(gt(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(gt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),wa=/&/g,ka=/^\s*\/\/.*$/gm;function go(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=go(n.children,t)),n})}function Ca(e){var t,n,r,o=Ve,i=o.options,a=i===void 0?Ve:i,d=o.plugins,c=d===void 0?Ft:d,l=function(f,g,v){return v.startsWith(n)&&v.endsWith(n)&&v.replaceAll(n,"").length>0?".".concat(t):f},p=c.slice();p.push(function(f){f.type===It&&f.value.includes("&")&&(f.props[0]=f.props[0].replace(wa,n).replace(r,l))}),a.prefix&&p.push(Ks),p.push(qs);var u=function(f,g,v,b){g===void 0&&(g=""),v===void 0&&(v=""),b===void 0&&(b="&"),t=b,n=g,r=new RegExp("\\".concat(n,"\\b"),"g");var k=f.replace(ka,""),y=Gs(v||g?"".concat(v," ").concat(g," { ").concat(k," }"):k);a.namespace&&(y=go(y,a.namespace));var j=[];return jt(y,Ys(p.concat(Vs(function(R){return j.push(R)})))),j};return u.hash=c.length?c.reduce(function(f,g){return g.name||De(15),He(f,g.name)},ao).toString():"",u}var Sa=new Mt,un=Ca(),yo=re.createContext({shouldForwardProp:void 0,styleSheet:Sa,stylis:un});yo.Consumer;re.createContext(void 0);function hn(){return h.useContext(yo)}var Pa=function(){function e(t,n){var r=this;this.inject=function(o,i){i===void 0&&(i=un);var a=r.name+i.hash;o.hasNameForId(r.id,a)||o.insertRules(r.id,a,i(r.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Rn(this,function(){throw De(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=un),this.name+t.hash},e}(),ja=function(e){return e>="A"&&e<="Z"};function Qn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;ja(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var xo=function(e){return e==null||e===!1||e===""},bo=function(e){var t,n,r=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!xo(i)&&(Array.isArray(i)&&i.isCss||Ne(i)?r.push("".concat(Qn(o),":"),i,";"):ct(i)?r.push.apply(r,at(at(["".concat(o," {")],bo(i),!1),["}"],!1)):r.push("".concat(Qn(o),": ").concat((t=o,(n=i)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in Js||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Ee(e,t,n,r){if(xo(e))return[];if(jn(e))return[".".concat(e.styledComponentId)];if(Ne(e)){if(!Ne(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return Ee(o,t,n,r)}var i;return e instanceof Pa?n?(e.inject(n,r),[e.getName(r)]):[e]:ct(e)?bo(e):Array.isArray(e)?Array.prototype.concat.apply(Ft,e.map(function(a){return Ee(a,t,n,r)})):[e.toString()]}function $o(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ne(n)&&!jn(n))return!1}return!0}var Ra=co(Ot),Ea=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&$o(t),this.componentId=n,this.baseHash=He(Ra,n),this.baseStyle=r,Mt.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=Ie(o,this.staticRulesId);else{var i=ln(Ee(this.rules,t,n,r)),a=cn(He(this.baseHash,i)>>>0);if(!n.hasNameForId(this.componentId,a)){var d=r(i,".".concat(a),void 0,this.componentId);n.insertRules(this.componentId,a,d)}o=Ie(o,a),this.staticRulesId=a}else{for(var c=He(this.baseHash,r.hash),l="",p=0;p<this.rules.length;p++){var u=this.rules[p];if(typeof u=="string")l+=u;else if(u){var f=ln(Ee(u,t,n,r));c=He(c,f+p),l+=f}}if(l){var g=cn(c>>>0);n.hasNameForId(this.componentId,g)||n.insertRules(this.componentId,g,r(l,".".concat(g),void 0,this.componentId)),o=Ie(o,g)}}return o},e}(),lt=re.createContext(void 0);lt.Consumer;function Ma(e){var t=re.useContext(lt),n=h.useMemo(function(){return function(r,o){if(!r)throw De(14);if(Ne(r)){var i=r(o);return i}if(Array.isArray(r)||typeof r!="object")throw De(8);return o?ne(ne({},o),r):r}(e.theme,t)},[e.theme,t]);return e.children?re.createElement(lt.Provider,{value:n},e.children):null}var Vt={};function Ta(e,t,n){var r=jn(e),o=e,i=!Yt(e),a=t.attrs,d=a===void 0?Ft:a,c=t.componentId,l=c===void 0?function(P,M){var D=typeof P!="string"?"sc":Un(P);Vt[D]=(Vt[D]||0)+1;var I="".concat(D,"-").concat(lo(Ot+D+Vt[D]));return M?"".concat(M,"-").concat(I):I}(t.displayName,t.parentComponentId):c,p=t.displayName,u=p===void 0?function(P){return Yt(P)?"styled.".concat(P):"Styled(".concat(na(P),")")}(e):p,f=t.displayName&&t.componentId?"".concat(Un(t.displayName),"-").concat(t.componentId):t.componentId||l,g=r&&o.attrs?o.attrs.concat(d).filter(Boolean):d,v=t.shouldForwardProp;if(r&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var k=t.shouldForwardProp;v=function(P,M){return b(P,M)&&k(P,M)}}else v=b}var y=new Ea(n,f,r?o.componentStyle:void 0);function j(P,M){return function(D,I,_){var W=D.attrs,x=D.componentStyle,$=D.defaultProps,w=D.foldedComponentIds,S=D.styledComponentId,A=D.target,H=re.useContext(lt),U=hn(),K=D.shouldForwardProp||U.shouldForwardProp,le=io(I,H,$)||Ve,q=function($e,C,N){for(var L,T=ne(ne({},C),{className:void 0,theme:N}),z=0;z<$e.length;z+=1){var E=Ne(L=$e[z])?L(T):L;for(var B in E)T[B]=B==="className"?Ie(T[B],E[B]):B==="style"?ne(ne({},T[B]),E[B]):E[B]}return C.className&&(T.className=Ie(T.className,C.className)),T}(W,I,le),se=q.as||A,ee={};for(var ae in q)q[ae]===void 0||ae[0]==="$"||ae==="as"||ae==="theme"&&q.theme===le||(ae==="forwardedAs"?ee.as=q.forwardedAs:K&&!K(ae,se)||(ee[ae]=q[ae]));var be=function($e,C){var N=hn(),L=$e.generateAndInjectStyles(C,N.styleSheet,N.stylis);return L}(x,q),Se=Ie(w,S);return be&&(Se+=" "+be),q.className&&(Se+=" "+q.className),ee[Yt(se)&&!so.has(se)?"class":"className"]=Se,_&&(ee.ref=_),h.createElement(se,ee)}(R,P,M)}j.displayName=u;var R=re.forwardRef(j);return R.attrs=g,R.componentStyle=y,R.displayName=u,R.shouldForwardProp=v,R.foldedComponentIds=r?Ie(o.foldedComponentIds,o.styledComponentId):"",R.styledComponentId=f,R.target=r?o.target:e,Object.defineProperty(R,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=r?function(M){for(var D=[],I=1;I<arguments.length;I++)D[I-1]=arguments[I];for(var _=0,W=D;_<W.length;_++)dn(M,W[_],!0);return M}({},o.defaultProps,P):P}}),Rn(R,function(){return".".concat(R.styledComponentId)}),i&&mo(R,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),R}function Zn(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var er=function(e){return Object.assign(e,{isCss:!0})};function ge(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ne(e)||ct(e))return er(Ee(Zn(Ft,at([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Ee(r):er(Ee(Zn(r,t)))}function pn(e,t,n){if(n===void 0&&(n=Ve),!t)throw De(1,t);var r=function(o){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,n,ge.apply(void 0,at([o],i,!1)))};return r.attrs=function(o){return pn(e,t,ne(ne({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return pn(e,t,ne(ne({},n),o))},r}var vo=function(e){return pn(Ta,e)},m=vo;so.forEach(function(e){m[e]=vo(e)});var za=function(){function e(t,n){this.rules=t,this.componentId=n,this.isStatic=$o(t),Mt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,n,r,o){var i=o(ln(Ee(this.rules,n,r,o)),""),a=this.componentId+t;r.insertRules(a,a,i)},e.prototype.removeStyles=function(t,n){n.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,n,r,o){t>2&&Mt.registerId(this.componentId+t),this.removeStyles(t,r),this.createStyles(t,n,r,o)},e}();function La(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=ge.apply(void 0,at([e],t,!1)),o="sc-global-".concat(lo(JSON.stringify(r))),i=new za(r,o),a=function(c){var l=hn(),p=re.useContext(lt),u=re.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&d(u,c,l.styleSheet,p,l.stylis),re.useLayoutEffect(function(){if(!l.styleSheet.server)return d(u,c,l.styleSheet,p,l.stylis),function(){return i.removeStyles(u,l.styleSheet)}},[u,c,l.styleSheet,p,l.stylis]),null};function d(c,l,p,u,f){if(i.isStatic)i.renderStyles(c,Qs,p,f);else{var g=ne(ne({},l),{theme:io(l,u,a.defaultProps)});i.renderStyles(c,g,p,f)}}return re.memo(a)}const wo=h.createContext(void 0),ko=()=>{const e=h.useContext(wo);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ia=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Aa=Z(({children:e})=>{const t=Ke(),n=t.preferences.theme||"system",o=n==="system"?Ia():n,i=Ms[o]||Ts,a={theme:i,themeName:o,themePreference:n,setTheme:d=>{t.updatePreference("theme",d)},toggleTheme:()=>{const d=o==="light"?"dark":"light";t.updatePreference("theme",d)},isDarkMode:o==="dark"};return h.useEffect(()=>{if(n==="system"&&typeof window<"u"&&window.matchMedia){const d=window.matchMedia("(prefers-color-scheme: dark)"),c=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return d.addEventListener("change",c),()=>d.removeEventListener("change",c)}},[n,t]),h.useEffect(()=>{if(typeof document<"u"){const d=document.documentElement;Object.entries(i.colors).forEach(([c,l])=>{d.style.setProperty(`--color-${c}`,l)}),Object.entries(i.spacing).forEach(([c,l])=>{d.style.setProperty(`--spacing-${c}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[i,o]),s.jsx(wo.Provider,{value:a,children:s.jsx(Ma,{theme:i,children:e})})});function Na(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Da(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var Kt=typeof window<"u",Oa=function(e){h.useEffect(e,[])},Fa=function(e){var t=h.useRef(e);t.current=e,Oa(function(){return function(){return t.current()}})},Ba=function(e){var t=h.useRef(0),n=h.useState(e),r=n[0],o=n[1],i=h.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Fa(function(){cancelAnimationFrame(t.current)}),[r,i]},Co=function(e){var t={},n=t.initialWidth,r=n===void 0?1/0:n,o=t.initialHeight,i=o===void 0?1/0:o,a=t.onChange,d=Ba({width:Kt?window.innerWidth:r,height:Kt?window.innerHeight:i}),c=d[0],l=d[1];return h.useEffect(function(){if(Kt){var p=function(){var u=window.innerWidth,f=window.innerHeight;l({width:u,height:f}),a&&a(u,f)};return Na(window,"resize",p),function(){Da(window,"resize",p)}}},[]),c};const So=()=>{const{width:e=0,height:t=0}=Co();return{width:e,height:t}},Wa=()=>{const{width:e=0,height:t=0}=Co();return e>t?"landscape":"portrait"},Ha=()=>{const{width:e}=So(),{theme:t}=ko(),n={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=n.large?"large":e>=n.desktop?"desktop":e>=n.tablet?"tablet":e>=n.mobileLandscape?"mobileLandscape":"mobilePortrait"},_a=()=>{const[e,t]=h.useState(!1);return h.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Bt=()=>{const e=So(),t=Wa(),n=Ha(),r=_a();return{orientation:t,breakpoint:n,dimensions:e,isMobile:n==="mobilePortrait"||n==="mobileLandscape",isTablet:n==="tablet",isDesktop:n==="desktop"||n==="large",isTouch:r}},Ga=h.createContext(void 0),Ua=({children:e})=>{const t=Ke(),n=Bt(),[r,o]=h.useState(!0),[i,a]=h.useState(["chat","moves"]),[d,c]=h.useState(!1),l=t.preferences.layout,p=h.useMemo(()=>l==="auto"?n.orientation:l,[l,n.orientation]),u=h.useMemo(()=>n.isMobile||n.dimensions.width<768,[n.isMobile,n.dimensions.width]),f=b=>{t.updatePreference("layout",b)},g=b=>{a(k=>k.includes(b)?k.filter(y=>y!==b):[...k,b])};h.useEffect(()=>{c(!0),o(k=>{const y=!u;return k!==y?y:k}),a(k=>{if(u&&p==="portrait"){const y=["chat"];return JSON.stringify(k)!==JSON.stringify(y)?y:k}else if(p==="landscape"&&!u){const y=["chat","moves","analysis"];return JSON.stringify(k)!==JSON.stringify(y)?y:k}return k});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[p,u]);const v={...n,layoutPreference:l,setLayoutPreference:f,activeLayout:p,isCompactMode:u,showSidebar:r,setSidebarVisible:o,activePanels:i,togglePanel:g,isTransitioning:d};return s.jsx(Ga.Provider,{value:v,children:e})};m.div`
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
`;const qa=m.header`
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
`,Ya=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Va=m.button`
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
`,Ka=m.img`
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
`;const Ja=m.div`
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
`,Xt=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Qt=m.div`
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
`,Po=Z(({onMenuClick:e})=>{const{preferencesStore:t}=Oe(),{viewMode:n,chessOrientation:r}=t.preferences,{themePreference:o,setTheme:i}=ko(),a=p=>{t.updatePreference("viewMode",p)},d=p=>{t.updatePreference("chessOrientation",p)},c=p=>{i(p)},l=n==="chat-only";return s.jsxs(qa,{children:[s.jsxs(Ya,{children:[s.jsx(Va,{onClick:e,"aria-label":"Menu",children:"☰"}),s.jsx(Ka,{src:"/simpleficsinterface.svg",alt:"Simple FICS Interface",title:"Simple FICS Interface"})]}),s.jsxs(Ja,{children:[s.jsxs(Jt,{children:[s.jsx(Xt,{children:"Theme:"}),s.jsxs(Qt,{children:[s.jsx(Pe,{$isActive:o==="light",onClick:()=>c("light"),title:"Light Theme",children:"☀"}),s.jsx(Pe,{$isActive:o==="dark",onClick:()=>c("dark"),title:"Dark Theme",children:"☾"}),s.jsx(Pe,{$isActive:o==="system",onClick:()=>c("system"),title:"System Theme",children:"◐"})]})]}),s.jsxs(Jt,{children:[s.jsx(Xt,{children:"Orient:"}),s.jsxs(Qt,{children:[s.jsx(Pe,{$isActive:r==="landscape",$isDisabled:l,onClick:()=>!l&&d("landscape"),disabled:l,title:"Landscape",children:"▭"}),s.jsx(Pe,{$isActive:r==="portrait",$isDisabled:l,onClick:()=>!l&&d("portrait"),disabled:l,title:"Portrait",children:"▯"})]})]}),s.jsxs(Jt,{children:[s.jsx(Xt,{children:"Mode:"}),s.jsxs(Qt,{children:[s.jsx(Pe,{$isActive:n==="chess-only",onClick:()=>a("chess-only"),title:"Chess Only",children:"♔"}),s.jsx(Pe,{$isActive:n==="chess-and-chat",onClick:()=>a("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),s.jsx(Pe,{$isActive:n==="chat-only",onClick:()=>a("chat-only"),title:"Chat Only",children:"▤"})]})]})]})]})});Po.displayName="AppHeader";const Xa=m.img`
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
`,Qa={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Me=({piece:e,size:t,isDragging:n=!1,style:r})=>{const o=Qa[e];if(!o)return null;const i=`/pieces/cburnett/${o}.svg`;return s.jsx(Xa,{className:"chess-piece",src:i,alt:o,$isDragging:n,draggable:!1,style:r})};Me.displayName="ChessPiece";const Za=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,ec=m.div`
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
`,tc=m.button`
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
`,jo=({isOpen:e,color:t,onSelect:n,onCancel:r,position:o})=>{if(!o)return null;const i=["Q","R","B","N"],a=d=>t==="white"?d:d.toLowerCase();return s.jsx(Za,{$isOpen:e,onClick:r,children:s.jsx(ec,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:i.map(d=>s.jsx(tc,{onClick:()=>n(d.toLowerCase()),children:s.jsx(Me,{piece:a(d),size:50})},d))})})};jo.displayName="PromotionDialog";const nc=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  user-select: none;
`,rc=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,oc=m.div`
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
`,tr=m.div`
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
`,ic=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,sc=m.div.attrs(e=>({style:{transform:`translate(
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
`,_e=["a","b","c","d","e","f","g","h"],Ge=["8","7","6","5","4","3","2","1"];function ac(e,t){return(e+t)%2===0}function cc(e,t,n){const r=n?_e[7-e]:_e[e],o=n?Ge[7-t]:Ge[t];return`${r}${o}`}function lc(e){const t=new Map,[n]=e.split(" ");return n.split("/").forEach((o,i)=>{let a=0;for(const d of o)if(d>="1"&&d<="8")a+=parseInt(d);else{const c=`${_e[a]}${Ge[i]}`;t.set(c,d),a++}}),t}const mn=Z(({position:e,size:t,flipped:n=!1,showCoordinates:r=!0,onMove:o,onDrop:i,highlightedSquares:a=new Set,lastMove:d,interactive:c=!0,onSizeCalculated:l,selectedCapturedPiece:p,onCapturedPieceSelect:u})=>{Bt();const f=Ke(),g=yn(),v=h.useRef(null),[b,k]=h.useState(t||200),[y,j]=h.useState(null),[R,P]=h.useState(new Set),[M,D]=h.useState(null),[I,_]=h.useState([]),W=h.useRef(),[x,$]=h.useState(null),[w,S]=h.useState(!1),A=h.useMemo(()=>lc(e),[e]),H=h.useRef(new Map),U=h.useCallback((C,N)=>{const L=_e.indexOf(C[0]),T=Ge.indexOf(C[1]),z=N/8,E=n?(7-L)*z:L*z,B=n?(7-T)*z:T*z;return{x:E,y:B}},[n]),K=h.useCallback((C,N,L)=>{const T=C.toLowerCase()==="p",z=L[1];return T&&(z==="8"||z==="1")},[]),le=h.useCallback(C=>{C.preventDefault(),g.isPlaying&&g.clearPremove()},[g]);h.useEffect(()=>{if(t){k(t);return}const C=()=>{if(!v.current)return;const E=v.current.parentElement;if(!E)return;const{width:B,height:F}=E.getBoundingClientRect();v.current.getBoundingClientRect();const X=16,Y=B-X,oe=F-X,ie=Math.floor(Math.min(Y,oe)),Te=Math.max(100,Math.floor(ie/8)*8);Te!==b&&(k(Te),l?.(Te))},N=setTimeout(C,50);C();let L;const T=()=>{clearTimeout(L),L=setTimeout(C,100)};window.addEventListener("resize",T);let z=null;return v.current&&v.current.parentElement&&(z=new ResizeObserver(()=>{T()}),z.observe(v.current.parentElement)),()=>{window.removeEventListener("resize",T),clearTimeout(L),clearTimeout(N),z&&z.disconnect()}},[t,b]);const q=b/8,se=h.useMemo(()=>{if(!f.preferences.animateMoves)return!1;if(g.isPlaying&&f.preferences.disableAnimationLowTime){const C=g.currentGame,N=g.playingColor;if(C&&N&&(N==="white"?C.white.time:C.black.time)<10)return!1}return!0},[f.preferences.animateMoves,f.preferences.disableAnimationLowTime,g.isPlaying,g.currentGame,g.playingColor]);h.useEffect(()=>{if(!se||w){H.current=new Map(A);return}const C=H.current,N=[];C.forEach((L,T)=>{A.has(T)||A.forEach((z,E)=>{z===L&&!C.has(E)&&d&&d.from===T&&d.to===E&&N.push({piece:L,from:T,to:E,startTime:Date.now()})})}),N.length>0&&_(L=>[...L,...N]),H.current=new Map(A)},[A,d,se,w]),h.useEffect(()=>{if(w){const C=setTimeout(()=>{S(!1)},50);return()=>clearTimeout(C)}},[e,w]),h.useEffect(()=>{if(I.length===0)return;const C=()=>{const N=Date.now(),L=f.preferences.animationDuration;_(T=>{const z=T.filter(E=>N-E.startTime<L);return z.length>0&&(W.current=requestAnimationFrame(C)),z})};return W.current=requestAnimationFrame(C),()=>{W.current&&cancelAnimationFrame(W.current)}},[I.length,f.preferences.animationDuration]),h.useEffect(()=>{if(p)try{const C=g.currentPosition;g.chessBoard.getFen()!==C&&g.chessBoard.loadFen(C);const L=g.chessBoard.getLegalMoves().filter(z=>z.from==="@"&&z.san.toLowerCase().startsWith(p.toLowerCase())),T=new Set(L.map(z=>z.to));P(T),j(null)}catch(C){console.error("Error getting drop moves:",C),P(new Set)}},[p,g]);const ee=h.useCallback((C,N)=>{if(!c)return;const L=A.get(C);if(p){R.has(C)?(i?.(p,C),u?.(null),P(new Set)):(u?.(null),P(new Set));return}if(y)if(R.has(C)){const T=A.get(y);if(T&&K(T,y,C)){const z=T===T.toUpperCase()?"white":"black";if(g.isPlaying){const E=f.preferences.autoPromotionPiece;g.isMyTurn?(S(!0),o?.(y,C,E)):g.setPremove(y,C,E)}else{const E=N?.currentTarget.getBoundingClientRect();$({from:y,to:C,color:z,position:E?{x:E.left+E.width/2,y:E.top+E.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else g.isPlaying&&!g.isMyTurn?g.setPremove(y,C):(S(!0),o?.(y,C));j(null),P(new Set)}else if(C===y)j(null),P(new Set);else if(L)if(j(C),f.preferences.showLegalMoves)try{const T=g.currentPosition;g.chessBoard.getFen()!==T&&g.chessBoard.loadFen(T);const z=g.chessBoard.getLegalMoves(C),E=new Set(z.map(B=>B.to));P(E)}catch(T){console.error("Error getting legal moves:",T),P(new Set)}else P(new Set);else j(null),P(new Set);else if(L){j(C);try{const T=g.currentPosition;g.chessBoard.getFen()!==T&&g.chessBoard.loadFen(T);const z=L===L.toUpperCase(),E=g.chessBoard.getActiveColor();if(z&&E==="w"||!z&&E==="b")if(f.preferences.showLegalMoves){const F=g.chessBoard.getLegalMoves(C),X=new Set(F.map(Y=>Y.to));P(X)}else P(new Set);else P(new Set),j(null)}catch(T){console.error("Error getting legal moves:",T),P(new Set)}}},[y,R,A,o,i,c,K,g,f.preferences.autoPromotionPiece,p,u]),ae=h.useCallback((C,N,L)=>{if(!c)return;const T=C.clientX,z=C.clientY;let E=!1,B=!1;const X=C.currentTarget.getBoundingClientRect().width,Y=ie=>{const Te=Math.abs(ie.clientX-T),Ht=Math.abs(ie.clientY-z);(Te>3||Ht>3)&&L&&!B?(E=!0,B=!0,be(N,L,ie,X)):B&&D(Be=>Be?{...Be,x:ie.clientX,y:ie.clientY}:null)},oe=ie=>{document.removeEventListener("mousemove",Y),document.removeEventListener("mouseup",oe),B?Se(ie,N,L):E?(D(null),j(null),P(new Set)):ee(N,C)};document.addEventListener("mousemove",Y),document.addEventListener("mouseup",oe)},[c,ee]),be=h.useCallback((C,N,L,T)=>{if(j(C),f.preferences.showLegalMoves)try{const E=g.currentPosition;g.chessBoard.getFen()!==E&&g.chessBoard.loadFen(E);const B=N===N.toUpperCase(),F=g.chessBoard.getActiveColor();if(B&&F==="w"||!B&&F==="b"){const Y=g.chessBoard.getLegalMoves(C),oe=new Set(Y.map(ie=>ie.to));P(oe)}else P(new Set)}catch(E){console.error("Error getting legal moves for drag:",E),P(new Set)}else P(new Set);const z={piece:N,from:C,x:L.clientX,y:L.clientY,size:T};D(z)},[f.preferences.showLegalMoves,g]),Se=h.useCallback((C,N,L)=>{try{const E=document.elementsFromPoint(C.clientX,C.clientY).find(B=>B.getAttribute("data-square"))?.getAttribute("data-square");if(E&&E!==N)if(K(L,N,E)){const B=L===L.toUpperCase()?"white":"black";if(g.isPlaying){const F=f.preferences.autoPromotionPiece;g.isMyTurn?(S(!0),o?.(N,E,F)):g.setPremove(N,E,F)}else $({from:N,to:E,color:B,position:{x:C.clientX,y:C.clientY}})}else g.isPlaying&&!g.isMyTurn?g.setPremove(N,E):(S(!0),o?.(N,E))}catch(T){console.error("Error in handleDragEnd:",T)}D(null),j(null),P(new Set)},[o,K,g,f.preferences.autoPromotionPiece]),$e=h.useMemo(()=>{const C=[];for(let N=0;N<8;N++)for(let L=0;L<8;L++){const T=ac(L,N),z=cc(L,N,n),E=A.get(z),B=a.has(z),F=d&&(d.from===z||d.to===z),X=y===z,Y=R.has(z),oe=M?.from===z,ie=I.some(Be=>Be.to===z),Te=r&&N===7,Ht=r&&L===0;C.push(s.jsxs(oc,{"data-square":z,$isLight:T,$isHighlighted:B,$isLastMoveSquare:!!F,$isSelected:X,$isPossibleMove:Y,onMouseDown:Be=>ae(Be,z,E),children:[E&&!oe&&!ie&&s.jsx(Me,{piece:E,size:q}),Te&&s.jsx(tr,{$type:"file",$isLight:T,$size:q,children:n?_e[7-L]:_e[L]}),Ht&&s.jsx(tr,{$type:"rank",$isLight:T,$size:q,children:n?Ge[7-N]:Ge[N]})]},z))}return C},[n,r,A,a,d,y,R,M,q,ee,ae]);return s.jsxs(s.Fragment,{children:[s.jsxs(nc,{ref:v,$size:b,onContextMenu:le,children:[s.jsx(rc,{children:$e}),I.map((C,N)=>{const L=U(C.from,b),T=U(C.to,b),z=Date.now()-C.startTime,E=f.preferences.animationDuration,B=Math.min(z/E,1),X=(Y=>Y<.5?4*Y*Y*Y:1-Math.pow(-2*Y+2,3)/2)(B);return s.jsx(sc,{$fromX:L.x,$fromY:L.y,$toX:T.x,$toY:T.y,$progress:X,$size:q,children:s.jsx(Me,{piece:C.piece,size:q})},`${C.from}-${C.to}-${C.startTime}`)})]}),M&&s.jsx(s.Fragment,{children:s.jsx(ic,{$x:M.x,$y:M.y,$size:M.size,children:s.jsx(Me,{piece:M.piece,size:M.size,isDragging:!0})})}),x&&s.jsx(jo,{isOpen:!0,color:x.color,position:x.position,onSelect:C=>{S(!0),o?.(x.from,x.to,C),$(null)},onCancel:()=>$(null)})]})});mn.displayName="ChessBoardWithPieces";const dc=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,Ro=m.span`
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
`,En=({time:e,size:t="medium",isActive:n=!1,lowTimeThreshold:r=30,showTenths:o=!1,className:i,compact:a=!1})=>{const d=l=>{const p=Math.floor(l/3600),u=Math.floor(l%3600/60),f=Math.floor(l%60),g=Math.floor(l%1*10),v=n&&Math.floor(l)%2===0?" ":":";return p>0?`${p}${v}${u.toString().padStart(2,"0")}${v}${f.toString().padStart(2,"0")}`:l<r&&o?`${u}${v}${f.toString().padStart(2,"0")}.${g}`:`${u}${v}${f.toString().padStart(2,"0")}`},c=e<=r&&e>0;return s.jsx(dc,{size:t,className:i,children:s.jsx(Ro,{$isLowTime:c,$isActive:n,$compact:a,children:d(e)})})},pt=m(En).attrs({size:"large"})`
    ${Ro} {
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
        background: ${({theme:e})=>e.colors.surface};
        font-size: 20px;
        
        &:hover {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.15);
        }
    }
`;m(En).attrs({size:"small"})`
    font-size: 12px;
`;m(En).attrs({size:"medium"})`
    font-size: 16px;
`;const uc=m.div`
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
`,hc=m.button`
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
`,pc=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Eo=Z(({playerName:e,position:t,onClose:n})=>{const r=Rr(),o=Ke(),i=h.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];h.useEffect(()=>{const c=p=>{i.current&&!i.current.contains(p.target)&&n()},l=p=>{p.key==="Escape"&&n()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[n]),h.useEffect(()=>{if(i.current){const c=i.current.getBoundingClientRect(),l=window.innerWidth,p=window.innerHeight;let u=t.x,f=t.y;c.right>l&&(u=l-c.width-10),c.bottom>p&&(f=p-c.height-10),(u!==t.x||f!==t.y)&&(i.current.style.left=`${u}px`,i.current.style.top=`${f}px`)}},[t]);const d=c=>{const l=c.replace("{player}",e);r.sendCommand(l),n()};return s.jsx(uc,{ref:i,$x:t.x,$y:t.y,children:a.map((c,l)=>"divider"in c&&c.divider?s.jsx(pc,{},l):"command"in c?s.jsx(hc,{onClick:()=>d(c.command),children:c.label},l):null)})});Eo.displayName="PlayerContextMenu";const mc=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Wt=({name:e,className:t,style:n})=>{const[r,o]=h.useState(null),i=a=>{a.preventDefault(),a.stopPropagation(),o({x:a.clientX,y:a.clientY})};return s.jsxs(s.Fragment,{children:[s.jsx(mc,{className:t,style:n,onClick:i,children:e}),r&&s.jsx(Eo,{playerName:e,position:r,onClose:()=>o(null)})]})};Wt.displayName="PlayerName";const fc=m.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.$compact?"2px":e.theme.spacing[1]};
  padding: ${e=>e.$compact?"4px 8px":e.theme.spacing[2]};
  background-color: ${e=>e.$isActive?e.theme.colors.surface:e.theme.colors.backgroundTertiary};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.$isActive?e.theme.shadows.md:e.theme.shadows.sm};
  border: 2px solid transparent;
  transition: all ${e=>e.theme.transitions.fast};
  width: 100%;
  position: relative;
`,gc=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,yc=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,xc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,bc=m.div`
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
`;const tt=Z(({name:e,rating:t,time:n,isActive:r,isWhite:o,orientation:i="horizontal",hideClockInCard:a=!1,onlyInfo:d=!1,compact:c=!1})=>{const l=s.jsxs(s.Fragment,{children:[s.jsx(gc,{children:s.jsxs(yc,{children:[s.jsx(xc,{children:s.jsx(Wt,{name:e})}),s.jsx(bc,{children:t})]})}),!a&&!d&&s.jsx(pt,{time:n,isActive:r,showTenths:n<10,lowTimeThreshold:30,size:i==="horizontal"?"medium":"small"})]});return d?l:s.jsx(fc,{$isActive:r,$orientation:i,$compact:c,children:l})});tt.displayName="PlayerCard";const $c=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
  overflow: hidden;
`,Zt=m.div`
  padding: ${e=>e.theme.spacing[2]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[3]};
`,en=m.div`
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
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  font-size: 10px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.border};
  }
  
  &:active {
    transform: scale(0.9);
  }
`,vc=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,nr=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,wc=m.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,rr=m.span`
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
`,Mn=Z(({moves:e,currentMoveIndex:t,onMoveClick:n,onNavigate:r,showHeader:o=!0,extraControls:i,className:a,disableAutoScroll:d=!1})=>{const c=h.useRef(null);h.useEffect(()=>{if(!d&&c.current&&t!==void 0){const p=c.current.querySelector(`[data-move-index="${t}"]`);p&&p.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const l=()=>{const p=[];for(let u=0;u<e.length;u+=2){const f=Math.floor(u/2)+1,g=e[u],v=e[u+1];p.push(s.jsxs(nr,{children:[s.jsxs(wc,{children:[f,"."]}),s.jsx(rr,{$isCurrentMove:t===u,onClick:()=>n?.(u),"data-move-index":u,children:tn(g.san)}),v&&s.jsx(rr,{$isCurrentMove:t===u+1,onClick:()=>n?.(u+1),"data-move-index":u+1,children:tn(v.san)})]},u))}return p};return s.jsxs($c,{className:a,children:[o?s.jsx(Zt,{children:s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("span",{children:"Moves"}),s.jsxs(en,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})]})})}):i?s.jsxs(Zt,{children:[i,s.jsxs(en,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})]}):s.jsx(Zt,{children:s.jsxs(en,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})}),s.jsx(vc,{ref:c,children:e.length===0?s.jsx(nr,{children:s.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});Mn.displayName="MoveList";const kc=m(pt)`
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
`,Cc=m(pt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`,nt=Z(({player:e,isActive:t,size:n="small",compact:r=!0,variant:o="portrait"})=>{const i=o==="landscape"?Cc:kc;return s.jsx(i,{time:e.time,isActive:t,showTenths:e.time<10,lowTimeThreshold:30,size:n,compact:r})});nt.displayName="ObservableClock";const Sc=m.div`
  position: relative;
  display: inline-block;
`,Pc=m.button`
  width: ${e=>e.$size==="small"?"36px":"44px"};
  height: ${e=>e.$size==="small"?"36px":"44px"};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${e=>e.theme.transitions.fast};
  padding: 4px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    border-color: ${e=>e.theme.colors.primary};
  }
  
  &:active {
    transform: scale(0.95);
  }
`,jc=m.div`
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
`,Rc=m.button`
  width: ${e=>e.$size==="small"?"32px":"40px"};
  height: ${e=>e.$size==="small"?"32px":"40px"};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    border-color: ${e=>e.theme.colors.primary};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`,Tn=Z(({color:e,size:t="small"})=>{const n=Ke(),[r,o]=h.useState(!1),i=h.useRef(null),a=["Q","R","B","N"],d=n.preferences.autoPromotionPiece,c=u=>e==="white"?u:u.toLowerCase();h.useEffect(()=>{const u=f=>{i.current&&!i.current.contains(f.target)&&o(!1)};if(r)return document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[r]);const l=u=>{n.updatePreference("autoPromotionPiece",u),o(!1)},p=t==="small"?28:36;return s.jsxs(Sc,{ref:i,children:[s.jsx(Pc,{$size:t,onClick:()=>o(!r),title:"Select promotion piece",children:s.jsx(Me,{piece:c(d),size:p})}),s.jsx(jc,{$isOpen:r,children:a.map(u=>s.jsx(Rc,{$size:t,onClick:()=>l(u),title:`Promote to ${u==="Q"?"Queen":u==="R"?"Rook":u==="B"?"Bishop":"Knight"}`,children:s.jsx(Me,{piece:c(u),size:p})},u))})]})});Tn.displayName="PromotionPieceSelector";const Ec=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[3]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,ce=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[3]};
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
          background-color: ${e.theme.colors.backgroundTertiary};
          color: ${e.theme.colors.text};
          &:hover {
            background-color: ${e.theme.colors.border};
          }
        `}}}
  
  &:active {
    transform: scale(0.95);
  }
`,Mo=Z(({perspective:e,onDraw:t,onResign:n,onAbort:r,onAnalysis:o,onUnobserve:i,onUnexamine:a,onSetupFEN:d,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:p,canAbort:u,className:f})=>{const g=yn(),v=()=>s.jsxs(s.Fragment,{children:[u&&s.jsx(ce,{onClick:r,$variant:"secondary",children:"Abort"}),s.jsx(ce,{onClick:t,$variant:"secondary",children:"Draw"}),s.jsx(ce,{onClick:n,$variant:"secondary",children:"Resign"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"}),s.jsx(Tn,{color:g.playingColor||"white",size:"medium"})]}),b=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:i,$variant:"secondary",children:"Unobserve"}),s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"})]}),k=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:a,$variant:"secondary",children:"Unexamine"}),s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"})]}),y=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"}),s.jsx(ce,{onClick:d,$variant:"secondary",children:"FEN"})]});return s.jsxs(Ec,{className:f,children:[e==="playing"&&v(),e==="observing"&&b(),e==="examining"&&k(),e==="freestyle"&&y()]})}),me=m(ce)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Mo.displayName="GameControls";const or=m.div`
  position: relative;
  background-color: #f5f5f5;
  border: 1px solid #444;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  ${e=>e.$orientation==="vertical"?`
    width: 18px;
    height: 100%;
  `:`
    width: 100%;
    height: 18px;
  `}
`,ir=m.div`
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
`,Mc=m.div`
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
`,sr=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,yt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,ar=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,To=Z(({evaluation:e,percent:t,orientation:n="vertical",className:r})=>{const i=Tt().isBottomPlayerWinning;let a,d,c;if(t===50)a=47,d=6,c=47;else if(t>50){const p=t-50;a=50-p,d=p,c=50}else{const p=50-t;a=50,d=p,c=50-p}const l=t===50?"#FFC107":i?"#2E7D32":"#C62828";if(n==="vertical"){const p=t<80;return s.jsxs(or,{$orientation:n,className:r,children:[s.jsx(ir,{$orientation:n,children:e}),s.jsx(Mc,{$isLight:p,children:e}),s.jsxs(sr,{$orientation:n,children:[s.jsx(yt,{style:{height:`${a}%`}}),s.jsx(ar,{$color:l,style:{height:`${d}%`}}),s.jsx(yt,{style:{height:`${c}%`}})]})]})}else return s.jsxs(or,{$orientation:n,className:r,children:[s.jsx(ir,{$orientation:n,children:e}),s.jsxs(sr,{$orientation:n,children:[s.jsx(yt,{style:{width:`${c}%`}}),s.jsx(ar,{$color:l,style:{width:`${d}%`}}),s.jsx(yt,{style:{width:`${a}%`}})]})]})});To.displayName="EvaluationBar";const Tc=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,zc=m.div`
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
`,fn=Z(({orientation:e="vertical",boardSize:t})=>{const n=Tt();return s.jsx(Tc,{$orientation:e,$boardSize:t,children:s.jsx(To,{evaluation:n.evaluation,percent:n.evaluationPercent,orientation:e})})}),gn=Z(({className:e})=>{const t=Tt();return s.jsxs(zc,{className:e,children:[s.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),s.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});fn.displayName="AnalysisDisplay";gn.displayName="AnalysisInfoDisplay";const Lc=m.div`
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
`,Ic=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Ac=m.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,zo=m.input`
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
`,Nc=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Dc=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Oc=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,cr=m.button`
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
`,Fc=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  margin-right: ${e=>e.theme.spacing[2]};
  margin-bottom: ${e=>e.theme.spacing[2]};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  background-color: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${e=>e.theme.colors.surfaceHover};
    border-color: ${e=>e.theme.colors.primary};
  }
`,lr=m.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,dr=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Bc=m(zo)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Lo=Z(({isOpen:e,onClose:t})=>{const{gameStore:n}=Oe(),[r,o]=h.useState(""),[i,a]=h.useState(""),d=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=h.useCallback(g=>{o(g.target.value),a("")},[]),l=h.useCallback(()=>{try{n.loadPosition(r.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[r,n,t]),p=h.useCallback(g=>{const v=typeof g=="function"?g():g;o(v),a("");try{n.loadPosition(v)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[n,t]),u=h.useCallback(g=>{g.key==="Enter"&&r.trim()?l():g.key==="Escape"&&t()},[r,l,t]),f=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>_o.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?s.jsx(Lc,{$isOpen:e,onClick:t,children:s.jsxs(Ic,{onClick:g=>g.stopPropagation(),children:[s.jsx(Ac,{children:"Set Position from FEN"}),s.jsx(Dc,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),s.jsxs(lr,{children:[s.jsx(dr,{children:"Current position:"}),s.jsx(Bc,{type:"text",value:d,readOnly:!0,onClick:g=>g.currentTarget.select()})]}),s.jsxs(lr,{children:[s.jsx(dr,{children:"Preset position:"}),f.map(g=>s.jsx(Fc,{onClick:()=>p(g.fen),children:g.name},g.name))]}),s.jsx(zo,{type:"text",value:r,onChange:c,onKeyDown:u,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),i&&s.jsx(Nc,{children:i}),s.jsxs(Oc,{children:[s.jsx(cr,{onClick:t,children:"Cancel"}),s.jsx(cr,{$variant:"primary",onClick:l,disabled:!r.trim(),children:"Set Position"})]})]})}):null});Lo.displayName="FENDialog";const Wc=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Hc=m.div`
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
`,_c=m.div`
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
`,Gc=m.div`
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
`,Uc=m(Me)`
  width: 100%;
  height: 100%;
`,rt=Z(({orientation:e="horizontal",isWhitePieces:t=!0,className:n,boardSize:r,onPieceClick:o})=>{const{gameStore:i}=Oe(),a=i.capturedPieces,d=t?a.white:a.black,c=h.useMemo(()=>{const u={};return d.forEach(f=>{u[f]=(u[f]||0)+1}),u},[d]),l=["p","n","b","r","q"],p=r?r/8:32;return s.jsx(Wc,{$orientation:e,$size:p,className:n,children:s.jsx(Hc,{$orientation:e,children:l.map(u=>{const f=c[u]||0,g=t?u.toUpperCase():u;return s.jsx(_c,{$size:p,onClick:f>0&&o?()=>o(g):void 0,style:{cursor:f>0&&o?"pointer":"default"},children:f>0&&s.jsxs(s.Fragment,{children:[s.jsx(Uc,{piece:g,size:p}),f>1&&s.jsx(Gc,{children:f})]})},u)})})})});rt.displayName="CapturedPieces";const qc=m.div`
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
`,Yc=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Vc=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Kc=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Jc=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,ur=m.button`
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
    background-color: ${e.theme.colors.backgroundTertiary};
    color: ${e.theme.colors.text};
    &:hover {
      background-color: ${e.theme.colors.border};
    }
  `}
`,Xc=({isOpen:e,title:t,message:n,confirmText:r="Confirm",cancelText:o="Cancel",onConfirm:i,onCancel:a})=>s.jsx(qc,{$isOpen:e,onClick:a,children:s.jsxs(Yc,{onClick:d=>d.stopPropagation(),children:[s.jsx(Vc,{children:t}),s.jsx(Kc,{children:n}),s.jsxs(Jc,{children:[s.jsx(ur,{$variant:"secondary",onClick:a,children:o}),s.jsx(ur,{$variant:"primary",onClick:i,children:r})]})]})}),Qc=m.div`
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
`,hr=m.div`
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
`;const Zc=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: center;
`,pr=m.div`
    width: ${e=>e.$size}px;
    height: ${e=>e.$size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`,el=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,tl=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,nl=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Io=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Ao=m.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,rl=m(Io)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,ol=m(Ao)`
    margin-top: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,il=m(Io)`
    margin-bottom: ${e=>e.theme.spacing[2]};
    padding: 0 30px;
    position: relative;
`,sl=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 10;
`,al=m(Ao)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,mr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,fr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,gr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,yr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,xr=m.div`
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
`,cl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,ll=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,dl=m.div`
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
`;const ul=m.div`
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
`;const hl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[3]};
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: ${e=>e.theme.spacing[2]};
    width: 100%;
    position: relative;
`,pl=m.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`,br=m.div`
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
`;const $r=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`,ml=m(Mn)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;m(pt)`
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
`;const vr=m.div`
    flex: 1;
    display: flex;
`;m(pt)`
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
`;const fl=m.div`
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
`;const gl=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,yl=m.div`
    display: flex;
    align-items: flex-start;
    padding-top: ${e=>{const t=e.$squareSize||0,n=24,r=40,o=(e.$squareSize||0)*.25;return t+n+r+8-o}}px;
`,No=Z(({className:e,hasChat:t=!1})=>{const n=yn(),r=Ke(),o=Tt(),i=Rr(),a=Go();Bt();const[d,c]=h.useState(!1),[l,p]=h.useState(!1),[u,f]=h.useState(0),[g,v]=h.useState(!1),[b,k]=h.useState(!1),[y,j]=h.useState(null),R=r.preferences.chessOrientation==="landscape",P=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",M=h.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),D=h.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:r.preferences.showCapturedPieces,[n.currentGame?.variant,r.preferences.showCapturedPieces]),I=h.useCallback((F,X,Y)=>{try{n.makeMove(F,X,Y)||(console.error("Invalid move:",F,X),a.playIllegal())}catch(oe){console.error("Error making move:",oe),a.playIllegal()}},[n,a]),_=h.useCallback((F,X)=>{try{const Y=F.toLowerCase();n.makeSANMove(`${F.toUpperCase()}@${X}`)||(console.error("Invalid drop:",F,X),a.playIllegal())}catch(Y){console.error("Error making drop:",Y),a.playIllegal()}},[n,a]),W=h.useCallback(F=>{j(y===F?null:F)},[y]);h.useMemo(()=>{if(n.currentGameInfo){const{white:F,black:X,timeControl:Y,variant:oe}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${oe} ${Y}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const x=(()=>{const F=n.moveHistory.length;if(F>0){const X=n.moveHistory[F-1],Y=Math.ceil(F/2),oe=F%2===1,ie=tn(X.san);return`${Y}.${oe?"":".."} ${ie}`}return"Starting position"})(),$=n.currentOpening,w=n.currentGame,S=w||n.lastGameState,A=S?.white||{name:"White",rating:1500,time:900},H=S?.black||{name:"Black",rating:1500,time:900},U=!w||w.turn==="w",K=n.shouldShowFlippedBoard,le=K?A:H,q=K?H:A,se=K,ee=K?U:!U,ae=h.useCallback(F=>{n.goToMove(F)},[n]);h.useEffect(()=>{o.initialize()},[o]),h.useEffect(()=>{b&&n.isPlaying&&n.currentGame&&i.sendCommand("draw")},[n.moveHistory.length,b,n.isPlaying,i]),h.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&k(!1)},[n.currentGame,n.isPlaying]),h.useEffect(()=>{d&&o.isEngineReady?o.startAnalysis(P):o.stopAnalysis()},[d,P,o]);const be=h.useCallback(()=>{c(F=>!F)},[]),Se=h.useCallback(()=>{p(!0)},[]),$e=h.useCallback(()=>{r.updatePreference("boardFlipped",!r.preferences.boardFlipped)},[r]),C=h.useCallback(()=>{n.currentGame&&i.sendCommand(`unobs ${n.currentGame.gameId}`)},[i,n.currentGame]),N=h.useCallback(()=>{i.sendCommand("unexamine")},[i]),L=h.useCallback(()=>{v(!0)},[]),T=h.useCallback(()=>{i.sendCommand("resign"),v(!1)},[i]),z=h.useCallback(()=>{i.sendCommand("draw"),k(!b)},[i,b]),E=h.useCallback(()=>{i.sendCommand("abort")},[i]),B=()=>s.jsxs(s.Fragment,{children:[s.jsx(hr,{$orientation:"portrait",children:s.jsx(cl,{children:s.jsxs(ll,{children:[d&&s.jsx(yl,{$squareSize:u?u/8:0,children:s.jsx(fn,{orientation:"vertical",boardSize:u})}),s.jsxs(dl,{children:[s.jsx(pr,{$size:u?u/8:0}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[s.jsxs(il,{children:[s.jsxs(mr,{children:["Game #",S?.gameId||"?"]}),s.jsx(fr,{children:S?.timeControl||"?"}),s.jsxs(sl,{children:[M==="playing"&&s.jsxs(s.Fragment,{children:[n.moveHistory.length<=1&&s.jsx(me,{onClick:E,$variant:"secondary",children:"Abort"}),s.jsx(me,{onClick:z,$variant:"secondary",children:"Draw"}),s.jsx(me,{onClick:L,$variant:"secondary",children:"Resign"}),s.jsx(Tn,{color:n.playingColor||"white",size:"small"})]}),M==="observing"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:C,$variant:"secondary",children:"Unobserve"}),s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"})]}),M==="examining"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:N,$variant:"secondary",children:"Unexamine"}),s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"})]}),M==="freestyle"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"}),s.jsx(me,{onClick:$e,$variant:"secondary",children:"Flip"}),s.jsx(me,{onClick:Se,$variant:"secondary",children:"FEN"})]})]})]}),s.jsxs($r,{children:[s.jsx(nt,{player:le,isActive:ee,size:"small",compact:!0}),s.jsx(vr,{children:s.jsx(tt,{name:le.name,rating:le.rating,time:0,isActive:ee,isWhite:se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsx(xr,{$orientation:"portrait",children:s.jsx(mn,{position:P,flipped:K,showCoordinates:!0,onMove:I,onDrop:_,interactive:M==="playing"||M==="freestyle"||M==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:y,onCapturedPieceSelect:j})}),s.jsxs($r,{children:[s.jsx(nt,{player:q,isActive:!ee,size:"small",compact:!0}),s.jsx(vr,{children:s.jsx(tt,{name:q.name,rating:q.rating,time:0,isActive:!ee,isWhite:!se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsxs(al,{children:[s.jsx(gr,{children:n.premove?`Premove: ${Ln(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,P)}`:x!=="Starting position"?`Last move: ${x}`:"Last move: none"}),$&&s.jsx(yr,{children:$})]}),d&&s.jsx(gl,{children:s.jsx(gn,{})})]}),s.jsx(pr,{$size:u?u/8:0})]}),D&&s.jsx(tl,{$squareSize:u?u/8:0,children:s.jsxs(nl,{$squareSize:u?u/8:0,children:[s.jsx(rt,{orientation:"vertical",isWhitePieces:K,boardSize:u,onPieceClick:W}),s.jsx(rt,{orientation:"vertical",isWhitePieces:!K,boardSize:u,onPieceClick:W})]})})]})})}),s.jsx(ul,{$orientation:"portrait",children:s.jsx(Mn,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:ae,disableAutoScroll:!0,onNavigate:F=>{if(n.isExamining)switch(F){case"first":i.sendCommand("back 500");break;case"prev":i.sendCommand("back");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 500");break}else switch(F){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return s.jsxs(Qc,{className:e,$orientation:R?"landscape":"portrait",$hasChat:t,children:[R?s.jsx(s.Fragment,{children:s.jsx(hr,{$orientation:"landscape",children:s.jsxs(hl,{$hasAnalysis:d,children:[s.jsxs(Zc,{children:[s.jsxs(rl,{children:[s.jsxs(mr,{children:["Game #",S?.gameId||"?"]}),s.jsx(fr,{children:S?.timeControl||"?"})]}),s.jsxs(el,{children:[d&&s.jsx(fn,{orientation:"vertical"}),s.jsx(xr,{$orientation:"landscape",children:s.jsx(mn,{position:P,flipped:K,showCoordinates:!0,onMove:I,onDrop:_,interactive:M==="playing"||M==="freestyle"||M==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:y,onCapturedPieceSelect:j})})]}),s.jsxs(ol,{children:[s.jsx(gr,{children:n.premove?`Premove: ${Ln(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,P)}`:x!=="Starting position"?`Last move: ${x}`:"Last move: none"}),$&&s.jsx(yr,{children:$})]}),d&&s.jsx(fl,{children:s.jsx(gn,{})})]}),s.jsxs(pl,{children:[D&&s.jsx(rt,{orientation:"horizontal",isWhitePieces:se,boardSize:u,onPieceClick:W}),s.jsxs(br,{children:[s.jsx(nt,{player:le,isActive:ee,size:"small",compact:!0,variant:"landscape"}),s.jsx(tt,{name:le.name,rating:le.rating,time:0,isActive:ee,isWhite:se,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),s.jsx(Mo,{perspective:M,canAbort:n.moveHistory.length<=1,onAnalysis:be,onFlipBoard:$e,onSetupFEN:Se,onUnobserve:C,onUnexamine:N,onResign:L,onDraw:z,onAbort:E,isAnalysisActive:d,isDrawOffered:b}),s.jsx(ml,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:ae,showHeader:!1,onNavigate:F=>{if(n.isExamining)switch(F){case"first":i.sendCommand("backward 999");break;case"prev":i.sendCommand("backward");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 999");break}else switch(F){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),s.jsxs(br,{children:[s.jsx(tt,{name:q.name,rating:q.rating,time:0,isActive:!ee,isWhite:!se,orientation:"vertical",hideClockInCard:!0,compact:!0}),s.jsx(nt,{player:q,isActive:!ee,size:"small",compact:!0,variant:"landscape"})]}),D&&s.jsx(rt,{orientation:"horizontal",isWhitePieces:!se,boardSize:u,onPieceClick:W})]})]})})}):B(),s.jsx(Lo,{isOpen:l,onClose:()=>p(!1)}),s.jsx(Xc,{isOpen:g,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:T,onCancel:()=>v(!1)})]})});No.displayName="ChessGameLayout";const xl=m.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundTertiary};
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
`,bl=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[1]};
  border: none;
  background-color: ${e=>e.$active?e.theme.colors.surface:"transparent"};
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
    background-color: ${e=>e.$active?e.theme.colors.surface:e.theme.colors.backgroundSecondary};
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
`,$l=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,vl=m.span`
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
`,wl=m.button`
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
`,kl=m.span`
  font-size: 12px;
  opacity: 0.7;
`,Do=Z(()=>{const{chatStore:e}=Oe(),t=e.sortedTabs,[n,r]=re.useState(null),[o,i]=re.useState(null),a=(u,f)=>{r(f),u.dataTransfer.effectAllowed="move"},d=(u,f)=>{u.preventDefault(),u.dataTransfer.dropEffect="move",i(f)},c=()=>{i(null)},l=(u,f)=>{u.preventDefault(),n&&n!==f&&e.reorderTabs(n,f),r(null),i(null)},p=()=>{r(null),i(null)};return s.jsx(xl,{children:t.map(u=>s.jsxs(bl,{$active:u.id===e.activeTabId,$hasUnread:u.unreadCount>0,$dragging:u.id===n,$dragOver:u.id===o,draggable:!0,onDragStart:f=>a(f,u.id),onDragOver:f=>d(f,u.id),onDragLeave:c,onDrop:f=>l(f,u.id),onDragEnd:p,onClick:()=>e.setActiveTab(u.id),children:[u.type!=="console"&&s.jsx(kl,{$type:u.type}),s.jsx($l,{children:u.type==="channel"?`(${u.name})`:u.name}),u.unreadCount>0&&s.jsx(vl,{children:u.unreadCount>99?"99+":u.unreadCount}),u.id!=="console"&&s.jsx(wl,{onClick:f=>{f.stopPropagation(),e.closeTab(u.id)},title:"Close tab",children:"×"})]},u.id))})});Do.displayName="ChatTabs";function Cl(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function Sl(e){e.scrollTop=e.scrollHeight}function Pl(e,t=10){Cl(e,t)&&Sl(e)}const wr=m.a`
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
`,jl=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Rl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,El=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Ml=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Tl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,zl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,je=/(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,kr=/["']([^"']+)["']/g,Cr=/\[(\w+)\]/g,Sr=new Set(["abort","accept","addlist","adjourn","alias","allobservers","assess","clear","set","backward","bell","best","boards","bsetup","bugwho","cbest","clearmessages","convert_bcf","convert_elo","convert_uscf","copygame","crank","cshout","date","decline","draw","examine","finger","flag","flip","fmessage","follow","forward","games","getgame","gnotify","goboard","handles","hbest","help","history","hrank","inchannel","index","info","it","jkill","jsave","kibitz","limits","llogons","logons","mailhelp","mailmess","mailmoves","mailoldmoves","mailsource","mailstored","match","messages","mexamine","moretime","moves","news","next","observe","oldmoves","open","password","pause","pending","pfollow","play","pobserve","promote","pstat","qtell","quit","rank","refresh","resign","resume","revert","say","seek","servers","set","shout","showadmins","showlist","simabort","simallabort","simadjourn","simalladjourn","simgames","simmatch","simnext","simobserve","simopen","simpass","simprev","smoves","smposition","sought","sposition","statistics","stored","style","sublist","switch","takeback","tell","time","unalias","unexamine","unobserve","unpause","unseek","uptime","variables","whisper","who","withdraw","xkibitz","xtell","xwhisper","znotify"]),Ll=/^(\w+(?:\([A-Z]\))?) \((?:\+{4}|-{4}|\+*\d+)\) seeking/;let ze=null,Le=null;const ot=({text:e,className:t,onCommandClick:n})=>{(e.includes("History for")||e.match(/^\d+:\s+[+-=]/)||e.includes("Journal for")||e.match(/^%\d+:/)||e.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/)||e.includes(" - ")&&e.includes("(")&&e.match(/^\s*\d+\s+/)||e.includes("seeking")&&e.includes("to respond"))&&console.log("LinkifiedText processing:",{text:e.substring(0,50),hasCommandClick:!!n});const r=[],o=!!n;if(!o){je.lastIndex=0;let x;for(;(x=je.exec(e))!==null;)r.push({type:"url",match:x[0],content:x[0],index:x.index,length:x[0].length});const $=[];let w=0;return r.forEach((S,A)=>{S.index>w&&$.push(e.substring(w,S.index));let H=S.content;S.content.match(/^(?:https?|ftp):\/\//)||S.content.includes(".")&&(H="https://"+S.content),$.push(s.jsx(wr,{href:H,target:"_blank",rel:"noopener noreferrer",onClick:U=>U.stopPropagation(),children:S.content},`url-${A}`)),w=S.index+S.length}),w<e.length&&$.push(e.substring(w)),s.jsx("span",{className:t,children:$.length>0?$:e})}const i=e.includes("players displayed")||/^\s*(?:\d{3,4}|----|\+{4})/.test(e)&&!e.match(/^\d{4}\s+\(/)&&!e.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/),a=/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+(?:\([A-Z]\))?\s+\d+\s+\d+\s+(?:unrated|rated)/.test(e)&&!e.includes("games displayed")&&!e.includes(" - "),d=e.includes("games displayed")||/^\s*\d{1,3}\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.test(e)&&e.includes(" - ")&&e.includes("(")&&!a,c=/^\s*Channel\s+\d+(?:\s+"[^"]+")?\s*:/.test(e),l=/\w+\s+\(\d+\)\s+vs\.\s+\w+\s+\(\d+\)/.test(e),p=/^Game \d+:/.test(e),u=/^\:\[\d{2}:\d{2}:\d{2}\]/.test(e),f=/^(?:Present company includes:|Your arrival was noted by:)/.test(e),g=/^\s*--\s+\w+\s+list:/.test(e),v=/^\s*\d+:\s*\w+(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.test(e),b=/^\s*Finger of\s+\w+/.test(e),k=/^\s*\d+:\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+\w+/.test(e)||/History for \w+:/.test(e),y=/^\s*%\d+:\s+\w+/.test(e)||/Journal for \w+:/.test(e),j=/\w+\s+\((?:\d+|\+{4})\)\s+seeking.*\("play\s+(\d+)"\s+to\s+respond\)/.test(e),R=/^\s*\d+\.\s+\w+\s+\d{4}/.test(e)||/^\s+\w+\s+\d{4}\s+\d+\.\s+\w+\s+\d{4}/.test(e),P=/^\d{4}\s+\(\w{3},\s+\w{3}\s+\d+\)/.test(e)||e.includes("Index of new news items:")||e.includes("Index of the last few news items:"),M=/^Notification:\s+\w+\s+has\s+(?:arrived|departed)/.test(e),D=/^\(told \d+ players? in channel \d+/.test(e)||/^\(told \w+\)/.test(e),I=e.length>10&&!e.match(/^\s/)&&!e.match(/^Channel\s+\d+/)&&!e.match(/^[A-Z]/)&&!e.match(/^\w+\s+\(\d+\)/)&&!e.match(/^Game\s+\d+/)&&!e.includes("displayed")&&!e.match(/^--/)&&!e.match(/^\d{4}\s+\(\w{3},/)&&!e.match(/^\d+\s+\(/)&&!e.match(/^\d+:\s+[+-=]/)&&!e.match(/^%\d+:/)&&e.split(/\s+/).length>3;if((e.includes("History for")||e.match(/^\d+:\s+[+-=]/)||e.includes("Journal for")||e.match(/^%\d+:/)||e.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/)||e.includes(" - ")&&e.includes("(")&&e.match(/^\s*\d+\s+/)||e.includes("seeking")&&e.includes("to respond"))&&console.log("History/Journal/Sought/Games/Seek detection:",{text:e.substring(0,50),isHistoryOutput:k,isJournalOutput:y,isSoughtOutput:a,isWhoOutput:i,isGamesOutput:d,isSeekMessage:j,isCommandMode:o,isToldMessage:D,looksLikeUserInput:I}),j){console.log("In seek message handling block",{text:e.substring(0,50)});const $=/\w+\s+\((?:\d+|\+{4})\)\s+seeking.*\("play\s+(\d+)"\s+to\s+respond\)/.exec(e);if(console.log("Seek regex match:",$),$){const w=$[1];console.log("Seek message detected:",{gameNum:w,text:e}),r.push({type:"command",match:e,content:`play ${w}`,index:0,length:e.length,isSeekLine:!0}),console.log("Added seek line to matches:",r[r.length-1])}else console.log("Seek message not matched:",{text:e,seekMatch:$,trimmedText:e.trim()})}else if((D||I)&&!P){je.lastIndex=0;let x;for(;(x=je.exec(e))!==null;)r.push({type:"url",match:x[0],content:x[0],index:x.index,length:x[0].length})}else if(i&&!d){console.log("Processing as WHO output:",{text:e.substring(0,50)});const x=/(?:^|\s)((?:\d{3,4}|----|\+{4})\s*)([.^:#&]?)([A-Za-z]\w*)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g;let $;for(;($=x.exec(e))!==null;){const[w,S,A,H]=$,U=$.index+$[0].indexOf(H);r.push({type:"player",match:H,content:H,index:U,length:H.length})}}else if(d){console.log("In games handling block",{text:e.substring(0,50)});const $=/^\s*(\d{1,3})\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.exec(e);if(console.log("Games regex match:",$),$){const w=$[1];console.log("Games entry detected:",{gameNum:w,text:e}),r.push({type:"command",match:e,content:`observe ${w}`,index:0,length:e.length,isGamesLine:!0}),console.log("Added games line to matches:",r[r.length-1])}else console.log("Games entry not matched:",{text:e,gamesMatch:$,trimmedText:e.trim()})}else if(c){const x=e.indexOf(":");if(x!==-1){const $=e.substring(x+1),w=/\{?(\w+)(?:\([A-Z*]+\))?\}?/g;let S;for(;(S=w.exec($))!==null;){const A=S[1];if(!A||A.trim()==="")continue;const U=S[0].indexOf(A),K=x+1+S.index+U;r.push({type:"player",match:A,content:A,index:K,length:A.length})}}}else if(l){const $=/(\w+)\s+\(\d+\)\s+vs\.\s+(\w+)\s+\(\d+\)/.exec(e);if($){const[w,S,A]=$,H=$.index,U=H+w.indexOf(S);r.push({type:"player",match:S,content:S,index:U,length:S.length});const K=H+w.indexOf(A);r.push({type:"player",match:A,content:A,index:K,length:A.length})}}else if(p){const $=/^Game \d+:\s+(\w+)\s+(?:offers|declines|accepts|requests|forfeits)/.exec(e);if($){const A=$[1],H=e.indexOf(A);r.push({type:"player",match:A,content:A,index:H,length:A.length})}const S=/Game \d+\s*\((\w+)\s+vs\.\s+(\w+)\)/.exec(e);if(S){const[A,H,U]=S,K=S.index,le=e.indexOf(H,K);r.push({type:"player",match:H,content:H,index:le,length:H.length});const q=e.indexOf(U,K);r.push({type:"player",match:U,content:U,index:q,length:U.length})}}else if(u){const $=/^\:\[\d{2}:\d{2}:\d{2}\]\s+(\w+):/.exec(e);if($){const S=$[1],A=e.indexOf(S,$.index);r.push({type:"player",match:S,content:S,index:A,length:S.length})}je.lastIndex=0;let w;for(;(w=je.exec(e))!==null;)r.push({type:"url",match:w[0],content:w[0],index:w.index,length:w[0].length})}else if(f){const x=e.indexOf(":");if(x!==-1){const $=e.substring(x+1),w=/(\w+)(?=\s|\.|\.|$)/g;let S;for(;(S=w.exec($))!==null;){const A=S[1],H=x+1+S.index;r.push({type:"player",match:A,content:A,index:H,length:A.length})}}}else if(g){if(!e.includes(" list:")){const x=/\b(\w+)\b/g;let $;for(;($=x.exec(e))!==null;){const w=$[1];r.push({type:"player",match:w,content:w,index:$.index,length:w.length})}}}else if(v){const $=/^\s*\d+:\s*(\w+)(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.exec(e);if($){const w=$[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else if(b){const $=/^\s*Finger of\s+(\w+)/.exec(e);if($){const w=$[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else if(k){console.log("In history handling block",{text:e.substring(0,50),lastHistoryPlayer:ze});const $=/History for (\w+):/.exec(e);if($){const w=$[1];ze=w,console.log("History header detected, player:",w)}else if(ze){console.log("Checking history entry with lastHistoryPlayer:",ze);const S=/^\s*(\d+):\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+(\w+)/.exec(e);if(console.log("Entry regex match:",S),S){const A=S[1];console.log("History entry detected:",{gameNumber:A,player:ze,text:e}),r.push({type:"command",match:e,content:`examine ${ze} ${A}`,index:0,length:e.length,isHistoryLine:!0}),console.log("Added history line to matches:",r[r.length-1])}else console.log("History entry not matched:",{text:e,lastHistoryPlayer:ze,entryMatch:S,trimmedText:e.trim()})}else console.log("No lastHistoryPlayer set for entry line")}else if(y){console.log("In journal handling block",{text:e.substring(0,50),lastJournalPlayer:Le});const $=/Journal for (\w+):/.exec(e);if($){const w=$[1];Le=w,console.log("Journal header detected, player:",w)}else if(Le){console.log("Checking journal entry with lastJournalPlayer:",Le);const S=/^(\s*)(%\d+):/.exec(e);if(console.log("Journal regex match:",S),S){const[A,H,U]=S;console.log("Journal entry detected:",{gameNum:U,player:Le,text:e}),r.push({type:"command",match:e,content:`examine ${Le} ${U}`,index:0,length:e.length,isJournalLine:!0}),console.log("Added journal line to matches:",r[r.length-1])}else console.log("Journal entry not matched:",{text:e,lastJournalPlayer:Le,journalMatch:S,trimmedText:e.trim()})}else console.log("No lastJournalPlayer set for entry line")}else if(a){console.log("In sought handling block",{text:e.substring(0,50)});const $=/^\s*(\d+)\s+(?:\d{3,4}|----|\+{4})\s+\w+/.exec(e);if(console.log("Sought regex match:",$),$){const w=$[1];console.log("Sought entry detected:",{gameNum:w,text:e}),r.push({type:"command",match:e,content:`play ${w}`,index:0,length:e.length,isSoughtLine:!0}),console.log("Added sought line to matches:",r[r.length-1])}else console.log("Sought entry not matched:",{text:e,soughtMatch:$,trimmedText:e.trim()})}else if(R){if(!(e.includes("Blitz")&&e.includes("Standard")&&e.includes("Lightning"))){const x=/(?:(\d+)\.\s+)?(\w+)\s+(\d{4})/g;let $;for(;($=x.exec(e))!==null;){const[w,S,A,H]=$,U=$.index+(S?S.length+2:0);r.push({type:"player",match:A,content:A,index:U,length:A.length})}}}else if(P){if(!(e.includes("Index of new news items:")||e.includes("Index of the last few news items:"))){const $=/^(\d{4})\s+\(/.exec(e);if($){const w=$[1];n!=null&&r.push({type:"command",match:w,content:`news ${w}`,index:0,length:w.length})}}}else if(M){const $=/^Notification:\s+(\w+)\s+has\s+(?:arrived|departed)/.exec(e);if($){const w=$[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else{je.lastIndex=0;let x;for(;(x=je.exec(e))!==null;)r.push({type:"url",match:x[0],content:x[0],index:x.index,length:x[0].length})}if(n!=null&&!i&&!d&&!c&&!l&&!p&&!u&&!f&&!g&&!v&&!b&&!k&&!y&&!a&&!R&&!P&&!M){const x=Ll.exec(e);if(x){const $=x[1];r.push({type:"player",match:$,content:$.replace(/\([A-Z]\)$/,""),index:0,length:$.length})}}if(n!=null){kr.lastIndex=0;let x;for(;(x=kr.exec(e))!==null;){const S=x[1].trim().split(/\s+/),A=S[0].toLowerCase();(Sr.has(A)||S.length>1&&Sr.has(A)&&S[1].startsWith("/"))&&r.push({type:"command",match:x[0],content:x[1],index:x.index,length:x[0].length})}Cr.lastIndex=0;let $;for(;($=Cr.exec(e))!==null;){const w=$[1].toLowerCase();["next","more","back","prev","previous","done","quit"].includes(w)&&r.push({type:"command",match:$[0],content:w,index:$.index,length:$[0].length})}}r.sort((x,$)=>x.index-$.index);const _=[];let W=0;return r.forEach((x,$)=>{if(x.index>W&&_.push(e.substring(W,x.index)),x.type==="url"){let w=x.content;x.content.match(/^(?:https?|ftp):\/\//)||x.content.includes(".")&&(w="https://"+x.content),_.push(s.jsx(wr,{href:w,target:"_blank",rel:"noopener noreferrer",onClick:S=>S.stopPropagation(),children:x.content},`url-${$}`))}else x.type==="command"?x.isHistoryLine?_.push(s.jsx(Rl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to examine game: ${x.content}`,children:x.match},`hist-${$}`)):x.isJournalLine?_.push(s.jsx(El,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to examine game: ${x.content}`,children:x.match},`journal-${$}`)):x.isSoughtLine?_.push(s.jsx(Ml,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to play game: ${x.content}`,children:x.match},`sought-${$}`)):x.isGamesLine?_.push(s.jsx(Tl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to observe game: ${x.content}`,children:x.match},`games-${$}`)):x.isSeekLine?_.push(s.jsx(zl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to accept challenge: ${x.content}`,children:x.match},`seek-${$}`)):_.push(s.jsx(jl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to send: ${x.content}`,children:x.match},`cmd-${$}`)):x.type==="player"&&_.push(s.jsx(Wt,{name:x.content},`player-${$}`));W=x.index+x.length}),W<e.length&&_.push(e.substring(W)),_.length===0?s.jsx("span",{className:t,children:e}):s.jsx("span",{className:t,children:_})};ot.displayName="LinkifiedText";const xt=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[2]};
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
`,zn=m.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: 10px;
  flex-shrink: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 50px;
`,Il=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover ${zn} {
    opacity: 1;
  }
`;m.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
`;const Pr=m.div`
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
  
  &:hover ${zn} {
    opacity: 1;
  }
`;m(zn)`
  position: absolute;
  left: 0;
  top: 0;
  background: ${e=>e.theme.colors.background};
  padding: 0 4px;
  z-index: 1;
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
`;const Al=m.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
`,Nl=m.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,jr=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,Dl=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Oo=Z(({onMessageHover:e})=>{const{chatStore:t,ficsStore:n,preferencesStore:r}=Oe(),o=h.useRef(null),i=t.activeTab,a=i?.messages||[],d=n.username||"You",c=p=>{n.sendCommand(p)};if(h.useEffect(()=>{if(o.current&&a.length>0){const p=o.current,u=setTimeout(()=>{i?.type==="console"?p.scrollTop=p.scrollHeight:Pl(p,50)},50);return()=>clearTimeout(u)}},[a.length,a[a.length-1]?.id]),h.useEffect(()=>{if(o.current&&a.length>0){const p=o.current;requestAnimationFrame(()=>{p.scrollTop=p.scrollHeight})}},[i?.id]),!i)return s.jsx(xt,{className:"chat-messages-container",children:s.jsx(jr,{children:"No active chat"})});if(a.length===0)return s.jsx(xt,{className:"chat-messages-container",children:s.jsx(jr,{children:i.type==="channel"?`No messages in (${i.name}) yet`:i.type==="private"?`No messages with ${i.name} yet`:"Connecting to freechess.org..."})});const l=[];return a.forEach((p,u)=>{const f=u>0?a[u-1]:null,g=f?new Date(p.timestamp).getTime()-new Date(f.timestamp).getTime():1/0;f&&f.sender===p.sender&&f.type===p.type&&g<6e4?l[l.length-1].messages.push(p):l.push({sender:p.sender,timestamp:new Date(p.timestamp),messages:[p]})}),i.type==="console"?s.jsx(xt,{ref:o,className:"chat-messages-container",children:a.map(p=>{let u;if(p.metadata?.consoleType){const f=r.getConsoleColor(p.metadata.consoleType,p.metadata.channelNumber);f&&(u=f)}return s.jsx(Pr,{$type:p.type,$color:u,onMouseEnter:()=>e?.(p.timestamp),onMouseLeave:()=>e?.(null),children:u?s.jsx("span",{style:{color:u},children:s.jsx(ot,{text:p.content,onCommandClick:c})}):s.jsx(ot,{text:p.content,onCommandClick:c})},p.id)})}):s.jsx(xt,{ref:o,className:"chat-messages-container",children:l.map((p,u)=>{const f=p.messages[0],g=p.sender.toLowerCase()===d.toLowerCase();if(f.type==="system")return s.jsx(Dl,{children:p.messages.map((b,k)=>s.jsxs(re.Fragment,{children:[k>0&&`
`,s.jsx(ot,{text:b.content,onCommandClick:c})]},b.id))},u);let v;if(i.type==="channel"&&f.metadata?.consoleType==="channel"){const b=r.getConsoleColor(f.metadata.consoleType,f.metadata.channelNumber);b&&(v=b)}return s.jsx(Il,{onMouseEnter:()=>e?.(p.timestamp),onMouseLeave:()=>e?.(null),children:s.jsxs(Pr,{$type:f.type,$color:v,children:[s.jsx(Al,{$isYou:g,children:g?p.sender:s.jsx(Wt,{name:p.sender})}),s.jsx(Nl,{children:p.messages.map((b,k)=>s.jsxs(re.Fragment,{children:[k>0&&`
`,s.jsx(ot,{text:b.content})]},b.id))})]})},u)})})});Oo.displayName="ChatMessages";const Ol=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Fl=m.input`
  flex: 1;
  padding: ${e=>e.theme.spacing[2]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  outline: none;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:focus {
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary}20;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${e=>e.theme.colors.textTertiary};
  }
`,Bl=m.button`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.sm};
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
`,Fo=({value:e,onChange:t,onSend:n,onHistoryNavigate:r,placeholder:o="Type a message...",disabled:i=!1})=>{const a=h.useRef(null),d=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e.trim()&&n(e.trim())):l.key==="ArrowUp"&&!e?(l.preventDefault(),r?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),r?.("down"))},c=()=>{e.trim()&&n(e.trim())};return s.jsxs(Ol,{children:[s.jsx(Fl,{ref:a,type:"text",value:e,onChange:l=>t(l.target.value),onKeyDown:d,placeholder:o,disabled:i,autoComplete:"off",spellCheck:"true"}),s.jsx(Bl,{onClick:c,disabled:i||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};Fo.displayName="ChatInput";const Wl=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,Hl=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,_l=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Gl=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,Ul=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,ql=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`,Bo=Z(({className:e,compact:t=!1})=>{const{chatStore:n,ficsStore:r}=Oe(),[o,i]=h.useState(""),[a,d]=h.useState(!1),[c,l]=h.useState(null);re.useEffect(()=>{!r.connected&&!r.connecting&&(console.log("Auto-connecting to FICS..."),r.connect())},[r]),re.useEffect(()=>{r.error&&n.addMessage("console",{channel:"console",sender:"System",content:`Error: ${r.error}`,timestamp:new Date,type:"system"})},[r.error,n]);const p=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!!f.trim()){if(n.addToHistory(f),f==="/help"||f==="\\help"){n.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),i("");return}if(n.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),f.startsWith("/")||f.startsWith("\\"))r.sendCommand(f.substring(1));else{const g=n.activeTab;if(!g)return;if(g.type==="channel"){const v=g.id.replace("channel-","");r.sendCommand(`tell ${v} ${f}`)}else g.type==="private"?r.sendCommand(`tell ${g.id} ${f}`):r.sendCommand(f)}i("")}},u=f=>{const g=n.navigateHistory(f);g!==null&&i(g)};return s.jsxs(Wl,{className:e,$compact:t,children:[!t&&s.jsxs(Hl,{children:[s.jsx(_l,{children:"Chat"}),r.averagePing!==null&&s.jsxs(Ul,{children:["Ping: ",r.averagePing,"ms"]}),c&&s.jsxs(Gl,{children:["Received: ",new Date(c).toLocaleTimeString()]})]}),s.jsxs(ql,{children:[s.jsx(Do,{}),s.jsx(Oo,{onMessageHover:l}),s.jsx(Fo,{value:o,onChange:i,onSend:p,onHistoryNavigate:u,placeholder:n.activeTab?.type==="channel"?`Message (${n.activeTab.name})...`:n.activeTab?.type==="private"?`Message ${n.activeTab.name}...`:"Enter command..."})]})]})});Bo.displayName="ChatPanel";const Yl=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.background};
`,Vl=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,Kl=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,Jl=m.div`
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
`,Xl=m.div`
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
`,Wo=Z(()=>{const{preferencesStore:e}=Oe(),{viewMode:t,autoViewMode:n}=e.preferences,r=Bt(),[o,i]=h.useState(600),[a,d]=h.useState(!1);h.useEffect(()=>{n&&(r.isMobile||r.isTablet?e.updatePreference("viewMode","chess-only"):e.updatePreference("viewMode","chess-and-chat"))},[r.isMobile,r.isTablet,n,e]);const c=f=>{f.preventDefault(),d(!0)};h.useEffect(()=>{if(!a)return;const f=v=>{const b=window.innerWidth-v.clientX;i(Math.max(300,Math.min(600,b))),window.dispatchEvent(new Event("resize"))},g=()=>{d(!1)};return document.addEventListener("mousemove",f),document.addEventListener("mouseup",g),()=>{document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",g)}},[a]);const l=t==="chess-only"||t==="chess-and-chat",p=t==="chat-only"||t==="chess-and-chat",u=t==="chess-and-chat"&&!r.isMobile;return s.jsxs(Yl,{children:[s.jsx(Po,{}),s.jsxs(Vl,{children:[s.jsx(Kl,{$isVisible:l,children:s.jsx(No,{hasChat:p})}),u&&s.jsx(Xl,{$isVisible:!0,onMouseDown:c,style:{cursor:a?"col-resize":"ew-resize"}}),s.jsx(Jl,{$isVisible:p,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:p&&!r.isMobile?`${o}px`:void 0},children:s.jsx(Bo,{})})]})]})});Wo.displayName="AppLayout";const Ql=La`
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
        line-height: ${({theme:e})=>e.typography.lineHeight.normal};
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
`,Zl=()=>s.jsx(Uo,{children:s.jsxs(Aa,{children:[s.jsx(Ql,{}),s.jsx(ys,{children:s.jsx(Yi,{children:s.jsx(Wr,{path:"/",element:s.jsx(Ua,{children:s.jsx(Wo,{})})})})})]})}),Ho=document.getElementById("root");if(!Ho)throw new Error("Root element not found");const ed=Er(Ho);ed.render(s.jsx(Zl,{}));
