import{u as Oe,j as a,a as Re,b as nr,c as xn,d as Ht,e as wt,l as vr,R as To}from"./shared-fmQoWG7r.js";import{a as Lo,r as h,R as V}from"./vendor-B9TH31lo.js";import{o as Y}from"./mobx-BpfSNEQ3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var yn,wr=Lo;yn=wr.createRoot,wr.hydrateRoot;var or={};Object.defineProperty(or,"__esModule",{value:!0});or.parse=Oo;or.serialize=Bo;const Io=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,Mo=/^[\u0021-\u003A\u003C-\u007E]*$/,Ao=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,No=/^[\u0020-\u003A\u003D-\u007E]*$/,Do=Object.prototype.toString,Fo=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function Oo(e,t){const r=new Fo,n=e.length;if(n<2)return r;const o=t?.decode||Wo;let i=0;do{const s=e.indexOf("=",i);if(s===-1)break;const d=e.indexOf(";",i),c=d===-1?n:d;if(s>c){i=e.lastIndexOf(";",s-1)+1;continue}const l=kr(e,i,s),u=Cr(e,s,l),p=e.slice(l,u);if(r[p]===void 0){let m=kr(e,s+1,c),g=Cr(e,c,m);const y=o(e.slice(m,g));r[p]=y}i=c+1}while(i<n);return r}function kr(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Cr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function Bo(e,t,r){const n=r?.encode||encodeURIComponent;if(!Io.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!Mo.test(o))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+o;if(!r)return i;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);i+="; Max-Age="+r.maxAge}if(r.domain){if(!Ao.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);i+="; Domain="+r.domain}if(r.path){if(!No.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);i+="; Path="+r.path}if(r.expires){if(!Ho(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);i+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(i+="; HttpOnly"),r.secure&&(i+="; Secure"),r.partitioned&&(i+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return i}function Wo(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function Ho(e){return Do.call(e)==="[object Date]"}var Sr="popstate";function _o(e={}){function t(n,o){let{pathname:i,search:s,hash:d}=n.location;return _t("",{pathname:i,search:s,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:Xe(o)}return Uo(t,r,null,e)}function O(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function fe(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Go(){return Math.random().toString(36).substring(2,10)}function Pr(e,t){return{usr:e.state,key:e.key,idx:t}}function _t(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Be(t):t,state:r,key:t&&t.key||n||Go()}}function Xe({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Be(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function Uo(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:i=!1}=n,s=o.history,d="POP",c=null,l=u();l==null&&(l=0,s.replaceState({...s.state,idx:l},""));function u(){return(s.state||{idx:null}).idx}function p(){d="POP";let $=u(),x=$==null?null:$-l;l=$,c&&c({action:d,location:b.location,delta:x})}function m($,x){d="PUSH";let v=_t(b.location,$,x);l=u()+1;let k=Pr(v,l),S=b.createHref(v);try{s.pushState(k,"",S)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;o.location.assign(S)}i&&c&&c({action:d,location:b.location,delta:1})}function g($,x){d="REPLACE";let v=_t(b.location,$,x);l=u();let k=Pr(v,l),S=b.createHref(v);s.replaceState(k,"",S),i&&c&&c({action:d,location:b.location,delta:0})}function y($){return qo($)}let b={get action(){return d},get location(){return e(o,s)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Sr,p),c=$,()=>{o.removeEventListener(Sr,p),c=null}},createHref($){return t(o,$)},createURL:y,encodeLocation($){let x=y($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:m,replace:g,go($){return s.go($)}};return b}function qo(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),O(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:Xe(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function bn(e,t,r="/"){return Yo(e,t,r,!1)}function Yo(e,t,r,n){let o=typeof t=="string"?Be(t):t,i=ye(o.pathname||"/",r);if(i==null)return null;let s=$n(e);Vo(s);let d=null;for(let c=0;d==null&&c<s.length;++c){let l=ii(i);d=ni(s[c],l,n)}return d}function $n(e,t=[],r=[],n=""){let o=(i,s,d)=>{let c={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};c.relativePath.startsWith("/")&&(O(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let l=xe([n,c.relativePath]),u=r.concat(c);i.children&&i.children.length>0&&(O(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),$n(i.children,t,u,l)),!(i.path==null&&!i.index)&&t.push({path:l,score:ti(l,i.index),routesMeta:u})};return e.forEach((i,s)=>{if(i.path===""||!i.path?.includes("?"))o(i,s);else for(let d of vn(i.path))o(i,s,d)}),t}function vn(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return o?[i,""]:[i];let s=vn(n.join("/")),d=[];return d.push(...s.map(c=>c===""?i:[i,c].join("/"))),o&&d.push(...s),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function Vo(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:ri(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var Ko=/^:[\w-]+$/,Xo=3,Qo=2,Jo=1,Zo=10,ei=-2,jr=e=>e==="*";function ti(e,t){let r=e.split("/"),n=r.length;return r.some(jr)&&(n+=ei),t&&(n+=Qo),r.filter(o=>!jr(o)).reduce((o,i)=>o+(Ko.test(i)?Xo:i===""?Jo:Zo),n)}function ri(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function ni(e,t,r=!1){let{routesMeta:n}=e,o={},i="/",s=[];for(let d=0;d<n.length;++d){let c=n[d],l=d===n.length-1,u=i==="/"?t:t.slice(i.length)||"/",p=xt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},u),m=c.route;if(!p&&l&&r&&!n[n.length-1].route.index&&(p=xt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},u)),!p)return null;Object.assign(o,p.params),s.push({params:o,pathname:xe([i,p.pathname]),pathnameBase:li(xe([i,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(i=xe([i,p.pathnameBase]))}return s}function xt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=oi(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let i=o[0],s=i.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:n.reduce((l,{paramName:u,isOptional:p},m)=>{if(u==="*"){let y=d[m]||"";s=i.slice(0,i.length-y.length).replace(/(.)\/+$/,"$1")}const g=d[m];return p&&!g?l[u]=void 0:l[u]=(g||"").replace(/%2F/g,"/"),l},{}),pathname:i,pathnameBase:s,pattern:e}}function oi(e,t=!1,r=!0){fe(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,d,c)=>(n.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function ii(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return fe(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ye(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function ai(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?Be(e):e;return{pathname:r?r.startsWith("/")?r:si(r,t):t,search:di(n),hash:ui(o)}}function si(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function It(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ci(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function wn(e){let t=ci(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function kn(e,t,r,n=!1){let o;typeof e=="string"?o=Be(e):(o={...e},O(!o.pathname||!o.pathname.includes("?"),It("?","pathname","search",o)),O(!o.pathname||!o.pathname.includes("#"),It("#","pathname","hash",o)),O(!o.search||!o.search.includes("#"),It("#","search","hash",o)));let i=e===""||o.pathname==="",s=i?"/":o.pathname,d;if(s==null)d=r;else{let p=t.length-1;if(!n&&s.startsWith("..")){let m=s.split("/");for(;m[0]==="..";)m.shift(),p-=1;o.pathname=m.join("/")}d=p>=0?t[p]:"/"}let c=ai(o,d),l=s&&s!=="/"&&s.endsWith("/"),u=(i||s===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(l||u)&&(c.pathname+="/"),c}var xe=e=>e.join("/").replace(/\/\/+/g,"/"),li=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),di=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ui=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function hi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Cn=["POST","PUT","PATCH","DELETE"];new Set(Cn);var pi=["GET",...Cn];new Set(pi);var We=h.createContext(null);We.displayName="DataRouter";var kt=h.createContext(null);kt.displayName="DataRouterState";var Sn=h.createContext({isTransitioning:!1});Sn.displayName="ViewTransition";var fi=h.createContext(new Map);fi.displayName="Fetchers";var mi=h.createContext(null);mi.displayName="Await";var me=h.createContext(null);me.displayName="Navigation";var et=h.createContext(null);et.displayName="Location";var be=h.createContext({outlet:null,matches:[],isDataRoute:!1});be.displayName="Route";var ir=h.createContext(null);ir.displayName="RouteError";function gi(e,{relative:t}={}){O(tt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=h.useContext(me),{hash:o,pathname:i,search:s}=rt(e,{relative:t}),d=i;return r!=="/"&&(d=i==="/"?r:xe([r,i])),n.createHref({pathname:d,search:s,hash:o})}function tt(){return h.useContext(et)!=null}function ze(){return O(tt(),"useLocation() may be used only in the context of a <Router> component."),h.useContext(et).location}var Pn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function jn(e){h.useContext(me).static||h.useLayoutEffect(e)}function xi(){let{isDataRoute:e}=h.useContext(be);return e?zi():yi()}function yi(){O(tt(),"useNavigate() may be used only in the context of a <Router> component.");let e=h.useContext(We),{basename:t,navigator:r}=h.useContext(me),{matches:n}=h.useContext(be),{pathname:o}=ze(),i=JSON.stringify(wn(n)),s=h.useRef(!1);return jn(()=>{s.current=!0}),h.useCallback((c,l={})=>{if(fe(s.current,Pn),!s.current)return;if(typeof c=="number"){r.go(c);return}let u=kn(c,JSON.parse(i),o,l.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:xe([t,u.pathname])),(l.replace?r.replace:r.push)(u,l.state,l)},[t,r,i,o,e])}h.createContext(null);function rt(e,{relative:t}={}){let{matches:r}=h.useContext(be),{pathname:n}=ze(),o=JSON.stringify(wn(r));return h.useMemo(()=>kn(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function bi(e,t){return En(e,t)}function En(e,t,r,n){O(tt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=h.useContext(me),{matches:i}=h.useContext(be),s=i[i.length-1],d=s?s.params:{},c=s?s.pathname:"/",l=s?s.pathnameBase:"/",u=s&&s.route;{let x=u&&u.path||"";Rn(c,!u||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let p=ze(),m;if(t){let x=typeof t=="string"?Be(t):t;O(l==="/"||x.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${x.pathname}" was given in the \`location\` prop.`),m=x}else m=p;let g=m.pathname||"/",y=g;if(l!=="/"){let x=l.replace(/^\//,"").split("/");y="/"+g.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=bn(e,{pathname:y});fe(u||b!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),fe(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=Ci(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:xe([l,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?l:xe([l,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),i,r,n);return t&&$?h.createElement(et.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...m},navigationType:"POP"}},$):$}function $i(){let e=Ri(),t=hi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},i={padding:"2px 4px",backgroundColor:n},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=h.createElement(h.Fragment,null,h.createElement("p",null,"💿 Hey developer 👋"),h.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",h.createElement("code",{style:i},"ErrorBoundary")," or"," ",h.createElement("code",{style:i},"errorElement")," prop on your route.")),h.createElement(h.Fragment,null,h.createElement("h2",null,"Unexpected Application Error!"),h.createElement("h3",{style:{fontStyle:"italic"}},t),r?h.createElement("pre",{style:o},r):null,s)}var vi=h.createElement($i,null),wi=class extends h.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?h.createElement(be.Provider,{value:this.props.routeContext},h.createElement(ir.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function ki({routeContext:e,match:t,children:r}){let n=h.useContext(We);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),h.createElement(be.Provider,{value:e},r)}function Ci(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,i=r?.errors;if(i!=null){let c=o.findIndex(l=>l.route.id&&i?.[l.route.id]!==void 0);O(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let s=!1,d=-1;if(r)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(d=c),l.route.id){let{loaderData:u,errors:p}=r,m=l.route.loader&&!u.hasOwnProperty(l.route.id)&&(!p||p[l.route.id]===void 0);if(l.route.lazy||m){s=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,l,u)=>{let p,m=!1,g=null,y=null;r&&(p=i&&l.route.id?i[l.route.id]:void 0,g=l.route.errorElement||vi,s&&(d<0&&u===0?(Rn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),m=!0,y=null):d===u&&(m=!0,y=l.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,u+1)),$=()=>{let x;return p?x=g:m?x=y:l.route.Component?x=h.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=c,h.createElement(ki,{match:l,routeContext:{outlet:c,matches:b,isDataRoute:r!=null},children:x})};return r&&(l.route.ErrorBoundary||l.route.errorElement||u===0)?h.createElement(wi,{location:r.location,revalidation:r.revalidation,component:g,error:p,children:$(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):$()},null)}function ar(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Si(e){let t=h.useContext(We);return O(t,ar(e)),t}function Pi(e){let t=h.useContext(kt);return O(t,ar(e)),t}function ji(e){let t=h.useContext(be);return O(t,ar(e)),t}function sr(e){let t=ji(e),r=t.matches[t.matches.length-1];return O(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Ei(){return sr("useRouteId")}function Ri(){let e=h.useContext(ir),t=Pi("useRouteError"),r=sr("useRouteError");return e!==void 0?e:t.errors?.[r]}function zi(){let{router:e}=Si("useNavigate"),t=sr("useNavigate"),r=h.useRef(!1);return jn(()=>{r.current=!0}),h.useCallback(async(o,i={})=>{fe(r.current,Pn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var Er={};function Rn(e,t,r){!t&&!Er[e]&&(Er[e]=!0,fe(!1,r))}h.memo(Ti);function Ti({routes:e,future:t,state:r}){return En(e,void 0,r,t)}function zn(e){O(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Li({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:i=!1}){O(!tt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),d=h.useMemo(()=>({basename:s,navigator:o,static:i,future:{}}),[s,o,i]);typeof r=="string"&&(r=Be(r));let{pathname:c="/",search:l="",hash:u="",state:p=null,key:m="default"}=r,g=h.useMemo(()=>{let y=ye(c,s);return y==null?null:{location:{pathname:y,search:l,hash:u,state:p,key:m},navigationType:n}},[s,c,l,u,p,m,n]);return fe(g!=null,`<Router basename="${s}"> is not able to match the URL "${c}${l}${u}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:h.createElement(me.Provider,{value:d},h.createElement(et.Provider,{children:t,value:g}))}function Ii({children:e,location:t}){return bi(Gt(e),t)}function Gt(e,t=[]){let r=[];return h.Children.forEach(e,(n,o)=>{if(!h.isValidElement(n))return;let i=[...t,o];if(n.type===h.Fragment){r.push.apply(r,Gt(n.props.children,i));return}O(n.type===zn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),O(!n.props.index||!n.props.children,"An index route cannot have child routes.");let s={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(s.children=Gt(n.props.children,i)),r.push(s)}),r}var lt="get",dt="application/x-www-form-urlencoded";function Ct(e){return e!=null&&typeof e.tagName=="string"}function Mi(e){return Ct(e)&&e.tagName.toLowerCase()==="button"}function Ai(e){return Ct(e)&&e.tagName.toLowerCase()==="form"}function Ni(e){return Ct(e)&&e.tagName.toLowerCase()==="input"}function Di(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Fi(e,t){return e.button===0&&(!t||t==="_self")&&!Di(e)}var ot=null;function Oi(){if(ot===null)try{new FormData(document.createElement("form"),0),ot=!1}catch{ot=!0}return ot}var Bi=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Mt(e){return e!=null&&!Bi.has(e)?(fe(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${dt}"`),null):e}function Wi(e,t){let r,n,o,i,s;if(Ai(e)){let d=e.getAttribute("action");n=d?ye(d,t):null,r=e.getAttribute("method")||lt,o=Mt(e.getAttribute("enctype"))||dt,i=new FormData(e)}else if(Mi(e)||Ni(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||d.getAttribute("action");if(n=c?ye(c,t):null,r=e.getAttribute("formmethod")||d.getAttribute("method")||lt,o=Mt(e.getAttribute("formenctype"))||Mt(d.getAttribute("enctype"))||dt,i=new FormData(d,e),!Oi()){let{name:l,type:u,value:p}=e;if(u==="image"){let m=l?`${l}.`:"";i.append(`${m}x`,"0"),i.append(`${m}y`,"0")}else l&&i.append(l,p)}}else{if(Ct(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=lt,n=null,o=dt,s=e}return i&&o==="text/plain"&&(s=i,i=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:i,body:s}}function cr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function Hi(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function _i(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Gi(e,t,r){let n=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let s=await Hi(i,r);return s.links?s.links():[]}return[]}));return Vi(n.flat(1).filter(_i).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Rr(e,t,r,n,o,i){let s=(c,l)=>r[l]?c.route.id!==r[l].route.id:!0,d=(c,l)=>r[l].pathname!==c.pathname||r[l].route.path?.endsWith("*")&&r[l].params["*"]!==c.params["*"];return i==="assets"?t.filter((c,l)=>s(c,l)||d(c,l)):i==="data"?t.filter((c,l)=>{let u=n.routes[c.route.id];if(!u||!u.hasLoader)return!1;if(s(c,l)||d(c,l))return!0;if(c.route.shouldRevalidate){let p=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function Ui(e,t,{includeHydrateFallback:r}={}){return qi(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function qi(e){return[...new Set(e)]}function Yi(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function Vi(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let i=JSON.stringify(Yi(o));return r.has(i)||(r.add(i),n.push({key:i,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Ki=new Set([100,101,204,205]);function Xi(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&ye(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Tn(){let e=h.useContext(We);return cr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Qi(){let e=h.useContext(kt);return cr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var lr=h.createContext(void 0);lr.displayName="FrameworkContext";function Ln(){let e=h.useContext(lr);return cr(e,"You must render this element inside a <HydratedRouter> element"),e}function Ji(e,t){let r=h.useContext(lr),[n,o]=h.useState(!1),[i,s]=h.useState(!1),{onFocus:d,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:p}=t,m=h.useRef(null);h.useEffect(()=>{if(e==="render"&&s(!0),e==="viewport"){let b=x=>{x.forEach(v=>{s(v.isIntersecting)})},$=new IntersectionObserver(b,{threshold:.5});return m.current&&$.observe(m.current),()=>{$.disconnect()}}},[e]),h.useEffect(()=>{if(n){let b=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(b)}}},[n]);let g=()=>{o(!0)},y=()=>{o(!1),s(!1)};return r?e!=="intent"?[i,m,{}]:[i,m,{onFocus:_e(d,g),onBlur:_e(c,y),onMouseEnter:_e(l,g),onMouseLeave:_e(u,y),onTouchStart:_e(p,g)}]:[!1,m,{}]}function _e(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Zi({page:e,...t}){let{router:r}=Tn(),n=h.useMemo(()=>bn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?h.createElement(ta,{page:e,matches:n,...t}):null}function ea(e){let{manifest:t,routeModules:r}=Ln(),[n,o]=h.useState([]);return h.useEffect(()=>{let i=!1;return Gi(e,t,r).then(s=>{i||o(s)}),()=>{i=!0}},[e,t,r]),n}function ta({page:e,matches:t,...r}){let n=ze(),{manifest:o,routeModules:i}=Ln(),{basename:s}=Tn(),{loaderData:d,matches:c}=Qi(),l=h.useMemo(()=>Rr(e,t,c,o,n,"data"),[e,t,c,o,n]),u=h.useMemo(()=>Rr(e,t,c,o,n,"assets"),[e,t,c,o,n]),p=h.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let y=new Set,b=!1;if(t.forEach(x=>{let v=o.routes[x.route.id];!v||!v.hasLoader||(!l.some(k=>k.route.id===x.route.id)&&x.route.id in d&&i[x.route.id]?.shouldRevalidate||v.hasClientLoader?b=!0:y.add(x.route.id))}),y.size===0)return[];let $=Xi(e,s);return b&&y.size>0&&$.searchParams.set("_routes",t.filter(x=>y.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[s,d,n,o,l,t,e,i]),m=h.useMemo(()=>Ui(u,o),[u,o]),g=ea(u);return h.createElement(h.Fragment,null,p.map(y=>h.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...r})),m.map(y=>h.createElement("link",{key:y,rel:"modulepreload",href:y,...r})),g.map(({key:y,link:b})=>h.createElement("link",{key:y,...b})))}function ra(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var In=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{In&&(window.__reactRouterVersion="7.6.3")}catch{}function na({basename:e,children:t,window:r}){let n=h.useRef();n.current==null&&(n.current=_o({window:r,v5Compat:!0}));let o=n.current,[i,s]=h.useState({action:o.action,location:o.location}),d=h.useCallback(c=>{h.startTransition(()=>s(c))},[s]);return h.useLayoutEffect(()=>o.listen(d),[o,d]),h.createElement(Li,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:o})}var Mn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,An=h.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:i,replace:s,state:d,target:c,to:l,preventScrollReset:u,viewTransition:p,...m},g){let{basename:y}=h.useContext(me),b=typeof l=="string"&&Mn.test(l),$,x=!1;if(typeof l=="string"&&b&&($=l,In))try{let A=new URL(window.location.href),X=l.startsWith("//")?new URL(A.protocol+l):new URL(l),K=ye(X.pathname,y);X.origin===A.origin&&K!=null?l=K+X.search+X.hash:x=!0}catch{fe(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let v=gi(l,{relative:o}),[k,S,L]=Ji(n,m),R=sa(l,{replace:s,state:d,target:c,preventScrollReset:u,relative:o,viewTransition:p});function C(A){t&&t(A),A.defaultPrevented||R(A)}let G=h.createElement("a",{...m,...L,href:$||v,onClick:x||i?t:C,ref:ra(g,S),target:c,"data-discover":!b&&r==="render"?"true":void 0});return k&&!b?h.createElement(h.Fragment,null,G,h.createElement(Zi,{page:v})):G});An.displayName="Link";var oa=h.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:i,to:s,viewTransition:d,children:c,...l},u){let p=rt(s,{relative:l.relative}),m=ze(),g=h.useContext(kt),{navigator:y,basename:b}=h.useContext(me),$=g!=null&&ha(p)&&d===!0,x=y.encodeLocation?y.encodeLocation(p).pathname:p.pathname,v=m.pathname,k=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;r||(v=v.toLowerCase(),k=k?k.toLowerCase():null,x=x.toLowerCase()),k&&b&&(k=ye(k,b)||k);const S=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let L=v===x||!o&&v.startsWith(x)&&v.charAt(S)==="/",R=k!=null&&(k===x||!o&&k.startsWith(x)&&k.charAt(x.length)==="/"),C={isActive:L,isPending:R,isTransitioning:$},G=L?t:void 0,A;typeof n=="function"?A=n(C):A=[n,L?"active":null,R?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let X=typeof i=="function"?i(C):i;return h.createElement(An,{...l,"aria-current":G,className:A,ref:u,style:X,to:s,viewTransition:d},typeof c=="function"?c(C):c)});oa.displayName="NavLink";var ia=h.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:i,method:s=lt,action:d,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:p,...m},g)=>{let y=da(),b=ua(d,{relative:l}),$=s.toLowerCase()==="get"?"get":"post",x=typeof d=="string"&&Mn.test(d),v=k=>{if(c&&c(k),k.defaultPrevented)return;k.preventDefault();let S=k.nativeEvent.submitter,L=S?.getAttribute("formmethod")||s;y(S||k.currentTarget,{fetcherKey:t,method:L,navigate:r,replace:o,state:i,relative:l,preventScrollReset:u,viewTransition:p})};return h.createElement("form",{ref:g,method:$,action:b,onSubmit:n?c:v,...m,"data-discover":!x&&e==="render"?"true":void 0})});ia.displayName="Form";function aa(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Nn(e){let t=h.useContext(We);return O(t,aa(e)),t}function sa(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:i,viewTransition:s}={}){let d=xi(),c=ze(),l=rt(e,{relative:i});return h.useCallback(u=>{if(Fi(u,t)){u.preventDefault();let p=r!==void 0?r:Xe(c)===Xe(l);d(e,{replace:p,state:n,preventScrollReset:o,relative:i,viewTransition:s})}},[c,d,l,r,n,t,e,o,i,s])}var ca=0,la=()=>`__${String(++ca)}__`;function da(){let{router:e}=Nn("useSubmit"),{basename:t}=h.useContext(me),r=Ei();return h.useCallback(async(n,o={})=>{let{action:i,method:s,encType:d,formData:c,body:l}=Wi(n,t);if(o.navigate===!1){let u=o.fetcherKey||la();await e.fetch(u,r,o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||s,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||s,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function ua(e,{relative:t}={}){let{basename:r}=h.useContext(me),n=h.useContext(be);O(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),i={...rt(e||".",{relative:t})},s=ze();if(e==null){i.search=s.search;let d=new URLSearchParams(i.search),c=d.getAll("index");if(c.some(u=>u==="")){d.delete("index"),c.filter(p=>p).forEach(p=>d.append("index",p));let u=d.toString();i.search=u?`?${u}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(i.pathname=i.pathname==="/"?r:xe([r,i.pathname])),Xe(i)}function ha(e,t={}){let r=h.useContext(Sn);O(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=Nn("useViewTransitionState"),o=rt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let i=ye(r.currentLocation.pathname,n)||r.currentLocation.pathname,s=ye(r.nextLocation.pathname,n)||r.nextLocation.pathname;return xt(o.pathname,s)!=null||xt(o.pathname,i)!=null}[...Ki];const Dn={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},pa={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#ffffff",surfaceElevated:"#ffffff",surfaceHover:"#f9fafb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},fa={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Fn={colors:pa,...Dn},ma={colors:fa,...Dn},ga={light:Fn,dark:ma},xa=Fn;var q=function(){return q=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},q.apply(this,arguments)};function Qe(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,i;n<o;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var F="-ms-",Ke="-moz-",N="-webkit-",On="comm",St="rule",dr="decl",ya="@import",Bn="@keyframes",ba="@layer",Wn=Math.abs,ur=String.fromCharCode,Ut=Object.assign;function $a(e,t){return U(e,0)^45?(((t<<2^U(e,0))<<2^U(e,1))<<2^U(e,2))<<2^U(e,3):0}function Hn(e){return e.trim()}function ge(e,t){return(e=t.exec(e))?e[0]:e}function T(e,t,r){return e.replace(t,r)}function ut(e,t,r){return e.indexOf(t,r)}function U(e,t){return e.charCodeAt(t)|0}function Ae(e,t,r){return e.slice(t,r)}function he(e){return e.length}function _n(e){return e.length}function Ue(e,t){return t.push(e),e}function va(e,t){return e.map(t).join("")}function zr(e,t){return e.filter(function(r){return!ge(r,t)})}var Pt=1,Ne=1,Gn=0,se=0,_=0,He="";function jt(e,t,r,n,o,i,s,d){return{value:e,root:t,parent:r,type:n,props:o,children:i,line:Pt,column:Ne,length:s,return:"",siblings:d}}function $e(e,t){return Ut(jt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Te(e){for(;e.root;)e=$e(e.root,{children:[e]});Ue(e,e.siblings)}function wa(){return _}function ka(){return _=se>0?U(He,--se):0,Ne--,_===10&&(Ne=1,Pt--),_}function le(){return _=se<Gn?U(He,se++):0,Ne++,_===10&&(Ne=1,Pt++),_}function Pe(){return U(He,se)}function ht(){return se}function Et(e,t){return Ae(He,e,t)}function qt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ca(e){return Pt=Ne=1,Gn=he(He=e),se=0,[]}function Sa(e){return He="",e}function At(e){return Hn(Et(se-1,Yt(e===91?e+2:e===40?e+1:e)))}function Pa(e){for(;(_=Pe())&&_<33;)le();return qt(e)>2||qt(_)>3?"":" "}function ja(e,t){for(;--t&&le()&&!(_<48||_>102||_>57&&_<65||_>70&&_<97););return Et(e,ht()+(t<6&&Pe()==32&&le()==32))}function Yt(e){for(;le();)switch(_){case e:return se;case 34:case 39:e!==34&&e!==39&&Yt(_);break;case 40:e===41&&Yt(e);break;case 92:le();break}return se}function Ea(e,t){for(;le()&&e+_!==57;)if(e+_===84&&Pe()===47)break;return"/*"+Et(t,se-1)+"*"+ur(e===47?e:le())}function Ra(e){for(;!qt(Pe());)le();return Et(e,se)}function za(e){return Sa(pt("",null,null,null,[""],e=Ca(e),0,[0],e))}function pt(e,t,r,n,o,i,s,d,c){for(var l=0,u=0,p=s,m=0,g=0,y=0,b=1,$=1,x=1,v=0,k="",S=o,L=i,R=n,C=k;$;)switch(y=v,v=le()){case 40:if(y!=108&&U(C,p-1)==58){ut(C+=T(At(v),"&","&\f"),"&\f",Wn(l?d[l-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:C+=At(v);break;case 9:case 10:case 13:case 32:C+=Pa(y);break;case 92:C+=ja(ht()-1,7);continue;case 47:switch(Pe()){case 42:case 47:Ue(Ta(Ea(le(),ht()),t,r,c),c);break;default:C+="/"}break;case 123*b:d[l++]=he(C)*x;case 125*b:case 59:case 0:switch(v){case 0:case 125:$=0;case 59+u:x==-1&&(C=T(C,/\f/g,"")),g>0&&he(C)-p&&Ue(g>32?Lr(C+";",n,r,p-1,c):Lr(T(C," ","")+";",n,r,p-2,c),c);break;case 59:C+=";";default:if(Ue(R=Tr(C,t,r,l,u,o,d,k,S=[],L=[],p,i),i),v===123)if(u===0)pt(C,t,R,R,S,i,p,d,L);else switch(m===99&&U(C,3)===110?100:m){case 100:case 108:case 109:case 115:pt(e,R,R,n&&Ue(Tr(e,R,R,0,0,o,d,k,o,S=[],p,L),L),o,L,p,d,n?S:L);break;default:pt(C,R,R,R,[""],L,0,d,L)}}l=u=g=0,b=x=1,k=C="",p=s;break;case 58:p=1+he(C),g=y;default:if(b<1){if(v==123)--b;else if(v==125&&b++==0&&ka()==125)continue}switch(C+=ur(v),v*b){case 38:x=u>0?1:(C+="\f",-1);break;case 44:d[l++]=(he(C)-1)*x,x=1;break;case 64:Pe()===45&&(C+=At(le())),m=Pe(),u=p=he(k=C+=Ra(ht())),v++;break;case 45:y===45&&he(C)==2&&(b=0)}}return i}function Tr(e,t,r,n,o,i,s,d,c,l,u,p){for(var m=o-1,g=o===0?i:[""],y=_n(g),b=0,$=0,x=0;b<n;++b)for(var v=0,k=Ae(e,m+1,m=Wn($=s[b])),S=e;v<y;++v)(S=Hn($>0?g[v]+" "+k:T(k,/&\f/g,g[v])))&&(c[x++]=S);return jt(e,t,r,o===0?St:d,c,l,u,p)}function Ta(e,t,r,n){return jt(e,t,r,On,ur(wa()),Ae(e,2,-2),0,n)}function Lr(e,t,r,n,o){return jt(e,t,r,dr,Ae(e,0,n),Ae(e,n+1,-1),n,o)}function Un(e,t,r){switch($a(e,t)){case 5103:return N+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return N+e+e;case 4789:return Ke+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return N+e+Ke+e+F+e+e;case 5936:switch(U(e,t+11)){case 114:return N+e+F+T(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return N+e+F+T(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return N+e+F+T(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return N+e+F+e+e;case 6165:return N+e+F+"flex-"+e+e;case 5187:return N+e+T(e,/(\w+).+(:[^]+)/,N+"box-$1$2"+F+"flex-$1$2")+e;case 5443:return N+e+F+"flex-item-"+T(e,/flex-|-self/g,"")+(ge(e,/flex-|baseline/)?"":F+"grid-row-"+T(e,/flex-|-self/g,""))+e;case 4675:return N+e+F+"flex-line-pack"+T(e,/align-content|flex-|-self/g,"")+e;case 5548:return N+e+F+T(e,"shrink","negative")+e;case 5292:return N+e+F+T(e,"basis","preferred-size")+e;case 6060:return N+"box-"+T(e,"-grow","")+N+e+F+T(e,"grow","positive")+e;case 4554:return N+T(e,/([^-])(transform)/g,"$1"+N+"$2")+e;case 6187:return T(T(T(e,/(zoom-|grab)/,N+"$1"),/(image-set)/,N+"$1"),e,"")+e;case 5495:case 3959:return T(e,/(image-set\([^]*)/,N+"$1$`$1");case 4968:return T(T(e,/(.+:)(flex-)?(.*)/,N+"box-pack:$3"+F+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+N+e+e;case 4200:if(!ge(e,/flex-|baseline/))return F+"grid-column-align"+Ae(e,t)+e;break;case 2592:case 3360:return F+T(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,ge(n.props,/grid-\w+-end/)})?~ut(e+(r=r[t].value),"span",0)?e:F+T(e,"-start","")+e+F+"grid-row-span:"+(~ut(r,"span",0)?ge(r,/\d+/):+ge(r,/\d+/)-+ge(e,/\d+/))+";":F+T(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return ge(n.props,/grid-\w+-start/)})?e:F+T(T(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return T(e,/(.+)-inline(.+)/,N+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(he(e)-1-t>6)switch(U(e,t+1)){case 109:if(U(e,t+4)!==45)break;case 102:return T(e,/(.+:)(.+)-([^]+)/,"$1"+N+"$2-$3$1"+Ke+(U(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ut(e,"stretch",0)?Un(T(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return T(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,i,s,d,c,l){return F+o+":"+i+l+(s?F+o+"-span:"+(d?c:+c-+i)+l:"")+e});case 4949:if(U(e,t+6)===121)return T(e,":",":"+N)+e;break;case 6444:switch(U(e,U(e,14)===45?18:11)){case 120:return T(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+N+(U(e,14)===45?"inline-":"")+"box$3$1"+N+"$2$3$1"+F+"$2box$3")+e;case 100:return T(e,":",":"+F)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return T(e,"scroll-","scroll-snap-")+e}return e}function yt(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function La(e,t,r,n){switch(e.type){case ba:if(e.children.length)break;case ya:case dr:return e.return=e.return||e.value;case On:return"";case Bn:return e.return=e.value+"{"+yt(e.children,n)+"}";case St:if(!he(e.value=e.props.join(",")))return""}return he(r=yt(e.children,n))?e.return=e.value+"{"+r+"}":""}function Ia(e){var t=_n(e);return function(r,n,o,i){for(var s="",d=0;d<t;d++)s+=e[d](r,n,o,i)||"";return s}}function Ma(e){return function(t){t.root||(t=t.return)&&e(t)}}function Aa(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case dr:e.return=Un(e.value,e.length,r);return;case Bn:return yt([$e(e,{value:T(e.value,"@","@"+N)})],n);case St:if(e.length)return va(r=e.props,function(o){switch(ge(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Te($e(e,{props:[T(o,/:(read-\w+)/,":"+Ke+"$1")]})),Te($e(e,{props:[o]})),Ut(e,{props:zr(r,n)});break;case"::placeholder":Te($e(e,{props:[T(o,/:(plac\w+)/,":"+N+"input-$1")]})),Te($e(e,{props:[T(o,/:(plac\w+)/,":"+Ke+"$1")]})),Te($e(e,{props:[T(o,/:(plac\w+)/,F+"input-$1")]})),Te($e(e,{props:[o]})),Ut(e,{props:zr(r,n)});break}return""})}}var Na={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ie={},De=typeof process<"u"&&ie!==void 0&&(ie.REACT_APP_SC_ATTR||ie.SC_ATTR)||"data-styled",qn="active",Yn="data-styled-version",Rt="6.1.19",hr=`/*!sc*/
`,bt=typeof window<"u"&&typeof document<"u",Da=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&ie!==void 0&&ie.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&ie.REACT_APP_SC_DISABLE_SPEEDY!==""?ie.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&ie.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&ie!==void 0&&ie.SC_DISABLE_SPEEDY!==void 0&&ie.SC_DISABLE_SPEEDY!==""&&ie.SC_DISABLE_SPEEDY!=="false"&&ie.SC_DISABLE_SPEEDY),Fa={},zt=Object.freeze([]),Fe=Object.freeze({});function Vn(e,t,r){return r===void 0&&(r=Fe),e.theme!==r.theme&&e.theme||t||r.theme}var Kn=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Oa=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ba=/(^-|-$)/g;function Ir(e){return e.replace(Oa,"-").replace(Ba,"")}var Wa=/(a)(d)/gi,it=52,Mr=function(e){return String.fromCharCode(e+(e>25?39:97))};function Vt(e){var t,r="";for(t=Math.abs(e);t>it;t=t/it|0)r=Mr(t%it)+r;return(Mr(t%it)+r).replace(Wa,"$1-$2")}var Nt,Xn=5381,Le=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Qn=function(e){return Le(Xn,e)};function Jn(e){return Vt(Qn(e)>>>0)}function Ha(e){return e.displayName||e.name||"Component"}function Dt(e){return typeof e=="string"&&!0}var Zn=typeof Symbol=="function"&&Symbol.for,eo=Zn?Symbol.for("react.memo"):60115,_a=Zn?Symbol.for("react.forward_ref"):60112,Ga={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Ua={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},to={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},qa=((Nt={})[_a]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Nt[eo]=to,Nt);function Ar(e){return("type"in(t=e)&&t.type.$$typeof)===eo?to:"$$typeof"in e?qa[e.$$typeof]:Ga;var t}var Ya=Object.defineProperty,Va=Object.getOwnPropertyNames,Nr=Object.getOwnPropertySymbols,Ka=Object.getOwnPropertyDescriptor,Xa=Object.getPrototypeOf,Dr=Object.prototype;function ro(e,t,r){if(typeof t!="string"){if(Dr){var n=Xa(t);n&&n!==Dr&&ro(e,n,r)}var o=Va(t);Nr&&(o=o.concat(Nr(t)));for(var i=Ar(e),s=Ar(t),d=0;d<o.length;++d){var c=o[d];if(!(c in Ua||r&&r[c]||s&&c in s||i&&c in i)){var l=Ka(t,c);try{Ya(e,c,l)}catch{}}}}return e}function je(e){return typeof e=="function"}function pr(e){return typeof e=="object"&&"styledComponentId"in e}function Se(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Kt(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function Je(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Xt(e,t,r){if(r===void 0&&(r=!1),!r&&!Je(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=Xt(e[n],t[n]);else if(Je(t))for(var n in t)e[n]=Xt(e[n],t[n]);return e}function fr(e,t){Object.defineProperty(e,"toString",{value:t})}function Ee(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Qa=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,i=o;t>=i;)if((i<<=1)<0)throw Ee(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var s=o;s<i;s++)this.groupSizes[s]=0}for(var d=this.indexOfGroup(t+1),c=(s=0,r.length);s<c;s++)this.tag.insertRule(d,r[s])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var i=n;i<o;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),i=o+n,s=o;s<i;s++)r+="".concat(this.tag.getRule(s)).concat(hr);return r},e}(),ft=new Map,$t=new Map,mt=1,at=function(e){if(ft.has(e))return ft.get(e);for(;$t.has(mt);)mt++;var t=mt++;return ft.set(e,t),$t.set(t,e),t},Ja=function(e,t){mt=t+1,ft.set(e,t),$t.set(t,e)},Za="style[".concat(De,"][").concat(Yn,'="').concat(Rt,'"]'),es=new RegExp("^".concat(De,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ts=function(e,t,r){for(var n,o=r.split(","),i=0,s=o.length;i<s;i++)(n=o[i])&&e.registerName(t,n)},rs=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(hr),o=[],i=0,s=n.length;i<s;i++){var d=n[i].trim();if(d){var c=d.match(es);if(c){var l=0|parseInt(c[1],10),u=c[2];l!==0&&(Ja(u,l),ts(e,u,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(d)}}},Fr=function(e){for(var t=document.querySelectorAll(Za),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(De)!==qn&&(rs(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function ns(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var no=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(d){var c=Array.from(d.querySelectorAll("style[".concat(De,"]")));return c[c.length-1]}(r),i=o!==void 0?o.nextSibling:null;n.setAttribute(De,qn),n.setAttribute(Yn,Rt);var s=ns();return s&&n.setAttribute("nonce",s),r.insertBefore(n,i),n},os=function(){function e(t){this.element=no(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,i=n.length;o<i;o++){var s=n[o];if(s.ownerNode===r)return s}throw Ee(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),is=function(){function e(t){this.element=no(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),as=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Or=bt,ss={isServer:!bt,useCSSOMInjection:!Da},vt=function(){function e(t,r,n){t===void 0&&(t=Fe),r===void 0&&(r={});var o=this;this.options=q(q({},ss),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&bt&&Or&&(Or=!1,Fr(this)),fr(this,function(){return function(i){for(var s=i.getTag(),d=s.length,c="",l=function(p){var m=function(x){return $t.get(x)}(p);if(m===void 0)return"continue";var g=i.names.get(m),y=s.getGroup(p);if(g===void 0||!g.size||y.length===0)return"continue";var b="".concat(De,".g").concat(p,'[id="').concat(m,'"]'),$="";g!==void 0&&g.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(y).concat(b,'{content:"').concat($,'"}').concat(hr)},u=0;u<d;u++)l(u);return c}(o)})}return e.registerId=function(t){return at(t)},e.prototype.rehydrate=function(){!this.server&&bt&&Fr(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(q(q({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new as(o):n?new os(o):new is(o)}(this.options),new Qa(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(at(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(at(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(at(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),cs=/&/g,ls=/^\s*\/\/.*$/gm;function oo(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=oo(r.children,t)),r})}function ds(e){var t,r,n,o=Fe,i=o.options,s=i===void 0?Fe:i,d=o.plugins,c=d===void 0?zt:d,l=function(m,g,y){return y.startsWith(r)&&y.endsWith(r)&&y.replaceAll(r,"").length>0?".".concat(t):m},u=c.slice();u.push(function(m){m.type===St&&m.value.includes("&")&&(m.props[0]=m.props[0].replace(cs,r).replace(n,l))}),s.prefix&&u.push(Aa),u.push(La);var p=function(m,g,y,b){g===void 0&&(g=""),y===void 0&&(y=""),b===void 0&&(b="&"),t=b,r=g,n=new RegExp("\\".concat(r,"\\b"),"g");var $=m.replace(ls,""),x=za(y||g?"".concat(y," ").concat(g," { ").concat($," }"):$);s.namespace&&(x=oo(x,s.namespace));var v=[];return yt(x,Ia(u.concat(Ma(function(k){return v.push(k)})))),v};return p.hash=c.length?c.reduce(function(m,g){return g.name||Ee(15),Le(m,g.name)},Xn).toString():"",p}var us=new vt,Qt=ds(),io=V.createContext({shouldForwardProp:void 0,styleSheet:us,stylis:Qt});io.Consumer;V.createContext(void 0);function Jt(){return h.useContext(io)}var hs=function(){function e(t,r){var n=this;this.inject=function(o,i){i===void 0&&(i=Qt);var s=n.name+i.hash;o.hasNameForId(n.id,s)||o.insertRules(n.id,s,i(n.rules,s,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,fr(this,function(){throw Ee(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Qt),this.name+t.hash},e}(),ps=function(e){return e>="A"&&e<="Z"};function Br(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;ps(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var ao=function(e){return e==null||e===!1||e===""},so=function(e){var t,r,n=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!ao(i)&&(Array.isArray(i)&&i.isCss||je(i)?n.push("".concat(Br(o),":"),i,";"):Je(i)?n.push.apply(n,Qe(Qe(["".concat(o," {")],so(i),!1),["}"],!1)):n.push("".concat(Br(o),": ").concat((t=o,(r=i)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in Na||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function ve(e,t,r,n){if(ao(e))return[];if(pr(e))return[".".concat(e.styledComponentId)];if(je(e)){if(!je(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return ve(o,t,r,n)}var i;return e instanceof hs?r?(e.inject(r,n),[e.getName(n)]):[e]:Je(e)?so(e):Array.isArray(e)?Array.prototype.concat.apply(zt,e.map(function(s){return ve(s,t,r,n)})):[e.toString()]}function co(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(je(r)&&!pr(r))return!1}return!0}var fs=Qn(Rt),ms=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&co(t),this.componentId=r,this.baseHash=Le(fs,r),this.baseStyle=n,vt.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Se(o,this.staticRulesId);else{var i=Kt(ve(this.rules,t,r,n)),s=Vt(Le(this.baseHash,i)>>>0);if(!r.hasNameForId(this.componentId,s)){var d=n(i,".".concat(s),void 0,this.componentId);r.insertRules(this.componentId,s,d)}o=Se(o,s),this.staticRulesId=s}else{for(var c=Le(this.baseHash,n.hash),l="",u=0;u<this.rules.length;u++){var p=this.rules[u];if(typeof p=="string")l+=p;else if(p){var m=Kt(ve(p,t,r,n));c=Le(c,m+u),l+=m}}if(l){var g=Vt(c>>>0);r.hasNameForId(this.componentId,g)||r.insertRules(this.componentId,g,n(l,".".concat(g),void 0,this.componentId)),o=Se(o,g)}}return o},e}(),Ze=V.createContext(void 0);Ze.Consumer;function gs(e){var t=V.useContext(Ze),r=h.useMemo(function(){return function(n,o){if(!n)throw Ee(14);if(je(n)){var i=n(o);return i}if(Array.isArray(n)||typeof n!="object")throw Ee(8);return o?q(q({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?V.createElement(Ze.Provider,{value:r},e.children):null}var Ft={};function xs(e,t,r){var n=pr(e),o=e,i=!Dt(e),s=t.attrs,d=s===void 0?zt:s,c=t.componentId,l=c===void 0?function(S,L){var R=typeof S!="string"?"sc":Ir(S);Ft[R]=(Ft[R]||0)+1;var C="".concat(R,"-").concat(Jn(Rt+R+Ft[R]));return L?"".concat(L,"-").concat(C):C}(t.displayName,t.parentComponentId):c,u=t.displayName,p=u===void 0?function(S){return Dt(S)?"styled.".concat(S):"Styled(".concat(Ha(S),")")}(e):u,m=t.displayName&&t.componentId?"".concat(Ir(t.displayName),"-").concat(t.componentId):t.componentId||l,g=n&&o.attrs?o.attrs.concat(d).filter(Boolean):d,y=t.shouldForwardProp;if(n&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;y=function(S,L){return b(S,L)&&$(S,L)}}else y=b}var x=new ms(r,m,n?o.componentStyle:void 0);function v(S,L){return function(R,C,G){var A=R.attrs,X=R.componentStyle,K=R.defaultProps,re=R.foldedComponentIds,de=R.styledComponentId,ne=R.target,oe=V.useContext(Ze),ke=Jt(),ce=R.shouldForwardProp||ke.shouldForwardProp,Ce=Vn(C,oe,K)||Fe,w=function(W,Q,M){for(var D,H=q(q({},Q),{className:void 0,theme:M}),B=0;B<W.length;B+=1){var Z=je(D=W[B])?D(H):D;for(var J in Z)H[J]=J==="className"?Se(H[J],Z[J]):J==="style"?q(q({},H[J]),Z[J]):Z[J]}return Q.className&&(H.className=Se(H.className,Q.className)),H}(A,C,Ce),E=w.as||ne,j={};for(var P in w)w[P]===void 0||P[0]==="$"||P==="as"||P==="theme"&&w.theme===Ce||(P==="forwardedAs"?j.as=w.forwardedAs:ce&&!ce(P,E)||(j[P]=w[P]));var z=function(W,Q){var M=Jt(),D=W.generateAndInjectStyles(Q,M.styleSheet,M.stylis);return D}(X,w),I=Se(re,de);return z&&(I+=" "+z),w.className&&(I+=" "+w.className),j[Dt(E)&&!Kn.has(E)?"class":"className"]=I,G&&(j.ref=G),h.createElement(E,j)}(k,S,L)}v.displayName=p;var k=V.forwardRef(v);return k.attrs=g,k.componentStyle=x,k.displayName=p,k.shouldForwardProp=y,k.foldedComponentIds=n?Se(o.foldedComponentIds,o.styledComponentId):"",k.styledComponentId=m,k.target=n?o.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(S){this._foldedDefaultProps=n?function(L){for(var R=[],C=1;C<arguments.length;C++)R[C-1]=arguments[C];for(var G=0,A=R;G<A.length;G++)Xt(L,A[G],!0);return L}({},o.defaultProps,S):S}}),fr(k,function(){return".".concat(k.styledComponentId)}),i&&ro(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function Wr(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Hr=function(e){return Object.assign(e,{isCss:!0})};function pe(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(je(e)||Je(e))return Hr(ve(Wr(zt,Qe([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?ve(n):Hr(ve(Wr(n,t)))}function Zt(e,t,r){if(r===void 0&&(r=Fe),!t)throw Ee(1,t);var n=function(o){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return e(t,r,pe.apply(void 0,Qe([o],i,!1)))};return n.attrs=function(o){return Zt(e,t,q(q({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Zt(e,t,q(q({},r),o))},n}var lo=function(e){return Zt(xs,e)},f=lo;Kn.forEach(function(e){f[e]=lo(e)});var ys=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=co(t),vt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var i=o(Kt(ve(this.rules,r,n,o)),""),s=this.componentId+t;n.insertRules(s,s,i)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&vt.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function bs(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=pe.apply(void 0,Qe([e],t,!1)),o="sc-global-".concat(Jn(JSON.stringify(n))),i=new ys(n,o),s=function(c){var l=Jt(),u=V.useContext(Ze),p=V.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&d(p,c,l.styleSheet,u,l.stylis),V.useLayoutEffect(function(){if(!l.styleSheet.server)return d(p,c,l.styleSheet,u,l.stylis),function(){return i.removeStyles(p,l.styleSheet)}},[p,c,l.styleSheet,u,l.stylis]),null};function d(c,l,u,p,m){if(i.isStatic)i.renderStyles(c,Fa,u,m);else{var g=q(q({},l),{theme:Vn(l,p,s.defaultProps)});i.renderStyles(c,g,u,m)}}return V.memo(s)}const uo=h.createContext(void 0),$s=()=>{const e=h.useContext(uo);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},vs=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",ws=({children:e})=>{const t=Oe(),r=t.preferences.theme||"system",o=r==="system"?vs():r,i=ga[o]||xa,s={theme:i,themeName:o,themePreference:r,setTheme:d=>{t.updatePreference("theme",d)},toggleTheme:()=>{const d=o==="light"?"dark":"light";t.updatePreference("theme",d)},isDarkMode:o==="dark"};return h.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const d=window.matchMedia("(prefers-color-scheme: dark)"),c=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return d.addEventListener("change",c),()=>d.removeEventListener("change",c)}},[r,t]),h.useEffect(()=>{if(typeof document<"u"){const d=document.documentElement;Object.entries(i.colors).forEach(([c,l])=>{d.style.setProperty(`--color-${c}`,l)}),Object.entries(i.spacing).forEach(([c,l])=>{d.style.setProperty(`--spacing-${c}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[i,o]),a.jsx(uo.Provider,{value:s,children:a.jsx(gs,{theme:i,children:e})})};function ks(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Cs(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var Ot=typeof window<"u",Ss=function(e){h.useEffect(e,[])},Ps=function(e){var t=h.useRef(e);t.current=e,Ss(function(){return function(){return t.current()}})},js=function(e){var t=h.useRef(0),r=h.useState(e),n=r[0],o=r[1],i=h.useCallback(function(s){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(s)})},[]);return Ps(function(){cancelAnimationFrame(t.current)}),[n,i]},ho=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,i=o===void 0?1/0:o,s=t.onChange,d=js({width:Ot?window.innerWidth:n,height:Ot?window.innerHeight:i}),c=d[0],l=d[1];return h.useEffect(function(){if(Ot){var u=function(){var p=window.innerWidth,m=window.innerHeight;l({width:p,height:m}),s&&s(p,m)};return ks(window,"resize",u),function(){Cs(window,"resize",u)}}},[]),c};const po=()=>{const{width:e=0,height:t=0}=ho();return{width:e,height:t}},Es=()=>{const{width:e=0,height:t=0}=ho();return e>t?"landscape":"portrait"},Rs=()=>{const{width:e}=po(),{theme:t}=$s(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},zs=()=>{const[e,t]=h.useState(!1);return h.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Tt=()=>{const e=po(),t=Es(),r=Rs(),n=zs();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n}},Ts=h.createContext(void 0),Ls=({children:e})=>{const t=Oe(),r=Tt(),[n,o]=h.useState(!0),[i,s]=h.useState(["chat","moves"]),[d,c]=h.useState(!1),l=t.preferences.layout,u=h.useMemo(()=>l==="auto"?r.orientation:l,[l,r.orientation]),p=h.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),m=b=>{t.updatePreference("layout",b)},g=b=>{s($=>$.includes(b)?$.filter(x=>x!==b):[...$,b])};h.useEffect(()=>{c(!0),o($=>{const x=!p;return $!==x?x:$}),s($=>{if(p&&u==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(u==="landscape"&&!p){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[u,p]);const y={...r,layoutPreference:l,setLayoutPreference:m,activeLayout:u,isCompactMode:p,showSidebar:n,setSidebarVisible:o,activePanels:i,togglePanel:g,isTransitioning:d};return a.jsx(Ts.Provider,{value:y,children:e})};f.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: ${({isTransitioning:e,theme:t})=>e?`all ${t.transitions.normal}`:"none"};
`;f.main`
    flex: 1;
    display: flex;
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?pe`
                flex-direction: column;
            `:pe`
                flex-direction: row;
            `}
`;f.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?pe`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `:pe`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `}
`;f.aside`
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`all ${e.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t,showSidebar:r})=>r?e==="portrait"||t?pe`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme:n})=>n.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `:pe`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme:n})=>n.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `:pe`
                width: 0;
                height: 0;
                opacity: 0;
                border: none;
            `}
`;f.div`
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
`;f.div`
    display: flex;
    flex-direction: ${({direction:e})=>e||"row"};
    justify-content: ${({justify:e})=>e||"start"};
    align-items: ${({align:e})=>e||"stretch"};
    gap: ${({gap:e,theme:t})=>e||t.spacing.md};
    flex-wrap: ${({wrap:e})=>e?"wrap":"nowrap"};

    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        flex-direction: column;
    }
`;f.div`
    ${({showOn:e,hideOn:t,theme:r})=>{let n="";return t?.includes("mobile")&&(n+=`
        @media (max-width: ${r.breakpoints.tablet}) {
          display: none;
        }
      `),t?.includes("tablet")&&(n+=`
        @media (min-width: ${r.breakpoints.tablet}) and (max-width: ${r.breakpoints.desktop}) {
          display: none;
        }
      `),t?.includes("desktop")&&(n+=`
        @media (min-width: ${r.breakpoints.desktop}) {
          display: none;
        }
      `),e?.length&&(n+="display: none;",e.includes("mobile")&&(n+=`
          @media (max-width: ${r.breakpoints.tablet}) {
            display: block;
          }
        `),e.includes("tablet")&&(n+=`
          @media (min-width: ${r.breakpoints.tablet}) and (max-width: ${r.breakpoints.desktop}) {
            display: block;
          }
        `),e.includes("desktop")&&(n+=`
          @media (min-width: ${r.breakpoints.desktop}) {
            display: block;
          }
        `)),pe`${n}`}}
`;f.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;f.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    background: ${({theme:e})=>e.colors.background};
`;f.header`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
`;f.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme:e})=>e.spacing.lg};
    min-height: 0; // Important for flexbox to allow shrinking
`;f.aside`
    width: ${({width:e,$isCollapsed:t})=>t?"0px":`${e}px`};
    height: 100vh;
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-left: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`width ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;f.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.sm};
    flex-shrink: 0;
`;f.button`
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
`;f.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.md};
`;f.div`
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
`;f.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;f.header`
    height: 50px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
`;f.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};
    padding: ${({theme:e})=>e.spacing.sm};
    min-height: 0; // Important for flexbox
    max-height: 65vh; // Leave room for bottom panels
`;f.div`
    height: ${({$isExpanded:e,$panelHeight:t})=>e?`${t}px`:"60px"};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-top: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`height ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;f.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.xs};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    background: ${({theme:e})=>e.colors.backgroundTertiary};
    overflow-x: auto;
    flex-shrink: 0;
`;f.button`
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
`;f.button`
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
`;f.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.sm};
`;f.div`
    width: 100%;
    height: 100%;
    touch-action: pan-y; // Allow vertical scrolling but capture horizontal swipes
`;f.button`
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
`;const Is=f.header`
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
`,Ms=f.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,As=f.button`
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
`,Ns=f.img`
  width: 160px;
  height: 40px;
  display: block;
  
  @media (min-width: 640px) {
    width: 200px;
    height: 50px;
    margin-right: ${e=>e.theme.spacing[2]};
  }
`;f.h1`
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  color: ${e=>e.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;const Ds=f.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,_r=f.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Gr=f.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Ur=f.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,Ge=f.button`
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
`,fo=Y(({onMenuClick:e})=>{const{preferencesStore:t}=Re(),{viewMode:r,chessOrientation:n}=t.preferences,o=d=>{t.updatePreference("viewMode",d)},i=d=>{t.updatePreference("chessOrientation",d)},s=r==="chat-only";return a.jsxs(Is,{children:[a.jsxs(Ms,{children:[a.jsx(As,{onClick:e,"aria-label":"Menu",children:"☰"}),a.jsx(Ns,{src:"/simpleficsinterface.svg",alt:"Simple FICS Interface",title:"Simple FICS Interface"})]}),a.jsxs(Ds,{children:[a.jsxs(_r,{children:[a.jsx(Gr,{children:"Orient:"}),a.jsxs(Ur,{children:[a.jsx(Ge,{$isActive:n==="landscape",$isDisabled:s,onClick:()=>!s&&i("landscape"),disabled:s,title:"Landscape",children:"▭"}),a.jsx(Ge,{$isActive:n==="portrait",$isDisabled:s,onClick:()=>!s&&i("portrait"),disabled:s,title:"Portrait",children:"▯"})]})]}),a.jsxs(_r,{children:[a.jsx(Gr,{children:"Mode:"}),a.jsxs(Ur,{children:[a.jsx(Ge,{$isActive:r==="chess-only",onClick:()=>o("chess-only"),title:"Chess Only",children:"♔"}),a.jsx(Ge,{$isActive:r==="chess-and-chat",onClick:()=>o("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.jsx(Ge,{$isActive:r==="chat-only",onClick:()=>o("chat-only"),title:"Chat Only",children:"▤"})]})]})]})]})});fo.displayName="AppHeader";const Fs=f.img`
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
`,Os={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},we=({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=Os[e];if(!o)return null;const i=`/pieces/cburnett/${o}.svg`;return a.jsx(Fs,{className:"chess-piece",src:i,alt:o,$isDragging:r,draggable:!1,style:n})};we.displayName="ChessPiece";const Bs=f.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Ws=f.div`
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
`,Hs=f.button`
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
`,mo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const i=["Q","R","B","N"],s=d=>t==="white"?d:d.toLowerCase();return a.jsx(Bs,{$isOpen:e,onClick:n,children:a.jsx(Ws,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:i.map(d=>a.jsx(Hs,{onClick:()=>r(d),children:a.jsx(we,{piece:s(d),size:50})},d))})})};mo.displayName="PromotionDialog";const _s=f.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  user-select: none;
`,Gs=f.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,Us=f.div`
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
`,qr=f.div`
  position: absolute;
  font-size: 7px;
  font-weight: 600;
  color: ${e=>e.$isLight?e.theme.colors.board.dark:e.theme.colors.board.light};
  opacity: 0.8;
  user-select: none;
  line-height: 1;
  
  ${e=>e.$type==="file"?`
    bottom: 1px;
    right: 1px;
  `:`
    top: 1px;
    left: 1px;
  `}
`,qs=f.div`
  position: fixed;
  left: 0;
  top: 0;
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(
    calc(${e=>e.$x}px - 50%), 
    calc(${e=>e.$y}px - 50%)
  );
  will-change: transform;
`,Ys=f.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  pointer-events: none;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(
    ${e=>e.$fromX+(e.$toX-e.$fromX)*e.$progress}px,
    ${e=>e.$fromY+(e.$toY-e.$fromY)*e.$progress}px
  );
  will-change: transform;
`,Ie=["a","b","c","d","e","f","g","h"],Me=["8","7","6","5","4","3","2","1"];function Vs(e,t){return(e+t)%2===0}function Ks(e,t,r){const n=r?Ie[7-e]:Ie[e],o=r?Me[7-t]:Me[t];return`${n}${o}`}function Xs(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,i)=>{let s=0;for(const d of o)if(d>="1"&&d<="8")s+=parseInt(d);else{const c=`${Ie[s]}${Me[i]}`;t.set(c,d),s++}}),t}const er=Y(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,highlightedSquares:i=new Set,lastMove:s,interactive:d=!0,onSizeCalculated:c})=>{Tt();const l=Oe(),u=nr(),p=h.useRef(null),[m,g]=h.useState(t||200),[y,b]=h.useState(null),[$,x]=h.useState(new Set),[v,k]=h.useState(null),[S,L]=h.useState([]),R=h.useRef(),[C,G]=h.useState(null),A=h.useMemo(()=>Xs(e),[e]),X=h.useRef(new Map),K=h.useCallback((w,E)=>{const j=Ie.indexOf(w[0]),P=Me.indexOf(w[1]),z=E/8,I=r?(7-j)*z:j*z,W=r?(7-P)*z:P*z;return{x:I,y:W}},[r]),re=h.useCallback((w,E,j)=>{const P=w.toLowerCase()==="p",z=j[1];return P&&(z==="8"||z==="1")},[]),de=h.useCallback(w=>{w.preventDefault(),u.isPlaying&&u.clearPremove()},[u]);h.useEffect(()=>{if(t){g(t);return}const w=()=>{if(!p.current){console.log("calculateBoardSize: No container ref");return}const I=p.current.parentElement;if(!I){console.log("calculateBoardSize: No parent element");return}const{width:W,height:Q}=I.getBoundingClientRect(),M=p.current.getBoundingClientRect();console.log("calculateBoardSize debug:",{parentSize:{width:W,height:Q},containerSize:{width:M.width,height:M.height},currentCalculatedSize:m,parentElement:I.className||I.tagName});const D=16,H=W-D,B=Q-D,Z=Math.floor(Math.min(H,B)),J=Math.max(100,Math.floor(Z/8)*8);J!==m&&(g(J),c?.(J))},E=setTimeout(w,50);w();let j;const P=()=>{clearTimeout(j),j=setTimeout(w,100)};window.addEventListener("resize",P);let z=null;return p.current&&p.current.parentElement&&(z=new ResizeObserver(()=>{P()}),z.observe(p.current.parentElement)),()=>{window.removeEventListener("resize",P),clearTimeout(j),clearTimeout(E),z&&z.disconnect()}},[t,m]);const ne=m/8,oe=h.useMemo(()=>{if(!l.preferences.animateMoves)return!1;if(u.isPlaying&&l.preferences.disableAnimationLowTime){const w=u.currentGame,E=u.playingColor;if(w&&E&&(E==="white"?w.white.time:w.black.time)<10)return!1}return!0},[l.preferences.animateMoves,l.preferences.disableAnimationLowTime,u.isPlaying,u.currentGame,u.playingColor]);h.useEffect(()=>{if(!oe){X.current=new Map(A);return}const w=X.current,E=[];w.forEach((j,P)=>{A.has(P)||A.forEach((z,I)=>{z===j&&!w.has(I)&&s&&s.from===P&&s.to===I&&E.push({piece:j,from:P,to:I,startTime:Date.now()})})}),E.length>0&&L(j=>[...j,...E]),X.current=new Map(A)},[A,s,oe]),h.useEffect(()=>{if(S.length===0)return;const w=()=>{const E=Date.now(),j=l.preferences.animationDuration;L(P=>{const z=P.filter(I=>E-I.startTime<j);return z.length>0&&(R.current=requestAnimationFrame(w)),z})};return R.current=requestAnimationFrame(w),()=>{R.current&&cancelAnimationFrame(R.current)}},[S.length,l.preferences.animationDuration]);const ke=h.useCallback((w,E)=>{if(!d)return;const j=A.get(w);if(y)if($.has(w)||w!==y){const P=A.get(y);if(P&&re(P,y,w)){const z=P===P.toUpperCase()?"white":"black";if(u.isPlaying){const I=l.preferences.autoPromotionPiece;u.isMyTurn?o?.(y,w,I):u.setPremove(y,w,I)}else{const I=E?.currentTarget.getBoundingClientRect();G({from:y,to:w,color:z,position:I?{x:I.left+I.width/2,y:I.top+I.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else u.isPlaying&&!u.isMyTurn?u.setPremove(y,w):o?.(y,w);b(null),x(new Set)}else b(null),x(new Set);else j&&(b(w),x(new Set))},[y,$,A,o,d,re,u.isPlaying,u.isMyTurn,l.preferences.autoPromotionPiece,u]),ce=h.useCallback((w,E,j)=>{if(!d)return;w.preventDefault(),b(E);const P=w.currentTarget.getBoundingClientRect(),z=P.width,I=P.left+P.width/2,W=P.top+P.height/2,Q=w.clientX-I,M=w.clientY-W;k({piece:j,from:E,x:I,y:W,size:z});const D=B=>{k(Z=>Z?{...Z,x:B.clientX-Q,y:B.clientY-M}:null)},H=B=>{const ee=document.elementsFromPoint(B.clientX,B.clientY).find(Lt=>Lt.getAttribute("data-square"))?.getAttribute("data-square");if(ee&&ee!==E)if(re(j,E,ee)){const Lt=j===j.toUpperCase()?"white":"black";if(u.isPlaying){const $r=l.preferences.autoPromotionPiece;u.isMyTurn?o?.(E,ee,$r):u.setPremove(E,ee,$r)}else G({from:E,to:ee,color:Lt,position:{x:B.clientX,y:B.clientY}})}else u.isPlaying&&!u.isMyTurn?u.setPremove(E,ee):o?.(E,ee);k(null),b(null),x(new Set),document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",D),document.addEventListener("mouseup",H)},[o,d,re,u.isPlaying,u.isMyTurn,l.preferences.autoPromotionPiece,u]),Ce=h.useMemo(()=>{const w=[];for(let E=0;E<8;E++)for(let j=0;j<8;j++){const P=Vs(j,E),z=Ks(j,E,r),I=A.get(z),W=i.has(z),Q=s&&(s.from===z||s.to===z),M=y===z,D=$.has(z),H=v?.from===z,B=S.some(ee=>ee.to===z),Z=n&&E===7,J=n&&j===0;w.push(a.jsxs(Us,{"data-square":z,$isLight:P,$isHighlighted:W,$isLastMoveSquare:!!Q,$isSelected:M,$isPossibleMove:D,onClick:ee=>ke(z,ee),onMouseDown:ee=>I&&ce(ee,z,I),children:[I&&!H&&!B&&a.jsx(we,{piece:I,size:ne}),Z&&a.jsx(qr,{$type:"file",$isLight:P,children:r?Ie[7-j]:Ie[j]}),J&&a.jsx(qr,{$type:"rank",$isLight:P,children:r?Me[7-E]:Me[E]})]},z))}return w},[r,n,A,i,s,y,$,v,ne,ke,ce]);return a.jsxs(a.Fragment,{children:[a.jsxs(_s,{ref:p,$size:m,onContextMenu:de,children:[a.jsx(Gs,{children:Ce}),S.map((w,E)=>{const j=K(w.from,m),P=K(w.to,m),z=Date.now()-w.startTime,I=l.preferences.animationDuration,W=Math.min(z/I,1),M=(D=>D<.5?4*D*D*D:1-Math.pow(-2*D+2,3)/2)(W);return a.jsx(Ys,{$fromX:j.x,$fromY:j.y,$toX:P.x,$toY:P.y,$progress:M,$size:ne,children:a.jsx(we,{piece:w.piece,size:ne})},`${w.from}-${w.to}-${w.startTime}`)})]}),v&&a.jsx(a.Fragment,{children:a.jsx(qs,{$x:v.x,$y:v.y,$size:v.size,children:a.jsx(we,{piece:v.piece,size:v.size,isDragging:!0})})}),C&&a.jsx(mo,{isOpen:!0,color:C.color,position:C.position,onSelect:w=>{o?.(C.from,C.to,w),G(null)},onCancel:()=>G(null)})]})});er.displayName="ChessBoardWithPieces";const Qs=f.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,go=f.span`
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
`,mr=({time:e,size:t="medium",isActive:r=!1,lowTimeThreshold:n=30,showTenths:o=!1,className:i,compact:s=!1})=>{const d=l=>{const u=Math.floor(l/3600),p=Math.floor(l%3600/60),m=Math.floor(l%60),g=Math.floor(l%1*10),y=r&&Math.floor(l)%2===0?" ":":";return u>0?`${u}${y}${p.toString().padStart(2,"0")}${y}${m.toString().padStart(2,"0")}`:l<n&&o?`${p}${y}${m.toString().padStart(2,"0")}.${g}`:`${p}${y}${m.toString().padStart(2,"0")}`},c=e<=n&&e>0;return a.jsx(Qs,{size:t,className:i,children:a.jsx(go,{$isLowTime:c,$isActive:r,$compact:s,children:d(e)})})},nt=f(mr).attrs({size:"large"})`
    ${go} {
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
        background: ${({theme:e})=>e.colors.surface};
        font-size: 20px;
        
        &:hover {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.15);
        }
    }
`;f(mr).attrs({size:"small"})`
    font-size: 12px;
`;f(mr).attrs({size:"medium"})`
    font-size: 16px;
`;const Js=f.div`
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
`,Zs=f.button`
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
`,ec=f.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,xo=Y(({playerName:e,position:t,onClose:r})=>{const n=xn(),o=Oe(),i=h.useRef(null),s=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];h.useEffect(()=>{const c=u=>{i.current&&!i.current.contains(u.target)&&r()},l=u=>{u.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[r]),h.useEffect(()=>{if(i.current){const c=i.current.getBoundingClientRect(),l=window.innerWidth,u=window.innerHeight;let p=t.x,m=t.y;c.right>l&&(p=l-c.width-10),c.bottom>u&&(m=u-c.height-10),(p!==t.x||m!==t.y)&&(i.current.style.left=`${p}px`,i.current.style.top=`${m}px`)}},[t]);const d=c=>{const l=c.replace("{player}",e);n.sendCommand(l),r()};return a.jsx(Js,{ref:i,$x:t.x,$y:t.y,children:s.map((c,l)=>"divider"in c&&c.divider?a.jsx(ec,{},l):"command"in c?a.jsx(Zs,{onClick:()=>d(c.command),children:c.label},l):null)})});xo.displayName="PlayerContextMenu";const tc=f.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,gr=({name:e,className:t,style:r})=>{const[n,o]=h.useState(null),i=s=>{s.preventDefault(),s.stopPropagation(),o({x:s.clientX,y:s.clientY})};return a.jsxs(a.Fragment,{children:[a.jsx(tc,{className:t,style:r,onClick:i,children:e}),n&&a.jsx(xo,{playerName:e,position:n,onClose:()=>o(null)})]})};gr.displayName="PlayerName";const rc=f.div`
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
`,nc=f.div`
  display: flex;
  align-items: center;
  width: 100%;
`,oc=f.div`
  display: flex;
  align-items: center;
  flex: 1;
`,ic=f.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ac=f.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  margin-left: 4px;
`;f.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${e=>e.$isWhite?"#ffffff":"#000000"};
  border: 1px solid ${e=>e.$isWhite?"#000000":"#ffffff"};
  box-shadow: ${e=>e.theme.shadows.sm};
`;const qe=Y(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:i="horizontal",hideClockInCard:s=!1,onlyInfo:d=!1,compact:c=!1})=>{const l=a.jsxs(a.Fragment,{children:[a.jsx(nc,{children:a.jsxs(oc,{children:[a.jsx(ic,{children:a.jsx(gr,{name:e})}),a.jsx(ac,{children:t})]})}),!s&&!d&&a.jsx(nt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:i==="horizontal"?"medium":"small"})]});return d?l:a.jsx(rc,{$isActive:n,$orientation:i,$compact:c,children:l})});qe.displayName="PlayerCard";const sc=f.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
  overflow: hidden;
`,Bt=f.div`
  padding: ${e=>e.theme.spacing[2]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[3]};
`,Wt=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,ae=f.button`
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
`,cc=f.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,Yr=f.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,lc=f.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,Vr=f.span`
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
`,xr=Y(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:i,className:s,disableAutoScroll:d=!1})=>{const c=h.useRef(null);h.useEffect(()=>{if(!d&&c.current&&t!==void 0){const u=c.current.querySelector(`[data-move-index="${t}"]`);u&&u.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const l=()=>{const u=[];for(let p=0;p<e.length;p+=2){const m=Math.floor(p/2)+1,g=e[p],y=e[p+1];u.push(a.jsxs(Yr,{children:[a.jsxs(lc,{children:[m,"."]}),a.jsx(Vr,{$isCurrentMove:t===p,onClick:()=>r?.(p),"data-move-index":p,children:Ht(g.san)}),y&&a.jsx(Vr,{$isCurrentMove:t===p+1,onClick:()=>r?.(p+1),"data-move-index":p+1,children:Ht(y.san)})]},p))}return u};return a.jsxs(sc,{className:s,children:[o?a.jsx(Bt,{children:a.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("span",{children:"Moves"}),a.jsxs(Wt,{children:[a.jsx(ae,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),a.jsx(ae,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),a.jsx(ae,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),a.jsx(ae,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):i?a.jsxs(Bt,{children:[i,a.jsxs(Wt,{children:[a.jsx(ae,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),a.jsx(ae,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),a.jsx(ae,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),a.jsx(ae,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):a.jsx(Bt,{children:a.jsxs(Wt,{children:[a.jsx(ae,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),a.jsx(ae,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),a.jsx(ae,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),a.jsx(ae,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),a.jsx(cc,{ref:c,children:e.length===0?a.jsx(Yr,{children:a.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});xr.displayName="MoveList";const dc=f(nt)`
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
`,uc=f(nt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`,Ye=Y(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const i=o==="landscape"?uc:dc;return a.jsx(i,{time:e.time,isActive:t,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n})});Ye.displayName="ObservableClock";const hc=f.div`
  position: relative;
  display: inline-block;
`,pc=f.button`
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
`,fc=f.div`
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
`,mc=f.button`
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
`,yr=Y(({color:e,size:t="small"})=>{const r=Oe(),[n,o]=h.useState(!1),i=h.useRef(null),s=["Q","R","B","N"],d=r.preferences.autoPromotionPiece,c=p=>e==="white"?p:p.toLowerCase();h.useEffect(()=>{const p=m=>{i.current&&!i.current.contains(m.target)&&o(!1)};if(n)return document.addEventListener("mousedown",p),()=>document.removeEventListener("mousedown",p)},[n]);const l=p=>{r.updatePreference("autoPromotionPiece",p),o(!1)},u=t==="small"?28:36;return a.jsxs(hc,{ref:i,children:[a.jsx(pc,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:a.jsx(we,{piece:c(d),size:u})}),a.jsx(fc,{$isOpen:n,children:s.map(p=>a.jsx(mc,{$size:t,onClick:()=>l(p),title:`Promote to ${p==="Q"?"Queen":p==="R"?"Rook":p==="B"?"Bishop":"Knight"}`,children:a.jsx(we,{piece:c(p),size:u})},p))})]})});yr.displayName="PromotionPieceSelector";const gc=f.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[3]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,te=f.button`
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
`,yo=Y(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:i,onUnexamine:s,onSetupFEN:d,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:u,canAbort:p,className:m})=>{const g=nr(),y=()=>a.jsxs(a.Fragment,{children:[p&&a.jsx(te,{onClick:n,$variant:"secondary",children:"Abort"}),a.jsx(te,{onClick:t,$variant:"secondary",children:"Draw"}),a.jsx(te,{onClick:r,$variant:"secondary",children:"Resign"}),a.jsx(te,{onClick:c,$variant:"secondary",children:"Flip"}),a.jsx(yr,{color:g.playingColor||"white",size:"medium"})]}),b=()=>a.jsxs(a.Fragment,{children:[a.jsx(te,{onClick:i,$variant:"secondary",children:"Unobserve"}),a.jsx(te,{onClick:o,$variant:"secondary",children:"Analysis"}),a.jsx(te,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>a.jsxs(a.Fragment,{children:[a.jsx(te,{onClick:s,$variant:"secondary",children:"Unexamine"}),a.jsx(te,{onClick:o,$variant:"secondary",children:"Analysis"}),a.jsx(te,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>a.jsxs(a.Fragment,{children:[a.jsx(te,{onClick:o,$variant:"secondary",children:"Analysis"}),a.jsx(te,{onClick:c,$variant:"secondary",children:"Flip"}),a.jsx(te,{onClick:d,$variant:"secondary",children:"FEN"})]});return a.jsxs(gc,{className:m,children:[e==="playing"&&y(),e==="observing"&&b(),e==="examining"&&$(),e==="freestyle"&&x()]})}),ue=f(te)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;yo.displayName="GameControls";const Kr=f.div`
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
`,Xr=f.div`
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
`,xc=f.div`
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
`,Qr=f.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,st=f.div`
  background: transparent;
  transition: all 0.3s ease;
`,Jr=f.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,bo=Y(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const i=wt().isBottomPlayerWinning;let s,d,c;if(t===50)s=47,d=6,c=47;else if(t>50){const u=t-50;s=50-u,d=u,c=50}else{const u=50-t;s=50,d=u,c=50-u}const l=t===50?"#FFC107":i?"#2E7D32":"#C62828";if(r==="vertical"){const u=t<80;return a.jsxs(Kr,{$orientation:r,className:n,children:[a.jsx(Xr,{$orientation:r,children:e}),a.jsx(xc,{$isLight:u,children:e}),a.jsxs(Qr,{$orientation:r,children:[a.jsx(st,{style:{height:`${s}%`}}),a.jsx(Jr,{$color:l,style:{height:`${d}%`}}),a.jsx(st,{style:{height:`${c}%`}})]})]})}else return a.jsxs(Kr,{$orientation:r,className:n,children:[a.jsx(Xr,{$orientation:r,children:e}),a.jsxs(Qr,{$orientation:r,children:[a.jsx(st,{style:{width:`${c}%`}}),a.jsx(Jr,{$color:l,style:{width:`${d}%`}}),a.jsx(st,{style:{width:`${s}%`}})]})]})});bo.displayName="EvaluationBar";const yc=f.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,bc=f.div`
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
`,tr=Y(({orientation:e="vertical",boardSize:t})=>{const r=wt();return a.jsx(yc,{$orientation:e,$boardSize:t,children:a.jsx(bo,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),rr=Y(({className:e})=>{const t=wt();return a.jsxs(bc,{className:e,children:[a.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),a.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});tr.displayName="AnalysisDisplay";rr.displayName="AnalysisInfoDisplay";const $c=f.div`
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
`,vc=f.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,wc=f.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,$o=f.input`
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
`,kc=f.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Cc=f.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Sc=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Zr=f.button`
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
`,Pc=f.button`
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
`,en=f.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,tn=f.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,jc=f($o)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,vo=Y(({isOpen:e,onClose:t})=>{const{gameStore:r}=Re(),[n,o]=h.useState(""),[i,s]=h.useState(""),d=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=h.useCallback(g=>{o(g.target.value),s("")},[]),l=h.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),s("")):s("Invalid FEN string. Please check the format.")}catch{s("Invalid FEN string. Please check the format.")}},[n,r,t]),u=h.useCallback(g=>{o(g),s("");try{r.loadPosition(g)?(t(),o("")):s("Failed to load preset position.")}catch{s("Failed to load preset position.")}},[r,t]),p=h.useCallback(g=>{g.key==="Enter"&&n.trim()?l():g.key==="Escape"&&t()},[n,l,t]),m=[{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?a.jsx($c,{$isOpen:e,onClick:t,children:a.jsxs(vc,{onClick:g=>g.stopPropagation(),children:[a.jsx(wc,{children:"Set Position from FEN"}),a.jsx(Cc,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),a.jsxs(en,{children:[a.jsx(tn,{children:"Current position:"}),a.jsx(jc,{type:"text",value:d,readOnly:!0,onClick:g=>g.currentTarget.select()})]}),a.jsxs(en,{children:[a.jsx(tn,{children:"Preset position:"}),m.map(g=>a.jsx(Pc,{onClick:()=>u(g.fen),children:g.name},g.name))]}),a.jsx($o,{type:"text",value:n,onChange:c,onKeyDown:p,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),i&&a.jsx(kc,{children:i}),a.jsxs(Sc,{children:[a.jsx(Zr,{onClick:t,children:"Cancel"}),a.jsx(Zr,{$variant:"primary",onClick:l,disabled:!n.trim(),children:"Set Position"})]})]})}):null});vo.displayName="FENDialog";const Ec=f.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Rc=f.div`
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
`,zc=f.div`
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
`,Tc=f.div`
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
`,Lc=f(we)`
  width: 100%;
  height: 100%;
`,Ve=Y(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n})=>{const{gameStore:o}=Re(),i=o.capturedPieces,s=t?i.white:i.black;console.log(`CapturedPieces component - isWhitePieces: ${t}, pieces:`,s);const d=h.useMemo(()=>{const u={};return s.forEach(p=>{u[p]=(u[p]||0)+1}),u},[s]),c=["p","n","b","r","q"],l=n?n/8:32;return a.jsx(Ec,{$orientation:e,$size:l,className:r,children:a.jsx(Rc,{$orientation:e,children:c.map(u=>{const p=d[u]||0,m=t?u.toUpperCase():u;return a.jsx(zc,{$size:l,children:p>0&&a.jsxs(a.Fragment,{children:[a.jsx(Lc,{piece:m,size:l}),p>1&&a.jsx(Tc,{children:p})]})},u)})})})});Ve.displayName="CapturedPieces";const Ic=f.div`
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
`,Mc=f.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Ac=f.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Nc=f.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Dc=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,rn=f.button`
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
`,Fc=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:i,onCancel:s})=>a.jsx(Ic,{$isOpen:e,onClick:s,children:a.jsxs(Mc,{onClick:d=>d.stopPropagation(),children:[a.jsx(Ac,{children:t}),a.jsx(Nc,{children:r}),a.jsxs(Dc,{children:[a.jsx(rn,{$variant:"secondary",onClick:s,children:o}),a.jsx(rn,{$variant:"primary",onClick:i,children:n})]})]})}),Oc=f.div`
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
`,nn=f.div`
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
`;f.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    white-space: nowrap;
`;const Bc=f.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: center;
`,on=f.div`
    width: ${e=>e.$size}px;
    height: ${e=>e.$size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`,Wc=f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,Hc=f.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,_c=f.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,wo=f.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,ko=f.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Gc=f(wo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,Uc=f(ko)`
    margin-top: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,qc=f(wo)`
    margin-bottom: ${e=>e.theme.spacing[2]};
    padding: 0 30px;
    position: relative;
`,Yc=f.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 10;
`,Vc=f(ko)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,an=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,sn=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,cn=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,ln=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,dn=f.div`
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
`,Kc=f.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,Xc=f.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,Qc=f.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;f.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    z-index: 1;
    box-shadow: ${e=>e.theme.shadows.sm};
`;f.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    display: flex;
    gap: ${e=>e.theme.spacing[4]};
    align-items: center;
    white-space: nowrap;
`;const Jc=f.div`
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
`;f.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: ${e=>e.theme.spacing[3]};
`;const Zc=f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[3]};
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: ${e=>e.theme.spacing[2]};
    width: 100%;
    position: relative;
`,el=f.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`,un=f.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[3]};
    align-items: flex-start;
`;f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;const hn=f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`,tl=f(xr)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;f(nt)`
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
`;const pn=f.div`
    flex: 1;
    display: flex;
`;f(nt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;f.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    justify-content: center;
    width: 100%;
`;const rl=f.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    width: 100%;
    padding: 0 11px;
`;f.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    padding: ${e=>e.theme.spacing[2]};
    align-items: center;
`;f.div`
    min-height: 28px;
`;const nl=f.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,ol=f.div`
    display: flex;
    align-items: flex-start;
    padding-top: ${e=>{const t=e.$squareSize||0,r=24,n=40,o=(e.$squareSize||0)*.25;return t+r+n+8-o}}px;
`,Co=Y(({className:e,hasChat:t=!1})=>{const r=nr(),n=Oe(),o=wt(),i=xn();Tt();const[s,d]=h.useState(!1),[c,l]=h.useState(!1),[u,p]=h.useState(0),[m,g]=h.useState(!1),[y,b]=h.useState(!1),$=n.preferences.chessOrientation==="landscape",x=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",v=h.useMemo(()=>!r.currentGame||r.currentGame.gameId<0?"freestyle":r.isPlaying?"playing":r.isObserving?"observing":r.isExamining?"examining":"observing",[r.currentGame,r.gameRelation]),k=h.useCallback((M,D,H)=>{try{r.makeMove(M,D,H)||console.error("Invalid move:",M,D)}catch(B){console.error("Error making move:",B)}},[r]);h.useMemo(()=>{if(r.currentGameInfo){const{white:M,black:D,timeControl:H,variant:B}=r.currentGameInfo;return`Game ${r.currentGame?.gameId||"?"} • ${B} ${H}`}return"No active game"},[r.currentGameInfo,r.currentGame]);const S=(()=>{const M=r.moveHistory.length;if(M>0){const D=r.moveHistory[M-1],H=Math.ceil(M/2),B=M%2===1,Z=Ht(D.san);return`${H}.${B?"":".."} ${Z}`}return"Starting position"})(),L=r.currentOpening,R=r.currentGame,C=R||r.lastGameState,G=C?.white||{name:"White",rating:1500,time:900},A=C?.black||{name:"Black",rating:1500,time:900},X=!R||R.turn==="w",K=r.shouldShowFlippedBoard,re=K?G:A,de=K?A:G,ne=K,oe=K?X:!X,ke=h.useCallback(M=>{r.goToMove(M)},[r]);h.useEffect(()=>{o.initialize()},[o]),h.useEffect(()=>{y&&r.isPlaying&&r.currentGame&&i.sendCommand("draw")},[r.moveHistory.length,y,r.isPlaying,i]),h.useEffect(()=>{(!r.currentGame||!r.isPlaying)&&b(!1)},[r.currentGame,r.isPlaying]),h.useEffect(()=>{s&&o.isEngineReady?o.startAnalysis(x):o.stopAnalysis()},[s,x,o]);const ce=h.useCallback(()=>{d(M=>!M)},[]),Ce=h.useCallback(()=>{l(!0)},[]),w=h.useCallback(()=>{n.updatePreference("boardFlipped",!n.preferences.boardFlipped)},[n]),E=h.useCallback(()=>{r.currentGame&&i.sendCommand(`unobs ${r.currentGame.gameId}`)},[i,r.currentGame]),j=h.useCallback(()=>{i.sendCommand("unexamine")},[i]),P=h.useCallback(()=>{g(!0)},[]),z=h.useCallback(()=>{i.sendCommand("resign"),g(!1)},[i]),I=h.useCallback(()=>{i.sendCommand("draw"),b(!y)},[i,y]),W=h.useCallback(()=>{i.sendCommand("abort")},[i]),Q=()=>a.jsxs(a.Fragment,{children:[a.jsx(nn,{$orientation:"portrait",children:a.jsx(Kc,{children:a.jsxs(Xc,{children:[s&&a.jsx(ol,{$squareSize:u?u/8:0,children:a.jsx(tr,{orientation:"vertical",boardSize:u})}),a.jsxs(Qc,{children:[a.jsx(on,{$size:u?u/8:0}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[a.jsxs(qc,{children:[a.jsxs(an,{children:["Game #",C?.gameId||"?"]}),a.jsx(sn,{children:C?.timeControl||"?"}),a.jsxs(Yc,{children:[v==="playing"&&a.jsxs(a.Fragment,{children:[r.moveHistory.length<=1&&a.jsx(ue,{onClick:W,$variant:"secondary",children:"Abort"}),a.jsx(ue,{onClick:I,$variant:"secondary",children:"Draw"}),a.jsx(ue,{onClick:P,$variant:"secondary",children:"Resign"}),a.jsx(yr,{color:r.playingColor||"white",size:"small"})]}),v==="observing"&&a.jsxs(a.Fragment,{children:[a.jsx(ue,{onClick:E,$variant:"secondary",children:"Unobserve"}),a.jsx(ue,{onClick:ce,$variant:"secondary",children:"Analysis"})]}),v==="examining"&&a.jsxs(a.Fragment,{children:[a.jsx(ue,{onClick:j,$variant:"secondary",children:"Unexamine"}),a.jsx(ue,{onClick:ce,$variant:"secondary",children:"Analysis"})]}),v==="freestyle"&&a.jsxs(a.Fragment,{children:[a.jsx(ue,{onClick:ce,$variant:"secondary",children:"Analysis"}),a.jsx(ue,{onClick:w,$variant:"secondary",children:"Flip"}),a.jsx(ue,{onClick:Ce,$variant:"secondary",children:"FEN"})]})]})]}),a.jsxs(hn,{children:[a.jsx(Ye,{player:re,isActive:oe,size:"small",compact:!0}),a.jsx(pn,{children:a.jsx(qe,{name:re.name,rating:re.rating,time:0,isActive:oe,isWhite:ne,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),a.jsx(dn,{$orientation:"portrait",children:a.jsx(er,{position:x,flipped:K,showCoordinates:!0,onMove:k,interactive:v==="playing"||v==="freestyle"||v==="examining",lastMove:r.lastMove||void 0,onSizeCalculated:p})}),a.jsxs(hn,{children:[a.jsx(Ye,{player:de,isActive:!oe,size:"small",compact:!0}),a.jsx(pn,{children:a.jsx(qe,{name:de.name,rating:de.rating,time:0,isActive:!oe,isWhite:!ne,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),a.jsxs(Vc,{children:[a.jsx(cn,{children:r.premove?`Premove: ${vr(`${r.premove.from}${r.premove.to}${r.premove.promotion||""}`)}`:S!=="Starting position"?`Last move: ${S}`:"Last move: none"}),L&&a.jsx(ln,{children:L})]}),s&&a.jsx(nl,{children:a.jsx(rr,{})})]}),a.jsx(on,{$size:u?u/8:0})]}),a.jsx(Hc,{$squareSize:u?u/8:0,children:a.jsxs(_c,{$squareSize:u?u/8:0,children:[a.jsx(Ve,{orientation:"vertical",isWhitePieces:K,boardSize:u}),a.jsx(Ve,{orientation:"vertical",isWhitePieces:!K,boardSize:u})]})})]})})}),a.jsx(Jc,{$orientation:"portrait",children:a.jsx(xr,{moves:r.moveHistory,currentMoveIndex:r.currentMoveIndex,onMoveClick:ke,disableAutoScroll:!0,onNavigate:M=>{if(r.isExamining)switch(M){case"first":i.sendCommand("back 500");break;case"prev":i.sendCommand("back");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 500");break}else switch(M){case"first":r.goToStart();break;case"prev":r.goToPreviousMove();break;case"next":r.goToNextMove();break;case"last":r.goToEnd();break}}})})]});return a.jsxs(Oc,{className:e,$orientation:$?"landscape":"portrait",$hasChat:t,children:[$?a.jsx(a.Fragment,{children:a.jsx(nn,{$orientation:"landscape",children:a.jsxs(Zc,{$hasAnalysis:s,children:[a.jsxs(Bc,{children:[a.jsxs(Gc,{children:[a.jsxs(an,{children:["Game #",C?.gameId||"?"]}),a.jsx(sn,{children:C?.timeControl||"?"})]}),a.jsxs(Wc,{children:[s&&a.jsx(tr,{orientation:"vertical"}),a.jsx(dn,{$orientation:"landscape",children:a.jsx(er,{position:x,flipped:K,showCoordinates:!0,onMove:k,interactive:v==="playing"||v==="freestyle"||v==="examining",lastMove:r.lastMove||void 0,onSizeCalculated:p})})]}),a.jsxs(Uc,{children:[a.jsx(cn,{children:r.premove?`Premove: ${vr(`${r.premove.from}${r.premove.to}${r.premove.promotion||""}`)}`:S!=="Starting position"?`Last move: ${S}`:"Last move: none"}),L&&a.jsx(ln,{children:L})]}),s&&a.jsx(rl,{children:a.jsx(rr,{})})]}),a.jsxs(el,{children:[a.jsx(Ve,{orientation:"horizontal",isWhitePieces:ne,boardSize:u}),a.jsxs(un,{children:[a.jsx(Ye,{player:re,isActive:oe,size:"small",compact:!0,variant:"landscape"}),a.jsx(qe,{name:re.name,rating:re.rating,time:0,isActive:oe,isWhite:ne,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),a.jsx(yo,{perspective:v,canAbort:r.moveHistory.length<=1,onAnalysis:ce,onFlipBoard:w,onSetupFEN:Ce,onUnobserve:E,onUnexamine:j,onResign:P,onDraw:I,onAbort:W,isAnalysisActive:s,isDrawOffered:y}),a.jsx(tl,{moves:r.moveHistory,currentMoveIndex:r.currentMoveIndex,onMoveClick:ke,showHeader:!1,onNavigate:M=>{if(r.isExamining)switch(M){case"first":i.sendCommand("backward 999");break;case"prev":i.sendCommand("backward");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 999");break}else switch(M){case"first":r.goToStart();break;case"prev":r.goToPreviousMove();break;case"next":r.goToNextMove();break;case"last":r.goToEnd();break}}}),a.jsxs(un,{children:[a.jsx(qe,{name:de.name,rating:de.rating,time:0,isActive:!oe,isWhite:!ne,orientation:"vertical",hideClockInCard:!0,compact:!0}),a.jsx(Ye,{player:de,isActive:!oe,size:"small",compact:!0,variant:"landscape"})]}),a.jsx(Ve,{orientation:"horizontal",isWhitePieces:!ne,boardSize:u})]})]})})}):Q(),a.jsx(vo,{isOpen:c,onClose:()=>l(!1)}),a.jsx(Fc,{isOpen:m,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:z,onCancel:()=>g(!1)})]})});Co.displayName="ChessGameLayout";const il=f.div`
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
`,al=f.div`
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
`,sl=f.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,cl=f.span`
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
`,ll=f.button`
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
`,dl=f.span`
  font-size: 12px;
  opacity: 0.7;
`,So=Y(()=>{const{chatStore:e}=Re(),t=e.sortedTabs,[r,n]=V.useState(null),[o,i]=V.useState(null),s=(p,m)=>{n(m),p.dataTransfer.effectAllowed="move"},d=(p,m)=>{p.preventDefault(),p.dataTransfer.dropEffect="move",i(m)},c=()=>{i(null)},l=(p,m)=>{p.preventDefault(),r&&r!==m&&e.reorderTabs(r,m),n(null),i(null)},u=()=>{n(null),i(null)};return a.jsx(il,{children:t.map(p=>a.jsxs(al,{$active:p.id===e.activeTabId,$hasUnread:p.unreadCount>0,$dragging:p.id===r,$dragOver:p.id===o,draggable:!0,onDragStart:m=>s(m,p.id),onDragOver:m=>d(m,p.id),onDragLeave:c,onDrop:m=>l(m,p.id),onDragEnd:u,onClick:()=>e.setActiveTab(p.id),children:[p.type!=="console"&&a.jsx(dl,{$type:p.type}),a.jsx(sl,{children:p.type==="channel"?`(${p.name})`:p.name}),p.unreadCount>0&&a.jsx(cl,{children:p.unreadCount>99?"99+":p.unreadCount}),p.id!=="console"&&a.jsx(ll,{onClick:m=>{m.stopPropagation(),e.closeTab(p.id)},title:"Close tab",children:"×"})]},p.id))})});So.displayName="ChatTabs";function ul(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function hl(e){e.scrollTop=e.scrollHeight}function pl(e,t=10){ul(e,t)&&hl(e)}const fl=f.a`
  color: ${e=>e.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primaryHover};
    text-decoration: none;
  }
  
  &:visited {
    color: ${e=>e.theme.colors.primary}aa;
  }
`,fn=/(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,gt=({text:e,className:t})=>{const r=[];let n=0,o;for(fn.lastIndex=0;(o=fn.exec(e))!==null;){const i=o[0],s=o.index;s>n&&r.push(e.substring(n,s));let d=i;i.match(/^(?:https?|ftp):\/\//)||i.includes(".")&&(d="https://"+i),r.push(a.jsx(fl,{href:d,target:"_blank",rel:"noopener noreferrer",onClick:c=>c.stopPropagation(),children:i},s)),n=s+i.length}return n<e.length&&r.push(e.substring(n)),r.length===0?a.jsx("span",{className:t,children:e}):a.jsx("span",{className:t,children:r})};gt.displayName="LinkifiedText";const ct=f.div`
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
`,br=f.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: 10px;
  flex-shrink: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 50px;
`,ml=f.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover ${br} {
    opacity: 1;
  }
`;f.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
`;const mn=f.div`
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
  
  ${e=>e.$type==="system"&&`
    color: ${e.theme.colors.textSecondary};
  `}
  
  ${e=>e.$type==="whisper"&&`
    color: ${e.theme.colors.primary};
  `}
  
  ${e=>e.$type==="announcement"&&`
    color: ${e.theme.colors.warning};
    font-weight: ${e.theme.typography.fontWeight.semibold};
  `}
  
  ${e=>e.$type==="message"&&`
    color: ${e.theme.colors.text};
  `}
`;f.div`
  position: relative;
  
  &:hover ${br} {
    opacity: 1;
  }
`;f(br)`
  position: absolute;
  left: 0;
  top: 0;
  background: ${e=>e.theme.colors.background};
  padding: 0 4px;
  z-index: 1;
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
`;const gl=f.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
`,xl=f.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,gn=f.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,yl=f.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Po=Y(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r}=Re(),n=h.useRef(null),o=t.activeTab,i=o?.messages||[],s=r.username||"You";if(h.useEffect(()=>{if(n.current&&i.length>0){const c=n.current,l=setTimeout(()=>{o?.type==="console"?c.scrollTop=c.scrollHeight:pl(c,50)},50);return()=>clearTimeout(l)}},[i.length,i[i.length-1]?.id]),h.useEffect(()=>{if(n.current&&i.length>0){const c=n.current;requestAnimationFrame(()=>{c.scrollTop=c.scrollHeight})}},[o?.id]),!o)return a.jsx(ct,{className:"chat-messages-container",children:a.jsx(gn,{children:"No active chat"})});if(i.length===0)return a.jsx(ct,{className:"chat-messages-container",children:a.jsx(gn,{children:o.type==="channel"?`No messages in (${o.name}) yet`:o.type==="private"?`No messages with ${o.name} yet`:"Connecting to freechess.org..."})});const d=[];return i.forEach((c,l)=>{const u=l>0?i[l-1]:null,p=u?new Date(c.timestamp).getTime()-new Date(u.timestamp).getTime():1/0;u&&u.sender===c.sender&&u.type===c.type&&p<6e4?d[d.length-1].messages.push(c):d.push({sender:c.sender,timestamp:new Date(c.timestamp),messages:[c]})}),o.type==="console"?a.jsx(ct,{ref:n,className:"chat-messages-container",children:i.map(c=>a.jsx(mn,{$type:c.type,onMouseEnter:()=>e?.(c.timestamp),onMouseLeave:()=>e?.(null),children:a.jsx(gt,{text:c.content})},c.id))}):a.jsx(ct,{ref:n,className:"chat-messages-container",children:d.map((c,l)=>{const u=c.messages[0],p=c.sender.toLowerCase()===s.toLowerCase();return u.type==="system"?a.jsx(yl,{children:c.messages.map((m,g)=>a.jsxs(V.Fragment,{children:[g>0&&`
`,a.jsx(gt,{text:m.content})]},m.id))},l):a.jsx(ml,{onMouseEnter:()=>e?.(c.timestamp),onMouseLeave:()=>e?.(null),children:a.jsxs(mn,{$type:u.type,children:[a.jsx(gl,{$isYou:p,children:p?c.sender:a.jsx(gr,{name:c.sender})}),a.jsx(xl,{children:c.messages.map((m,g)=>a.jsxs(V.Fragment,{children:[g>0&&`
`,a.jsx(gt,{text:m.content})]},m.id))})]})},l)})})});Po.displayName="ChatMessages";const bl=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,$l=f.input`
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
`,vl=f.button`
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
`,jo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:i=!1})=>{const s=h.useRef(null),d=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e.trim()&&r(e.trim())):l.key==="ArrowUp"&&!e?(l.preventDefault(),n?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),n?.("down"))},c=()=>{e.trim()&&r(e.trim())};return a.jsxs(bl,{children:[a.jsx($l,{ref:s,type:"text",value:e,onChange:l=>t(l.target.value),onKeyDown:d,placeholder:o,disabled:i,autoComplete:"off",spellCheck:"true"}),a.jsx(vl,{onClick:c,disabled:i||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};jo.displayName="ChatInput";const wl=f.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,kl=f.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Cl=f.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Sl=f.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,Pl=f.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`,Eo=Y(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n}=Re(),[o,i]=h.useState(""),[s,d]=h.useState(!1),[c,l]=h.useState(null);V.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),V.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const u=m=>{if(console.log("handleSendMessage called with:",m,"Length:",m.length),!!m.trim()){if(r.addToHistory(m),m==="/help"||m==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),i("");return}if(r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"}),m.startsWith("/")||m.startsWith("\\"))n.sendCommand(m.substring(1));else{const g=r.activeTab;if(!g)return;if(g.type==="channel"){const y=g.id.replace("channel-","");n.sendCommand(`tell ${y} ${m}`)}else g.type==="private"?n.sendCommand(`tell ${g.id} ${m}`):n.sendCommand(m)}i("")}},p=m=>{const g=r.navigateHistory(m);g!==null&&i(g)};return a.jsxs(wl,{className:e,$compact:t,children:[!t&&a.jsxs(kl,{children:[a.jsx(Cl,{children:"Chat"}),c&&a.jsx(Sl,{children:new Date(c).toLocaleTimeString()})]}),a.jsxs(Pl,{children:[a.jsx(So,{}),a.jsx(Po,{onMessageHover:l}),a.jsx(jo,{value:o,onChange:i,onSend:u,onHistoryNavigate:p,placeholder:r.activeTab?.type==="channel"?`Message (${r.activeTab.name})...`:r.activeTab?.type==="private"?`Message ${r.activeTab.name}...`:"Enter command..."})]})]})});Eo.displayName="ChatPanel";const jl=f.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.background};
`,El=f.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,Rl=f.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,zl=f.div`
  width: ${e=>e.$isVisible?"600px":"0"};
  display: ${e=>e.$isVisible?"flex":"none"};
  flex-direction: column;
  background-color: ${e=>e.theme.colors.surface};
  border-left: 1px solid ${e=>e.theme.colors.border};
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${e=>e.$isVisible?"100%":"0"};
  }
`,Tl=f.div`
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
`,Ro=Y(()=>{const{preferencesStore:e}=Re(),{viewMode:t,autoViewMode:r}=e.preferences,n=Tt(),[o,i]=h.useState(600),[s,d]=h.useState(!1);h.useEffect(()=>{r&&(n.isMobile||n.isTablet?e.updatePreference("viewMode","chess-only"):e.updatePreference("viewMode","chess-and-chat"))},[n.isMobile,n.isTablet,r,e]);const c=m=>{m.preventDefault(),d(!0)};h.useEffect(()=>{if(!s)return;const m=y=>{const b=window.innerWidth-y.clientX;i(Math.max(300,Math.min(600,b))),window.dispatchEvent(new Event("resize"))},g=()=>{d(!1)};return document.addEventListener("mousemove",m),document.addEventListener("mouseup",g),()=>{document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",g)}},[s]);const l=t==="chess-only"||t==="chess-and-chat",u=t==="chat-only"||t==="chess-and-chat",p=t==="chess-and-chat"&&!n.isMobile;return a.jsxs(jl,{children:[a.jsx(fo,{}),a.jsxs(El,{children:[a.jsx(Rl,{$isVisible:l,children:a.jsx(Co,{hasChat:u})}),p&&a.jsx(Tl,{$isVisible:!0,onMouseDown:c,style:{cursor:s?"col-resize":"ew-resize"}}),a.jsx(zl,{$isVisible:u,style:{width:u&&!n.isMobile?`${o}px`:void 0},children:a.jsx(Eo,{})})]})]})});Ro.displayName="AppLayout";const Ll=bs`
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
`,Il=()=>a.jsx(To,{children:a.jsxs(ws,{children:[a.jsx(Ll,{}),a.jsx(na,{children:a.jsx(Ii,{children:a.jsx(zn,{path:"/",element:a.jsx(Ls,{children:a.jsx(Ro,{})})})})})]})}),zo=document.getElementById("root");if(!zo)throw new Error("Root element not found");const Ml=yn(zo);Ml.render(a.jsx(Il,{}));
