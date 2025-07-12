import{u as Fe,j as a,a as Ee,b as tr,c as pn,d as vt,R as Eo}from"./shared-Dpoi1eLG.js";import{a as Ro,r as u,R as K}from"./vendor-B9TH31lo.js";import{o as V}from"./mobx-BpfSNEQ3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var fn,yr=Ro;fn=yr.createRoot,yr.hydrateRoot;var rr={};Object.defineProperty(rr,"__esModule",{value:!0});rr.parse=No;rr.serialize=Do;const zo=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,To=/^[\u0021-\u003A\u003C-\u007E]*$/,Lo=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,Io=/^[\u0020-\u003A\u003D-\u007E]*$/,Mo=Object.prototype.toString,Ao=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function No(e,t){const r=new Ao,n=e.length;if(n<2)return r;const o=t?.decode||Fo;let i=0;do{const s=e.indexOf("=",i);if(s===-1)break;const d=e.indexOf(";",i),c=d===-1?n:d;if(s>c){i=e.lastIndexOf(";",s-1)+1;continue}const l=br(e,i,s),h=$r(e,s,l),p=e.slice(l,h);if(r[p]===void 0){let m=br(e,s+1,c),g=$r(e,c,m);const y=o(e.slice(m,g));r[p]=y}i=c+1}while(i<n);return r}function br(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function $r(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function Do(e,t,r){const n=r?.encode||encodeURIComponent;if(!zo.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=n(t);if(!To.test(o))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+o;if(!r)return i;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);i+="; Max-Age="+r.maxAge}if(r.domain){if(!Lo.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);i+="; Domain="+r.domain}if(r.path){if(!Io.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);i+="; Path="+r.path}if(r.expires){if(!Oo(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);i+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(i+="; HttpOnly"),r.secure&&(i+="; Secure"),r.partitioned&&(i+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return i}function Fo(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function Oo(e){return Mo.call(e)==="[object Date]"}var vr="popstate";function Bo(e={}){function t(n,o){let{pathname:i,search:s,hash:d}=n.location;return Wt("",{pathname:i,search:s,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:Ke(o)}return Ho(t,r,null,e)}function O(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function fe(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Wo(){return Math.random().toString(36).substring(2,10)}function wr(e,t){return{usr:e.state,key:e.key,idx:t}}function Wt(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Oe(t):t,state:r,key:t&&t.key||n||Wo()}}function Ke({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Oe(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function Ho(e,t,r,n={}){let{window:o=document.defaultView,v5Compat:i=!1}=n,s=o.history,d="POP",c=null,l=h();l==null&&(l=0,s.replaceState({...s.state,idx:l},""));function h(){return(s.state||{idx:null}).idx}function p(){d="POP";let $=h(),x=$==null?null:$-l;l=$,c&&c({action:d,location:b.location,delta:x})}function m($,x){d="PUSH";let v=Wt(b.location,$,x);l=h()+1;let w=wr(v,l),P=b.createHref(v);try{s.pushState(w,"",P)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;o.location.assign(P)}i&&c&&c({action:d,location:b.location,delta:1})}function g($,x){d="REPLACE";let v=Wt(b.location,$,x);l=h();let w=wr(v,l),P=b.createHref(v);s.replaceState(w,"",P),i&&c&&c({action:d,location:b.location,delta:0})}function y($){return _o($)}let b={get action(){return d},get location(){return e(o,s)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(vr,p),c=$,()=>{o.removeEventListener(vr,p),c=null}},createHref($){return t(o,$)},createURL:y,encodeLocation($){let x=y($);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:m,replace:g,go($){return s.go($)}};return b}function _o(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),O(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:Ke(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function mn(e,t,r="/"){return Go(e,t,r,!1)}function Go(e,t,r,n){let o=typeof t=="string"?Oe(t):t,i=ye(o.pathname||"/",r);if(i==null)return null;let s=gn(e);Uo(s);let d=null;for(let c=0;d==null&&c<s.length;++c){let l=ri(i);d=ei(s[c],l,n)}return d}function gn(e,t=[],r=[],n=""){let o=(i,s,d)=>{let c={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};c.relativePath.startsWith("/")&&(O(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let l=xe([n,c.relativePath]),h=r.concat(c);i.children&&i.children.length>0&&(O(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),gn(i.children,t,h,l)),!(i.path==null&&!i.index)&&t.push({path:l,score:Jo(l,i.index),routesMeta:h})};return e.forEach((i,s)=>{if(i.path===""||!i.path?.includes("?"))o(i,s);else for(let d of xn(i.path))o(i,s,d)}),t}function xn(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return o?[i,""]:[i];let s=xn(n.join("/")),d=[];return d.push(...s.map(c=>c===""?i:[i,c].join("/"))),o&&d.push(...s),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function Uo(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Zo(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var qo=/^:[\w-]+$/,Yo=3,Vo=2,Ko=1,Xo=10,Qo=-2,kr=e=>e==="*";function Jo(e,t){let r=e.split("/"),n=r.length;return r.some(kr)&&(n+=Qo),t&&(n+=Vo),r.filter(o=>!kr(o)).reduce((o,i)=>o+(qo.test(i)?Yo:i===""?Ko:Xo),n)}function Zo(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function ei(e,t,r=!1){let{routesMeta:n}=e,o={},i="/",s=[];for(let d=0;d<n.length;++d){let c=n[d],l=d===n.length-1,h=i==="/"?t:t.slice(i.length)||"/",p=gt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},h),m=c.route;if(!p&&l&&r&&!n[n.length-1].route.index&&(p=gt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},h)),!p)return null;Object.assign(o,p.params),s.push({params:o,pathname:xe([i,p.pathname]),pathnameBase:ai(xe([i,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(i=xe([i,p.pathnameBase]))}return s}function gt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=ti(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let i=o[0],s=i.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:n.reduce((l,{paramName:h,isOptional:p},m)=>{if(h==="*"){let y=d[m]||"";s=i.slice(0,i.length-y.length).replace(/(.)\/+$/,"$1")}const g=d[m];return p&&!g?l[h]=void 0:l[h]=(g||"").replace(/%2F/g,"/"),l},{}),pathname:i,pathnameBase:s,pattern:e}}function ti(e,t=!1,r=!0){fe(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,d,c)=>(n.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function ri(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return fe(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ye(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function ni(e,t="/"){let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?Oe(e):e;return{pathname:r?r.startsWith("/")?r:oi(r,t):t,search:si(n),hash:ci(o)}}function oi(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function Lt(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ii(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function yn(e){let t=ii(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function bn(e,t,r,n=!1){let o;typeof e=="string"?o=Oe(e):(o={...e},O(!o.pathname||!o.pathname.includes("?"),Lt("?","pathname","search",o)),O(!o.pathname||!o.pathname.includes("#"),Lt("#","pathname","hash",o)),O(!o.search||!o.search.includes("#"),Lt("#","search","hash",o)));let i=e===""||o.pathname==="",s=i?"/":o.pathname,d;if(s==null)d=r;else{let p=t.length-1;if(!n&&s.startsWith("..")){let m=s.split("/");for(;m[0]==="..";)m.shift(),p-=1;o.pathname=m.join("/")}d=p>=0?t[p]:"/"}let c=ni(o,d),l=s&&s!=="/"&&s.endsWith("/"),h=(i||s===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(l||h)&&(c.pathname+="/"),c}var xe=e=>e.join("/").replace(/\/\/+/g,"/"),ai=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),si=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ci=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function li(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var $n=["POST","PUT","PATCH","DELETE"];new Set($n);var di=["GET",...$n];new Set(di);var Be=u.createContext(null);Be.displayName="DataRouter";var wt=u.createContext(null);wt.displayName="DataRouterState";var vn=u.createContext({isTransitioning:!1});vn.displayName="ViewTransition";var ui=u.createContext(new Map);ui.displayName="Fetchers";var hi=u.createContext(null);hi.displayName="Await";var me=u.createContext(null);me.displayName="Navigation";var Ze=u.createContext(null);Ze.displayName="Location";var be=u.createContext({outlet:null,matches:[],isDataRoute:!1});be.displayName="Route";var nr=u.createContext(null);nr.displayName="RouteError";function pi(e,{relative:t}={}){O(et(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=u.useContext(me),{hash:o,pathname:i,search:s}=tt(e,{relative:t}),d=i;return r!=="/"&&(d=i==="/"?r:xe([r,i])),n.createHref({pathname:d,search:s,hash:o})}function et(){return u.useContext(Ze)!=null}function Re(){return O(et(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(Ze).location}var wn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function kn(e){u.useContext(me).static||u.useLayoutEffect(e)}function fi(){let{isDataRoute:e}=u.useContext(be);return e?Pi():mi()}function mi(){O(et(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(Be),{basename:t,navigator:r}=u.useContext(me),{matches:n}=u.useContext(be),{pathname:o}=Re(),i=JSON.stringify(yn(n)),s=u.useRef(!1);return kn(()=>{s.current=!0}),u.useCallback((c,l={})=>{if(fe(s.current,wn),!s.current)return;if(typeof c=="number"){r.go(c);return}let h=bn(c,JSON.parse(i),o,l.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:xe([t,h.pathname])),(l.replace?r.replace:r.push)(h,l.state,l)},[t,r,i,o,e])}u.createContext(null);function tt(e,{relative:t}={}){let{matches:r}=u.useContext(be),{pathname:n}=Re(),o=JSON.stringify(yn(r));return u.useMemo(()=>bn(e,JSON.parse(o),n,t==="path"),[e,o,n,t])}function gi(e,t){return Cn(e,t)}function Cn(e,t,r,n){O(et(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=u.useContext(me),{matches:i}=u.useContext(be),s=i[i.length-1],d=s?s.params:{},c=s?s.pathname:"/",l=s?s.pathnameBase:"/",h=s&&s.route;{let x=h&&h.path||"";Sn(c,!h||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let p=Re(),m;if(t){let x=typeof t=="string"?Oe(t):t;O(l==="/"||x.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${x.pathname}" was given in the \`location\` prop.`),m=x}else m=p;let g=m.pathname||"/",y=g;if(l!=="/"){let x=l.replace(/^\//,"").split("/");y="/"+g.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=mn(e,{pathname:y});fe(h||b!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),fe(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=vi(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:xe([l,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?l:xe([l,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),i,r,n);return t&&$?u.createElement(Ze.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...m},navigationType:"POP"}},$):$}function xi(){let e=ji(),t=li(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},i={padding:"2px 4px",backgroundColor:n},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:i},"ErrorBoundary")," or"," ",u.createElement("code",{style:i},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),r?u.createElement("pre",{style:o},r):null,s)}var yi=u.createElement(xi,null),bi=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?u.createElement(be.Provider,{value:this.props.routeContext},u.createElement(nr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function $i({routeContext:e,match:t,children:r}){let n=u.useContext(Be);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),u.createElement(be.Provider,{value:e},r)}function vi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,i=r?.errors;if(i!=null){let c=o.findIndex(l=>l.route.id&&i?.[l.route.id]!==void 0);O(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let s=!1,d=-1;if(r)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(d=c),l.route.id){let{loaderData:h,errors:p}=r,m=l.route.loader&&!h.hasOwnProperty(l.route.id)&&(!p||p[l.route.id]===void 0);if(l.route.lazy||m){s=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,l,h)=>{let p,m=!1,g=null,y=null;r&&(p=i&&l.route.id?i[l.route.id]:void 0,g=l.route.errorElement||yi,s&&(d<0&&h===0?(Sn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),m=!0,y=null):d===h&&(m=!0,y=l.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,h+1)),$=()=>{let x;return p?x=g:m?x=y:l.route.Component?x=u.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=c,u.createElement($i,{match:l,routeContext:{outlet:c,matches:b,isDataRoute:r!=null},children:x})};return r&&(l.route.ErrorBoundary||l.route.errorElement||h===0)?u.createElement(bi,{location:r.location,revalidation:r.revalidation,component:g,error:p,children:$(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):$()},null)}function or(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function wi(e){let t=u.useContext(Be);return O(t,or(e)),t}function ki(e){let t=u.useContext(wt);return O(t,or(e)),t}function Ci(e){let t=u.useContext(be);return O(t,or(e)),t}function ir(e){let t=Ci(e),r=t.matches[t.matches.length-1];return O(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Si(){return ir("useRouteId")}function ji(){let e=u.useContext(nr),t=ki("useRouteError"),r=ir("useRouteError");return e!==void 0?e:t.errors?.[r]}function Pi(){let{router:e}=wi("useNavigate"),t=ir("useNavigate"),r=u.useRef(!1);return kn(()=>{r.current=!0}),u.useCallback(async(o,i={})=>{fe(r.current,wn),r.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var Cr={};function Sn(e,t,r){!t&&!Cr[e]&&(Cr[e]=!0,fe(!1,r))}u.memo(Ei);function Ei({routes:e,future:t,state:r}){return Cn(e,void 0,r,t)}function jn(e){O(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Ri({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:o,static:i=!1}){O(!et(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),d=u.useMemo(()=>({basename:s,navigator:o,static:i,future:{}}),[s,o,i]);typeof r=="string"&&(r=Oe(r));let{pathname:c="/",search:l="",hash:h="",state:p=null,key:m="default"}=r,g=u.useMemo(()=>{let y=ye(c,s);return y==null?null:{location:{pathname:y,search:l,hash:h,state:p,key:m},navigationType:n}},[s,c,l,h,p,m,n]);return fe(g!=null,`<Router basename="${s}"> is not able to match the URL "${c}${l}${h}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:u.createElement(me.Provider,{value:d},u.createElement(Ze.Provider,{children:t,value:g}))}function zi({children:e,location:t}){return gi(Ht(e),t)}function Ht(e,t=[]){let r=[];return u.Children.forEach(e,(n,o)=>{if(!u.isValidElement(n))return;let i=[...t,o];if(n.type===u.Fragment){r.push.apply(r,Ht(n.props.children,i));return}O(n.type===jn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),O(!n.props.index||!n.props.children,"An index route cannot have child routes.");let s={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(s.children=Ht(n.props.children,i)),r.push(s)}),r}var ct="get",lt="application/x-www-form-urlencoded";function kt(e){return e!=null&&typeof e.tagName=="string"}function Ti(e){return kt(e)&&e.tagName.toLowerCase()==="button"}function Li(e){return kt(e)&&e.tagName.toLowerCase()==="form"}function Ii(e){return kt(e)&&e.tagName.toLowerCase()==="input"}function Mi(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ai(e,t){return e.button===0&&(!t||t==="_self")&&!Mi(e)}var nt=null;function Ni(){if(nt===null)try{new FormData(document.createElement("form"),0),nt=!1}catch{nt=!0}return nt}var Di=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function It(e){return e!=null&&!Di.has(e)?(fe(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${lt}"`),null):e}function Fi(e,t){let r,n,o,i,s;if(Li(e)){let d=e.getAttribute("action");n=d?ye(d,t):null,r=e.getAttribute("method")||ct,o=It(e.getAttribute("enctype"))||lt,i=new FormData(e)}else if(Ti(e)||Ii(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||d.getAttribute("action");if(n=c?ye(c,t):null,r=e.getAttribute("formmethod")||d.getAttribute("method")||ct,o=It(e.getAttribute("formenctype"))||It(d.getAttribute("enctype"))||lt,i=new FormData(d,e),!Ni()){let{name:l,type:h,value:p}=e;if(h==="image"){let m=l?`${l}.`:"";i.append(`${m}x`,"0"),i.append(`${m}y`,"0")}else l&&i.append(l,p)}}else{if(kt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=ct,n=null,o=lt,s=e}return i&&o==="text/plain"&&(s=i,i=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:i,body:s}}function ar(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function Oi(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Bi(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Wi(e,t,r){let n=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let s=await Oi(i,r);return s.links?s.links():[]}return[]}));return Ui(n.flat(1).filter(Bi).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Sr(e,t,r,n,o,i){let s=(c,l)=>r[l]?c.route.id!==r[l].route.id:!0,d=(c,l)=>r[l].pathname!==c.pathname||r[l].route.path?.endsWith("*")&&r[l].params["*"]!==c.params["*"];return i==="assets"?t.filter((c,l)=>s(c,l)||d(c,l)):i==="data"?t.filter((c,l)=>{let h=n.routes[c.route.id];if(!h||!h.hasLoader)return!1;if(s(c,l)||d(c,l))return!0;if(c.route.shouldRevalidate){let p=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function Hi(e,t,{includeHydrateFallback:r}={}){return _i(e.map(n=>{let o=t.routes[n.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),r&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function _i(e){return[...new Set(e)]}function Gi(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function Ui(e,t){let r=new Set;return new Set(t),e.reduce((n,o)=>{let i=JSON.stringify(Gi(o));return r.has(i)||(r.add(i),n.push({key:i,link:o})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qi=new Set([100,101,204,205]);function Yi(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&ye(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Pn(){let e=u.useContext(Be);return ar(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Vi(){let e=u.useContext(wt);return ar(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var sr=u.createContext(void 0);sr.displayName="FrameworkContext";function En(){let e=u.useContext(sr);return ar(e,"You must render this element inside a <HydratedRouter> element"),e}function Ki(e,t){let r=u.useContext(sr),[n,o]=u.useState(!1),[i,s]=u.useState(!1),{onFocus:d,onBlur:c,onMouseEnter:l,onMouseLeave:h,onTouchStart:p}=t,m=u.useRef(null);u.useEffect(()=>{if(e==="render"&&s(!0),e==="viewport"){let b=x=>{x.forEach(v=>{s(v.isIntersecting)})},$=new IntersectionObserver(b,{threshold:.5});return m.current&&$.observe(m.current),()=>{$.disconnect()}}},[e]),u.useEffect(()=>{if(n){let b=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(b)}}},[n]);let g=()=>{o(!0)},y=()=>{o(!1),s(!1)};return r?e!=="intent"?[i,m,{}]:[i,m,{onFocus:He(d,g),onBlur:He(c,y),onMouseEnter:He(l,g),onMouseLeave:He(h,y),onTouchStart:He(p,g)}]:[!1,m,{}]}function He(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Xi({page:e,...t}){let{router:r}=Pn(),n=u.useMemo(()=>mn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?u.createElement(Ji,{page:e,matches:n,...t}):null}function Qi(e){let{manifest:t,routeModules:r}=En(),[n,o]=u.useState([]);return u.useEffect(()=>{let i=!1;return Wi(e,t,r).then(s=>{i||o(s)}),()=>{i=!0}},[e,t,r]),n}function Ji({page:e,matches:t,...r}){let n=Re(),{manifest:o,routeModules:i}=En(),{basename:s}=Pn(),{loaderData:d,matches:c}=Vi(),l=u.useMemo(()=>Sr(e,t,c,o,n,"data"),[e,t,c,o,n]),h=u.useMemo(()=>Sr(e,t,c,o,n,"assets"),[e,t,c,o,n]),p=u.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let y=new Set,b=!1;if(t.forEach(x=>{let v=o.routes[x.route.id];!v||!v.hasLoader||(!l.some(w=>w.route.id===x.route.id)&&x.route.id in d&&i[x.route.id]?.shouldRevalidate||v.hasClientLoader?b=!0:y.add(x.route.id))}),y.size===0)return[];let $=Yi(e,s);return b&&y.size>0&&$.searchParams.set("_routes",t.filter(x=>y.has(x.route.id)).map(x=>x.route.id).join(",")),[$.pathname+$.search]},[s,d,n,o,l,t,e,i]),m=u.useMemo(()=>Hi(h,o),[h,o]),g=Qi(h);return u.createElement(u.Fragment,null,p.map(y=>u.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...r})),m.map(y=>u.createElement("link",{key:y,rel:"modulepreload",href:y,...r})),g.map(({key:y,link:b})=>u.createElement("link",{key:y,...b})))}function Zi(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var Rn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Rn&&(window.__reactRouterVersion="7.6.3")}catch{}function ea({basename:e,children:t,window:r}){let n=u.useRef();n.current==null&&(n.current=Bo({window:r,v5Compat:!0}));let o=n.current,[i,s]=u.useState({action:o.action,location:o.location}),d=u.useCallback(c=>{u.startTransition(()=>s(c))},[s]);return u.useLayoutEffect(()=>o.listen(d),[o,d]),u.createElement(Ri,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:o})}var zn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Tn=u.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:o,reloadDocument:i,replace:s,state:d,target:c,to:l,preventScrollReset:h,viewTransition:p,...m},g){let{basename:y}=u.useContext(me),b=typeof l=="string"&&zn.test(l),$,x=!1;if(typeof l=="string"&&b&&($=l,Rn))try{let A=new URL(window.location.href),J=l.startsWith("//")?new URL(A.protocol+l):new URL(l),X=ye(J.pathname,y);J.origin===A.origin&&X!=null?l=X+J.search+J.hash:x=!0}catch{fe(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let v=pi(l,{relative:o}),[w,P,L]=Ki(n,m),R=oa(l,{replace:s,state:d,target:c,preventScrollReset:h,relative:o,viewTransition:p});function k(A){t&&t(A),A.defaultPrevented||R(A)}let H=u.createElement("a",{...m,...L,href:$||v,onClick:x||i?t:k,ref:Zi(g,P),target:c,"data-discover":!b&&r==="render"?"true":void 0});return w&&!b?u.createElement(u.Fragment,null,H,u.createElement(Xi,{page:v})):H});Tn.displayName="Link";var ta=u.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:o=!1,style:i,to:s,viewTransition:d,children:c,...l},h){let p=tt(s,{relative:l.relative}),m=Re(),g=u.useContext(wt),{navigator:y,basename:b}=u.useContext(me),$=g!=null&&la(p)&&d===!0,x=y.encodeLocation?y.encodeLocation(p).pathname:p.pathname,v=m.pathname,w=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;r||(v=v.toLowerCase(),w=w?w.toLowerCase():null,x=x.toLowerCase()),w&&b&&(w=ye(w,b)||w);const P=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let L=v===x||!o&&v.startsWith(x)&&v.charAt(P)==="/",R=w!=null&&(w===x||!o&&w.startsWith(x)&&w.charAt(x.length)==="/"),k={isActive:L,isPending:R,isTransitioning:$},H=L?t:void 0,A;typeof n=="function"?A=n(k):A=[n,L?"active":null,R?"pending":null,$?"transitioning":null].filter(Boolean).join(" ");let J=typeof i=="function"?i(k):i;return u.createElement(Tn,{...l,"aria-current":H,className:A,ref:h,style:J,to:s,viewTransition:d},typeof c=="function"?c(k):c)});ta.displayName="NavLink";var ra=u.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:o,state:i,method:s=ct,action:d,onSubmit:c,relative:l,preventScrollReset:h,viewTransition:p,...m},g)=>{let y=sa(),b=ca(d,{relative:l}),$=s.toLowerCase()==="get"?"get":"post",x=typeof d=="string"&&zn.test(d),v=w=>{if(c&&c(w),w.defaultPrevented)return;w.preventDefault();let P=w.nativeEvent.submitter,L=P?.getAttribute("formmethod")||s;y(P||w.currentTarget,{fetcherKey:t,method:L,navigate:r,replace:o,state:i,relative:l,preventScrollReset:h,viewTransition:p})};return u.createElement("form",{ref:g,method:$,action:b,onSubmit:n?c:v,...m,"data-discover":!x&&e==="render"?"true":void 0})});ra.displayName="Form";function na(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ln(e){let t=u.useContext(Be);return O(t,na(e)),t}function oa(e,{target:t,replace:r,state:n,preventScrollReset:o,relative:i,viewTransition:s}={}){let d=fi(),c=Re(),l=tt(e,{relative:i});return u.useCallback(h=>{if(Ai(h,t)){h.preventDefault();let p=r!==void 0?r:Ke(c)===Ke(l);d(e,{replace:p,state:n,preventScrollReset:o,relative:i,viewTransition:s})}},[c,d,l,r,n,t,e,o,i,s])}var ia=0,aa=()=>`__${String(++ia)}__`;function sa(){let{router:e}=Ln("useSubmit"),{basename:t}=u.useContext(me),r=Si();return u.useCallback(async(n,o={})=>{let{action:i,method:s,encType:d,formData:c,body:l}=Fi(n,t);if(o.navigate===!1){let h=o.fetcherKey||aa();await e.fetch(h,r,o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||s,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||s,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function ca(e,{relative:t}={}){let{basename:r}=u.useContext(me),n=u.useContext(be);O(n,"useFormAction must be used inside a RouteContext");let[o]=n.matches.slice(-1),i={...tt(e||".",{relative:t})},s=Re();if(e==null){i.search=s.search;let d=new URLSearchParams(i.search),c=d.getAll("index");if(c.some(h=>h==="")){d.delete("index"),c.filter(p=>p).forEach(p=>d.append("index",p));let h=d.toString();i.search=h?`?${h}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(i.pathname=i.pathname==="/"?r:xe([r,i.pathname])),Ke(i)}function la(e,t={}){let r=u.useContext(vn);O(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=Ln("useViewTransitionState"),o=tt(e,{relative:t.relative});if(!r.isTransitioning)return!1;let i=ye(r.currentLocation.pathname,n)||r.currentLocation.pathname,s=ye(r.nextLocation.pathname,n)||r.nextLocation.pathname;return gt(o.pathname,s)!=null||gt(o.pathname,i)!=null}[...qi];const In={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},da={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#ffffff",surfaceElevated:"#ffffff",surfaceHover:"#f9fafb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},ua={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Mn={colors:da,...In},ha={colors:ua,...In},pa={light:Mn,dark:ha},fa=Mn;var Y=function(){return Y=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},Y.apply(this,arguments)};function Xe(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,i;n<o;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var F="-ms-",Ve="-moz-",N="-webkit-",An="comm",Ct="rule",cr="decl",ma="@import",Nn="@keyframes",ga="@layer",Dn=Math.abs,lr=String.fromCharCode,_t=Object.assign;function xa(e,t){return q(e,0)^45?(((t<<2^q(e,0))<<2^q(e,1))<<2^q(e,2))<<2^q(e,3):0}function Fn(e){return e.trim()}function ge(e,t){return(e=t.exec(e))?e[0]:e}function T(e,t,r){return e.replace(t,r)}function dt(e,t,r){return e.indexOf(t,r)}function q(e,t){return e.charCodeAt(t)|0}function Me(e,t,r){return e.slice(t,r)}function he(e){return e.length}function On(e){return e.length}function Ge(e,t){return t.push(e),e}function ya(e,t){return e.map(t).join("")}function jr(e,t){return e.filter(function(r){return!ge(r,t)})}var St=1,Ae=1,Bn=0,ae=0,W=0,We="";function jt(e,t,r,n,o,i,s,d){return{value:e,root:t,parent:r,type:n,props:o,children:i,line:St,column:Ae,length:s,return:"",siblings:d}}function $e(e,t){return _t(jt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ze(e){for(;e.root;)e=$e(e.root,{children:[e]});Ge(e,e.siblings)}function ba(){return W}function $a(){return W=ae>0?q(We,--ae):0,Ae--,W===10&&(Ae=1,St--),W}function le(){return W=ae<Bn?q(We,ae++):0,Ae++,W===10&&(Ae=1,St++),W}function Se(){return q(We,ae)}function ut(){return ae}function Pt(e,t){return Me(We,e,t)}function Gt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function va(e){return St=Ae=1,Bn=he(We=e),ae=0,[]}function wa(e){return We="",e}function Mt(e){return Fn(Pt(ae-1,Ut(e===91?e+2:e===40?e+1:e)))}function ka(e){for(;(W=Se())&&W<33;)le();return Gt(e)>2||Gt(W)>3?"":" "}function Ca(e,t){for(;--t&&le()&&!(W<48||W>102||W>57&&W<65||W>70&&W<97););return Pt(e,ut()+(t<6&&Se()==32&&le()==32))}function Ut(e){for(;le();)switch(W){case e:return ae;case 34:case 39:e!==34&&e!==39&&Ut(W);break;case 40:e===41&&Ut(e);break;case 92:le();break}return ae}function Sa(e,t){for(;le()&&e+W!==57;)if(e+W===84&&Se()===47)break;return"/*"+Pt(t,ae-1)+"*"+lr(e===47?e:le())}function ja(e){for(;!Gt(Se());)le();return Pt(e,ae)}function Pa(e){return wa(ht("",null,null,null,[""],e=va(e),0,[0],e))}function ht(e,t,r,n,o,i,s,d,c){for(var l=0,h=0,p=s,m=0,g=0,y=0,b=1,$=1,x=1,v=0,w="",P=o,L=i,R=n,k=w;$;)switch(y=v,v=le()){case 40:if(y!=108&&q(k,p-1)==58){dt(k+=T(Mt(v),"&","&\f"),"&\f",Dn(l?d[l-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:k+=Mt(v);break;case 9:case 10:case 13:case 32:k+=ka(y);break;case 92:k+=Ca(ut()-1,7);continue;case 47:switch(Se()){case 42:case 47:Ge(Ea(Sa(le(),ut()),t,r,c),c);break;default:k+="/"}break;case 123*b:d[l++]=he(k)*x;case 125*b:case 59:case 0:switch(v){case 0:case 125:$=0;case 59+h:x==-1&&(k=T(k,/\f/g,"")),g>0&&he(k)-p&&Ge(g>32?Er(k+";",n,r,p-1,c):Er(T(k," ","")+";",n,r,p-2,c),c);break;case 59:k+=";";default:if(Ge(R=Pr(k,t,r,l,h,o,d,w,P=[],L=[],p,i),i),v===123)if(h===0)ht(k,t,R,R,P,i,p,d,L);else switch(m===99&&q(k,3)===110?100:m){case 100:case 108:case 109:case 115:ht(e,R,R,n&&Ge(Pr(e,R,R,0,0,o,d,w,o,P=[],p,L),L),o,L,p,d,n?P:L);break;default:ht(k,R,R,R,[""],L,0,d,L)}}l=h=g=0,b=x=1,w=k="",p=s;break;case 58:p=1+he(k),g=y;default:if(b<1){if(v==123)--b;else if(v==125&&b++==0&&$a()==125)continue}switch(k+=lr(v),v*b){case 38:x=h>0?1:(k+="\f",-1);break;case 44:d[l++]=(he(k)-1)*x,x=1;break;case 64:Se()===45&&(k+=Mt(le())),m=Se(),h=p=he(w=k+=ja(ut())),v++;break;case 45:y===45&&he(k)==2&&(b=0)}}return i}function Pr(e,t,r,n,o,i,s,d,c,l,h,p){for(var m=o-1,g=o===0?i:[""],y=On(g),b=0,$=0,x=0;b<n;++b)for(var v=0,w=Me(e,m+1,m=Dn($=s[b])),P=e;v<y;++v)(P=Fn($>0?g[v]+" "+w:T(w,/&\f/g,g[v])))&&(c[x++]=P);return jt(e,t,r,o===0?Ct:d,c,l,h,p)}function Ea(e,t,r,n){return jt(e,t,r,An,lr(ba()),Me(e,2,-2),0,n)}function Er(e,t,r,n,o){return jt(e,t,r,cr,Me(e,0,n),Me(e,n+1,-1),n,o)}function Wn(e,t,r){switch(xa(e,t)){case 5103:return N+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return N+e+e;case 4789:return Ve+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return N+e+Ve+e+F+e+e;case 5936:switch(q(e,t+11)){case 114:return N+e+F+T(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return N+e+F+T(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return N+e+F+T(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return N+e+F+e+e;case 6165:return N+e+F+"flex-"+e+e;case 5187:return N+e+T(e,/(\w+).+(:[^]+)/,N+"box-$1$2"+F+"flex-$1$2")+e;case 5443:return N+e+F+"flex-item-"+T(e,/flex-|-self/g,"")+(ge(e,/flex-|baseline/)?"":F+"grid-row-"+T(e,/flex-|-self/g,""))+e;case 4675:return N+e+F+"flex-line-pack"+T(e,/align-content|flex-|-self/g,"")+e;case 5548:return N+e+F+T(e,"shrink","negative")+e;case 5292:return N+e+F+T(e,"basis","preferred-size")+e;case 6060:return N+"box-"+T(e,"-grow","")+N+e+F+T(e,"grow","positive")+e;case 4554:return N+T(e,/([^-])(transform)/g,"$1"+N+"$2")+e;case 6187:return T(T(T(e,/(zoom-|grab)/,N+"$1"),/(image-set)/,N+"$1"),e,"")+e;case 5495:case 3959:return T(e,/(image-set\([^]*)/,N+"$1$`$1");case 4968:return T(T(e,/(.+:)(flex-)?(.*)/,N+"box-pack:$3"+F+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+N+e+e;case 4200:if(!ge(e,/flex-|baseline/))return F+"grid-column-align"+Me(e,t)+e;break;case 2592:case 3360:return F+T(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,ge(n.props,/grid-\w+-end/)})?~dt(e+(r=r[t].value),"span",0)?e:F+T(e,"-start","")+e+F+"grid-row-span:"+(~dt(r,"span",0)?ge(r,/\d+/):+ge(r,/\d+/)-+ge(e,/\d+/))+";":F+T(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return ge(n.props,/grid-\w+-start/)})?e:F+T(T(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return T(e,/(.+)-inline(.+)/,N+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(he(e)-1-t>6)switch(q(e,t+1)){case 109:if(q(e,t+4)!==45)break;case 102:return T(e,/(.+:)(.+)-([^]+)/,"$1"+N+"$2-$3$1"+Ve+(q(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~dt(e,"stretch",0)?Wn(T(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return T(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,i,s,d,c,l){return F+o+":"+i+l+(s?F+o+"-span:"+(d?c:+c-+i)+l:"")+e});case 4949:if(q(e,t+6)===121)return T(e,":",":"+N)+e;break;case 6444:switch(q(e,q(e,14)===45?18:11)){case 120:return T(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+N+(q(e,14)===45?"inline-":"")+"box$3$1"+N+"$2$3$1"+F+"$2box$3")+e;case 100:return T(e,":",":"+F)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return T(e,"scroll-","scroll-snap-")+e}return e}function xt(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function Ra(e,t,r,n){switch(e.type){case ga:if(e.children.length)break;case ma:case cr:return e.return=e.return||e.value;case An:return"";case Nn:return e.return=e.value+"{"+xt(e.children,n)+"}";case Ct:if(!he(e.value=e.props.join(",")))return""}return he(r=xt(e.children,n))?e.return=e.value+"{"+r+"}":""}function za(e){var t=On(e);return function(r,n,o,i){for(var s="",d=0;d<t;d++)s+=e[d](r,n,o,i)||"";return s}}function Ta(e){return function(t){t.root||(t=t.return)&&e(t)}}function La(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case cr:e.return=Wn(e.value,e.length,r);return;case Nn:return xt([$e(e,{value:T(e.value,"@","@"+N)})],n);case Ct:if(e.length)return ya(r=e.props,function(o){switch(ge(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ze($e(e,{props:[T(o,/:(read-\w+)/,":"+Ve+"$1")]})),ze($e(e,{props:[o]})),_t(e,{props:jr(r,n)});break;case"::placeholder":ze($e(e,{props:[T(o,/:(plac\w+)/,":"+N+"input-$1")]})),ze($e(e,{props:[T(o,/:(plac\w+)/,":"+Ve+"$1")]})),ze($e(e,{props:[T(o,/:(plac\w+)/,F+"input-$1")]})),ze($e(e,{props:[o]})),_t(e,{props:jr(r,n)});break}return""})}}var Ia={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},oe={},Ne=typeof process<"u"&&oe!==void 0&&(oe.REACT_APP_SC_ATTR||oe.SC_ATTR)||"data-styled",Hn="active",_n="data-styled-version",Et="6.1.19",dr=`/*!sc*/
`,yt=typeof window<"u"&&typeof document<"u",Ma=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&oe!==void 0&&oe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&oe.REACT_APP_SC_DISABLE_SPEEDY!==""?oe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&oe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&oe!==void 0&&oe.SC_DISABLE_SPEEDY!==void 0&&oe.SC_DISABLE_SPEEDY!==""&&oe.SC_DISABLE_SPEEDY!=="false"&&oe.SC_DISABLE_SPEEDY),Aa={},Rt=Object.freeze([]),De=Object.freeze({});function Gn(e,t,r){return r===void 0&&(r=De),e.theme!==r.theme&&e.theme||t||r.theme}var Un=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Na=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Da=/(^-|-$)/g;function Rr(e){return e.replace(Na,"-").replace(Da,"")}var Fa=/(a)(d)/gi,ot=52,zr=function(e){return String.fromCharCode(e+(e>25?39:97))};function qt(e){var t,r="";for(t=Math.abs(e);t>ot;t=t/ot|0)r=zr(t%ot)+r;return(zr(t%ot)+r).replace(Fa,"$1-$2")}var At,qn=5381,Te=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Yn=function(e){return Te(qn,e)};function Vn(e){return qt(Yn(e)>>>0)}function Oa(e){return e.displayName||e.name||"Component"}function Nt(e){return typeof e=="string"&&!0}var Kn=typeof Symbol=="function"&&Symbol.for,Xn=Kn?Symbol.for("react.memo"):60115,Ba=Kn?Symbol.for("react.forward_ref"):60112,Wa={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Ha={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Qn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},_a=((At={})[Ba]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},At[Xn]=Qn,At);function Tr(e){return("type"in(t=e)&&t.type.$$typeof)===Xn?Qn:"$$typeof"in e?_a[e.$$typeof]:Wa;var t}var Ga=Object.defineProperty,Ua=Object.getOwnPropertyNames,Lr=Object.getOwnPropertySymbols,qa=Object.getOwnPropertyDescriptor,Ya=Object.getPrototypeOf,Ir=Object.prototype;function Jn(e,t,r){if(typeof t!="string"){if(Ir){var n=Ya(t);n&&n!==Ir&&Jn(e,n,r)}var o=Ua(t);Lr&&(o=o.concat(Lr(t)));for(var i=Tr(e),s=Tr(t),d=0;d<o.length;++d){var c=o[d];if(!(c in Ha||r&&r[c]||s&&c in s||i&&c in i)){var l=qa(t,c);try{Ga(e,c,l)}catch{}}}}return e}function je(e){return typeof e=="function"}function ur(e){return typeof e=="object"&&"styledComponentId"in e}function Ce(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Yt(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function Qe(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Vt(e,t,r){if(r===void 0&&(r=!1),!r&&!Qe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=Vt(e[n],t[n]);else if(Qe(t))for(var n in t)e[n]=Vt(e[n],t[n]);return e}function hr(e,t){Object.defineProperty(e,"toString",{value:t})}function Pe(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Va=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,i=o;t>=i;)if((i<<=1)<0)throw Pe(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var s=o;s<i;s++)this.groupSizes[s]=0}for(var d=this.indexOfGroup(t+1),c=(s=0,r.length);s<c;s++)this.tag.insertRule(d,r[s])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var i=n;i<o;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),i=o+n,s=o;s<i;s++)r+="".concat(this.tag.getRule(s)).concat(dr);return r},e}(),pt=new Map,bt=new Map,ft=1,it=function(e){if(pt.has(e))return pt.get(e);for(;bt.has(ft);)ft++;var t=ft++;return pt.set(e,t),bt.set(t,e),t},Ka=function(e,t){ft=t+1,pt.set(e,t),bt.set(t,e)},Xa="style[".concat(Ne,"][").concat(_n,'="').concat(Et,'"]'),Qa=new RegExp("^".concat(Ne,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ja=function(e,t,r){for(var n,o=r.split(","),i=0,s=o.length;i<s;i++)(n=o[i])&&e.registerName(t,n)},Za=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(dr),o=[],i=0,s=n.length;i<s;i++){var d=n[i].trim();if(d){var c=d.match(Qa);if(c){var l=0|parseInt(c[1],10),h=c[2];l!==0&&(Ka(h,l),Ja(e,h,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(d)}}},Mr=function(e){for(var t=document.querySelectorAll(Xa),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Ne)!==Hn&&(Za(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function es(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Zn=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(d){var c=Array.from(d.querySelectorAll("style[".concat(Ne,"]")));return c[c.length-1]}(r),i=o!==void 0?o.nextSibling:null;n.setAttribute(Ne,Hn),n.setAttribute(_n,Et);var s=es();return s&&n.setAttribute("nonce",s),r.insertBefore(n,i),n},ts=function(){function e(t){this.element=Zn(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,i=n.length;o<i;o++){var s=n[o];if(s.ownerNode===r)return s}throw Pe(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),rs=function(){function e(t){this.element=Zn(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),ns=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Ar=yt,os={isServer:!yt,useCSSOMInjection:!Ma},$t=function(){function e(t,r,n){t===void 0&&(t=De),r===void 0&&(r={});var o=this;this.options=Y(Y({},os),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&yt&&Ar&&(Ar=!1,Mr(this)),hr(this,function(){return function(i){for(var s=i.getTag(),d=s.length,c="",l=function(p){var m=function(x){return bt.get(x)}(p);if(m===void 0)return"continue";var g=i.names.get(m),y=s.getGroup(p);if(g===void 0||!g.size||y.length===0)return"continue";var b="".concat(Ne,".g").concat(p,'[id="').concat(m,'"]'),$="";g!==void 0&&g.forEach(function(x){x.length>0&&($+="".concat(x,","))}),c+="".concat(y).concat(b,'{content:"').concat($,'"}').concat(dr)},h=0;h<d;h++)l(h);return c}(o)})}return e.registerId=function(t){return it(t)},e.prototype.rehydrate=function(){!this.server&&yt&&Mr(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(Y(Y({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new ns(o):n?new ts(o):new rs(o)}(this.options),new Va(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(it(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(it(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(it(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),is=/&/g,as=/^\s*\/\/.*$/gm;function eo(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=eo(r.children,t)),r})}function ss(e){var t,r,n,o=De,i=o.options,s=i===void 0?De:i,d=o.plugins,c=d===void 0?Rt:d,l=function(m,g,y){return y.startsWith(r)&&y.endsWith(r)&&y.replaceAll(r,"").length>0?".".concat(t):m},h=c.slice();h.push(function(m){m.type===Ct&&m.value.includes("&")&&(m.props[0]=m.props[0].replace(is,r).replace(n,l))}),s.prefix&&h.push(La),h.push(Ra);var p=function(m,g,y,b){g===void 0&&(g=""),y===void 0&&(y=""),b===void 0&&(b="&"),t=b,r=g,n=new RegExp("\\".concat(r,"\\b"),"g");var $=m.replace(as,""),x=Pa(y||g?"".concat(y," ").concat(g," { ").concat($," }"):$);s.namespace&&(x=eo(x,s.namespace));var v=[];return xt(x,za(h.concat(Ta(function(w){return v.push(w)})))),v};return p.hash=c.length?c.reduce(function(m,g){return g.name||Pe(15),Te(m,g.name)},qn).toString():"",p}var cs=new $t,Kt=ss(),to=K.createContext({shouldForwardProp:void 0,styleSheet:cs,stylis:Kt});to.Consumer;K.createContext(void 0);function Xt(){return u.useContext(to)}var ls=function(){function e(t,r){var n=this;this.inject=function(o,i){i===void 0&&(i=Kt);var s=n.name+i.hash;o.hasNameForId(n.id,s)||o.insertRules(n.id,s,i(n.rules,s,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,hr(this,function(){throw Pe(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Kt),this.name+t.hash},e}(),ds=function(e){return e>="A"&&e<="Z"};function Nr(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;ds(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var ro=function(e){return e==null||e===!1||e===""},no=function(e){var t,r,n=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!ro(i)&&(Array.isArray(i)&&i.isCss||je(i)?n.push("".concat(Nr(o),":"),i,";"):Qe(i)?n.push.apply(n,Xe(Xe(["".concat(o," {")],no(i),!1),["}"],!1)):n.push("".concat(Nr(o),": ").concat((t=o,(r=i)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in Ia||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function ve(e,t,r,n){if(ro(e))return[];if(ur(e))return[".".concat(e.styledComponentId)];if(je(e)){if(!je(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return ve(o,t,r,n)}var i;return e instanceof ls?r?(e.inject(r,n),[e.getName(n)]):[e]:Qe(e)?no(e):Array.isArray(e)?Array.prototype.concat.apply(Rt,e.map(function(s){return ve(s,t,r,n)})):[e.toString()]}function oo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(je(r)&&!ur(r))return!1}return!0}var us=Yn(Et),hs=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&oo(t),this.componentId=r,this.baseHash=Te(us,r),this.baseStyle=n,$t.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=Ce(o,this.staticRulesId);else{var i=Yt(ve(this.rules,t,r,n)),s=qt(Te(this.baseHash,i)>>>0);if(!r.hasNameForId(this.componentId,s)){var d=n(i,".".concat(s),void 0,this.componentId);r.insertRules(this.componentId,s,d)}o=Ce(o,s),this.staticRulesId=s}else{for(var c=Te(this.baseHash,n.hash),l="",h=0;h<this.rules.length;h++){var p=this.rules[h];if(typeof p=="string")l+=p;else if(p){var m=Yt(ve(p,t,r,n));c=Te(c,m+h),l+=m}}if(l){var g=qt(c>>>0);r.hasNameForId(this.componentId,g)||r.insertRules(this.componentId,g,n(l,".".concat(g),void 0,this.componentId)),o=Ce(o,g)}}return o},e}(),Je=K.createContext(void 0);Je.Consumer;function ps(e){var t=K.useContext(Je),r=u.useMemo(function(){return function(n,o){if(!n)throw Pe(14);if(je(n)){var i=n(o);return i}if(Array.isArray(n)||typeof n!="object")throw Pe(8);return o?Y(Y({},o),n):n}(e.theme,t)},[e.theme,t]);return e.children?K.createElement(Je.Provider,{value:r},e.children):null}var Dt={};function fs(e,t,r){var n=ur(e),o=e,i=!Nt(e),s=t.attrs,d=s===void 0?Rt:s,c=t.componentId,l=c===void 0?function(P,L){var R=typeof P!="string"?"sc":Rr(P);Dt[R]=(Dt[R]||0)+1;var k="".concat(R,"-").concat(Vn(Et+R+Dt[R]));return L?"".concat(L,"-").concat(k):k}(t.displayName,t.parentComponentId):c,h=t.displayName,p=h===void 0?function(P){return Nt(P)?"styled.".concat(P):"Styled(".concat(Oa(P),")")}(e):h,m=t.displayName&&t.componentId?"".concat(Rr(t.displayName),"-").concat(t.componentId):t.componentId||l,g=n&&o.attrs?o.attrs.concat(d).filter(Boolean):d,y=t.shouldForwardProp;if(n&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;y=function(P,L){return b(P,L)&&$(P,L)}}else y=b}var x=new hs(r,m,n?o.componentStyle:void 0);function v(P,L){return function(R,k,H){var A=R.attrs,J=R.componentStyle,X=R.defaultProps,te=R.foldedComponentIds,re=R.styledComponentId,se=R.target,ne=K.useContext(Je),ke=Xt(),de=R.shouldForwardProp||ke.shouldForwardProp,C=Gn(k,ne,X)||De,j=function(Z,Q,I){for(var G,D=Y(Y({},Q),{className:void 0,theme:I}),U=0;U<Z.length;U+=1){var ce=je(G=Z[U])?G(D):G;for(var B in ce)D[B]=B==="className"?Ce(D[B],ce[B]):B==="style"?Y(Y({},D[B]),ce[B]):ce[B]}return Q.className&&(D.className=Ce(D.className,Q.className)),D}(A,k,C),E=j.as||se,z={};for(var S in j)j[S]===void 0||S[0]==="$"||S==="as"||S==="theme"&&j.theme===C||(S==="forwardedAs"?z.as=j.forwardedAs:de&&!de(S,E)||(z[S]=j[S]));var M=function(Z,Q){var I=Xt(),G=Z.generateAndInjectStyles(Q,I.styleSheet,I.stylis);return G}(J,j),_=Ce(te,re);return M&&(_+=" "+M),j.className&&(_+=" "+j.className),z[Nt(E)&&!Un.has(E)?"class":"className"]=_,H&&(z.ref=H),u.createElement(E,z)}(w,P,L)}v.displayName=p;var w=K.forwardRef(v);return w.attrs=g,w.componentStyle=x,w.displayName=p,w.shouldForwardProp=y,w.foldedComponentIds=n?Ce(o.foldedComponentIds,o.styledComponentId):"",w.styledComponentId=m,w.target=n?o.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=n?function(L){for(var R=[],k=1;k<arguments.length;k++)R[k-1]=arguments[k];for(var H=0,A=R;H<A.length;H++)Vt(L,A[H],!0);return L}({},o.defaultProps,P):P}}),hr(w,function(){return".".concat(w.styledComponentId)}),i&&Jn(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function Dr(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Fr=function(e){return Object.assign(e,{isCss:!0})};function pe(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(je(e)||Qe(e))return Fr(ve(Dr(Rt,Xe([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?ve(n):Fr(ve(Dr(n,t)))}function Qt(e,t,r){if(r===void 0&&(r=De),!t)throw Pe(1,t);var n=function(o){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return e(t,r,pe.apply(void 0,Xe([o],i,!1)))};return n.attrs=function(o){return Qt(e,t,Y(Y({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Qt(e,t,Y(Y({},r),o))},n}var io=function(e){return Qt(fs,e)},f=io;Un.forEach(function(e){f[e]=io(e)});var ms=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=oo(t),$t.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var i=o(Yt(ve(this.rules,r,n,o)),""),s=this.componentId+t;n.insertRules(s,s,i)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&$t.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function gs(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=pe.apply(void 0,Xe([e],t,!1)),o="sc-global-".concat(Vn(JSON.stringify(n))),i=new ms(n,o),s=function(c){var l=Xt(),h=K.useContext(Je),p=K.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&d(p,c,l.styleSheet,h,l.stylis),K.useLayoutEffect(function(){if(!l.styleSheet.server)return d(p,c,l.styleSheet,h,l.stylis),function(){return i.removeStyles(p,l.styleSheet)}},[p,c,l.styleSheet,h,l.stylis]),null};function d(c,l,h,p,m){if(i.isStatic)i.renderStyles(c,Aa,h,m);else{var g=Y(Y({},l),{theme:Gn(l,p,s.defaultProps)});i.renderStyles(c,g,h,m)}}return K.memo(s)}const ao=u.createContext(void 0),xs=()=>{const e=u.useContext(ao);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},ys=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",bs=({children:e})=>{const t=Fe(),r=t.preferences.theme||"system",o=r==="system"?ys():r,i=pa[o]||fa,s={theme:i,themeName:o,themePreference:r,setTheme:d=>{t.updatePreference("theme",d)},toggleTheme:()=>{const d=o==="light"?"dark":"light";t.updatePreference("theme",d)},isDarkMode:o==="dark"};return u.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const d=window.matchMedia("(prefers-color-scheme: dark)"),c=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return d.addEventListener("change",c),()=>d.removeEventListener("change",c)}},[r,t]),u.useEffect(()=>{if(typeof document<"u"){const d=document.documentElement;Object.entries(i.colors).forEach(([c,l])=>{d.style.setProperty(`--color-${c}`,l)}),Object.entries(i.spacing).forEach(([c,l])=>{d.style.setProperty(`--spacing-${c}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[i,o]),a.jsx(ao.Provider,{value:s,children:a.jsx(ps,{theme:i,children:e})})};function $s(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function vs(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var Ft=typeof window<"u",ws=function(e){u.useEffect(e,[])},ks=function(e){var t=u.useRef(e);t.current=e,ws(function(){return function(){return t.current()}})},Cs=function(e){var t=u.useRef(0),r=u.useState(e),n=r[0],o=r[1],i=u.useCallback(function(s){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(s)})},[]);return ks(function(){cancelAnimationFrame(t.current)}),[n,i]},so=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,o=t.initialHeight,i=o===void 0?1/0:o,s=t.onChange,d=Cs({width:Ft?window.innerWidth:n,height:Ft?window.innerHeight:i}),c=d[0],l=d[1];return u.useEffect(function(){if(Ft){var h=function(){var p=window.innerWidth,m=window.innerHeight;l({width:p,height:m}),s&&s(p,m)};return $s(window,"resize",h),function(){vs(window,"resize",h)}}},[]),c};const co=()=>{const{width:e=0,height:t=0}=so();return{width:e,height:t}},Ss=()=>{const{width:e=0,height:t=0}=so();return e>t?"landscape":"portrait"},js=()=>{const{width:e}=co(),{theme:t}=xs(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Ps=()=>{const[e,t]=u.useState(!1);return u.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},zt=()=>{const e=co(),t=Ss(),r=js(),n=Ps();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n}},Es=u.createContext(void 0),Rs=({children:e})=>{const t=Fe(),r=zt(),[n,o]=u.useState(!0),[i,s]=u.useState(["chat","moves"]),[d,c]=u.useState(!1),l=t.preferences.layout,h=u.useMemo(()=>l==="auto"?r.orientation:l,[l,r.orientation]),p=u.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),m=b=>{t.updatePreference("layout",b)},g=b=>{s($=>$.includes(b)?$.filter(x=>x!==b):[...$,b])};u.useEffect(()=>{c(!0),o($=>{const x=!p;return $!==x?x:$}),s($=>{if(p&&h==="portrait"){const x=["chat"];return JSON.stringify($)!==JSON.stringify(x)?x:$}else if(h==="landscape"&&!p){const x=["chat","moves","analysis"];return JSON.stringify($)!==JSON.stringify(x)?x:$}return $});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[h,p]);const y={...r,layoutPreference:l,setLayoutPreference:m,activeLayout:h,isCompactMode:p,showSidebar:n,setSidebarVisible:o,activePanels:i,togglePanel:g,isTransitioning:d};return a.jsx(Es.Provider,{value:y,children:e})};f.div`
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
`;const zs=f.header`
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
`,Ts=f.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Ls=f.button`
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
`,Is=f.img`
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
`;const Ms=f.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Or=f.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Br=f.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Wr=f.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,_e=f.button`
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
`,lo=V(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,o=d=>{t.updatePreference("viewMode",d)},i=d=>{t.updatePreference("chessOrientation",d)},s=r==="chat-only";return a.jsxs(zs,{children:[a.jsxs(Ts,{children:[a.jsx(Ls,{onClick:e,"aria-label":"Menu",children:"☰"}),a.jsx(Is,{src:"/simpleficsinterface.svg",alt:"Simple FICS Interface",title:"Simple FICS Interface"})]}),a.jsxs(Ms,{children:[a.jsxs(Or,{children:[a.jsx(Br,{children:"Orient:"}),a.jsxs(Wr,{children:[a.jsx(_e,{$isActive:n==="landscape",$isDisabled:s,onClick:()=>!s&&i("landscape"),disabled:s,title:"Landscape",children:"▭"}),a.jsx(_e,{$isActive:n==="portrait",$isDisabled:s,onClick:()=>!s&&i("portrait"),disabled:s,title:"Portrait",children:"▯"})]})]}),a.jsxs(Or,{children:[a.jsx(Br,{children:"Mode:"}),a.jsxs(Wr,{children:[a.jsx(_e,{$isActive:r==="chess-only",onClick:()=>o("chess-only"),title:"Chess Only",children:"♔"}),a.jsx(_e,{$isActive:r==="chess-and-chat",onClick:()=>o("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.jsx(_e,{$isActive:r==="chat-only",onClick:()=>o("chat-only"),title:"Chat Only",children:"▤"})]})]})]})]})});lo.displayName="AppHeader";const As=f.img`
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
`,Ns={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},we=({piece:e,size:t,isDragging:r=!1,style:n})=>{const o=Ns[e];if(!o)return null;const i=`/pieces/cburnett/${o}.svg`;return a.jsx(As,{className:"chess-piece",src:i,alt:o,$isDragging:r,draggable:!1,style:n})};we.displayName="ChessPiece";const Ds=f.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Fs=f.div`
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
`,Os=f.button`
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
`,uo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:o})=>{if(!o)return null;const i=["Q","R","B","N"],s=d=>t==="white"?d:d.toLowerCase();return a.jsx(Ds,{$isOpen:e,onClick:n,children:a.jsx(Fs,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:i.map(d=>a.jsx(Os,{onClick:()=>r(d),children:a.jsx(we,{piece:s(d),size:50})},d))})})};uo.displayName="PromotionDialog";const Bs=f.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  user-select: none;
`,Ws=f.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,Hs=f.div`
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
`,Hr=f.div`
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
`,_s=f.div`
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
`,Gs=f.div`
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
`,Le=["a","b","c","d","e","f","g","h"],Ie=["8","7","6","5","4","3","2","1"];function Us(e,t){return(e+t)%2===0}function qs(e,t,r){const n=r?Le[7-e]:Le[e],o=r?Ie[7-t]:Ie[t];return`${n}${o}`}function Ys(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((o,i)=>{let s=0;for(const d of o)if(d>="1"&&d<="8")s+=parseInt(d);else{const c=`${Le[s]}${Ie[i]}`;t.set(c,d),s++}}),t}const Jt=V(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:o,highlightedSquares:i=new Set,lastMove:s,interactive:d=!0,onSizeCalculated:c})=>{zt();const l=Fe(),h=tr(),p=u.useRef(null),[m,g]=u.useState(t||200),[y,b]=u.useState(null),[$,x]=u.useState(new Set),[v,w]=u.useState(null),[P,L]=u.useState([]),R=u.useRef(),[k,H]=u.useState(null),A=u.useMemo(()=>Ys(e),[e]),J=u.useRef(new Map),X=u.useCallback((C,j)=>{const E=Le.indexOf(C[0]),z=Ie.indexOf(C[1]),S=j/8,M=r?(7-E)*S:E*S,_=r?(7-z)*S:z*S;return{x:M,y:_}},[r]),te=u.useCallback((C,j,E)=>{const z=C.toLowerCase()==="p",S=E[1];return z&&(S==="8"||S==="1")},[]);u.useEffect(()=>{if(t){g(t);return}const C=()=>{if(!p.current){console.log("calculateBoardSize: No container ref");return}const M=p.current.parentElement;if(!M){console.log("calculateBoardSize: No parent element");return}const{width:_,height:Z}=M.getBoundingClientRect(),Q=p.current.getBoundingClientRect();console.log("calculateBoardSize debug:",{parentSize:{width:_,height:Z},containerSize:{width:Q.width,height:Q.height},currentCalculatedSize:m,parentElement:M.className||M.tagName});const I=16,G=_-I,D=Z-I,U=Math.floor(Math.min(G,D)),ce=Math.max(100,Math.floor(U/8)*8);ce!==m&&(g(ce),c?.(ce))},j=setTimeout(C,50);C();let E;const z=()=>{clearTimeout(E),E=setTimeout(C,100)};window.addEventListener("resize",z);let S=null;return p.current&&p.current.parentElement&&(S=new ResizeObserver(()=>{z()}),S.observe(p.current.parentElement)),()=>{window.removeEventListener("resize",z),clearTimeout(E),clearTimeout(j),S&&S.disconnect()}},[t,m]);const re=m/8,se=u.useMemo(()=>{if(!l.preferences.animateMoves)return!1;if(h.isPlaying&&l.preferences.disableAnimationLowTime){const C=h.currentGame,j=h.playingColor;if(C&&j&&(j==="white"?C.white.time:C.black.time)<10)return!1}return!0},[l.preferences.animateMoves,l.preferences.disableAnimationLowTime,h.isPlaying,h.currentGame,h.playingColor]);u.useEffect(()=>{if(!se){J.current=new Map(A);return}const C=J.current,j=[];C.forEach((E,z)=>{A.has(z)||A.forEach((S,M)=>{S===E&&!C.has(M)&&s&&s.from===z&&s.to===M&&j.push({piece:E,from:z,to:M,startTime:Date.now()})})}),j.length>0&&L(E=>[...E,...j]),J.current=new Map(A)},[A,s,se]),u.useEffect(()=>{if(P.length===0)return;const C=()=>{const j=Date.now(),E=l.preferences.animationDuration;L(z=>{const S=z.filter(M=>j-M.startTime<E);return S.length>0&&(R.current=requestAnimationFrame(C)),S})};return R.current=requestAnimationFrame(C),()=>{R.current&&cancelAnimationFrame(R.current)}},[P.length,l.preferences.animationDuration]);const ne=u.useCallback((C,j)=>{if(!d)return;const E=A.get(C);if(y)if($.has(C)||C!==y){const z=A.get(y);if(z&&te(z,y,C)){const S=z===z.toUpperCase()?"white":"black";if(h.isPlaying){const M=l.preferences.autoPromotionPiece;o?.(y,C,M)}else{const M=j?.currentTarget.getBoundingClientRect();H({from:y,to:C,color:S,position:M?{x:M.left+M.width/2,y:M.top+M.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else o?.(y,C);b(null),x(new Set)}else b(null),x(new Set);else E&&(b(C),x(new Set))},[y,$,A,o,d,te,h.isPlaying,l.preferences.autoPromotionPiece]),ke=u.useCallback((C,j,E)=>{if(!d)return;C.preventDefault(),b(j);const z=C.currentTarget.getBoundingClientRect(),S=z.width,M=z.left+z.width/2,_=z.top+z.height/2,Z=C.clientX-M,Q=C.clientY-_;w({piece:E,from:j,x:M,y:_,size:S});const I=D=>{w(U=>U?{...U,x:D.clientX-Z,y:D.clientY-Q}:null)},G=D=>{const B=document.elementsFromPoint(D.clientX,D.clientY).find(Tt=>Tt.getAttribute("data-square"))?.getAttribute("data-square");if(B&&B!==j)if(te(E,j,B)){const Tt=E===E.toUpperCase()?"white":"black";if(h.isPlaying){const Po=l.preferences.autoPromotionPiece;o?.(j,B,Po)}else H({from:j,to:B,color:Tt,position:{x:D.clientX,y:D.clientY}})}else o?.(j,B);w(null),b(null),x(new Set),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",G)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",G)},[o,d,te,h.isPlaying,l.preferences.autoPromotionPiece]),de=u.useMemo(()=>{const C=[];for(let j=0;j<8;j++)for(let E=0;E<8;E++){const z=Us(E,j),S=qs(E,j,r),M=A.get(S),_=i.has(S),Z=s&&(s.from===S||s.to===S),Q=y===S,I=$.has(S),G=v?.from===S,D=P.some(B=>B.to===S),U=n&&j===7,ce=n&&E===0;C.push(a.jsxs(Hs,{"data-square":S,$isLight:z,$isHighlighted:_,$isLastMoveSquare:!!Z,$isSelected:Q,$isPossibleMove:I,onClick:B=>ne(S,B),onMouseDown:B=>M&&ke(B,S,M),children:[M&&!G&&!D&&a.jsx(we,{piece:M,size:re}),U&&a.jsx(Hr,{$type:"file",$isLight:z,children:r?Le[7-E]:Le[E]}),ce&&a.jsx(Hr,{$type:"rank",$isLight:z,children:r?Ie[7-j]:Ie[j]})]},S))}return C},[r,n,A,i,s,y,$,v,re,ne,ke]);return a.jsxs(a.Fragment,{children:[a.jsxs(Bs,{ref:p,$size:m,children:[a.jsx(Ws,{children:de}),P.map((C,j)=>{const E=X(C.from,m),z=X(C.to,m),S=Date.now()-C.startTime,M=l.preferences.animationDuration,_=Math.min(S/M,1),Q=(I=>I<.5?4*I*I*I:1-Math.pow(-2*I+2,3)/2)(_);return a.jsx(Gs,{$fromX:E.x,$fromY:E.y,$toX:z.x,$toY:z.y,$progress:Q,$size:re,children:a.jsx(we,{piece:C.piece,size:re})},`${C.from}-${C.to}-${C.startTime}`)})]}),v&&a.jsx(a.Fragment,{children:a.jsx(_s,{$x:v.x,$y:v.y,$size:v.size,children:a.jsx(we,{piece:v.piece,size:v.size,isDragging:!0})})}),k&&a.jsx(uo,{isOpen:!0,color:k.color,position:k.position,onSelect:C=>{o?.(k.from,k.to,C),H(null)},onCancel:()=>H(null)})]})});Jt.displayName="ChessBoardWithPieces";const Vs=f.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,ho=f.span`
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
`,pr=({time:e,size:t="medium",isActive:r=!1,lowTimeThreshold:n=30,showTenths:o=!1,className:i,compact:s=!1})=>{const d=l=>{const h=Math.floor(l/3600),p=Math.floor(l%3600/60),m=Math.floor(l%60),g=Math.floor(l%1*10),y=r&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${y}${p.toString().padStart(2,"0")}${y}${m.toString().padStart(2,"0")}`:l<n&&o?`${p}${y}${m.toString().padStart(2,"0")}.${g}`:`${p}${y}${m.toString().padStart(2,"0")}`},c=e<=n&&e>0;return a.jsx(Vs,{size:t,className:i,children:a.jsx(ho,{$isLowTime:c,$isActive:r,$compact:s,children:d(e)})})},rt=f(pr).attrs({size:"large"})`
    ${ho} {
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
        background: ${({theme:e})=>e.colors.surface};
        font-size: 20px;
        
        &:hover {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.15);
        }
    }
`;f(pr).attrs({size:"small"})`
    font-size: 12px;
`;f(pr).attrs({size:"medium"})`
    font-size: 16px;
`;const Ks=f.div`
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
`,Xs=f.button`
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
`,Qs=f.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,po=V(({playerName:e,position:t,onClose:r})=>{const n=pn(),o=Fe(),i=u.useRef(null),s=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];u.useEffect(()=>{const c=h=>{i.current&&!i.current.contains(h.target)&&r()},l=h=>{h.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[r]),u.useEffect(()=>{if(i.current){const c=i.current.getBoundingClientRect(),l=window.innerWidth,h=window.innerHeight;let p=t.x,m=t.y;c.right>l&&(p=l-c.width-10),c.bottom>h&&(m=h-c.height-10),(p!==t.x||m!==t.y)&&(i.current.style.left=`${p}px`,i.current.style.top=`${m}px`)}},[t]);const d=c=>{const l=c.replace("{player}",e);n.sendCommand(l),r()};return a.jsx(Ks,{ref:i,$x:t.x,$y:t.y,children:s.map((c,l)=>"divider"in c&&c.divider?a.jsx(Qs,{},l):"command"in c?a.jsx(Xs,{onClick:()=>d(c.command),children:c.label},l):null)})});po.displayName="PlayerContextMenu";const Js=f.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,fr=({name:e,className:t,style:r})=>{const[n,o]=u.useState(null),i=s=>{s.preventDefault(),s.stopPropagation(),o({x:s.clientX,y:s.clientY})};return a.jsxs(a.Fragment,{children:[a.jsx(Js,{className:t,style:r,onClick:i,children:e}),n&&a.jsx(po,{playerName:e,position:n,onClose:()=>o(null)})]})};fr.displayName="PlayerName";const Zs=f.div`
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
`,ec=f.div`
  display: flex;
  align-items: center;
  width: 100%;
`,tc=f.div`
  display: flex;
  align-items: center;
  flex: 1;
`,rc=f.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,nc=f.div`
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
`;const Ue=V(({name:e,rating:t,time:r,isActive:n,isWhite:o,orientation:i="horizontal",hideClockInCard:s=!1,onlyInfo:d=!1,compact:c=!1})=>{const l=a.jsxs(a.Fragment,{children:[a.jsx(ec,{children:a.jsxs(tc,{children:[a.jsx(rc,{children:a.jsx(fr,{name:e})}),a.jsx(nc,{children:t})]})}),!s&&!d&&a.jsx(rt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:i==="horizontal"?"medium":"small"})]});return d?l:a.jsx(Zs,{$isActive:n,$orientation:i,$compact:c,children:l})});Ue.displayName="PlayerCard";const oc=f.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
  overflow: hidden;
`,Ot=f.div`
  padding: ${e=>e.theme.spacing[2]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[3]};
`,Bt=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,ie=f.button`
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
`,ic=f.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,_r=f.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,ac=f.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,Gr=f.span`
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
`,mr=V(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:o=!0,extraControls:i,className:s,disableAutoScroll:d=!1})=>{const c=u.useRef(null);u.useEffect(()=>{if(!d&&c.current&&t!==void 0){const h=c.current.querySelector(`[data-move-index="${t}"]`);h&&h.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const l=()=>{const h=[];for(let p=0;p<e.length;p+=2){const m=Math.floor(p/2)+1,g=e[p],y=e[p+1];h.push(a.jsxs(_r,{children:[a.jsxs(ac,{children:[m,"."]}),a.jsx(Gr,{$isCurrentMove:t===p,onClick:()=>r?.(p),"data-move-index":p,children:g.san}),y&&a.jsx(Gr,{$isCurrentMove:t===p+1,onClick:()=>r?.(p+1),"data-move-index":p+1,children:y.san})]},p))}return h};return a.jsxs(oc,{className:s,children:[o?a.jsx(Ot,{children:a.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("span",{children:"Moves"}),a.jsxs(Bt,{children:[a.jsx(ie,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),a.jsx(ie,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),a.jsx(ie,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),a.jsx(ie,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):i?a.jsxs(Ot,{children:[i,a.jsxs(Bt,{children:[a.jsx(ie,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),a.jsx(ie,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),a.jsx(ie,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),a.jsx(ie,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):a.jsx(Ot,{children:a.jsxs(Bt,{children:[a.jsx(ie,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),a.jsx(ie,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),a.jsx(ie,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),a.jsx(ie,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),a.jsx(ic,{ref:c,children:e.length===0?a.jsx(_r,{children:a.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});mr.displayName="MoveList";const sc=f(rt)`
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
`,cc=f(rt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`,qe=V(({player:e,isActive:t,size:r="small",compact:n=!0,variant:o="portrait"})=>{const i=o==="landscape"?cc:sc;return a.jsx(i,{time:e.time,isActive:t,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n})});qe.displayName="ObservableClock";const lc=f.div`
  position: relative;
  display: inline-block;
`,dc=f.button`
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
`,uc=f.div`
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
`,hc=f.button`
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
`,gr=V(({color:e,size:t="small"})=>{const r=Fe(),[n,o]=u.useState(!1),i=u.useRef(null),s=["Q","R","B","N"],d=r.preferences.autoPromotionPiece,c=p=>e==="white"?p:p.toLowerCase();u.useEffect(()=>{const p=m=>{i.current&&!i.current.contains(m.target)&&o(!1)};if(n)return document.addEventListener("mousedown",p),()=>document.removeEventListener("mousedown",p)},[n]);const l=p=>{r.updatePreference("autoPromotionPiece",p),o(!1)},h=t==="small"?28:36;return a.jsxs(lc,{ref:i,children:[a.jsx(dc,{$size:t,onClick:()=>o(!n),title:"Select promotion piece",children:a.jsx(we,{piece:c(d),size:h})}),a.jsx(uc,{$isOpen:n,children:s.map(p=>a.jsx(hc,{$size:t,onClick:()=>l(p),title:`Promote to ${p==="Q"?"Queen":p==="R"?"Rook":p==="B"?"Bishop":"Knight"}`,children:a.jsx(we,{piece:c(p),size:h})},p))})]})});gr.displayName="PromotionPieceSelector";const pc=f.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[3]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,ee=f.button`
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
`,fo=V(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:o,onUnobserve:i,onUnexamine:s,onSetupFEN:d,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:h,canAbort:p,className:m})=>{const g=tr(),y=()=>a.jsxs(a.Fragment,{children:[p&&a.jsx(ee,{onClick:n,$variant:"secondary",children:"Abort"}),a.jsx(ee,{onClick:t,$variant:"secondary",children:"Draw"}),a.jsx(ee,{onClick:r,$variant:"secondary",children:"Resign"}),a.jsx(ee,{onClick:c,$variant:"secondary",children:"Flip"}),a.jsx(gr,{color:g.playingColor||"white",size:"medium"})]}),b=()=>a.jsxs(a.Fragment,{children:[a.jsx(ee,{onClick:i,$variant:"secondary",children:"Unobserve"}),a.jsx(ee,{onClick:o,$variant:"secondary",children:"Analysis"}),a.jsx(ee,{onClick:c,$variant:"secondary",children:"Flip"})]}),$=()=>a.jsxs(a.Fragment,{children:[a.jsx(ee,{onClick:s,$variant:"secondary",children:"Unexamine"}),a.jsx(ee,{onClick:o,$variant:"secondary",children:"Analysis"}),a.jsx(ee,{onClick:c,$variant:"secondary",children:"Flip"})]}),x=()=>a.jsxs(a.Fragment,{children:[a.jsx(ee,{onClick:o,$variant:"secondary",children:"Analysis"}),a.jsx(ee,{onClick:c,$variant:"secondary",children:"Flip"}),a.jsx(ee,{onClick:d,$variant:"secondary",children:"FEN"})]});return a.jsxs(pc,{className:m,children:[e==="playing"&&y(),e==="observing"&&b(),e==="examining"&&$(),e==="freestyle"&&x()]})}),ue=f(ee)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;fo.displayName="GameControls";const Ur=f.div`
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
`,qr=f.div`
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
`,fc=f.div`
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
`,Yr=f.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,at=f.div`
  background: transparent;
  transition: all 0.3s ease;
`,Vr=f.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,mo=V(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const i=vt().isBottomPlayerWinning;let s,d,c;if(t===50)s=47,d=6,c=47;else if(t>50){const h=t-50;s=50-h,d=h,c=50}else{const h=50-t;s=50,d=h,c=50-h}const l=t===50?"#FFC107":i?"#2E7D32":"#C62828";if(r==="vertical"){const h=t<80;return a.jsxs(Ur,{$orientation:r,className:n,children:[a.jsx(qr,{$orientation:r,children:e}),a.jsx(fc,{$isLight:h,children:e}),a.jsxs(Yr,{$orientation:r,children:[a.jsx(at,{style:{height:`${s}%`}}),a.jsx(Vr,{$color:l,style:{height:`${d}%`}}),a.jsx(at,{style:{height:`${c}%`}})]})]})}else return a.jsxs(Ur,{$orientation:r,className:n,children:[a.jsx(qr,{$orientation:r,children:e}),a.jsxs(Yr,{$orientation:r,children:[a.jsx(at,{style:{width:`${c}%`}}),a.jsx(Vr,{$color:l,style:{width:`${d}%`}}),a.jsx(at,{style:{width:`${s}%`}})]})]})});mo.displayName="EvaluationBar";const mc=f.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,gc=f.div`
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
`,Zt=V(({orientation:e="vertical",boardSize:t})=>{const r=vt();return a.jsx(mc,{$orientation:e,$boardSize:t,children:a.jsx(mo,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),er=V(({className:e})=>{const t=vt();return a.jsxs(gc,{className:e,children:[a.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),a.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});Zt.displayName="AnalysisDisplay";er.displayName="AnalysisInfoDisplay";const xc=f.div`
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
`,yc=f.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,bc=f.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,go=f.input`
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
`,$c=f.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,vc=f.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,wc=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Kr=f.button`
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
`,kc=f.button`
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
`,Xr=f.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Qr=f.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Cc=f(go)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,xo=V(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,o]=u.useState(""),[i,s]=u.useState(""),d=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=u.useCallback(g=>{o(g.target.value),s("")},[]),l=u.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),o(""),s("")):s("Invalid FEN string. Please check the format.")}catch{s("Invalid FEN string. Please check the format.")}},[n,r,t]),h=u.useCallback(g=>{o(g),s("");try{r.loadPosition(g)?(t(),o("")):s("Failed to load preset position.")}catch{s("Failed to load preset position.")}},[r,t]),p=u.useCallback(g=>{g.key==="Enter"&&n.trim()?l():g.key==="Escape"&&t()},[n,l,t]),m=[{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?a.jsx(xc,{$isOpen:e,onClick:t,children:a.jsxs(yc,{onClick:g=>g.stopPropagation(),children:[a.jsx(bc,{children:"Set Position from FEN"}),a.jsx(vc,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),a.jsxs(Xr,{children:[a.jsx(Qr,{children:"Current position:"}),a.jsx(Cc,{type:"text",value:d,readOnly:!0,onClick:g=>g.currentTarget.select()})]}),a.jsxs(Xr,{children:[a.jsx(Qr,{children:"Preset position:"}),m.map(g=>a.jsx(kc,{onClick:()=>h(g.fen),children:g.name},g.name))]}),a.jsx(go,{type:"text",value:n,onChange:c,onKeyDown:p,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),i&&a.jsx($c,{children:i}),a.jsxs(wc,{children:[a.jsx(Kr,{onClick:t,children:"Cancel"}),a.jsx(Kr,{$variant:"primary",onClick:l,disabled:!n.trim(),children:"Set Position"})]})]})}):null});xo.displayName="FENDialog";const Sc=f.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,jc=f.div`
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
`,Pc=f.div`
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
`,Ec=f.div`
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
`,Rc=f(we)`
  width: 100%;
  height: 100%;
`,Ye=V(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n})=>{const{gameStore:o}=Ee(),i=o.capturedPieces,s=t?i.white:i.black;console.log(`CapturedPieces component - isWhitePieces: ${t}, pieces:`,s);const d=u.useMemo(()=>{const h={};return s.forEach(p=>{h[p]=(h[p]||0)+1}),h},[s]),c=["p","n","b","r","q"],l=n?n/8:32;return a.jsx(Sc,{$orientation:e,$size:l,className:r,children:a.jsx(jc,{$orientation:e,children:c.map(h=>{const p=d[h]||0,m=t?h.toUpperCase():h;return a.jsx(Pc,{$size:l,children:p>0&&a.jsxs(a.Fragment,{children:[a.jsx(Rc,{piece:m,size:l}),p>1&&a.jsx(Ec,{children:p})]})},h)})})})});Ye.displayName="CapturedPieces";const zc=f.div`
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
`,Tc=f.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Lc=f.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Ic=f.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Mc=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Jr=f.button`
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
`,Ac=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:o="Cancel",onConfirm:i,onCancel:s})=>a.jsx(zc,{$isOpen:e,onClick:s,children:a.jsxs(Tc,{onClick:d=>d.stopPropagation(),children:[a.jsx(Lc,{children:t}),a.jsx(Ic,{children:r}),a.jsxs(Mc,{children:[a.jsx(Jr,{$variant:"secondary",onClick:s,children:o}),a.jsx(Jr,{$variant:"primary",onClick:i,children:n})]})]})}),Nc=f.div`
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
`,Zr=f.div`
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
`;const Dc=f.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: center;
`,en=f.div`
    width: ${e=>e.$size}px;
    height: ${e=>e.$size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`,Fc=f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,Oc=f.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Bc=f.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,yo=f.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,bo=f.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Wc=f(yo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,Hc=f(bo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,_c=f(yo)`
    margin-bottom: ${e=>e.theme.spacing[2]};
    padding: 0 30px;
    position: relative;
`,Gc=f.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 10;
`,Uc=f(bo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,tn=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,rn=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,nn=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,on=f.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,an=f.div`
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
`,qc=f.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,Yc=f.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,Vc=f.div`
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
`;const Kc=f.div`
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
`;const Xc=f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[3]};
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: ${e=>e.theme.spacing[2]};
    width: 100%;
    position: relative;
`,Qc=f.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`,sn=f.div`
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
`;const cn=f.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`,Jc=f(mr)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;f(rt)`
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
`;const ln=f.div`
    flex: 1;
    display: flex;
`;f(rt)`
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
`;const Zc=f.div`
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
`;const el=f.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,tl=f.div`
    display: flex;
    align-items: flex-start;
    padding-top: ${e=>{const t=e.$squareSize||0,r=24,n=40,o=(e.$squareSize||0)*.25;return t+r+n+8-o}}px;
`,$o=V(({className:e,hasChat:t=!1})=>{const r=tr(),n=Fe(),o=vt(),i=pn();zt();const[s,d]=u.useState(!1),[c,l]=u.useState(!1),[h,p]=u.useState(0),[m,g]=u.useState(!1),[y,b]=u.useState(!1),$=n.preferences.chessOrientation==="landscape",x=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",v=u.useMemo(()=>!r.currentGame||r.currentGame.gameId<0?"freestyle":r.isPlaying?"playing":r.isObserving?"observing":r.isExamining?"examining":"observing",[r.currentGame,r.gameRelation]),w=u.useCallback((I,G,D)=>{try{r.makeMove(I,G,D)||console.error("Invalid move:",I,G)}catch(U){console.error("Error making move:",U)}},[r]);u.useMemo(()=>{if(r.currentGameInfo){const{white:I,black:G,timeControl:D,variant:U}=r.currentGameInfo;return`Game ${r.currentGame?.gameId||"?"} • ${U} ${D}`}return"No active game"},[r.currentGameInfo,r.currentGame]);const P=(()=>{const I=r.moveHistory.length;if(I>0){const G=r.moveHistory[I-1],D=Math.ceil(I/2),U=I%2===1;return`${D}.${U?"":".."} ${G.san}`}return"Starting position"})(),L=r.currentOpening,R=r.currentGame,k=R||r.lastGameState,H=k?.white||{name:"White",rating:1500,time:900},A=k?.black||{name:"Black",rating:1500,time:900},J=!R||R.turn==="w",X=r.shouldShowFlippedBoard,te=X?H:A,re=X?A:H,se=X,ne=X?J:!J,ke=u.useCallback(I=>{r.goToMove(I)},[r]);u.useEffect(()=>{o.initialize()},[o]),u.useEffect(()=>{y&&r.isPlaying&&r.currentGame&&i.sendCommand("draw")},[r.moveHistory.length,y,r.isPlaying,i]),u.useEffect(()=>{(!r.currentGame||!r.isPlaying)&&b(!1)},[r.currentGame,r.isPlaying]),u.useEffect(()=>{s&&o.isEngineReady?o.startAnalysis(x):o.stopAnalysis()},[s,x,o]);const de=u.useCallback(()=>{d(I=>!I)},[]),C=u.useCallback(()=>{l(!0)},[]),j=u.useCallback(()=>{n.updatePreference("boardFlipped",!n.preferences.boardFlipped)},[n]),E=u.useCallback(()=>{r.currentGame&&i.sendCommand(`unobs ${r.currentGame.gameId}`)},[i,r.currentGame]),z=u.useCallback(()=>{i.sendCommand("unexamine")},[i]),S=u.useCallback(()=>{g(!0)},[]),M=u.useCallback(()=>{i.sendCommand("resign"),g(!1)},[i]),_=u.useCallback(()=>{i.sendCommand("draw"),b(!y)},[i,y]),Z=u.useCallback(()=>{i.sendCommand("abort")},[i]),Q=()=>a.jsxs(a.Fragment,{children:[a.jsx(Zr,{$orientation:"portrait",children:a.jsx(qc,{children:a.jsxs(Yc,{children:[s&&a.jsx(tl,{$squareSize:h?h/8:0,children:a.jsx(Zt,{orientation:"vertical",boardSize:h})}),a.jsxs(Vc,{children:[a.jsx(en,{$size:h?h/8:0}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[a.jsxs(_c,{children:[a.jsxs(tn,{children:["Game #",k?.gameId||"?"]}),a.jsx(rn,{children:k?.timeControl||"?"}),a.jsxs(Gc,{children:[v==="playing"&&a.jsxs(a.Fragment,{children:[r.moveHistory.length<=1&&a.jsx(ue,{onClick:Z,$variant:"secondary",children:"Abort"}),a.jsx(ue,{onClick:_,$variant:"secondary",children:"Draw"}),a.jsx(ue,{onClick:S,$variant:"secondary",children:"Resign"}),a.jsx(gr,{color:r.playingColor||"white",size:"small"})]}),v==="observing"&&a.jsxs(a.Fragment,{children:[a.jsx(ue,{onClick:E,$variant:"secondary",children:"Unobserve"}),a.jsx(ue,{onClick:de,$variant:"secondary",children:"Analysis"})]}),v==="examining"&&a.jsxs(a.Fragment,{children:[a.jsx(ue,{onClick:z,$variant:"secondary",children:"Unexamine"}),a.jsx(ue,{onClick:de,$variant:"secondary",children:"Analysis"})]}),v==="freestyle"&&a.jsxs(a.Fragment,{children:[a.jsx(ue,{onClick:de,$variant:"secondary",children:"Analysis"}),a.jsx(ue,{onClick:j,$variant:"secondary",children:"Flip"}),a.jsx(ue,{onClick:C,$variant:"secondary",children:"FEN"})]})]})]}),a.jsxs(cn,{children:[a.jsx(qe,{player:te,isActive:ne,size:"small",compact:!0}),a.jsx(ln,{children:a.jsx(Ue,{name:te.name,rating:te.rating,time:0,isActive:ne,isWhite:se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),a.jsx(an,{$orientation:"portrait",children:a.jsx(Jt,{position:x,flipped:X,showCoordinates:!0,onMove:w,interactive:v==="playing"||v==="freestyle",lastMove:r.lastMove||void 0,onSizeCalculated:p})}),a.jsxs(cn,{children:[a.jsx(qe,{player:re,isActive:!ne,size:"small",compact:!0}),a.jsx(ln,{children:a.jsx(Ue,{name:re.name,rating:re.rating,time:0,isActive:!ne,isWhite:!se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),a.jsxs(Uc,{children:[a.jsx(nn,{children:P!=="Starting position"?`Last move: ${P}`:"Last move: none"}),L&&a.jsx(on,{children:L})]}),s&&a.jsx(el,{children:a.jsx(er,{})})]}),a.jsx(en,{$size:h?h/8:0})]}),a.jsx(Oc,{$squareSize:h?h/8:0,children:a.jsxs(Bc,{$squareSize:h?h/8:0,children:[a.jsx(Ye,{orientation:"vertical",isWhitePieces:X,boardSize:h}),a.jsx(Ye,{orientation:"vertical",isWhitePieces:!X,boardSize:h})]})})]})})}),a.jsx(Kc,{$orientation:"portrait",children:a.jsx(mr,{moves:r.moveHistory,currentMoveIndex:r.currentMoveIndex,onMoveClick:ke,disableAutoScroll:!0,onNavigate:I=>{if(r.isExamining)switch(I){case"first":i.sendCommand("back 500");break;case"prev":i.sendCommand("back");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 500");break}else switch(I){case"first":r.goToStart();break;case"prev":r.goToPreviousMove();break;case"next":r.goToNextMove();break;case"last":r.goToEnd();break}}})})]});return a.jsxs(Nc,{className:e,$orientation:$?"landscape":"portrait",$hasChat:t,children:[$?a.jsx(a.Fragment,{children:a.jsx(Zr,{$orientation:"landscape",children:a.jsxs(Xc,{$hasAnalysis:s,children:[a.jsxs(Dc,{children:[a.jsxs(Wc,{children:[a.jsxs(tn,{children:["Game #",k?.gameId||"?"]}),a.jsx(rn,{children:k?.timeControl||"?"})]}),a.jsxs(Fc,{children:[s&&a.jsx(Zt,{orientation:"vertical"}),a.jsx(an,{$orientation:"landscape",children:a.jsx(Jt,{position:x,flipped:X,showCoordinates:!0,onMove:w,interactive:v==="playing"||v==="freestyle",lastMove:r.lastMove||void 0,onSizeCalculated:p})})]}),a.jsxs(Hc,{children:[a.jsx(nn,{children:P!=="Starting position"?`Last move: ${P}`:"Last move: none"}),L&&a.jsx(on,{children:L})]}),s&&a.jsx(Zc,{children:a.jsx(er,{})})]}),a.jsxs(Qc,{children:[a.jsx(Ye,{orientation:"horizontal",isWhitePieces:se,boardSize:h}),a.jsxs(sn,{children:[a.jsx(qe,{player:te,isActive:ne,size:"small",compact:!0,variant:"landscape"}),a.jsx(Ue,{name:te.name,rating:te.rating,time:0,isActive:ne,isWhite:se,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),a.jsx(fo,{perspective:v,canAbort:r.moveHistory.length<=1,onAnalysis:de,onFlipBoard:j,onSetupFEN:C,onUnobserve:E,onUnexamine:z,onResign:S,onDraw:_,onAbort:Z,isAnalysisActive:s,isDrawOffered:y}),a.jsx(Jc,{moves:r.moveHistory,currentMoveIndex:r.currentMoveIndex,onMoveClick:ke,showHeader:!1,onNavigate:I=>{if(r.isExamining)switch(I){case"first":i.sendCommand("backward 999");break;case"prev":i.sendCommand("backward");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 999");break}else switch(I){case"first":r.goToStart();break;case"prev":r.goToPreviousMove();break;case"next":r.goToNextMove();break;case"last":r.goToEnd();break}}}),a.jsxs(sn,{children:[a.jsx(Ue,{name:re.name,rating:re.rating,time:0,isActive:!ne,isWhite:!se,orientation:"vertical",hideClockInCard:!0,compact:!0}),a.jsx(qe,{player:re,isActive:!ne,size:"small",compact:!0,variant:"landscape"})]}),a.jsx(Ye,{orientation:"horizontal",isWhitePieces:!se,boardSize:h})]})]})})}):Q(),a.jsx(xo,{isOpen:c,onClose:()=>l(!1)}),a.jsx(Ac,{isOpen:m,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:M,onCancel:()=>g(!1)})]})});$o.displayName="ChessGameLayout";const rl=f.div`
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
`,nl=f.div`
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
`,ol=f.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,il=f.span`
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
`,al=f.button`
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
`,sl=f.span`
  font-size: 12px;
  opacity: 0.7;
`,vo=V(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=K.useState(null),[o,i]=K.useState(null),s=(p,m)=>{n(m),p.dataTransfer.effectAllowed="move"},d=(p,m)=>{p.preventDefault(),p.dataTransfer.dropEffect="move",i(m)},c=()=>{i(null)},l=(p,m)=>{p.preventDefault(),r&&r!==m&&e.reorderTabs(r,m),n(null),i(null)},h=()=>{n(null),i(null)};return a.jsx(rl,{children:t.map(p=>a.jsxs(nl,{$active:p.id===e.activeTabId,$hasUnread:p.unreadCount>0,$dragging:p.id===r,$dragOver:p.id===o,draggable:!0,onDragStart:m=>s(m,p.id),onDragOver:m=>d(m,p.id),onDragLeave:c,onDrop:m=>l(m,p.id),onDragEnd:h,onClick:()=>e.setActiveTab(p.id),children:[p.type!=="console"&&a.jsx(sl,{$type:p.type}),a.jsx(ol,{children:p.type==="channel"?`(${p.name})`:p.name}),p.unreadCount>0&&a.jsx(il,{children:p.unreadCount>99?"99+":p.unreadCount}),p.id!=="console"&&a.jsx(al,{onClick:m=>{m.stopPropagation(),e.closeTab(p.id)},title:"Close tab",children:"×"})]},p.id))})});vo.displayName="ChatTabs";function cl(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function ll(e){e.scrollTop=e.scrollHeight}function dl(e,t=10){cl(e,t)&&ll(e)}const ul=f.a`
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
`,dn=/(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,mt=({text:e,className:t})=>{const r=[];let n=0,o;for(dn.lastIndex=0;(o=dn.exec(e))!==null;){const i=o[0],s=o.index;s>n&&r.push(e.substring(n,s));let d=i;i.match(/^(?:https?|ftp):\/\//)||i.includes(".")&&(d="https://"+i),r.push(a.jsx(ul,{href:d,target:"_blank",rel:"noopener noreferrer",onClick:c=>c.stopPropagation(),children:i},s)),n=s+i.length}return n<e.length&&r.push(e.substring(n)),r.length===0?a.jsx("span",{className:t,children:e}):a.jsx("span",{className:t,children:r})};mt.displayName="LinkifiedText";const st=f.div`
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
`,xr=f.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: 10px;
  flex-shrink: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 50px;
`,hl=f.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover ${xr} {
    opacity: 1;
  }
`;f.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
`;const un=f.div`
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
  
  &:hover ${xr} {
    opacity: 1;
  }
`;f(xr)`
  position: absolute;
  left: 0;
  top: 0;
  background: ${e=>e.theme.colors.background};
  padding: 0 4px;
  z-index: 1;
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
`;const pl=f.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
`,fl=f.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,hn=f.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,ml=f.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,wo=V(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r}=Ee(),n=u.useRef(null),o=t.activeTab,i=o?.messages||[],s=r.username||"You";if(u.useEffect(()=>{if(n.current&&i.length>0){const c=n.current,l=setTimeout(()=>{o?.type==="console"?c.scrollTop=c.scrollHeight:dl(c,50)},50);return()=>clearTimeout(l)}},[i.length,i[i.length-1]?.id]),u.useEffect(()=>{if(n.current&&i.length>0){const c=n.current;requestAnimationFrame(()=>{c.scrollTop=c.scrollHeight})}},[o?.id]),!o)return a.jsx(st,{className:"chat-messages-container",children:a.jsx(hn,{children:"No active chat"})});if(i.length===0)return a.jsx(st,{className:"chat-messages-container",children:a.jsx(hn,{children:o.type==="channel"?`No messages in (${o.name}) yet`:o.type==="private"?`No messages with ${o.name} yet`:"Connecting to freechess.org..."})});const d=[];return i.forEach((c,l)=>{const h=l>0?i[l-1]:null,p=h?new Date(c.timestamp).getTime()-new Date(h.timestamp).getTime():1/0;h&&h.sender===c.sender&&h.type===c.type&&p<6e4?d[d.length-1].messages.push(c):d.push({sender:c.sender,timestamp:new Date(c.timestamp),messages:[c]})}),o.type==="console"?a.jsx(st,{ref:n,className:"chat-messages-container",children:i.map(c=>a.jsx(un,{$type:c.type,onMouseEnter:()=>e?.(c.timestamp),onMouseLeave:()=>e?.(null),children:a.jsx(mt,{text:c.content})},c.id))}):a.jsx(st,{ref:n,className:"chat-messages-container",children:d.map((c,l)=>{const h=c.messages[0],p=c.sender.toLowerCase()===s.toLowerCase();return h.type==="system"?a.jsx(ml,{children:c.messages.map((m,g)=>a.jsxs(K.Fragment,{children:[g>0&&`
`,a.jsx(mt,{text:m.content})]},m.id))},l):a.jsx(hl,{onMouseEnter:()=>e?.(c.timestamp),onMouseLeave:()=>e?.(null),children:a.jsxs(un,{$type:h.type,children:[a.jsx(pl,{$isYou:p,children:p?c.sender:a.jsx(fr,{name:c.sender})}),a.jsx(fl,{children:c.messages.map((m,g)=>a.jsxs(K.Fragment,{children:[g>0&&`
`,a.jsx(mt,{text:m.content})]},m.id))})]})},l)})})});wo.displayName="ChatMessages";const gl=f.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,xl=f.input`
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
`,yl=f.button`
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
`,ko=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:o="Type a message...",disabled:i=!1})=>{const s=u.useRef(null),d=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e.trim()&&r(e.trim())):l.key==="ArrowUp"&&!e?(l.preventDefault(),n?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),n?.("down"))},c=()=>{e.trim()&&r(e.trim())};return a.jsxs(gl,{children:[a.jsx(xl,{ref:s,type:"text",value:e,onChange:l=>t(l.target.value),onKeyDown:d,placeholder:o,disabled:i,autoComplete:"off",spellCheck:"true"}),a.jsx(yl,{onClick:c,disabled:i||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};ko.displayName="ChatInput";const bl=f.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,$l=f.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,vl=f.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,wl=f.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,kl=f.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`,Co=V(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n}=Ee(),[o,i]=u.useState(""),[s,d]=u.useState(!1),[c,l]=u.useState(null);K.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),K.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const h=m=>{if(console.log("handleSendMessage called with:",m,"Length:",m.length),!!m.trim()){if(r.addToHistory(m),m==="/help"||m==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),i("");return}if(r.addMessage("console",{channel:"console",sender:"You",content:m,timestamp:new Date,type:"message"}),m.startsWith("/")||m.startsWith("\\"))n.sendCommand(m.substring(1));else{const g=r.activeTab;if(!g)return;if(g.type==="channel"){const y=g.id.replace("channel-","");n.sendCommand(`tell ${y} ${m}`)}else g.type==="private"?n.sendCommand(`tell ${g.id} ${m}`):n.sendCommand(m)}i("")}},p=m=>{const g=r.navigateHistory(m);g!==null&&i(g)};return a.jsxs(bl,{className:e,$compact:t,children:[!t&&a.jsxs($l,{children:[a.jsx(vl,{children:"Chat"}),c&&a.jsx(wl,{children:new Date(c).toLocaleTimeString()})]}),a.jsxs(kl,{children:[a.jsx(vo,{}),a.jsx(wo,{onMessageHover:l}),a.jsx(ko,{value:o,onChange:i,onSend:h,onHistoryNavigate:p,placeholder:r.activeTab?.type==="channel"?`Message (${r.activeTab.name})...`:r.activeTab?.type==="private"?`Message ${r.activeTab.name}...`:"Enter command..."})]})]})});Co.displayName="ChatPanel";const Cl=f.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.background};
`,Sl=f.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,jl=f.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,Pl=f.div`
  width: ${e=>e.$isVisible?"600px":"0"};
  display: ${e=>e.$isVisible?"flex":"none"};
  flex-direction: column;
  background-color: ${e=>e.theme.colors.surface};
  border-left: 1px solid ${e=>e.theme.colors.border};
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${e=>e.$isVisible?"100%":"0"};
  }
`,El=f.div`
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
`,So=V(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=zt(),[o,i]=u.useState(600),[s,d]=u.useState(!1);u.useEffect(()=>{r&&(n.isMobile||n.isTablet?e.updatePreference("viewMode","chess-only"):e.updatePreference("viewMode","chess-and-chat"))},[n.isMobile,n.isTablet,r,e]);const c=m=>{m.preventDefault(),d(!0)};u.useEffect(()=>{if(!s)return;const m=y=>{const b=window.innerWidth-y.clientX;i(Math.max(300,Math.min(600,b))),window.dispatchEvent(new Event("resize"))},g=()=>{d(!1)};return document.addEventListener("mousemove",m),document.addEventListener("mouseup",g),()=>{document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",g)}},[s]);const l=t==="chess-only"||t==="chess-and-chat",h=t==="chat-only"||t==="chess-and-chat",p=t==="chess-and-chat"&&!n.isMobile;return a.jsxs(Cl,{children:[a.jsx(lo,{}),a.jsxs(Sl,{children:[a.jsx(jl,{$isVisible:l,children:a.jsx($o,{hasChat:h})}),p&&a.jsx(El,{$isVisible:!0,onMouseDown:c,style:{cursor:s?"col-resize":"ew-resize"}}),a.jsx(Pl,{$isVisible:h,style:{width:h&&!n.isMobile?`${o}px`:void 0},children:a.jsx(Co,{})})]})]})});So.displayName="AppLayout";const Rl=gs`
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
`,zl=()=>a.jsx(Eo,{children:a.jsxs(bs,{children:[a.jsx(Rl,{}),a.jsx(ea,{children:a.jsx(zi,{children:a.jsx(jn,{path:"/",element:a.jsx(Rs,{children:a.jsx(So,{})})})})})]})}),jo=document.getElementById("root");if(!jo)throw new Error("Root element not found");const Tl=fn(jo);Tl.render(a.jsx(zl,{}));
