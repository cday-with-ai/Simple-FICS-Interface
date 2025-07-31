import{u as Oe,j as i,a as ze,b as _t,c as Fn,d as fr,e as Gt,V as ni,f as oi,l as Ur,R as ii}from"./shared-DMhkSYcK.js";import{a as si,r as f,R as V}from"./vendor-cxkclgJA.js";import{o as X}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var Bn,Yr=si;Bn=Yr.createRoot,Yr.hydrateRoot;var Er={};Object.defineProperty(Er,"__esModule",{value:!0});Er.parse=pi;Er.serialize=mi;const ai=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,ci=/^[\u0021-\u003A\u003C-\u007E]*$/,li=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,di=/^[\u0020-\u003A\u003D-\u007E]*$/,ui=Object.prototype.toString,hi=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function pi(e,t){const r=new hi,n=e.length;if(n<2)return r;const o=t?.decode||fi;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const p=e.indexOf(";",s),c=p===-1?n:p;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const d=Vr(e,s,a),l=qr(e,a,d),h=e.slice(d,l);if(r[h]===void 0){let g=Vr(e,a+1,c),u=qr(e,c,g);const b=o(e.slice(g,u));r[h]=b}s=c+1}while(s<n);return r}function Vr(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function qr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function mi(e,t,r){const n=r?.encode||encodeURIComponent;if(!ai.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!ci.test(o))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+o;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!li.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!di.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!gi(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function fi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function gi(e){return ui.call(e)==="[object Date]"}var Kr="popstate";function xi(e={}){function t(n,o){let{pathname:s,search:a,hash:p}=n.location;return gr("",{pathname:s,search:a,hash:p},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:gt(o)}return bi(t,r,null,e)}function q(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ke(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function yi(){return Math.random().toString(36).substring(2,10)}function Xr(e,t){return{usr:e.state,key:e.key,idx:t}}function gr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?ot(t):t,state:r,key:t&&t.key||n||yi()}}function gt({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function ot(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function bi(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:s=!1}=n,a=o.history,p="POP",c=null,d=l();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function l(){return(a.state||{idx:null}).idx}function h(){p="POP";let $=l(),x=$==null?null:$-d;d=$,c&&c({action:p,location:y.location,delta:x})}function g($,x){p="PUSH";let S=gr(y.location,$,x);d=l()+1;let C=Xr(S,d),w=y.createHref(S);try{a.pushState(C,"",w)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;o.location.assign(w)}s&&c&&c({action:p,location:y.location,delta:1})}function u($,x){p="REPLACE";let S=gr(y.location,$,x);d=l();let C=Xr(S,d),w=y.createHref(S);a.replaceState(C,"",w),s&&c&&c({action:p,location:y.location,delta:0})}function b($){return $i($)}let y={get action(){return p},get location(){return e(o,a)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Kr,h),c=$,()=>{o.removeEventListener(Kr,h),c=null}},createHref($){return t(o,$)},createURL:b,encodeLocation($){let x=b($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:u,go($){return a.go($)}};return y}function $i(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),q(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:gt(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Wn(e,t,r="/"){return vi(e,t,r,!1)}function vi(e,t,r,n){let o=typeof t=="string"?ot(t):t,s=Ee(o.pathname||"/",r);if(s==null)return null;let a=Hn(e);wi(a);let p=null;for(let c=0;p==null&&c<a.length;++c){let d=Ti(s);p=zi(a[c],d,n)}return p}function Hn(e,t=[],r=[],n=""){let o=(s,a,p)=>{let c={relativePath:p===void 0?s.path||"":p,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(q(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let d=Me([n,c.relativePath]),l=r.concat(c);s.children&&s.children.length>0&&(q(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Hn(s.children,t,l,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Mi(d,s.index),routesMeta:l})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))o(s,a);else for(let p of _n(s.path))o(s,a,p)}),t}function _n(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return o?[s,""]:[s];let a=_n(n.join("/")),p=[];return p.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&p.push(...a),p.map(c=>e.startsWith("/")&&c===""?"/":c)}function wi(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Ei(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var ki=/^:[\w-]+$/,Si=3,Ci=2,ji=1,Pi=10,Ri=-2,Qr=e=>e==="*";function Mi(e,t){let r=e.split("/"),n=r.length;return r.some(Qr)&&(n+=Ri),t&&(n+=Ci),r.filter(o=>!Qr(o)).reduce((o,s)=>o+(ki.test(s)?Si:s===""?ji:Pi),n)}function Ei(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function zi(e,t,r=!1){let{routesMeta:n}=e,o={},s="/",a=[];for(let p=0;p<n.length;++p){let c=n[p],d=p===n.length-1,l=s==="/"?t:t.slice(s.length)||"/",h=Ot({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},l),g=c.route;if(!h&&d&&r&&!n[n.length-1].route.index&&(h=Ot({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},l)),!h)return null;Object.assign(o,h.params),a.push({params:o,pathname:Me([s,h.pathname]),pathnameBase:Ni(Me([s,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(s=Me([s,h.pathnameBase]))}return a}function Ot(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Li(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),p=o.slice(1);return{params:n.reduce((d,{paramName:l,isOptional:h},g)=>{if(l==="*"){let b=p[g]||"";a=s.slice(0,s.length-b.length).replace(/(.)\/+$/,"$1")}const u=p[g];return h&&!u?d[l]=void 0:d[l]=(u||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function Li(e,t=!1,r=!0){ke(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,p,c)=>(n.push({paramName:p,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function Ti(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ke(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ee(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ii(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?ot(e):e;return{pathname:r?r.startsWith("/")?r:Ai(r,t):t,search:Oi(n),hash:Fi(o)}}function Ai(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function rr(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Di(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Gn(e){let t=Di(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Un(e,t,r,n=!1){let o;typeof e=="string"?o=ot(e):(o={...e},q(!o.pathname||!o.pathname.includes("?"),rr("?","pathname","search",o)),q(!o.pathname||!o.pathname.includes("#"),rr("#","pathname","hash",o)),q(!o.search||!o.search.includes("#"),rr("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,p;if(a==null)p=r;else{let h=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;o.pathname=g.join("/")}p=h>=0?t[h]:"/"}let c=Ii(o,p),d=a&&a!=="/"&&a.endsWith("/"),l=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||l)&&(c.pathname+="/"),c}var Me=e=>e.join("/").replace(/\/\/+/g,"/"),Ni=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Oi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Fi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Bi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Yn=["POST","PUT","PATCH","DELETE"];new Set(Yn);var Wi=["GET",...Yn];new Set(Wi);var it=f.createContext(null);it.displayName="DataRouter";var Ut=f.createContext(null);Ut.displayName="DataRouterState";var Vn=f.createContext({isTransitioning:!1});Vn.displayName="ViewTransition";var Hi=f.createContext(new Map);Hi.displayName="Fetchers";var _i=f.createContext(null);_i.displayName="Await";var Se=f.createContext(null);Se.displayName="Navigation";var $t=f.createContext(null);$t.displayName="Location";var Le=f.createContext({outlet:null,matches:[],isDataRoute:!1});Le.displayName="Route";var zr=f.createContext(null);zr.displayName="RouteError";function Gi(e,{relative:t}={}){q(vt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=f.useContext(Se),{hash:o,pathname:s,search:a}=wt(e,{relative:t}),p=s;return r!=="/"&&(p=s==="/"?r:Me([r,s])),n.createHref({pathname:p,search:a,hash:o})}function vt(){return f.useContext($t)!=null}function Ue(){return q(vt(),"useLocation() may be used only in the context of a <Router> component."),f.useContext($t).location}var qn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Kn(e){f.useContext(Se).static||f.useLayoutEffect(e)}function Ui(){let{isDataRoute:e}=f.useContext(Le);return e?os():Yi()}function Yi(){q(vt(),"useNavigate() may be used only in the context of a <Router> component.");let e=f.useContext(it),{basename:t,navigator:r}=f.useContext(Se),{matches:n}=f.useContext(Le),{pathname:o}=Ue(),s=JSON.stringify(Gn(n)),a=f.useRef(!1);return Kn(()=>{a.current=!0}),f.useCallback((c,d={})=>{if(ke(a.current,qn),!a.current)return;if(typeof c=="number"){r.go(c);return}let l=Un(c,JSON.parse(s),o,d.relative==="path");e==null&&t!=="/"&&(l.pathname=l.pathname==="/"?t:Me([t,l.pathname])),(d.replace?r.replace:r.push)(l,d.state,d)},[t,r,s,o,e])}f.createContext(null);function wt(e,{relative:t}={}){let{matches:r}=f.useContext(Le),{pathname:n}=Ue(),o=JSON.stringify(Gn(r));return f.useMemo(()=>Un(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Vi(e,t){return Xn(e,t)}function Xn(e,t,r,n){q(vt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=f.useContext(Se),{matches:s}=f.useContext(Le),a=s[s.length-1],p=a?a.params:{},c=a?a.pathname:"/",d=a?a.pathnameBase:"/",l=a&&a.route;{let x=l&&l.path||"";Qn(c,!l||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let h=Ue(),g;if(t){let x=typeof t=="string"?ot(t):t;q(d==="/"||x.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=h;let u=g.pathname||"/",b=u;if(d!=="/"){let x=d.replace(/^\//,"").split("/");b="/"+u.replace(/^\//,"").split("/").slice(x.length).join("/")}let y=Wn(e,{pathname:b});ke(l||y!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),ke(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=Ji(y&&y.map(x=>Object.assign({},x,{params:Object.assign({},p,x.params),pathname:Me([d,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?d:Me([d,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),s,r,n);return t&&$?f.createElement($t.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},$):$}function qi(){let e=ns(),t=Bi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=f.createElement(f.Fragment,null,f.createElement("p",null,"💿 Hey developer 👋"),f.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",f.createElement("code",{style:s},"ErrorBoundary")," or"," ",f.createElement("code",{style:s},"errorElement")," prop on your route.")),f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:o},r):null,a)}var Ki=f.createElement(qi,null),Xi=class extends f.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?f.createElement(Le.Provider,{value:this.props.routeContext},f.createElement(zr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Qi({routeContext:e,match:t,children:r}){let n=f.useContext(it);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),f.createElement(Le.Provider,{value:e},r)}function Ji(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=r?.errors;if(s!=null){let c=o.findIndex(d=>d.route.id&&s?.[d.route.id]!==void 0);q(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,p=-1;if(r)for(let c=0;c<o.length;c++){let d=o[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(p=c),d.route.id){let{loaderData:l,errors:h}=r,g=d.route.loader&&!l.hasOwnProperty(d.route.id)&&(!h||h[d.route.id]===void 0);if(d.route.lazy||g){a=!0,p>=0?o=o.slice(0,p+1):o=[o[0]];break}}}return o.reduceRight((c,d,l)=>{let h,g=!1,u=null,b=null;r&&(h=s&&d.route.id?s[d.route.id]:void 0,u=d.route.errorElement||Ki,a&&(p<0&&l===0?(Qn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):p===l&&(g=!0,b=d.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,l+1)),$=()=>{let x;return h?x=u:g?x=b:d.route.Component?x=f.createElement(d.route.Component,null):d.route.element?x=d.route.element:x=c,f.createElement(Qi,{match:d,routeContext:{outlet:c,matches:y,isDataRoute:r!=null},children:x})};return r&&(d.route.ErrorBoundary||d.route.errorElement||l===0)?f.createElement(Xi,{location:r.location,revalidation:r.revalidation,component:u,error:h,children:$(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):$()},null)}function Lr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Zi(e){let t=f.useContext(it);return q(t,Lr(e)),t}function es(e){let t=f.useContext(Ut);return q(t,Lr(e)),t}function ts(e){let t=f.useContext(Le);return q(t,Lr(e)),t}function Tr(e){let t=ts(e),r=t.matches[t.matches.length-1];return q(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function rs(){return Tr("useRouteId")}function ns(){let e=f.useContext(zr),t=es("useRouteError"),r=Tr("useRouteError");return e!==void 0?e:t.errors?.[r]}function os(){let{router:e}=Zi("useNavigate"),t=Tr("useNavigate"),r=f.useRef(!1);return Kn(()=>{r.current=!0}),f.useCallback(async(o,s={})=>{ke(r.current,qn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...s}))},[e,t])}var Jr={};function Qn(e,t,r){!t&&!Jr[e]&&(Jr[e]=!0,ke(!1,r))}f.memo(is);function is({routes:e,future:t,state:r}){return Xn(e,void 0,r,t)}function Jn(e){q(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function ss({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:s=!1}){q(!vt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),p=f.useMemo(()=>({basename:a,navigator:o,static:s,future:{}}),[a,o,s]);typeof r=="string"&&(r=ot(r));let{pathname:c="/",search:d="",hash:l="",state:h=null,key:g="default"}=r,u=f.useMemo(()=>{let b=Ee(c,a);return b==null?null:{location:{pathname:b,search:d,hash:l,state:h,key:g},navigationType:n}},[a,c,d,l,h,g,n]);return ke(u!=null,`<Router basename="${a}"> is not able to match the URL "${c}${d}${l}" because it does not start with the basename, so the <Router> won't render anything.`),u==null?null:f.createElement(Se.Provider,{value:p},f.createElement($t.Provider,{children:t,value:u}))}function as({children:e,location:t}){return Vi(xr(e),t)}function xr(e,t=[]){let r=[];return f.Children.forEach(e,(n,o)=>{if(!f.isValidElement(n))return;let s=[...t,o];if(n.type===f.Fragment){r.push.apply(r,xr(n.props.children,s));return}q(n.type===Jn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),q(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=xr(n.props.children,s)),r.push(a)}),r}var zt="get",Lt="application/x-www-form-urlencoded";function Yt(e){return e!=null&&typeof e.tagName=="string"}function cs(e){return Yt(e)&&e.tagName.toLowerCase()==="button"}function ls(e){return Yt(e)&&e.tagName.toLowerCase()==="form"}function ds(e){return Yt(e)&&e.tagName.toLowerCase()==="input"}function us(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function hs(e,t){return e.button===0&&(!t||t==="_self")&&!us(e)}var St=null;function ps(){if(St===null)try{new FormData(document.createElement("form"),0),St=!1}catch{St=!0}return St}var ms=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function nr(e){return e!=null&&!ms.has(e)?(ke(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Lt}"`),null):e}function fs(e,t){let r,n,o,s,a;if(ls(e)){let p=e.getAttribute("action");n=p?Ee(p,t):null,r=e.getAttribute("method")||zt,o=nr(e.getAttribute("enctype"))||Lt,s=new FormData(e)}else if(cs(e)||ds(e)&&(e.type==="submit"||e.type==="image")){let p=e.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||p.getAttribute("action");if(n=c?Ee(c,t):null,r=e.getAttribute("formmethod")||p.getAttribute("method")||zt,o=nr(e.getAttribute("formenctype"))||nr(p.getAttribute("enctype"))||Lt,s=new FormData(p,e),!ps()){let{name:d,type:l,value:h}=e;if(l==="image"){let g=d?`${d}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else d&&s.append(d,h)}}else{if(Yt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=zt,n=null,o=Lt,a=e}return s&&o==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:s,body:a}}function Ir(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function gs(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function xs(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function ys(e,t,r){let n=await Promise.all(e.map(async o=>{let s=t.routes[o.route.id];if(s){let a=await gs(s,r);return a.links?a.links():[]}return[]}));return ws(n.flat(1).filter(xs).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Zr(e,t,r,n,o,s){let a=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,p=(c,d)=>r[d].pathname!==c.pathname||r[d].route.path?.endsWith("*")&&r[d].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,d)=>a(c,d)||p(c,d)):s==="data"?t.filter((c,d)=>{let l=n.routes[c.route.id];if(!l||!l.hasLoader)return!1;if(a(c,d)||p(c,d))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function bs(e,t,{includeHydrateFallback:r}={}){return $s(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let s=[o.module];return o.clientActionModule&&(s=s.concat(o.clientActionModule)),o.clientLoaderModule&&(s=s.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(s=s.concat(o.hydrateFallbackModule)),o.imports&&(s=s.concat(o.imports)),s}).flat(1))}function $s(e){return[...new Set(e)]}function vs(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function ws(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let s=JSON.stringify(vs(o));return r.has(s)||(r.add(s),n.push({key:s,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var ks=new Set([100,101,204,205]);function Ss(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Ee(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Zn(){let e=f.useContext(it);return Ir(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Cs(){let e=f.useContext(Ut);return Ir(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ar=f.createContext(void 0);Ar.displayName="FrameworkContext";function eo(){let e=f.useContext(Ar);return Ir(e,"You must render this element inside a <HydratedRouter> element"),e}function js(e,t){let r=f.useContext(Ar),[n,o]=f.useState(!1),[s,a]=f.useState(!1),{onFocus:p,onBlur:c,onMouseEnter:d,onMouseLeave:l,onTouchStart:h}=t,g=f.useRef(null);f.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let y=x=>{x.forEach(S=>{a(S.isIntersecting)})},$=new IntersectionObserver(y,{threshold:.5});return g.current&&$.observe(g.current),()=>{$.disconnect()}}},[e]),f.useEffect(()=>{if(n){let y=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(y)}}},[n]);let u=()=>{o(!0)},b=()=>{o(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:lt(p,u),onBlur:lt(c,b),onMouseEnter:lt(d,u),onMouseLeave:lt(l,b),onTouchStart:lt(h,u)}]:[!1,g,{}]}function lt(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Ps({page:e,...t}){let{router:r}=Zn(),n=f.useMemo(()=>Wn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?f.createElement(Ms,{page:e,matches:n,...t}):null}function Rs(e){let{manifest:t,routeModules:r}=eo(),[n,o]=f.useState([]);return f.useEffect(()=>{let s=!1;return ys(e,t,r).then(a=>{s||o(a)}),()=>{s=!0}},[e,t,r]),n}function Ms({page:e,matches:t,...r}){let n=Ue(),{manifest:o,routeModules:s}=eo(),{basename:a}=Zn(),{loaderData:p,matches:c}=Cs(),d=f.useMemo(()=>Zr(e,t,c,o,n,"data"),[e,t,c,o,n]),l=f.useMemo(()=>Zr(e,t,c,o,n,"assets"),[e,t,c,o,n]),h=f.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let b=new Set,y=!1;if(t.forEach(x=>{let S=o.routes[x.route.id];!S||!S.hasLoader||(!d.some(C=>C.route.id===x.route.id)&&x.route.id in p&&s[x.route.id]?.shouldRevalidate||S.hasClientLoader?y=!0:b.add(x.route.id))}),b.size===0)return[];let $=Ss(e,a);return y&&b.size>0&&$.searchParams.set("_routes",t.filter(x=>b.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[a,p,n,o,d,t,e,s]),g=f.useMemo(()=>bs(l,o),[l,o]),u=Rs(l);return f.createElement(f.Fragment,null,h.map(b=>f.createElement("link",{key:b,rel:"prefetch",as:"fetch",href:b,...r})),g.map(b=>f.createElement("link",{key:b,rel:"modulepreload",href:b,...r})),u.map(({key:b,link:y})=>f.createElement("link",{key:b,...y})))}function Es(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var to=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{to&&(window.__reactRouterVersion="7.6.3")}catch{}function zs({basename:e,children:t,window:r}){let n=f.useRef();n.current==null&&(n.current=xi({window:r,v5Compat:!0}));let o=n.current,[s,a]=f.useState({action:o.action,location:o.location}),p=f.useCallback(c=>{f.startTransition(()=>a(c))},[a]);return f.useLayoutEffect(()=>o.listen(p),[o,p]),f.createElement(ss,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o})}var ro=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,no=f.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:s,replace:a,state:p,target:c,to:d,preventScrollReset:l,viewTransition:h,...g},u){let{basename:b}=f.useContext(Se),y=typeof d=="string"&&ro.test(d),$,x=!1;if(typeof d=="string"&&y&&($=d,to))try{let G=new URL(window.location.href),J=d.startsWith("//")?new URL(G.protocol+d):new URL(d),v=Ee(J.pathname,b);J.origin===G.origin&&v!=null?d=v+J.search+J.hash:x=!0}catch{ke(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let S=Gi(d,{relative:o}),[C,w,j]=js(n,g),T=As(d,{replace:a,state:p,target:c,preventScrollReset:l,relative:o,viewTransition:h});function E(G){t&&t(G),G.defaultPrevented||T(G)}let W=f.createElement("a",{...g,...j,href:$||S,onClick:x||s?t:E,ref:Es(u,w),target:c,"data-discover":!y&&r==="render"?"true":void 0});return C&&!y?f.createElement(f.Fragment,null,W,f.createElement(Ps,{page:S})):W});no.displayName="Link";var Ls=f.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:s,to:a,viewTransition:p,children:c,...d},l){let h=wt(a,{relative:d.relative}),g=Ue(),u=f.useContext(Ut),{navigator:b,basename:y}=f.useContext(Se),$=u!=null&&Bs(h)&&p===!0,x=b.encodeLocation?b.encodeLocation(h).pathname:h.pathname,S=g.pathname,C=u&&u.navigation&&u.navigation.location?u.navigation.location.pathname:null;r||(S=S.toLowerCase(),C=C?C.toLowerCase():null,x=x.toLowerCase()),C&&y&&(C=Ee(C,y)||C);const w=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let j=S===x||!o&&S.startsWith(x)&&S.charAt(w)==="/",T=C!=null&&(C===x||!o&&C.startsWith(x)&&C.charAt(x.length)==="/"),E={isActive:j,isPending:T,isTransitioning:$},W=j?t:void 0,G;typeof n=="function"?G=n(E):G=[n,j?"active":null,T?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let J=typeof s=="function"?s(E):s;return f.createElement(no,{...d,"aria-current":W,className:G,ref:l,style:J,to:a,viewTransition:p},typeof c=="function"?c(E):c)});Ls.displayName="NavLink";var Ts=f.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:s,method:a=zt,action:p,onSubmit:c,relative:d,preventScrollReset:l,viewTransition:h,...g},u)=>{let b=Os(),y=Fs(p,{relative:d}),$=a.toLowerCase()==="get"?"get":"post",x=typeof p=="string"&&ro.test(p),S=C=>{if(c&&c(C),C.defaultPrevented)return;C.preventDefault();let w=C.nativeEvent.submitter,j=w?.getAttribute("formmethod")||a;b(w||C.currentTarget,{fetcherKey:t,method:j,navigate:r,replace:o,state:s,relative:d,preventScrollReset:l,viewTransition:h})};return f.createElement("form",{ref:u,method:$,action:y,onSubmit:n?c:S,...g,"data-discover":!x&&e==="render"?"true":void 0})});Ts.displayName="Form";function Is(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function oo(e){let t=f.useContext(it);return q(t,Is(e)),t}function As(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:s,viewTransition:a}={}){let p=Ui(),c=Ue(),d=wt(e,{relative:s});return f.useCallback(l=>{if(hs(l,t)){l.preventDefault();let h=r!==void 0?r:gt(c)===gt(d);p(e,{replace:h,state:n,preventScrollReset:o,relative:s,viewTransition:a})}},[c,p,d,r,n,t,e,o,s,a])}var Ds=0,Ns=()=>`__${String(++Ds)}__`;function Os(){let{router:e}=oo("useSubmit"),{basename:t}=f.useContext(Se),r=rs();return f.useCallback(async(n,o={})=>{let{action:s,method:a,encType:p,formData:c,body:d}=fs(n,t);if(o.navigate===!1){let l=o.fetcherKey||Ns();await e.fetch(l,r,o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||p,flushSync:o.flushSync})}else await e.navigate(o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||p,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Fs(e,{relative:t}={}){let{basename:r}=f.useContext(Se),n=f.useContext(Le);q(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),s={...wt(e||".",{relative:t})},a=Ue();if(e==null){s.search=a.search;let p=new URLSearchParams(s.search),c=p.getAll("index");if(c.some(l=>l==="")){p.delete("index"),c.filter(h=>h).forEach(h=>p.append("index",h));let l=p.toString();s.search=l?`?${l}`:""}}return(!e||e===".")&&o.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Me([r,s.pathname])),gt(s)}function Bs(e,t={}){let r=f.useContext(Vn);q(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=oo("useViewTransitionState"),o=wt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Ee(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Ee(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Ot(o.pathname,a)!=null||Ot(o.pathname,s)!=null}[...ks];const io={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Ws={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Hs={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},so={colors:Ws,...io},_s={colors:Hs,...io},Gs={light:so,dark:_s},Us=so;var oe=function(){return oe=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},oe.apply(this,arguments)};function xt(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var U="-ms-",ft="-moz-",B="-webkit-",ao="comm",Vt="rule",Dr="decl",Ys="@import",co="@keyframes",Vs="@layer",lo=Math.abs,Nr=String.fromCharCode,yr=Object.assign;function qs(e,t){return ne(e,0)^45?(((t<<2^ne(e,0))<<2^ne(e,1))<<2^ne(e,2))<<2^ne(e,3):0}function uo(e){return e.trim()}function Re(e,t){return(e=t.exec(e))?e[0]:e}function D(e,t,r){return e.replace(t,r)}function Tt(e,t,r){return e.indexOf(t,r)}function ne(e,t){return e.charCodeAt(t)|0}function Ze(e,t,r){return e.slice(t,r)}function ve(e){return e.length}function ho(e){return e.length}function dt(e,t){return t.push(e),e}function Ks(e,t){return e.map(t).join("")}function en(e,t){return e.filter(function(r){return!Re(r,t)})}var qt=1,et=1,po=0,xe=0,Z=0,st="";function Kt(e,t,r,n,o,s,a,p){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:qt,column:et,length:a,return:"",siblings:p}}function Ae(e,t){return yr(Kt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ve(e){for(;e.root;)e=Ae(e.root,{children:[e]});dt(e,e.siblings)}function Xs(){return Z}function Qs(){return Z=xe>0?ne(st,--xe):0,et--,Z===10&&(et=1,qt--),Z}function ye(){return Z=xe<po?ne(st,xe++):0,et++,Z===10&&(et=1,qt++),Z}function We(){return ne(st,xe)}function It(){return xe}function Xt(e,t){return Ze(st,e,t)}function br(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Js(e){return qt=et=1,po=ve(st=e),xe=0,[]}function Zs(e){return st="",e}function or(e){return uo(Xt(xe-1,$r(e===91?e+2:e===40?e+1:e)))}function ea(e){for(;(Z=We())&&Z<33;)ye();return br(e)>2||br(Z)>3?"":" "}function ta(e,t){for(;--t&&ye()&&!(Z<48||Z>102||Z>57&&Z<65||Z>70&&Z<97););return Xt(e,It()+(t<6&&We()==32&&ye()==32))}function $r(e){for(;ye();)switch(Z){case e:return xe;case 34:case 39:e!==34&&e!==39&&$r(Z);break;case 40:e===41&&$r(e);break;case 92:ye();break}return xe}function ra(e,t){for(;ye()&&e+Z!==57;)if(e+Z===84&&We()===47)break;return"/*"+Xt(t,xe-1)+"*"+Nr(e===47?e:ye())}function na(e){for(;!br(We());)ye();return Xt(e,xe)}function oa(e){return Zs(At("",null,null,null,[""],e=Js(e),0,[0],e))}function At(e,t,r,n,o,s,a,p,c){for(var d=0,l=0,h=a,g=0,u=0,b=0,y=1,$=1,x=1,S=0,C="",w=o,j=s,T=n,E=C;$;)switch(b=S,S=ye()){case 40:if(b!=108&&ne(E,h-1)==58){Tt(E+=D(or(S),"&","&\f"),"&\f",lo(d?p[d-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:E+=or(S);break;case 9:case 10:case 13:case 32:E+=ea(b);break;case 92:E+=ta(It()-1,7);continue;case 47:switch(We()){case 42:case 47:dt(ia(ra(ye(),It()),t,r,c),c);break;default:E+="/"}break;case 123*y:p[d++]=ve(E)*x;case 125*y:case 59:case 0:switch(S){case 0:case 125:$=0;case 59+l:x==-1&&(E=D(E,/\f/g,"")),u>0&&ve(E)-h&&dt(u>32?rn(E+";",n,r,h-1,c):rn(D(E," ","")+";",n,r,h-2,c),c);break;case 59:E+=";";default:if(dt(T=tn(E,t,r,d,l,o,p,C,w=[],j=[],h,s),s),S===123)if(l===0)At(E,t,T,T,w,s,h,p,j);else switch(g===99&&ne(E,3)===110?100:g){case 100:case 108:case 109:case 115:At(e,T,T,n&&dt(tn(e,T,T,0,0,o,p,C,o,w=[],h,j),j),o,j,h,p,n?w:j);break;default:At(E,T,T,T,[""],j,0,p,j)}}d=l=u=0,y=x=1,C=E="",h=a;break;case 58:h=1+ve(E),u=b;default:if(y<1){if(S==123)--y;else if(S==125&&y++==0&&Qs()==125)continue}switch(E+=Nr(S),S*y){case 38:x=l>0?1:(E+="\f",-1);break;case 44:p[d++]=(ve(E)-1)*x,x=1;break;case 64:We()===45&&(E+=or(ye())),g=We(),l=h=ve(C=E+=na(It())),S++;break;case 45:b===45&&ve(E)==2&&(y=0)}}return s}function tn(e,t,r,n,o,s,a,p,c,d,l,h){for(var g=o-1,u=o===0?s:[""],b=ho(u),y=0,$=0,x=0;y<n;++y)for(var S=0,C=Ze(e,g+1,g=lo($=a[y])),w=e;S<b;++S)(w=uo($>0?u[S]+" "+C:D(C,/&\f/g,u[S])))&&(c[x++]=w);return Kt(e,t,r,o===0?Vt:p,c,d,l,h)}function ia(e,t,r,n){return Kt(e,t,r,ao,Nr(Xs()),Ze(e,2,-2),0,n)}function rn(e,t,r,n,o){return Kt(e,t,r,Dr,Ze(e,0,n),Ze(e,n+1,-1),n,o)}function mo(e,t,r){switch(qs(e,t)){case 5103:return B+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return B+e+e;case 4789:return ft+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return B+e+ft+e+U+e+e;case 5936:switch(ne(e,t+11)){case 114:return B+e+U+D(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return B+e+U+D(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return B+e+U+D(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return B+e+U+e+e;case 6165:return B+e+U+"flex-"+e+e;case 5187:return B+e+D(e,/(\w+).+(:[^]+)/,B+"box-$1$2"+U+"flex-$1$2")+e;case 5443:return B+e+U+"flex-item-"+D(e,/flex-|-self/g,"")+(Re(e,/flex-|baseline/)?"":U+"grid-row-"+D(e,/flex-|-self/g,""))+e;case 4675:return B+e+U+"flex-line-pack"+D(e,/align-content|flex-|-self/g,"")+e;case 5548:return B+e+U+D(e,"shrink","negative")+e;case 5292:return B+e+U+D(e,"basis","preferred-size")+e;case 6060:return B+"box-"+D(e,"-grow","")+B+e+U+D(e,"grow","positive")+e;case 4554:return B+D(e,/([^-])(transform)/g,"$1"+B+"$2")+e;case 6187:return D(D(D(e,/(zoom-|grab)/,B+"$1"),/(image-set)/,B+"$1"),e,"")+e;case 5495:case 3959:return D(e,/(image-set\([^]*)/,B+"$1$`$1");case 4968:return D(D(e,/(.+:)(flex-)?(.*)/,B+"box-pack:$3"+U+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+B+e+e;case 4200:if(!Re(e,/flex-|baseline/))return U+"grid-column-align"+Ze(e,t)+e;break;case 2592:case 3360:return U+D(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,Re(n.props,/grid-\w+-end/)})?~Tt(e+(r=r[t].value),"span",0)?e:U+D(e,"-start","")+e+U+"grid-row-span:"+(~Tt(r,"span",0)?Re(r,/\d+/):+Re(r,/\d+/)-+Re(e,/\d+/))+";":U+D(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return Re(n.props,/grid-\w+-start/)})?e:U+D(D(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return D(e,/(.+)-inline(.+)/,B+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ve(e)-1-t>6)switch(ne(e,t+1)){case 109:if(ne(e,t+4)!==45)break;case 102:return D(e,/(.+:)(.+)-([^]+)/,"$1"+B+"$2-$3$1"+ft+(ne(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Tt(e,"stretch",0)?mo(D(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return D(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,p,c,d){return U+o+":"+s+d+(a?U+o+"-span:"+(p?c:+c-+s)+d:"")+e});case 4949:if(ne(e,t+6)===121)return D(e,":",":"+B)+e;break;case 6444:switch(ne(e,ne(e,14)===45?18:11)){case 120:return D(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+B+(ne(e,14)===45?"inline-":"")+"box$3$1"+B+"$2$3$1"+U+"$2box$3")+e;case 100:return D(e,":",":"+U)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return D(e,"scroll-","scroll-snap-")+e}return e}function Ft(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function sa(e,t,r,n){switch(e.type){case Vs:if(e.children.length)break;case Ys:case Dr:return e.return=e.return||e.value;case ao:return"";case co:return e.return=e.value+"{"+Ft(e.children,n)+"}";case Vt:if(!ve(e.value=e.props.join(",")))return""}return ve(r=Ft(e.children,n))?e.return=e.value+"{"+r+"}":""}function aa(e){var t=ho(e);return function(r,n,o,s){for(var a="",p=0;p<t;p++)a+=e[p](r,n,o,s)||"";return a}}function ca(e){return function(t){t.root||(t=t.return)&&e(t)}}function la(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Dr:e.return=mo(e.value,e.length,r);return;case co:return Ft([Ae(e,{value:D(e.value,"@","@"+B)})],n);case Vt:if(e.length)return Ks(r=e.props,function(o){switch(Re(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ve(Ae(e,{props:[D(o,/:(read-\w+)/,":"+ft+"$1")]})),Ve(Ae(e,{props:[o]})),yr(e,{props:en(r,n)});break;case"::placeholder":Ve(Ae(e,{props:[D(o,/:(plac\w+)/,":"+B+"input-$1")]})),Ve(Ae(e,{props:[D(o,/:(plac\w+)/,":"+ft+"$1")]})),Ve(Ae(e,{props:[D(o,/:(plac\w+)/,U+"input-$1")]})),Ve(Ae(e,{props:[o]})),yr(e,{props:en(r,n)});break}return""})}}var da={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},tt=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",fo="active",go="data-styled-version",Qt="6.1.19",Or=`/*!sc*/
`,Bt=typeof window<"u"&&typeof document<"u",ua=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),ha={},Jt=Object.freeze([]),rt=Object.freeze({});function xo(e,t,r){return r===void 0&&(r=rt),e.theme!==r.theme&&e.theme||t||r.theme}var yo=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),pa=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ma=/(^-|-$)/g;function nn(e){return e.replace(pa,"-").replace(ma,"")}var fa=/(a)(d)/gi,Ct=52,on=function(e){return String.fromCharCode(e+(e>25?39:97))};function vr(e){var t,r="";for(t=Math.abs(e);t>Ct;t=t/Ct|0)r=on(t%Ct)+r;return(on(t%Ct)+r).replace(fa,"$1-$2")}var ir,bo=5381,Xe=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},$o=function(e){return Xe(bo,e)};function vo(e){return vr($o(e)>>>0)}function ga(e){return e.displayName||e.name||"Component"}function sr(e){return typeof e=="string"&&!0}var wo=typeof Symbol=="function"&&Symbol.for,ko=wo?Symbol.for("react.memo"):60115,xa=wo?Symbol.for("react.forward_ref"):60112,ya={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ba={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},So={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},$a=((ir={})[xa]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ir[ko]=So,ir);function sn(e){return("type"in(t=e)&&t.type.$$typeof)===ko?So:"$$typeof"in e?$a[e.$$typeof]:ya;var t}var va=Object.defineProperty,wa=Object.getOwnPropertyNames,an=Object.getOwnPropertySymbols,ka=Object.getOwnPropertyDescriptor,Sa=Object.getPrototypeOf,cn=Object.prototype;function Co(e,t,r){if(typeof t!="string"){if(cn){var n=Sa(t);n&&n!==cn&&Co(e,n,r)}var o=wa(t);an&&(o=o.concat(an(t)));for(var s=sn(e),a=sn(t),p=0;p<o.length;++p){var c=o[p];if(!(c in ba||r&&r[c]||a&&c in a||s&&c in s)){var d=ka(t,c);try{va(e,c,d)}catch{}}}}return e}function He(e){return typeof e=="function"}function Fr(e){return typeof e=="object"&&"styledComponentId"in e}function Be(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function wr(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function yt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function kr(e,t,r){if(r===void 0&&(r=!1),!r&&!yt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=kr(e[n],t[n]);else if(yt(t))for(var n in t)e[n]=kr(e[n],t[n]);return e}function Br(e,t){Object.defineProperty(e,"toString",{value:t})}function _e(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Ca=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw _e(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var p=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(p,r[a])&&(this.groupSizes[t]++,p++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Or);return r},e}(),Dt=new Map,Wt=new Map,Nt=1,jt=function(e){if(Dt.has(e))return Dt.get(e);for(;Wt.has(Nt);)Nt++;var t=Nt++;return Dt.set(e,t),Wt.set(t,e),t},ja=function(e,t){Nt=t+1,Dt.set(e,t),Wt.set(t,e)},Pa="style[".concat(tt,"][").concat(go,'="').concat(Qt,'"]'),Ra=new RegExp("^".concat(tt,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ma=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},Ea=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Or),o=[],s=0,a=n.length;s<a;s++){var p=n[s].trim();if(p){var c=p.match(Ra);if(c){var d=0|parseInt(c[1],10),l=c[2];d!==0&&(ja(l,d),Ma(e,l,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(p)}}},ln=function(e){for(var t=document.querySelectorAll(Pa),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(tt)!==fo&&(Ea(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function za(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var jo=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(p){var c=Array.from(p.querySelectorAll("style[".concat(tt,"]")));return c[c.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(tt,fo),n.setAttribute(go,Qt);var a=za();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},La=function(){function e(t){this.element=jo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var a=n[o];if(a.ownerNode===r)return a}throw _e(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Ta=function(){function e(t){this.element=jo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Ia=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),dn=Bt,Aa={isServer:!Bt,useCSSOMInjection:!ua},Ht=function(){function e(t,r,n){t===void 0&&(t=rt),r===void 0&&(r={});var o=this;this.options=oe(oe({},Aa),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Bt&&dn&&(dn=!1,ln(this)),Br(this,function(){return function(s){for(var a=s.getTag(),p=a.length,c="",d=function(h){var g=function(x){return Wt.get(x)}(h);if(g===void 0)return"continue";var u=s.names.get(g),b=a.getGroup(h);if(u===void 0||!u.size||b.length===0)return"continue";var y="".concat(tt,".g").concat(h,'[id="').concat(g,'"]'),$="";u!==void 0&&u.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(b).concat(y,'{content:"').concat($,'"}').concat(Or)},l=0;l<p;l++)d(l);return c}(o)})}return e.registerId=function(t){return jt(t)},e.prototype.rehydrate=function(){!this.server&&Bt&&ln(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(oe(oe({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Ia(o):n?new La(o):new Ta(o)}(this.options),new Ca(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(jt(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(jt(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(jt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Da=/&/g,Na=/^\s*\/\/.*$/gm;function Po(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Po(r.children,t)),r})}function Oa(e){var t,r,n,o=rt,s=o.options,a=s===void 0?rt:s,p=o.plugins,c=p===void 0?Jt:p,d=function(g,u,b){return b.startsWith(r)&&b.endsWith(r)&&b.replaceAll(r,"").length>0?".".concat(t):g},l=c.slice();l.push(function(g){g.type===Vt&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Da,r).replace(n,d))}),a.prefix&&l.push(la),l.push(sa);var h=function(g,u,b,y){u===void 0&&(u=""),b===void 0&&(b=""),y===void 0&&(y="&"),t=y,r=u,n=new RegExp("\\".concat(r,"\\b"),"g");var $=g.replace(Na,""),x=oa(b||u?"".concat(b," ").concat(u," { ").concat($," }"):$);a.namespace&&(x=Po(x,a.namespace));var S=[];return Ft(x,aa(l.concat(ca(function(C){return S.push(C)})))),S};return h.hash=c.length?c.reduce(function(g,u){return u.name||_e(15),Xe(g,u.name)},bo).toString():"",h}var Fa=new Ht,Sr=Oa(),Ro=V.createContext({shouldForwardProp:void 0,styleSheet:Fa,stylis:Sr});Ro.Consumer;V.createContext(void 0);function Cr(){return f.useContext(Ro)}var Ba=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=Sr);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Br(this,function(){throw _e(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Sr),this.name+t.hash},e}(),Wa=function(e){return e>="A"&&e<="Z"};function un(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Wa(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Mo=function(e){return e==null||e===!1||e===""},Eo=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!Mo(s)&&(Array.isArray(s)&&s.isCss||He(s)?n.push("".concat(un(o),":"),s,";"):yt(s)?n.push.apply(n,xt(xt(["".concat(o," {")],Eo(s),!1),["}"],!1)):n.push("".concat(un(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in da||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function De(e,t,r,n){if(Mo(e))return[];if(Fr(e))return[".".concat(e.styledComponentId)];if(He(e)){if(!He(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return De(o,t,r,n)}var s;return e instanceof Ba?r?(e.inject(r,n),[e.getName(n)]):[e]:yt(e)?Eo(e):Array.isArray(e)?Array.prototype.concat.apply(Jt,e.map(function(a){return De(a,t,r,n)})):[e.toString()]}function zo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(He(r)&&!Fr(r))return!1}return!0}var Ha=$o(Qt),_a=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&zo(t),this.componentId=r,this.baseHash=Xe(Ha,r),this.baseStyle=n,Ht.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Be(o,this.staticRulesId);else{var s=wr(De(this.rules,t,r,n)),a=vr(Xe(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var p=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,p)}o=Be(o,a),this.staticRulesId=a}else{for(var c=Xe(this.baseHash,n.hash),d="",l=0;l<this.rules.length;l++){var h=this.rules[l];if(typeof h=="string")d+=h;else if(h){var g=wr(De(h,t,r,n));c=Xe(c,g+l),d+=g}}if(d){var u=vr(c>>>0);r.hasNameForId(this.componentId,u)||r.insertRules(this.componentId,u,n(d,".".concat(u),void 0,this.componentId)),o=Be(o,u)}}return o},e}(),bt=V.createContext(void 0);bt.Consumer;function Ga(e){var t=V.useContext(bt),r=f.useMemo(function(){return function(n,o){if(!n)throw _e(14);if(He(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw _e(8);return o?oe(oe({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?V.createElement(bt.Provider,{value:r},e.children):null}var ar={};function Ua(e,t,r){var n=Fr(e),o=e,s=!sr(e),a=t.attrs,p=a===void 0?Jt:a,c=t.componentId,d=c===void 0?function(w,j){var T=typeof w!="string"?"sc":nn(w);ar[T]=(ar[T]||0)+1;var E="".concat(T,"-").concat(vo(Qt+T+ar[T]));return j?"".concat(j,"-").concat(E):E}(t.displayName,t.parentComponentId):c,l=t.displayName,h=l===void 0?function(w){return sr(w)?"styled.".concat(w):"Styled(".concat(ga(w),")")}(e):l,g=t.displayName&&t.componentId?"".concat(nn(t.displayName),"-").concat(t.componentId):t.componentId||d,u=n&&o.attrs?o.attrs.concat(p).filter(Boolean):p,b=t.shouldForwardProp;if(n&&o.shouldForwardProp){var y=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;b=function(w,j){return y(w,j)&&$(w,j)}}else b=y}var x=new _a(r,g,n?o.componentStyle:void 0);function S(w,j){return function(T,E,W){var G=T.attrs,J=T.componentStyle,v=T.defaultProps,O=T.foldedComponentIds,F=T.styledComponentId,I=T.target,H=V.useContext(bt),ee=Cr(),ce=T.shouldForwardProp||ee.shouldForwardProp,je=xo(E,H,v)||rt,Y=function(Pe,fe,k){for(var L,M=oe(oe({},fe),{className:void 0,theme:k}),z=0;z<Pe.length;z+=1){var P=He(L=Pe[z])?L(M):L;for(var R in P)M[R]=R==="className"?Be(M[R],P[R]):R==="style"?oe(oe({},M[R]),P[R]):P[R]}return fe.className&&(M.className=Be(M.className,fe.className)),M}(G,E,je),se=Y.as||I,ae={};for(var te in Y)Y[te]===void 0||te[0]==="$"||te==="as"||te==="theme"&&Y.theme===je||(te==="forwardedAs"?ae.as=Y.forwardedAs:ce&&!ce(te,se)||(ae[te]=Y[te]));var me=function(Pe,fe){var k=Cr(),L=Pe.generateAndInjectStyles(fe,k.styleSheet,k.stylis);return L}(J,Y),de=Be(O,F);return me&&(de+=" "+me),Y.className&&(de+=" "+Y.className),ae[sr(se)&&!yo.has(se)?"class":"className"]=de,W&&(ae.ref=W),f.createElement(se,ae)}(C,w,j)}S.displayName=h;var C=V.forwardRef(S);return C.attrs=u,C.componentStyle=x,C.displayName=h,C.shouldForwardProp=b,C.foldedComponentIds=n?Be(o.foldedComponentIds,o.styledComponentId):"",C.styledComponentId=g,C.target=n?o.target:e,Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(w){this._foldedDefaultProps=n?function(j){for(var T=[],E=1;E<arguments.length;E++)T[E-1]=arguments[E];for(var W=0,G=T;W<G.length;W++)kr(j,G[W],!0);return j}({},o.defaultProps,w):w}}),Br(C,function(){return".".concat(C.styledComponentId)}),s&&Co(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),C}function hn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var pn=function(e){return Object.assign(e,{isCss:!0})};function we(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(He(e)||yt(e))return pn(De(hn(Jt,xt([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?De(n):pn(De(hn(n,t)))}function jr(e,t,r){if(r===void 0&&(r=rt),!t)throw _e(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,we.apply(void 0,xt([o],s,!1)))};return n.attrs=function(o){return jr(e,t,oe(oe({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return jr(e,t,oe(oe({},r),o))},n}var Lo=function(e){return jr(Ua,e)},m=Lo;yo.forEach(function(e){m[e]=Lo(e)});var Ya=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=zo(t),Ht.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o(wr(De(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Ht.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Va(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=we.apply(void 0,xt([e],t,!1)),o="sc-global-".concat(vo(JSON.stringify(n))),s=new Ya(n,o),a=function(c){var d=Cr(),l=V.useContext(bt),h=V.useRef(d.styleSheet.allocateGSInstance(o)).current;return d.styleSheet.server&&p(h,c,d.styleSheet,l,d.stylis),V.useLayoutEffect(function(){if(!d.styleSheet.server)return p(h,c,d.styleSheet,l,d.stylis),function(){return s.removeStyles(h,d.styleSheet)}},[h,c,d.styleSheet,l,d.stylis]),null};function p(c,d,l,h,g){if(s.isStatic)s.renderStyles(c,ha,l,g);else{var u=oe(oe({},d),{theme:xo(d,h,a.defaultProps)});s.renderStyles(c,u,l,g)}}return V.memo(a)}const To=f.createContext(void 0),Io=()=>{const e=f.useContext(To);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},qa=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Ka=X(({children:e})=>{const t=Oe(),r=t.preferences.theme||"system",o=r==="system"?qa():r,s=Gs[o]||Us,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},p={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return f.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),d=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",d),()=>c.removeEventListener("change",d)}},[r,t]),f.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([d,l])=>{typeof l=="string"?c.style.setProperty(`--color-${d}`,l):typeof l=="object"&&l!==null&&Object.entries(l).forEach(([h,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${d}-${h}`,g)})}),Object.entries(a.spacing).forEach(([d,l])=>{c.style.setProperty(`--spacing-${d}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),i.jsx(To.Provider,{value:p,children:i.jsx(Ga,{theme:a,children:e})})});function Xa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Qa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var cr=typeof window<"u",Ja=function(e){f.useEffect(e,[])},Za=function(e){var t=f.useRef(e);t.current=e,Ja(function(){return function(){return t.current()}})},ec=function(e){var t=f.useRef(0),r=f.useState(e),n=r[0],o=r[1],s=f.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Za(function(){cancelAnimationFrame(t.current)}),[n,s]},Ao=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,s=o===void 0?1/0:o,a=t.onChange,p=ec({width:cr?window.innerWidth:n,height:cr?window.innerHeight:s}),c=p[0],d=p[1];return f.useEffect(function(){if(cr){var l=function(){var h=window.innerWidth,g=window.innerHeight;d({width:h,height:g}),a&&a(h,g)};return Xa(window,"resize",l),function(){Qa(window,"resize",l)}}},[]),c};const Wr=()=>{const{width:e=0,height:t=0}=Ao();return{width:e,height:t}},tc=()=>{const{width:e=0,height:t=0}=Ao();return e>t?"landscape":"portrait"},rc=()=>{const{width:e}=Wr(),{theme:t}=Io(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Do=()=>{const[e,t]=f.useState(!1);return f.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},nc=()=>{const[e,t]=f.useState(!1),r=Do(),{width:n}=Wr();return f.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),p=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||p&&c})())},[r,n]),e},Fe=()=>{const e=Wr(),t=tc(),r=rc(),n=Do(),o=nc();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},No=()=>{const e=Fe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Oo=()=>{const e=Fe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},oc=()=>{const e=Fe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},ic=f.createContext(void 0),sc=({children:e})=>{const t=Oe(),r=Fe(),[n,o]=f.useState(!0),[s,a]=f.useState(["chat","moves"]),[p,c]=f.useState(!1),d=t.preferences.layout,l=f.useMemo(()=>d==="auto"?r.orientation:d,[d,r.orientation]),h=f.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=y=>{t.updatePreference("layout",y)},u=y=>{a($=>$.includes(y)?$.filter(x=>x!==y):[...$,y])};f.useEffect(()=>{c(!0),o($=>{const x=!h;return $!==x?x:$}),a($=>{if(h&&l==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(l==="landscape"&&!h){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const y=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(y)},[l,h]);const b={...r,layoutPreference:d,setLayoutPreference:g,activeLayout:l,isCompactMode:h,showSidebar:n,setSidebarVisible:o,activePanels:s,togglePanel:u,isTransitioning:p};return i.jsx(ic.Provider,{value:b,children:e})};m.div`
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
`;const ac=m.input`
  display: none;
`,cc=m.button`
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
`,lc=({settingId:e,onUpload:t})=>{const r=f.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const d=new FileReader;d.onload=l=>{const h=l.target?.result;t(e,h,a.name)},d.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return i.jsxs(i.Fragment,{children:[i.jsx(ac,{ref:r,type:"file",accept:"audio/*",onChange:n}),i.jsx(cc,{type:"button",onClick:o,children:"Upload"})]})},dc=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,uc=m.div`
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
`,hc=m.div`
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
`,pc=m.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,mc=m.button`
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
`,fc=m.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,gc=m.input`
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
`,xc=m.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,yc=m.div`
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
`,bc=m.button`
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
`,$c=m.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,vc=m.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,wc=m.div`
  margin-bottom: ${e=>e.theme.spacing[6]};
`,mn=m.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[3]} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`,kc=m.div`
  flex: 1;
  margin-right: ${e=>e.theme.spacing[4]};
`,fn=m.label`
  display: block;
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[1]};
`,gn=m.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,Sc=m.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,Cc=m.input`
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
`,jc=m.select`
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
`,Pc=m.input`
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
`,Rc=m.input`
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
`,Mc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Ec=m.textarea`
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
`,zc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,Lc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Tc=m.button`
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
`,xn=m.button`
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
`,Ic=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Ac=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Dc=m.p`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,lr=m.button`
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
`,Fo=X(({isOpen:e,onClose:t})=>{const r=Oe(),{settingsRegistry:n}=r,o=Fe(),s=o.isMobileDevice||o.dimensions.width<768,[a,p]=f.useState("board"),[c,d]=f.useState(""),[l,h]=f.useState({}),[g,u]=f.useState({x:0,y:0}),[b,y]=f.useState(!1),[$,x]=f.useState({x:0,y:0}),S=f.useRef(null);if(f.useEffect(()=>{if(e&&S.current&&!s){const v=S.current.getBoundingClientRect();u({x:(window.innerWidth-v.width)/2,y:(window.innerHeight-v.height)/2})}},[e,s]),f.useEffect(()=>{if(!b)return;const v=F=>{u({x:F.clientX-$.x,y:F.clientY-$.y})},O=()=>{y(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",O),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",O)}},[b,$]),!e)return null;const C=n.getAllCategories(),w=c?n.search(c):n.getByCategory(a),j=(v,O)=>{const F=n.get(v);if(F){if(F.validate){const I=F.validate(O);if(typeof I=="string"){h(H=>({...H,[v]:I}));return}else if(I===!1){h(H=>({...H,[v]:"Invalid value"}));return}}h(I=>{const H={...I};return delete H[v],H}),F.value=O,F.onChange?.(O),v in r.preferences&&r.updatePreference(v,O)}},T=v=>{const O=n.get(v);O&&j(v,O.defaultValue)},E=(v,O,F)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),H=`custom_${v}_${Date.now()}`;I[H]={dataUrl:O,fileName:F,settingId:v,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),j(v,H);const ee=n.get(v);if(ee&&ee.options){const ce={label:`Custom: ${F}`,value:H},je=ee.options.filter(Y=>!Y.value.startsWith("custom_"));ee.options=[...je,ce]}},W=v=>{if(!(!v||v==="none"))try{let O;if(v.startsWith("custom_")){const H=JSON.parse(localStorage.getItem("customSounds")||"{}")[v];if(H&&H.dataUrl)O=H.dataUrl;else{console.error("Custom sound not found:",v);return}}else O=`/sounds/${v}`;const F=new Audio(O);F.volume=.5,F.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(O){console.error("Error playing sound:",O)}},G=v=>{s||(y(!0),x({x:v.clientX-g.x,y:v.clientY-g.y}))},J=v=>{switch(v.type){case"boolean":return i.jsx(Cc,{type:"checkbox",checked:v.value,onChange:I=>j(v.id,I.target.checked),$isMobile:s});case"select":if(v.id.endsWith("SoundFile")){const I=v.options?.find(ce=>ce.value===v.value),H=I?I.label:"None",ee=v.value&&v.value!=="none";return i.jsxs(Mc,{children:[i.jsx(Lc,{children:H}),i.jsx(Tc,{type:"button",onClick:()=>W(v.value),disabled:!ee,title:ee?"Play sound":"No sound selected",children:"▶️ Play"}),i.jsx(lc,{settingId:v.id,onUpload:E})]})}else return i.jsx(jc,{value:v.value,onChange:I=>j(v.id,I.target.value),children:v.options?.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return i.jsx(Pc,{type:"number",value:v.value,min:v.min,max:v.max,step:v.step,onChange:I=>j(v.id,Number(I.target.value))});case"color":return i.jsx(Rc,{type:"color",value:v.value,onChange:I=>j(v.id,I.target.value),$isMobile:s});case"text":const F=!!l[v.id];return i.jsxs("div",{style:{width:"100%"},children:[i.jsx(Ec,{value:v.value||"",onChange:I=>j(v.id,I.target.value),className:F?"error":"",placeholder:v.placeholder||"",spellCheck:!1}),F&&i.jsx(zc,{children:l[v.id]})]});default:return null}};return i.jsx(dc,{children:i.jsxs(uc,{ref:S,$x:g.x,$y:g.y,$isMobile:s,children:[i.jsxs(hc,{onMouseDown:G,children:[i.jsx(pc,{children:"⚙️ Settings"}),i.jsx(mc,{onClick:t,onMouseDown:v=>v.stopPropagation(),children:"✕"})]}),i.jsx(fc,{children:i.jsx(gc,{type:"text",placeholder:"Search settings...",value:c,onChange:v=>d(v.target.value)})}),i.jsxs(xc,{$isMobile:s,children:[i.jsx(yc,{$isMobile:s,children:C.map(v=>i.jsxs(bc,{$active:a===v.id&&!c,$isMobile:s,onClick:()=>{p(v.id),d("")},children:[i.jsx($c,{children:v.icon}),!s&&v.label]},v.id))}),i.jsxs(vc,{children:[c&&i.jsxs(Dc,{children:["Found ",w.length,' settings matching "',c,'"']}),i.jsx(wc,{children:w.map(v=>v.type==="text"?i.jsxs(mn,{style:{flexDirection:"column",alignItems:"stretch"},children:[i.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{children:[i.jsx(fn,{children:v.label}),v.description&&i.jsx(gn,{children:v.description})]}),v.value!==v.defaultValue&&i.jsx(xn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),J(v)]},v.id):i.jsxs(mn,{children:[i.jsxs(kc,{children:[i.jsx(fn,{children:v.label}),v.description&&i.jsx(gn,{children:v.description})]}),i.jsxs(Sc,{children:[J(v),v.value!==v.defaultValue&&i.jsx(xn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",children:"↻"})]})]},v.id))})]})]}),i.jsxs(Ic,{children:[i.jsx(lr,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),i.jsxs(Ac,{children:[i.jsx(lr,{onClick:t,children:"Cancel"}),i.jsx(lr,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});Fo.displayName="SettingsDialog";const Nc=m.header`
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
`,Oc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Fc=m.button`
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
`,Bc=m.div`
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
`,qe=m.button`
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
`,Ke=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
`,dr=m.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,ur=m.div`
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
`,yn=m.hr`
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
`;const Wc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Hc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,_c=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Gc=m.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,hr=m.button`
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
`,Bo=X(({onMenuClick:e})=>{const{preferencesStore:t}=ze(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:s}=Io(),a=No(),p=Oo(),[c,d]=f.useState(!1),[l,h]=f.useState(!1),[g,u]=f.useState(null),b=j=>{t.updatePreference("viewMode",j),h(!1),u(null)},y=j=>{t.updatePreference("chessOrientation",j),h(!1),u(null)},$=j=>{s(j),h(!1),u(null)},x=()=>{h(!l),u(null)},S=()=>{d(!0),h(!1),u(null)},C=j=>{u(j)},w=r==="chat-only";return V.useEffect(()=>{const j=T=>{const E=T.target;l&&!E.closest(".hamburger-menu-container")&&h(!1)};if(l)return document.addEventListener("click",j),()=>document.removeEventListener("click",j)},[l]),V.useEffect(()=>{const j=T=>{(T.ctrlKey||T.metaKey)&&T.key===","&&(T.preventDefault(),d(!0))};return window.addEventListener("keydown",j),()=>{window.removeEventListener("keydown",j)}},[]),i.jsxs(Nc,{children:[i.jsx(Oc,{children:i.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[i.jsx(Fc,{onClick:x,"aria-label":"Menu",children:"☰"}),i.jsxs(Bc,{$isOpen:l,children:[i.jsxs(qe,{$hasSubmenu:!0,onMouseEnter:()=>C("theme"),onMouseLeave:()=>u(null),children:[i.jsx(Ke,{children:"🎨 Theme"}),i.jsx(dr,{children:"▶"}),i.jsxs(ur,{$isOpen:g==="theme",children:[i.jsx(Ie,{$isActive:o==="light",onClick:()=>$("light"),children:"☀ Light"}),i.jsx(Ie,{$isActive:o==="dark",onClick:()=>$("dark"),children:"☾ Dark"}),i.jsx(Ie,{$isActive:o==="system",onClick:()=>$("system"),children:"◐ System"})]})]}),i.jsxs(qe,{$hasSubmenu:!0,onMouseEnter:()=>C("orientation"),onMouseLeave:()=>u(null),children:[i.jsx(Ke,{children:"📐 Orientation"}),i.jsx(dr,{children:"▶"}),i.jsxs(ur,{$isOpen:g==="orientation",children:[p.includes("landscape")&&i.jsx(Ie,{$isActive:n==="landscape",onClick:()=>!w&&y("landscape"),disabled:w,style:{opacity:w?.5:1},children:"▭ Landscape"}),p.includes("portrait")&&i.jsx(Ie,{$isActive:n==="portrait",onClick:()=>!w&&y("portrait"),disabled:w,style:{opacity:w?.5:1},children:"▯ Portrait"})]})]}),i.jsxs(qe,{$hasSubmenu:!0,onMouseEnter:()=>C("mode"),onMouseLeave:()=>u(null),children:[i.jsx(Ke,{children:"🎮 View Mode"}),i.jsx(dr,{children:"▶"}),i.jsxs(ur,{$isOpen:g==="mode",children:[a.includes("chess-only")&&i.jsx(Ie,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&i.jsx(Ie,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&i.jsx(Ie,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),children:"▤ Chat Only"})]})]}),i.jsx(yn,{}),i.jsx(qe,{onClick:S,children:i.jsx(Ke,{children:"⚙️ Settings"})}),i.jsx(yn,{}),i.jsx(qe,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),h(!1)},children:i.jsx(Ke,{children:"📖 Documentation"})}),i.jsx(qe,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),h(!1)},children:i.jsx(Ke,{children:"🐛 Report Issue"})})]})]})}),i.jsx(Wc,{children:i.jsxs(Hc,{children:[i.jsx(_c,{children:"Mode:"}),i.jsxs(Gc,{children:[a.includes("chess-only")&&i.jsx(hr,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&i.jsx(hr,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&i.jsx(hr,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),title:"Chat Only",children:"▤"})]})]})}),i.jsx(Fo,{isOpen:c,onClose:()=>d(!1)})]})});Bo.displayName="AppHeader";const Uc=m.img`
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
`,Yc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Vc={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"},qc=m.div`
  width: 93%;
  height: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$size*.8}px;
  user-select: none;
  cursor: ${e=>e.$isDragging?"grabbing":"grab"};
  filter: ${e=>e.$isDragging?"drop-shadow(0 4px 8px rgba(0,0,0,0.3))":"none"};
`,Ne=X(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=Oe(),[s,a]=V.useState(!1),p=Yc[e];if(!p)return null;const c=o.preferences.pieceSet,d=`/pieces/${c}/${p}.svg`;return V.useEffect(()=>{a(!1)},[e,c]),s?i.jsx(qc,{className:"chess-piece-fallback",$isDragging:r,$size:t,style:n,"data-settings":"pieces",children:Vc[e]||e}):i.jsx(Uc,{className:"chess-piece",src:d,alt:p,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces",onError:()=>a(!0)})});Ne.displayName="ChessPiece";const Kc=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Xc=m.div`
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
`,Qc=m.button`
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
`,Wo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const s=["Q","R","B","N"],a=p=>t==="white"?p:p.toLowerCase();return i.jsx(Kc,{$isOpen:e,onClick:n,children:i.jsx(Xc,{$x:o.x,$y:o.y,onClick:p=>p.stopPropagation(),children:s.map(p=>i.jsx(Qc,{onClick:()=>r(p.toLowerCase()),children:i.jsx(Ne,{piece:a(p),size:50})},p))})})};Wo.displayName="PromotionDialog";const Jc=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Zc=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,el=m.div`
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
`,bn=m.div`
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
`,tl=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,rl=m.div.attrs(e=>({style:{transform:`translate(
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
`,Qe=["a","b","c","d","e","f","g","h"],Je=["8","7","6","5","4","3","2","1"];function nl(e,t){return(e+t)%2===0}function ol(e,t,r){const n=r?Qe[7-e]:Qe[e],o=r?Je[7-t]:Je[t];return`${n}${o}`}function il(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,s)=>{let a=0;for(const p of o)if(p>="1"&&p<="8")a+=parseInt(p);else{const c=`${Qe[a]}${Je[s]}`;t.set(c,p),a++}}),t}const Pr=X(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:s,highlightedSquares:a=new Set,lastMove:p,interactive:c=!0,onSizeCalculated:d,selectedCapturedPiece:l,onCapturedPieceSelect:h})=>{Fe();const g=Oe(),u=_t(),b=f.useRef(null),[y,$]=f.useState(t||200),[x,S]=f.useState(null),[C,w]=f.useState(new Set),[j,T]=f.useState(null),[E,W]=f.useState([]),G=f.useRef(),[J,v]=f.useState(null),[O,F]=f.useState(!1),I=f.useMemo(()=>il(e),[e]),H=f.useRef(new Map);f.useRef(0);const ee=f.useCallback((k,L)=>{const M=Qe.indexOf(k[0]),z=Je.indexOf(k[1]),P=L/8,R=r?(7-M)*P:M*P,_=r?(7-z)*P:z*P;return{x:R,y:_}},[r]),ce=f.useCallback((k,L,M)=>{const z=k.toLowerCase()==="p",P=M[1];return z&&(P==="8"||P==="1")},[]),je=f.useCallback(k=>{k.preventDefault(),u.isPlaying&&u.clearPremove()},[u]);f.useEffect(()=>{if(t){$(t);return}const k=()=>{if(!b.current)return;const R=b.current.parentElement;if(!R)return;const{width:_,height:re}=R.getBoundingClientRect();b.current.getBoundingClientRect();const le=16,A=_-le,ie=re-le,K=Math.floor(Math.min(A,ie)),ue=Math.max(100,Math.floor(K/8)*8);ue!==y&&$(ue)},L=setTimeout(k,50);k();let M;const z=()=>{clearTimeout(M),M=setTimeout(k,100)};window.addEventListener("resize",z);let P=null;return b.current&&b.current.parentElement&&(P=new ResizeObserver(()=>{z()}),P.observe(b.current.parentElement)),()=>{window.removeEventListener("resize",z),clearTimeout(M),clearTimeout(L),P&&P.disconnect()}},[t,y]),f.useEffect(()=>{d&&y>0&&d(y)},[y,d]);const Y=y/8,se=f.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(u.isPlaying){const k=u.currentGame,L=u.playingColor;if(k&&L){const M=L==="white"?k.white.time:k.black.time,z=g.preferences.disableAnimationsThreshold;if(M<z)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,u.isPlaying,u.currentGame,u.playingColor]),ae=f.useRef("");f.useEffect(()=>{if(W([]),!se||O||u.isProcessingServerUpdate){H.current=new Map(I);return}const k=H.current;if(p){const{from:L,to:M}=p,z=`${e}-${L}-${M}`;if(ae.current===z){H.current=new Map(I);return}const P=k.get(L),R=I.get(M);if(P&&R===P&&!I.has(L)){if(u.isPlaying&&u.currentGame){const _=u.gameRelation===1,re=u.playingColor,le=re==="white"&&u.currentGame.turn==="b"||re==="black"&&u.currentGame.turn==="w";if(_||le){H.current=new Map(I),ae.current=z;return}}ae.current=z,setTimeout(()=>{W([{piece:P,from:L,to:M,startTime:Date.now()}])},0)}}H.current=new Map(I)},[I,p,se,O,u.isProcessingServerUpdate,e,u]),f.useEffect(()=>{if(O){const k=setTimeout(()=>{F(!1)},50);return()=>clearTimeout(k)}},[e,O]),f.useEffect(()=>{if(E.length===0)return;const k=()=>{const L=Date.now(),M=g.preferences.animationDuration;W(z=>{const P=z.filter(R=>L-R.startTime<M);return P.length>0&&(G.current=requestAnimationFrame(k)),P})};return G.current=requestAnimationFrame(k),()=>{G.current&&cancelAnimationFrame(G.current)}},[E.length,g.preferences.animationDuration]),f.useEffect(()=>{if(l)try{const k=u.currentPosition;u.chessBoard.getFen()!==k&&u.chessBoard.loadFen(k);const M=u.chessBoard.getLegalMoves().filter(P=>P.from==="@"&&P.san.toLowerCase().startsWith(l.toLowerCase())),z=new Set(M.map(P=>P.to));w(z),S(null)}catch(k){console.error("Error getting drop moves:",k),w(new Set)}},[l,u]);const te=f.useCallback((k,L)=>{if(!c)return;const M=I.get(k);if(l){C.has(k)?(s?.(l,k),h?.(null),w(new Set)):(h?.(null),w(new Set));return}if(x)if(C.has(k)){const z=I.get(x);if(z&&ce(z,x,k)){const P=z===z.toUpperCase()?"white":"black";if(u.isPlaying){const R=g.preferences.autoPromotionPiece;u.isMyTurn?(F(!0),o?.(x,k,R)):u.setPremove(x,k,R)}else{const R=L?.currentTarget.getBoundingClientRect();v({from:x,to:k,color:P,position:R?{x:R.left+R.width/2,y:R.top+R.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else u.isPlaying&&!u.isMyTurn?u.setPremove(x,k):(F(!0),o?.(x,k));S(null),w(new Set)}else if(k===x)S(null),w(new Set);else if(M)if(S(k),g.preferences.showLegalMoves)try{const z=u.currentPosition;u.chessBoard.getFen()!==z&&u.chessBoard.loadFen(z);const P=u.chessBoard.getLegalMoves(k),R=new Set(P.map(_=>_.to));w(R)}catch(z){console.error("Error getting legal moves:",z),w(new Set)}else w(new Set);else S(null),w(new Set);else if(M){S(k);try{const z=u.currentPosition;u.chessBoard.getFen()!==z&&u.chessBoard.loadFen(z);const P=M===M.toUpperCase(),R=u.chessBoard.getActiveColor();if(P&&R==="w"||!P&&R==="b")if(g.preferences.showLegalMoves){const re=u.chessBoard.getLegalMoves(k),le=new Set(re.map(A=>A.to));w(le)}else w(new Set);else w(new Set),S(null)}catch(z){console.error("Error getting legal moves:",z),w(new Set)}}},[x,C,I,o,s,c,ce,u,g.preferences.autoPromotionPiece,l,h]),me=f.useCallback((k,L,M)=>{if(!c)return;const z=k.clientX,P=k.clientY;let R=!1,_=!1;const le=k.currentTarget.getBoundingClientRect().width,A=K=>{const ue=Math.abs(K.clientX-z),ct=Math.abs(K.clientY-P);(ue>3||ct>3)&&M&&!_?(R=!0,_=!0,de(L,M,K,le)):_&&T(Te=>Te?{...Te,x:K.clientX,y:K.clientY}:null)},ie=K=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",ie),_?Pe(K,L,M):R?(T(null),S(null),w(new Set)):te(L,k)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",ie)},[c,te]),de=f.useCallback((k,L,M,z)=>{if(S(k),g.preferences.showLegalMoves)try{const R=u.currentPosition;u.chessBoard.getFen()!==R&&u.chessBoard.loadFen(R);const _=L===L.toUpperCase(),re=u.chessBoard.getActiveColor();if(_&&re==="w"||!_&&re==="b"){const A=u.chessBoard.getLegalMoves(k),ie=new Set(A.map(K=>K.to));w(ie)}else w(new Set)}catch(R){console.error("Error getting legal moves for drag:",R),w(new Set)}else w(new Set);const P={piece:L,from:k,x:M.clientX,y:M.clientY,size:z};T(P)},[g.preferences.showLegalMoves,u]),Pe=f.useCallback((k,L,M)=>{try{const R=document.elementsFromPoint(k.clientX,k.clientY).find(_=>_.getAttribute("data-square"))?.getAttribute("data-square");if(R&&R!==L)if(ce(M,L,R)){const _=M===M.toUpperCase()?"white":"black";if(u.isPlaying){const re=g.preferences.autoPromotionPiece;u.isMyTurn?(F(!0),o?.(L,R,re)):u.setPremove(L,R,re)}else v({from:L,to:R,color:_,position:{x:k.clientX,y:k.clientY}})}else u.isPlaying&&!u.isMyTurn?u.setPremove(L,R):(F(!0),o?.(L,R))}catch(z){console.error("Error in handleDragEnd:",z)}T(null),S(null),w(new Set)},[o,ce,u,g.preferences.autoPromotionPiece]),fe=f.useMemo(()=>{const k=[];for(let L=0;L<8;L++)for(let M=0;M<8;M++){const z=nl(M,L),P=ol(M,L,r),R=I.get(P),_=a.has(P),re=p&&(p.from===P||p.to===P),le=x===P,A=C.has(P),ie=j?.from===P;E.some(Te=>Te.to===P);const K=E.some(Te=>Te.from===P),ue=n&&L===7,ct=n&&M===0;k.push(i.jsxs(el,{"data-square":P,$isLight:z,$isHighlighted:_,$isLastMoveSquare:!!re,$isSelected:le,$isPossibleMove:A,onMouseDown:Te=>me(Te,P,R),children:[R&&!ie&&!K&&i.jsx(Ne,{piece:R,size:Y},`${R}-${Y}`),ue&&i.jsx(bn,{$type:"file",$isLight:z,$size:Y,"data-settings":"coordinates",className:"coordinate-label",children:r?Qe[7-M]:Qe[M]}),ct&&i.jsx(bn,{$type:"rank",$isLight:z,$size:Y,"data-settings":"coordinates",className:"coordinate-label",children:r?Je[7-L]:Je[L]})]},P))}return k},[r,n,I,a,p,x,C,j,Y,te,me]);return i.jsxs(i.Fragment,{children:[i.jsxs(Jc,{ref:b,$size:y,onContextMenu:je,"data-settings":"board",className:"chess-board",children:[i.jsx(Zc,{children:fe}),E.map((k,L)=>{const M=ee(k.from,y),z=ee(k.to,y),P=Date.now()-k.startTime,R=g.preferences.animationDuration,_=Math.min(P/R,1),le=(A=>A<.5?4*A*A*A:1-Math.pow(-2*A+2,3)/2)(_);return i.jsx(rl,{$fromX:M.x,$fromY:M.y,$toX:z.x,$toY:z.y,$progress:le,$size:Y,children:i.jsx(Ne,{piece:k.piece,size:Y},`${k.piece}-${Y}`)},`${k.from}-${k.to}-${k.startTime}`)})]}),j&&i.jsx(i.Fragment,{children:i.jsx(tl,{$x:j.x,$y:j.y,$size:j.size,children:i.jsx(Ne,{piece:j.piece,size:j.size,isDragging:!0},`${j.piece}-${j.size}-dragging`)})}),J&&i.jsx(Wo,{isOpen:!0,color:J.color,position:J.position,onSelect:k=>{F(!0),o?.(J.from,J.to,k),v(null)},onCancel:()=>v(null)})]})});Pr.displayName="ChessBoardWithPieces";const sl=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,al=m.span`
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
`,Ho=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a,compact:p=!1})=>{const c=l=>{const h=Math.floor(l/3600),g=Math.floor(l%3600/60),u=Math.floor(l%60),b=Math.floor(l%1*10),y=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${y}${g.toString().padStart(2,"0")}${y}${u.toString().padStart(2,"0")}`:l<o&&s?`${g}${y}${u.toString().padStart(2,"0")}.${b}`:`${g}${y}${u.toString().padStart(2,"0")}`},d=e<=o&&e>0;return i.jsx(sl,{size:t,className:a,children:i.jsx(al,{$isLowTime:d,$isActive:r,$compact:p,$isFinished:n,children:c(e)})})},cl=m.span`
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
`,ll=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a})=>{const p=l=>{const h=Math.floor(l/3600),g=Math.floor(l%3600/60),u=Math.floor(l%60),b=Math.floor(l%1*10),y=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${y}${g.toString().padStart(2,"0")}${y}${u.toString().padStart(2,"0")}`:l<o&&s?`${g}${y}${u.toString().padStart(2,"0")}.${b}`:`${g}${y}${u.toString().padStart(2,"0")}`},c=e<=o&&e>0,d=t==="large"?"48px":t==="medium"?"36px":"24px";return i.jsx(cl,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:d,children:p(e)})},kt=m(ll)`
    /* Additional GameClock-specific styles if needed */
`;m(Ho).attrs({size:"small"})`
    font-size: 12px;
`;m(Ho).attrs({size:"medium"})`
    font-size: 16px;
`;const dl=m.div`
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
`,ul=m.button`
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
`,hl=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,_o=X(({playerName:e,position:t,onClose:r})=>{const n=Fn(),o=Oe(),s=f.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];f.useEffect(()=>{const c=l=>{s.current&&!s.current.contains(l.target)&&r()},d=l=>{l.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",d)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}},[r]),f.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),d=window.innerWidth,l=window.innerHeight;let h=t.x,g=t.y;c.right>d&&(h=d-c.width-10),c.bottom>l&&(g=l-c.height-10),(h!==t.x||g!==t.y)&&(s.current.style.left=`${h}px`,s.current.style.top=`${g}px`)}},[t]);const p=c=>{const d=e.replace(/\([^)]*\)/g,"").trim(),l=c.replace("{player}",d);n.sendCommand(l),r()};return i.jsx(dl,{ref:s,$x:t.x,$y:t.y,children:a.map((c,d)=>"divider"in c&&c.divider?i.jsx(hl,{},d):"command"in c?i.jsx(ul,{onClick:()=>p(c.command),children:c.label},d):null)})});_o.displayName="PlayerContextMenu";const pl=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,at=({name:e,className:t,style:r,onClick:n})=>{const[o,s]=f.useState(null),a=p=>{p.preventDefault(),p.stopPropagation(),n&&n(),s({x:p.clientX,y:p.clientY})};return i.jsxs(i.Fragment,{children:[i.jsx(pl,{className:t,style:r,onClick:a,children:e}),o&&i.jsx(_o,{playerName:e,position:o,onClose:()=>s(null)})]})};at.displayName="PlayerName";const ml=m.div`
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
`,fl=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,gl=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,xl=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,yl=m.div`
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
`;const ut=X(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:p=!1,compact:c=!1})=>{const d=i.jsxs(i.Fragment,{children:[i.jsx(fl,{children:i.jsxs(gl,{children:[i.jsx(xl,{children:i.jsx(at,{name:e})}),i.jsx(yl,{children:t})]})}),!a&&!p&&i.jsx(kt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return p?d:i.jsx(ml,{$isActive:n,$orientation:s,$compact:c,children:d})});ut.displayName="PlayerCard";const bl=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,pr=m.div`
  padding: ${e=>e.theme.spacing[1]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[2]};
`,mr=m.div`
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
`,$l=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,$n=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,vl=m.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,vn=m.span`
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
`,Zt=X(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:s,className:a,disableAutoScroll:p=!1})=>{const c=f.useRef(null);f.useEffect(()=>{if(!p&&c.current&&t!==void 0){const l=c.current.querySelector(`[data-move-index="${t}"]`);l&&l.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,p]);const d=()=>{const l=[];for(let h=0;h<e.length;h+=2){const g=Math.floor(h/2)+1,u=e[h],b=e[h+1];l.push(i.jsxs($n,{children:[i.jsxs(vl,{children:[g,"."]}),i.jsx(vn,{$isCurrentMove:t===h,onClick:()=>r?.(h),"data-move-index":h,children:fr(u.san)}),b&&i.jsx(vn,{$isCurrentMove:t===h+1,onClick:()=>r?.(h+1),"data-move-index":h+1,children:fr(b.san)})]},h))}return l};return i.jsxs(bl,{className:a,children:[o?i.jsx(pr,{children:i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{children:"Moves"}),i.jsxs(mr,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?i.jsxs(pr,{children:[s,i.jsxs(mr,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):i.jsx(pr,{children:i.jsxs(mr,{children:[i.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),i.jsx($l,{ref:c,children:e.length===0?i.jsx($n,{children:i.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):d()})]})});Zt.displayName="MoveList";const wl=m(kt)`
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
`,kl=m(kt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,ht=X(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const s=_t(),a=o==="landscape"?kl:wl;return i.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});ht.displayName="ObservableClock";const Sl=m.div`
  position: relative;
  display: inline-block;
`,Cl=m.button`
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
`,jl=m.div`
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
`,Pl=m.button`
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
`,Hr=X(({color:e,size:t="small"})=>{const r=Oe(),[n,o]=f.useState(!1),s=f.useRef(null),a=["Q","R","B","N"],p=r.preferences.autoPromotionPiece,c=h=>e==="white"?h:h.toLowerCase();f.useEffect(()=>{const h=g=>{s.current&&!s.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[n]);const d=h=>{r.updatePreference("autoPromotionPiece",h),o(!1)},l=t==="small"?28:36;return i.jsxs(Sl,{ref:s,children:[i.jsx(Cl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:i.jsx(Ne,{piece:c(p),size:l})}),i.jsx(jl,{$isOpen:n,children:a.map(h=>i.jsx(Pl,{$size:t,onClick:()=>d(h),title:`Promote to ${h==="Q"?"Queen":h==="R"?"Rook":h==="B"?"Bishop":"Knight"}`,children:i.jsx(Ne,{piece:c(h),size:l})},h))})]})});Hr.displayName="PromotionPieceSelector";const Rl=m.div`
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
`,Go=X(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:s,onUnexamine:a,onSetupFEN:p,onFlipBoard:c,isAnalysisActive:d,isDrawOffered:l,canAbort:h,className:g})=>{const u=_t(),b=()=>i.jsxs(i.Fragment,{children:[h&&i.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),i.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),u.currentGame&&u.currentGame.moveNumber>=2&&i.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(Hr,{color:u.playingColor||"white",size:"medium"})]}),y=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>i.jsxs(i.Fragment,{children:[i.jsx(he,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(he,{onClick:p,$variant:"secondary",children:"FEN"})]});return i.jsxs(Rl,{className:g,children:[e==="playing"&&b(),e==="observing"&&y(),e==="examining"&&$(),e==="freestyle"&&x()]})}),$e=m(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Go.displayName="GameControls";const wn=m.div`
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
`,kn=m.div`
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
`,Ml=m.div`
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
`,Sn=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,Pt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,Cn=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,Uo=X(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Gt().isBottomPlayerWinning;let a,p,c;if(t===50)a=47,p=6,c=47;else if(t>50){const l=t-50;a=50-l,p=l,c=50}else{const l=50-t;a=50,p=l,c=50-l}const d=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const l=t<20;return i.jsxs(wn,{$orientation:r,className:n,children:[i.jsx(kn,{$orientation:r,children:e}),i.jsx(Ml,{$needsDarkText:l,children:e}),i.jsxs(Sn,{$orientation:r,children:[i.jsx(Pt,{style:{height:`${a}%`}}),i.jsx(Cn,{$color:d,style:{height:`${p}%`}}),i.jsx(Pt,{style:{height:`${c}%`}})]})]})}else return i.jsxs(wn,{$orientation:r,className:n,children:[i.jsx(kn,{$orientation:r,children:e}),i.jsxs(Sn,{$orientation:r,children:[i.jsx(Pt,{style:{width:`${c}%`}}),i.jsx(Cn,{$color:d,style:{width:`${p}%`}}),i.jsx(Pt,{style:{width:`${a}%`}})]})]})});Uo.displayName="EvaluationBar";const El=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,zl=m.div`
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
`,Rr=X(({orientation:e="vertical",boardSize:t})=>{const r=Gt();return i.jsx(El,{$orientation:e,$boardSize:t,children:i.jsx(Uo,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),Mr=X(({className:e})=>{const t=Gt();return i.jsxs(zl,{className:e,children:[i.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),i.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});Rr.displayName="AnalysisDisplay";Mr.displayName="AnalysisInfoDisplay";const Ll=m.div`
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
`,Tl=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Il=m.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Yo=m.input`
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
`,Al=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Dl=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Nl=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,jn=m.button`
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
`,Ol=m.button`
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
`,Pn=m.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Rn=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Fl=m(Yo)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Vo=X(({isOpen:e,onClose:t})=>{const{gameStore:r}=ze(),[n,o]=f.useState(""),[s,a]=f.useState(""),p=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=f.useCallback(u=>{o(u.target.value),a("")},[]),d=f.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),l=f.useCallback(u=>{const b=typeof u=="function"?u():u;o(b),a("");try{r.loadPosition(b)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),h=f.useCallback(u=>{u.key==="Enter"&&n.trim()?d():u.key==="Escape"&&t()},[n,d,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>ni.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?i.jsx(Ll,{$isOpen:e,onClick:t,children:i.jsxs(Tl,{onClick:u=>u.stopPropagation(),children:[i.jsx(Il,{children:"Set Position from FEN"}),i.jsx(Dl,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),i.jsxs(Pn,{children:[i.jsx(Rn,{children:"Current position:"}),i.jsx(Fl,{type:"text",value:p,readOnly:!0,onClick:u=>u.currentTarget.select()})]}),i.jsxs(Pn,{children:[i.jsx(Rn,{children:"Preset position:"}),g.map(u=>i.jsx(Ol,{onClick:()=>l(u.fen),children:u.name},u.name))]}),i.jsx(Yo,{type:"text",value:n,onChange:c,onKeyDown:h,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&i.jsx(Al,{children:s}),i.jsxs(Nl,{children:[i.jsx(jn,{onClick:t,children:"Cancel"}),i.jsx(jn,{$variant:"primary",onClick:d,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Vo.displayName="FENDialog";const Bl=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Wl=m.div`
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
`,Hl=m.div`
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
`,_l=m.div`
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
`,Gl=m(Ne)`
  width: 100%;
  height: 100%;
`,pt=X(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:s}=ze(),a=f.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const h=s.capturedPieces;return t?h.white:h.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),p=f.useMemo(()=>{const l={};return a.forEach(h=>{l[h]=(l[h]||0)+1}),l},[a]),c=["p","n","b","r","q"],d=n?n/8:32;return i.jsx(Bl,{$orientation:e,$size:d,className:r,children:i.jsx(Wl,{$orientation:e,children:c.map(l=>{const h=p[l]||0,g=t?l.toUpperCase():l;return i.jsx(Hl,{$size:d,onClick:h>0&&o?()=>o(g):void 0,style:{cursor:h>0&&o?"pointer":"default"},children:h>0&&i.jsxs(i.Fragment,{children:[i.jsx(Gl,{piece:g,size:d}),h>1&&i.jsx(_l,{children:h})]})},l)})})})});pt.displayName="CapturedPieces";const Ul=m.div`
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
`,Yl=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Vl=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ql=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Kl=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Mn=m.button`
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
`,Xl=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:s,onCancel:a})=>i.jsx(Ul,{$isOpen:e,onClick:a,children:i.jsxs(Yl,{onClick:p=>p.stopPropagation(),children:[i.jsx(Vl,{children:t}),i.jsx(ql,{children:r}),i.jsxs(Kl,{children:[i.jsx(Mn,{$variant:"secondary",onClick:a,children:o}),i.jsx(Mn,{$variant:"primary",onClick:s,children:n})]})]})}),Ql=m.div`
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
`,En=m.div`
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
`;const Jl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Zl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,ed=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,td=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,qo=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Ko=m.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,rd=m(qo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,nd=m(Ko)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,od=m(qo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,id=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,sd=m(Ko)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,zn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Ln=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Tn=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,In=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,An=m.div`
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
`,ad=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,cd=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,ld=m.div`
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
`;const dd=m.div`
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
`,ud=m.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,hd=m.div`
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
`;const pd=m.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,md=m.div`
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
`;const Dn=m.div`
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
`;const fd=m(Zt)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;m(kt)`
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
`;const Nn=m.div`
    flex: 1;
    display: flex;
`;m(kt)`
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
`;const gd=m.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,xd=m.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,yd=m.div`
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
`;const bd=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,$d=m.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,Xo=X(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=_t(),o=Oe(),s=Gt(),a=Fn(),p=oi();Fe();const[c,d]=f.useState(!1),[l,h]=f.useState(!1),[g,u]=f.useState(0),[b,y]=f.useState(!1),[$,x]=f.useState(!1),[S,C]=f.useState(null),w=o.preferences.chessOrientation==="landscape",j=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",E=window.innerWidth/window.innerHeight>1.6,W=f.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),G=f.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),J=f.useCallback((A,ie,K)=>{try{n.makeMove(A,ie,K)||(console.error("Invalid move:",A,ie),p.playIllegal())}catch(ue){console.error("Error making move:",ue),p.playIllegal()}},[n,p]),v=f.useCallback((A,ie)=>{try{const K=A.toLowerCase();n.makeSANMove(`${A.toUpperCase()}@${ie}`)||(console.error("Invalid drop:",A,ie),p.playIllegal())}catch(K){console.error("Error making drop:",K),p.playIllegal()}},[n,p]),O=f.useCallback(A=>{C(S===A?null:A)},[S]);f.useMemo(()=>{if(n.currentGameInfo){const{white:A,black:ie,timeControl:K,variant:ue}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ue} ${K}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const F=(()=>{const A=n.moveHistory.length;if(A>0){const ie=n.moveHistory[A-1],K=Math.ceil(A/2),ue=A%2===1,ct=fr(ie.san);return`${K}.${ue?"":".."} ${ct}`}return"Starting position"})(),I=n.currentOpening,H=n.currentGame,ee=H||n.lastGameState,ce=ee?.white||{name:"White",rating:1500,time:900},je=ee?.black||{name:"Black",rating:1500,time:900},Y=!H||H.turn==="w",se=n.shouldShowFlippedBoard,ae=se?ce:je,te=se?je:ce,me=se,de=se?Y:!Y,Pe=f.useCallback(A=>{n.goToMove(A)},[n]);f.useEffect(()=>{s.initialize()},[s]),f.useEffect(()=>{$&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,$,n.isPlaying,a]),f.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),f.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(j):s.stopAnalysis()},[c,j,s]);const fe=f.useCallback(()=>{d(A=>!A)},[]),k=f.useCallback(()=>{h(!0)},[]),L=f.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),M=f.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),z=f.useCallback(()=>{a.sendCommand("unexamine")},[a]),P=f.useCallback(()=>{y(!0)},[]),R=f.useCallback(()=>{a.sendCommand("resign"),y(!1)},[a]),_=f.useCallback(()=>{a.sendCommand("draw"),x(!$)},[a,$]),re=f.useCallback(()=>{a.sendCommand("abort")},[a]),le=()=>i.jsxs(i.Fragment,{children:[i.jsx(En,{$orientation:"portrait",children:i.jsx(ad,{children:i.jsxs(cd,{children:[c&&i.jsx($d,{$boardSize:g,children:i.jsx(Rr,{orientation:"vertical",boardSize:g})}),i.jsx(ld,{children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[i.jsxs(od,{children:[i.jsxs(zn,{children:["Game #",ee?.gameId||"?"]}),i.jsx(Ln,{children:ee?.timeControl||"?"}),i.jsxs(id,{children:[W==="playing"&&i.jsxs(i.Fragment,{children:[n.moveHistory.length<=1&&i.jsx($e,{onClick:re,$variant:"secondary",children:"Abort"}),i.jsx($e,{onClick:_,$variant:"secondary",children:"Draw"}),i.jsx($e,{onClick:P,$variant:"secondary",children:"Resign"}),i.jsx(Hr,{color:n.playingColor||"white",size:"small"})]}),W==="observing"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:M,$variant:"secondary",children:"Unobserve"}),i.jsx($e,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),W==="examining"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:z,$variant:"secondary",children:"Unexamine"}),i.jsx($e,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),W==="freestyle"&&i.jsxs(i.Fragment,{children:[i.jsx($e,{onClick:fe,$variant:"secondary",children:"Analysis"}),i.jsx($e,{onClick:L,$variant:"secondary",children:"Flip"}),i.jsx($e,{onClick:k,$variant:"secondary",children:"FEN"})]})]})]}),i.jsxs(Dn,{children:[i.jsx(ht,{player:ae,isActive:de,size:"small",compact:!0}),i.jsx(Nn,{children:i.jsx(ut,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsx(An,{$orientation:"portrait",children:i.jsx(Pr,{position:j,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:J,onDrop:v,interactive:W==="playing"||W==="freestyle"||W==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:u,selectedCapturedPiece:S,onCapturedPieceSelect:C})}),i.jsxs(Dn,{children:[i.jsx(ht,{player:te,isActive:!de,size:"small",compact:!0}),i.jsx(Nn,{children:i.jsx(ut,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsxs(sd,{children:[i.jsx(Tn,{children:n.premove?`Premove: ${Ur(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,j)}`:F!=="Starting position"?`Last move: ${F}`:"Last move: none"}),I&&i.jsx(In,{children:I})]}),c&&i.jsx(bd,{children:i.jsx(Mr,{})})]})}),G&&i.jsx(ed,{$squareSize:g?g/8:0,children:i.jsxs(td,{$squareSize:g?g/8:0,children:[i.jsx(pt,{orientation:"vertical",isWhitePieces:se,boardSize:g,onPieceClick:O}),i.jsx(pt,{orientation:"vertical",isWhitePieces:!se,boardSize:g,onPieceClick:O})]})})]})})}),i.jsx(dd,{$orientation:"portrait",$boardSize:g,children:i.jsx(Zt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Pe,disableAutoScroll:!0,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return i.jsxs(Ql,{className:e,$orientation:w?"landscape":"portrait",$hasChat:t,children:[w?i.jsx(i.Fragment,{children:i.jsx(En,{$orientation:"landscape",children:i.jsxs(ud,{children:[i.jsx(xd,{children:c&&i.jsx(yd,{$boardSize:g,children:i.jsx(Rr,{orientation:"vertical",boardSize:g})})}),i.jsxs(hd,{$hasAnalysis:c,children:[i.jsxs(Jl,{$isWideAspect:E,children:[i.jsxs(rd,{$chatWidth:r,$hasAnalysis:c,children:[i.jsxs(zn,{children:["Game #",ee?.gameId||"?"]}),i.jsx(Ln,{children:ee?.timeControl||"?"})]}),i.jsx(Zl,{$orientation:"landscape",children:i.jsx(An,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:i.jsx(Pr,{position:j,flipped:se,showCoordinates:o.preferences.showCoordinates,onMove:J,onDrop:v,interactive:W==="playing"||W==="freestyle"||W==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:u,selectedCapturedPiece:S,onCapturedPieceSelect:C})})}),i.jsxs(nd,{$chatWidth:r,$hasAnalysis:c,children:[i.jsx(Tn,{children:n.premove?`Premove: ${Ur(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,j)}`:F!=="Starting position"?`Last move: ${F}`:"Last move: none"}),I&&i.jsx(In,{children:I})]}),c&&i.jsx(gd,{$chatWidth:r,$hasAnalysis:c,children:i.jsx(Mr,{})})]}),i.jsxs(pd,{$isWideAspect:E,$boardSize:g,children:[G&&i.jsx(pt,{orientation:"horizontal",isWhitePieces:me,boardSize:g,onPieceClick:O}),i.jsx(ht,{player:ae,isActive:de,size:"small",compact:!0,variant:"landscape"}),i.jsxs(md,{children:[i.jsx(ut,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"vertical",hideClockInCard:!0,compact:!0}),i.jsx(Go,{perspective:W,canAbort:n.moveHistory.length<=1,onAnalysis:fe,onFlipBoard:L,onSetupFEN:k,onUnobserve:M,onUnexamine:z,onResign:P,onDraw:_,onAbort:re,isAnalysisActive:c,isDrawOffered:$}),i.jsx(fd,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Pe,showHeader:!1,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),i.jsx(ut,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),i.jsx(ht,{player:te,isActive:!de,size:"small",compact:!0,variant:"landscape"}),G&&i.jsx(pt,{orientation:"horizontal",isWhitePieces:!me,boardSize:g,onPieceClick:O})]})]})]})})}):le(),i.jsx(Vo,{isOpen:l,onClose:()=>h(!1)}),i.jsx(Xl,{isOpen:b,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:R,onCancel:()=>y(!1)})]})});Xo.displayName="ChessGameLayout";const vd=m.div`
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
`,wd=m.div`
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
`,kd=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,Sd=m.span`
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
`,Cd=m.button`
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
`,jd=m.span`
  font-size: 12px;
  opacity: 0.7;
`,Qo=X(()=>{const{chatStore:e}=ze(),t=e.sortedTabs,[r,n]=V.useState(null),[o,s]=V.useState(null),a=(h,g)=>{n(g),h.dataTransfer.effectAllowed="move"},p=(h,g)=>{h.preventDefault(),h.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},d=(h,g)=>{h.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},l=()=>{n(null),s(null)};return i.jsx(vd,{children:t.map(h=>i.jsxs(wd,{$active:h.id===e.activeTabId,$hasUnread:h.unreadCount>0,$dragging:h.id===r,$dragOver:h.id===o,draggable:!0,onDragStart:g=>a(g,h.id),onDragOver:g=>p(g,h.id),onDragLeave:c,onDrop:g=>d(g,h.id),onDragEnd:l,onClick:()=>e.setActiveTab(h.id),children:[h.type!=="console"&&i.jsx(jd,{$type:h.type}),i.jsx(kd,{children:h.type==="channel"?`(${h.name})`:h.name}),h.unreadCount>0&&i.jsx(Sd,{children:h.unreadCount>99?"99+":h.unreadCount}),h.id!=="console"&&i.jsx(Cd,{onClick:g=>{g.stopPropagation(),e.closeTab(h.id)},title:"Close tab",children:"×"})]},h.id))})});Qo.displayName="ChatTabs";function Pd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function Rd(e){e.scrollTop=e.scrollHeight}function Md(e,t=10){Pd(e,t)&&Rd(e)}class Ce{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class N{static{this.renderers=new Map}static register(t){this.renderers.set(t.type,t)}static getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}static getAllRenderers(){return Array.from(this.renderers.values())}}const Ge=m.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
  font-size: 11px;
  font-family: ${e=>e.$fontFamily||"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${e=>e.$fontStyle||"normal"};
  line-height: 1.3;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  position: relative;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  color: ${e=>e.$color||e.theme.colors.text};
`,er=m(Ge)`
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,tr=m.div`
  font-size: 11px;
  font-family: ${e=>e.$fontFamily||"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${e=>e.$fontStyle||"normal"};
  line-height: 1.3;
  white-space: pre;
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,_r=m.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  min-width: 80px;
  display: inline-block;
  
  &::after {
    content: ':';
  }
`,Gr=m.span`
  min-width: 80px;
  display: inline-block;
  flex-shrink: 0;
`,nt=m.span`
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  display: block;
  overflow: hidden;
`,Ed=m.a`
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
`,Ye=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`;m(Ye)`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`;const zd=m(Ye)`
  &::before {
    content: '(';
  }
  &::after {
    content: ')';
  }
`,Ld=m(Ye)`
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
`,Td=m(Ye)`
  display: inline-block;
  padding: 0 2px;
  border-radius: 2px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
`,be=({content:e,elements:t=[],onCommandClick:r})=>{const{ficsStore:n}=ze(),o=l=>{const h=[],g=/(https?:\/\/[^\s]+)/gi;let u;for(;(u=g.exec(l))!==null;)h.push({type:"url",text:u[1],action:u[1],start:u.index,end:u.index+u[1].length});const b=/['']([^'']+)['']|'([^']+)'/g;for(;(u=b.exec(l))!==null;){const w=u[1]||u[2];/^\w/.test(w)&&h.push({type:"command",text:u[0],action:w,start:u.index,end:u.index+u[0].length})}const y=/\\?"([^"]+)\\?"/g;for(;(u=y.exec(l))!==null;){const w=u[1];/^\w/.test(w)&&h.push({type:"command",text:u[0],action:w,start:u.index,end:u.index+u[0].length})}const $=/\bgame\s+(\d+)\b/gi;for(;(u=$.exec(l))!==null;)h.push({type:"gameNumber",text:u[1],action:`observe ${u[1]}`,start:u.index,end:u.index+u[0].length});const x=/"play\s+(\d+)"/gi;for(;(u=x.exec(l))!==null;)h.push({type:"seekNumber",text:u[0],action:`play ${u[1]}`,start:u.index,end:u.index+u[0].length});const S=/\((\d+)\):/g;for(;(u=S.exec(l))!==null;)h.push({type:"channelNumber",text:u[1],action:`+channel ${u[1]}`,start:u.index+1,end:u.index+1+u[1].length});const C=/\[(next|more|back|prev)\]/gi;for(;(u=C.exec(l))!==null;)h.push({type:"command",text:u[0],action:u[1].toLowerCase(),start:u.index,end:u.index+u[0].length});return h},s=(l,h)=>{h==="url"?window.open(l,"_blank","noopener,noreferrer"):r?r(l):n.sendCommand(l)},a=[...t];if(t.length===0){const l=o(e);a.push(...l)}if(a.length===0)return i.jsx(i.Fragment,{children:e});const p=[...a].sort((l,h)=>{if(l.start!==h.start)return l.start-h.start;if(l.end!==h.end)return h.end-l.end;const g={command:1,player:2,gameNumber:3,channel:4,url:5,seek:6},u=g[l.type]||99,b=g[h.type]||99;return u-b}).filter((l,h,g)=>{if(h>0){const u=g[h-1];if(u.start===l.start&&u.end===l.end&&u.type===l.type)return!1}return!0}),c=[];let d=0;return p.forEach((l,h)=>{if(l.start>d){const b=e.substring(d,l.start);c.push(i.jsx(V.Fragment,{children:b},`text-${h}`))}else if(l.start<d)return;const g=`${l.type}-${h}`,u=l.text;switch(l.type){case"player":c.push(i.jsx(at,{name:u,onClick:()=>s(l.action,l.type)},g));break;case"url":c.push(i.jsx(Ed,{href:l.action,target:"_blank",rel:"noopener noreferrer",onClick:b=>{b.preventDefault(),s(l.action,l.type)},children:u},g));break;case"channelNumber":c.push(i.jsx(zd,{onClick:()=>s(l.action,l.type),children:u},g));break;case"gameNumber":c.push(i.jsx(Ld,{onClick:()=>s(l.action,l.type),children:u},g));break;case"seekNumber":c.push(i.jsx(Td,{onClick:()=>s(l.action,l.type),children:u},g));break;case"command":default:c.push(i.jsx(Ye,{onClick:()=>s(l.action,l.type),children:u},g));break}d=l.end}),d<e.length&&c.push(i.jsx(V.Fragment,{children:e.substring(d)},"text-end")),i.jsx(i.Fragment,{children:c})};class Id extends Ce{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.metadata?.parsedMessage,s=t.metadata?.isGroupedMessage;if(t.type==="system")return i.jsx(er,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})});const a=t.sender&&t.sender.toLowerCase()===r.toLowerCase();return s||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,children:[i.jsx(Gr,{}),i.jsx(nt,{children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,children:[i.jsx(_r,{$isYou:a||void 0,children:a?t.sender:i.jsx(at,{name:t.sender})}),i.jsx(nt,{children:i.jsx(be,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]})}}class Ad extends Ce{constructor(){super(...arguments),this.type="channelTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage,a=t.metadata?.isGroupedMessage,p=t.channel?.startsWith("channel-"),c=s?.metadata?.message||t.content;return a||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Gr,{}),i.jsx(nt,{children:i.jsx(be,{content:c,elements:p?[]:s?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,"data-settings":"chat",className:"channel-tell-message",children:[i.jsx(_r,{$isYou:o,children:o?t.sender:i.jsx(at,{name:t.sender})}),i.jsx(nt,{children:i.jsx(be,{content:c,elements:[],onCommandClick:n})})]})}}class Dd extends Ce{constructor(){super(...arguments),this.type="directTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage;return t.metadata?.isGroupedMessage||!t.sender?i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Gr,{}),i.jsx(nt,{children:i.jsx(be,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]}):i.jsxs(Ge,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(_r,{$isYou:o,children:o?t.sender:i.jsx(at,{name:t.sender})}),i.jsx(nt,{children:i.jsx(be,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]})}}class Nd extends Ce{constructor(){super(...arguments),this.type="gameStart"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(er,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Od extends Ce{constructor(){super(...arguments),this.type="gameEnd"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(tr,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Fd extends Ce{constructor(){super(...arguments),this.type="style12"}render({message:t}){return i.jsx(er,{$color:t.metadata?.color||"#666",children:t.content})}}class Bd extends Ce{constructor(){super(...arguments),this.type="movesList"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(er,{$color:t.metadata?.color||void 0,children:i.jsx(be,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Q extends Ce{render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(tr,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx(be,{content:n?.content||t.content,elements:n?.elements||[],onCommandClick:r})})}}class Wd extends Q{constructor(){super(...arguments),this.type="shout"}}class Hd extends Q{constructor(){super(...arguments),this.type="cshout"}}class _d extends Q{constructor(){super(...arguments),this.type="notification"}}class Gd extends Q{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Ud extends Q{constructor(){super(...arguments),this.type="matchRequest"}}class Yd extends Q{constructor(){super(...arguments),this.type="illegalMove"}}class Vd extends Q{constructor(){super(...arguments),this.type="drawOffer"}}class qd extends Q{constructor(){super(...arguments),this.type="unobserve"}}class Kd extends Q{constructor(){super(...arguments),this.type="whoOutput"}}class Xd extends Q{constructor(){super(...arguments),this.type="gamesOutput"}}class Qd extends Q{constructor(){super(...arguments),this.type="fingerOutput"}}class Jd extends Ce{constructor(){super(...arguments),this.type="historyOutput"}render({message:t,onCommandClick:r}){const n=t.content,s=t.metadata?.parsedMessage?.metadata?.player||"",a=n.split(`
`);return i.jsx(tr,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:a.map((p,c)=>{const d=p.match(/^(\d+):/);if(d&&r){const l=d[1];return i.jsx(V.Fragment,{children:i.jsx(Ye,{onClick:()=>r(`examine ${s} ${l}`),style:{display:"block"},children:p})},c)}return i.jsxs(V.Fragment,{children:[p,c<a.length-1&&`
`]},c)})})}}class Zd extends Q{constructor(){super(...arguments),this.type="journalOutput"}}class eu extends Q{constructor(){super(...arguments),this.type="soughtOutput"}}class tu extends Q{constructor(){super(...arguments),this.type="channelListOutput"}}class ru extends Q{constructor(){super(...arguments),this.type="newsOutput"}}class nu extends Q{constructor(){super(...arguments),this.type="inOutput"}}class ou extends Q{constructor(){super(...arguments),this.type="login"}}class iu extends Q{constructor(){super(...arguments),this.type="password"}}class su extends Q{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class au extends Q{constructor(){super(...arguments),this.type="sessionStart"}}class cu extends Q{constructor(){super(...arguments),this.type="system"}}class lu extends Q{constructor(){super(...arguments),this.type="raw"}}class du extends Ce{constructor(){super(...arguments),this.type="gameNotification"}render({message:t,onCommandClick:r}){const o=t.metadata?.parsedMessage?.metadata?.gameNumber,s=()=>{o&&r&&r(`observe ${o}`)};return i.jsx(tr,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx(Ye,{onClick:s,children:t.content})})}}function uu(){N.register(new Ad),N.register(new Dd),N.register(new Wd),N.register(new Hd),N.register(new Nd),N.register(new Od),N.register(new Fd),N.register(new Bd),N.register(new Yd),N.register(new Vd),N.register(new qd),N.register(new du),N.register(new Gd),N.register(new Ud),N.register(new Kd),N.register(new Xd),N.register(new Qd),N.register(new Jd),N.register(new Zd),N.register(new eu),N.register(new tu),N.register(new ru),N.register(new nu),N.register(new _d),N.register(new ou),N.register(new iu),N.register(new su),N.register(new au),N.register(new cu),N.register(new lu),N.register(new Id)}uu();const mt=X(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=ze(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,p=s?o.getConsoleColor(s,a):null,c=s?o.getConsoleFont(s,a):null,d=s?o.getConsoleFontStyle(s,a):null,l={...e,metadata:{...e.metadata,color:p,fontFamily:c,fontStyle:d}},h=N.getRenderer(l);return h?i.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:h.render({message:l,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),i.jsx("div",{children:e.content}))});mt.displayName="Message";const Rt=m.div`
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
`,hu=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  min-width: 0;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
`,On=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,pu=m.div`
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
`,Jo=X(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=ze(),o=f.useRef(null),s=t.activeTab,a=s?.messages||[],p=r.username||"You",c=l=>{r.sendCommand(l)};if(f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current,h=setTimeout(()=>{s?.type==="console"?l.scrollTop=l.scrollHeight:Md(l,50)},50);return()=>clearTimeout(h)}},[a.length,a[a.length-1]?.id]),f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current;requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}},[s?.id]),!s)return i.jsx(Rt,{children:i.jsx(Mt,{className:"chat-messages-container",children:i.jsx(On,{children:"No active chat"})})});if(a.length===0)return i.jsx(Rt,{children:i.jsx(Mt,{className:"chat-messages-container",children:i.jsx(On,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const d=[];return a.forEach((l,h)=>{const g=h>0?a[h-1]:null,u=g?new Date(l.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===l.sender&&g.type===l.type&&u<6e4?d[d.length-1].messages.push(l):d.push({sender:l.sender,timestamp:new Date(l.timestamp),messages:[l]})}),s.type==="console"?i.jsx(Rt,{children:i.jsx(Mt,{ref:o,className:"chat-messages-container",children:a.map(l=>i.jsx(Et,{children:i.jsx(mt,{message:l,currentUsername:p,onCommandClick:c,onHover:e})},l.id))})}):i.jsx(Rt,{children:i.jsx(Mt,{ref:o,className:"chat-messages-container",children:d.map((l,h)=>l.messages[0].type==="system"?i.jsx(pu,{children:l.messages.map(u=>i.jsx(Et,{children:i.jsx(mt,{message:u,currentUsername:p,onCommandClick:c,onHover:e})},u.id))},h):i.jsx(hu,{children:l.messages.map((u,b)=>{if(b===0)return i.jsx(Et,{children:i.jsx(mt,{message:u,currentUsername:p,onCommandClick:c,onHover:e})},u.id);{const y={...u,sender:"",metadata:{...u.metadata,isGroupedMessage:!0}};return i.jsx(Et,{children:i.jsx(mt,{message:y,currentUsername:p,onCommandClick:c,onHover:e})},u.id)}})},h))})})});Jo.displayName="ChatMessages";const mu=m.div`
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
`,fu=m.textarea`
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
`,gu=m.button`
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
`,Zo=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:s=!1})=>{const a=f.useRef(null),p=d=>{d.key==="Enter"&&!d.shiftKey?(d.preventDefault(),e&&r(e)):d.key==="ArrowUp"&&!e?(d.preventDefault(),n?.("up")):d.key==="ArrowDown"&&(d.preventDefault(),n?.("down"))},c=()=>{e&&r(e)};return i.jsxs(mu,{children:[i.jsx(fu,{ref:a,value:e,onChange:d=>t(d.target.value),onKeyDown:p,placeholder:o,disabled:s,autoComplete:"off",spellCheck:"true",rows:1}),i.jsx(gu,{onClick:c,disabled:s||!e,title:"Send message (Enter)",children:"Send"})]})};Zo.displayName="ChatInput";const xu=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,yu=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,bu=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,$u=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,vu=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,wu=m.div`
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
`,ei=X(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=ze(),[s,a]=f.useState(""),[p,c]=f.useState(!1),[d,l]=f.useState(null);V.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),V.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const h=u=>{if(console.log("handleSendMessage called with:",u,"Length:",u.length),!u.trim())return;const b=u.split(`
`);if(b.length>1){b.forEach(y=>{y&&h(y)}),a("");return}if(r.addToHistory(u),u==="/help"||u==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(u.startsWith("/")||u.startsWith("\\")){const y=u.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const $=y.id.replace("channel-","");n.sendCommand(`tell ${$} ${u}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:u,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${u}`);else{const $=u.match(/^tell\s+(\w+)\s+(.+)$/);if($&&o.preferences.openTellsInTabs){const[,x,S]=$,C=x.replace(/\([^)]*\)/g,"").trim(),w=C.toLowerCase();r.createTab(w,C,"private"),r.addMessage(w,{channel:w,sender:"You",content:S,timestamp:new Date,type:"message"})}else r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"});n.sendCommand(u)}}a("")},g=u=>{const b=r.navigateHistory(u);b!==null&&a(b)};return i.jsxs(xu,{className:e,$compact:t,children:[!t&&i.jsxs(yu,{children:[i.jsx(bu,{children:"Chat"}),n.averagePing!==null&&i.jsxs(vu,{children:["Ping: ",n.averagePing,"ms"]}),d&&i.jsxs($u,{children:["Received: ",new Date(d).toLocaleTimeString()]})]}),i.jsxs(wu,{children:[i.jsx(Qo,{}),i.jsx(Jo,{onMessageHover:l}),i.jsx(Zo,{value:s,onChange:a,onSend:h,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});ei.displayName="ChatPanel";const ku=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,Su=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,Cu=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,ju=m.div`
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
`,Pu=m.div`
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
`,ti=X(()=>{const{preferencesStore:e}=ze(),{viewMode:t,autoViewMode:r}=e.preferences,n=Fe(),o=No(),s=Oo(),a=oc(),[p,c]=f.useState(600),[d,l]=f.useState(!1),h=f.useRef(!1);f.useEffect(()=>{!h.current&&r&&(h.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),f.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),f.useEffect(()=>{const $=e.preferences.chessOrientation;s.includes($)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=$=>{$.preventDefault(),l(!0)};f.useEffect(()=>{if(!d)return;const $=S=>{const C=window.innerWidth-S.clientX;c(Math.max(300,Math.min(600,C))),window.dispatchEvent(new Event("resize"))},x=()=>{l(!1)};return document.addEventListener("mousemove",$),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",x)}},[d]);const u=t==="chess-only"||t==="chess-and-chat",b=t==="chat-only"||t==="chess-and-chat",y=t==="chess-and-chat"&&!n.isMobile;return i.jsxs(ku,{children:[i.jsx(Bo,{}),i.jsxs(Su,{children:[i.jsx(Cu,{$isVisible:u,children:i.jsx(Xo,{hasChat:b,chatWidth:b&&!n.isMobile?p:0})}),y&&i.jsx(Pu,{$isVisible:!0,onMouseDown:g,style:{cursor:d?"col-resize":"ew-resize"}}),i.jsx(ju,{$isVisible:b,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:b&&!n.isMobile?`${p}px`:void 0},children:i.jsx(ei,{})})]})]})});ti.displayName="AppLayout";const Ru=Va`
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
`,Mu=()=>i.jsx(ii,{children:i.jsxs(Ka,{children:[i.jsx(Ru,{}),i.jsx(zs,{children:i.jsx(as,{children:i.jsx(Jn,{path:"/",element:i.jsx(sc,{children:i.jsx(ti,{})})})})})]})}),ri=document.getElementById("root");if(!ri)throw new Error("Root element not found");const Eu=Bn(ri);Eu.render(i.jsx(Mu,{}));
