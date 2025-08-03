import{u as Le,j as o,a as Nn,b as Pe,c as Ht,d as On,e as hr,f as Wt,V as si,g as ai,l as Hr,R as ci}from"./shared-CoM7q7k3.js";import{a as li,r as h,R as Z}from"./vendor-B9TH31lo.js";import{o as q}from"./mobx-DYHm8Bkn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var Bn,Wr=li;Bn=Wr.createRoot,Wr.hydrateRoot;var Pr={};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.parse=gi;Pr.serialize=xi;const di=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,ui=/^[\u0021-\u003A\u003C-\u007E]*$/,hi=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,mi=/^[\u0020-\u003A\u003D-\u007E]*$/,pi=Object.prototype.toString,fi=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function gi(e,t){const r=new fi,n=e.length;if(n<2)return r;const i=t?.decode||yi;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const u=e.indexOf(";",s),c=u===-1?n:u;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const d=_r(e,s,a),m=Ur(e,a,d),f=e.slice(d,m);if(r[f]===void 0){let g=_r(e,a+1,c),p=Ur(e,c,g);const $=i(e.slice(g,p));r[f]=$}s=c+1}while(s<n);return r}function _r(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Ur(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function xi(e,t,r){const n=r?.encode||encodeURIComponent;if(!di.test(e))throw new TypeError(`argument name is invalid: ${e}`);const i=n(t);if(!ui.test(i))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+i;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!hi.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!mi.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!bi(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function yi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function bi(e){return pi.call(e)==="[object Date]"}var Gr="popstate";function $i(e={}){function t(n,i){let{pathname:s,search:a,hash:u}=n.location;return mr("",{pathname:s,search:a,hash:u},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(n,i){return typeof i=="string"?i:pt(i)}return wi(t,r,null,e)}function X(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function je(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function vi(){return Math.random().toString(36).substring(2,10)}function Yr(e,t){return{usr:e.state,key:e.key,idx:t}}function mr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?ot(t):t,state:r,key:t&&t.key||n||vi()}}function pt({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function ot(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function wi(e,t,r,n={}){let{window:i=document.defaultView,v5Compat:s=!1}=n,a=i.history,u="POP",c=null,d=m();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function m(){return(a.state||{idx:null}).idx}function f(){u="POP";let v=m(),y=v==null?null:v-d;d=v,c&&c({action:u,location:x.location,delta:y})}function g(v,y){u="PUSH";let k=mr(x.location,v,y);d=m()+1;let C=Yr(k,d),P=x.createHref(k);try{a.pushState(C,"",P)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;i.location.assign(P)}s&&c&&c({action:u,location:x.location,delta:1})}function p(v,y){u="REPLACE";let k=mr(x.location,v,y);d=m();let C=Yr(k,d),P=x.createHref(k);a.replaceState(C,"",P),s&&c&&c({action:u,location:x.location,delta:0})}function $(v){return ki(v)}let x={get action(){return u},get location(){return e(i,a)},listen(v){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(Gr,f),c=v,()=>{i.removeEventListener(Gr,f),c=null}},createHref(v){return t(i,v)},createURL:$,encodeLocation(v){let y=$(v);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:p,go(v){return a.go(v)}};return x}function ki(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),X(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:pt(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Hn(e,t,r="/"){return Si(e,t,r,!1)}function Si(e,t,r,n){let i=typeof t=="string"?ot(t):t,s=ze(i.pathname||"/",r);if(s==null)return null;let a=Wn(e);Ci(a);let u=null;for(let c=0;u==null&&c<a.length;++c){let d=Ai(s);u=Ii(a[c],d,n)}return u}function Wn(e,t=[],r=[],n=""){let i=(s,a,u)=>{let c={relativePath:u===void 0?s.path||"":u,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(X(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let d=Me([n,c.relativePath]),m=r.concat(c);s.children&&s.children.length>0&&(X(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Wn(s.children,t,m,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Li(d,s.index),routesMeta:m})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))i(s,a);else for(let u of _n(s.path))i(s,a,u)}),t}function _n(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,i=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return i?[s,""]:[s];let a=_n(n.join("/")),u=[];return u.push(...a.map(c=>c===""?s:[s,c].join("/"))),i&&u.push(...a),u.map(c=>e.startsWith("/")&&c===""?"/":c)}function Ci(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Ti(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var ji=/^:[\w-]+$/,Pi=3,Ri=2,Ei=1,Mi=10,zi=-2,Vr=e=>e==="*";function Li(e,t){let r=e.split("/"),n=r.length;return r.some(Vr)&&(n+=zi),t&&(n+=Ri),r.filter(i=>!Vr(i)).reduce((i,s)=>i+(ji.test(s)?Pi:s===""?Ei:Mi),n)}function Ti(e,t){return e.length===t.length&&e.slice(0,-1).every((n,i)=>n===t[i])?e[e.length-1]-t[t.length-1]:0}function Ii(e,t,r=!1){let{routesMeta:n}=e,i={},s="/",a=[];for(let u=0;u<n.length;++u){let c=n[u],d=u===n.length-1,m=s==="/"?t:t.slice(s.length)||"/",f=At({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},m),g=c.route;if(!f&&d&&r&&!n[n.length-1].route.index&&(f=At({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},m)),!f)return null;Object.assign(i,f.params),a.push({params:i,pathname:Me([s,f.pathname]),pathnameBase:Bi(Me([s,f.pathnameBase])),route:g}),f.pathnameBase!=="/"&&(s=Me([s,f.pathnameBase]))}return a}function At(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Di(e.path,e.caseSensitive,e.end),i=t.match(r);if(!i)return null;let s=i[0],a=s.replace(/(.)\/+$/,"$1"),u=i.slice(1);return{params:n.reduce((d,{paramName:m,isOptional:f},g)=>{if(m==="*"){let $=u[g]||"";a=s.slice(0,s.length-$.length).replace(/(.)\/+$/,"$1")}const p=u[g];return f&&!p?d[m]=void 0:d[m]=(p||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function Di(e,t=!1,r=!0){je(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,u,c)=>(n.push({paramName:u,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),n]}function Ai(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return je(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ze(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Fi(e,t="/"){let{pathname:r,search:n="",hash:i=""}=typeof e=="string"?ot(e):e;return{pathname:r?r.startsWith("/")?r:Ni(r,t):t,search:Hi(n),hash:Wi(i)}}function Ni(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?r.length>1&&r.pop():i!=="."&&r.push(i)}),r.length>1?r.join("/"):"/"}function Jt(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Oi(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Un(e){let t=Oi(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Gn(e,t,r,n=!1){let i;typeof e=="string"?i=ot(e):(i={...e},X(!i.pathname||!i.pathname.includes("?"),Jt("?","pathname","search",i)),X(!i.pathname||!i.pathname.includes("#"),Jt("#","pathname","hash",i)),X(!i.search||!i.search.includes("#"),Jt("#","search","hash",i)));let s=e===""||i.pathname==="",a=s?"/":i.pathname,u;if(a==null)u=r;else{let f=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),f-=1;i.pathname=g.join("/")}u=f>=0?t[f]:"/"}let c=Fi(i,u),d=a&&a!=="/"&&a.endsWith("/"),m=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||m)&&(c.pathname+="/"),c}var Me=e=>e.join("/").replace(/\/\/+/g,"/"),Bi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Hi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Wi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function _i(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Yn=["POST","PUT","PATCH","DELETE"];new Set(Yn);var Ui=["GET",...Yn];new Set(Ui);var it=h.createContext(null);it.displayName="DataRouter";var _t=h.createContext(null);_t.displayName="DataRouterState";var Vn=h.createContext({isTransitioning:!1});Vn.displayName="ViewTransition";var Gi=h.createContext(new Map);Gi.displayName="Fetchers";var Yi=h.createContext(null);Yi.displayName="Await";var Re=h.createContext(null);Re.displayName="Navigation";var yt=h.createContext(null);yt.displayName="Location";var Te=h.createContext({outlet:null,matches:[],isDataRoute:!1});Te.displayName="Route";var Rr=h.createContext(null);Rr.displayName="RouteError";function Vi(e,{relative:t}={}){X(bt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=h.useContext(Re),{hash:i,pathname:s,search:a}=$t(e,{relative:t}),u=s;return r!=="/"&&(u=s==="/"?r:Me([r,s])),n.createHref({pathname:u,search:a,hash:i})}function bt(){return h.useContext(yt)!=null}function Ye(){return X(bt(),"useLocation() may be used only in the context of a <Router> component."),h.useContext(yt).location}var qn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Kn(e){h.useContext(Re).static||h.useLayoutEffect(e)}function qi(){let{isDataRoute:e}=h.useContext(Te);return e?as():Ki()}function Ki(){X(bt(),"useNavigate() may be used only in the context of a <Router> component.");let e=h.useContext(it),{basename:t,navigator:r}=h.useContext(Re),{matches:n}=h.useContext(Te),{pathname:i}=Ye(),s=JSON.stringify(Un(n)),a=h.useRef(!1);return Kn(()=>{a.current=!0}),h.useCallback((c,d={})=>{if(je(a.current,qn),!a.current)return;if(typeof c=="number"){r.go(c);return}let m=Gn(c,JSON.parse(s),i,d.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:Me([t,m.pathname])),(d.replace?r.replace:r.push)(m,d.state,d)},[t,r,s,i,e])}h.createContext(null);function $t(e,{relative:t}={}){let{matches:r}=h.useContext(Te),{pathname:n}=Ye(),i=JSON.stringify(Un(r));return h.useMemo(()=>Gn(e,JSON.parse(i),n,t==="path"),[e,i,n,t])}function Xi(e,t){return Xn(e,t)}function Xn(e,t,r,n){X(bt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=h.useContext(Re),{matches:s}=h.useContext(Te),a=s[s.length-1],u=a?a.params:{},c=a?a.pathname:"/",d=a?a.pathnameBase:"/",m=a&&a.route;{let y=m&&m.path||"";Qn(c,!m||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let f=Ye(),g;if(t){let y=typeof t=="string"?ot(t):t;X(d==="/"||y.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${y.pathname}" was given in the \`location\` prop.`),g=y}else g=f;let p=g.pathname||"/",$=p;if(d!=="/"){let y=d.replace(/^\//,"").split("/");$="/"+p.replace(/^\//,"").split("/").slice(y.length).join("/")}let x=Hn(e,{pathname:$});je(m||x!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),je(x==null||x[x.length-1].route.element!==void 0||x[x.length-1].route.Component!==void 0||x[x.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=ts(x&&x.map(y=>Object.assign({},y,{params:Object.assign({},u,y.params),pathname:Me([d,i.encodeLocation?i.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?d:Me([d,i.encodeLocation?i.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),s,r,n);return t&&v?h.createElement(yt.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},v):v}function Qi(){let e=ss(),t=_i(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=h.createElement(h.Fragment,null,h.createElement("p",null,"💿 Hey developer 👋"),h.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",h.createElement("code",{style:s},"ErrorBoundary")," or"," ",h.createElement("code",{style:s},"errorElement")," prop on your route.")),h.createElement(h.Fragment,null,h.createElement("h2",null,"Unexpected Application Error!"),h.createElement("h3",{style:{fontStyle:"italic"}},t),r?h.createElement("pre",{style:i},r):null,a)}var Ji=h.createElement(Qi,null),Zi=class extends h.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?h.createElement(Te.Provider,{value:this.props.routeContext},h.createElement(Rr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function es({routeContext:e,match:t,children:r}){let n=h.useContext(it);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),h.createElement(Te.Provider,{value:e},r)}function ts(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,s=r?.errors;if(s!=null){let c=i.findIndex(d=>d.route.id&&s?.[d.route.id]!==void 0);X(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),i=i.slice(0,Math.min(i.length,c+1))}let a=!1,u=-1;if(r)for(let c=0;c<i.length;c++){let d=i[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=c),d.route.id){let{loaderData:m,errors:f}=r,g=d.route.loader&&!m.hasOwnProperty(d.route.id)&&(!f||f[d.route.id]===void 0);if(d.route.lazy||g){a=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}return i.reduceRight((c,d,m)=>{let f,g=!1,p=null,$=null;r&&(f=s&&d.route.id?s[d.route.id]:void 0,p=d.route.errorElement||Ji,a&&(u<0&&m===0?(Qn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,$=null):u===m&&(g=!0,$=d.route.hydrateFallbackElement||null)));let x=t.concat(i.slice(0,m+1)),v=()=>{let y;return f?y=p:g?y=$:d.route.Component?y=h.createElement(d.route.Component,null):d.route.element?y=d.route.element:y=c,h.createElement(es,{match:d,routeContext:{outlet:c,matches:x,isDataRoute:r!=null},children:y})};return r&&(d.route.ErrorBoundary||d.route.errorElement||m===0)?h.createElement(Zi,{location:r.location,revalidation:r.revalidation,component:p,error:f,children:v(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):v()},null)}function Er(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function rs(e){let t=h.useContext(it);return X(t,Er(e)),t}function ns(e){let t=h.useContext(_t);return X(t,Er(e)),t}function os(e){let t=h.useContext(Te);return X(t,Er(e)),t}function Mr(e){let t=os(e),r=t.matches[t.matches.length-1];return X(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function is(){return Mr("useRouteId")}function ss(){let e=h.useContext(Rr),t=ns("useRouteError"),r=Mr("useRouteError");return e!==void 0?e:t.errors?.[r]}function as(){let{router:e}=rs("useNavigate"),t=Mr("useNavigate"),r=h.useRef(!1);return Kn(()=>{r.current=!0}),h.useCallback(async(i,s={})=>{je(r.current,qn),r.current&&(typeof i=="number"?e.navigate(i):await e.navigate(i,{fromRouteId:t,...s}))},[e,t])}var qr={};function Qn(e,t,r){!t&&!qr[e]&&(qr[e]=!0,je(!1,r))}h.memo(cs);function cs({routes:e,future:t,state:r}){return Xn(e,void 0,r,t)}function Jn(e){X(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function ls({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:i,static:s=!1}){X(!bt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),u=h.useMemo(()=>({basename:a,navigator:i,static:s,future:{}}),[a,i,s]);typeof r=="string"&&(r=ot(r));let{pathname:c="/",search:d="",hash:m="",state:f=null,key:g="default"}=r,p=h.useMemo(()=>{let $=ze(c,a);return $==null?null:{location:{pathname:$,search:d,hash:m,state:f,key:g},navigationType:n}},[a,c,d,m,f,g,n]);return je(p!=null,`<Router basename="${a}"> is not able to match the URL "${c}${d}${m}" because it does not start with the basename, so the <Router> won't render anything.`),p==null?null:h.createElement(Re.Provider,{value:u},h.createElement(yt.Provider,{children:t,value:p}))}function ds({children:e,location:t}){return Xi(pr(e),t)}function pr(e,t=[]){let r=[];return h.Children.forEach(e,(n,i)=>{if(!h.isValidElement(n))return;let s=[...t,i];if(n.type===h.Fragment){r.push.apply(r,pr(n.props.children,s));return}X(n.type===Jn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),X(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=pr(n.props.children,s)),r.push(a)}),r}var Et="get",Mt="application/x-www-form-urlencoded";function Ut(e){return e!=null&&typeof e.tagName=="string"}function us(e){return Ut(e)&&e.tagName.toLowerCase()==="button"}function hs(e){return Ut(e)&&e.tagName.toLowerCase()==="form"}function ms(e){return Ut(e)&&e.tagName.toLowerCase()==="input"}function ps(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function fs(e,t){return e.button===0&&(!t||t==="_self")&&!ps(e)}var wt=null;function gs(){if(wt===null)try{new FormData(document.createElement("form"),0),wt=!1}catch{wt=!0}return wt}var xs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Zt(e){return e!=null&&!xs.has(e)?(je(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Mt}"`),null):e}function ys(e,t){let r,n,i,s,a;if(hs(e)){let u=e.getAttribute("action");n=u?ze(u,t):null,r=e.getAttribute("method")||Et,i=Zt(e.getAttribute("enctype"))||Mt,s=new FormData(e)}else if(us(e)||ms(e)&&(e.type==="submit"||e.type==="image")){let u=e.form;if(u==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||u.getAttribute("action");if(n=c?ze(c,t):null,r=e.getAttribute("formmethod")||u.getAttribute("method")||Et,i=Zt(e.getAttribute("formenctype"))||Zt(u.getAttribute("enctype"))||Mt,s=new FormData(u,e),!gs()){let{name:d,type:m,value:f}=e;if(m==="image"){let g=d?`${d}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else d&&s.append(d,f)}}else{if(Ut(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Et,n=null,i=Mt,a=e}return s&&i==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:i,formData:s,body:a}}function zr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function bs(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function $s(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function vs(e,t,r){let n=await Promise.all(e.map(async i=>{let s=t.routes[i.route.id];if(s){let a=await bs(s,r);return a.links?a.links():[]}return[]}));return Cs(n.flat(1).filter($s).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function Kr(e,t,r,n,i,s){let a=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,u=(c,d)=>r[d].pathname!==c.pathname||r[d].route.path?.endsWith("*")&&r[d].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,d)=>a(c,d)||u(c,d)):s==="data"?t.filter((c,d)=>{let m=n.routes[c.route.id];if(!m||!m.hasLoader)return!1;if(a(c,d)||u(c,d))return!0;if(c.route.shouldRevalidate){let f=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof f=="boolean")return f}return!0}):[]}function ws(e,t,{includeHydrateFallback:r}={}){return ks(e.map(n=>{let i=t.routes[n.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),r&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function ks(e){return[...new Set(e)]}function Ss(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function Cs(e,t){let r=new Set;return new Set(t),e.reduce((n,i)=>{let s=JSON.stringify(Ss(i));return r.has(s)||(r.add(s),n.push({key:s,link:i})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var js=new Set([100,101,204,205]);function Ps(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&ze(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Zn(){let e=h.useContext(it);return zr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Rs(){let e=h.useContext(_t);return zr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Lr=h.createContext(void 0);Lr.displayName="FrameworkContext";function eo(){let e=h.useContext(Lr);return zr(e,"You must render this element inside a <HydratedRouter> element"),e}function Es(e,t){let r=h.useContext(Lr),[n,i]=h.useState(!1),[s,a]=h.useState(!1),{onFocus:u,onBlur:c,onMouseEnter:d,onMouseLeave:m,onTouchStart:f}=t,g=h.useRef(null);h.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let x=y=>{y.forEach(k=>{a(k.isIntersecting)})},v=new IntersectionObserver(x,{threshold:.5});return g.current&&v.observe(g.current),()=>{v.disconnect()}}},[e]),h.useEffect(()=>{if(n){let x=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(x)}}},[n]);let p=()=>{i(!0)},$=()=>{i(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:at(u,p),onBlur:at(c,$),onMouseEnter:at(d,p),onMouseLeave:at(m,$),onTouchStart:at(f,p)}]:[!1,g,{}]}function at(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Ms({page:e,...t}){let{router:r}=Zn(),n=h.useMemo(()=>Hn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?h.createElement(Ls,{page:e,matches:n,...t}):null}function zs(e){let{manifest:t,routeModules:r}=eo(),[n,i]=h.useState([]);return h.useEffect(()=>{let s=!1;return vs(e,t,r).then(a=>{s||i(a)}),()=>{s=!0}},[e,t,r]),n}function Ls({page:e,matches:t,...r}){let n=Ye(),{manifest:i,routeModules:s}=eo(),{basename:a}=Zn(),{loaderData:u,matches:c}=Rs(),d=h.useMemo(()=>Kr(e,t,c,i,n,"data"),[e,t,c,i,n]),m=h.useMemo(()=>Kr(e,t,c,i,n,"assets"),[e,t,c,i,n]),f=h.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let $=new Set,x=!1;if(t.forEach(y=>{let k=i.routes[y.route.id];!k||!k.hasLoader||(!d.some(C=>C.route.id===y.route.id)&&y.route.id in u&&s[y.route.id]?.shouldRevalidate||k.hasClientLoader?x=!0:$.add(y.route.id))}),$.size===0)return[];let v=Ps(e,a);return x&&$.size>0&&v.searchParams.set("_routes",t.filter(y=>$.has(y.route.id)).map(y=>y.route.id).join(",")),[v.pathname+v.search]},[a,u,n,i,d,t,e,s]),g=h.useMemo(()=>ws(m,i),[m,i]),p=zs(m);return h.createElement(h.Fragment,null,f.map($=>h.createElement("link",{key:$,rel:"prefetch",as:"fetch",href:$,...r})),g.map($=>h.createElement("link",{key:$,rel:"modulepreload",href:$,...r})),p.map(({key:$,link:x})=>h.createElement("link",{key:$,...x})))}function Ts(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var to=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{to&&(window.__reactRouterVersion="7.6.3")}catch{}function Is({basename:e,children:t,window:r}){let n=h.useRef();n.current==null&&(n.current=$i({window:r,v5Compat:!0}));let i=n.current,[s,a]=h.useState({action:i.action,location:i.location}),u=h.useCallback(c=>{h.startTransition(()=>a(c))},[a]);return h.useLayoutEffect(()=>i.listen(u),[i,u]),h.createElement(ls,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:i})}var ro=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,no=h.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:i,reloadDocument:s,replace:a,state:u,target:c,to:d,preventScrollReset:m,viewTransition:f,...g},p){let{basename:$}=h.useContext(Re),x=typeof d=="string"&&ro.test(d),v,y=!1;if(typeof d=="string"&&x&&(v=d,to))try{let L=new URL(window.location.href),F=d.startsWith("//")?new URL(L.protocol+d):new URL(d),w=ze(F.pathname,$);F.origin===L.origin&&w!=null?d=w+F.search+F.hash:y=!0}catch{je(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=Vi(d,{relative:i}),[C,P,S]=Es(n,g),E=Ns(d,{replace:a,state:u,target:c,preventScrollReset:m,relative:i,viewTransition:f});function b(L){t&&t(L),L.defaultPrevented||E(L)}let R=h.createElement("a",{...g,...S,href:v||k,onClick:y||s?t:b,ref:Ts(p,P),target:c,"data-discover":!x&&r==="render"?"true":void 0});return C&&!x?h.createElement(h.Fragment,null,R,h.createElement(Ms,{page:k})):R});no.displayName="Link";var Ds=h.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:i=!1,style:s,to:a,viewTransition:u,children:c,...d},m){let f=$t(a,{relative:d.relative}),g=Ye(),p=h.useContext(_t),{navigator:$,basename:x}=h.useContext(Re),v=p!=null&&_s(f)&&u===!0,y=$.encodeLocation?$.encodeLocation(f).pathname:f.pathname,k=g.pathname,C=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;r||(k=k.toLowerCase(),C=C?C.toLowerCase():null,y=y.toLowerCase()),C&&x&&(C=ze(C,x)||C);const P=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let S=k===y||!i&&k.startsWith(y)&&k.charAt(P)==="/",E=C!=null&&(C===y||!i&&C.startsWith(y)&&C.charAt(y.length)==="/"),b={isActive:S,isPending:E,isTransitioning:v},R=S?t:void 0,L;typeof n=="function"?L=n(b):L=[n,S?"active":null,E?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let F=typeof s=="function"?s(b):s;return h.createElement(no,{...d,"aria-current":R,className:L,ref:m,style:F,to:a,viewTransition:u},typeof c=="function"?c(b):c)});Ds.displayName="NavLink";var As=h.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:i,state:s,method:a=Et,action:u,onSubmit:c,relative:d,preventScrollReset:m,viewTransition:f,...g},p)=>{let $=Hs(),x=Ws(u,{relative:d}),v=a.toLowerCase()==="get"?"get":"post",y=typeof u=="string"&&ro.test(u),k=C=>{if(c&&c(C),C.defaultPrevented)return;C.preventDefault();let P=C.nativeEvent.submitter,S=P?.getAttribute("formmethod")||a;$(P||C.currentTarget,{fetcherKey:t,method:S,navigate:r,replace:i,state:s,relative:d,preventScrollReset:m,viewTransition:f})};return h.createElement("form",{ref:p,method:v,action:x,onSubmit:n?c:k,...g,"data-discover":!y&&e==="render"?"true":void 0})});As.displayName="Form";function Fs(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function oo(e){let t=h.useContext(it);return X(t,Fs(e)),t}function Ns(e,{target:t,replace:r,state:n,preventScrollReset:i,relative:s,viewTransition:a}={}){let u=qi(),c=Ye(),d=$t(e,{relative:s});return h.useCallback(m=>{if(fs(m,t)){m.preventDefault();let f=r!==void 0?r:pt(c)===pt(d);u(e,{replace:f,state:n,preventScrollReset:i,relative:s,viewTransition:a})}},[c,u,d,r,n,t,e,i,s,a])}var Os=0,Bs=()=>`__${String(++Os)}__`;function Hs(){let{router:e}=oo("useSubmit"),{basename:t}=h.useContext(Re),r=is();return h.useCallback(async(n,i={})=>{let{action:s,method:a,encType:u,formData:c,body:d}=ys(n,t);if(i.navigate===!1){let m=i.fetcherKey||Bs();await e.fetch(m,r,i.action||s,{preventScrollReset:i.preventScrollReset,formData:c,body:d,formMethod:i.method||a,formEncType:i.encType||u,flushSync:i.flushSync})}else await e.navigate(i.action||s,{preventScrollReset:i.preventScrollReset,formData:c,body:d,formMethod:i.method||a,formEncType:i.encType||u,replace:i.replace,state:i.state,fromRouteId:r,flushSync:i.flushSync,viewTransition:i.viewTransition})},[e,t,r])}function Ws(e,{relative:t}={}){let{basename:r}=h.useContext(Re),n=h.useContext(Te);X(n,"useFormAction must be used inside a RouteContext");let[i]=n.matches.slice(-1),s={...$t(e||".",{relative:t})},a=Ye();if(e==null){s.search=a.search;let u=new URLSearchParams(s.search),c=u.getAll("index");if(c.some(m=>m==="")){u.delete("index"),c.filter(f=>f).forEach(f=>u.append("index",f));let m=u.toString();s.search=m?`?${m}`:""}}return(!e||e===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Me([r,s.pathname])),pt(s)}function _s(e,t={}){let r=h.useContext(Vn);X(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=oo("useViewTransitionState"),i=$t(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=ze(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=ze(r.nextLocation.pathname,n)||r.nextLocation.pathname;return At(i.pathname,a)!=null||At(i.pathname,s)!=null}[...js];const io={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Us={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},Gs={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},so={colors:Us,...io},Ys={colors:Gs,...io},Vs={light:so,dark:Ys},qs=so;var ne=function(){return ne=Object.assign||function(t){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},ne.apply(this,arguments)};function ft(e,t,r){if(r||arguments.length===2)for(var n=0,i=t.length,s;n<i;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var V="-ms-",mt="-moz-",_="-webkit-",ao="comm",Gt="rule",Tr="decl",Ks="@import",co="@keyframes",Xs="@layer",lo=Math.abs,Ir=String.fromCharCode,fr=Object.assign;function Qs(e,t){return re(e,0)^45?(((t<<2^re(e,0))<<2^re(e,1))<<2^re(e,2))<<2^re(e,3):0}function uo(e){return e.trim()}function Ee(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,r){return e.replace(t,r)}function zt(e,t,r){return e.indexOf(t,r)}function re(e,t){return e.charCodeAt(t)|0}function et(e,t,r){return e.slice(t,r)}function Se(e){return e.length}function ho(e){return e.length}function ct(e,t){return t.push(e),e}function Js(e,t){return e.map(t).join("")}function Xr(e,t){return e.filter(function(r){return!Ee(r,t)})}var Yt=1,tt=1,mo=0,be=0,J=0,st="";function Vt(e,t,r,n,i,s,a,u){return{value:e,root:t,parent:r,type:n,props:i,children:s,line:Yt,column:tt,length:a,return:"",siblings:u}}function Ae(e,t){return fr(Vt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ve(e){for(;e.root;)e=Ae(e.root,{children:[e]});ct(e,e.siblings)}function Zs(){return J}function ea(){return J=be>0?re(st,--be):0,tt--,J===10&&(tt=1,Yt--),J}function $e(){return J=be<mo?re(st,be++):0,tt++,J===10&&(tt=1,Yt++),J}function _e(){return re(st,be)}function Lt(){return be}function qt(e,t){return et(st,e,t)}function gr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ta(e){return Yt=tt=1,mo=Se(st=e),be=0,[]}function ra(e){return st="",e}function er(e){return uo(qt(be-1,xr(e===91?e+2:e===40?e+1:e)))}function na(e){for(;(J=_e())&&J<33;)$e();return gr(e)>2||gr(J)>3?"":" "}function oa(e,t){for(;--t&&$e()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return qt(e,Lt()+(t<6&&_e()==32&&$e()==32))}function xr(e){for(;$e();)switch(J){case e:return be;case 34:case 39:e!==34&&e!==39&&xr(J);break;case 40:e===41&&xr(e);break;case 92:$e();break}return be}function ia(e,t){for(;$e()&&e+J!==57;)if(e+J===84&&_e()===47)break;return"/*"+qt(t,be-1)+"*"+Ir(e===47?e:$e())}function sa(e){for(;!gr(_e());)$e();return qt(e,be)}function aa(e){return ra(Tt("",null,null,null,[""],e=ta(e),0,[0],e))}function Tt(e,t,r,n,i,s,a,u,c){for(var d=0,m=0,f=a,g=0,p=0,$=0,x=1,v=1,y=1,k=0,C="",P=i,S=s,E=n,b=C;v;)switch($=k,k=$e()){case 40:if($!=108&&re(b,f-1)==58){zt(b+=O(er(k),"&","&\f"),"&\f",lo(d?u[d-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:b+=er(k);break;case 9:case 10:case 13:case 32:b+=na($);break;case 92:b+=oa(Lt()-1,7);continue;case 47:switch(_e()){case 42:case 47:ct(ca(ia($e(),Lt()),t,r,c),c);break;default:b+="/"}break;case 123*x:u[d++]=Se(b)*y;case 125*x:case 59:case 0:switch(k){case 0:case 125:v=0;case 59+m:y==-1&&(b=O(b,/\f/g,"")),p>0&&Se(b)-f&&ct(p>32?Jr(b+";",n,r,f-1,c):Jr(O(b," ","")+";",n,r,f-2,c),c);break;case 59:b+=";";default:if(ct(E=Qr(b,t,r,d,m,i,u,C,P=[],S=[],f,s),s),k===123)if(m===0)Tt(b,t,E,E,P,s,f,u,S);else switch(g===99&&re(b,3)===110?100:g){case 100:case 108:case 109:case 115:Tt(e,E,E,n&&ct(Qr(e,E,E,0,0,i,u,C,i,P=[],f,S),S),i,S,f,u,n?P:S);break;default:Tt(b,E,E,E,[""],S,0,u,S)}}d=m=p=0,x=y=1,C=b="",f=a;break;case 58:f=1+Se(b),p=$;default:if(x<1){if(k==123)--x;else if(k==125&&x++==0&&ea()==125)continue}switch(b+=Ir(k),k*x){case 38:y=m>0?1:(b+="\f",-1);break;case 44:u[d++]=(Se(b)-1)*y,y=1;break;case 64:_e()===45&&(b+=er($e())),g=_e(),m=f=Se(C=b+=sa(Lt())),k++;break;case 45:$===45&&Se(b)==2&&(x=0)}}return s}function Qr(e,t,r,n,i,s,a,u,c,d,m,f){for(var g=i-1,p=i===0?s:[""],$=ho(p),x=0,v=0,y=0;x<n;++x)for(var k=0,C=et(e,g+1,g=lo(v=a[x])),P=e;k<$;++k)(P=uo(v>0?p[k]+" "+C:O(C,/&\f/g,p[k])))&&(c[y++]=P);return Vt(e,t,r,i===0?Gt:u,c,d,m,f)}function ca(e,t,r,n){return Vt(e,t,r,ao,Ir(Zs()),et(e,2,-2),0,n)}function Jr(e,t,r,n,i){return Vt(e,t,r,Tr,et(e,0,n),et(e,n+1,-1),n,i)}function po(e,t,r){switch(Qs(e,t)){case 5103:return _+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return _+e+e;case 4789:return mt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return _+e+mt+e+V+e+e;case 5936:switch(re(e,t+11)){case 114:return _+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return _+e+V+O(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return _+e+V+O(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return _+e+V+e+e;case 6165:return _+e+V+"flex-"+e+e;case 5187:return _+e+O(e,/(\w+).+(:[^]+)/,_+"box-$1$2"+V+"flex-$1$2")+e;case 5443:return _+e+V+"flex-item-"+O(e,/flex-|-self/g,"")+(Ee(e,/flex-|baseline/)?"":V+"grid-row-"+O(e,/flex-|-self/g,""))+e;case 4675:return _+e+V+"flex-line-pack"+O(e,/align-content|flex-|-self/g,"")+e;case 5548:return _+e+V+O(e,"shrink","negative")+e;case 5292:return _+e+V+O(e,"basis","preferred-size")+e;case 6060:return _+"box-"+O(e,"-grow","")+_+e+V+O(e,"grow","positive")+e;case 4554:return _+O(e,/([^-])(transform)/g,"$1"+_+"$2")+e;case 6187:return O(O(O(e,/(zoom-|grab)/,_+"$1"),/(image-set)/,_+"$1"),e,"")+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,_+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,_+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+_+e+e;case 4200:if(!Ee(e,/flex-|baseline/))return V+"grid-column-align"+et(e,t)+e;break;case 2592:case 3360:return V+O(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,i){return t=i,Ee(n.props,/grid-\w+-end/)})?~zt(e+(r=r[t].value),"span",0)?e:V+O(e,"-start","")+e+V+"grid-row-span:"+(~zt(r,"span",0)?Ee(r,/\d+/):+Ee(r,/\d+/)-+Ee(e,/\d+/))+";":V+O(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return Ee(n.props,/grid-\w+-start/)})?e:V+O(O(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,_+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Se(e)-1-t>6)switch(re(e,t+1)){case 109:if(re(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,"$1"+_+"$2-$3$1"+mt+(re(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~zt(e,"stretch",0)?po(O(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,i,s,a,u,c,d){return V+i+":"+s+d+(a?V+i+"-span:"+(u?c:+c-+s)+d:"")+e});case 4949:if(re(e,t+6)===121)return O(e,":",":"+_)+e;break;case 6444:switch(re(e,re(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+_+(re(e,14)===45?"inline-":"")+"box$3$1"+_+"$2$3$1"+V+"$2box$3")+e;case 100:return O(e,":",":"+V)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,"scroll-","scroll-snap-")+e}return e}function Ft(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function la(e,t,r,n){switch(e.type){case Xs:if(e.children.length)break;case Ks:case Tr:return e.return=e.return||e.value;case ao:return"";case co:return e.return=e.value+"{"+Ft(e.children,n)+"}";case Gt:if(!Se(e.value=e.props.join(",")))return""}return Se(r=Ft(e.children,n))?e.return=e.value+"{"+r+"}":""}function da(e){var t=ho(e);return function(r,n,i,s){for(var a="",u=0;u<t;u++)a+=e[u](r,n,i,s)||"";return a}}function ua(e){return function(t){t.root||(t=t.return)&&e(t)}}function ha(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Tr:e.return=po(e.value,e.length,r);return;case co:return Ft([Ae(e,{value:O(e.value,"@","@"+_)})],n);case Gt:if(e.length)return Js(r=e.props,function(i){switch(Ee(i,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ve(Ae(e,{props:[O(i,/:(read-\w+)/,":"+mt+"$1")]})),Ve(Ae(e,{props:[i]})),fr(e,{props:Xr(r,n)});break;case"::placeholder":Ve(Ae(e,{props:[O(i,/:(plac\w+)/,":"+_+"input-$1")]})),Ve(Ae(e,{props:[O(i,/:(plac\w+)/,":"+mt+"$1")]})),Ve(Ae(e,{props:[O(i,/:(plac\w+)/,V+"input-$1")]})),Ve(Ae(e,{props:[i]})),fr(e,{props:Xr(r,n)});break}return""})}}var ma={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},me={},rt=typeof process<"u"&&me!==void 0&&(me.REACT_APP_SC_ATTR||me.SC_ATTR)||"data-styled",fo="active",go="data-styled-version",Kt="6.1.19",Dr=`/*!sc*/
`,Nt=typeof window<"u"&&typeof document<"u",pa=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&me!==void 0&&me.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&me.REACT_APP_SC_DISABLE_SPEEDY!==""?me.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&me.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&me!==void 0&&me.SC_DISABLE_SPEEDY!==void 0&&me.SC_DISABLE_SPEEDY!==""&&me.SC_DISABLE_SPEEDY!=="false"&&me.SC_DISABLE_SPEEDY),fa={},Xt=Object.freeze([]),nt=Object.freeze({});function xo(e,t,r){return r===void 0&&(r=nt),e.theme!==r.theme&&e.theme||t||r.theme}var yo=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ga=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,xa=/(^-|-$)/g;function Zr(e){return e.replace(ga,"-").replace(xa,"")}var ya=/(a)(d)/gi,kt=52,en=function(e){return String.fromCharCode(e+(e>25?39:97))};function yr(e){var t,r="";for(t=Math.abs(e);t>kt;t=t/kt|0)r=en(t%kt)+r;return(en(t%kt)+r).replace(ya,"$1-$2")}var tr,bo=5381,Qe=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},$o=function(e){return Qe(bo,e)};function vo(e){return yr($o(e)>>>0)}function ba(e){return e.displayName||e.name||"Component"}function rr(e){return typeof e=="string"&&!0}var wo=typeof Symbol=="function"&&Symbol.for,ko=wo?Symbol.for("react.memo"):60115,$a=wo?Symbol.for("react.forward_ref"):60112,va={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},wa={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},So={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ka=((tr={})[$a]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},tr[ko]=So,tr);function tn(e){return("type"in(t=e)&&t.type.$$typeof)===ko?So:"$$typeof"in e?ka[e.$$typeof]:va;var t}var Sa=Object.defineProperty,Ca=Object.getOwnPropertyNames,rn=Object.getOwnPropertySymbols,ja=Object.getOwnPropertyDescriptor,Pa=Object.getPrototypeOf,nn=Object.prototype;function Co(e,t,r){if(typeof t!="string"){if(nn){var n=Pa(t);n&&n!==nn&&Co(e,n,r)}var i=Ca(t);rn&&(i=i.concat(rn(t)));for(var s=tn(e),a=tn(t),u=0;u<i.length;++u){var c=i[u];if(!(c in wa||r&&r[c]||a&&c in a||s&&c in s)){var d=ja(t,c);try{Sa(e,c,d)}catch{}}}}return e}function Ue(e){return typeof e=="function"}function Ar(e){return typeof e=="object"&&"styledComponentId"in e}function We(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function br(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function gt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function $r(e,t,r){if(r===void 0&&(r=!1),!r&&!gt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=$r(e[n],t[n]);else if(gt(t))for(var n in t)e[n]=$r(e[n],t[n]);return e}function Fr(e,t){Object.defineProperty(e,"toString",{value:t})}function Ge(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Ra=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,i=n.length,s=i;t>=s;)if((s<<=1)<0)throw Ge(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=i;a<s;a++)this.groupSizes[a]=0}for(var u=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(u,r[a])&&(this.groupSizes[t]++,u++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),i=n+r;this.groupSizes[t]=0;for(var s=n;s<i;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],i=this.indexOfGroup(t),s=i+n,a=i;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Dr);return r},e}(),It=new Map,Ot=new Map,Dt=1,St=function(e){if(It.has(e))return It.get(e);for(;Ot.has(Dt);)Dt++;var t=Dt++;return It.set(e,t),Ot.set(t,e),t},Ea=function(e,t){Dt=t+1,It.set(e,t),Ot.set(t,e)},Ma="style[".concat(rt,"][").concat(go,'="').concat(Kt,'"]'),za=new RegExp("^".concat(rt,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),La=function(e,t,r){for(var n,i=r.split(","),s=0,a=i.length;s<a;s++)(n=i[s])&&e.registerName(t,n)},Ta=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Dr),i=[],s=0,a=n.length;s<a;s++){var u=n[s].trim();if(u){var c=u.match(za);if(c){var d=0|parseInt(c[1],10),m=c[2];d!==0&&(Ea(m,d),La(e,m,c[3]),e.getTag().insertRules(d,i)),i.length=0}else i.push(u)}}},on=function(e){for(var t=document.querySelectorAll(Ma),r=0,n=t.length;r<n;r++){var i=t[r];i&&i.getAttribute(rt)!==fo&&(Ta(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Ia(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var jo=function(e){var t=document.head,r=e||t,n=document.createElement("style"),i=function(u){var c=Array.from(u.querySelectorAll("style[".concat(rt,"]")));return c[c.length-1]}(r),s=i!==void 0?i.nextSibling:null;n.setAttribute(rt,fo),n.setAttribute(go,Kt);var a=Ia();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},Da=function(){function e(t){this.element=jo(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,i=0,s=n.length;i<s;i++){var a=n[i];if(a.ownerNode===r)return a}throw Ge(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Aa=function(){function e(t){this.element=jo(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Fa=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),sn=Nt,Na={isServer:!Nt,useCSSOMInjection:!pa},Bt=function(){function e(t,r,n){t===void 0&&(t=nt),r===void 0&&(r={});var i=this;this.options=ne(ne({},Na),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Nt&&sn&&(sn=!1,on(this)),Fr(this,function(){return function(s){for(var a=s.getTag(),u=a.length,c="",d=function(f){var g=function(y){return Ot.get(y)}(f);if(g===void 0)return"continue";var p=s.names.get(g),$=a.getGroup(f);if(p===void 0||!p.size||$.length===0)return"continue";var x="".concat(rt,".g").concat(f,'[id="').concat(g,'"]'),v="";p!==void 0&&p.forEach(function(y){y.length>0&&(v+="".concat(y,","))}),c+="".concat($).concat(x,'{content:"').concat(v,'"}').concat(Dr)},m=0;m<u;m++)d(m);return c}(i)})}return e.registerId=function(t){return St(t)},e.prototype.rehydrate=function(){!this.server&&Nt&&on(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(ne(ne({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,i=r.target;return r.isServer?new Fa(i):n?new Da(i):new Aa(i)}(this.options),new Ra(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(St(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(St(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(St(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Oa=/&/g,Ba=/^\s*\/\/.*$/gm;function Po(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Po(r.children,t)),r})}function Ha(e){var t,r,n,i=nt,s=i.options,a=s===void 0?nt:s,u=i.plugins,c=u===void 0?Xt:u,d=function(g,p,$){return $.startsWith(r)&&$.endsWith(r)&&$.replaceAll(r,"").length>0?".".concat(t):g},m=c.slice();m.push(function(g){g.type===Gt&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Oa,r).replace(n,d))}),a.prefix&&m.push(ha),m.push(la);var f=function(g,p,$,x){p===void 0&&(p=""),$===void 0&&($=""),x===void 0&&(x="&"),t=x,r=p,n=new RegExp("\\".concat(r,"\\b"),"g");var v=g.replace(Ba,""),y=aa($||p?"".concat($," ").concat(p," { ").concat(v," }"):v);a.namespace&&(y=Po(y,a.namespace));var k=[];return Ft(y,da(m.concat(ua(function(C){return k.push(C)})))),k};return f.hash=c.length?c.reduce(function(g,p){return p.name||Ge(15),Qe(g,p.name)},bo).toString():"",f}var Wa=new Bt,vr=Ha(),Ro=Z.createContext({shouldForwardProp:void 0,styleSheet:Wa,stylis:vr});Ro.Consumer;Z.createContext(void 0);function wr(){return h.useContext(Ro)}var _a=function(){function e(t,r){var n=this;this.inject=function(i,s){s===void 0&&(s=vr);var a=n.name+s.hash;i.hasNameForId(n.id,a)||i.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Fr(this,function(){throw Ge(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=vr),this.name+t.hash},e}(),Ua=function(e){return e>="A"&&e<="Z"};function an(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Ua(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Eo=function(e){return e==null||e===!1||e===""},Mo=function(e){var t,r,n=[];for(var i in e){var s=e[i];e.hasOwnProperty(i)&&!Eo(s)&&(Array.isArray(s)&&s.isCss||Ue(s)?n.push("".concat(an(i),":"),s,";"):gt(s)?n.push.apply(n,ft(ft(["".concat(i," {")],Mo(s),!1),["}"],!1)):n.push("".concat(an(i),": ").concat((t=i,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in ma||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Fe(e,t,r,n){if(Eo(e))return[];if(Ar(e))return[".".concat(e.styledComponentId)];if(Ue(e)){if(!Ue(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var i=e(t);return Fe(i,t,r,n)}var s;return e instanceof _a?r?(e.inject(r,n),[e.getName(n)]):[e]:gt(e)?Mo(e):Array.isArray(e)?Array.prototype.concat.apply(Xt,e.map(function(a){return Fe(a,t,r,n)})):[e.toString()]}function zo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Ue(r)&&!Ar(r))return!1}return!0}var Ga=$o(Kt),Ya=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&zo(t),this.componentId=r,this.baseHash=Qe(Ga,r),this.baseStyle=n,Bt.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))i=We(i,this.staticRulesId);else{var s=br(Fe(this.rules,t,r,n)),a=yr(Qe(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var u=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,u)}i=We(i,a),this.staticRulesId=a}else{for(var c=Qe(this.baseHash,n.hash),d="",m=0;m<this.rules.length;m++){var f=this.rules[m];if(typeof f=="string")d+=f;else if(f){var g=br(Fe(f,t,r,n));c=Qe(c,g+m),d+=g}}if(d){var p=yr(c>>>0);r.hasNameForId(this.componentId,p)||r.insertRules(this.componentId,p,n(d,".".concat(p),void 0,this.componentId)),i=We(i,p)}}return i},e}(),xt=Z.createContext(void 0);xt.Consumer;function Va(e){var t=Z.useContext(xt),r=h.useMemo(function(){return function(n,i){if(!n)throw Ge(14);if(Ue(n)){var s=n(i);return s}if(Array.isArray(n)||typeof n!="object")throw Ge(8);return i?ne(ne({},i),n):n}(e.theme,t)},[e.theme,t]);return e.children?Z.createElement(xt.Provider,{value:r},e.children):null}var nr={};function qa(e,t,r){var n=Ar(e),i=e,s=!rr(e),a=t.attrs,u=a===void 0?Xt:a,c=t.componentId,d=c===void 0?function(P,S){var E=typeof P!="string"?"sc":Zr(P);nr[E]=(nr[E]||0)+1;var b="".concat(E,"-").concat(vo(Kt+E+nr[E]));return S?"".concat(S,"-").concat(b):b}(t.displayName,t.parentComponentId):c,m=t.displayName,f=m===void 0?function(P){return rr(P)?"styled.".concat(P):"Styled(".concat(ba(P),")")}(e):m,g=t.displayName&&t.componentId?"".concat(Zr(t.displayName),"-").concat(t.componentId):t.componentId||d,p=n&&i.attrs?i.attrs.concat(u).filter(Boolean):u,$=t.shouldForwardProp;if(n&&i.shouldForwardProp){var x=i.shouldForwardProp;if(t.shouldForwardProp){var v=t.shouldForwardProp;$=function(P,S){return x(P,S)&&v(P,S)}}else $=x}var y=new Ya(r,g,n?i.componentStyle:void 0);function k(P,S){return function(E,b,R){var L=E.attrs,F=E.componentStyle,w=E.defaultProps,N=E.foldedComponentIds,H=E.styledComponentId,A=E.target,U=Z.useContext(xt),oe=wr(),ie=E.shouldForwardProp||oe.shouldForwardProp,de=xo(b,U,w)||nt,K=function(ue,se,j){for(var D,T=ne(ne({},se),{className:void 0,theme:j}),I=0;I<ue.length;I+=1){var M=Ue(D=ue[I])?D(T):D;for(var z in M)T[z]=z==="className"?We(T[z],M[z]):z==="style"?ne(ne({},T[z]),M[z]):M[z]}return se.className&&(T.className=We(T.className,se.className)),T}(L,b,de),ve=K.as||A,pe={};for(var Q in K)K[Q]===void 0||Q[0]==="$"||Q==="as"||Q==="theme"&&K.theme===de||(Q==="forwardedAs"?pe.as=K.forwardedAs:ie&&!ie(Q,ve)||(pe[Q]=K[Q]));var fe=function(ue,se){var j=wr(),D=ue.generateAndInjectStyles(se,j.styleSheet,j.stylis);return D}(F,K),ge=We(N,H);return fe&&(ge+=" "+fe),K.className&&(ge+=" "+K.className),pe[rr(ve)&&!yo.has(ve)?"class":"className"]=ge,R&&(pe.ref=R),h.createElement(ve,pe)}(C,P,S)}k.displayName=f;var C=Z.forwardRef(k);return C.attrs=p,C.componentStyle=y,C.displayName=f,C.shouldForwardProp=$,C.foldedComponentIds=n?We(i.foldedComponentIds,i.styledComponentId):"",C.styledComponentId=g,C.target=n?i.target:e,Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=n?function(S){for(var E=[],b=1;b<arguments.length;b++)E[b-1]=arguments[b];for(var R=0,L=E;R<L.length;R++)$r(S,L[R],!0);return S}({},i.defaultProps,P):P}}),Fr(C,function(){return".".concat(C.styledComponentId)}),s&&Co(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),C}function cn(e,t){for(var r=[e[0]],n=0,i=t.length;n<i;n+=1)r.push(t[n],e[n+1]);return r}var ln=function(e){return Object.assign(e,{isCss:!0})};function Ce(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Ue(e)||gt(e))return ln(Fe(cn(Xt,ft([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Fe(n):ln(Fe(cn(n,t)))}function kr(e,t,r){if(r===void 0&&(r=nt),!t)throw Ge(1,t);var n=function(i){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,Ce.apply(void 0,ft([i],s,!1)))};return n.attrs=function(i){return kr(e,t,ne(ne({},r),{attrs:Array.prototype.concat(r.attrs,i).filter(Boolean)}))},n.withConfig=function(i){return kr(e,t,ne(ne({},r),i))},n}var Lo=function(e){return kr(qa,e)},l=Lo;yo.forEach(function(e){l[e]=Lo(e)});var Ka=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=zo(t),Bt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,i){var s=i(br(Fe(this.rules,r,n,i)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,i){t>2&&Bt.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,i)},e}();function Xa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Ce.apply(void 0,ft([e],t,!1)),i="sc-global-".concat(vo(JSON.stringify(n))),s=new Ka(n,i),a=function(c){var d=wr(),m=Z.useContext(xt),f=Z.useRef(d.styleSheet.allocateGSInstance(i)).current;return d.styleSheet.server&&u(f,c,d.styleSheet,m,d.stylis),Z.useLayoutEffect(function(){if(!d.styleSheet.server)return u(f,c,d.styleSheet,m,d.stylis),function(){return s.removeStyles(f,d.styleSheet)}},[f,c,d.styleSheet,m,d.stylis]),null};function u(c,d,m,f,g){if(s.isStatic)s.renderStyles(c,fa,m,g);else{var p=ne(ne({},d),{theme:xo(d,f,a.defaultProps)});s.renderStyles(c,p,m,g)}}return Z.memo(a)}const To=h.createContext(void 0),Io=()=>{const e=h.useContext(To);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Qa=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Ja=q(({children:e})=>{const t=Le(),r=t.preferences.theme||"system",i=r==="system"?Qa():r,s=Vs[i]||qs,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},u={theme:a,themeName:i,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=i==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:i==="dark"};return h.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),d=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",d),()=>c.removeEventListener("change",d)}},[r,t]),h.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([d,m])=>{typeof m=="string"?c.style.setProperty(`--color-${d}`,m):typeof m=="object"&&m!==null&&Object.entries(m).forEach(([f,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${d}-${f}`,g)})}),Object.entries(a.spacing).forEach(([d,m])=>{c.style.setProperty(`--spacing-${d}`,m)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${i}-theme`)}},[a,i]),o.jsx(To.Provider,{value:u,children:o.jsx(Va,{theme:a,children:e})})});function Za(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function ec(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var or=typeof window<"u",tc=function(e){h.useEffect(e,[])},rc=function(e){var t=h.useRef(e);t.current=e,tc(function(){return function(){return t.current()}})},nc=function(e){var t=h.useRef(0),r=h.useState(e),n=r[0],i=r[1],s=h.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){i(a)})},[]);return rc(function(){cancelAnimationFrame(t.current)}),[n,s]},Do=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,i=t.initialHeight,s=i===void 0?1/0:i,a=t.onChange,u=nc({width:or?window.innerWidth:n,height:or?window.innerHeight:s}),c=u[0],d=u[1];return h.useEffect(function(){if(or){var m=function(){var f=window.innerWidth,g=window.innerHeight;d({width:f,height:g}),a&&a(f,g)};return Za(window,"resize",m),function(){ec(window,"resize",m)}}},[]),c};const Nr=()=>{const{width:e=0,height:t=0}=Do();return{width:e,height:t}},oc=()=>{const{width:e=0,height:t=0}=Do();return e>t?"landscape":"portrait"},ic=()=>{const{width:e}=Nr(),{theme:t}=Io(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Ao=()=>{const[e,t]=h.useState(!1);return h.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},sc=()=>{const[e,t]=h.useState(!1),r=Ao(),{width:n}=Nr();return h.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),u=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||u&&c})())},[r,n]),e},Oe=()=>{const e=Nr(),t=oc(),r=ic(),n=Ao(),i=sc();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:i}},Fo=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},No=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},ac=()=>{const e=Oe(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},cc=h.createContext(void 0),lc=({children:e})=>{const t=Le(),r=Oe(),[n,i]=h.useState(!0),[s,a]=h.useState(["chat","moves"]),[u,c]=h.useState(!1),d=t.preferences.layout,m=h.useMemo(()=>d==="auto"?r.orientation:d,[d,r.orientation]),f=h.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=x=>{t.updatePreference("layout",x)},p=x=>{a(v=>v.includes(x)?v.filter(y=>y!==x):[...v,x])};h.useEffect(()=>{c(!0),i(v=>{const y=!f;return v!==y?y:v}),a(v=>{if(f&&m==="portrait"){const y=["chat"];return JSON.stringify(v)!==JSON.stringify(y)?y:v}else if(m==="landscape"&&!f){const y=["chat","moves","analysis"];return JSON.stringify(v)!==JSON.stringify(y)?y:v}return v});const x=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(x)},[m,f]);const $={...r,layoutPreference:d,setLayoutPreference:g,activeLayout:m,isCompactMode:f,showSidebar:n,setSidebarVisible:i,activePanels:s,togglePanel:p,isTransitioning:u};return o.jsx(cc.Provider,{value:$,children:e})};l.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: ${({isTransitioning:e,theme:t})=>e?`all ${t.transitions.normal}`:"none"};
`;l.main`
    flex: 1;
    display: flex;
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?Ce`
                flex-direction: column;
            `:Ce`
                flex-direction: row;
            `}
`;l.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?Ce`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `:Ce`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `}
`;l.aside`
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`all ${e.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout:e,isCompactMode:t,showSidebar:r})=>r?e==="portrait"||t?Ce`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme:n})=>n.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `:Ce`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme:n})=>n.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `:Ce`
                width: 0;
                height: 0;
                opacity: 0;
                border: none;
            `}
`;l.div`
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
`;l.div`
    display: flex;
    flex-direction: ${({direction:e})=>e||"row"};
    justify-content: ${({justify:e})=>e||"start"};
    align-items: ${({align:e})=>e||"stretch"};
    gap: ${({gap:e,theme:t})=>e||t.spacing.md};
    flex-wrap: ${({wrap:e})=>e?"wrap":"nowrap"};

    @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
        flex-direction: column;
    }
`;l.div`
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
        `)),Ce`${n}`}}
`;l.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;l.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    background: ${({theme:e})=>e.colors.background};
`;l.header`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
`;l.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme:e})=>e.spacing.lg};
    min-height: 0; // Important for flexbox to allow shrinking
`;l.aside`
    width: ${({width:e,$isCollapsed:t})=>t?"0px":`${e}px`};
    height: 100vh;
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-left: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`width ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;l.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.sm};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.sm};
    flex-shrink: 0;
`;l.button`
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
`;l.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.md};
`;l.div`
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
`;l.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;l.header`
    height: 50px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
`;l.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme:e})=>e.colors.background};
    padding: ${({theme:e})=>e.spacing.sm};
    min-height: 0; // Important for flexbox
    max-height: 65vh; // Leave room for bottom panels
`;l.div`
    height: ${({$isExpanded:e,$panelHeight:t})=>e?`${t}px`:"60px"};
    background: ${({theme:e})=>e.colors.backgroundSecondary};
    border-top: 1px solid ${({theme:e})=>e.colors.border};
    transition: ${({theme:e})=>`height ${e.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;l.div`
    height: 60px;
    padding: ${({theme:e})=>e.spacing.xs} ${({theme:e})=>e.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing.xs};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    background: ${({theme:e})=>e.colors.backgroundTertiary};
    overflow-x: auto;
    flex-shrink: 0;
`;l.button`
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
`;l.button`
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
`;l.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme:e})=>e.spacing.sm};
`;l.div`
    width: 100%;
    height: 100%;
    touch-action: pan-y; // Allow vertical scrolling but capture horizontal swipes
`;l.button`
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
`;const dc=l.input`
  display: none;
`,uc=l.button`
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
`,hc=({settingId:e,onUpload:t})=>{const r=h.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const d=new FileReader;d.onload=m=>{const f=m.target?.result;t(e,f,a.name)},d.readAsDataURL(a),r.current&&(r.current.value="")},i=()=>{r.current?.click()};return o.jsxs(o.Fragment,{children:[o.jsx(dc,{ref:r,type:"file",accept:"audio/*",onChange:n}),o.jsx(uc,{type:"button",onClick:i,children:"Upload"})]})},mc=l.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,pc=l.div`
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
`,fc=l.div`
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
`,gc=l.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,xc=l.button`
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
`,yc=l.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,bc=l.input`
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
`,$c=l.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,vc=l.div`
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
`,wc=l.button`
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
`,kc=l.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,Sc=l.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,Cc=l.div`
  margin-bottom: ${e=>e.theme.spacing[6]};
`,dn=l.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[3]} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`,jc=l.div`
  flex: 1;
  margin-right: ${e=>e.theme.spacing[4]};
`,un=l.label`
  display: block;
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing[1]};
`,hn=l.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,Pc=l.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,Rc=l.input`
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
`,Ec=l.select`
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
`,Mc=l.input`
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
`,zc=l.input`
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
`,Lc=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Tc=l.textarea`
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
`,Ic=l.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,Dc=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Ac=l.button`
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
`,mn=l.button`
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
`,Fc=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Nc=l.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Oc=l.p`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,ir=l.button`
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
`,Oo=q(({isOpen:e,onClose:t})=>{const r=Le(),{settingsRegistry:n}=r,i=Oe(),s=i.isMobileDevice||i.dimensions.width<768,[a,u]=h.useState("board"),[c,d]=h.useState(""),[m,f]=h.useState({}),[g,p]=h.useState({x:0,y:0}),[$,x]=h.useState(!1),[v,y]=h.useState({x:0,y:0}),k=h.useRef(null);if(h.useEffect(()=>{if(e&&k.current&&!s){const w=k.current.getBoundingClientRect();p({x:(window.innerWidth-w.width)/2,y:(window.innerHeight-w.height)/2})}},[e,s]),h.useEffect(()=>{if(!$)return;const w=H=>{p({x:H.clientX-v.x,y:H.clientY-v.y})},N=()=>{x(!1)};return document.addEventListener("mousemove",w),document.addEventListener("mouseup",N),()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",N)}},[$,v]),!e)return null;const C=n.getAllCategories(),P=c?n.search(c):n.getByCategory(a),S=(w,N)=>{const H=n.get(w);if(H){if(H.validate){const A=H.validate(N);if(typeof A=="string"){f(U=>({...U,[w]:A}));return}else if(A===!1){f(U=>({...U,[w]:"Invalid value"}));return}}f(A=>{const U={...A};return delete U[w],U}),H.value=N,H.onChange?.(N),w in r.preferences&&r.updatePreference(w,N)}},E=w=>{const N=n.get(w);N&&S(w,N.defaultValue)},b=(w,N,H)=>{const A=JSON.parse(localStorage.getItem("customSounds")||"{}"),U=`custom_${w}_${Date.now()}`;A[U]={dataUrl:N,fileName:H,settingId:w,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(A)),S(w,U);const oe=n.get(w);if(oe&&oe.options){const ie={label:`Custom: ${H}`,value:U},de=oe.options.filter(K=>!K.value.startsWith("custom_"));oe.options=[...de,ie]}},R=w=>{if(!(!w||w==="none"))try{let N;if(w.startsWith("custom_")){const U=JSON.parse(localStorage.getItem("customSounds")||"{}")[w];if(U&&U.dataUrl)N=U.dataUrl;else{console.error("Custom sound not found:",w);return}}else N=`/sounds/${w}`;const H=new Audio(N);H.volume=.5,H.play().catch(A=>{console.error("Failed to play sound:",A)})}catch(N){console.error("Error playing sound:",N)}},L=w=>{s||(x(!0),y({x:w.clientX-g.x,y:w.clientY-g.y}))},F=w=>{switch(w.type){case"boolean":return o.jsx(Rc,{type:"checkbox",checked:w.value,onChange:A=>S(w.id,A.target.checked),$isMobile:s});case"select":if(w.id.endsWith("SoundFile")){const A=w.options?.find(ie=>ie.value===w.value),U=A?A.label:"None",oe=w.value&&w.value!=="none";return o.jsxs(Lc,{children:[o.jsx(Dc,{children:U}),o.jsx(Ac,{type:"button",onClick:()=>R(w.value),disabled:!oe,title:oe?"Play sound":"No sound selected",children:"▶️ Play"}),o.jsx(hc,{settingId:w.id,onUpload:b})]})}else return o.jsx(Ec,{value:w.value,onChange:A=>S(w.id,A.target.value),children:w.options?.map(A=>o.jsx("option",{value:A.value,children:A.label},A.value))});case"number":return o.jsx(Mc,{type:"number",value:w.value,min:w.min,max:w.max,step:w.step,onChange:A=>S(w.id,Number(A.target.value))});case"color":return o.jsx(zc,{type:"color",value:w.value,onChange:A=>S(w.id,A.target.value),$isMobile:s});case"text":const H=!!m[w.id];return o.jsxs("div",{style:{width:"100%"},children:[o.jsx(Tc,{value:w.value||"",onChange:A=>S(w.id,A.target.value),className:H?"error":"",placeholder:w.placeholder||"",spellCheck:!1}),H&&o.jsx(Ic,{children:m[w.id]})]});default:return null}};return o.jsx(mc,{children:o.jsxs(pc,{ref:k,$x:g.x,$y:g.y,$isMobile:s,children:[o.jsxs(fc,{onMouseDown:L,children:[o.jsx(gc,{children:"⚙️ Settings"}),o.jsx(xc,{onClick:t,onMouseDown:w=>w.stopPropagation(),children:"✕"})]}),o.jsx(yc,{children:o.jsx(bc,{type:"text",placeholder:"Search settings...",value:c,onChange:w=>d(w.target.value)})}),o.jsxs($c,{$isMobile:s,children:[o.jsx(vc,{$isMobile:s,children:C.map(w=>o.jsxs(wc,{$active:a===w.id&&!c,$isMobile:s,onClick:()=>{u(w.id),d("")},children:[o.jsx(kc,{children:w.icon}),!s&&w.label]},w.id))}),o.jsxs(Sc,{children:[c&&o.jsxs(Oc,{children:["Found ",P.length,' settings matching "',c,'"']}),o.jsx(Cc,{children:P.map(w=>w.type==="text"?o.jsxs(dn,{style:{flexDirection:"column",alignItems:"stretch"},children:[o.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[o.jsxs("div",{children:[o.jsx(un,{children:w.label}),w.description&&o.jsx(hn,{children:w.description})]}),w.value!==w.defaultValue&&o.jsx(mn,{type:"button",onClick:()=>E(w.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),F(w)]},w.id):o.jsxs(dn,{children:[o.jsxs(jc,{children:[o.jsx(un,{children:w.label}),w.description&&o.jsx(hn,{children:w.description})]}),o.jsxs(Pc,{children:[F(w),w.value!==w.defaultValue&&o.jsx(mn,{type:"button",onClick:()=>E(w.id),title:"Reset to default",children:"↻"})]})]},w.id))})]})]}),o.jsxs(Fc,{children:[o.jsx(ir,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),o.jsxs(Nc,{children:[o.jsx(ir,{onClick:t,children:"Cancel"}),o.jsx(ir,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});Oo.displayName="SettingsDialog";const Bc=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  padding: 1rem;
`,Hc=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Wc=l.h3`
  margin: 0;
  font-size: 1.1rem;
`,_c=l.select`
  background: ${e=>e.theme.colors.backgroundSecondary};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`,Uc=l.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,Gc=l.div`
  padding: 0.5rem;
  background: ${e=>e.theme.colors.surface};
  border-radius: 4px;
  border-left: 3px solid ${e=>e.theme.colors.primary};
`,Yc=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.textSecondary};
`,Vc=l.span`
  font-weight: bold;
  color: ${e=>e.theme.colors.primary};
`,qc=l.span`
  font-size: 0.8rem;
`,Kc=l.div`
  font-size: 0.9rem;
  line-height: 1.4;
`,pn=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.textSecondary};
`,Xc=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.error};
`,Qc=l.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Jc=l.div`
  font-size: 0.8rem;
  color: ${e=>e.$healthy?e.theme.colors.success:e.theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`,Zc=l.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$healthy?e.theme.colors.success:e.theme.colors.error};
`,el=[39,49,50,10,1,2,36,37,38,40],tl=q(()=>{const e=Nn(),[t,r]=h.useState(39),[n,i]=h.useState(0),s=50;h.useEffect(()=>{e.loadChannelMessages(t,s,n)},[t,e]);const a=p=>{const $=parseInt(p.target.value);r($),i(0)},u=()=>{const p=n+s;i(p),e.loadChannelMessages(t,s,p)},c=e.getChannelMessages(t),d=e.isChannelLoading(t),m=e.getChannelError(t),f=p=>new Date(p).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),g=p=>o.jsxs(Gc,{children:[o.jsxs(Yc,{children:[o.jsx(Vc,{children:p.username}),o.jsx(qc,{children:f(p.timestamp)})]}),o.jsx(Kc,{children:p.message})]},p.id);return o.jsxs(Bc,{children:[o.jsxs(Hc,{children:[o.jsx(Wc,{children:"Channel History"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[o.jsx(_c,{value:t,onChange:a,children:el.map(p=>o.jsxs("option",{value:p,children:["Channel ",p]},p))}),o.jsxs(Jc,{$healthy:e.isBackendHealthy,children:[o.jsx(Zc,{$healthy:e.isBackendHealthy}),e.isBackendHealthy?"Connected":"Disconnected"]})]})]}),o.jsxs(Uc,{children:[m&&o.jsxs(Xc,{children:["Error: ",m]}),!m&&c.length===0&&!d&&o.jsx(pn,{children:"No messages found for this channel."}),c.map(g),d&&o.jsx(pn,{children:"Loading messages..."}),!d&&c.length>0&&c.length>=n+s&&o.jsx(Qc,{onClick:u,disabled:d,children:"Load More"})]})]})}),rl=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  padding: 1rem;
`,nl=l.div`
  margin-bottom: 1rem;
`,ol=l.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`,il=l.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,sl=l.input`
  flex: 1;
  background: ${e=>e.theme.colors.backgroundSecondary};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &::placeholder {
    color: ${e=>e.theme.colors.textSecondary};
  }
`,al=l.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,cl=l.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,ll=l.div`
  padding: 0.75rem;
  background: ${e=>e.theme.colors.surface};
  border-radius: 4px;
  border-left: 3px solid ${e=>e.theme.colors.primary};
`,dl=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`,ul=l.div`
  font-weight: bold;
  color: ${e=>e.theme.colors.primary};
`,hl=l.span`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.textSecondary};
`,ml=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  font-size: 0.85rem;
`,qe=l.div`
  display: flex;
  flex-direction: column;
`,Ke=l.span`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 0.8rem;
`,Xe=l.span`
  color: ${e=>e.theme.colors.text};
`,sr=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.textSecondary};
`,pl=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.error};
`,fl=l.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,gl=q(()=>{const e=Nn(),[t,r]=h.useState(""),[n,i]=h.useState(""),[s,a]=h.useState(0),u=50,c=x=>{x.preventDefault(),t.trim()&&(i(t.trim()),a(0),e.loadUserHistory(t.trim(),u,0))},d=()=>{const x=s+u;a(x),e.loadUserHistory(n,u,x)},m=n?e.getUserHistory(n):[],f=n?e.isUserLoading(n):!1,g=n?e.getUserError(n):null,p=x=>new Date(x).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),$=x=>o.jsxs(ll,{children:[o.jsxs(dl,{children:[o.jsxs(ul,{children:[x.title&&`${x.title} `,x.username," (",x.rating,")"]}),o.jsx(hl,{children:p(x.timestamp)})]}),o.jsxs(ml,{children:[o.jsxs(qe,{children:[o.jsx(Ke,{children:"Status"}),o.jsx(Xe,{children:x.status})]}),x.rating_type&&o.jsxs(qe,{children:[o.jsx(Ke,{children:"Rating Type"}),o.jsx(Xe,{children:x.rating_type})]}),x.flags&&o.jsxs(qe,{children:[o.jsx(Ke,{children:"Flags"}),o.jsx(Xe,{children:x.flags})]}),x.opponent&&o.jsxs(qe,{children:[o.jsx(Ke,{children:"Opponent"}),o.jsx(Xe,{children:x.opponent})]}),x.time_control&&o.jsxs(qe,{children:[o.jsx(Ke,{children:"Time Control"}),o.jsx(Xe,{children:x.time_control})]}),x.game_info&&o.jsxs(qe,{children:[o.jsx(Ke,{children:"Game Info"}),o.jsx(Xe,{children:x.game_info})]})]})]},x.id);return o.jsxs(rl,{children:[o.jsxs(nl,{children:[o.jsx(ol,{children:"User History"}),o.jsxs(il,{onSubmit:c,children:[o.jsx(sl,{type:"text",placeholder:"Enter username to search...",value:t,onChange:x=>r(x.target.value)}),o.jsx(al,{type:"submit",disabled:!t.trim()||f,children:"Search"})]})]}),o.jsxs(cl,{children:[g&&o.jsxs(pl,{children:["Error: ",g]}),!n&&!g&&o.jsx(sr,{children:"Enter a username to view their history."}),n&&!g&&m.length===0&&!f&&o.jsxs(sr,{children:["No records found for ",n,"."]}),m.map($),f&&o.jsx(sr,{children:"Loading user history..."}),!f&&m.length>0&&m.length>=s+u&&o.jsx(fl,{onClick:d,disabled:f,children:"Load More"})]})]})}),xl=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${e=>e.theme.colors.background};
`,yl=l.div`
  display: flex;
  background: ${e=>e.theme.colors.surface};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,fn=l.button`
  flex: 1;
  padding: 0.75rem;
  background: ${e=>e.$active?e.theme.colors.primary:"transparent"};
  color: ${e=>e.$active?"white":e.theme.colors.text};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${e=>e.$active?"bold":"normal"};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.backgroundTertiary};
  }
`,bl=l.div`
  flex: 1;
  overflow: hidden;
`,$l=()=>{const[e,t]=h.useState("channels");return o.jsxs(xl,{children:[o.jsxs(yl,{children:[o.jsx(fn,{$active:e==="channels",onClick:()=>t("channels"),children:"Channel History"}),o.jsx(fn,{$active:e==="users",onClick:()=>t("users"),children:"User History"})]}),o.jsxs(bl,{children:[e==="channels"&&o.jsx(tl,{}),e==="users"&&o.jsx(gl,{})]})]})},vl=l.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${e=>e.$isOpen?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,wl=l.div`
  background: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.lg};
  box-shadow: ${e=>e.theme.shadows.xl};
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,kl=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Sl=l.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${e=>e.theme.colors.text};
`,Cl=l.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${e=>e.theme.borderRadius.md};
  transition: all ${e=>e.theme.transitions.fast};
  
  &:hover {
    background: ${e=>e.theme.colors.backgroundTertiary};
    color: ${e=>e.theme.colors.text};
  }
`,jl=l.div`
  flex: 1;
  overflow: hidden;
`,Pl=({isOpen:e,onClose:t})=>{h.useEffect(()=>{const n=i=>{i.key==="Escape"&&e&&t()};if(e)return document.addEventListener("keydown",n),()=>document.removeEventListener("keydown",n)},[e,t]);const r=n=>{n.target===n.currentTarget&&t()};return e?o.jsx(vl,{$isOpen:e,onClick:r,children:o.jsxs(wl,{onClick:n=>n.stopPropagation(),children:[o.jsxs(kl,{children:[o.jsx(Sl,{children:"FICS Backend Data"}),o.jsx(Cl,{onClick:t,children:"✕"})]}),o.jsx(jl,{children:o.jsx($l,{})})]})}):null},Rl=l.header`
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
`,El=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Ml=l.button`
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
`,zl=l.div`
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
`,Be=l.button`
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
`,He=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
`,ar=l.span`
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,cr=l.div`
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
`,Ie=l.button`
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
`,gn=l.hr`
  margin: ${e=>e.theme.spacing[1]} 0;
  border: none;
  border-top: 1px solid ${e=>e.theme.colors.border};
`;l.h1`
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.bold};
  color: ${e=>e.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;const Ll=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,Tl=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Il=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Dl=l.div`
  display: flex;
  background-color: ${e=>e.theme.colors.backgroundSecondary};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`,lr=l.button`
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
`,Bo=q(({onMenuClick:e})=>{const{preferencesStore:t}=Pe(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:i,setTheme:s}=Io(),a=Fo(),u=No(),[c,d]=h.useState(!1),[m,f]=h.useState(!1),[g,p]=h.useState(null),[$,x]=h.useState(!1),v=b=>{t.updatePreference("viewMode",b),f(!1),p(null)},y=b=>{t.updatePreference("chessOrientation",b),f(!1),p(null)},k=b=>{s(b),f(!1),p(null)},C=()=>{f(!m),p(null)},P=()=>{d(!0),f(!1),p(null)},S=b=>{p(b)},E=r==="chat-only";return Z.useEffect(()=>{const b=R=>{const L=R.target;m&&!L.closest(".hamburger-menu-container")&&f(!1)};if(m)return document.addEventListener("click",b),()=>document.removeEventListener("click",b)},[m]),Z.useEffect(()=>{const b=R=>{(R.ctrlKey||R.metaKey)&&R.key===","&&(R.preventDefault(),d(!0))};return window.addEventListener("keydown",b),()=>{window.removeEventListener("keydown",b)}},[]),o.jsxs(Rl,{children:[o.jsx(El,{children:o.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[o.jsx(Ml,{onClick:C,"aria-label":"Menu",children:"☰"}),o.jsxs(zl,{$isOpen:m,children:[o.jsxs("div",{onMouseEnter:()=>S("theme"),onMouseLeave:()=>p(null),style:{position:"relative"},children:[o.jsxs(Be,{$hasSubmenu:!0,children:[o.jsx(He,{children:"🎨 Theme"}),o.jsx(ar,{children:"▶"})]}),o.jsxs(cr,{$isOpen:g==="theme",children:[o.jsx(Ie,{$isActive:i==="light",onClick:()=>k("light"),children:"☀ Light"}),o.jsx(Ie,{$isActive:i==="dark",onClick:()=>k("dark"),children:"☾ Dark"}),o.jsx(Ie,{$isActive:i==="system",onClick:()=>k("system"),children:"◐ System"})]})]}),o.jsxs("div",{onMouseEnter:()=>S("orientation"),onMouseLeave:()=>p(null),style:{position:"relative"},children:[o.jsxs(Be,{$hasSubmenu:!0,children:[o.jsx(He,{children:"📐 Orientation"}),o.jsx(ar,{children:"▶"})]}),o.jsxs(cr,{$isOpen:g==="orientation",children:[u.includes("landscape")&&o.jsx(Ie,{$isActive:n==="landscape",onClick:()=>!E&&y("landscape"),disabled:E,style:{opacity:E?.5:1},children:"▭ Landscape"}),u.includes("portrait")&&o.jsx(Ie,{$isActive:n==="portrait",onClick:()=>!E&&y("portrait"),disabled:E,style:{opacity:E?.5:1},children:"▯ Portrait"})]})]}),o.jsxs("div",{onMouseEnter:()=>S("mode"),onMouseLeave:()=>p(null),style:{position:"relative"},children:[o.jsxs(Be,{$hasSubmenu:!0,children:[o.jsx(He,{children:"🎮 View Mode"}),o.jsx(ar,{children:"▶"})]}),o.jsxs(cr,{$isOpen:g==="mode",children:[a.includes("chess-only")&&o.jsx(Ie,{$isActive:r==="chess-only",onClick:()=>v("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&o.jsx(Ie,{$isActive:r==="chess-and-chat",onClick:()=>v("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&o.jsx(Ie,{$isActive:r==="chat-only",onClick:()=>v("chat-only"),children:"▤ Chat Only"})]})]}),o.jsx(gn,{}),o.jsx(Be,{onClick:P,children:o.jsx(He,{children:"⚙️ Settings"})}),o.jsx(Be,{onClick:()=>{x(!0),f(!1)},children:o.jsx(He,{children:"📊 Backend Data"})}),o.jsx(gn,{}),o.jsx(Be,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),f(!1)},children:o.jsx(He,{children:"📖 Documentation"})}),o.jsx(Be,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),f(!1)},children:o.jsx(He,{children:"🐛 Report Issue"})})]})]})}),o.jsx(Ll,{children:o.jsxs(Tl,{children:[o.jsx(Il,{children:"Mode:"}),o.jsxs(Dl,{children:[a.includes("chess-only")&&o.jsx(lr,{$isActive:r==="chess-only",onClick:()=>v("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&o.jsx(lr,{$isActive:r==="chess-and-chat",onClick:()=>v("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&o.jsx(lr,{$isActive:r==="chat-only",onClick:()=>v("chat-only"),title:"Chat Only",children:"▤"})]})]})}),o.jsx(Oo,{isOpen:c,onClose:()=>d(!1)}),o.jsx(Pl,{isOpen:$,onClose:()=>x(!1)})]})});Bo.displayName="AppHeader";const Al=l.img`
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
`,Fl={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Nl={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"},Ol=l.div`
  width: 93%;
  height: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$size*.8}px;
  user-select: none;
  cursor: ${e=>e.$isDragging?"grabbing":"grab"};
  filter: ${e=>e.$isDragging?"drop-shadow(0 4px 8px rgba(0,0,0,0.3))":"none"};
`,Ne=q(({piece:e,size:t,isDragging:r=!1,style:n})=>{const i=Le(),[s,a]=Z.useState(!1),u=Fl[e];if(!u)return null;const c=i.preferences.pieceSet,d=`/pieces/${c}/${u}.svg`;return Z.useEffect(()=>{a(!1)},[e,c]),s?o.jsx(Ol,{className:"chess-piece-fallback",$isDragging:r,$size:t,style:n,"data-settings":"pieces",children:Nl[e]||e}):o.jsx(Al,{className:"chess-piece",src:d,alt:u,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces",onError:()=>a(!0)})});Ne.displayName="ChessPiece";const Bl=l.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Hl=l.div`
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
`,Wl=l.button`
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
`,Ho=({isOpen:e,color:t,onSelect:r,onCancel:n,position:i})=>{if(!i)return null;const s=["Q","R","B","N"],a=u=>t==="white"?u:u.toLowerCase();return o.jsx(Bl,{$isOpen:e,onClick:n,children:o.jsx(Hl,{$x:i.x,$y:i.y,onClick:u=>u.stopPropagation(),children:s.map(u=>o.jsx(Wl,{onClick:()=>r(u.toLowerCase()),children:o.jsx(Ne,{piece:a(u),size:50})},u))})})};Ho.displayName="PromotionDialog";const _l=l.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Ul=l.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,Gl=l.div`
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
`,xn=l.div`
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
`,Yl=l.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,Vl=l.div.attrs(e=>({style:{transform:`translate(
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
`,Je=["a","b","c","d","e","f","g","h"],Ze=["8","7","6","5","4","3","2","1"];function ql(e,t){return(e+t)%2===0}function Kl(e,t,r){const n=r?Je[7-e]:Je[e],i=r?Ze[7-t]:Ze[t];return`${n}${i}`}function Xl(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((i,s)=>{let a=0;for(const u of i)if(u>="1"&&u<="8")a+=parseInt(u);else{const c=`${Je[a]}${Ze[s]}`;t.set(c,u),a++}}),t}const Sr=q(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:i,onDrop:s,highlightedSquares:a=new Set,lastMove:u,interactive:c=!0,onSizeCalculated:d,selectedCapturedPiece:m,onCapturedPieceSelect:f})=>{Oe();const g=Le(),p=Ht(),$=h.useRef(null),[x,v]=h.useState(t||200),[y,k]=h.useState(null),[C,P]=h.useState(new Set),[S,E]=h.useState(null),[b,R]=h.useState([]),L=h.useRef(),[F,w]=h.useState(null),[N,H]=h.useState(!1),A=h.useMemo(()=>Xl(e),[e]),U=h.useRef(new Map);h.useRef(0);const oe=h.useCallback((j,D)=>{const T=Je.indexOf(j[0]),I=Ze.indexOf(j[1]),M=D/8,z=r?(7-T)*M:T*M,G=r?(7-I)*M:I*M;return{x:z,y:G}},[r]),ie=h.useCallback((j,D,T)=>{const I=j.toLowerCase()==="p",M=T[1];return I&&(M==="8"||M==="1")},[]),de=h.useCallback(j=>{j.preventDefault(),p.isPlaying&&p.clearPremove()},[p]);h.useEffect(()=>{if(t){v(t);return}const j=()=>{if(!$.current)return;const z=$.current.parentElement;if(!z)return;const{width:G,height:te}=z.getBoundingClientRect();$.current.getBoundingClientRect();const ae=16,ee=G-ae,we=te-ae,B=Math.floor(Math.min(ee,we)),le=Math.max(100,Math.floor(B/8)*8);le!==x&&v(le)},D=setTimeout(j,50);j();let T;const I=()=>{clearTimeout(T),T=setTimeout(j,100)};window.addEventListener("resize",I);let M=null;return $.current&&$.current.parentElement&&(M=new ResizeObserver(()=>{I()}),M.observe($.current.parentElement)),()=>{window.removeEventListener("resize",I),clearTimeout(T),clearTimeout(D),M&&M.disconnect()}},[t,x]),h.useEffect(()=>{d&&x>0&&d(x)},[x,d]);const K=x/8,ve=h.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(p.isPlaying){const j=p.currentGame,D=p.playingColor;if(j&&D){const T=D==="white"?j.white.time:j.black.time,I=g.preferences.disableAnimationsThreshold;if(T<I)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,p.isPlaying,p.currentGame,p.playingColor]),pe=h.useRef("");h.useEffect(()=>{if(R([]),!ve||N||p.isProcessingServerUpdate){U.current=new Map(A);return}const j=U.current;if(u){const{from:D,to:T}=u,I=`${e}-${D}-${T}`;if(pe.current===I){U.current=new Map(A);return}const M=j.get(D),z=A.get(T);if(M&&z===M&&!A.has(D)){if(p.isPlaying&&p.currentGame){const G=p.gameRelation===1,te=p.playingColor,ae=te==="white"&&p.currentGame.turn==="b"||te==="black"&&p.currentGame.turn==="w";if(G||ae){U.current=new Map(A),pe.current=I;return}}pe.current=I,setTimeout(()=>{R([{piece:M,from:D,to:T,startTime:Date.now()}])},0)}}U.current=new Map(A)},[A,u,ve,N,p.isProcessingServerUpdate,e,p]),h.useEffect(()=>{if(N){const j=setTimeout(()=>{H(!1)},50);return()=>clearTimeout(j)}},[e,N]),h.useEffect(()=>{if(b.length===0)return;const j=()=>{const D=Date.now(),T=g.preferences.animationDuration;R(I=>{const M=I.filter(z=>D-z.startTime<T);return M.length>0&&(L.current=requestAnimationFrame(j)),M})};return L.current=requestAnimationFrame(j),()=>{L.current&&cancelAnimationFrame(L.current)}},[b.length,g.preferences.animationDuration]),h.useEffect(()=>{if(m)try{const j=p.currentPosition;p.chessBoard.getFen()!==j&&p.chessBoard.loadFen(j);const T=p.chessBoard.getLegalMoves().filter(M=>M.from==="@"&&M.san.toLowerCase().startsWith(m.toLowerCase())),I=new Set(T.map(M=>M.to));P(I),k(null)}catch(j){console.error("Error getting drop moves:",j),P(new Set)}},[m,p]);const Q=h.useCallback((j,D)=>{if(!c)return;const T=A.get(j);if(m){C.has(j)?(s?.(m,j),f?.(null),P(new Set)):(f?.(null),P(new Set));return}if(y)if(C.has(j)){const I=A.get(y);if(I&&ie(I,y,j)){const M=I===I.toUpperCase()?"white":"black";if(p.isPlaying){const z=g.preferences.autoPromotionPiece;p.isMyTurn?(H(!0),i?.(y,j,z)):p.setPremove(y,j,z)}else{const z=D?.currentTarget.getBoundingClientRect();w({from:y,to:j,color:M,position:z?{x:z.left+z.width/2,y:z.top+z.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else p.isPlaying&&!p.isMyTurn?p.setPremove(y,j):(H(!0),i?.(y,j));k(null),P(new Set)}else if(j===y)k(null),P(new Set);else if(T)if(k(j),g.preferences.showLegalMoves)try{const I=p.currentPosition;p.chessBoard.getFen()!==I&&p.chessBoard.loadFen(I);const M=p.chessBoard.getLegalMoves(j),z=new Set(M.map(G=>G.to));P(z)}catch(I){console.error("Error getting legal moves:",I),P(new Set)}else P(new Set);else k(null),P(new Set);else if(T){k(j);try{const I=p.currentPosition;p.chessBoard.getFen()!==I&&p.chessBoard.loadFen(I);const M=T===T.toUpperCase(),z=p.chessBoard.getActiveColor();if(M&&z==="w"||!M&&z==="b")if(g.preferences.showLegalMoves){const te=p.chessBoard.getLegalMoves(j),ae=new Set(te.map(ee=>ee.to));P(ae)}else P(new Set);else P(new Set),k(null)}catch(I){console.error("Error getting legal moves:",I),P(new Set)}}},[y,C,A,i,s,c,ie,p,g.preferences.autoPromotionPiece,m,f]),fe=h.useCallback((j,D,T)=>{if(!c)return;const I=j.clientX,M=j.clientY;let z=!1,G=!1;const ae=j.currentTarget.getBoundingClientRect().width,ee=B=>{const le=Math.abs(B.clientX-I),xe=Math.abs(B.clientY-M);(le>3||xe>3)&&T&&!G?(z=!0,G=!0,ge(D,T,B,ae)):G&&E(ce=>ce?{...ce,x:B.clientX,y:B.clientY}:null)},we=B=>{document.removeEventListener("mousemove",ee),document.removeEventListener("mouseup",we),G?ue(B,D,T):z?(E(null),k(null),P(new Set)):Q(D,j)};document.addEventListener("mousemove",ee),document.addEventListener("mouseup",we)},[c,Q]),ge=h.useCallback((j,D,T,I)=>{if(k(j),g.preferences.showLegalMoves)try{const z=p.currentPosition;p.chessBoard.getFen()!==z&&p.chessBoard.loadFen(z);const G=D===D.toUpperCase(),te=p.chessBoard.getActiveColor();if(G&&te==="w"||!G&&te==="b"){const ee=p.chessBoard.getLegalMoves(j),we=new Set(ee.map(B=>B.to));P(we)}else P(new Set)}catch(z){console.error("Error getting legal moves for drag:",z),P(new Set)}else P(new Set);const M={piece:D,from:j,x:T.clientX,y:T.clientY,size:I};E(M)},[g.preferences.showLegalMoves,p]),ue=h.useCallback((j,D,T)=>{try{const z=document.elementsFromPoint(j.clientX,j.clientY).find(G=>G.getAttribute("data-square"))?.getAttribute("data-square");if(z&&z!==D)if(ie(T,D,z)){const G=T===T.toUpperCase()?"white":"black";if(p.isPlaying){const te=g.preferences.autoPromotionPiece;p.isMyTurn?(H(!0),i?.(D,z,te)):p.setPremove(D,z,te)}else w({from:D,to:z,color:G,position:{x:j.clientX,y:j.clientY}})}else p.isPlaying&&!p.isMyTurn?p.setPremove(D,z):(H(!0),i?.(D,z))}catch(I){console.error("Error in handleDragEnd:",I)}E(null),k(null),P(new Set)},[i,ie,p,g.preferences.autoPromotionPiece]),se=h.useMemo(()=>{const j=[];for(let D=0;D<8;D++)for(let T=0;T<8;T++){const I=ql(T,D),M=Kl(T,D,r),z=A.get(M),G=a.has(M),te=u&&(u.from===M||u.to===M),ae=y===M,ee=C.has(M),we=S?.from===M;b.some(ce=>ce.to===M);const B=b.some(ce=>ce.from===M),le=n&&D===7,xe=n&&T===0;j.push(o.jsxs(Gl,{"data-square":M,$isLight:I,$isHighlighted:G,$isLastMoveSquare:!!te,$isSelected:ae,$isPossibleMove:ee,onMouseDown:ce=>fe(ce,M,z),children:[z&&!we&&!B&&o.jsx(Ne,{piece:z,size:K},`${z}-${K}`),le&&o.jsx(xn,{$type:"file",$isLight:I,$size:K,"data-settings":"coordinates",className:"coordinate-label",children:r?Je[7-T]:Je[T]}),xe&&o.jsx(xn,{$type:"rank",$isLight:I,$size:K,"data-settings":"coordinates",className:"coordinate-label",children:r?Ze[7-D]:Ze[D]})]},M))}return j},[r,n,A,a,u,y,C,S,K,Q,fe]);return o.jsxs(o.Fragment,{children:[o.jsxs(_l,{ref:$,$size:x,onContextMenu:de,"data-settings":"board",className:"chess-board",children:[o.jsx(Ul,{children:se}),b.map((j,D)=>{const T=oe(j.from,x),I=oe(j.to,x),M=Date.now()-j.startTime,z=g.preferences.animationDuration,G=Math.min(M/z,1),ae=(ee=>ee<.5?4*ee*ee*ee:1-Math.pow(-2*ee+2,3)/2)(G);return o.jsx(Vl,{$fromX:T.x,$fromY:T.y,$toX:I.x,$toY:I.y,$progress:ae,$size:K,children:o.jsx(Ne,{piece:j.piece,size:K},`${j.piece}-${K}`)},`${j.from}-${j.to}-${j.startTime}`)})]}),S&&o.jsx(o.Fragment,{children:o.jsx(Yl,{$x:S.x,$y:S.y,$size:S.size,children:o.jsx(Ne,{piece:S.piece,size:S.size,isDragging:!0},`${S.piece}-${S.size}-dragging`)})}),F&&o.jsx(Ho,{isOpen:!0,color:F.color,position:F.position,onSelect:j=>{H(!0),i?.(F.from,F.to,j),w(null)},onCancel:()=>w(null)})]})});Sr.displayName="ChessBoardWithPieces";const Ql=l.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,Jl=l.span`
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
`,Wo=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:i=30,showTenths:s=!1,className:a,compact:u=!1})=>{const c=m=>{const f=Math.floor(m/3600),g=Math.floor(m%3600/60),p=Math.floor(m%60),$=Math.floor(m%1*10),x=r&&Math.floor(m)%2===0?" ":":";return f>0?`${f}${x}${g.toString().padStart(2,"0")}${x}${p.toString().padStart(2,"0")}`:m<i&&s?`${g}${x}${p.toString().padStart(2,"0")}.${$}`:`${g}${x}${p.toString().padStart(2,"0")}`},d=e<=i&&e>0;return o.jsx(Ql,{size:t,className:a,children:o.jsx(Jl,{$isLowTime:d,$isActive:r,$compact:u,$isFinished:n,children:c(e)})})},Zl=l.span`
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
`,ed=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:i=30,showTenths:s=!1,className:a})=>{const u=m=>{const f=Math.floor(m/3600),g=Math.floor(m%3600/60),p=Math.floor(m%60),$=Math.floor(m%1*10),x=r&&Math.floor(m)%2===0?" ":":";return f>0?`${f}${x}${g.toString().padStart(2,"0")}${x}${p.toString().padStart(2,"0")}`:m<i&&s?`${g}${x}${p.toString().padStart(2,"0")}.${$}`:`${g}${x}${p.toString().padStart(2,"0")}`},c=e<=i&&e>0,d=t==="large"?"48px":t==="medium"?"36px":"24px";return o.jsx(Zl,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:d,children:u(e)})},vt=l(ed)`
    /* Additional GameClock-specific styles if needed */
`;l(Wo).attrs({size:"small"})`
    font-size: 12px;
`;l(Wo).attrs({size:"medium"})`
    font-size: 16px;
`;const td=l.div`
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
`,rd=l.button`
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
`,nd=l.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Or=q(({playerName:e,position:t,onClose:r})=>{const n=On(),i=Le(),s=h.useRef(null),a=i.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];h.useEffect(()=>{const c=m=>{s.current&&!s.current.contains(m.target)&&r()},d=m=>{m.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",d)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}},[r]),h.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),d=window.innerWidth,m=window.innerHeight;let f=t.x,g=t.y;c.right>d&&(f=d-c.width-10),c.bottom>m&&(g=m-c.height-10),(f!==t.x||g!==t.y)&&(s.current.style.left=`${f}px`,s.current.style.top=`${g}px`)}},[t]);const u=c=>{const d=e.replace(/\([^)]*\)/g,"").trim(),m=c.replace("{player}",d);n.sendCommand(m),r()};return o.jsx(td,{ref:s,$x:t.x,$y:t.y,children:a.map((c,d)=>"divider"in c&&c.divider?o.jsx(nd,{},d):"command"in c?o.jsx(rd,{onClick:()=>u(c.command),children:c.label},d):null)})});Or.displayName="PlayerContextMenu";const od=l.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,_o=({name:e,className:t,style:r,onClick:n})=>{const[i,s]=h.useState(null),a=u=>{u.preventDefault(),u.stopPropagation(),n&&n(),s({x:u.clientX,y:u.clientY})};return o.jsxs(o.Fragment,{children:[o.jsx(od,{className:t,style:r,onClick:a,children:e}),i&&o.jsx(Or,{playerName:e,position:i,onClose:()=>s(null)})]})};_o.displayName="PlayerName";const id=l.div`
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
`,sd=l.div`
  display: flex;
  align-items: center;
  width: 100%;
`,ad=l.div`
  display: flex;
  align-items: center;
  flex: 1;
`,cd=l.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ld=l.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
  margin-left: 4px;
`;l.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${e=>e.$isWhite?"#ffffff":"#000000"};
  border: 1px solid ${e=>e.$isWhite?"#000000":"#ffffff"};
  box-shadow: ${e=>e.theme.shadows.sm};
`;const lt=q(({name:e,rating:t,time:r,isActive:n,isWhite:i,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:u=!1,compact:c=!1})=>{const d=o.jsxs(o.Fragment,{children:[o.jsx(sd,{children:o.jsxs(ad,{children:[o.jsx(cd,{children:o.jsx(_o,{name:e})}),o.jsx(ld,{children:t===-1?"++++":t===-2?"----":t})]})}),!a&&!u&&o.jsx(vt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return u?d:o.jsx(id,{$isActive:n,$orientation:s,$compact:c,children:d})});lt.displayName="PlayerCard";const dd=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
`,dr=l.div`
  padding: ${e=>e.theme.spacing[1]};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing[2]};
`,ur=l.div`
  display: flex;
  gap: ${e=>e.theme.spacing[1]};
  justify-content: center;
`,ye=l.button`
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
`,ud=l.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,yn=l.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,hd=l.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${e=>e.theme.spacing[1]};
`,bn=l.span`
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
`,Qt=q(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:i=!0,extraControls:s,className:a,disableAutoScroll:u=!1})=>{const c=h.useRef(null);h.useEffect(()=>{if(!u&&c.current&&t!==void 0){const m=c.current.querySelector(`[data-move-index="${t}"]`);m&&m.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,u]);const d=()=>{const m=[];for(let f=0;f<e.length;f+=2){const g=Math.floor(f/2)+1,p=e[f],$=e[f+1];m.push(o.jsxs(yn,{children:[o.jsxs(hd,{children:[g,"."]}),o.jsx(bn,{$isCurrentMove:t===f,onClick:()=>r?.(f),"data-move-index":f,children:hr(p.san)}),$&&o.jsx(bn,{$isCurrentMove:t===f+1,onClick:()=>r?.(f+1),"data-move-index":f+1,children:hr($.san)})]},f))}return m};return o.jsxs(dd,{className:a,children:[i?o.jsx(dr,{children:o.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("span",{children:"Moves"}),o.jsxs(ur,{children:[o.jsx(ye,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),o.jsx(ye,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),o.jsx(ye,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),o.jsx(ye,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?o.jsxs(dr,{children:[s,o.jsxs(ur,{children:[o.jsx(ye,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),o.jsx(ye,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),o.jsx(ye,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),o.jsx(ye,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):o.jsx(dr,{children:o.jsxs(ur,{children:[o.jsx(ye,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),o.jsx(ye,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),o.jsx(ye,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),o.jsx(ye,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),o.jsx(ud,{ref:c,children:e.length===0?o.jsx(yn,{children:o.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):d()})]})});Qt.displayName="MoveList";const md=l(vt)`
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
`,pd=l(vt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,dt=q(({player:e,isActive:t,size:r="small",compact:n=!0,variant:i="portrait"})=>{const s=Ht(),a=i==="landscape"?pd:md;return o.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});dt.displayName="ObservableClock";const fd=l.div`
  position: relative;
  display: inline-block;
`,gd=l.button`
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
`,xd=l.div`
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
`,yd=l.button`
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
`,Br=q(({color:e,size:t="small"})=>{const r=Le(),[n,i]=h.useState(!1),s=h.useRef(null),a=["Q","R","B","N"],u=r.preferences.autoPromotionPiece,c=f=>e==="white"?f:f.toLowerCase();h.useEffect(()=>{const f=g=>{s.current&&!s.current.contains(g.target)&&i(!1)};if(n)return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[n]);const d=f=>{r.updatePreference("autoPromotionPiece",f),i(!1)},m=t==="small"?28:36;return o.jsxs(fd,{ref:s,children:[o.jsx(gd,{$size:t,onClick:()=>i(!n),title:"Select promotion piece",children:o.jsx(Ne,{piece:c(u),size:m})}),o.jsx(xd,{$isOpen:n,children:a.map(f=>o.jsx(yd,{$size:t,onClick:()=>d(f),title:`Promote to ${f==="Q"?"Queen":f==="R"?"Rook":f==="B"?"Bishop":"Knight"}`,children:o.jsx(Ne,{piece:c(f),size:m})},f))})]})});Br.displayName="PromotionPieceSelector";const bd=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing[1]};
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  box-shadow: ${e=>e.theme.shadows.sm};
`,he=l.button`
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
`,Uo=q(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:i,onUnobserve:s,onUnexamine:a,onSetupFEN:u,onFlipBoard:c,isAnalysisActive:d,isDrawOffered:m,canAbort:f,className:g})=>{const p=Ht(),$=()=>o.jsxs(o.Fragment,{children:[f&&o.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),o.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),p.currentGame&&p.currentGame.moveNumber>=2&&o.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),o.jsx(Br,{color:p.playingColor||"white",size:"medium"})]}),x=()=>o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),o.jsx(he,{onClick:i,$variant:"secondary",children:"Analysis"}),o.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),v=()=>o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),o.jsx(he,{onClick:i,$variant:"secondary",children:"Analysis"}),o.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),y=()=>o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:i,$variant:"secondary",children:"Analysis"}),o.jsx(he,{onClick:u,$variant:"secondary",children:"FEN"}),o.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]});return o.jsxs(bd,{className:g,children:[e==="playing"&&$(),e==="observing"&&x(),e==="examining"&&v(),e==="freestyle"&&y()]})}),ke=l(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;Uo.displayName="GameControls";const $n=l.div`
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
`,vn=l.div`
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
`,$d=l.div`
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
`,wn=l.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="vertical"?"column":"row"};
  height: 100%;
  width: 100%;
`,Ct=l.div`
  background: transparent;
  transition: all 0.3s ease;
`,kn=l.div`
  background: ${e=>e.$color};
  transition: all 0.3s ease;
`,Go=q(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Wt().isBottomPlayerWinning;let a,u,c;if(t===50)a=47,u=6,c=47;else if(t>50){const m=t-50;a=50-m,u=m,c=50}else{const m=50-t;a=50,u=m,c=50-m}const d=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const m=t<20;return o.jsxs($n,{$orientation:r,className:n,children:[o.jsx(vn,{$orientation:r,children:e}),o.jsx($d,{$needsDarkText:m,children:e}),o.jsxs(wn,{$orientation:r,children:[o.jsx(Ct,{style:{height:`${a}%`}}),o.jsx(kn,{$color:d,style:{height:`${u}%`}}),o.jsx(Ct,{style:{height:`${c}%`}})]})]})}else return o.jsxs($n,{$orientation:r,className:n,children:[o.jsx(vn,{$orientation:r,children:e}),o.jsxs(wn,{$orientation:r,children:[o.jsx(Ct,{style:{width:`${c}%`}}),o.jsx(kn,{$color:d,style:{width:`${u}%`}}),o.jsx(Ct,{style:{width:`${a}%`}})]})]})});Go.displayName="EvaluationBar";const vd=l.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,wd=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
  width: 100%;
  
  .depth {
    color: ${e=>e.$boardLabelColor||e.theme.colors.textTertiary};
    font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .line {
    font-family: ${e=>e.theme.typography.fontFamilyMono};
    color: ${e=>e.$boardLabelColor||e.theme.colors.textTertiary};
    font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,Cr=q(({orientation:e="vertical",boardSize:t})=>{const r=Wt();return o.jsx(vd,{$orientation:e,$boardSize:t,children:o.jsx(Go,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),jr=q(({className:e})=>{const t=Wt(),r=Le(),n=r.preferences.boardLabelColor,i=r.preferences.boardLabelFontSize;return o.jsxs(wd,{className:e,$boardLabelColor:n,$boardLabelFontSize:i,children:[o.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),o.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});Cr.displayName="AnalysisDisplay";jr.displayName="AnalysisInfoDisplay";const kd=l.div`
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
`,Sd=l.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Cd=l.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Yo=l.input`
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
`,jd=l.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Pd=l.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Rd=l.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Sn=l.button`
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
`,Ed=l.button`
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
`,Cn=l.div`
  margin-bottom: ${e=>e.theme.spacing[4]};
`,jn=l.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: ${e=>e.theme.spacing[2]};
`,Md=l(Yo)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Vo=q(({isOpen:e,onClose:t})=>{const{gameStore:r}=Pe(),[n,i]=h.useState(""),[s,a]=h.useState(""),u=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=h.useCallback(p=>{i(p.target.value),a("")},[]),d=h.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),i(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),m=h.useCallback(p=>{const $=typeof p=="function"?p():p;i($),a("");try{r.loadPosition($)?(t(),i("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),f=h.useCallback(p=>{p.key==="Enter"&&n.trim()?d():p.key==="Escape"&&t()},[n,d,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>si.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?o.jsx(kd,{$isOpen:e,onClick:t,children:o.jsxs(Sd,{onClick:p=>p.stopPropagation(),children:[o.jsx(Cd,{children:"Set Position from FEN"}),o.jsx(Pd,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),o.jsxs(Cn,{children:[o.jsx(jn,{children:"Current position:"}),o.jsx(Md,{type:"text",value:u,readOnly:!0,onClick:p=>p.currentTarget.select()})]}),o.jsxs(Cn,{children:[o.jsx(jn,{children:"Preset position:"}),g.map(p=>o.jsx(Ed,{onClick:()=>m(p.fen),children:p.name},p.name))]}),o.jsx(Yo,{type:"text",value:n,onChange:c,onKeyDown:f,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&o.jsx(jd,{children:s}),o.jsxs(Rd,{children:[o.jsx(Sn,{onClick:t,children:"Cancel"}),o.jsx(Sn,{$variant:"primary",onClick:d,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Vo.displayName="FENDialog";const zd=l.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Ld=l.div`
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
`,Td=l.div`
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
`,Id=l.div`
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
`,Dd=l(Ne)`
  width: 100%;
  height: 100%;
`,ut=q(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:i})=>{const{gameStore:s}=Pe(),a=h.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const f=s.capturedPieces;return t?f.white:f.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),u=h.useMemo(()=>{const m={};return a.forEach(f=>{m[f]=(m[f]||0)+1}),m},[a]),c=["p","n","b","r","q"],d=n?n/8:32;return o.jsx(zd,{$orientation:e,$size:d,className:r,children:o.jsx(Ld,{$orientation:e,children:c.map(m=>{const f=u[m]||0,g=t?m.toUpperCase():m;return o.jsx(Td,{$size:d,onClick:f>0&&i?()=>i(g):void 0,style:{cursor:f>0&&i?"pointer":"default"},children:f>0&&o.jsxs(o.Fragment,{children:[o.jsx(Dd,{piece:g,size:d}),f>1&&o.jsx(Id,{children:f})]})},m)})})})});ut.displayName="CapturedPieces";const Ad=l.div`
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
`,Fd=l.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Nd=l.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Od=l.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Bd=l.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
  justify-content: flex-end;
`,Pn=l.button`
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
`,Hd=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:i="Cancel",onConfirm:s,onCancel:a})=>o.jsx(Ad,{$isOpen:e,onClick:a,children:o.jsxs(Fd,{onClick:u=>u.stopPropagation(),children:[o.jsx(Nd,{children:t}),o.jsx(Od,{children:r}),o.jsxs(Bd,{children:[o.jsx(Pn,{$variant:"secondary",onClick:a,children:i}),o.jsx(Pn,{$variant:"primary",onClick:s,children:n})]})]})}),Wd=l.div`
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
`,Rn=l.div`
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
`;l.div`
    text-align: center;
    font-size: ${e=>e.$gameInfoFontSize?`${e.$gameInfoFontSize}px`:e.theme.typography.fontSize.sm};
    color: ${e=>e.$gameInfoColor||e.theme.colors.textSecondary};
    white-space: nowrap;
`;const _d=l.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Ud=l.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,Gd=l.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Yd=l.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,qo=l.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,Ko=l.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Vd=l(qo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,qd=l(Ko)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Kd=l(qo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,Xd=l.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,Qd=l(Ko)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,En=l.div`
    font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
    color: ${e=>e.$boardLabelColor||e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Mn=l.div`
    font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
    color: ${e=>e.$boardLabelColor||e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,zn=l.div`
    font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
    color: ${e=>e.$boardLabelColor||e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Ln=l.div`
    font-size: ${e=>e.$boardLabelFontSize?`${e.$boardLabelFontSize}px`:e.theme.typography.fontSize.xs};
    color: ${e=>e.$boardLabelColor||e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Tn=l.div`
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
`,Jd=l.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,Zd=l.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,eu=l.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;l.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    z-index: 1;
    box-shadow: ${e=>e.theme.shadows.sm};
`;l.div`
    text-align: center;
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    display: flex;
    gap: ${e=>e.theme.spacing[4]};
    align-items: center;
    white-space: nowrap;
`;const tu=l.div`
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
`,ru=l.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,nu=l.div`
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
`;l.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 280px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex-shrink: 0;
`;l.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[3]};
    align-items: flex-start;
`;l.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;const ou=l.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,iu=l.div`
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
`;l.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[1]};
    align-items: flex-start;
    width: 100%;
`;const In=l.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;l(Qt)`
    height: 135px;
    min-height: 135px;
    margin: ${e=>e.theme.spacing[2]} 0;
`;const su=l(Qt)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${e=>e.theme.spacing[2]};
`;l(vt)`
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
`;const Dn=l.div`
    flex: 1;
    display: flex;
`;l(vt)`
    margin-left: ${e=>e.theme.spacing[3]};

    span {
        padding: 0 ${e=>e.theme.spacing[2]};
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;l.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    justify-content: center;
    width: 100%;
`;const au=l.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,cu=l.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,lu=l.div`
    position: relative;
    margin-top: 18px;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"100%"};
    display: flex;
    align-items: center;
`;l.div`
    display: flex;
    flex-direction: column;
    gap: ${e=>e.theme.spacing[2]};
    padding: ${e=>e.theme.spacing[2]};
    align-items: center;
`;l.div`
    min-height: 28px;
`;const du=l.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,uu=l.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,Xo=q(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=Ht(),i=Le(),s=Wt(),a=On(),u=ai();Oe();const[c,d]=h.useState(!1),[m,f]=h.useState(!1),[g,p]=h.useState(0),[$,x]=h.useState(!1),[v,y]=h.useState(!1),[k,C]=h.useState(null),P=i.preferences.chessOrientation==="landscape",S=i.preferences.boardLabelColor,E=i.preferences.boardLabelFontSize,b=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",L=window.innerWidth/window.innerHeight>1.6,F=h.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),w=h.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:i.preferences.showCapturedPieces,[n.currentGame?.variant,i.preferences.showCapturedPieces]),N=h.useCallback((B,le,xe)=>{try{n.makeMove(B,le,xe)||(console.error("Invalid move:",B,le),u.playIllegal())}catch(ce){console.error("Error making move:",ce),u.playIllegal()}},[n,u]),H=h.useCallback((B,le)=>{try{const xe=B.toLowerCase();n.makeSANMove(`${B.toUpperCase()}@${le}`)||(console.error("Invalid drop:",B,le),u.playIllegal())}catch(xe){console.error("Error making drop:",xe),u.playIllegal()}},[n,u]),A=h.useCallback(B=>{C(k===B?null:B)},[k]);h.useMemo(()=>{if(n.currentGameInfo){const{white:B,black:le,timeControl:xe,variant:ce}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ce} ${xe}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const U=(()=>{const B=n.moveHistory.length;if(B>0){const le=n.moveHistory[B-1],xe=Math.ceil(B/2),ce=B%2===1,ii=hr(le.san);return`${xe}.${ce?"":".."} ${ii}`}return"Starting position"})(),oe=n.currentOpening,ie=n.currentGame,de=ie||n.lastGameState,K=de?.white||{name:"White",rating:1500,time:900},ve=de?.black||{name:"Black",rating:1500,time:900},pe=!ie||ie.turn==="w",Q=n.shouldShowFlippedBoard,fe=Q?K:ve,ge=Q?ve:K,ue=Q,se=F==="freestyle"?!1:Q?pe:!pe,j=h.useCallback(B=>{n.goToMove(B)},[n]);h.useEffect(()=>{s.initialize()},[s]),h.useEffect(()=>{v&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,v,n.isPlaying,a]),h.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&y(!1)},[n.currentGame,n.isPlaying]),h.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis(b):s.stopAnalysis()},[c,b,s]);const D=h.useCallback(()=>{d(B=>!B)},[]),T=h.useCallback(()=>{f(!0)},[]),I=h.useCallback(()=>{n.clearTransitionFlag(),i.updatePreference("boardFlipped",!i.preferences.boardFlipped)},[i,n]),M=h.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),z=h.useCallback(()=>{a.sendCommand("unexamine")},[a]),G=h.useCallback(()=>{x(!0)},[]),te=h.useCallback(()=>{a.sendCommand("resign"),x(!1)},[a]),ae=h.useCallback(()=>{a.sendCommand("draw"),y(!v)},[a,v]),ee=h.useCallback(()=>{a.sendCommand("abort")},[a]),we=()=>o.jsxs(o.Fragment,{children:[o.jsx(Rn,{$orientation:"portrait",children:o.jsx(Jd,{children:o.jsxs(Zd,{children:[c&&o.jsx(uu,{$boardSize:g,children:o.jsx(Cr,{orientation:"vertical",boardSize:g})}),o.jsx(eu,{children:o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[o.jsxs(Kd,{children:[o.jsxs(En,{$boardLabelColor:S,$boardLabelFontSize:E,children:["Game #",de?.gameId||"?"]}),o.jsx(Mn,{$boardLabelColor:S,$boardLabelFontSize:E,children:de?.timeControl||"?"}),o.jsxs(Xd,{children:[F==="playing"&&o.jsxs(o.Fragment,{children:[n.moveHistory.length<=1&&o.jsx(ke,{onClick:ee,$variant:"secondary",children:"Abort"}),o.jsx(ke,{onClick:ae,$variant:"secondary",children:"Draw"}),o.jsx(ke,{onClick:G,$variant:"secondary",children:"Resign"}),o.jsx(Br,{color:n.playingColor||"white",size:"small"})]}),F==="observing"&&o.jsxs(o.Fragment,{children:[o.jsx(ke,{onClick:M,$variant:"secondary",children:"Unobserve"}),o.jsx(ke,{onClick:D,$variant:"secondary",children:"Analysis"})]}),F==="examining"&&o.jsxs(o.Fragment,{children:[o.jsx(ke,{onClick:z,$variant:"secondary",children:"Unexamine"}),o.jsx(ke,{onClick:D,$variant:"secondary",children:"Analysis"})]}),F==="freestyle"&&o.jsxs(o.Fragment,{children:[o.jsx(ke,{onClick:D,$variant:"secondary",children:"Analysis"}),o.jsx(ke,{onClick:I,$variant:"secondary",children:"Flip"}),o.jsx(ke,{onClick:T,$variant:"secondary",children:"FEN"})]})]})]}),o.jsxs(In,{children:[o.jsx(dt,{player:fe,isActive:se,size:"small",compact:!0}),o.jsx(Dn,{children:o.jsx(lt,{name:fe.name,rating:fe.rating,time:0,isActive:se,isWhite:ue,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),o.jsx(Tn,{$orientation:"portrait",children:o.jsx(Sr,{position:b,flipped:Q,showCoordinates:i.preferences.showCoordinates,onMove:N,onDrop:H,interactive:F==="playing"||F==="freestyle"||F==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:p,selectedCapturedPiece:k,onCapturedPieceSelect:C})}),o.jsxs(In,{children:[o.jsx(dt,{player:ge,isActive:F==="freestyle"?!1:!se,size:"small",compact:!0}),o.jsx(Dn,{children:o.jsx(lt,{name:ge.name,rating:ge.rating,time:0,isActive:F==="freestyle"?!1:!se,isWhite:!ue,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),o.jsxs(Qd,{children:[o.jsx(zn,{$boardLabelColor:S,$boardLabelFontSize:E,children:n.premove?`Premove: ${Hr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,b)}`:U!=="Starting position"?`Last move: ${U}`:"Last move: none"}),oe&&o.jsx(Ln,{$boardLabelColor:S,$boardLabelFontSize:E,children:oe})]}),c&&o.jsx(du,{children:o.jsx(jr,{})})]})}),w&&o.jsx(Gd,{$squareSize:g?g/8:0,children:o.jsxs(Yd,{$squareSize:g?g/8:0,children:[o.jsx(ut,{orientation:"vertical",isWhitePieces:Q,boardSize:g,onPieceClick:A}),o.jsx(ut,{orientation:"vertical",isWhitePieces:!Q,boardSize:g,onPieceClick:A})]})})]})})}),o.jsx(tu,{$orientation:"portrait",$boardSize:g,children:o.jsx(Qt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:j,disableAutoScroll:!0,onNavigate:B=>{if(n.isExamining)switch(B){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(B){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return o.jsxs(Wd,{className:e,$orientation:P?"landscape":"portrait",$hasChat:t,children:[P?o.jsx(o.Fragment,{children:o.jsx(Rn,{$orientation:"landscape",children:o.jsxs(ru,{children:[o.jsx(cu,{children:c&&o.jsx(lu,{$boardSize:g,children:o.jsx(Cr,{orientation:"vertical",boardSize:g})})}),o.jsxs(nu,{$hasAnalysis:c,children:[o.jsxs(_d,{$isWideAspect:L,children:[o.jsxs(Vd,{$chatWidth:r,$hasAnalysis:c,children:[o.jsxs(En,{$boardLabelColor:S,$boardLabelFontSize:E,children:["Game #",de?.gameId||"?"]}),o.jsx(Mn,{$boardLabelColor:S,$boardLabelFontSize:E,children:de?.timeControl||"?"})]}),o.jsx(Ud,{$orientation:"landscape",children:o.jsx(Tn,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:o.jsx(Sr,{position:b,flipped:Q,showCoordinates:i.preferences.showCoordinates,onMove:N,onDrop:H,interactive:F==="playing"||F==="freestyle"||F==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:p,selectedCapturedPiece:k,onCapturedPieceSelect:C})})}),o.jsxs(qd,{$chatWidth:r,$hasAnalysis:c,children:[o.jsx(zn,{$boardLabelColor:S,$boardLabelFontSize:E,children:n.premove?`Premove: ${Hr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,b)}`:U!=="Starting position"?`Last move: ${U}`:"Last move: none"}),oe&&o.jsx(Ln,{$boardLabelColor:S,$boardLabelFontSize:E,children:oe})]}),c&&o.jsx(au,{$chatWidth:r,$hasAnalysis:c,children:o.jsx(jr,{})})]}),o.jsxs(ou,{$isWideAspect:L,$boardSize:g,children:[w&&o.jsx(ut,{orientation:"horizontal",isWhitePieces:ue,boardSize:g,onPieceClick:A}),o.jsx(dt,{player:fe,isActive:se,size:"small",compact:!0,variant:"landscape"}),o.jsxs(iu,{children:[o.jsx(lt,{name:fe.name,rating:fe.rating,time:0,isActive:se,isWhite:ue,orientation:"vertical",hideClockInCard:!0,compact:!0}),o.jsx(Uo,{perspective:F,canAbort:n.moveHistory.length<=1,onAnalysis:D,onFlipBoard:I,onSetupFEN:T,onUnobserve:M,onUnexamine:z,onResign:G,onDraw:ae,onAbort:ee,isAnalysisActive:c,isDrawOffered:v}),o.jsx(su,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:j,showHeader:!1,onNavigate:B=>{if(n.isExamining)switch(B){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(B){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),o.jsx(lt,{name:ge.name,rating:ge.rating,time:0,isActive:!se,isWhite:!ue,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),o.jsx(dt,{player:ge,isActive:F==="freestyle"?!1:!se,size:"small",compact:!0,variant:"landscape"}),w&&o.jsx(ut,{orientation:"horizontal",isWhitePieces:!ue,boardSize:g,onPieceClick:A})]})]})]})})}):we(),o.jsx(Vo,{isOpen:m,onClose:()=>f(!1)}),o.jsx(Hd,{isOpen:$,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:te,onCancel:()=>x(!1)})]})});Xo.displayName="ChessGameLayout";const hu=l.div`
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
`,mu=l.div`
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
`,pu=l.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,fu=l.span`
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
`,gu=l.button`
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
`,xu=l.span`
  font-size: 12px;
  opacity: 0.7;
`,Qo=q(()=>{const{chatStore:e}=Pe(),t=e.sortedTabs,[r,n]=Z.useState(null),[i,s]=Z.useState(null),a=(f,g)=>{n(g),f.dataTransfer.effectAllowed="move"},u=(f,g)=>{f.preventDefault(),f.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},d=(f,g)=>{f.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},m=()=>{n(null),s(null)};return o.jsx(hu,{children:t.map(f=>o.jsxs(mu,{$active:f.id===e.activeTabId,$hasUnread:f.unreadCount>0,$dragging:f.id===r,$dragOver:f.id===i,draggable:!0,onDragStart:g=>a(g,f.id),onDragOver:g=>u(g,f.id),onDragLeave:c,onDrop:g=>d(g,f.id),onDragEnd:m,onClick:()=>e.setActiveTab(f.id),children:[f.type!=="console"&&o.jsx(xu,{$type:f.type}),o.jsx(pu,{children:f.type==="channel"?`(${f.name})`:f.name}),f.unreadCount>0&&o.jsx(fu,{children:f.unreadCount>99?"99+":f.unreadCount}),f.id!=="console"&&o.jsx(gu,{onClick:g=>{g.stopPropagation(),e.closeTab(f.id)},title:"Close tab",children:"×"})]},f.id))})});Qo.displayName="ChatTabs";function yu(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function bu(e){e.scrollTop=e.scrollHeight}function $u(e,t=10){yu(e,t)&&bu(e)}class Jo{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class W{constructor(){this.renderers=new Map}register(t){this.renderers.set(t.type,t)}clear(){this.renderers.clear()}getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}getAllRenderers(){return Array.from(this.renderers.values())}static{this.instance=new W}static register(t){this.instance.register(t)}static getRenderer(t){return this.instance.getRenderer(t)}static getAllRenderers(){return this.instance.getAllRenderers()}static clear(){this.instance.clear()}}const vu=l.pre`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${e=>e.$fontSize}px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${e=>e.theme.colors.text};
`,De=l.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,wu=l.span`
  display: inline;
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  &:hover a {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Zo=q(({content:e,ansiColors:t=!0,elements:r=[]})=>{const{ficsStore:n,preferencesStore:i,backendStore:s}=Pe(),a=i.getChatAppearance(),[u,c]=h.useState(null),d=e.startsWith(`
`)?e.substring(1):e,m=p=>{if(!t)return p;const $={30:"#000000",31:"#CC0000",32:"#4E9A06",33:"#C4A000",34:"#3465A4",35:"#75507B",36:"#06989A",37:"#D3D7CF",90:"#555753",91:"#EF2929",92:"#8AE234",93:"#FCE94F",94:"#729FCF",95:"#AD7FA8",96:"#34E2E2",97:"#EEEEEC"};return p.replace(/\x1b\[(\d+)m/g,(x,v)=>{const y=$[v];return y?`<span style="color: ${y}">`:v==="0"?"</span>":""})},f=p=>{const $=[];if(p.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:|^\s*\w+(?:\([^)]*\))*\((\d+)\):/m)){const v=/(https?:\/\/[^\s]+)\s*$/gm;let y;for(;(y=v.exec(p))!==null;){const k=y[1],C=y.index,P=y.index+y[0].length,S=p.substring(P).match(/^\n\s+([^\s]+)/);if(S&&S[1].match(/[.\/\-?=&]/)){const E=k+S[1],b=P+S[0].length;$.push({start:C,end:b,url:E})}}}return $},g=p=>{const $=m(p),x=f(e),v=[{regex:/(https?:\/\/[^\s]+)/g,handler:(b,R)=>{const L=b[0],F=R||L;return o.jsx(De,{href:F,target:"_blank",rel:"noopener noreferrer",onClick:w=>{w.preventDefault(),window.open(F,"_blank")},children:L})}},{regex:/^(\w+) tells you:/gm,handler:b=>{const R=b[1];return o.jsxs("span",{children:[o.jsx(De,{onClick:L=>{L.preventDefault(),L.stopPropagation(),c({playerName:R,x:L.clientX,y:L.clientY})},children:R}),b[0].substring(R.length)]},`player-${R}`)}},{regex:/\bGame (\d+)\b/g,handler:b=>o.jsx(De,{onClick:R=>{R.preventDefault(),n.sendCommand(`observe ${b[1]}`)},children:b[0]})}],y=s.loggedInUsers.size>0?{regex:/\b[A-Za-z][A-Za-z0-9_-]{2,16}\b/g,handler:b=>{const R=b[0];return s.isUserLoggedIn(R)?o.jsx(De,{onClick:L=>{L.preventDefault(),L.stopPropagation(),c({playerName:R,x:L.clientX,y:L.clientY})},children:R}):R}}:null;if(t&&$!==p)return o.jsx("span",{dangerouslySetInnerHTML:{__html:$}});let k=0;const C=[],P=[],S=[];if(r.forEach(b=>{const R=d!==e?b.start-1:b.start;if(R>=0&&R<p.length){const L=b.type==="command"&&b.text.includes(":")&&(b.text.match(/^\s*\d+\s+/)||b.text.match(/^%\d+:/)||b.text.match(/^\d+:/)),F=(()=>{const w=(()=>{switch(b.type){case"command":return o.jsx(De,{onClick:N=>{N.preventDefault(),n.sendCommand(b.action||b.value)},children:b.text});case"player":return o.jsx(De,{onClick:N=>{N.preventDefault(),N.stopPropagation(),c({playerName:b.text,x:N.clientX,y:N.clientY})},children:b.text});case"gameNumber":return o.jsx(De,{onClick:N=>{N.preventDefault(),n.sendCommand(`observe ${b.value}`)},children:b.text});default:return b.text}})();return L?o.jsx(wu,{children:w}):w})();S.push({start:R,end:R+b.text.length,render:F,priority:20})}}),x.forEach(b=>{const R=p.substring(b.start).match(/^(https?:\/\/[^\s]+)/);if(R){const L=R[1];S.push({start:b.start,end:b.start+L.length,render:o.jsx(De,{href:b.url,target:"_blank",rel:"noopener noreferrer",onClick:F=>{F.preventDefault(),window.open(b.url,"_blank")},children:L}),priority:10}),P.push([b.start,b.end])}}),v.forEach(b=>{const R=new RegExp(b.regex);let L;for(;(L=R.exec(p))!==null;){const F=L.index,w=F+L[0].length;P.some(([H,A])=>F>=H&&F<A||w>H&&w<=A)||S.push({start:F,end:w,render:b.handler(L),priority:1})}}),y){const b=new RegExp(y.regex);let R;for(;(R=b.exec(p))!==null;){const L=R.index,F=L+R[0].length;if(!P.some(([N,H])=>L>=N&&L<H||F>N&&F<=H)){const N=y.handler(R);N!==R[0]&&S.push({start:L,end:F,render:N,priority:0})}}}return S.sort((b,R)=>b.start!==R.start?b.start-R.start:R.priority-b.priority),S.filter((b,R)=>{if(R===0)return!0;const L=S[R-1];return b.start>=L.end}).forEach((b,R)=>{b.start>k&&C.push(p.substring(k,b.start)),C.push(o.jsx(Z.Fragment,{children:b.render},R)),k=b.end}),k<p.length&&C.push(p.substring(k)),C.length>0?C:p};return o.jsxs(o.Fragment,{children:[o.jsx(vu,{$fontSize:a.fontSize,children:g(d)}),u&&o.jsx(Or,{playerName:u.playerName,position:{x:u.x,y:u.y},onClose:()=>c(null)})]})}),An=l.div`
  margin: 0;
`,ku=l.a`
  color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`,Su=({message:e})=>{const{chatStore:t}=Pe(),r=()=>{const n=parseInt(e.metadata?.channelNumber||"0");n>0&&t.loadMoreHistoricalMessages(n)};return o.jsx(ku,{onClick:r,children:e.content})};class Cu extends Jo{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t}){if(t.metadata?.isLoadMore)return o.jsx(An,{children:o.jsx(Su,{message:t})});const r=t.metadata?.parsedMessage?.elements;return o.jsx(An,{children:o.jsx(Zo,{content:t.content,elements:r})})}}class Y extends Jo{render({message:t}){const r=t.metadata?.parsedMessage?.elements;return o.jsx(Zo,{content:t.content,elements:r})}}class ju extends Y{constructor(){super(...arguments),this.type="shout"}}class Pu extends Y{constructor(){super(...arguments),this.type="cshout"}}class Ru extends Y{constructor(){super(...arguments),this.type="notification"}}class Eu extends Y{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Mu extends Y{constructor(){super(...arguments),this.type="matchRequest"}}class zu extends Y{constructor(){super(...arguments),this.type="illegalMove"}}class Lu extends Y{constructor(){super(...arguments),this.type="drawOffer"}}class Tu extends Y{constructor(){super(...arguments),this.type="unobserve"}}class Iu extends Y{constructor(){super(...arguments),this.type="gameNotification"}}class Du extends Y{constructor(){super(...arguments),this.type="whoOutput"}}class Au extends Y{constructor(){super(...arguments),this.type="gamesOutput"}}class Fu extends Y{constructor(){super(...arguments),this.type="fingerOutput"}}class Nu extends Y{constructor(){super(...arguments),this.type="historyOutput"}}class Ou extends Y{constructor(){super(...arguments),this.type="journalOutput"}}class Bu extends Y{constructor(){super(...arguments),this.type="soughtOutput"}}class Hu extends Y{constructor(){super(...arguments),this.type="channelListOutput"}}class Wu extends Y{constructor(){super(...arguments),this.type="newsOutput"}}class _u extends Y{constructor(){super(...arguments),this.type="inOutput"}}class Uu extends Y{constructor(){super(...arguments),this.type="login"}}class Gu extends Y{constructor(){super(...arguments),this.type="password"}}class Yu extends Y{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class Vu extends Y{constructor(){super(...arguments),this.type="sessionStart"}}class qu extends Y{constructor(){super(...arguments),this.type="system"}}class Ku extends Y{constructor(){super(...arguments),this.type="raw"}}class Xu extends Y{constructor(){super(...arguments),this.type="gameEnd"}}class Qu extends Y{constructor(){super(...arguments),this.type="gameStart"}}function Ju(){W.clear(),W.register(new ju),W.register(new Pu),W.register(new Ru),W.register(new Eu),W.register(new Mu),W.register(new zu),W.register(new Lu),W.register(new Tu),W.register(new Iu),W.register(new Du),W.register(new Au),W.register(new Fu),W.register(new Nu),W.register(new Ou),W.register(new Bu),W.register(new Hu),W.register(new Wu),W.register(new _u),W.register(new Uu),W.register(new Gu),W.register(new Yu),W.register(new Vu),W.register(new qu),W.register(new Ku),W.register(new Xu),W.register(new Qu),W.register(new Cu)}Ju();const ht=q(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:i}=Pe(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,u=s?i.getConsoleColor(s,a):null,c=s?i.getConsoleFont(s,a):null,d=s?i.getConsoleFontStyle(s,a):null,m={...e,metadata:{...e.metadata,color:u,fontFamily:c,fontStyle:d}},f=W.getRenderer(m);return f?o.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:f.render({message:m,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),o.jsx("div",{children:e.content}))});ht.displayName="Message";const jt=l.div`
  flex: 1;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.container};
  margin: ${e=>e.theme.spacing[1]};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,Pt=l.div`
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
`,Zu=l.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  min-width: 0;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Fn=l.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,eh=l.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${e=>e.theme.spacing[2]} 0;
  font-size: ${e=>e.theme.typography.fontSize.sm};
`,Rt=l.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,ei=q(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Pe(),i=h.useRef(null),s=t.activeTab,a=s?.messages||[],u=r.username||"You",c=m=>{r.sendCommand(m)};if(h.useEffect(()=>{if(i.current&&a.length>0){const m=i.current,f=setTimeout(()=>{s?.type==="console"?m.scrollTop=m.scrollHeight:$u(m,50)},50);return()=>clearTimeout(f)}},[a.length,a[a.length-1]?.id]),h.useEffect(()=>{if(i.current&&a.length>0){const m=i.current;requestAnimationFrame(()=>{m.scrollTop=m.scrollHeight})}},[s?.id]),h.useEffect(()=>{if(i.current&&s?.lastHistoryLoad){const m=i.current;requestAnimationFrame(()=>{m.scrollTop=m.scrollHeight})}},[s?.lastHistoryLoad]),!s)return o.jsx(jt,{children:o.jsx(Pt,{className:"chat-messages-container",children:o.jsx(Fn,{children:"No active chat"})})});if(a.length===0)return o.jsx(jt,{children:o.jsx(Pt,{className:"chat-messages-container",children:o.jsx(Fn,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const d=[];return a.forEach((m,f)=>{const g=f>0?a[f-1]:null,p=g?new Date(m.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===m.sender&&g.type===m.type&&p<6e4?d[d.length-1].messages.push(m):d.push({sender:m.sender,timestamp:new Date(m.timestamp),messages:[m]})}),s.type==="console"?o.jsx(jt,{children:o.jsx(Pt,{ref:i,className:"chat-messages-container",children:a.map(m=>o.jsx(Rt,{children:o.jsx(ht,{message:m,currentUsername:u,onCommandClick:c,onHover:e})},m.id))})}):o.jsx(jt,{children:o.jsx(Pt,{ref:i,className:"chat-messages-container",children:d.map((m,f)=>m.messages[0].type==="system"?o.jsx(eh,{children:m.messages.map(p=>o.jsx(Rt,{children:o.jsx(ht,{message:p,currentUsername:u,onCommandClick:c,onHover:e})},p.id))},f):o.jsx(Zu,{children:m.messages.map((p,$)=>{if($===0)return o.jsx(Rt,{children:o.jsx(ht,{message:p,currentUsername:u,onCommandClick:c,onHover:e})},p.id);{const x={...p,sender:"",metadata:{...p.metadata,isGroupedMessage:!0}};return o.jsx(Rt,{children:o.jsx(ht,{message:x,currentUsername:u,onCommandClick:c,onHover:e})},p.id)}})},f))})})});ei.displayName="ChatMessages";const th=l.div`
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
`,rh=l.textarea`
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
`,nh=l.button`
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
`,ti=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:i="Type a message...",disabled:s=!1})=>{const a=h.useRef(null),u=d=>{d.key==="Enter"&&!d.shiftKey?(d.preventDefault(),e&&r(e)):d.key==="ArrowUp"&&!e?(d.preventDefault(),n?.("up")):d.key==="ArrowDown"&&(d.preventDefault(),n?.("down"))},c=()=>{e&&r(e)};return o.jsxs(th,{children:[o.jsx(rh,{ref:a,value:e,onChange:d=>t(d.target.value),onKeyDown:u,placeholder:i,disabled:s,autoComplete:"off",spellCheck:"true",rows:1}),o.jsx(nh,{onClick:c,disabled:s||!e,title:"Send message (Enter)",children:"Send"})]})};ti.displayName="ChatInput";const oh=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,ih=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,sh=l.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ah=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,ch=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,lh=l.div`
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
`,ri=q(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:i}=Pe(),[s,a]=h.useState(""),[u,c]=h.useState(!1),[d,m]=h.useState(null);Z.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),Z.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const f=p=>{if(console.log("handleSendMessage called with:",p,"Length:",p.length),!p.trim())return;const $=p.split(`
`);if($.length>1){$.forEach(x=>{x&&f(x)}),a("");return}if(r.addToHistory(p),p==="/help"||p==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:p,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(p.startsWith("/")||p.startsWith("\\")){const x=p.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:p,timestamp:new Date,type:"message"}),n.sendCommand(x)}else{const x=r.activeTab;if(!x)return;if(x.type==="channel"){const v=x.id.replace("channel-","");n.sendCommand(`tell ${v} ${p}`)}else if(x.type==="private")r.addMessage(x.id,{channel:x.id,sender:"You",content:p,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${x.id} ${p}`);else{const v=p.match(/^tell\s+(\w+)\s+(.+)$/);if(v){const[,y,k]=v,C=y.replace(/\([^)]*\)/g,"").trim(),P=/^\d+$/.test(C);if(P&&i.preferences.openChannelsInTabs){const S=`channel-${C}`;r.createTab(S,C,"channel")}else if(!P&&i.preferences.openTellsInTabs){const S=C.toLowerCase();r.createTab(S,C,"private"),r.addMessage(S,{channel:S,sender:"You",content:k,timestamp:new Date,type:"message"})}}else r.addMessage("console",{channel:"console",sender:"You",content:p,timestamp:new Date,type:"message"});n.sendCommand(p)}}a("")},g=p=>{const $=r.navigateHistory(p);$!==null&&a($)};return o.jsxs(oh,{className:e,$compact:t,children:[!t&&o.jsxs(ih,{children:[o.jsx(sh,{children:"Chat"}),n.averagePing!==null&&o.jsxs(ch,{children:["Ping: ",n.averagePing,"ms"]}),d&&o.jsxs(ah,{children:["Received: ",new Date(d).toLocaleTimeString()]})]}),o.jsxs(lh,{children:[o.jsx(Qo,{}),o.jsx(ei,{onMessageHover:m}),o.jsx(ti,{value:s,onChange:a,onSend:f,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});ri.displayName="ChatPanel";const dh=l.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,uh=l.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,hh=l.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,mh=l.div`
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
`,ph=l.div`
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
`,ni=q(()=>{const{preferencesStore:e}=Pe(),{viewMode:t,autoViewMode:r}=e.preferences,n=Oe(),i=Fo(),s=No(),a=ac(),[u,c]=h.useState(600),[d,m]=h.useState(!1),f=h.useRef(!1);h.useEffect(()=>{!f.current&&r&&(f.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),h.useEffect(()=>{i.includes(t)||e.updatePreference("viewMode","chess-only")},[i,t,e]),h.useEffect(()=>{const v=e.preferences.chessOrientation;s.includes(v)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=v=>{v.preventDefault(),m(!0)};h.useEffect(()=>{if(!d)return;const v=k=>{const C=window.innerWidth-k.clientX;c(Math.max(300,Math.min(600,C))),window.dispatchEvent(new Event("resize"))},y=()=>{m(!1)};return document.addEventListener("mousemove",v),document.addEventListener("mouseup",y),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",y)}},[d]);const p=t==="chess-only"||t==="chess-and-chat",$=t==="chat-only"||t==="chess-and-chat",x=t==="chess-and-chat"&&!n.isMobile;return o.jsxs(dh,{children:[o.jsx(Bo,{}),o.jsxs(uh,{children:[o.jsx(hh,{$isVisible:p,children:o.jsx(Xo,{hasChat:$,chatWidth:$&&!n.isMobile?u:0})}),x&&o.jsx(ph,{$isVisible:!0,onMouseDown:g,style:{cursor:d?"col-resize":"ew-resize"}}),o.jsx(mh,{$isVisible:$,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:$&&!n.isMobile?`${u}px`:void 0},children:o.jsx(ri,{})})]})]})});ni.displayName="AppLayout";const fh=Xa`
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
`,gh=()=>o.jsx(ci,{children:o.jsxs(Ja,{children:[o.jsx(fh,{}),o.jsx(Is,{children:o.jsx(ds,{children:o.jsx(Jn,{path:"/",element:o.jsx(lc,{children:o.jsx(ni,{})})})})})]})}),oi=document.getElementById("root");if(!oi)throw new Error("Root element not found");const xh=Bn(oi);xh.render(o.jsx(gh,{}));
