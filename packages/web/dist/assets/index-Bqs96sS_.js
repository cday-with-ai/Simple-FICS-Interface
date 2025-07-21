import{u as Oe,j as i,a as Ee,b as _t,c as Nn,d as pr,e as Gt,V as ri,f as ni,l as _r,R as oi}from"./shared-BR2FNcNJ.js";import{a as ii,r as f,R as oe}from"./vendor-cxkclgJA.js";import{o as K}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var On,Gr=ii;On=Gr.createRoot,Gr.hydrateRoot;var Rr={};Object.defineProperty(Rr,"__esModule",{value:!0});Rr.parse=hi;Rr.serialize=pi;const si=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,ai=/^[\u0021-\u003A\u003C-\u007E]*$/,ci=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,li=/^[\u0020-\u003A\u003D-\u007E]*$/,di=Object.prototype.toString,ui=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function hi(e,t){const r=new ui,n=e.length;if(n<2)return r;const o=t?.decode||mi;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const h=e.indexOf(";",s),c=h===-1?n:h;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const d=Ur(e,s,a),l=Yr(e,a,d),p=e.slice(d,l);if(r[p]===void 0){let g=Ur(e,a+1,c),u=Yr(e,c,g);const y=o(e.slice(g,u));r[p]=y}s=c+1}while(s<n);return r}function Ur(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Yr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function pi(e,t,r){const n=r?.encode||encodeURIComponent;if(!si.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!ai.test(o))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+o;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!ci.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!li.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!fi(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function mi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function fi(e){return di.call(e)==="[object Date]"}var Vr="popstate";function gi(e={}){function t(n,o){let{pathname:s,search:a,hash:h}=n.location;return mr("",{pathname:s,search:a,hash:h},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:ft(o)}return yi(t,r,null,e)}function Y(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ke(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function xi(){return Math.random().toString(36).substring(2,10)}function qr(e,t){return{usr:e.state,key:e.key,idx:t}}function mr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?nt(t):t,state:r,key:t&&t.key||n||xi()}}function ft({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function nt(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function yi(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:s=!1}=n,a=o.history,h="POP",c=null,d=l();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function l(){return(a.state||{idx:null}).idx}function p(){h="POP";let $=l(),x=$==null?null:$-d;d=$,c&&c({action:h,location:b.location,delta:x})}function g($,x){h="PUSH";let k=mr(b.location,$,x);d=l()+1;let S=qr(k,d),C=b.createHref(k);try{a.pushState(S,"",C)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;o.location.assign(C)}s&&c&&c({action:h,location:b.location,delta:1})}function u($,x){h="REPLACE";let k=mr(b.location,$,x);d=l();let S=qr(k,d),C=b.createHref(k);a.replaceState(S,"",C),s&&c&&c({action:h,location:b.location,delta:0})}function y($){return bi($)}let b={get action(){return h},get location(){return e(o,a)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Vr,p),c=$,()=>{o.removeEventListener(Vr,p),c=null}},createHref($){return t(o,$)},createURL:y,encodeLocation($){let x=y($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:u,go($){return a.go($)}};return b}function bi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),Y(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:ft(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Fn(e,t,r="/"){return $i(e,t,r,!1)}function $i(e,t,r,n){let o=typeof t=="string"?nt(t):t,s=Me(o.pathname||"/",r);if(s==null)return null;let a=Bn(e);vi(a);let h=null;for(let c=0;h==null&&c<a.length;++c){let d=Li(s);h=Ei(a[c],d,n)}return h}function Bn(e,t=[],r=[],n=""){let o=(s,a,h)=>{let c={relativePath:h===void 0?s.path||"":h,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(Y(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let d=Re([n,c.relativePath]),l=r.concat(c);s.children&&s.children.length>0&&(Y(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Bn(s.children,t,l,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Ri(d,s.index),routesMeta:l})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))o(s,a);else for(let h of Wn(s.path))o(s,a,h)}),t}function Wn(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return o?[s,""]:[s];let a=Wn(n.join("/")),h=[];return h.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&h.push(...a),h.map(c=>e.startsWith("/")&&c===""?"/":c)}function vi(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Mi(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var wi=/^:[\w-]+$/,ki=3,Si=2,Ci=1,ji=10,Pi=-2,Kr=e=>e==="*";function Ri(e,t){let r=e.split("/"),n=r.length;return r.some(Kr)&&(n+=Pi),t&&(n+=Si),r.filter(o=>!Kr(o)).reduce((o,s)=>o+(wi.test(s)?ki:s===""?Ci:ji),n)}function Mi(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Ei(e,t,r=!1){let{routesMeta:n}=e,o={},s="/",a=[];for(let h=0;h<n.length;++h){let c=n[h],d=h===n.length-1,l=s==="/"?t:t.slice(s.length)||"/",p=Ot({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},l),g=c.route;if(!p&&d&&r&&!n[n.length-1].route.index&&(p=Ot({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},l)),!p)return null;Object.assign(o,p.params),a.push({params:o,pathname:Re([s,p.pathname]),pathnameBase:Di(Re([s,p.pathnameBase])),route:g}),p.pathnameBase!=="/"&&(s=Re([s,p.pathnameBase]))}return a}function Ot(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=zi(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),h=o.slice(1);return{params:n.reduce((d,{paramName:l,isOptional:p},g)=>{if(l==="*"){let y=h[g]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const u=h[g];return p&&!u?d[l]=void 0:d[l]=(u||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function zi(e,t=!1,r=!0){ke(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,h,c)=>(n.push({paramName:h,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function Li(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ke(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Me(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ti(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?nt(e):e;return{pathname:r?r.startsWith("/")?r:Ii(r,t):t,search:Ni(n),hash:Oi(o)}}function Ii(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function er(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ai(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Hn(e){let t=Ai(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function _n(e,t,r,n=!1){let o;typeof e=="string"?o=nt(e):(o={...e},Y(!o.pathname||!o.pathname.includes("?"),er("?","pathname","search",o)),Y(!o.pathname||!o.pathname.includes("#"),er("#","pathname","hash",o)),Y(!o.search||!o.search.includes("#"),er("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,h;if(a==null)h=r;else{let p=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),p-=1;o.pathname=g.join("/")}h=p>=0?t[p]:"/"}let c=Ti(o,h),d=a&&a!=="/"&&a.endsWith("/"),l=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||l)&&(c.pathname+="/"),c}var Re=e=>e.join("/").replace(/\/\/+/g,"/"),Di=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ni=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Oi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Fi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Gn=["POST","PUT","PATCH","DELETE"];new Set(Gn);var Bi=["GET",...Gn];new Set(Bi);var ot=f.createContext(null);ot.displayName="DataRouter";var Ut=f.createContext(null);Ut.displayName="DataRouterState";var Un=f.createContext({isTransitioning:!1});Un.displayName="ViewTransition";var Wi=f.createContext(new Map);Wi.displayName="Fetchers";var Hi=f.createContext(null);Hi.displayName="Await";var Se=f.createContext(null);Se.displayName="Navigation";var bt=f.createContext(null);bt.displayName="Location";var ze=f.createContext({outlet:null,matches:[],isDataRoute:!1});ze.displayName="Route";var Mr=f.createContext(null);Mr.displayName="RouteError";function _i(e,{relative:t}={}){Y($t(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=f.useContext(Se),{hash:o,pathname:s,search:a}=vt(e,{relative:t}),h=s;return r!=="/"&&(h=s==="/"?r:Re([r,s])),n.createHref({pathname:h,search:a,hash:o})}function $t(){return f.useContext(bt)!=null}function Ue(){return Y($t(),"useLocation() may be used only in the context of a <Router> component."),f.useContext(bt).location}var Yn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Vn(e){f.useContext(Se).static||f.useLayoutEffect(e)}function Gi(){let{isDataRoute:e}=f.useContext(ze);return e?ns():Ui()}function Ui(){Y($t(),"useNavigate() may be used only in the context of a <Router> component.");let e=f.useContext(ot),{basename:t,navigator:r}=f.useContext(Se),{matches:n}=f.useContext(ze),{pathname:o}=Ue(),s=JSON.stringify(Hn(n)),a=f.useRef(!1);return Vn(()=>{a.current=!0}),f.useCallback((c,d={})=>{if(ke(a.current,Yn),!a.current)return;if(typeof c=="number"){r.go(c);return}let l=_n(c,JSON.parse(s),o,d.relative==="path");e==null&&t!=="/"&&(l.pathname=l.pathname==="/"?t:Re([t,l.pathname])),(d.replace?r.replace:r.push)(l,d.state,d)},[t,r,s,o,e])}f.createContext(null);function vt(e,{relative:t}={}){let{matches:r}=f.useContext(ze),{pathname:n}=Ue(),o=JSON.stringify(Hn(r));return f.useMemo(()=>_n(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Yi(e,t){return qn(e,t)}function qn(e,t,r,n){Y($t(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=f.useContext(Se),{matches:s}=f.useContext(ze),a=s[s.length-1],h=a?a.params:{},c=a?a.pathname:"/",d=a?a.pathnameBase:"/",l=a&&a.route;{let x=l&&l.path||"";Kn(c,!l||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let p=Ue(),g;if(t){let x=typeof t=="string"?nt(t):t;Y(d==="/"||x.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=p;let u=g.pathname||"/",y=u;if(d!=="/"){let x=d.replace(/^\//,"").split("/");y="/"+u.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=Fn(e,{pathname:y});ke(l||b!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),ke(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=Qi(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},h,x.params),pathname:Re([d,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?d:Re([d,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),s,r,n);return t&&$?f.createElement(bt.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},$):$}function Vi(){let e=rs(),t=Fi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=f.createElement(f.Fragment,null,f.createElement("p",null,"💿 Hey developer 👋"),f.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",f.createElement("code",{style:s},"ErrorBoundary")," or"," ",f.createElement("code",{style:s},"errorElement")," prop on your route.")),f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:o},r):null,a)}var qi=f.createElement(Vi,null),Ki=class extends f.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?f.createElement(ze.Provider,{value:this.props.routeContext},f.createElement(Mr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Xi({routeContext:e,match:t,children:r}){let n=f.useContext(ot);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),f.createElement(ze.Provider,{value:e},r)}function Qi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=r?.errors;if(s!=null){let c=o.findIndex(d=>d.route.id&&s?.[d.route.id]!==void 0);Y(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,h=-1;if(r)for(let c=0;c<o.length;c++){let d=o[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(h=c),d.route.id){let{loaderData:l,errors:p}=r,g=d.route.loader&&!l.hasOwnProperty(d.route.id)&&(!p||p[d.route.id]===void 0);if(d.route.lazy||g){a=!0,h>=0?o=o.slice(0,h+1):o=[o[0]];break}}}return o.reduceRight((c,d,l)=>{let p,g=!1,u=null,y=null;r&&(p=s&&d.route.id?s[d.route.id]:void 0,u=d.route.errorElement||qi,a&&(h<0&&l===0?(Kn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,y=null):h===l&&(g=!0,y=d.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,l+1)),$=()=>{let x;return p?x=u:g?x=y:d.route.Component?x=f.createElement(d.route.Component,null):d.route.element?x=d.route.element:x=c,f.createElement(Xi,{match:d,routeContext:{outlet:c,matches:b,isDataRoute:r!=null},children:x})};return r&&(d.route.ErrorBoundary||d.route.errorElement||l===0)?f.createElement(Ki,{location:r.location,revalidation:r.revalidation,component:u,error:p,children:$(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):$()},null)}function Er(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ji(e){let t=f.useContext(ot);return Y(t,Er(e)),t}function Zi(e){let t=f.useContext(Ut);return Y(t,Er(e)),t}function es(e){let t=f.useContext(ze);return Y(t,Er(e)),t}function zr(e){let t=es(e),r=t.matches[t.matches.length-1];return Y(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function ts(){return zr("useRouteId")}function rs(){let e=f.useContext(Mr),t=Zi("useRouteError"),r=zr("useRouteError");return e!==void 0?e:t.errors?.[r]}function ns(){let{router:e}=Ji("useNavigate"),t=zr("useNavigate"),r=f.useRef(!1);return Vn(()=>{r.current=!0}),f.useCallback(async(o,s={})=>{ke(r.current,Yn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...s}))},[e,t])}var Xr={};function Kn(e,t,r){!t&&!Xr[e]&&(Xr[e]=!0,ke(!1,r))}f.memo(os);function os({routes:e,future:t,state:r}){return qn(e,void 0,r,t)}function Xn(e){Y(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function is({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:s=!1}){Y(!$t(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),h=f.useMemo(()=>({basename:a,navigator:o,static:s,future:{}}),[a,o,s]);typeof r=="string"&&(r=nt(r));let{pathname:c="/",search:d="",hash:l="",state:p=null,key:g="default"}=r,u=f.useMemo(()=>{let y=Me(c,a);return y==null?null:{location:{pathname:y,search:d,hash:l,state:p,key:g},navigationType:n}},[a,c,d,l,p,g,n]);return ke(u!=null,`<Router basename="${a}"> is not able to match the URL "${c}${d}${l}" because it does not start with the basename, so the <Router> won't render anything.`),u==null?null:f.createElement(Se.Provider,{value:h},f.createElement(bt.Provider,{children:t,value:u}))}function ss({children:e,location:t}){return Yi(fr(e),t)}function fr(e,t=[]){let r=[];return f.Children.forEach(e,(n,o)=>{if(!f.isValidElement(n))return;let s=[...t,o];if(n.type===f.Fragment){r.push.apply(r,fr(n.props.children,s));return}Y(n.type===Xn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Y(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=fr(n.props.children,s)),r.push(a)}),r}var zt="get",Lt="application/x-www-form-urlencoded";function Yt(e){return e!=null&&typeof e.tagName=="string"}function as(e){return Yt(e)&&e.tagName.toLowerCase()==="button"}function cs(e){return Yt(e)&&e.tagName.toLowerCase()==="form"}function ls(e){return Yt(e)&&e.tagName.toLowerCase()==="input"}function ds(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function us(e,t){return e.button===0&&(!t||t==="_self")&&!ds(e)}var St=null;function hs(){if(St===null)try{new FormData(document.createElement("form"),0),St=!1}catch{St=!0}return St}var ps=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function tr(e){return e!=null&&!ps.has(e)?(ke(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Lt}"`),null):e}function ms(e,t){let r,n,o,s,a;if(cs(e)){let h=e.getAttribute("action");n=h?Me(h,t):null,r=e.getAttribute("method")||zt,o=tr(e.getAttribute("enctype"))||Lt,s=new FormData(e)}else if(as(e)||ls(e)&&(e.type==="submit"||e.type==="image")){let h=e.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||h.getAttribute("action");if(n=c?Me(c,t):null,r=e.getAttribute("formmethod")||h.getAttribute("method")||zt,o=tr(e.getAttribute("formenctype"))||tr(h.getAttribute("enctype"))||Lt,s=new FormData(h,e),!hs()){let{name:d,type:l,value:p}=e;if(l==="image"){let g=d?`${d}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else d&&s.append(d,p)}}else{if(Yt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=zt,n=null,o=Lt,a=e}return s&&o==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:s,body:a}}function Lr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function fs(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function gs(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function xs(e,t,r){let n=await Promise.all(e.map(async o=>{let s=t.routes[o.route.id];if(s){let a=await fs(s,r);return a.links?a.links():[]}return[]}));return vs(n.flat(1).filter(gs).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Qr(e,t,r,n,o,s){let a=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,h=(c,d)=>r[d].pathname!==c.pathname||r[d].route.path?.endsWith("*")&&r[d].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,d)=>a(c,d)||h(c,d)):s==="data"?t.filter((c,d)=>{let l=n.routes[c.route.id];if(!l||!l.hasLoader)return!1;if(a(c,d)||h(c,d))return!0;if(c.route.shouldRevalidate){let p=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function ys(e,t,{includeHydrateFallback:r}={}){return bs(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let s=[o.module];return o.clientActionModule&&(s=s.concat(o.clientActionModule)),o.clientLoaderModule&&(s=s.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(s=s.concat(o.hydrateFallbackModule)),o.imports&&(s=s.concat(o.imports)),s}).flat(1))}function bs(e){return[...new Set(e)]}function $s(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function vs(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let s=JSON.stringify($s(o));return r.has(s)||(r.add(s),n.push({key:s,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var ws=new Set([100,101,204,205]);function ks(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Me(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Qn(){let e=f.useContext(ot);return Lr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Ss(){let e=f.useContext(Ut);return Lr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Tr=f.createContext(void 0);Tr.displayName="FrameworkContext";function Jn(){let e=f.useContext(Tr);return Lr(e,"You must render this element inside a <HydratedRouter> element"),e}function Cs(e,t){let r=f.useContext(Tr),[n,o]=f.useState(!1),[s,a]=f.useState(!1),{onFocus:h,onBlur:c,onMouseEnter:d,onMouseLeave:l,onTouchStart:p}=t,g=f.useRef(null);f.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=x=>{x.forEach(k=>{a(k.isIntersecting)})},$=new IntersectionObserver(b,{threshold:.5});return g.current&&$.observe(g.current),()=>{$.disconnect()}}},[e]),f.useEffect(()=>{if(n){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[n]);let u=()=>{o(!0)},y=()=>{o(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:ct(h,u),onBlur:ct(c,y),onMouseEnter:ct(d,u),onMouseLeave:ct(l,y),onTouchStart:ct(p,u)}]:[!1,g,{}]}function ct(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function js({page:e,...t}){let{router:r}=Qn(),n=f.useMemo(()=>Fn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?f.createElement(Rs,{page:e,matches:n,...t}):null}function Ps(e){let{manifest:t,routeModules:r}=Jn(),[n,o]=f.useState([]);return f.useEffect(()=>{let s=!1;return xs(e,t,r).then(a=>{s||o(a)}),()=>{s=!0}},[e,t,r]),n}function Rs({page:e,matches:t,...r}){let n=Ue(),{manifest:o,routeModules:s}=Jn(),{basename:a}=Qn(),{loaderData:h,matches:c}=Ss(),d=f.useMemo(()=>Qr(e,t,c,o,n,"data"),[e,t,c,o,n]),l=f.useMemo(()=>Qr(e,t,c,o,n,"assets"),[e,t,c,o,n]),p=f.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let y=new Set,b=!1;if(t.forEach(x=>{let k=o.routes[x.route.id];!k||!k.hasLoader||(!d.some(S=>S.route.id===x.route.id)&&x.route.id in h&&s[x.route.id]?.shouldRevalidate||k.hasClientLoader?b=!0:y.add(x.route.id))}),y.size===0)return[];let $=ks(e,a);return b&&y.size>0&&$.searchParams.set("_routes",t.filter(x=>y.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[a,h,n,o,d,t,e,s]),g=f.useMemo(()=>ys(l,o),[l,o]),u=Ps(l);return f.createElement(f.Fragment,null,p.map(y=>f.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...r})),g.map(y=>f.createElement("link",{key:y,rel:"modulepreload",href:y,...r})),u.map(({key:y,link:b})=>f.createElement("link",{key:y,...b})))}function Ms(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var Zn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Zn&&(window.__reactRouterVersion="7.6.3")}catch{}function Es({basename:e,children:t,window:r}){let n=f.useRef();n.current==null&&(n.current=gi({window:r,v5Compat:!0}));let o=n.current,[s,a]=f.useState({action:o.action,location:o.location}),h=f.useCallback(c=>{f.startTransition(()=>a(c))},[a]);return f.useLayoutEffect(()=>o.listen(h),[o,h]),f.createElement(is,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o})}var eo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,to=f.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:s,replace:a,state:h,target:c,to:d,preventScrollReset:l,viewTransition:p,...g},u){let{basename:y}=f.useContext(Se),b=typeof d=="string"&&eo.test(d),$,x=!1;if(typeof d=="string"&&b&&($=d,Zn))try{let _=new URL(window.location.href),Q=d.startsWith("//")?new URL(_.protocol+d):new URL(d),v=Me(Q.pathname,y);Q.origin===_.origin&&v!=null?d=v+Q.search+Q.hash:x=!0}catch{ke(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=_i(d,{relative:o}),[S,C,j]=Cs(n,g),T=Is(d,{replace:a,state:h,target:c,preventScrollReset:l,relative:o,viewTransition:p});function E(_){t&&t(_),_.defaultPrevented||T(_)}let H=f.createElement("a",{...g,...j,href:$||k,onClick:x||s?t:E,ref:Ms(u,C),target:c,"data-discover":!b&&r==="render"?"true":void 0});return S&&!b?f.createElement(f.Fragment,null,H,f.createElement(js,{page:k})):H});to.displayName="Link";var zs=f.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:s,to:a,viewTransition:h,children:c,...d},l){let p=vt(a,{relative:d.relative}),g=Ue(),u=f.useContext(Ut),{navigator:y,basename:b}=f.useContext(Se),$=u!=null&&Fs(p)&&h===!0,x=y.encodeLocation?y.encodeLocation(p).pathname:p.pathname,k=g.pathname,S=u&&u.navigation&&u.navigation.location?u.navigation.location.pathname:null;r||(k=k.toLowerCase(),S=S?S.toLowerCase():null,x=x.toLowerCase()),S&&b&&(S=Me(S,b)||S);const C=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let j=k===x||!o&&k.startsWith(x)&&k.charAt(C)==="/",T=S!=null&&(S===x||!o&&S.startsWith(x)&&S.charAt(x.length)==="/"),E={isActive:j,isPending:T,isTransitioning:$},H=j?t:void 0,_;typeof n=="function"?_=n(E):_=[n,j?"active":null,T?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let Q=typeof s=="function"?s(E):s;return f.createElement(to,{...d,"aria-current":H,className:_,ref:l,style:Q,to:a,viewTransition:h},typeof c=="function"?c(E):c)});zs.displayName="NavLink";var Ls=f.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:s,method:a=zt,action:h,onSubmit:c,relative:d,preventScrollReset:l,viewTransition:p,...g},u)=>{let y=Ns(),b=Os(h,{relative:d}),$=a.toLowerCase()==="get"?"get":"post",x=typeof h=="string"&&eo.test(h),k=S=>{if(c&&c(S),S.defaultPrevented)return;S.preventDefault();let C=S.nativeEvent.submitter,j=C?.getAttribute("formmethod")||a;y(C||S.currentTarget,{fetcherKey:t,method:j,navigate:r,replace:o,state:s,relative:d,preventScrollReset:l,viewTransition:p})};return f.createElement("form",{ref:u,method:$,action:b,onSubmit:n?c:k,...g,"data-discover":!x&&e==="render"?"true":void 0})});Ls.displayName="Form";function Ts(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ro(e){let t=f.useContext(ot);return Y(t,Ts(e)),t}function Is(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:s,viewTransition:a}={}){let h=Gi(),c=Ue(),d=vt(e,{relative:s});return f.useCallback(l=>{if(us(l,t)){l.preventDefault();let p=r!==void 0?r:ft(c)===ft(d);h(e,{replace:p,state:n,preventScrollReset:o,relative:s,viewTransition:a})}},[c,h,d,r,n,t,e,o,s,a])}var As=0,Ds=()=>`__${String(++As)}__`;function Ns(){let{router:e}=ro("useSubmit"),{basename:t}=f.useContext(Se),r=ts();return f.useCallback(async(n,o={})=>{let{action:s,method:a,encType:h,formData:c,body:d}=ms(n,t);if(o.navigate===!1){let l=o.fetcherKey||Ds();await e.fetch(l,r,o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||h,flushSync:o.flushSync})}else await e.navigate(o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||h,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Os(e,{relative:t}={}){let{basename:r}=f.useContext(Se),n=f.useContext(ze);Y(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),s={...vt(e||".",{relative:t})},a=Ue();if(e==null){s.search=a.search;let h=new URLSearchParams(s.search),c=h.getAll("index");if(c.some(l=>l==="")){h.delete("index"),c.filter(p=>p).forEach(p=>h.append("index",p));let l=h.toString();s.search=l?`?${l}`:""}}return(!e||e===".")&&o.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Re([r,s.pathname])),ft(s)}function Fs(e,t={}){let r=f.useContext(Un);Y(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=ro("useViewTransitionState"),o=vt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Me(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Me(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Ot(o.pathname,a)!=null||Ot(o.pathname,s)!=null}[...ws];const no={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Bs={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Ws={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},oo={colors:Bs,...no},Hs={colors:Ws,...no},_s={light:oo,dark:Hs},Gs=oo;var ne=function(){return ne=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},ne.apply(this,arguments)};function gt(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var U="-ms-",mt="-moz-",W="-webkit-",io="comm",Vt="rule",Ir="decl",Us="@import",so="@keyframes",Ys="@layer",ao=Math.abs,Ar=String.fromCharCode,gr=Object.assign;function Vs(e,t){return re(e,0)^45?(((t<<2^re(e,0))<<2^re(e,1))<<2^re(e,2))<<2^re(e,3):0}function co(e){return e.trim()}function Pe(e,t){return(e=t.exec(e))?e[0]:e}function A(e,t,r){return e.replace(t,r)}function Tt(e,t,r){return e.indexOf(t,r)}function re(e,t){return e.charCodeAt(t)|0}function Je(e,t,r){return e.slice(t,r)}function ve(e){return e.length}function lo(e){return e.length}function lt(e,t){return t.push(e),e}function qs(e,t){return e.map(t).join("")}function Jr(e,t){return e.filter(function(r){return!Pe(r,t)})}var qt=1,Ze=1,uo=0,fe=0,J=0,it="";function Kt(e,t,r,n,o,s,a,h){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:qt,column:Ze,length:a,return:"",siblings:h}}function Ae(e,t){return gr(Kt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ye(e){for(;e.root;)e=Ae(e.root,{children:[e]});lt(e,e.siblings)}function Ks(){return J}function Xs(){return J=fe>0?re(it,--fe):0,Ze--,J===10&&(Ze=1,qt--),J}function ye(){return J=fe<uo?re(it,fe++):0,Ze++,J===10&&(Ze=1,qt++),J}function We(){return re(it,fe)}function It(){return fe}function Xt(e,t){return Je(it,e,t)}function xr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Qs(e){return qt=Ze=1,uo=ve(it=e),fe=0,[]}function Js(e){return it="",e}function rr(e){return co(Xt(fe-1,yr(e===91?e+2:e===40?e+1:e)))}function Zs(e){for(;(J=We())&&J<33;)ye();return xr(e)>2||xr(J)>3?"":" "}function ea(e,t){for(;--t&&ye()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return Xt(e,It()+(t<6&&We()==32&&ye()==32))}function yr(e){for(;ye();)switch(J){case e:return fe;case 34:case 39:e!==34&&e!==39&&yr(J);break;case 40:e===41&&yr(e);break;case 92:ye();break}return fe}function ta(e,t){for(;ye()&&e+J!==57;)if(e+J===84&&We()===47)break;return"/*"+Xt(t,fe-1)+"*"+Ar(e===47?e:ye())}function ra(e){for(;!xr(We());)ye();return Xt(e,fe)}function na(e){return Js(At("",null,null,null,[""],e=Qs(e),0,[0],e))}function At(e,t,r,n,o,s,a,h,c){for(var d=0,l=0,p=a,g=0,u=0,y=0,b=1,$=1,x=1,k=0,S="",C=o,j=s,T=n,E=S;$;)switch(y=k,k=ye()){case 40:if(y!=108&&re(E,p-1)==58){Tt(E+=A(rr(k),"&","&\f"),"&\f",ao(d?h[d-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:E+=rr(k);break;case 9:case 10:case 13:case 32:E+=Zs(y);break;case 92:E+=ea(It()-1,7);continue;case 47:switch(We()){case 42:case 47:lt(oa(ta(ye(),It()),t,r,c),c);break;default:E+="/"}break;case 123*b:h[d++]=ve(E)*x;case 125*b:case 59:case 0:switch(k){case 0:case 125:$=0;case 59+l:x==-1&&(E=A(E,/\f/g,"")),u>0&&ve(E)-p&&lt(u>32?en(E+";",n,r,p-1,c):en(A(E," ","")+";",n,r,p-2,c),c);break;case 59:E+=";";default:if(lt(T=Zr(E,t,r,d,l,o,h,S,C=[],j=[],p,s),s),k===123)if(l===0)At(E,t,T,T,C,s,p,h,j);else switch(g===99&&re(E,3)===110?100:g){case 100:case 108:case 109:case 115:At(e,T,T,n&&lt(Zr(e,T,T,0,0,o,h,S,o,C=[],p,j),j),o,j,p,h,n?C:j);break;default:At(E,T,T,T,[""],j,0,h,j)}}d=l=u=0,b=x=1,S=E="",p=a;break;case 58:p=1+ve(E),u=y;default:if(b<1){if(k==123)--b;else if(k==125&&b++==0&&Xs()==125)continue}switch(E+=Ar(k),k*b){case 38:x=l>0?1:(E+="\f",-1);break;case 44:h[d++]=(ve(E)-1)*x,x=1;break;case 64:We()===45&&(E+=rr(ye())),g=We(),l=p=ve(S=E+=ra(It())),k++;break;case 45:y===45&&ve(E)==2&&(b=0)}}return s}function Zr(e,t,r,n,o,s,a,h,c,d,l,p){for(var g=o-1,u=o===0?s:[""],y=lo(u),b=0,$=0,x=0;b<n;++b)for(var k=0,S=Je(e,g+1,g=ao($=a[b])),C=e;k<y;++k)(C=co($>0?u[k]+" "+S:A(S,/&\f/g,u[k])))&&(c[x++]=C);return Kt(e,t,r,o===0?Vt:h,c,d,l,p)}function oa(e,t,r,n){return Kt(e,t,r,io,Ar(Ks()),Je(e,2,-2),0,n)}function en(e,t,r,n,o){return Kt(e,t,r,Ir,Je(e,0,n),Je(e,n+1,-1),n,o)}function ho(e,t,r){switch(Vs(e,t)){case 5103:return W+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return W+e+e;case 4789:return mt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return W+e+mt+e+U+e+e;case 5936:switch(re(e,t+11)){case 114:return W+e+U+A(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return W+e+U+A(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return W+e+U+A(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return W+e+U+e+e;case 6165:return W+e+U+"flex-"+e+e;case 5187:return W+e+A(e,/(\w+).+(:[^]+)/,W+"box-$1$2"+U+"flex-$1$2")+e;case 5443:return W+e+U+"flex-item-"+A(e,/flex-|-self/g,"")+(Pe(e,/flex-|baseline/)?"":U+"grid-row-"+A(e,/flex-|-self/g,""))+e;case 4675:return W+e+U+"flex-line-pack"+A(e,/align-content|flex-|-self/g,"")+e;case 5548:return W+e+U+A(e,"shrink","negative")+e;case 5292:return W+e+U+A(e,"basis","preferred-size")+e;case 6060:return W+"box-"+A(e,"-grow","")+W+e+U+A(e,"grow","positive")+e;case 4554:return W+A(e,/([^-])(transform)/g,"$1"+W+"$2")+e;case 6187:return A(A(A(e,/(zoom-|grab)/,W+"$1"),/(image-set)/,W+"$1"),e,"")+e;case 5495:case 3959:return A(e,/(image-set\([^]*)/,W+"$1$`$1");case 4968:return A(A(e,/(.+:)(flex-)?(.*)/,W+"box-pack:$3"+U+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+W+e+e;case 4200:if(!Pe(e,/flex-|baseline/))return U+"grid-column-align"+Je(e,t)+e;break;case 2592:case 3360:return U+A(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,Pe(n.props,/grid-\w+-end/)})?~Tt(e+(r=r[t].value),"span",0)?e:U+A(e,"-start","")+e+U+"grid-row-span:"+(~Tt(r,"span",0)?Pe(r,/\d+/):+Pe(r,/\d+/)-+Pe(e,/\d+/))+";":U+A(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return Pe(n.props,/grid-\w+-start/)})?e:U+A(A(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return A(e,/(.+)-inline(.+)/,W+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ve(e)-1-t>6)switch(re(e,t+1)){case 109:if(re(e,t+4)!==45)break;case 102:return A(e,/(.+:)(.+)-([^]+)/,"$1"+W+"$2-$3$1"+mt+(re(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Tt(e,"stretch",0)?ho(A(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return A(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,h,c,d){return U+o+":"+s+d+(a?U+o+"-span:"+(h?c:+c-+s)+d:"")+e});case 4949:if(re(e,t+6)===121)return A(e,":",":"+W)+e;break;case 6444:switch(re(e,re(e,14)===45?18:11)){case 120:return A(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+W+(re(e,14)===45?"inline-":"")+"box$3$1"+W+"$2$3$1"+U+"$2box$3")+e;case 100:return A(e,":",":"+U)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return A(e,"scroll-","scroll-snap-")+e}return e}function Ft(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function ia(e,t,r,n){switch(e.type){case Ys:if(e.children.length)break;case Us:case Ir:return e.return=e.return||e.value;case io:return"";case so:return e.return=e.value+"{"+Ft(e.children,n)+"}";case Vt:if(!ve(e.value=e.props.join(",")))return""}return ve(r=Ft(e.children,n))?e.return=e.value+"{"+r+"}":""}function sa(e){var t=lo(e);return function(r,n,o,s){for(var a="",h=0;h<t;h++)a+=e[h](r,n,o,s)||"";return a}}function aa(e){return function(t){t.root||(t=t.return)&&e(t)}}function ca(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Ir:e.return=ho(e.value,e.length,r);return;case so:return Ft([Ae(e,{value:A(e.value,"@","@"+W)})],n);case Vt:if(e.length)return qs(r=e.props,function(o){switch(Pe(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ye(Ae(e,{props:[A(o,/:(read-\w+)/,":"+mt+"$1")]})),Ye(Ae(e,{props:[o]})),gr(e,{props:Jr(r,n)});break;case"::placeholder":Ye(Ae(e,{props:[A(o,/:(plac\w+)/,":"+W+"input-$1")]})),Ye(Ae(e,{props:[A(o,/:(plac\w+)/,":"+mt+"$1")]})),Ye(Ae(e,{props:[A(o,/:(plac\w+)/,U+"input-$1")]})),Ye(Ae(e,{props:[o]})),gr(e,{props:Jr(r,n)});break}return""})}}var la={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},et=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",po="active",mo="data-styled-version",Qt="6.1.19",Dr=`/*!sc*/
`,Bt=typeof window<"u"&&typeof document<"u",da=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),ua={},Jt=Object.freeze([]),tt=Object.freeze({});function fo(e,t,r){return r===void 0&&(r=tt),e.theme!==r.theme&&e.theme||t||r.theme}var go=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ha=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,pa=/(^-|-$)/g;function tn(e){return e.replace(ha,"-").replace(pa,"")}var ma=/(a)(d)/gi,Ct=52,rn=function(e){return String.fromCharCode(e+(e>25?39:97))};function br(e){var t,r="";for(t=Math.abs(e);t>Ct;t=t/Ct|0)r=rn(t%Ct)+r;return(rn(t%Ct)+r).replace(ma,"$1-$2")}var nr,xo=5381,Ke=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},yo=function(e){return Ke(xo,e)};function bo(e){return br(yo(e)>>>0)}function fa(e){return e.displayName||e.name||"Component"}function or(e){return typeof e=="string"&&!0}var $o=typeof Symbol=="function"&&Symbol.for,vo=$o?Symbol.for("react.memo"):60115,ga=$o?Symbol.for("react.forward_ref"):60112,xa={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ya={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},wo={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ba=((nr={})[ga]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},nr[vo]=wo,nr);function nn(e){return("type"in(t=e)&&t.type.$$typeof)===vo?wo:"$$typeof"in e?ba[e.$$typeof]:xa;var t}var $a=Object.defineProperty,va=Object.getOwnPropertyNames,on=Object.getOwnPropertySymbols,wa=Object.getOwnPropertyDescriptor,ka=Object.getPrototypeOf,sn=Object.prototype;function ko(e,t,r){if(typeof t!="string"){if(sn){var n=ka(t);n&&n!==sn&&ko(e,n,r)}var o=va(t);on&&(o=o.concat(on(t)));for(var s=nn(e),a=nn(t),h=0;h<o.length;++h){var c=o[h];if(!(c in ya||r&&r[c]||a&&c in a||s&&c in s)){var d=wa(t,c);try{$a(e,c,d)}catch{}}}}return e}function He(e){return typeof e=="function"}function Nr(e){return typeof e=="object"&&"styledComponentId"in e}function Be(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function $r(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function xt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function vr(e,t,r){if(r===void 0&&(r=!1),!r&&!xt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=vr(e[n],t[n]);else if(xt(t))for(var n in t)e[n]=vr(e[n],t[n]);return e}function Or(e,t){Object.defineProperty(e,"toString",{value:t})}function _e(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Sa=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw _e(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var h=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(h,r[a])&&(this.groupSizes[t]++,h++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Dr);return r},e}(),Dt=new Map,Wt=new Map,Nt=1,jt=function(e){if(Dt.has(e))return Dt.get(e);for(;Wt.has(Nt);)Nt++;var t=Nt++;return Dt.set(e,t),Wt.set(t,e),t},Ca=function(e,t){Nt=t+1,Dt.set(e,t),Wt.set(t,e)},ja="style[".concat(et,"][").concat(mo,'="').concat(Qt,'"]'),Pa=new RegExp("^".concat(et,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ra=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},Ma=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Dr),o=[],s=0,a=n.length;s<a;s++){var h=n[s].trim();if(h){var c=h.match(Pa);if(c){var d=0|parseInt(c[1],10),l=c[2];d!==0&&(Ca(l,d),Ra(e,l,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(h)}}},an=function(e){for(var t=document.querySelectorAll(ja),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(et)!==po&&(Ma(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Ea(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var So=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(h){var c=Array.from(h.querySelectorAll("style[".concat(et,"]")));return c[c.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(et,po),n.setAttribute(mo,Qt);var a=Ea();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},za=function(){function e(t){this.element=So(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var a=n[o];if(a.ownerNode===r)return a}throw _e(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),La=function(){function e(t){this.element=So(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Ta=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),cn=Bt,Ia={isServer:!Bt,useCSSOMInjection:!da},Ht=function(){function e(t,r,n){t===void 0&&(t=tt),r===void 0&&(r={});var o=this;this.options=ne(ne({},Ia),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Bt&&cn&&(cn=!1,an(this)),Or(this,function(){return function(s){for(var a=s.getTag(),h=a.length,c="",d=function(p){var g=function(x){return Wt.get(x)}(p);if(g===void 0)return"continue";var u=s.names.get(g),y=a.getGroup(p);if(u===void 0||!u.size||y.length===0)return"continue";var b="".concat(et,".g").concat(p,'[id="').concat(g,'"]'),$="";u!==void 0&&u.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(y).concat(b,'{content:"').concat($,'"}').concat(Dr)},l=0;l<h;l++)d(l);return c}(o)})}return e.registerId=function(t){return jt(t)},e.prototype.rehydrate=function(){!this.server&&Bt&&an(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(ne(ne({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Ta(o):n?new za(o):new La(o)}(this.options),new Sa(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(jt(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(jt(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(jt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Aa=/&/g,Da=/^\s*\/\/.*$/gm;function Co(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Co(r.children,t)),r})}function Na(e){var t,r,n,o=tt,s=o.options,a=s===void 0?tt:s,h=o.plugins,c=h===void 0?Jt:h,d=function(g,u,y){return y.startsWith(r)&&y.endsWith(r)&&y.replaceAll(r,"").length>0?".".concat(t):g},l=c.slice();l.push(function(g){g.type===Vt&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Aa,r).replace(n,d))}),a.prefix&&l.push(ca),l.push(ia);var p=function(g,u,y,b){u===void 0&&(u=""),y===void 0&&(y=""),b===void 0&&(b="&"),t=b,r=u,n=new RegExp("\\".concat(r,"\\b"),"g");var $=g.replace(Da,""),x=na(y||u?"".concat(y," ").concat(u," { ").concat($," }"):$);a.namespace&&(x=Co(x,a.namespace));var k=[];return Ft(x,sa(l.concat(aa(function(S){return k.push(S)})))),k};return p.hash=c.length?c.reduce(function(g,u){return u.name||_e(15),Ke(g,u.name)},xo).toString():"",p}var Oa=new Ht,wr=Na(),jo=oe.createContext({shouldForwardProp:void 0,styleSheet:Oa,stylis:wr});jo.Consumer;oe.createContext(void 0);function kr(){return f.useContext(jo)}var Fa=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=wr);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Or(this,function(){throw _e(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=wr),this.name+t.hash},e}(),Ba=function(e){return e>="A"&&e<="Z"};function ln(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Ba(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Po=function(e){return e==null||e===!1||e===""},Ro=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!Po(s)&&(Array.isArray(s)&&s.isCss||He(s)?n.push("".concat(ln(o),":"),s,";"):xt(s)?n.push.apply(n,gt(gt(["".concat(o," {")],Ro(s),!1),["}"],!1)):n.push("".concat(ln(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in la||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function De(e,t,r,n){if(Po(e))return[];if(Nr(e))return[".".concat(e.styledComponentId)];if(He(e)){if(!He(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return De(o,t,r,n)}var s;return e instanceof Fa?r?(e.inject(r,n),[e.getName(n)]):[e]:xt(e)?Ro(e):Array.isArray(e)?Array.prototype.concat.apply(Jt,e.map(function(a){return De(a,t,r,n)})):[e.toString()]}function Mo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(He(r)&&!Nr(r))return!1}return!0}var Wa=yo(Qt),Ha=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Mo(t),this.componentId=r,this.baseHash=Ke(Wa,r),this.baseStyle=n,Ht.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Be(o,this.staticRulesId);else{var s=$r(De(this.rules,t,r,n)),a=br(Ke(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var h=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,h)}o=Be(o,a),this.staticRulesId=a}else{for(var c=Ke(this.baseHash,n.hash),d="",l=0;l<this.rules.length;l++){var p=this.rules[l];if(typeof p=="string")d+=p;else if(p){var g=$r(De(p,t,r,n));c=Ke(c,g+l),d+=g}}if(d){var u=br(c>>>0);r.hasNameForId(this.componentId,u)||r.insertRules(this.componentId,u,n(d,".".concat(u),void 0,this.componentId)),o=Be(o,u)}}return o},e}(),yt=oe.createContext(void 0);yt.Consumer;function _a(e){var t=oe.useContext(yt),r=f.useMemo(function(){return function(n,o){if(!n)throw _e(14);if(He(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw _e(8);return o?ne(ne({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?oe.createElement(yt.Provider,{value:r},e.children):null}var ir={};function Ga(e,t,r){var n=Nr(e),o=e,s=!or(e),a=t.attrs,h=a===void 0?Jt:a,c=t.componentId,d=c===void 0?function(C,j){var T=typeof C!="string"?"sc":tn(C);ir[T]=(ir[T]||0)+1;var E="".concat(T,"-").concat(bo(Qt+T+ir[T]));return j?"".concat(j,"-").concat(E):E}(t.displayName,t.parentComponentId):c,l=t.displayName,p=l===void 0?function(C){return or(C)?"styled.".concat(C):"Styled(".concat(fa(C),")")}(e):l,g=t.displayName&&t.componentId?"".concat(tn(t.displayName),"-").concat(t.componentId):t.componentId||d,u=n&&o.attrs?o.attrs.concat(h).filter(Boolean):h,y=t.shouldForwardProp;if(n&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;y=function(C,j){return b(C,j)&&$(C,j)}}else y=b}var x=new Ha(r,g,n?o.componentStyle:void 0);function k(C,j){return function(T,E,H){var _=T.attrs,Q=T.componentStyle,v=T.defaultProps,F=T.foldedComponentIds,B=T.styledComponentId,I=T.target,G=oe.useContext(yt),Z=kr(),le=T.shouldForwardProp||Z.shouldForwardProp,Ce=fo(E,G,v)||tt,X=function(je,w,L){for(var M,P=ne(ne({},w),{className:void 0,theme:L}),R=0;R<je.length;R+=1){var z=He(M=je[R])?M(P):M;for(var D in z)P[D]=D==="className"?Be(P[D],z[D]):D==="style"?ne(ne({},P[D]),z[D]):z[D]}return w.className&&(P.className=Be(P.className,w.className)),P}(_,E,Ce),ie=X.as||I,se={};for(var ee in X)X[ee]===void 0||ee[0]==="$"||ee==="as"||ee==="theme"&&X.theme===Ce||(ee==="forwardedAs"?se.as=X.forwardedAs:le&&!le(ee,ie)||(se[ee]=X[ee]));var ge=function(je,w){var L=kr(),M=je.generateAndInjectStyles(w,L.styleSheet,L.stylis);return M}(Q,X),de=Be(F,B);return ge&&(de+=" "+ge),X.className&&(de+=" "+X.className),se[or(ie)&&!go.has(ie)?"class":"className"]=de,H&&(se.ref=H),f.createElement(ie,se)}(S,C,j)}k.displayName=p;var S=oe.forwardRef(k);return S.attrs=u,S.componentStyle=x,S.displayName=p,S.shouldForwardProp=y,S.foldedComponentIds=n?Be(o.foldedComponentIds,o.styledComponentId):"",S.styledComponentId=g,S.target=n?o.target:e,Object.defineProperty(S,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(C){this._foldedDefaultProps=n?function(j){for(var T=[],E=1;E<arguments.length;E++)T[E-1]=arguments[E];for(var H=0,_=T;H<_.length;H++)vr(j,_[H],!0);return j}({},o.defaultProps,C):C}}),Or(S,function(){return".".concat(S.styledComponentId)}),s&&ko(S,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),S}function dn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var un=function(e){return Object.assign(e,{isCss:!0})};function we(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(He(e)||xt(e))return un(De(dn(Jt,gt([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?De(n):un(De(dn(n,t)))}function Sr(e,t,r){if(r===void 0&&(r=tt),!t)throw _e(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,we.apply(void 0,gt([o],s,!1)))};return n.attrs=function(o){return Sr(e,t,ne(ne({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Sr(e,t,ne(ne({},r),o))},n}var Eo=function(e){return Sr(Ga,e)},m=Eo;go.forEach(function(e){m[e]=Eo(e)});var Ua=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Mo(t),Ht.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o($r(De(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Ht.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Ya(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=we.apply(void 0,gt([e],t,!1)),o="sc-global-".concat(bo(JSON.stringify(n))),s=new Ua(n,o),a=function(c){var d=kr(),l=oe.useContext(yt),p=oe.useRef(d.styleSheet.allocateGSInstance(o)).current;return d.styleSheet.server&&h(p,c,d.styleSheet,l,d.stylis),oe.useLayoutEffect(function(){if(!d.styleSheet.server)return h(p,c,d.styleSheet,l,d.stylis),function(){return s.removeStyles(p,d.styleSheet)}},[p,c,d.styleSheet,l,d.stylis]),null};function h(c,d,l,p,g){if(s.isStatic)s.renderStyles(c,ua,l,g);else{var u=ne(ne({},d),{theme:fo(d,p,a.defaultProps)});s.renderStyles(c,u,l,g)}}return oe.memo(a)}const zo=f.createContext(void 0),Lo=()=>{const e=f.useContext(zo);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Va=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",qa=K(({children:e})=>{const t=Oe(),r=t.preferences.theme||"system",o=r==="system"?Va():r,s=_s[o]||Gs,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},h={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return f.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),d=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",d),()=>c.removeEventListener("change",d)}},[r,t]),f.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([d,l])=>{typeof l=="string"?c.style.setProperty(`--color-${d}`,l):typeof l=="object"&&l!==null&&Object.entries(l).forEach(([p,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${d}-${p}`,g)})}),Object.entries(a.spacing).forEach(([d,l])=>{c.style.setProperty(`--spacing-${d}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),i.jsx(zo.Provider,{value:h,children:i.jsx(_a,{theme:a,children:e})})});function Ka(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Xa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var sr=typeof window<"u",Qa=function(e){f.useEffect(e,[])},Ja=function(e){var t=f.useRef(e);t.current=e,Qa(function(){return function(){return t.current()}})},Za=function(e){var t=f.useRef(0),r=f.useState(e),n=r[0],o=r[1],s=f.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Ja(function(){cancelAnimationFrame(t.current)}),[n,s]},To=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,s=o===void 0?1/0:o,a=t.onChange,h=Za({width:sr?window.innerWidth:n,height:sr?window.innerHeight:s}),c=h[0],d=h[1];return f.useEffect(function(){if(sr){var l=function(){var p=window.innerWidth,g=window.innerHeight;d({width:p,height:g}),a&&a(p,g)};return Ka(window,"resize",l),function(){Xa(window,"resize",l)}}},[]),c};const Fr=()=>{const{width:e=0,height:t=0}=To();return{width:e,height:t}},ec=()=>{const{width:e=0,height:t=0}=To();return e>t?"landscape":"portrait"},tc=()=>{const{width:e}=Fr(),{theme:t}=Lo(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Io=()=>{const[e,t]=f.useState(!1);return f.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},rc=()=>{const[e,t]=f.useState(!1),r=Io(),{width:n}=Fr();return f.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),h=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||h&&c})())},[r,n]),e},Fe=()=>{const e=Fr(),t=ec(),r=tc(),n=Io(),o=rc();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},Ao=()=>{const e=Fe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Do=()=>{const e=Fe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},nc=()=>{const e=Fe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},oc=f.createContext(void 0),ic=({children:e})=>{const t=Oe(),r=Fe(),[n,o]=f.useState(!0),[s,a]=f.useState(["chat","moves"]),[h,c]=f.useState(!1),d=t.preferences.layout,l=f.useMemo(()=>d==="auto"?r.orientation:d,[d,r.orientation]),p=f.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=b=>{t.updatePreference("layout",b)},u=b=>{a($=>$.includes(b)?$.filter(x=>x!==b):[...$,b])};f.useEffect(()=>{c(!0),o($=>{const x=!p;return $!==x?x:$}),a($=>{if(p&&l==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(l==="landscape"&&!p){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[l,p]);const y={...r,layoutPreference:d,setLayoutPreference:g,activeLayout:l,isCompactMode:p,showSidebar:n,setSidebarVisible:o,activePanels:s,togglePanel:u,isTransitioning:h};return i.jsx(oc.Provider,{value:y,children:e})};m.div`
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

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?we`
                flex-direction: column;
            `:we`
                flex-direction: row;
            `}
`;m.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?we`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `:we`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `}
`;m.aside`
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`all ${e.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t,showSidebar:r})=>r?e==="portrait"||t?we`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme:n})=>n.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `:we`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme:n})=>n.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `:we`
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
        `)),we`${n}`}}
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
`;const sc=m.input`
  display: none;
`,ac=m.button`
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
`,cc=({settingId:e,onUpload:t})=>{const r=f.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const d=new FileReader;d.onload=l=>{const p=l.target?.result;t(e,p,a.name)},d.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return i.jsxs(i.Fragment,{children:[i.jsx(sc,{ref:r,type:"file",accept:"audio/*",onChange:n}),i.jsx(ac,{type:"button",onClick:o,children:"Upload"})]})},lc=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,dc=m.div`
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
`,uc=m.div`
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
`,hc=m.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,pc=m.button`
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
`,mc=m.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,fc=m.input`
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
`,gc=m.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,xc=m.div`
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
`,yc=m.button`
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
`,bc=m.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,$c=m.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,vc=m.div`
  margin-bottom: ${e=>e.theme.spacing[6]};
`,hn=m.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[3]} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`,wc=m.div`
  flex: 1;
  margin-right: ${e=>e.theme.spacing[4]};
`,pn=m.label`
  display: block;
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[1]};
`,mn=m.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,kc=m.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,Sc=m.input`
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
`,Cc=m.select`
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
`,jc=m.input`
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
`,Pc=m.input`
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
`,Rc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Mc=m.textarea`
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
`,Ec=m.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,zc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Lc=m.button`
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
`,fn=m.button`
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
`,Tc=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Ic=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Ac=m.p`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,ar=m.button`
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
`,No=K(({isOpen:e,onClose:t})=>{const r=Oe(),{settingsRegistry:n}=r,o=Fe(),s=o.isMobileDevice||o.dimensions.width<768,[a,h]=f.useState("board"),[c,d]=f.useState(""),[l,p]=f.useState({}),[g,u]=f.useState({x:0,y:0}),[y,b]=f.useState(!1),[$,x]=f.useState({x:0,y:0}),k=f.useRef(null);if(f.useEffect(()=>{if(e&&k.current&&!s){const v=k.current.getBoundingClientRect();u({x:(window.innerWidth-v.width)/2,y:(window.innerHeight-v.height)/2})}},[e,s]),f.useEffect(()=>{if(!y)return;const v=B=>{u({x:B.clientX-$.x,y:B.clientY-$.y})},F=()=>{b(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",F),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",F)}},[y,$]),!e)return null;const S=n.getAllCategories(),C=c?n.search(c):n.getByCategory(a),j=(v,F)=>{const B=n.get(v);if(B){if(B.validate){const I=B.validate(F);if(typeof I=="string"){p(G=>({...G,[v]:I}));return}else if(I===!1){p(G=>({...G,[v]:"Invalid value"}));return}}p(I=>{const G={...I};return delete G[v],G}),B.value=F,B.onChange?.(F),v in r.preferences&&r.updatePreference(v,F)}},T=v=>{const F=n.get(v);F&&j(v,F.defaultValue)},E=(v,F,B)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),G=`custom_${v}_${Date.now()}`;I[G]={dataUrl:F,fileName:B,settingId:v,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),j(v,G);const Z=n.get(v);if(Z&&Z.options){const le={label:`Custom: ${B}`,value:G},Ce=Z.options.filter(X=>!X.value.startsWith("custom_"));Z.options=[...Ce,le]}},H=v=>{if(!(!v||v==="none"))try{let F;if(v.startsWith("custom_")){const G=JSON.parse(localStorage.getItem("customSounds")||"{}")[v];if(G&&G.dataUrl)F=G.dataUrl;else{console.error("Custom sound not found:",v);return}}else F=`/sounds/${v}`;const B=new Audio(F);B.volume=.5,B.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(F){console.error("Error playing sound:",F)}},_=v=>{s||(b(!0),x({x:v.clientX-g.x,y:v.clientY-g.y}))},Q=v=>{switch(v.type){case"boolean":return i.jsx(Sc,{type:"checkbox",checked:v.value,onChange:I=>j(v.id,I.target.checked),$isMobile:s});case"select":if(v.id.endsWith("SoundFile")){const I=v.options?.find(le=>le.value===v.value),G=I?I.label:"None",Z=v.value&&v.value!=="none";return i.jsxs(Rc,{children:[i.jsx(zc,{children:G}),i.jsx(Lc,{type:"button",onClick:()=>H(v.value),disabled:!Z,title:Z?"Play sound":"No sound selected",children:"▶️ Play"}),i.jsx(cc,{settingId:v.id,onUpload:E})]})}else return i.jsx(Cc,{value:v.value,onChange:I=>j(v.id,I.target.value),children:v.options?.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return i.jsx(jc,{type:"number",value:v.value,min:v.min,max:v.max,step:v.step,onChange:I=>j(v.id,Number(I.target.value))});case"color":return i.jsx(Pc,{type:"color",value:v.value,onChange:I=>j(v.id,I.target.value),$isMobile:s});case"text":const B=!!l[v.id];return i.jsxs("div",{style:{width:"100%"},children:[i.jsx(Mc,{value:v.value||"",onChange:I=>j(v.id,I.target.value),className:B?"error":"",placeholder:v.placeholder||"",spellCheck:!1}),B&&i.jsx(Ec,{children:l[v.id]})]});default:return null}};return i.jsx(lc,{children:i.jsxs(dc,{ref:k,$x:g.x,$y:g.y,$isMobile:s,children:[i.jsxs(uc,{onMouseDown:_,children:[i.jsx(hc,{children:"⚙️ Settings"}),i.jsx(pc,{onClick:t,onMouseDown:v=>v.stopPropagation(),children:"✕"})]}),i.jsx(mc,{children:i.jsx(fc,{type:"text",placeholder:"Search settings...",value:c,onChange:v=>d(v.target.value)})}),i.jsxs(gc,{$isMobile:s,children:[i.jsx(xc,{$isMobile:s,children:S.map(v=>i.jsxs(yc,{$active:a===v.id&&!c,$isMobile:s,onClick:()=>{h(v.id),d("")},children:[i.jsx(bc,{children:v.icon}),!s&&v.label]},v.id))}),i.jsxs($c,{children:[c&&i.jsxs(Ac,{children:["Found ",C.length,' settings matching "',c,'"']}),i.jsx(vc,{children:C.map(v=>v.type==="text"?i.jsxs(hn,{style:{flexDirection:"column",alignItems:"stretch"},children:[i.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{children:[i.jsx(pn,{children:v.label}),v.description&&i.jsx(mn,{children:v.description})]}),v.value!==v.defaultValue&&i.jsx(fn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),Q(v)]},v.id):i.jsxs(hn,{children:[i.jsxs(wc,{children:[i.jsx(pn,{children:v.label}),v.description&&i.jsx(mn,{children:v.description})]}),i.jsxs(kc,{children:[Q(v),v.value!==v.defaultValue&&i.jsx(fn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",children:"↻"})]})]},v.id))})]})]}),i.jsxs(Tc,{children:[i.jsx(ar,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),i.jsxs(Ic,{children:[i.jsx(ar,{onClick:t,children:"Cancel"}),i.jsx(ar,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});No.displayName="SettingsDialog";const Dc=m.header`
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
`,Nc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Oc=m.button`
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
`,Fc=m.div`
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
`,Ve=m.button`
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
`,qe=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
`,cr=m.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,lr=m.div`
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
`,Ie=m.button`
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
`,gn=m.hr`
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
`;const Bc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Wc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Hc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,_c=m.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,dr=m.button`
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
`,Oo=K(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:s}=Lo(),a=Ao(),h=Do(),[c,d]=f.useState(!1),[l,p]=f.useState(!1),[g,u]=f.useState(null),y=j=>{t.updatePreference("viewMode",j),p(!1),u(null)},b=j=>{t.updatePreference("chessOrientation",j),p(!1),u(null)},$=j=>{s(j),p(!1),u(null)},x=()=>{p(!l),u(null)},k=()=>{d(!0),p(!1),u(null)},S=j=>{u(j)},C=r==="chat-only";return oe.useEffect(()=>{const j=T=>{const E=T.target;l&&!E.closest(".hamburger-menu-container")&&p(!1)};if(l)return document.addEventListener("click",j),()=>document.removeEventListener("click",j)},[l]),oe.useEffect(()=>{const j=T=>{(T.ctrlKey||T.metaKey)&&T.key===","&&(T.preventDefault(),d(!0))};return window.addEventListener("keydown",j),()=>{window.removeEventListener("keydown",j)}},[]),i.jsxs(Dc,{children:[i.jsx(Nc,{children:i.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[i.jsx(Oc,{onClick:x,"aria-label":"Menu",children:"☰"}),i.jsxs(Fc,{$isOpen:l,children:[i.jsxs(Ve,{$hasSubmenu:!0,onMouseEnter:()=>S("theme"),onMouseLeave:()=>u(null),children:[i.jsx(qe,{children:"🎨 Theme"}),i.jsx(cr,{children:"▶"}),i.jsxs(lr,{$isOpen:g==="theme",children:[i.jsx(Ie,{$isActive:o==="light",onClick:()=>$("light"),children:"☀ Light"}),i.jsx(Ie,{$isActive:o==="dark",onClick:()=>$("dark"),children:"☾ Dark"}),i.jsx(Ie,{$isActive:o==="system",onClick:()=>$("system"),children:"◐ System"})]})]}),i.jsxs(Ve,{$hasSubmenu:!0,onMouseEnter:()=>S("orientation"),onMouseLeave:()=>u(null),children:[i.jsx(qe,{children:"📐 Orientation"}),i.jsx(cr,{children:"▶"}),i.jsxs(lr,{$isOpen:g==="orientation",children:[h.includes("landscape")&&i.jsx(Ie,{$isActive:n==="landscape",onClick:()=>!C&&b("landscape"),disabled:C,style:{opacity:C?.5:1},children:"▭ Landscape"}),h.includes("portrait")&&i.jsx(Ie,{$isActive:n==="portrait",onClick:()=>!C&&b("portrait"),disabled:C,style:{opacity:C?.5:1},children:"▯ Portrait"})]})]}),i.jsxs(Ve,{$hasSubmenu:!0,onMouseEnter:()=>S("mode"),onMouseLeave:()=>u(null),children:[i.jsx(qe,{children:"🎮 View Mode"}),i.jsx(cr,{children:"▶"}),i.jsxs(lr,{$isOpen:g==="mode",children:[a.includes("chess-only")&&i.jsx(Ie,{$isActive:r==="chess-only",onClick:()=>y("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&i.jsx(Ie,{$isActive:r==="chess-and-chat",onClick:()=>y("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&i.jsx(Ie,{$isActive:r==="chat-only",onClick:()=>y("chat-only"),children:"▤ Chat Only"})]})]}),i.jsx(gn,{}),i.jsx(Ve,{onClick:k,children:i.jsx(qe,{children:"⚙️ Settings"})}),i.jsx(gn,{}),i.jsx(Ve,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),p(!1)},children:i.jsx(qe,{children:"📖 Documentation"})}),i.jsx(Ve,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),p(!1)},children:i.jsx(qe,{children:"🐛 Report Issue"})})]})]})}),i.jsx(Bc,{children:i.jsxs(Wc,{children:[i.jsx(Hc,{children:"Mode:"}),i.jsxs(_c,{children:[a.includes("chess-only")&&i.jsx(dr,{$isActive:r==="chess-only",onClick:()=>y("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&i.jsx(dr,{$isActive:r==="chess-and-chat",onClick:()=>y("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&i.jsx(dr,{$isActive:r==="chat-only",onClick:()=>y("chat-only"),title:"Chat Only",children:"▤"})]})]})}),i.jsx(No,{isOpen:c,onClose:()=>d(!1)})]})});Oo.displayName="AppHeader";const Gc=m.img`
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
`,Uc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Ne=K(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=Oe(),s=Uc[e];if(!s)return null;const h=`/pieces/${o.preferences.pieceSet}/${s}.svg`;return i.jsx(Gc,{className:"chess-piece",src:h,alt:s,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces"})});Ne.displayName="ChessPiece";const Yc=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Vc=m.div`
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
`,qc=m.button`
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
`,Fo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const s=["Q","R","B","N"],a=h=>t==="white"?h:h.toLowerCase();return i.jsx(Yc,{$isOpen:e,onClick:n,children:i.jsx(Vc,{$x:o.x,$y:o.y,onClick:h=>h.stopPropagation(),children:s.map(h=>i.jsx(qc,{onClick:()=>r(h.toLowerCase()),children:i.jsx(Ne,{piece:a(h),size:50})},h))})})};Fo.displayName="PromotionDialog";const Kc=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Xc=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,Qc=m.div`
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
`,xn=m.div`
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
`,Jc=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,Zc=m.div.attrs(e=>({style:{transform:`translate(
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
`,Xe=["a","b","c","d","e","f","g","h"],Qe=["8","7","6","5","4","3","2","1"];function el(e,t){return(e+t)%2===0}function tl(e,t,r){const n=r?Xe[7-e]:Xe[e],o=r?Qe[7-t]:Qe[t];return`${n}${o}`}function rl(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,s)=>{let a=0;for(const h of o)if(h>="1"&&h<="8")a+=parseInt(h);else{const c=`${Xe[a]}${Qe[s]}`;t.set(c,h),a++}}),t}const Cr=K(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:s,highlightedSquares:a=new Set,lastMove:h,interactive:c=!0,onSizeCalculated:d,selectedCapturedPiece:l,onCapturedPieceSelect:p})=>{Fe();const g=Oe(),u=_t(),y=f.useRef(null),[b,$]=f.useState(t||200),[x,k]=f.useState(null),[S,C]=f.useState(new Set),[j,T]=f.useState(null),[E,H]=f.useState([]),_=f.useRef(),[Q,v]=f.useState(null),[F,B]=f.useState(!1),I=f.useMemo(()=>rl(e),[e]),G=f.useRef(new Map),Z=f.useCallback((w,L)=>{const M=Xe.indexOf(w[0]),P=Qe.indexOf(w[1]),R=L/8,z=r?(7-M)*R:M*R,D=r?(7-P)*R:P*R;return{x:z,y:D}},[r]),le=f.useCallback((w,L,M)=>{const P=w.toLowerCase()==="p",R=M[1];return P&&(R==="8"||R==="1")},[]),Ce=f.useCallback(w=>{w.preventDefault(),u.isPlaying&&u.clearPremove()},[u]);f.useEffect(()=>{if(t){$(t);return}const w=()=>{if(!y.current)return;const z=y.current.parentElement;if(!z)return;const{width:D,height:ae}=z.getBoundingClientRect();y.current.getBoundingClientRect();const ue=16,te=D-ue,N=ae-ue,q=Math.floor(Math.min(te,N)),ce=Math.max(100,Math.floor(q/8)*8);ce!==b&&($(ce),d?.(ce))},L=setTimeout(w,50);w();let M;const P=()=>{clearTimeout(M),M=setTimeout(w,100)};window.addEventListener("resize",P);let R=null;return y.current&&y.current.parentElement&&(R=new ResizeObserver(()=>{P()}),R.observe(y.current.parentElement)),()=>{window.removeEventListener("resize",P),clearTimeout(M),clearTimeout(L),R&&R.disconnect()}},[t,b]);const X=b/8,ie=f.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(u.isPlaying){const w=u.currentGame,L=u.playingColor;if(w&&L){const M=L==="white"?w.white.time:w.black.time,P=g.preferences.disableAnimationsThreshold;if(M<P)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,u.isPlaying,u.currentGame,u.playingColor]);f.useEffect(()=>{if(!ie||F||u.isProcessingServerUpdate){G.current=new Map(I);return}const w=G.current,L=[];if(h){const{from:M,to:P}=h,R=w.get(M),z=I.get(P);R&&z===R&&!I.has(M)&&L.push({piece:R,from:M,to:P,startTime:Date.now()})}L.length>0&&H(M=>[...M,...L]),G.current=new Map(I)},[I,h,ie,F,u.isProcessingServerUpdate]),f.useEffect(()=>{if(F){const w=setTimeout(()=>{B(!1)},50);return()=>clearTimeout(w)}},[e,F]),f.useEffect(()=>{if(E.length===0)return;const w=()=>{const L=Date.now(),M=g.preferences.animationDuration;H(P=>{const R=P.filter(z=>L-z.startTime<M);return R.length>0&&(_.current=requestAnimationFrame(w)),R})};return _.current=requestAnimationFrame(w),()=>{_.current&&cancelAnimationFrame(_.current)}},[E.length,g.preferences.animationDuration]),f.useEffect(()=>{if(l)try{const w=u.currentPosition;u.chessBoard.getFen()!==w&&u.chessBoard.loadFen(w);const M=u.chessBoard.getLegalMoves().filter(R=>R.from==="@"&&R.san.toLowerCase().startsWith(l.toLowerCase())),P=new Set(M.map(R=>R.to));C(P),k(null)}catch(w){console.error("Error getting drop moves:",w),C(new Set)}},[l,u]);const se=f.useCallback((w,L)=>{if(!c)return;const M=I.get(w);if(l){S.has(w)?(s?.(l,w),p?.(null),C(new Set)):(p?.(null),C(new Set));return}if(x)if(S.has(w)){const P=I.get(x);if(P&&le(P,x,w)){const R=P===P.toUpperCase()?"white":"black";if(u.isPlaying){const z=g.preferences.autoPromotionPiece;u.isMyTurn?(B(!0),o?.(x,w,z)):u.setPremove(x,w,z)}else{const z=L?.currentTarget.getBoundingClientRect();v({from:x,to:w,color:R,position:z?{x:z.left+z.width/2,y:z.top+z.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else u.isPlaying&&!u.isMyTurn?u.setPremove(x,w):(B(!0),o?.(x,w));k(null),C(new Set)}else if(w===x)k(null),C(new Set);else if(M)if(k(w),g.preferences.showLegalMoves)try{const P=u.currentPosition;u.chessBoard.getFen()!==P&&u.chessBoard.loadFen(P);const R=u.chessBoard.getLegalMoves(w),z=new Set(R.map(D=>D.to));C(z)}catch(P){console.error("Error getting legal moves:",P),C(new Set)}else C(new Set);else k(null),C(new Set);else if(M){k(w);try{const P=u.currentPosition;u.chessBoard.getFen()!==P&&u.chessBoard.loadFen(P);const R=M===M.toUpperCase(),z=u.chessBoard.getActiveColor();if(R&&z==="w"||!R&&z==="b")if(g.preferences.showLegalMoves){const ae=u.chessBoard.getLegalMoves(w),ue=new Set(ae.map(te=>te.to));C(ue)}else C(new Set);else C(new Set),k(null)}catch(P){console.error("Error getting legal moves:",P),C(new Set)}}},[x,S,I,o,s,c,le,u,g.preferences.autoPromotionPiece,l,p]),ee=f.useCallback((w,L,M)=>{if(!c)return;const P=w.clientX,R=w.clientY;let z=!1,D=!1;const ue=w.currentTarget.getBoundingClientRect().width,te=q=>{const ce=Math.abs(q.clientX-P),xe=Math.abs(q.clientY-R);(ce>3||xe>3)&&M&&!D?(z=!0,D=!0,ge(L,M,q,ue)):D&&T(Te=>Te?{...Te,x:q.clientX,y:q.clientY}:null)},N=q=>{document.removeEventListener("mousemove",te),document.removeEventListener("mouseup",N),D?de(q,L,M):z?(T(null),k(null),C(new Set)):se(L,w)};document.addEventListener("mousemove",te),document.addEventListener("mouseup",N)},[c,se]),ge=f.useCallback((w,L,M,P)=>{if(k(w),g.preferences.showLegalMoves)try{const z=u.currentPosition;u.chessBoard.getFen()!==z&&u.chessBoard.loadFen(z);const D=L===L.toUpperCase(),ae=u.chessBoard.getActiveColor();if(D&&ae==="w"||!D&&ae==="b"){const te=u.chessBoard.getLegalMoves(w),N=new Set(te.map(q=>q.to));C(N)}else C(new Set)}catch(z){console.error("Error getting legal moves for drag:",z),C(new Set)}else C(new Set);const R={piece:L,from:w,x:M.clientX,y:M.clientY,size:P};T(R)},[g.preferences.showLegalMoves,u]),de=f.useCallback((w,L,M)=>{try{const z=document.elementsFromPoint(w.clientX,w.clientY).find(D=>D.getAttribute("data-square"))?.getAttribute("data-square");if(z&&z!==L)if(le(M,L,z)){const D=M===M.toUpperCase()?"white":"black";if(u.isPlaying){const ae=g.preferences.autoPromotionPiece;u.isMyTurn?(B(!0),o?.(L,z,ae)):u.setPremove(L,z,ae)}else v({from:L,to:z,color:D,position:{x:w.clientX,y:w.clientY}})}else u.isPlaying&&!u.isMyTurn?u.setPremove(L,z):(B(!0),o?.(L,z))}catch(P){console.error("Error in handleDragEnd:",P)}T(null),k(null),C(new Set)},[o,le,u,g.preferences.autoPromotionPiece]),je=f.useMemo(()=>{const w=[];for(let L=0;L<8;L++)for(let M=0;M<8;M++){const P=el(M,L),R=tl(M,L,r),z=I.get(R),D=a.has(R),ae=h&&(h.from===R||h.to===R),ue=x===R,te=S.has(R),N=j?.from===R,q=E.some(Te=>Te.to===R),ce=n&&L===7,xe=n&&M===0;w.push(i.jsxs(Qc,{"data-square":R,$isLight:P,$isHighlighted:D,$isLastMoveSquare:!!ae,$isSelected:ue,$isPossibleMove:te,onMouseDown:Te=>ee(Te,R,z),children:[z&&!N&&!q&&i.jsx(Ne,{piece:z,size:X}),ce&&i.jsx(xn,{$type:"file",$isLight:P,$size:X,"data-settings":"coordinates",className:"coordinate-label",children:r?Xe[7-M]:Xe[M]}),xe&&i.jsx(xn,{$type:"rank",$isLight:P,$size:X,"data-settings":"coordinates",className:"coordinate-label",children:r?Qe[7-L]:Qe[L]})]},R))}return w},[r,n,I,a,h,x,S,j,X,se,ee]);return i.jsxs(i.Fragment,{children:[i.jsxs(Kc,{ref:y,$size:b,onContextMenu:Ce,"data-settings":"board",className:"chess-board",children:[i.jsx(Xc,{children:je}),E.map((w,L)=>{const M=Z(w.from,b),P=Z(w.to,b),R=Date.now()-w.startTime,z=g.preferences.animationDuration,D=Math.min(R/z,1),ue=(te=>te<.5?4*te*te*te:1-Math.pow(-2*te+2,3)/2)(D);return i.jsx(Zc,{$fromX:M.x,$fromY:M.y,$toX:P.x,$toY:P.y,$progress:ue,$size:X,children:i.jsx(Ne,{piece:w.piece,size:X})},`${w.from}-${w.to}-${w.startTime}`)})]}),j&&i.jsx(i.Fragment,{children:i.jsx(Jc,{$x:j.x,$y:j.y,$size:j.size,children:i.jsx(Ne,{piece:j.piece,size:j.size,isDragging:!0})})}),Q&&i.jsx(Fo,{isOpen:!0,color:Q.color,position:Q.position,onSelect:w=>{B(!0),o?.(Q.from,Q.to,w),v(null)},onCancel:()=>v(null)})]})});Cr.displayName="ChessBoardWithPieces";const nl=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,ol=m.span`
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
`,Bo=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a,compact:h=!1})=>{const c=l=>{const p=Math.floor(l/3600),g=Math.floor(l%3600/60),u=Math.floor(l%60),y=Math.floor(l%1*10),b=r&&Math.floor(l)%2===0?" ":":";return p>0?`${p}${b}${g.toString().padStart(2,"0")}${b}${u.toString().padStart(2,"0")}`:l<o&&s?`${g}${b}${u.toString().padStart(2,"0")}.${y}`:`${g}${b}${u.toString().padStart(2,"0")}`},d=e<=o&&e>0;return i.jsx(nl,{size:t,className:a,children:i.jsx(ol,{$isLowTime:d,$isActive:r,$compact:h,$isFinished:n,children:c(e)})})},il=m.span`
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
`,sl=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a})=>{const h=l=>{const p=Math.floor(l/3600),g=Math.floor(l%3600/60),u=Math.floor(l%60),y=Math.floor(l%1*10),b=r&&Math.floor(l)%2===0?" ":":";return p>0?`${p}${b}${g.toString().padStart(2,"0")}${b}${u.toString().padStart(2,"0")}`:l<o&&s?`${g}${b}${u.toString().padStart(2,"0")}.${y}`:`${g}${b}${u.toString().padStart(2,"0")}`},c=e<=o&&e>0,d=t==="large"?"48px":t==="medium"?"36px":"24px";return i.jsx(il,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:d,children:h(e)})},wt=m(sl)`
    /* Additional GameClock-specific styles if needed */
`;m(Bo).attrs({size:"small"})`
    font-size: 12px;
`;m(Bo).attrs({size:"medium"})`
    font-size: 16px;
`;const al=m.div`
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
`,cl=m.button`
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
`,ll=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Wo=K(({playerName:e,position:t,onClose:r})=>{const n=Nn(),o=Oe(),s=f.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];f.useEffect(()=>{const c=l=>{s.current&&!s.current.contains(l.target)&&r()},d=l=>{l.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",d)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}},[r]),f.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),d=window.innerWidth,l=window.innerHeight;let p=t.x,g=t.y;c.right>d&&(p=d-c.width-10),c.bottom>l&&(g=l-c.height-10),(p!==t.x||g!==t.y)&&(s.current.style.left=`${p}px`,s.current.style.top=`${g}px`)}},[t]);const h=c=>{const d=e.replace(/\([^)]*\)/g,"").trim(),l=c.replace("{player}",d);n.sendCommand(l),r()};return i.jsx(al,{ref:s,$x:t.x,$y:t.y,children:a.map((c,d)=>"divider"in c&&c.divider?i.jsx(ll,{},d):"command"in c?i.jsx(cl,{onClick:()=>h(c.command),children:c.label},d):null)})});Wo.displayName="PlayerContextMenu";const dl=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,st=({name:e,className:t,style:r,onClick:n})=>{const[o,s]=f.useState(null),a=h=>{h.preventDefault(),h.stopPropagation(),n&&n(),s({x:h.clientX,y:h.clientY})};return i.jsxs(i.Fragment,{children:[i.jsx(dl,{className:t,style:r,onClick:a,children:e}),o&&i.jsx(Wo,{playerName:e,position:o,onClose:()=>s(null)})]})};st.displayName="PlayerName";const ul=m.div`
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
`,hl=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,pl=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,ml=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,fl=m.div`
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
`;const dt=K(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:h=!1,compact:c=!1})=>{const d=i.jsxs(i.Fragment,{children:[i.jsx(hl,{children:i.jsxs(pl,{children:[i.jsx(ml,{children:i.jsx(st,{name:e})}),i.jsx(fl,{children:t})]})}),!a&&!h&&i.jsx(wt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return h?d:i.jsx(ul,{$isActive:n,$orientation:s,$compact:c,children:d})});dt.displayName="PlayerCard";const gl=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,ur=m.div`
  padding: ${e=>e.theme.spacing[1]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[2]};
`,hr=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,me=m.button`
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
`,xl=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,yn=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,yl=m.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,bn=m.span`
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
`,Zt=K(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:s,className:a,disableAutoScroll:h=!1})=>{const c=f.useRef(null);f.useEffect(()=>{if(!h&&c.current&&t!==void 0){const l=c.current.querySelector(`[data-move-index="${t}"]`);l&&l.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,h]);const d=()=>{const l=[];for(let p=0;p<e.length;p+=2){const g=Math.floor(p/2)+1,u=e[p],y=e[p+1];l.push(i.jsxs(yn,{children:[i.jsxs(yl,{children:[g,"."]}),i.jsx(bn,{$isCurrentMove:t===p,onClick:()=>r?.(p),"data-move-index":p,children:pr(u.san)}),y&&i.jsx(bn,{$isCurrentMove:t===p+1,onClick:()=>r?.(p+1),"data-move-index":p+1,children:pr(y.san)})]},p))}return l};return i.jsxs(gl,{className:a,children:[o?i.jsx(ur,{children:i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{children:"Moves"}),i.jsxs(hr,{children:[i.jsx(me,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(me,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(me,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(me,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?i.jsxs(ur,{children:[s,i.jsxs(hr,{children:[i.jsx(me,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(me,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(me,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(me,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):i.jsx(ur,{children:i.jsxs(hr,{children:[i.jsx(me,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(me,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(me,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(me,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),i.jsx(xl,{ref:c,children:e.length===0?i.jsx(yn,{children:i.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):d()})]})});Zt.displayName="MoveList";const bl=m(wt)`
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
`,$l=m(wt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,ut=K(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const s=_t(),a=o==="landscape"?$l:bl;return i.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});ut.displayName="ObservableClock";const vl=m.div`
  position: relative;
  display: inline-block;
`,wl=m.button`
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
`,kl=m.div`
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
`,Sl=m.button`
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
`,Br=K(({color:e,size:t="small"})=>{const r=Oe(),[n,o]=f.useState(!1),s=f.useRef(null),a=["Q","R","B","N"],h=r.preferences.autoPromotionPiece,c=p=>e==="white"?p:p.toLowerCase();f.useEffect(()=>{const p=g=>{s.current&&!s.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",p),()=>document.removeEventListener("mousedown",p)},[n]);const d=p=>{r.updatePreference("autoPromotionPiece",p),o(!1)},l=t==="small"?28:36;return i.jsxs(vl,{ref:s,children:[i.jsx(wl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:i.jsx(Ne,{piece:c(h),size:l})}),i.jsx(kl,{$isOpen:n,children:a.map(p=>i.jsx(Sl,{$size:t,onClick:()=>d(p),title:`Promote to ${p==="Q"?"Queen":p==="R"?"Rook":p==="B"?"Bishop":"Knight"}`,children:i.jsx(Ne,{piece:c(p),size:l})},p))})]})});Br.displayName="PromotionPieceSelector";const Cl=m.div`
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
`,Ho=K(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:s,onUnexamine:a,onSetupFEN:h,onFlipBoard:c,isAnalysisActive:d,isDrawOffered:l,canAbort:p,className:g})=>{const u=_t(),y=()=>i.jsxs(i.Fragment,{children:[p&&i.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),i.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),u.currentGame&&u.currentGame.moveNumber>=2&&i.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(Br,{color:u.playingColor||"white",size:"medium"})]}),b=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(he,{onClick:h,$variant:"secondary",children:"FEN"})]});return i.jsxs(Cl,{className:g,children:[e==="playing"&&y(),e==="observing"&&b(),e==="examining"&&$(),e==="freestyle"&&x()]})}),$e=m(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Ho.displayName="GameControls";const $n=m.div`
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
`,vn=m.div`
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
`,jl=m.div`
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
`,wn=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,Pt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,kn=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,_o=K(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Gt().isBottomPlayerWinning;let a,h,c;if(t===50)a=47,h=6,c=47;else if(t>50){const l=t-50;a=50-l,h=l,c=50}else{const l=50-t;a=50,h=l,c=50-l}const d=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const l=t<20;return i.jsxs($n,{$orientation:r,className:n,children:[i.jsx(vn,{$orientation:r,children:e}),i.jsx(jl,{$needsDarkText:l,children:e}),i.jsxs(wn,{$orientation:r,children:[i.jsx(Pt,{style:{height:`${a}%`}}),i.jsx(kn,{$color:d,style:{height:`${h}%`}}),i.jsx(Pt,{style:{height:`${c}%`}})]})]})}else return i.jsxs($n,{$orientation:r,className:n,children:[i.jsx(vn,{$orientation:r,children:e}),i.jsxs(wn,{$orientation:r,children:[i.jsx(Pt,{style:{width:`${c}%`}}),i.jsx(kn,{$color:d,style:{width:`${h}%`}}),i.jsx(Pt,{style:{width:`${a}%`}})]})]})});_o.displayName="EvaluationBar";const Pl=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,Rl=m.div`
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
`,jr=K(({orientation:e="vertical",boardSize:t})=>{const r=Gt();return i.jsx(Pl,{$orientation:e,$boardSize:t,children:i.jsx(_o,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),Pr=K(({className:e})=>{const t=Gt();return i.jsxs(Rl,{className:e,children:[i.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),i.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});jr.displayName="AnalysisDisplay";Pr.displayName="AnalysisInfoDisplay";const Ml=m.div`
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
`,El=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,zl=m.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Go=m.input`
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
`,Ll=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Tl=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Il=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Sn=m.button`
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
`,Al=m.button`
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
`,Cn=m.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,jn=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Dl=m(Go)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Uo=K(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=f.useState(""),[s,a]=f.useState(""),h=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=f.useCallback(u=>{o(u.target.value),a("")},[]),d=f.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),l=f.useCallback(u=>{const y=typeof u=="function"?u():u;o(y),a("");try{r.loadPosition(y)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),p=f.useCallback(u=>{u.key==="Enter"&&n.trim()?d():u.key==="Escape"&&t()},[n,d,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>ri.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?i.jsx(Ml,{$isOpen:e,onClick:t,children:i.jsxs(El,{onClick:u=>u.stopPropagation(),children:[i.jsx(zl,{children:"Set Position from FEN"}),i.jsx(Tl,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),i.jsxs(Cn,{children:[i.jsx(jn,{children:"Current position:"}),i.jsx(Dl,{type:"text",value:h,readOnly:!0,onClick:u=>u.currentTarget.select()})]}),i.jsxs(Cn,{children:[i.jsx(jn,{children:"Preset position:"}),g.map(u=>i.jsx(Al,{onClick:()=>l(u.fen),children:u.name},u.name))]}),i.jsx(Go,{type:"text",value:n,onChange:c,onKeyDown:p,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&i.jsx(Ll,{children:s}),i.jsxs(Il,{children:[i.jsx(Sn,{onClick:t,children:"Cancel"}),i.jsx(Sn,{$variant:"primary",onClick:d,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Uo.displayName="FENDialog";const Nl=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Ol=m.div`
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
`,Fl=m.div`
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
`,Bl=m.div`
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
`,Wl=m(Ne)`
  width: 100%;
  height: 100%;
`,ht=K(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:s}=Ee(),a=f.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const p=s.capturedPieces;return t?p.white:p.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),h=f.useMemo(()=>{const l={};return a.forEach(p=>{l[p]=(l[p]||0)+1}),l},[a]),c=["p","n","b","r","q"],d=n?n/8:32;return i.jsx(Nl,{$orientation:e,$size:d,className:r,children:i.jsx(Ol,{$orientation:e,children:c.map(l=>{const p=h[l]||0,g=t?l.toUpperCase():l;return i.jsx(Fl,{$size:d,onClick:p>0&&o?()=>o(g):void 0,style:{cursor:p>0&&o?"pointer":"default"},children:p>0&&i.jsxs(i.Fragment,{children:[i.jsx(Wl,{piece:g,size:d}),p>1&&i.jsx(Bl,{children:p})]})},l)})})})});ht.displayName="CapturedPieces";const Hl=m.div`
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
`,_l=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Gl=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Ul=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Yl=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Pn=m.button`
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
`,Vl=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:s,onCancel:a})=>i.jsx(Hl,{$isOpen:e,onClick:a,children:i.jsxs(_l,{onClick:h=>h.stopPropagation(),children:[i.jsx(Gl,{children:t}),i.jsx(Ul,{children:r}),i.jsxs(Yl,{children:[i.jsx(Pn,{$variant:"secondary",onClick:a,children:o}),i.jsx(Pn,{$variant:"primary",onClick:s,children:n})]})]})}),ql=m.div`
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
`,Rn=m.div`
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
`;const Kl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Xl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,Ql=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Jl=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Yo=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Vo=m.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Zl=m(Yo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,ed=m(Vo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,td=m(Yo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,rd=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,nd=m(Vo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,Mn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,En=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,zn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Ln=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Tn=m.div`
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
`,od=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,id=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,sd=m.div`
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
`;const ad=m.div`
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
`,cd=m.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,ld=m.div`
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
`;const dd=m.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,ud=m.div`
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
`;const In=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;m(Zt)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const hd=m(Zt)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;m(wt)`
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
`;const An=m.div`
    flex: 1;
    display: flex;
`;m(wt)`
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
`;const pd=m.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,md=m.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,fd=m.div`
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
`;const gd=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,xd=m.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,qo=K(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=_t(),o=Oe(),s=Gt(),a=Nn(),h=ni();Fe();const[c,d]=f.useState(!1),[l,p]=f.useState(!1),[g,u]=f.useState(0),[y,b]=f.useState(!1),[$,x]=f.useState(!1),[k,S]=f.useState(null),C=o.preferences.chessOrientation==="landscape",j=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",E=window.innerWidth/window.innerHeight>1.6,H=f.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),_=f.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),Q=f.useCallback((N,q,ce)=>{try{n.makeMove(N,q,ce)||(console.error("Invalid move:",N,q),h.playIllegal())}catch(xe){console.error("Error making move:",xe),h.playIllegal()}},[n,h]),v=f.useCallback((N,q)=>{try{const ce=N.toLowerCase();n.makeSANMove(`${N.toUpperCase()}@${q}`)||(console.error("Invalid drop:",N,q),h.playIllegal())}catch(ce){console.error("Error making drop:",ce),h.playIllegal()}},[n,h]),F=f.useCallback(N=>{S(k===N?null:N)},[k]);f.useMemo(()=>{if(n.currentGameInfo){const{white:N,black:q,timeControl:ce,variant:xe}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${xe} ${ce}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const B=(()=>{const N=n.moveHistory.length;if(N>0){const q=n.moveHistory[N-1],ce=Math.ceil(N/2),xe=N%2===1,Te=pr(q.san);return`${ce}.${xe?"":".."} ${Te}`}return"Starting position"})(),I=n.currentOpening,G=n.currentGame,Z=G||n.lastGameState,le=Z?.white||{name:"White",rating:1500,time:900},Ce=Z?.black||{name:"Black",rating:1500,time:900},X=!G||G.turn==="w",ie=n.shouldShowFlippedBoard,se=ie?le:Ce,ee=ie?Ce:le,ge=ie,de=ie?X:!X,je=f.useCallback(N=>{n.goToMove(N)},[n]);f.useEffect(()=>{s.initialize()},[s]),f.useEffect(()=>{$&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,$,n.isPlaying,a]),f.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),f.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(j):s.stopAnalysis()},[c,j,s]);const w=f.useCallback(()=>{d(N=>!N)},[]),L=f.useCallback(()=>{p(!0)},[]),M=f.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),P=f.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),R=f.useCallback(()=>{a.sendCommand("unexamine")},[a]),z=f.useCallback(()=>{b(!0)},[]),D=f.useCallback(()=>{a.sendCommand("resign"),b(!1)},[a]),ae=f.useCallback(()=>{a.sendCommand("draw"),x(!$)},[a,$]),ue=f.useCallback(()=>{a.sendCommand("abort")},[a]),te=()=>i.jsxs(i.Fragment,{children:[i.jsx(Rn,{$orientation:"portrait",children:i.jsx(od,{children:i.jsxs(id,{children:[c&&i.jsx(xd,{$boardSize:g,children:i.jsx(jr,{orientation:"vertical",boardSize:g})}),i.jsx(sd,{children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[i.jsxs(td,{children:[i.jsxs(Mn,{children:["Game #",Z?.gameId||"?"]}),i.jsx(En,{children:Z?.timeControl||"?"}),i.jsxs(rd,{children:[H==="playing"&&i.jsxs(i.Fragment,{children:[n.moveHistory.length<=1&&i.jsx($e,{onClick:ue,$variant:"secondary",children:"Abort"}),i.jsx($e,{onClick:ae,$variant:"secondary",children:"Draw"}),i.jsx($e,{onClick:z,$variant:"secondary",children:"Resign"}),i.jsx(Br,{color:n.playingColor||"white",size:"small"})]}),H==="observing"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:P,$variant:"secondary",children:"Unobserve"}),i.jsx($e,{onClick:w,$variant:"secondary",children:"Analysis"})]}),H==="examining"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:R,$variant:"secondary",children:"Unexamine"}),i.jsx($e,{onClick:w,$variant:"secondary",children:"Analysis"})]}),H==="freestyle"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:w,$variant:"secondary",children:"Analysis"}),i.jsx($e,{onClick:M,$variant:"secondary",children:"Flip"}),i.jsx($e,{onClick:L,$variant:"secondary",children:"FEN"})]})]})]}),i.jsxs(In,{children:[i.jsx(ut,{player:se,isActive:de,size:"small",compact:!0}),i.jsx(An,{children:i.jsx(dt,{name:se.name,rating:se.rating,time:0,isActive:de,isWhite:ge,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsx(Tn,{$orientation:"portrait",children:i.jsx(Cr,{position:j,flipped:ie,showCoordinates:o.preferences.showCoordinates,onMove:Q,onDrop:v,interactive:H==="playing"||H==="freestyle"||H==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:u,selectedCapturedPiece:k,onCapturedPieceSelect:S})}),i.jsxs(In,{children:[i.jsx(ut,{player:ee,isActive:!de,size:"small",compact:!0}),i.jsx(An,{children:i.jsx(dt,{name:ee.name,rating:ee.rating,time:0,isActive:!de,isWhite:!ge,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsxs(nd,{children:[i.jsx(zn,{children:n.premove?`Premove: ${_r(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,j)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(Ln,{children:I})]}),c&&i.jsx(gd,{children:i.jsx(Pr,{})})]})}),_&&i.jsx(Ql,{$squareSize:g?g/8:0,children:i.jsxs(Jl,{$squareSize:g?g/8:0,children:[i.jsx(ht,{orientation:"vertical",isWhitePieces:ie,boardSize:g,onPieceClick:F}),i.jsx(ht,{orientation:"vertical",isWhitePieces:!ie,boardSize:g,onPieceClick:F})]})})]})})}),i.jsx(ad,{$orientation:"portrait",$boardSize:g,children:i.jsx(Zt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:je,disableAutoScroll:!0,onNavigate:N=>{if(n.isExamining)switch(N){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(N){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return i.jsxs(ql,{className:e,$orientation:C?"landscape":"portrait",$hasChat:t,children:[C?i.jsx(i.Fragment,{children:i.jsx(Rn,{$orientation:"landscape",children:i.jsxs(cd,{children:[i.jsx(md,{children:c&&i.jsx(fd,{$boardSize:g,children:i.jsx(jr,{orientation:"vertical",boardSize:g})})}),i.jsxs(ld,{$hasAnalysis:c,children:[i.jsxs(Kl,{$isWideAspect:E,children:[i.jsxs(Zl,{$chatWidth:r,$hasAnalysis:c,children:[i.jsxs(Mn,{children:["Game #",Z?.gameId||"?"]}),i.jsx(En,{children:Z?.timeControl||"?"})]}),i.jsx(Xl,{$orientation:"landscape",children:i.jsx(Tn,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:i.jsx(Cr,{position:j,flipped:ie,showCoordinates:o.preferences.showCoordinates,onMove:Q,onDrop:v,interactive:H==="playing"||H==="freestyle"||H==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:u,selectedCapturedPiece:k,onCapturedPieceSelect:S})})}),i.jsxs(ed,{$chatWidth:r,$hasAnalysis:c,children:[i.jsx(zn,{children:n.premove?`Premove: ${_r(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,j)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(Ln,{children:I})]}),c&&i.jsx(pd,{$chatWidth:r,$hasAnalysis:c,children:i.jsx(Pr,{})})]}),i.jsxs(dd,{$isWideAspect:E,$boardSize:g,children:[_&&i.jsx(ht,{orientation:"horizontal",isWhitePieces:ge,boardSize:g,onPieceClick:F}),i.jsx(ut,{player:se,isActive:de,size:"small",compact:!0,variant:"landscape"}),i.jsxs(ud,{children:[i.jsx(dt,{name:se.name,rating:se.rating,time:0,isActive:de,isWhite:ge,orientation:"vertical",hideClockInCard:!0,compact:!0}),i.jsx(Ho,{perspective:H,canAbort:n.moveHistory.length<=1,onAnalysis:w,onFlipBoard:M,onSetupFEN:L,onUnobserve:P,onUnexamine:R,onResign:z,onDraw:ae,onAbort:ue,isAnalysisActive:c,isDrawOffered:$}),i.jsx(hd,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:je,showHeader:!1,onNavigate:N=>{if(n.isExamining)switch(N){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(N){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),i.jsx(dt,{name:ee.name,rating:ee.rating,time:0,isActive:!de,isWhite:!ge,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),i.jsx(ut,{player:ee,isActive:!de,size:"small",compact:!0,variant:"landscape"}),_&&i.jsx(ht,{orientation:"horizontal",isWhitePieces:!ge,boardSize:g,onPieceClick:F})]})]})]})})}):te(),i.jsx(Uo,{isOpen:l,onClose:()=>p(!1)}),i.jsx(Vl,{isOpen:y,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:D,onCancel:()=>b(!1)})]})});qo.displayName="ChessGameLayout";const yd=m.div`
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
`,bd=m.div`
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
`,$d=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,vd=m.span`
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
`,wd=m.button`
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
`,kd=m.span`
  font-size: 12px;
  opacity: 0.7;
`,Ko=K(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=oe.useState(null),[o,s]=oe.useState(null),a=(p,g)=>{n(g),p.dataTransfer.effectAllowed="move"},h=(p,g)=>{p.preventDefault(),p.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},d=(p,g)=>{p.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},l=()=>{n(null),s(null)};return i.jsx(yd,{children:t.map(p=>i.jsxs(bd,{$active:p.id===e.activeTabId,$hasUnread:p.unreadCount>0,$dragging:p.id===r,$dragOver:p.id===o,draggable:!0,onDragStart:g=>a(g,p.id),onDragOver:g=>h(g,p.id),onDragLeave:c,onDrop:g=>d(g,p.id),onDragEnd:l,onClick:()=>e.setActiveTab(p.id),children:[p.type!=="console"&&i.jsx(kd,{$type:p.type}),i.jsx($d,{children:p.type==="channel"?`(${p.name})`:p.name}),p.unreadCount>0&&i.jsx(vd,{children:p.unreadCount>99?"99+":p.unreadCount}),p.id!=="console"&&i.jsx(wd,{onClick:g=>{g.stopPropagation(),e.closeTab(p.id)},title:"Close tab",children:"×"})]},p.id))})});Ko.displayName="ChatTabs";function Sd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function Cd(e){e.scrollTop=e.scrollHeight}function jd(e,t=10){Sd(e,t)&&Cd(e)}class Le{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class O{static{this.renderers=new Map}static register(t){this.renderers.set(t.type,t)}static getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}static getAllRenderers(){return Array.from(this.renderers.values())}}const Ge=m.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
  font-size: 11px;
  font-family: ${e=>e.$fontFamily||"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${e=>e.$fontStyle||"normal"};
  line-height: 1.3;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  flex: 1;
  color: ${e=>e.$color||e.theme.colors.text};
`,kt=m(Ge)`
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,Xo=m.div`
  font-size: 11px;
  font-family: ${e=>e.$fontFamily||"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${e=>e.$fontStyle||"normal"};
  line-height: 1.3;
  white-space: pre;
  word-break: break-all;
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,Wr=m.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  min-width: 80px;
  display: inline-block;
  
  &::after {
    content: ':';
  }
`,Hr=m.span`
  min-width: 80px;
  display: inline-block;
  flex-shrink: 0;
`,rt=m.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,Pd=m.a`
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
`,at=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`;m(at)`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`;const Rd=m(at)`
  &::before {
    content: '(';
  }
  &::after {
    content: ')';
  }
`,Md=m(at)`
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
`,Ed=m(at)`
  display: inline-block;
  padding: 0 2px;
  border-radius: 2px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
`,be=({content:e,elements:t=[],onCommandClick:r})=>{const{ficsStore:n}=Ee(),o=l=>{const p=[],g=/(https?:\/\/[^\s]+)/gi;let u;for(;(u=g.exec(l))!==null;)p.push({type:"url",text:u[1],action:u[1],start:u.index,end:u.index+u[1].length});const y=/['']([^'']+)['']|'([^']+)'/g;for(;(u=y.exec(l))!==null;){const C=u[1]||u[2];/^\w/.test(C)&&p.push({type:"command",text:u[0],action:C,start:u.index,end:u.index+u[0].length})}const b=/\\?"([^"]+)\\?"/g;for(;(u=b.exec(l))!==null;){const C=u[1];/^\w/.test(C)&&p.push({type:"command",text:u[0],action:C,start:u.index,end:u.index+u[0].length})}const $=/\bgame\s+(\d+)\b/gi;for(;(u=$.exec(l))!==null;)p.push({type:"gameNumber",text:u[1],action:`observe ${u[1]}`,start:u.index,end:u.index+u[0].length});const x=/"play\s+(\d+)"/gi;for(;(u=x.exec(l))!==null;)p.push({type:"seekNumber",text:u[0],action:`play ${u[1]}`,start:u.index,end:u.index+u[0].length});const k=/\((\d+)\):/g;for(;(u=k.exec(l))!==null;)p.push({type:"channelNumber",text:u[1],action:`+channel ${u[1]}`,start:u.index+1,end:u.index+1+u[1].length});const S=/\[(next|more|back|prev)\]/gi;for(;(u=S.exec(l))!==null;)p.push({type:"command",text:u[0],action:u[1].toLowerCase(),start:u.index,end:u.index+u[0].length});return p},s=(l,p)=>{p==="url"?window.open(l,"_blank","noopener,noreferrer"):r?r(l):n.sendCommand(l)},a=[...t];if(t.length===0){const l=o(e);a.push(...l)}if(a.length===0)return i.jsx(i.Fragment,{children:e});const h=[...a].sort((l,p)=>l.start-p.start),c=[];let d=0;return h.forEach((l,p)=>{l.start>d&&c.push(i.jsx("span",{style:{whiteSpace:"pre"},children:e.substring(d,l.start)},`text-${p}`));const g=`${l.type}-${p}`,u=e.substring(l.start,l.end);switch(l.type){case"player":c.push(i.jsx(st,{name:l.text,onClick:()=>s(l.action,l.type)},g));break;case"url":c.push(i.jsx(Pd,{href:l.action,target:"_blank",rel:"noopener noreferrer",onClick:y=>{y.preventDefault(),s(l.action,l.type)},children:u},g));break;case"channelNumber":c.push(i.jsx(Rd,{onClick:()=>s(l.action,l.type),children:l.text},g));break;case"gameNumber":c.push(i.jsx(Md,{onClick:()=>s(l.action,l.type),children:l.text},g));break;case"seekNumber":c.push(i.jsx(Ed,{onClick:()=>s(l.action,l.type),children:u},g));break;case"command":default:c.push(i.jsx(at,{onClick:()=>s(l.action,l.type),children:u},g));break}d=l.end}),d<e.length&&c.push(i.jsx("span",{style:{whiteSpace:"pre"},children:e.substring(d)},"text-end")),i.jsx(i.Fragment,{children:c})};class zd extends Le{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.metadata?.parsedMessage,s=t.metadata?.isGroupedMessage;if(t.type==="system")return i.jsx(kt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})});const a=t.sender&&t.sender.toLowerCase()===r.toLowerCase();return s||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,children:[i.jsx(Hr,{}),i.jsx(rt,{children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,children:[i.jsx(Wr,{$isYou:a||void 0,children:a?t.sender:i.jsx(st,{name:t.sender})}),i.jsx(rt,{children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]})}}class Ld extends Le{constructor(){super(...arguments),this.type="channelTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage,a=t.metadata?.isGroupedMessage,h=t.channel?.startsWith("channel-"),c=s?.metadata?.message||t.content;return a||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Hr,{}),i.jsx(rt,{children:h?i.jsx("span",{style:{whiteSpace:"pre-wrap"},children:c}):i.jsx(be,{content:c,elements:s?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,"data-settings":"chat",className:"channel-tell-message",children:[i.jsx(Wr,{$isYou:o,children:o?t.sender:i.jsx(st,{name:t.sender})}),i.jsx(rt,{children:h?i.jsx("span",{style:{whiteSpace:"pre-wrap"},children:c}):i.jsx(be,{content:c,elements:[],onCommandClick:n})})]})}}class Td extends Le{constructor(){super(...arguments),this.type="directTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage;return t.metadata?.isGroupedMessage||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Hr,{}),i.jsx(rt,{children:i.jsx(be,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Wr,{$isYou:o,children:o?t.sender:i.jsx(st,{name:t.sender})}),i.jsx(rt,{children:i.jsx(be,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]})}}class Id extends Le{constructor(){super(...arguments),this.type="gameStart"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(kt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Ad extends Le{constructor(){super(...arguments),this.type="gameEnd"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(kt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Dd extends Le{constructor(){super(...arguments),this.type="style12"}render({message:t}){return i.jsx(kt,{$color:t.metadata?.color||"#666",children:t.content})}}class Nd extends Le{constructor(){super(...arguments),this.type="movesList"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(kt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class V extends Le{render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(Xo,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx(be,{content:n?.content||t.content,elements:n?.elements||[],onCommandClick:r})})}}class Od extends V{constructor(){super(...arguments),this.type="shout"}}class Fd extends V{constructor(){super(...arguments),this.type="cshout"}}class Bd extends V{constructor(){super(...arguments),this.type="notification"}}class Wd extends V{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Hd extends V{constructor(){super(...arguments),this.type="matchRequest"}}class _d extends V{constructor(){super(...arguments),this.type="illegalMove"}}class Gd extends V{constructor(){super(...arguments),this.type="drawOffer"}}class Ud extends V{constructor(){super(...arguments),this.type="unobserve"}}class Yd extends V{constructor(){super(...arguments),this.type="whoOutput"}}class Vd extends V{constructor(){super(...arguments),this.type="gamesOutput"}}class qd extends V{constructor(){super(...arguments),this.type="fingerOutput"}}class Kd extends V{constructor(){super(...arguments),this.type="historyOutput"}}class Xd extends V{constructor(){super(...arguments),this.type="journalOutput"}}class Qd extends V{constructor(){super(...arguments),this.type="soughtOutput"}}class Jd extends V{constructor(){super(...arguments),this.type="channelListOutput"}}class Zd extends V{constructor(){super(...arguments),this.type="newsOutput"}}class eu extends V{constructor(){super(...arguments),this.type="inOutput"}}class tu extends V{constructor(){super(...arguments),this.type="login"}}class ru extends V{constructor(){super(...arguments),this.type="password"}}class nu extends V{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class ou extends V{constructor(){super(...arguments),this.type="sessionStart"}}class iu extends V{constructor(){super(...arguments),this.type="system"}}class su extends V{constructor(){super(...arguments),this.type="raw"}}class au extends Le{constructor(){super(...arguments),this.type="gameNotification"}render({message:t,onCommandClick:r}){const o=t.metadata?.parsedMessage?.metadata?.gameNumber,s=()=>{const a=`observe ${o}`;r&&r(a)};return i.jsx(Xo,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx(at,{onClick:s,style:{display:"inline-block",textDecoration:"none",cursor:"pointer",width:"100%"},children:t.content})})}}function cu(){O.register(new Ld),O.register(new Td),O.register(new Od),O.register(new Fd),O.register(new Id),O.register(new Ad),O.register(new Dd),O.register(new Nd),O.register(new _d),O.register(new Gd),O.register(new Ud),O.register(new au),O.register(new Wd),O.register(new Hd),O.register(new Yd),O.register(new Vd),O.register(new qd),O.register(new Kd),O.register(new Xd),O.register(new Qd),O.register(new Jd),O.register(new Zd),O.register(new eu),O.register(new Bd),O.register(new tu),O.register(new ru),O.register(new nu),O.register(new ou),O.register(new iu),O.register(new su),O.register(new zd)}cu();const pt=K(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=Ee(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,h=s?o.getConsoleColor(s,a):null,c=s?o.getConsoleFont(s,a):null,d=s?o.getConsoleFontStyle(s,a):null,l={...e,metadata:{...e.metadata,color:h,fontFamily:c,fontStyle:d}},p=O.getRenderer(l);return p?i.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:p.render({message:l,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),i.jsx("div",{children:e.content}))});pt.displayName="Message";const Rt=m.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,Mt=m.div`
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
`,lu=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
`,Dn=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,du=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Et=m.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Qo=K(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),o=f.useRef(null),s=t.activeTab,a=s?.messages||[],h=r.username||"You",c=l=>{r.sendCommand(l)};if(f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current,p=setTimeout(()=>{s?.type==="console"?l.scrollTop=l.scrollHeight:jd(l,50)},50);return()=>clearTimeout(p)}},[a.length,a[a.length-1]?.id]),f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current;requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}},[s?.id]),!s)return i.jsx(Rt,{children:i.jsx(Mt,{className:"chat-messages-container",children:i.jsx(Dn,{children:"No active chat"})})});if(a.length===0)return i.jsx(Rt,{children:i.jsx(Mt,{className:"chat-messages-container",children:i.jsx(Dn,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const d=[];return a.forEach((l,p)=>{const g=p>0?a[p-1]:null,u=g?new Date(l.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===l.sender&&g.type===l.type&&u<6e4?d[d.length-1].messages.push(l):d.push({sender:l.sender,timestamp:new Date(l.timestamp),messages:[l]})}),s.type==="console"?i.jsx(Rt,{children:i.jsx(Mt,{ref:o,className:"chat-messages-container",children:a.map(l=>i.jsx(Et,{children:i.jsx(pt,{message:l,currentUsername:h,onCommandClick:c,onHover:e})},l.id))})}):i.jsx(Rt,{children:i.jsx(Mt,{ref:o,className:"chat-messages-container",children:d.map((l,p)=>l.messages[0].type==="system"?i.jsx(du,{children:l.messages.map(u=>i.jsx(Et,{children:i.jsx(pt,{message:u,currentUsername:h,onCommandClick:c,onHover:e})},u.id))},p):i.jsx(lu,{children:l.messages.map((u,y)=>{if(y===0)return i.jsx(Et,{children:i.jsx(pt,{message:u,currentUsername:h,onCommandClick:c,onHover:e})},u.id);{const b={...u,sender:"",metadata:{...u.metadata,isGroupedMessage:!0}};return i.jsx(Et,{children:i.jsx(pt,{message:b,currentUsername:h,onCommandClick:c,onHover:e})},u.id)}})},p))})})});Qo.displayName="ChatMessages";const uu=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  padding-top: ${e=>e.theme.spacing[1]};
  background-color: transparent;
  margin: ${e=>e.theme.spacing[2]};
  margin-top: 0;
`,hu=m.input`
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
`,pu=m.button`
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
`,Jo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:s=!1})=>{const a=f.useRef(null),h=d=>{d.key==="Enter"&&!d.shiftKey?(d.preventDefault(),e.trim()&&r(e.trim())):d.key==="ArrowUp"&&!e?(d.preventDefault(),n?.("up")):d.key==="ArrowDown"&&(d.preventDefault(),n?.("down"))},c=()=>{e.trim()&&r(e.trim())};return i.jsxs(uu,{children:[i.jsx(hu,{ref:a,type:"text",value:e,onChange:d=>t(d.target.value),onKeyDown:h,placeholder:o,disabled:s,autoComplete:"off",spellCheck:"true"}),i.jsx(pu,{onClick:c,disabled:s||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};Jo.displayName="ChatInput";const mu=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,fu=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,gu=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,xu=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,yu=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,bu=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  padding: ${e=>e.theme.spacing[2]};
  padding-top: 0;
  padding-bottom: 0;
`,Zo=K(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=Ee(),[s,a]=f.useState(""),[h,c]=f.useState(!1),[d,l]=f.useState(null);oe.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),oe.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const p=u=>{if(console.log("handleSendMessage called with:",u,"Length:",u.length),!!u.trim()){if(r.addToHistory(u),u==="/help"||u==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(u.startsWith("/")||u.startsWith("\\")){const y=u.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const b=y.id.replace("channel-","");n.sendCommand(`tell ${b} ${u}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:u,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${u}`);else{const b=u.match(/^tell\s+(\w+)\s+(.+)$/);if(b&&o.preferences.openTellsInTabs){const[,$,x]=b,k=$.replace(/\([^)]*\)/g,"").trim(),S=k.toLowerCase();r.createTab(S,k,"private"),r.addMessage(S,{channel:S,sender:"You",content:x,timestamp:new Date,type:"message"})}else r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"});n.sendCommand(u)}}a("")}},g=u=>{const y=r.navigateHistory(u);y!==null&&a(y)};return i.jsxs(mu,{className:e,$compact:t,children:[!t&&i.jsxs(fu,{children:[i.jsx(gu,{children:"Chat"}),n.averagePing!==null&&i.jsxs(yu,{children:["Ping: ",n.averagePing,"ms"]}),d&&i.jsxs(xu,{children:["Received: ",new Date(d).toLocaleTimeString()]})]}),i.jsxs(bu,{children:[i.jsx(Ko,{}),i.jsx(Qo,{onMessageHover:l}),i.jsx(Jo,{value:s,onChange:a,onSend:p,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});Zo.displayName="ChatPanel";const $u=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,vu=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,wu=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,ku=m.div`
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
`,Su=m.div`
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
`,ei=K(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Fe(),o=Ao(),s=Do(),a=nc(),[h,c]=f.useState(600),[d,l]=f.useState(!1),p=f.useRef(!1);f.useEffect(()=>{!p.current&&r&&(p.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),f.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),f.useEffect(()=>{const $=e.preferences.chessOrientation;s.includes($)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=$=>{$.preventDefault(),l(!0)};f.useEffect(()=>{if(!d)return;const $=k=>{const S=window.innerWidth-k.clientX;c(Math.max(300,Math.min(600,S))),window.dispatchEvent(new Event("resize"))},x=()=>{l(!1)};return document.addEventListener("mousemove",$),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",x)}},[d]);const u=t==="chess-only"||t==="chess-and-chat",y=t==="chat-only"||t==="chess-and-chat",b=t==="chess-and-chat"&&!n.isMobile;return i.jsxs($u,{children:[i.jsx(Oo,{}),i.jsxs(vu,{children:[i.jsx(wu,{$isVisible:u,children:i.jsx(qo,{hasChat:y,chatWidth:y&&!n.isMobile?h:0})}),b&&i.jsx(Su,{$isVisible:!0,onMouseDown:g,style:{cursor:d?"col-resize":"ew-resize"}}),i.jsx(ku,{$isVisible:y,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:y&&!n.isMobile?`${h}px`:void 0},children:i.jsx(Zo,{})})]})]})});ei.displayName="AppLayout";const Cu=Ya`
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
`,ju=()=>i.jsx(oi,{children:i.jsxs(qa,{children:[i.jsx(Cu,{}),i.jsx(Es,{children:i.jsx(ss,{children:i.jsx(Xn,{path:"/",element:i.jsx(ic,{children:i.jsx(ei,{})})})})})]})}),ti=document.getElementById("root");if(!ti)throw new Error("Root element not found");const Pu=On(ti);Pu.render(i.jsx(ju,{}));
