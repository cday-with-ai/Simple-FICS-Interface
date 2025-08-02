import{u as De,j as i,a as Ee,b as Ot,c as zn,d as cr,e as Ft,V as Qo,f as Jo,l as Nr,R as Zo}from"./shared-BP5L5yh0.js";import{a as ei,r as u,R as Z}from"./vendor-cxkclgJA.js";import{o as X}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var Tn,Or=ei;Tn=Or.createRoot,Or.hydrateRoot;var kr={};Object.defineProperty(kr,"__esModule",{value:!0});kr.parse=ai;kr.serialize=ci;const ti=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,ri=/^[\u0021-\u003A\u003C-\u007E]*$/,ni=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,oi=/^[\u0020-\u003A\u003D-\u007E]*$/,ii=Object.prototype.toString,si=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function ai(e,t){const r=new si,n=e.length;if(n<2)return r;const o=t?.decode||li;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const d=e.indexOf(";",s),c=d===-1?n:d;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const l=Fr(e,s,a),p=Br(e,a,l),m=e.slice(l,p);if(r[m]===void 0){let g=Fr(e,a+1,c),f=Br(e,c,g);const $=o(e.slice(g,f));r[m]=$}s=c+1}while(s<n);return r}function Fr(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Br(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function ci(e,t,r){const n=r?.encode||encodeURIComponent;if(!ti.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!ri.test(o))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+o;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!ni.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!oi.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!di(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function li(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function di(e){return ii.call(e)==="[object Date]"}var Wr="popstate";function ui(e={}){function t(n,o){let{pathname:s,search:a,hash:d}=n.location;return lr("",{pathname:s,search:a,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:ut(o)}return pi(t,r,null,e)}function K(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function we(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function hi(){return Math.random().toString(36).substring(2,10)}function Hr(e,t){return{usr:e.state,key:e.key,idx:t}}function lr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?et(t):t,state:r,key:t&&t.key||n||hi()}}function ut({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function et(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function pi(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:s=!1}=n,a=o.history,d="POP",c=null,l=p();l==null&&(l=0,a.replaceState({...a.state,idx:l},""));function p(){return(a.state||{idx:null}).idx}function m(){d="POP";let v=p(),x=v==null?null:v-l;l=v,c&&c({action:d,location:y.location,delta:x})}function g(v,x){d="PUSH";let j=lr(y.location,v,x);l=p()+1;let k=Hr(j,l),P=y.createHref(j);try{a.pushState(k,"",P)}catch(b){if(b instanceof DOMException&&b.name==="DataCloneError")throw b;o.location.assign(P)}s&&c&&c({action:d,location:y.location,delta:1})}function f(v,x){d="REPLACE";let j=lr(y.location,v,x);l=p();let k=Hr(j,l),P=y.createHref(j);a.replaceState(k,"",P),s&&c&&c({action:d,location:y.location,delta:0})}function $(v){return mi(v)}let y={get action(){return d},get location(){return e(o,a)},listen(v){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Wr,m),c=v,()=>{o.removeEventListener(Wr,m),c=null}},createHref(v){return t(o,v)},createURL:$,encodeLocation(v){let x=$(v);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:f,go(v){return a.go(v)}};return y}function mi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),K(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:ut(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Ln(e,t,r="/"){return fi(e,t,r,!1)}function fi(e,t,r,n){let o=typeof t=="string"?et(t):t,s=Re(o.pathname||"/",r);if(s==null)return null;let a=In(e);gi(a);let d=null;for(let c=0;d==null&&c<a.length;++c){let l=Pi(s);d=Ci(a[c],l,n)}return d}function In(e,t=[],r=[],n=""){let o=(s,a,d)=>{let c={relativePath:d===void 0?s.path||"":d,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(K(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let l=Pe([n,c.relativePath]),p=r.concat(c);s.children&&s.children.length>0&&(K(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),In(s.children,t,p,l)),!(s.path==null&&!s.index)&&t.push({path:l,score:ki(l,s.index),routesMeta:p})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))o(s,a);else for(let d of An(s.path))o(s,a,d)}),t}function An(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return o?[s,""]:[s];let a=An(n.join("/")),d=[];return d.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&d.push(...a),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function gi(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Si(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var xi=/^:[\w-]+$/,yi=3,bi=2,$i=1,vi=10,wi=-2,_r=e=>e==="*";function ki(e,t){let r=e.split("/"),n=r.length;return r.some(_r)&&(n+=wi),t&&(n+=bi),r.filter(o=>!_r(o)).reduce((o,s)=>o+(xi.test(s)?yi:s===""?$i:vi),n)}function Si(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Ci(e,t,r=!1){let{routesMeta:n}=e,o={},s="/",a=[];for(let d=0;d<n.length;++d){let c=n[d],l=d===n.length-1,p=s==="/"?t:t.slice(s.length)||"/",m=Lt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},p),g=c.route;if(!m&&l&&r&&!n[n.length-1].route.index&&(m=Lt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},p)),!m)return null;Object.assign(o,m.params),a.push({params:o,pathname:Pe([s,m.pathname]),pathnameBase:zi(Pe([s,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(s=Pe([s,m.pathnameBase]))}return a}function Lt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=ji(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:n.reduce((l,{paramName:p,isOptional:m},g)=>{if(p==="*"){let $=d[g]||"";a=s.slice(0,s.length-$.length).replace(/(.)\/+$/,"$1")}const f=d[g];return m&&!f?l[p]=void 0:l[p]=(f||"").replace(/%2F/g,"/"),l},{}),pathname:s,pathnameBase:a,pattern:e}}function ji(e,t=!1,r=!0){we(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,d,c)=>(n.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function Pi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return we(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Re(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ri(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?et(e):e;return{pathname:r?r.startsWith("/")?r:Ei(r,t):t,search:Ti(n),hash:Li(o)}}function Ei(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function Kt(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Mi(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Dn(e){let t=Mi(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Nn(e,t,r,n=!1){let o;typeof e=="string"?o=et(e):(o={...e},K(!o.pathname||!o.pathname.includes("?"),Kt("?","pathname","search",o)),K(!o.pathname||!o.pathname.includes("#"),Kt("#","pathname","hash",o)),K(!o.search||!o.search.includes("#"),Kt("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,d;if(a==null)d=r;else{let m=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),m-=1;o.pathname=g.join("/")}d=m>=0?t[m]:"/"}let c=Ri(o,d),l=a&&a!=="/"&&a.endsWith("/"),p=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(l||p)&&(c.pathname+="/"),c}var Pe=e=>e.join("/").replace(/\/\/+/g,"/"),zi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ti=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Li=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ii(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var On=["POST","PUT","PATCH","DELETE"];new Set(On);var Ai=["GET",...On];new Set(Ai);var tt=u.createContext(null);tt.displayName="DataRouter";var Bt=u.createContext(null);Bt.displayName="DataRouterState";var Fn=u.createContext({isTransitioning:!1});Fn.displayName="ViewTransition";var Di=u.createContext(new Map);Di.displayName="Fetchers";var Ni=u.createContext(null);Ni.displayName="Await";var ke=u.createContext(null);ke.displayName="Navigation";var ft=u.createContext(null);ft.displayName="Location";var Me=u.createContext({outlet:null,matches:[],isDataRoute:!1});Me.displayName="Route";var Sr=u.createContext(null);Sr.displayName="RouteError";function Oi(e,{relative:t}={}){K(gt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=u.useContext(ke),{hash:o,pathname:s,search:a}=xt(e,{relative:t}),d=s;return r!=="/"&&(d=s==="/"?r:Pe([r,s])),n.createHref({pathname:d,search:a,hash:o})}function gt(){return u.useContext(ft)!=null}function _e(){return K(gt(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(ft).location}var Bn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Wn(e){u.useContext(ke).static||u.useLayoutEffect(e)}function Fi(){let{isDataRoute:e}=u.useContext(Me);return e?Ji():Bi()}function Bi(){K(gt(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(tt),{basename:t,navigator:r}=u.useContext(ke),{matches:n}=u.useContext(Me),{pathname:o}=_e(),s=JSON.stringify(Dn(n)),a=u.useRef(!1);return Wn(()=>{a.current=!0}),u.useCallback((c,l={})=>{if(we(a.current,Bn),!a.current)return;if(typeof c=="number"){r.go(c);return}let p=Nn(c,JSON.parse(s),o,l.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:Pe([t,p.pathname])),(l.replace?r.replace:r.push)(p,l.state,l)},[t,r,s,o,e])}u.createContext(null);function xt(e,{relative:t}={}){let{matches:r}=u.useContext(Me),{pathname:n}=_e(),o=JSON.stringify(Dn(r));return u.useMemo(()=>Nn(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Wi(e,t){return Hn(e,t)}function Hn(e,t,r,n){K(gt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=u.useContext(ke),{matches:s}=u.useContext(Me),a=s[s.length-1],d=a?a.params:{},c=a?a.pathname:"/",l=a?a.pathnameBase:"/",p=a&&a.route;{let x=p&&p.path||"";_n(c,!p||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let m=_e(),g;if(t){let x=typeof t=="string"?et(t):t;K(l==="/"||x.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=m;let f=g.pathname||"/",$=f;if(l!=="/"){let x=l.replace(/^\//,"").split("/");$="/"+f.replace(/^\//,"").split("/").slice(x.length).join("/")}let y=Ln(e,{pathname:$});we(p||y!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),we(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=Yi(y&&y.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:Pe([l,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?l:Pe([l,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),s,r,n);return t&&v?u.createElement(ft.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},v):v}function Hi(){let e=Qi(),t=Ii(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:s},"ErrorBoundary")," or"," ",u.createElement("code",{style:s},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),r?u.createElement("pre",{style:o},r):null,a)}var _i=u.createElement(Hi,null),Ui=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?u.createElement(Me.Provider,{value:this.props.routeContext},u.createElement(Sr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Gi({routeContext:e,match:t,children:r}){let n=u.useContext(tt);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),u.createElement(Me.Provider,{value:e},r)}function Yi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=r?.errors;if(s!=null){let c=o.findIndex(l=>l.route.id&&s?.[l.route.id]!==void 0);K(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,d=-1;if(r)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(d=c),l.route.id){let{loaderData:p,errors:m}=r,g=l.route.loader&&!p.hasOwnProperty(l.route.id)&&(!m||m[l.route.id]===void 0);if(l.route.lazy||g){a=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,l,p)=>{let m,g=!1,f=null,$=null;r&&(m=s&&l.route.id?s[l.route.id]:void 0,f=l.route.errorElement||_i,a&&(d<0&&p===0?(_n("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,$=null):d===p&&(g=!0,$=l.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,p+1)),v=()=>{let x;return m?x=f:g?x=$:l.route.Component?x=u.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=c,u.createElement(Gi,{match:l,routeContext:{outlet:c,matches:y,isDataRoute:r!=null},children:x})};return r&&(l.route.ErrorBoundary||l.route.errorElement||p===0)?u.createElement(Ui,{location:r.location,revalidation:r.revalidation,component:f,error:m,children:v(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):v()},null)}function Cr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Vi(e){let t=u.useContext(tt);return K(t,Cr(e)),t}function qi(e){let t=u.useContext(Bt);return K(t,Cr(e)),t}function Ki(e){let t=u.useContext(Me);return K(t,Cr(e)),t}function jr(e){let t=Ki(e),r=t.matches[t.matches.length-1];return K(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Xi(){return jr("useRouteId")}function Qi(){let e=u.useContext(Sr),t=qi("useRouteError"),r=jr("useRouteError");return e!==void 0?e:t.errors?.[r]}function Ji(){let{router:e}=Vi("useNavigate"),t=jr("useNavigate"),r=u.useRef(!1);return Wn(()=>{r.current=!0}),u.useCallback(async(o,s={})=>{we(r.current,Bn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...s}))},[e,t])}var Ur={};function _n(e,t,r){!t&&!Ur[e]&&(Ur[e]=!0,we(!1,r))}u.memo(Zi);function Zi({routes:e,future:t,state:r}){return Hn(e,void 0,r,t)}function Un(e){K(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function es({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:s=!1}){K(!gt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),d=u.useMemo(()=>({basename:a,navigator:o,static:s,future:{}}),[a,o,s]);typeof r=="string"&&(r=et(r));let{pathname:c="/",search:l="",hash:p="",state:m=null,key:g="default"}=r,f=u.useMemo(()=>{let $=Re(c,a);return $==null?null:{location:{pathname:$,search:l,hash:p,state:m,key:g},navigationType:n}},[a,c,l,p,m,g,n]);return we(f!=null,`<Router basename="${a}"> is not able to match the URL "${c}${l}${p}" because it does not start with the basename, so the <Router> won't render anything.`),f==null?null:u.createElement(ke.Provider,{value:d},u.createElement(ft.Provider,{children:t,value:f}))}function ts({children:e,location:t}){return Wi(dr(e),t)}function dr(e,t=[]){let r=[];return u.Children.forEach(e,(n,o)=>{if(!u.isValidElement(n))return;let s=[...t,o];if(n.type===u.Fragment){r.push.apply(r,dr(n.props.children,s));return}K(n.type===Un,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),K(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=dr(n.props.children,s)),r.push(a)}),r}var jt="get",Pt="application/x-www-form-urlencoded";function Wt(e){return e!=null&&typeof e.tagName=="string"}function rs(e){return Wt(e)&&e.tagName.toLowerCase()==="button"}function ns(e){return Wt(e)&&e.tagName.toLowerCase()==="form"}function os(e){return Wt(e)&&e.tagName.toLowerCase()==="input"}function is(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ss(e,t){return e.button===0&&(!t||t==="_self")&&!is(e)}var bt=null;function as(){if(bt===null)try{new FormData(document.createElement("form"),0),bt=!1}catch{bt=!0}return bt}var cs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Xt(e){return e!=null&&!cs.has(e)?(we(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pt}"`),null):e}function ls(e,t){let r,n,o,s,a;if(ns(e)){let d=e.getAttribute("action");n=d?Re(d,t):null,r=e.getAttribute("method")||jt,o=Xt(e.getAttribute("enctype"))||Pt,s=new FormData(e)}else if(rs(e)||os(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||d.getAttribute("action");if(n=c?Re(c,t):null,r=e.getAttribute("formmethod")||d.getAttribute("method")||jt,o=Xt(e.getAttribute("formenctype"))||Xt(d.getAttribute("enctype"))||Pt,s=new FormData(d,e),!as()){let{name:l,type:p,value:m}=e;if(p==="image"){let g=l?`${l}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else l&&s.append(l,m)}}else{if(Wt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=jt,n=null,o=Pt,a=e}return s&&o==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:s,body:a}}function Pr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function ds(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function us(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function hs(e,t,r){let n=await Promise.all(e.map(async o=>{let s=t.routes[o.route.id];if(s){let a=await ds(s,r);return a.links?a.links():[]}return[]}));return gs(n.flat(1).filter(us).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Gr(e,t,r,n,o,s){let a=(c,l)=>r[l]?c.route.id!==r[l].route.id:!0,d=(c,l)=>r[l].pathname!==c.pathname||r[l].route.path?.endsWith("*")&&r[l].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,l)=>a(c,l)||d(c,l)):s==="data"?t.filter((c,l)=>{let p=n.routes[c.route.id];if(!p||!p.hasLoader)return!1;if(a(c,l)||d(c,l))return!0;if(c.route.shouldRevalidate){let m=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function ps(e,t,{includeHydrateFallback:r}={}){return ms(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let s=[o.module];return o.clientActionModule&&(s=s.concat(o.clientActionModule)),o.clientLoaderModule&&(s=s.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(s=s.concat(o.hydrateFallbackModule)),o.imports&&(s=s.concat(o.imports)),s}).flat(1))}function ms(e){return[...new Set(e)]}function fs(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function gs(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let s=JSON.stringify(fs(o));return r.has(s)||(r.add(s),n.push({key:s,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var xs=new Set([100,101,204,205]);function ys(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Re(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Gn(){let e=u.useContext(tt);return Pr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function bs(){let e=u.useContext(Bt);return Pr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Rr=u.createContext(void 0);Rr.displayName="FrameworkContext";function Yn(){let e=u.useContext(Rr);return Pr(e,"You must render this element inside a <HydratedRouter> element"),e}function $s(e,t){let r=u.useContext(Rr),[n,o]=u.useState(!1),[s,a]=u.useState(!1),{onFocus:d,onBlur:c,onMouseEnter:l,onMouseLeave:p,onTouchStart:m}=t,g=u.useRef(null);u.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let y=x=>{x.forEach(j=>{a(j.isIntersecting)})},v=new IntersectionObserver(y,{threshold:.5});return g.current&&v.observe(g.current),()=>{v.disconnect()}}},[e]),u.useEffect(()=>{if(n){let y=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(y)}}},[n]);let f=()=>{o(!0)},$=()=>{o(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:ot(d,f),onBlur:ot(c,$),onMouseEnter:ot(l,f),onMouseLeave:ot(p,$),onTouchStart:ot(m,f)}]:[!1,g,{}]}function ot(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function vs({page:e,...t}){let{router:r}=Gn(),n=u.useMemo(()=>Ln(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?u.createElement(ks,{page:e,matches:n,...t}):null}function ws(e){let{manifest:t,routeModules:r}=Yn(),[n,o]=u.useState([]);return u.useEffect(()=>{let s=!1;return hs(e,t,r).then(a=>{s||o(a)}),()=>{s=!0}},[e,t,r]),n}function ks({page:e,matches:t,...r}){let n=_e(),{manifest:o,routeModules:s}=Yn(),{basename:a}=Gn(),{loaderData:d,matches:c}=bs(),l=u.useMemo(()=>Gr(e,t,c,o,n,"data"),[e,t,c,o,n]),p=u.useMemo(()=>Gr(e,t,c,o,n,"assets"),[e,t,c,o,n]),m=u.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let $=new Set,y=!1;if(t.forEach(x=>{let j=o.routes[x.route.id];!j||!j.hasLoader||(!l.some(k=>k.route.id===x.route.id)&&x.route.id in d&&s[x.route.id]?.shouldRevalidate||j.hasClientLoader?y=!0:$.add(x.route.id))}),$.size===0)return[];let v=ys(e,a);return y&&$.size>0&&v.searchParams.set("_routes",t.filter(x=>$.has(x.route.id)).map(x=>x.route.id).join(",")),[v.pathname+v.search]},[a,d,n,o,l,t,e,s]),g=u.useMemo(()=>ps(p,o),[p,o]),f=ws(p);return u.createElement(u.Fragment,null,m.map($=>u.createElement("link",{key:$,rel:"prefetch",as:"fetch",href:$,...r})),g.map($=>u.createElement("link",{key:$,rel:"modulepreload",href:$,...r})),f.map(({key:$,link:y})=>u.createElement("link",{key:$,...y})))}function Ss(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var Vn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Vn&&(window.__reactRouterVersion="7.6.3")}catch{}function Cs({basename:e,children:t,window:r}){let n=u.useRef();n.current==null&&(n.current=ui({window:r,v5Compat:!0}));let o=n.current,[s,a]=u.useState({action:o.action,location:o.location}),d=u.useCallback(c=>{u.startTransition(()=>a(c))},[a]);return u.useLayoutEffect(()=>o.listen(d),[o,d]),u.createElement(es,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o})}var qn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kn=u.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:s,replace:a,state:d,target:c,to:l,preventScrollReset:p,viewTransition:m,...g},f){let{basename:$}=u.useContext(ke),y=typeof l=="string"&&qn.test(l),v,x=!1;if(typeof l=="string"&&y&&(v=l,Vn))try{let O=new URL(window.location.href),W=l.startsWith("//")?new URL(O.protocol+l):new URL(l),w=Re(W.pathname,$);W.origin===O.origin&&w!=null?l=w+W.search+W.hash:x=!0}catch{we(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let j=Oi(l,{relative:o}),[k,P,b]=$s(n,g),S=Es(l,{replace:a,state:d,target:c,preventScrollReset:p,relative:o,viewTransition:m});function R(O){t&&t(O),O.defaultPrevented||S(O)}let D=u.createElement("a",{...g,...b,href:v||j,onClick:x||s?t:R,ref:Ss(f,P),target:c,"data-discover":!y&&r==="render"?"true":void 0});return k&&!y?u.createElement(u.Fragment,null,D,u.createElement(vs,{page:j})):D});Kn.displayName="Link";var js=u.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:s,to:a,viewTransition:d,children:c,...l},p){let m=xt(a,{relative:l.relative}),g=_e(),f=u.useContext(Bt),{navigator:$,basename:y}=u.useContext(ke),v=f!=null&&Is(m)&&d===!0,x=$.encodeLocation?$.encodeLocation(m).pathname:m.pathname,j=g.pathname,k=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;r||(j=j.toLowerCase(),k=k?k.toLowerCase():null,x=x.toLowerCase()),k&&y&&(k=Re(k,y)||k);const P=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let b=j===x||!o&&j.startsWith(x)&&j.charAt(P)==="/",S=k!=null&&(k===x||!o&&k.startsWith(x)&&k.charAt(x.length)==="/"),R={isActive:b,isPending:S,isTransitioning:v},D=b?t:void 0,O;typeof n=="function"?O=n(R):O=[n,b?"active":null,S?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let W=typeof s=="function"?s(R):s;return u.createElement(Kn,{...l,"aria-current":D,className:O,ref:p,style:W,to:a,viewTransition:d},typeof c=="function"?c(R):c)});js.displayName="NavLink";var Ps=u.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:s,method:a=jt,action:d,onSubmit:c,relative:l,preventScrollReset:p,viewTransition:m,...g},f)=>{let $=Ts(),y=Ls(d,{relative:l}),v=a.toLowerCase()==="get"?"get":"post",x=typeof d=="string"&&qn.test(d),j=k=>{if(c&&c(k),k.defaultPrevented)return;k.preventDefault();let P=k.nativeEvent.submitter,b=P?.getAttribute("formmethod")||a;$(P||k.currentTarget,{fetcherKey:t,method:b,navigate:r,replace:o,state:s,relative:l,preventScrollReset:p,viewTransition:m})};return u.createElement("form",{ref:f,method:v,action:y,onSubmit:n?c:j,...g,"data-discover":!x&&e==="render"?"true":void 0})});Ps.displayName="Form";function Rs(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Xn(e){let t=u.useContext(tt);return K(t,Rs(e)),t}function Es(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:s,viewTransition:a}={}){let d=Fi(),c=_e(),l=xt(e,{relative:s});return u.useCallback(p=>{if(ss(p,t)){p.preventDefault();let m=r!==void 0?r:ut(c)===ut(l);d(e,{replace:m,state:n,preventScrollReset:o,relative:s,viewTransition:a})}},[c,d,l,r,n,t,e,o,s,a])}var Ms=0,zs=()=>`__${String(++Ms)}__`;function Ts(){let{router:e}=Xn("useSubmit"),{basename:t}=u.useContext(ke),r=Xi();return u.useCallback(async(n,o={})=>{let{action:s,method:a,encType:d,formData:c,body:l}=ls(n,t);if(o.navigate===!1){let p=o.fetcherKey||zs();await e.fetch(p,r,o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Ls(e,{relative:t}={}){let{basename:r}=u.useContext(ke),n=u.useContext(Me);K(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),s={...xt(e||".",{relative:t})},a=_e();if(e==null){s.search=a.search;let d=new URLSearchParams(s.search),c=d.getAll("index");if(c.some(p=>p==="")){d.delete("index"),c.filter(m=>m).forEach(m=>d.append("index",m));let p=d.toString();s.search=p?`?${p}`:""}}return(!e||e===".")&&o.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Pe([r,s.pathname])),ut(s)}function Is(e,t={}){let r=u.useContext(Fn);K(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=Xn("useViewTransitionState"),o=xt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Re(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Re(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Lt(o.pathname,a)!=null||Lt(o.pathname,s)!=null}[...xs];const Qn={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},As={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Ds={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Jn={colors:As,...Qn},Ns={colors:Ds,...Qn},Os={light:Jn,dark:Ns},Fs=Jn;var oe=function(){return oe=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},oe.apply(this,arguments)};function ht(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var Y="-ms-",dt="-moz-",H="-webkit-",Zn="comm",Ht="rule",Er="decl",Bs="@import",eo="@keyframes",Ws="@layer",to=Math.abs,Mr=String.fromCharCode,ur=Object.assign;function Hs(e,t){return ne(e,0)^45?(((t<<2^ne(e,0))<<2^ne(e,1))<<2^ne(e,2))<<2^ne(e,3):0}function ro(e){return e.trim()}function je(e,t){return(e=t.exec(e))?e[0]:e}function N(e,t,r){return e.replace(t,r)}function Rt(e,t,r){return e.indexOf(t,r)}function ne(e,t){return e.charCodeAt(t)|0}function Xe(e,t,r){return e.slice(t,r)}function $e(e){return e.length}function no(e){return e.length}function it(e,t){return t.push(e),e}function _s(e,t){return e.map(t).join("")}function Yr(e,t){return e.filter(function(r){return!je(r,t)})}var _t=1,Qe=1,oo=0,xe=0,J=0,rt="";function Ut(e,t,r,n,o,s,a,d){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:_t,column:Qe,length:a,return:"",siblings:d}}function Le(e,t){return ur(Ut("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ue(e){for(;e.root;)e=Le(e.root,{children:[e]});it(e,e.siblings)}function Us(){return J}function Gs(){return J=xe>0?ne(rt,--xe):0,Qe--,J===10&&(Qe=1,_t--),J}function ye(){return J=xe<oo?ne(rt,xe++):0,Qe++,J===10&&(Qe=1,_t++),J}function Be(){return ne(rt,xe)}function Et(){return xe}function Gt(e,t){return Xe(rt,e,t)}function hr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ys(e){return _t=Qe=1,oo=$e(rt=e),xe=0,[]}function Vs(e){return rt="",e}function Qt(e){return ro(Gt(xe-1,pr(e===91?e+2:e===40?e+1:e)))}function qs(e){for(;(J=Be())&&J<33;)ye();return hr(e)>2||hr(J)>3?"":" "}function Ks(e,t){for(;--t&&ye()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return Gt(e,Et()+(t<6&&Be()==32&&ye()==32))}function pr(e){for(;ye();)switch(J){case e:return xe;case 34:case 39:e!==34&&e!==39&&pr(J);break;case 40:e===41&&pr(e);break;case 92:ye();break}return xe}function Xs(e,t){for(;ye()&&e+J!==57;)if(e+J===84&&Be()===47)break;return"/*"+Gt(t,xe-1)+"*"+Mr(e===47?e:ye())}function Qs(e){for(;!hr(Be());)ye();return Gt(e,xe)}function Js(e){return Vs(Mt("",null,null,null,[""],e=Ys(e),0,[0],e))}function Mt(e,t,r,n,o,s,a,d,c){for(var l=0,p=0,m=a,g=0,f=0,$=0,y=1,v=1,x=1,j=0,k="",P=o,b=s,S=n,R=k;v;)switch($=j,j=ye()){case 40:if($!=108&&ne(R,m-1)==58){Rt(R+=N(Qt(j),"&","&\f"),"&\f",to(l?d[l-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:R+=Qt(j);break;case 9:case 10:case 13:case 32:R+=qs($);break;case 92:R+=Ks(Et()-1,7);continue;case 47:switch(Be()){case 42:case 47:it(Zs(Xs(ye(),Et()),t,r,c),c);break;default:R+="/"}break;case 123*y:d[l++]=$e(R)*x;case 125*y:case 59:case 0:switch(j){case 0:case 125:v=0;case 59+p:x==-1&&(R=N(R,/\f/g,"")),f>0&&$e(R)-m&&it(f>32?qr(R+";",n,r,m-1,c):qr(N(R," ","")+";",n,r,m-2,c),c);break;case 59:R+=";";default:if(it(S=Vr(R,t,r,l,p,o,d,k,P=[],b=[],m,s),s),j===123)if(p===0)Mt(R,t,S,S,P,s,m,d,b);else switch(g===99&&ne(R,3)===110?100:g){case 100:case 108:case 109:case 115:Mt(e,S,S,n&&it(Vr(e,S,S,0,0,o,d,k,o,P=[],m,b),b),o,b,m,d,n?P:b);break;default:Mt(R,S,S,S,[""],b,0,d,b)}}l=p=f=0,y=x=1,k=R="",m=a;break;case 58:m=1+$e(R),f=$;default:if(y<1){if(j==123)--y;else if(j==125&&y++==0&&Gs()==125)continue}switch(R+=Mr(j),j*y){case 38:x=p>0?1:(R+="\f",-1);break;case 44:d[l++]=($e(R)-1)*x,x=1;break;case 64:Be()===45&&(R+=Qt(ye())),g=Be(),p=m=$e(k=R+=Qs(Et())),j++;break;case 45:$===45&&$e(R)==2&&(y=0)}}return s}function Vr(e,t,r,n,o,s,a,d,c,l,p,m){for(var g=o-1,f=o===0?s:[""],$=no(f),y=0,v=0,x=0;y<n;++y)for(var j=0,k=Xe(e,g+1,g=to(v=a[y])),P=e;j<$;++j)(P=ro(v>0?f[j]+" "+k:N(k,/&\f/g,f[j])))&&(c[x++]=P);return Ut(e,t,r,o===0?Ht:d,c,l,p,m)}function Zs(e,t,r,n){return Ut(e,t,r,Zn,Mr(Us()),Xe(e,2,-2),0,n)}function qr(e,t,r,n,o){return Ut(e,t,r,Er,Xe(e,0,n),Xe(e,n+1,-1),n,o)}function io(e,t,r){switch(Hs(e,t)){case 5103:return H+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return H+e+e;case 4789:return dt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return H+e+dt+e+Y+e+e;case 5936:switch(ne(e,t+11)){case 114:return H+e+Y+N(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return H+e+Y+N(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return H+e+Y+N(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return H+e+Y+e+e;case 6165:return H+e+Y+"flex-"+e+e;case 5187:return H+e+N(e,/(\w+).+(:[^]+)/,H+"box-$1$2"+Y+"flex-$1$2")+e;case 5443:return H+e+Y+"flex-item-"+N(e,/flex-|-self/g,"")+(je(e,/flex-|baseline/)?"":Y+"grid-row-"+N(e,/flex-|-self/g,""))+e;case 4675:return H+e+Y+"flex-line-pack"+N(e,/align-content|flex-|-self/g,"")+e;case 5548:return H+e+Y+N(e,"shrink","negative")+e;case 5292:return H+e+Y+N(e,"basis","preferred-size")+e;case 6060:return H+"box-"+N(e,"-grow","")+H+e+Y+N(e,"grow","positive")+e;case 4554:return H+N(e,/([^-])(transform)/g,"$1"+H+"$2")+e;case 6187:return N(N(N(e,/(zoom-|grab)/,H+"$1"),/(image-set)/,H+"$1"),e,"")+e;case 5495:case 3959:return N(e,/(image-set\([^]*)/,H+"$1$`$1");case 4968:return N(N(e,/(.+:)(flex-)?(.*)/,H+"box-pack:$3"+Y+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+H+e+e;case 4200:if(!je(e,/flex-|baseline/))return Y+"grid-column-align"+Xe(e,t)+e;break;case 2592:case 3360:return Y+N(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,je(n.props,/grid-\w+-end/)})?~Rt(e+(r=r[t].value),"span",0)?e:Y+N(e,"-start","")+e+Y+"grid-row-span:"+(~Rt(r,"span",0)?je(r,/\d+/):+je(r,/\d+/)-+je(e,/\d+/))+";":Y+N(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return je(n.props,/grid-\w+-start/)})?e:Y+N(N(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return N(e,/(.+)-inline(.+)/,H+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if($e(e)-1-t>6)switch(ne(e,t+1)){case 109:if(ne(e,t+4)!==45)break;case 102:return N(e,/(.+:)(.+)-([^]+)/,"$1"+H+"$2-$3$1"+dt+(ne(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Rt(e,"stretch",0)?io(N(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return N(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,d,c,l){return Y+o+":"+s+l+(a?Y+o+"-span:"+(d?c:+c-+s)+l:"")+e});case 4949:if(ne(e,t+6)===121)return N(e,":",":"+H)+e;break;case 6444:switch(ne(e,ne(e,14)===45?18:11)){case 120:return N(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+H+(ne(e,14)===45?"inline-":"")+"box$3$1"+H+"$2$3$1"+Y+"$2box$3")+e;case 100:return N(e,":",":"+Y)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return N(e,"scroll-","scroll-snap-")+e}return e}function It(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function ea(e,t,r,n){switch(e.type){case Ws:if(e.children.length)break;case Bs:case Er:return e.return=e.return||e.value;case Zn:return"";case eo:return e.return=e.value+"{"+It(e.children,n)+"}";case Ht:if(!$e(e.value=e.props.join(",")))return""}return $e(r=It(e.children,n))?e.return=e.value+"{"+r+"}":""}function ta(e){var t=no(e);return function(r,n,o,s){for(var a="",d=0;d<t;d++)a+=e[d](r,n,o,s)||"";return a}}function ra(e){return function(t){t.root||(t=t.return)&&e(t)}}function na(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Er:e.return=io(e.value,e.length,r);return;case eo:return It([Le(e,{value:N(e.value,"@","@"+H)})],n);case Ht:if(e.length)return _s(r=e.props,function(o){switch(je(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ue(Le(e,{props:[N(o,/:(read-\w+)/,":"+dt+"$1")]})),Ue(Le(e,{props:[o]})),ur(e,{props:Yr(r,n)});break;case"::placeholder":Ue(Le(e,{props:[N(o,/:(plac\w+)/,":"+H+"input-$1")]})),Ue(Le(e,{props:[N(o,/:(plac\w+)/,":"+dt+"$1")]})),Ue(Le(e,{props:[N(o,/:(plac\w+)/,Y+"input-$1")]})),Ue(Le(e,{props:[o]})),ur(e,{props:Yr(r,n)});break}return""})}}var oa={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},Je=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",so="active",ao="data-styled-version",Yt="6.1.19",zr=`/*!sc*/
`,At=typeof window<"u"&&typeof document<"u",ia=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),sa={},Vt=Object.freeze([]),Ze=Object.freeze({});function co(e,t,r){return r===void 0&&(r=Ze),e.theme!==r.theme&&e.theme||t||r.theme}var lo=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),aa=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ca=/(^-|-$)/g;function Kr(e){return e.replace(aa,"-").replace(ca,"")}var la=/(a)(d)/gi,$t=52,Xr=function(e){return String.fromCharCode(e+(e>25?39:97))};function mr(e){var t,r="";for(t=Math.abs(e);t>$t;t=t/$t|0)r=Xr(t%$t)+r;return(Xr(t%$t)+r).replace(la,"$1-$2")}var Jt,uo=5381,Ve=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},ho=function(e){return Ve(uo,e)};function po(e){return mr(ho(e)>>>0)}function da(e){return e.displayName||e.name||"Component"}function Zt(e){return typeof e=="string"&&!0}var mo=typeof Symbol=="function"&&Symbol.for,fo=mo?Symbol.for("react.memo"):60115,ua=mo?Symbol.for("react.forward_ref"):60112,ha={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},pa={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},go={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ma=((Jt={})[ua]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Jt[fo]=go,Jt);function Qr(e){return("type"in(t=e)&&t.type.$$typeof)===fo?go:"$$typeof"in e?ma[e.$$typeof]:ha;var t}var fa=Object.defineProperty,ga=Object.getOwnPropertyNames,Jr=Object.getOwnPropertySymbols,xa=Object.getOwnPropertyDescriptor,ya=Object.getPrototypeOf,Zr=Object.prototype;function xo(e,t,r){if(typeof t!="string"){if(Zr){var n=ya(t);n&&n!==Zr&&xo(e,n,r)}var o=ga(t);Jr&&(o=o.concat(Jr(t)));for(var s=Qr(e),a=Qr(t),d=0;d<o.length;++d){var c=o[d];if(!(c in pa||r&&r[c]||a&&c in a||s&&c in s)){var l=xa(t,c);try{fa(e,c,l)}catch{}}}}return e}function We(e){return typeof e=="function"}function Tr(e){return typeof e=="object"&&"styledComponentId"in e}function Fe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function fr(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function pt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function gr(e,t,r){if(r===void 0&&(r=!1),!r&&!pt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=gr(e[n],t[n]);else if(pt(t))for(var n in t)e[n]=gr(e[n],t[n]);return e}function Lr(e,t){Object.defineProperty(e,"toString",{value:t})}function He(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ba=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw He(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var d=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(d,r[a])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(zr);return r},e}(),zt=new Map,Dt=new Map,Tt=1,vt=function(e){if(zt.has(e))return zt.get(e);for(;Dt.has(Tt);)Tt++;var t=Tt++;return zt.set(e,t),Dt.set(t,e),t},$a=function(e,t){Tt=t+1,zt.set(e,t),Dt.set(t,e)},va="style[".concat(Je,"][").concat(ao,'="').concat(Yt,'"]'),wa=new RegExp("^".concat(Je,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ka=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},Sa=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(zr),o=[],s=0,a=n.length;s<a;s++){var d=n[s].trim();if(d){var c=d.match(wa);if(c){var l=0|parseInt(c[1],10),p=c[2];l!==0&&($a(p,l),ka(e,p,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(d)}}},en=function(e){for(var t=document.querySelectorAll(va),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Je)!==so&&(Sa(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Ca(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var yo=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(d){var c=Array.from(d.querySelectorAll("style[".concat(Je,"]")));return c[c.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(Je,so),n.setAttribute(ao,Yt);var a=Ca();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},ja=function(){function e(t){this.element=yo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var a=n[o];if(a.ownerNode===r)return a}throw He(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Pa=function(){function e(t){this.element=yo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Ra=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),tn=At,Ea={isServer:!At,useCSSOMInjection:!ia},Nt=function(){function e(t,r,n){t===void 0&&(t=Ze),r===void 0&&(r={});var o=this;this.options=oe(oe({},Ea),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&At&&tn&&(tn=!1,en(this)),Lr(this,function(){return function(s){for(var a=s.getTag(),d=a.length,c="",l=function(m){var g=function(x){return Dt.get(x)}(m);if(g===void 0)return"continue";var f=s.names.get(g),$=a.getGroup(m);if(f===void 0||!f.size||$.length===0)return"continue";var y="".concat(Je,".g").concat(m,'[id="').concat(g,'"]'),v="";f!==void 0&&f.forEach(function(x){x.length>0&&(v+="".concat(x,","))}),c+="".concat($).concat(y,'{content:"').concat(v,'"}').concat(zr)},p=0;p<d;p++)l(p);return c}(o)})}return e.registerId=function(t){return vt(t)},e.prototype.rehydrate=function(){!this.server&&At&&en(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(oe(oe({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Ra(o):n?new ja(o):new Pa(o)}(this.options),new ba(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(vt(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(vt(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(vt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ma=/&/g,za=/^\s*\/\/.*$/gm;function bo(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=bo(r.children,t)),r})}function Ta(e){var t,r,n,o=Ze,s=o.options,a=s===void 0?Ze:s,d=o.plugins,c=d===void 0?Vt:d,l=function(g,f,$){return $.startsWith(r)&&$.endsWith(r)&&$.replaceAll(r,"").length>0?".".concat(t):g},p=c.slice();p.push(function(g){g.type===Ht&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Ma,r).replace(n,l))}),a.prefix&&p.push(na),p.push(ea);var m=function(g,f,$,y){f===void 0&&(f=""),$===void 0&&($=""),y===void 0&&(y="&"),t=y,r=f,n=new RegExp("\\".concat(r,"\\b"),"g");var v=g.replace(za,""),x=Js($||f?"".concat($," ").concat(f," { ").concat(v," }"):v);a.namespace&&(x=bo(x,a.namespace));var j=[];return It(x,ta(p.concat(ra(function(k){return j.push(k)})))),j};return m.hash=c.length?c.reduce(function(g,f){return f.name||He(15),Ve(g,f.name)},uo).toString():"",m}var La=new Nt,xr=Ta(),$o=Z.createContext({shouldForwardProp:void 0,styleSheet:La,stylis:xr});$o.Consumer;Z.createContext(void 0);function yr(){return u.useContext($o)}var Ia=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=xr);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Lr(this,function(){throw He(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=xr),this.name+t.hash},e}(),Aa=function(e){return e>="A"&&e<="Z"};function rn(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Aa(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var vo=function(e){return e==null||e===!1||e===""},wo=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!vo(s)&&(Array.isArray(s)&&s.isCss||We(s)?n.push("".concat(rn(o),":"),s,";"):pt(s)?n.push.apply(n,ht(ht(["".concat(o," {")],wo(s),!1),["}"],!1)):n.push("".concat(rn(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in oa||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ie(e,t,r,n){if(vo(e))return[];if(Tr(e))return[".".concat(e.styledComponentId)];if(We(e)){if(!We(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return Ie(o,t,r,n)}var s;return e instanceof Ia?r?(e.inject(r,n),[e.getName(n)]):[e]:pt(e)?wo(e):Array.isArray(e)?Array.prototype.concat.apply(Vt,e.map(function(a){return Ie(a,t,r,n)})):[e.toString()]}function ko(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(We(r)&&!Tr(r))return!1}return!0}var Da=ho(Yt),Na=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&ko(t),this.componentId=r,this.baseHash=Ve(Da,r),this.baseStyle=n,Nt.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Fe(o,this.staticRulesId);else{var s=fr(Ie(this.rules,t,r,n)),a=mr(Ve(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var d=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,d)}o=Fe(o,a),this.staticRulesId=a}else{for(var c=Ve(this.baseHash,n.hash),l="",p=0;p<this.rules.length;p++){var m=this.rules[p];if(typeof m=="string")l+=m;else if(m){var g=fr(Ie(m,t,r,n));c=Ve(c,g+p),l+=g}}if(l){var f=mr(c>>>0);r.hasNameForId(this.componentId,f)||r.insertRules(this.componentId,f,n(l,".".concat(f),void 0,this.componentId)),o=Fe(o,f)}}return o},e}(),mt=Z.createContext(void 0);mt.Consumer;function Oa(e){var t=Z.useContext(mt),r=u.useMemo(function(){return function(n,o){if(!n)throw He(14);if(We(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw He(8);return o?oe(oe({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?Z.createElement(mt.Provider,{value:r},e.children):null}var er={};function Fa(e,t,r){var n=Tr(e),o=e,s=!Zt(e),a=t.attrs,d=a===void 0?Vt:a,c=t.componentId,l=c===void 0?function(P,b){var S=typeof P!="string"?"sc":Kr(P);er[S]=(er[S]||0)+1;var R="".concat(S,"-").concat(po(Yt+S+er[S]));return b?"".concat(b,"-").concat(R):R}(t.displayName,t.parentComponentId):c,p=t.displayName,m=p===void 0?function(P){return Zt(P)?"styled.".concat(P):"Styled(".concat(da(P),")")}(e):p,g=t.displayName&&t.componentId?"".concat(Kr(t.displayName),"-").concat(t.componentId):t.componentId||l,f=n&&o.attrs?o.attrs.concat(d).filter(Boolean):d,$=t.shouldForwardProp;if(n&&o.shouldForwardProp){var y=o.shouldForwardProp;if(t.shouldForwardProp){var v=t.shouldForwardProp;$=function(P,b){return y(P,b)&&v(P,b)}}else $=y}var x=new Na(r,g,n?o.componentStyle:void 0);function j(P,b){return function(S,R,D){var O=S.attrs,W=S.componentStyle,w=S.defaultProps,F=S.foldedComponentIds,B=S.styledComponentId,I=S.target,U=Z.useContext(mt),ee=yr(),ce=S.shouldForwardProp||ee.shouldForwardProp,Se=co(R,U,w)||Ze,q=function(Ce,fe,C){for(var L,z=oe(oe({},fe),{className:void 0,theme:C}),T=0;T<Ce.length;T+=1){var E=We(L=Ce[T])?L(z):L;for(var M in E)z[M]=M==="className"?Fe(z[M],E[M]):M==="style"?oe(oe({},z[M]),E[M]):E[M]}return fe.className&&(z.className=Fe(z.className,fe.className)),z}(O,R,Se),se=q.as||I,ae={};for(var te in q)q[te]===void 0||te[0]==="$"||te==="as"||te==="theme"&&q.theme===Se||(te==="forwardedAs"?ae.as=q.forwardedAs:ce&&!ce(te,se)||(ae[te]=q[te]));var me=function(Ce,fe){var C=yr(),L=Ce.generateAndInjectStyles(fe,C.styleSheet,C.stylis);return L}(W,q),de=Fe(F,B);return me&&(de+=" "+me),q.className&&(de+=" "+q.className),ae[Zt(se)&&!lo.has(se)?"class":"className"]=de,D&&(ae.ref=D),u.createElement(se,ae)}(k,P,b)}j.displayName=m;var k=Z.forwardRef(j);return k.attrs=f,k.componentStyle=x,k.displayName=m,k.shouldForwardProp=$,k.foldedComponentIds=n?Fe(o.foldedComponentIds,o.styledComponentId):"",k.styledComponentId=g,k.target=n?o.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=n?function(b){for(var S=[],R=1;R<arguments.length;R++)S[R-1]=arguments[R];for(var D=0,O=S;D<O.length;D++)gr(b,O[D],!0);return b}({},o.defaultProps,P):P}}),Lr(k,function(){return".".concat(k.styledComponentId)}),s&&xo(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function nn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var on=function(e){return Object.assign(e,{isCss:!0})};function ve(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(We(e)||pt(e))return on(Ie(nn(Vt,ht([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Ie(n):on(Ie(nn(n,t)))}function br(e,t,r){if(r===void 0&&(r=Ze),!t)throw He(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,ve.apply(void 0,ht([o],s,!1)))};return n.attrs=function(o){return br(e,t,oe(oe({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return br(e,t,oe(oe({},r),o))},n}var So=function(e){return br(Fa,e)},h=So;lo.forEach(function(e){h[e]=So(e)});var Ba=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=ko(t),Nt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o(fr(Ie(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Nt.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Wa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=ve.apply(void 0,ht([e],t,!1)),o="sc-global-".concat(po(JSON.stringify(n))),s=new Ba(n,o),a=function(c){var l=yr(),p=Z.useContext(mt),m=Z.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&d(m,c,l.styleSheet,p,l.stylis),Z.useLayoutEffect(function(){if(!l.styleSheet.server)return d(m,c,l.styleSheet,p,l.stylis),function(){return s.removeStyles(m,l.styleSheet)}},[m,c,l.styleSheet,p,l.stylis]),null};function d(c,l,p,m,g){if(s.isStatic)s.renderStyles(c,sa,p,g);else{var f=oe(oe({},l),{theme:co(l,m,a.defaultProps)});s.renderStyles(c,f,p,g)}}return Z.memo(a)}const Co=u.createContext(void 0),jo=()=>{const e=u.useContext(Co);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ha=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",_a=X(({children:e})=>{const t=De(),r=t.preferences.theme||"system",o=r==="system"?Ha():r,s=Os[o]||Fs,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},d={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return u.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),l=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",l),()=>c.removeEventListener("change",l)}},[r,t]),u.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([l,p])=>{typeof p=="string"?c.style.setProperty(`--color-${l}`,p):typeof p=="object"&&p!==null&&Object.entries(p).forEach(([m,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${l}-${m}`,g)})}),Object.entries(a.spacing).forEach(([l,p])=>{c.style.setProperty(`--spacing-${l}`,p)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),i.jsx(Co.Provider,{value:d,children:i.jsx(Oa,{theme:a,children:e})})});function Ua(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ga(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var tr=typeof window<"u",Ya=function(e){u.useEffect(e,[])},Va=function(e){var t=u.useRef(e);t.current=e,Ya(function(){return function(){return t.current()}})},qa=function(e){var t=u.useRef(0),r=u.useState(e),n=r[0],o=r[1],s=u.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Va(function(){cancelAnimationFrame(t.current)}),[n,s]},Po=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,s=o===void 0?1/0:o,a=t.onChange,d=qa({width:tr?window.innerWidth:n,height:tr?window.innerHeight:s}),c=d[0],l=d[1];return u.useEffect(function(){if(tr){var p=function(){var m=window.innerWidth,g=window.innerHeight;l({width:m,height:g}),a&&a(m,g)};return Ua(window,"resize",p),function(){Ga(window,"resize",p)}}},[]),c};const Ir=()=>{const{width:e=0,height:t=0}=Po();return{width:e,height:t}},Ka=()=>{const{width:e=0,height:t=0}=Po();return e>t?"landscape":"portrait"},Xa=()=>{const{width:e}=Ir(),{theme:t}=jo(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Ro=()=>{const[e,t]=u.useState(!1);return u.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Qa=()=>{const[e,t]=u.useState(!1),r=Ro(),{width:n}=Ir();return u.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),d=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||d&&c})())},[r,n]),e},Ne=()=>{const e=Ir(),t=Ka(),r=Xa(),n=Ro(),o=Qa();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},Eo=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Mo=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},Ja=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},Za=u.createContext(void 0),ec=({children:e})=>{const t=De(),r=Ne(),[n,o]=u.useState(!0),[s,a]=u.useState(["chat","moves"]),[d,c]=u.useState(!1),l=t.preferences.layout,p=u.useMemo(()=>l==="auto"?r.orientation:l,[l,r.orientation]),m=u.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=y=>{t.updatePreference("layout",y)},f=y=>{a(v=>v.includes(y)?v.filter(x=>x!==y):[...v,y])};u.useEffect(()=>{c(!0),o(v=>{const x=!m;return v!==x?x:v}),a(v=>{if(m&&p==="portrait"){const x=["chat"];return JSON.stringify(v)!==JSON.stringify(x)?x:v}else if(p==="landscape"&&!m){const x=["chat","moves","analysis"];return JSON.stringify(v)!==JSON.stringify(x)?x:v}return v});const y=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(y)},[p,m]);const $={...r,layoutPreference:l,setLayoutPreference:g,activeLayout:p,isCompactMode:m,showSidebar:n,setSidebarVisible:o,activePanels:s,togglePanel:f,isTransitioning:d};return i.jsx(Za.Provider,{value:$,children:e})};h.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: ${({isTransitioning:e,theme:t})=>e?`all ${t.transitions.normal}`:"none"};
`;h.main`
    flex: 1;
    display: flex;
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ve`
                flex-direction: column;
            `:ve`
                flex-direction: row;
            `}
`;h.div`
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
`;h.aside`
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
`;h.div`
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
`;h.div`
    display: flex;
    flex-direction: ${({direction:e})=>e||"row"};
    justify-content: ${({justify:e})=>e||"start"};
    align-items: ${({align:e})=>e||"stretch"};
    gap: ${({gap:e,theme:t})=>e||t.spacing.md};
    flex-wrap: ${({wrap:e})=>e?"wrap":"nowrap"};

    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        flex-direction: column;
    }
`;h.div`
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
`;h.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;h.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    background: ${({theme:e})=>e.colors.background};
`;h.header`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
`;h.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme:e})=>e.spacing.lg};
    min-height: 0; // Important for flexbox to allow shrinking
`;h.aside`
    width: ${({width:e,$isCollapsed:t})=>t?"0px":`${e}px`};
    height: 100vh;
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-left: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`width ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;h.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.sm};
    flex-shrink: 0;
`;h.button`
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
`;h.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.md};
`;h.div`
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
`;h.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;h.header`
    height: 50px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
`;h.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};
    padding: ${({theme:e})=>e.spacing.sm};
    min-height: 0; // Important for flexbox
    max-height: 65vh; // Leave room for bottom panels
`;h.div`
    height: ${({$isExpanded:e,$panelHeight:t})=>e?`${t}px`:"60px"};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-top: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`height ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;h.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.xs};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    background: ${({theme:e})=>e.colors.backgroundTertiary};
    overflow-x: auto;
    flex-shrink: 0;
`;h.button`
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
`;h.button`
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
`;h.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.sm};
`;h.div`
    width: 100%;
    height: 100%;
    touch-action: pan-y; // Allow vertical scrolling but capture horizontal swipes
`;h.button`
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
`;const tc=h.input`
  display: none;
`,rc=h.button`
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
`,nc=({settingId:e,onUpload:t})=>{const r=u.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const l=new FileReader;l.onload=p=>{const m=p.target?.result;t(e,m,a.name)},l.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return i.jsxs(i.Fragment,{children:[i.jsx(tc,{ref:r,type:"file",accept:"audio/*",onChange:n}),i.jsx(rc,{type:"button",onClick:o,children:"Upload"})]})},oc=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,ic=h.div`
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
`,sc=h.div`
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
`,ac=h.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,cc=h.button`
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
`,lc=h.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,dc=h.input`
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
`,uc=h.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,hc=h.div`
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
`,pc=h.button`
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
`,mc=h.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,fc=h.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,gc=h.div`
  margin-bottom: ${e=>e.theme.spacing[6]};
`,sn=h.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[3]} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`,xc=h.div`
  flex: 1;
  margin-right: ${e=>e.theme.spacing[4]};
`,an=h.label`
  display: block;
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[1]};
`,cn=h.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,yc=h.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,bc=h.input`
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
`,$c=h.select`
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
`,vc=h.input`
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
`,wc=h.input`
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
`,kc=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Sc=h.textarea`
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
`,Cc=h.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,jc=h.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Pc=h.button`
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
`,ln=h.button`
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
`,Rc=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Ec=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Mc=h.p`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,rr=h.button`
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
`,zo=X(({isOpen:e,onClose:t})=>{const r=De(),{settingsRegistry:n}=r,o=Ne(),s=o.isMobileDevice||o.dimensions.width<768,[a,d]=u.useState("board"),[c,l]=u.useState(""),[p,m]=u.useState({}),[g,f]=u.useState({x:0,y:0}),[$,y]=u.useState(!1),[v,x]=u.useState({x:0,y:0}),j=u.useRef(null);if(u.useEffect(()=>{if(e&&j.current&&!s){const w=j.current.getBoundingClientRect();f({x:(window.innerWidth-w.width)/2,y:(window.innerHeight-w.height)/2})}},[e,s]),u.useEffect(()=>{if(!$)return;const w=B=>{f({x:B.clientX-v.x,y:B.clientY-v.y})},F=()=>{y(!1)};return document.addEventListener("mousemove",w),document.addEventListener("mouseup",F),()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",F)}},[$,v]),!e)return null;const k=n.getAllCategories(),P=c?n.search(c):n.getByCategory(a),b=(w,F)=>{const B=n.get(w);if(B){if(B.validate){const I=B.validate(F);if(typeof I=="string"){m(U=>({...U,[w]:I}));return}else if(I===!1){m(U=>({...U,[w]:"Invalid value"}));return}}m(I=>{const U={...I};return delete U[w],U}),B.value=F,B.onChange?.(F),w in r.preferences&&r.updatePreference(w,F)}},S=w=>{const F=n.get(w);F&&b(w,F.defaultValue)},R=(w,F,B)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),U=`custom_${w}_${Date.now()}`;I[U]={dataUrl:F,fileName:B,settingId:w,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),b(w,U);const ee=n.get(w);if(ee&&ee.options){const ce={label:`Custom: ${B}`,value:U},Se=ee.options.filter(q=>!q.value.startsWith("custom_"));ee.options=[...Se,ce]}},D=w=>{if(!(!w||w==="none"))try{let F;if(w.startsWith("custom_")){const U=JSON.parse(localStorage.getItem("customSounds")||"{}")[w];if(U&&U.dataUrl)F=U.dataUrl;else{console.error("Custom sound not found:",w);return}}else F=`/sounds/${w}`;const B=new Audio(F);B.volume=.5,B.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(F){console.error("Error playing sound:",F)}},O=w=>{s||(y(!0),x({x:w.clientX-g.x,y:w.clientY-g.y}))},W=w=>{switch(w.type){case"boolean":return i.jsx(bc,{type:"checkbox",checked:w.value,onChange:I=>b(w.id,I.target.checked),$isMobile:s});case"select":if(w.id.endsWith("SoundFile")){const I=w.options?.find(ce=>ce.value===w.value),U=I?I.label:"None",ee=w.value&&w.value!=="none";return i.jsxs(kc,{children:[i.jsx(jc,{children:U}),i.jsx(Pc,{type:"button",onClick:()=>D(w.value),disabled:!ee,title:ee?"Play sound":"No sound selected",children:"▶️ Play"}),i.jsx(nc,{settingId:w.id,onUpload:R})]})}else return i.jsx($c,{value:w.value,onChange:I=>b(w.id,I.target.value),children:w.options?.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return i.jsx(vc,{type:"number",value:w.value,min:w.min,max:w.max,step:w.step,onChange:I=>b(w.id,Number(I.target.value))});case"color":return i.jsx(wc,{type:"color",value:w.value,onChange:I=>b(w.id,I.target.value),$isMobile:s});case"text":const B=!!p[w.id];return i.jsxs("div",{style:{width:"100%"},children:[i.jsx(Sc,{value:w.value||"",onChange:I=>b(w.id,I.target.value),className:B?"error":"",placeholder:w.placeholder||"",spellCheck:!1}),B&&i.jsx(Cc,{children:p[w.id]})]});default:return null}};return i.jsx(oc,{children:i.jsxs(ic,{ref:j,$x:g.x,$y:g.y,$isMobile:s,children:[i.jsxs(sc,{onMouseDown:O,children:[i.jsx(ac,{children:"⚙️ Settings"}),i.jsx(cc,{onClick:t,onMouseDown:w=>w.stopPropagation(),children:"✕"})]}),i.jsx(lc,{children:i.jsx(dc,{type:"text",placeholder:"Search settings...",value:c,onChange:w=>l(w.target.value)})}),i.jsxs(uc,{$isMobile:s,children:[i.jsx(hc,{$isMobile:s,children:k.map(w=>i.jsxs(pc,{$active:a===w.id&&!c,$isMobile:s,onClick:()=>{d(w.id),l("")},children:[i.jsx(mc,{children:w.icon}),!s&&w.label]},w.id))}),i.jsxs(fc,{children:[c&&i.jsxs(Mc,{children:["Found ",P.length,' settings matching "',c,'"']}),i.jsx(gc,{children:P.map(w=>w.type==="text"?i.jsxs(sn,{style:{flexDirection:"column",alignItems:"stretch"},children:[i.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{children:[i.jsx(an,{children:w.label}),w.description&&i.jsx(cn,{children:w.description})]}),w.value!==w.defaultValue&&i.jsx(ln,{type:"button",onClick:()=>S(w.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),W(w)]},w.id):i.jsxs(sn,{children:[i.jsxs(xc,{children:[i.jsx(an,{children:w.label}),w.description&&i.jsx(cn,{children:w.description})]}),i.jsxs(yc,{children:[W(w),w.value!==w.defaultValue&&i.jsx(ln,{type:"button",onClick:()=>S(w.id),title:"Reset to default",children:"↻"})]})]},w.id))})]})]}),i.jsxs(Rc,{children:[i.jsx(rr,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),i.jsxs(Ec,{children:[i.jsx(rr,{onClick:t,children:"Cancel"}),i.jsx(rr,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});zo.displayName="SettingsDialog";const zc=h.header`
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
`,Tc=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Lc=h.button`
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
`,Ic=h.div`
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
`,Ge=h.button`
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
`,Ye=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
`,nr=h.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,or=h.div`
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
`,Te=h.button`
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
`,dn=h.hr`
  margin: ${e=>e.theme.spacing[1]} 0;
  border: none;
  border-top: 1px solid ${e=>e.theme.colors.border};
`;h.h1`
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  color: ${e=>e.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;const Ac=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Dc=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Nc=h.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Oc=h.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,ir=h.button`
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
`,To=X(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:s}=jo(),a=Eo(),d=Mo(),[c,l]=u.useState(!1),[p,m]=u.useState(!1),[g,f]=u.useState(null),$=b=>{t.updatePreference("viewMode",b),m(!1),f(null)},y=b=>{t.updatePreference("chessOrientation",b),m(!1),f(null)},v=b=>{s(b),m(!1),f(null)},x=()=>{m(!p),f(null)},j=()=>{l(!0),m(!1),f(null)},k=b=>{f(b)},P=r==="chat-only";return Z.useEffect(()=>{const b=S=>{const R=S.target;p&&!R.closest(".hamburger-menu-container")&&m(!1)};if(p)return document.addEventListener("click",b),()=>document.removeEventListener("click",b)},[p]),Z.useEffect(()=>{const b=S=>{(S.ctrlKey||S.metaKey)&&S.key===","&&(S.preventDefault(),l(!0))};return window.addEventListener("keydown",b),()=>{window.removeEventListener("keydown",b)}},[]),i.jsxs(zc,{children:[i.jsx(Tc,{children:i.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[i.jsx(Lc,{onClick:x,"aria-label":"Menu",children:"☰"}),i.jsxs(Ic,{$isOpen:p,children:[i.jsxs("div",{onMouseEnter:()=>k("theme"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[i.jsxs(Ge,{$hasSubmenu:!0,children:[i.jsx(Ye,{children:"🎨 Theme"}),i.jsx(nr,{children:"▶"})]}),i.jsxs(or,{$isOpen:g==="theme",children:[i.jsx(Te,{$isActive:o==="light",onClick:()=>v("light"),children:"☀ Light"}),i.jsx(Te,{$isActive:o==="dark",onClick:()=>v("dark"),children:"☾ Dark"}),i.jsx(Te,{$isActive:o==="system",onClick:()=>v("system"),children:"◐ System"})]})]}),i.jsxs("div",{onMouseEnter:()=>k("orientation"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[i.jsxs(Ge,{$hasSubmenu:!0,children:[i.jsx(Ye,{children:"📐 Orientation"}),i.jsx(nr,{children:"▶"})]}),i.jsxs(or,{$isOpen:g==="orientation",children:[d.includes("landscape")&&i.jsx(Te,{$isActive:n==="landscape",onClick:()=>!P&&y("landscape"),disabled:P,style:{opacity:P?.5:1},children:"▭ Landscape"}),d.includes("portrait")&&i.jsx(Te,{$isActive:n==="portrait",onClick:()=>!P&&y("portrait"),disabled:P,style:{opacity:P?.5:1},children:"▯ Portrait"})]})]}),i.jsxs("div",{onMouseEnter:()=>k("mode"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[i.jsxs(Ge,{$hasSubmenu:!0,children:[i.jsx(Ye,{children:"🎮 View Mode"}),i.jsx(nr,{children:"▶"})]}),i.jsxs(or,{$isOpen:g==="mode",children:[a.includes("chess-only")&&i.jsx(Te,{$isActive:r==="chess-only",onClick:()=>$("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&i.jsx(Te,{$isActive:r==="chess-and-chat",onClick:()=>$("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&i.jsx(Te,{$isActive:r==="chat-only",onClick:()=>$("chat-only"),children:"▤ Chat Only"})]})]}),i.jsx(dn,{}),i.jsx(Ge,{onClick:j,children:i.jsx(Ye,{children:"⚙️ Settings"})}),i.jsx(dn,{}),i.jsx(Ge,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),m(!1)},children:i.jsx(Ye,{children:"📖 Documentation"})}),i.jsx(Ge,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),m(!1)},children:i.jsx(Ye,{children:"🐛 Report Issue"})})]})]})}),i.jsx(Ac,{children:i.jsxs(Dc,{children:[i.jsx(Nc,{children:"Mode:"}),i.jsxs(Oc,{children:[a.includes("chess-only")&&i.jsx(ir,{$isActive:r==="chess-only",onClick:()=>$("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&i.jsx(ir,{$isActive:r==="chess-and-chat",onClick:()=>$("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&i.jsx(ir,{$isActive:r==="chat-only",onClick:()=>$("chat-only"),title:"Chat Only",children:"▤"})]})]})}),i.jsx(zo,{isOpen:c,onClose:()=>l(!1)})]})});To.displayName="AppHeader";const Fc=h.img`
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
`,Bc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Wc={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"},Hc=h.div`
  width: 93%;
  height: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$size*.8}px;
  user-select: none;
  cursor: ${e=>e.$isDragging?"grabbing":"grab"};
  filter: ${e=>e.$isDragging?"drop-shadow(0 4px 8px rgba(0,0,0,0.3))":"none"};
`,Ae=X(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=De(),[s,a]=Z.useState(!1),d=Bc[e];if(!d)return null;const c=o.preferences.pieceSet,l=`/pieces/${c}/${d}.svg`;return Z.useEffect(()=>{a(!1)},[e,c]),s?i.jsx(Hc,{className:"chess-piece-fallback",$isDragging:r,$size:t,style:n,"data-settings":"pieces",children:Wc[e]||e}):i.jsx(Fc,{className:"chess-piece",src:l,alt:d,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces",onError:()=>a(!0)})});Ae.displayName="ChessPiece";const _c=h.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Uc=h.div`
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
`,Gc=h.button`
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
`,Lo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const s=["Q","R","B","N"],a=d=>t==="white"?d:d.toLowerCase();return i.jsx(_c,{$isOpen:e,onClick:n,children:i.jsx(Uc,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:s.map(d=>i.jsx(Gc,{onClick:()=>r(d.toLowerCase()),children:i.jsx(Ae,{piece:a(d),size:50})},d))})})};Lo.displayName="PromotionDialog";const Yc=h.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Vc=h.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,qc=h.div`
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
`,un=h.div`
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
`,Kc=h.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,Xc=h.div.attrs(e=>({style:{transform:`translate(
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
`,qe=["a","b","c","d","e","f","g","h"],Ke=["8","7","6","5","4","3","2","1"];function Qc(e,t){return(e+t)%2===0}function Jc(e,t,r){const n=r?qe[7-e]:qe[e],o=r?Ke[7-t]:Ke[t];return`${n}${o}`}function Zc(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,s)=>{let a=0;for(const d of o)if(d>="1"&&d<="8")a+=parseInt(d);else{const c=`${qe[a]}${Ke[s]}`;t.set(c,d),a++}}),t}const $r=X(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:s,highlightedSquares:a=new Set,lastMove:d,interactive:c=!0,onSizeCalculated:l,selectedCapturedPiece:p,onCapturedPieceSelect:m})=>{Ne();const g=De(),f=Ot(),$=u.useRef(null),[y,v]=u.useState(t||200),[x,j]=u.useState(null),[k,P]=u.useState(new Set),[b,S]=u.useState(null),[R,D]=u.useState([]),O=u.useRef(),[W,w]=u.useState(null),[F,B]=u.useState(!1),I=u.useMemo(()=>Zc(e),[e]),U=u.useRef(new Map);u.useRef(0);const ee=u.useCallback((C,L)=>{const z=qe.indexOf(C[0]),T=Ke.indexOf(C[1]),E=L/8,M=r?(7-z)*E:z*E,G=r?(7-T)*E:T*E;return{x:M,y:G}},[r]),ce=u.useCallback((C,L,z)=>{const T=C.toLowerCase()==="p",E=z[1];return T&&(E==="8"||E==="1")},[]),Se=u.useCallback(C=>{C.preventDefault(),f.isPlaying&&f.clearPremove()},[f]);u.useEffect(()=>{if(t){v(t);return}const C=()=>{if(!$.current)return;const M=$.current.parentElement;if(!M)return;const{width:G,height:re}=M.getBoundingClientRect();$.current.getBoundingClientRect();const le=16,A=G-le,ie=re-le,Q=Math.floor(Math.min(A,ie)),ue=Math.max(100,Math.floor(Q/8)*8);ue!==y&&v(ue)},L=setTimeout(C,50);C();let z;const T=()=>{clearTimeout(z),z=setTimeout(C,100)};window.addEventListener("resize",T);let E=null;return $.current&&$.current.parentElement&&(E=new ResizeObserver(()=>{T()}),E.observe($.current.parentElement)),()=>{window.removeEventListener("resize",T),clearTimeout(z),clearTimeout(L),E&&E.disconnect()}},[t,y]),u.useEffect(()=>{l&&y>0&&l(y)},[y,l]);const q=y/8,se=u.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(f.isPlaying){const C=f.currentGame,L=f.playingColor;if(C&&L){const z=L==="white"?C.white.time:C.black.time,T=g.preferences.disableAnimationsThreshold;if(z<T)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,f.isPlaying,f.currentGame,f.playingColor]),ae=u.useRef("");u.useEffect(()=>{if(D([]),!se||F||f.isProcessingServerUpdate){U.current=new Map(I);return}const C=U.current;if(d){const{from:L,to:z}=d,T=`${e}-${L}-${z}`;if(ae.current===T){U.current=new Map(I);return}const E=C.get(L),M=I.get(z);if(E&&M===E&&!I.has(L)){if(f.isPlaying&&f.currentGame){const G=f.gameRelation===1,re=f.playingColor,le=re==="white"&&f.currentGame.turn==="b"||re==="black"&&f.currentGame.turn==="w";if(G||le){U.current=new Map(I),ae.current=T;return}}ae.current=T,setTimeout(()=>{D([{piece:E,from:L,to:z,startTime:Date.now()}])},0)}}U.current=new Map(I)},[I,d,se,F,f.isProcessingServerUpdate,e,f]),u.useEffect(()=>{if(F){const C=setTimeout(()=>{B(!1)},50);return()=>clearTimeout(C)}},[e,F]),u.useEffect(()=>{if(R.length===0)return;const C=()=>{const L=Date.now(),z=g.preferences.animationDuration;D(T=>{const E=T.filter(M=>L-M.startTime<z);return E.length>0&&(O.current=requestAnimationFrame(C)),E})};return O.current=requestAnimationFrame(C),()=>{O.current&&cancelAnimationFrame(O.current)}},[R.length,g.preferences.animationDuration]),u.useEffect(()=>{if(p)try{const C=f.currentPosition;f.chessBoard.getFen()!==C&&f.chessBoard.loadFen(C);const z=f.chessBoard.getLegalMoves().filter(E=>E.from==="@"&&E.san.toLowerCase().startsWith(p.toLowerCase())),T=new Set(z.map(E=>E.to));P(T),j(null)}catch(C){console.error("Error getting drop moves:",C),P(new Set)}},[p,f]);const te=u.useCallback((C,L)=>{if(!c)return;const z=I.get(C);if(p){k.has(C)?(s?.(p,C),m?.(null),P(new Set)):(m?.(null),P(new Set));return}if(x)if(k.has(C)){const T=I.get(x);if(T&&ce(T,x,C)){const E=T===T.toUpperCase()?"white":"black";if(f.isPlaying){const M=g.preferences.autoPromotionPiece;f.isMyTurn?(B(!0),o?.(x,C,M)):f.setPremove(x,C,M)}else{const M=L?.currentTarget.getBoundingClientRect();w({from:x,to:C,color:E,position:M?{x:M.left+M.width/2,y:M.top+M.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else f.isPlaying&&!f.isMyTurn?f.setPremove(x,C):(B(!0),o?.(x,C));j(null),P(new Set)}else if(C===x)j(null),P(new Set);else if(z)if(j(C),g.preferences.showLegalMoves)try{const T=f.currentPosition;f.chessBoard.getFen()!==T&&f.chessBoard.loadFen(T);const E=f.chessBoard.getLegalMoves(C),M=new Set(E.map(G=>G.to));P(M)}catch(T){console.error("Error getting legal moves:",T),P(new Set)}else P(new Set);else j(null),P(new Set);else if(z){j(C);try{const T=f.currentPosition;f.chessBoard.getFen()!==T&&f.chessBoard.loadFen(T);const E=z===z.toUpperCase(),M=f.chessBoard.getActiveColor();if(E&&M==="w"||!E&&M==="b")if(g.preferences.showLegalMoves){const re=f.chessBoard.getLegalMoves(C),le=new Set(re.map(A=>A.to));P(le)}else P(new Set);else P(new Set),j(null)}catch(T){console.error("Error getting legal moves:",T),P(new Set)}}},[x,k,I,o,s,c,ce,f,g.preferences.autoPromotionPiece,p,m]),me=u.useCallback((C,L,z)=>{if(!c)return;const T=C.clientX,E=C.clientY;let M=!1,G=!1;const le=C.currentTarget.getBoundingClientRect().width,A=Q=>{const ue=Math.abs(Q.clientX-T),nt=Math.abs(Q.clientY-E);(ue>3||nt>3)&&z&&!G?(M=!0,G=!0,de(L,z,Q,le)):G&&S(ze=>ze?{...ze,x:Q.clientX,y:Q.clientY}:null)},ie=Q=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",ie),G?Ce(Q,L,z):M?(S(null),j(null),P(new Set)):te(L,C)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",ie)},[c,te]),de=u.useCallback((C,L,z,T)=>{if(j(C),g.preferences.showLegalMoves)try{const M=f.currentPosition;f.chessBoard.getFen()!==M&&f.chessBoard.loadFen(M);const G=L===L.toUpperCase(),re=f.chessBoard.getActiveColor();if(G&&re==="w"||!G&&re==="b"){const A=f.chessBoard.getLegalMoves(C),ie=new Set(A.map(Q=>Q.to));P(ie)}else P(new Set)}catch(M){console.error("Error getting legal moves for drag:",M),P(new Set)}else P(new Set);const E={piece:L,from:C,x:z.clientX,y:z.clientY,size:T};S(E)},[g.preferences.showLegalMoves,f]),Ce=u.useCallback((C,L,z)=>{try{const M=document.elementsFromPoint(C.clientX,C.clientY).find(G=>G.getAttribute("data-square"))?.getAttribute("data-square");if(M&&M!==L)if(ce(z,L,M)){const G=z===z.toUpperCase()?"white":"black";if(f.isPlaying){const re=g.preferences.autoPromotionPiece;f.isMyTurn?(B(!0),o?.(L,M,re)):f.setPremove(L,M,re)}else w({from:L,to:M,color:G,position:{x:C.clientX,y:C.clientY}})}else f.isPlaying&&!f.isMyTurn?f.setPremove(L,M):(B(!0),o?.(L,M))}catch(T){console.error("Error in handleDragEnd:",T)}S(null),j(null),P(new Set)},[o,ce,f,g.preferences.autoPromotionPiece]),fe=u.useMemo(()=>{const C=[];for(let L=0;L<8;L++)for(let z=0;z<8;z++){const T=Qc(z,L),E=Jc(z,L,r),M=I.get(E),G=a.has(E),re=d&&(d.from===E||d.to===E),le=x===E,A=k.has(E),ie=b?.from===E;R.some(ze=>ze.to===E);const Q=R.some(ze=>ze.from===E),ue=n&&L===7,nt=n&&z===0;C.push(i.jsxs(qc,{"data-square":E,$isLight:T,$isHighlighted:G,$isLastMoveSquare:!!re,$isSelected:le,$isPossibleMove:A,onMouseDown:ze=>me(ze,E,M),children:[M&&!ie&&!Q&&i.jsx(Ae,{piece:M,size:q},`${M}-${q}`),ue&&i.jsx(un,{$type:"file",$isLight:T,$size:q,"data-settings":"coordinates",className:"coordinate-label",children:r?qe[7-z]:qe[z]}),nt&&i.jsx(un,{$type:"rank",$isLight:T,$size:q,"data-settings":"coordinates",className:"coordinate-label",children:r?Ke[7-L]:Ke[L]})]},E))}return C},[r,n,I,a,d,x,k,b,q,te,me]);return i.jsxs(i.Fragment,{children:[i.jsxs(Yc,{ref:$,$size:y,onContextMenu:Se,"data-settings":"board",className:"chess-board",children:[i.jsx(Vc,{children:fe}),R.map((C,L)=>{const z=ee(C.from,y),T=ee(C.to,y),E=Date.now()-C.startTime,M=g.preferences.animationDuration,G=Math.min(E/M,1),le=(A=>A<.5?4*A*A*A:1-Math.pow(-2*A+2,3)/2)(G);return i.jsx(Xc,{$fromX:z.x,$fromY:z.y,$toX:T.x,$toY:T.y,$progress:le,$size:q,children:i.jsx(Ae,{piece:C.piece,size:q},`${C.piece}-${q}`)},`${C.from}-${C.to}-${C.startTime}`)})]}),b&&i.jsx(i.Fragment,{children:i.jsx(Kc,{$x:b.x,$y:b.y,$size:b.size,children:i.jsx(Ae,{piece:b.piece,size:b.size,isDragging:!0},`${b.piece}-${b.size}-dragging`)})}),W&&i.jsx(Lo,{isOpen:!0,color:W.color,position:W.position,onSelect:C=>{B(!0),o?.(W.from,W.to,C),w(null)},onCancel:()=>w(null)})]})});$r.displayName="ChessBoardWithPieces";const el=h.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,tl=h.span`
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
`,Io=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a,compact:d=!1})=>{const c=p=>{const m=Math.floor(p/3600),g=Math.floor(p%3600/60),f=Math.floor(p%60),$=Math.floor(p%1*10),y=r&&Math.floor(p)%2===0?" ":":";return m>0?`${m}${y}${g.toString().padStart(2,"0")}${y}${f.toString().padStart(2,"0")}`:p<o&&s?`${g}${y}${f.toString().padStart(2,"0")}.${$}`:`${g}${y}${f.toString().padStart(2,"0")}`},l=e<=o&&e>0;return i.jsx(el,{size:t,className:a,children:i.jsx(tl,{$isLowTime:l,$isActive:r,$compact:d,$isFinished:n,children:c(e)})})},rl=h.span`
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
`,nl=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a})=>{const d=p=>{const m=Math.floor(p/3600),g=Math.floor(p%3600/60),f=Math.floor(p%60),$=Math.floor(p%1*10),y=r&&Math.floor(p)%2===0?" ":":";return m>0?`${m}${y}${g.toString().padStart(2,"0")}${y}${f.toString().padStart(2,"0")}`:p<o&&s?`${g}${y}${f.toString().padStart(2,"0")}.${$}`:`${g}${y}${f.toString().padStart(2,"0")}`},c=e<=o&&e>0,l=t==="large"?"48px":t==="medium"?"36px":"24px";return i.jsx(rl,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:l,children:d(e)})},yt=h(nl)`
    /* Additional GameClock-specific styles if needed */
`;h(Io).attrs({size:"small"})`
    font-size: 12px;
`;h(Io).attrs({size:"medium"})`
    font-size: 16px;
`;const ol=h.div`
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
`,il=h.button`
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
`,sl=h.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Ar=X(({playerName:e,position:t,onClose:r})=>{const n=zn(),o=De(),s=u.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];u.useEffect(()=>{const c=p=>{s.current&&!s.current.contains(p.target)&&r()},l=p=>{p.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[r]),u.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),l=window.innerWidth,p=window.innerHeight;let m=t.x,g=t.y;c.right>l&&(m=l-c.width-10),c.bottom>p&&(g=p-c.height-10),(m!==t.x||g!==t.y)&&(s.current.style.left=`${m}px`,s.current.style.top=`${g}px`)}},[t]);const d=c=>{const l=e.replace(/\([^)]*\)/g,"").trim(),p=c.replace("{player}",l);n.sendCommand(p),r()};return i.jsx(ol,{ref:s,$x:t.x,$y:t.y,children:a.map((c,l)=>"divider"in c&&c.divider?i.jsx(sl,{},l):"command"in c?i.jsx(il,{onClick:()=>d(c.command),children:c.label},l):null)})});Ar.displayName="PlayerContextMenu";const al=h.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Ao=({name:e,className:t,style:r,onClick:n})=>{const[o,s]=u.useState(null),a=d=>{d.preventDefault(),d.stopPropagation(),n&&n(),s({x:d.clientX,y:d.clientY})};return i.jsxs(i.Fragment,{children:[i.jsx(al,{className:t,style:r,onClick:a,children:e}),o&&i.jsx(Ar,{playerName:e,position:o,onClose:()=>s(null)})]})};Ao.displayName="PlayerName";const cl=h.div`
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
`,ll=h.div`
  display: flex;
  align-items: center;
  width: 100%;
`,dl=h.div`
  display: flex;
  align-items: center;
  flex: 1;
`,ul=h.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,hl=h.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  margin-left: 4px;
`;h.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${e=>e.$isWhite?"#ffffff":"#000000"};
  border: 1px solid ${e=>e.$isWhite?"#000000":"#ffffff"};
  box-shadow: ${e=>e.theme.shadows.sm};
`;const st=X(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:d=!1,compact:c=!1})=>{const l=i.jsxs(i.Fragment,{children:[i.jsx(ll,{children:i.jsxs(dl,{children:[i.jsx(ul,{children:i.jsx(Ao,{name:e})}),i.jsx(hl,{children:t})]})}),!a&&!d&&i.jsx(yt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return d?l:i.jsx(cl,{$isActive:n,$orientation:s,$compact:c,children:l})});st.displayName="PlayerCard";const pl=h.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,sr=h.div`
  padding: ${e=>e.theme.spacing[1]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[2]};
`,ar=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,ge=h.button`
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
`,ml=h.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,hn=h.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,fl=h.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,pn=h.span`
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
`,qt=X(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:s,className:a,disableAutoScroll:d=!1})=>{const c=u.useRef(null);u.useEffect(()=>{if(!d&&c.current&&t!==void 0){const p=c.current.querySelector(`[data-move-index="${t}"]`);p&&p.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const l=()=>{const p=[];for(let m=0;m<e.length;m+=2){const g=Math.floor(m/2)+1,f=e[m],$=e[m+1];p.push(i.jsxs(hn,{children:[i.jsxs(fl,{children:[g,"."]}),i.jsx(pn,{$isCurrentMove:t===m,onClick:()=>r?.(m),"data-move-index":m,children:cr(f.san)}),$&&i.jsx(pn,{$isCurrentMove:t===m+1,onClick:()=>r?.(m+1),"data-move-index":m+1,children:cr($.san)})]},m))}return p};return i.jsxs(pl,{className:a,children:[o?i.jsx(sr,{children:i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{children:"Moves"}),i.jsxs(ar,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?i.jsxs(sr,{children:[s,i.jsxs(ar,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):i.jsx(sr,{children:i.jsxs(ar,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),i.jsx(ml,{ref:c,children:e.length===0?i.jsx(hn,{children:i.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});qt.displayName="MoveList";const gl=h(yt)`
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
`,xl=h(yt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,at=X(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const s=Ot(),a=o==="landscape"?xl:gl;return i.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});at.displayName="ObservableClock";const yl=h.div`
  position: relative;
  display: inline-block;
`,bl=h.button`
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
`,$l=h.div`
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
`,vl=h.button`
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
`,Dr=X(({color:e,size:t="small"})=>{const r=De(),[n,o]=u.useState(!1),s=u.useRef(null),a=["Q","R","B","N"],d=r.preferences.autoPromotionPiece,c=m=>e==="white"?m:m.toLowerCase();u.useEffect(()=>{const m=g=>{s.current&&!s.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[n]);const l=m=>{r.updatePreference("autoPromotionPiece",m),o(!1)},p=t==="small"?28:36;return i.jsxs(yl,{ref:s,children:[i.jsx(bl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:i.jsx(Ae,{piece:c(d),size:p})}),i.jsx($l,{$isOpen:n,children:a.map(m=>i.jsx(vl,{$size:t,onClick:()=>l(m),title:`Promote to ${m==="Q"?"Queen":m==="R"?"Rook":m==="B"?"Bishop":"Knight"}`,children:i.jsx(Ae,{piece:c(m),size:p})},m))})]})});Dr.displayName="PromotionPieceSelector";const wl=h.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,he=h.button`
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
`,Do=X(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:s,onUnexamine:a,onSetupFEN:d,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:p,canAbort:m,className:g})=>{const f=Ot(),$=()=>i.jsxs(i.Fragment,{children:[m&&i.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),i.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),f.currentGame&&f.currentGame.moveNumber>=2&&i.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(Dr,{color:f.playingColor||"white",size:"medium"})]}),y=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),v=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(he,{onClick:d,$variant:"secondary",children:"FEN"})]});return i.jsxs(wl,{className:g,children:[e==="playing"&&$(),e==="observing"&&y(),e==="examining"&&v(),e==="freestyle"&&x()]})}),be=h(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Do.displayName="GameControls";const mn=h.div`
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
`,fn=h.div`
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
`,kl=h.div`
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
`,gn=h.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,wt=h.div`
  background: transparent;
  transition: all 0.3s ease;
`,xn=h.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,No=X(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Ft().isBottomPlayerWinning;let a,d,c;if(t===50)a=47,d=6,c=47;else if(t>50){const p=t-50;a=50-p,d=p,c=50}else{const p=50-t;a=50,d=p,c=50-p}const l=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const p=t<20;return i.jsxs(mn,{$orientation:r,className:n,children:[i.jsx(fn,{$orientation:r,children:e}),i.jsx(kl,{$needsDarkText:p,children:e}),i.jsxs(gn,{$orientation:r,children:[i.jsx(wt,{style:{height:`${a}%`}}),i.jsx(xn,{$color:l,style:{height:`${d}%`}}),i.jsx(wt,{style:{height:`${c}%`}})]})]})}else return i.jsxs(mn,{$orientation:r,className:n,children:[i.jsx(fn,{$orientation:r,children:e}),i.jsxs(gn,{$orientation:r,children:[i.jsx(wt,{style:{width:`${c}%`}}),i.jsx(xn,{$color:l,style:{width:`${d}%`}}),i.jsx(wt,{style:{width:`${a}%`}})]})]})});No.displayName="EvaluationBar";const Sl=h.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,Cl=h.div`
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
`,vr=X(({orientation:e="vertical",boardSize:t})=>{const r=Ft();return i.jsx(Sl,{$orientation:e,$boardSize:t,children:i.jsx(No,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),wr=X(({className:e})=>{const t=Ft();return i.jsxs(Cl,{className:e,children:[i.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),i.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});vr.displayName="AnalysisDisplay";wr.displayName="AnalysisInfoDisplay";const jl=h.div`
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
`,Pl=h.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Rl=h.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Oo=h.input`
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
`,El=h.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Ml=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,zl=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,yn=h.button`
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
`,Tl=h.button`
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
`,bn=h.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,$n=h.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Ll=h(Oo)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Fo=X(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=u.useState(""),[s,a]=u.useState(""),d=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=u.useCallback(f=>{o(f.target.value),a("")},[]),l=u.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),p=u.useCallback(f=>{const $=typeof f=="function"?f():f;o($),a("");try{r.loadPosition($)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),m=u.useCallback(f=>{f.key==="Enter"&&n.trim()?l():f.key==="Escape"&&t()},[n,l,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>Qo.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?i.jsx(jl,{$isOpen:e,onClick:t,children:i.jsxs(Pl,{onClick:f=>f.stopPropagation(),children:[i.jsx(Rl,{children:"Set Position from FEN"}),i.jsx(Ml,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),i.jsxs(bn,{children:[i.jsx($n,{children:"Current position:"}),i.jsx(Ll,{type:"text",value:d,readOnly:!0,onClick:f=>f.currentTarget.select()})]}),i.jsxs(bn,{children:[i.jsx($n,{children:"Preset position:"}),g.map(f=>i.jsx(Tl,{onClick:()=>p(f.fen),children:f.name},f.name))]}),i.jsx(Oo,{type:"text",value:n,onChange:c,onKeyDown:m,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&i.jsx(El,{children:s}),i.jsxs(zl,{children:[i.jsx(yn,{onClick:t,children:"Cancel"}),i.jsx(yn,{$variant:"primary",onClick:l,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Fo.displayName="FENDialog";const Il=h.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Al=h.div`
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
`,Dl=h.div`
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
`,Nl=h.div`
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
`,Ol=h(Ae)`
  width: 100%;
  height: 100%;
`,ct=X(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:s}=Ee(),a=u.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const m=s.capturedPieces;return t?m.white:m.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),d=u.useMemo(()=>{const p={};return a.forEach(m=>{p[m]=(p[m]||0)+1}),p},[a]),c=["p","n","b","r","q"],l=n?n/8:32;return i.jsx(Il,{$orientation:e,$size:l,className:r,children:i.jsx(Al,{$orientation:e,children:c.map(p=>{const m=d[p]||0,g=t?p.toUpperCase():p;return i.jsx(Dl,{$size:l,onClick:m>0&&o?()=>o(g):void 0,style:{cursor:m>0&&o?"pointer":"default"},children:m>0&&i.jsxs(i.Fragment,{children:[i.jsx(Ol,{piece:g,size:l}),m>1&&i.jsx(Nl,{children:m})]})},p)})})})});ct.displayName="CapturedPieces";const Fl=h.div`
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
`,Bl=h.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Wl=h.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Hl=h.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,_l=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,vn=h.button`
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
`,Ul=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:s,onCancel:a})=>i.jsx(Fl,{$isOpen:e,onClick:a,children:i.jsxs(Bl,{onClick:d=>d.stopPropagation(),children:[i.jsx(Wl,{children:t}),i.jsx(Hl,{children:r}),i.jsxs(_l,{children:[i.jsx(vn,{$variant:"secondary",onClick:a,children:o}),i.jsx(vn,{$variant:"primary",onClick:s,children:n})]})]})}),Gl=h.div`
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
`,wn=h.div`
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
`;h.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    white-space: nowrap;
`;const Yl=h.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Vl=h.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,ql=h.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Kl=h.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Bo=h.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Wo=h.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Xl=h(Bo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Ql=h(Wo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Jl=h(Bo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,Zl=h.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,ed=h(Wo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,kn=h.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Sn=h.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Cn=h.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,jn=h.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Pn=h.div`
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
`,td=h.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,rd=h.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,nd=h.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;h.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    z-index: 1;
    box-shadow: ${e=>e.theme.shadows.sm};
`;h.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    display: flex;
    gap: ${e=>e.theme.spacing[4]};
    align-items: center;
    white-space: nowrap;
`;const od=h.div`
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
`,id=h.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,sd=h.div`
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
`;h.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`;h.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[3]};
    align-items: flex-start;
`;h.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;const ad=h.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,cd=h.div`
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
`;h.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[1]};
    align-items: flex-start;
    width: 100%;
`;const Rn=h.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;h(qt)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const ld=h(qt)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;h(yt)`
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
`;const En=h.div`
    flex: 1;
    display: flex;
`;h(yt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;h.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    justify-content: center;
    width: 100%;
`;const dd=h.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,ud=h.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,hd=h.div`
    position: relative;
    margin-top: 18px;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"100%"};
    display: flex;
    align-items: center;
`;h.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    padding: ${e=>e.theme.spacing[2]};
    align-items: center;
`;h.div`
    min-height: 28px;
`;const pd=h.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,md=h.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,Ho=X(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=Ot(),o=De(),s=Ft(),a=zn(),d=Jo();Ne();const[c,l]=u.useState(!1),[p,m]=u.useState(!1),[g,f]=u.useState(0),[$,y]=u.useState(!1),[v,x]=u.useState(!1),[j,k]=u.useState(null),P=o.preferences.chessOrientation==="landscape",b=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",R=window.innerWidth/window.innerHeight>1.6,D=u.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),O=u.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),W=u.useCallback((A,ie,Q)=>{try{n.makeMove(A,ie,Q)||(console.error("Invalid move:",A,ie),d.playIllegal())}catch(ue){console.error("Error making move:",ue),d.playIllegal()}},[n,d]),w=u.useCallback((A,ie)=>{try{const Q=A.toLowerCase();n.makeSANMove(`${A.toUpperCase()}@${ie}`)||(console.error("Invalid drop:",A,ie),d.playIllegal())}catch(Q){console.error("Error making drop:",Q),d.playIllegal()}},[n,d]),F=u.useCallback(A=>{k(j===A?null:A)},[j]);u.useMemo(()=>{if(n.currentGameInfo){const{white:A,black:ie,timeControl:Q,variant:ue}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ue} ${Q}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const B=(()=>{const A=n.moveHistory.length;if(A>0){const ie=n.moveHistory[A-1],Q=Math.ceil(A/2),ue=A%2===1,nt=cr(ie.san);return`${Q}.${ue?"":".."} ${nt}`}return"Starting position"})(),I=n.currentOpening,U=n.currentGame,ee=U||n.lastGameState,ce=ee?.white||{name:"White",rating:1500,time:900},Se=ee?.black||{name:"Black",rating:1500,time:900},q=!U||U.turn==="w",se=n.shouldShowFlippedBoard,ae=se?ce:Se,te=se?Se:ce,me=se,de=se?q:!q,Ce=u.useCallback(A=>{n.goToMove(A)},[n]);u.useEffect(()=>{s.initialize()},[s]),u.useEffect(()=>{v&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,v,n.isPlaying,a]),u.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),u.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(b):s.stopAnalysis()},[c,b,s]);const fe=u.useCallback(()=>{l(A=>!A)},[]),C=u.useCallback(()=>{m(!0)},[]),L=u.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),z=u.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),T=u.useCallback(()=>{a.sendCommand("unexamine")},[a]),E=u.useCallback(()=>{y(!0)},[]),M=u.useCallback(()=>{a.sendCommand("resign"),y(!1)},[a]),G=u.useCallback(()=>{a.sendCommand("draw"),x(!v)},[a,v]),re=u.useCallback(()=>{a.sendCommand("abort")},[a]),le=()=>i.jsxs(i.Fragment,{children:[i.jsx(wn,{$orientation:"portrait",children:i.jsx(td,{children:i.jsxs(rd,{children:[c&&i.jsx(md,{$boardSize:g,children:i.jsx(vr,{orientation:"vertical",boardSize:g})}),i.jsx(nd,{children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[i.jsxs(Jl,{children:[i.jsxs(kn,{children:["Game #",ee?.gameId||"?"]}),i.jsx(Sn,{children:ee?.timeControl||"?"}),i.jsxs(Zl,{children:[D==="playing"&&i.jsxs(i.Fragment,{children:[n.moveHistory.length<=1&&i.jsx(be,{onClick:re,$variant:"secondary",children:"Abort"}),i.jsx(be,{onClick:G,$variant:"secondary",children:"Draw"}),i.jsx(be,{onClick:E,$variant:"secondary",children:"Resign"}),i.jsx(Dr,{color:n.playingColor||"white",size:"small"})]}),D==="observing"&&i.jsxs(i.Fragment,{children:[i.jsx(be,{onClick:z,$variant:"secondary",children:"Unobserve"}),i.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),D==="examining"&&i.jsxs(i.Fragment,{children:[i.jsx(be,{onClick:T,$variant:"secondary",children:"Unexamine"}),i.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),D==="freestyle"&&i.jsxs(i.Fragment,{children:[i.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"}),i.jsx(be,{onClick:L,$variant:"secondary",children:"Flip"}),i.jsx(be,{onClick:C,$variant:"secondary",children:"FEN"})]})]})]}),i.jsxs(Rn,{children:[i.jsx(at,{player:ae,isActive:de,size:"small",compact:!0}),i.jsx(En,{children:i.jsx(st,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsx(Pn,{$orientation:"portrait",children:i.jsx($r,{position:b,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:W,onDrop:w,interactive:D==="playing"||D==="freestyle"||D==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:j,onCapturedPieceSelect:k})}),i.jsxs(Rn,{children:[i.jsx(at,{player:te,isActive:!de,size:"small",compact:!0}),i.jsx(En,{children:i.jsx(st,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsxs(ed,{children:[i.jsx(Cn,{children:n.premove?`Premove: ${Nr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,b)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(jn,{children:I})]}),c&&i.jsx(pd,{children:i.jsx(wr,{})})]})}),O&&i.jsx(ql,{$squareSize:g?g/8:0,children:i.jsxs(Kl,{$squareSize:g?g/8:0,children:[i.jsx(ct,{orientation:"vertical",isWhitePieces:se,boardSize:g,onPieceClick:F}),i.jsx(ct,{orientation:"vertical",isWhitePieces:!se,boardSize:g,onPieceClick:F})]})})]})})}),i.jsx(od,{$orientation:"portrait",$boardSize:g,children:i.jsx(qt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,disableAutoScroll:!0,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return i.jsxs(Gl,{className:e,$orientation:P?"landscape":"portrait",$hasChat:t,children:[P?i.jsx(i.Fragment,{children:i.jsx(wn,{$orientation:"landscape",children:i.jsxs(id,{children:[i.jsx(ud,{children:c&&i.jsx(hd,{$boardSize:g,children:i.jsx(vr,{orientation:"vertical",boardSize:g})})}),i.jsxs(sd,{$hasAnalysis:c,children:[i.jsxs(Yl,{$isWideAspect:R,children:[i.jsxs(Xl,{$chatWidth:r,$hasAnalysis:c,children:[i.jsxs(kn,{children:["Game #",ee?.gameId||"?"]}),i.jsx(Sn,{children:ee?.timeControl||"?"})]}),i.jsx(Vl,{$orientation:"landscape",children:i.jsx(Pn,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:i.jsx($r,{position:b,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:W,onDrop:w,interactive:D==="playing"||D==="freestyle"||D==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:j,onCapturedPieceSelect:k})})}),i.jsxs(Ql,{$chatWidth:r,$hasAnalysis:c,children:[i.jsx(Cn,{children:n.premove?`Premove: ${Nr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,b)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(jn,{children:I})]}),c&&i.jsx(dd,{$chatWidth:r,$hasAnalysis:c,children:i.jsx(wr,{})})]}),i.jsxs(ad,{$isWideAspect:R,$boardSize:g,children:[O&&i.jsx(ct,{orientation:"horizontal",isWhitePieces:me,boardSize:g,onPieceClick:F}),i.jsx(at,{player:ae,isActive:de,size:"small",compact:!0,variant:"landscape"}),i.jsxs(cd,{children:[i.jsx(st,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"vertical",hideClockInCard:!0,compact:!0}),i.jsx(Do,{perspective:D,canAbort:n.moveHistory.length<=1,onAnalysis:fe,onFlipBoard:L,onSetupFEN:C,onUnobserve:z,onUnexamine:T,onResign:E,onDraw:G,onAbort:re,isAnalysisActive:c,isDrawOffered:v}),i.jsx(ld,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,showHeader:!1,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),i.jsx(st,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),i.jsx(at,{player:te,isActive:!de,size:"small",compact:!0,variant:"landscape"}),O&&i.jsx(ct,{orientation:"horizontal",isWhitePieces:!me,boardSize:g,onPieceClick:F})]})]})]})})}):le(),i.jsx(Fo,{isOpen:p,onClose:()=>m(!1)}),i.jsx(Ul,{isOpen:$,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:M,onCancel:()=>y(!1)})]})});Ho.displayName="ChessGameLayout";const fd=h.div`
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
`,gd=h.div`
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
`,xd=h.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,yd=h.span`
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
`,bd=h.button`
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
`,$d=h.span`
  font-size: 12px;
  opacity: 0.7;
`,_o=X(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=Z.useState(null),[o,s]=Z.useState(null),a=(m,g)=>{n(g),m.dataTransfer.effectAllowed="move"},d=(m,g)=>{m.preventDefault(),m.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},l=(m,g)=>{m.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},p=()=>{n(null),s(null)};return i.jsx(fd,{children:t.map(m=>i.jsxs(gd,{$active:m.id===e.activeTabId,$hasUnread:m.unreadCount>0,$dragging:m.id===r,$dragOver:m.id===o,draggable:!0,onDragStart:g=>a(g,m.id),onDragOver:g=>d(g,m.id),onDragLeave:c,onDrop:g=>l(g,m.id),onDragEnd:p,onClick:()=>e.setActiveTab(m.id),children:[m.type!=="console"&&i.jsx($d,{$type:m.type}),i.jsx(xd,{children:m.type==="channel"?`(${m.name})`:m.name}),m.unreadCount>0&&i.jsx(yd,{children:m.unreadCount>99?"99+":m.unreadCount}),m.id!=="console"&&i.jsx(bd,{onClick:g=>{g.stopPropagation(),e.closeTab(m.id)},title:"Close tab",children:"×"})]},m.id))})});_o.displayName="ChatTabs";function vd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function wd(e){e.scrollTop=e.scrollHeight}function kd(e,t=10){vd(e,t)&&wd(e)}class Uo{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class _{constructor(){this.renderers=new Map}register(t){this.renderers.set(t.type,t)}clear(){this.renderers.clear()}getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}getAllRenderers(){return Array.from(this.renderers.values())}static{this.instance=new _}static register(t){this.instance.register(t)}static getRenderer(t){return this.instance.getRenderer(t)}static getAllRenderers(){return this.instance.getAllRenderers()}static clear(){this.instance.clear()}}const Sd=h.pre`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${e=>e.$fontSize}px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${e=>e.theme.colors.text};
`,Oe=h.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Cd=h.span`
  display: inline;
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  &:hover a {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Go=X(({content:e,ansiColors:t=!0,elements:r=[]})=>{const{ficsStore:n,preferencesStore:o}=Ee(),s=o.getChatAppearance(),[a,d]=u.useState(null),c=e.startsWith(`
`)?e.substring(1):e,l=g=>{if(!t)return g;const f={30:"#000000",31:"#CC0000",32:"#4E9A06",33:"#C4A000",34:"#3465A4",35:"#75507B",36:"#06989A",37:"#D3D7CF",90:"#555753",91:"#EF2929",92:"#8AE234",93:"#FCE94F",94:"#729FCF",95:"#AD7FA8",96:"#34E2E2",97:"#EEEEEC"};return g.replace(/\x1b\[(\d+)m/g,($,y)=>{const v=f[y];return v?`<span style="color: ${v}">`:y==="0"?"</span>":""})},p=g=>{const f=[];if(g.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:|^\s*\w+(?:\([^)]*\))*\((\d+)\):/m)){const y=/(https?:\/\/[^\s]+)\s*$/gm;let v;for(;(v=y.exec(g))!==null;){const x=v[1],j=v.index,k=v.index+v[0].length,P=g.substring(k).match(/^\n\s+([^\s]+)/);if(P&&P[1].match(/[.\/\-?=&]/)){const b=x+P[1],S=k+P[0].length;f.push({start:j,end:S,url:b})}}}return f},m=g=>{const f=l(g),$=p(e),y=[{regex:/(https?:\/\/[^\s]+)/g,handler:(b,S)=>{const R=b[0],D=S||R;return i.jsx(Oe,{href:D,target:"_blank",rel:"noopener noreferrer",onClick:O=>{O.preventDefault(),window.open(D,"_blank")},children:R})}},{regex:/^(\w+) tells you:/gm,handler:b=>{const S=b[1];return i.jsxs("span",{children:[i.jsx(Oe,{onClick:R=>{R.preventDefault(),R.stopPropagation(),d({playerName:S,x:R.clientX,y:R.clientY})},children:S}),b[0].substring(S.length)]},`player-${S}`)}},{regex:/\bGame (\d+)\b/g,handler:b=>i.jsx(Oe,{onClick:S=>{S.preventDefault(),n.sendCommand(`observe ${b[1]}`)},children:b[0]})}];if(t&&f!==g)return i.jsx("span",{dangerouslySetInnerHTML:{__html:f}});let v=0;const x=[],j=[],k=[];return r.forEach(b=>{const S=c!==e?b.start-1:b.start;if(S>=0&&S<g.length){const R=b.type==="command"&&b.text.includes(":")&&(b.text.match(/^\s*\d+\s+/)||b.text.match(/^%\d+:/)||b.text.match(/^\d+:/)),D=(()=>{const O=(()=>{switch(b.type){case"command":return i.jsx(Oe,{onClick:W=>{W.preventDefault(),n.sendCommand(b.action||b.value)},children:b.text});case"player":return i.jsx(Oe,{onClick:W=>{W.preventDefault(),W.stopPropagation(),d({playerName:b.text,x:W.clientX,y:W.clientY})},children:b.text});case"gameNumber":return i.jsx(Oe,{onClick:W=>{W.preventDefault(),n.sendCommand(`observe ${b.value}`)},children:b.text});default:return b.text}})();return R?i.jsx(Cd,{children:O}):O})();k.push({start:S,end:S+b.text.length,render:D,priority:20})}}),$.forEach(b=>{const S=g.substring(b.start).match(/^(https?:\/\/[^\s]+)/);if(S){const R=S[1];k.push({start:b.start,end:b.start+R.length,render:i.jsx(Oe,{href:b.url,target:"_blank",rel:"noopener noreferrer",onClick:D=>{D.preventDefault(),window.open(b.url,"_blank")},children:R}),priority:10}),j.push([b.start,b.end])}}),y.forEach(b=>{const S=new RegExp(b.regex);let R;for(;(R=S.exec(g))!==null;){const D=R.index,O=D+R[0].length;j.some(([w,F])=>D>=w&&D<F||O>w&&O<=F)||k.push({start:D,end:O,render:b.handler(R),priority:1})}}),k.sort((b,S)=>b.start!==S.start?b.start-S.start:S.priority-b.priority),k.filter((b,S)=>{if(S===0)return!0;const R=k[S-1];return b.start>=R.end}).forEach((b,S)=>{b.start>v&&x.push(g.substring(v,b.start)),x.push(i.jsx(Z.Fragment,{children:b.render},S)),v=b.end}),v<g.length&&x.push(g.substring(v)),x.length>0?x:g};return i.jsxs(i.Fragment,{children:[i.jsx(Sd,{$fontSize:s.fontSize,children:m(c)}),a&&i.jsx(Ar,{playerName:a.playerName,position:{x:a.x,y:a.y},onClose:()=>d(null)})]})}),jd=h.div`
  margin: 0;
`;class Pd extends Uo{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t}){const r=t.metadata?.parsedMessage?.elements;return i.jsx(jd,{children:i.jsx(Go,{content:t.content,elements:r})})}}class V extends Uo{render({message:t}){const r=t.metadata?.parsedMessage?.elements;return i.jsx(Go,{content:t.content,elements:r})}}class Rd extends V{constructor(){super(...arguments),this.type="shout"}}class Ed extends V{constructor(){super(...arguments),this.type="cshout"}}class Md extends V{constructor(){super(...arguments),this.type="notification"}}class zd extends V{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Td extends V{constructor(){super(...arguments),this.type="matchRequest"}}class Ld extends V{constructor(){super(...arguments),this.type="illegalMove"}}class Id extends V{constructor(){super(...arguments),this.type="drawOffer"}}class Ad extends V{constructor(){super(...arguments),this.type="unobserve"}}class Dd extends V{constructor(){super(...arguments),this.type="gameNotification"}}class Nd extends V{constructor(){super(...arguments),this.type="whoOutput"}}class Od extends V{constructor(){super(...arguments),this.type="gamesOutput"}}class Fd extends V{constructor(){super(...arguments),this.type="fingerOutput"}}class Bd extends V{constructor(){super(...arguments),this.type="historyOutput"}}class Wd extends V{constructor(){super(...arguments),this.type="journalOutput"}}class Hd extends V{constructor(){super(...arguments),this.type="soughtOutput"}}class _d extends V{constructor(){super(...arguments),this.type="channelListOutput"}}class Ud extends V{constructor(){super(...arguments),this.type="newsOutput"}}class Gd extends V{constructor(){super(...arguments),this.type="inOutput"}}class Yd extends V{constructor(){super(...arguments),this.type="login"}}class Vd extends V{constructor(){super(...arguments),this.type="password"}}class qd extends V{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class Kd extends V{constructor(){super(...arguments),this.type="sessionStart"}}class Xd extends V{constructor(){super(...arguments),this.type="system"}}class Qd extends V{constructor(){super(...arguments),this.type="raw"}}function Jd(){_.clear(),_.register(new Rd),_.register(new Ed),_.register(new Md),_.register(new zd),_.register(new Td),_.register(new Ld),_.register(new Id),_.register(new Ad),_.register(new Dd),_.register(new Nd),_.register(new Od),_.register(new Fd),_.register(new Bd),_.register(new Wd),_.register(new Hd),_.register(new _d),_.register(new Ud),_.register(new Gd),_.register(new Yd),_.register(new Vd),_.register(new qd),_.register(new Kd),_.register(new Xd),_.register(new Qd),_.register(new Pd)}Jd();const lt=X(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=Ee(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,d=s?o.getConsoleColor(s,a):null,c=s?o.getConsoleFont(s,a):null,l=s?o.getConsoleFontStyle(s,a):null,p={...e,metadata:{...e.metadata,color:d,fontFamily:c,fontStyle:l}},m=_.getRenderer(p);return m?i.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:m.render({message:p,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),i.jsx("div",{children:e.content}))});lt.displayName="Message";const kt=h.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,St=h.div`
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
`,Zd=h.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  min-width: 0;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Mn=h.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,eu=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Ct=h.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Yo=X(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),o=u.useRef(null),s=t.activeTab,a=s?.messages||[],d=r.username||"You",c=p=>{r.sendCommand(p)};if(u.useEffect(()=>{if(o.current&&a.length>0){const p=o.current,m=setTimeout(()=>{s?.type==="console"?p.scrollTop=p.scrollHeight:kd(p,50)},50);return()=>clearTimeout(m)}},[a.length,a[a.length-1]?.id]),u.useEffect(()=>{if(o.current&&a.length>0){const p=o.current;requestAnimationFrame(()=>{p.scrollTop=p.scrollHeight})}},[s?.id]),!s)return i.jsx(kt,{children:i.jsx(St,{className:"chat-messages-container",children:i.jsx(Mn,{children:"No active chat"})})});if(a.length===0)return i.jsx(kt,{children:i.jsx(St,{className:"chat-messages-container",children:i.jsx(Mn,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const l=[];return a.forEach((p,m)=>{const g=m>0?a[m-1]:null,f=g?new Date(p.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===p.sender&&g.type===p.type&&f<6e4?l[l.length-1].messages.push(p):l.push({sender:p.sender,timestamp:new Date(p.timestamp),messages:[p]})}),s.type==="console"?i.jsx(kt,{children:i.jsx(St,{ref:o,className:"chat-messages-container",children:a.map(p=>i.jsx(Ct,{children:i.jsx(lt,{message:p,currentUsername:d,onCommandClick:c,onHover:e})},p.id))})}):i.jsx(kt,{children:i.jsx(St,{ref:o,className:"chat-messages-container",children:l.map((p,m)=>p.messages[0].type==="system"?i.jsx(eu,{children:p.messages.map(f=>i.jsx(Ct,{children:i.jsx(lt,{message:f,currentUsername:d,onCommandClick:c,onHover:e})},f.id))},m):i.jsx(Zd,{children:p.messages.map((f,$)=>{if($===0)return i.jsx(Ct,{children:i.jsx(lt,{message:f,currentUsername:d,onCommandClick:c,onHover:e})},f.id);{const y={...f,sender:"",metadata:{...f.metadata,isGroupedMessage:!0}};return i.jsx(Ct,{children:i.jsx(lt,{message:y,currentUsername:d,onCommandClick:c,onHover:e})},f.id)}})},m))})})});Yo.displayName="ChatMessages";const tu=h.div`
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
`,ru=h.textarea`
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
`,nu=h.button`
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
`,Vo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:s=!1})=>{const a=u.useRef(null),d=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e&&r(e)):l.key==="ArrowUp"&&!e?(l.preventDefault(),n?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),n?.("down"))},c=()=>{e&&r(e)};return i.jsxs(tu,{children:[i.jsx(ru,{ref:a,value:e,onChange:l=>t(l.target.value),onKeyDown:d,placeholder:o,disabled:s,autoComplete:"off",spellCheck:"true",rows:1}),i.jsx(nu,{onClick:c,disabled:s||!e,title:"Send message (Enter)",children:"Send"})]})};Vo.displayName="ChatInput";const ou=h.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,iu=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,su=h.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,au=h.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,cu=h.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,lu=h.div`
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
`,qo=X(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=Ee(),[s,a]=u.useState(""),[d,c]=u.useState(!1),[l,p]=u.useState(null);Z.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),Z.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const m=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!f.trim())return;const $=f.split(`
`);if($.length>1){$.forEach(y=>{y&&m(y)}),a("");return}if(r.addToHistory(f),f==="/help"||f==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(f.startsWith("/")||f.startsWith("\\")){const y=f.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const v=y.id.replace("channel-","");n.sendCommand(`tell ${v} ${f}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${f}`);else{const v=f.match(/^tell\s+(\w+)\s+(.+)$/);if(v){const[,x,j]=v,k=x.replace(/\([^)]*\)/g,"").trim(),P=/^\d+$/.test(k);if(P&&o.preferences.openChannelsInTabs){const b=`channel-${k}`;r.createTab(b,k,"channel")}else if(!P&&o.preferences.openTellsInTabs){const b=k.toLowerCase();r.createTab(b,k,"private"),r.addMessage(b,{channel:b,sender:"You",content:j,timestamp:new Date,type:"message"})}}else r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"});n.sendCommand(f)}}a("")},g=f=>{const $=r.navigateHistory(f);$!==null&&a($)};return i.jsxs(ou,{className:e,$compact:t,children:[!t&&i.jsxs(iu,{children:[i.jsx(su,{children:"Chat"}),n.averagePing!==null&&i.jsxs(cu,{children:["Ping: ",n.averagePing,"ms"]}),l&&i.jsxs(au,{children:["Received: ",new Date(l).toLocaleTimeString()]})]}),i.jsxs(lu,{children:[i.jsx(_o,{}),i.jsx(Yo,{onMessageHover:p}),i.jsx(Vo,{value:s,onChange:a,onSend:m,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});qo.displayName="ChatPanel";const du=h.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,uu=h.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,hu=h.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,pu=h.div`
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
`,mu=h.div`
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
`,Ko=X(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Ne(),o=Eo(),s=Mo(),a=Ja(),[d,c]=u.useState(600),[l,p]=u.useState(!1),m=u.useRef(!1);u.useEffect(()=>{!m.current&&r&&(m.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),u.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),u.useEffect(()=>{const v=e.preferences.chessOrientation;s.includes(v)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=v=>{v.preventDefault(),p(!0)};u.useEffect(()=>{if(!l)return;const v=j=>{const k=window.innerWidth-j.clientX;c(Math.max(300,Math.min(600,k))),window.dispatchEvent(new Event("resize"))},x=()=>{p(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",x)}},[l]);const f=t==="chess-only"||t==="chess-and-chat",$=t==="chat-only"||t==="chess-and-chat",y=t==="chess-and-chat"&&!n.isMobile;return i.jsxs(du,{children:[i.jsx(To,{}),i.jsxs(uu,{children:[i.jsx(hu,{$isVisible:f,children:i.jsx(Ho,{hasChat:$,chatWidth:$&&!n.isMobile?d:0})}),y&&i.jsx(mu,{$isVisible:!0,onMouseDown:g,style:{cursor:l?"col-resize":"ew-resize"}}),i.jsx(pu,{$isVisible:$,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:$&&!n.isMobile?`${d}px`:void 0},children:i.jsx(qo,{})})]})]})});Ko.displayName="AppLayout";const fu=Wa`
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
`,gu=()=>i.jsx(Zo,{children:i.jsxs(_a,{children:[i.jsx(fu,{}),i.jsx(Cs,{children:i.jsx(ts,{children:i.jsx(Un,{path:"/",element:i.jsx(ec,{children:i.jsx(Ko,{})})})})})]})}),Xo=document.getElementById("root");if(!Xo)throw new Error("Root element not found");const xu=Tn(Xo);xu.render(i.jsx(gu,{}));
