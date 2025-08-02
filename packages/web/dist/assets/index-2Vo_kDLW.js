import{u as De,j as i,a as Ee,b as Nt,c as Mn,d as cr,e as Ft,V as Qo,f as Jo,l as Dr,R as Zo}from"./shared-CJ5QVAxE.js";import{a as ei,r as p,R as Z}from"./vendor-cxkclgJA.js";import{o as X}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var zn,Or=ei;zn=Or.createRoot,Or.hydrateRoot;var kr={};Object.defineProperty(kr,"__esModule",{value:!0});kr.parse=ai;kr.serialize=ci;const ti=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,ri=/^[\u0021-\u003A\u003C-\u007E]*$/,ni=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,oi=/^[\u0020-\u003A\u003D-\u007E]*$/,ii=Object.prototype.toString,si=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function ai(e,t){const r=new si,n=e.length;if(n<2)return r;const o=t?.decode||li;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const u=e.indexOf(";",s),c=u===-1?n:u;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const l=Nr(e,s,a),d=Fr(e,a,l),h=e.slice(l,d);if(r[h]===void 0){let g=Nr(e,a+1,c),f=Fr(e,c,g);const b=o(e.slice(g,f));r[h]=b}s=c+1}while(s<n);return r}function Nr(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Fr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function ci(e,t,r){const n=r?.encode||encodeURIComponent;if(!ti.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!ri.test(o))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+o;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!ni.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!oi.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!di(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function li(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function di(e){return ii.call(e)==="[object Date]"}var Br="popstate";function ui(e={}){function t(n,o){let{pathname:s,search:a,hash:u}=n.location;return lr("",{pathname:s,search:a,hash:u},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:ut(o)}return pi(t,r,null,e)}function K(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function we(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function hi(){return Math.random().toString(36).substring(2,10)}function Wr(e,t){return{usr:e.state,key:e.key,idx:t}}function lr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?et(t):t,state:r,key:t&&t.key||n||hi()}}function ut({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function et(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function pi(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:s=!1}=n,a=o.history,u="POP",c=null,l=d();l==null&&(l=0,a.replaceState({...a.state,idx:l},""));function d(){return(a.state||{idx:null}).idx}function h(){u="POP";let v=d(),x=v==null?null:v-l;l=v,c&&c({action:u,location:y.location,delta:x})}function g(v,x){u="PUSH";let C=lr(y.location,v,x);l=d()+1;let $=Wr(C,l),w=y.createHref(C);try{a.pushState($,"",w)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;o.location.assign(w)}s&&c&&c({action:u,location:y.location,delta:1})}function f(v,x){u="REPLACE";let C=lr(y.location,v,x);l=d();let $=Wr(C,l),w=y.createHref(C);a.replaceState($,"",w),s&&c&&c({action:u,location:y.location,delta:0})}function b(v){return mi(v)}let y={get action(){return u},get location(){return e(o,a)},listen(v){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Br,h),c=v,()=>{o.removeEventListener(Br,h),c=null}},createHref(v){return t(o,v)},createURL:b,encodeLocation(v){let x=b(v);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:f,go(v){return a.go(v)}};return y}function mi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),K(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:ut(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Tn(e,t,r="/"){return fi(e,t,r,!1)}function fi(e,t,r,n){let o=typeof t=="string"?et(t):t,s=Re(o.pathname||"/",r);if(s==null)return null;let a=Ln(e);gi(a);let u=null;for(let c=0;u==null&&c<a.length;++c){let l=Pi(s);u=Ci(a[c],l,n)}return u}function Ln(e,t=[],r=[],n=""){let o=(s,a,u)=>{let c={relativePath:u===void 0?s.path||"":u,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(K(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let l=Pe([n,c.relativePath]),d=r.concat(c);s.children&&s.children.length>0&&(K(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),Ln(s.children,t,d,l)),!(s.path==null&&!s.index)&&t.push({path:l,score:ki(l,s.index),routesMeta:d})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))o(s,a);else for(let u of In(s.path))o(s,a,u)}),t}function In(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return o?[s,""]:[s];let a=In(n.join("/")),u=[];return u.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&u.push(...a),u.map(c=>e.startsWith("/")&&c===""?"/":c)}function gi(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Si(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var xi=/^:[\w-]+$/,yi=3,bi=2,$i=1,vi=10,wi=-2,Hr=e=>e==="*";function ki(e,t){let r=e.split("/"),n=r.length;return r.some(Hr)&&(n+=wi),t&&(n+=bi),r.filter(o=>!Hr(o)).reduce((o,s)=>o+(xi.test(s)?yi:s===""?$i:vi),n)}function Si(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Ci(e,t,r=!1){let{routesMeta:n}=e,o={},s="/",a=[];for(let u=0;u<n.length;++u){let c=n[u],l=u===n.length-1,d=s==="/"?t:t.slice(s.length)||"/",h=Lt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},d),g=c.route;if(!h&&l&&r&&!n[n.length-1].route.index&&(h=Lt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},d)),!h)return null;Object.assign(o,h.params),a.push({params:o,pathname:Pe([s,h.pathname]),pathnameBase:zi(Pe([s,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(s=Pe([s,h.pathnameBase]))}return a}function Lt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=ji(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),u=o.slice(1);return{params:n.reduce((l,{paramName:d,isOptional:h},g)=>{if(d==="*"){let b=u[g]||"";a=s.slice(0,s.length-b.length).replace(/(.)\/+$/,"$1")}const f=u[g];return h&&!f?l[d]=void 0:l[d]=(f||"").replace(/%2F/g,"/"),l},{}),pathname:s,pathnameBase:a,pattern:e}}function ji(e,t=!1,r=!0){we(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,u,c)=>(n.push({paramName:u,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function Pi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return we(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Re(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ri(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?et(e):e;return{pathname:r?r.startsWith("/")?r:Ei(r,t):t,search:Ti(n),hash:Li(o)}}function Ei(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function Kt(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Mi(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function An(e){let t=Mi(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Dn(e,t,r,n=!1){let o;typeof e=="string"?o=et(e):(o={...e},K(!o.pathname||!o.pathname.includes("?"),Kt("?","pathname","search",o)),K(!o.pathname||!o.pathname.includes("#"),Kt("#","pathname","hash",o)),K(!o.search||!o.search.includes("#"),Kt("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,u;if(a==null)u=r;else{let h=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;o.pathname=g.join("/")}u=h>=0?t[h]:"/"}let c=Ri(o,u),l=a&&a!=="/"&&a.endsWith("/"),d=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(l||d)&&(c.pathname+="/"),c}var Pe=e=>e.join("/").replace(/\/\/+/g,"/"),zi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ti=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Li=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ii(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var On=["POST","PUT","PATCH","DELETE"];new Set(On);var Ai=["GET",...On];new Set(Ai);var tt=p.createContext(null);tt.displayName="DataRouter";var Bt=p.createContext(null);Bt.displayName="DataRouterState";var Nn=p.createContext({isTransitioning:!1});Nn.displayName="ViewTransition";var Di=p.createContext(new Map);Di.displayName="Fetchers";var Oi=p.createContext(null);Oi.displayName="Await";var ke=p.createContext(null);ke.displayName="Navigation";var ft=p.createContext(null);ft.displayName="Location";var Me=p.createContext({outlet:null,matches:[],isDataRoute:!1});Me.displayName="Route";var Sr=p.createContext(null);Sr.displayName="RouteError";function Ni(e,{relative:t}={}){K(gt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=p.useContext(ke),{hash:o,pathname:s,search:a}=xt(e,{relative:t}),u=s;return r!=="/"&&(u=s==="/"?r:Pe([r,s])),n.createHref({pathname:u,search:a,hash:o})}function gt(){return p.useContext(ft)!=null}function _e(){return K(gt(),"useLocation() may be used only in the context of a <Router> component."),p.useContext(ft).location}var Fn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Bn(e){p.useContext(ke).static||p.useLayoutEffect(e)}function Fi(){let{isDataRoute:e}=p.useContext(Me);return e?Ji():Bi()}function Bi(){K(gt(),"useNavigate() may be used only in the context of a <Router> component.");let e=p.useContext(tt),{basename:t,navigator:r}=p.useContext(ke),{matches:n}=p.useContext(Me),{pathname:o}=_e(),s=JSON.stringify(An(n)),a=p.useRef(!1);return Bn(()=>{a.current=!0}),p.useCallback((c,l={})=>{if(we(a.current,Fn),!a.current)return;if(typeof c=="number"){r.go(c);return}let d=Dn(c,JSON.parse(s),o,l.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:Pe([t,d.pathname])),(l.replace?r.replace:r.push)(d,l.state,l)},[t,r,s,o,e])}p.createContext(null);function xt(e,{relative:t}={}){let{matches:r}=p.useContext(Me),{pathname:n}=_e(),o=JSON.stringify(An(r));return p.useMemo(()=>Dn(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Wi(e,t){return Wn(e,t)}function Wn(e,t,r,n){K(gt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=p.useContext(ke),{matches:s}=p.useContext(Me),a=s[s.length-1],u=a?a.params:{},c=a?a.pathname:"/",l=a?a.pathnameBase:"/",d=a&&a.route;{let x=d&&d.path||"";Hn(c,!d||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let h=_e(),g;if(t){let x=typeof t=="string"?et(t):t;K(l==="/"||x.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=h;let f=g.pathname||"/",b=f;if(l!=="/"){let x=l.replace(/^\//,"").split("/");b="/"+f.replace(/^\//,"").split("/").slice(x.length).join("/")}let y=Tn(e,{pathname:b});we(d||y!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),we(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=Yi(y&&y.map(x=>Object.assign({},x,{params:Object.assign({},u,x.params),pathname:Pe([l,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?l:Pe([l,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),s,r,n);return t&&v?p.createElement(ft.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},v):v}function Hi(){let e=Qi(),t=Ii(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=p.createElement(p.Fragment,null,p.createElement("p",null,"💿 Hey developer 👋"),p.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",p.createElement("code",{style:s},"ErrorBoundary")," or"," ",p.createElement("code",{style:s},"errorElement")," prop on your route.")),p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},t),r?p.createElement("pre",{style:o},r):null,a)}var _i=p.createElement(Hi,null),Ui=class extends p.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?p.createElement(Me.Provider,{value:this.props.routeContext},p.createElement(Sr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Gi({routeContext:e,match:t,children:r}){let n=p.useContext(tt);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),p.createElement(Me.Provider,{value:e},r)}function Yi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=r?.errors;if(s!=null){let c=o.findIndex(l=>l.route.id&&s?.[l.route.id]!==void 0);K(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,u=-1;if(r)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(u=c),l.route.id){let{loaderData:d,errors:h}=r,g=l.route.loader&&!d.hasOwnProperty(l.route.id)&&(!h||h[l.route.id]===void 0);if(l.route.lazy||g){a=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((c,l,d)=>{let h,g=!1,f=null,b=null;r&&(h=s&&l.route.id?s[l.route.id]:void 0,f=l.route.errorElement||_i,a&&(u<0&&d===0?(Hn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):u===d&&(g=!0,b=l.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,d+1)),v=()=>{let x;return h?x=f:g?x=b:l.route.Component?x=p.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=c,p.createElement(Gi,{match:l,routeContext:{outlet:c,matches:y,isDataRoute:r!=null},children:x})};return r&&(l.route.ErrorBoundary||l.route.errorElement||d===0)?p.createElement(Ui,{location:r.location,revalidation:r.revalidation,component:f,error:h,children:v(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):v()},null)}function Cr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Vi(e){let t=p.useContext(tt);return K(t,Cr(e)),t}function qi(e){let t=p.useContext(Bt);return K(t,Cr(e)),t}function Ki(e){let t=p.useContext(Me);return K(t,Cr(e)),t}function jr(e){let t=Ki(e),r=t.matches[t.matches.length-1];return K(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Xi(){return jr("useRouteId")}function Qi(){let e=p.useContext(Sr),t=qi("useRouteError"),r=jr("useRouteError");return e!==void 0?e:t.errors?.[r]}function Ji(){let{router:e}=Vi("useNavigate"),t=jr("useNavigate"),r=p.useRef(!1);return Bn(()=>{r.current=!0}),p.useCallback(async(o,s={})=>{we(r.current,Fn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...s}))},[e,t])}var _r={};function Hn(e,t,r){!t&&!_r[e]&&(_r[e]=!0,we(!1,r))}p.memo(Zi);function Zi({routes:e,future:t,state:r}){return Wn(e,void 0,r,t)}function _n(e){K(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function es({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:s=!1}){K(!gt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),u=p.useMemo(()=>({basename:a,navigator:o,static:s,future:{}}),[a,o,s]);typeof r=="string"&&(r=et(r));let{pathname:c="/",search:l="",hash:d="",state:h=null,key:g="default"}=r,f=p.useMemo(()=>{let b=Re(c,a);return b==null?null:{location:{pathname:b,search:l,hash:d,state:h,key:g},navigationType:n}},[a,c,l,d,h,g,n]);return we(f!=null,`<Router basename="${a}"> is not able to match the URL "${c}${l}${d}" because it does not start with the basename, so the <Router> won't render anything.`),f==null?null:p.createElement(ke.Provider,{value:u},p.createElement(ft.Provider,{children:t,value:f}))}function ts({children:e,location:t}){return Wi(dr(e),t)}function dr(e,t=[]){let r=[];return p.Children.forEach(e,(n,o)=>{if(!p.isValidElement(n))return;let s=[...t,o];if(n.type===p.Fragment){r.push.apply(r,dr(n.props.children,s));return}K(n.type===_n,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),K(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=dr(n.props.children,s)),r.push(a)}),r}var jt="get",Pt="application/x-www-form-urlencoded";function Wt(e){return e!=null&&typeof e.tagName=="string"}function rs(e){return Wt(e)&&e.tagName.toLowerCase()==="button"}function ns(e){return Wt(e)&&e.tagName.toLowerCase()==="form"}function os(e){return Wt(e)&&e.tagName.toLowerCase()==="input"}function is(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ss(e,t){return e.button===0&&(!t||t==="_self")&&!is(e)}var bt=null;function as(){if(bt===null)try{new FormData(document.createElement("form"),0),bt=!1}catch{bt=!0}return bt}var cs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Xt(e){return e!=null&&!cs.has(e)?(we(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pt}"`),null):e}function ls(e,t){let r,n,o,s,a;if(ns(e)){let u=e.getAttribute("action");n=u?Re(u,t):null,r=e.getAttribute("method")||jt,o=Xt(e.getAttribute("enctype"))||Pt,s=new FormData(e)}else if(rs(e)||os(e)&&(e.type==="submit"||e.type==="image")){let u=e.form;if(u==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||u.getAttribute("action");if(n=c?Re(c,t):null,r=e.getAttribute("formmethod")||u.getAttribute("method")||jt,o=Xt(e.getAttribute("formenctype"))||Xt(u.getAttribute("enctype"))||Pt,s=new FormData(u,e),!as()){let{name:l,type:d,value:h}=e;if(d==="image"){let g=l?`${l}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else l&&s.append(l,h)}}else{if(Wt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=jt,n=null,o=Pt,a=e}return s&&o==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:s,body:a}}function Pr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function ds(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function us(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function hs(e,t,r){let n=await Promise.all(e.map(async o=>{let s=t.routes[o.route.id];if(s){let a=await ds(s,r);return a.links?a.links():[]}return[]}));return gs(n.flat(1).filter(us).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Ur(e,t,r,n,o,s){let a=(c,l)=>r[l]?c.route.id!==r[l].route.id:!0,u=(c,l)=>r[l].pathname!==c.pathname||r[l].route.path?.endsWith("*")&&r[l].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,l)=>a(c,l)||u(c,l)):s==="data"?t.filter((c,l)=>{let d=n.routes[c.route.id];if(!d||!d.hasLoader)return!1;if(a(c,l)||u(c,l))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function ps(e,t,{includeHydrateFallback:r}={}){return ms(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let s=[o.module];return o.clientActionModule&&(s=s.concat(o.clientActionModule)),o.clientLoaderModule&&(s=s.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(s=s.concat(o.hydrateFallbackModule)),o.imports&&(s=s.concat(o.imports)),s}).flat(1))}function ms(e){return[...new Set(e)]}function fs(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function gs(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let s=JSON.stringify(fs(o));return r.has(s)||(r.add(s),n.push({key:s,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var xs=new Set([100,101,204,205]);function ys(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Re(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Un(){let e=p.useContext(tt);return Pr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function bs(){let e=p.useContext(Bt);return Pr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Rr=p.createContext(void 0);Rr.displayName="FrameworkContext";function Gn(){let e=p.useContext(Rr);return Pr(e,"You must render this element inside a <HydratedRouter> element"),e}function $s(e,t){let r=p.useContext(Rr),[n,o]=p.useState(!1),[s,a]=p.useState(!1),{onFocus:u,onBlur:c,onMouseEnter:l,onMouseLeave:d,onTouchStart:h}=t,g=p.useRef(null);p.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let y=x=>{x.forEach(C=>{a(C.isIntersecting)})},v=new IntersectionObserver(y,{threshold:.5});return g.current&&v.observe(g.current),()=>{v.disconnect()}}},[e]),p.useEffect(()=>{if(n){let y=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(y)}}},[n]);let f=()=>{o(!0)},b=()=>{o(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:ot(u,f),onBlur:ot(c,b),onMouseEnter:ot(l,f),onMouseLeave:ot(d,b),onTouchStart:ot(h,f)}]:[!1,g,{}]}function ot(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function vs({page:e,...t}){let{router:r}=Un(),n=p.useMemo(()=>Tn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?p.createElement(ks,{page:e,matches:n,...t}):null}function ws(e){let{manifest:t,routeModules:r}=Gn(),[n,o]=p.useState([]);return p.useEffect(()=>{let s=!1;return hs(e,t,r).then(a=>{s||o(a)}),()=>{s=!0}},[e,t,r]),n}function ks({page:e,matches:t,...r}){let n=_e(),{manifest:o,routeModules:s}=Gn(),{basename:a}=Un(),{loaderData:u,matches:c}=bs(),l=p.useMemo(()=>Ur(e,t,c,o,n,"data"),[e,t,c,o,n]),d=p.useMemo(()=>Ur(e,t,c,o,n,"assets"),[e,t,c,o,n]),h=p.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let b=new Set,y=!1;if(t.forEach(x=>{let C=o.routes[x.route.id];!C||!C.hasLoader||(!l.some($=>$.route.id===x.route.id)&&x.route.id in u&&s[x.route.id]?.shouldRevalidate||C.hasClientLoader?y=!0:b.add(x.route.id))}),b.size===0)return[];let v=ys(e,a);return y&&b.size>0&&v.searchParams.set("_routes",t.filter(x=>b.has(x.route.id)).map(x=>x.route.id).join(",")),[v.pathname+v.search]},[a,u,n,o,l,t,e,s]),g=p.useMemo(()=>ps(d,o),[d,o]),f=ws(d);return p.createElement(p.Fragment,null,h.map(b=>p.createElement("link",{key:b,rel:"prefetch",as:"fetch",href:b,...r})),g.map(b=>p.createElement("link",{key:b,rel:"modulepreload",href:b,...r})),f.map(({key:b,link:y})=>p.createElement("link",{key:b,...y})))}function Ss(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var Yn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Yn&&(window.__reactRouterVersion="7.6.3")}catch{}function Cs({basename:e,children:t,window:r}){let n=p.useRef();n.current==null&&(n.current=ui({window:r,v5Compat:!0}));let o=n.current,[s,a]=p.useState({action:o.action,location:o.location}),u=p.useCallback(c=>{p.startTransition(()=>a(c))},[a]);return p.useLayoutEffect(()=>o.listen(u),[o,u]),p.createElement(es,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o})}var Vn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,qn=p.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:s,replace:a,state:u,target:c,to:l,preventScrollReset:d,viewTransition:h,...g},f){let{basename:b}=p.useContext(ke),y=typeof l=="string"&&Vn.test(l),v,x=!1;if(typeof l=="string"&&y&&(v=l,Yn))try{let B=new URL(window.location.href),V=l.startsWith("//")?new URL(B.protocol+l):new URL(l),k=Re(V.pathname,b);V.origin===B.origin&&k!=null?l=k+V.search+V.hash:x=!0}catch{we(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let C=Ni(l,{relative:o}),[$,w,S]=$s(n,g),P=Es(l,{replace:a,state:u,target:c,preventScrollReset:d,relative:o,viewTransition:h});function R(B){t&&t(B),B.defaultPrevented||P(B)}let F=p.createElement("a",{...g,...S,href:v||C,onClick:x||s?t:R,ref:Ss(f,w),target:c,"data-discover":!y&&r==="render"?"true":void 0});return $&&!y?p.createElement(p.Fragment,null,F,p.createElement(vs,{page:C})):F});qn.displayName="Link";var js=p.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:s,to:a,viewTransition:u,children:c,...l},d){let h=xt(a,{relative:l.relative}),g=_e(),f=p.useContext(Bt),{navigator:b,basename:y}=p.useContext(ke),v=f!=null&&Is(h)&&u===!0,x=b.encodeLocation?b.encodeLocation(h).pathname:h.pathname,C=g.pathname,$=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;r||(C=C.toLowerCase(),$=$?$.toLowerCase():null,x=x.toLowerCase()),$&&y&&($=Re($,y)||$);const w=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let S=C===x||!o&&C.startsWith(x)&&C.charAt(w)==="/",P=$!=null&&($===x||!o&&$.startsWith(x)&&$.charAt(x.length)==="/"),R={isActive:S,isPending:P,isTransitioning:v},F=S?t:void 0,B;typeof n=="function"?B=n(R):B=[n,S?"active":null,P?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let V=typeof s=="function"?s(R):s;return p.createElement(qn,{...l,"aria-current":F,className:B,ref:d,style:V,to:a,viewTransition:u},typeof c=="function"?c(R):c)});js.displayName="NavLink";var Ps=p.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:s,method:a=jt,action:u,onSubmit:c,relative:l,preventScrollReset:d,viewTransition:h,...g},f)=>{let b=Ts(),y=Ls(u,{relative:l}),v=a.toLowerCase()==="get"?"get":"post",x=typeof u=="string"&&Vn.test(u),C=$=>{if(c&&c($),$.defaultPrevented)return;$.preventDefault();let w=$.nativeEvent.submitter,S=w?.getAttribute("formmethod")||a;b(w||$.currentTarget,{fetcherKey:t,method:S,navigate:r,replace:o,state:s,relative:l,preventScrollReset:d,viewTransition:h})};return p.createElement("form",{ref:f,method:v,action:y,onSubmit:n?c:C,...g,"data-discover":!x&&e==="render"?"true":void 0})});Ps.displayName="Form";function Rs(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Kn(e){let t=p.useContext(tt);return K(t,Rs(e)),t}function Es(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:s,viewTransition:a}={}){let u=Fi(),c=_e(),l=xt(e,{relative:s});return p.useCallback(d=>{if(ss(d,t)){d.preventDefault();let h=r!==void 0?r:ut(c)===ut(l);u(e,{replace:h,state:n,preventScrollReset:o,relative:s,viewTransition:a})}},[c,u,l,r,n,t,e,o,s,a])}var Ms=0,zs=()=>`__${String(++Ms)}__`;function Ts(){let{router:e}=Kn("useSubmit"),{basename:t}=p.useContext(ke),r=Xi();return p.useCallback(async(n,o={})=>{let{action:s,method:a,encType:u,formData:c,body:l}=ls(n,t);if(o.navigate===!1){let d=o.fetcherKey||zs();await e.fetch(d,r,o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||u,flushSync:o.flushSync})}else await e.navigate(o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||u,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Ls(e,{relative:t}={}){let{basename:r}=p.useContext(ke),n=p.useContext(Me);K(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),s={...xt(e||".",{relative:t})},a=_e();if(e==null){s.search=a.search;let u=new URLSearchParams(s.search),c=u.getAll("index");if(c.some(d=>d==="")){u.delete("index"),c.filter(h=>h).forEach(h=>u.append("index",h));let d=u.toString();s.search=d?`?${d}`:""}}return(!e||e===".")&&o.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Pe([r,s.pathname])),ut(s)}function Is(e,t={}){let r=p.useContext(Nn);K(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=Kn("useViewTransitionState"),o=xt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Re(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Re(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Lt(o.pathname,a)!=null||Lt(o.pathname,s)!=null}[...xs];const Xn={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},As={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Ds={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Qn={colors:As,...Xn},Os={colors:Ds,...Xn},Ns={light:Qn,dark:Os},Fs=Qn;var oe=function(){return oe=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},oe.apply(this,arguments)};function ht(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var G="-ms-",dt="-moz-",W="-webkit-",Jn="comm",Ht="rule",Er="decl",Bs="@import",Zn="@keyframes",Ws="@layer",eo=Math.abs,Mr=String.fromCharCode,ur=Object.assign;function Hs(e,t){return ne(e,0)^45?(((t<<2^ne(e,0))<<2^ne(e,1))<<2^ne(e,2))<<2^ne(e,3):0}function to(e){return e.trim()}function je(e,t){return(e=t.exec(e))?e[0]:e}function D(e,t,r){return e.replace(t,r)}function Rt(e,t,r){return e.indexOf(t,r)}function ne(e,t){return e.charCodeAt(t)|0}function Xe(e,t,r){return e.slice(t,r)}function $e(e){return e.length}function ro(e){return e.length}function it(e,t){return t.push(e),e}function _s(e,t){return e.map(t).join("")}function Gr(e,t){return e.filter(function(r){return!je(r,t)})}var _t=1,Qe=1,no=0,xe=0,J=0,rt="";function Ut(e,t,r,n,o,s,a,u){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:_t,column:Qe,length:a,return:"",siblings:u}}function Le(e,t){return ur(Ut("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ue(e){for(;e.root;)e=Le(e.root,{children:[e]});it(e,e.siblings)}function Us(){return J}function Gs(){return J=xe>0?ne(rt,--xe):0,Qe--,J===10&&(Qe=1,_t--),J}function ye(){return J=xe<no?ne(rt,xe++):0,Qe++,J===10&&(Qe=1,_t++),J}function Be(){return ne(rt,xe)}function Et(){return xe}function Gt(e,t){return Xe(rt,e,t)}function hr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ys(e){return _t=Qe=1,no=$e(rt=e),xe=0,[]}function Vs(e){return rt="",e}function Qt(e){return to(Gt(xe-1,pr(e===91?e+2:e===40?e+1:e)))}function qs(e){for(;(J=Be())&&J<33;)ye();return hr(e)>2||hr(J)>3?"":" "}function Ks(e,t){for(;--t&&ye()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return Gt(e,Et()+(t<6&&Be()==32&&ye()==32))}function pr(e){for(;ye();)switch(J){case e:return xe;case 34:case 39:e!==34&&e!==39&&pr(J);break;case 40:e===41&&pr(e);break;case 92:ye();break}return xe}function Xs(e,t){for(;ye()&&e+J!==57;)if(e+J===84&&Be()===47)break;return"/*"+Gt(t,xe-1)+"*"+Mr(e===47?e:ye())}function Qs(e){for(;!hr(Be());)ye();return Gt(e,xe)}function Js(e){return Vs(Mt("",null,null,null,[""],e=Ys(e),0,[0],e))}function Mt(e,t,r,n,o,s,a,u,c){for(var l=0,d=0,h=a,g=0,f=0,b=0,y=1,v=1,x=1,C=0,$="",w=o,S=s,P=n,R=$;v;)switch(b=C,C=ye()){case 40:if(b!=108&&ne(R,h-1)==58){Rt(R+=D(Qt(C),"&","&\f"),"&\f",eo(l?u[l-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:R+=Qt(C);break;case 9:case 10:case 13:case 32:R+=qs(b);break;case 92:R+=Ks(Et()-1,7);continue;case 47:switch(Be()){case 42:case 47:it(Zs(Xs(ye(),Et()),t,r,c),c);break;default:R+="/"}break;case 123*y:u[l++]=$e(R)*x;case 125*y:case 59:case 0:switch(C){case 0:case 125:v=0;case 59+d:x==-1&&(R=D(R,/\f/g,"")),f>0&&$e(R)-h&&it(f>32?Vr(R+";",n,r,h-1,c):Vr(D(R," ","")+";",n,r,h-2,c),c);break;case 59:R+=";";default:if(it(P=Yr(R,t,r,l,d,o,u,$,w=[],S=[],h,s),s),C===123)if(d===0)Mt(R,t,P,P,w,s,h,u,S);else switch(g===99&&ne(R,3)===110?100:g){case 100:case 108:case 109:case 115:Mt(e,P,P,n&&it(Yr(e,P,P,0,0,o,u,$,o,w=[],h,S),S),o,S,h,u,n?w:S);break;default:Mt(R,P,P,P,[""],S,0,u,S)}}l=d=f=0,y=x=1,$=R="",h=a;break;case 58:h=1+$e(R),f=b;default:if(y<1){if(C==123)--y;else if(C==125&&y++==0&&Gs()==125)continue}switch(R+=Mr(C),C*y){case 38:x=d>0?1:(R+="\f",-1);break;case 44:u[l++]=($e(R)-1)*x,x=1;break;case 64:Be()===45&&(R+=Qt(ye())),g=Be(),d=h=$e($=R+=Qs(Et())),C++;break;case 45:b===45&&$e(R)==2&&(y=0)}}return s}function Yr(e,t,r,n,o,s,a,u,c,l,d,h){for(var g=o-1,f=o===0?s:[""],b=ro(f),y=0,v=0,x=0;y<n;++y)for(var C=0,$=Xe(e,g+1,g=eo(v=a[y])),w=e;C<b;++C)(w=to(v>0?f[C]+" "+$:D($,/&\f/g,f[C])))&&(c[x++]=w);return Ut(e,t,r,o===0?Ht:u,c,l,d,h)}function Zs(e,t,r,n){return Ut(e,t,r,Jn,Mr(Us()),Xe(e,2,-2),0,n)}function Vr(e,t,r,n,o){return Ut(e,t,r,Er,Xe(e,0,n),Xe(e,n+1,-1),n,o)}function oo(e,t,r){switch(Hs(e,t)){case 5103:return W+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return W+e+e;case 4789:return dt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return W+e+dt+e+G+e+e;case 5936:switch(ne(e,t+11)){case 114:return W+e+G+D(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return W+e+G+D(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return W+e+G+D(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return W+e+G+e+e;case 6165:return W+e+G+"flex-"+e+e;case 5187:return W+e+D(e,/(\w+).+(:[^]+)/,W+"box-$1$2"+G+"flex-$1$2")+e;case 5443:return W+e+G+"flex-item-"+D(e,/flex-|-self/g,"")+(je(e,/flex-|baseline/)?"":G+"grid-row-"+D(e,/flex-|-self/g,""))+e;case 4675:return W+e+G+"flex-line-pack"+D(e,/align-content|flex-|-self/g,"")+e;case 5548:return W+e+G+D(e,"shrink","negative")+e;case 5292:return W+e+G+D(e,"basis","preferred-size")+e;case 6060:return W+"box-"+D(e,"-grow","")+W+e+G+D(e,"grow","positive")+e;case 4554:return W+D(e,/([^-])(transform)/g,"$1"+W+"$2")+e;case 6187:return D(D(D(e,/(zoom-|grab)/,W+"$1"),/(image-set)/,W+"$1"),e,"")+e;case 5495:case 3959:return D(e,/(image-set\([^]*)/,W+"$1$`$1");case 4968:return D(D(e,/(.+:)(flex-)?(.*)/,W+"box-pack:$3"+G+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+W+e+e;case 4200:if(!je(e,/flex-|baseline/))return G+"grid-column-align"+Xe(e,t)+e;break;case 2592:case 3360:return G+D(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,je(n.props,/grid-\w+-end/)})?~Rt(e+(r=r[t].value),"span",0)?e:G+D(e,"-start","")+e+G+"grid-row-span:"+(~Rt(r,"span",0)?je(r,/\d+/):+je(r,/\d+/)-+je(e,/\d+/))+";":G+D(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return je(n.props,/grid-\w+-start/)})?e:G+D(D(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return D(e,/(.+)-inline(.+)/,W+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if($e(e)-1-t>6)switch(ne(e,t+1)){case 109:if(ne(e,t+4)!==45)break;case 102:return D(e,/(.+:)(.+)-([^]+)/,"$1"+W+"$2-$3$1"+dt+(ne(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Rt(e,"stretch",0)?oo(D(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return D(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,u,c,l){return G+o+":"+s+l+(a?G+o+"-span:"+(u?c:+c-+s)+l:"")+e});case 4949:if(ne(e,t+6)===121)return D(e,":",":"+W)+e;break;case 6444:switch(ne(e,ne(e,14)===45?18:11)){case 120:return D(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+W+(ne(e,14)===45?"inline-":"")+"box$3$1"+W+"$2$3$1"+G+"$2box$3")+e;case 100:return D(e,":",":"+G)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return D(e,"scroll-","scroll-snap-")+e}return e}function It(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function ea(e,t,r,n){switch(e.type){case Ws:if(e.children.length)break;case Bs:case Er:return e.return=e.return||e.value;case Jn:return"";case Zn:return e.return=e.value+"{"+It(e.children,n)+"}";case Ht:if(!$e(e.value=e.props.join(",")))return""}return $e(r=It(e.children,n))?e.return=e.value+"{"+r+"}":""}function ta(e){var t=ro(e);return function(r,n,o,s){for(var a="",u=0;u<t;u++)a+=e[u](r,n,o,s)||"";return a}}function ra(e){return function(t){t.root||(t=t.return)&&e(t)}}function na(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Er:e.return=oo(e.value,e.length,r);return;case Zn:return It([Le(e,{value:D(e.value,"@","@"+W)})],n);case Ht:if(e.length)return _s(r=e.props,function(o){switch(je(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ue(Le(e,{props:[D(o,/:(read-\w+)/,":"+dt+"$1")]})),Ue(Le(e,{props:[o]})),ur(e,{props:Gr(r,n)});break;case"::placeholder":Ue(Le(e,{props:[D(o,/:(plac\w+)/,":"+W+"input-$1")]})),Ue(Le(e,{props:[D(o,/:(plac\w+)/,":"+dt+"$1")]})),Ue(Le(e,{props:[D(o,/:(plac\w+)/,G+"input-$1")]})),Ue(Le(e,{props:[o]})),ur(e,{props:Gr(r,n)});break}return""})}}var oa={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},Je=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",io="active",so="data-styled-version",Yt="6.1.19",zr=`/*!sc*/
`,At=typeof window<"u"&&typeof document<"u",ia=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),sa={},Vt=Object.freeze([]),Ze=Object.freeze({});function ao(e,t,r){return r===void 0&&(r=Ze),e.theme!==r.theme&&e.theme||t||r.theme}var co=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),aa=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ca=/(^-|-$)/g;function qr(e){return e.replace(aa,"-").replace(ca,"")}var la=/(a)(d)/gi,$t=52,Kr=function(e){return String.fromCharCode(e+(e>25?39:97))};function mr(e){var t,r="";for(t=Math.abs(e);t>$t;t=t/$t|0)r=Kr(t%$t)+r;return(Kr(t%$t)+r).replace(la,"$1-$2")}var Jt,lo=5381,Ve=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},uo=function(e){return Ve(lo,e)};function ho(e){return mr(uo(e)>>>0)}function da(e){return e.displayName||e.name||"Component"}function Zt(e){return typeof e=="string"&&!0}var po=typeof Symbol=="function"&&Symbol.for,mo=po?Symbol.for("react.memo"):60115,ua=po?Symbol.for("react.forward_ref"):60112,ha={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},pa={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},fo={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ma=((Jt={})[ua]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Jt[mo]=fo,Jt);function Xr(e){return("type"in(t=e)&&t.type.$$typeof)===mo?fo:"$$typeof"in e?ma[e.$$typeof]:ha;var t}var fa=Object.defineProperty,ga=Object.getOwnPropertyNames,Qr=Object.getOwnPropertySymbols,xa=Object.getOwnPropertyDescriptor,ya=Object.getPrototypeOf,Jr=Object.prototype;function go(e,t,r){if(typeof t!="string"){if(Jr){var n=ya(t);n&&n!==Jr&&go(e,n,r)}var o=ga(t);Qr&&(o=o.concat(Qr(t)));for(var s=Xr(e),a=Xr(t),u=0;u<o.length;++u){var c=o[u];if(!(c in pa||r&&r[c]||a&&c in a||s&&c in s)){var l=xa(t,c);try{fa(e,c,l)}catch{}}}}return e}function We(e){return typeof e=="function"}function Tr(e){return typeof e=="object"&&"styledComponentId"in e}function Fe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function fr(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function pt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function gr(e,t,r){if(r===void 0&&(r=!1),!r&&!pt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=gr(e[n],t[n]);else if(pt(t))for(var n in t)e[n]=gr(e[n],t[n]);return e}function Lr(e,t){Object.defineProperty(e,"toString",{value:t})}function He(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ba=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw He(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var u=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(u,r[a])&&(this.groupSizes[t]++,u++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(zr);return r},e}(),zt=new Map,Dt=new Map,Tt=1,vt=function(e){if(zt.has(e))return zt.get(e);for(;Dt.has(Tt);)Tt++;var t=Tt++;return zt.set(e,t),Dt.set(t,e),t},$a=function(e,t){Tt=t+1,zt.set(e,t),Dt.set(t,e)},va="style[".concat(Je,"][").concat(so,'="').concat(Yt,'"]'),wa=new RegExp("^".concat(Je,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ka=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},Sa=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(zr),o=[],s=0,a=n.length;s<a;s++){var u=n[s].trim();if(u){var c=u.match(wa);if(c){var l=0|parseInt(c[1],10),d=c[2];l!==0&&($a(d,l),ka(e,d,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(u)}}},Zr=function(e){for(var t=document.querySelectorAll(va),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Je)!==io&&(Sa(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Ca(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var xo=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(u){var c=Array.from(u.querySelectorAll("style[".concat(Je,"]")));return c[c.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(Je,io),n.setAttribute(so,Yt);var a=Ca();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},ja=function(){function e(t){this.element=xo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var a=n[o];if(a.ownerNode===r)return a}throw He(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Pa=function(){function e(t){this.element=xo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Ra=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),en=At,Ea={isServer:!At,useCSSOMInjection:!ia},Ot=function(){function e(t,r,n){t===void 0&&(t=Ze),r===void 0&&(r={});var o=this;this.options=oe(oe({},Ea),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&At&&en&&(en=!1,Zr(this)),Lr(this,function(){return function(s){for(var a=s.getTag(),u=a.length,c="",l=function(h){var g=function(x){return Dt.get(x)}(h);if(g===void 0)return"continue";var f=s.names.get(g),b=a.getGroup(h);if(f===void 0||!f.size||b.length===0)return"continue";var y="".concat(Je,".g").concat(h,'[id="').concat(g,'"]'),v="";f!==void 0&&f.forEach(function(x){x.length>0&&(v+="".concat(x,","))}),c+="".concat(b).concat(y,'{content:"').concat(v,'"}').concat(zr)},d=0;d<u;d++)l(d);return c}(o)})}return e.registerId=function(t){return vt(t)},e.prototype.rehydrate=function(){!this.server&&At&&Zr(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(oe(oe({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Ra(o):n?new ja(o):new Pa(o)}(this.options),new ba(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(vt(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(vt(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(vt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ma=/&/g,za=/^\s*\/\/.*$/gm;function yo(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=yo(r.children,t)),r})}function Ta(e){var t,r,n,o=Ze,s=o.options,a=s===void 0?Ze:s,u=o.plugins,c=u===void 0?Vt:u,l=function(g,f,b){return b.startsWith(r)&&b.endsWith(r)&&b.replaceAll(r,"").length>0?".".concat(t):g},d=c.slice();d.push(function(g){g.type===Ht&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Ma,r).replace(n,l))}),a.prefix&&d.push(na),d.push(ea);var h=function(g,f,b,y){f===void 0&&(f=""),b===void 0&&(b=""),y===void 0&&(y="&"),t=y,r=f,n=new RegExp("\\".concat(r,"\\b"),"g");var v=g.replace(za,""),x=Js(b||f?"".concat(b," ").concat(f," { ").concat(v," }"):v);a.namespace&&(x=yo(x,a.namespace));var C=[];return It(x,ta(d.concat(ra(function($){return C.push($)})))),C};return h.hash=c.length?c.reduce(function(g,f){return f.name||He(15),Ve(g,f.name)},lo).toString():"",h}var La=new Ot,xr=Ta(),bo=Z.createContext({shouldForwardProp:void 0,styleSheet:La,stylis:xr});bo.Consumer;Z.createContext(void 0);function yr(){return p.useContext(bo)}var Ia=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=xr);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Lr(this,function(){throw He(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=xr),this.name+t.hash},e}(),Aa=function(e){return e>="A"&&e<="Z"};function tn(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Aa(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var $o=function(e){return e==null||e===!1||e===""},vo=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!$o(s)&&(Array.isArray(s)&&s.isCss||We(s)?n.push("".concat(tn(o),":"),s,";"):pt(s)?n.push.apply(n,ht(ht(["".concat(o," {")],vo(s),!1),["}"],!1)):n.push("".concat(tn(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in oa||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ie(e,t,r,n){if($o(e))return[];if(Tr(e))return[".".concat(e.styledComponentId)];if(We(e)){if(!We(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return Ie(o,t,r,n)}var s;return e instanceof Ia?r?(e.inject(r,n),[e.getName(n)]):[e]:pt(e)?vo(e):Array.isArray(e)?Array.prototype.concat.apply(Vt,e.map(function(a){return Ie(a,t,r,n)})):[e.toString()]}function wo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(We(r)&&!Tr(r))return!1}return!0}var Da=uo(Yt),Oa=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&wo(t),this.componentId=r,this.baseHash=Ve(Da,r),this.baseStyle=n,Ot.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Fe(o,this.staticRulesId);else{var s=fr(Ie(this.rules,t,r,n)),a=mr(Ve(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var u=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,u)}o=Fe(o,a),this.staticRulesId=a}else{for(var c=Ve(this.baseHash,n.hash),l="",d=0;d<this.rules.length;d++){var h=this.rules[d];if(typeof h=="string")l+=h;else if(h){var g=fr(Ie(h,t,r,n));c=Ve(c,g+d),l+=g}}if(l){var f=mr(c>>>0);r.hasNameForId(this.componentId,f)||r.insertRules(this.componentId,f,n(l,".".concat(f),void 0,this.componentId)),o=Fe(o,f)}}return o},e}(),mt=Z.createContext(void 0);mt.Consumer;function Na(e){var t=Z.useContext(mt),r=p.useMemo(function(){return function(n,o){if(!n)throw He(14);if(We(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw He(8);return o?oe(oe({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?Z.createElement(mt.Provider,{value:r},e.children):null}var er={};function Fa(e,t,r){var n=Tr(e),o=e,s=!Zt(e),a=t.attrs,u=a===void 0?Vt:a,c=t.componentId,l=c===void 0?function(w,S){var P=typeof w!="string"?"sc":qr(w);er[P]=(er[P]||0)+1;var R="".concat(P,"-").concat(ho(Yt+P+er[P]));return S?"".concat(S,"-").concat(R):R}(t.displayName,t.parentComponentId):c,d=t.displayName,h=d===void 0?function(w){return Zt(w)?"styled.".concat(w):"Styled(".concat(da(w),")")}(e):d,g=t.displayName&&t.componentId?"".concat(qr(t.displayName),"-").concat(t.componentId):t.componentId||l,f=n&&o.attrs?o.attrs.concat(u).filter(Boolean):u,b=t.shouldForwardProp;if(n&&o.shouldForwardProp){var y=o.shouldForwardProp;if(t.shouldForwardProp){var v=t.shouldForwardProp;b=function(w,S){return y(w,S)&&v(w,S)}}else b=y}var x=new Oa(r,g,n?o.componentStyle:void 0);function C(w,S){return function(P,R,F){var B=P.attrs,V=P.componentStyle,k=P.defaultProps,O=P.foldedComponentIds,N=P.styledComponentId,I=P.target,_=Z.useContext(mt),ee=yr(),ce=P.shouldForwardProp||ee.shouldForwardProp,Se=ao(R,_,k)||Ze,q=function(Ce,fe,j){for(var L,z=oe(oe({},fe),{className:void 0,theme:j}),T=0;T<Ce.length;T+=1){var E=We(L=Ce[T])?L(z):L;for(var M in E)z[M]=M==="className"?Fe(z[M],E[M]):M==="style"?oe(oe({},z[M]),E[M]):E[M]}return fe.className&&(z.className=Fe(z.className,fe.className)),z}(B,R,Se),se=q.as||I,ae={};for(var te in q)q[te]===void 0||te[0]==="$"||te==="as"||te==="theme"&&q.theme===Se||(te==="forwardedAs"?ae.as=q.forwardedAs:ce&&!ce(te,se)||(ae[te]=q[te]));var me=function(Ce,fe){var j=yr(),L=Ce.generateAndInjectStyles(fe,j.styleSheet,j.stylis);return L}(V,q),de=Fe(O,N);return me&&(de+=" "+me),q.className&&(de+=" "+q.className),ae[Zt(se)&&!co.has(se)?"class":"className"]=de,F&&(ae.ref=F),p.createElement(se,ae)}($,w,S)}C.displayName=h;var $=Z.forwardRef(C);return $.attrs=f,$.componentStyle=x,$.displayName=h,$.shouldForwardProp=b,$.foldedComponentIds=n?Fe(o.foldedComponentIds,o.styledComponentId):"",$.styledComponentId=g,$.target=n?o.target:e,Object.defineProperty($,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(w){this._foldedDefaultProps=n?function(S){for(var P=[],R=1;R<arguments.length;R++)P[R-1]=arguments[R];for(var F=0,B=P;F<B.length;F++)gr(S,B[F],!0);return S}({},o.defaultProps,w):w}}),Lr($,function(){return".".concat($.styledComponentId)}),s&&go($,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),$}function rn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var nn=function(e){return Object.assign(e,{isCss:!0})};function ve(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(We(e)||pt(e))return nn(Ie(rn(Vt,ht([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Ie(n):nn(Ie(rn(n,t)))}function br(e,t,r){if(r===void 0&&(r=Ze),!t)throw He(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,ve.apply(void 0,ht([o],s,!1)))};return n.attrs=function(o){return br(e,t,oe(oe({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return br(e,t,oe(oe({},r),o))},n}var ko=function(e){return br(Fa,e)},m=ko;co.forEach(function(e){m[e]=ko(e)});var Ba=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=wo(t),Ot.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o(fr(Ie(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Ot.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Wa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=ve.apply(void 0,ht([e],t,!1)),o="sc-global-".concat(ho(JSON.stringify(n))),s=new Ba(n,o),a=function(c){var l=yr(),d=Z.useContext(mt),h=Z.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&u(h,c,l.styleSheet,d,l.stylis),Z.useLayoutEffect(function(){if(!l.styleSheet.server)return u(h,c,l.styleSheet,d,l.stylis),function(){return s.removeStyles(h,l.styleSheet)}},[h,c,l.styleSheet,d,l.stylis]),null};function u(c,l,d,h,g){if(s.isStatic)s.renderStyles(c,sa,d,g);else{var f=oe(oe({},l),{theme:ao(l,h,a.defaultProps)});s.renderStyles(c,f,d,g)}}return Z.memo(a)}const So=p.createContext(void 0),Co=()=>{const e=p.useContext(So);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ha=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",_a=X(({children:e})=>{const t=De(),r=t.preferences.theme||"system",o=r==="system"?Ha():r,s=Ns[o]||Fs,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},u={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return p.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),l=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",l),()=>c.removeEventListener("change",l)}},[r,t]),p.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([l,d])=>{typeof d=="string"?c.style.setProperty(`--color-${l}`,d):typeof d=="object"&&d!==null&&Object.entries(d).forEach(([h,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${l}-${h}`,g)})}),Object.entries(a.spacing).forEach(([l,d])=>{c.style.setProperty(`--spacing-${l}`,d)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),i.jsx(So.Provider,{value:u,children:i.jsx(Na,{theme:a,children:e})})});function Ua(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ga(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var tr=typeof window<"u",Ya=function(e){p.useEffect(e,[])},Va=function(e){var t=p.useRef(e);t.current=e,Ya(function(){return function(){return t.current()}})},qa=function(e){var t=p.useRef(0),r=p.useState(e),n=r[0],o=r[1],s=p.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Va(function(){cancelAnimationFrame(t.current)}),[n,s]},jo=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,s=o===void 0?1/0:o,a=t.onChange,u=qa({width:tr?window.innerWidth:n,height:tr?window.innerHeight:s}),c=u[0],l=u[1];return p.useEffect(function(){if(tr){var d=function(){var h=window.innerWidth,g=window.innerHeight;l({width:h,height:g}),a&&a(h,g)};return Ua(window,"resize",d),function(){Ga(window,"resize",d)}}},[]),c};const Ir=()=>{const{width:e=0,height:t=0}=jo();return{width:e,height:t}},Ka=()=>{const{width:e=0,height:t=0}=jo();return e>t?"landscape":"portrait"},Xa=()=>{const{width:e}=Ir(),{theme:t}=Co(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Po=()=>{const[e,t]=p.useState(!1);return p.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Qa=()=>{const[e,t]=p.useState(!1),r=Po(),{width:n}=Ir();return p.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),u=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||u&&c})())},[r,n]),e},Oe=()=>{const e=Ir(),t=Ka(),r=Xa(),n=Po(),o=Qa();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},Ro=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Eo=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},Ja=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},Za=p.createContext(void 0),ec=({children:e})=>{const t=De(),r=Oe(),[n,o]=p.useState(!0),[s,a]=p.useState(["chat","moves"]),[u,c]=p.useState(!1),l=t.preferences.layout,d=p.useMemo(()=>l==="auto"?r.orientation:l,[l,r.orientation]),h=p.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=y=>{t.updatePreference("layout",y)},f=y=>{a(v=>v.includes(y)?v.filter(x=>x!==y):[...v,y])};p.useEffect(()=>{c(!0),o(v=>{const x=!h;return v!==x?x:v}),a(v=>{if(h&&d==="portrait"){const x=["chat"];return JSON.stringify(v)!==JSON.stringify(x)?x:v}else if(d==="landscape"&&!h){const x=["chat","moves","analysis"];return JSON.stringify(v)!==JSON.stringify(x)?x:v}return v});const y=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(y)},[d,h]);const b={...r,layoutPreference:l,setLayoutPreference:g,activeLayout:d,isCompactMode:h,showSidebar:n,setSidebarVisible:o,activePanels:s,togglePanel:f,isTransitioning:u};return i.jsx(Za.Provider,{value:b,children:e})};m.div`
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
`,nc=({settingId:e,onUpload:t})=>{const r=p.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const l=new FileReader;l.onload=d=>{const h=d.target?.result;t(e,h,a.name)},l.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return i.jsxs(i.Fragment,{children:[i.jsx(tc,{ref:r,type:"file",accept:"audio/*",onChange:n}),i.jsx(rc,{type:"button",onClick:o,children:"Upload"})]})},oc=m.div`
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
`,Mo=X(({isOpen:e,onClose:t})=>{const r=De(),{settingsRegistry:n}=r,o=Oe(),s=o.isMobileDevice||o.dimensions.width<768,[a,u]=p.useState("board"),[c,l]=p.useState(""),[d,h]=p.useState({}),[g,f]=p.useState({x:0,y:0}),[b,y]=p.useState(!1),[v,x]=p.useState({x:0,y:0}),C=p.useRef(null);if(p.useEffect(()=>{if(e&&C.current&&!s){const k=C.current.getBoundingClientRect();f({x:(window.innerWidth-k.width)/2,y:(window.innerHeight-k.height)/2})}},[e,s]),p.useEffect(()=>{if(!b)return;const k=N=>{f({x:N.clientX-v.x,y:N.clientY-v.y})},O=()=>{y(!1)};return document.addEventListener("mousemove",k),document.addEventListener("mouseup",O),()=>{document.removeEventListener("mousemove",k),document.removeEventListener("mouseup",O)}},[b,v]),!e)return null;const $=n.getAllCategories(),w=c?n.search(c):n.getByCategory(a),S=(k,O)=>{const N=n.get(k);if(N){if(N.validate){const I=N.validate(O);if(typeof I=="string"){h(_=>({..._,[k]:I}));return}else if(I===!1){h(_=>({..._,[k]:"Invalid value"}));return}}h(I=>{const _={...I};return delete _[k],_}),N.value=O,N.onChange?.(O),k in r.preferences&&r.updatePreference(k,O)}},P=k=>{const O=n.get(k);O&&S(k,O.defaultValue)},R=(k,O,N)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),_=`custom_${k}_${Date.now()}`;I[_]={dataUrl:O,fileName:N,settingId:k,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),S(k,_);const ee=n.get(k);if(ee&&ee.options){const ce={label:`Custom: ${N}`,value:_},Se=ee.options.filter(q=>!q.value.startsWith("custom_"));ee.options=[...Se,ce]}},F=k=>{if(!(!k||k==="none"))try{let O;if(k.startsWith("custom_")){const _=JSON.parse(localStorage.getItem("customSounds")||"{}")[k];if(_&&_.dataUrl)O=_.dataUrl;else{console.error("Custom sound not found:",k);return}}else O=`/sounds/${k}`;const N=new Audio(O);N.volume=.5,N.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(O){console.error("Error playing sound:",O)}},B=k=>{s||(y(!0),x({x:k.clientX-g.x,y:k.clientY-g.y}))},V=k=>{switch(k.type){case"boolean":return i.jsx(bc,{type:"checkbox",checked:k.value,onChange:I=>S(k.id,I.target.checked),$isMobile:s});case"select":if(k.id.endsWith("SoundFile")){const I=k.options?.find(ce=>ce.value===k.value),_=I?I.label:"None",ee=k.value&&k.value!=="none";return i.jsxs(kc,{children:[i.jsx(jc,{children:_}),i.jsx(Pc,{type:"button",onClick:()=>F(k.value),disabled:!ee,title:ee?"Play sound":"No sound selected",children:"▶️ Play"}),i.jsx(nc,{settingId:k.id,onUpload:R})]})}else return i.jsx($c,{value:k.value,onChange:I=>S(k.id,I.target.value),children:k.options?.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return i.jsx(vc,{type:"number",value:k.value,min:k.min,max:k.max,step:k.step,onChange:I=>S(k.id,Number(I.target.value))});case"color":return i.jsx(wc,{type:"color",value:k.value,onChange:I=>S(k.id,I.target.value),$isMobile:s});case"text":const N=!!d[k.id];return i.jsxs("div",{style:{width:"100%"},children:[i.jsx(Sc,{value:k.value||"",onChange:I=>S(k.id,I.target.value),className:N?"error":"",placeholder:k.placeholder||"",spellCheck:!1}),N&&i.jsx(Cc,{children:d[k.id]})]});default:return null}};return i.jsx(oc,{children:i.jsxs(ic,{ref:C,$x:g.x,$y:g.y,$isMobile:s,children:[i.jsxs(sc,{onMouseDown:B,children:[i.jsx(ac,{children:"⚙️ Settings"}),i.jsx(cc,{onClick:t,onMouseDown:k=>k.stopPropagation(),children:"✕"})]}),i.jsx(lc,{children:i.jsx(dc,{type:"text",placeholder:"Search settings...",value:c,onChange:k=>l(k.target.value)})}),i.jsxs(uc,{$isMobile:s,children:[i.jsx(hc,{$isMobile:s,children:$.map(k=>i.jsxs(pc,{$active:a===k.id&&!c,$isMobile:s,onClick:()=>{u(k.id),l("")},children:[i.jsx(mc,{children:k.icon}),!s&&k.label]},k.id))}),i.jsxs(fc,{children:[c&&i.jsxs(Mc,{children:["Found ",w.length,' settings matching "',c,'"']}),i.jsx(gc,{children:w.map(k=>k.type==="text"?i.jsxs(on,{style:{flexDirection:"column",alignItems:"stretch"},children:[i.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{children:[i.jsx(sn,{children:k.label}),k.description&&i.jsx(an,{children:k.description})]}),k.value!==k.defaultValue&&i.jsx(cn,{type:"button",onClick:()=>P(k.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),V(k)]},k.id):i.jsxs(on,{children:[i.jsxs(xc,{children:[i.jsx(sn,{children:k.label}),k.description&&i.jsx(an,{children:k.description})]}),i.jsxs(yc,{children:[V(k),k.value!==k.defaultValue&&i.jsx(cn,{type:"button",onClick:()=>P(k.id),title:"Reset to default",children:"↻"})]})]},k.id))})]})]}),i.jsxs(Rc,{children:[i.jsx(rr,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),i.jsxs(Ec,{children:[i.jsx(rr,{onClick:t,children:"Cancel"}),i.jsx(rr,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});Mo.displayName="SettingsDialog";const zc=m.header`
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
`,Ge=m.button`
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
`,Ye=m.div`
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
`,Oc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Nc=m.div`
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
`,zo=X(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:s}=Co(),a=Ro(),u=Eo(),[c,l]=p.useState(!1),[d,h]=p.useState(!1),[g,f]=p.useState(null),b=S=>{t.updatePreference("viewMode",S),h(!1),f(null)},y=S=>{t.updatePreference("chessOrientation",S),h(!1),f(null)},v=S=>{s(S),h(!1),f(null)},x=()=>{h(!d),f(null)},C=()=>{l(!0),h(!1),f(null)},$=S=>{f(S)},w=r==="chat-only";return Z.useEffect(()=>{const S=P=>{const R=P.target;d&&!R.closest(".hamburger-menu-container")&&h(!1)};if(d)return document.addEventListener("click",S),()=>document.removeEventListener("click",S)},[d]),Z.useEffect(()=>{const S=P=>{(P.ctrlKey||P.metaKey)&&P.key===","&&(P.preventDefault(),l(!0))};return window.addEventListener("keydown",S),()=>{window.removeEventListener("keydown",S)}},[]),i.jsxs(zc,{children:[i.jsx(Tc,{children:i.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[i.jsx(Lc,{onClick:x,"aria-label":"Menu",children:"☰"}),i.jsxs(Ic,{$isOpen:d,children:[i.jsxs("div",{onMouseEnter:()=>$("theme"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[i.jsxs(Ge,{$hasSubmenu:!0,children:[i.jsx(Ye,{children:"🎨 Theme"}),i.jsx(nr,{children:"▶"})]}),i.jsxs(or,{$isOpen:g==="theme",children:[i.jsx(Te,{$isActive:o==="light",onClick:()=>v("light"),children:"☀ Light"}),i.jsx(Te,{$isActive:o==="dark",onClick:()=>v("dark"),children:"☾ Dark"}),i.jsx(Te,{$isActive:o==="system",onClick:()=>v("system"),children:"◐ System"})]})]}),i.jsxs("div",{onMouseEnter:()=>$("orientation"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[i.jsxs(Ge,{$hasSubmenu:!0,children:[i.jsx(Ye,{children:"📐 Orientation"}),i.jsx(nr,{children:"▶"})]}),i.jsxs(or,{$isOpen:g==="orientation",children:[u.includes("landscape")&&i.jsx(Te,{$isActive:n==="landscape",onClick:()=>!w&&y("landscape"),disabled:w,style:{opacity:w?.5:1},children:"▭ Landscape"}),u.includes("portrait")&&i.jsx(Te,{$isActive:n==="portrait",onClick:()=>!w&&y("portrait"),disabled:w,style:{opacity:w?.5:1},children:"▯ Portrait"})]})]}),i.jsxs("div",{onMouseEnter:()=>$("mode"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[i.jsxs(Ge,{$hasSubmenu:!0,children:[i.jsx(Ye,{children:"🎮 View Mode"}),i.jsx(nr,{children:"▶"})]}),i.jsxs(or,{$isOpen:g==="mode",children:[a.includes("chess-only")&&i.jsx(Te,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&i.jsx(Te,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&i.jsx(Te,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),children:"▤ Chat Only"})]})]}),i.jsx(ln,{}),i.jsx(Ge,{onClick:C,children:i.jsx(Ye,{children:"⚙️ Settings"})}),i.jsx(ln,{}),i.jsx(Ge,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),h(!1)},children:i.jsx(Ye,{children:"📖 Documentation"})}),i.jsx(Ge,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),h(!1)},children:i.jsx(Ye,{children:"🐛 Report Issue"})})]})]})}),i.jsx(Ac,{children:i.jsxs(Dc,{children:[i.jsx(Oc,{children:"Mode:"}),i.jsxs(Nc,{children:[a.includes("chess-only")&&i.jsx(ir,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&i.jsx(ir,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&i.jsx(ir,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),title:"Chat Only",children:"▤"})]})]})}),i.jsx(Mo,{isOpen:c,onClose:()=>l(!1)})]})});zo.displayName="AppHeader";const Fc=m.img`
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
`,Ae=X(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=De(),[s,a]=Z.useState(!1),u=Bc[e];if(!u)return null;const c=o.preferences.pieceSet,l=`/pieces/${c}/${u}.svg`;return Z.useEffect(()=>{a(!1)},[e,c]),s?i.jsx(Hc,{className:"chess-piece-fallback",$isDragging:r,$size:t,style:n,"data-settings":"pieces",children:Wc[e]||e}):i.jsx(Fc,{className:"chess-piece",src:l,alt:u,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces",onError:()=>a(!0)})});Ae.displayName="ChessPiece";const _c=m.div`
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
`,To=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const s=["Q","R","B","N"],a=u=>t==="white"?u:u.toLowerCase();return i.jsx(_c,{$isOpen:e,onClick:n,children:i.jsx(Uc,{$x:o.x,$y:o.y,onClick:u=>u.stopPropagation(),children:s.map(u=>i.jsx(Gc,{onClick:()=>r(u.toLowerCase()),children:i.jsx(Ae,{piece:a(u),size:50})},u))})})};To.displayName="PromotionDialog";const Yc=m.div`
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
`,qe=["a","b","c","d","e","f","g","h"],Ke=["8","7","6","5","4","3","2","1"];function Qc(e,t){return(e+t)%2===0}function Jc(e,t,r){const n=r?qe[7-e]:qe[e],o=r?Ke[7-t]:Ke[t];return`${n}${o}`}function Zc(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,s)=>{let a=0;for(const u of o)if(u>="1"&&u<="8")a+=parseInt(u);else{const c=`${qe[a]}${Ke[s]}`;t.set(c,u),a++}}),t}const $r=X(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:s,highlightedSquares:a=new Set,lastMove:u,interactive:c=!0,onSizeCalculated:l,selectedCapturedPiece:d,onCapturedPieceSelect:h})=>{Oe();const g=De(),f=Nt(),b=p.useRef(null),[y,v]=p.useState(t||200),[x,C]=p.useState(null),[$,w]=p.useState(new Set),[S,P]=p.useState(null),[R,F]=p.useState([]),B=p.useRef(),[V,k]=p.useState(null),[O,N]=p.useState(!1),I=p.useMemo(()=>Zc(e),[e]),_=p.useRef(new Map);p.useRef(0);const ee=p.useCallback((j,L)=>{const z=qe.indexOf(j[0]),T=Ke.indexOf(j[1]),E=L/8,M=r?(7-z)*E:z*E,U=r?(7-T)*E:T*E;return{x:M,y:U}},[r]),ce=p.useCallback((j,L,z)=>{const T=j.toLowerCase()==="p",E=z[1];return T&&(E==="8"||E==="1")},[]),Se=p.useCallback(j=>{j.preventDefault(),f.isPlaying&&f.clearPremove()},[f]);p.useEffect(()=>{if(t){v(t);return}const j=()=>{if(!b.current)return;const M=b.current.parentElement;if(!M)return;const{width:U,height:re}=M.getBoundingClientRect();b.current.getBoundingClientRect();const le=16,A=U-le,ie=re-le,Q=Math.floor(Math.min(A,ie)),ue=Math.max(100,Math.floor(Q/8)*8);ue!==y&&v(ue)},L=setTimeout(j,50);j();let z;const T=()=>{clearTimeout(z),z=setTimeout(j,100)};window.addEventListener("resize",T);let E=null;return b.current&&b.current.parentElement&&(E=new ResizeObserver(()=>{T()}),E.observe(b.current.parentElement)),()=>{window.removeEventListener("resize",T),clearTimeout(z),clearTimeout(L),E&&E.disconnect()}},[t,y]),p.useEffect(()=>{l&&y>0&&l(y)},[y,l]);const q=y/8,se=p.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(f.isPlaying){const j=f.currentGame,L=f.playingColor;if(j&&L){const z=L==="white"?j.white.time:j.black.time,T=g.preferences.disableAnimationsThreshold;if(z<T)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,f.isPlaying,f.currentGame,f.playingColor]),ae=p.useRef("");p.useEffect(()=>{if(F([]),!se||O||f.isProcessingServerUpdate){_.current=new Map(I);return}const j=_.current;if(u){const{from:L,to:z}=u,T=`${e}-${L}-${z}`;if(ae.current===T){_.current=new Map(I);return}const E=j.get(L),M=I.get(z);if(E&&M===E&&!I.has(L)){if(f.isPlaying&&f.currentGame){const U=f.gameRelation===1,re=f.playingColor,le=re==="white"&&f.currentGame.turn==="b"||re==="black"&&f.currentGame.turn==="w";if(U||le){_.current=new Map(I),ae.current=T;return}}ae.current=T,setTimeout(()=>{F([{piece:E,from:L,to:z,startTime:Date.now()}])},0)}}_.current=new Map(I)},[I,u,se,O,f.isProcessingServerUpdate,e,f]),p.useEffect(()=>{if(O){const j=setTimeout(()=>{N(!1)},50);return()=>clearTimeout(j)}},[e,O]),p.useEffect(()=>{if(R.length===0)return;const j=()=>{const L=Date.now(),z=g.preferences.animationDuration;F(T=>{const E=T.filter(M=>L-M.startTime<z);return E.length>0&&(B.current=requestAnimationFrame(j)),E})};return B.current=requestAnimationFrame(j),()=>{B.current&&cancelAnimationFrame(B.current)}},[R.length,g.preferences.animationDuration]),p.useEffect(()=>{if(d)try{const j=f.currentPosition;f.chessBoard.getFen()!==j&&f.chessBoard.loadFen(j);const z=f.chessBoard.getLegalMoves().filter(E=>E.from==="@"&&E.san.toLowerCase().startsWith(d.toLowerCase())),T=new Set(z.map(E=>E.to));w(T),C(null)}catch(j){console.error("Error getting drop moves:",j),w(new Set)}},[d,f]);const te=p.useCallback((j,L)=>{if(!c)return;const z=I.get(j);if(d){$.has(j)?(s?.(d,j),h?.(null),w(new Set)):(h?.(null),w(new Set));return}if(x)if($.has(j)){const T=I.get(x);if(T&&ce(T,x,j)){const E=T===T.toUpperCase()?"white":"black";if(f.isPlaying){const M=g.preferences.autoPromotionPiece;f.isMyTurn?(N(!0),o?.(x,j,M)):f.setPremove(x,j,M)}else{const M=L?.currentTarget.getBoundingClientRect();k({from:x,to:j,color:E,position:M?{x:M.left+M.width/2,y:M.top+M.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else f.isPlaying&&!f.isMyTurn?f.setPremove(x,j):(N(!0),o?.(x,j));C(null),w(new Set)}else if(j===x)C(null),w(new Set);else if(z)if(C(j),g.preferences.showLegalMoves)try{const T=f.currentPosition;f.chessBoard.getFen()!==T&&f.chessBoard.loadFen(T);const E=f.chessBoard.getLegalMoves(j),M=new Set(E.map(U=>U.to));w(M)}catch(T){console.error("Error getting legal moves:",T),w(new Set)}else w(new Set);else C(null),w(new Set);else if(z){C(j);try{const T=f.currentPosition;f.chessBoard.getFen()!==T&&f.chessBoard.loadFen(T);const E=z===z.toUpperCase(),M=f.chessBoard.getActiveColor();if(E&&M==="w"||!E&&M==="b")if(g.preferences.showLegalMoves){const re=f.chessBoard.getLegalMoves(j),le=new Set(re.map(A=>A.to));w(le)}else w(new Set);else w(new Set),C(null)}catch(T){console.error("Error getting legal moves:",T),w(new Set)}}},[x,$,I,o,s,c,ce,f,g.preferences.autoPromotionPiece,d,h]),me=p.useCallback((j,L,z)=>{if(!c)return;const T=j.clientX,E=j.clientY;let M=!1,U=!1;const le=j.currentTarget.getBoundingClientRect().width,A=Q=>{const ue=Math.abs(Q.clientX-T),nt=Math.abs(Q.clientY-E);(ue>3||nt>3)&&z&&!U?(M=!0,U=!0,de(L,z,Q,le)):U&&P(ze=>ze?{...ze,x:Q.clientX,y:Q.clientY}:null)},ie=Q=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",ie),U?Ce(Q,L,z):M?(P(null),C(null),w(new Set)):te(L,j)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",ie)},[c,te]),de=p.useCallback((j,L,z,T)=>{if(C(j),g.preferences.showLegalMoves)try{const M=f.currentPosition;f.chessBoard.getFen()!==M&&f.chessBoard.loadFen(M);const U=L===L.toUpperCase(),re=f.chessBoard.getActiveColor();if(U&&re==="w"||!U&&re==="b"){const A=f.chessBoard.getLegalMoves(j),ie=new Set(A.map(Q=>Q.to));w(ie)}else w(new Set)}catch(M){console.error("Error getting legal moves for drag:",M),w(new Set)}else w(new Set);const E={piece:L,from:j,x:z.clientX,y:z.clientY,size:T};P(E)},[g.preferences.showLegalMoves,f]),Ce=p.useCallback((j,L,z)=>{try{const M=document.elementsFromPoint(j.clientX,j.clientY).find(U=>U.getAttribute("data-square"))?.getAttribute("data-square");if(M&&M!==L)if(ce(z,L,M)){const U=z===z.toUpperCase()?"white":"black";if(f.isPlaying){const re=g.preferences.autoPromotionPiece;f.isMyTurn?(N(!0),o?.(L,M,re)):f.setPremove(L,M,re)}else k({from:L,to:M,color:U,position:{x:j.clientX,y:j.clientY}})}else f.isPlaying&&!f.isMyTurn?f.setPremove(L,M):(N(!0),o?.(L,M))}catch(T){console.error("Error in handleDragEnd:",T)}P(null),C(null),w(new Set)},[o,ce,f,g.preferences.autoPromotionPiece]),fe=p.useMemo(()=>{const j=[];for(let L=0;L<8;L++)for(let z=0;z<8;z++){const T=Qc(z,L),E=Jc(z,L,r),M=I.get(E),U=a.has(E),re=u&&(u.from===E||u.to===E),le=x===E,A=$.has(E),ie=S?.from===E;R.some(ze=>ze.to===E);const Q=R.some(ze=>ze.from===E),ue=n&&L===7,nt=n&&z===0;j.push(i.jsxs(qc,{"data-square":E,$isLight:T,$isHighlighted:U,$isLastMoveSquare:!!re,$isSelected:le,$isPossibleMove:A,onMouseDown:ze=>me(ze,E,M),children:[M&&!ie&&!Q&&i.jsx(Ae,{piece:M,size:q},`${M}-${q}`),ue&&i.jsx(dn,{$type:"file",$isLight:T,$size:q,"data-settings":"coordinates",className:"coordinate-label",children:r?qe[7-z]:qe[z]}),nt&&i.jsx(dn,{$type:"rank",$isLight:T,$size:q,"data-settings":"coordinates",className:"coordinate-label",children:r?Ke[7-L]:Ke[L]})]},E))}return j},[r,n,I,a,u,x,$,S,q,te,me]);return i.jsxs(i.Fragment,{children:[i.jsxs(Yc,{ref:b,$size:y,onContextMenu:Se,"data-settings":"board",className:"chess-board",children:[i.jsx(Vc,{children:fe}),R.map((j,L)=>{const z=ee(j.from,y),T=ee(j.to,y),E=Date.now()-j.startTime,M=g.preferences.animationDuration,U=Math.min(E/M,1),le=(A=>A<.5?4*A*A*A:1-Math.pow(-2*A+2,3)/2)(U);return i.jsx(Xc,{$fromX:z.x,$fromY:z.y,$toX:T.x,$toY:T.y,$progress:le,$size:q,children:i.jsx(Ae,{piece:j.piece,size:q},`${j.piece}-${q}`)},`${j.from}-${j.to}-${j.startTime}`)})]}),S&&i.jsx(i.Fragment,{children:i.jsx(Kc,{$x:S.x,$y:S.y,$size:S.size,children:i.jsx(Ae,{piece:S.piece,size:S.size,isDragging:!0},`${S.piece}-${S.size}-dragging`)})}),V&&i.jsx(To,{isOpen:!0,color:V.color,position:V.position,onSelect:j=>{N(!0),o?.(V.from,V.to,j),k(null)},onCancel:()=>k(null)})]})});$r.displayName="ChessBoardWithPieces";const el=m.div`
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
`,Lo=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a,compact:u=!1})=>{const c=d=>{const h=Math.floor(d/3600),g=Math.floor(d%3600/60),f=Math.floor(d%60),b=Math.floor(d%1*10),y=r&&Math.floor(d)%2===0?" ":":";return h>0?`${h}${y}${g.toString().padStart(2,"0")}${y}${f.toString().padStart(2,"0")}`:d<o&&s?`${g}${y}${f.toString().padStart(2,"0")}.${b}`:`${g}${y}${f.toString().padStart(2,"0")}`},l=e<=o&&e>0;return i.jsx(el,{size:t,className:a,children:i.jsx(tl,{$isLowTime:l,$isActive:r,$compact:u,$isFinished:n,children:c(e)})})},rl=m.span`
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
`,nl=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a})=>{const u=d=>{const h=Math.floor(d/3600),g=Math.floor(d%3600/60),f=Math.floor(d%60),b=Math.floor(d%1*10),y=r&&Math.floor(d)%2===0?" ":":";return h>0?`${h}${y}${g.toString().padStart(2,"0")}${y}${f.toString().padStart(2,"0")}`:d<o&&s?`${g}${y}${f.toString().padStart(2,"0")}.${b}`:`${g}${y}${f.toString().padStart(2,"0")}`},c=e<=o&&e>0,l=t==="large"?"48px":t==="medium"?"36px":"24px";return i.jsx(rl,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:l,children:u(e)})},yt=m(nl)`
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
`,Io=X(({playerName:e,position:t,onClose:r})=>{const n=Mn(),o=De(),s=p.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];p.useEffect(()=>{const c=d=>{s.current&&!s.current.contains(d.target)&&r()},l=d=>{d.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[r]),p.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),l=window.innerWidth,d=window.innerHeight;let h=t.x,g=t.y;c.right>l&&(h=l-c.width-10),c.bottom>d&&(g=d-c.height-10),(h!==t.x||g!==t.y)&&(s.current.style.left=`${h}px`,s.current.style.top=`${g}px`)}},[t]);const u=c=>{const l=e.replace(/\([^)]*\)/g,"").trim(),d=c.replace("{player}",l);n.sendCommand(d),r()};return i.jsx(ol,{ref:s,$x:t.x,$y:t.y,children:a.map((c,l)=>"divider"in c&&c.divider?i.jsx(sl,{},l):"command"in c?i.jsx(il,{onClick:()=>u(c.command),children:c.label},l):null)})});Io.displayName="PlayerContextMenu";const al=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Ao=({name:e,className:t,style:r,onClick:n})=>{const[o,s]=p.useState(null),a=u=>{u.preventDefault(),u.stopPropagation(),n&&n(),s({x:u.clientX,y:u.clientY})};return i.jsxs(i.Fragment,{children:[i.jsx(al,{className:t,style:r,onClick:a,children:e}),o&&i.jsx(Io,{playerName:e,position:o,onClose:()=>s(null)})]})};Ao.displayName="PlayerName";const cl=m.div`
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
`;const st=X(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:u=!1,compact:c=!1})=>{const l=i.jsxs(i.Fragment,{children:[i.jsx(ll,{children:i.jsxs(dl,{children:[i.jsx(ul,{children:i.jsx(Ao,{name:e})}),i.jsx(hl,{children:t})]})}),!a&&!u&&i.jsx(yt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return u?l:i.jsx(cl,{$isActive:n,$orientation:s,$compact:c,children:l})});st.displayName="PlayerCard";const pl=m.div`
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
`,qt=X(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:s,className:a,disableAutoScroll:u=!1})=>{const c=p.useRef(null);p.useEffect(()=>{if(!u&&c.current&&t!==void 0){const d=c.current.querySelector(`[data-move-index="${t}"]`);d&&d.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,u]);const l=()=>{const d=[];for(let h=0;h<e.length;h+=2){const g=Math.floor(h/2)+1,f=e[h],b=e[h+1];d.push(i.jsxs(un,{children:[i.jsxs(fl,{children:[g,"."]}),i.jsx(hn,{$isCurrentMove:t===h,onClick:()=>r?.(h),"data-move-index":h,children:cr(f.san)}),b&&i.jsx(hn,{$isCurrentMove:t===h+1,onClick:()=>r?.(h+1),"data-move-index":h+1,children:cr(b.san)})]},h))}return d};return i.jsxs(pl,{className:a,children:[o?i.jsx(sr,{children:i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{children:"Moves"}),i.jsxs(ar,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?i.jsxs(sr,{children:[s,i.jsxs(ar,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):i.jsx(sr,{children:i.jsxs(ar,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),i.jsx(ml,{ref:c,children:e.length===0?i.jsx(un,{children:i.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});qt.displayName="MoveList";const gl=m(yt)`
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
`,xl=m(yt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,at=X(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const s=Nt(),a=o==="landscape"?xl:gl;return i.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});at.displayName="ObservableClock";const yl=m.div`
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
`,Ar=X(({color:e,size:t="small"})=>{const r=De(),[n,o]=p.useState(!1),s=p.useRef(null),a=["Q","R","B","N"],u=r.preferences.autoPromotionPiece,c=h=>e==="white"?h:h.toLowerCase();p.useEffect(()=>{const h=g=>{s.current&&!s.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[n]);const l=h=>{r.updatePreference("autoPromotionPiece",h),o(!1)},d=t==="small"?28:36;return i.jsxs(yl,{ref:s,children:[i.jsx(bl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:i.jsx(Ae,{piece:c(u),size:d})}),i.jsx($l,{$isOpen:n,children:a.map(h=>i.jsx(vl,{$size:t,onClick:()=>l(h),title:`Promote to ${h==="Q"?"Queen":h==="R"?"Rook":h==="B"?"Bishop":"Knight"}`,children:i.jsx(Ae,{piece:c(h),size:d})},h))})]})});Ar.displayName="PromotionPieceSelector";const wl=m.div`
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
`,Do=X(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:s,onUnexamine:a,onSetupFEN:u,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:d,canAbort:h,className:g})=>{const f=Nt(),b=()=>i.jsxs(i.Fragment,{children:[h&&i.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),i.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),f.currentGame&&f.currentGame.moveNumber>=2&&i.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(Ar,{color:f.playingColor||"white",size:"medium"})]}),y=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),v=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(he,{onClick:u,$variant:"secondary",children:"FEN"})]});return i.jsxs(wl,{className:g,children:[e==="playing"&&b(),e==="observing"&&y(),e==="examining"&&v(),e==="freestyle"&&x()]})}),be=m(he)`
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
`,wt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,gn=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,Oo=X(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Ft().isBottomPlayerWinning;let a,u,c;if(t===50)a=47,u=6,c=47;else if(t>50){const d=t-50;a=50-d,u=d,c=50}else{const d=50-t;a=50,u=d,c=50-d}const l=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const d=t<20;return i.jsxs(pn,{$orientation:r,className:n,children:[i.jsx(mn,{$orientation:r,children:e}),i.jsx(kl,{$needsDarkText:d,children:e}),i.jsxs(fn,{$orientation:r,children:[i.jsx(wt,{style:{height:`${a}%`}}),i.jsx(gn,{$color:l,style:{height:`${u}%`}}),i.jsx(wt,{style:{height:`${c}%`}})]})]})}else return i.jsxs(pn,{$orientation:r,className:n,children:[i.jsx(mn,{$orientation:r,children:e}),i.jsxs(fn,{$orientation:r,children:[i.jsx(wt,{style:{width:`${c}%`}}),i.jsx(gn,{$color:l,style:{width:`${u}%`}}),i.jsx(wt,{style:{width:`${a}%`}})]})]})});Oo.displayName="EvaluationBar";const Sl=m.div`
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
`,vr=X(({orientation:e="vertical",boardSize:t})=>{const r=Ft();return i.jsx(Sl,{$orientation:e,$boardSize:t,children:i.jsx(Oo,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),wr=X(({className:e})=>{const t=Ft();return i.jsxs(Cl,{className:e,children:[i.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),i.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});vr.displayName="AnalysisDisplay";wr.displayName="AnalysisInfoDisplay";const jl=m.div`
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
`,No=m.input`
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
`,Ll=m(No)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Fo=X(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=p.useState(""),[s,a]=p.useState(""),u=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=p.useCallback(f=>{o(f.target.value),a("")},[]),l=p.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),d=p.useCallback(f=>{const b=typeof f=="function"?f():f;o(b),a("");try{r.loadPosition(b)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),h=p.useCallback(f=>{f.key==="Enter"&&n.trim()?l():f.key==="Escape"&&t()},[n,l,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>Qo.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?i.jsx(jl,{$isOpen:e,onClick:t,children:i.jsxs(Pl,{onClick:f=>f.stopPropagation(),children:[i.jsx(Rl,{children:"Set Position from FEN"}),i.jsx(Ml,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),i.jsxs(yn,{children:[i.jsx(bn,{children:"Current position:"}),i.jsx(Ll,{type:"text",value:u,readOnly:!0,onClick:f=>f.currentTarget.select()})]}),i.jsxs(yn,{children:[i.jsx(bn,{children:"Preset position:"}),g.map(f=>i.jsx(Tl,{onClick:()=>d(f.fen),children:f.name},f.name))]}),i.jsx(No,{type:"text",value:n,onChange:c,onKeyDown:h,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&i.jsx(El,{children:s}),i.jsxs(zl,{children:[i.jsx(xn,{onClick:t,children:"Cancel"}),i.jsx(xn,{$variant:"primary",onClick:l,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Fo.displayName="FENDialog";const Il=m.div`
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
`,Ol=m.div`
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
`,Nl=m(Ae)`
  width: 100%;
  height: 100%;
`,ct=X(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:s}=Ee(),a=p.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const h=s.capturedPieces;return t?h.white:h.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),u=p.useMemo(()=>{const d={};return a.forEach(h=>{d[h]=(d[h]||0)+1}),d},[a]),c=["p","n","b","r","q"],l=n?n/8:32;return i.jsx(Il,{$orientation:e,$size:l,className:r,children:i.jsx(Al,{$orientation:e,children:c.map(d=>{const h=u[d]||0,g=t?d.toUpperCase():d;return i.jsx(Dl,{$size:l,onClick:h>0&&o?()=>o(g):void 0,style:{cursor:h>0&&o?"pointer":"default"},children:h>0&&i.jsxs(i.Fragment,{children:[i.jsx(Nl,{piece:g,size:l}),h>1&&i.jsx(Ol,{children:h})]})},d)})})})});ct.displayName="CapturedPieces";const Fl=m.div`
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
`,Ul=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:s,onCancel:a})=>i.jsx(Fl,{$isOpen:e,onClick:a,children:i.jsxs(Bl,{onClick:u=>u.stopPropagation(),children:[i.jsx(Wl,{children:t}),i.jsx(Hl,{children:r}),i.jsxs(_l,{children:[i.jsx($n,{$variant:"secondary",onClick:a,children:o}),i.jsx($n,{$variant:"primary",onClick:s,children:n})]})]})}),Gl=m.div`
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
`;m(yt)`
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
`;m(yt)`
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
`,Ho=X(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=Nt(),o=De(),s=Ft(),a=Mn(),u=Jo();Oe();const[c,l]=p.useState(!1),[d,h]=p.useState(!1),[g,f]=p.useState(0),[b,y]=p.useState(!1),[v,x]=p.useState(!1),[C,$]=p.useState(null),w=o.preferences.chessOrientation==="landscape",S=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",R=window.innerWidth/window.innerHeight>1.6,F=p.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),B=p.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),V=p.useCallback((A,ie,Q)=>{try{n.makeMove(A,ie,Q)||(console.error("Invalid move:",A,ie),u.playIllegal())}catch(ue){console.error("Error making move:",ue),u.playIllegal()}},[n,u]),k=p.useCallback((A,ie)=>{try{const Q=A.toLowerCase();n.makeSANMove(`${A.toUpperCase()}@${ie}`)||(console.error("Invalid drop:",A,ie),u.playIllegal())}catch(Q){console.error("Error making drop:",Q),u.playIllegal()}},[n,u]),O=p.useCallback(A=>{$(C===A?null:A)},[C]);p.useMemo(()=>{if(n.currentGameInfo){const{white:A,black:ie,timeControl:Q,variant:ue}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ue} ${Q}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const N=(()=>{const A=n.moveHistory.length;if(A>0){const ie=n.moveHistory[A-1],Q=Math.ceil(A/2),ue=A%2===1,nt=cr(ie.san);return`${Q}.${ue?"":".."} ${nt}`}return"Starting position"})(),I=n.currentOpening,_=n.currentGame,ee=_||n.lastGameState,ce=ee?.white||{name:"White",rating:1500,time:900},Se=ee?.black||{name:"Black",rating:1500,time:900},q=!_||_.turn==="w",se=n.shouldShowFlippedBoard,ae=se?ce:Se,te=se?Se:ce,me=se,de=se?q:!q,Ce=p.useCallback(A=>{n.goToMove(A)},[n]);p.useEffect(()=>{s.initialize()},[s]),p.useEffect(()=>{v&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,v,n.isPlaying,a]),p.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),p.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(S):s.stopAnalysis()},[c,S,s]);const fe=p.useCallback(()=>{l(A=>!A)},[]),j=p.useCallback(()=>{h(!0)},[]),L=p.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),z=p.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),T=p.useCallback(()=>{a.sendCommand("unexamine")},[a]),E=p.useCallback(()=>{y(!0)},[]),M=p.useCallback(()=>{a.sendCommand("resign"),y(!1)},[a]),U=p.useCallback(()=>{a.sendCommand("draw"),x(!v)},[a,v]),re=p.useCallback(()=>{a.sendCommand("abort")},[a]),le=()=>i.jsxs(i.Fragment,{children:[i.jsx(vn,{$orientation:"portrait",children:i.jsx(td,{children:i.jsxs(rd,{children:[c&&i.jsx(md,{$boardSize:g,children:i.jsx(vr,{orientation:"vertical",boardSize:g})}),i.jsx(nd,{children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[i.jsxs(Jl,{children:[i.jsxs(wn,{children:["Game #",ee?.gameId||"?"]}),i.jsx(kn,{children:ee?.timeControl||"?"}),i.jsxs(Zl,{children:[F==="playing"&&i.jsxs(i.Fragment,{children:[n.moveHistory.length<=1&&i.jsx(be,{onClick:re,$variant:"secondary",children:"Abort"}),i.jsx(be,{onClick:U,$variant:"secondary",children:"Draw"}),i.jsx(be,{onClick:E,$variant:"secondary",children:"Resign"}),i.jsx(Ar,{color:n.playingColor||"white",size:"small"})]}),F==="observing"&&i.jsxs(i.Fragment,{children:[i.jsx(be,{onClick:z,$variant:"secondary",children:"Unobserve"}),i.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),F==="examining"&&i.jsxs(i.Fragment,{children:[i.jsx(be,{onClick:T,$variant:"secondary",children:"Unexamine"}),i.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),F==="freestyle"&&i.jsxs(i.Fragment,{children:[i.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"}),i.jsx(be,{onClick:L,$variant:"secondary",children:"Flip"}),i.jsx(be,{onClick:j,$variant:"secondary",children:"FEN"})]})]})]}),i.jsxs(Pn,{children:[i.jsx(at,{player:ae,isActive:de,size:"small",compact:!0}),i.jsx(Rn,{children:i.jsx(st,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsx(jn,{$orientation:"portrait",children:i.jsx($r,{position:S,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:V,onDrop:k,interactive:F==="playing"||F==="freestyle"||F==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:C,onCapturedPieceSelect:$})}),i.jsxs(Pn,{children:[i.jsx(at,{player:te,isActive:!de,size:"small",compact:!0}),i.jsx(Rn,{children:i.jsx(st,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsxs(ed,{children:[i.jsx(Sn,{children:n.premove?`Premove: ${Dr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,S)}`:N!=="Starting position"?`Last move: ${N}`:"Last move: none"}),I&&i.jsx(Cn,{children:I})]}),c&&i.jsx(pd,{children:i.jsx(wr,{})})]})}),B&&i.jsx(ql,{$squareSize:g?g/8:0,children:i.jsxs(Kl,{$squareSize:g?g/8:0,children:[i.jsx(ct,{orientation:"vertical",isWhitePieces:se,boardSize:g,onPieceClick:O}),i.jsx(ct,{orientation:"vertical",isWhitePieces:!se,boardSize:g,onPieceClick:O})]})})]})})}),i.jsx(od,{$orientation:"portrait",$boardSize:g,children:i.jsx(qt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,disableAutoScroll:!0,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return i.jsxs(Gl,{className:e,$orientation:w?"landscape":"portrait",$hasChat:t,children:[w?i.jsx(i.Fragment,{children:i.jsx(vn,{$orientation:"landscape",children:i.jsxs(id,{children:[i.jsx(ud,{children:c&&i.jsx(hd,{$boardSize:g,children:i.jsx(vr,{orientation:"vertical",boardSize:g})})}),i.jsxs(sd,{$hasAnalysis:c,children:[i.jsxs(Yl,{$isWideAspect:R,children:[i.jsxs(Xl,{$chatWidth:r,$hasAnalysis:c,children:[i.jsxs(wn,{children:["Game #",ee?.gameId||"?"]}),i.jsx(kn,{children:ee?.timeControl||"?"})]}),i.jsx(Vl,{$orientation:"landscape",children:i.jsx(jn,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:i.jsx($r,{position:S,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:V,onDrop:k,interactive:F==="playing"||F==="freestyle"||F==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:C,onCapturedPieceSelect:$})})}),i.jsxs(Ql,{$chatWidth:r,$hasAnalysis:c,children:[i.jsx(Sn,{children:n.premove?`Premove: ${Dr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,S)}`:N!=="Starting position"?`Last move: ${N}`:"Last move: none"}),I&&i.jsx(Cn,{children:I})]}),c&&i.jsx(dd,{$chatWidth:r,$hasAnalysis:c,children:i.jsx(wr,{})})]}),i.jsxs(ad,{$isWideAspect:R,$boardSize:g,children:[B&&i.jsx(ct,{orientation:"horizontal",isWhitePieces:me,boardSize:g,onPieceClick:O}),i.jsx(at,{player:ae,isActive:de,size:"small",compact:!0,variant:"landscape"}),i.jsxs(cd,{children:[i.jsx(st,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"vertical",hideClockInCard:!0,compact:!0}),i.jsx(Do,{perspective:F,canAbort:n.moveHistory.length<=1,onAnalysis:fe,onFlipBoard:L,onSetupFEN:j,onUnobserve:z,onUnexamine:T,onResign:E,onDraw:U,onAbort:re,isAnalysisActive:c,isDrawOffered:v}),i.jsx(ld,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,showHeader:!1,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),i.jsx(st,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),i.jsx(at,{player:te,isActive:!de,size:"small",compact:!0,variant:"landscape"}),B&&i.jsx(ct,{orientation:"horizontal",isWhitePieces:!me,boardSize:g,onPieceClick:O})]})]})]})})}):le(),i.jsx(Fo,{isOpen:d,onClose:()=>h(!1)}),i.jsx(Ul,{isOpen:b,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:M,onCancel:()=>y(!1)})]})});Ho.displayName="ChessGameLayout";const fd=m.div`
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
`,_o=X(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=Z.useState(null),[o,s]=Z.useState(null),a=(h,g)=>{n(g),h.dataTransfer.effectAllowed="move"},u=(h,g)=>{h.preventDefault(),h.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},l=(h,g)=>{h.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},d=()=>{n(null),s(null)};return i.jsx(fd,{children:t.map(h=>i.jsxs(gd,{$active:h.id===e.activeTabId,$hasUnread:h.unreadCount>0,$dragging:h.id===r,$dragOver:h.id===o,draggable:!0,onDragStart:g=>a(g,h.id),onDragOver:g=>u(g,h.id),onDragLeave:c,onDrop:g=>l(g,h.id),onDragEnd:d,onClick:()=>e.setActiveTab(h.id),children:[h.type!=="console"&&i.jsx($d,{$type:h.type}),i.jsx(xd,{children:h.type==="channel"?`(${h.name})`:h.name}),h.unreadCount>0&&i.jsx(yd,{children:h.unreadCount>99?"99+":h.unreadCount}),h.id!=="console"&&i.jsx(bd,{onClick:g=>{g.stopPropagation(),e.closeTab(h.id)},title:"Close tab",children:"×"})]},h.id))})});_o.displayName="ChatTabs";function vd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function wd(e){e.scrollTop=e.scrollHeight}function kd(e,t=10){vd(e,t)&&wd(e)}class Uo{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class H{constructor(){this.renderers=new Map}register(t){this.renderers.set(t.type,t)}clear(){this.renderers.clear()}getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}getAllRenderers(){return Array.from(this.renderers.values())}static{this.instance=new H}static register(t){this.instance.register(t)}static getRenderer(t){return this.instance.getRenderer(t)}static getAllRenderers(){return this.instance.getAllRenderers()}static clear(){this.instance.clear()}}const Sd=m.pre`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${e=>e.$fontSize}px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${e=>e.theme.colors.text};
`,Ne=m.a`
  color: ${e=>e.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: ${e=>e.theme.colors.primaryHover};
  }
`,Go=X(({content:e,ansiColors:t=!0,elements:r=[]})=>{const{ficsStore:n,preferencesStore:o}=Ee(),s=o.getChatAppearance();r.length>0&&console.log("[SimpleFicsRenderer] Elements:",r);const a=e.startsWith(`
`)?e.substring(1):e,u=d=>{if(!t)return d;const h={30:"#000000",31:"#CC0000",32:"#4E9A06",33:"#C4A000",34:"#3465A4",35:"#75507B",36:"#06989A",37:"#D3D7CF",90:"#555753",91:"#EF2929",92:"#8AE234",93:"#FCE94F",94:"#729FCF",95:"#AD7FA8",96:"#34E2E2",97:"#EEEEEC"};return d.replace(/\x1b\[(\d+)m/g,(g,f)=>{const b=h[f];return b?`<span style="color: ${b}">`:f==="0"?"</span>":""})},c=d=>{const h=[];if(d.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:|^\s*\w+(?:\([^)]*\))*\((\d+)\):/m)){const f=/(https?:\/\/[^\s]+)\s*$/gm;let b;for(;(b=f.exec(d))!==null;){const y=b[1],v=b.index,x=b.index+b[0].length,C=d.substring(x).match(/^\n\s+([^\s]+)/);if(C&&C[1].match(/[.\/\-?=&]/)){const $=y+C[1],w=x+C[0].length;h.push({start:v,end:w,url:$})}}}return h},l=d=>{const h=u(d),g=c(e),f=[{regex:/(https?:\/\/[^\s]+)/g,handler:($,w)=>{const S=$[0],P=w||S;return i.jsx(Ne,{href:P,target:"_blank",rel:"noopener noreferrer",onClick:R=>{R.preventDefault(),window.open(P,"_blank")},children:S})}},{regex:/^(\w+) tells you:/gm,handler:$=>{const w=$[1];return i.jsxs("span",{children:[i.jsx(Ne,{onClick:S=>{S.preventDefault(),n.sendCommand(`finger ${w}`)},children:w}),$[0].substring(w.length)]},`player-${w}`)}},{regex:/\bGame (\d+)\b/g,handler:$=>i.jsx(Ne,{onClick:w=>{w.preventDefault(),n.sendCommand(`observe ${$[1]}`)},children:$[0]})}];if(t&&h!==d)return i.jsx("span",{dangerouslySetInnerHTML:{__html:h}});let b=0;const y=[],v=[],x=[];return r.forEach($=>{const w=a!==e?$.start-1:$.start;if(console.log("[SimpleFicsRenderer] Element:",$.type,$.text,"start:",$.start,"adjusted:",w,"textLen:",d.length),w>=0&&w<d.length){const S=(()=>{switch($.type){case"command":return i.jsx(Ne,{onClick:P=>{P.preventDefault(),n.sendCommand($.action||$.value)},children:$.text});case"player":return i.jsx(Ne,{onClick:P=>{P.preventDefault(),n.sendCommand(`finger ${$.text}`)},children:$.text});case"gameNumber":return i.jsx(Ne,{onClick:P=>{P.preventDefault(),n.sendCommand(`observe ${$.value}`)},children:$.text});default:return $.text}})();x.push({start:w,end:w+$.text.length,render:S,priority:20})}}),g.forEach($=>{const w=d.substring($.start).match(/^(https?:\/\/[^\s]+)/);if(w){const S=w[1];x.push({start:$.start,end:$.start+S.length,render:i.jsx(Ne,{href:$.url,target:"_blank",rel:"noopener noreferrer",onClick:P=>{P.preventDefault(),window.open($.url,"_blank")},children:S}),priority:10}),v.push([$.start,$.end])}}),f.forEach($=>{const w=new RegExp($.regex);let S;for(;(S=w.exec(d))!==null;){const P=S.index,R=P+S[0].length;v.some(([B,V])=>P>=B&&P<V||R>B&&R<=V)||x.push({start:P,end:R,render:$.handler(S),priority:1})}}),x.sort(($,w)=>$.start!==w.start?$.start-w.start:w.priority-$.priority),x.filter(($,w)=>{if(w===0)return!0;const S=x[w-1];return $.start>=S.end}).forEach(($,w)=>{$.start>b&&y.push(d.substring(b,$.start)),y.push(i.jsx(Z.Fragment,{children:$.render},w)),b=$.end}),b<d.length&&y.push(d.substring(b)),y.length>0?y:d};return i.jsx(Sd,{$fontSize:s.fontSize,children:l(a)})}),Cd=m.div`
  margin: 0;
`;class jd extends Uo{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t}){const r=t.metadata?.parsedMessage?.elements;return i.jsx(Cd,{children:i.jsx(Go,{content:t.content,elements:r})})}}class Y extends Uo{render({message:t}){const r=t.metadata?.parsedMessage?.elements;return t.metadata?.consoleType==="gamesOutput"&&t.metadata?.parsedMessage&&console.log("[SimpleConsoleRenderer] gamesOutput metadata:",t.metadata),i.jsx(Go,{content:t.content,elements:r})}}class Pd extends Y{constructor(){super(...arguments),this.type="shout"}}class Rd extends Y{constructor(){super(...arguments),this.type="cshout"}}class Ed extends Y{constructor(){super(...arguments),this.type="notification"}}class Md extends Y{constructor(){super(...arguments),this.type="seekAnnouncement"}}class zd extends Y{constructor(){super(...arguments),this.type="matchRequest"}}class Td extends Y{constructor(){super(...arguments),this.type="illegalMove"}}class Ld extends Y{constructor(){super(...arguments),this.type="drawOffer"}}class Id extends Y{constructor(){super(...arguments),this.type="unobserve"}}class Ad extends Y{constructor(){super(...arguments),this.type="gameNotification"}}class Dd extends Y{constructor(){super(...arguments),this.type="whoOutput"}}class Od extends Y{constructor(){super(...arguments),this.type="gamesOutput"}}class Nd extends Y{constructor(){super(...arguments),this.type="fingerOutput"}}class Fd extends Y{constructor(){super(...arguments),this.type="historyOutput"}}class Bd extends Y{constructor(){super(...arguments),this.type="journalOutput"}}class Wd extends Y{constructor(){super(...arguments),this.type="soughtOutput"}}class Hd extends Y{constructor(){super(...arguments),this.type="channelListOutput"}}class _d extends Y{constructor(){super(...arguments),this.type="newsOutput"}}class Ud extends Y{constructor(){super(...arguments),this.type="inOutput"}}class Gd extends Y{constructor(){super(...arguments),this.type="login"}}class Yd extends Y{constructor(){super(...arguments),this.type="password"}}class Vd extends Y{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class qd extends Y{constructor(){super(...arguments),this.type="sessionStart"}}class Kd extends Y{constructor(){super(...arguments),this.type="system"}}class Xd extends Y{constructor(){super(...arguments),this.type="raw"}}function Qd(){H.clear(),H.register(new Pd),H.register(new Rd),H.register(new Ed),H.register(new Md),H.register(new zd),H.register(new Td),H.register(new Ld),H.register(new Id),H.register(new Ad),H.register(new Dd),H.register(new Od),H.register(new Nd),H.register(new Fd),H.register(new Bd),H.register(new Wd),H.register(new Hd),H.register(new _d),H.register(new Ud),H.register(new Gd),H.register(new Yd),H.register(new Vd),H.register(new qd),H.register(new Kd),H.register(new Xd),H.register(new jd)}Qd();const lt=X(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=Ee(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,u=s?o.getConsoleColor(s,a):null,c=s?o.getConsoleFont(s,a):null,l=s?o.getConsoleFontStyle(s,a):null,d={...e,metadata:{...e.metadata,color:u,fontFamily:c,fontStyle:l}},h=H.getRenderer(d);return h?i.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:h.render({message:d,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),i.jsx("div",{children:e.content}))});lt.displayName="Message";const kt=m.div`
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
`,Yo=X(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),o=p.useRef(null),s=t.activeTab,a=s?.messages||[],u=r.username||"You",c=d=>{r.sendCommand(d)};if(p.useEffect(()=>{if(o.current&&a.length>0){const d=o.current,h=setTimeout(()=>{s?.type==="console"?d.scrollTop=d.scrollHeight:kd(d,50)},50);return()=>clearTimeout(h)}},[a.length,a[a.length-1]?.id]),p.useEffect(()=>{if(o.current&&a.length>0){const d=o.current;requestAnimationFrame(()=>{d.scrollTop=d.scrollHeight})}},[s?.id]),!s)return i.jsx(kt,{children:i.jsx(St,{className:"chat-messages-container",children:i.jsx(En,{children:"No active chat"})})});if(a.length===0)return i.jsx(kt,{children:i.jsx(St,{className:"chat-messages-container",children:i.jsx(En,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const l=[];return a.forEach((d,h)=>{const g=h>0?a[h-1]:null,f=g?new Date(d.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===d.sender&&g.type===d.type&&f<6e4?l[l.length-1].messages.push(d):l.push({sender:d.sender,timestamp:new Date(d.timestamp),messages:[d]})}),s.type==="console"?i.jsx(kt,{children:i.jsx(St,{ref:o,className:"chat-messages-container",children:a.map(d=>i.jsx(Ct,{children:i.jsx(lt,{message:d,currentUsername:u,onCommandClick:c,onHover:e})},d.id))})}):i.jsx(kt,{children:i.jsx(St,{ref:o,className:"chat-messages-container",children:l.map((d,h)=>d.messages[0].type==="system"?i.jsx(Zd,{children:d.messages.map(f=>i.jsx(Ct,{children:i.jsx(lt,{message:f,currentUsername:u,onCommandClick:c,onHover:e})},f.id))},h):i.jsx(Jd,{children:d.messages.map((f,b)=>{if(b===0)return i.jsx(Ct,{children:i.jsx(lt,{message:f,currentUsername:u,onCommandClick:c,onHover:e})},f.id);{const y={...f,sender:"",metadata:{...f.metadata,isGroupedMessage:!0}};return i.jsx(Ct,{children:i.jsx(lt,{message:y,currentUsername:u,onCommandClick:c,onHover:e})},f.id)}})},h))})})});Yo.displayName="ChatMessages";const eu=m.div`
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
`,Vo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:s=!1})=>{const a=p.useRef(null),u=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e&&r(e)):l.key==="ArrowUp"&&!e?(l.preventDefault(),n?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),n?.("down"))},c=()=>{e&&r(e)};return i.jsxs(eu,{children:[i.jsx(tu,{ref:a,value:e,onChange:l=>t(l.target.value),onKeyDown:u,placeholder:o,disabled:s,autoComplete:"off",spellCheck:"true",rows:1}),i.jsx(ru,{onClick:c,disabled:s||!e,title:"Send message (Enter)",children:"Send"})]})};Vo.displayName="ChatInput";const nu=m.div`
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
`,qo=X(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=Ee(),[s,a]=p.useState(""),[u,c]=p.useState(!1),[l,d]=p.useState(null);Z.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),Z.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const h=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!f.trim())return;const b=f.split(`
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(f.startsWith("/")||f.startsWith("\\")){const y=f.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const v=y.id.replace("channel-","");n.sendCommand(`tell ${v} ${f}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${f}`);else{const v=f.match(/^tell\s+(\w+)\s+(.+)$/);if(v){const[,x,C]=v,$=x.replace(/\([^)]*\)/g,"").trim(),w=/^\d+$/.test($);if(w&&o.preferences.openChannelsInTabs){const S=`channel-${$}`;r.createTab(S,$,"channel")}else if(!w&&o.preferences.openTellsInTabs){const S=$.toLowerCase();r.createTab(S,$,"private"),r.addMessage(S,{channel:S,sender:"You",content:C,timestamp:new Date,type:"message"})}}else r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"});n.sendCommand(f)}}a("")},g=f=>{const b=r.navigateHistory(f);b!==null&&a(b)};return i.jsxs(nu,{className:e,$compact:t,children:[!t&&i.jsxs(ou,{children:[i.jsx(iu,{children:"Chat"}),n.averagePing!==null&&i.jsxs(au,{children:["Ping: ",n.averagePing,"ms"]}),l&&i.jsxs(su,{children:["Received: ",new Date(l).toLocaleTimeString()]})]}),i.jsxs(cu,{children:[i.jsx(_o,{}),i.jsx(Yo,{onMessageHover:d}),i.jsx(Vo,{value:s,onChange:a,onSend:h,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});qo.displayName="ChatPanel";const lu=m.div`
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
`,Ko=X(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Oe(),o=Ro(),s=Eo(),a=Ja(),[u,c]=p.useState(600),[l,d]=p.useState(!1),h=p.useRef(!1);p.useEffect(()=>{!h.current&&r&&(h.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),p.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),p.useEffect(()=>{const v=e.preferences.chessOrientation;s.includes(v)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=v=>{v.preventDefault(),d(!0)};p.useEffect(()=>{if(!l)return;const v=C=>{const $=window.innerWidth-C.clientX;c(Math.max(300,Math.min(600,$))),window.dispatchEvent(new Event("resize"))},x=()=>{d(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",x)}},[l]);const f=t==="chess-only"||t==="chess-and-chat",b=t==="chat-only"||t==="chess-and-chat",y=t==="chess-and-chat"&&!n.isMobile;return i.jsxs(lu,{children:[i.jsx(zo,{}),i.jsxs(du,{children:[i.jsx(uu,{$isVisible:f,children:i.jsx(Ho,{hasChat:b,chatWidth:b&&!n.isMobile?u:0})}),y&&i.jsx(pu,{$isVisible:!0,onMouseDown:g,style:{cursor:l?"col-resize":"ew-resize"}}),i.jsx(hu,{$isVisible:b,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:b&&!n.isMobile?`${u}px`:void 0},children:i.jsx(qo,{})})]})]})});Ko.displayName="AppLayout";const mu=Wa`
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
`,fu=()=>i.jsx(Zo,{children:i.jsxs(_a,{children:[i.jsx(mu,{}),i.jsx(Cs,{children:i.jsx(ts,{children:i.jsx(_n,{path:"/",element:i.jsx(ec,{children:i.jsx(Ko,{})})})})})]})}),Xo=document.getElementById("root");if(!Xo)throw new Error("Root element not found");const gu=zn(Xo);gu.render(i.jsx(fu,{}));
