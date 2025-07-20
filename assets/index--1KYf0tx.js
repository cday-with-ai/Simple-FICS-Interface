import{u as Ne,j as i,a as Ee,b as _t,c as Nn,d as pr,e as Gt,V as ti,f as ri,l as _r,R as ni}from"./shared-DAiClXRl.js";import{a as oi,r as f,R as oe}from"./vendor-cxkclgJA.js";import{o as K}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var On,Gr=oi;On=Gr.createRoot,Gr.hydrateRoot;var Rr={};Object.defineProperty(Rr,"__esModule",{value:!0});Rr.parse=ui;Rr.serialize=hi;const ii=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,si=/^[\u0021-\u003A\u003C-\u007E]*$/,ai=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,ci=/^[\u0020-\u003A\u003D-\u007E]*$/,li=Object.prototype.toString,di=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function ui(e,t){const r=new di,n=e.length;if(n<2)return r;const o=t?.decode||pi;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const u=e.indexOf(";",s),c=u===-1?n:u;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const d=Ur(e,s,a),l=Yr(e,a,d),h=e.slice(d,l);if(r[h]===void 0){let g=Ur(e,a+1,c),m=Yr(e,c,g);const y=o(e.slice(g,m));r[h]=y}s=c+1}while(s<n);return r}function Ur(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Yr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function hi(e,t,r){const n=r?.encode||encodeURIComponent;if(!ii.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!si.test(o))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+o;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!ai.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!ci.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!mi(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function pi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function mi(e){return li.call(e)==="[object Date]"}var Vr="popstate";function fi(e={}){function t(n,o){let{pathname:s,search:a,hash:u}=n.location;return mr("",{pathname:s,search:a,hash:u},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:mt(o)}return xi(t,r,null,e)}function V(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ke(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function gi(){return Math.random().toString(36).substring(2,10)}function qr(e,t){return{usr:e.state,key:e.key,idx:t}}function mr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?nt(t):t,state:r,key:t&&t.key||n||gi()}}function mt({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function nt(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function xi(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:s=!1}=n,a=o.history,u="POP",c=null,d=l();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function l(){return(a.state||{idx:null}).idx}function h(){u="POP";let $=l(),x=$==null?null:$-d;d=$,c&&c({action:u,location:b.location,delta:x})}function g($,x){u="PUSH";let k=mr(b.location,$,x);d=l()+1;let S=qr(k,d),j=b.createHref(k);try{a.pushState(S,"",j)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;o.location.assign(j)}s&&c&&c({action:u,location:b.location,delta:1})}function m($,x){u="REPLACE";let k=mr(b.location,$,x);d=l();let S=qr(k,d),j=b.createHref(k);a.replaceState(S,"",j),s&&c&&c({action:u,location:b.location,delta:0})}function y($){return yi($)}let b={get action(){return u},get location(){return e(o,a)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Vr,h),c=$,()=>{o.removeEventListener(Vr,h),c=null}},createHref($){return t(o,$)},createURL:y,encodeLocation($){let x=y($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:m,go($){return a.go($)}};return b}function yi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),V(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:mt(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Fn(e,t,r="/"){return bi(e,t,r,!1)}function bi(e,t,r,n){let o=typeof t=="string"?nt(t):t,s=Me(o.pathname||"/",r);if(s==null)return null;let a=Bn(e);$i(a);let u=null;for(let c=0;u==null&&c<a.length;++c){let d=zi(s);u=Mi(a[c],d,n)}return u}function Bn(e,t=[],r=[],n=""){let o=(s,a,u)=>{let c={relativePath:u===void 0?s.path||"":u,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(V(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let d=Re([n,c.relativePath]),l=r.concat(c);s.children&&s.children.length>0&&(V(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Bn(s.children,t,l,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Pi(d,s.index),routesMeta:l})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))o(s,a);else for(let u of Wn(s.path))o(s,a,u)}),t}function Wn(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return o?[s,""]:[s];let a=Wn(n.join("/")),u=[];return u.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&u.push(...a),u.map(c=>e.startsWith("/")&&c===""?"/":c)}function $i(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Ri(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var vi=/^:[\w-]+$/,wi=3,ki=2,Si=1,Ci=10,ji=-2,Kr=e=>e==="*";function Pi(e,t){let r=e.split("/"),n=r.length;return r.some(Kr)&&(n+=ji),t&&(n+=ki),r.filter(o=>!Kr(o)).reduce((o,s)=>o+(vi.test(s)?wi:s===""?Si:Ci),n)}function Ri(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Mi(e,t,r=!1){let{routesMeta:n}=e,o={},s="/",a=[];for(let u=0;u<n.length;++u){let c=n[u],d=u===n.length-1,l=s==="/"?t:t.slice(s.length)||"/",h=Ot({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},l),g=c.route;if(!h&&d&&r&&!n[n.length-1].route.index&&(h=Ot({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},l)),!h)return null;Object.assign(o,h.params),a.push({params:o,pathname:Re([s,h.pathname]),pathnameBase:Ai(Re([s,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(s=Re([s,h.pathnameBase]))}return a}function Ot(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Ei(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),u=o.slice(1);return{params:n.reduce((d,{paramName:l,isOptional:h},g)=>{if(l==="*"){let y=u[g]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const m=u[g];return h&&!m?d[l]=void 0:d[l]=(m||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function Ei(e,t=!1,r=!0){ke(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,u,c)=>(n.push({paramName:u,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function zi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ke(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Me(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Li(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?nt(e):e;return{pathname:r?r.startsWith("/")?r:Ti(r,t):t,search:Di(n),hash:Ni(o)}}function Ti(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function er(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ii(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Hn(e){let t=Ii(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function _n(e,t,r,n=!1){let o;typeof e=="string"?o=nt(e):(o={...e},V(!o.pathname||!o.pathname.includes("?"),er("?","pathname","search",o)),V(!o.pathname||!o.pathname.includes("#"),er("#","pathname","hash",o)),V(!o.search||!o.search.includes("#"),er("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,u;if(a==null)u=r;else{let h=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;o.pathname=g.join("/")}u=h>=0?t[h]:"/"}let c=Li(o,u),d=a&&a!=="/"&&a.endsWith("/"),l=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||l)&&(c.pathname+="/"),c}var Re=e=>e.join("/").replace(/\/\/+/g,"/"),Ai=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Di=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Ni=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Oi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Gn=["POST","PUT","PATCH","DELETE"];new Set(Gn);var Fi=["GET",...Gn];new Set(Fi);var ot=f.createContext(null);ot.displayName="DataRouter";var Ut=f.createContext(null);Ut.displayName="DataRouterState";var Un=f.createContext({isTransitioning:!1});Un.displayName="ViewTransition";var Bi=f.createContext(new Map);Bi.displayName="Fetchers";var Wi=f.createContext(null);Wi.displayName="Await";var Se=f.createContext(null);Se.displayName="Navigation";var yt=f.createContext(null);yt.displayName="Location";var ze=f.createContext({outlet:null,matches:[],isDataRoute:!1});ze.displayName="Route";var Mr=f.createContext(null);Mr.displayName="RouteError";function Hi(e,{relative:t}={}){V(bt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=f.useContext(Se),{hash:o,pathname:s,search:a}=$t(e,{relative:t}),u=s;return r!=="/"&&(u=s==="/"?r:Re([r,s])),n.createHref({pathname:u,search:a,hash:o})}function bt(){return f.useContext(yt)!=null}function Ue(){return V(bt(),"useLocation() may be used only in the context of a <Router> component."),f.useContext(yt).location}var Yn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Vn(e){f.useContext(Se).static||f.useLayoutEffect(e)}function _i(){let{isDataRoute:e}=f.useContext(ze);return e?rs():Gi()}function Gi(){V(bt(),"useNavigate() may be used only in the context of a <Router> component.");let e=f.useContext(ot),{basename:t,navigator:r}=f.useContext(Se),{matches:n}=f.useContext(ze),{pathname:o}=Ue(),s=JSON.stringify(Hn(n)),a=f.useRef(!1);return Vn(()=>{a.current=!0}),f.useCallback((c,d={})=>{if(ke(a.current,Yn),!a.current)return;if(typeof c=="number"){r.go(c);return}let l=_n(c,JSON.parse(s),o,d.relative==="path");e==null&&t!=="/"&&(l.pathname=l.pathname==="/"?t:Re([t,l.pathname])),(d.replace?r.replace:r.push)(l,d.state,d)},[t,r,s,o,e])}f.createContext(null);function $t(e,{relative:t}={}){let{matches:r}=f.useContext(ze),{pathname:n}=Ue(),o=JSON.stringify(Hn(r));return f.useMemo(()=>_n(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Ui(e,t){return qn(e,t)}function qn(e,t,r,n){V(bt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=f.useContext(Se),{matches:s}=f.useContext(ze),a=s[s.length-1],u=a?a.params:{},c=a?a.pathname:"/",d=a?a.pathnameBase:"/",l=a&&a.route;{let x=l&&l.path||"";Kn(c,!l||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let h=Ue(),g;if(t){let x=typeof t=="string"?nt(t):t;V(d==="/"||x.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=h;let m=g.pathname||"/",y=m;if(d!=="/"){let x=d.replace(/^\//,"").split("/");y="/"+m.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=Fn(e,{pathname:y});ke(l||b!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),ke(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=Xi(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},u,x.params),pathname:Re([d,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?d:Re([d,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),s,r,n);return t&&$?f.createElement(yt.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},$):$}function Yi(){let e=ts(),t=Oi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=f.createElement(f.Fragment,null,f.createElement("p",null,"💿 Hey developer 👋"),f.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",f.createElement("code",{style:s},"ErrorBoundary")," or"," ",f.createElement("code",{style:s},"errorElement")," prop on your route.")),f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:o},r):null,a)}var Vi=f.createElement(Yi,null),qi=class extends f.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?f.createElement(ze.Provider,{value:this.props.routeContext},f.createElement(Mr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Ki({routeContext:e,match:t,children:r}){let n=f.useContext(ot);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),f.createElement(ze.Provider,{value:e},r)}function Xi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=r?.errors;if(s!=null){let c=o.findIndex(d=>d.route.id&&s?.[d.route.id]!==void 0);V(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,u=-1;if(r)for(let c=0;c<o.length;c++){let d=o[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=c),d.route.id){let{loaderData:l,errors:h}=r,g=d.route.loader&&!l.hasOwnProperty(d.route.id)&&(!h||h[d.route.id]===void 0);if(d.route.lazy||g){a=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((c,d,l)=>{let h,g=!1,m=null,y=null;r&&(h=s&&d.route.id?s[d.route.id]:void 0,m=d.route.errorElement||Vi,a&&(u<0&&l===0?(Kn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,y=null):u===l&&(g=!0,y=d.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,l+1)),$=()=>{let x;return h?x=m:g?x=y:d.route.Component?x=f.createElement(d.route.Component,null):d.route.element?x=d.route.element:x=c,f.createElement(Ki,{match:d,routeContext:{outlet:c,matches:b,isDataRoute:r!=null},children:x})};return r&&(d.route.ErrorBoundary||d.route.errorElement||l===0)?f.createElement(qi,{location:r.location,revalidation:r.revalidation,component:m,error:h,children:$(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):$()},null)}function Er(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Qi(e){let t=f.useContext(ot);return V(t,Er(e)),t}function Ji(e){let t=f.useContext(Ut);return V(t,Er(e)),t}function Zi(e){let t=f.useContext(ze);return V(t,Er(e)),t}function zr(e){let t=Zi(e),r=t.matches[t.matches.length-1];return V(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function es(){return zr("useRouteId")}function ts(){let e=f.useContext(Mr),t=Ji("useRouteError"),r=zr("useRouteError");return e!==void 0?e:t.errors?.[r]}function rs(){let{router:e}=Qi("useNavigate"),t=zr("useNavigate"),r=f.useRef(!1);return Vn(()=>{r.current=!0}),f.useCallback(async(o,s={})=>{ke(r.current,Yn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...s}))},[e,t])}var Xr={};function Kn(e,t,r){!t&&!Xr[e]&&(Xr[e]=!0,ke(!1,r))}f.memo(ns);function ns({routes:e,future:t,state:r}){return qn(e,void 0,r,t)}function Xn(e){V(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function os({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:s=!1}){V(!bt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),u=f.useMemo(()=>({basename:a,navigator:o,static:s,future:{}}),[a,o,s]);typeof r=="string"&&(r=nt(r));let{pathname:c="/",search:d="",hash:l="",state:h=null,key:g="default"}=r,m=f.useMemo(()=>{let y=Me(c,a);return y==null?null:{location:{pathname:y,search:d,hash:l,state:h,key:g},navigationType:n}},[a,c,d,l,h,g,n]);return ke(m!=null,`<Router basename="${a}"> is not able to match the URL "${c}${d}${l}" because it does not start with the basename, so the <Router> won't render anything.`),m==null?null:f.createElement(Se.Provider,{value:u},f.createElement(yt.Provider,{children:t,value:m}))}function is({children:e,location:t}){return Ui(fr(e),t)}function fr(e,t=[]){let r=[];return f.Children.forEach(e,(n,o)=>{if(!f.isValidElement(n))return;let s=[...t,o];if(n.type===f.Fragment){r.push.apply(r,fr(n.props.children,s));return}V(n.type===Xn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),V(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=fr(n.props.children,s)),r.push(a)}),r}var zt="get",Lt="application/x-www-form-urlencoded";function Yt(e){return e!=null&&typeof e.tagName=="string"}function ss(e){return Yt(e)&&e.tagName.toLowerCase()==="button"}function as(e){return Yt(e)&&e.tagName.toLowerCase()==="form"}function cs(e){return Yt(e)&&e.tagName.toLowerCase()==="input"}function ls(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ds(e,t){return e.button===0&&(!t||t==="_self")&&!ls(e)}var St=null;function us(){if(St===null)try{new FormData(document.createElement("form"),0),St=!1}catch{St=!0}return St}var hs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function tr(e){return e!=null&&!hs.has(e)?(ke(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Lt}"`),null):e}function ps(e,t){let r,n,o,s,a;if(as(e)){let u=e.getAttribute("action");n=u?Me(u,t):null,r=e.getAttribute("method")||zt,o=tr(e.getAttribute("enctype"))||Lt,s=new FormData(e)}else if(ss(e)||cs(e)&&(e.type==="submit"||e.type==="image")){let u=e.form;if(u==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||u.getAttribute("action");if(n=c?Me(c,t):null,r=e.getAttribute("formmethod")||u.getAttribute("method")||zt,o=tr(e.getAttribute("formenctype"))||tr(u.getAttribute("enctype"))||Lt,s=new FormData(u,e),!us()){let{name:d,type:l,value:h}=e;if(l==="image"){let g=d?`${d}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else d&&s.append(d,h)}}else{if(Yt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=zt,n=null,o=Lt,a=e}return s&&o==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:s,body:a}}function Lr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function ms(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function fs(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function gs(e,t,r){let n=await Promise.all(e.map(async o=>{let s=t.routes[o.route.id];if(s){let a=await ms(s,r);return a.links?a.links():[]}return[]}));return $s(n.flat(1).filter(fs).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Qr(e,t,r,n,o,s){let a=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,u=(c,d)=>r[d].pathname!==c.pathname||r[d].route.path?.endsWith("*")&&r[d].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,d)=>a(c,d)||u(c,d)):s==="data"?t.filter((c,d)=>{let l=n.routes[c.route.id];if(!l||!l.hasLoader)return!1;if(a(c,d)||u(c,d))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function xs(e,t,{includeHydrateFallback:r}={}){return ys(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let s=[o.module];return o.clientActionModule&&(s=s.concat(o.clientActionModule)),o.clientLoaderModule&&(s=s.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(s=s.concat(o.hydrateFallbackModule)),o.imports&&(s=s.concat(o.imports)),s}).flat(1))}function ys(e){return[...new Set(e)]}function bs(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function $s(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let s=JSON.stringify(bs(o));return r.has(s)||(r.add(s),n.push({key:s,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var vs=new Set([100,101,204,205]);function ws(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Me(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Qn(){let e=f.useContext(ot);return Lr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ks(){let e=f.useContext(Ut);return Lr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Tr=f.createContext(void 0);Tr.displayName="FrameworkContext";function Jn(){let e=f.useContext(Tr);return Lr(e,"You must render this element inside a <HydratedRouter> element"),e}function Ss(e,t){let r=f.useContext(Tr),[n,o]=f.useState(!1),[s,a]=f.useState(!1),{onFocus:u,onBlur:c,onMouseEnter:d,onMouseLeave:l,onTouchStart:h}=t,g=f.useRef(null);f.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=x=>{x.forEach(k=>{a(k.isIntersecting)})},$=new IntersectionObserver(b,{threshold:.5});return g.current&&$.observe(g.current),()=>{$.disconnect()}}},[e]),f.useEffect(()=>{if(n){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[n]);let m=()=>{o(!0)},y=()=>{o(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:at(u,m),onBlur:at(c,y),onMouseEnter:at(d,m),onMouseLeave:at(l,y),onTouchStart:at(h,m)}]:[!1,g,{}]}function at(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Cs({page:e,...t}){let{router:r}=Qn(),n=f.useMemo(()=>Fn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?f.createElement(Ps,{page:e,matches:n,...t}):null}function js(e){let{manifest:t,routeModules:r}=Jn(),[n,o]=f.useState([]);return f.useEffect(()=>{let s=!1;return gs(e,t,r).then(a=>{s||o(a)}),()=>{s=!0}},[e,t,r]),n}function Ps({page:e,matches:t,...r}){let n=Ue(),{manifest:o,routeModules:s}=Jn(),{basename:a}=Qn(),{loaderData:u,matches:c}=ks(),d=f.useMemo(()=>Qr(e,t,c,o,n,"data"),[e,t,c,o,n]),l=f.useMemo(()=>Qr(e,t,c,o,n,"assets"),[e,t,c,o,n]),h=f.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let y=new Set,b=!1;if(t.forEach(x=>{let k=o.routes[x.route.id];!k||!k.hasLoader||(!d.some(S=>S.route.id===x.route.id)&&x.route.id in u&&s[x.route.id]?.shouldRevalidate||k.hasClientLoader?b=!0:y.add(x.route.id))}),y.size===0)return[];let $=ws(e,a);return b&&y.size>0&&$.searchParams.set("_routes",t.filter(x=>y.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[a,u,n,o,d,t,e,s]),g=f.useMemo(()=>xs(l,o),[l,o]),m=js(l);return f.createElement(f.Fragment,null,h.map(y=>f.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...r})),g.map(y=>f.createElement("link",{key:y,rel:"modulepreload",href:y,...r})),m.map(({key:y,link:b})=>f.createElement("link",{key:y,...b})))}function Rs(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var Zn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Zn&&(window.__reactRouterVersion="7.6.3")}catch{}function Ms({basename:e,children:t,window:r}){let n=f.useRef();n.current==null&&(n.current=fi({window:r,v5Compat:!0}));let o=n.current,[s,a]=f.useState({action:o.action,location:o.location}),u=f.useCallback(c=>{f.startTransition(()=>a(c))},[a]);return f.useLayoutEffect(()=>o.listen(u),[o,u]),f.createElement(os,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o})}var eo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,to=f.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:s,replace:a,state:u,target:c,to:d,preventScrollReset:l,viewTransition:h,...g},m){let{basename:y}=f.useContext(Se),b=typeof d=="string"&&eo.test(d),$,x=!1;if(typeof d=="string"&&b&&($=d,Zn))try{let _=new URL(window.location.href),Q=d.startsWith("//")?new URL(_.protocol+d):new URL(d),v=Me(Q.pathname,y);Q.origin===_.origin&&v!=null?d=v+Q.search+Q.hash:x=!0}catch{ke(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=Hi(d,{relative:o}),[S,j,C]=Ss(n,g),T=Ts(d,{replace:a,state:u,target:c,preventScrollReset:l,relative:o,viewTransition:h});function E(_){t&&t(_),_.defaultPrevented||T(_)}let H=f.createElement("a",{...g,...C,href:$||k,onClick:x||s?t:E,ref:Rs(m,j),target:c,"data-discover":!b&&r==="render"?"true":void 0});return S&&!b?f.createElement(f.Fragment,null,H,f.createElement(Cs,{page:k})):H});to.displayName="Link";var Es=f.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:s,to:a,viewTransition:u,children:c,...d},l){let h=$t(a,{relative:d.relative}),g=Ue(),m=f.useContext(Ut),{navigator:y,basename:b}=f.useContext(Se),$=m!=null&&Os(h)&&u===!0,x=y.encodeLocation?y.encodeLocation(h).pathname:h.pathname,k=g.pathname,S=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;r||(k=k.toLowerCase(),S=S?S.toLowerCase():null,x=x.toLowerCase()),S&&b&&(S=Me(S,b)||S);const j=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let C=k===x||!o&&k.startsWith(x)&&k.charAt(j)==="/",T=S!=null&&(S===x||!o&&S.startsWith(x)&&S.charAt(x.length)==="/"),E={isActive:C,isPending:T,isTransitioning:$},H=C?t:void 0,_;typeof n=="function"?_=n(E):_=[n,C?"active":null,T?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let Q=typeof s=="function"?s(E):s;return f.createElement(to,{...d,"aria-current":H,className:_,ref:l,style:Q,to:a,viewTransition:u},typeof c=="function"?c(E):c)});Es.displayName="NavLink";var zs=f.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:s,method:a=zt,action:u,onSubmit:c,relative:d,preventScrollReset:l,viewTransition:h,...g},m)=>{let y=Ds(),b=Ns(u,{relative:d}),$=a.toLowerCase()==="get"?"get":"post",x=typeof u=="string"&&eo.test(u),k=S=>{if(c&&c(S),S.defaultPrevented)return;S.preventDefault();let j=S.nativeEvent.submitter,C=j?.getAttribute("formmethod")||a;y(j||S.currentTarget,{fetcherKey:t,method:C,navigate:r,replace:o,state:s,relative:d,preventScrollReset:l,viewTransition:h})};return f.createElement("form",{ref:m,method:$,action:b,onSubmit:n?c:k,...g,"data-discover":!x&&e==="render"?"true":void 0})});zs.displayName="Form";function Ls(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ro(e){let t=f.useContext(ot);return V(t,Ls(e)),t}function Ts(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:s,viewTransition:a}={}){let u=_i(),c=Ue(),d=$t(e,{relative:s});return f.useCallback(l=>{if(ds(l,t)){l.preventDefault();let h=r!==void 0?r:mt(c)===mt(d);u(e,{replace:h,state:n,preventScrollReset:o,relative:s,viewTransition:a})}},[c,u,d,r,n,t,e,o,s,a])}var Is=0,As=()=>`__${String(++Is)}__`;function Ds(){let{router:e}=ro("useSubmit"),{basename:t}=f.useContext(Se),r=es();return f.useCallback(async(n,o={})=>{let{action:s,method:a,encType:u,formData:c,body:d}=ps(n,t);if(o.navigate===!1){let l=o.fetcherKey||As();await e.fetch(l,r,o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||u,flushSync:o.flushSync})}else await e.navigate(o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||u,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Ns(e,{relative:t}={}){let{basename:r}=f.useContext(Se),n=f.useContext(ze);V(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),s={...$t(e||".",{relative:t})},a=Ue();if(e==null){s.search=a.search;let u=new URLSearchParams(s.search),c=u.getAll("index");if(c.some(l=>l==="")){u.delete("index"),c.filter(h=>h).forEach(h=>u.append("index",h));let l=u.toString();s.search=l?`?${l}`:""}}return(!e||e===".")&&o.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Re([r,s.pathname])),mt(s)}function Os(e,t={}){let r=f.useContext(Un);V(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=ro("useViewTransitionState"),o=$t(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Me(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Me(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Ot(o.pathname,a)!=null||Ot(o.pathname,s)!=null}[...vs];const no={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Fs={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Bs={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},oo={colors:Fs,...no},Ws={colors:Bs,...no},Hs={light:oo,dark:Ws},_s=oo;var ne=function(){return ne=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},ne.apply(this,arguments)};function ft(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var U="-ms-",pt="-moz-",W="-webkit-",io="comm",Vt="rule",Ir="decl",Gs="@import",so="@keyframes",Us="@layer",ao=Math.abs,Ar=String.fromCharCode,gr=Object.assign;function Ys(e,t){return re(e,0)^45?(((t<<2^re(e,0))<<2^re(e,1))<<2^re(e,2))<<2^re(e,3):0}function co(e){return e.trim()}function Pe(e,t){return(e=t.exec(e))?e[0]:e}function A(e,t,r){return e.replace(t,r)}function Tt(e,t,r){return e.indexOf(t,r)}function re(e,t){return e.charCodeAt(t)|0}function Je(e,t,r){return e.slice(t,r)}function ve(e){return e.length}function lo(e){return e.length}function ct(e,t){return t.push(e),e}function Vs(e,t){return e.map(t).join("")}function Jr(e,t){return e.filter(function(r){return!Pe(r,t)})}var qt=1,Ze=1,uo=0,fe=0,J=0,it="";function Kt(e,t,r,n,o,s,a,u){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:qt,column:Ze,length:a,return:"",siblings:u}}function Ie(e,t){return gr(Kt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ye(e){for(;e.root;)e=Ie(e.root,{children:[e]});ct(e,e.siblings)}function qs(){return J}function Ks(){return J=fe>0?re(it,--fe):0,Ze--,J===10&&(Ze=1,qt--),J}function ye(){return J=fe<uo?re(it,fe++):0,Ze++,J===10&&(Ze=1,qt++),J}function We(){return re(it,fe)}function It(){return fe}function Xt(e,t){return Je(it,e,t)}function xr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Xs(e){return qt=Ze=1,uo=ve(it=e),fe=0,[]}function Qs(e){return it="",e}function rr(e){return co(Xt(fe-1,yr(e===91?e+2:e===40?e+1:e)))}function Js(e){for(;(J=We())&&J<33;)ye();return xr(e)>2||xr(J)>3?"":" "}function Zs(e,t){for(;--t&&ye()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return Xt(e,It()+(t<6&&We()==32&&ye()==32))}function yr(e){for(;ye();)switch(J){case e:return fe;case 34:case 39:e!==34&&e!==39&&yr(J);break;case 40:e===41&&yr(e);break;case 92:ye();break}return fe}function ea(e,t){for(;ye()&&e+J!==57;)if(e+J===84&&We()===47)break;return"/*"+Xt(t,fe-1)+"*"+Ar(e===47?e:ye())}function ta(e){for(;!xr(We());)ye();return Xt(e,fe)}function ra(e){return Qs(At("",null,null,null,[""],e=Xs(e),0,[0],e))}function At(e,t,r,n,o,s,a,u,c){for(var d=0,l=0,h=a,g=0,m=0,y=0,b=1,$=1,x=1,k=0,S="",j=o,C=s,T=n,E=S;$;)switch(y=k,k=ye()){case 40:if(y!=108&&re(E,h-1)==58){Tt(E+=A(rr(k),"&","&\f"),"&\f",ao(d?u[d-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:E+=rr(k);break;case 9:case 10:case 13:case 32:E+=Js(y);break;case 92:E+=Zs(It()-1,7);continue;case 47:switch(We()){case 42:case 47:ct(na(ea(ye(),It()),t,r,c),c);break;default:E+="/"}break;case 123*b:u[d++]=ve(E)*x;case 125*b:case 59:case 0:switch(k){case 0:case 125:$=0;case 59+l:x==-1&&(E=A(E,/\f/g,"")),m>0&&ve(E)-h&&ct(m>32?en(E+";",n,r,h-1,c):en(A(E," ","")+";",n,r,h-2,c),c);break;case 59:E+=";";default:if(ct(T=Zr(E,t,r,d,l,o,u,S,j=[],C=[],h,s),s),k===123)if(l===0)At(E,t,T,T,j,s,h,u,C);else switch(g===99&&re(E,3)===110?100:g){case 100:case 108:case 109:case 115:At(e,T,T,n&&ct(Zr(e,T,T,0,0,o,u,S,o,j=[],h,C),C),o,C,h,u,n?j:C);break;default:At(E,T,T,T,[""],C,0,u,C)}}d=l=m=0,b=x=1,S=E="",h=a;break;case 58:h=1+ve(E),m=y;default:if(b<1){if(k==123)--b;else if(k==125&&b++==0&&Ks()==125)continue}switch(E+=Ar(k),k*b){case 38:x=l>0?1:(E+="\f",-1);break;case 44:u[d++]=(ve(E)-1)*x,x=1;break;case 64:We()===45&&(E+=rr(ye())),g=We(),l=h=ve(S=E+=ta(It())),k++;break;case 45:y===45&&ve(E)==2&&(b=0)}}return s}function Zr(e,t,r,n,o,s,a,u,c,d,l,h){for(var g=o-1,m=o===0?s:[""],y=lo(m),b=0,$=0,x=0;b<n;++b)for(var k=0,S=Je(e,g+1,g=ao($=a[b])),j=e;k<y;++k)(j=co($>0?m[k]+" "+S:A(S,/&\f/g,m[k])))&&(c[x++]=j);return Kt(e,t,r,o===0?Vt:u,c,d,l,h)}function na(e,t,r,n){return Kt(e,t,r,io,Ar(qs()),Je(e,2,-2),0,n)}function en(e,t,r,n,o){return Kt(e,t,r,Ir,Je(e,0,n),Je(e,n+1,-1),n,o)}function ho(e,t,r){switch(Ys(e,t)){case 5103:return W+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return W+e+e;case 4789:return pt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return W+e+pt+e+U+e+e;case 5936:switch(re(e,t+11)){case 114:return W+e+U+A(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return W+e+U+A(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return W+e+U+A(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return W+e+U+e+e;case 6165:return W+e+U+"flex-"+e+e;case 5187:return W+e+A(e,/(\w+).+(:[^]+)/,W+"box-$1$2"+U+"flex-$1$2")+e;case 5443:return W+e+U+"flex-item-"+A(e,/flex-|-self/g,"")+(Pe(e,/flex-|baseline/)?"":U+"grid-row-"+A(e,/flex-|-self/g,""))+e;case 4675:return W+e+U+"flex-line-pack"+A(e,/align-content|flex-|-self/g,"")+e;case 5548:return W+e+U+A(e,"shrink","negative")+e;case 5292:return W+e+U+A(e,"basis","preferred-size")+e;case 6060:return W+"box-"+A(e,"-grow","")+W+e+U+A(e,"grow","positive")+e;case 4554:return W+A(e,/([^-])(transform)/g,"$1"+W+"$2")+e;case 6187:return A(A(A(e,/(zoom-|grab)/,W+"$1"),/(image-set)/,W+"$1"),e,"")+e;case 5495:case 3959:return A(e,/(image-set\([^]*)/,W+"$1$`$1");case 4968:return A(A(e,/(.+:)(flex-)?(.*)/,W+"box-pack:$3"+U+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+W+e+e;case 4200:if(!Pe(e,/flex-|baseline/))return U+"grid-column-align"+Je(e,t)+e;break;case 2592:case 3360:return U+A(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,Pe(n.props,/grid-\w+-end/)})?~Tt(e+(r=r[t].value),"span",0)?e:U+A(e,"-start","")+e+U+"grid-row-span:"+(~Tt(r,"span",0)?Pe(r,/\d+/):+Pe(r,/\d+/)-+Pe(e,/\d+/))+";":U+A(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return Pe(n.props,/grid-\w+-start/)})?e:U+A(A(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return A(e,/(.+)-inline(.+)/,W+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ve(e)-1-t>6)switch(re(e,t+1)){case 109:if(re(e,t+4)!==45)break;case 102:return A(e,/(.+:)(.+)-([^]+)/,"$1"+W+"$2-$3$1"+pt+(re(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Tt(e,"stretch",0)?ho(A(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return A(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,u,c,d){return U+o+":"+s+d+(a?U+o+"-span:"+(u?c:+c-+s)+d:"")+e});case 4949:if(re(e,t+6)===121)return A(e,":",":"+W)+e;break;case 6444:switch(re(e,re(e,14)===45?18:11)){case 120:return A(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+W+(re(e,14)===45?"inline-":"")+"box$3$1"+W+"$2$3$1"+U+"$2box$3")+e;case 100:return A(e,":",":"+U)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return A(e,"scroll-","scroll-snap-")+e}return e}function Ft(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function oa(e,t,r,n){switch(e.type){case Us:if(e.children.length)break;case Gs:case Ir:return e.return=e.return||e.value;case io:return"";case so:return e.return=e.value+"{"+Ft(e.children,n)+"}";case Vt:if(!ve(e.value=e.props.join(",")))return""}return ve(r=Ft(e.children,n))?e.return=e.value+"{"+r+"}":""}function ia(e){var t=lo(e);return function(r,n,o,s){for(var a="",u=0;u<t;u++)a+=e[u](r,n,o,s)||"";return a}}function sa(e){return function(t){t.root||(t=t.return)&&e(t)}}function aa(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Ir:e.return=ho(e.value,e.length,r);return;case so:return Ft([Ie(e,{value:A(e.value,"@","@"+W)})],n);case Vt:if(e.length)return Vs(r=e.props,function(o){switch(Pe(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ye(Ie(e,{props:[A(o,/:(read-\w+)/,":"+pt+"$1")]})),Ye(Ie(e,{props:[o]})),gr(e,{props:Jr(r,n)});break;case"::placeholder":Ye(Ie(e,{props:[A(o,/:(plac\w+)/,":"+W+"input-$1")]})),Ye(Ie(e,{props:[A(o,/:(plac\w+)/,":"+pt+"$1")]})),Ye(Ie(e,{props:[A(o,/:(plac\w+)/,U+"input-$1")]})),Ye(Ie(e,{props:[o]})),gr(e,{props:Jr(r,n)});break}return""})}}var ca={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},et=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",po="active",mo="data-styled-version",Qt="6.1.19",Dr=`/*!sc*/
`,Bt=typeof window<"u"&&typeof document<"u",la=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),da={},Jt=Object.freeze([]),tt=Object.freeze({});function fo(e,t,r){return r===void 0&&(r=tt),e.theme!==r.theme&&e.theme||t||r.theme}var go=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ua=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ha=/(^-|-$)/g;function tn(e){return e.replace(ua,"-").replace(ha,"")}var pa=/(a)(d)/gi,Ct=52,rn=function(e){return String.fromCharCode(e+(e>25?39:97))};function br(e){var t,r="";for(t=Math.abs(e);t>Ct;t=t/Ct|0)r=rn(t%Ct)+r;return(rn(t%Ct)+r).replace(pa,"$1-$2")}var nr,xo=5381,Ke=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},yo=function(e){return Ke(xo,e)};function bo(e){return br(yo(e)>>>0)}function ma(e){return e.displayName||e.name||"Component"}function or(e){return typeof e=="string"&&!0}var $o=typeof Symbol=="function"&&Symbol.for,vo=$o?Symbol.for("react.memo"):60115,fa=$o?Symbol.for("react.forward_ref"):60112,ga={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},xa={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},wo={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ya=((nr={})[fa]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},nr[vo]=wo,nr);function nn(e){return("type"in(t=e)&&t.type.$$typeof)===vo?wo:"$$typeof"in e?ya[e.$$typeof]:ga;var t}var ba=Object.defineProperty,$a=Object.getOwnPropertyNames,on=Object.getOwnPropertySymbols,va=Object.getOwnPropertyDescriptor,wa=Object.getPrototypeOf,sn=Object.prototype;function ko(e,t,r){if(typeof t!="string"){if(sn){var n=wa(t);n&&n!==sn&&ko(e,n,r)}var o=$a(t);on&&(o=o.concat(on(t)));for(var s=nn(e),a=nn(t),u=0;u<o.length;++u){var c=o[u];if(!(c in xa||r&&r[c]||a&&c in a||s&&c in s)){var d=va(t,c);try{ba(e,c,d)}catch{}}}}return e}function He(e){return typeof e=="function"}function Nr(e){return typeof e=="object"&&"styledComponentId"in e}function Be(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function $r(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function gt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function vr(e,t,r){if(r===void 0&&(r=!1),!r&&!gt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=vr(e[n],t[n]);else if(gt(t))for(var n in t)e[n]=vr(e[n],t[n]);return e}function Or(e,t){Object.defineProperty(e,"toString",{value:t})}function _e(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ka=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw _e(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var u=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(u,r[a])&&(this.groupSizes[t]++,u++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Dr);return r},e}(),Dt=new Map,Wt=new Map,Nt=1,jt=function(e){if(Dt.has(e))return Dt.get(e);for(;Wt.has(Nt);)Nt++;var t=Nt++;return Dt.set(e,t),Wt.set(t,e),t},Sa=function(e,t){Nt=t+1,Dt.set(e,t),Wt.set(t,e)},Ca="style[".concat(et,"][").concat(mo,'="').concat(Qt,'"]'),ja=new RegExp("^".concat(et,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Pa=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},Ra=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Dr),o=[],s=0,a=n.length;s<a;s++){var u=n[s].trim();if(u){var c=u.match(ja);if(c){var d=0|parseInt(c[1],10),l=c[2];d!==0&&(Sa(l,d),Pa(e,l,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(u)}}},an=function(e){for(var t=document.querySelectorAll(Ca),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(et)!==po&&(Ra(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Ma(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var So=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(u){var c=Array.from(u.querySelectorAll("style[".concat(et,"]")));return c[c.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(et,po),n.setAttribute(mo,Qt);var a=Ma();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},Ea=function(){function e(t){this.element=So(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var a=n[o];if(a.ownerNode===r)return a}throw _e(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),za=function(){function e(t){this.element=So(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),La=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),cn=Bt,Ta={isServer:!Bt,useCSSOMInjection:!la},Ht=function(){function e(t,r,n){t===void 0&&(t=tt),r===void 0&&(r={});var o=this;this.options=ne(ne({},Ta),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Bt&&cn&&(cn=!1,an(this)),Or(this,function(){return function(s){for(var a=s.getTag(),u=a.length,c="",d=function(h){var g=function(x){return Wt.get(x)}(h);if(g===void 0)return"continue";var m=s.names.get(g),y=a.getGroup(h);if(m===void 0||!m.size||y.length===0)return"continue";var b="".concat(et,".g").concat(h,'[id="').concat(g,'"]'),$="";m!==void 0&&m.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(y).concat(b,'{content:"').concat($,'"}').concat(Dr)},l=0;l<u;l++)d(l);return c}(o)})}return e.registerId=function(t){return jt(t)},e.prototype.rehydrate=function(){!this.server&&Bt&&an(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(ne(ne({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new La(o):n?new Ea(o):new za(o)}(this.options),new ka(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(jt(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(jt(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(jt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ia=/&/g,Aa=/^\s*\/\/.*$/gm;function Co(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Co(r.children,t)),r})}function Da(e){var t,r,n,o=tt,s=o.options,a=s===void 0?tt:s,u=o.plugins,c=u===void 0?Jt:u,d=function(g,m,y){return y.startsWith(r)&&y.endsWith(r)&&y.replaceAll(r,"").length>0?".".concat(t):g},l=c.slice();l.push(function(g){g.type===Vt&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Ia,r).replace(n,d))}),a.prefix&&l.push(aa),l.push(oa);var h=function(g,m,y,b){m===void 0&&(m=""),y===void 0&&(y=""),b===void 0&&(b="&"),t=b,r=m,n=new RegExp("\\".concat(r,"\\b"),"g");var $=g.replace(Aa,""),x=ra(y||m?"".concat(y," ").concat(m," { ").concat($," }"):$);a.namespace&&(x=Co(x,a.namespace));var k=[];return Ft(x,ia(l.concat(sa(function(S){return k.push(S)})))),k};return h.hash=c.length?c.reduce(function(g,m){return m.name||_e(15),Ke(g,m.name)},xo).toString():"",h}var Na=new Ht,wr=Da(),jo=oe.createContext({shouldForwardProp:void 0,styleSheet:Na,stylis:wr});jo.Consumer;oe.createContext(void 0);function kr(){return f.useContext(jo)}var Oa=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=wr);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Or(this,function(){throw _e(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=wr),this.name+t.hash},e}(),Fa=function(e){return e>="A"&&e<="Z"};function ln(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Fa(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Po=function(e){return e==null||e===!1||e===""},Ro=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!Po(s)&&(Array.isArray(s)&&s.isCss||He(s)?n.push("".concat(ln(o),":"),s,";"):gt(s)?n.push.apply(n,ft(ft(["".concat(o," {")],Ro(s),!1),["}"],!1)):n.push("".concat(ln(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in ca||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ae(e,t,r,n){if(Po(e))return[];if(Nr(e))return[".".concat(e.styledComponentId)];if(He(e)){if(!He(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return Ae(o,t,r,n)}var s;return e instanceof Oa?r?(e.inject(r,n),[e.getName(n)]):[e]:gt(e)?Ro(e):Array.isArray(e)?Array.prototype.concat.apply(Jt,e.map(function(a){return Ae(a,t,r,n)})):[e.toString()]}function Mo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(He(r)&&!Nr(r))return!1}return!0}var Ba=yo(Qt),Wa=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Mo(t),this.componentId=r,this.baseHash=Ke(Ba,r),this.baseStyle=n,Ht.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Be(o,this.staticRulesId);else{var s=$r(Ae(this.rules,t,r,n)),a=br(Ke(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var u=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,u)}o=Be(o,a),this.staticRulesId=a}else{for(var c=Ke(this.baseHash,n.hash),d="",l=0;l<this.rules.length;l++){var h=this.rules[l];if(typeof h=="string")d+=h;else if(h){var g=$r(Ae(h,t,r,n));c=Ke(c,g+l),d+=g}}if(d){var m=br(c>>>0);r.hasNameForId(this.componentId,m)||r.insertRules(this.componentId,m,n(d,".".concat(m),void 0,this.componentId)),o=Be(o,m)}}return o},e}(),xt=oe.createContext(void 0);xt.Consumer;function Ha(e){var t=oe.useContext(xt),r=f.useMemo(function(){return function(n,o){if(!n)throw _e(14);if(He(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw _e(8);return o?ne(ne({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?oe.createElement(xt.Provider,{value:r},e.children):null}var ir={};function _a(e,t,r){var n=Nr(e),o=e,s=!or(e),a=t.attrs,u=a===void 0?Jt:a,c=t.componentId,d=c===void 0?function(j,C){var T=typeof j!="string"?"sc":tn(j);ir[T]=(ir[T]||0)+1;var E="".concat(T,"-").concat(bo(Qt+T+ir[T]));return C?"".concat(C,"-").concat(E):E}(t.displayName,t.parentComponentId):c,l=t.displayName,h=l===void 0?function(j){return or(j)?"styled.".concat(j):"Styled(".concat(ma(j),")")}(e):l,g=t.displayName&&t.componentId?"".concat(tn(t.displayName),"-").concat(t.componentId):t.componentId||d,m=n&&o.attrs?o.attrs.concat(u).filter(Boolean):u,y=t.shouldForwardProp;if(n&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;y=function(j,C){return b(j,C)&&$(j,C)}}else y=b}var x=new Wa(r,g,n?o.componentStyle:void 0);function k(j,C){return function(T,E,H){var _=T.attrs,Q=T.componentStyle,v=T.defaultProps,F=T.foldedComponentIds,B=T.styledComponentId,I=T.target,G=oe.useContext(xt),Z=kr(),le=T.shouldForwardProp||Z.shouldForwardProp,Ce=fo(E,G,v)||tt,X=function(je,w,L){for(var M,P=ne(ne({},w),{className:void 0,theme:L}),R=0;R<je.length;R+=1){var z=He(M=je[R])?M(P):M;for(var D in z)P[D]=D==="className"?Be(P[D],z[D]):D==="style"?ne(ne({},P[D]),z[D]):z[D]}return w.className&&(P.className=Be(P.className,w.className)),P}(_,E,Ce),ie=X.as||I,se={};for(var ee in X)X[ee]===void 0||ee[0]==="$"||ee==="as"||ee==="theme"&&X.theme===Ce||(ee==="forwardedAs"?se.as=X.forwardedAs:le&&!le(ee,ie)||(se[ee]=X[ee]));var ge=function(je,w){var L=kr(),M=je.generateAndInjectStyles(w,L.styleSheet,L.stylis);return M}(Q,X),de=Be(F,B);return ge&&(de+=" "+ge),X.className&&(de+=" "+X.className),se[or(ie)&&!go.has(ie)?"class":"className"]=de,H&&(se.ref=H),f.createElement(ie,se)}(S,j,C)}k.displayName=h;var S=oe.forwardRef(k);return S.attrs=m,S.componentStyle=x,S.displayName=h,S.shouldForwardProp=y,S.foldedComponentIds=n?Be(o.foldedComponentIds,o.styledComponentId):"",S.styledComponentId=g,S.target=n?o.target:e,Object.defineProperty(S,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(j){this._foldedDefaultProps=n?function(C){for(var T=[],E=1;E<arguments.length;E++)T[E-1]=arguments[E];for(var H=0,_=T;H<_.length;H++)vr(C,_[H],!0);return C}({},o.defaultProps,j):j}}),Or(S,function(){return".".concat(S.styledComponentId)}),s&&ko(S,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),S}function dn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var un=function(e){return Object.assign(e,{isCss:!0})};function we(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(He(e)||gt(e))return un(Ae(dn(Jt,ft([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Ae(n):un(Ae(dn(n,t)))}function Sr(e,t,r){if(r===void 0&&(r=tt),!t)throw _e(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,we.apply(void 0,ft([o],s,!1)))};return n.attrs=function(o){return Sr(e,t,ne(ne({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Sr(e,t,ne(ne({},r),o))},n}var Eo=function(e){return Sr(_a,e)},p=Eo;go.forEach(function(e){p[e]=Eo(e)});var Ga=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Mo(t),Ht.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o($r(Ae(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Ht.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Ua(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=we.apply(void 0,ft([e],t,!1)),o="sc-global-".concat(bo(JSON.stringify(n))),s=new Ga(n,o),a=function(c){var d=kr(),l=oe.useContext(xt),h=oe.useRef(d.styleSheet.allocateGSInstance(o)).current;return d.styleSheet.server&&u(h,c,d.styleSheet,l,d.stylis),oe.useLayoutEffect(function(){if(!d.styleSheet.server)return u(h,c,d.styleSheet,l,d.stylis),function(){return s.removeStyles(h,d.styleSheet)}},[h,c,d.styleSheet,l,d.stylis]),null};function u(c,d,l,h,g){if(s.isStatic)s.renderStyles(c,da,l,g);else{var m=ne(ne({},d),{theme:fo(d,h,a.defaultProps)});s.renderStyles(c,m,l,g)}}return oe.memo(a)}const zo=f.createContext(void 0),Lo=()=>{const e=f.useContext(zo);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ya=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Va=K(({children:e})=>{const t=Ne(),r=t.preferences.theme||"system",o=r==="system"?Ya():r,s=Hs[o]||_s,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},u={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return f.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),d=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",d),()=>c.removeEventListener("change",d)}},[r,t]),f.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([d,l])=>{typeof l=="string"?c.style.setProperty(`--color-${d}`,l):typeof l=="object"&&l!==null&&Object.entries(l).forEach(([h,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${d}-${h}`,g)})}),Object.entries(a.spacing).forEach(([d,l])=>{c.style.setProperty(`--spacing-${d}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),i.jsx(zo.Provider,{value:u,children:i.jsx(Ha,{theme:a,children:e})})});function qa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ka(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var sr=typeof window<"u",Xa=function(e){f.useEffect(e,[])},Qa=function(e){var t=f.useRef(e);t.current=e,Xa(function(){return function(){return t.current()}})},Ja=function(e){var t=f.useRef(0),r=f.useState(e),n=r[0],o=r[1],s=f.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Qa(function(){cancelAnimationFrame(t.current)}),[n,s]},To=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,s=o===void 0?1/0:o,a=t.onChange,u=Ja({width:sr?window.innerWidth:n,height:sr?window.innerHeight:s}),c=u[0],d=u[1];return f.useEffect(function(){if(sr){var l=function(){var h=window.innerWidth,g=window.innerHeight;d({width:h,height:g}),a&&a(h,g)};return qa(window,"resize",l),function(){Ka(window,"resize",l)}}},[]),c};const Fr=()=>{const{width:e=0,height:t=0}=To();return{width:e,height:t}},Za=()=>{const{width:e=0,height:t=0}=To();return e>t?"landscape":"portrait"},ec=()=>{const{width:e}=Fr(),{theme:t}=Lo(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Io=()=>{const[e,t]=f.useState(!1);return f.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},tc=()=>{const[e,t]=f.useState(!1),r=Io(),{width:n}=Fr();return f.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),u=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||u&&c})())},[r,n]),e},Oe=()=>{const e=Fr(),t=Za(),r=ec(),n=Io(),o=tc();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},Ao=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Do=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},rc=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},nc=f.createContext(void 0),oc=({children:e})=>{const t=Ne(),r=Oe(),[n,o]=f.useState(!0),[s,a]=f.useState(["chat","moves"]),[u,c]=f.useState(!1),d=t.preferences.layout,l=f.useMemo(()=>d==="auto"?r.orientation:d,[d,r.orientation]),h=f.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=b=>{t.updatePreference("layout",b)},m=b=>{a($=>$.includes(b)?$.filter(x=>x!==b):[...$,b])};f.useEffect(()=>{c(!0),o($=>{const x=!h;return $!==x?x:$}),a($=>{if(h&&l==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(l==="landscape"&&!h){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[l,h]);const y={...r,layoutPreference:d,setLayoutPreference:g,activeLayout:l,isCompactMode:h,showSidebar:n,setSidebarVisible:o,activePanels:s,togglePanel:m,isTransitioning:u};return i.jsx(nc.Provider,{value:y,children:e})};p.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: ${({isTransitioning:e,theme:t})=>e?`all ${t.transitions.normal}`:"none"};
`;p.main`
    flex: 1;
    display: flex;
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?we`
                flex-direction: column;
            `:we`
                flex-direction: row;
            `}
`;p.div`
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
`;p.aside`
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
`;p.div`
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
`;p.div`
    display: flex;
    flex-direction: ${({direction:e})=>e||"row"};
    justify-content: ${({justify:e})=>e||"start"};
    align-items: ${({align:e})=>e||"stretch"};
    gap: ${({gap:e,theme:t})=>e||t.spacing.md};
    flex-wrap: ${({wrap:e})=>e?"wrap":"nowrap"};

    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        flex-direction: column;
    }
`;p.div`
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
`;p.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;p.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    background: ${({theme:e})=>e.colors.background};
`;p.header`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
`;p.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme:e})=>e.spacing.lg};
    min-height: 0; // Important for flexbox to allow shrinking
`;p.aside`
    width: ${({width:e,$isCollapsed:t})=>t?"0px":`${e}px`};
    height: 100vh;
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-left: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`width ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;p.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.sm};
    flex-shrink: 0;
`;p.button`
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
`;p.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.md};
`;p.div`
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
`;p.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;p.header`
    height: 50px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
`;p.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};
    padding: ${({theme:e})=>e.spacing.sm};
    min-height: 0; // Important for flexbox
    max-height: 65vh; // Leave room for bottom panels
`;p.div`
    height: ${({$isExpanded:e,$panelHeight:t})=>e?`${t}px`:"60px"};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-top: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`height ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;p.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.xs};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    background: ${({theme:e})=>e.colors.backgroundTertiary};
    overflow-x: auto;
    flex-shrink: 0;
`;p.button`
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
`;p.button`
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
`;p.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.sm};
`;p.div`
    width: 100%;
    height: 100%;
    touch-action: pan-y; // Allow vertical scrolling but capture horizontal swipes
`;p.button`
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
`;const ic=p.input`
  display: none;
`,sc=p.button`
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
`,ac=({settingId:e,onUpload:t})=>{const r=f.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const d=new FileReader;d.onload=l=>{const h=l.target?.result;t(e,h,a.name)},d.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return i.jsxs(i.Fragment,{children:[i.jsx(ic,{ref:r,type:"file",accept:"audio/*",onChange:n}),i.jsx(sc,{type:"button",onClick:o,children:"Upload"})]})},cc=p.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,lc=p.div`
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
`,dc=p.div`
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
`,uc=p.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,hc=p.button`
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
`,pc=p.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,mc=p.input`
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
`,fc=p.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,gc=p.div`
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
`,xc=p.button`
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
`,yc=p.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,bc=p.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,$c=p.div`
  margin-bottom: ${e=>e.theme.spacing[6]};
`,hn=p.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[3]} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`,vc=p.div`
  flex: 1;
  margin-right: ${e=>e.theme.spacing[4]};
`,pn=p.label`
  display: block;
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[1]};
`,mn=p.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,wc=p.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,kc=p.input`
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
`,Sc=p.select`
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
`,Cc=p.input`
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
`,jc=p.input`
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
`,Pc=p.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Rc=p.textarea`
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
`,Mc=p.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,Ec=p.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,zc=p.button`
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
`,fn=p.button`
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
`,Lc=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Tc=p.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Ic=p.p`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,ar=p.button`
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
`,No=K(({isOpen:e,onClose:t})=>{const r=Ne(),{settingsRegistry:n}=r,o=Oe(),s=o.isMobileDevice||o.dimensions.width<768,[a,u]=f.useState("appearance"),[c,d]=f.useState(""),[l,h]=f.useState({}),[g,m]=f.useState({x:0,y:0}),[y,b]=f.useState(!1),[$,x]=f.useState({x:0,y:0}),k=f.useRef(null);if(f.useEffect(()=>{if(e&&k.current&&!s){const v=k.current.getBoundingClientRect();m({x:(window.innerWidth-v.width)/2,y:(window.innerHeight-v.height)/2})}},[e,s]),f.useEffect(()=>{if(!y)return;const v=B=>{m({x:B.clientX-$.x,y:B.clientY-$.y})},F=()=>{b(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",F),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",F)}},[y,$]),!e)return null;const S=n.getAllCategories(),j=c?n.search(c):n.getByCategory(a),C=(v,F)=>{const B=n.get(v);if(B){if(B.validate){const I=B.validate(F);if(typeof I=="string"){h(G=>({...G,[v]:I}));return}else if(I===!1){h(G=>({...G,[v]:"Invalid value"}));return}}h(I=>{const G={...I};return delete G[v],G}),B.value=F,B.onChange?.(F),v in r.preferences&&r.updatePreference(v,F)}},T=v=>{const F=n.get(v);F&&C(v,F.defaultValue)},E=(v,F,B)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),G=`custom_${v}_${Date.now()}`;I[G]={dataUrl:F,fileName:B,settingId:v,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),C(v,G);const Z=n.get(v);if(Z&&Z.options){const le={label:`Custom: ${B}`,value:G},Ce=Z.options.filter(X=>!X.value.startsWith("custom_"));Z.options=[...Ce,le]}},H=v=>{if(!(!v||v==="none"))try{let F;if(v.startsWith("custom_")){const G=JSON.parse(localStorage.getItem("customSounds")||"{}")[v];if(G&&G.dataUrl)F=G.dataUrl;else{console.error("Custom sound not found:",v);return}}else F=`/sounds/${v}`;const B=new Audio(F);B.volume=.5,B.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(F){console.error("Error playing sound:",F)}},_=v=>{s||(b(!0),x({x:v.clientX-g.x,y:v.clientY-g.y}))},Q=v=>{switch(v.type){case"boolean":return i.jsx(kc,{type:"checkbox",checked:v.value,onChange:I=>C(v.id,I.target.checked),$isMobile:s});case"select":if(v.id.endsWith("SoundFile")){const I=v.options?.find(le=>le.value===v.value),G=I?I.label:"None",Z=v.value&&v.value!=="none";return i.jsxs(Pc,{children:[i.jsx(Ec,{children:G}),i.jsx(zc,{type:"button",onClick:()=>H(v.value),disabled:!Z,title:Z?"Play sound":"No sound selected",children:"▶️ Play"}),i.jsx(ac,{settingId:v.id,onUpload:E})]})}else return i.jsx(Sc,{value:v.value,onChange:I=>C(v.id,I.target.value),children:v.options?.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return i.jsx(Cc,{type:"number",value:v.value,min:v.min,max:v.max,step:v.step,onChange:I=>C(v.id,Number(I.target.value))});case"color":return i.jsx(jc,{type:"color",value:v.value,onChange:I=>C(v.id,I.target.value),$isMobile:s});case"text":const B=!!l[v.id];return i.jsxs("div",{style:{width:"100%"},children:[i.jsx(Rc,{value:v.value||"",onChange:I=>C(v.id,I.target.value),className:B?"error":"",placeholder:v.placeholder||"",spellCheck:!1}),B&&i.jsx(Mc,{children:l[v.id]})]});default:return null}};return i.jsx(cc,{children:i.jsxs(lc,{ref:k,$x:g.x,$y:g.y,$isMobile:s,children:[i.jsxs(dc,{onMouseDown:_,children:[i.jsx(uc,{children:"⚙️ Settings"}),i.jsx(hc,{onClick:t,onMouseDown:v=>v.stopPropagation(),children:"✕"})]}),i.jsx(pc,{children:i.jsx(mc,{type:"text",placeholder:"Search settings...",value:c,onChange:v=>d(v.target.value)})}),i.jsxs(fc,{$isMobile:s,children:[i.jsx(gc,{$isMobile:s,children:S.map(v=>i.jsxs(xc,{$active:a===v.id&&!c,$isMobile:s,onClick:()=>{u(v.id),d("")},children:[i.jsx(yc,{children:v.icon}),!s&&v.label]},v.id))}),i.jsxs(bc,{children:[c&&i.jsxs(Ic,{children:["Found ",j.length,' settings matching "',c,'"']}),i.jsx($c,{children:j.map(v=>v.type==="text"?i.jsxs(hn,{style:{flexDirection:"column",alignItems:"stretch"},children:[i.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{children:[i.jsx(pn,{children:v.label}),v.description&&i.jsx(mn,{children:v.description})]}),v.value!==v.defaultValue&&i.jsx(fn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),Q(v)]},v.id):i.jsxs(hn,{children:[i.jsxs(vc,{children:[i.jsx(pn,{children:v.label}),v.description&&i.jsx(mn,{children:v.description})]}),i.jsxs(wc,{children:[Q(v),v.value!==v.defaultValue&&i.jsx(fn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",children:"↻"})]})]},v.id))})]})]}),i.jsxs(Lc,{children:[i.jsx(ar,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),i.jsxs(Tc,{children:[i.jsx(ar,{onClick:t,children:"Cancel"}),i.jsx(ar,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});No.displayName="SettingsDialog";const Ac=p.header`
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
`,Dc=p.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Nc=p.button`
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
`,Oc=p.div`
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
`,Ve=p.button`
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
`,qe=p.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
`,cr=p.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,lr=p.div`
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
`,Te=p.button`
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
`,gn=p.hr`
  margin: ${e=>e.theme.spacing[1]} 0;
  border: none;
  border-top: 1px solid ${e=>e.theme.colors.border};
`;p.h1`
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  color: ${e=>e.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;const Fc=p.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Bc=p.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Wc=p.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Hc=p.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,dr=p.button`
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
`,Oo=K(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:s}=Lo(),a=Ao(),u=Do(),[c,d]=f.useState(!1),[l,h]=f.useState(!1),[g,m]=f.useState(null),y=C=>{t.updatePreference("viewMode",C),h(!1),m(null)},b=C=>{t.updatePreference("chessOrientation",C),h(!1),m(null)},$=C=>{s(C),h(!1),m(null)},x=()=>{h(!l),m(null)},k=()=>{d(!0),h(!1),m(null)},S=C=>{m(C)},j=r==="chat-only";return oe.useEffect(()=>{const C=T=>{const E=T.target;l&&!E.closest(".hamburger-menu-container")&&h(!1)};if(l)return document.addEventListener("click",C),()=>document.removeEventListener("click",C)},[l]),oe.useEffect(()=>{const C=T=>{(T.ctrlKey||T.metaKey)&&T.key===","&&(T.preventDefault(),d(!0))};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),i.jsxs(Ac,{children:[i.jsx(Dc,{children:i.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[i.jsx(Nc,{onClick:x,"aria-label":"Menu",children:"☰"}),i.jsxs(Oc,{$isOpen:l,children:[i.jsxs(Ve,{$hasSubmenu:!0,onMouseEnter:()=>S("theme"),onMouseLeave:()=>m(null),children:[i.jsx(qe,{children:"🎨 Theme"}),i.jsx(cr,{children:"▶"}),i.jsxs(lr,{$isOpen:g==="theme",children:[i.jsx(Te,{$isActive:o==="light",onClick:()=>$("light"),children:"☀ Light"}),i.jsx(Te,{$isActive:o==="dark",onClick:()=>$("dark"),children:"☾ Dark"}),i.jsx(Te,{$isActive:o==="system",onClick:()=>$("system"),children:"◐ System"})]})]}),i.jsxs(Ve,{$hasSubmenu:!0,onMouseEnter:()=>S("orientation"),onMouseLeave:()=>m(null),children:[i.jsx(qe,{children:"📐 Orientation"}),i.jsx(cr,{children:"▶"}),i.jsxs(lr,{$isOpen:g==="orientation",children:[u.includes("landscape")&&i.jsx(Te,{$isActive:n==="landscape",onClick:()=>!j&&b("landscape"),disabled:j,style:{opacity:j?.5:1},children:"▭ Landscape"}),u.includes("portrait")&&i.jsx(Te,{$isActive:n==="portrait",onClick:()=>!j&&b("portrait"),disabled:j,style:{opacity:j?.5:1},children:"▯ Portrait"})]})]}),i.jsxs(Ve,{$hasSubmenu:!0,onMouseEnter:()=>S("mode"),onMouseLeave:()=>m(null),children:[i.jsx(qe,{children:"🎮 View Mode"}),i.jsx(cr,{children:"▶"}),i.jsxs(lr,{$isOpen:g==="mode",children:[a.includes("chess-only")&&i.jsx(Te,{$isActive:r==="chess-only",onClick:()=>y("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&i.jsx(Te,{$isActive:r==="chess-and-chat",onClick:()=>y("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&i.jsx(Te,{$isActive:r==="chat-only",onClick:()=>y("chat-only"),children:"▤ Chat Only"})]})]}),i.jsx(gn,{}),i.jsx(Ve,{onClick:k,children:i.jsx(qe,{children:"⚙️ Settings"})}),i.jsx(gn,{}),i.jsx(Ve,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),h(!1)},children:i.jsx(qe,{children:"📖 Documentation"})}),i.jsx(Ve,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),h(!1)},children:i.jsx(qe,{children:"🐛 Report Issue"})})]})]})}),i.jsx(Fc,{children:i.jsxs(Bc,{children:[i.jsx(Wc,{children:"Mode:"}),i.jsxs(Hc,{children:[a.includes("chess-only")&&i.jsx(dr,{$isActive:r==="chess-only",onClick:()=>y("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&i.jsx(dr,{$isActive:r==="chess-and-chat",onClick:()=>y("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&i.jsx(dr,{$isActive:r==="chat-only",onClick:()=>y("chat-only"),title:"Chat Only",children:"▤"})]})]})}),i.jsx(No,{isOpen:c,onClose:()=>d(!1)})]})});Oo.displayName="AppHeader";const _c=p.img`
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
`,Gc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},De=K(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=Ne(),s=Gc[e];if(!s)return null;const u=`/pieces/${o.preferences.pieceSet}/${s}.svg`;return i.jsx(_c,{className:"chess-piece",src:u,alt:s,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces"})});De.displayName="ChessPiece";const Uc=p.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Yc=p.div`
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
`,Vc=p.button`
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
`,Fo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const s=["Q","R","B","N"],a=u=>t==="white"?u:u.toLowerCase();return i.jsx(Uc,{$isOpen:e,onClick:n,children:i.jsx(Yc,{$x:o.x,$y:o.y,onClick:u=>u.stopPropagation(),children:s.map(u=>i.jsx(Vc,{onClick:()=>r(u.toLowerCase()),children:i.jsx(De,{piece:a(u),size:50})},u))})})};Fo.displayName="PromotionDialog";const qc=p.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Kc=p.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,Xc=p.div`
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
`,xn=p.div`
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
`,Qc=p.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,Jc=p.div.attrs(e=>({style:{transform:`translate(
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
`,Xe=["a","b","c","d","e","f","g","h"],Qe=["8","7","6","5","4","3","2","1"];function Zc(e,t){return(e+t)%2===0}function el(e,t,r){const n=r?Xe[7-e]:Xe[e],o=r?Qe[7-t]:Qe[t];return`${n}${o}`}function tl(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,s)=>{let a=0;for(const u of o)if(u>="1"&&u<="8")a+=parseInt(u);else{const c=`${Xe[a]}${Qe[s]}`;t.set(c,u),a++}}),t}const Cr=K(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:s,highlightedSquares:a=new Set,lastMove:u,interactive:c=!0,onSizeCalculated:d,selectedCapturedPiece:l,onCapturedPieceSelect:h})=>{Oe();const g=Ne(),m=_t(),y=f.useRef(null),[b,$]=f.useState(t||200),[x,k]=f.useState(null),[S,j]=f.useState(new Set),[C,T]=f.useState(null),[E,H]=f.useState([]),_=f.useRef(),[Q,v]=f.useState(null),[F,B]=f.useState(!1),I=f.useMemo(()=>tl(e),[e]),G=f.useRef(new Map),Z=f.useCallback((w,L)=>{const M=Xe.indexOf(w[0]),P=Qe.indexOf(w[1]),R=L/8,z=r?(7-M)*R:M*R,D=r?(7-P)*R:P*R;return{x:z,y:D}},[r]),le=f.useCallback((w,L,M)=>{const P=w.toLowerCase()==="p",R=M[1];return P&&(R==="8"||R==="1")},[]),Ce=f.useCallback(w=>{w.preventDefault(),m.isPlaying&&m.clearPremove()},[m]);f.useEffect(()=>{if(t){$(t);return}const w=()=>{if(!y.current)return;const z=y.current.parentElement;if(!z)return;const{width:D,height:ae}=z.getBoundingClientRect();y.current.getBoundingClientRect();const ue=16,te=D-ue,N=ae-ue,q=Math.floor(Math.min(te,N)),ce=Math.max(100,Math.floor(q/8)*8);ce!==b&&($(ce),d?.(ce))},L=setTimeout(w,50);w();let M;const P=()=>{clearTimeout(M),M=setTimeout(w,100)};window.addEventListener("resize",P);let R=null;return y.current&&y.current.parentElement&&(R=new ResizeObserver(()=>{P()}),R.observe(y.current.parentElement)),()=>{window.removeEventListener("resize",P),clearTimeout(M),clearTimeout(L),R&&R.disconnect()}},[t,b]);const X=b/8,ie=f.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(m.isPlaying){const w=m.currentGame,L=m.playingColor;if(w&&L){const M=L==="white"?w.white.time:w.black.time,P=g.preferences.disableAnimationsThreshold;if(M<P)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,m.isPlaying,m.currentGame,m.playingColor]);f.useEffect(()=>{if(!ie||F||m.isProcessingServerUpdate){G.current=new Map(I);return}const w=G.current,L=[];if(u){const{from:M,to:P}=u,R=w.get(M),z=I.get(P);R&&z===R&&!I.has(M)&&L.push({piece:R,from:M,to:P,startTime:Date.now()})}L.length>0&&H(M=>[...M,...L]),G.current=new Map(I)},[I,u,ie,F,m.isProcessingServerUpdate]),f.useEffect(()=>{if(F){const w=setTimeout(()=>{B(!1)},50);return()=>clearTimeout(w)}},[e,F]),f.useEffect(()=>{if(E.length===0)return;const w=()=>{const L=Date.now(),M=g.preferences.animationDuration;H(P=>{const R=P.filter(z=>L-z.startTime<M);return R.length>0&&(_.current=requestAnimationFrame(w)),R})};return _.current=requestAnimationFrame(w),()=>{_.current&&cancelAnimationFrame(_.current)}},[E.length,g.preferences.animationDuration]),f.useEffect(()=>{if(l)try{const w=m.currentPosition;m.chessBoard.getFen()!==w&&m.chessBoard.loadFen(w);const M=m.chessBoard.getLegalMoves().filter(R=>R.from==="@"&&R.san.toLowerCase().startsWith(l.toLowerCase())),P=new Set(M.map(R=>R.to));j(P),k(null)}catch(w){console.error("Error getting drop moves:",w),j(new Set)}},[l,m]);const se=f.useCallback((w,L)=>{if(!c)return;const M=I.get(w);if(l){S.has(w)?(s?.(l,w),h?.(null),j(new Set)):(h?.(null),j(new Set));return}if(x)if(S.has(w)){const P=I.get(x);if(P&&le(P,x,w)){const R=P===P.toUpperCase()?"white":"black";if(m.isPlaying){const z=g.preferences.autoPromotionPiece;m.isMyTurn?(B(!0),o?.(x,w,z)):m.setPremove(x,w,z)}else{const z=L?.currentTarget.getBoundingClientRect();v({from:x,to:w,color:R,position:z?{x:z.left+z.width/2,y:z.top+z.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else m.isPlaying&&!m.isMyTurn?m.setPremove(x,w):(B(!0),o?.(x,w));k(null),j(new Set)}else if(w===x)k(null),j(new Set);else if(M)if(k(w),g.preferences.showLegalMoves)try{const P=m.currentPosition;m.chessBoard.getFen()!==P&&m.chessBoard.loadFen(P);const R=m.chessBoard.getLegalMoves(w),z=new Set(R.map(D=>D.to));j(z)}catch(P){console.error("Error getting legal moves:",P),j(new Set)}else j(new Set);else k(null),j(new Set);else if(M){k(w);try{const P=m.currentPosition;m.chessBoard.getFen()!==P&&m.chessBoard.loadFen(P);const R=M===M.toUpperCase(),z=m.chessBoard.getActiveColor();if(R&&z==="w"||!R&&z==="b")if(g.preferences.showLegalMoves){const ae=m.chessBoard.getLegalMoves(w),ue=new Set(ae.map(te=>te.to));j(ue)}else j(new Set);else j(new Set),k(null)}catch(P){console.error("Error getting legal moves:",P),j(new Set)}}},[x,S,I,o,s,c,le,m,g.preferences.autoPromotionPiece,l,h]),ee=f.useCallback((w,L,M)=>{if(!c)return;const P=w.clientX,R=w.clientY;let z=!1,D=!1;const ue=w.currentTarget.getBoundingClientRect().width,te=q=>{const ce=Math.abs(q.clientX-P),xe=Math.abs(q.clientY-R);(ce>3||xe>3)&&M&&!D?(z=!0,D=!0,ge(L,M,q,ue)):D&&T(Le=>Le?{...Le,x:q.clientX,y:q.clientY}:null)},N=q=>{document.removeEventListener("mousemove",te),document.removeEventListener("mouseup",N),D?de(q,L,M):z?(T(null),k(null),j(new Set)):se(L,w)};document.addEventListener("mousemove",te),document.addEventListener("mouseup",N)},[c,se]),ge=f.useCallback((w,L,M,P)=>{if(k(w),g.preferences.showLegalMoves)try{const z=m.currentPosition;m.chessBoard.getFen()!==z&&m.chessBoard.loadFen(z);const D=L===L.toUpperCase(),ae=m.chessBoard.getActiveColor();if(D&&ae==="w"||!D&&ae==="b"){const te=m.chessBoard.getLegalMoves(w),N=new Set(te.map(q=>q.to));j(N)}else j(new Set)}catch(z){console.error("Error getting legal moves for drag:",z),j(new Set)}else j(new Set);const R={piece:L,from:w,x:M.clientX,y:M.clientY,size:P};T(R)},[g.preferences.showLegalMoves,m]),de=f.useCallback((w,L,M)=>{try{const z=document.elementsFromPoint(w.clientX,w.clientY).find(D=>D.getAttribute("data-square"))?.getAttribute("data-square");if(z&&z!==L)if(le(M,L,z)){const D=M===M.toUpperCase()?"white":"black";if(m.isPlaying){const ae=g.preferences.autoPromotionPiece;m.isMyTurn?(B(!0),o?.(L,z,ae)):m.setPremove(L,z,ae)}else v({from:L,to:z,color:D,position:{x:w.clientX,y:w.clientY}})}else m.isPlaying&&!m.isMyTurn?m.setPremove(L,z):(B(!0),o?.(L,z))}catch(P){console.error("Error in handleDragEnd:",P)}T(null),k(null),j(new Set)},[o,le,m,g.preferences.autoPromotionPiece]),je=f.useMemo(()=>{const w=[];for(let L=0;L<8;L++)for(let M=0;M<8;M++){const P=Zc(M,L),R=el(M,L,r),z=I.get(R),D=a.has(R),ae=u&&(u.from===R||u.to===R),ue=x===R,te=S.has(R),N=C?.from===R,q=E.some(Le=>Le.to===R),ce=n&&L===7,xe=n&&M===0;w.push(i.jsxs(Xc,{"data-square":R,$isLight:P,$isHighlighted:D,$isLastMoveSquare:!!ae,$isSelected:ue,$isPossibleMove:te,onMouseDown:Le=>ee(Le,R,z),children:[z&&!N&&!q&&i.jsx(De,{piece:z,size:X}),ce&&i.jsx(xn,{$type:"file",$isLight:P,$size:X,"data-settings":"coordinates",className:"coordinate-label",children:r?Xe[7-M]:Xe[M]}),xe&&i.jsx(xn,{$type:"rank",$isLight:P,$size:X,"data-settings":"coordinates",className:"coordinate-label",children:r?Qe[7-L]:Qe[L]})]},R))}return w},[r,n,I,a,u,x,S,C,X,se,ee]);return i.jsxs(i.Fragment,{children:[i.jsxs(qc,{ref:y,$size:b,onContextMenu:Ce,"data-settings":"board",className:"chess-board",children:[i.jsx(Kc,{children:je}),E.map((w,L)=>{const M=Z(w.from,b),P=Z(w.to,b),R=Date.now()-w.startTime,z=g.preferences.animationDuration,D=Math.min(R/z,1),ue=(te=>te<.5?4*te*te*te:1-Math.pow(-2*te+2,3)/2)(D);return i.jsx(Jc,{$fromX:M.x,$fromY:M.y,$toX:P.x,$toY:P.y,$progress:ue,$size:X,children:i.jsx(De,{piece:w.piece,size:X})},`${w.from}-${w.to}-${w.startTime}`)})]}),C&&i.jsx(i.Fragment,{children:i.jsx(Qc,{$x:C.x,$y:C.y,$size:C.size,children:i.jsx(De,{piece:C.piece,size:C.size,isDragging:!0})})}),Q&&i.jsx(Fo,{isOpen:!0,color:Q.color,position:Q.position,onSelect:w=>{B(!0),o?.(Q.from,Q.to,w),v(null)},onCancel:()=>v(null)})]})});Cr.displayName="ChessBoardWithPieces";const rl=p.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,nl=p.span`
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
`,Bo=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a,compact:u=!1})=>{const c=l=>{const h=Math.floor(l/3600),g=Math.floor(l%3600/60),m=Math.floor(l%60),y=Math.floor(l%1*10),b=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${b}${g.toString().padStart(2,"0")}${b}${m.toString().padStart(2,"0")}`:l<o&&s?`${g}${b}${m.toString().padStart(2,"0")}.${y}`:`${g}${b}${m.toString().padStart(2,"0")}`},d=e<=o&&e>0;return i.jsx(rl,{size:t,className:a,children:i.jsx(nl,{$isLowTime:d,$isActive:r,$compact:u,$isFinished:n,children:c(e)})})},ol=p.span`
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
`,il=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a})=>{const u=l=>{const h=Math.floor(l/3600),g=Math.floor(l%3600/60),m=Math.floor(l%60),y=Math.floor(l%1*10),b=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${b}${g.toString().padStart(2,"0")}${b}${m.toString().padStart(2,"0")}`:l<o&&s?`${g}${b}${m.toString().padStart(2,"0")}.${y}`:`${g}${b}${m.toString().padStart(2,"0")}`},c=e<=o&&e>0,d=t==="large"?"48px":t==="medium"?"36px":"24px";return i.jsx(ol,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:d,children:u(e)})},vt=p(il)`
    /* Additional GameClock-specific styles if needed */
`;p(Bo).attrs({size:"small"})`
    font-size: 12px;
`;p(Bo).attrs({size:"medium"})`
    font-size: 16px;
`;const sl=p.div`
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
`,al=p.button`
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
`,cl=p.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Wo=K(({playerName:e,position:t,onClose:r})=>{const n=Nn(),o=Ne(),s=f.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];f.useEffect(()=>{const c=l=>{s.current&&!s.current.contains(l.target)&&r()},d=l=>{l.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",d)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}},[r]),f.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),d=window.innerWidth,l=window.innerHeight;let h=t.x,g=t.y;c.right>d&&(h=d-c.width-10),c.bottom>l&&(g=l-c.height-10),(h!==t.x||g!==t.y)&&(s.current.style.left=`${h}px`,s.current.style.top=`${g}px`)}},[t]);const u=c=>{const d=c.replace("{player}",e);n.sendCommand(d),r()};return i.jsx(sl,{ref:s,$x:t.x,$y:t.y,children:a.map((c,d)=>"divider"in c&&c.divider?i.jsx(cl,{},d):"command"in c?i.jsx(al,{onClick:()=>u(c.command),children:c.label},d):null)})});Wo.displayName="PlayerContextMenu";const ll=p.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,st=({name:e,className:t,style:r,onClick:n})=>{const[o,s]=f.useState(null),a=u=>{u.preventDefault(),u.stopPropagation(),n&&n(),s({x:u.clientX,y:u.clientY})};return i.jsxs(i.Fragment,{children:[i.jsx(ll,{className:t,style:r,onClick:a,children:e}),o&&i.jsx(Wo,{playerName:e,position:o,onClose:()=>s(null)})]})};st.displayName="PlayerName";const dl=p.div`
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
`,ul=p.div`
  display: flex;
  align-items: center;
  width: 100%;
`,hl=p.div`
  display: flex;
  align-items: center;
  flex: 1;
`,pl=p.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ml=p.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  margin-left: 4px;
`;p.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${e=>e.$isWhite?"#ffffff":"#000000"};
  border: 1px solid ${e=>e.$isWhite?"#000000":"#ffffff"};
  box-shadow: ${e=>e.theme.shadows.sm};
`;const lt=K(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:u=!1,compact:c=!1})=>{const d=i.jsxs(i.Fragment,{children:[i.jsx(ul,{children:i.jsxs(hl,{children:[i.jsx(pl,{children:i.jsx(st,{name:e})}),i.jsx(ml,{children:t})]})}),!a&&!u&&i.jsx(vt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return u?d:i.jsx(dl,{$isActive:n,$orientation:s,$compact:c,children:d})});lt.displayName="PlayerCard";const fl=p.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,ur=p.div`
  padding: ${e=>e.theme.spacing[1]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[2]};
`,hr=p.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,me=p.button`
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
`,gl=p.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,yn=p.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,xl=p.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,bn=p.span`
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
`,Zt=K(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:s,className:a,disableAutoScroll:u=!1})=>{const c=f.useRef(null);f.useEffect(()=>{if(!u&&c.current&&t!==void 0){const l=c.current.querySelector(`[data-move-index="${t}"]`);l&&l.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,u]);const d=()=>{const l=[];for(let h=0;h<e.length;h+=2){const g=Math.floor(h/2)+1,m=e[h],y=e[h+1];l.push(i.jsxs(yn,{children:[i.jsxs(xl,{children:[g,"."]}),i.jsx(bn,{$isCurrentMove:t===h,onClick:()=>r?.(h),"data-move-index":h,children:pr(m.san)}),y&&i.jsx(bn,{$isCurrentMove:t===h+1,onClick:()=>r?.(h+1),"data-move-index":h+1,children:pr(y.san)})]},h))}return l};return i.jsxs(fl,{className:a,children:[o?i.jsx(ur,{children:i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{children:"Moves"}),i.jsxs(hr,{children:[i.jsx(me,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(me,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(me,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(me,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?i.jsxs(ur,{children:[s,i.jsxs(hr,{children:[i.jsx(me,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(me,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(me,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(me,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):i.jsx(ur,{children:i.jsxs(hr,{children:[i.jsx(me,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(me,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(me,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(me,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),i.jsx(gl,{ref:c,children:e.length===0?i.jsx(yn,{children:i.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):d()})]})});Zt.displayName="MoveList";const yl=p(vt)`
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
`,bl=p(vt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,dt=K(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const s=_t(),a=o==="landscape"?bl:yl;return i.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});dt.displayName="ObservableClock";const $l=p.div`
  position: relative;
  display: inline-block;
`,vl=p.button`
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
`,wl=p.div`
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
`,kl=p.button`
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
`,Br=K(({color:e,size:t="small"})=>{const r=Ne(),[n,o]=f.useState(!1),s=f.useRef(null),a=["Q","R","B","N"],u=r.preferences.autoPromotionPiece,c=h=>e==="white"?h:h.toLowerCase();f.useEffect(()=>{const h=g=>{s.current&&!s.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[n]);const d=h=>{r.updatePreference("autoPromotionPiece",h),o(!1)},l=t==="small"?28:36;return i.jsxs($l,{ref:s,children:[i.jsx(vl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:i.jsx(De,{piece:c(u),size:l})}),i.jsx(wl,{$isOpen:n,children:a.map(h=>i.jsx(kl,{$size:t,onClick:()=>d(h),title:`Promote to ${h==="Q"?"Queen":h==="R"?"Rook":h==="B"?"Bishop":"Knight"}`,children:i.jsx(De,{piece:c(h),size:l})},h))})]})});Br.displayName="PromotionPieceSelector";const Sl=p.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,he=p.button`
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
`,Ho=K(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:s,onUnexamine:a,onSetupFEN:u,onFlipBoard:c,isAnalysisActive:d,isDrawOffered:l,canAbort:h,className:g})=>{const m=_t(),y=()=>i.jsxs(i.Fragment,{children:[h&&i.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),i.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),m.currentGame&&m.currentGame.moveNumber>=2&&i.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(Br,{color:m.playingColor||"white",size:"medium"})]}),b=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(he,{onClick:u,$variant:"secondary",children:"FEN"})]});return i.jsxs(Sl,{className:g,children:[e==="playing"&&y(),e==="observing"&&b(),e==="examining"&&$(),e==="freestyle"&&x()]})}),$e=p(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Ho.displayName="GameControls";const $n=p.div`
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
`,vn=p.div`
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
`,Cl=p.div`
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
`,wn=p.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,Pt=p.div`
  background: transparent;
  transition: all 0.3s ease;
`,kn=p.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,_o=K(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Gt().isBottomPlayerWinning;let a,u,c;if(t===50)a=47,u=6,c=47;else if(t>50){const l=t-50;a=50-l,u=l,c=50}else{const l=50-t;a=50,u=l,c=50-l}const d=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const l=t<20;return i.jsxs($n,{$orientation:r,className:n,children:[i.jsx(vn,{$orientation:r,children:e}),i.jsx(Cl,{$needsDarkText:l,children:e}),i.jsxs(wn,{$orientation:r,children:[i.jsx(Pt,{style:{height:`${a}%`}}),i.jsx(kn,{$color:d,style:{height:`${u}%`}}),i.jsx(Pt,{style:{height:`${c}%`}})]})]})}else return i.jsxs($n,{$orientation:r,className:n,children:[i.jsx(vn,{$orientation:r,children:e}),i.jsxs(wn,{$orientation:r,children:[i.jsx(Pt,{style:{width:`${c}%`}}),i.jsx(kn,{$color:d,style:{width:`${u}%`}}),i.jsx(Pt,{style:{width:`${a}%`}})]})]})});_o.displayName="EvaluationBar";const jl=p.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,Pl=p.div`
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
`,jr=K(({orientation:e="vertical",boardSize:t})=>{const r=Gt();return i.jsx(jl,{$orientation:e,$boardSize:t,children:i.jsx(_o,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),Pr=K(({className:e})=>{const t=Gt();return i.jsxs(Pl,{className:e,children:[i.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),i.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});jr.displayName="AnalysisDisplay";Pr.displayName="AnalysisInfoDisplay";const Rl=p.div`
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
`,Ml=p.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,El=p.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Go=p.input`
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
`,zl=p.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Ll=p.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Tl=p.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Sn=p.button`
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
`,Il=p.button`
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
`,Cn=p.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,jn=p.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Al=p(Go)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Uo=K(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=f.useState(""),[s,a]=f.useState(""),u=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=f.useCallback(m=>{o(m.target.value),a("")},[]),d=f.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),l=f.useCallback(m=>{const y=typeof m=="function"?m():m;o(y),a("");try{r.loadPosition(y)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),h=f.useCallback(m=>{m.key==="Enter"&&n.trim()?d():m.key==="Escape"&&t()},[n,d,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>ti.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?i.jsx(Rl,{$isOpen:e,onClick:t,children:i.jsxs(Ml,{onClick:m=>m.stopPropagation(),children:[i.jsx(El,{children:"Set Position from FEN"}),i.jsx(Ll,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),i.jsxs(Cn,{children:[i.jsx(jn,{children:"Current position:"}),i.jsx(Al,{type:"text",value:u,readOnly:!0,onClick:m=>m.currentTarget.select()})]}),i.jsxs(Cn,{children:[i.jsx(jn,{children:"Preset position:"}),g.map(m=>i.jsx(Il,{onClick:()=>l(m.fen),children:m.name},m.name))]}),i.jsx(Go,{type:"text",value:n,onChange:c,onKeyDown:h,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&i.jsx(zl,{children:s}),i.jsxs(Tl,{children:[i.jsx(Sn,{onClick:t,children:"Cancel"}),i.jsx(Sn,{$variant:"primary",onClick:d,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Uo.displayName="FENDialog";const Dl=p.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Nl=p.div`
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
`,Ol=p.div`
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
`,Fl=p.div`
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
`,Bl=p(De)`
  width: 100%;
  height: 100%;
`,ut=K(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:s}=Ee(),a=f.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const h=s.capturedPieces;return t?h.white:h.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),u=f.useMemo(()=>{const l={};return a.forEach(h=>{l[h]=(l[h]||0)+1}),l},[a]),c=["p","n","b","r","q"],d=n?n/8:32;return i.jsx(Dl,{$orientation:e,$size:d,className:r,children:i.jsx(Nl,{$orientation:e,children:c.map(l=>{const h=u[l]||0,g=t?l.toUpperCase():l;return i.jsx(Ol,{$size:d,onClick:h>0&&o?()=>o(g):void 0,style:{cursor:h>0&&o?"pointer":"default"},children:h>0&&i.jsxs(i.Fragment,{children:[i.jsx(Bl,{piece:g,size:d}),h>1&&i.jsx(Fl,{children:h})]})},l)})})})});ut.displayName="CapturedPieces";const Wl=p.div`
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
`,Hl=p.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,_l=p.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Gl=p.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Ul=p.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Pn=p.button`
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
`,Yl=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:s,onCancel:a})=>i.jsx(Wl,{$isOpen:e,onClick:a,children:i.jsxs(Hl,{onClick:u=>u.stopPropagation(),children:[i.jsx(_l,{children:t}),i.jsx(Gl,{children:r}),i.jsxs(Ul,{children:[i.jsx(Pn,{$variant:"secondary",onClick:a,children:o}),i.jsx(Pn,{$variant:"primary",onClick:s,children:n})]})]})}),Vl=p.div`
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
`,Rn=p.div`
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
`;p.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    white-space: nowrap;
`;const ql=p.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Kl=p.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,Xl=p.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Ql=p.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Yo=p.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Vo=p.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Jl=p(Yo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Zl=p(Vo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,ed=p(Yo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,td=p.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,rd=p(Vo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,Mn=p.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,En=p.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,zn=p.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Ln=p.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Tn=p.div`
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
`,nd=p.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,od=p.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,id=p.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;p.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    z-index: 1;
    box-shadow: ${e=>e.theme.shadows.sm};
`;p.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    display: flex;
    gap: ${e=>e.theme.spacing[4]};
    align-items: center;
    white-space: nowrap;
`;const sd=p.div`
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
`,ad=p.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,cd=p.div`
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
`;p.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`;p.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[3]};
    align-items: flex-start;
`;p.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;const ld=p.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,dd=p.div`
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
`;p.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[1]};
    align-items: flex-start;
    width: 100%;
`;const In=p.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;p(Zt)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const ud=p(Zt)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;p(vt)`
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
`;const An=p.div`
    flex: 1;
    display: flex;
`;p(vt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;p.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    justify-content: center;
    width: 100%;
`;const hd=p.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,pd=p.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,md=p.div`
    position: relative;
    margin-top: 18px;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"100%"};
    display: flex;
    align-items: center;
`;p.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    padding: ${e=>e.theme.spacing[2]};
    align-items: center;
`;p.div`
    min-height: 28px;
`;const fd=p.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,gd=p.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,qo=K(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=_t(),o=Ne(),s=Gt(),a=Nn(),u=ri();Oe();const[c,d]=f.useState(!1),[l,h]=f.useState(!1),[g,m]=f.useState(0),[y,b]=f.useState(!1),[$,x]=f.useState(!1),[k,S]=f.useState(null),j=o.preferences.chessOrientation==="landscape",C=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",E=window.innerWidth/window.innerHeight>1.6,H=f.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),_=f.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),Q=f.useCallback((N,q,ce)=>{try{n.makeMove(N,q,ce)||(console.error("Invalid move:",N,q),u.playIllegal())}catch(xe){console.error("Error making move:",xe),u.playIllegal()}},[n,u]),v=f.useCallback((N,q)=>{try{const ce=N.toLowerCase();n.makeSANMove(`${N.toUpperCase()}@${q}`)||(console.error("Invalid drop:",N,q),u.playIllegal())}catch(ce){console.error("Error making drop:",ce),u.playIllegal()}},[n,u]),F=f.useCallback(N=>{S(k===N?null:N)},[k]);f.useMemo(()=>{if(n.currentGameInfo){const{white:N,black:q,timeControl:ce,variant:xe}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${xe} ${ce}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const B=(()=>{const N=n.moveHistory.length;if(N>0){const q=n.moveHistory[N-1],ce=Math.ceil(N/2),xe=N%2===1,Le=pr(q.san);return`${ce}.${xe?"":".."} ${Le}`}return"Starting position"})(),I=n.currentOpening,G=n.currentGame,Z=G||n.lastGameState,le=Z?.white||{name:"White",rating:1500,time:900},Ce=Z?.black||{name:"Black",rating:1500,time:900},X=!G||G.turn==="w",ie=n.shouldShowFlippedBoard,se=ie?le:Ce,ee=ie?Ce:le,ge=ie,de=ie?X:!X,je=f.useCallback(N=>{n.goToMove(N)},[n]);f.useEffect(()=>{s.initialize()},[s]),f.useEffect(()=>{$&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,$,n.isPlaying,a]),f.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),f.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(C):s.stopAnalysis()},[c,C,s]);const w=f.useCallback(()=>{d(N=>!N)},[]),L=f.useCallback(()=>{h(!0)},[]),M=f.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),P=f.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),R=f.useCallback(()=>{a.sendCommand("unexamine")},[a]),z=f.useCallback(()=>{b(!0)},[]),D=f.useCallback(()=>{a.sendCommand("resign"),b(!1)},[a]),ae=f.useCallback(()=>{a.sendCommand("draw"),x(!$)},[a,$]),ue=f.useCallback(()=>{a.sendCommand("abort")},[a]),te=()=>i.jsxs(i.Fragment,{children:[i.jsx(Rn,{$orientation:"portrait",children:i.jsx(nd,{children:i.jsxs(od,{children:[c&&i.jsx(gd,{$boardSize:g,children:i.jsx(jr,{orientation:"vertical",boardSize:g})}),i.jsx(id,{children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[i.jsxs(ed,{children:[i.jsxs(Mn,{children:["Game #",Z?.gameId||"?"]}),i.jsx(En,{children:Z?.timeControl||"?"}),i.jsxs(td,{children:[H==="playing"&&i.jsxs(i.Fragment,{children:[n.moveHistory.length<=1&&i.jsx($e,{onClick:ue,$variant:"secondary",children:"Abort"}),i.jsx($e,{onClick:ae,$variant:"secondary",children:"Draw"}),i.jsx($e,{onClick:z,$variant:"secondary",children:"Resign"}),i.jsx(Br,{color:n.playingColor||"white",size:"small"})]}),H==="observing"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:P,$variant:"secondary",children:"Unobserve"}),i.jsx($e,{onClick:w,$variant:"secondary",children:"Analysis"})]}),H==="examining"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:R,$variant:"secondary",children:"Unexamine"}),i.jsx($e,{onClick:w,$variant:"secondary",children:"Analysis"})]}),H==="freestyle"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:w,$variant:"secondary",children:"Analysis"}),i.jsx($e,{onClick:M,$variant:"secondary",children:"Flip"}),i.jsx($e,{onClick:L,$variant:"secondary",children:"FEN"})]})]})]}),i.jsxs(In,{children:[i.jsx(dt,{player:se,isActive:de,size:"small",compact:!0}),i.jsx(An,{children:i.jsx(lt,{name:se.name,rating:se.rating,time:0,isActive:de,isWhite:ge,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsx(Tn,{$orientation:"portrait",children:i.jsx(Cr,{position:C,flipped:ie,showCoordinates:o.preferences.showCoordinates,onMove:Q,onDrop:v,interactive:H==="playing"||H==="freestyle"||H==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:m,selectedCapturedPiece:k,onCapturedPieceSelect:S})}),i.jsxs(In,{children:[i.jsx(dt,{player:ee,isActive:!de,size:"small",compact:!0}),i.jsx(An,{children:i.jsx(lt,{name:ee.name,rating:ee.rating,time:0,isActive:!de,isWhite:!ge,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsxs(rd,{children:[i.jsx(zn,{children:n.premove?`Premove: ${_r(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,C)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(Ln,{children:I})]}),c&&i.jsx(fd,{children:i.jsx(Pr,{})})]})}),_&&i.jsx(Xl,{$squareSize:g?g/8:0,children:i.jsxs(Ql,{$squareSize:g?g/8:0,children:[i.jsx(ut,{orientation:"vertical",isWhitePieces:ie,boardSize:g,onPieceClick:F}),i.jsx(ut,{orientation:"vertical",isWhitePieces:!ie,boardSize:g,onPieceClick:F})]})})]})})}),i.jsx(sd,{$orientation:"portrait",$boardSize:g,children:i.jsx(Zt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:je,disableAutoScroll:!0,onNavigate:N=>{if(n.isExamining)switch(N){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(N){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return i.jsxs(Vl,{className:e,$orientation:j?"landscape":"portrait",$hasChat:t,children:[j?i.jsx(i.Fragment,{children:i.jsx(Rn,{$orientation:"landscape",children:i.jsxs(ad,{children:[i.jsx(pd,{children:c&&i.jsx(md,{$boardSize:g,children:i.jsx(jr,{orientation:"vertical",boardSize:g})})}),i.jsxs(cd,{$hasAnalysis:c,children:[i.jsxs(ql,{$isWideAspect:E,children:[i.jsxs(Jl,{$chatWidth:r,$hasAnalysis:c,children:[i.jsxs(Mn,{children:["Game #",Z?.gameId||"?"]}),i.jsx(En,{children:Z?.timeControl||"?"})]}),i.jsx(Kl,{$orientation:"landscape",children:i.jsx(Tn,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:i.jsx(Cr,{position:C,flipped:ie,showCoordinates:o.preferences.showCoordinates,onMove:Q,onDrop:v,interactive:H==="playing"||H==="freestyle"||H==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:m,selectedCapturedPiece:k,onCapturedPieceSelect:S})})}),i.jsxs(Zl,{$chatWidth:r,$hasAnalysis:c,children:[i.jsx(zn,{children:n.premove?`Premove: ${_r(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,C)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(Ln,{children:I})]}),c&&i.jsx(hd,{$chatWidth:r,$hasAnalysis:c,children:i.jsx(Pr,{})})]}),i.jsxs(ld,{$isWideAspect:E,$boardSize:g,children:[_&&i.jsx(ut,{orientation:"horizontal",isWhitePieces:ge,boardSize:g,onPieceClick:F}),i.jsx(dt,{player:se,isActive:de,size:"small",compact:!0,variant:"landscape"}),i.jsxs(dd,{children:[i.jsx(lt,{name:se.name,rating:se.rating,time:0,isActive:de,isWhite:ge,orientation:"vertical",hideClockInCard:!0,compact:!0}),i.jsx(Ho,{perspective:H,canAbort:n.moveHistory.length<=1,onAnalysis:w,onFlipBoard:M,onSetupFEN:L,onUnobserve:P,onUnexamine:R,onResign:z,onDraw:ae,onAbort:ue,isAnalysisActive:c,isDrawOffered:$}),i.jsx(ud,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:je,showHeader:!1,onNavigate:N=>{if(n.isExamining)switch(N){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(N){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),i.jsx(lt,{name:ee.name,rating:ee.rating,time:0,isActive:!de,isWhite:!ge,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),i.jsx(dt,{player:ee,isActive:!de,size:"small",compact:!0,variant:"landscape"}),_&&i.jsx(ut,{orientation:"horizontal",isWhitePieces:!ge,boardSize:g,onPieceClick:F})]})]})]})})}):te(),i.jsx(Uo,{isOpen:l,onClose:()=>h(!1)}),i.jsx(Yl,{isOpen:y,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:D,onCancel:()=>b(!1)})]})});qo.displayName="ChessGameLayout";const xd=p.div`
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
`,yd=p.div`
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
`,bd=p.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,$d=p.span`
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
`,vd=p.button`
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
`,wd=p.span`
  font-size: 12px;
  opacity: 0.7;
`,Ko=K(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=oe.useState(null),[o,s]=oe.useState(null),a=(h,g)=>{n(g),h.dataTransfer.effectAllowed="move"},u=(h,g)=>{h.preventDefault(),h.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},d=(h,g)=>{h.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},l=()=>{n(null),s(null)};return i.jsx(xd,{children:t.map(h=>i.jsxs(yd,{$active:h.id===e.activeTabId,$hasUnread:h.unreadCount>0,$dragging:h.id===r,$dragOver:h.id===o,draggable:!0,onDragStart:g=>a(g,h.id),onDragOver:g=>u(g,h.id),onDragLeave:c,onDrop:g=>d(g,h.id),onDragEnd:l,onClick:()=>e.setActiveTab(h.id),children:[h.type!=="console"&&i.jsx(wd,{$type:h.type}),i.jsx(bd,{children:h.type==="channel"?`(${h.name})`:h.name}),h.unreadCount>0&&i.jsx($d,{children:h.unreadCount>99?"99+":h.unreadCount}),h.id!=="console"&&i.jsx(vd,{onClick:g=>{g.stopPropagation(),e.closeTab(h.id)},title:"Close tab",children:"×"})]},h.id))})});Ko.displayName="ChatTabs";function kd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function Sd(e){e.scrollTop=e.scrollHeight}function Cd(e,t=10){kd(e,t)&&Sd(e)}class Fe{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class O{static{this.renderers=new Map}static register(t){this.renderers.set(t.type,t)}static getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}static getAllRenderers(){return Array.from(this.renderers.values())}}const Ge=p.div`
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
`,wt=p(Ge)`
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,jd=p.div`
  font-size: 11px;
  font-family: ${e=>e.$fontFamily||"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${e=>e.$fontStyle||"normal"};
  line-height: 1.3;
  white-space: pre;
  word-break: break-all;
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,Wr=p.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  min-width: 80px;
  display: inline-block;
  
  &::after {
    content: ':';
  }
`,Hr=p.span`
  min-width: 80px;
  display: inline-block;
  flex-shrink: 0;
`,rt=p.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,Pd=p.a`
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
`,kt=p.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`;p(kt)`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`;const Rd=p(kt)`
  &::before {
    content: '(';
  }
  &::after {
    content: ')';
  }
`,Md=p(kt)`
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
`,Ed=p(kt)`
  display: inline-block;
  padding: 0 2px;
  border-radius: 2px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
`,be=({content:e,elements:t=[],onCommandClick:r})=>{const{ficsStore:n}=Ee(),o=l=>{const h=[],g=/(https?:\/\/[^\s]+)/gi;let m;for(;(m=g.exec(l))!==null;)h.push({type:"url",text:m[1],action:m[1],start:m.index,end:m.index+m[1].length});const y=/'([^']+)'/g;for(;(m=y.exec(l))!==null;){const k=m[1];/^\w/.test(k)&&h.push({type:"command",text:m[0],action:k,start:m.index,end:m.index+m[0].length})}const b=/\bgame\s+(\d+)\b/gi;for(;(m=b.exec(l))!==null;)h.push({type:"gameNumber",text:m[1],action:`observe ${m[1]}`,start:m.index,end:m.index+m[0].length});const $=/"play\s+(\d+)"/gi;for(;(m=$.exec(l))!==null;)h.push({type:"seekNumber",text:m[0],action:`play ${m[1]}`,start:m.index,end:m.index+m[0].length});const x=/\((\d+)\):/g;for(;(m=x.exec(l))!==null;)h.push({type:"channelNumber",text:m[1],action:`+channel ${m[1]}`,start:m.index+1,end:m.index+1+m[1].length});return h},s=(l,h)=>{h==="url"?window.open(l,"_blank","noopener,noreferrer"):r?r(l):n.sendCommand(l)},a=[...t];if(t.length===0&&a.push(...o(e)),a.length===0)return i.jsx(i.Fragment,{children:e});const u=[...a].sort((l,h)=>l.start-h.start),c=[];let d=0;return u.forEach((l,h)=>{l.start>d&&c.push(i.jsx("span",{style:{whiteSpace:"pre"},children:e.substring(d,l.start)},`text-${h}`));const g=`${l.type}-${h}`,m=e.substring(l.start,l.end);switch(l.type){case"player":c.push(i.jsx(st,{name:l.text,onClick:()=>s(l.action,l.type)},g));break;case"url":c.push(i.jsx(Pd,{href:l.action,target:"_blank",rel:"noopener noreferrer",onClick:y=>{y.preventDefault(),s(l.action,l.type)},children:m},g));break;case"channelNumber":c.push(i.jsx(Rd,{onClick:()=>s(l.action,l.type),children:l.text},g));break;case"gameNumber":c.push(i.jsx(Md,{onClick:()=>s(l.action,l.type),children:l.text},g));break;case"seekNumber":c.push(i.jsx(Ed,{onClick:()=>s(l.action,l.type),children:m},g));break;case"command":default:c.push(i.jsx(kt,{onClick:()=>s(l.action,l.type),children:m},g));break}d=l.end}),d<e.length&&c.push(i.jsx("span",{style:{whiteSpace:"pre"},children:e.substring(d)},"text-end")),i.jsx(i.Fragment,{children:c})};class zd extends Fe{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.metadata?.parsedMessage,s=t.metadata?.isGroupedMessage;if(t.type==="system")return i.jsx(wt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})});const a=t.sender&&t.sender.toLowerCase()===r.toLowerCase();return s||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,children:[i.jsx(Hr,{}),i.jsx(rt,{children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,children:[i.jsx(Wr,{$isYou:a||void 0,children:a?t.sender:i.jsx(st,{name:t.sender})}),i.jsx(rt,{children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]})}}class Ld extends Fe{constructor(){super(...arguments),this.type="channelTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage,a=t.metadata?.isGroupedMessage,u=t.channel?.startsWith("channel-"),c=s?.metadata?.message||t.content;return a||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Hr,{}),i.jsx(rt,{children:u?i.jsx("span",{style:{whiteSpace:"pre-wrap"},children:c}):i.jsx(be,{content:c,elements:s?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,"data-settings":"chat",className:"channel-tell-message",children:[i.jsx(Wr,{$isYou:o,children:o?t.sender:i.jsx(st,{name:t.sender})}),i.jsx(rt,{children:u?i.jsx("span",{style:{whiteSpace:"pre-wrap"},children:c}):i.jsx(be,{content:c,elements:[],onCommandClick:n})})]})}}class Td extends Fe{constructor(){super(...arguments),this.type="directTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage;return t.metadata?.isGroupedMessage||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Hr,{}),i.jsx(rt,{children:i.jsx(be,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Wr,{$isYou:o,children:o?t.sender:i.jsx(st,{name:t.sender})}),i.jsx(rt,{children:i.jsx(be,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]})}}class Id extends Fe{constructor(){super(...arguments),this.type="gameStart"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(wt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Ad extends Fe{constructor(){super(...arguments),this.type="gameEnd"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(wt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Dd extends Fe{constructor(){super(...arguments),this.type="style12"}render({message:t}){return i.jsx(wt,{$color:t.metadata?.color||"#666",children:t.content})}}class Nd extends Fe{constructor(){super(...arguments),this.type="movesList"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(wt,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Y extends Fe{render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(jd,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx(be,{content:n?.content||t.content,elements:n?.elements||[],onCommandClick:r})})}}class Od extends Y{constructor(){super(...arguments),this.type="shout"}}class Fd extends Y{constructor(){super(...arguments),this.type="cshout"}}class Bd extends Y{constructor(){super(...arguments),this.type="notification"}}class Wd extends Y{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Hd extends Y{constructor(){super(...arguments),this.type="matchRequest"}}class _d extends Y{constructor(){super(...arguments),this.type="illegalMove"}}class Gd extends Y{constructor(){super(...arguments),this.type="drawOffer"}}class Ud extends Y{constructor(){super(...arguments),this.type="unobserve"}}class Yd extends Y{constructor(){super(...arguments),this.type="gameNotification"}}class Vd extends Y{constructor(){super(...arguments),this.type="whoOutput"}}class qd extends Y{constructor(){super(...arguments),this.type="gamesOutput"}}class Kd extends Y{constructor(){super(...arguments),this.type="fingerOutput"}}class Xd extends Y{constructor(){super(...arguments),this.type="historyOutput"}}class Qd extends Y{constructor(){super(...arguments),this.type="journalOutput"}}class Jd extends Y{constructor(){super(...arguments),this.type="soughtOutput"}}class Zd extends Y{constructor(){super(...arguments),this.type="channelListOutput"}}class eu extends Y{constructor(){super(...arguments),this.type="newsOutput"}}class tu extends Y{constructor(){super(...arguments),this.type="inOutput"}}class ru extends Y{constructor(){super(...arguments),this.type="login"}}class nu extends Y{constructor(){super(...arguments),this.type="password"}}class ou extends Y{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class iu extends Y{constructor(){super(...arguments),this.type="sessionStart"}}class su extends Y{constructor(){super(...arguments),this.type="system"}}class au extends Y{constructor(){super(...arguments),this.type="raw"}}function cu(){O.register(new Ld),O.register(new Td),O.register(new Od),O.register(new Fd),O.register(new Id),O.register(new Ad),O.register(new Dd),O.register(new Nd),O.register(new _d),O.register(new Gd),O.register(new Ud),O.register(new Yd),O.register(new Wd),O.register(new Hd),O.register(new Vd),O.register(new qd),O.register(new Kd),O.register(new Xd),O.register(new Qd),O.register(new Jd),O.register(new Zd),O.register(new eu),O.register(new tu),O.register(new Bd),O.register(new ru),O.register(new nu),O.register(new ou),O.register(new iu),O.register(new su),O.register(new au),O.register(new zd)}cu();const ht=K(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=Ee(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,u=s?o.getConsoleColor(s,a):null,c=s?o.getConsoleFont(s,a):null,d=s?o.getConsoleFontStyle(s,a):null,l={...e,metadata:{...e.metadata,color:u,fontFamily:c,fontStyle:d}},h=O.getRenderer(l);return h?i.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:h.render({message:l,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),i.jsx("div",{children:e.content}))});ht.displayName="Message";const Rt=p.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,Mt=p.div`
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
`,lu=p.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
`,Dn=p.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,du=p.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Et=p.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Xo=K(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),o=f.useRef(null),s=t.activeTab,a=s?.messages||[],u=r.username||"You",c=l=>{r.sendCommand(l)};if(f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current,h=setTimeout(()=>{s?.type==="console"?l.scrollTop=l.scrollHeight:Cd(l,50)},50);return()=>clearTimeout(h)}},[a.length,a[a.length-1]?.id]),f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current;requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}},[s?.id]),!s)return i.jsx(Rt,{children:i.jsx(Mt,{className:"chat-messages-container",children:i.jsx(Dn,{children:"No active chat"})})});if(a.length===0)return i.jsx(Rt,{children:i.jsx(Mt,{className:"chat-messages-container",children:i.jsx(Dn,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const d=[];return a.forEach((l,h)=>{const g=h>0?a[h-1]:null,m=g?new Date(l.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===l.sender&&g.type===l.type&&m<6e4?d[d.length-1].messages.push(l):d.push({sender:l.sender,timestamp:new Date(l.timestamp),messages:[l]})}),s.type==="console"?i.jsx(Rt,{children:i.jsx(Mt,{ref:o,className:"chat-messages-container",children:a.map(l=>i.jsx(Et,{children:i.jsx(ht,{message:l,currentUsername:u,onCommandClick:c,onHover:e})},l.id))})}):i.jsx(Rt,{children:i.jsx(Mt,{ref:o,className:"chat-messages-container",children:d.map((l,h)=>l.messages[0].type==="system"?i.jsx(du,{children:l.messages.map(m=>i.jsx(Et,{children:i.jsx(ht,{message:m,currentUsername:u,onCommandClick:c,onHover:e})},m.id))},h):i.jsx(lu,{children:l.messages.map((m,y)=>{if(y===0)return i.jsx(Et,{children:i.jsx(ht,{message:m,currentUsername:u,onCommandClick:c,onHover:e})},m.id);{const b={...m,sender:"",metadata:{...m.metadata,isGroupedMessage:!0}};return i.jsx(Et,{children:i.jsx(ht,{message:b,currentUsername:u,onCommandClick:c,onHover:e})},m.id)}})},h))})})});Xo.displayName="ChatMessages";const uu=p.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  padding-top: ${e=>e.theme.spacing[1]};
  background-color: transparent;
  margin: ${e=>e.theme.spacing[2]};
  margin-top: 0;
`,hu=p.input`
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
`,pu=p.button`
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
`,Qo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:s=!1})=>{const a=f.useRef(null),u=d=>{d.key==="Enter"&&!d.shiftKey?(d.preventDefault(),e.trim()&&r(e.trim())):d.key==="ArrowUp"&&!e?(d.preventDefault(),n?.("up")):d.key==="ArrowDown"&&(d.preventDefault(),n?.("down"))},c=()=>{e.trim()&&r(e.trim())};return i.jsxs(uu,{children:[i.jsx(hu,{ref:a,type:"text",value:e,onChange:d=>t(d.target.value),onKeyDown:u,placeholder:o,disabled:s,autoComplete:"off",spellCheck:"true"}),i.jsx(pu,{onClick:c,disabled:s||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};Qo.displayName="ChatInput";const mu=p.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,fu=p.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,gu=p.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,xu=p.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,yu=p.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,bu=p.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  padding: ${e=>e.theme.spacing[2]};
  padding-top: 0;
  padding-bottom: 0;
`,Jo=K(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=Ee(),[s,a]=f.useState(""),[u,c]=f.useState(!1),[d,l]=f.useState(null);oe.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),oe.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const h=m=>{if(console.log("handleSendMessage called with:",m,"Length:",m.length),!!m.trim()){if(r.addToHistory(m),m==="/help"||m==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(m.startsWith("/")||m.startsWith("\\")){const y=m.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const b=y.id.replace("channel-","");n.sendCommand(`tell ${b} ${m}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:m,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${m}`);else{const b=m.match(/^tell\s+(\w+)\s+(.+)$/);if(b&&o.preferences.openTellsInTabs){const[,$,x]=b,k=$.replace(/\([^)]*\)/g,"").trim(),S=k.toLowerCase();r.createTab(S,k,"private"),r.addMessage(S,{channel:S,sender:"You",content:x,timestamp:new Date,type:"message"})}else r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"});n.sendCommand(m)}}a("")}},g=m=>{const y=r.navigateHistory(m);y!==null&&a(y)};return i.jsxs(mu,{className:e,$compact:t,children:[!t&&i.jsxs(fu,{children:[i.jsx(gu,{children:"Chat"}),n.averagePing!==null&&i.jsxs(yu,{children:["Ping: ",n.averagePing,"ms"]}),d&&i.jsxs(xu,{children:["Received: ",new Date(d).toLocaleTimeString()]})]}),i.jsxs(bu,{children:[i.jsx(Ko,{}),i.jsx(Xo,{onMessageHover:l}),i.jsx(Qo,{value:s,onChange:a,onSend:h,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});Jo.displayName="ChatPanel";const $u=p.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,vu=p.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,wu=p.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,ku=p.div`
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
`,Su=p.div`
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
`,Zo=K(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Oe(),o=Ao(),s=Do(),a=rc(),[u,c]=f.useState(600),[d,l]=f.useState(!1),h=f.useRef(!1);f.useEffect(()=>{!h.current&&r&&(h.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),f.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),f.useEffect(()=>{const $=e.preferences.chessOrientation;s.includes($)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=$=>{$.preventDefault(),l(!0)};f.useEffect(()=>{if(!d)return;const $=k=>{const S=window.innerWidth-k.clientX;c(Math.max(300,Math.min(600,S))),window.dispatchEvent(new Event("resize"))},x=()=>{l(!1)};return document.addEventListener("mousemove",$),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",x)}},[d]);const m=t==="chess-only"||t==="chess-and-chat",y=t==="chat-only"||t==="chess-and-chat",b=t==="chess-and-chat"&&!n.isMobile;return i.jsxs($u,{children:[i.jsx(Oo,{}),i.jsxs(vu,{children:[i.jsx(wu,{$isVisible:m,children:i.jsx(qo,{hasChat:y,chatWidth:y&&!n.isMobile?u:0})}),b&&i.jsx(Su,{$isVisible:!0,onMouseDown:g,style:{cursor:d?"col-resize":"ew-resize"}}),i.jsx(ku,{$isVisible:y,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:y&&!n.isMobile?`${u}px`:void 0},children:i.jsx(Jo,{})})]})]})});Zo.displayName="AppLayout";const Cu=Ua`
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
`,ju=()=>i.jsx(ni,{children:i.jsxs(Va,{children:[i.jsx(Cu,{}),i.jsx(Ms,{children:i.jsx(is,{children:i.jsx(Xn,{path:"/",element:i.jsx(oc,{children:i.jsx(Zo,{})})})})})]})}),ei=document.getElementById("root");if(!ei)throw new Error("Root element not found");const Pu=On(ei);Pu.render(i.jsx(ju,{}));
