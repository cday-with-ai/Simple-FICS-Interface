import{u as Ne,j as i,a as Ee,b as Ut,c as Fn,d as fr,e as Yt,V as oi,f as ii,l as Ur,R as si}from"./shared-S92H7BHJ.js";import{a as ai,r as f,R as ie}from"./vendor-cxkclgJA.js";import{o as K}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var Bn,Yr=ai;Bn=Yr.createRoot,Yr.hydrateRoot;var Er={};Object.defineProperty(Er,"__esModule",{value:!0});Er.parse=mi;Er.serialize=fi;const ci=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,li=/^[\u0021-\u003A\u003C-\u007E]*$/,di=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,ui=/^[\u0020-\u003A\u003D-\u007E]*$/,hi=Object.prototype.toString,pi=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function mi(e,t){const r=new pi,n=e.length;if(n<2)return r;const o=t?.decode||gi;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const p=e.indexOf(";",s),c=p===-1?n:p;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const d=qr(e,s,a),l=Vr(e,a,d),h=e.slice(d,l);if(r[h]===void 0){let g=qr(e,a+1,c),u=Vr(e,c,g);const y=o(e.slice(g,u));r[h]=y}s=c+1}while(s<n);return r}function qr(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Vr(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function fi(e,t,r){const n=r?.encode||encodeURIComponent;if(!ci.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!li.test(o))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+o;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!di.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!ui.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!xi(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function gi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function xi(e){return hi.call(e)==="[object Date]"}var Kr="popstate";function yi(e={}){function t(n,o){let{pathname:s,search:a,hash:p}=n.location;return gr("",{pathname:s,search:a,hash:p},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:gt(o)}return $i(t,r,null,e)}function Y(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Se(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function bi(){return Math.random().toString(36).substring(2,10)}function Xr(e,t){return{usr:e.state,key:e.key,idx:t}}function gr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?rt(t):t,state:r,key:t&&t.key||n||bi()}}function gt({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function rt(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function $i(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:s=!1}=n,a=o.history,p="POP",c=null,d=l();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function l(){return(a.state||{idx:null}).idx}function h(){p="POP";let $=l(),x=$==null?null:$-d;d=$,c&&c({action:p,location:b.location,delta:x})}function g($,x){p="PUSH";let k=gr(b.location,$,x);d=l()+1;let S=Xr(k,d),C=b.createHref(k);try{a.pushState(S,"",C)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;o.location.assign(C)}s&&c&&c({action:p,location:b.location,delta:1})}function u($,x){p="REPLACE";let k=gr(b.location,$,x);d=l();let S=Xr(k,d),C=b.createHref(k);a.replaceState(S,"",C),s&&c&&c({action:p,location:b.location,delta:0})}function y($){return vi($)}let b={get action(){return p},get location(){return e(o,a)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Kr,h),c=$,()=>{o.removeEventListener(Kr,h),c=null}},createHref($){return t(o,$)},createURL:y,encodeLocation($){let x=y($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:u,go($){return a.go($)}};return b}function vi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),Y(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:gt(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Wn(e,t,r="/"){return wi(e,t,r,!1)}function wi(e,t,r,n){let o=typeof t=="string"?rt(t):t,s=Me(o.pathname||"/",r);if(s==null)return null;let a=Hn(e);ki(a);let p=null;for(let c=0;p==null&&c<a.length;++c){let d=Ii(s);p=Li(a[c],d,n)}return p}function Hn(e,t=[],r=[],n=""){let o=(s,a,p)=>{let c={relativePath:p===void 0?s.path||"":p,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(Y(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let d=Re([n,c.relativePath]),l=r.concat(c);s.children&&s.children.length>0&&(Y(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Hn(s.children,t,l,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Ei(d,s.index),routesMeta:l})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))o(s,a);else for(let p of _n(s.path))o(s,a,p)}),t}function _n(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return o?[s,""]:[s];let a=_n(n.join("/")),p=[];return p.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&p.push(...a),p.map(c=>e.startsWith("/")&&c===""?"/":c)}function ki(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:zi(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var Si=/^:[\w-]+$/,Ci=3,ji=2,Pi=1,Ri=10,Mi=-2,Qr=e=>e==="*";function Ei(e,t){let r=e.split("/"),n=r.length;return r.some(Qr)&&(n+=Mi),t&&(n+=ji),r.filter(o=>!Qr(o)).reduce((o,s)=>o+(Si.test(s)?Ci:s===""?Pi:Ri),n)}function zi(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function Li(e,t,r=!1){let{routesMeta:n}=e,o={},s="/",a=[];for(let p=0;p<n.length;++p){let c=n[p],d=p===n.length-1,l=s==="/"?t:t.slice(s.length)||"/",h=Bt({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},l),g=c.route;if(!h&&d&&r&&!n[n.length-1].route.index&&(h=Bt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},l)),!h)return null;Object.assign(o,h.params),a.push({params:o,pathname:Re([s,h.pathname]),pathnameBase:Oi(Re([s,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(s=Re([s,h.pathnameBase]))}return a}function Bt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Ti(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),p=o.slice(1);return{params:n.reduce((d,{paramName:l,isOptional:h},g)=>{if(l==="*"){let y=p[g]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const u=p[g];return h&&!u?d[l]=void 0:d[l]=(u||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function Ti(e,t=!1,r=!0){Se(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,p,c)=>(n.push({paramName:p,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function Ii(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Se(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Me(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ai(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?rt(e):e;return{pathname:r?r.startsWith("/")?r:Di(r,t):t,search:Fi(n),hash:Bi(o)}}function Di(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function rr(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ni(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Gn(e){let t=Ni(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Un(e,t,r,n=!1){let o;typeof e=="string"?o=rt(e):(o={...e},Y(!o.pathname||!o.pathname.includes("?"),rr("?","pathname","search",o)),Y(!o.pathname||!o.pathname.includes("#"),rr("#","pathname","hash",o)),Y(!o.search||!o.search.includes("#"),rr("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,p;if(a==null)p=r;else{let h=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;o.pathname=g.join("/")}p=h>=0?t[h]:"/"}let c=Ai(o,p),d=a&&a!=="/"&&a.endsWith("/"),l=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||l)&&(c.pathname+="/"),c}var Re=e=>e.join("/").replace(/\/\/+/g,"/"),Oi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Fi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Bi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Wi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Yn=["POST","PUT","PATCH","DELETE"];new Set(Yn);var Hi=["GET",...Yn];new Set(Hi);var nt=f.createContext(null);nt.displayName="DataRouter";var qt=f.createContext(null);qt.displayName="DataRouterState";var qn=f.createContext({isTransitioning:!1});qn.displayName="ViewTransition";var _i=f.createContext(new Map);_i.displayName="Fetchers";var Gi=f.createContext(null);Gi.displayName="Await";var Ce=f.createContext(null);Ce.displayName="Navigation";var $t=f.createContext(null);$t.displayName="Location";var ze=f.createContext({outlet:null,matches:[],isDataRoute:!1});ze.displayName="Route";var zr=f.createContext(null);zr.displayName="RouteError";function Ui(e,{relative:t}={}){Y(vt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=f.useContext(Ce),{hash:o,pathname:s,search:a}=wt(e,{relative:t}),p=s;return r!=="/"&&(p=s==="/"?r:Re([r,s])),n.createHref({pathname:p,search:a,hash:o})}function vt(){return f.useContext($t)!=null}function Ge(){return Y(vt(),"useLocation() may be used only in the context of a <Router> component."),f.useContext($t).location}var Vn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Kn(e){f.useContext(Ce).static||f.useLayoutEffect(e)}function Yi(){let{isDataRoute:e}=f.useContext(ze);return e?is():qi()}function qi(){Y(vt(),"useNavigate() may be used only in the context of a <Router> component.");let e=f.useContext(nt),{basename:t,navigator:r}=f.useContext(Ce),{matches:n}=f.useContext(ze),{pathname:o}=Ge(),s=JSON.stringify(Gn(n)),a=f.useRef(!1);return Kn(()=>{a.current=!0}),f.useCallback((c,d={})=>{if(Se(a.current,Vn),!a.current)return;if(typeof c=="number"){r.go(c);return}let l=Un(c,JSON.parse(s),o,d.relative==="path");e==null&&t!=="/"&&(l.pathname=l.pathname==="/"?t:Re([t,l.pathname])),(d.replace?r.replace:r.push)(l,d.state,d)},[t,r,s,o,e])}f.createContext(null);function wt(e,{relative:t}={}){let{matches:r}=f.useContext(ze),{pathname:n}=Ge(),o=JSON.stringify(Gn(r));return f.useMemo(()=>Un(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function Vi(e,t){return Xn(e,t)}function Xn(e,t,r,n){Y(vt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=f.useContext(Ce),{matches:s}=f.useContext(ze),a=s[s.length-1],p=a?a.params:{},c=a?a.pathname:"/",d=a?a.pathnameBase:"/",l=a&&a.route;{let x=l&&l.path||"";Qn(c,!l||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let h=Ge(),g;if(t){let x=typeof t=="string"?rt(t):t;Y(d==="/"||x.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${x.pathname}" was given in the \`location\` prop.`),g=x}else g=h;let u=g.pathname||"/",y=u;if(d!=="/"){let x=d.replace(/^\//,"").split("/");y="/"+u.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=Wn(e,{pathname:y});Se(l||b!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Se(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=Zi(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},p,x.params),pathname:Re([d,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?d:Re([d,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),s,r,n);return t&&$?f.createElement($t.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},$):$}function Ki(){let e=os(),t=Wi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=f.createElement(f.Fragment,null,f.createElement("p",null,"💿 Hey developer 👋"),f.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",f.createElement("code",{style:s},"ErrorBoundary")," or"," ",f.createElement("code",{style:s},"errorElement")," prop on your route.")),f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:o},r):null,a)}var Xi=f.createElement(Ki,null),Qi=class extends f.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?f.createElement(ze.Provider,{value:this.props.routeContext},f.createElement(zr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Ji({routeContext:e,match:t,children:r}){let n=f.useContext(nt);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),f.createElement(ze.Provider,{value:e},r)}function Zi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=r?.errors;if(s!=null){let c=o.findIndex(d=>d.route.id&&s?.[d.route.id]!==void 0);Y(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,p=-1;if(r)for(let c=0;c<o.length;c++){let d=o[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(p=c),d.route.id){let{loaderData:l,errors:h}=r,g=d.route.loader&&!l.hasOwnProperty(d.route.id)&&(!h||h[d.route.id]===void 0);if(d.route.lazy||g){a=!0,p>=0?o=o.slice(0,p+1):o=[o[0]];break}}}return o.reduceRight((c,d,l)=>{let h,g=!1,u=null,y=null;r&&(h=s&&d.route.id?s[d.route.id]:void 0,u=d.route.errorElement||Xi,a&&(p<0&&l===0?(Qn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,y=null):p===l&&(g=!0,y=d.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,l+1)),$=()=>{let x;return h?x=u:g?x=y:d.route.Component?x=f.createElement(d.route.Component,null):d.route.element?x=d.route.element:x=c,f.createElement(Ji,{match:d,routeContext:{outlet:c,matches:b,isDataRoute:r!=null},children:x})};return r&&(d.route.ErrorBoundary||d.route.errorElement||l===0)?f.createElement(Qi,{location:r.location,revalidation:r.revalidation,component:u,error:h,children:$(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):$()},null)}function Lr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function es(e){let t=f.useContext(nt);return Y(t,Lr(e)),t}function ts(e){let t=f.useContext(qt);return Y(t,Lr(e)),t}function rs(e){let t=f.useContext(ze);return Y(t,Lr(e)),t}function Tr(e){let t=rs(e),r=t.matches[t.matches.length-1];return Y(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function ns(){return Tr("useRouteId")}function os(){let e=f.useContext(zr),t=ts("useRouteError"),r=Tr("useRouteError");return e!==void 0?e:t.errors?.[r]}function is(){let{router:e}=es("useNavigate"),t=Tr("useNavigate"),r=f.useRef(!1);return Kn(()=>{r.current=!0}),f.useCallback(async(o,s={})=>{Se(r.current,Vn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...s}))},[e,t])}var Jr={};function Qn(e,t,r){!t&&!Jr[e]&&(Jr[e]=!0,Se(!1,r))}f.memo(ss);function ss({routes:e,future:t,state:r}){return Xn(e,void 0,r,t)}function Jn(e){Y(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function as({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:s=!1}){Y(!vt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),p=f.useMemo(()=>({basename:a,navigator:o,static:s,future:{}}),[a,o,s]);typeof r=="string"&&(r=rt(r));let{pathname:c="/",search:d="",hash:l="",state:h=null,key:g="default"}=r,u=f.useMemo(()=>{let y=Me(c,a);return y==null?null:{location:{pathname:y,search:d,hash:l,state:h,key:g},navigationType:n}},[a,c,d,l,h,g,n]);return Se(u!=null,`<Router basename="${a}"> is not able to match the URL "${c}${d}${l}" because it does not start with the basename, so the <Router> won't render anything.`),u==null?null:f.createElement(Ce.Provider,{value:p},f.createElement($t.Provider,{children:t,value:u}))}function cs({children:e,location:t}){return Vi(xr(e),t)}function xr(e,t=[]){let r=[];return f.Children.forEach(e,(n,o)=>{if(!f.isValidElement(n))return;let s=[...t,o];if(n.type===f.Fragment){r.push.apply(r,xr(n.props.children,s));return}Y(n.type===Jn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Y(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=xr(n.props.children,s)),r.push(a)}),r}var Tt="get",It="application/x-www-form-urlencoded";function Vt(e){return e!=null&&typeof e.tagName=="string"}function ls(e){return Vt(e)&&e.tagName.toLowerCase()==="button"}function ds(e){return Vt(e)&&e.tagName.toLowerCase()==="form"}function us(e){return Vt(e)&&e.tagName.toLowerCase()==="input"}function hs(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ps(e,t){return e.button===0&&(!t||t==="_self")&&!hs(e)}var jt=null;function ms(){if(jt===null)try{new FormData(document.createElement("form"),0),jt=!1}catch{jt=!0}return jt}var fs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function nr(e){return e!=null&&!fs.has(e)?(Se(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${It}"`),null):e}function gs(e,t){let r,n,o,s,a;if(ds(e)){let p=e.getAttribute("action");n=p?Me(p,t):null,r=e.getAttribute("method")||Tt,o=nr(e.getAttribute("enctype"))||It,s=new FormData(e)}else if(ls(e)||us(e)&&(e.type==="submit"||e.type==="image")){let p=e.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||p.getAttribute("action");if(n=c?Me(c,t):null,r=e.getAttribute("formmethod")||p.getAttribute("method")||Tt,o=nr(e.getAttribute("formenctype"))||nr(p.getAttribute("enctype"))||It,s=new FormData(p,e),!ms()){let{name:d,type:l,value:h}=e;if(l==="image"){let g=d?`${d}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else d&&s.append(d,h)}}else{if(Vt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Tt,n=null,o=It,a=e}return s&&o==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:s,body:a}}function Ir(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function xs(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ys(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function bs(e,t,r){let n=await Promise.all(e.map(async o=>{let s=t.routes[o.route.id];if(s){let a=await xs(s,r);return a.links?a.links():[]}return[]}));return ks(n.flat(1).filter(ys).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Zr(e,t,r,n,o,s){let a=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,p=(c,d)=>r[d].pathname!==c.pathname||r[d].route.path?.endsWith("*")&&r[d].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,d)=>a(c,d)||p(c,d)):s==="data"?t.filter((c,d)=>{let l=n.routes[c.route.id];if(!l||!l.hasLoader)return!1;if(a(c,d)||p(c,d))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function $s(e,t,{includeHydrateFallback:r}={}){return vs(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let s=[o.module];return o.clientActionModule&&(s=s.concat(o.clientActionModule)),o.clientLoaderModule&&(s=s.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(s=s.concat(o.hydrateFallbackModule)),o.imports&&(s=s.concat(o.imports)),s}).flat(1))}function vs(e){return[...new Set(e)]}function ws(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function ks(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let s=JSON.stringify(ws(o));return r.has(s)||(r.add(s),n.push({key:s,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Ss=new Set([100,101,204,205]);function Cs(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Me(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Zn(){let e=f.useContext(nt);return Ir(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function js(){let e=f.useContext(qt);return Ir(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ar=f.createContext(void 0);Ar.displayName="FrameworkContext";function eo(){let e=f.useContext(Ar);return Ir(e,"You must render this element inside a <HydratedRouter> element"),e}function Ps(e,t){let r=f.useContext(Ar),[n,o]=f.useState(!1),[s,a]=f.useState(!1),{onFocus:p,onBlur:c,onMouseEnter:d,onMouseLeave:l,onTouchStart:h}=t,g=f.useRef(null);f.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=x=>{x.forEach(k=>{a(k.isIntersecting)})},$=new IntersectionObserver(b,{threshold:.5});return g.current&&$.observe(g.current),()=>{$.disconnect()}}},[e]),f.useEffect(()=>{if(n){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[n]);let u=()=>{o(!0)},y=()=>{o(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:lt(p,u),onBlur:lt(c,y),onMouseEnter:lt(d,u),onMouseLeave:lt(l,y),onTouchStart:lt(h,u)}]:[!1,g,{}]}function lt(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Rs({page:e,...t}){let{router:r}=Zn(),n=f.useMemo(()=>Wn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?f.createElement(Es,{page:e,matches:n,...t}):null}function Ms(e){let{manifest:t,routeModules:r}=eo(),[n,o]=f.useState([]);return f.useEffect(()=>{let s=!1;return bs(e,t,r).then(a=>{s||o(a)}),()=>{s=!0}},[e,t,r]),n}function Es({page:e,matches:t,...r}){let n=Ge(),{manifest:o,routeModules:s}=eo(),{basename:a}=Zn(),{loaderData:p,matches:c}=js(),d=f.useMemo(()=>Zr(e,t,c,o,n,"data"),[e,t,c,o,n]),l=f.useMemo(()=>Zr(e,t,c,o,n,"assets"),[e,t,c,o,n]),h=f.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let y=new Set,b=!1;if(t.forEach(x=>{let k=o.routes[x.route.id];!k||!k.hasLoader||(!d.some(S=>S.route.id===x.route.id)&&x.route.id in p&&s[x.route.id]?.shouldRevalidate||k.hasClientLoader?b=!0:y.add(x.route.id))}),y.size===0)return[];let $=Cs(e,a);return b&&y.size>0&&$.searchParams.set("_routes",t.filter(x=>y.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[a,p,n,o,d,t,e,s]),g=f.useMemo(()=>$s(l,o),[l,o]),u=Ms(l);return f.createElement(f.Fragment,null,h.map(y=>f.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...r})),g.map(y=>f.createElement("link",{key:y,rel:"modulepreload",href:y,...r})),u.map(({key:y,link:b})=>f.createElement("link",{key:y,...b})))}function zs(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var to=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{to&&(window.__reactRouterVersion="7.6.3")}catch{}function Ls({basename:e,children:t,window:r}){let n=f.useRef();n.current==null&&(n.current=yi({window:r,v5Compat:!0}));let o=n.current,[s,a]=f.useState({action:o.action,location:o.location}),p=f.useCallback(c=>{f.startTransition(()=>a(c))},[a]);return f.useLayoutEffect(()=>o.listen(p),[o,p]),f.createElement(as,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o})}var ro=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,no=f.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:s,replace:a,state:p,target:c,to:d,preventScrollReset:l,viewTransition:h,...g},u){let{basename:y}=f.useContext(Ce),b=typeof d=="string"&&ro.test(d),$,x=!1;if(typeof d=="string"&&b&&($=d,to))try{let _=new URL(window.location.href),X=d.startsWith("//")?new URL(_.protocol+d):new URL(d),v=Me(X.pathname,y);X.origin===_.origin&&v!=null?d=v+X.search+X.hash:x=!0}catch{Se(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=Ui(d,{relative:o}),[S,C,j]=Ps(n,g),T=Ds(d,{replace:a,state:p,target:c,preventScrollReset:l,relative:o,viewTransition:h});function z(_){t&&t(_),_.defaultPrevented||T(_)}let W=f.createElement("a",{...g,...j,href:$||k,onClick:x||s?t:z,ref:zs(u,C),target:c,"data-discover":!b&&r==="render"?"true":void 0});return S&&!b?f.createElement(f.Fragment,null,W,f.createElement(Rs,{page:k})):W});no.displayName="Link";var Ts=f.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:s,to:a,viewTransition:p,children:c,...d},l){let h=wt(a,{relative:d.relative}),g=Ge(),u=f.useContext(qt),{navigator:y,basename:b}=f.useContext(Ce),$=u!=null&&Ws(h)&&p===!0,x=y.encodeLocation?y.encodeLocation(h).pathname:h.pathname,k=g.pathname,S=u&&u.navigation&&u.navigation.location?u.navigation.location.pathname:null;r||(k=k.toLowerCase(),S=S?S.toLowerCase():null,x=x.toLowerCase()),S&&b&&(S=Me(S,b)||S);const C=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let j=k===x||!o&&k.startsWith(x)&&k.charAt(C)==="/",T=S!=null&&(S===x||!o&&S.startsWith(x)&&S.charAt(x.length)==="/"),z={isActive:j,isPending:T,isTransitioning:$},W=j?t:void 0,_;typeof n=="function"?_=n(z):_=[n,j?"active":null,T?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let X=typeof s=="function"?s(z):s;return f.createElement(no,{...d,"aria-current":W,className:_,ref:l,style:X,to:a,viewTransition:p},typeof c=="function"?c(z):c)});Ts.displayName="NavLink";var Is=f.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:s,method:a=Tt,action:p,onSubmit:c,relative:d,preventScrollReset:l,viewTransition:h,...g},u)=>{let y=Fs(),b=Bs(p,{relative:d}),$=a.toLowerCase()==="get"?"get":"post",x=typeof p=="string"&&ro.test(p),k=S=>{if(c&&c(S),S.defaultPrevented)return;S.preventDefault();let C=S.nativeEvent.submitter,j=C?.getAttribute("formmethod")||a;y(C||S.currentTarget,{fetcherKey:t,method:j,navigate:r,replace:o,state:s,relative:d,preventScrollReset:l,viewTransition:h})};return f.createElement("form",{ref:u,method:$,action:b,onSubmit:n?c:k,...g,"data-discover":!x&&e==="render"?"true":void 0})});Is.displayName="Form";function As(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function oo(e){let t=f.useContext(nt);return Y(t,As(e)),t}function Ds(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:s,viewTransition:a}={}){let p=Yi(),c=Ge(),d=wt(e,{relative:s});return f.useCallback(l=>{if(ps(l,t)){l.preventDefault();let h=r!==void 0?r:gt(c)===gt(d);p(e,{replace:h,state:n,preventScrollReset:o,relative:s,viewTransition:a})}},[c,p,d,r,n,t,e,o,s,a])}var Ns=0,Os=()=>`__${String(++Ns)}__`;function Fs(){let{router:e}=oo("useSubmit"),{basename:t}=f.useContext(Ce),r=ns();return f.useCallback(async(n,o={})=>{let{action:s,method:a,encType:p,formData:c,body:d}=gs(n,t);if(o.navigate===!1){let l=o.fetcherKey||Os();await e.fetch(l,r,o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||p,flushSync:o.flushSync})}else await e.navigate(o.action||s,{preventScrollReset:o.preventScrollReset,formData:c,body:d,formMethod:o.method||a,formEncType:o.encType||p,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function Bs(e,{relative:t}={}){let{basename:r}=f.useContext(Ce),n=f.useContext(ze);Y(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),s={...wt(e||".",{relative:t})},a=Ge();if(e==null){s.search=a.search;let p=new URLSearchParams(s.search),c=p.getAll("index");if(c.some(l=>l==="")){p.delete("index"),c.filter(h=>h).forEach(h=>p.append("index",h));let l=p.toString();s.search=l?`?${l}`:""}}return(!e||e===".")&&o.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Re([r,s.pathname])),gt(s)}function Ws(e,t={}){let r=f.useContext(qn);Y(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=oo("useViewTransitionState"),o=wt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Me(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Me(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Bt(o.pathname,a)!=null||Bt(o.pathname,s)!=null}[...Ss];const io={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Hs={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},_s={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},so={colors:Hs,...io},Gs={colors:_s,...io},Us={light:so,dark:Gs},Ys=so;var re=function(){return re=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},re.apply(this,arguments)};function xt(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var U="-ms-",ft="-moz-",H="-webkit-",ao="comm",Kt="rule",Dr="decl",qs="@import",co="@keyframes",Vs="@layer",lo=Math.abs,Nr=String.fromCharCode,yr=Object.assign;function Ks(e,t){return te(e,0)^45?(((t<<2^te(e,0))<<2^te(e,1))<<2^te(e,2))<<2^te(e,3):0}function uo(e){return e.trim()}function Pe(e,t){return(e=t.exec(e))?e[0]:e}function D(e,t,r){return e.replace(t,r)}function At(e,t,r){return e.indexOf(t,r)}function te(e,t){return e.charCodeAt(t)|0}function Qe(e,t,r){return e.slice(t,r)}function we(e){return e.length}function ho(e){return e.length}function dt(e,t){return t.push(e),e}function Xs(e,t){return e.map(t).join("")}function en(e,t){return e.filter(function(r){return!Pe(r,t)})}var Xt=1,Je=1,po=0,ye=0,J=0,ot="";function Qt(e,t,r,n,o,s,a,p){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:Xt,column:Je,length:a,return:"",siblings:p}}function Ie(e,t){return yr(Qt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ue(e){for(;e.root;)e=Ie(e.root,{children:[e]});dt(e,e.siblings)}function Qs(){return J}function Js(){return J=ye>0?te(ot,--ye):0,Je--,J===10&&(Je=1,Xt--),J}function be(){return J=ye<po?te(ot,ye++):0,Je++,J===10&&(Je=1,Xt++),J}function Be(){return te(ot,ye)}function Dt(){return ye}function Jt(e,t){return Qe(ot,e,t)}function br(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Zs(e){return Xt=Je=1,po=we(ot=e),ye=0,[]}function ea(e){return ot="",e}function or(e){return uo(Jt(ye-1,$r(e===91?e+2:e===40?e+1:e)))}function ta(e){for(;(J=Be())&&J<33;)be();return br(e)>2||br(J)>3?"":" "}function ra(e,t){for(;--t&&be()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return Jt(e,Dt()+(t<6&&Be()==32&&be()==32))}function $r(e){for(;be();)switch(J){case e:return ye;case 34:case 39:e!==34&&e!==39&&$r(J);break;case 40:e===41&&$r(e);break;case 92:be();break}return ye}function na(e,t){for(;be()&&e+J!==57;)if(e+J===84&&Be()===47)break;return"/*"+Jt(t,ye-1)+"*"+Nr(e===47?e:be())}function oa(e){for(;!br(Be());)be();return Jt(e,ye)}function ia(e){return ea(Nt("",null,null,null,[""],e=Zs(e),0,[0],e))}function Nt(e,t,r,n,o,s,a,p,c){for(var d=0,l=0,h=a,g=0,u=0,y=0,b=1,$=1,x=1,k=0,S="",C=o,j=s,T=n,z=S;$;)switch(y=k,k=be()){case 40:if(y!=108&&te(z,h-1)==58){At(z+=D(or(k),"&","&\f"),"&\f",lo(d?p[d-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:z+=or(k);break;case 9:case 10:case 13:case 32:z+=ta(y);break;case 92:z+=ra(Dt()-1,7);continue;case 47:switch(Be()){case 42:case 47:dt(sa(na(be(),Dt()),t,r,c),c);break;default:z+="/"}break;case 123*b:p[d++]=we(z)*x;case 125*b:case 59:case 0:switch(k){case 0:case 125:$=0;case 59+l:x==-1&&(z=D(z,/\f/g,"")),u>0&&we(z)-h&&dt(u>32?rn(z+";",n,r,h-1,c):rn(D(z," ","")+";",n,r,h-2,c),c);break;case 59:z+=";";default:if(dt(T=tn(z,t,r,d,l,o,p,S,C=[],j=[],h,s),s),k===123)if(l===0)Nt(z,t,T,T,C,s,h,p,j);else switch(g===99&&te(z,3)===110?100:g){case 100:case 108:case 109:case 115:Nt(e,T,T,n&&dt(tn(e,T,T,0,0,o,p,S,o,C=[],h,j),j),o,j,h,p,n?C:j);break;default:Nt(z,T,T,T,[""],j,0,p,j)}}d=l=u=0,b=x=1,S=z="",h=a;break;case 58:h=1+we(z),u=y;default:if(b<1){if(k==123)--b;else if(k==125&&b++==0&&Js()==125)continue}switch(z+=Nr(k),k*b){case 38:x=l>0?1:(z+="\f",-1);break;case 44:p[d++]=(we(z)-1)*x,x=1;break;case 64:Be()===45&&(z+=or(be())),g=Be(),l=h=we(S=z+=oa(Dt())),k++;break;case 45:y===45&&we(z)==2&&(b=0)}}return s}function tn(e,t,r,n,o,s,a,p,c,d,l,h){for(var g=o-1,u=o===0?s:[""],y=ho(u),b=0,$=0,x=0;b<n;++b)for(var k=0,S=Qe(e,g+1,g=lo($=a[b])),C=e;k<y;++k)(C=uo($>0?u[k]+" "+S:D(S,/&\f/g,u[k])))&&(c[x++]=C);return Qt(e,t,r,o===0?Kt:p,c,d,l,h)}function sa(e,t,r,n){return Qt(e,t,r,ao,Nr(Qs()),Qe(e,2,-2),0,n)}function rn(e,t,r,n,o){return Qt(e,t,r,Dr,Qe(e,0,n),Qe(e,n+1,-1),n,o)}function mo(e,t,r){switch(Ks(e,t)){case 5103:return H+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return H+e+e;case 4789:return ft+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return H+e+ft+e+U+e+e;case 5936:switch(te(e,t+11)){case 114:return H+e+U+D(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return H+e+U+D(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return H+e+U+D(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return H+e+U+e+e;case 6165:return H+e+U+"flex-"+e+e;case 5187:return H+e+D(e,/(\w+).+(:[^]+)/,H+"box-$1$2"+U+"flex-$1$2")+e;case 5443:return H+e+U+"flex-item-"+D(e,/flex-|-self/g,"")+(Pe(e,/flex-|baseline/)?"":U+"grid-row-"+D(e,/flex-|-self/g,""))+e;case 4675:return H+e+U+"flex-line-pack"+D(e,/align-content|flex-|-self/g,"")+e;case 5548:return H+e+U+D(e,"shrink","negative")+e;case 5292:return H+e+U+D(e,"basis","preferred-size")+e;case 6060:return H+"box-"+D(e,"-grow","")+H+e+U+D(e,"grow","positive")+e;case 4554:return H+D(e,/([^-])(transform)/g,"$1"+H+"$2")+e;case 6187:return D(D(D(e,/(zoom-|grab)/,H+"$1"),/(image-set)/,H+"$1"),e,"")+e;case 5495:case 3959:return D(e,/(image-set\([^]*)/,H+"$1$`$1");case 4968:return D(D(e,/(.+:)(flex-)?(.*)/,H+"box-pack:$3"+U+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+H+e+e;case 4200:if(!Pe(e,/flex-|baseline/))return U+"grid-column-align"+Qe(e,t)+e;break;case 2592:case 3360:return U+D(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,Pe(n.props,/grid-\w+-end/)})?~At(e+(r=r[t].value),"span",0)?e:U+D(e,"-start","")+e+U+"grid-row-span:"+(~At(r,"span",0)?Pe(r,/\d+/):+Pe(r,/\d+/)-+Pe(e,/\d+/))+";":U+D(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return Pe(n.props,/grid-\w+-start/)})?e:U+D(D(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return D(e,/(.+)-inline(.+)/,H+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(we(e)-1-t>6)switch(te(e,t+1)){case 109:if(te(e,t+4)!==45)break;case 102:return D(e,/(.+:)(.+)-([^]+)/,"$1"+H+"$2-$3$1"+ft+(te(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~At(e,"stretch",0)?mo(D(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return D(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,p,c,d){return U+o+":"+s+d+(a?U+o+"-span:"+(p?c:+c-+s)+d:"")+e});case 4949:if(te(e,t+6)===121)return D(e,":",":"+H)+e;break;case 6444:switch(te(e,te(e,14)===45?18:11)){case 120:return D(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+H+(te(e,14)===45?"inline-":"")+"box$3$1"+H+"$2$3$1"+U+"$2box$3")+e;case 100:return D(e,":",":"+U)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return D(e,"scroll-","scroll-snap-")+e}return e}function Wt(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function aa(e,t,r,n){switch(e.type){case Vs:if(e.children.length)break;case qs:case Dr:return e.return=e.return||e.value;case ao:return"";case co:return e.return=e.value+"{"+Wt(e.children,n)+"}";case Kt:if(!we(e.value=e.props.join(",")))return""}return we(r=Wt(e.children,n))?e.return=e.value+"{"+r+"}":""}function ca(e){var t=ho(e);return function(r,n,o,s){for(var a="",p=0;p<t;p++)a+=e[p](r,n,o,s)||"";return a}}function la(e){return function(t){t.root||(t=t.return)&&e(t)}}function da(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Dr:e.return=mo(e.value,e.length,r);return;case co:return Wt([Ie(e,{value:D(e.value,"@","@"+H)})],n);case Kt:if(e.length)return Xs(r=e.props,function(o){switch(Pe(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ue(Ie(e,{props:[D(o,/:(read-\w+)/,":"+ft+"$1")]})),Ue(Ie(e,{props:[o]})),yr(e,{props:en(r,n)});break;case"::placeholder":Ue(Ie(e,{props:[D(o,/:(plac\w+)/,":"+H+"input-$1")]})),Ue(Ie(e,{props:[D(o,/:(plac\w+)/,":"+ft+"$1")]})),Ue(Ie(e,{props:[D(o,/:(plac\w+)/,U+"input-$1")]})),Ue(Ie(e,{props:[o]})),yr(e,{props:en(r,n)});break}return""})}}var ua={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},Ze=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",fo="active",go="data-styled-version",Zt="6.1.19",Or=`/*!sc*/
`,Ht=typeof window<"u"&&typeof document<"u",ha=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),pa={},er=Object.freeze([]),et=Object.freeze({});function xo(e,t,r){return r===void 0&&(r=et),e.theme!==r.theme&&e.theme||t||r.theme}var yo=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ma=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,fa=/(^-|-$)/g;function nn(e){return e.replace(ma,"-").replace(fa,"")}var ga=/(a)(d)/gi,Pt=52,on=function(e){return String.fromCharCode(e+(e>25?39:97))};function vr(e){var t,r="";for(t=Math.abs(e);t>Pt;t=t/Pt|0)r=on(t%Pt)+r;return(on(t%Pt)+r).replace(ga,"$1-$2")}var ir,bo=5381,Ve=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},$o=function(e){return Ve(bo,e)};function vo(e){return vr($o(e)>>>0)}function xa(e){return e.displayName||e.name||"Component"}function sr(e){return typeof e=="string"&&!0}var wo=typeof Symbol=="function"&&Symbol.for,ko=wo?Symbol.for("react.memo"):60115,ya=wo?Symbol.for("react.forward_ref"):60112,ba={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},$a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},So={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},va=((ir={})[ya]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ir[ko]=So,ir);function sn(e){return("type"in(t=e)&&t.type.$$typeof)===ko?So:"$$typeof"in e?va[e.$$typeof]:ba;var t}var wa=Object.defineProperty,ka=Object.getOwnPropertyNames,an=Object.getOwnPropertySymbols,Sa=Object.getOwnPropertyDescriptor,Ca=Object.getPrototypeOf,cn=Object.prototype;function Co(e,t,r){if(typeof t!="string"){if(cn){var n=Ca(t);n&&n!==cn&&Co(e,n,r)}var o=ka(t);an&&(o=o.concat(an(t)));for(var s=sn(e),a=sn(t),p=0;p<o.length;++p){var c=o[p];if(!(c in $a||r&&r[c]||a&&c in a||s&&c in s)){var d=Sa(t,c);try{wa(e,c,d)}catch{}}}}return e}function We(e){return typeof e=="function"}function Fr(e){return typeof e=="object"&&"styledComponentId"in e}function Fe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function wr(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function yt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function kr(e,t,r){if(r===void 0&&(r=!1),!r&&!yt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=kr(e[n],t[n]);else if(yt(t))for(var n in t)e[n]=kr(e[n],t[n]);return e}function Br(e,t){Object.defineProperty(e,"toString",{value:t})}function He(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ja=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw He(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var p=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(p,r[a])&&(this.groupSizes[t]++,p++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Or);return r},e}(),Ot=new Map,_t=new Map,Ft=1,Rt=function(e){if(Ot.has(e))return Ot.get(e);for(;_t.has(Ft);)Ft++;var t=Ft++;return Ot.set(e,t),_t.set(t,e),t},Pa=function(e,t){Ft=t+1,Ot.set(e,t),_t.set(t,e)},Ra="style[".concat(Ze,"][").concat(go,'="').concat(Zt,'"]'),Ma=new RegExp("^".concat(Ze,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ea=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},za=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Or),o=[],s=0,a=n.length;s<a;s++){var p=n[s].trim();if(p){var c=p.match(Ma);if(c){var d=0|parseInt(c[1],10),l=c[2];d!==0&&(Pa(l,d),Ea(e,l,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(p)}}},ln=function(e){for(var t=document.querySelectorAll(Ra),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Ze)!==fo&&(za(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function La(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var jo=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(p){var c=Array.from(p.querySelectorAll("style[".concat(Ze,"]")));return c[c.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(Ze,fo),n.setAttribute(go,Zt);var a=La();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},Ta=function(){function e(t){this.element=jo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var a=n[o];if(a.ownerNode===r)return a}throw He(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Ia=function(){function e(t){this.element=jo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Aa=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),dn=Ht,Da={isServer:!Ht,useCSSOMInjection:!ha},Gt=function(){function e(t,r,n){t===void 0&&(t=et),r===void 0&&(r={});var o=this;this.options=re(re({},Da),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Ht&&dn&&(dn=!1,ln(this)),Br(this,function(){return function(s){for(var a=s.getTag(),p=a.length,c="",d=function(h){var g=function(x){return _t.get(x)}(h);if(g===void 0)return"continue";var u=s.names.get(g),y=a.getGroup(h);if(u===void 0||!u.size||y.length===0)return"continue";var b="".concat(Ze,".g").concat(h,'[id="').concat(g,'"]'),$="";u!==void 0&&u.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(y).concat(b,'{content:"').concat($,'"}').concat(Or)},l=0;l<p;l++)d(l);return c}(o)})}return e.registerId=function(t){return Rt(t)},e.prototype.rehydrate=function(){!this.server&&Ht&&ln(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(re(re({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Aa(o):n?new Ta(o):new Ia(o)}(this.options),new ja(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(Rt(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Rt(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Rt(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Na=/&/g,Oa=/^\s*\/\/.*$/gm;function Po(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Po(r.children,t)),r})}function Fa(e){var t,r,n,o=et,s=o.options,a=s===void 0?et:s,p=o.plugins,c=p===void 0?er:p,d=function(g,u,y){return y.startsWith(r)&&y.endsWith(r)&&y.replaceAll(r,"").length>0?".".concat(t):g},l=c.slice();l.push(function(g){g.type===Kt&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Na,r).replace(n,d))}),a.prefix&&l.push(da),l.push(aa);var h=function(g,u,y,b){u===void 0&&(u=""),y===void 0&&(y=""),b===void 0&&(b="&"),t=b,r=u,n=new RegExp("\\".concat(r,"\\b"),"g");var $=g.replace(Oa,""),x=ia(y||u?"".concat(y," ").concat(u," { ").concat($," }"):$);a.namespace&&(x=Po(x,a.namespace));var k=[];return Wt(x,ca(l.concat(la(function(S){return k.push(S)})))),k};return h.hash=c.length?c.reduce(function(g,u){return u.name||He(15),Ve(g,u.name)},bo).toString():"",h}var Ba=new Gt,Sr=Fa(),Ro=ie.createContext({shouldForwardProp:void 0,styleSheet:Ba,stylis:Sr});Ro.Consumer;ie.createContext(void 0);function Cr(){return f.useContext(Ro)}var Wa=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=Sr);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Br(this,function(){throw He(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Sr),this.name+t.hash},e}(),Ha=function(e){return e>="A"&&e<="Z"};function un(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Ha(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Mo=function(e){return e==null||e===!1||e===""},Eo=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!Mo(s)&&(Array.isArray(s)&&s.isCss||We(s)?n.push("".concat(un(o),":"),s,";"):yt(s)?n.push.apply(n,xt(xt(["".concat(o," {")],Eo(s),!1),["}"],!1)):n.push("".concat(un(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in ua||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ae(e,t,r,n){if(Mo(e))return[];if(Fr(e))return[".".concat(e.styledComponentId)];if(We(e)){if(!We(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return Ae(o,t,r,n)}var s;return e instanceof Wa?r?(e.inject(r,n),[e.getName(n)]):[e]:yt(e)?Eo(e):Array.isArray(e)?Array.prototype.concat.apply(er,e.map(function(a){return Ae(a,t,r,n)})):[e.toString()]}function zo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(We(r)&&!Fr(r))return!1}return!0}var _a=$o(Zt),Ga=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&zo(t),this.componentId=r,this.baseHash=Ve(_a,r),this.baseStyle=n,Gt.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Fe(o,this.staticRulesId);else{var s=wr(Ae(this.rules,t,r,n)),a=vr(Ve(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var p=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,p)}o=Fe(o,a),this.staticRulesId=a}else{for(var c=Ve(this.baseHash,n.hash),d="",l=0;l<this.rules.length;l++){var h=this.rules[l];if(typeof h=="string")d+=h;else if(h){var g=wr(Ae(h,t,r,n));c=Ve(c,g+l),d+=g}}if(d){var u=vr(c>>>0);r.hasNameForId(this.componentId,u)||r.insertRules(this.componentId,u,n(d,".".concat(u),void 0,this.componentId)),o=Fe(o,u)}}return o},e}(),bt=ie.createContext(void 0);bt.Consumer;function Ua(e){var t=ie.useContext(bt),r=f.useMemo(function(){return function(n,o){if(!n)throw He(14);if(We(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw He(8);return o?re(re({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?ie.createElement(bt.Provider,{value:r},e.children):null}var ar={};function Ya(e,t,r){var n=Fr(e),o=e,s=!sr(e),a=t.attrs,p=a===void 0?er:a,c=t.componentId,d=c===void 0?function(C,j){var T=typeof C!="string"?"sc":nn(C);ar[T]=(ar[T]||0)+1;var z="".concat(T,"-").concat(vo(Zt+T+ar[T]));return j?"".concat(j,"-").concat(z):z}(t.displayName,t.parentComponentId):c,l=t.displayName,h=l===void 0?function(C){return sr(C)?"styled.".concat(C):"Styled(".concat(xa(C),")")}(e):l,g=t.displayName&&t.componentId?"".concat(nn(t.displayName),"-").concat(t.componentId):t.componentId||d,u=n&&o.attrs?o.attrs.concat(p).filter(Boolean):p,y=t.shouldForwardProp;if(n&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;y=function(C,j){return b(C,j)&&$(C,j)}}else y=b}var x=new Ga(r,g,n?o.componentStyle:void 0);function k(C,j){return function(T,z,W){var _=T.attrs,X=T.componentStyle,v=T.defaultProps,F=T.foldedComponentIds,B=T.styledComponentId,I=T.target,G=ie.useContext(bt),Z=Cr(),ue=T.shouldForwardProp||Z.shouldForwardProp,me=xo(z,G,v)||et,se=function(je,ge,w){for(var L,R=re(re({},ge),{className:void 0,theme:w}),E=0;E<je.length;E+=1){var P=We(L=je[E])?L(R):L;for(var M in P)R[M]=M==="className"?Fe(R[M],P[M]):M==="style"?re(re({},R[M]),P[M]):P[M]}return ge.className&&(R.className=Fe(R.className,ge.className)),R}(_,z,me),Q=se.as||I,ae={};for(var ee in se)se[ee]===void 0||ee[0]==="$"||ee==="as"||ee==="theme"&&se.theme===me||(ee==="forwardedAs"?ae.as=se.forwardedAs:ue&&!ue(ee,Q)||(ae[ee]=se[ee]));var fe=function(je,ge){var w=Cr(),L=je.generateAndInjectStyles(ge,w.styleSheet,w.stylis);return L}(X,se),le=Fe(F,B);return fe&&(le+=" "+fe),se.className&&(le+=" "+se.className),ae[sr(Q)&&!yo.has(Q)?"class":"className"]=le,W&&(ae.ref=W),f.createElement(Q,ae)}(S,C,j)}k.displayName=h;var S=ie.forwardRef(k);return S.attrs=u,S.componentStyle=x,S.displayName=h,S.shouldForwardProp=y,S.foldedComponentIds=n?Fe(o.foldedComponentIds,o.styledComponentId):"",S.styledComponentId=g,S.target=n?o.target:e,Object.defineProperty(S,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(C){this._foldedDefaultProps=n?function(j){for(var T=[],z=1;z<arguments.length;z++)T[z-1]=arguments[z];for(var W=0,_=T;W<_.length;W++)kr(j,_[W],!0);return j}({},o.defaultProps,C):C}}),Br(S,function(){return".".concat(S.styledComponentId)}),s&&Co(S,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),S}function hn(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var pn=function(e){return Object.assign(e,{isCss:!0})};function ke(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(We(e)||yt(e))return pn(Ae(hn(er,xt([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Ae(n):pn(Ae(hn(n,t)))}function jr(e,t,r){if(r===void 0&&(r=et),!t)throw He(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,ke.apply(void 0,xt([o],s,!1)))};return n.attrs=function(o){return jr(e,t,re(re({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return jr(e,t,re(re({},r),o))},n}var Lo=function(e){return jr(Ya,e)},m=Lo;yo.forEach(function(e){m[e]=Lo(e)});var qa=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=zo(t),Gt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o(wr(Ae(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Gt.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Va(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=ke.apply(void 0,xt([e],t,!1)),o="sc-global-".concat(vo(JSON.stringify(n))),s=new qa(n,o),a=function(c){var d=Cr(),l=ie.useContext(bt),h=ie.useRef(d.styleSheet.allocateGSInstance(o)).current;return d.styleSheet.server&&p(h,c,d.styleSheet,l,d.stylis),ie.useLayoutEffect(function(){if(!d.styleSheet.server)return p(h,c,d.styleSheet,l,d.stylis),function(){return s.removeStyles(h,d.styleSheet)}},[h,c,d.styleSheet,l,d.stylis]),null};function p(c,d,l,h,g){if(s.isStatic)s.renderStyles(c,pa,l,g);else{var u=re(re({},d),{theme:xo(d,h,a.defaultProps)});s.renderStyles(c,u,l,g)}}return ie.memo(a)}const To=f.createContext(void 0),Io=()=>{const e=f.useContext(To);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ka=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Xa=K(({children:e})=>{const t=Ne(),r=t.preferences.theme||"system",o=r==="system"?Ka():r,s=Us[o]||Ys,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},p={theme:a,themeName:o,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=o==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:o==="dark"};return f.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),d=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",d),()=>c.removeEventListener("change",d)}},[r,t]),f.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([d,l])=>{typeof l=="string"?c.style.setProperty(`--color-${d}`,l):typeof l=="object"&&l!==null&&Object.entries(l).forEach(([h,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${d}-${h}`,g)})}),Object.entries(a.spacing).forEach(([d,l])=>{c.style.setProperty(`--spacing-${d}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[a,o]),i.jsx(To.Provider,{value:p,children:i.jsx(Ua,{theme:a,children:e})})});function Qa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ja(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var cr=typeof window<"u",Za=function(e){f.useEffect(e,[])},ec=function(e){var t=f.useRef(e);t.current=e,Za(function(){return function(){return t.current()}})},tc=function(e){var t=f.useRef(0),r=f.useState(e),n=r[0],o=r[1],s=f.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return ec(function(){cancelAnimationFrame(t.current)}),[n,s]},Ao=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,s=o===void 0?1/0:o,a=t.onChange,p=tc({width:cr?window.innerWidth:n,height:cr?window.innerHeight:s}),c=p[0],d=p[1];return f.useEffect(function(){if(cr){var l=function(){var h=window.innerWidth,g=window.innerHeight;d({width:h,height:g}),a&&a(h,g)};return Qa(window,"resize",l),function(){Ja(window,"resize",l)}}},[]),c};const Wr=()=>{const{width:e=0,height:t=0}=Ao();return{width:e,height:t}},rc=()=>{const{width:e=0,height:t=0}=Ao();return e>t?"landscape":"portrait"},nc=()=>{const{width:e}=Wr(),{theme:t}=Io(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Do=()=>{const[e,t]=f.useState(!1);return f.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},oc=()=>{const[e,t]=f.useState(!1),r=Do(),{width:n}=Wr();return f.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),p=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||p&&c})())},[r,n]),e},Oe=()=>{const e=Wr(),t=rc(),r=nc(),n=Do(),o=oc();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:o}},No=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},Oo=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},ic=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},sc=f.createContext(void 0),ac=({children:e})=>{const t=Ne(),r=Oe(),[n,o]=f.useState(!0),[s,a]=f.useState(["chat","moves"]),[p,c]=f.useState(!1),d=t.preferences.layout,l=f.useMemo(()=>d==="auto"?r.orientation:d,[d,r.orientation]),h=f.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=b=>{t.updatePreference("layout",b)},u=b=>{a($=>$.includes(b)?$.filter(x=>x!==b):[...$,b])};f.useEffect(()=>{c(!0),o($=>{const x=!h;return $!==x?x:$}),a($=>{if(h&&l==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(l==="landscape"&&!h){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[l,h]);const y={...r,layoutPreference:d,setLayoutPreference:g,activeLayout:l,isCompactMode:h,showSidebar:n,setSidebarVisible:o,activePanels:s,togglePanel:u,isTransitioning:p};return i.jsx(sc.Provider,{value:y,children:e})};m.div`
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

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ke`
                flex-direction: column;
            `:ke`
                flex-direction: row;
            `}
`;m.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ke`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `:ke`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `}
`;m.aside`
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`all ${e.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t,showSidebar:r})=>r?e==="portrait"||t?ke`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme:n})=>n.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `:ke`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme:n})=>n.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `:ke`
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
        `)),ke`${n}`}}
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
`;const cc=m.input`
  display: none;
`,lc=m.button`
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
`,dc=({settingId:e,onUpload:t})=>{const r=f.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const d=new FileReader;d.onload=l=>{const h=l.target?.result;t(e,h,a.name)},d.readAsDataURL(a),r.current&&(r.current.value="")},o=()=>{r.current?.click()};return i.jsxs(i.Fragment,{children:[i.jsx(cc,{ref:r,type:"file",accept:"audio/*",onChange:n}),i.jsx(lc,{type:"button",onClick:o,children:"Upload"})]})},uc=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,hc=m.div`
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
`,pc=m.div`
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
`,mc=m.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,fc=m.button`
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
`,gc=m.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,xc=m.input`
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
`,yc=m.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,bc=m.div`
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
`,$c=m.button`
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
`,vc=m.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,wc=m.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,kc=m.div`
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
`,Sc=m.div`
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
`,Cc=m.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,jc=m.input`
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
`,Pc=m.select`
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
`,Rc=m.input`
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
`,Mc=m.input`
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
`,Ec=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,zc=m.textarea`
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
`,Lc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,Tc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Ic=m.button`
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
`,Ac=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Dc=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Nc=m.p`
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
`,Fo=K(({isOpen:e,onClose:t})=>{const r=Ne(),{settingsRegistry:n}=r,o=Oe(),s=o.isMobileDevice||o.dimensions.width<768,[a,p]=f.useState("board"),[c,d]=f.useState(""),[l,h]=f.useState({}),[g,u]=f.useState({x:0,y:0}),[y,b]=f.useState(!1),[$,x]=f.useState({x:0,y:0}),k=f.useRef(null);if(f.useEffect(()=>{if(e&&k.current&&!s){const v=k.current.getBoundingClientRect();u({x:(window.innerWidth-v.width)/2,y:(window.innerHeight-v.height)/2})}},[e,s]),f.useEffect(()=>{if(!y)return;const v=B=>{u({x:B.clientX-$.x,y:B.clientY-$.y})},F=()=>{b(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",F),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",F)}},[y,$]),!e)return null;const S=n.getAllCategories(),C=c?n.search(c):n.getByCategory(a),j=(v,F)=>{const B=n.get(v);if(B){if(B.validate){const I=B.validate(F);if(typeof I=="string"){h(G=>({...G,[v]:I}));return}else if(I===!1){h(G=>({...G,[v]:"Invalid value"}));return}}h(I=>{const G={...I};return delete G[v],G}),B.value=F,B.onChange?.(F),v in r.preferences&&r.updatePreference(v,F)}},T=v=>{const F=n.get(v);F&&j(v,F.defaultValue)},z=(v,F,B)=>{const I=JSON.parse(localStorage.getItem("customSounds")||"{}"),G=`custom_${v}_${Date.now()}`;I[G]={dataUrl:F,fileName:B,settingId:v,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(I)),j(v,G);const Z=n.get(v);if(Z&&Z.options){const ue={label:`Custom: ${B}`,value:G},me=Z.options.filter(se=>!se.value.startsWith("custom_"));Z.options=[...me,ue]}},W=v=>{if(!(!v||v==="none"))try{let F;if(v.startsWith("custom_")){const G=JSON.parse(localStorage.getItem("customSounds")||"{}")[v];if(G&&G.dataUrl)F=G.dataUrl;else{console.error("Custom sound not found:",v);return}}else F=`/sounds/${v}`;const B=new Audio(F);B.volume=.5,B.play().catch(I=>{console.error("Failed to play sound:",I)})}catch(F){console.error("Error playing sound:",F)}},_=v=>{s||(b(!0),x({x:v.clientX-g.x,y:v.clientY-g.y}))},X=v=>{switch(v.type){case"boolean":return i.jsx(jc,{type:"checkbox",checked:v.value,onChange:I=>j(v.id,I.target.checked),$isMobile:s});case"select":if(v.id.endsWith("SoundFile")){const I=v.options?.find(ue=>ue.value===v.value),G=I?I.label:"None",Z=v.value&&v.value!=="none";return i.jsxs(Ec,{children:[i.jsx(Tc,{children:G}),i.jsx(Ic,{type:"button",onClick:()=>W(v.value),disabled:!Z,title:Z?"Play sound":"No sound selected",children:"▶️ Play"}),i.jsx(dc,{settingId:v.id,onUpload:z})]})}else return i.jsx(Pc,{value:v.value,onChange:I=>j(v.id,I.target.value),children:v.options?.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))});case"number":return i.jsx(Rc,{type:"number",value:v.value,min:v.min,max:v.max,step:v.step,onChange:I=>j(v.id,Number(I.target.value))});case"color":return i.jsx(Mc,{type:"color",value:v.value,onChange:I=>j(v.id,I.target.value),$isMobile:s});case"text":const B=!!l[v.id];return i.jsxs("div",{style:{width:"100%"},children:[i.jsx(zc,{value:v.value||"",onChange:I=>j(v.id,I.target.value),className:B?"error":"",placeholder:v.placeholder||"",spellCheck:!1}),B&&i.jsx(Lc,{children:l[v.id]})]});default:return null}};return i.jsx(uc,{children:i.jsxs(hc,{ref:k,$x:g.x,$y:g.y,$isMobile:s,children:[i.jsxs(pc,{onMouseDown:_,children:[i.jsx(mc,{children:"⚙️ Settings"}),i.jsx(fc,{onClick:t,onMouseDown:v=>v.stopPropagation(),children:"✕"})]}),i.jsx(gc,{children:i.jsx(xc,{type:"text",placeholder:"Search settings...",value:c,onChange:v=>d(v.target.value)})}),i.jsxs(yc,{$isMobile:s,children:[i.jsx(bc,{$isMobile:s,children:S.map(v=>i.jsxs($c,{$active:a===v.id&&!c,$isMobile:s,onClick:()=>{p(v.id),d("")},children:[i.jsx(vc,{children:v.icon}),!s&&v.label]},v.id))}),i.jsxs(wc,{children:[c&&i.jsxs(Nc,{children:["Found ",C.length,' settings matching "',c,'"']}),i.jsx(kc,{children:C.map(v=>v.type==="text"?i.jsxs(mn,{style:{flexDirection:"column",alignItems:"stretch"},children:[i.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{children:[i.jsx(fn,{children:v.label}),v.description&&i.jsx(gn,{children:v.description})]}),v.value!==v.defaultValue&&i.jsx(xn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),X(v)]},v.id):i.jsxs(mn,{children:[i.jsxs(Sc,{children:[i.jsx(fn,{children:v.label}),v.description&&i.jsx(gn,{children:v.description})]}),i.jsxs(Cc,{children:[X(v),v.value!==v.defaultValue&&i.jsx(xn,{type:"button",onClick:()=>T(v.id),title:"Reset to default",children:"↻"})]})]},v.id))})]})]}),i.jsxs(Ac,{children:[i.jsx(lr,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),i.jsxs(Dc,{children:[i.jsx(lr,{onClick:t,children:"Cancel"}),i.jsx(lr,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});Fo.displayName="SettingsDialog";const Oc=m.header`
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
`,Fc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Bc=m.button`
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
`,Wc=m.div`
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
`,Ye=m.button`
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
`;const Hc=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,_c=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Gc=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Uc=m.div`
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
`,Bo=K(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:o,setTheme:s}=Io(),a=No(),p=Oo(),[c,d]=f.useState(!1),[l,h]=f.useState(!1),[g,u]=f.useState(null),y=j=>{t.updatePreference("viewMode",j),h(!1),u(null)},b=j=>{t.updatePreference("chessOrientation",j),h(!1),u(null)},$=j=>{s(j),h(!1),u(null)},x=()=>{h(!l),u(null)},k=()=>{d(!0),h(!1),u(null)},S=j=>{u(j)},C=r==="chat-only";return ie.useEffect(()=>{const j=T=>{const z=T.target;l&&!z.closest(".hamburger-menu-container")&&h(!1)};if(l)return document.addEventListener("click",j),()=>document.removeEventListener("click",j)},[l]),ie.useEffect(()=>{const j=T=>{(T.ctrlKey||T.metaKey)&&T.key===","&&(T.preventDefault(),d(!0))};return window.addEventListener("keydown",j),()=>{window.removeEventListener("keydown",j)}},[]),i.jsxs(Oc,{children:[i.jsx(Fc,{children:i.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[i.jsx(Bc,{onClick:x,"aria-label":"Menu",children:"☰"}),i.jsxs(Wc,{$isOpen:l,children:[i.jsxs(Ye,{$hasSubmenu:!0,onMouseEnter:()=>S("theme"),onMouseLeave:()=>u(null),children:[i.jsx(qe,{children:"🎨 Theme"}),i.jsx(dr,{children:"▶"}),i.jsxs(ur,{$isOpen:g==="theme",children:[i.jsx(Te,{$isActive:o==="light",onClick:()=>$("light"),children:"☀ Light"}),i.jsx(Te,{$isActive:o==="dark",onClick:()=>$("dark"),children:"☾ Dark"}),i.jsx(Te,{$isActive:o==="system",onClick:()=>$("system"),children:"◐ System"})]})]}),i.jsxs(Ye,{$hasSubmenu:!0,onMouseEnter:()=>S("orientation"),onMouseLeave:()=>u(null),children:[i.jsx(qe,{children:"📐 Orientation"}),i.jsx(dr,{children:"▶"}),i.jsxs(ur,{$isOpen:g==="orientation",children:[p.includes("landscape")&&i.jsx(Te,{$isActive:n==="landscape",onClick:()=>!C&&b("landscape"),disabled:C,style:{opacity:C?.5:1},children:"▭ Landscape"}),p.includes("portrait")&&i.jsx(Te,{$isActive:n==="portrait",onClick:()=>!C&&b("portrait"),disabled:C,style:{opacity:C?.5:1},children:"▯ Portrait"})]})]}),i.jsxs(Ye,{$hasSubmenu:!0,onMouseEnter:()=>S("mode"),onMouseLeave:()=>u(null),children:[i.jsx(qe,{children:"🎮 View Mode"}),i.jsx(dr,{children:"▶"}),i.jsxs(ur,{$isOpen:g==="mode",children:[a.includes("chess-only")&&i.jsx(Te,{$isActive:r==="chess-only",onClick:()=>y("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&i.jsx(Te,{$isActive:r==="chess-and-chat",onClick:()=>y("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&i.jsx(Te,{$isActive:r==="chat-only",onClick:()=>y("chat-only"),children:"▤ Chat Only"})]})]}),i.jsx(yn,{}),i.jsx(Ye,{onClick:k,children:i.jsx(qe,{children:"⚙️ Settings"})}),i.jsx(yn,{}),i.jsx(Ye,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),h(!1)},children:i.jsx(qe,{children:"📖 Documentation"})}),i.jsx(Ye,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),h(!1)},children:i.jsx(qe,{children:"🐛 Report Issue"})})]})]})}),i.jsx(Hc,{children:i.jsxs(_c,{children:[i.jsx(Gc,{children:"Mode:"}),i.jsxs(Uc,{children:[a.includes("chess-only")&&i.jsx(hr,{$isActive:r==="chess-only",onClick:()=>y("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&i.jsx(hr,{$isActive:r==="chess-and-chat",onClick:()=>y("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&i.jsx(hr,{$isActive:r==="chat-only",onClick:()=>y("chat-only"),title:"Chat Only",children:"▤"})]})]})}),i.jsx(Fo,{isOpen:c,onClose:()=>d(!1)})]})});Bo.displayName="AppHeader";const Yc=m.img`
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
`,qc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},De=K(({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=Ne(),s=qc[e];if(!s)return null;const p=`/pieces/${o.preferences.pieceSet}/${s}.svg`;return i.jsx(Yc,{className:"chess-piece",src:p,alt:s,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces"})});De.displayName="ChessPiece";const Vc=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Kc=m.div`
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
`,Xc=m.button`
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
`,Wo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const s=["Q","R","B","N"],a=p=>t==="white"?p:p.toLowerCase();return i.jsx(Vc,{$isOpen:e,onClick:n,children:i.jsx(Kc,{$x:o.x,$y:o.y,onClick:p=>p.stopPropagation(),children:s.map(p=>i.jsx(Xc,{onClick:()=>r(p.toLowerCase()),children:i.jsx(De,{piece:a(p),size:50})},p))})})};Wo.displayName="PromotionDialog";const Qc=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Jc=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,Zc=m.div`
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
`,el=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,tl=m.div.attrs(e=>({style:{transform:`translate(
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
`,Ke=["a","b","c","d","e","f","g","h"],Xe=["8","7","6","5","4","3","2","1"];function rl(e,t){return(e+t)%2===0}function nl(e,t,r){const n=r?Ke[7-e]:Ke[e],o=r?Xe[7-t]:Xe[t];return`${n}${o}`}function ol(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,s)=>{let a=0;for(const p of o)if(p>="1"&&p<="8")a+=parseInt(p);else{const c=`${Ke[a]}${Xe[s]}`;t.set(c,p),a++}}),t}const Pr=K(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,onDrop:s,highlightedSquares:a=new Set,lastMove:p,interactive:c=!0,onSizeCalculated:d,selectedCapturedPiece:l,onCapturedPieceSelect:h})=>{Oe();const g=Ne(),u=Ut(),y=f.useRef(null),[b,$]=f.useState(t||200),[x,k]=f.useState(null),[S,C]=f.useState(new Set),[j,T]=f.useState(null),[z,W]=f.useState([]),_=f.useRef(),[X,v]=f.useState(null),[F,B]=f.useState(!1),I=f.useMemo(()=>ol(e),[e]),G=f.useRef(new Map),Z=f.useRef(0),ue=f.useCallback((w,L)=>{const R=Ke.indexOf(w[0]),E=Xe.indexOf(w[1]),P=L/8,M=r?(7-R)*P:R*P,N=r?(7-E)*P:E*P;return{x:M,y:N}},[r]),me=f.useCallback((w,L,R)=>{const E=w.toLowerCase()==="p",P=R[1];return E&&(P==="8"||P==="1")},[]),se=f.useCallback(w=>{w.preventDefault(),u.isPlaying&&u.clearPremove()},[u]);f.useEffect(()=>{if(t){$(t);return}const w=()=>{if(!y.current)return;const M=y.current.parentElement;if(!M)return;const{width:N,height:ne}=M.getBoundingClientRect();y.current.getBoundingClientRect();const he=16,A=N-he,oe=ne-he,V=Math.floor(Math.min(A,oe)),ce=Math.max(100,Math.floor(V/8)*8);ce!==b&&($(ce),d?.(ce))},L=setTimeout(w,50);w();let R;const E=()=>{clearTimeout(R),R=setTimeout(w,100)};window.addEventListener("resize",E);let P=null;return y.current&&y.current.parentElement&&(P=new ResizeObserver(()=>{E()}),P.observe(y.current.parentElement)),()=>{window.removeEventListener("resize",E),clearTimeout(R),clearTimeout(L),P&&P.disconnect()}},[t,b]);const Q=b/8,ae=f.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(u.isPlaying){const w=u.currentGame,L=u.playingColor;if(w&&L){const R=L==="white"?w.white.time:w.black.time,E=g.preferences.disableAnimationsThreshold;if(R<E)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,u.isPlaying,u.currentGame,u.playingColor]);f.useEffect(()=>{if(!ae||F||u.isProcessingServerUpdate){G.current=new Map(I),ae||W([]);return}const w=G.current,L=[];if(p){const{from:R,to:E}=p,P=w.get(R),M=I.get(E);if(P&&M===P&&!I.has(R)){const N=Date.now();N-Z.current<100?W([]):(L.push({piece:P,from:R,to:E,startTime:N}),Z.current=N)}}L.length>0&&W(R=>{const E=new Set(L.map(N=>N.from)),P=new Set(L.map(N=>N.to));return[...R.filter(N=>!E.has(N.from)&&!E.has(N.to)&&!P.has(N.from)&&!P.has(N.to)),...L]}),G.current=new Map(I)},[I,p,ae,F,u.isProcessingServerUpdate]),f.useEffect(()=>{if(F){const w=setTimeout(()=>{B(!1)},50);return()=>clearTimeout(w)}},[e,F]),f.useEffect(()=>{if(z.length===0)return;const w=()=>{const L=Date.now(),R=g.preferences.animationDuration;W(E=>{const P=E.filter(M=>L-M.startTime<R);return P.length>0&&(_.current=requestAnimationFrame(w)),P})};return _.current=requestAnimationFrame(w),()=>{_.current&&cancelAnimationFrame(_.current)}},[z.length,g.preferences.animationDuration]),f.useEffect(()=>{if(l)try{const w=u.currentPosition;u.chessBoard.getFen()!==w&&u.chessBoard.loadFen(w);const R=u.chessBoard.getLegalMoves().filter(P=>P.from==="@"&&P.san.toLowerCase().startsWith(l.toLowerCase())),E=new Set(R.map(P=>P.to));C(E),k(null)}catch(w){console.error("Error getting drop moves:",w),C(new Set)}},[l,u]);const ee=f.useCallback((w,L)=>{if(!c)return;const R=I.get(w);if(l){S.has(w)?(s?.(l,w),h?.(null),C(new Set)):(h?.(null),C(new Set));return}if(x)if(S.has(w)){const E=I.get(x);if(E&&me(E,x,w)){const P=E===E.toUpperCase()?"white":"black";if(u.isPlaying){const M=g.preferences.autoPromotionPiece;u.isMyTurn?(B(!0),o?.(x,w,M)):u.setPremove(x,w,M)}else{const M=L?.currentTarget.getBoundingClientRect();v({from:x,to:w,color:P,position:M?{x:M.left+M.width/2,y:M.top+M.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else u.isPlaying&&!u.isMyTurn?u.setPremove(x,w):(B(!0),o?.(x,w));k(null),C(new Set)}else if(w===x)k(null),C(new Set);else if(R)if(k(w),g.preferences.showLegalMoves)try{const E=u.currentPosition;u.chessBoard.getFen()!==E&&u.chessBoard.loadFen(E);const P=u.chessBoard.getLegalMoves(w),M=new Set(P.map(N=>N.to));C(M)}catch(E){console.error("Error getting legal moves:",E),C(new Set)}else C(new Set);else k(null),C(new Set);else if(R){k(w);try{const E=u.currentPosition;u.chessBoard.getFen()!==E&&u.chessBoard.loadFen(E);const P=R===R.toUpperCase(),M=u.chessBoard.getActiveColor();if(P&&M==="w"||!P&&M==="b")if(g.preferences.showLegalMoves){const ne=u.chessBoard.getLegalMoves(w),he=new Set(ne.map(A=>A.to));C(he)}else C(new Set);else C(new Set),k(null)}catch(E){console.error("Error getting legal moves:",E),C(new Set)}}},[x,S,I,o,s,c,me,u,g.preferences.autoPromotionPiece,l,h]),fe=f.useCallback((w,L,R)=>{if(!c)return;const E=w.clientX,P=w.clientY;let M=!1,N=!1;const he=w.currentTarget.getBoundingClientRect().width,A=V=>{const ce=Math.abs(V.clientX-E),at=Math.abs(V.clientY-P);(ce>3||at>3)&&R&&!N?(M=!0,N=!0,le(L,R,V,he)):N&&T(Ct=>Ct?{...Ct,x:V.clientX,y:V.clientY}:null)},oe=V=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",oe),N?je(V,L,R):M?(T(null),k(null),C(new Set)):ee(L,w)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",oe)},[c,ee]),le=f.useCallback((w,L,R,E)=>{if(k(w),g.preferences.showLegalMoves)try{const M=u.currentPosition;u.chessBoard.getFen()!==M&&u.chessBoard.loadFen(M);const N=L===L.toUpperCase(),ne=u.chessBoard.getActiveColor();if(N&&ne==="w"||!N&&ne==="b"){const A=u.chessBoard.getLegalMoves(w),oe=new Set(A.map(V=>V.to));C(oe)}else C(new Set)}catch(M){console.error("Error getting legal moves for drag:",M),C(new Set)}else C(new Set);const P={piece:L,from:w,x:R.clientX,y:R.clientY,size:E};T(P)},[g.preferences.showLegalMoves,u]),je=f.useCallback((w,L,R)=>{try{const M=document.elementsFromPoint(w.clientX,w.clientY).find(N=>N.getAttribute("data-square"))?.getAttribute("data-square");if(M&&M!==L)if(me(R,L,M)){const N=R===R.toUpperCase()?"white":"black";if(u.isPlaying){const ne=g.preferences.autoPromotionPiece;u.isMyTurn?(B(!0),o?.(L,M,ne)):u.setPremove(L,M,ne)}else v({from:L,to:M,color:N,position:{x:w.clientX,y:w.clientY}})}else u.isPlaying&&!u.isMyTurn?u.setPremove(L,M):(B(!0),o?.(L,M))}catch(E){console.error("Error in handleDragEnd:",E)}T(null),k(null),C(new Set)},[o,me,u,g.preferences.autoPromotionPiece]),ge=f.useMemo(()=>{const w=[];for(let L=0;L<8;L++)for(let R=0;R<8;R++){const E=rl(R,L),P=nl(R,L,r),M=I.get(P),N=a.has(P),ne=p&&(p.from===P||p.to===P),he=x===P,A=S.has(P),oe=j?.from===P,V=z.some(ct=>ct.to===P),ce=z.some(ct=>ct.from===P),at=n&&L===7,Ct=n&&R===0;w.push(i.jsxs(Zc,{"data-square":P,$isLight:E,$isHighlighted:N,$isLastMoveSquare:!!ne,$isSelected:he,$isPossibleMove:A,onMouseDown:ct=>fe(ct,P,M),children:[M&&!oe&&!ce&&!V&&i.jsx(De,{piece:M,size:Q}),at&&i.jsx(bn,{$type:"file",$isLight:E,$size:Q,"data-settings":"coordinates",className:"coordinate-label",children:r?Ke[7-R]:Ke[R]}),Ct&&i.jsx(bn,{$type:"rank",$isLight:E,$size:Q,"data-settings":"coordinates",className:"coordinate-label",children:r?Xe[7-L]:Xe[L]})]},P))}return w},[r,n,I,a,p,x,S,j,Q,ee,fe]);return i.jsxs(i.Fragment,{children:[i.jsxs(Qc,{ref:y,$size:b,onContextMenu:se,"data-settings":"board",className:"chess-board",children:[i.jsx(Jc,{children:ge}),z.map((w,L)=>{const R=ue(w.from,b),E=ue(w.to,b),P=Date.now()-w.startTime,M=g.preferences.animationDuration,N=Math.min(P/M,1),he=(A=>A<.5?4*A*A*A:1-Math.pow(-2*A+2,3)/2)(N);return i.jsx(tl,{$fromX:R.x,$fromY:R.y,$toX:E.x,$toY:E.y,$progress:he,$size:Q,children:i.jsx(De,{piece:w.piece,size:Q})},`${w.from}-${w.to}-${w.startTime}`)})]}),j&&i.jsx(i.Fragment,{children:i.jsx(el,{$x:j.x,$y:j.y,$size:j.size,children:i.jsx(De,{piece:j.piece,size:j.size,isDragging:!0})})}),X&&i.jsx(Wo,{isOpen:!0,color:X.color,position:X.position,onSelect:w=>{B(!0),o?.(X.from,X.to,w),v(null)},onCancel:()=>v(null)})]})});Pr.displayName="ChessBoardWithPieces";const il=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,sl=m.span`
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
`,Ho=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a,compact:p=!1})=>{const c=l=>{const h=Math.floor(l/3600),g=Math.floor(l%3600/60),u=Math.floor(l%60),y=Math.floor(l%1*10),b=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${b}${g.toString().padStart(2,"0")}${b}${u.toString().padStart(2,"0")}`:l<o&&s?`${g}${b}${u.toString().padStart(2,"0")}.${y}`:`${g}${b}${u.toString().padStart(2,"0")}`},d=e<=o&&e>0;return i.jsx(il,{size:t,className:a,children:i.jsx(sl,{$isLowTime:d,$isActive:r,$compact:p,$isFinished:n,children:c(e)})})},al=m.span`
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
`,cl=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:o=30,showTenths:s=!1,className:a})=>{const p=l=>{const h=Math.floor(l/3600),g=Math.floor(l%3600/60),u=Math.floor(l%60),y=Math.floor(l%1*10),b=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${b}${g.toString().padStart(2,"0")}${b}${u.toString().padStart(2,"0")}`:l<o&&s?`${g}${b}${u.toString().padStart(2,"0")}.${y}`:`${g}${b}${u.toString().padStart(2,"0")}`},c=e<=o&&e>0,d=t==="large"?"48px":t==="medium"?"36px":"24px";return i.jsx(al,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:d,children:p(e)})},kt=m(cl)`
    /* Additional GameClock-specific styles if needed */
`;m(Ho).attrs({size:"small"})`
    font-size: 12px;
`;m(Ho).attrs({size:"medium"})`
    font-size: 16px;
`;const ll=m.div`
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
`,dl=m.button`
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
`,ul=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,_o=K(({playerName:e,position:t,onClose:r})=>{const n=Fn(),o=Ne(),s=f.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];f.useEffect(()=>{const c=l=>{s.current&&!s.current.contains(l.target)&&r()},d=l=>{l.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",d)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}},[r]),f.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),d=window.innerWidth,l=window.innerHeight;let h=t.x,g=t.y;c.right>d&&(h=d-c.width-10),c.bottom>l&&(g=l-c.height-10),(h!==t.x||g!==t.y)&&(s.current.style.left=`${h}px`,s.current.style.top=`${g}px`)}},[t]);const p=c=>{const d=e.replace(/\([^)]*\)/g,"").trim(),l=c.replace("{player}",d);n.sendCommand(l),r()};return i.jsx(ll,{ref:s,$x:t.x,$y:t.y,children:a.map((c,d)=>"divider"in c&&c.divider?i.jsx(ul,{},d):"command"in c?i.jsx(dl,{onClick:()=>p(c.command),children:c.label},d):null)})});_o.displayName="PlayerContextMenu";const hl=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,it=({name:e,className:t,style:r,onClick:n})=>{const[o,s]=f.useState(null),a=p=>{p.preventDefault(),p.stopPropagation(),n&&n(),s({x:p.clientX,y:p.clientY})};return i.jsxs(i.Fragment,{children:[i.jsx(hl,{className:t,style:r,onClick:a,children:e}),o&&i.jsx(_o,{playerName:e,position:o,onClose:()=>s(null)})]})};it.displayName="PlayerName";const pl=m.div`
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
`,ml=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,fl=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,gl=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,xl=m.div`
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
`;const ut=K(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:p=!1,compact:c=!1})=>{const d=i.jsxs(i.Fragment,{children:[i.jsx(ml,{children:i.jsxs(fl,{children:[i.jsx(gl,{children:i.jsx(it,{name:e})}),i.jsx(xl,{children:t})]})}),!a&&!p&&i.jsx(kt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return p?d:i.jsx(pl,{$isActive:n,$orientation:s,$compact:c,children:d})});ut.displayName="PlayerCard";const yl=m.div`
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
`,xe=m.button`
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
`,bl=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,$n=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,$l=m.span`
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
`,tr=K(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:s,className:a,disableAutoScroll:p=!1})=>{const c=f.useRef(null);f.useEffect(()=>{if(!p&&c.current&&t!==void 0){const l=c.current.querySelector(`[data-move-index="${t}"]`);l&&l.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,p]);const d=()=>{const l=[];for(let h=0;h<e.length;h+=2){const g=Math.floor(h/2)+1,u=e[h],y=e[h+1];l.push(i.jsxs($n,{children:[i.jsxs($l,{children:[g,"."]}),i.jsx(vn,{$isCurrentMove:t===h,onClick:()=>r?.(h),"data-move-index":h,children:fr(u.san)}),y&&i.jsx(vn,{$isCurrentMove:t===h+1,onClick:()=>r?.(h+1),"data-move-index":h+1,children:fr(y.san)})]},h))}return l};return i.jsxs(yl,{className:a,children:[o?i.jsx(pr,{children:i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{children:"Moves"}),i.jsxs(mr,{children:[i.jsx(xe,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(xe,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(xe,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(xe,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?i.jsxs(pr,{children:[s,i.jsxs(mr,{children:[i.jsx(xe,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(xe,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(xe,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(xe,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):i.jsx(pr,{children:i.jsxs(mr,{children:[i.jsx(xe,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),i.jsx(xe,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),i.jsx(xe,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),i.jsx(xe,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),i.jsx(bl,{ref:c,children:e.length===0?i.jsx($n,{children:i.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):d()})]})});tr.displayName="MoveList";const vl=m(kt)`
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
`,wl=m(kt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,ht=K(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const s=Ut(),a=o==="landscape"?wl:vl;return i.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});ht.displayName="ObservableClock";const kl=m.div`
  position: relative;
  display: inline-block;
`,Sl=m.button`
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
`,Cl=m.div`
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
`,jl=m.button`
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
`,Hr=K(({color:e,size:t="small"})=>{const r=Ne(),[n,o]=f.useState(!1),s=f.useRef(null),a=["Q","R","B","N"],p=r.preferences.autoPromotionPiece,c=h=>e==="white"?h:h.toLowerCase();f.useEffect(()=>{const h=g=>{s.current&&!s.current.contains(g.target)&&o(!1)};if(n)return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[n]);const d=h=>{r.updatePreference("autoPromotionPiece",h),o(!1)},l=t==="small"?28:36;return i.jsxs(kl,{ref:s,children:[i.jsx(Sl,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:i.jsx(De,{piece:c(p),size:l})}),i.jsx(Cl,{$isOpen:n,children:a.map(h=>i.jsx(jl,{$size:t,onClick:()=>d(h),title:`Promote to ${h==="Q"?"Queen":h==="R"?"Rook":h==="B"?"Bishop":"Knight"}`,children:i.jsx(De,{piece:c(h),size:l})},h))})]})});Hr.displayName="PromotionPieceSelector";const Pl=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,de=m.button`
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
`,Go=K(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:s,onUnexamine:a,onSetupFEN:p,onFlipBoard:c,isAnalysisActive:d,isDrawOffered:l,canAbort:h,className:g})=>{const u=Ut(),y=()=>i.jsxs(i.Fragment,{children:[h&&i.jsx(de,{onClick:n,$variant:"secondary",children:"Abort"}),i.jsx(de,{onClick:t,$variant:"secondary",children:"Draw"}),u.currentGame&&u.currentGame.moveNumber>=2&&i.jsx(de,{onClick:r,$variant:"secondary",children:"Resign"}),i.jsx(de,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(Hr,{color:u.playingColor||"white",size:"medium"})]}),b=()=>i.jsxs(i.Fragment,{children:[i.jsx(de,{onClick:s,$variant:"secondary",children:"Unobserve"}),i.jsx(de,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(de,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>i.jsxs(i.Fragment,{children:[i.jsx(de,{onClick:a,$variant:"secondary",children:"Unexamine"}),i.jsx(de,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(de,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>i.jsxs(i.Fragment,{children:[i.jsx(de,{onClick:o,$variant:"secondary",children:"Analysis"}),i.jsx(de,{onClick:c,$variant:"secondary",children:"Flip"}),i.jsx(de,{onClick:p,$variant:"secondary",children:"FEN"})]});return i.jsxs(Pl,{className:g,children:[e==="playing"&&y(),e==="observing"&&b(),e==="examining"&&$(),e==="freestyle"&&x()]})}),ve=m(de)`
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
`,Rl=m.div`
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
`,Mt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,Cn=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,Uo=K(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Yt().isBottomPlayerWinning;let a,p,c;if(t===50)a=47,p=6,c=47;else if(t>50){const l=t-50;a=50-l,p=l,c=50}else{const l=50-t;a=50,p=l,c=50-l}const d=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const l=t<20;return i.jsxs(wn,{$orientation:r,className:n,children:[i.jsx(kn,{$orientation:r,children:e}),i.jsx(Rl,{$needsDarkText:l,children:e}),i.jsxs(Sn,{$orientation:r,children:[i.jsx(Mt,{style:{height:`${a}%`}}),i.jsx(Cn,{$color:d,style:{height:`${p}%`}}),i.jsx(Mt,{style:{height:`${c}%`}})]})]})}else return i.jsxs(wn,{$orientation:r,className:n,children:[i.jsx(kn,{$orientation:r,children:e}),i.jsxs(Sn,{$orientation:r,children:[i.jsx(Mt,{style:{width:`${c}%`}}),i.jsx(Cn,{$color:d,style:{width:`${p}%`}}),i.jsx(Mt,{style:{width:`${a}%`}})]})]})});Uo.displayName="EvaluationBar";const Ml=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,El=m.div`
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
`,Rr=K(({orientation:e="vertical",boardSize:t})=>{const r=Yt();return i.jsx(Ml,{$orientation:e,$boardSize:t,children:i.jsx(Uo,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),Mr=K(({className:e})=>{const t=Yt();return i.jsxs(El,{className:e,children:[i.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),i.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});Rr.displayName="AnalysisDisplay";Mr.displayName="AnalysisInfoDisplay";const zl=m.div`
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
`,Ll=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Tl=m.h2`
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
`,Il=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Al=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Dl=m.div`
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
`,Nl=m.button`
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
`,Ol=m(Yo)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,qo=K(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=f.useState(""),[s,a]=f.useState(""),p=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=f.useCallback(u=>{o(u.target.value),a("")},[]),d=f.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),l=f.useCallback(u=>{const y=typeof u=="function"?u():u;o(y),a("");try{r.loadPosition(y)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),h=f.useCallback(u=>{u.key==="Enter"&&n.trim()?d():u.key==="Escape"&&t()},[n,d,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>oi.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?i.jsx(zl,{$isOpen:e,onClick:t,children:i.jsxs(Ll,{onClick:u=>u.stopPropagation(),children:[i.jsx(Tl,{children:"Set Position from FEN"}),i.jsx(Al,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),i.jsxs(Pn,{children:[i.jsx(Rn,{children:"Current position:"}),i.jsx(Ol,{type:"text",value:p,readOnly:!0,onClick:u=>u.currentTarget.select()})]}),i.jsxs(Pn,{children:[i.jsx(Rn,{children:"Preset position:"}),g.map(u=>i.jsx(Nl,{onClick:()=>l(u.fen),children:u.name},u.name))]}),i.jsx(Yo,{type:"text",value:n,onChange:c,onKeyDown:h,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&i.jsx(Il,{children:s}),i.jsxs(Dl,{children:[i.jsx(jn,{onClick:t,children:"Cancel"}),i.jsx(jn,{$variant:"primary",onClick:d,disabled:!n.trim(),children:"Set Position"})]})]})}):null});qo.displayName="FENDialog";const Fl=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Bl=m.div`
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
`,Wl=m.div`
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
`,Hl=m.div`
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
`,_l=m(De)`
  width: 100%;
  height: 100%;
`,pt=K(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:o})=>{const{gameStore:s}=Ee(),a=f.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const h=s.capturedPieces;return t?h.white:h.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),p=f.useMemo(()=>{const l={};return a.forEach(h=>{l[h]=(l[h]||0)+1}),l},[a]),c=["p","n","b","r","q"],d=n?n/8:32;return i.jsx(Fl,{$orientation:e,$size:d,className:r,children:i.jsx(Bl,{$orientation:e,children:c.map(l=>{const h=p[l]||0,g=t?l.toUpperCase():l;return i.jsx(Wl,{$size:d,onClick:h>0&&o?()=>o(g):void 0,style:{cursor:h>0&&o?"pointer":"default"},children:h>0&&i.jsxs(i.Fragment,{children:[i.jsx(_l,{piece:g,size:d}),h>1&&i.jsx(Hl,{children:h})]})},l)})})})});pt.displayName="CapturedPieces";const Gl=m.div`
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
`,Ul=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Yl=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ql=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Vl=m.div`
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
`,Kl=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:s,onCancel:a})=>i.jsx(Gl,{$isOpen:e,onClick:a,children:i.jsxs(Ul,{onClick:p=>p.stopPropagation(),children:[i.jsx(Yl,{children:t}),i.jsx(ql,{children:r}),i.jsxs(Vl,{children:[i.jsx(Mn,{$variant:"secondary",onClick:a,children:o}),i.jsx(Mn,{$variant:"primary",onClick:s,children:n})]})]})}),Xl=m.div`
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
`;const Ql=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Jl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,Zl=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,ed=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Vo=m.div`
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
`,td=m(Vo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,rd=m(Ko)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,nd=m(Vo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,od=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,id=m(Ko)`
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
`,sd=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,ad=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,cd=m.div`
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
`;const ld=m.div`
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
`,dd=m.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,ud=m.div`
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
`;const hd=m.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,pd=m.div`
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
`;m(tr)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const md=m(tr)`
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
`;const fd=m.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,gd=m.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,xd=m.div`
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
`;const yd=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,bd=m.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,Xo=K(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=Ut(),o=Ne(),s=Yt(),a=Fn(),p=ii();Oe();const[c,d]=f.useState(!1),[l,h]=f.useState(!1),[g,u]=f.useState(0),[y,b]=f.useState(!1),[$,x]=f.useState(!1),[k,S]=f.useState(null),C=o.preferences.chessOrientation==="landscape",j=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",z=window.innerWidth/window.innerHeight>1.6,W=f.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),_=f.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:o.preferences.showCapturedPieces,[n.currentGame?.variant,o.preferences.showCapturedPieces]),X=f.useCallback((A,oe,V)=>{try{n.makeMove(A,oe,V)||(console.error("Invalid move:",A,oe),p.playIllegal())}catch(ce){console.error("Error making move:",ce),p.playIllegal()}},[n,p]),v=f.useCallback((A,oe)=>{try{const V=A.toLowerCase();n.makeSANMove(`${A.toUpperCase()}@${oe}`)||(console.error("Invalid drop:",A,oe),p.playIllegal())}catch(V){console.error("Error making drop:",V),p.playIllegal()}},[n,p]),F=f.useCallback(A=>{S(k===A?null:A)},[k]);f.useMemo(()=>{if(n.currentGameInfo){const{white:A,black:oe,timeControl:V,variant:ce}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ce} ${V}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const B=(()=>{const A=n.moveHistory.length;if(A>0){const oe=n.moveHistory[A-1],V=Math.ceil(A/2),ce=A%2===1,at=fr(oe.san);return`${V}.${ce?"":".."} ${at}`}return"Starting position"})(),I=n.currentOpening,G=n.currentGame,Z=G||n.lastGameState,ue=Z?.white||{name:"White",rating:1500,time:900},me=Z?.black||{name:"Black",rating:1500,time:900},se=!G||G.turn==="w",Q=n.shouldShowFlippedBoard,ae=Q?ue:me,ee=Q?me:ue,fe=Q,le=Q?se:!se,je=f.useCallback(A=>{n.goToMove(A)},[n]);f.useEffect(()=>{s.initialize()},[s]),f.useEffect(()=>{$&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,$,n.isPlaying,a]),f.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&x(!1)},[n.currentGame,n.isPlaying]),f.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(j):s.stopAnalysis()},[c,j,s]);const ge=f.useCallback(()=>{d(A=>!A)},[]),w=f.useCallback(()=>{h(!0)},[]),L=f.useCallback(()=>{o.updatePreference("boardFlipped",!o.preferences.boardFlipped)},[o]),R=f.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),E=f.useCallback(()=>{a.sendCommand("unexamine")},[a]),P=f.useCallback(()=>{b(!0)},[]),M=f.useCallback(()=>{a.sendCommand("resign"),b(!1)},[a]),N=f.useCallback(()=>{a.sendCommand("draw"),x(!$)},[a,$]),ne=f.useCallback(()=>{a.sendCommand("abort")},[a]),he=()=>i.jsxs(i.Fragment,{children:[i.jsx(En,{$orientation:"portrait",children:i.jsx(sd,{children:i.jsxs(ad,{children:[c&&i.jsx(bd,{$boardSize:g,children:i.jsx(Rr,{orientation:"vertical",boardSize:g})}),i.jsx(cd,{children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[i.jsxs(nd,{children:[i.jsxs(zn,{children:["Game #",Z?.gameId||"?"]}),i.jsx(Ln,{children:Z?.timeControl||"?"}),i.jsxs(od,{children:[W==="playing"&&i.jsxs(i.Fragment,{children:[n.moveHistory.length<=1&&i.jsx(ve,{onClick:ne,$variant:"secondary",children:"Abort"}),i.jsx(ve,{onClick:N,$variant:"secondary",children:"Draw"}),i.jsx(ve,{onClick:P,$variant:"secondary",children:"Resign"}),i.jsx(Hr,{color:n.playingColor||"white",size:"small"})]}),W==="observing"&&i.jsxs(i.Fragment,{children:[i.jsx(ve,{onClick:R,$variant:"secondary",children:"Unobserve"}),i.jsx(ve,{onClick:ge,$variant:"secondary",children:"Analysis"})]}),W==="examining"&&i.jsxs(i.Fragment,{children:[i.jsx(ve,{onClick:E,$variant:"secondary",children:"Unexamine"}),i.jsx(ve,{onClick:ge,$variant:"secondary",children:"Analysis"})]}),W==="freestyle"&&i.jsxs(i.Fragment,{children:[i.jsx(ve,{onClick:ge,$variant:"secondary",children:"Analysis"}),i.jsx(ve,{onClick:L,$variant:"secondary",children:"Flip"}),i.jsx(ve,{onClick:w,$variant:"secondary",children:"FEN"})]})]})]}),i.jsxs(Dn,{children:[i.jsx(ht,{player:ae,isActive:le,size:"small",compact:!0}),i.jsx(Nn,{children:i.jsx(ut,{name:ae.name,rating:ae.rating,time:0,isActive:le,isWhite:fe,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsx(An,{$orientation:"portrait",children:i.jsx(Pr,{position:j,flipped:Q,showCoordinates:o.preferences.showCoordinates,onMove:X,onDrop:v,interactive:W==="playing"||W==="freestyle"||W==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:u,selectedCapturedPiece:k,onCapturedPieceSelect:S})}),i.jsxs(Dn,{children:[i.jsx(ht,{player:ee,isActive:!le,size:"small",compact:!0}),i.jsx(Nn,{children:i.jsx(ut,{name:ee.name,rating:ee.rating,time:0,isActive:!le,isWhite:!fe,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),i.jsxs(id,{children:[i.jsx(Tn,{children:n.premove?`Premove: ${Ur(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,j)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(In,{children:I})]}),c&&i.jsx(yd,{children:i.jsx(Mr,{})})]})}),_&&i.jsx(Zl,{$squareSize:g?g/8:0,children:i.jsxs(ed,{$squareSize:g?g/8:0,children:[i.jsx(pt,{orientation:"vertical",isWhitePieces:Q,boardSize:g,onPieceClick:F}),i.jsx(pt,{orientation:"vertical",isWhitePieces:!Q,boardSize:g,onPieceClick:F})]})})]})})}),i.jsx(ld,{$orientation:"portrait",$boardSize:g,children:i.jsx(tr,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:je,disableAutoScroll:!0,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return i.jsxs(Xl,{className:e,$orientation:C?"landscape":"portrait",$hasChat:t,children:[C?i.jsx(i.Fragment,{children:i.jsx(En,{$orientation:"landscape",children:i.jsxs(dd,{children:[i.jsx(gd,{children:c&&i.jsx(xd,{$boardSize:g,children:i.jsx(Rr,{orientation:"vertical",boardSize:g})})}),i.jsxs(ud,{$hasAnalysis:c,children:[i.jsxs(Ql,{$isWideAspect:z,children:[i.jsxs(td,{$chatWidth:r,$hasAnalysis:c,children:[i.jsxs(zn,{children:["Game #",Z?.gameId||"?"]}),i.jsx(Ln,{children:Z?.timeControl||"?"})]}),i.jsx(Jl,{$orientation:"landscape",children:i.jsx(An,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:i.jsx(Pr,{position:j,flipped:Q,showCoordinates:o.preferences.showCoordinates,onMove:X,onDrop:v,interactive:W==="playing"||W==="freestyle"||W==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:u,selectedCapturedPiece:k,onCapturedPieceSelect:S})})}),i.jsxs(rd,{$chatWidth:r,$hasAnalysis:c,children:[i.jsx(Tn,{children:n.premove?`Premove: ${Ur(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,j)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),I&&i.jsx(In,{children:I})]}),c&&i.jsx(fd,{$chatWidth:r,$hasAnalysis:c,children:i.jsx(Mr,{})})]}),i.jsxs(hd,{$isWideAspect:z,$boardSize:g,children:[_&&i.jsx(pt,{orientation:"horizontal",isWhitePieces:fe,boardSize:g,onPieceClick:F}),i.jsx(ht,{player:ae,isActive:le,size:"small",compact:!0,variant:"landscape"}),i.jsxs(pd,{children:[i.jsx(ut,{name:ae.name,rating:ae.rating,time:0,isActive:le,isWhite:fe,orientation:"vertical",hideClockInCard:!0,compact:!0}),i.jsx(Go,{perspective:W,canAbort:n.moveHistory.length<=1,onAnalysis:ge,onFlipBoard:L,onSetupFEN:w,onUnobserve:R,onUnexamine:E,onResign:P,onDraw:N,onAbort:ne,isAnalysisActive:c,isDrawOffered:$}),i.jsx(md,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:je,showHeader:!1,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),i.jsx(ut,{name:ee.name,rating:ee.rating,time:0,isActive:!le,isWhite:!fe,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),i.jsx(ht,{player:ee,isActive:!le,size:"small",compact:!0,variant:"landscape"}),_&&i.jsx(pt,{orientation:"horizontal",isWhitePieces:!fe,boardSize:g,onPieceClick:F})]})]})]})})}):he(),i.jsx(qo,{isOpen:l,onClose:()=>h(!1)}),i.jsx(Kl,{isOpen:y,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:M,onCancel:()=>b(!1)})]})});Xo.displayName="ChessGameLayout";const $d=m.div`
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
`,vd=m.div`
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
`,wd=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,kd=m.span`
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
`,Sd=m.button`
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
`,Cd=m.span`
  font-size: 12px;
  opacity: 0.7;
`,Qo=K(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=ie.useState(null),[o,s]=ie.useState(null),a=(h,g)=>{n(g),h.dataTransfer.effectAllowed="move"},p=(h,g)=>{h.preventDefault(),h.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},d=(h,g)=>{h.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},l=()=>{n(null),s(null)};return i.jsx($d,{children:t.map(h=>i.jsxs(vd,{$active:h.id===e.activeTabId,$hasUnread:h.unreadCount>0,$dragging:h.id===r,$dragOver:h.id===o,draggable:!0,onDragStart:g=>a(g,h.id),onDragOver:g=>p(g,h.id),onDragLeave:c,onDrop:g=>d(g,h.id),onDragEnd:l,onClick:()=>e.setActiveTab(h.id),children:[h.type!=="console"&&i.jsx(Cd,{$type:h.type}),i.jsx(wd,{children:h.type==="channel"?`(${h.name})`:h.name}),h.unreadCount>0&&i.jsx(kd,{children:h.unreadCount>99?"99+":h.unreadCount}),h.id!=="console"&&i.jsx(Sd,{onClick:g=>{g.stopPropagation(),e.closeTab(h.id)},title:"Close tab",children:"×"})]},h.id))})});Qo.displayName="ChatTabs";function jd(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function Pd(e){e.scrollTop=e.scrollHeight}function Rd(e,t=10){jd(e,t)&&Pd(e)}class Le{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class O{static{this.renderers=new Map}static register(t){this.renderers.set(t.type,t)}static getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}static getAllRenderers(){return Array.from(this.renderers.values())}}const _e=m.div`
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
`,St=m(_e)`
  color: ${e=>e.$color||e.theme.colors.textSecondary};
`,Jo=m.div`
  font-size: 11px;
  font-family: ${e=>e.$fontFamily||"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${e=>e.$fontStyle||"normal"};
  line-height: 1.3;
  white-space: pre;
  word-break: break-all;
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
`,tt=m.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,Md=m.a`
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
`,st=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`;m(st)`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`;const Ed=m(st)`
  &::before {
    content: '(';
  }
  &::after {
    content: ')';
  }
`,zd=m(st)`
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
`,Ld=m(st)`
  display: inline-block;
  padding: 0 2px;
  border-radius: 2px;
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
  }
`,$e=({content:e,elements:t=[],onCommandClick:r})=>{const{ficsStore:n}=Ee(),o=l=>{const h=[],g=/(https?:\/\/[^\s]+)/gi;let u;for(;(u=g.exec(l))!==null;)h.push({type:"url",text:u[1],action:u[1],start:u.index,end:u.index+u[1].length});const y=/['']([^'']+)['']|'([^']+)'/g;for(;(u=y.exec(l))!==null;){const C=u[1]||u[2];/^\w/.test(C)&&h.push({type:"command",text:u[0],action:C,start:u.index,end:u.index+u[0].length})}const b=/\\?"([^"]+)\\?"/g;for(;(u=b.exec(l))!==null;){const C=u[1];/^\w/.test(C)&&h.push({type:"command",text:u[0],action:C,start:u.index,end:u.index+u[0].length})}const $=/\bgame\s+(\d+)\b/gi;for(;(u=$.exec(l))!==null;)h.push({type:"gameNumber",text:u[1],action:`observe ${u[1]}`,start:u.index,end:u.index+u[0].length});const x=/"play\s+(\d+)"/gi;for(;(u=x.exec(l))!==null;)h.push({type:"seekNumber",text:u[0],action:`play ${u[1]}`,start:u.index,end:u.index+u[0].length});const k=/\((\d+)\):/g;for(;(u=k.exec(l))!==null;)h.push({type:"channelNumber",text:u[1],action:`+channel ${u[1]}`,start:u.index+1,end:u.index+1+u[1].length});const S=/\[(next|more|back|prev)\]/gi;for(;(u=S.exec(l))!==null;)h.push({type:"command",text:u[0],action:u[1].toLowerCase(),start:u.index,end:u.index+u[0].length});return h},s=(l,h)=>{h==="url"?window.open(l,"_blank","noopener,noreferrer"):r?r(l):n.sendCommand(l)},a=[...t];if(t.length===0){const l=o(e);a.push(...l)}if(a.length===0)return i.jsx(i.Fragment,{children:e});const p=[...a].sort((l,h)=>l.start-h.start),c=[];let d=0;return p.forEach((l,h)=>{if(l.start>d){const y=e.substring(d,l.start);c.push(i.jsx("span",{style:{whiteSpace:"pre"},children:y},`text-${h}`))}else if(l.start<d){console.warn("[InteractiveContent] Skipping overlapping element:",{element:l,lastEnd:d,overlap:d-l.start});return}const g=`${l.type}-${h}`,u=l.text;switch(l.type){case"player":c.push(i.jsxs("span",{children:[" ",i.jsx(it,{name:u,onClick:()=>s(l.action,l.type)})]},g));break;case"url":c.push(i.jsx(Md,{href:l.action,target:"_blank",rel:"noopener noreferrer",onClick:y=>{y.preventDefault(),s(l.action,l.type)},children:u},g));break;case"channelNumber":c.push(i.jsx(Ed,{onClick:()=>s(l.action,l.type),children:u},g));break;case"gameNumber":c.push(i.jsx(zd,{onClick:()=>s(l.action,l.type),children:u},g));break;case"seekNumber":c.push(i.jsx(Ld,{onClick:()=>s(l.action,l.type),children:u},g));break;case"command":default:c.push(i.jsx(st,{onClick:()=>s(l.action,l.type),children:u},g));break}d=l.end}),d<e.length&&c.push(i.jsx("span",{style:{whiteSpace:"pre"},children:e.substring(d)},"text-end")),i.jsx(i.Fragment,{children:c})};class Td extends Le{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.metadata?.parsedMessage,s=t.metadata?.isGroupedMessage;if(t.type==="system")return i.jsx(St,{$color:t.metadata?.color||void 0,children:i.jsx($e,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})});const a=t.sender&&t.sender.toLowerCase()===r.toLowerCase();return s||!t.sender?i.jsxs(_e,{$color:t.metadata?.color||void 0,children:[i.jsx(Gr,{}),i.jsx(tt,{children:i.jsx($e,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]}):i.jsxs(_e,{$color:t.metadata?.color||void 0,children:[i.jsx(_r,{$isYou:a||void 0,children:a?t.sender:i.jsx(it,{name:t.sender})}),i.jsx(tt,{children:i.jsx($e,{content:o?.content||t.content,elements:o?.elements,onCommandClick:n})})]})}}class Id extends Le{constructor(){super(...arguments),this.type="channelTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage,a=t.metadata?.isGroupedMessage,p=t.channel?.startsWith("channel-"),c=s?.metadata?.message||t.content;return a||!t.sender?i.jsxs(_e,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Gr,{}),i.jsx(tt,{children:i.jsx($e,{content:c,elements:p?[]:s?.elements,onCommandClick:n})})]}):i.jsxs(_e,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,"data-settings":"chat",className:"channel-tell-message",children:[i.jsx(_r,{$isYou:o,children:o?t.sender:i.jsx(it,{name:t.sender})}),i.jsx(tt,{children:i.jsx($e,{content:c,elements:[],onCommandClick:n})})]})}}class Ad extends Le{constructor(){super(...arguments),this.type="directTell"}render({message:t,currentUsername:r,onCommandClick:n}){const o=t.sender.toLowerCase()===r.toLowerCase(),s=t.metadata?.parsedMessage;return t.metadata?.isGroupedMessage||!t.sender?i.jsxs(_e,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(Gr,{}),i.jsx(tt,{children:i.jsx($e,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]}):i.jsxs(_e,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:[i.jsx(_r,{$isYou:o,children:o?t.sender:i.jsx(it,{name:t.sender})}),i.jsx(tt,{children:i.jsx($e,{content:s?.metadata?.message||t.content,elements:s?.elements,onCommandClick:n})})]})}}class Dd extends Le{constructor(){super(...arguments),this.type="gameStart"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(St,{$color:t.metadata?.color||void 0,children:i.jsx($e,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Nd extends Le{constructor(){super(...arguments),this.type="gameEnd"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(St,{$color:t.metadata?.color||void 0,children:i.jsx($e,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class Od extends Le{constructor(){super(...arguments),this.type="style12"}render({message:t}){return i.jsx(St,{$color:t.metadata?.color||"#666",children:t.content})}}class Fd extends Le{constructor(){super(...arguments),this.type="movesList"}render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(St,{$color:t.metadata?.color||void 0,children:i.jsx($e,{content:t.content,elements:n?.elements,onCommandClick:r})})}}class q extends Le{render({message:t,onCommandClick:r}){const n=t.metadata?.parsedMessage;return i.jsx(Jo,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx($e,{content:n?.content||t.content,elements:n?.elements||[],onCommandClick:r})})}}class Bd extends q{constructor(){super(...arguments),this.type="shout"}}class Wd extends q{constructor(){super(...arguments),this.type="cshout"}}class Hd extends q{constructor(){super(...arguments),this.type="notification"}}class _d extends q{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Gd extends q{constructor(){super(...arguments),this.type="matchRequest"}}class Ud extends q{constructor(){super(...arguments),this.type="illegalMove"}}class Yd extends q{constructor(){super(...arguments),this.type="drawOffer"}}class qd extends q{constructor(){super(...arguments),this.type="unobserve"}}class Vd extends q{constructor(){super(...arguments),this.type="whoOutput"}}class Kd extends q{constructor(){super(...arguments),this.type="gamesOutput"}}class Xd extends q{constructor(){super(...arguments),this.type="fingerOutput"}}class Qd extends q{constructor(){super(...arguments),this.type="historyOutput"}}class Jd extends q{constructor(){super(...arguments),this.type="journalOutput"}}class Zd extends q{constructor(){super(...arguments),this.type="soughtOutput"}}class eu extends q{constructor(){super(...arguments),this.type="channelListOutput"}}class tu extends q{constructor(){super(...arguments),this.type="newsOutput"}}class ru extends q{constructor(){super(...arguments),this.type="inOutput"}}class nu extends q{constructor(){super(...arguments),this.type="login"}}class ou extends q{constructor(){super(...arguments),this.type="password"}}class iu extends q{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class su extends q{constructor(){super(...arguments),this.type="sessionStart"}}class au extends q{constructor(){super(...arguments),this.type="system"}}class cu extends q{constructor(){super(...arguments),this.type="raw"}}class lu extends Le{constructor(){super(...arguments),this.type="gameNotification"}render({message:t,onCommandClick:r}){const o=t.metadata?.parsedMessage?.metadata?.gameNumber,s=()=>{const a=`observe ${o}`;r&&r(a)};return i.jsx(Jo,{$color:t.metadata?.color||void 0,$fontFamily:t.metadata?.fontFamily||void 0,$fontStyle:t.metadata?.fontStyle||void 0,children:i.jsx(st,{onClick:s,style:{display:"inline-block",textDecoration:"none",cursor:"pointer",width:"100%"},children:t.content})})}}function du(){O.register(new Id),O.register(new Ad),O.register(new Bd),O.register(new Wd),O.register(new Dd),O.register(new Nd),O.register(new Od),O.register(new Fd),O.register(new Ud),O.register(new Yd),O.register(new qd),O.register(new lu),O.register(new _d),O.register(new Gd),O.register(new Vd),O.register(new Kd),O.register(new Xd),O.register(new Qd),O.register(new Jd),O.register(new Zd),O.register(new eu),O.register(new tu),O.register(new ru),O.register(new Hd),O.register(new nu),O.register(new ou),O.register(new iu),O.register(new su),O.register(new au),O.register(new cu),O.register(new Td)}du();const mt=K(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:o}=Ee(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,p=s?o.getConsoleColor(s,a):null,c=s?o.getConsoleFont(s,a):null,d=s?o.getConsoleFontStyle(s,a):null,l={...e,metadata:{...e.metadata,color:p,fontFamily:c,fontStyle:d}},h=O.getRenderer(l);return h?i.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:h.render({message:l,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),i.jsx("div",{children:e.content}))});mt.displayName="Message";const Et=m.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,zt=m.div`
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
`,uu=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
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
`,hu=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Lt=m.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Zo=K(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),o=f.useRef(null),s=t.activeTab,a=s?.messages||[],p=r.username||"You",c=l=>{r.sendCommand(l)};if(f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current,h=setTimeout(()=>{s?.type==="console"?l.scrollTop=l.scrollHeight:Rd(l,50)},50);return()=>clearTimeout(h)}},[a.length,a[a.length-1]?.id]),f.useEffect(()=>{if(o.current&&a.length>0){const l=o.current;requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}},[s?.id]),!s)return i.jsx(Et,{children:i.jsx(zt,{className:"chat-messages-container",children:i.jsx(On,{children:"No active chat"})})});if(a.length===0)return i.jsx(Et,{children:i.jsx(zt,{className:"chat-messages-container",children:i.jsx(On,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const d=[];return a.forEach((l,h)=>{const g=h>0?a[h-1]:null,u=g?new Date(l.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===l.sender&&g.type===l.type&&u<6e4?d[d.length-1].messages.push(l):d.push({sender:l.sender,timestamp:new Date(l.timestamp),messages:[l]})}),s.type==="console"?i.jsx(Et,{children:i.jsx(zt,{ref:o,className:"chat-messages-container",children:a.map(l=>i.jsx(Lt,{children:i.jsx(mt,{message:l,currentUsername:p,onCommandClick:c,onHover:e})},l.id))})}):i.jsx(Et,{children:i.jsx(zt,{ref:o,className:"chat-messages-container",children:d.map((l,h)=>l.messages[0].type==="system"?i.jsx(hu,{children:l.messages.map(u=>i.jsx(Lt,{children:i.jsx(mt,{message:u,currentUsername:p,onCommandClick:c,onHover:e})},u.id))},h):i.jsx(uu,{children:l.messages.map((u,y)=>{if(y===0)return i.jsx(Lt,{children:i.jsx(mt,{message:u,currentUsername:p,onCommandClick:c,onHover:e})},u.id);{const b={...u,sender:"",metadata:{...u.metadata,isGroupedMessage:!0}};return i.jsx(Lt,{children:i.jsx(mt,{message:b,currentUsername:p,onCommandClick:c,onHover:e})},u.id)}})},h))})})});Zo.displayName="ChatMessages";const pu=m.div`
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
`,mu=m.input`
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
  
  /* iOS fixes to prevent zoom and ensure visibility */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-user-select: text;
  user-select: text;
  
  /* Ensure minimum 16px font size on mobile to prevent iOS zoom */
  @media (max-width: 768px) {
    font-size: 16px;
    min-height: 44px;
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
`,fu=m.button`
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
`,ei=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:s=!1})=>{const a=f.useRef(null),p=d=>{d.key==="Enter"&&!d.shiftKey?(d.preventDefault(),e.trim()&&r(e.trim())):d.key==="ArrowUp"&&!e?(d.preventDefault(),n?.("up")):d.key==="ArrowDown"&&(d.preventDefault(),n?.("down"))},c=()=>{e.trim()&&r(e.trim())};return i.jsxs(pu,{children:[i.jsx(mu,{ref:a,type:"text",value:e,onChange:d=>t(d.target.value),onKeyDown:p,placeholder:o,disabled:s,autoComplete:"off",spellCheck:"true"}),i.jsx(fu,{onClick:c,disabled:s||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};ei.displayName="ChatInput";const gu=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,xu=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,yu=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,bu=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,$u=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,vu=m.div`
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
`,ti=K(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:o}=Ee(),[s,a]=f.useState(""),[p,c]=f.useState(!1),[d,l]=f.useState(null);ie.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),ie.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const h=u=>{if(console.log("handleSendMessage called with:",u,"Length:",u.length),!!u.trim()){if(r.addToHistory(u),u==="/help"||u==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(u.startsWith("/")||u.startsWith("\\")){const y=u.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"}),n.sendCommand(y)}else{const y=r.activeTab;if(!y)return;if(y.type==="channel"){const b=y.id.replace("channel-","");n.sendCommand(`tell ${b} ${u}`)}else if(y.type==="private")r.addMessage(y.id,{channel:y.id,sender:"You",content:u,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${y.id} ${u}`);else{const b=u.match(/^tell\s+(\w+)\s+(.+)$/);if(b&&o.preferences.openTellsInTabs){const[,$,x]=b,k=$.replace(/\([^)]*\)/g,"").trim(),S=k.toLowerCase();r.createTab(S,k,"private"),r.addMessage(S,{channel:S,sender:"You",content:x,timestamp:new Date,type:"message"})}else r.addMessage("console",{channel:"console",sender:"You",content:u,timestamp:new Date,type:"message"});n.sendCommand(u)}}a("")}},g=u=>{const y=r.navigateHistory(u);y!==null&&a(y)};return i.jsxs(gu,{className:e,$compact:t,children:[!t&&i.jsxs(xu,{children:[i.jsx(yu,{children:"Chat"}),n.averagePing!==null&&i.jsxs($u,{children:["Ping: ",n.averagePing,"ms"]}),d&&i.jsxs(bu,{children:["Received: ",new Date(d).toLocaleTimeString()]})]}),i.jsxs(vu,{children:[i.jsx(Qo,{}),i.jsx(Zo,{onMessageHover:l}),i.jsx(ei,{value:s,onChange:a,onSend:h,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});ti.displayName="ChatPanel";const wu=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,ku=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,Su=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,Cu=m.div`
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
`,ju=m.div`
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
`,ri=K(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Oe(),o=No(),s=Oo(),a=ic(),[p,c]=f.useState(600),[d,l]=f.useState(!1),h=f.useRef(!1);f.useEffect(()=>{!h.current&&r&&(h.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),f.useEffect(()=>{o.includes(t)||e.updatePreference("viewMode","chess-only")},[o,t,e]),f.useEffect(()=>{const $=e.preferences.chessOrientation;s.includes($)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=$=>{$.preventDefault(),l(!0)};f.useEffect(()=>{if(!d)return;const $=k=>{const S=window.innerWidth-k.clientX;c(Math.max(300,Math.min(600,S))),window.dispatchEvent(new Event("resize"))},x=()=>{l(!1)};return document.addEventListener("mousemove",$),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",x)}},[d]);const u=t==="chess-only"||t==="chess-and-chat",y=t==="chat-only"||t==="chess-and-chat",b=t==="chess-and-chat"&&!n.isMobile;return i.jsxs(wu,{children:[i.jsx(Bo,{}),i.jsxs(ku,{children:[i.jsx(Su,{$isVisible:u,children:i.jsx(Xo,{hasChat:y,chatWidth:y&&!n.isMobile?p:0})}),b&&i.jsx(ju,{$isVisible:!0,onMouseDown:g,style:{cursor:d?"col-resize":"ew-resize"}}),i.jsx(Cu,{$isVisible:y,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:y&&!n.isMobile?`${p}px`:void 0},children:i.jsx(ti,{})})]})]})});ri.displayName="AppLayout";const Pu=Va`
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
`,Ru=()=>i.jsx(si,{children:i.jsxs(Xa,{children:[i.jsx(Pu,{}),i.jsx(Ls,{children:i.jsx(cs,{children:i.jsx(Jn,{path:"/",element:i.jsx(ac,{children:i.jsx(ri,{})})})})})]})}),ni=document.getElementById("root");if(!ni)throw new Error("Root element not found");const Mu=Bn(ni);Mu.render(i.jsx(Ru,{}));
