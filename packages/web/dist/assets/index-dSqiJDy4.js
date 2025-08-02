import{u as De,j as s,a as Ee,b as Ot,c as Mn,d as cr,e as Ft,V as Qo,f as Jo,l as Dr,R as Zo}from"./shared-CKsRkX6R.js";import{a as ei,r as p,R as Z}from"./vendor-cxkclgJA.js";import{o as K}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var zn,Nr=ei;zn=Nr.createRoot,Nr.hydrateRoot;var kr={};Object.defineProperty(kr,"__esModule",{value:!0});kr.parse=ai;kr.serialize=ci;const ti=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,ri=/^[\u0021-\u003A\u003C-\u007E]*$/,ni=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,oi=/^[\u0020-\u003A\u003D-\u007E]*$/,ii=Object.prototype.toString,si=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function ai(e,t){const r=new si,n=e.length;if(n<2)return r;const o=t?.decode||li;let i=0;do{const a=e.indexOf("=",i);if(a===-1)break;const d=e.indexOf(";",i),c=d===-1?n:d;if(a>c){i=e.lastIndexOf(";",a-1)+1;continue}const l=Or(e,i,a),u=Fr(e,a,l),h=e.slice(l,u);if(r[h]===void 0){let g=Or(e,a+1,c),f=Fr(e,c,g);const b=o(e.slice(g,f));r[h]=b}i=c+1}while(i<n);return r}function Or(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Fr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function ci(e,t,r){const n=r?.encode||encodeURIComponent;if(!ti.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!ri.test(o))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+o;if(!r)return i;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);i+="; Max-Age="+r.maxAge}if(r.domain){if(!ni.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);i+="; Domain="+r.domain}if(r.path){if(!oi.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);i+="; Path="+r.path}if(r.expires){if(!di(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);i+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(i+="; HttpOnly"),r.secure&&(i+="; Secure"),r.partitioned&&(i+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return i}function li(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function di(e){return ii.call(e)==="[object Date]"}var Br="popstate";function ui(e={}){function t(n,o){let{pathname:i,search:a,hash:d}=n.location;return lr("",{pathname:i,search:a,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:dt(o)}return pi(t,r,null,e)}function q(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function we(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function hi(){return Math.random().toString(36).substring(2,10)}function Wr(e,t){return{usr:e.state,key:e.key,idx:t}}function lr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Ze(t):t,state:r,key:t&&t.key||n||hi()}}function dt({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Ze(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function pi(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:i=!1}=n,a=o.history,d="POP",c=null,l=u();l==null&&(l=0,a.replaceState({...a.state,idx:l},""));function u(){return(a.state||{idx:null}).idx}function h(){d="POP";let $=u(),x=$==null?null:$-l;l=$,c&&c({action:d,location:y.location,delta:x})}function g($,x){d="PUSH";let v=lr(y.location,$,x);l=u()+1;let k=Wr(v,l),C=y.createHref(v);try{a.pushState(k,"",C)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;o.location.assign(C)}i&&c&&c({action:d,location:y.location,delta:1})}function f($,x){d="REPLACE";let v=lr(y.location,$,x);l=u();let k=Wr(v,l),C=y.createHref(v);a.replaceState(k,"",C),i&&c&&c({action:d,location:y.location,delta:0})}function b($){return mi($)}let y={get action(){return d},get location(){return e(o,a)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Br,h),c=$,()=>{o.removeEventListener(Br,h),c=null}},createHref($){return t(o,$)},createURL:b,encodeLocation($){let x=b($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:f,go($){return a.go($)}};return y}function mi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),q(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:dt(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Tn(e,t,r="/"){return fi(e,t,r,!1)}function fi(e,t,r,n){let o=typeof t=="string"?Ze(t):t,i=Re(o.pathname||"/",r);if(i==null)return null;let a=Ln(e);gi(a);let d=null;for(let c=0;d==null&&c<a.length;++c){let l=Pi(i);d=Ci(a[c],l,n)}return d}function Ln(e,t=[],r=[],n=""){let o=(i,a,d)=>{let c={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(q(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let l=Pe([n,c.relativePath]),u=r.concat(c);i.children&&i.children.length>0&&(q(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),Ln(i.children,t,u,l)),!(i.path==null&&!i.index)&&t.push({path:l,score:ki(l,i.index),routesMeta:u})};return e.forEach((i,a)=>{if(i.path===""||!i.path?.includes("?"))o(i,a);else for(let d of In(i.path))o(i,a,d)}),t}function In(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return o?[i,""]:[i];let a=In(n.join("/")),d=[];return d.push(...a.map(c=>c===""?i:[i,c].join("/"))),o&&d.push(...a),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function gi(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Si(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var xi=/^:[\w-]+$/,yi=3,bi=2,$i=1,vi=10,wi=-2,Hr=e=>e==="*";function ki(e,t){let r=e.split("/"),n=r.length;return r.some(Hr)&&(n+=wi),t&&(n+=bi),r.filter(o=>!Hr(o)).reduce((o,i)=>o+(xi.test(i)?yi:i===""?$i:vi),n)}function Si(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Ci(e,t,r=!1){let{routesMeta:n}=e,o={},i="/",a=[];for(let d=0;d<n.length;++d){let c=n[d],l=d===n.length-1,u=i==="/"?t:t.slice(i.length)||"/",h=Lt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},u),g=c.route;if(!h&&l&&r&&!n[n.length-1].route.index&&(h=Lt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},u)),!h)return null;Object.assign(o,h.params),a.push({params:o,pathname:Pe([i,h.pathname]),pathnameBase:zi(Pe([i,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(i=Pe([i,h.pathnameBase]))}return a}function Lt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=ji(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:n.reduce((l,{paramName:u,isOptional:h},g)=>{if(u==="*"){let b=d[g]||"";a=i.slice(0,i.length-b.length).replace(/(.)\/+$/,"$1")}const f=d[g];return h&&!f?l[u]=void 0:l[u]=(f||"").replace(/%2F/g,"/"),l},{}),pathname:i,pathnameBase:a,pattern:e}}function ji(e,t=!1,r=!0){we(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,d,c)=>(n.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function Pi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return we(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Re(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ri(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?Ze(e):e;return{pathname:r?r.startsWith("/")?r:Ei(r,t):t,search:Ti(n),hash:Li(o)}}function Ei(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function Kt(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Mi(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function An(e){let t=Mi(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Dn(e,t,r,n=!1){let o;typeof e=="string"?o=Ze(e):(o={...e},q(!o.pathname||!o.pathname.includes("?"),Kt("?","pathname","search",o)),q(!o.pathname||!o.pathname.includes("#"),Kt("#","pathname","hash",o)),q(!o.search||!o.search.includes("#"),Kt("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,d;if(a==null)d=r;else{let h=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;o.pathname=g.join("/")}d=h>=0?t[h]:"/"}let c=Ri(o,d),l=a&&a!=="/"&&a.endsWith("/"),u=(i||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(l||u)&&(c.pathname+="/"),c}var Pe=e=>e.join("/").replace(/\/\/+/g,"/"),zi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ti=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Li=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ii(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Nn=["POST","PUT","PATCH","DELETE"];new Set(Nn);var Ai=["GET",...Nn];new Set(Ai);var et=p.createContext(null);et.displayName="DataRouter";var Bt=p.createContext(null);Bt.displayName="DataRouterState";var On=p.createContext({isTransitioning:!1});On.displayName="ViewTransition";var Di=p.createContext(new Map);Di.displayName="Fetchers";var Ni=p.createContext(null);Ni.displayName="Await";var ke=p.createContext(null);ke.displayName="Navigation";var mt=p.createContext(null);mt.displayName="Location";var Me=p.createContext({outlet:null,matches:[],isDataRoute:!1});Me.displayName="Route";var Sr=p.createContext(null);Sr.displayName="RouteError";function Oi(e,{relative:t}={}){q(ft(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=p.useContext(ke),{hash:o,pathname:i,search:a}=gt(e,{relative:t}),d=i;return r!=="/"&&(d=i==="/"?r:Pe([r,i])),n.createHref({pathname:d,search:a,hash:o})}function ft(){return p.useContext(mt)!=null}function He(){return q(ft(),"useLocation() may be used only in the context of a <Router> component."),p.useContext(mt).location}var Fn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Bn(e){p.useContext(ke).static||p.useLayoutEffect(e)}function Fi(){let{isDataRoute:e}=p.useContext(Me);return e?Ji():Bi()}function Bi(){q(ft(),"useNavigate() may be used only in the context of a <Router> component.");let e=p.useContext(et),{basename:t,navigator:r}=p.useContext(ke),{matches:n}=p.useContext(Me),{pathname:o}=He(),i=JSON.stringify(An(n)),a=p.useRef(!1);return Bn(()=>{a.current=!0}),p.useCallback((c,l={})=>{if(we(a.current,Fn),!a.current)return;if(typeof c=="number"){r.go(c);return}let u=Dn(c,JSON.parse(i),o,l.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:Pe([t,u.pathname])),(l.replace?r.replace:r.push)(u,l.state,l)},[t,r,i,o,e])}p.createContext(null);function gt(e,{relative:t}={}){let{matches:r}=p.useContext(Me),{pathname:n}=He(),o=JSON.stringify(An(r));return p.useMemo(()=>Dn(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Wi(e,t){return Wn(e,t)}function Wn(e,t,r,n){q(ft(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=p.useContext(ke),{matches:i}=p.useContext(Me),a=i[i.length-1],d=a?a.params:{},c=a?a.pathname:"/",l=a?a.pathnameBase:"/",u=a&&a.route;{let x=u&&u.path||"";Hn(c,!u||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let h=He(),g;if(t){let x=typeof t=="string"?Ze(t):t;q(l==="/"||x.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=h;let f=g.pathname||"/",b=f;if(l!=="/"){let x=l.replace(/^\//,"").split("/");b="/"+f.replace(/^\//,"").split("/").slice(x.length).join("/")}let y=Tn(e,{pathname:b});we(u||y!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),we(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=Yi(y&&y.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:Pe([l,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?l:Pe([l,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),i,r,n);return t&&$?p.createElement(mt.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},$):$}function Hi(){let e=Qi(),t=Ii(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},i={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=p.createElement(p.Fragment,null,p.createElement("p",null,"💿 Hey developer 👋"),p.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",p.createElement("code",{style:i},"ErrorBoundary")," or"," ",p.createElement("code",{style:i},"errorElement")," prop on your route.")),p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},t),r?p.createElement("pre",{style:o},r):null,a)}var _i=p.createElement(Hi,null),Ui=class extends p.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?p.createElement(Me.Provider,{value:this.props.routeContext},p.createElement(Sr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Gi({routeContext:e,match:t,children:r}){let n=p.useContext(et);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),p.createElement(Me.Provider,{value:e},r)}function Yi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,i=r?.errors;if(i!=null){let c=o.findIndex(l=>l.route.id&&i?.[l.route.id]!==void 0);q(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,d=-1;if(r)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(d=c),l.route.id){let{loaderData:u,errors:h}=r,g=l.route.loader&&!u.hasOwnProperty(l.route.id)&&(!h||h[l.route.id]===void 0);if(l.route.lazy||g){a=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,l,u)=>{let h,g=!1,f=null,b=null;r&&(h=i&&l.route.id?i[l.route.id]:void 0,f=l.route.errorElement||_i,a&&(d<0&&u===0?(Hn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):d===u&&(g=!0,b=l.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,u+1)),$=()=>{let x;return h?x=f:g?x=b:l.route.Component?x=p.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=c,p.createElement(Gi,{match:l,routeContext:{outlet:c,matches:y,isDataRoute:r!=null},children:x})};return r&&(l.route.ErrorBoundary||l.route.errorElement||u===0)?p.createElement(Ui,{location:r.location,revalidation:r.revalidation,component:f,error:h,children:$(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):$()},null)}function Cr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Vi(e){let t=p.useContext(et);return q(t,Cr(e)),t}function qi(e){let t=p.useContext(Bt);return q(t,Cr(e)),t}function Ki(e){let t=p.useContext(Me);return q(t,Cr(e)),t}function jr(e){let t=Ki(e),r=t.matches[t.matches.length-1];return q(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Xi(){return jr("useRouteId")}function Qi(){let e=p.useContext(Sr),t=qi("useRouteError"),r=jr("useRouteError");return e!==void 0?e:t.errors?.[r]}function Ji(){let{router:e}=Vi("useNavigate"),t=jr("useNavigate"),r=p.useRef(!1);return Bn(()=>{r.current=!0}),p.useCallback(async(o,i={})=>{we(r.current,Fn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var _r={};function Hn(e,t,r){!t&&!_r[e]&&(_r[e]=!0,we(!1,r))}p.memo(Zi);function Zi({routes:e,future:t,state:r}){return Wn(e,void 0,r,t)}function _n(e){q(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function es({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:i=!1}){q(!ft(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),d=p.useMemo(()=>({basename:a,navigator:o,static:i,future:{}}),[a,o,i]);typeof r=="string"&&(r=Ze(r));let{pathname:c="/",search:l="",hash:u="",state:h=null,key:g="default"}=r,f=p.useMemo(()=>{let b=Re(c,a);return b==null?null:{location:{pathname:b,search:l,hash:u,state:h,key:g},navigationType:n}},[a,c,l,u,h,g,n]);return we(f!=null,`<Router basename="${a}"> is not able to match the URL "${c}${l}${u}" because it does not start with the basename, so the <Router> won't render anything.`),f==null?null:p.createElement(ke.Provider,{value:d},p.createElement(mt.Provider,{children:t,value:f}))}function ts({children:e,location:t}){return Wi(dr(e),t)}function dr(e,t=[]){let r=[];return p.Children.forEach(e,(n,o)=>{if(!p.isValidElement(n))return;let i=[...t,o];if(n.type===p.Fragment){r.push.apply(r,dr(n.props.children,i));return}q(n.type===_n,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),q(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=dr(n.props.children,i)),r.push(a)}),r}var jt="get",Pt="application/x-www-form-urlencoded";function Wt(e){return e!=null&&typeof e.tagName=="string"}function rs(e){return Wt(e)&&e.tagName.toLowerCase()==="button"}function ns(e){return Wt(e)&&e.tagName.toLowerCase()==="form"}function os(e){return Wt(e)&&e.tagName.toLowerCase()==="input"}function is(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ss(e,t){return e.button===0&&(!t||t==="_self")&&!is(e)}var yt=null;function as(){if(yt===null)try{new FormData(document.createElement("form"),0),yt=!1}catch{yt=!0}return yt}var cs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Xt(e){return e!=null&&!cs.has(e)?(we(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pt}"`),null):e}function ls(e,t){let r,n,o,i,a;if(ns(e)){let d=e.getAttribute("action");n=d?Re(d,t):null,r=e.getAttribute("method")||jt,o=Xt(e.getAttribute("enctype"))||Pt,i=new FormData(e)}else if(rs(e)||os(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||d.getAttribute("action");if(n=c?Re(c,t):null,r=e.getAttribute("formmethod")||d.getAttribute("method")||jt,o=Xt(e.getAttribute("formenctype"))||Xt(d.getAttribute("enctype"))||Pt,i=new FormData(d,e),!as()){let{name:l,type:u,value:h}=e;if(u==="image"){let g=l?`${l}.`:"";i.append(`${g}x`,"0"),i.append(`${g}y`,"0")}else l&&i.append(l,h)}}else{if(Wt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=jt,n=null,o=Pt,a=e}return i&&o==="text/plain"&&(a=i,i=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:i,body:a}}function Pr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function ds(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function us(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function hs(e,t,r){let n=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let a=await ds(i,r);return a.links?a.links():[]}return[]}));return gs(n.flat(1).filter(us).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Ur(e,t,r,n,o,i){let a=(c,l)=>r[l]?c.route.id!==r[l].route.id:!0,d=(c,l)=>r[l].pathname!==c.pathname||r[l].route.path?.endsWith("*")&&r[l].params["*"]!==c.params["*"];return i==="assets"?t.filter((c,l)=>a(c,l)||d(c,l)):i==="data"?t.filter((c,l)=>{let u=n.routes[c.route.id];if(!u||!u.hasLoader)return!1;if(a(c,l)||d(c,l))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function ps(e,t,{includeHydrateFallback:r}={}){return ms(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function ms(e){return[...new Set(e)]}function fs(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function gs(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let i=JSON.stringify(fs(o));return r.has(i)||(r.add(i),n.push({key:i,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var xs=new Set([100,101,204,205]);function ys(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Re(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Un(){let e=p.useContext(et);return Pr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function bs(){let e=p.useContext(Bt);return Pr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Rr=p.createContext(void 0);Rr.displayName="FrameworkContext";function Gn(){let e=p.useContext(Rr);return Pr(e,"You must render this element inside a <HydratedRouter> element"),e}function $s(e,t){let r=p.useContext(Rr),[n,o]=p.useState(!1),[i,a]=p.useState(!1),{onFocus:d,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:h}=t,g=p.useRef(null);p.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let y=x=>{x.forEach(v=>{a(v.isIntersecting)})},$=new IntersectionObserver(y,{threshold:.5});return g.current&&$.observe(g.current),()=>{$.disconnect()}}},[e]),p.useEffect(()=>{if(n){let y=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(y)}}},[n]);let f=()=>{o(!0)},b=()=>{o(!1),a(!1)};return r?e!=="intent"?[i,g,{}]:[i,g,{onFocus:nt(d,f),onBlur:nt(c,b),onMouseEnter:nt(l,f),onMouseLeave:nt(u,b),onTouchStart:nt(h,f)}]:[!1,g,{}]}function nt(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function vs({page:e,...t}){let{router:r}=Un(),n=p.useMemo(()=>Tn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?p.createElement(ks,{page:e,matches:n,...t}):null}function ws(e){let{manifest:t,routeModules:r}=Gn(),[n,o]=p.useState([]);return p.useEffect(()=>{let i=!1;return hs(e,t,r).then(a=>{i||o(a)}),()=>{i=!0}},[e,t,r]),n}function ks({page:e,matches:t,...r}){let n=He(),{manifest:o,routeModules:i}=Gn(),{basename:a}=Un(),{loaderData:d,matches:c}=bs(),l=p.useMemo(()=>Ur(e,t,c,o,n,"data"),[e,t,c,o,n]),u=p.useMemo(()=>Ur(e,t,c,o,n,"assets"),[e,t,c,o,n]),h=p.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let b=new Set,y=!1;if(t.forEach(x=>{let v=o.routes[x.route.id];!v||!v.hasLoader||(!l.some(k=>k.route.id===x.route.id)&&x.route.id in d&&i[x.route.id]?.shouldRevalidate||v.hasClientLoader?y=!0:b.add(x.route.id))}),b.size===0)return[];let $=ys(e,a);return y&&b.size>0&&$.searchParams.set("_routes",t.filter(x=>b.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[a,d,n,o,l,t,e,i]),g=p.useMemo(()=>ps(u,o),[u,o]),f=ws(u);return p.createElement(p.Fragment,null,h.map(b=>p.createElement("link",{key:b,rel:"prefetch",as:"fetch",href:b,...r})),g.map(b=>p.createElement("link",{key:b,rel:"modulepreload",href:b,...r})),f.map(({key:b,link:y})=>p.createElement("link",{key:b,...y})))}function Ss(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var Yn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Yn&&(window.__reactRouterVersion="7.6.3")}catch{}function Cs({basename:e,children:t,window:r}){let n=p.useRef();n.current==null&&(n.current=ui({window:r,v5Compat:!0}));let o=n.current,[i,a]=p.useState({action:o.action,location:o.location}),d=p.useCallback(c=>{p.startTransition(()=>a(c))},[a]);return p.useLayoutEffect(()=>o.listen(d),[o,d]),p.createElement(es,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:o})}var Vn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,qn=p.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:i,replace:a,state:d,target:c,to:l,preventScrollReset:u,viewTransition:h,...g},f){let{basename:b}=p.useContext(ke),y=typeof l=="string"&&Vn.test(l),$,x=!1;if(typeof l=="string"&&y&&($=l,Yn))try{let U=new URL(window.location.href),Q=l.startsWith("//")?new URL(U.protocol+l):new URL(l),w=Re(Q.pathname,b);Q.origin===U.origin&&w!=null?l=w+Q.search+Q.hash:x=!0}catch{we(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let v=Oi(l,{relative:o}),[k,C,S]=$s(n,g),L=Es(l,{replace:a,state:d,target:c,preventScrollReset:u,relative:o,viewTransition:h});function R(U){t&&t(U),U.defaultPrevented||L(U)}let N=p.createElement("a",{...g,...S,href:$||v,onClick:x||i?t:R,ref:Ss(f,C),target:c,"data-discover":!y&&r==="render"?"true":void 0});return k&&!y?p.createElement(p.Fragment,null,N,p.createElement(vs,{page:v})):N});qn.displayName="Link";var js=p.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:i,to:a,viewTransition:d,children:c,...l},u){let h=gt(a,{relative:l.relative}),g=He(),f=p.useContext(Bt),{navigator:b,basename:y}=p.useContext(ke),$=f!=null&&Is(h)&&d===!0,x=b.encodeLocation?b.encodeLocation(h).pathname:h.pathname,v=g.pathname,k=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;r||(v=v.toLowerCase(),k=k?k.toLowerCase():null,x=x.toLowerCase()),k&&y&&(k=Re(k,y)||k);const C=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let S=v===x||!o&&v.startsWith(x)&&v.charAt(C)==="/",L=k!=null&&(k===x||!o&&k.startsWith(x)&&k.charAt(x.length)==="/"),R={isActive:S,isPending:L,isTransitioning:$},N=S?t:void 0,U;typeof n=="function"?U=n(R):U=[n,S?"active":null,L?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let Q=typeof i=="function"?i(R):i;return p.createElement(qn,{...l,"aria-current":N,className:U,ref:u,style:Q,to:a,viewTransition:d},typeof c=="function"?c(R):c)});js.displayName="NavLink";var Ps=p.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:i,method:a=jt,action:d,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:h,...g},f)=>{let b=Ts(),y=Ls(d,{relative:l}),$=a.toLowerCase()==="get"?"get":"post",x=typeof d=="string"&&Vn.test(d),v=k=>{if(c&&c(k),k.defaultPrevented)return;k.preventDefault();let C=k.nativeEvent.submitter,S=C?.getAttribute("formmethod")||a;b(C||k.currentTarget,{fetcherKey:t,method:S,navigate:r,replace:o,state:i,relative:l,preventScrollReset:u,viewTransition:h})};return p.createElement("form",{ref:f,method:$,action:y,onSubmit:n?c:v,...g,"data-discover":!x&&e==="render"?"true":void 0})});Ps.displayName="Form";function Rs(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Kn(e){let t=p.useContext(et);return q(t,Rs(e)),t}function Es(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:i,viewTransition:a}={}){let d=Fi(),c=He(),l=gt(e,{relative:i});return p.useCallback(u=>{if(ss(u,t)){u.preventDefault();let h=r!==void 0?r:dt(c)===dt(l);d(e,{replace:h,state:n,preventScrollReset:o,relative:i,viewTransition:a})}},[c,d,l,r,n,t,e,o,i,a])}var Ms=0,zs=()=>`__${String(++Ms)}__`;function Ts(){let{router:e}=Kn("useSubmit"),{basename:t}=p.useContext(ke),r=Xi();return p.useCallback(async(n,o={})=>{let{action:i,method:a,encType:d,formData:c,body:l}=ls(n,t);if(o.navigate===!1){let u=o.fetcherKey||zs();await e.fetch(u,r,o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Ls(e,{relative:t}={}){let{basename:r}=p.useContext(ke),n=p.useContext(Me);q(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),i={...gt(e||".",{relative:t})},a=He();if(e==null){i.search=a.search;let d=new URLSearchParams(i.search),c=d.getAll("index");if(c.some(u=>u==="")){d.delete("index"),c.filter(h=>h).forEach(h=>d.append("index",h));let u=d.toString();i.search=u?`?${u}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(i.pathname=i.pathname==="/"?r:Pe([r,i.pathname])),dt(i)}function Is(e,t={}){let r=p.useContext(On);q(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=Kn("useViewTransitionState"),o=gt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let i=Re(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Re(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Lt(o.pathname,a)!=null||Lt(o.pathname,i)!=null}[...xs];const Xn={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},As={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Ds={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Qn={colors:As,...Xn},Ns={colors:Ds,...Xn},Os={light:Qn,dark:Ns},Fs=Qn;var oe=function(){return oe=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},oe.apply(this,arguments)};function ut(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,i;n<o;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var G="-ms-",lt="-moz-",B="-webkit-",Jn="comm",Ht="rule",Er="decl",Bs="@import",Zn="@keyframes",Ws="@layer",eo=Math.abs,Mr=String.fromCharCode,ur=Object.assign;function Hs(e,t){return ne(e,0)^45?(((t<<2^ne(e,0))<<2^ne(e,1))<<2^ne(e,2))<<2^ne(e,3):0}function to(e){return e.trim()}function je(e,t){return(e=t.exec(e))?e[0]:e}function D(e,t,r){return e.replace(t,r)}function Rt(e,t,r){return e.indexOf(t,r)}function ne(e,t){return e.charCodeAt(t)|0}function Ke(e,t,r){return e.slice(t,r)}function $e(e){return e.length}function ro(e){return e.length}function ot(e,t){return t.push(e),e}function _s(e,t){return e.map(t).join("")}function Gr(e,t){return e.filter(function(r){return!je(r,t)})}var _t=1,Xe=1,no=0,xe=0,J=0,tt="";function Ut(e,t,r,n,o,i,a,d){return{value:e,root:t,parent:r,type:n,props:o,children:i,line:_t,column:Xe,length:a,return:"",siblings:d}}function Le(e,t){return ur(Ut("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function _e(e){for(;e.root;)e=Le(e.root,{children:[e]});ot(e,e.siblings)}function Us(){return J}function Gs(){return J=xe>0?ne(tt,--xe):0,Xe--,J===10&&(Xe=1,_t--),J}function ye(){return J=xe<no?ne(tt,xe++):0,Xe++,J===10&&(Xe=1,_t++),J}function Fe(){return ne(tt,xe)}function Et(){return xe}function Gt(e,t){return Ke(tt,e,t)}function hr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ys(e){return _t=Xe=1,no=$e(tt=e),xe=0,[]}function Vs(e){return tt="",e}function Qt(e){return to(Gt(xe-1,pr(e===91?e+2:e===40?e+1:e)))}function qs(e){for(;(J=Fe())&&J<33;)ye();return hr(e)>2||hr(J)>3?"":" "}function Ks(e,t){for(;--t&&ye()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return Gt(e,Et()+(t<6&&Fe()==32&&ye()==32))}function pr(e){for(;ye();)switch(J){case e:return xe;case 34:case 39:e!==34&&e!==39&&pr(J);break;case 40:e===41&&pr(e);break;case 92:ye();break}return xe}function Xs(e,t){for(;ye()&&e+J!==57;)if(e+J===84&&Fe()===47)break;return"/*"+Gt(t,xe-1)+"*"+Mr(e===47?e:ye())}function Qs(e){for(;!hr(Fe());)ye();return Gt(e,xe)}function Js(e){return Vs(Mt("",null,null,null,[""],e=Ys(e),0,[0],e))}function Mt(e,t,r,n,o,i,a,d,c){for(var l=0,u=0,h=a,g=0,f=0,b=0,y=1,$=1,x=1,v=0,k="",C=o,S=i,L=n,R=k;$;)switch(b=v,v=ye()){case 40:if(b!=108&&ne(R,h-1)==58){Rt(R+=D(Qt(v),"&","&\f"),"&\f",eo(l?d[l-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:R+=Qt(v);break;case 9:case 10:case 13:case 32:R+=qs(b);break;case 92:R+=Ks(Et()-1,7);continue;case 47:switch(Fe()){case 42:case 47:ot(Zs(Xs(ye(),Et()),t,r,c),c);break;default:R+="/"}break;case 123*y:d[l++]=$e(R)*x;case 125*y:case 59:case 0:switch(v){case 0:case 125:$=0;case 59+u:x==-1&&(R=D(R,/\f/g,"")),f>0&&$e(R)-h&&ot(f>32?Vr(R+";",n,r,h-1,c):Vr(D(R," ","")+";",n,r,h-2,c),c);break;case 59:R+=";";default:if(ot(L=Yr(R,t,r,l,u,o,d,k,C=[],S=[],h,i),i),v===123)if(u===0)Mt(R,t,L,L,C,i,h,d,S);else switch(g===99&&ne(R,3)===110?100:g){case 100:case 108:case 109:case 115:Mt(e,L,L,n&&ot(Yr(e,L,L,0,0,o,d,k,o,C=[],h,S),S),o,S,h,d,n?C:S);break;default:Mt(R,L,L,L,[""],S,0,d,S)}}l=u=f=0,y=x=1,k=R="",h=a;break;case 58:h=1+$e(R),f=b;default:if(y<1){if(v==123)--y;else if(v==125&&y++==0&&Gs()==125)continue}switch(R+=Mr(v),v*y){case 38:x=u>0?1:(R+="\f",-1);break;case 44:d[l++]=($e(R)-1)*x,x=1;break;case 64:Fe()===45&&(R+=Qt(ye())),g=Fe(),u=h=$e(k=R+=Qs(Et())),v++;break;case 45:b===45&&$e(R)==2&&(y=0)}}return i}function Yr(e,t,r,n,o,i,a,d,c,l,u,h){for(var g=o-1,f=o===0?i:[""],b=ro(f),y=0,$=0,x=0;y<n;++y)for(var v=0,k=Ke(e,g+1,g=eo($=a[y])),C=e;v<b;++v)(C=to($>0?f[v]+" "+k:D(k,/&\f/g,f[v])))&&(c[x++]=C);return Ut(e,t,r,o===0?Ht:d,c,l,u,h)}function Zs(e,t,r,n){return Ut(e,t,r,Jn,Mr(Us()),Ke(e,2,-2),0,n)}function Vr(e,t,r,n,o){return Ut(e,t,r,Er,Ke(e,0,n),Ke(e,n+1,-1),n,o)}function oo(e,t,r){switch(Hs(e,t)){case 5103:return B+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return B+e+e;case 4789:return lt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return B+e+lt+e+G+e+e;case 5936:switch(ne(e,t+11)){case 114:return B+e+G+D(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return B+e+G+D(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return B+e+G+D(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return B+e+G+e+e;case 6165:return B+e+G+"flex-"+e+e;case 5187:return B+e+D(e,/(\w+).+(:[^]+)/,B+"box-$1$2"+G+"flex-$1$2")+e;case 5443:return B+e+G+"flex-item-"+D(e,/flex-|-self/g,"")+(je(e,/flex-|baseline/)?"":G+"grid-row-"+D(e,/flex-|-self/g,""))+e;case 4675:return B+e+G+"flex-line-pack"+D(e,/align-content|flex-|-self/g,"")+e;case 5548:return B+e+G+D(e,"shrink","negative")+e;case 5292:return B+e+G+D(e,"basis","preferred-size")+e;case 6060:return B+"box-"+D(e,"-grow","")+B+e+G+D(e,"grow","positive")+e;case 4554:return B+D(e,/([^-])(transform)/g,"$1"+B+"$2")+e;case 6187:return D(D(D(e,/(zoom-|grab)/,B+"$1"),/(image-set)/,B+"$1"),e,"")+e;case 5495:case 3959:return D(e,/(image-set\([^]*)/,B+"$1$`$1");case 4968:return D(D(e,/(.+:)(flex-)?(.*)/,B+"box-pack:$3"+G+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+B+e+e;case 4200:if(!je(e,/flex-|baseline/))return G+"grid-column-align"+Ke(e,t)+e;break;case 2592:case 3360:return G+D(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,je(n.props,/grid-\w+-end/)})?~Rt(e+(r=r[t].value),"span",0)?e:G+D(e,"-start","")+e+G+"grid-row-span:"+(~Rt(r,"span",0)?je(r,/\d+/):+je(r,/\d+/)-+je(e,/\d+/))+";":G+D(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return je(n.props,/grid-\w+-start/)})?e:G+D(D(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return D(e,/(.+)-inline(.+)/,B+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if($e(e)-1-t>6)switch(ne(e,t+1)){case 109:if(ne(e,t+4)!==45)break;case 102:return D(e,/(.+:)(.+)-([^]+)/,"$1"+B+"$2-$3$1"+lt+(ne(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Rt(e,"stretch",0)?oo(D(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return D(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,i,a,d,c,l){return G+o+":"+i+l+(a?G+o+"-span:"+(d?c:+c-+i)+l:"")+e});case 4949:if(ne(e,t+6)===121)return D(e,":",":"+B)+e;break;case 6444:switch(ne(e,ne(e,14)===45?18:11)){case 120:return D(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+B+(ne(e,14)===45?"inline-":"")+"box$3$1"+B+"$2$3$1"+G+"$2box$3")+e;case 100:return D(e,":",":"+G)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return D(e,"scroll-","scroll-snap-")+e}return e}function It(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function ea(e,t,r,n){switch(e.type){case Ws:if(e.children.length)break;case Bs:case Er:return e.return=e.return||e.value;case Jn:return"";case Zn:return e.return=e.value+"{"+It(e.children,n)+"}";case Ht:if(!$e(e.value=e.props.join(",")))return""}return $e(r=It(e.children,n))?e.return=e.value+"{"+r+"}":""}function ta(e){var t=ro(e);return function(r,n,o,i){for(var a="",d=0;d<t;d++)a+=e[d](r,n,o,i)||"";return a}}function ra(e){return function(t){t.root||(t=t.return)&&e(t)}}function na(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Er:e.return=oo(e.value,e.length,r);return;case Zn:return It([Le(e,{value:D(e.value,"@","@"+B)})],n);case Ht:if(e.length)return _s(r=e.props,function(o){switch(je(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":_e(Le(e,{props:[D(o,/:(read-\w+)/,":"+lt+"$1")]})),_e(Le(e,{props:[o]})),ur(e,{props:Gr(r,n)});break;case"::placeholder":_e(Le(e,{props:[D(o,/:(plac\w+)/,":"+B+"input-$1")]})),_e(Le(e,{props:[D(o,/:(plac\w+)/,":"+lt+"$1")]})),_e(Le(e,{props:[D(o,/:(plac\w+)/,G+"input-$1")]})),_e(Le(e,{props:[o]})),ur(e,{props:Gr(r,n)});break}return""})}}var oa={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},Qe=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",io="active",so="data-styled-version",Yt="6.1.19",zr=`/*!sc*/
`,At=typeof window<"u"&&typeof document<"u",ia=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),sa={},Vt=Object.freeze([]),Je=Object.freeze({});function ao(e,t,r){return r===void 0&&(r=Je),e.theme!==r.theme&&e.theme||t||r.theme}var co=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),aa=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ca=/(^-|-$)/g;function qr(e){return e.replace(aa,"-").replace(ca,"")}var la=/(a)(d)/gi,bt=52,Kr=function(e){return String.fromCharCode(e+(e>25?39:97))};function mr(e){var t,r="";for(t=Math.abs(e);t>bt;t=t/bt|0)r=Kr(t%bt)+r;return(Kr(t%bt)+r).replace(la,"$1-$2")}var Jt,lo=5381,Ye=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},uo=function(e){return Ye(lo,e)};function ho(e){return mr(uo(e)>>>0)}function da(e){return e.displayName||e.name||"Component"}function Zt(e){return typeof e=="string"&&!0}var po=typeof Symbol=="function"&&Symbol.for,mo=po?Symbol.for("react.memo"):60115,ua=po?Symbol.for("react.forward_ref"):60112,ha={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},pa={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},fo={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ma=((Jt={})[ua]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Jt[mo]=fo,Jt);function Xr(e){return("type"in(t=e)&&t.type.$$typeof)===mo?fo:"$$typeof"in e?ma[e.$$typeof]:ha;var t}var fa=Object.defineProperty,ga=Object.getOwnPropertyNames,Qr=Object.getOwnPropertySymbols,xa=Object.getOwnPropertyDescriptor,ya=Object.getPrototypeOf,Jr=Object.prototype;function go(e,t,r){if(typeof t!="string"){if(Jr){var n=ya(t);n&&n!==Jr&&go(e,n,r)}var o=ga(t);Qr&&(o=o.concat(Qr(t)));for(var i=Xr(e),a=Xr(t),d=0;d<o.length;++d){var c=o[d];if(!(c in pa||r&&r[c]||a&&c in a||i&&c in i)){var l=xa(t,c);try{fa(e,c,l)}catch{}}}}return e}function Be(e){return typeof e=="function"}function Tr(e){return typeof e=="object"&&"styledComponentId"in e}function Oe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function fr(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function ht(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function gr(e,t,r){if(r===void 0&&(r=!1),!r&&!ht(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=gr(e[n],t[n]);else if(ht(t))for(var n in t)e[n]=gr(e[n],t[n]);return e}function Lr(e,t){Object.defineProperty(e,"toString",{value:t})}function We(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ba=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,i=o;t>=i;)if((i<<=1)<0)throw We(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var a=o;a<i;a++)this.groupSizes[a]=0}for(var d=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(d,r[a])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var i=n;i<o;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),i=o+n,a=o;a<i;a++)r+="".concat(this.tag.getRule(a)).concat(zr);return r},e}(),zt=new Map,Dt=new Map,Tt=1,$t=function(e){if(zt.has(e))return zt.get(e);for(;Dt.has(Tt);)Tt++;var t=Tt++;return zt.set(e,t),Dt.set(t,e),t},$a=function(e,t){Tt=t+1,zt.set(e,t),Dt.set(t,e)},va="style[".concat(Qe,"][").concat(so,'="').concat(Yt,'"]'),wa=new RegExp("^".concat(Qe,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ka=function(e,t,r){for(var n,o=r.split(","),i=0,a=o.length;i<a;i++)(n=o[i])&&e.registerName(t,n)},Sa=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(zr),o=[],i=0,a=n.length;i<a;i++){var d=n[i].trim();if(d){var c=d.match(wa);if(c){var l=0|parseInt(c[1],10),u=c[2];l!==0&&($a(u,l),ka(e,u,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(d)}}},Zr=function(e){for(var t=document.querySelectorAll(va),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Qe)!==io&&(Sa(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Ca(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var xo=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(d){var c=Array.from(d.querySelectorAll("style[".concat(Qe,"]")));return c[c.length-1]}(r),i=o!==void 0?o.nextSibling:null;n.setAttribute(Qe,io),n.setAttribute(so,Yt);var a=Ca();return a&&n.setAttribute("nonce",a),r.insertBefore(n,i),n},ja=function(){function e(t){this.element=xo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,i=n.length;o<i;o++){var a=n[o];if(a.ownerNode===r)return a}throw We(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Pa=function(){function e(t){this.element=xo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Ra=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),en=At,Ea={isServer:!At,useCSSOMInjection:!ia},Nt=function(){function e(t,r,n){t===void 0&&(t=Je),r===void 0&&(r={});var o=this;this.options=oe(oe({},Ea),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&At&&en&&(en=!1,Zr(this)),Lr(this,function(){return function(i){for(var a=i.getTag(),d=a.length,c="",l=function(h){var g=function(x){return Dt.get(x)}(h);if(g===void 0)return"continue";var f=i.names.get(g),b=a.getGroup(h);if(f===void 0||!f.size||b.length===0)return"continue";var y="".concat(Qe,".g").concat(h,'[id="').concat(g,'"]'),$="";f!==void 0&&f.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(b).concat(y,'{content:"').concat($,'"}').concat(zr)},u=0;u<d;u++)l(u);return c}(o)})}return e.registerId=function(t){return $t(t)},e.prototype.rehydrate=function(){!this.server&&At&&Zr(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(oe(oe({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Ra(o):n?new ja(o):new Pa(o)}(this.options),new ba(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if($t(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules($t(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup($t(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ma=/&/g,za=/^\s*\/\/.*$/gm;function yo(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=yo(r.children,t)),r})}function Ta(e){var t,r,n,o=Je,i=o.options,a=i===void 0?Je:i,d=o.plugins,c=d===void 0?Vt:d,l=function(g,f,b){return b.startsWith(r)&&b.endsWith(r)&&b.replaceAll(r,"").length>0?".".concat(t):g},u=c.slice();u.push(function(g){g.type===Ht&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Ma,r).replace(n,l))}),a.prefix&&u.push(na),u.push(ea);var h=function(g,f,b,y){f===void 0&&(f=""),b===void 0&&(b=""),y===void 0&&(y="&"),t=y,r=f,n=new RegExp("\\".concat(r,"\\b"),"g");var $=g.replace(za,""),x=Js(b||f?"".concat(b," ").concat(f," { ").concat($," }"):$);a.namespace&&(x=yo(x,a.namespace));var v=[];return It(x,ta(u.concat(ra(function(k){return v.push(k)})))),v};return h.hash=c.length?c.reduce(function(g,f){return f.name||We(15),Ye(g,f.name)},lo).toString():"",h}var La=new Nt,xr=Ta(),bo=Z.createContext({shouldForwardProp:void 0,styleSheet:La,stylis:xr});bo.Consumer;Z.createContext(void 0);function yr(){return p.useContext(bo)}var Ia=function(){function e(t,r){var n=this;this.inject=function(o,i){i===void 0&&(i=xr);var a=n.name+i.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,i(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Lr(this,function(){throw We(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=xr),this.name+t.hash},e}(),Aa=function(e){return e>="A"&&e<="Z"};function tn(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Aa(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var $o=function(e){return e==null||e===!1||e===""},vo=function(e){var t,r,n=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!$o(i)&&(Array.isArray(i)&&i.isCss||Be(i)?n.push("".concat(tn(o),":"),i,";"):ht(i)?n.push.apply(n,ut(ut(["".concat(o," {")],vo(i),!1),["}"],!1)):n.push("".concat(tn(o),": ").concat((t=o,(r=i)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in oa||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ie(e,t,r,n){if($o(e))return[];if(Tr(e))return[".".concat(e.styledComponentId)];if(Be(e)){if(!Be(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return Ie(o,t,r,n)}var i;return e instanceof Ia?r?(e.inject(r,n),[e.getName(n)]):[e]:ht(e)?vo(e):Array.isArray(e)?Array.prototype.concat.apply(Vt,e.map(function(a){return Ie(a,t,r,n)})):[e.toString()]}function wo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Be(r)&&!Tr(r))return!1}return!0}var Da=uo(Yt),Na=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&wo(t),this.componentId=r,this.baseHash=Ye(Da,r),this.baseStyle=n,Nt.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Oe(o,this.staticRulesId);else{var i=fr(Ie(this.rules,t,r,n)),a=mr(Ye(this.baseHash,i)>>>0);if(!r.hasNameForId(this.componentId,a)){var d=n(i,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,d)}o=Oe(o,a),this.staticRulesId=a}else{for(var c=Ye(this.baseHash,n.hash),l="",u=0;u<this.rules.length;u++){var h=this.rules[u];if(typeof h=="string")l+=h;else if(h){var g=fr(Ie(h,t,r,n));c=Ye(c,g+u),l+=g}}if(l){var f=mr(c>>>0);r.hasNameForId(this.componentId,f)||r.insertRules(this.componentId,f,n(l,".".concat(f),void 0,this.componentId)),o=Oe(o,f)}}return o},e}(),pt=Z.createContext(void 0);pt.Consumer;function Oa(e){var t=Z.useContext(pt),r=p.useMemo(function(){return function(n,o){if(!n)throw We(14);if(Be(n)){var i=n(o);return i}if(Array.isArray(n)||typeof n!="object")throw We(8);return o?oe(oe({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?Z.createElement(pt.Provider,{value:r},e.children):null}var er={};function Fa(e,t,r){var n=Tr(e),o=e,i=!Zt(e),a=t.attrs,d=a===void 0?Vt:a,c=t.componentId,l=c===void 0?function(C,S){var L=typeof C!="string"?"sc":qr(C);er[L]=(er[L]||0)+1;var R="".concat(L,"-").concat(ho(Yt+L+er[L]));return S?"".concat(S,"-").concat(R):R}(t.displayName,t.parentComponentId):c,u=t.displayName,h=u===void 0?function(C){return Zt(C)?"styled.".concat(C):"Styled(".concat(da(C),")")}(e):u,g=t.displayName&&t.componentId?"".concat(qr(t.displayName),"-").concat(t.componentId):t.componentId||l,f=n&&o.attrs?o.attrs.concat(d).filter(Boolean):d,b=t.shouldForwardProp;if(n&&o.shouldForwardProp){var y=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;b=function(C,S){return y(C,S)&&$(C,S)}}else b=y}var x=new Na(r,g,n?o.componentStyle:void 0);function v(C,S){return function(L,R,N){var U=L.attrs,Q=L.componentStyle,w=L.defaultProps,O=L.foldedComponentIds,F=L.styledComponentId,I=L.target,H=Z.useContext(pt),ee=yr(),ce=L.shouldForwardProp||ee.shouldForwardProp,Se=ao(R,H,w)||Je,V=function(Ce,fe,j){for(var T,M=oe(oe({},fe),{className:void 0,theme:j}),z=0;z<Ce.length;z+=1){var P=Be(T=Ce[z])?T(M):T;for(var E in P)M[E]=E==="className"?Oe(M[E],P[E]):E==="style"?oe(oe({},M[E]),P[E]):P[E]}return fe.className&&(M.className=Oe(M.className,fe.className)),M}(U,R,Se),se=V.as||I,ae={};for(var te in V)V[te]===void 0||te[0]==="$"||te==="as"||te==="theme"&&V.theme===Se||(te==="forwardedAs"?ae.as=V.forwardedAs:ce&&!ce(te,se)||(ae[te]=V[te]));var me=function(Ce,fe){var j=yr(),T=Ce.generateAndInjectStyles(fe,j.styleSheet,j.stylis);return T}(Q,V),de=Oe(O,F);return me&&(de+=" "+me),V.className&&(de+=" "+V.className),ae[Zt(se)&&!co.has(se)?"class":"className"]=de,N&&(ae.ref=N),p.createElement(se,ae)}(k,C,S)}v.displayName=h;var k=Z.forwardRef(v);return k.attrs=f,k.componentStyle=x,k.displayName=h,k.shouldForwardProp=b,k.foldedComponentIds=n?Oe(o.foldedComponentIds,o.styledComponentId):"",k.styledComponentId=g,k.target=n?o.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(C){this._foldedDefaultProps=n?function(S){for(var L=[],R=1;R<arguments.length;R++)L[R-1]=arguments[R];for(var N=0,U=L;N<U.length;N++)gr(S,U[N],!0);return S}({},o.defaultProps,C):C}}),Lr(k,function(){return".".concat(k.styledComponentId)}),i&&go(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function rn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var nn=function(e){return Object.assign(e,{isCss:!0})};function ve(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Be(e)||ht(e))return nn(Ie(rn(Vt,ut([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Ie(n):nn(Ie(rn(n,t)))}function br(e,t,r){if(r===void 0&&(r=Je),!t)throw We(1,t);var n=function(o){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,r,ve.apply(void 0,ut([o],i,!1)))};return n.attrs=function(o){return br(e,t,oe(oe({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return br(e,t,oe(oe({},r),o))},n}var ko=function(e){return br(Fa,e)},m=ko;co.forEach(function(e){m[e]=ko(e)});var Ba=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=wo(t),Nt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var i=o(fr(Ie(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,i)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Nt.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Wa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=ve.apply(void 0,ut([e],t,!1)),o="sc-global-".concat(ho(JSON.stringify(n))),i=new Ba(n,o),a=function(c){var l=yr(),u=Z.useContext(pt),h=Z.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&d(h,c,l.styleSheet,u,l.stylis),Z.useLayoutEffect(function(){if(!l.styleSheet.server)return d(h,c,l.styleSheet,u,l.stylis),function(){return i.removeStyles(h,l.styleSheet)}},[h,c,l.styleSheet,u,l.stylis]),null};function d(c,l,u,h,g){if(i.isStatic)i.renderStyles(c,sa,u,g);else{var f=oe(oe({},l),{theme:ao(l,h,a.defaultProps)});i.renderStyles(c,f,u,g)}}return Z.memo(a)}const So=p.createContext(void 0),Co=()=>{const e=p.useContext(So);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ha=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",_a=K(({children:e})=>{const t=De(),r=t.preferences.theme||"system",o=r==="system"?Ha():r,i=Os[o]||Fs,a={...i,colors:{...i.colors,board:{...i.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},d={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return p.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),l=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",l),()=>c.removeEventListener("change",l)}},[r,t]),p.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([l,u])=>{typeof u=="string"?c.style.setProperty(`--color-${l}`,u):typeof u=="object"&&u!==null&&Object.entries(u).forEach(([h,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${l}-${h}`,g)})}),Object.entries(a.spacing).forEach(([l,u])=>{c.style.setProperty(`--spacing-${l}`,u)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),s.jsx(So.Provider,{value:d,children:s.jsx(Oa,{theme:a,children:e})})});function Ua(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ga(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var tr=typeof window<"u",Ya=function(e){p.useEffect(e,[])},Va=function(e){var t=p.useRef(e);t.current=e,Ya(function(){return function(){return t.current()}})},qa=function(e){var t=p.useRef(0),r=p.useState(e),n=r[0],o=r[1],i=p.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Va(function(){cancelAnimationFrame(t.current)}),[n,i]},jo=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,i=o===void 0?1/0:o,a=t.onChange,d=qa({width:tr?window.innerWidth:n,height:tr?window.innerHeight:i}),c=d[0],l=d[1];return p.useEffect(function(){if(tr){var u=function(){var h=window.innerWidth,g=window.innerHeight;l({width:h,height:g}),a&&a(h,g)};return Ua(window,"resize",u),function(){Ga(window,"resize",u)}}},[]),c};const Ir=()=>{const{width:e=0,height:t=0}=jo();return{width:e,height:t}},Ka=()=>{const{width:e=0,height:t=0}=jo();return e>t?"landscape":"portrait"},Xa=()=>{const{width:e}=Ir(),{theme:t}=Co(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Po=()=>{const[e,t]=p.useState(!1);return p.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Qa=()=>{const[e,t]=p.useState(!1),r=Po(),{width:n}=Ir();return p.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),d=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||d&&c})())},[r,n]),e},Ne=()=>{const e=Ir(),t=Ka(),r=Xa(),n=Po(),o=Qa();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},Ro=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Eo=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},Ja=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},Za=p.createContext(void 0),ec=({children:e})=>{const t=De(),r=Ne(),[n,o]=p.useState(!0),[i,a]=p.useState(["chat","moves"]),[d,c]=p.useState(!1),l=t.preferences.layout,u=p.useMemo(()=>l==="auto"?r.orientation:l,[l,r.orientation]),h=p.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=y=>{t.updatePreference("layout",y)},f=y=>{a($=>$.includes(y)?$.filter(x=>x!==y):[...$,y])};p.useEffect(()=>{c(!0),o($=>{const x=!h;return $!==x?x:$}),a($=>{if(h&&u==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(u==="landscape"&&!h){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const y=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(y)},[u,h]);const b={...r,layoutPreference:l,setLayoutPreference:g,activeLayout:u,isCompactMode:h,showSidebar:n,setSidebarVisible:o,activePanels:i,togglePanel:f,isTransitioning:d};return s.jsx(Za.Provider,{value:b,children:e})};m.div`
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

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ve`
                flex-direction: column;
            `:ve`
                flex-direction: row;
            `}
`;m.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ve`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `:ve`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `}
`;m.aside`
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`all ${e.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t,showSidebar:r})=>r?e==="portrait"||t?ve`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme:n})=>n.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `:ve`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme:n})=>n.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `:ve`
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
        `)),ve`${n}`}}
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
`;const tc=m.input`
  display: none;
`,rc=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  cursor: pointer;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundSecondary};
  }
`,nc=({settingId:e,onUpload:t})=>{const r=p.useRef(null),n=i=>{const a=i.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const l=new FileReader;l.onload=u=>{const h=u.target?.result;t(e,h,a.name)},l.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return s.jsxs(s.Fragment,{children:[s.jsx(tc,{ref:r,type:"file",accept:"audio/*",onChange:n}),s.jsx(rc,{type:"button",onClick:o,children:"Upload"})]})},oc=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,ic=m.div`
  position: fixed;
  left: ${e=>e.$isMobile?0:e.$x}px;
  top: ${e=>e.$isMobile?0:e.$y}px;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.$isMobile?0:e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.xl};
  width: ${e=>e.$isMobile?"100%":"90%"};
  max-width: ${e=>e.$isMobile?"none":"800px"};
  height: ${e=>e.$isMobile?"100vh":"80vh"};
  max-height: ${e=>e.$isMobile?"none":"600px"};
  display: flex;
  flex-direction: column;
  pointer-events: auto;
`,sc=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[4]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  cursor: move;
  user-select: none;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundSecondary};
  }
`,ac=m.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,cc=m.button`
  background: none;
  border: none;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${e=>e.theme.spacing[2]};
  border-radius: ${e=>e.theme.borderRadius.md};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundSecondary};
  }
`,lc=m.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,dc=m.input`
  width: 100%;
  padding: ${e=>e.theme.spacing[3]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.md};
  box-sizing: border-box;
  
  &::placeholder {
    color: ${e=>e.theme.colors.textTertiary};
  }
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,uc=m.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,hc=m.div`
  width: ${e=>e.$isMobile?"100%":"200px"};
  border-right: ${e=>e.$isMobile?"none":`1px solid ${e.theme.colors.border}`};
  border-bottom: ${e=>e.$isMobile?`1px solid ${e.theme.colors.border}`:"none"};
  overflow-y: ${e=>e.$isMobile?"visible":"auto"};
  overflow-x: ${e=>e.$isMobile?"auto":"visible"};
  padding: ${e=>e.theme.spacing[3]};
  ${e=>e.$isMobile&&`
    display: flex;
    gap: ${e.theme.spacing[2]};
    flex-shrink: 0;
  `}
`,pc=m.button`
  width: ${e=>e.$isMobile?"auto":"100%"};
  flex-shrink: ${e=>e.$isMobile?"0":"1"};
  white-space: ${e=>e.$isMobile?"nowrap":"normal"};
  text-align: left;
  padding: ${e=>e.theme.spacing[3]};
  margin-bottom: ${e=>e.$isMobile?"0":e.theme.spacing[2]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.$active?e.theme.colors.primary:"transparent"};
  color: ${e=>e.$active?"white":e.theme.colors.text};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.backgroundSecondary};
  }
`,mc=m.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,fc=m.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,gc=m.div`
  margin-bottom: ${e=>e.theme.spacing[6]};
`,on=m.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[3]} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`,xc=m.div`
  flex: 1;
  margin-right: ${e=>e.theme.spacing[4]};
`,sn=m.label`
  display: block;
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[1]};
`,an=m.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,yc=m.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,bc=m.input`
  width: ${e=>e.$isMobile?"52px":"44px"};
  height: ${e=>e.$isMobile?"28px":"24px"};
  -webkit-appearance: none;
  appearance: none;
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-radius: ${e=>e.$isMobile?"14px":"12px"};
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;
  
  &:checked {
    background-color: ${e=>e.theme.colors.primary};
  }
  
  &::before {
    content: '';
    position: absolute;
    width: ${e=>e.$isMobile?"24px":"20px"};
    height: ${e=>e.$isMobile?"24px":"20px"};
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }
  
  &:checked::before {
    transform: translateX(${e=>e.$isMobile?"24px":"20px"});
  }
`,$c=m.select`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,vc=m.input`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  width: 80px;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,wc=m.input`
  width: ${e=>e.$isMobile?"80px":"60px"};
  height: ${e=>e.$isMobile?"40px":"32px"};
  padding: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.background};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,kc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Sc=m.textarea`
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-family: monospace;
  resize: vertical;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
  
  &.error {
    border-color: ${e=>e.theme.colors.error||"#ff0000"};
  }
`,Cc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,jc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Pc=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[1]};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundSecondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,cn=m.button`
  padding: ${e=>e.theme.spacing[1]};
  margin-left: ${e=>e.theme.spacing[2]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.sm};
  background-color: transparent;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    color: ${e=>e.theme.colors.text};
  }
  
  &:active {
    transform: scale(0.95);
  }
`,Rc=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Ec=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Mc=m.p`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,rr=m.button`
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[4]};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  
  ${e=>e.$variant==="primary"?`
    background-color: ${e.theme.colors.primary};
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  `:`
    background-color: transparent;
    color: ${e.theme.colors.text};
    border: 1px solid ${e.theme.colors.border};
    
    &:hover {
      background-color: ${e.theme.colors.backgroundSecondary};
    }
  `}
`,Mo=K(({isOpen:e,onClose:t})=>{const r=De(),{settingsRegistry:n}=r,o=Ne(),i=o.isMobileDevice||o.dimensions.width<768,[a,d]=p.useState("board"),[c,l]=p.useState(""),[u,h]=p.useState({}),[g,f]=p.useState({x:0,y:0}),[b,y]=p.useState(!1),[$,x]=p.useState({x:0,y:0}),v=p.useRef(null);if(p.useEffect(()=>{if(e&&v.current&&!i){const w=v.current.getBoundingClientRect();f({x:(window.innerWidth-w.width)/2,y:(window.innerHeight-w.height)/2})}},[e,i]),p.useEffect(()=>{if(!b)return;const w=F=>{f({x:F.clientX-$.x,y:F.clientY-$.y})},O=()=>{y(!1)};return document.addEventListener("mousemove",w),document.addEventListener("mouseup",O),()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",O)}},[b,$]),!e)return null;const k=n.getAllCategories(),C=c?n.search(c):n.getByCategory(a),S=(w,O)=>{const F=n.get(w);if(F){if(F.validate){const I=F.validate(O);if(typeof I=="string"){h(H=>({...H,[w]:I}));return}else if(I===!1){h(H=>({...H,[w]:"Invalid value"}));return}}h(I=>{const H={...I};return delete H[w],H}),F.value=O,F.onChange?.(O),w in r.preferences&&r.updatePreference(w,O)}},L=w=>{const O=n.get(w);O&&S(w,O.defaultValue)},R=(w,O,F)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),H=`custom_${w}_${Date.now()}`;I[H]={dataUrl:O,fileName:F,settingId:w,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),S(w,H);const ee=n.get(w);if(ee&&ee.options){const ce={label:`Custom: ${F}`,value:H},Se=ee.options.filter(V=>!V.value.startsWith("custom_"));ee.options=[...Se,ce]}},N=w=>{if(!(!w||w==="none"))try{let O;if(w.startsWith("custom_")){const H=JSON.parse(localStorage.getItem("customSounds")||"{}")[w];if(H&&H.dataUrl)O=H.dataUrl;else{console.error("Custom sound not found:",w);return}}else O=`/sounds/${w}`;const F=new Audio(O);F.volume=.5,F.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(O){console.error("Error playing sound:",O)}},U=w=>{i||(y(!0),x({x:w.clientX-g.x,y:w.clientY-g.y}))},Q=w=>{switch(w.type){case"boolean":return s.jsx(bc,{type:"checkbox",checked:w.value,onChange:I=>S(w.id,I.target.checked),$isMobile:i});case"select":if(w.id.endsWith("SoundFile")){const I=w.options?.find(ce=>ce.value===w.value),H=I?I.label:"None",ee=w.value&&w.value!=="none";return s.jsxs(kc,{children:[s.jsx(jc,{children:H}),s.jsx(Pc,{type:"button",onClick:()=>N(w.value),disabled:!ee,title:ee?"Play sound":"No sound selected",children:"▶️ Play"}),s.jsx(nc,{settingId:w.id,onUpload:R})]})}else return s.jsx($c,{value:w.value,onChange:I=>S(w.id,I.target.value),children:w.options?.map(I=>s.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return s.jsx(vc,{type:"number",value:w.value,min:w.min,max:w.max,step:w.step,onChange:I=>S(w.id,Number(I.target.value))});case"color":return s.jsx(wc,{type:"color",value:w.value,onChange:I=>S(w.id,I.target.value),$isMobile:i});case"text":const F=!!u[w.id];return s.jsxs("div",{style:{width:"100%"},children:[s.jsx(Sc,{value:w.value||"",onChange:I=>S(w.id,I.target.value),className:F?"error":"",placeholder:w.placeholder||"",spellCheck:!1}),F&&s.jsx(Cc,{children:u[w.id]})]});default:return null}};return s.jsx(oc,{children:s.jsxs(ic,{ref:v,$x:g.x,$y:g.y,$isMobile:i,children:[s.jsxs(sc,{onMouseDown:U,children:[s.jsx(ac,{children:"⚙️ Settings"}),s.jsx(cc,{onClick:t,onMouseDown:w=>w.stopPropagation(),children:"✕"})]}),s.jsx(lc,{children:s.jsx(dc,{type:"text",placeholder:"Search settings...",value:c,onChange:w=>l(w.target.value)})}),s.jsxs(uc,{$isMobile:i,children:[s.jsx(hc,{$isMobile:i,children:k.map(w=>s.jsxs(pc,{$active:a===w.id&&!c,$isMobile:i,onClick:()=>{d(w.id),l("")},children:[s.jsx(mc,{children:w.icon}),!i&&w.label]},w.id))}),s.jsxs(fc,{children:[c&&s.jsxs(Mc,{children:["Found ",C.length,' settings matching "',c,'"']}),s.jsx(gc,{children:C.map(w=>w.type==="text"?s.jsxs(on,{style:{flexDirection:"column",alignItems:"stretch"},children:[s.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[s.jsxs("div",{children:[s.jsx(sn,{children:w.label}),w.description&&s.jsx(an,{children:w.description})]}),w.value!==w.defaultValue&&s.jsx(cn,{type:"button",onClick:()=>L(w.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),Q(w)]},w.id):s.jsxs(on,{children:[s.jsxs(xc,{children:[s.jsx(sn,{children:w.label}),w.description&&s.jsx(an,{children:w.description})]}),s.jsxs(yc,{children:[Q(w),w.value!==w.defaultValue&&s.jsx(cn,{type:"button",onClick:()=>L(w.id),title:"Reset to default",children:"↻"})]})]},w.id))})]})]}),s.jsxs(Rc,{children:[s.jsx(rr,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),s.jsxs(Ec,{children:[s.jsx(rr,{onClick:t,children:"Cancel"}),s.jsx(rr,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});Mo.displayName="SettingsDialog";const zc=m.header`
  height: 44px;
  background-color: ${e=>e.theme.colors.surface};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${e=>e.theme.spacing[2]};
  position: relative;
  z-index: 100;
  
  @media (min-width: 640px) {
    height: 48px;
    padding: 0 ${e=>e.theme.spacing[3]};
  }
`,Tc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Lc=m.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${e=>e.theme.borderRadius.md};
  color: ${e=>e.theme.colors.text};
  transition: background-color ${e=>e.theme.transitions.fast};
  font-size: ${e=>e.theme.typography.fontSize.lg};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
  
  @media (min-width: 640px) {
    width: 36px;
    height: 36px;
  }
`,Ic=m.div`
  position: absolute;
  top: 100%;
  left: ${e=>e.theme.spacing[2]};
  margin-top: ${e=>e.theme.spacing[1]};
  background-color: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.lg};
  min-width: 200px;
  z-index: 1000;
  transform: ${e=>e.$isOpen?"translateY(0)":"translateY(-10px)"};
  opacity: ${e=>e.$isOpen?1:0};
  visibility: ${e=>e.$isOpen?"visible":"hidden"};
  transition: all ${e=>e.theme.transitions.fast};
  
  @media (min-width: 640px) {
    left: ${e=>e.theme.spacing[4]};
  }
`,Ue=m.button`
  width: 100%;
  padding: ${e=>e.theme.spacing[3]} ${e=>e.theme.spacing[4]};
  border: none;
  background: none;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.spacing[3]};
  transition: background-color ${e=>e.theme.transitions.fast};
  position: relative;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundSecondary};
  }
  
  &:first-child {
    border-radius: ${e=>e.theme.borderRadius.md} ${e=>e.theme.borderRadius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${e=>e.theme.borderRadius.md} ${e=>e.theme.borderRadius.md};
  }
`,Ge=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
`,nr=m.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,or=m.div`
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: ${e=>e.theme.spacing[1]};
  background-color: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.lg};
  min-width: 150px;
  z-index: 1001;
  transform: ${e=>e.$isOpen?"translateX(0)":"translateX(-10px)"};
  opacity: ${e=>e.$isOpen?1:0};
  visibility: ${e=>e.$isOpen?"visible":"hidden"};
  transition: all ${e=>e.theme.transitions.fast};
`,Te=m.button`
  width: 100%;
  padding: ${e=>e.theme.spacing[2]} ${e=>e.theme.spacing[3]};
  border: none;
  background: ${e=>e.$isActive?e.theme.colors.primary:"none"};
  color: ${e=>e.$isActive?"white":e.theme.colors.text};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  transition: background-color ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.$isActive?e.theme.colors.primary:e.theme.colors.backgroundSecondary};
  }
  
  &:first-child {
    border-radius: ${e=>e.theme.borderRadius.md} ${e=>e.theme.borderRadius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${e=>e.theme.borderRadius.md} ${e=>e.theme.borderRadius.md};
  }
`,ln=m.hr`
  margin: ${e=>e.theme.spacing[1]} 0;
  border: none;
  border-top: 1px solid ${e=>e.theme.colors.border};
`;m.h1`
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  color: ${e=>e.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;const Ac=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Dc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Nc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Oc=m.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,ir=m.button`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  border: none;
  background-color: ${e=>e.$isActive?e.theme.colors.surface:"transparent"};
  color: ${e=>e.$isActive?e.theme.colors.text:e.theme.colors.textSecondary};
  border-radius: ${e=>e.theme.borderRadius.sm};
  cursor: ${e=>e.$isDisabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$isDisabled?.5:1};
  transition: all ${e=>e.theme.transitions.fast};
  font-size: ${e=>e.theme.typography.fontSize.xs};
  font-weight: ${e=>e.$isActive?e.theme.typography.fontWeight.medium:"normal"};
  white-space: nowrap;
  height: 28px;
  
  &:hover:not(:disabled) {
    background-color: ${e=>e.$isActive?e.theme.colors.surface:e.theme.colors.backgroundTertiary};
    color: ${e=>e.theme.colors.text};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`,zo=K(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:i}=Co(),a=Ro(),d=Eo(),[c,l]=p.useState(!1),[u,h]=p.useState(!1),[g,f]=p.useState(null),b=S=>{t.updatePreference("viewMode",S),h(!1),f(null)},y=S=>{t.updatePreference("chessOrientation",S),h(!1),f(null)},$=S=>{i(S),h(!1),f(null)},x=()=>{h(!u),f(null)},v=()=>{l(!0),h(!1),f(null)},k=S=>{f(S)},C=r==="chat-only";return Z.useEffect(()=>{const S=L=>{const R=L.target;u&&!R.closest(".hamburger-menu-container")&&h(!1)};if(u)return document.addEventListener("click",S),()=>document.removeEventListener("click",S)},[u]),Z.useEffect(()=>{const S=L=>{(L.ctrlKey||L.metaKey)&&L.key===","&&(L.preventDefault(),l(!0))};return window.addEventListener("keydown",S),()=>{window.removeEventListener("keydown",S)}},[]),s.jsxs(zc,{children:[s.jsx(Tc,{children:s.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[s.jsx(Lc,{onClick:x,"aria-label":"Menu",children:"☰"}),s.jsxs(Ic,{$isOpen:u,children:[s.jsxs("div",{onMouseEnter:()=>k("theme"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[s.jsxs(Ue,{$hasSubmenu:!0,children:[s.jsx(Ge,{children:"🎨 Theme"}),s.jsx(nr,{children:"▶"})]}),s.jsxs(or,{$isOpen:g==="theme",children:[s.jsx(Te,{$isActive:o==="light",onClick:()=>$("light"),children:"☀ Light"}),s.jsx(Te,{$isActive:o==="dark",onClick:()=>$("dark"),children:"☾ Dark"}),s.jsx(Te,{$isActive:o==="system",onClick:()=>$("system"),children:"◐ System"})]})]}),s.jsxs("div",{onMouseEnter:()=>k("orientation"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[s.jsxs(Ue,{$hasSubmenu:!0,children:[s.jsx(Ge,{children:"📐 Orientation"}),s.jsx(nr,{children:"▶"})]}),s.jsxs(or,{$isOpen:g==="orientation",children:[d.includes("landscape")&&s.jsx(Te,{$isActive:n==="landscape",onClick:()=>!C&&y("landscape"),disabled:C,style:{opacity:C?.5:1},children:"▭ Landscape"}),d.includes("portrait")&&s.jsx(Te,{$isActive:n==="portrait",onClick:()=>!C&&y("portrait"),disabled:C,style:{opacity:C?.5:1},children:"▯ Portrait"})]})]}),s.jsxs("div",{onMouseEnter:()=>k("mode"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[s.jsxs(Ue,{$hasSubmenu:!0,children:[s.jsx(Ge,{children:"🎮 View Mode"}),s.jsx(nr,{children:"▶"})]}),s.jsxs(or,{$isOpen:g==="mode",children:[a.includes("chess-only")&&s.jsx(Te,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&s.jsx(Te,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&s.jsx(Te,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),children:"▤ Chat Only"})]})]}),s.jsx(ln,{}),s.jsx(Ue,{onClick:v,children:s.jsx(Ge,{children:"⚙️ Settings"})}),s.jsx(ln,{}),s.jsx(Ue,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),h(!1)},children:s.jsx(Ge,{children:"📖 Documentation"})}),s.jsx(Ue,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),h(!1)},children:s.jsx(Ge,{children:"🐛 Report Issue"})})]})]})}),s.jsx(Ac,{children:s.jsxs(Dc,{children:[s.jsx(Nc,{children:"Mode:"}),s.jsxs(Oc,{children:[a.includes("chess-only")&&s.jsx(ir,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&s.jsx(ir,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&s.jsx(ir,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),title:"Chat Only",children:"▤"})]})]})}),s.jsx(Mo,{isOpen:c,onClose:()=>l(!1)})]})});zo.displayName="AppHeader";const Fc=m.img`
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
`,Bc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Wc={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"},Hc=m.div`
  width: 93%;
  height: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$size*.8}px;
  user-select: none;
  cursor: ${e=>e.$isDragging?"grabbing":"grab"};
  filter: ${e=>e.$isDragging?"drop-shadow(0 4px 8px rgba(0,0,0,0.3))":"none"};
`,Ae=K(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=De(),[i,a]=Z.useState(!1),d=Bc[e];if(!d)return null;const c=o.preferences.pieceSet,l=`/pieces/${c}/${d}.svg`;return Z.useEffect(()=>{a(!1)},[e,c]),i?s.jsx(Hc,{className:"chess-piece-fallback",$isDragging:r,$size:t,style:n,"data-settings":"pieces",children:Wc[e]||e}):s.jsx(Fc,{className:"chess-piece",src:l,alt:d,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces",onError:()=>a(!0)})});Ae.displayName="ChessPiece";const _c=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Uc=m.div`
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
`,Gc=m.button`
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
`,To=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const i=["Q","R","B","N"],a=d=>t==="white"?d:d.toLowerCase();return s.jsx(_c,{$isOpen:e,onClick:n,children:s.jsx(Uc,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:i.map(d=>s.jsx(Gc,{onClick:()=>r(d.toLowerCase()),children:s.jsx(Ae,{piece:a(d),size:50})},d))})})};To.displayName="PromotionDialog";const Yc=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Vc=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,qc=m.div`
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
`,dn=m.div`
  position: absolute;
  font-size: ${e=>Math.max(6,Math.min(14,e.$size*.15))}px;
  font-weight: 600;
  color: ${e=>e.$isLight?e.theme.colors.board.coordinateLight:e.theme.colors.board.coordinateDark};
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
`,Kc=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,Xc=m.div.attrs(e=>({style:{transform:`translate(
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
`,Ve=["a","b","c","d","e","f","g","h"],qe=["8","7","6","5","4","3","2","1"];function Qc(e,t){return(e+t)%2===0}function Jc(e,t,r){const n=r?Ve[7-e]:Ve[e],o=r?qe[7-t]:qe[t];return`${n}${o}`}function Zc(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,i)=>{let a=0;for(const d of o)if(d>="1"&&d<="8")a+=parseInt(d);else{const c=`${Ve[a]}${qe[i]}`;t.set(c,d),a++}}),t}const $r=K(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:i,highlightedSquares:a=new Set,lastMove:d,interactive:c=!0,onSizeCalculated:l,selectedCapturedPiece:u,onCapturedPieceSelect:h})=>{Ne();const g=De(),f=Ot(),b=p.useRef(null),[y,$]=p.useState(t||200),[x,v]=p.useState(null),[k,C]=p.useState(new Set),[S,L]=p.useState(null),[R,N]=p.useState([]),U=p.useRef(),[Q,w]=p.useState(null),[O,F]=p.useState(!1),I=p.useMemo(()=>Zc(e),[e]),H=p.useRef(new Map);p.useRef(0);const ee=p.useCallback((j,T)=>{const M=Ve.indexOf(j[0]),z=qe.indexOf(j[1]),P=T/8,E=r?(7-M)*P:M*P,_=r?(7-z)*P:z*P;return{x:E,y:_}},[r]),ce=p.useCallback((j,T,M)=>{const z=j.toLowerCase()==="p",P=M[1];return z&&(P==="8"||P==="1")},[]),Se=p.useCallback(j=>{j.preventDefault(),f.isPlaying&&f.clearPremove()},[f]);p.useEffect(()=>{if(t){$(t);return}const j=()=>{if(!b.current)return;const E=b.current.parentElement;if(!E)return;const{width:_,height:re}=E.getBoundingClientRect();b.current.getBoundingClientRect();const le=16,A=_-le,ie=re-le,X=Math.floor(Math.min(A,ie)),ue=Math.max(100,Math.floor(X/8)*8);ue!==y&&$(ue)},T=setTimeout(j,50);j();let M;const z=()=>{clearTimeout(M),M=setTimeout(j,100)};window.addEventListener("resize",z);let P=null;return b.current&&b.current.parentElement&&(P=new ResizeObserver(()=>{z()}),P.observe(b.current.parentElement)),()=>{window.removeEventListener("resize",z),clearTimeout(M),clearTimeout(T),P&&P.disconnect()}},[t,y]),p.useEffect(()=>{l&&y>0&&l(y)},[y,l]);const V=y/8,se=p.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(f.isPlaying){const j=f.currentGame,T=f.playingColor;if(j&&T){const M=T==="white"?j.white.time:j.black.time,z=g.preferences.disableAnimationsThreshold;if(M<z)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,f.isPlaying,f.currentGame,f.playingColor]),ae=p.useRef("");p.useEffect(()=>{if(N([]),!se||O||f.isProcessingServerUpdate){H.current=new Map(I);return}const j=H.current;if(d){const{from:T,to:M}=d,z=`${e}-${T}-${M}`;if(ae.current===z){H.current=new Map(I);return}const P=j.get(T),E=I.get(M);if(P&&E===P&&!I.has(T)){if(f.isPlaying&&f.currentGame){const _=f.gameRelation===1,re=f.playingColor,le=re==="white"&&f.currentGame.turn==="b"||re==="black"&&f.currentGame.turn==="w";if(_||le){H.current=new Map(I),ae.current=z;return}}ae.current=z,setTimeout(()=>{N([{piece:P,from:T,to:M,startTime:Date.now()}])},0)}}H.current=new Map(I)},[I,d,se,O,f.isProcessingServerUpdate,e,f]),p.useEffect(()=>{if(O){const j=setTimeout(()=>{F(!1)},50);return()=>clearTimeout(j)}},[e,O]),p.useEffect(()=>{if(R.length===0)return;const j=()=>{const T=Date.now(),M=g.preferences.animationDuration;N(z=>{const P=z.filter(E=>T-E.startTime<M);return P.length>0&&(U.current=requestAnimationFrame(j)),P})};return U.current=requestAnimationFrame(j),()=>{U.current&&cancelAnimationFrame(U.current)}},[R.length,g.preferences.animationDuration]),p.useEffect(()=>{if(u)try{const j=f.currentPosition;f.chessBoard.getFen()!==j&&f.chessBoard.loadFen(j);const M=f.chessBoard.getLegalMoves().filter(P=>P.from==="@"&&P.san.toLowerCase().startsWith(u.toLowerCase())),z=new Set(M.map(P=>P.to));C(z),v(null)}catch(j){console.error("Error getting drop moves:",j),C(new Set)}},[u,f]);const te=p.useCallback((j,T)=>{if(!c)return;const M=I.get(j);if(u){k.has(j)?(i?.(u,j),h?.(null),C(new Set)):(h?.(null),C(new Set));return}if(x)if(k.has(j)){const z=I.get(x);if(z&&ce(z,x,j)){const P=z===z.toUpperCase()?"white":"black";if(f.isPlaying){const E=g.preferences.autoPromotionPiece;f.isMyTurn?(F(!0),o?.(x,j,E)):f.setPremove(x,j,E)}else{const E=T?.currentTarget.getBoundingClientRect();w({from:x,to:j,color:P,position:E?{x:E.left+E.width/2,y:E.top+E.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else f.isPlaying&&!f.isMyTurn?f.setPremove(x,j):(F(!0),o?.(x,j));v(null),C(new Set)}else if(j===x)v(null),C(new Set);else if(M)if(v(j),g.preferences.showLegalMoves)try{const z=f.currentPosition;f.chessBoard.getFen()!==z&&f.chessBoard.loadFen(z);const P=f.chessBoard.getLegalMoves(j),E=new Set(P.map(_=>_.to));C(E)}catch(z){console.error("Error getting legal moves:",z),C(new Set)}else C(new Set);else v(null),C(new Set);else if(M){v(j);try{const z=f.currentPosition;f.chessBoard.getFen()!==z&&f.chessBoard.loadFen(z);const P=M===M.toUpperCase(),E=f.chessBoard.getActiveColor();if(P&&E==="w"||!P&&E==="b")if(g.preferences.showLegalMoves){const re=f.chessBoard.getLegalMoves(j),le=new Set(re.map(A=>A.to));C(le)}else C(new Set);else C(new Set),v(null)}catch(z){console.error("Error getting legal moves:",z),C(new Set)}}},[x,k,I,o,i,c,ce,f,g.preferences.autoPromotionPiece,u,h]),me=p.useCallback((j,T,M)=>{if(!c)return;const z=j.clientX,P=j.clientY;let E=!1,_=!1;const le=j.currentTarget.getBoundingClientRect().width,A=X=>{const ue=Math.abs(X.clientX-z),rt=Math.abs(X.clientY-P);(ue>3||rt>3)&&M&&!_?(E=!0,_=!0,de(T,M,X,le)):_&&L(ze=>ze?{...ze,x:X.clientX,y:X.clientY}:null)},ie=X=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",ie),_?Ce(X,T,M):E?(L(null),v(null),C(new Set)):te(T,j)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",ie)},[c,te]),de=p.useCallback((j,T,M,z)=>{if(v(j),g.preferences.showLegalMoves)try{const E=f.currentPosition;f.chessBoard.getFen()!==E&&f.chessBoard.loadFen(E);const _=T===T.toUpperCase(),re=f.chessBoard.getActiveColor();if(_&&re==="w"||!_&&re==="b"){const A=f.chessBoard.getLegalMoves(j),ie=new Set(A.map(X=>X.to));C(ie)}else C(new Set)}catch(E){console.error("Error getting legal moves for drag:",E),C(new Set)}else C(new Set);const P={piece:T,from:j,x:M.clientX,y:M.clientY,size:z};L(P)},[g.preferences.showLegalMoves,f]),Ce=p.useCallback((j,T,M)=>{try{const E=document.elementsFromPoint(j.clientX,j.clientY).find(_=>_.getAttribute("data-square"))?.getAttribute("data-square");if(E&&E!==T)if(ce(M,T,E)){const _=M===M.toUpperCase()?"white":"black";if(f.isPlaying){const re=g.preferences.autoPromotionPiece;f.isMyTurn?(F(!0),o?.(T,E,re)):f.setPremove(T,E,re)}else w({from:T,to:E,color:_,position:{x:j.clientX,y:j.clientY}})}else f.isPlaying&&!f.isMyTurn?f.setPremove(T,E):(F(!0),o?.(T,E))}catch(z){console.error("Error in handleDragEnd:",z)}L(null),v(null),C(new Set)},[o,ce,f,g.preferences.autoPromotionPiece]),fe=p.useMemo(()=>{const j=[];for(let T=0;T<8;T++)for(let M=0;M<8;M++){const z=Qc(M,T),P=Jc(M,T,r),E=I.get(P),_=a.has(P),re=d&&(d.from===P||d.to===P),le=x===P,A=k.has(P),ie=S?.from===P;R.some(ze=>ze.to===P);const X=R.some(ze=>ze.from===P),ue=n&&T===7,rt=n&&M===0;j.push(s.jsxs(qc,{"data-square":P,$isLight:z,$isHighlighted:_,$isLastMoveSquare:!!re,$isSelected:le,$isPossibleMove:A,onMouseDown:ze=>me(ze,P,E),children:[E&&!ie&&!X&&s.jsx(Ae,{piece:E,size:V},`${E}-${V}`),ue&&s.jsx(dn,{$type:"file",$isLight:z,$size:V,"data-settings":"coordinates",className:"coordinate-label",children:r?Ve[7-M]:Ve[M]}),rt&&s.jsx(dn,{$type:"rank",$isLight:z,$size:V,"data-settings":"coordinates",className:"coordinate-label",children:r?qe[7-T]:qe[T]})]},P))}return j},[r,n,I,a,d,x,k,S,V,te,me]);return s.jsxs(s.Fragment,{children:[s.jsxs(Yc,{ref:b,$size:y,onContextMenu:Se,"data-settings":"board",className:"chess-board",children:[s.jsx(Vc,{children:fe}),R.map((j,T)=>{const M=ee(j.from,y),z=ee(j.to,y),P=Date.now()-j.startTime,E=g.preferences.animationDuration,_=Math.min(P/E,1),le=(A=>A<.5?4*A*A*A:1-Math.pow(-2*A+2,3)/2)(_);return s.jsx(Xc,{$fromX:M.x,$fromY:M.y,$toX:z.x,$toY:z.y,$progress:le,$size:V,children:s.jsx(Ae,{piece:j.piece,size:V},`${j.piece}-${V}`)},`${j.from}-${j.to}-${j.startTime}`)})]}),S&&s.jsx(s.Fragment,{children:s.jsx(Kc,{$x:S.x,$y:S.y,$size:S.size,children:s.jsx(Ae,{piece:S.piece,size:S.size,isDragging:!0},`${S.piece}-${S.size}-dragging`)})}),Q&&s.jsx(To,{isOpen:!0,color:Q.color,position:Q.position,onSelect:j=>{F(!0),o?.(Q.from,Q.to,j),w(null)},onCancel:()=>w(null)})]})});$r.displayName="ChessBoardWithPieces";const el=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,tl=m.span`
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
`,Lo=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:i=!1,className:a,compact:d=!1})=>{const c=u=>{const h=Math.floor(u/3600),g=Math.floor(u%3600/60),f=Math.floor(u%60),b=Math.floor(u%1*10),y=r&&Math.floor(u)%2===0?" ":":";return h>0?`${h}${y}${g.toString().padStart(2,"0")}${y}${f.toString().padStart(2,"0")}`:u<o&&i?`${g}${y}${f.toString().padStart(2,"0")}.${b}`:`${g}${y}${f.toString().padStart(2,"0")}`},l=e<=o&&e>0;return s.jsx(el,{size:t,className:a,children:s.jsx(tl,{$isLowTime:l,$isActive:r,$compact:d,$isFinished:n,children:c(e)})})},rl=m.span`
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
`,nl=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:i=!1,className:a})=>{const d=u=>{const h=Math.floor(u/3600),g=Math.floor(u%3600/60),f=Math.floor(u%60),b=Math.floor(u%1*10),y=r&&Math.floor(u)%2===0?" ":":";return h>0?`${h}${y}${g.toString().padStart(2,"0")}${y}${f.toString().padStart(2,"0")}`:u<o&&i?`${g}${y}${f.toString().padStart(2,"0")}.${b}`:`${g}${y}${f.toString().padStart(2,"0")}`},c=e<=o&&e>0,l=t==="large"?"48px":t==="medium"?"36px":"24px";return s.jsx(rl,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:l,children:d(e)})},xt=m(nl)`
    /* Additional GameClock-specific styles if needed */
`;m(Lo).attrs({size:"small"})`
    font-size: 12px;
`;m(Lo).attrs({size:"medium"})`
    font-size: 16px;
`;const ol=m.div`
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
`,il=m.button`
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
`,sl=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Io=K(({playerName:e,position:t,onClose:r})=>{const n=Mn(),o=De(),i=p.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];p.useEffect(()=>{const c=u=>{i.current&&!i.current.contains(u.target)&&r()},l=u=>{u.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[r]),p.useEffect(()=>{if(i.current){const c=i.current.getBoundingClientRect(),l=window.innerWidth,u=window.innerHeight;let h=t.x,g=t.y;c.right>l&&(h=l-c.width-10),c.bottom>u&&(g=u-c.height-10),(h!==t.x||g!==t.y)&&(i.current.style.left=`${h}px`,i.current.style.top=`${g}px`)}},[t]);const d=c=>{const l=e.replace(/\([^)]*\)/g,"").trim(),u=c.replace("{player}",l);n.sendCommand(u),r()};return s.jsx(ol,{ref:i,$x:t.x,$y:t.y,children:a.map((c,l)=>"divider"in c&&c.divider?s.jsx(sl,{},l):"command"in c?s.jsx(il,{onClick:()=>d(c.command),children:c.label},l):null)})});Io.displayName="PlayerContextMenu";const al=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Ao=({name:e,className:t,style:r,onClick:n})=>{const[o,i]=p.useState(null),a=d=>{d.preventDefault(),d.stopPropagation(),n&&n(),i({x:d.clientX,y:d.clientY})};return s.jsxs(s.Fragment,{children:[s.jsx(al,{className:t,style:r,onClick:a,children:e}),o&&s.jsx(Io,{playerName:e,position:o,onClose:()=>i(null)})]})};Ao.displayName="PlayerName";const cl=m.div`
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
`,ll=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,dl=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,ul=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,hl=m.div`
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
`;const it=K(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:i="horizontal",hideClockInCard:a=!1,onlyInfo:d=!1,compact:c=!1})=>{const l=s.jsxs(s.Fragment,{children:[s.jsx(ll,{children:s.jsxs(dl,{children:[s.jsx(ul,{children:s.jsx(Ao,{name:e})}),s.jsx(hl,{children:t})]})}),!a&&!d&&s.jsx(xt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:i==="horizontal"?"medium":"small"})]});return d?l:s.jsx(cl,{$isActive:n,$orientation:i,$compact:c,children:l})});it.displayName="PlayerCard";const pl=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,sr=m.div`
  padding: ${e=>e.theme.spacing[1]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[2]};
`,ar=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,ge=m.button`
  width: 18px;
  height: 18px;
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
`,ml=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,un=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,fl=m.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,hn=m.span`
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
`,qt=K(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:i,className:a,disableAutoScroll:d=!1})=>{const c=p.useRef(null);p.useEffect(()=>{if(!d&&c.current&&t!==void 0){const u=c.current.querySelector(`[data-move-index="${t}"]`);u&&u.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const l=()=>{const u=[];for(let h=0;h<e.length;h+=2){const g=Math.floor(h/2)+1,f=e[h],b=e[h+1];u.push(s.jsxs(un,{children:[s.jsxs(fl,{children:[g,"."]}),s.jsx(hn,{$isCurrentMove:t===h,onClick:()=>r?.(h),"data-move-index":h,children:cr(f.san)}),b&&s.jsx(hn,{$isCurrentMove:t===h+1,onClick:()=>r?.(h+1),"data-move-index":h+1,children:cr(b.san)})]},h))}return u};return s.jsxs(pl,{className:a,children:[o?s.jsx(sr,{children:s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("span",{children:"Moves"}),s.jsxs(ar,{children:[s.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),s.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),s.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):i?s.jsxs(sr,{children:[i,s.jsxs(ar,{children:[s.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),s.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),s.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):s.jsx(sr,{children:s.jsxs(ar,{children:[s.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),s.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),s.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),s.jsx(ml,{ref:c,children:e.length===0?s.jsx(un,{children:s.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});qt.displayName="MoveList";const gl=m(xt)`
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
`,xl=m(xt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,st=K(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const i=Ot(),a=o==="landscape"?xl:gl;return s.jsx(a,{time:e.time,isActive:t,isFinished:i.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});st.displayName="ObservableClock";const yl=m.div`
  position: relative;
  display: inline-block;
`,bl=m.button`
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
`,$l=m.div`
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
`,vl=m.button`
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
`,Ar=K(({color:e,size:t="small"})=>{const r=De(),[n,o]=p.useState(!1),i=p.useRef(null),a=["Q","R","B","N"],d=r.preferences.autoPromotionPiece,c=h=>e==="white"?h:h.toLowerCase();p.useEffect(()=>{const h=g=>{i.current&&!i.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[n]);const l=h=>{r.updatePreference("autoPromotionPiece",h),o(!1)},u=t==="small"?28:36;return s.jsxs(yl,{ref:i,children:[s.jsx(bl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:s.jsx(Ae,{piece:c(d),size:u})}),s.jsx($l,{$isOpen:n,children:a.map(h=>s.jsx(vl,{$size:t,onClick:()=>l(h),title:`Promote to ${h==="Q"?"Queen":h==="R"?"Rook":h==="B"?"Bishop":"Knight"}`,children:s.jsx(Ae,{piece:c(h),size:u})},h))})]})});Ar.displayName="PromotionPieceSelector";const wl=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,he=m.button`
  padding: 2px ${e=>e.theme.spacing[1]};
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
`,Do=K(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:i,onUnexamine:a,onSetupFEN:d,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:u,canAbort:h,className:g})=>{const f=Ot(),b=()=>s.jsxs(s.Fragment,{children:[h&&s.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),s.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),f.currentGame&&f.currentGame.moveNumber>=2&&s.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),s.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),s.jsx(Ar,{color:f.playingColor||"white",size:"medium"})]}),y=()=>s.jsxs(s.Fragment,{children:[s.jsx(he,{onClick:i,$variant:"secondary",children:"Unobserve"}),s.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>s.jsxs(s.Fragment,{children:[s.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),s.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>s.jsxs(s.Fragment,{children:[s.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),s.jsx(he,{onClick:d,$variant:"secondary",children:"FEN"})]});return s.jsxs(wl,{className:g,children:[e==="playing"&&b(),e==="observing"&&y(),e==="examining"&&$(),e==="freestyle"&&x()]})}),be=m(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Do.displayName="GameControls";const pn=m.div`
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
`,mn=m.div`
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
`,kl=m.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: ${e=>e.theme.typography.fontSize.xs};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.$needsDarkText?"#2C3E50":"#E8E8E8"};
  z-index: 3;
  text-shadow: ${e=>e.$needsDarkText?"0 1px 3px rgba(255,255,255,0.9), 0 0 1px rgba(255,255,255,0.7)":"0 1px 3px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,0.7)"};
`,fn=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,vt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,gn=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,No=K(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const i=Ft().isBottomPlayerWinning;let a,d,c;if(t===50)a=47,d=6,c=47;else if(t>50){const u=t-50;a=50-u,d=u,c=50}else{const u=50-t;a=50,d=u,c=50-u}const l=t===50?"#FFC107":i?"#2E7D32":"#C62828";if(r==="vertical"){const u=t<20;return s.jsxs(pn,{$orientation:r,className:n,children:[s.jsx(mn,{$orientation:r,children:e}),s.jsx(kl,{$needsDarkText:u,children:e}),s.jsxs(fn,{$orientation:r,children:[s.jsx(vt,{style:{height:`${a}%`}}),s.jsx(gn,{$color:l,style:{height:`${d}%`}}),s.jsx(vt,{style:{height:`${c}%`}})]})]})}else return s.jsxs(pn,{$orientation:r,className:n,children:[s.jsx(mn,{$orientation:r,children:e}),s.jsxs(fn,{$orientation:r,children:[s.jsx(vt,{style:{width:`${c}%`}}),s.jsx(gn,{$color:l,style:{width:`${d}%`}}),s.jsx(vt,{style:{width:`${a}%`}})]})]})});No.displayName="EvaluationBar";const Sl=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,Cl=m.div`
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
`,vr=K(({orientation:e="vertical",boardSize:t})=>{const r=Ft();return s.jsx(Sl,{$orientation:e,$boardSize:t,children:s.jsx(No,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),wr=K(({className:e})=>{const t=Ft();return s.jsxs(Cl,{className:e,children:[s.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),s.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});vr.displayName="AnalysisDisplay";wr.displayName="AnalysisInfoDisplay";const jl=m.div`
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
`,Pl=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Rl=m.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Oo=m.input`
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
`,El=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Ml=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,zl=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,xn=m.button`
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
`,Tl=m.button`
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
`,yn=m.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,bn=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Ll=m(Oo)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Fo=K(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=p.useState(""),[i,a]=p.useState(""),d=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=p.useCallback(f=>{o(f.target.value),a("")},[]),l=p.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),u=p.useCallback(f=>{const b=typeof f=="function"?f():f;o(b),a("");try{r.loadPosition(b)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),h=p.useCallback(f=>{f.key==="Enter"&&n.trim()?l():f.key==="Escape"&&t()},[n,l,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>Qo.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?s.jsx(jl,{$isOpen:e,onClick:t,children:s.jsxs(Pl,{onClick:f=>f.stopPropagation(),children:[s.jsx(Rl,{children:"Set Position from FEN"}),s.jsx(Ml,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),s.jsxs(yn,{children:[s.jsx(bn,{children:"Current position:"}),s.jsx(Ll,{type:"text",value:d,readOnly:!0,onClick:f=>f.currentTarget.select()})]}),s.jsxs(yn,{children:[s.jsx(bn,{children:"Preset position:"}),g.map(f=>s.jsx(Tl,{onClick:()=>u(f.fen),children:f.name},f.name))]}),s.jsx(Oo,{type:"text",value:n,onChange:c,onKeyDown:h,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),i&&s.jsx(El,{children:i}),s.jsxs(zl,{children:[s.jsx(xn,{onClick:t,children:"Cancel"}),s.jsx(xn,{$variant:"primary",onClick:l,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Fo.displayName="FENDialog";const Il=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Al=m.div`
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
`,Dl=m.div`
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
`,Nl=m.div`
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
`,Ol=m(Ae)`
  width: 100%;
  height: 100%;
`,at=K(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:i}=Ee(),a=p.useMemo(()=>{if(i.currentGame?.variant==="crazyhouse")return(t?i.whiteHoldings:i.blackHoldings).toLowerCase().split("");{const h=i.capturedPieces;return t?h.white:h.black}},[i.currentGame?.variant,i.whiteHoldings,i.blackHoldings,i.capturedPieces,t]),d=p.useMemo(()=>{const u={};return a.forEach(h=>{u[h]=(u[h]||0)+1}),u},[a]),c=["p","n","b","r","q"],l=n?n/8:32;return s.jsx(Il,{$orientation:e,$size:l,className:r,children:s.jsx(Al,{$orientation:e,children:c.map(u=>{const h=d[u]||0,g=t?u.toUpperCase():u;return s.jsx(Dl,{$size:l,onClick:h>0&&o?()=>o(g):void 0,style:{cursor:h>0&&o?"pointer":"default"},children:h>0&&s.jsxs(s.Fragment,{children:[s.jsx(Ol,{piece:g,size:l}),h>1&&s.jsx(Nl,{children:h})]})},u)})})})});at.displayName="CapturedPieces";const Fl=m.div`
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
`,Bl=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Wl=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Hl=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,_l=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,$n=m.button`
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
`,Ul=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:i,onCancel:a})=>s.jsx(Fl,{$isOpen:e,onClick:a,children:s.jsxs(Bl,{onClick:d=>d.stopPropagation(),children:[s.jsx(Wl,{children:t}),s.jsx(Hl,{children:r}),s.jsxs(_l,{children:[s.jsx($n,{$variant:"secondary",onClick:a,children:o}),s.jsx($n,{$variant:"primary",onClick:i,children:n})]})]})}),Gl=m.div`
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
`,vn=m.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${e=>e.theme.spacing[2]};
    flex: ${e=>e.$orientation==="portrait"?"0 0 auto":"1"};
    width: 100%;
    height: ${e=>e.$orientation==="portrait"?"auto":"100%"};
    justify-content: ${e=>e.$orientation==="portrait"?"flex-start":"center"};
    ${e=>e.$orientation==="portrait"&&`
    padding-top: 0;
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
`;const Yl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Vl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,ql=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Kl=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Bo=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Wo=m.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Xl=m(Bo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Ql=m(Wo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Jl=m(Bo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,Zl=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,ed=m(Wo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,wn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,kn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Sn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Cn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,jn=m.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${e=>e.$orientation==="portrait"?`
    width: min(100vw - 32px, calc(100vh - 260px));
    height: min(100vw - 32px, calc(100vh - 260px));
    max-width: 600px;
    max-height: 600px;
  `:`
    /* Landscape calculations:
     * Width: viewport width - chat width - player controls (200px) - analysis column (30px always) - padding (20px)
     * Height: viewport height - header (~48px) - top/bottom info (~80px) - padding (20px)
     */
    width: min(calc(100vh - 100px), calc(100vw - ${e.$chatWidth||0}px - 200px - 30px - 20px));
    height: min(calc(100vh - 100px), calc(100vw - ${e.$chatWidth||0}px - 200px - 30px - 20px));
    max-width: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
  `}
`,td=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,rd=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,nd=m.div`
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
`;const od=m.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    flex: ${e=>(e.$orientation==="landscape","0 0 auto")};
    min-width: ${e=>e.$orientation==="landscape"?"200px":"auto"};
    max-width: ${e=>e.$orientation==="landscape"?"320px":"none"};
    overflow: ${e=>e.$orientation==="portrait"?"visible":"hidden"};
    ${e=>e.$orientation==="portrait"&&`
    width: ${e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin: 0 auto;
    padding-bottom: ${e.theme.spacing[2]};
  `}
`,id=m.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,sd=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[3]};
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    width: 100%;
    position: relative;
    overflow: hidden;
    min-width: 0;
    
    /* Keep board and players together */
    & > * {
        flex-shrink: 0;
    }
`;m.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
`;const ad=m.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,cd=m.div`
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
`;const Pn=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;m(qt)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const ld=m(qt)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;m(xt)`
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
`;const Rn=m.div`
    flex: 1;
    display: flex;
`;m(xt)`
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
`;const dd=m.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,ud=m.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,hd=m.div`
    position: relative;
    margin-top: 18px;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"100%"};
    display: flex;
    align-items: center;
`;m.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    padding: ${e=>e.theme.spacing[2]};
    align-items: center;
`;m.div`
    min-height: 28px;
`;const pd=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,md=m.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,Ho=K(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=Ot(),o=De(),i=Ft(),a=Mn(),d=Jo();Ne();const[c,l]=p.useState(!1),[u,h]=p.useState(!1),[g,f]=p.useState(0),[b,y]=p.useState(!1),[$,x]=p.useState(!1),[v,k]=p.useState(null),C=o.preferences.chessOrientation==="landscape",S=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",R=window.innerWidth/window.innerHeight>1.6,N=p.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),U=p.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),Q=p.useCallback((A,ie,X)=>{try{n.makeMove(A,ie,X)||(console.error("Invalid move:",A,ie),d.playIllegal())}catch(ue){console.error("Error making move:",ue),d.playIllegal()}},[n,d]),w=p.useCallback((A,ie)=>{try{const X=A.toLowerCase();n.makeSANMove(`${A.toUpperCase()}@${ie}`)||(console.error("Invalid drop:",A,ie),d.playIllegal())}catch(X){console.error("Error making drop:",X),d.playIllegal()}},[n,d]),O=p.useCallback(A=>{k(v===A?null:A)},[v]);p.useMemo(()=>{if(n.currentGameInfo){const{white:A,black:ie,timeControl:X,variant:ue}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ue} ${X}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const F=(()=>{const A=n.moveHistory.length;if(A>0){const ie=n.moveHistory[A-1],X=Math.ceil(A/2),ue=A%2===1,rt=cr(ie.san);return`${X}.${ue?"":".."} ${rt}`}return"Starting position"})(),I=n.currentOpening,H=n.currentGame,ee=H||n.lastGameState,ce=ee?.white||{name:"White",rating:1500,time:900},Se=ee?.black||{name:"Black",rating:1500,time:900},V=!H||H.turn==="w",se=n.shouldShowFlippedBoard,ae=se?ce:Se,te=se?Se:ce,me=se,de=se?V:!V,Ce=p.useCallback(A=>{n.goToMove(A)},[n]);p.useEffect(()=>{i.initialize()},[i]),p.useEffect(()=>{$&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,$,n.isPlaying,a]),p.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),p.useEffect(()=>{c&&i.isEngineReady?i.startAnalysis(S):i.stopAnalysis()},[c,S,i]);const fe=p.useCallback(()=>{l(A=>!A)},[]),j=p.useCallback(()=>{h(!0)},[]),T=p.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),M=p.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),z=p.useCallback(()=>{a.sendCommand("unexamine")},[a]),P=p.useCallback(()=>{y(!0)},[]),E=p.useCallback(()=>{a.sendCommand("resign"),y(!1)},[a]),_=p.useCallback(()=>{a.sendCommand("draw"),x(!$)},[a,$]),re=p.useCallback(()=>{a.sendCommand("abort")},[a]),le=()=>s.jsxs(s.Fragment,{children:[s.jsx(vn,{$orientation:"portrait",children:s.jsx(td,{children:s.jsxs(rd,{children:[c&&s.jsx(md,{$boardSize:g,children:s.jsx(vr,{orientation:"vertical",boardSize:g})}),s.jsx(nd,{children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[s.jsxs(Jl,{children:[s.jsxs(wn,{children:["Game #",ee?.gameId||"?"]}),s.jsx(kn,{children:ee?.timeControl||"?"}),s.jsxs(Zl,{children:[N==="playing"&&s.jsxs(s.Fragment,{children:[n.moveHistory.length<=1&&s.jsx(be,{onClick:re,$variant:"secondary",children:"Abort"}),s.jsx(be,{onClick:_,$variant:"secondary",children:"Draw"}),s.jsx(be,{onClick:P,$variant:"secondary",children:"Resign"}),s.jsx(Ar,{color:n.playingColor||"white",size:"small"})]}),N==="observing"&&s.jsxs(s.Fragment,{children:[s.jsx(be,{onClick:M,$variant:"secondary",children:"Unobserve"}),s.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),N==="examining"&&s.jsxs(s.Fragment,{children:[s.jsx(be,{onClick:z,$variant:"secondary",children:"Unexamine"}),s.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),N==="freestyle"&&s.jsxs(s.Fragment,{children:[s.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"}),s.jsx(be,{onClick:T,$variant:"secondary",children:"Flip"}),s.jsx(be,{onClick:j,$variant:"secondary",children:"FEN"})]})]})]}),s.jsxs(Pn,{children:[s.jsx(st,{player:ae,isActive:de,size:"small",compact:!0}),s.jsx(Rn,{children:s.jsx(it,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsx(jn,{$orientation:"portrait",children:s.jsx($r,{position:S,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:Q,onDrop:w,interactive:N==="playing"||N==="freestyle"||N==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:v,onCapturedPieceSelect:k})}),s.jsxs(Pn,{children:[s.jsx(st,{player:te,isActive:!de,size:"small",compact:!0}),s.jsx(Rn,{children:s.jsx(it,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsxs(ed,{children:[s.jsx(Sn,{children:n.premove?`Premove: ${Dr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,S)}`:F!=="Starting position"?`Last move: ${F}`:"Last move: none"}),I&&s.jsx(Cn,{children:I})]}),c&&s.jsx(pd,{children:s.jsx(wr,{})})]})}),U&&s.jsx(ql,{$squareSize:g?g/8:0,children:s.jsxs(Kl,{$squareSize:g?g/8:0,children:[s.jsx(at,{orientation:"vertical",isWhitePieces:se,boardSize:g,onPieceClick:O}),s.jsx(at,{orientation:"vertical",isWhitePieces:!se,boardSize:g,onPieceClick:O})]})})]})})}),s.jsx(od,{$orientation:"portrait",$boardSize:g,children:s.jsx(qt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,disableAutoScroll:!0,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return s.jsxs(Gl,{className:e,$orientation:C?"landscape":"portrait",$hasChat:t,children:[C?s.jsx(s.Fragment,{children:s.jsx(vn,{$orientation:"landscape",children:s.jsxs(id,{children:[s.jsx(ud,{children:c&&s.jsx(hd,{$boardSize:g,children:s.jsx(vr,{orientation:"vertical",boardSize:g})})}),s.jsxs(sd,{$hasAnalysis:c,children:[s.jsxs(Yl,{$isWideAspect:R,children:[s.jsxs(Xl,{$chatWidth:r,$hasAnalysis:c,children:[s.jsxs(wn,{children:["Game #",ee?.gameId||"?"]}),s.jsx(kn,{children:ee?.timeControl||"?"})]}),s.jsx(Vl,{$orientation:"landscape",children:s.jsx(jn,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:s.jsx($r,{position:S,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:Q,onDrop:w,interactive:N==="playing"||N==="freestyle"||N==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:v,onCapturedPieceSelect:k})})}),s.jsxs(Ql,{$chatWidth:r,$hasAnalysis:c,children:[s.jsx(Sn,{children:n.premove?`Premove: ${Dr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,S)}`:F!=="Starting position"?`Last move: ${F}`:"Last move: none"}),I&&s.jsx(Cn,{children:I})]}),c&&s.jsx(dd,{$chatWidth:r,$hasAnalysis:c,children:s.jsx(wr,{})})]}),s.jsxs(ad,{$isWideAspect:R,$boardSize:g,children:[U&&s.jsx(at,{orientation:"horizontal",isWhitePieces:me,boardSize:g,onPieceClick:O}),s.jsx(st,{player:ae,isActive:de,size:"small",compact:!0,variant:"landscape"}),s.jsxs(cd,{children:[s.jsx(it,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"vertical",hideClockInCard:!0,compact:!0}),s.jsx(Do,{perspective:N,canAbort:n.moveHistory.length<=1,onAnalysis:fe,onFlipBoard:T,onSetupFEN:j,onUnobserve:M,onUnexamine:z,onResign:P,onDraw:_,onAbort:re,isAnalysisActive:c,isDrawOffered:$}),s.jsx(ld,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,showHeader:!1,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),s.jsx(it,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),s.jsx(st,{player:te,isActive:!de,size:"small",compact:!0,variant:"landscape"}),U&&s.jsx(at,{orientation:"horizontal",isWhitePieces:!me,boardSize:g,onPieceClick:O})]})]})]})})}):le(),s.jsx(Fo,{isOpen:u,onClose:()=>h(!1)}),s.jsx(Ul,{isOpen:b,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:E,onCancel:()=>y(!1)})]})});Ho.displayName="ChessGameLayout";const fd=m.div`
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
`,gd=m.div`
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
`,xd=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,yd=m.span`
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
`,bd=m.button`
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
`,$d=m.span`
  font-size: 12px;
  opacity: 0.7;
`,_o=K(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=Z.useState(null),[o,i]=Z.useState(null),a=(h,g)=>{n(g),h.dataTransfer.effectAllowed="move"},d=(h,g)=>{h.preventDefault(),h.dataTransfer.dropEffect="move",i(g)},c=()=>{i(null)},l=(h,g)=>{h.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),i(null)},u=()=>{n(null),i(null)};return s.jsx(fd,{children:t.map(h=>s.jsxs(gd,{$active:h.id===e.activeTabId,$hasUnread:h.unreadCount>0,$dragging:h.id===r,$dragOver:h.id===o,draggable:!0,onDragStart:g=>a(g,h.id),onDragOver:g=>d(g,h.id),onDragLeave:c,onDrop:g=>l(g,h.id),onDragEnd:u,onClick:()=>e.setActiveTab(h.id),children:[h.type!=="console"&&s.jsx($d,{$type:h.type}),s.jsx(xd,{children:h.type==="channel"?`(${h.name})`:h.name}),h.unreadCount>0&&s.jsx(yd,{children:h.unreadCount>99?"99+":h.unreadCount}),h.id!=="console"&&s.jsx(bd,{onClick:g=>{g.stopPropagation(),e.closeTab(h.id)},title:"Close tab",children:"×"})]},h.id))})});_o.displayName="ChatTabs";function vd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function wd(e){e.scrollTop=e.scrollHeight}function kd(e,t=10){vd(e,t)&&wd(e)}class Uo{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class W{constructor(){this.renderers=new Map}register(t){this.renderers.set(t.type,t)}clear(){this.renderers.clear()}getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}getAllRenderers(){return Array.from(this.renderers.values())}static{this.instance=new W}static register(t){this.instance.register(t)}static getRenderer(t){return this.instance.getRenderer(t)}static getAllRenderers(){return this.instance.getAllRenderers()}static clear(){this.instance.clear()}}const Sd=m.pre`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${e=>e.$fontSize}px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${e=>e.theme.colors.text};
`,wt=m.a`
  color: ${e=>e.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: ${e=>e.theme.colors.primaryHover};
  }
`,Go=K(({content:e,ansiColors:t=!0})=>{const{ficsStore:r,preferencesStore:n}=Ee(),o=n.getChatAppearance(),i=c=>{if(!t)return c;const l={30:"#000000",31:"#CC0000",32:"#4E9A06",33:"#C4A000",34:"#3465A4",35:"#75507B",36:"#06989A",37:"#D3D7CF",90:"#555753",91:"#EF2929",92:"#8AE234",93:"#FCE94F",94:"#729FCF",95:"#AD7FA8",96:"#34E2E2",97:"#EEEEEC"};return c.replace(/\x1b\[(\d+)m/g,(u,h)=>{const g=l[h];return g?`<span style="color: ${g}">`:h==="0"?"</span>":""})},a=c=>{const l=[];if(c.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:|^\s*\w+(?:\([^)]*\))*\((\d+)\):/m)){const h=/(https?:\/\/[^\s]+)\s*$/gm;let g;for(;(g=h.exec(c))!==null;){const f=g[1],b=g.index,y=g.index+g[0].length,$=c.substring(y).match(/^\n\s+([^\s]+)/);if($&&$[1].match(/[.\/\-?=&]/)){const x=f+$[1],v=y+$[0].length;l.push({start:b,end:v,url:x})}}}return l},d=c=>{const l=i(c),u=a(c),h=[{regex:/(https?:\/\/[^\s]+)/g,handler:(x,v)=>{const k=x[0],C=v||k;return s.jsx(wt,{href:C,target:"_blank",rel:"noopener noreferrer",onClick:S=>{S.preventDefault(),window.open(C,"_blank")},children:k})}},{regex:/^(\w+) tells you:/gm,handler:x=>{const v=x[1];return s.jsxs("span",{children:[s.jsx(wt,{onClick:k=>{k.preventDefault(),r.sendCommand(`finger ${v}`)},children:v}),x[0].substring(v.length)]},`player-${v}`)}},{regex:/\bGame (\d+)\b/g,handler:x=>s.jsx(wt,{onClick:v=>{v.preventDefault(),r.sendCommand(`observe ${x[1]}`)},children:x[0]})}];if(t&&l!==c)return s.jsx("span",{dangerouslySetInnerHTML:{__html:l}});let g=0;const f=[],b=[],y=[];return u.forEach(x=>{const v=c.substring(x.start).match(/^(https?:\/\/[^\s]+)/);if(v){const k=v[1];y.push({start:x.start,end:x.start+k.length,render:s.jsx(wt,{href:x.url,target:"_blank",rel:"noopener noreferrer",onClick:C=>{C.preventDefault(),window.open(x.url,"_blank")},children:k}),priority:10}),b.push([x.start,x.end])}}),h.forEach(x=>{const v=new RegExp(x.regex);let k;for(;(k=v.exec(c))!==null;){const C=k.index,S=C+k[0].length;b.some(([R,N])=>C>=R&&C<N||S>R&&S<=N)||y.push({start:C,end:S,render:x.handler(k),priority:1})}}),y.sort((x,v)=>x.start!==v.start?x.start-v.start:v.priority-x.priority),y.filter((x,v)=>{if(v===0)return!0;const k=y[v-1];return x.start>=k.end}).forEach((x,v)=>{x.start>g&&f.push(c.substring(g,x.start)),f.push(s.jsx(Z.Fragment,{children:x.render},v)),g=x.end}),g<c.length&&f.push(c.substring(g)),f.length>0?f:c};return s.jsx(Sd,{$fontSize:o.fontSize,children:d(e)})}),Cd=m.div`
  margin: 0;
`;class jd extends Uo{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t}){return s.jsx(Cd,{children:s.jsx(Go,{content:t.content})})}}class Y extends Uo{render({message:t}){return s.jsx(Go,{content:t.content})}}class Pd extends Y{constructor(){super(...arguments),this.type="shout"}}class Rd extends Y{constructor(){super(...arguments),this.type="cshout"}}class Ed extends Y{constructor(){super(...arguments),this.type="notification"}}class Md extends Y{constructor(){super(...arguments),this.type="seekAnnouncement"}}class zd extends Y{constructor(){super(...arguments),this.type="matchRequest"}}class Td extends Y{constructor(){super(...arguments),this.type="illegalMove"}}class Ld extends Y{constructor(){super(...arguments),this.type="drawOffer"}}class Id extends Y{constructor(){super(...arguments),this.type="unobserve"}}class Ad extends Y{constructor(){super(...arguments),this.type="gameNotification"}}class Dd extends Y{constructor(){super(...arguments),this.type="whoOutput"}}class Nd extends Y{constructor(){super(...arguments),this.type="gamesOutput"}}class Od extends Y{constructor(){super(...arguments),this.type="fingerOutput"}}class Fd extends Y{constructor(){super(...arguments),this.type="historyOutput"}}class Bd extends Y{constructor(){super(...arguments),this.type="journalOutput"}}class Wd extends Y{constructor(){super(...arguments),this.type="soughtOutput"}}class Hd extends Y{constructor(){super(...arguments),this.type="channelListOutput"}}class _d extends Y{constructor(){super(...arguments),this.type="newsOutput"}}class Ud extends Y{constructor(){super(...arguments),this.type="inOutput"}}class Gd extends Y{constructor(){super(...arguments),this.type="login"}}class Yd extends Y{constructor(){super(...arguments),this.type="password"}}class Vd extends Y{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class qd extends Y{constructor(){super(...arguments),this.type="sessionStart"}}class Kd extends Y{constructor(){super(...arguments),this.type="system"}}class Xd extends Y{constructor(){super(...arguments),this.type="raw"}}function Qd(){W.clear(),W.register(new Pd),W.register(new Rd),W.register(new Ed),W.register(new Md),W.register(new zd),W.register(new Td),W.register(new Ld),W.register(new Id),W.register(new Ad),W.register(new Dd),W.register(new Nd),W.register(new Od),W.register(new Fd),W.register(new Bd),W.register(new Wd),W.register(new Hd),W.register(new _d),W.register(new Ud),W.register(new Gd),W.register(new Yd),W.register(new Vd),W.register(new qd),W.register(new Kd),W.register(new Xd),W.register(new jd)}Qd();const ct=K(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=Ee(),i=e.metadata?.consoleType,a=e.metadata?.channelNumber,d=i?o.getConsoleColor(i,a):null,c=i?o.getConsoleFont(i,a):null,l=i?o.getConsoleFontStyle(i,a):null,u={...e,metadata:{...e.metadata,color:d,fontFamily:c,fontStyle:l}},h=W.getRenderer(u);return h?s.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:h.render({message:u,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),s.jsx("div",{children:e.content}))});ct.displayName="Message";const kt=m.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,St=m.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${e=>e.theme.spacing[3]};
  min-height: 0;
  
  /* Enable momentum scrolling on iOS */
  -webkit-overflow-scrolling: touch;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${e=>e.theme.colors.border} transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      width: 4px;
    }
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
  
  @media (max-width: 768px) {
    padding-bottom: calc(${e=>e.theme.spacing[3]} + 100px + env(safe-area-inset-bottom, 8px));
  }
`,Jd=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  min-width: 0;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
`,En=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,Zd=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Ct=m.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Yo=K(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),o=p.useRef(null),i=t.activeTab,a=i?.messages||[],d=r.username||"You",c=u=>{r.sendCommand(u)};if(p.useEffect(()=>{if(o.current&&a.length>0){const u=o.current,h=setTimeout(()=>{i?.type==="console"?u.scrollTop=u.scrollHeight:kd(u,50)},50);return()=>clearTimeout(h)}},[a.length,a[a.length-1]?.id]),p.useEffect(()=>{if(o.current&&a.length>0){const u=o.current;requestAnimationFrame(()=>{u.scrollTop=u.scrollHeight})}},[i?.id]),!i)return s.jsx(kt,{children:s.jsx(St,{className:"chat-messages-container",children:s.jsx(En,{children:"No active chat"})})});if(a.length===0)return s.jsx(kt,{children:s.jsx(St,{className:"chat-messages-container",children:s.jsx(En,{children:i.type==="channel"?`No messages in (${i.name}) yet`:i.type==="private"?`No messages with ${i.name} yet`:"Connecting to freechess.org..."})})});const l=[];return a.forEach((u,h)=>{const g=h>0?a[h-1]:null,f=g?new Date(u.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===u.sender&&g.type===u.type&&f<6e4?l[l.length-1].messages.push(u):l.push({sender:u.sender,timestamp:new Date(u.timestamp),messages:[u]})}),i.type==="console"?s.jsx(kt,{children:s.jsx(St,{ref:o,className:"chat-messages-container",children:a.map(u=>s.jsx(Ct,{children:s.jsx(ct,{message:u,currentUsername:d,onCommandClick:c,onHover:e})},u.id))})}):s.jsx(kt,{children:s.jsx(St,{ref:o,className:"chat-messages-container",children:l.map((u,h)=>u.messages[0].type==="system"?s.jsx(Zd,{children:u.messages.map(f=>s.jsx(Ct,{children:s.jsx(ct,{message:f,currentUsername:d,onCommandClick:c,onHover:e})},f.id))},h):s.jsx(Jd,{children:u.messages.map((f,b)=>{if(b===0)return s.jsx(Ct,{children:s.jsx(ct,{message:f,currentUsername:d,onCommandClick:c,onHover:e})},f.id);{const y={...f,sender:"",metadata:{...f.metadata,isGroupedMessage:!0}};return s.jsx(Ct,{children:s.jsx(ct,{message:y,currentUsername:d,onCommandClick:c,onHover:e})},f.id)}})},h))})})});Yo.displayName="ChatMessages";const eu=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  padding-top: ${e=>e.theme.spacing[1]};
  background-color: ${e=>e.theme.colors.surface};
  margin: ${e=>e.theme.spacing[2]};
  margin-top: 0;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  
  /* Ensure input is visible on mobile */
  @media (max-width: 768px) {
    position: fixed;
    bottom: env(safe-area-inset-bottom, 8px);
    left: ${e=>e.theme.spacing[1]};
    right: ${e=>e.theme.spacing[1]};
    width: auto;
    margin: 0;
    padding-bottom: ${e=>e.theme.spacing[3]};
    min-height: 60px;
    background-color: ${e=>e.theme.colors.background};
    border: 2px solid ${e=>e.theme.colors.primary};
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
`,tu=m.textarea`
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
  resize: none;
  height: 40px;
  line-height: 1.5;
  overflow: hidden;
  
  /* iOS fixes to prevent zoom and ensure visibility */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-user-select: text;
  user-select: text;
  
  /* Ensure minimum 16px font size on mobile to prevent iOS zoom */
  @media (max-width: 768px) {
    font-size: 16px;
    height: 44px;
    padding: ${e=>e.theme.spacing[3]};
    border-width: 2px;
    background-color: #ffffff;
    color: #000000;
    border-color: ${e=>e.theme.colors.primary};
  }
  
  &:focus {
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: ${e=>e.theme.shadows.container}, 0 0 0 2px ${e=>e.theme.colors.primary}20;
  }
  
  @media (max-width: 768px) {
    &:focus {
      border-color: ${e=>e.theme.colors.primary};
      background-color: #ffffff;
      box-shadow: 0 0 0 3px ${e=>e.theme.colors.primary}40;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${e=>e.theme.colors.textTertiary};
  }
  
  @media (max-width: 768px) {
    &::placeholder {
      color: #666666;
    }
  }
`,ru=m.button`
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
  
  /* iOS fixes */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  /* Match input font size on mobile */
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
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
`,Vo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:i=!1})=>{const a=p.useRef(null),d=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e&&r(e)):l.key==="ArrowUp"&&!e?(l.preventDefault(),n?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),n?.("down"))},c=()=>{e&&r(e)};return s.jsxs(eu,{children:[s.jsx(tu,{ref:a,value:e,onChange:l=>t(l.target.value),onKeyDown:d,placeholder:o,disabled:i,autoComplete:"off",spellCheck:"true",rows:1}),s.jsx(ru,{onClick:c,disabled:i||!e,title:"Send message (Enter)",children:"Send"})]})};Vo.displayName="ChatInput";const nu=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,ou=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,iu=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,su=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,au=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,cu=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  padding: ${e=>e.theme.spacing[2]};
  padding-top: 0;
  padding-bottom: 0;
  
  @media (max-width: 768px) {
    height: calc(100vh - 180px);
    max-height: calc(100vh - 180px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`,qo=K(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=Ee(),[i,a]=p.useState(""),[d,c]=p.useState(!1),[l,u]=p.useState(null);Z.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),Z.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const h=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!f.trim())return;const b=f.split(`
`);if(b.length>1){b.forEach(y=>{y&&h(y)}),a("");return}if(r.addToHistory(f),f==="/help"||f==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(f.startsWith("/")||f.startsWith("\\")){const y=f.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const $=y.id.replace("channel-","");n.sendCommand(`tell ${$} ${f}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${f}`);else{const $=f.match(/^tell\s+(\w+)\s+(.+)$/);if($){const[,x,v]=$,k=x.replace(/\([^)]*\)/g,"").trim(),C=/^\d+$/.test(k);if(C&&o.preferences.openChannelsInTabs){const S=`channel-${k}`;r.createTab(S,k,"channel")}else if(!C&&o.preferences.openTellsInTabs){const S=k.toLowerCase();r.createTab(S,k,"private"),r.addMessage(S,{channel:S,sender:"You",content:v,timestamp:new Date,type:"message"})}}else r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"});n.sendCommand(f)}}a("")},g=f=>{const b=r.navigateHistory(f);b!==null&&a(b)};return s.jsxs(nu,{className:e,$compact:t,children:[!t&&s.jsxs(ou,{children:[s.jsx(iu,{children:"Chat"}),n.averagePing!==null&&s.jsxs(au,{children:["Ping: ",n.averagePing,"ms"]}),l&&s.jsxs(su,{children:["Received: ",new Date(l).toLocaleTimeString()]})]}),s.jsxs(cu,{children:[s.jsx(_o,{}),s.jsx(Yo,{onMessageHover:u}),s.jsx(Vo,{value:i,onChange:a,onSend:h,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});qo.displayName="ChatPanel";const lu=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,du=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,uu=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,hu=m.div`
  width: ${e=>e.$fullWidth?"100%":e.$isVisible?"600px":"0"};
  display: ${e=>e.$isVisible?"flex":"none"};
  flex-direction: column;
  background-color: ${e=>e.theme.colors.surface};
  border-left: ${e=>e.$fullWidth?"none":"1px solid "+e.theme.colors.border};
  overflow: hidden;
  flex: ${e=>e.$fullWidth?"1":"initial"};
  
  @media (max-width: 768px) {
    width: ${e=>e.$isVisible?"100%":"0"};
    height: ${e=>e.$fullWidth?"100vh":"auto"};
    max-height: ${e=>e.$fullWidth?"100vh":"none"};
    position: ${e=>e.$fullWidth?"relative":"static"};
  }
`,pu=m.div`
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
`,Ko=K(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Ne(),o=Ro(),i=Eo(),a=Ja(),[d,c]=p.useState(600),[l,u]=p.useState(!1),h=p.useRef(!1);p.useEffect(()=>{!h.current&&r&&(h.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),p.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),p.useEffect(()=>{const $=e.preferences.chessOrientation;i.includes($)||e.updatePreference("chessOrientation","portrait")},[i,e]);const g=$=>{$.preventDefault(),u(!0)};p.useEffect(()=>{if(!l)return;const $=v=>{const k=window.innerWidth-v.clientX;c(Math.max(300,Math.min(600,k))),window.dispatchEvent(new Event("resize"))},x=()=>{u(!1)};return document.addEventListener("mousemove",$),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",x)}},[l]);const f=t==="chess-only"||t==="chess-and-chat",b=t==="chat-only"||t==="chess-and-chat",y=t==="chess-and-chat"&&!n.isMobile;return s.jsxs(lu,{children:[s.jsx(zo,{}),s.jsxs(du,{children:[s.jsx(uu,{$isVisible:f,children:s.jsx(Ho,{hasChat:b,chatWidth:b&&!n.isMobile?d:0})}),y&&s.jsx(pu,{$isVisible:!0,onMouseDown:g,style:{cursor:l?"col-resize":"ew-resize"}}),s.jsx(hu,{$isVisible:b,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:b&&!n.isMobile?`${d}px`:void 0},children:s.jsx(qo,{})})]})]})});Ko.displayName="AppLayout";const mu=Wa`
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
`,fu=()=>s.jsx(Zo,{children:s.jsxs(_a,{children:[s.jsx(mu,{}),s.jsx(Cs,{children:s.jsx(ts,{children:s.jsx(_n,{path:"/",element:s.jsx(ec,{children:s.jsx(Ko,{})})})})})]})}),Xo=document.getElementById("root");if(!Xo)throw new Error("Root element not found");const gu=zn(Xo);gu.render(s.jsx(fu,{}));
