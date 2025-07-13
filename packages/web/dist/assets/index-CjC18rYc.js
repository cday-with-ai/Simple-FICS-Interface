import{u as Ye,j as s,a as Le,b as $n,c as Lr,d as rn,e as Lt,V as qo,f as Yo,l as Nn,R as Vo}from"./shared-C6l7z4IX.js";import{a as Ko,r as p,R as re}from"./vendor-cxkclgJA.js";import{o as Z}from"./mobx-DOEGM6V5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var zr,An=Ko;zr=An.createRoot,An.hydrateRoot;var vn={};Object.defineProperty(vn,"__esModule",{value:!0});vn.parse=ni;vn.serialize=ri;const Xo=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,Jo=/^[\u0021-\u003A\u003C-\u007E]*$/,Qo=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,Zo=/^[\u0020-\u003A\u003D-\u007E]*$/,ei=Object.prototype.toString,ti=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function ni(e,t){const n=new ti,r=e.length;if(r<2)return n;const o=t?.decode||oi;let i=0;do{const a=e.indexOf("=",i);if(a===-1)break;const d=e.indexOf(";",i),c=d===-1?r:d;if(a>c){i=e.lastIndexOf(";",a-1)+1;continue}const l=Dn(e,i,a),h=On(e,a,l),u=e.slice(l,h);if(n[u]===void 0){let f=Dn(e,a+1,c),g=On(e,c,f);const v=o(e.slice(f,g));n[u]=v}i=c+1}while(i<r);return n}function Dn(e,t,n){do{const r=e.charCodeAt(t);if(r!==32&&r!==9)return t}while(++t<n);return n}function On(e,t,n){for(;t>n;){const r=e.charCodeAt(--t);if(r!==32&&r!==9)return t+1}return n}function ri(e,t,n){const r=n?.encode||encodeURIComponent;if(!Xo.test(e))throw new TypeError(`argument name is invalid: ${e}`);const o=r(t);if(!Jo.test(o))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+o;if(!n)return i;if(n.maxAge!==void 0){if(!Number.isInteger(n.maxAge))throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);i+="; Max-Age="+n.maxAge}if(n.domain){if(!Qo.test(n.domain))throw new TypeError(`option domain is invalid: ${n.domain}`);i+="; Domain="+n.domain}if(n.path){if(!Zo.test(n.path))throw new TypeError(`option path is invalid: ${n.path}`);i+="; Path="+n.path}if(n.expires){if(!ii(n.expires)||!Number.isFinite(n.expires.valueOf()))throw new TypeError(`option expires is invalid: ${n.expires}`);i+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(i+="; HttpOnly"),n.secure&&(i+="; Secure"),n.partitioned&&(i+="; Partitioned"),n.priority)switch(typeof n.priority=="string"?n.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${n.priority}`)}if(n.sameSite)switch(typeof n.sameSite=="string"?n.sameSite.toLowerCase():n.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${n.sameSite}`)}return i}function oi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function ii(e){return ei.call(e)==="[object Date]"}var Fn="popstate";function si(e={}){function t(r,o){let{pathname:i,search:a,hash:d}=r.location;return on("",{pathname:i,search:a,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:ot(o)}return ci(t,n,null,e)}function X(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ye(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ai(){return Math.random().toString(36).substring(2,10)}function Bn(e,t){return{usr:e.state,key:e.key,idx:t}}function on(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Ve(t):t,state:n,key:t&&t.key||r||ai()}}function ot({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Ve(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ci(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:i=!1}=r,a=o.history,d="POP",c=null,l=h();l==null&&(l=0,a.replaceState({...a.state,idx:l},""));function h(){return(a.state||{idx:null}).idx}function u(){d="POP";let k=h(),y=k==null?null:k-l;l=k,c&&c({action:d,location:b.location,delta:y})}function f(k,y){d="PUSH";let j=on(b.location,k,y);l=h()+1;let R=Bn(j,l),P=b.createHref(j);try{a.pushState(R,"",P)}catch(M){if(M instanceof DOMException&&M.name==="DataCloneError")throw M;o.location.assign(P)}i&&c&&c({action:d,location:b.location,delta:1})}function g(k,y){d="REPLACE";let j=on(b.location,k,y);l=h();let R=Bn(j,l),P=b.createHref(j);a.replaceState(R,"",P),i&&c&&c({action:d,location:b.location,delta:0})}function v(k){return li(k)}let b={get action(){return d},get location(){return e(o,a)},listen(k){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Fn,u),c=k,()=>{o.removeEventListener(Fn,u),c=null}},createHref(k){return t(o,k)},createURL:v,encodeLocation(k){let y=v(k);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:f,replace:g,go(k){return a.go(k)}};return b}function li(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),X(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:ot(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Tr(e,t,n="/"){return di(e,t,n,!1)}function di(e,t,n,r){let o=typeof t=="string"?Ve(t):t,i=ke(o.pathname||"/",n);if(i==null)return null;let a=Ir(e);ui(a);let d=null;for(let c=0;d==null&&c<a.length;++c){let l=wi(i);d=$i(a[c],l,r)}return d}function Ir(e,t=[],n=[],r=""){let o=(i,a,d)=>{let c={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(X(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length));let l=we([r,c.relativePath]),h=n.concat(c);i.children&&i.children.length>0&&(X(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),Ir(i.children,t,h,l)),!(i.path==null&&!i.index)&&t.push({path:l,score:xi(l,i.index),routesMeta:h})};return e.forEach((i,a)=>{if(i.path===""||!i.path?.includes("?"))o(i,a);else for(let d of Nr(i.path))o(i,a,d)}),t}function Nr(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let a=Nr(r.join("/")),d=[];return d.push(...a.map(c=>c===""?i:[i,c].join("/"))),o&&d.push(...a),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function ui(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:bi(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var hi=/^:[\w-]+$/,pi=3,mi=2,fi=1,gi=10,yi=-2,Wn=e=>e==="*";function xi(e,t){let n=e.split("/"),r=n.length;return n.some(Wn)&&(r+=yi),t&&(r+=mi),n.filter(o=>!Wn(o)).reduce((o,i)=>o+(hi.test(i)?pi:i===""?fi:gi),r)}function bi(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function $i(e,t,n=!1){let{routesMeta:r}=e,o={},i="/",a=[];for(let d=0;d<r.length;++d){let c=r[d],l=d===r.length-1,h=i==="/"?t:t.slice(i.length)||"/",u=Pt({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},h),f=c.route;if(!u&&l&&n&&!r[r.length-1].route.index&&(u=Pt({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},h)),!u)return null;Object.assign(o,u.params),a.push({params:o,pathname:we([i,u.pathname]),pathnameBase:Pi(we([i,u.pathnameBase])),route:f}),u.pathnameBase!=="/"&&(i=we([i,u.pathnameBase]))}return a}function Pt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=vi(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:r.reduce((l,{paramName:h,isOptional:u},f)=>{if(h==="*"){let v=d[f]||"";a=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const g=d[f];return u&&!g?l[h]=void 0:l[h]=(g||"").replace(/%2F/g,"/"),l},{}),pathname:i,pathnameBase:a,pattern:e}}function vi(e,t=!1,n=!0){ye(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,d,c)=>(r.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function wi(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ye(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ke(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function ki(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Ve(e):e;return{pathname:n?n.startsWith("/")?n:Ci(n,t):t,search:ji(r),hash:Ri(o)}}function Ci(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function _t(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Si(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Ar(e){let t=Si(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Dr(e,t,n,r=!1){let o;typeof e=="string"?o=Ve(e):(o={...e},X(!o.pathname||!o.pathname.includes("?"),_t("?","pathname","search",o)),X(!o.pathname||!o.pathname.includes("#"),_t("#","pathname","hash",o)),X(!o.search||!o.search.includes("#"),_t("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,d;if(a==null)d=n;else{let u=t.length-1;if(!r&&a.startsWith("..")){let f=a.split("/");for(;f[0]==="..";)f.shift(),u-=1;o.pathname=f.join("/")}d=u>=0?t[u]:"/"}let c=ki(o,d),l=a&&a!=="/"&&a.endsWith("/"),h=(i||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(l||h)&&(c.pathname+="/"),c}var we=e=>e.join("/").replace(/\/\/+/g,"/"),Pi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ji=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Ri=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ei(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Or=["POST","PUT","PATCH","DELETE"];new Set(Or);var Mi=["GET",...Or];new Set(Mi);var Ke=p.createContext(null);Ke.displayName="DataRouter";var zt=p.createContext(null);zt.displayName="DataRouterState";var Fr=p.createContext({isTransitioning:!1});Fr.displayName="ViewTransition";var Li=p.createContext(new Map);Li.displayName="Fetchers";var zi=p.createContext(null);zi.displayName="Await";var xe=p.createContext(null);xe.displayName="Navigation";var ct=p.createContext(null);ct.displayName="Location";var Ce=p.createContext({outlet:null,matches:[],isDataRoute:!1});Ce.displayName="Route";var wn=p.createContext(null);wn.displayName="RouteError";function Ti(e,{relative:t}={}){X(lt(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=p.useContext(xe),{hash:o,pathname:i,search:a}=dt(e,{relative:t}),d=i;return n!=="/"&&(d=i==="/"?n:we([n,i])),r.createHref({pathname:d,search:a,hash:o})}function lt(){return p.useContext(ct)!=null}function De(){return X(lt(),"useLocation() may be used only in the context of a <Router> component."),p.useContext(ct).location}var Br="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Wr(e){p.useContext(xe).static||p.useLayoutEffect(e)}function Ii(){let{isDataRoute:e}=p.useContext(Ce);return e?Yi():Ni()}function Ni(){X(lt(),"useNavigate() may be used only in the context of a <Router> component.");let e=p.useContext(Ke),{basename:t,navigator:n}=p.useContext(xe),{matches:r}=p.useContext(Ce),{pathname:o}=De(),i=JSON.stringify(Ar(r)),a=p.useRef(!1);return Wr(()=>{a.current=!0}),p.useCallback((c,l={})=>{if(ye(a.current,Br),!a.current)return;if(typeof c=="number"){n.go(c);return}let h=Dr(c,JSON.parse(i),o,l.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:we([t,h.pathname])),(l.replace?n.replace:n.push)(h,l.state,l)},[t,n,i,o,e])}p.createContext(null);function dt(e,{relative:t}={}){let{matches:n}=p.useContext(Ce),{pathname:r}=De(),o=JSON.stringify(Ar(n));return p.useMemo(()=>Dr(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function Ai(e,t){return Hr(e,t)}function Hr(e,t,n,r){X(lt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=p.useContext(xe),{matches:i}=p.useContext(Ce),a=i[i.length-1],d=a?a.params:{},c=a?a.pathname:"/",l=a?a.pathnameBase:"/",h=a&&a.route;{let y=h&&h.path||"";_r(c,!h||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let u=De(),f;if(t){let y=typeof t=="string"?Ve(t):t;X(l==="/"||y.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${y.pathname}" was given in the \`location\` prop.`),f=y}else f=u;let g=f.pathname||"/",v=g;if(l!=="/"){let y=l.replace(/^\//,"").split("/");v="/"+g.replace(/^\//,"").split("/").slice(y.length).join("/")}let b=Tr(e,{pathname:v});ye(h||b!=null,`No routes matched location "${f.pathname}${f.search}${f.hash}" `),ye(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let k=Wi(b&&b.map(y=>Object.assign({},y,{params:Object.assign({},d,y.params),pathname:we([l,o.encodeLocation?o.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?l:we([l,o.encodeLocation?o.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),i,n,r);return t&&k?p.createElement(ct.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...f},navigationType:"POP"}},k):k}function Di(){let e=qi(),t=Ei(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=p.createElement(p.Fragment,null,p.createElement("p",null,"💿 Hey developer 👋"),p.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",p.createElement("code",{style:i},"ErrorBoundary")," or"," ",p.createElement("code",{style:i},"errorElement")," prop on your route.")),p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},t),n?p.createElement("pre",{style:o},n):null,a)}var Oi=p.createElement(Di,null),Fi=class extends p.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?p.createElement(Ce.Provider,{value:this.props.routeContext},p.createElement(wn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Bi({routeContext:e,match:t,children:n}){let r=p.useContext(Ke);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),p.createElement(Ce.Provider,{value:e},n)}function Wi(e,t=[],n=null,r=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=n?.errors;if(i!=null){let c=o.findIndex(l=>l.route.id&&i?.[l.route.id]!==void 0);X(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,c+1))}let a=!1,d=-1;if(n)for(let c=0;c<o.length;c++){let l=o[c];if((l.route.HydrateFallback||l.route.hydrateFallbackElement)&&(d=c),l.route.id){let{loaderData:h,errors:u}=n,f=l.route.loader&&!h.hasOwnProperty(l.route.id)&&(!u||u[l.route.id]===void 0);if(l.route.lazy||f){a=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,l,h)=>{let u,f=!1,g=null,v=null;n&&(u=i&&l.route.id?i[l.route.id]:void 0,g=l.route.errorElement||Oi,a&&(d<0&&h===0?(_r("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,v=null):d===h&&(f=!0,v=l.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,h+1)),k=()=>{let y;return u?y=g:f?y=v:l.route.Component?y=p.createElement(l.route.Component,null):l.route.element?y=l.route.element:y=c,p.createElement(Bi,{match:l,routeContext:{outlet:c,matches:b,isDataRoute:n!=null},children:y})};return n&&(l.route.ErrorBoundary||l.route.errorElement||h===0)?p.createElement(Fi,{location:n.location,revalidation:n.revalidation,component:g,error:u,children:k(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):k()},null)}function kn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Hi(e){let t=p.useContext(Ke);return X(t,kn(e)),t}function _i(e){let t=p.useContext(zt);return X(t,kn(e)),t}function Gi(e){let t=p.useContext(Ce);return X(t,kn(e)),t}function Cn(e){let t=Gi(e),n=t.matches[t.matches.length-1];return X(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Ui(){return Cn("useRouteId")}function qi(){let e=p.useContext(wn),t=_i("useRouteError"),n=Cn("useRouteError");return e!==void 0?e:t.errors?.[n]}function Yi(){let{router:e}=Hi("useNavigate"),t=Cn("useNavigate"),n=p.useRef(!1);return Wr(()=>{n.current=!0}),p.useCallback(async(o,i={})=>{ye(n.current,Br),n.current&&(typeof o=="number"?e.navigate(o):await e.navigate(o,{fromRouteId:t,...i}))},[e,t])}var Hn={};function _r(e,t,n){!t&&!Hn[e]&&(Hn[e]=!0,ye(!1,n))}p.memo(Vi);function Vi({routes:e,future:t,state:n}){return Hr(e,void 0,n,t)}function Gr(e){X(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Ki({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:i=!1}){X(!lt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),d=p.useMemo(()=>({basename:a,navigator:o,static:i,future:{}}),[a,o,i]);typeof n=="string"&&(n=Ve(n));let{pathname:c="/",search:l="",hash:h="",state:u=null,key:f="default"}=n,g=p.useMemo(()=>{let v=ke(c,a);return v==null?null:{location:{pathname:v,search:l,hash:h,state:u,key:f},navigationType:r}},[a,c,l,h,u,f,r]);return ye(g!=null,`<Router basename="${a}"> is not able to match the URL "${c}${l}${h}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:p.createElement(xe.Provider,{value:d},p.createElement(ct.Provider,{children:t,value:g}))}function Xi({children:e,location:t}){return Ai(sn(e),t)}function sn(e,t=[]){let n=[];return p.Children.forEach(e,(r,o)=>{if(!p.isValidElement(r))return;let i=[...t,o];if(r.type===p.Fragment){n.push.apply(n,sn(r.props.children,i));return}X(r.type===Gr,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),X(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=sn(r.props.children,i)),n.push(a)}),n}var bt="get",$t="application/x-www-form-urlencoded";function Tt(e){return e!=null&&typeof e.tagName=="string"}function Ji(e){return Tt(e)&&e.tagName.toLowerCase()==="button"}function Qi(e){return Tt(e)&&e.tagName.toLowerCase()==="form"}function Zi(e){return Tt(e)&&e.tagName.toLowerCase()==="input"}function es(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ts(e,t){return e.button===0&&(!t||t==="_self")&&!es(e)}var pt=null;function ns(){if(pt===null)try{new FormData(document.createElement("form"),0),pt=!1}catch{pt=!0}return pt}var rs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Gt(e){return e!=null&&!rs.has(e)?(ye(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$t}"`),null):e}function os(e,t){let n,r,o,i,a;if(Qi(e)){let d=e.getAttribute("action");r=d?ke(d,t):null,n=e.getAttribute("method")||bt,o=Gt(e.getAttribute("enctype"))||$t,i=new FormData(e)}else if(Ji(e)||Zi(e)&&(e.type==="submit"||e.type==="image")){let d=e.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||d.getAttribute("action");if(r=c?ke(c,t):null,n=e.getAttribute("formmethod")||d.getAttribute("method")||bt,o=Gt(e.getAttribute("formenctype"))||Gt(d.getAttribute("enctype"))||$t,i=new FormData(d,e),!ns()){let{name:l,type:h,value:u}=e;if(h==="image"){let f=l?`${l}.`:"";i.append(`${f}x`,"0"),i.append(`${f}y`,"0")}else l&&i.append(l,u)}}else{if(Tt(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=bt,r=null,o=$t,a=e}return i&&o==="text/plain"&&(a=i,i=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:i,body:a}}function Sn(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function is(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ss(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function as(e,t,n){let r=await Promise.all(e.map(async o=>{let i=t.routes[o.route.id];if(i){let a=await is(i,n);return a.links?a.links():[]}return[]}));return us(r.flat(1).filter(ss).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function _n(e,t,n,r,o,i){let a=(c,l)=>n[l]?c.route.id!==n[l].route.id:!0,d=(c,l)=>n[l].pathname!==c.pathname||n[l].route.path?.endsWith("*")&&n[l].params["*"]!==c.params["*"];return i==="assets"?t.filter((c,l)=>a(c,l)||d(c,l)):i==="data"?t.filter((c,l)=>{let h=r.routes[c.route.id];if(!h||!h.hasLoader)return!1;if(a(c,l)||d(c,l))return!0;if(c.route.shouldRevalidate){let u=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof u=="boolean")return u}return!0}):[]}function cs(e,t,{includeHydrateFallback:n}={}){return ls(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let i=[o.module];return o.clientActionModule&&(i=i.concat(o.clientActionModule)),o.clientLoaderModule&&(i=i.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(i=i.concat(o.hydrateFallbackModule)),o.imports&&(i=i.concat(o.imports)),i}).flat(1))}function ls(e){return[...new Set(e)]}function ds(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function us(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let i=JSON.stringify(ds(o));return n.has(i)||(n.add(i),r.push({key:i,link:o})),r},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var hs=new Set([100,101,204,205]);function ps(e,t){let n=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n.pathname==="/"?n.pathname="_root.data":t&&ke(n.pathname,t)==="/"?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}function Ur(){let e=p.useContext(Ke);return Sn(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ms(){let e=p.useContext(zt);return Sn(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Pn=p.createContext(void 0);Pn.displayName="FrameworkContext";function qr(){let e=p.useContext(Pn);return Sn(e,"You must render this element inside a <HydratedRouter> element"),e}function fs(e,t){let n=p.useContext(Pn),[r,o]=p.useState(!1),[i,a]=p.useState(!1),{onFocus:d,onBlur:c,onMouseEnter:l,onMouseLeave:h,onTouchStart:u}=t,f=p.useRef(null);p.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=y=>{y.forEach(j=>{a(j.isIntersecting)})},k=new IntersectionObserver(b,{threshold:.5});return f.current&&k.observe(f.current),()=>{k.disconnect()}}},[e]),p.useEffect(()=>{if(r){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[r]);let g=()=>{o(!0)},v=()=>{o(!1),a(!1)};return n?e!=="intent"?[i,f,{}]:[i,f,{onFocus:Je(d,g),onBlur:Je(c,v),onMouseEnter:Je(l,g),onMouseLeave:Je(h,v),onTouchStart:Je(u,g)}]:[!1,f,{}]}function Je(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function gs({page:e,...t}){let{router:n}=Ur(),r=p.useMemo(()=>Tr(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?p.createElement(xs,{page:e,matches:r,...t}):null}function ys(e){let{manifest:t,routeModules:n}=qr(),[r,o]=p.useState([]);return p.useEffect(()=>{let i=!1;return as(e,t,n).then(a=>{i||o(a)}),()=>{i=!0}},[e,t,n]),r}function xs({page:e,matches:t,...n}){let r=De(),{manifest:o,routeModules:i}=qr(),{basename:a}=Ur(),{loaderData:d,matches:c}=ms(),l=p.useMemo(()=>_n(e,t,c,o,r,"data"),[e,t,c,o,r]),h=p.useMemo(()=>_n(e,t,c,o,r,"assets"),[e,t,c,o,r]),u=p.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let v=new Set,b=!1;if(t.forEach(y=>{let j=o.routes[y.route.id];!j||!j.hasLoader||(!l.some(R=>R.route.id===y.route.id)&&y.route.id in d&&i[y.route.id]?.shouldRevalidate||j.hasClientLoader?b=!0:v.add(y.route.id))}),v.size===0)return[];let k=ps(e,a);return b&&v.size>0&&k.searchParams.set("_routes",t.filter(y=>v.has(y.route.id)).map(y=>y.route.id).join(",")),[k.pathname+k.search]},[a,d,r,o,l,t,e,i]),f=p.useMemo(()=>cs(h,o),[h,o]),g=ys(h);return p.createElement(p.Fragment,null,u.map(v=>p.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),f.map(v=>p.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),g.map(({key:v,link:b})=>p.createElement("link",{key:v,...b})))}function bs(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Yr=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Yr&&(window.__reactRouterVersion="7.6.3")}catch{}function $s({basename:e,children:t,window:n}){let r=p.useRef();r.current==null&&(r.current=si({window:n,v5Compat:!0}));let o=r.current,[i,a]=p.useState({action:o.action,location:o.location}),d=p.useCallback(c=>{p.startTransition(()=>a(c))},[a]);return p.useLayoutEffect(()=>o.listen(d),[o,d]),p.createElement(Ki,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:o})}var Vr=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kr=p.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:i,replace:a,state:d,target:c,to:l,preventScrollReset:h,viewTransition:u,...f},g){let{basename:v}=p.useContext(xe),b=typeof l=="string"&&Vr.test(l),k,y=!1;if(typeof l=="string"&&b&&(k=l,Yr))try{let H=new URL(window.location.href),x=l.startsWith("//")?new URL(H.protocol+l):new URL(l),$=ke(x.pathname,v);x.origin===H.origin&&$!=null?l=$+x.search+x.hash:y=!0}catch{ye(!1,`<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let j=Ti(l,{relative:o}),[R,P,M]=fs(r,f),D=Cs(l,{replace:a,state:d,target:c,preventScrollReset:h,relative:o,viewTransition:u});function N(H){t&&t(H),H.defaultPrevented||D(H)}let _=p.createElement("a",{...f,...M,href:k||j,onClick:y||i?t:N,ref:bs(g,P),target:c,"data-discover":!b&&n==="render"?"true":void 0});return R&&!b?p.createElement(p.Fragment,null,_,p.createElement(gs,{page:j})):_});Kr.displayName="Link";var vs=p.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:i,to:a,viewTransition:d,children:c,...l},h){let u=dt(a,{relative:l.relative}),f=De(),g=p.useContext(zt),{navigator:v,basename:b}=p.useContext(xe),k=g!=null&&Es(u)&&d===!0,y=v.encodeLocation?v.encodeLocation(u).pathname:u.pathname,j=f.pathname,R=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(j=j.toLowerCase(),R=R?R.toLowerCase():null,y=y.toLowerCase()),R&&b&&(R=ke(R,b)||R);const P=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let M=j===y||!o&&j.startsWith(y)&&j.charAt(P)==="/",D=R!=null&&(R===y||!o&&R.startsWith(y)&&R.charAt(y.length)==="/"),N={isActive:M,isPending:D,isTransitioning:k},_=M?t:void 0,H;typeof r=="function"?H=r(N):H=[r,M?"active":null,D?"pending":null,k?"transitioning":null].filter(Boolean).join(" ");let x=typeof i=="function"?i(N):i;return p.createElement(Kr,{...l,"aria-current":_,className:H,ref:h,style:x,to:a,viewTransition:d},typeof c=="function"?c(N):c)});vs.displayName="NavLink";var ws=p.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:i,method:a=bt,action:d,onSubmit:c,relative:l,preventScrollReset:h,viewTransition:u,...f},g)=>{let v=js(),b=Rs(d,{relative:l}),k=a.toLowerCase()==="get"?"get":"post",y=typeof d=="string"&&Vr.test(d),j=R=>{if(c&&c(R),R.defaultPrevented)return;R.preventDefault();let P=R.nativeEvent.submitter,M=P?.getAttribute("formmethod")||a;v(P||R.currentTarget,{fetcherKey:t,method:M,navigate:n,replace:o,state:i,relative:l,preventScrollReset:h,viewTransition:u})};return p.createElement("form",{ref:g,method:k,action:b,onSubmit:r?c:j,...f,"data-discover":!y&&e==="render"?"true":void 0})});ws.displayName="Form";function ks(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Xr(e){let t=p.useContext(Ke);return X(t,ks(e)),t}function Cs(e,{target:t,replace:n,state:r,preventScrollReset:o,relative:i,viewTransition:a}={}){let d=Ii(),c=De(),l=dt(e,{relative:i});return p.useCallback(h=>{if(ts(h,t)){h.preventDefault();let u=n!==void 0?n:ot(c)===ot(l);d(e,{replace:u,state:r,preventScrollReset:o,relative:i,viewTransition:a})}},[c,d,l,n,r,t,e,o,i,a])}var Ss=0,Ps=()=>`__${String(++Ss)}__`;function js(){let{router:e}=Xr("useSubmit"),{basename:t}=p.useContext(xe),n=Ui();return p.useCallback(async(r,o={})=>{let{action:i,method:a,encType:d,formData:c,body:l}=os(r,t);if(o.navigate===!1){let h=o.fetcherKey||Ps();await e.fetch(h,n,o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:c,body:l,formMethod:o.method||a,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,n])}function Rs(e,{relative:t}={}){let{basename:n}=p.useContext(xe),r=p.useContext(Ce);X(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),i={...dt(e||".",{relative:t})},a=De();if(e==null){i.search=a.search;let d=new URLSearchParams(i.search),c=d.getAll("index");if(c.some(h=>h==="")){d.delete("index"),c.filter(u=>u).forEach(u=>d.append("index",u));let h=d.toString();i.search=h?`?${h}`:""}}return(!e||e===".")&&o.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:we([n,i.pathname])),ot(i)}function Es(e,t={}){let n=p.useContext(Fr);X(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Xr("useViewTransitionState"),o=dt(e,{relative:t.relative});if(!n.isTransitioning)return!1;let i=ke(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=ke(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Pt(o.pathname,a)!=null||Pt(o.pathname,i)!=null}[...hs];const Jr={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Ms={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Ls={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},Qr={colors:Ms,...Jr},zs={colors:Ls,...Jr},Ts={light:Qr,dark:zs},Is=Qr;var ne=function(){return ne=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},ne.apply(this,arguments)};function it(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,i;r<o;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}var V="-ms-",rt="-moz-",G="-webkit-",Zr="comm",It="rule",jn="decl",Ns="@import",eo="@keyframes",As="@layer",to=Math.abs,Rn=String.fromCharCode,an=Object.assign;function Ds(e,t){return te(e,0)^45?(((t<<2^te(e,0))<<2^te(e,1))<<2^te(e,2))<<2^te(e,3):0}function no(e){return e.trim()}function ve(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,n){return e.replace(t,n)}function vt(e,t,n){return e.indexOf(t,n)}function te(e,t){return e.charCodeAt(t)|0}function _e(e,t,n){return e.slice(t,n)}function fe(e){return e.length}function ro(e){return e.length}function Qe(e,t){return t.push(e),e}function Os(e,t){return e.map(t).join("")}function Gn(e,t){return e.filter(function(n){return!ve(n,t)})}var Nt=1,Ge=1,oo=0,he=0,Q=0,Xe="";function At(e,t,n,r,o,i,a,d){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:Nt,column:Ge,length:a,return:"",siblings:d}}function Re(e,t){return an(At("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Fe(e){for(;e.root;)e=Re(e.root,{children:[e]});Qe(e,e.siblings)}function Fs(){return Q}function Bs(){return Q=he>0?te(Xe,--he):0,Ge--,Q===10&&(Ge=1,Nt--),Q}function pe(){return Q=he<oo?te(Xe,he++):0,Ge++,Q===10&&(Ge=1,Nt++),Q}function Ie(){return te(Xe,he)}function wt(){return he}function Dt(e,t){return _e(Xe,e,t)}function cn(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ws(e){return Nt=Ge=1,oo=fe(Xe=e),he=0,[]}function Hs(e){return Xe="",e}function Ut(e){return no(Dt(he-1,ln(e===91?e+2:e===40?e+1:e)))}function _s(e){for(;(Q=Ie())&&Q<33;)pe();return cn(e)>2||cn(Q)>3?"":" "}function Gs(e,t){for(;--t&&pe()&&!(Q<48||Q>102||Q>57&&Q<65||Q>70&&Q<97););return Dt(e,wt()+(t<6&&Ie()==32&&pe()==32))}function ln(e){for(;pe();)switch(Q){case e:return he;case 34:case 39:e!==34&&e!==39&&ln(Q);break;case 40:e===41&&ln(e);break;case 92:pe();break}return he}function Us(e,t){for(;pe()&&e+Q!==57;)if(e+Q===84&&Ie()===47)break;return"/*"+Dt(t,he-1)+"*"+Rn(e===47?e:pe())}function qs(e){for(;!cn(Ie());)pe();return Dt(e,he)}function Ys(e){return Hs(kt("",null,null,null,[""],e=Ws(e),0,[0],e))}function kt(e,t,n,r,o,i,a,d,c){for(var l=0,h=0,u=a,f=0,g=0,v=0,b=1,k=1,y=1,j=0,R="",P=o,M=i,D=r,N=R;k;)switch(v=j,j=pe()){case 40:if(v!=108&&te(N,u-1)==58){vt(N+=O(Ut(j),"&","&\f"),"&\f",to(l?d[l-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:N+=Ut(j);break;case 9:case 10:case 13:case 32:N+=_s(v);break;case 92:N+=Gs(wt()-1,7);continue;case 47:switch(Ie()){case 42:case 47:Qe(Vs(Us(pe(),wt()),t,n,c),c);break;default:N+="/"}break;case 123*b:d[l++]=fe(N)*y;case 125*b:case 59:case 0:switch(j){case 0:case 125:k=0;case 59+h:y==-1&&(N=O(N,/\f/g,"")),g>0&&fe(N)-u&&Qe(g>32?qn(N+";",r,n,u-1,c):qn(O(N," ","")+";",r,n,u-2,c),c);break;case 59:N+=";";default:if(Qe(D=Un(N,t,n,l,h,o,d,R,P=[],M=[],u,i),i),j===123)if(h===0)kt(N,t,D,D,P,i,u,d,M);else switch(f===99&&te(N,3)===110?100:f){case 100:case 108:case 109:case 115:kt(e,D,D,r&&Qe(Un(e,D,D,0,0,o,d,R,o,P=[],u,M),M),o,M,u,d,r?P:M);break;default:kt(N,D,D,D,[""],M,0,d,M)}}l=h=g=0,b=y=1,R=N="",u=a;break;case 58:u=1+fe(N),g=v;default:if(b<1){if(j==123)--b;else if(j==125&&b++==0&&Bs()==125)continue}switch(N+=Rn(j),j*b){case 38:y=h>0?1:(N+="\f",-1);break;case 44:d[l++]=(fe(N)-1)*y,y=1;break;case 64:Ie()===45&&(N+=Ut(pe())),f=Ie(),h=u=fe(R=N+=qs(wt())),j++;break;case 45:v===45&&fe(N)==2&&(b=0)}}return i}function Un(e,t,n,r,o,i,a,d,c,l,h,u){for(var f=o-1,g=o===0?i:[""],v=ro(g),b=0,k=0,y=0;b<r;++b)for(var j=0,R=_e(e,f+1,f=to(k=a[b])),P=e;j<v;++j)(P=no(k>0?g[j]+" "+R:O(R,/&\f/g,g[j])))&&(c[y++]=P);return At(e,t,n,o===0?It:d,c,l,h,u)}function Vs(e,t,n,r){return At(e,t,n,Zr,Rn(Fs()),_e(e,2,-2),0,r)}function qn(e,t,n,r,o){return At(e,t,n,jn,_e(e,0,r),_e(e,r+1,-1),r,o)}function io(e,t,n){switch(Ds(e,t)){case 5103:return G+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return G+e+e;case 4789:return rt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return G+e+rt+e+V+e+e;case 5936:switch(te(e,t+11)){case 114:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return G+e+V+O(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return G+e+V+e+e;case 6165:return G+e+V+"flex-"+e+e;case 5187:return G+e+O(e,/(\w+).+(:[^]+)/,G+"box-$1$2"+V+"flex-$1$2")+e;case 5443:return G+e+V+"flex-item-"+O(e,/flex-|-self/g,"")+(ve(e,/flex-|baseline/)?"":V+"grid-row-"+O(e,/flex-|-self/g,""))+e;case 4675:return G+e+V+"flex-line-pack"+O(e,/align-content|flex-|-self/g,"")+e;case 5548:return G+e+V+O(e,"shrink","negative")+e;case 5292:return G+e+V+O(e,"basis","preferred-size")+e;case 6060:return G+"box-"+O(e,"-grow","")+G+e+V+O(e,"grow","positive")+e;case 4554:return G+O(e,/([^-])(transform)/g,"$1"+G+"$2")+e;case 6187:return O(O(O(e,/(zoom-|grab)/,G+"$1"),/(image-set)/,G+"$1"),e,"")+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,G+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,G+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+G+e+e;case 4200:if(!ve(e,/flex-|baseline/))return V+"grid-column-align"+_e(e,t)+e;break;case 2592:case 3360:return V+O(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ve(r.props,/grid-\w+-end/)})?~vt(e+(n=n[t].value),"span",0)?e:V+O(e,"-start","")+e+V+"grid-row-span:"+(~vt(n,"span",0)?ve(n,/\d+/):+ve(n,/\d+/)-+ve(e,/\d+/))+";":V+O(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ve(r.props,/grid-\w+-start/)})?e:V+O(O(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,G+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(fe(e)-1-t>6)switch(te(e,t+1)){case 109:if(te(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,"$1"+G+"$2-$3$1"+rt+(te(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~vt(e,"stretch",0)?io(O(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,i,a,d,c,l){return V+o+":"+i+l+(a?V+o+"-span:"+(d?c:+c-+i)+l:"")+e});case 4949:if(te(e,t+6)===121)return O(e,":",":"+G)+e;break;case 6444:switch(te(e,te(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+G+(te(e,14)===45?"inline-":"")+"box$3$1"+G+"$2$3$1"+V+"$2box$3")+e;case 100:return O(e,":",":"+V)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,"scroll-","scroll-snap-")+e}return e}function jt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Ks(e,t,n,r){switch(e.type){case As:if(e.children.length)break;case Ns:case jn:return e.return=e.return||e.value;case Zr:return"";case eo:return e.return=e.value+"{"+jt(e.children,r)+"}";case It:if(!fe(e.value=e.props.join(",")))return""}return fe(n=jt(e.children,r))?e.return=e.value+"{"+n+"}":""}function Xs(e){var t=ro(e);return function(n,r,o,i){for(var a="",d=0;d<t;d++)a+=e[d](n,r,o,i)||"";return a}}function Js(e){return function(t){t.root||(t=t.return)&&e(t)}}function Qs(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case jn:e.return=io(e.value,e.length,n);return;case eo:return jt([Re(e,{value:O(e.value,"@","@"+G)})],r);case It:if(e.length)return Os(n=e.props,function(o){switch(ve(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Fe(Re(e,{props:[O(o,/:(read-\w+)/,":"+rt+"$1")]})),Fe(Re(e,{props:[o]})),an(e,{props:Gn(n,r)});break;case"::placeholder":Fe(Re(e,{props:[O(o,/:(plac\w+)/,":"+G+"input-$1")]})),Fe(Re(e,{props:[O(o,/:(plac\w+)/,":"+rt+"$1")]})),Fe(Re(e,{props:[O(o,/:(plac\w+)/,V+"input-$1")]})),Fe(Re(e,{props:[o]})),an(e,{props:Gn(n,r)});break}return""})}}var Zs={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},de={},Ue=typeof process<"u"&&de!==void 0&&(de.REACT_APP_SC_ATTR||de.SC_ATTR)||"data-styled",so="active",ao="data-styled-version",Ot="6.1.19",En=`/*!sc*/
`,Rt=typeof window<"u"&&typeof document<"u",ea=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&de!==void 0&&de.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&de.REACT_APP_SC_DISABLE_SPEEDY!==""?de.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&de.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&de!==void 0&&de.SC_DISABLE_SPEEDY!==void 0&&de.SC_DISABLE_SPEEDY!==""&&de.SC_DISABLE_SPEEDY!=="false"&&de.SC_DISABLE_SPEEDY),ta={},Ft=Object.freeze([]),qe=Object.freeze({});function co(e,t,n){return n===void 0&&(n=qe),e.theme!==n.theme&&e.theme||t||n.theme}var lo=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),na=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ra=/(^-|-$)/g;function Yn(e){return e.replace(na,"-").replace(ra,"")}var oa=/(a)(d)/gi,mt=52,Vn=function(e){return String.fromCharCode(e+(e>25?39:97))};function dn(e){var t,n="";for(t=Math.abs(e);t>mt;t=t/mt|0)n=Vn(t%mt)+n;return(Vn(t%mt)+n).replace(oa,"$1-$2")}var qt,uo=5381,Be=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ho=function(e){return Be(uo,e)};function po(e){return dn(ho(e)>>>0)}function ia(e){return e.displayName||e.name||"Component"}function Yt(e){return typeof e=="string"&&!0}var mo=typeof Symbol=="function"&&Symbol.for,fo=mo?Symbol.for("react.memo"):60115,sa=mo?Symbol.for("react.forward_ref"):60112,aa={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ca={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},go={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},la=((qt={})[sa]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},qt[fo]=go,qt);function Kn(e){return("type"in(t=e)&&t.type.$$typeof)===fo?go:"$$typeof"in e?la[e.$$typeof]:aa;var t}var da=Object.defineProperty,ua=Object.getOwnPropertyNames,Xn=Object.getOwnPropertySymbols,ha=Object.getOwnPropertyDescriptor,pa=Object.getPrototypeOf,Jn=Object.prototype;function yo(e,t,n){if(typeof t!="string"){if(Jn){var r=pa(t);r&&r!==Jn&&yo(e,r,n)}var o=ua(t);Xn&&(o=o.concat(Xn(t)));for(var i=Kn(e),a=Kn(t),d=0;d<o.length;++d){var c=o[d];if(!(c in ca||n&&n[c]||a&&c in a||i&&c in i)){var l=ha(t,c);try{da(e,c,l)}catch{}}}}return e}function Ne(e){return typeof e=="function"}function Mn(e){return typeof e=="object"&&"styledComponentId"in e}function Te(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function un(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function st(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function hn(e,t,n){if(n===void 0&&(n=!1),!n&&!st(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=hn(e[r],t[r]);else if(st(t))for(var r in t)e[r]=hn(e[r],t[r]);return e}function Ln(e,t){Object.defineProperty(e,"toString",{value:t})}function Ae(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ma=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,i=o;t>=i;)if((i<<=1)<0)throw Ae(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(r),this.length=i;for(var a=o;a<i;a++)this.groupSizes[a]=0}for(var d=this.indexOfGroup(t+1),c=(a=0,n.length);a<c;a++)this.tag.insertRule(d,n[a])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var i=r;i<o;i++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),i=o+r,a=o;a<i;a++)n+="".concat(this.tag.getRule(a)).concat(En);return n},e}(),Ct=new Map,Et=new Map,St=1,ft=function(e){if(Ct.has(e))return Ct.get(e);for(;Et.has(St);)St++;var t=St++;return Ct.set(e,t),Et.set(t,e),t},fa=function(e,t){St=t+1,Ct.set(e,t),Et.set(t,e)},ga="style[".concat(Ue,"][").concat(ao,'="').concat(Ot,'"]'),ya=new RegExp("^".concat(Ue,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),xa=function(e,t,n){for(var r,o=n.split(","),i=0,a=o.length;i<a;i++)(r=o[i])&&e.registerName(t,r)},ba=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(En),o=[],i=0,a=r.length;i<a;i++){var d=r[i].trim();if(d){var c=d.match(ya);if(c){var l=0|parseInt(c[1],10),h=c[2];l!==0&&(fa(h,l),xa(e,h,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(d)}}},Qn=function(e){for(var t=document.querySelectorAll(ga),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Ue)!==so&&(ba(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function $a(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var xo=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(d){var c=Array.from(d.querySelectorAll("style[".concat(Ue,"]")));return c[c.length-1]}(n),i=o!==void 0?o.nextSibling:null;r.setAttribute(Ue,so),r.setAttribute(ao,Ot);var a=$a();return a&&r.setAttribute("nonce",a),n.insertBefore(r,i),r},va=function(){function e(t){this.element=xo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,i=r.length;o<i;o++){var a=r[o];if(a.ownerNode===n)return a}throw Ae(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),wa=function(){function e(t){this.element=xo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),ka=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Zn=Rt,Ca={isServer:!Rt,useCSSOMInjection:!ea},Mt=function(){function e(t,n,r){t===void 0&&(t=qe),n===void 0&&(n={});var o=this;this.options=ne(ne({},Ca),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Rt&&Zn&&(Zn=!1,Qn(this)),Ln(this,function(){return function(i){for(var a=i.getTag(),d=a.length,c="",l=function(u){var f=function(y){return Et.get(y)}(u);if(f===void 0)return"continue";var g=i.names.get(f),v=a.getGroup(u);if(g===void 0||!g.size||v.length===0)return"continue";var b="".concat(Ue,".g").concat(u,'[id="').concat(f,'"]'),k="";g!==void 0&&g.forEach(function(y){y.length>0&&(k+="".concat(y,","))}),c+="".concat(v).concat(b,'{content:"').concat(k,'"}').concat(En)},h=0;h<d;h++)l(h);return c}(o)})}return e.registerId=function(t){return ft(t)},e.prototype.rehydrate=function(){!this.server&&Rt&&Qn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(ne(ne({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new ka(o):r?new va(o):new wa(o)}(this.options),new ma(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(ft(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(ft(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(ft(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Sa=/&/g,Pa=/^\s*\/\/.*$/gm;function bo(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=bo(n.children,t)),n})}function ja(e){var t,n,r,o=qe,i=o.options,a=i===void 0?qe:i,d=o.plugins,c=d===void 0?Ft:d,l=function(f,g,v){return v.startsWith(n)&&v.endsWith(n)&&v.replaceAll(n,"").length>0?".".concat(t):f},h=c.slice();h.push(function(f){f.type===It&&f.value.includes("&")&&(f.props[0]=f.props[0].replace(Sa,n).replace(r,l))}),a.prefix&&h.push(Qs),h.push(Ks);var u=function(f,g,v,b){g===void 0&&(g=""),v===void 0&&(v=""),b===void 0&&(b="&"),t=b,n=g,r=new RegExp("\\".concat(n,"\\b"),"g");var k=f.replace(Pa,""),y=Ys(v||g?"".concat(v," ").concat(g," { ").concat(k," }"):k);a.namespace&&(y=bo(y,a.namespace));var j=[];return jt(y,Xs(h.concat(Js(function(R){return j.push(R)})))),j};return u.hash=c.length?c.reduce(function(f,g){return g.name||Ae(15),Be(f,g.name)},uo).toString():"",u}var Ra=new Mt,pn=ja(),$o=re.createContext({shouldForwardProp:void 0,styleSheet:Ra,stylis:pn});$o.Consumer;re.createContext(void 0);function mn(){return p.useContext($o)}var Ea=function(){function e(t,n){var r=this;this.inject=function(o,i){i===void 0&&(i=pn);var a=r.name+i.hash;o.hasNameForId(r.id,a)||o.insertRules(r.id,a,i(r.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Ln(this,function(){throw Ae(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=pn),this.name+t.hash},e}(),Ma=function(e){return e>="A"&&e<="Z"};function er(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Ma(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var vo=function(e){return e==null||e===!1||e===""},wo=function(e){var t,n,r=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!vo(i)&&(Array.isArray(i)&&i.isCss||Ne(i)?r.push("".concat(er(o),":"),i,";"):st(i)?r.push.apply(r,it(it(["".concat(o," {")],wo(i),!1),["}"],!1)):r.push("".concat(er(o),": ").concat((t=o,(n=i)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in Zs||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Ee(e,t,n,r){if(vo(e))return[];if(Mn(e))return[".".concat(e.styledComponentId)];if(Ne(e)){if(!Ne(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return Ee(o,t,n,r)}var i;return e instanceof Ea?n?(e.inject(n,r),[e.getName(r)]):[e]:st(e)?wo(e):Array.isArray(e)?Array.prototype.concat.apply(Ft,e.map(function(a){return Ee(a,t,n,r)})):[e.toString()]}function ko(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ne(n)&&!Mn(n))return!1}return!0}var La=ho(Ot),za=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&ko(t),this.componentId=n,this.baseHash=Be(La,n),this.baseStyle=r,Mt.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=Te(o,this.staticRulesId);else{var i=un(Ee(this.rules,t,n,r)),a=dn(Be(this.baseHash,i)>>>0);if(!n.hasNameForId(this.componentId,a)){var d=r(i,".".concat(a),void 0,this.componentId);n.insertRules(this.componentId,a,d)}o=Te(o,a),this.staticRulesId=a}else{for(var c=Be(this.baseHash,r.hash),l="",h=0;h<this.rules.length;h++){var u=this.rules[h];if(typeof u=="string")l+=u;else if(u){var f=un(Ee(u,t,n,r));c=Be(c,f+h),l+=f}}if(l){var g=dn(c>>>0);n.hasNameForId(this.componentId,g)||n.insertRules(this.componentId,g,r(l,".".concat(g),void 0,this.componentId)),o=Te(o,g)}}return o},e}(),at=re.createContext(void 0);at.Consumer;function Ta(e){var t=re.useContext(at),n=p.useMemo(function(){return function(r,o){if(!r)throw Ae(14);if(Ne(r)){var i=r(o);return i}if(Array.isArray(r)||typeof r!="object")throw Ae(8);return o?ne(ne({},o),r):r}(e.theme,t)},[e.theme,t]);return e.children?re.createElement(at.Provider,{value:n},e.children):null}var Vt={};function Ia(e,t,n){var r=Mn(e),o=e,i=!Yt(e),a=t.attrs,d=a===void 0?Ft:a,c=t.componentId,l=c===void 0?function(P,M){var D=typeof P!="string"?"sc":Yn(P);Vt[D]=(Vt[D]||0)+1;var N="".concat(D,"-").concat(po(Ot+D+Vt[D]));return M?"".concat(M,"-").concat(N):N}(t.displayName,t.parentComponentId):c,h=t.displayName,u=h===void 0?function(P){return Yt(P)?"styled.".concat(P):"Styled(".concat(ia(P),")")}(e):h,f=t.displayName&&t.componentId?"".concat(Yn(t.displayName),"-").concat(t.componentId):t.componentId||l,g=r&&o.attrs?o.attrs.concat(d).filter(Boolean):d,v=t.shouldForwardProp;if(r&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var k=t.shouldForwardProp;v=function(P,M){return b(P,M)&&k(P,M)}}else v=b}var y=new za(n,f,r?o.componentStyle:void 0);function j(P,M){return function(D,N,_){var H=D.attrs,x=D.componentStyle,$=D.defaultProps,w=D.foldedComponentIds,S=D.styledComponentId,I=D.target,B=re.useContext(at),U=mn(),K=D.shouldForwardProp||U.shouldForwardProp,le=co(N,B,$)||qe,q=function($e,C,A){for(var T,L=ne(ne({},C),{className:void 0,theme:A}),z=0;z<$e.length;z+=1){var E=Ne(T=$e[z])?T(L):T;for(var W in E)L[W]=W==="className"?Te(L[W],E[W]):W==="style"?ne(ne({},L[W]),E[W]):E[W]}return C.className&&(L.className=Te(L.className,C.className)),L}(H,N,le),se=q.as||I,ee={};for(var ae in q)q[ae]===void 0||ae[0]==="$"||ae==="as"||ae==="theme"&&q.theme===le||(ae==="forwardedAs"?ee.as=q.forwardedAs:K&&!K(ae,se)||(ee[ae]=q[ae]));var be=function($e,C){var A=mn(),T=$e.generateAndInjectStyles(C,A.styleSheet,A.stylis);return T}(x,q),Se=Te(w,S);return be&&(Se+=" "+be),q.className&&(Se+=" "+q.className),ee[Yt(se)&&!lo.has(se)?"class":"className"]=Se,_&&(ee.ref=_),p.createElement(se,ee)}(R,P,M)}j.displayName=u;var R=re.forwardRef(j);return R.attrs=g,R.componentStyle=y,R.displayName=u,R.shouldForwardProp=v,R.foldedComponentIds=r?Te(o.foldedComponentIds,o.styledComponentId):"",R.styledComponentId=f,R.target=r?o.target:e,Object.defineProperty(R,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=r?function(M){for(var D=[],N=1;N<arguments.length;N++)D[N-1]=arguments[N];for(var _=0,H=D;_<H.length;_++)hn(M,H[_],!0);return M}({},o.defaultProps,P):P}}),Ln(R,function(){return".".concat(R.styledComponentId)}),i&&yo(R,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),R}function tr(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var nr=function(e){return Object.assign(e,{isCss:!0})};function ge(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ne(e)||st(e))return nr(Ee(tr(Ft,it([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Ee(r):nr(Ee(tr(r,t)))}function fn(e,t,n){if(n===void 0&&(n=qe),!t)throw Ae(1,t);var r=function(o){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,n,ge.apply(void 0,it([o],i,!1)))};return r.attrs=function(o){return fn(e,t,ne(ne({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return fn(e,t,ne(ne({},n),o))},r}var Co=function(e){return fn(Ia,e)},m=Co;lo.forEach(function(e){m[e]=Co(e)});var Na=function(){function e(t,n){this.rules=t,this.componentId=n,this.isStatic=ko(t),Mt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,n,r,o){var i=o(un(Ee(this.rules,n,r,o)),""),a=this.componentId+t;r.insertRules(a,a,i)},e.prototype.removeStyles=function(t,n){n.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,n,r,o){t>2&&Mt.registerId(this.componentId+t),this.removeStyles(t,r),this.createStyles(t,n,r,o)},e}();function Aa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=ge.apply(void 0,it([e],t,!1)),o="sc-global-".concat(po(JSON.stringify(r))),i=new Na(r,o),a=function(c){var l=mn(),h=re.useContext(at),u=re.useRef(l.styleSheet.allocateGSInstance(o)).current;return l.styleSheet.server&&d(u,c,l.styleSheet,h,l.stylis),re.useLayoutEffect(function(){if(!l.styleSheet.server)return d(u,c,l.styleSheet,h,l.stylis),function(){return i.removeStyles(u,l.styleSheet)}},[u,c,l.styleSheet,h,l.stylis]),null};function d(c,l,h,u,f){if(i.isStatic)i.renderStyles(c,ta,h,f);else{var g=ne(ne({},l),{theme:co(l,u,a.defaultProps)});i.renderStyles(c,g,h,f)}}return re.memo(a)}const So=p.createContext(void 0),Po=()=>{const e=p.useContext(So);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Da=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Oa=Z(({children:e})=>{const t=Ye(),n=t.preferences.theme||"system",o=n==="system"?Da():n,i=Ts[o]||Is,a={theme:i,themeName:o,themePreference:n,setTheme:d=>{t.updatePreference("theme",d)},toggleTheme:()=>{const d=o==="light"?"dark":"light";t.updatePreference("theme",d)},isDarkMode:o==="dark"};return p.useEffect(()=>{if(n==="system"&&typeof window<"u"&&window.matchMedia){const d=window.matchMedia("(prefers-color-scheme: dark)"),c=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return d.addEventListener("change",c),()=>d.removeEventListener("change",c)}},[n,t]),p.useEffect(()=>{if(typeof document<"u"){const d=document.documentElement;Object.entries(i.colors).forEach(([c,l])=>{d.style.setProperty(`--color-${c}`,l)}),Object.entries(i.spacing).forEach(([c,l])=>{d.style.setProperty(`--spacing-${c}`,l)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${o}-theme`)}},[i,o]),s.jsx(So.Provider,{value:a,children:s.jsx(Ta,{theme:i,children:e})})});function Fa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ba(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var Kt=typeof window<"u",Wa=function(e){p.useEffect(e,[])},Ha=function(e){var t=p.useRef(e);t.current=e,Wa(function(){return function(){return t.current()}})},_a=function(e){var t=p.useRef(0),n=p.useState(e),r=n[0],o=n[1],i=p.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){o(a)})},[]);return Ha(function(){cancelAnimationFrame(t.current)}),[r,i]},jo=function(e){var t={},n=t.initialWidth,r=n===void 0?1/0:n,o=t.initialHeight,i=o===void 0?1/0:o,a=t.onChange,d=_a({width:Kt?window.innerWidth:r,height:Kt?window.innerHeight:i}),c=d[0],l=d[1];return p.useEffect(function(){if(Kt){var h=function(){var u=window.innerWidth,f=window.innerHeight;l({width:u,height:f}),a&&a(u,f)};return Fa(window,"resize",h),function(){Ba(window,"resize",h)}}},[]),c};const Ro=()=>{const{width:e=0,height:t=0}=jo();return{width:e,height:t}},Ga=()=>{const{width:e=0,height:t=0}=jo();return e>t?"landscape":"portrait"},Ua=()=>{const{width:e}=Ro(),{theme:t}=Po(),n={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=n.large?"large":e>=n.desktop?"desktop":e>=n.tablet?"tablet":e>=n.mobileLandscape?"mobileLandscape":"mobilePortrait"},qa=()=>{const[e,t]=p.useState(!1);return p.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},Bt=()=>{const e=Ro(),t=Ga(),n=Ua(),r=qa();return{orientation:t,breakpoint:n,dimensions:e,isMobile:n==="mobilePortrait"||n==="mobileLandscape",isTablet:n==="tablet",isDesktop:n==="desktop"||n==="large",isTouch:r}},Ya=p.createContext(void 0),Va=({children:e})=>{const t=Ye(),n=Bt(),[r,o]=p.useState(!0),[i,a]=p.useState(["chat","moves"]),[d,c]=p.useState(!1),l=t.preferences.layout,h=p.useMemo(()=>l==="auto"?n.orientation:l,[l,n.orientation]),u=p.useMemo(()=>n.isMobile||n.dimensions.width<768,[n.isMobile,n.dimensions.width]),f=b=>{t.updatePreference("layout",b)},g=b=>{a(k=>k.includes(b)?k.filter(y=>y!==b):[...k,b])};p.useEffect(()=>{c(!0),o(k=>{const y=!u;return k!==y?y:k}),a(k=>{if(u&&h==="portrait"){const y=["chat"];return JSON.stringify(k)!==JSON.stringify(y)?y:k}else if(h==="landscape"&&!u){const y=["chat","moves","analysis"];return JSON.stringify(k)!==JSON.stringify(y)?y:k}return k});const b=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(b)},[h,u]);const v={...n,layoutPreference:l,setLayoutPreference:f,activeLayout:h,isCompactMode:u,showSidebar:r,setSidebarVisible:o,activePanels:i,togglePanel:g,isTransitioning:d};return s.jsx(Ya.Provider,{value:v,children:e})};m.div`
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
`;const Ka=m.header`
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
`,Xa=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Ja=m.button`
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
`,Qa=m.img`
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
`;const Za=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Xt=m.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Jt=m.span`
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
`,Eo=Z(({onMenuClick:e})=>{const{preferencesStore:t}=Le(),{viewMode:n,chessOrientation:r}=t.preferences,{themePreference:o,setTheme:i}=Po(),a=h=>{t.updatePreference("viewMode",h)},d=h=>{t.updatePreference("chessOrientation",h)},c=h=>{i(h)},l=n==="chat-only";return s.jsxs(Ka,{children:[s.jsxs(Xa,{children:[s.jsx(Ja,{onClick:e,"aria-label":"Menu",children:"☰"}),s.jsx(Qa,{src:"/simpleficsinterface.svg",alt:"Simple FICS Interface",title:"Simple FICS Interface"})]}),s.jsxs(Za,{children:[s.jsxs(Xt,{children:[s.jsx(Jt,{children:"Theme:"}),s.jsxs(Qt,{children:[s.jsx(Pe,{$isActive:o==="light",onClick:()=>c("light"),title:"Light Theme",children:"☀"}),s.jsx(Pe,{$isActive:o==="dark",onClick:()=>c("dark"),title:"Dark Theme",children:"☾"}),s.jsx(Pe,{$isActive:o==="system",onClick:()=>c("system"),title:"System Theme",children:"◐"})]})]}),s.jsxs(Xt,{children:[s.jsx(Jt,{children:"Orient:"}),s.jsxs(Qt,{children:[s.jsx(Pe,{$isActive:r==="landscape",$isDisabled:l,onClick:()=>!l&&d("landscape"),disabled:l,title:"Landscape",children:"▭"}),s.jsx(Pe,{$isActive:r==="portrait",$isDisabled:l,onClick:()=>!l&&d("portrait"),disabled:l,title:"Portrait",children:"▯"})]})]}),s.jsxs(Xt,{children:[s.jsx(Jt,{children:"Mode:"}),s.jsxs(Qt,{children:[s.jsx(Pe,{$isActive:n==="chess-only",onClick:()=>a("chess-only"),title:"Chess Only",children:"♔"}),s.jsx(Pe,{$isActive:n==="chess-and-chat",onClick:()=>a("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),s.jsx(Pe,{$isActive:n==="chat-only",onClick:()=>a("chat-only"),title:"Chat Only",children:"▤"})]})]})]})]})});Eo.displayName="AppHeader";const ec=m.img`
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
`,tc={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Me=({piece:e,size:t,isDragging:n=!1,style:r})=>{const o=tc[e];if(!o)return null;const i=`/pieces/cburnett/${o}.svg`;return s.jsx(ec,{className:"chess-piece",src:i,alt:o,$isDragging:n,draggable:!1,style:r})};Me.displayName="ChessPiece";const nc=m.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,rc=m.div`
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
`,oc=m.button`
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
`,Mo=({isOpen:e,color:t,onSelect:n,onCancel:r,position:o})=>{if(!o)return null;const i=["Q","R","B","N"],a=d=>t==="white"?d:d.toLowerCase();return s.jsx(nc,{$isOpen:e,onClick:r,children:s.jsx(rc,{$x:o.x,$y:o.y,onClick:d=>d.stopPropagation(),children:i.map(d=>s.jsx(oc,{onClick:()=>n(d.toLowerCase()),children:s.jsx(Me,{piece:a(d),size:50})},d))})})};Mo.displayName="PromotionDialog";const ic=m.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,sc=m.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,ac=m.div`
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
`,rr=m.div`
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
`,cc=m.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,lc=m.div.attrs(e=>({style:{transform:`translate(
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
`,We=["a","b","c","d","e","f","g","h"],He=["8","7","6","5","4","3","2","1"];function dc(e,t){return(e+t)%2===0}function uc(e,t,n){const r=n?We[7-e]:We[e],o=n?He[7-t]:He[t];return`${r}${o}`}function hc(e){const t=new Map,[n]=e.split(" ");return n.split("/").forEach((o,i)=>{let a=0;for(const d of o)if(d>="1"&&d<="8")a+=parseInt(d);else{const c=`${We[a]}${He[i]}`;t.set(c,d),a++}}),t}const gn=Z(({position:e,size:t,flipped:n=!1,showCoordinates:r=!0,onMove:o,onDrop:i,highlightedSquares:a=new Set,lastMove:d,interactive:c=!0,onSizeCalculated:l,selectedCapturedPiece:h,onCapturedPieceSelect:u})=>{Bt();const f=Ye(),g=$n(),v=p.useRef(null),[b,k]=p.useState(t||200),[y,j]=p.useState(null),[R,P]=p.useState(new Set),[M,D]=p.useState(null),[N,_]=p.useState([]),H=p.useRef(),[x,$]=p.useState(null),[w,S]=p.useState(!1),I=p.useMemo(()=>hc(e),[e]),B=p.useRef(new Map),U=p.useCallback((C,A)=>{const T=We.indexOf(C[0]),L=He.indexOf(C[1]),z=A/8,E=n?(7-T)*z:T*z,W=n?(7-L)*z:L*z;return{x:E,y:W}},[n]),K=p.useCallback((C,A,T)=>{const L=C.toLowerCase()==="p",z=T[1];return L&&(z==="8"||z==="1")},[]),le=p.useCallback(C=>{C.preventDefault(),g.isPlaying&&g.clearPremove()},[g]);p.useEffect(()=>{if(t){k(t);return}const C=()=>{if(!v.current)return;const E=v.current.parentElement;if(!E)return;const{width:W,height:F}=E.getBoundingClientRect();v.current.getBoundingClientRect();const J=16,Y=W-J,oe=F-J,ie=Math.floor(Math.min(Y,oe)),ze=Math.max(100,Math.floor(ie/8)*8);ze!==b&&(k(ze),l?.(ze))},A=setTimeout(C,50);C();let T;const L=()=>{clearTimeout(T),T=setTimeout(C,100)};window.addEventListener("resize",L);let z=null;return v.current&&v.current.parentElement&&(z=new ResizeObserver(()=>{L()}),z.observe(v.current.parentElement)),()=>{window.removeEventListener("resize",L),clearTimeout(T),clearTimeout(A),z&&z.disconnect()}},[t,b]);const q=b/8,se=p.useMemo(()=>{if(!f.preferences.animateMoves)return!1;if(g.isPlaying&&f.preferences.disableAnimationLowTime){const C=g.currentGame,A=g.playingColor;if(C&&A&&(A==="white"?C.white.time:C.black.time)<10)return!1}return!0},[f.preferences.animateMoves,f.preferences.disableAnimationLowTime,g.isPlaying,g.currentGame,g.playingColor]);p.useEffect(()=>{if(!se||w){B.current=new Map(I);return}const C=B.current,A=[];C.forEach((T,L)=>{I.has(L)||I.forEach((z,E)=>{z===T&&!C.has(E)&&d&&d.from===L&&d.to===E&&A.push({piece:T,from:L,to:E,startTime:Date.now()})})}),A.length>0&&_(T=>[...T,...A]),B.current=new Map(I)},[I,d,se,w]),p.useEffect(()=>{if(w){const C=setTimeout(()=>{S(!1)},50);return()=>clearTimeout(C)}},[e,w]),p.useEffect(()=>{if(N.length===0)return;const C=()=>{const A=Date.now(),T=f.preferences.animationDuration;_(L=>{const z=L.filter(E=>A-E.startTime<T);return z.length>0&&(H.current=requestAnimationFrame(C)),z})};return H.current=requestAnimationFrame(C),()=>{H.current&&cancelAnimationFrame(H.current)}},[N.length,f.preferences.animationDuration]),p.useEffect(()=>{if(h)try{const C=g.currentPosition;g.chessBoard.getFen()!==C&&g.chessBoard.loadFen(C);const T=g.chessBoard.getLegalMoves().filter(z=>z.from==="@"&&z.san.toLowerCase().startsWith(h.toLowerCase())),L=new Set(T.map(z=>z.to));P(L),j(null)}catch(C){console.error("Error getting drop moves:",C),P(new Set)}},[h,g]);const ee=p.useCallback((C,A)=>{if(!c)return;const T=I.get(C);if(h){R.has(C)?(i?.(h,C),u?.(null),P(new Set)):(u?.(null),P(new Set));return}if(y)if(R.has(C)){const L=I.get(y);if(L&&K(L,y,C)){const z=L===L.toUpperCase()?"white":"black";if(g.isPlaying){const E=f.preferences.autoPromotionPiece;g.isMyTurn?(S(!0),o?.(y,C,E)):g.setPremove(y,C,E)}else{const E=A?.currentTarget.getBoundingClientRect();$({from:y,to:C,color:z,position:E?{x:E.left+E.width/2,y:E.top+E.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else g.isPlaying&&!g.isMyTurn?g.setPremove(y,C):(S(!0),o?.(y,C));j(null),P(new Set)}else if(C===y)j(null),P(new Set);else if(T)if(j(C),f.preferences.showLegalMoves)try{const L=g.currentPosition;g.chessBoard.getFen()!==L&&g.chessBoard.loadFen(L);const z=g.chessBoard.getLegalMoves(C),E=new Set(z.map(W=>W.to));P(E)}catch(L){console.error("Error getting legal moves:",L),P(new Set)}else P(new Set);else j(null),P(new Set);else if(T){j(C);try{const L=g.currentPosition;g.chessBoard.getFen()!==L&&g.chessBoard.loadFen(L);const z=T===T.toUpperCase(),E=g.chessBoard.getActiveColor();if(z&&E==="w"||!z&&E==="b")if(f.preferences.showLegalMoves){const F=g.chessBoard.getLegalMoves(C),J=new Set(F.map(Y=>Y.to));P(J)}else P(new Set);else P(new Set),j(null)}catch(L){console.error("Error getting legal moves:",L),P(new Set)}}},[y,R,I,o,i,c,K,g,f.preferences.autoPromotionPiece,h,u]),ae=p.useCallback((C,A,T)=>{if(!c)return;const L=C.clientX,z=C.clientY;let E=!1,W=!1;const J=C.currentTarget.getBoundingClientRect().width,Y=ie=>{const ze=Math.abs(ie.clientX-L),Ht=Math.abs(ie.clientY-z);(ze>3||Ht>3)&&T&&!W?(E=!0,W=!0,be(A,T,ie,J)):W&&D(Oe=>Oe?{...Oe,x:ie.clientX,y:ie.clientY}:null)},oe=ie=>{document.removeEventListener("mousemove",Y),document.removeEventListener("mouseup",oe),W?Se(ie,A,T):E?(D(null),j(null),P(new Set)):ee(A,C)};document.addEventListener("mousemove",Y),document.addEventListener("mouseup",oe)},[c,ee]),be=p.useCallback((C,A,T,L)=>{if(j(C),f.preferences.showLegalMoves)try{const E=g.currentPosition;g.chessBoard.getFen()!==E&&g.chessBoard.loadFen(E);const W=A===A.toUpperCase(),F=g.chessBoard.getActiveColor();if(W&&F==="w"||!W&&F==="b"){const Y=g.chessBoard.getLegalMoves(C),oe=new Set(Y.map(ie=>ie.to));P(oe)}else P(new Set)}catch(E){console.error("Error getting legal moves for drag:",E),P(new Set)}else P(new Set);const z={piece:A,from:C,x:T.clientX,y:T.clientY,size:L};D(z)},[f.preferences.showLegalMoves,g]),Se=p.useCallback((C,A,T)=>{try{const E=document.elementsFromPoint(C.clientX,C.clientY).find(W=>W.getAttribute("data-square"))?.getAttribute("data-square");if(E&&E!==A)if(K(T,A,E)){const W=T===T.toUpperCase()?"white":"black";if(g.isPlaying){const F=f.preferences.autoPromotionPiece;g.isMyTurn?(S(!0),o?.(A,E,F)):g.setPremove(A,E,F)}else $({from:A,to:E,color:W,position:{x:C.clientX,y:C.clientY}})}else g.isPlaying&&!g.isMyTurn?g.setPremove(A,E):(S(!0),o?.(A,E))}catch(L){console.error("Error in handleDragEnd:",L)}D(null),j(null),P(new Set)},[o,K,g,f.preferences.autoPromotionPiece]),$e=p.useMemo(()=>{const C=[];for(let A=0;A<8;A++)for(let T=0;T<8;T++){const L=dc(T,A),z=uc(T,A,n),E=I.get(z),W=a.has(z),F=d&&(d.from===z||d.to===z),J=y===z,Y=R.has(z),oe=M?.from===z,ie=N.some(Oe=>Oe.to===z),ze=r&&A===7,Ht=r&&T===0;C.push(s.jsxs(ac,{"data-square":z,$isLight:L,$isHighlighted:W,$isLastMoveSquare:!!F,$isSelected:J,$isPossibleMove:Y,onMouseDown:Oe=>ae(Oe,z,E),children:[E&&!oe&&!ie&&s.jsx(Me,{piece:E,size:q}),ze&&s.jsx(rr,{$type:"file",$isLight:L,$size:q,children:n?We[7-T]:We[T]}),Ht&&s.jsx(rr,{$type:"rank",$isLight:L,$size:q,children:n?He[7-A]:He[A]})]},z))}return C},[n,r,I,a,d,y,R,M,q,ee,ae]);return s.jsxs(s.Fragment,{children:[s.jsxs(ic,{ref:v,$size:b,onContextMenu:le,children:[s.jsx(sc,{children:$e}),N.map((C,A)=>{const T=U(C.from,b),L=U(C.to,b),z=Date.now()-C.startTime,E=f.preferences.animationDuration,W=Math.min(z/E,1),J=(Y=>Y<.5?4*Y*Y*Y:1-Math.pow(-2*Y+2,3)/2)(W);return s.jsx(lc,{$fromX:T.x,$fromY:T.y,$toX:L.x,$toY:L.y,$progress:J,$size:q,children:s.jsx(Me,{piece:C.piece,size:q})},`${C.from}-${C.to}-${C.startTime}`)})]}),M&&s.jsx(s.Fragment,{children:s.jsx(cc,{$x:M.x,$y:M.y,$size:M.size,children:s.jsx(Me,{piece:M.piece,size:M.size,isDragging:!0})})}),x&&s.jsx(Mo,{isOpen:!0,color:x.color,position:x.position,onSelect:C=>{S(!0),o?.(x.from,x.to,C),$(null)},onCancel:()=>$(null)})]})});gn.displayName="ChessBoardWithPieces";const pc=m.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,Lo=m.span`
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
`,zn=({time:e,size:t="medium",isActive:n=!1,lowTimeThreshold:r=30,showTenths:o=!1,className:i,compact:a=!1})=>{const d=l=>{const h=Math.floor(l/3600),u=Math.floor(l%3600/60),f=Math.floor(l%60),g=Math.floor(l%1*10),v=n&&Math.floor(l)%2===0?" ":":";return h>0?`${h}${v}${u.toString().padStart(2,"0")}${v}${f.toString().padStart(2,"0")}`:l<r&&o?`${u}${v}${f.toString().padStart(2,"0")}.${g}`:`${u}${v}${f.toString().padStart(2,"0")}`},c=e<=r&&e>0;return s.jsx(pc,{size:t,className:i,children:s.jsx(Lo,{$isLowTime:c,$isActive:n,$compact:a,children:d(e)})})},ut=m(zn).attrs({size:"large"})`
    ${Lo} {
        text-align: center;
        box-shadow: ${({theme:e})=>e.shadows.container};
        border-radius: ${({theme:e})=>e.borderRadius.container};
        background: ${({theme:e})=>e.colors.surface};
        font-size: 20px;
        
        &:hover {
            box-shadow: ${({theme:e})=>e.shadows.container};
        }
    }
`;m(zn).attrs({size:"small"})`
    font-size: 12px;
`;m(zn).attrs({size:"medium"})`
    font-size: 16px;
`;const mc=m.div`
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
`,fc=m.button`
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
`,gc=m.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,zo=Z(({playerName:e,position:t,onClose:n})=>{const r=Lr(),o=Ye(),i=p.useRef(null),a=o.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];p.useEffect(()=>{const c=h=>{i.current&&!i.current.contains(h.target)&&n()},l=h=>{h.key==="Escape"&&n()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",l)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",l)}},[n]),p.useEffect(()=>{if(i.current){const c=i.current.getBoundingClientRect(),l=window.innerWidth,h=window.innerHeight;let u=t.x,f=t.y;c.right>l&&(u=l-c.width-10),c.bottom>h&&(f=h-c.height-10),(u!==t.x||f!==t.y)&&(i.current.style.left=`${u}px`,i.current.style.top=`${f}px`)}},[t]);const d=c=>{const l=c.replace("{player}",e);r.sendCommand(l),n()};return s.jsx(mc,{ref:i,$x:t.x,$y:t.y,children:a.map((c,l)=>"divider"in c&&c.divider?s.jsx(gc,{},l):"command"in c?s.jsx(fc,{onClick:()=>d(c.command),children:c.label},l):null)})});zo.displayName="PlayerContextMenu";const yc=m.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,ht=({name:e,className:t,style:n})=>{const[r,o]=p.useState(null),i=a=>{a.preventDefault(),a.stopPropagation(),o({x:a.clientX,y:a.clientY})};return s.jsxs(s.Fragment,{children:[s.jsx(yc,{className:t,style:n,onClick:i,children:e}),r&&s.jsx(zo,{playerName:e,position:r,onClose:()=>o(null)})]})};ht.displayName="PlayerName";const xc=m.div`
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
`,bc=m.div`
  display: flex;
  align-items: center;
  width: 100%;
`,$c=m.div`
  display: flex;
  align-items: center;
  flex: 1;
`,vc=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,wc=m.div`
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
`;const Ze=Z(({name:e,rating:t,time:n,isActive:r,isWhite:o,orientation:i="horizontal",hideClockInCard:a=!1,onlyInfo:d=!1,compact:c=!1})=>{const l=s.jsxs(s.Fragment,{children:[s.jsx(bc,{children:s.jsxs($c,{children:[s.jsx(vc,{children:s.jsx(ht,{name:e})}),s.jsx(wc,{children:t})]})}),!a&&!d&&s.jsx(ut,{time:n,isActive:r,showTenths:n<10,lowTimeThreshold:30,size:i==="horizontal"?"medium":"small"})]});return d?l:s.jsx(xc,{$isActive:r,$orientation:i,$compact:c,children:l})});Ze.displayName="PlayerCard";const kc=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
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
`,Cc=m.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,or=m.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,Sc=m.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,ir=m.span`
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
`,Wt=Z(({moves:e,currentMoveIndex:t,onMoveClick:n,onNavigate:r,showHeader:o=!0,extraControls:i,className:a,disableAutoScroll:d=!1})=>{const c=p.useRef(null);p.useEffect(()=>{if(!d&&c.current&&t!==void 0){const h=c.current.querySelector(`[data-move-index="${t}"]`);h&&h.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,d]);const l=()=>{const h=[];for(let u=0;u<e.length;u+=2){const f=Math.floor(u/2)+1,g=e[u],v=e[u+1];h.push(s.jsxs(or,{children:[s.jsxs(Sc,{children:[f,"."]}),s.jsx(ir,{$isCurrentMove:t===u,onClick:()=>n?.(u),"data-move-index":u,children:rn(g.san)}),v&&s.jsx(ir,{$isCurrentMove:t===u+1,onClick:()=>n?.(u+1),"data-move-index":u+1,children:rn(v.san)})]},u))}return h};return s.jsxs(kc,{className:a,children:[o?s.jsx(Zt,{children:s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("span",{children:"Moves"}),s.jsxs(en,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})]})})}):i?s.jsxs(Zt,{children:[i,s.jsxs(en,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})]}):s.jsx(Zt,{children:s.jsxs(en,{children:[s.jsx(ue,{onClick:()=>r?.("first"),title:"First move",children:"⏮"}),s.jsx(ue,{onClick:()=>r?.("prev"),title:"Previous move",children:"◀"}),s.jsx(ue,{onClick:()=>r?.("next"),title:"Next move",children:"▶"}),s.jsx(ue,{onClick:()=>r?.("last"),title:"Last move",children:"⏭"})]})}),s.jsx(Cc,{ref:c,children:e.length===0?s.jsx(or,{children:s.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):l()})]})});Wt.displayName="MoveList";const Pc=m(ut)`
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
`,jc=m(ut)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`,et=Z(({player:e,isActive:t,size:n="small",compact:r=!0,variant:o="portrait"})=>{const i=o==="landscape"?jc:Pc;return s.jsx(i,{time:e.time,isActive:t,showTenths:e.time<10,lowTimeThreshold:30,size:n,compact:r})});et.displayName="ObservableClock";const Rc=m.div`
  position: relative;
  display: inline-block;
`,Ec=m.button`
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
`,Mc=m.div`
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
`,Lc=m.button`
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
`,Tn=Z(({color:e,size:t="small"})=>{const n=Ye(),[r,o]=p.useState(!1),i=p.useRef(null),a=["Q","R","B","N"],d=n.preferences.autoPromotionPiece,c=u=>e==="white"?u:u.toLowerCase();p.useEffect(()=>{const u=f=>{i.current&&!i.current.contains(f.target)&&o(!1)};if(r)return document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[r]);const l=u=>{n.updatePreference("autoPromotionPiece",u),o(!1)},h=t==="small"?28:36;return s.jsxs(Rc,{ref:i,children:[s.jsx(Ec,{$size:t,onClick:()=>o(!r),title:"Select promotion piece",children:s.jsx(Me,{piece:c(d),size:h})}),s.jsx(Mc,{$isOpen:r,children:a.map(u=>s.jsx(Lc,{$size:t,onClick:()=>l(u),title:`Promote to ${u==="Q"?"Queen":u==="R"?"Rook":u==="B"?"Bishop":"Knight"}`,children:s.jsx(Me,{piece:c(u),size:h})},u))})]})});Tn.displayName="PromotionPieceSelector";const zc=m.div`
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
          background-color: ${e.theme.colors.primary};
          color: ${e.theme.colors.textInverse};
          &:hover {
            background-color: ${e.theme.colors.primaryHover};
          }
        `}}}
  
  &:active {
    transform: scale(0.95);
  }
`,To=Z(({perspective:e,onDraw:t,onResign:n,onAbort:r,onAnalysis:o,onUnobserve:i,onUnexamine:a,onSetupFEN:d,onFlipBoard:c,isAnalysisActive:l,isDrawOffered:h,canAbort:u,className:f})=>{const g=$n(),v=()=>s.jsxs(s.Fragment,{children:[u&&s.jsx(ce,{onClick:r,$variant:"secondary",children:"Abort"}),s.jsx(ce,{onClick:t,$variant:"secondary",children:"Draw"}),g.currentGame&&g.currentGame.moveNumber>=2&&s.jsx(ce,{onClick:n,$variant:"secondary",children:"Resign"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"}),s.jsx(Tn,{color:g.playingColor||"white",size:"medium"})]}),b=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:i,$variant:"secondary",children:"Unobserve"}),s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"})]}),k=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:a,$variant:"secondary",children:"Unexamine"}),s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"})]}),y=()=>s.jsxs(s.Fragment,{children:[s.jsx(ce,{onClick:o,$variant:"secondary",children:"Analysis"}),s.jsx(ce,{onClick:c,$variant:"secondary",children:"Flip"}),s.jsx(ce,{onClick:d,$variant:"secondary",children:"FEN"})]});return s.jsxs(zc,{className:f,children:[e==="playing"&&v(),e==="observing"&&b(),e==="examining"&&k(),e==="freestyle"&&y()]})}),me=m(ce)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;To.displayName="GameControls";const sr=m.div`
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
`,ar=m.div`
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
`,Tc=m.div`
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
`,cr=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,gt=m.div`
  background: transparent;
  transition: all 0.3s ease;
`,lr=m.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,Io=Z(({evaluation:e,percent:t,orientation:n="vertical",className:r})=>{const i=Lt().isBottomPlayerWinning;let a,d,c;if(t===50)a=47,d=6,c=47;else if(t>50){const h=t-50;a=50-h,d=h,c=50}else{const h=50-t;a=50,d=h,c=50-h}const l=t===50?"#FFC107":i?"#2E7D32":"#C62828";if(n==="vertical"){const h=t<80;return s.jsxs(sr,{$orientation:n,className:r,children:[s.jsx(ar,{$orientation:n,children:e}),s.jsx(Tc,{$isLight:h,children:e}),s.jsxs(cr,{$orientation:n,children:[s.jsx(gt,{style:{height:`${a}%`}}),s.jsx(lr,{$color:l,style:{height:`${d}%`}}),s.jsx(gt,{style:{height:`${c}%`}})]})]})}else return s.jsxs(sr,{$orientation:n,className:r,children:[s.jsx(ar,{$orientation:n,children:e}),s.jsxs(cr,{$orientation:n,children:[s.jsx(gt,{style:{width:`${c}%`}}),s.jsx(lr,{$color:l,style:{width:`${d}%`}}),s.jsx(gt,{style:{width:`${a}%`}})]})]})});Io.displayName="EvaluationBar";const Ic=m.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,Nc=m.div`
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
`,yn=Z(({orientation:e="vertical",boardSize:t})=>{const n=Lt();return s.jsx(Ic,{$orientation:e,$boardSize:t,children:s.jsx(Io,{evaluation:n.evaluation,percent:n.evaluationPercent,orientation:e})})}),xn=Z(({className:e})=>{const t=Lt();return s.jsxs(Nc,{className:e,children:[s.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),s.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});yn.displayName="AnalysisDisplay";xn.displayName="AnalysisInfoDisplay";const Ac=m.div`
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
`,Dc=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Oc=m.h2`
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
`,Fc=m.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Bc=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Wc=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,dr=m.button`
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
`,Hc=m.button`
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
`,ur=m.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,hr=m.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,_c=m(No)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Ao=Z(({isOpen:e,onClose:t})=>{const{gameStore:n}=Le(),[r,o]=p.useState(""),[i,a]=p.useState(""),d=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=p.useCallback(g=>{o(g.target.value),a("")},[]),l=p.useCallback(()=>{try{n.loadPosition(r.trim())?(t(),o(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[r,n,t]),h=p.useCallback(g=>{const v=typeof g=="function"?g():g;o(v),a("");try{n.loadPosition(v)?(t(),o("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[n,t]),u=p.useCallback(g=>{g.key==="Enter"&&r.trim()?l():g.key==="Escape"&&t()},[r,l,t]),f=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>qo.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?s.jsx(Ac,{$isOpen:e,onClick:t,children:s.jsxs(Dc,{onClick:g=>g.stopPropagation(),children:[s.jsx(Oc,{children:"Set Position from FEN"}),s.jsx(Bc,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),s.jsxs(ur,{children:[s.jsx(hr,{children:"Current position:"}),s.jsx(_c,{type:"text",value:d,readOnly:!0,onClick:g=>g.currentTarget.select()})]}),s.jsxs(ur,{children:[s.jsx(hr,{children:"Preset position:"}),f.map(g=>s.jsx(Hc,{onClick:()=>h(g.fen),children:g.name},g.name))]}),s.jsx(No,{type:"text",value:r,onChange:c,onKeyDown:u,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),i&&s.jsx(Fc,{children:i}),s.jsxs(Wc,{children:[s.jsx(dr,{onClick:t,children:"Cancel"}),s.jsx(dr,{$variant:"primary",onClick:l,disabled:!r.trim(),children:"Set Position"})]})]})}):null});Ao.displayName="FENDialog";const Gc=m.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Uc=m.div`
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
`,qc=m.div`
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
`,Yc=m.div`
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
`,Vc=m(Me)`
  width: 100%;
  height: 100%;
`,tt=Z(({orientation:e="horizontal",isWhitePieces:t=!0,className:n,boardSize:r,onPieceClick:o})=>{const{gameStore:i}=Le(),a=i.capturedPieces,d=t?a.white:a.black,c=p.useMemo(()=>{const u={};return d.forEach(f=>{u[f]=(u[f]||0)+1}),u},[d]),l=["p","n","b","r","q"],h=r?r/8:32;return s.jsx(Gc,{$orientation:e,$size:h,className:n,children:s.jsx(Uc,{$orientation:e,children:l.map(u=>{const f=c[u]||0,g=t?u.toUpperCase():u;return s.jsx(qc,{$size:h,onClick:f>0&&o?()=>o(g):void 0,style:{cursor:f>0&&o?"pointer":"default"},children:f>0&&s.jsxs(s.Fragment,{children:[s.jsx(Vc,{piece:g,size:h}),f>1&&s.jsx(Yc,{children:f})]})},u)})})})});tt.displayName="CapturedPieces";const Kc=m.div`
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
`,Xc=m.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Jc=m.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Qc=m.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Zc=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,pr=m.button`
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
`,el=({isOpen:e,title:t,message:n,confirmText:r="Confirm",cancelText:o="Cancel",onConfirm:i,onCancel:a})=>s.jsx(Kc,{$isOpen:e,onClick:a,children:s.jsxs(Xc,{onClick:d=>d.stopPropagation(),children:[s.jsx(Jc,{children:t}),s.jsx(Qc,{children:n}),s.jsxs(Zc,{children:[s.jsx(pr,{$variant:"secondary",onClick:a,children:o}),s.jsx(pr,{$variant:"primary",onClick:i,children:r})]})]})}),tl=m.div`
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
`,mr=m.div`
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
`;const nl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: center;
`,fr=m.div`
    width: ${e=>e.$size}px;
    height: ${e=>e.$size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`,rl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,ol=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,il=m.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Do=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Oo=m.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,sl=m(Do)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,al=m(Oo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 120px), calc(100vw - 400px));
    padding: 0 11px;
`,cl=m(Do)`
    margin-bottom: ${e=>e.theme.spacing[2]};
    padding: 0 30px;
    position: relative;
`,ll=m.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 10;
`,dl=m(Oo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,gr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,yr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,xr=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,br=m.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,$r=m.div`
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
`,ul=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,hl=m.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,pl=m.div`
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
`;const ml=m.div`
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
`;const fl=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[3]};
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: ${e=>e.theme.spacing[2]};
    width: 100%;
    position: relative;
`;m.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
`;const gl=m.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`,yl=m.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: ${e=>e.theme.colors.surface};
    border-radius: ${e=>e.theme.borderRadius.container};
    box-shadow: ${e=>e.theme.shadows.container};
    padding: 0 ${e=>e.theme.spacing[1]};
    width: 280px;
    
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
`;const vr=m.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;m(Wt)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const xl=m(Wt)`
    height: 135px;
    min-height: 135px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;m(ut)`
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
`;const wr=m.div`
    flex: 1;
    display: flex;
`;m(ut)`
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
`;const bl=m.div`
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
`;const $l=m.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,vl=m.div`
    display: flex;
    align-items: flex-start;
    padding-top: ${e=>{const t=e.$squareSize||0,n=24,r=40,o=(e.$squareSize||0)*.25;return t+n+r+8-o}}px;
`,Fo=Z(({className:e,hasChat:t=!1})=>{const n=$n(),r=Ye(),o=Lt(),i=Lr(),a=Yo();Bt();const[d,c]=p.useState(!1),[l,h]=p.useState(!1),[u,f]=p.useState(0),[g,v]=p.useState(!1),[b,k]=p.useState(!1),[y,j]=p.useState(null),R=r.preferences.chessOrientation==="landscape",P=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",M=p.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),D=p.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:r.preferences.showCapturedPieces,[n.currentGame?.variant,r.preferences.showCapturedPieces]),N=p.useCallback((F,J,Y)=>{try{n.makeMove(F,J,Y)||(console.error("Invalid move:",F,J),a.playIllegal())}catch(oe){console.error("Error making move:",oe),a.playIllegal()}},[n,a]),_=p.useCallback((F,J)=>{try{const Y=F.toLowerCase();n.makeSANMove(`${F.toUpperCase()}@${J}`)||(console.error("Invalid drop:",F,J),a.playIllegal())}catch(Y){console.error("Error making drop:",Y),a.playIllegal()}},[n,a]),H=p.useCallback(F=>{j(y===F?null:F)},[y]);p.useMemo(()=>{if(n.currentGameInfo){const{white:F,black:J,timeControl:Y,variant:oe}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${oe} ${Y}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const x=(()=>{const F=n.moveHistory.length;if(F>0){const J=n.moveHistory[F-1],Y=Math.ceil(F/2),oe=F%2===1,ie=rn(J.san);return`${Y}.${oe?"":".."} ${ie}`}return"Starting position"})(),$=n.currentOpening,w=n.currentGame,S=w||n.lastGameState,I=S?.white||{name:"White",rating:1500,time:900},B=S?.black||{name:"Black",rating:1500,time:900},U=!w||w.turn==="w",K=n.shouldShowFlippedBoard,le=K?I:B,q=K?B:I,se=K,ee=K?U:!U,ae=p.useCallback(F=>{n.goToMove(F)},[n]);p.useEffect(()=>{o.initialize()},[o]),p.useEffect(()=>{b&&n.isPlaying&&n.currentGame&&i.sendCommand("draw")},[n.moveHistory.length,b,n.isPlaying,i]),p.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&k(!1)},[n.currentGame,n.isPlaying]),p.useEffect(()=>{d&&o.isEngineReady?o.startAnalysis(P):o.stopAnalysis()},[d,P,o]);const be=p.useCallback(()=>{c(F=>!F)},[]),Se=p.useCallback(()=>{h(!0)},[]),$e=p.useCallback(()=>{r.updatePreference("boardFlipped",!r.preferences.boardFlipped)},[r]),C=p.useCallback(()=>{n.currentGame&&i.sendCommand(`unobs ${n.currentGame.gameId}`)},[i,n.currentGame]),A=p.useCallback(()=>{i.sendCommand("unexamine")},[i]),T=p.useCallback(()=>{v(!0)},[]),L=p.useCallback(()=>{i.sendCommand("resign"),v(!1)},[i]),z=p.useCallback(()=>{i.sendCommand("draw"),k(!b)},[i,b]),E=p.useCallback(()=>{i.sendCommand("abort")},[i]),W=()=>s.jsxs(s.Fragment,{children:[s.jsx(mr,{$orientation:"portrait",children:s.jsx(ul,{children:s.jsxs(hl,{children:[d&&s.jsx(vl,{$squareSize:u?u/8:0,children:s.jsx(yn,{orientation:"vertical",boardSize:u})}),s.jsxs(pl,{children:[s.jsx(fr,{$size:u?u/8:0}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[s.jsxs(cl,{children:[s.jsxs(gr,{children:["Game #",S?.gameId||"?"]}),s.jsx(yr,{children:S?.timeControl||"?"}),s.jsxs(ll,{children:[M==="playing"&&s.jsxs(s.Fragment,{children:[n.moveHistory.length<=1&&s.jsx(me,{onClick:E,$variant:"secondary",children:"Abort"}),s.jsx(me,{onClick:z,$variant:"secondary",children:"Draw"}),s.jsx(me,{onClick:T,$variant:"secondary",children:"Resign"}),s.jsx(Tn,{color:n.playingColor||"white",size:"small"})]}),M==="observing"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:C,$variant:"secondary",children:"Unobserve"}),s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"})]}),M==="examining"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:A,$variant:"secondary",children:"Unexamine"}),s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"})]}),M==="freestyle"&&s.jsxs(s.Fragment,{children:[s.jsx(me,{onClick:be,$variant:"secondary",children:"Analysis"}),s.jsx(me,{onClick:$e,$variant:"secondary",children:"Flip"}),s.jsx(me,{onClick:Se,$variant:"secondary",children:"FEN"})]})]})]}),s.jsxs(vr,{children:[s.jsx(et,{player:le,isActive:ee,size:"small",compact:!0}),s.jsx(wr,{children:s.jsx(Ze,{name:le.name,rating:le.rating,time:0,isActive:ee,isWhite:se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsx($r,{$orientation:"portrait",children:s.jsx(gn,{position:P,flipped:K,showCoordinates:!0,onMove:N,onDrop:_,interactive:M==="playing"||M==="freestyle"||M==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:y,onCapturedPieceSelect:j})}),s.jsxs(vr,{children:[s.jsx(et,{player:q,isActive:!ee,size:"small",compact:!0}),s.jsx(wr,{children:s.jsx(Ze,{name:q.name,rating:q.rating,time:0,isActive:!ee,isWhite:!se,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),s.jsxs(dl,{children:[s.jsx(xr,{children:n.premove?`Premove: ${Nn(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,P)}`:x!=="Starting position"?`Last move: ${x}`:"Last move: none"}),$&&s.jsx(br,{children:$})]}),d&&s.jsx($l,{children:s.jsx(xn,{})})]}),s.jsx(fr,{$size:u?u/8:0})]}),D&&s.jsx(ol,{$squareSize:u?u/8:0,children:s.jsxs(il,{$squareSize:u?u/8:0,children:[s.jsx(tt,{orientation:"vertical",isWhitePieces:K,boardSize:u,onPieceClick:H}),s.jsx(tt,{orientation:"vertical",isWhitePieces:!K,boardSize:u,onPieceClick:H})]})})]})})}),s.jsx(ml,{$orientation:"portrait",children:s.jsx(Wt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:ae,disableAutoScroll:!0,onNavigate:F=>{if(n.isExamining)switch(F){case"first":i.sendCommand("back 500");break;case"prev":i.sendCommand("back");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 500");break}else switch(F){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return s.jsxs(tl,{className:e,$orientation:R?"landscape":"portrait",$hasChat:t,children:[R?s.jsx(s.Fragment,{children:s.jsx(mr,{$orientation:"landscape",children:s.jsxs(fl,{$hasAnalysis:d,children:[s.jsxs(nl,{children:[s.jsxs(sl,{children:[s.jsxs(gr,{children:["Game #",S?.gameId||"?"]}),s.jsx(yr,{children:S?.timeControl||"?"})]}),s.jsxs(rl,{children:[d&&s.jsx(yn,{orientation:"vertical"}),s.jsx($r,{$orientation:"landscape",children:s.jsx(gn,{position:P,flipped:K,showCoordinates:!0,onMove:N,onDrop:_,interactive:M==="playing"||M==="freestyle"||M==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:y,onCapturedPieceSelect:j})})]}),s.jsxs(al,{children:[s.jsx(xr,{children:n.premove?`Premove: ${Nn(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,P)}`:x!=="Starting position"?`Last move: ${x}`:"Last move: none"}),$&&s.jsx(br,{children:$})]}),d&&s.jsx(bl,{children:s.jsx(xn,{})})]}),s.jsxs(gl,{children:[D&&s.jsx(tt,{orientation:"horizontal",isWhitePieces:se,boardSize:u,onPieceClick:H}),s.jsx(et,{player:le,isActive:ee,size:"small",compact:!0,variant:"landscape"}),s.jsxs(yl,{children:[s.jsx(Ze,{name:le.name,rating:le.rating,time:0,isActive:ee,isWhite:se,orientation:"vertical",hideClockInCard:!0,compact:!0}),s.jsx(To,{perspective:M,canAbort:n.moveHistory.length<=1,onAnalysis:be,onFlipBoard:$e,onSetupFEN:Se,onUnobserve:C,onUnexamine:A,onResign:T,onDraw:z,onAbort:E,isAnalysisActive:d,isDrawOffered:b}),s.jsx(xl,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:ae,showHeader:!1,onNavigate:F=>{if(n.isExamining)switch(F){case"first":i.sendCommand("backward 999");break;case"prev":i.sendCommand("backward");break;case"next":i.sendCommand("forward");break;case"last":i.sendCommand("forward 999");break}else switch(F){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),s.jsx(Ze,{name:q.name,rating:q.rating,time:0,isActive:!ee,isWhite:!se,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),s.jsx(et,{player:q,isActive:!ee,size:"small",compact:!0,variant:"landscape"}),D&&s.jsx(tt,{orientation:"horizontal",isWhitePieces:!se,boardSize:u,onPieceClick:H})]})]})})}):W(),s.jsx(Ao,{isOpen:l,onClose:()=>h(!1)}),s.jsx(el,{isOpen:g,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:L,onCancel:()=>v(!1)})]})});Fo.displayName="ChessGameLayout";const wl=m.div`
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
`,kl=m.div`
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
`,Cl=m.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,Sl=m.span`
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
`,Pl=m.button`
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
`,jl=m.span`
  font-size: 12px;
  opacity: 0.7;
`,Bo=Z(()=>{const{chatStore:e}=Le(),t=e.sortedTabs,[n,r]=re.useState(null),[o,i]=re.useState(null),a=(u,f)=>{r(f),u.dataTransfer.effectAllowed="move"},d=(u,f)=>{u.preventDefault(),u.dataTransfer.dropEffect="move",i(f)},c=()=>{i(null)},l=(u,f)=>{u.preventDefault(),n&&n!==f&&e.reorderTabs(n,f),r(null),i(null)},h=()=>{r(null),i(null)};return s.jsx(wl,{children:t.map(u=>s.jsxs(kl,{$active:u.id===e.activeTabId,$hasUnread:u.unreadCount>0,$dragging:u.id===n,$dragOver:u.id===o,draggable:!0,onDragStart:f=>a(f,u.id),onDragOver:f=>d(f,u.id),onDragLeave:c,onDrop:f=>l(f,u.id),onDragEnd:h,onClick:()=>e.setActiveTab(u.id),children:[u.type!=="console"&&s.jsx(jl,{$type:u.type}),s.jsx(Cl,{children:u.type==="channel"?`(${u.name})`:u.name}),u.unreadCount>0&&s.jsx(Sl,{children:u.unreadCount>99?"99+":u.unreadCount}),u.id!=="console"&&s.jsx(Pl,{onClick:f=>{f.stopPropagation(),e.closeTab(u.id)},title:"Close tab",children:"×"})]},u.id))})});Bo.displayName="ChatTabs";function Rl(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function El(e){e.scrollTop=e.scrollHeight}function Ml(e,t=10){Rl(e,t)&&El(e)}const kr=m.a`
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
`,Ll=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
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
`,Il=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Nl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Al=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,je=/(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,Cr=/["']([^"']+)["']/g,Sr=/\[(\w+)\]/g,Pr=new Set(["abort","accept","addlist","adjourn","alias","allobservers","assess","clear","set","backward","bell","best","boards","bsetup","bugwho","cbest","clearmessages","convert_bcf","convert_elo","convert_uscf","copygame","crank","cshout","date","decline","draw","examine","finger","flag","flip","fmessage","follow","forward","games","getgame","gnotify","goboard","handles","hbest","help","history","hrank","inchannel","index","info","it","jkill","jsave","kibitz","limits","llogons","logons","mailhelp","mailmess","mailmoves","mailoldmoves","mailsource","mailstored","match","messages","mexamine","moretime","moves","news","next","observe","oldmoves","open","password","pause","pending","pfollow","play","pobserve","promote","pstat","qtell","quit","rank","refresh","resign","resume","revert","say","seek","servers","set","shout","showadmins","showlist","simabort","simallabort","simadjourn","simalladjourn","simgames","simmatch","simnext","simobserve","simopen","simpass","simprev","smoves","smposition","sought","sposition","statistics","stored","style","sublist","switch","takeback","tell","time","unalias","unexamine","unobserve","unpause","unseek","uptime","variables","whisper","who","withdraw","xkibitz","xtell","xwhisper","znotify"]),Dl=/^(\w+(?:\([A-Z]\))?) \((?:\+{4}|-{4}|\+*\d+)\) seeking/;let tn=null,nn=null;const nt=({text:e,className:t,onCommandClick:n})=>{const r=[];if(!!!n){je.lastIndex=0;let x;for(;(x=je.exec(e))!==null;)r.push({type:"url",match:x[0],content:x[0],index:x.index,length:x[0].length});const $=[];let w=0;return r.forEach((S,I)=>{S.index>w&&$.push(e.substring(w,S.index));let B=S.content;S.content.match(/^(?:https?|ftp):\/\//)||S.content.includes(".")&&(B="https://"+S.content),$.push(s.jsx(kr,{href:B,target:"_blank",rel:"noopener noreferrer",onClick:U=>U.stopPropagation(),children:S.content},`url-${I}`)),w=S.index+S.length}),w<e.length&&$.push(e.substring(w)),s.jsx("span",{className:t,children:$.length>0?$:e})}const i=e.includes("players displayed")||/^\s*(?:\d{3,4}|----|\+{4})/.test(e)&&!e.match(/^\d{4}\s+\(/)&&!e.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/),a=/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+(?:\([A-Z]\))?\s+\d+\s+\d+\s+(?:unrated|rated)/.test(e)&&!e.includes("games displayed")&&!e.includes(" - "),d=e.includes("games displayed")||/^\s*\d{1,3}\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.test(e)&&e.includes(" - ")&&e.includes("(")&&!a,c=/^\s*Channel\s+\d+(?:\s+"[^"]+")?\s*:/.test(e)||/^\s*\\\s+\w+/.test(e),l=/\w+\s+\(\d+\)\s+vs\.\s+\w+\s+\(\d+\)/.test(e),h=/^Game \d+:/.test(e),u=/^\:\[\d{2}:\d{2}:\d{2}\]/.test(e),f=/^(?:Present company includes:|Your arrival was noted by:)/.test(e),g=/^\s*--\s+\w+\s+list:/.test(e),v=/^\s*\d+:\s*\w+(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.test(e),b=/^\s*Finger of\s+\w+/.test(e),k=/^\s*\d+:\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+\w+/.test(e)||/History for \w+:/.test(e),y=/^\s*%\d+:\s+\w+/.test(e)||/Journal for \w+:/.test(e),j=/\w+\s+\((?:\d+|\+{4})\)\s+seeking.*\("play\s+(\d+)"\s+to\s+respond\)/.test(e),R=/^\s*\d+\.\s+\w+\s+\d{4}/.test(e)||/^\s+\w+\s+\d{4}\s+\d+\.\s+\w+\s+\d{4}/.test(e),P=/^\d{4}\s+\(\w{3},\s+\w{3}\s+\d+\)/.test(e)||e.includes("Index of new news items:")||e.includes("Index of the last few news items:"),M=/^Notification:\s+\w+\s+has\s+(?:arrived|departed)/.test(e),D=/^\(told \d+ players? in channel \d+/.test(e)||/^\(told \w+\)/.test(e),N=e.length>10&&!e.match(/^\s/)&&!e.match(/^Channel\s+\d+/)&&!e.match(/^[A-Z]/)&&!e.match(/^\w+\s+\(\d+\)/)&&!e.match(/^Game\s+\d+/)&&!e.includes("displayed")&&!e.match(/^--/)&&!e.match(/^\d{4}\s+\(\w{3},/)&&!e.match(/^\d+\s+\(/)&&!e.match(/^\d+:\s+[+-=]/)&&!e.match(/^%\d+:/)&&e.split(/\s+/).length>3;if(j){const x=/\w+\s+\((?:\d+|\+{4})\)\s+seeking.*?\("play\s+(\d+)"\s+to\s+respond\)/g;let $;for(;($=x.exec(e))!==null;){const w=$[1];r.push({type:"command",match:$[0],content:`play ${w}`,index:$.index,length:$[0].length,isSeekLine:!0})}}else if((D||N)&&!P){je.lastIndex=0;let x;for(;(x=je.exec(e))!==null;)r.push({type:"url",match:x[0],content:x[0],index:x.index,length:x[0].length})}else if(i&&!d){const x=/(?:^|\s)((?:\d{3,4}|----|\+{4})\s*)([.^:#&]?)([A-Za-z]\w*)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g;let $;for(;($=x.exec(e))!==null;){const[w,S,I,B]=$,U=$.index+$[0].indexOf(B);r.push({type:"player",match:B,content:B,index:U,length:B.length})}}else if(d){const $=/^\s*(\d{1,3})\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.exec(e);if($){const w=$[1];r.push({type:"command",match:e,content:`observe ${w}`,index:0,length:e.length,isGamesLine:!0})}}else if(c)if(e.trim().startsWith("\\")){const x=e.substring(e.indexOf("\\")+1),$=/\{?(\w+)(?:\([A-Z*]+\))?\}?/g;let w;for(;(w=$.exec(x))!==null;){const S=w[1];if(!S||S.trim()==="")continue;const B=w[0].indexOf(S),U=e.indexOf("\\")+1+w.index+B;r.push({type:"player",match:S,content:S,index:U,length:S.length})}}else{const x=e.indexOf(":");if(x!==-1){const $=e.substring(x+1),w=/\{?(\w+)(?:\([A-Z*]+\))?\}?/g;let S;for(;(S=w.exec($))!==null;){const I=S[1];if(!I||I.trim()==="")continue;const U=S[0].indexOf(I),K=x+1+S.index+U;r.push({type:"player",match:I,content:I,index:K,length:I.length})}}}else if(l){const $=/(\w+)\s+\(\d+\)\s+vs\.\s+(\w+)\s+\(\d+\)/.exec(e);if($){const[w,S,I]=$,B=$.index,U=B+w.indexOf(S);r.push({type:"player",match:S,content:S,index:U,length:S.length});const K=B+w.indexOf(I);r.push({type:"player",match:I,content:I,index:K,length:I.length})}}else if(h){const $=/^Game \d+:\s+(\w+)\s+(?:offers|declines|accepts|requests|forfeits)/.exec(e);if($){const I=$[1],B=e.indexOf(I);r.push({type:"player",match:I,content:I,index:B,length:I.length})}const S=/Game \d+\s*\((\w+)\s+vs\.\s+(\w+)\)/.exec(e);if(S){const[I,B,U]=S,K=S.index,le=e.indexOf(B,K);r.push({type:"player",match:B,content:B,index:le,length:B.length});const q=e.indexOf(U,K);r.push({type:"player",match:U,content:U,index:q,length:U.length})}}else if(u){const $=/^\:\[\d{2}:\d{2}:\d{2}\]\s+(\w+):/.exec(e);if($){const S=$[1],I=e.indexOf(S,$.index);r.push({type:"player",match:S,content:S,index:I,length:S.length})}je.lastIndex=0;let w;for(;(w=je.exec(e))!==null;)r.push({type:"url",match:w[0],content:w[0],index:w.index,length:w[0].length})}else if(f){const x=e.indexOf(":");if(x!==-1){const $=e.substring(x+1),w=/(\w+)(?=\s|\.|\.|$)/g;let S;for(;(S=w.exec($))!==null;){const I=S[1],B=x+1+S.index;r.push({type:"player",match:I,content:I,index:B,length:I.length})}}}else if(g){if(!e.includes(" list:")){const x=/\b(\w+)\b/g;let $;for(;($=x.exec(e))!==null;){const w=$[1];r.push({type:"player",match:w,content:w,index:$.index,length:w.length})}}}else if(v){const $=/^\s*\d+:\s*(\w+)(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.exec(e);if($){const w=$[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else if(b){const $=/^\s*Finger of\s+(\w+)/.exec(e);if($){const w=$[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else if(k){const $=/History for (\w+):/.exec(e);if($)tn=$[1];else if(tn){const S=/^\s*(\d+):\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+(\w+)/.exec(e);if(S){const I=S[1];r.push({type:"command",match:e,content:`examine ${tn} ${I}`,index:0,length:e.length,isHistoryLine:!0})}}}else if(y){const $=/Journal for (\w+):/.exec(e);if($)nn=$[1];else if(nn){const S=/^(\s*)(%\d+):/.exec(e);if(S){const[I,B,U]=S;r.push({type:"command",match:e,content:`examine ${nn} ${U}`,index:0,length:e.length,isJournalLine:!0})}}}else if(a){const $=/^\s*(\d+)\s+(?:\d{3,4}|----|\+{4})\s+\w+/.exec(e);if($){const w=$[1];r.push({type:"command",match:e,content:`play ${w}`,index:0,length:e.length,isSoughtLine:!0})}}else if(R){if(!(e.includes("Blitz")&&e.includes("Standard")&&e.includes("Lightning"))){const x=/(?:(\d+)\.\s+)?(\w+)\s+(\d{4})/g;let $;for(;($=x.exec(e))!==null;){const[w,S,I,B]=$,U=$.index+(S?S.length+2:0);r.push({type:"player",match:I,content:I,index:U,length:I.length})}}}else if(P){if(!(e.includes("Index of new news items:")||e.includes("Index of the last few news items:"))){const $=/^(\d{4})\s+\(/.exec(e);if($){const w=$[1];n!=null&&r.push({type:"command",match:w,content:`news ${w}`,index:0,length:w.length})}}}else if(M){const $=/^Notification:\s+(\w+)\s+has\s+(?:arrived|departed)/.exec(e);if($){const w=$[1],S=e.indexOf(w);r.push({type:"player",match:w,content:w,index:S,length:w.length})}}else{je.lastIndex=0;let x;for(;(x=je.exec(e))!==null;)r.push({type:"url",match:x[0],content:x[0],index:x.index,length:x[0].length})}if(n!=null&&!i&&!d&&!c&&!l&&!h&&!u&&!f&&!g&&!v&&!b&&!k&&!y&&!a&&!R&&!P&&!M){const x=Dl.exec(e);if(x){const $=x[1];r.push({type:"player",match:$,content:$.replace(/\([A-Z]\)$/,""),index:0,length:$.length})}}if(n!=null){Cr.lastIndex=0;let x;for(;(x=Cr.exec(e))!==null;){const S=x[1].trim().split(/\s+/),I=S[0].toLowerCase();(Pr.has(I)||S.length>1&&Pr.has(I)&&S[1].startsWith("/"))&&r.push({type:"command",match:x[0],content:x[1],index:x.index,length:x[0].length})}Sr.lastIndex=0;let $;for(;($=Sr.exec(e))!==null;){const w=$[1].toLowerCase();["next","more","back","prev","previous","done","quit"].includes(w)&&r.push({type:"command",match:$[0],content:w,index:$.index,length:$[0].length})}}r.sort((x,$)=>x.index-$.index);const _=[];let H=0;return r.forEach((x,$)=>{if(x.index>H&&_.push(e.substring(H,x.index)),x.type==="url"){let w=x.content;x.content.match(/^(?:https?|ftp):\/\//)||x.content.includes(".")&&(w="https://"+x.content),_.push(s.jsx(kr,{href:w,target:"_blank",rel:"noopener noreferrer",onClick:S=>S.stopPropagation(),children:x.content},`url-${$}`))}else x.type==="command"?x.isHistoryLine?_.push(s.jsx(zl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to examine game: ${x.content}`,children:x.match},`hist-${$}`)):x.isJournalLine?_.push(s.jsx(Tl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to examine game: ${x.content}`,children:x.match},`journal-${$}`)):x.isSoughtLine?_.push(s.jsx(Il,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to play game: ${x.content}`,children:x.match},`sought-${$}`)):x.isGamesLine?_.push(s.jsx(Nl,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to observe game: ${x.content}`,children:x.match},`games-${$}`)):x.isSeekLine?_.push(s.jsx(Al,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to accept challenge: ${x.content}`,children:x.match},`seek-${$}`)):_.push(s.jsx(Ll,{onClick:w=>{w.stopPropagation(),n(x.content)},title:`Click to send: ${x.content}`,children:x.match},`cmd-${$}`)):x.type==="player"&&_.push(s.jsx(ht,{name:x.content},`player-${$}`));H=x.index+x.length}),H<e.length&&_.push(e.substring(H)),_.length===0?s.jsx("span",{className:t,children:e}):s.jsx("span",{className:t,children:_})};nt.displayName="LinkifiedText";const Ol=m.a`
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
`,Fl=m.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,jr=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Bl=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,Rr=m.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background-color: ${e=>e.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`,bn=({parsedMessage:e,className:t})=>{const{ficsStore:n}=Le(),{content:r,elements:o=[]}=e;if(o.length===0)return s.jsx("span",{className:t,children:r});const i=[];let a=0;return[...o].sort((c,l)=>c.start-l.start).forEach((c,l)=>{switch(c.start>a&&i.push(s.jsx("span",{children:r.substring(a,c.start)},`text-${l}`)),c.type){case"player":i.push(s.jsx(ht,{name:c.text},`player-${l}`));break;case"url":i.push(s.jsx(Ol,{href:c.action,target:"_blank",rel:"noopener noreferrer",onClick:g=>g.stopPropagation(),children:c.text},`url-${l}`));break;case"command":const h=c.action.startsWith("examine "),u=c.action.startsWith("play "),f=c.action.startsWith("observe ");h?i.push(s.jsx(Bl,{onClick:g=>{g.stopPropagation(),n.sendCommand(c.action)},title:`Click to ${c.action}`,children:c.text},`cmd-${l}`)):u?i.push(s.jsx(jr,{onClick:g=>{g.stopPropagation(),n.sendCommand(c.action)},title:`Click to accept challenge: ${c.action}`,children:c.text},`cmd-${l}`)):f?i.push(s.jsx(Rr,{onClick:g=>{g.stopPropagation(),n.sendCommand(c.action)},title:`Click to ${c.action}`,children:c.text},`cmd-${l}`)):i.push(s.jsx(Fl,{onClick:g=>{g.stopPropagation(),n.sendCommand(c.action)},title:`Click to send: ${c.action}`,children:c.text},`cmd-${l}`));break;case"seekNumber":i.push(s.jsx(jr,{onClick:g=>{g.stopPropagation(),n.sendCommand(c.action)},title:`Click to accept challenge: ${c.action}`,children:c.text},`seek-${l}`));break;case"gameNumber":i.push(s.jsx(Rr,{onClick:g=>{g.stopPropagation(),n.sendCommand(c.action)},title:`Click to observe game: ${c.action}`,children:c.text},`game-${l}`));break;default:i.push(s.jsx("span",{children:c.text},`unknown-${l}`))}a=c.end}),a<r.length&&i.push(s.jsx("span",{children:r.substring(a)},"text-final")),s.jsx("span",{className:t,children:i})};bn.displayName="InteractiveText";const yt=m.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,xt=m.div`
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
`,In=m.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: 10px;
  flex-shrink: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 50px;
`,Wl=m.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover ${In} {
    opacity: 1;
  }
`;m.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.spacing[1]};
`;const Er=m.div`
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
  
  &:hover ${In} {
    opacity: 1;
  }
`;m(In)`
  position: absolute;
  left: 0;
  top: 0;
  background: ${e=>e.theme.colors.background};
  padding: 0 4px;
  z-index: 1;
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
`;const Hl=m.span`
  color: ${e=>e.$isYou?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
`,_l=m.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`,Mr=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,Gl=m.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Wo=Z(({onMessageHover:e})=>{const{chatStore:t,ficsStore:n,preferencesStore:r}=Le(),o=p.useRef(null),i=t.activeTab,a=i?.messages||[],d=n.username||"You",c=h=>{n.sendCommand(h)};if(p.useEffect(()=>{if(o.current&&a.length>0){const h=o.current,u=setTimeout(()=>{i?.type==="console"?h.scrollTop=h.scrollHeight:Ml(h,50)},50);return()=>clearTimeout(u)}},[a.length,a[a.length-1]?.id]),p.useEffect(()=>{if(o.current&&a.length>0){const h=o.current;requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight})}},[i?.id]),!i)return s.jsx(yt,{children:s.jsx(xt,{className:"chat-messages-container",children:s.jsx(Mr,{children:"No active chat"})})});if(a.length===0)return s.jsx(yt,{children:s.jsx(xt,{className:"chat-messages-container",children:s.jsx(Mr,{children:i.type==="channel"?`No messages in (${i.name}) yet`:i.type==="private"?`No messages with ${i.name} yet`:"Connecting to freechess.org..."})})});const l=[];return a.forEach((h,u)=>{const f=u>0?a[u-1]:null,g=f?new Date(h.timestamp).getTime()-new Date(f.timestamp).getTime():1/0;f&&f.sender===h.sender&&f.type===h.type&&g<6e4?l[l.length-1].messages.push(h):l.push({sender:h.sender,timestamp:new Date(h.timestamp),messages:[h]})}),i.type==="console"?s.jsx(yt,{children:s.jsx(xt,{ref:o,className:"chat-messages-container",children:a.map(h=>{let u;if(h.metadata?.consoleType){const f=r.getConsoleColor(h.metadata.consoleType,h.metadata.channelNumber);f&&(u=f)}return s.jsx(Er,{$type:h.type,$color:u,onMouseEnter:()=>e?.(h.timestamp),onMouseLeave:()=>e?.(null),children:u?s.jsx("span",{style:{color:u},children:h.metadata?.parsedMessage?s.jsx(bn,{parsedMessage:h.metadata.parsedMessage}):s.jsx(nt,{text:h.content,onCommandClick:c})}):h.metadata?.parsedMessage?s.jsx(bn,{parsedMessage:h.metadata.parsedMessage}):s.jsx(nt,{text:h.content,onCommandClick:c})},h.id)})})}):s.jsx(yt,{children:s.jsx(xt,{ref:o,className:"chat-messages-container",children:l.map((h,u)=>{const f=h.messages[0],g=h.sender.toLowerCase()===d.toLowerCase();if(f.type==="system")return s.jsx(Gl,{children:h.messages.map((b,k)=>s.jsxs(re.Fragment,{children:[k>0&&`
`,s.jsx(nt,{text:b.content,onCommandClick:c})]},b.id))},u);let v;if(i.type==="channel"&&f.metadata?.consoleType==="channel"){const b=r.getConsoleColor(f.metadata.consoleType,f.metadata.channelNumber);b&&(v=b)}return s.jsx(Wl,{onMouseEnter:()=>e?.(h.timestamp),onMouseLeave:()=>e?.(null),children:s.jsxs(Er,{$type:f.type,$color:v,children:[s.jsx(Hl,{$isYou:g,children:g?h.sender:s.jsx(ht,{name:h.sender})}),s.jsx(_l,{children:h.messages.map((b,k)=>s.jsxs(re.Fragment,{children:[k>0&&`
`,s.jsx(nt,{text:b.content})]},b.id))})]})},u)})})})});Wo.displayName="ChatMessages";const Ul=m.div`
  display: flex;
  gap: ${e=>e.theme.spacing[2]};
  padding: ${e=>e.theme.spacing[2]};
  padding-top: ${e=>e.theme.spacing[1]};
  background-color: transparent;
  margin: ${e=>e.theme.spacing[2]};
  margin-top: 0;
`,ql=m.input`
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
`,Yl=m.button`
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
`,Ho=({value:e,onChange:t,onSend:n,onHistoryNavigate:r,placeholder:o="Type a message...",disabled:i=!1})=>{const a=p.useRef(null),d=l=>{l.key==="Enter"&&!l.shiftKey?(l.preventDefault(),e.trim()&&n(e.trim())):l.key==="ArrowUp"&&!e?(l.preventDefault(),r?.("up")):l.key==="ArrowDown"&&(l.preventDefault(),r?.("down"))},c=()=>{e.trim()&&n(e.trim())};return s.jsxs(Ul,{children:[s.jsx(ql,{ref:a,type:"text",value:e,onChange:l=>t(l.target.value),onKeyDown:d,placeholder:o,disabled:i,autoComplete:"off",spellCheck:"true"}),s.jsx(Yl,{onClick:c,disabled:i||!e.trim(),title:"Send message (Enter)",children:"Send"})]})};Ho.displayName="ChatInput";const Vl=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,Kl=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Xl=m.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Jl=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,Ql=m.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,Zl=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  padding: ${e=>e.theme.spacing[2]};
  padding-top: 0;
  padding-bottom: 0;
`,_o=Z(({className:e,compact:t=!1})=>{const{chatStore:n,ficsStore:r}=Le(),[o,i]=p.useState(""),[a,d]=p.useState(!1),[c,l]=p.useState(null);re.useEffect(()=>{!r.connected&&!r.connecting&&(console.log("Auto-connecting to FICS..."),r.connect())},[r]),re.useEffect(()=>{r.error&&n.addMessage("console",{channel:"console",sender:"System",content:`Error: ${r.error}`,timestamp:new Date,type:"system"})},[r.error,n]);const h=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!!f.trim()){if(n.addToHistory(f),f==="/help"||f==="\\help"){n.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),i("");return}if(n.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),f.startsWith("/")||f.startsWith("\\"))r.sendCommand(f.substring(1));else{const g=n.activeTab;if(!g)return;if(g.type==="channel"){const v=g.id.replace("channel-","");r.sendCommand(`tell ${v} ${f}`)}else g.type==="private"?r.sendCommand(`tell ${g.id} ${f}`):r.sendCommand(f)}i("")}},u=f=>{const g=n.navigateHistory(f);g!==null&&i(g)};return s.jsxs(Vl,{className:e,$compact:t,children:[!t&&s.jsxs(Kl,{children:[s.jsx(Xl,{children:"Chat"}),r.averagePing!==null&&s.jsxs(Ql,{children:["Ping: ",r.averagePing,"ms"]}),c&&s.jsxs(Jl,{children:["Received: ",new Date(c).toLocaleTimeString()]})]}),s.jsxs(Zl,{children:[s.jsx(Bo,{}),s.jsx(Wo,{onMessageHover:l}),s.jsx(Ho,{value:o,onChange:i,onSend:h,onHistoryNavigate:u,placeholder:n.activeTab?.type==="channel"?`Message (${n.activeTab.name})...`:n.activeTab?.type==="private"?`Message ${n.activeTab.name}...`:"Enter command..."})]})]})});_o.displayName="ChatPanel";const ed=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,td=m.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,nd=m.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,rd=m.div`
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
`,od=m.div`
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
`,Go=Z(()=>{const{preferencesStore:e}=Le(),{viewMode:t,autoViewMode:n}=e.preferences,r=Bt(),[o,i]=p.useState(600),[a,d]=p.useState(!1);p.useEffect(()=>{n&&(r.isMobile||r.isTablet?e.updatePreference("viewMode","chess-only"):e.updatePreference("viewMode","chess-and-chat"))},[r.isMobile,r.isTablet,n,e]);const c=f=>{f.preventDefault(),d(!0)};p.useEffect(()=>{if(!a)return;const f=v=>{const b=window.innerWidth-v.clientX;i(Math.max(300,Math.min(600,b))),window.dispatchEvent(new Event("resize"))},g=()=>{d(!1)};return document.addEventListener("mousemove",f),document.addEventListener("mouseup",g),()=>{document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",g)}},[a]);const l=t==="chess-only"||t==="chess-and-chat",h=t==="chat-only"||t==="chess-and-chat",u=t==="chess-and-chat"&&!r.isMobile;return s.jsxs(ed,{children:[s.jsx(Eo,{}),s.jsxs(td,{children:[s.jsx(nd,{$isVisible:l,children:s.jsx(Fo,{hasChat:h})}),u&&s.jsx(od,{$isVisible:!0,onMouseDown:c,style:{cursor:a?"col-resize":"ew-resize"}}),s.jsx(rd,{$isVisible:h,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:h&&!r.isMobile?`${o}px`:void 0},children:s.jsx(_o,{})})]})]})});Go.displayName="AppLayout";const id=Aa`
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
`,sd=()=>s.jsx(Vo,{children:s.jsxs(Oa,{children:[s.jsx(id,{}),s.jsx($s,{children:s.jsx(Xi,{children:s.jsx(Gr,{path:"/",element:s.jsx(Va,{children:s.jsx(Go,{})})})})})]})}),Uo=document.getElementById("root");if(!Uo)throw new Error("Root element not found");const ad=zr(Uo);ad.render(s.jsx(sd,{}));
