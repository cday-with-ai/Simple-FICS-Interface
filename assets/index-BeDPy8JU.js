import{u as Ae,j as o,a as Nn,b as Ee,c as Wt,d as On,e as hr,f as Ht,V as oi,g as ii,l as Wr,R as si}from"./shared-CaOO36gP.js";import{a as ai,r as h,R as Z}from"./vendor-B9TH31lo.js";import{o as q}from"./mobx-DYHm8Bkn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var Fn,Hr=ai;Fn=Hr.createRoot,Hr.hydrateRoot;var Pr={};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.parse=mi;Pr.serialize=fi;const ci=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,li=/^[\u0021-\u003A\u003C-\u007E]*$/,di=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,ui=/^[\u0020-\u003A\u003D-\u007E]*$/,hi=Object.prototype.toString,pi=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function mi(e,t){const r=new pi,n=e.length;if(n<2)return r;const i=t?.decode||gi;let s=0;do{const a=e.indexOf("=",s);if(a===-1)break;const u=e.indexOf(";",s),c=u===-1?n:u;if(a>c){s=e.lastIndexOf(";",a-1)+1;continue}const d=_r(e,s,a),p=Ur(e,a,d),m=e.slice(d,p);if(r[m]===void 0){let g=_r(e,a+1,c),f=Ur(e,c,g);const v=i(e.slice(g,f));r[m]=v}s=c+1}while(s<n);return r}function _r(e,t,r){do{const n=e.charCodeAt(t);if(n!==32&&n!==9)return t}while(++t<r);return r}function Ur(e,t,r){for(;t>r;){const n=e.charCodeAt(--t);if(n!==32&&n!==9)return t+1}return r}function fi(e,t,r){const n=r?.encode||encodeURIComponent;if(!ci.test(e))throw new TypeError(`argument name is invalid: ${e}`);const i=n(t);if(!li.test(i))throw new TypeError(`argument val is invalid: ${t}`);let s=e+"="+i;if(!r)return s;if(r.maxAge!==void 0){if(!Number.isInteger(r.maxAge))throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);s+="; Max-Age="+r.maxAge}if(r.domain){if(!di.test(r.domain))throw new TypeError(`option domain is invalid: ${r.domain}`);s+="; Domain="+r.domain}if(r.path){if(!ui.test(r.path))throw new TypeError(`option path is invalid: ${r.path}`);s+="; Path="+r.path}if(r.expires){if(!xi(r.expires)||!Number.isFinite(r.expires.valueOf()))throw new TypeError(`option expires is invalid: ${r.expires}`);s+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority)switch(typeof r.priority=="string"?r.priority.toLowerCase():void 0){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${r.priority}`)}if(r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:case"strict":s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"none":s+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${r.sameSite}`)}return s}function gi(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function xi(e){return hi.call(e)==="[object Date]"}var Gr="popstate";function yi(e={}){function t(n,i){let{pathname:s,search:a,hash:u}=n.location;return pr("",{pathname:s,search:a,hash:u},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(n,i){return typeof i=="string"?i:mt(i)}return $i(t,r,null,e)}function X(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function we(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function bi(){return Math.random().toString(36).substring(2,10)}function Yr(e,t){return{usr:e.state,key:e.key,idx:t}}function pr(e,t,r=null,n){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?nt(t):t,state:r,key:t&&t.key||n||bi()}}function mt({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function nt(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function $i(e,t,r,n={}){let{window:i=document.defaultView,v5Compat:s=!1}=n,a=i.history,u="POP",c=null,d=p();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function p(){return(a.state||{idx:null}).idx}function m(){u="POP";let b=p(),y=b==null?null:b-d;d=b,c&&c({action:u,location:x.location,delta:y})}function g(b,y){u="PUSH";let C=pr(x.location,b,y);d=p()+1;let S=Yr(C,d),R=x.createHref(C);try{a.pushState(S,"",R)}catch($){if($ instanceof DOMException&&$.name==="DataCloneError")throw $;i.location.assign(R)}s&&c&&c({action:u,location:x.location,delta:1})}function f(b,y){u="REPLACE";let C=pr(x.location,b,y);d=p();let S=Yr(C,d),R=x.createHref(C);a.replaceState(S,"",R),s&&c&&c({action:u,location:x.location,delta:0})}function v(b){return vi(b)}let x={get action(){return u},get location(){return e(i,a)},listen(b){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(Gr,m),c=b,()=>{i.removeEventListener(Gr,m),c=null}},createHref(b){return t(i,b)},createURL:v,encodeLocation(b){let y=v(b);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:f,go(b){return a.go(b)}};return x}function vi(e,t=!1){let r="http://localhost";typeof window<"u"&&(r=window.location.origin!=="null"?window.location.origin:window.location.href),X(r,"No window.location.(origin|href) available to create URL");let n=typeof e=="string"?e:mt(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}function Bn(e,t,r="/"){return wi(e,t,r,!1)}function wi(e,t,r,n){let i=typeof t=="string"?nt(t):t,s=Re(i.pathname||"/",r);if(s==null)return null;let a=Wn(e);ki(a);let u=null;for(let c=0;u==null&&c<a.length;++c){let d=Ii(s);u=Ti(a[c],d,n)}return u}function Wn(e,t=[],r=[],n=""){let i=(s,a,u)=>{let c={relativePath:u===void 0?s.path||"":u,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(X(c.relativePath.startsWith(n),`Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(n.length));let d=Pe([n,c.relativePath]),p=r.concat(c);s.children&&s.children.length>0&&(X(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Wn(s.children,t,p,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Mi(d,s.index),routesMeta:p})};return e.forEach((s,a)=>{if(s.path===""||!s.path?.includes("?"))i(s,a);else for(let u of Hn(s.path))i(s,a,u)}),t}function Hn(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,i=r.endsWith("?"),s=r.replace(/\?$/,"");if(n.length===0)return i?[s,""]:[s];let a=Hn(n.join("/")),u=[];return u.push(...a.map(c=>c===""?s:[s,c].join("/"))),i&&u.push(...a),u.map(c=>e.startsWith("/")&&c===""?"/":c)}function ki(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:zi(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}var Si=/^:[\w-]+$/,Ci=3,ji=2,Pi=1,Ri=10,Ei=-2,Vr=e=>e==="*";function Mi(e,t){let r=e.split("/"),n=r.length;return r.some(Vr)&&(n+=Ei),t&&(n+=ji),r.filter(i=>!Vr(i)).reduce((i,s)=>i+(Si.test(s)?Ci:s===""?Pi:Ri),n)}function zi(e,t){return e.length===t.length&&e.slice(0,-1).every((n,i)=>n===t[i])?e[e.length-1]-t[t.length-1]:0}function Ti(e,t,r=!1){let{routesMeta:n}=e,i={},s="/",a=[];for(let u=0;u<n.length;++u){let c=n[u],d=u===n.length-1,p=s==="/"?t:t.slice(s.length)||"/",m=At({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},p),g=c.route;if(!m&&d&&r&&!n[n.length-1].route.index&&(m=At({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},p)),!m)return null;Object.assign(i,m.params),a.push({params:i,pathname:Pe([s,m.pathname]),pathnameBase:Oi(Pe([s,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(s=Pe([s,m.pathnameBase]))}return a}function At(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Li(e.path,e.caseSensitive,e.end),i=t.match(r);if(!i)return null;let s=i[0],a=s.replace(/(.)\/+$/,"$1"),u=i.slice(1);return{params:n.reduce((d,{paramName:p,isOptional:m},g)=>{if(p==="*"){let v=u[g]||"";a=s.slice(0,s.length-v.length).replace(/(.)\/+$/,"$1")}const f=u[g];return m&&!f?d[p]=void 0:d[p]=(f||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function Li(e,t=!1,r=!0){we(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,u,c)=>(n.push({paramName:u,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),n]}function Ii(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return we(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Re(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Di(e,t="/"){let{pathname:r,search:n="",hash:i=""}=typeof e=="string"?nt(e):e;return{pathname:r?r.startsWith("/")?r:Ai(r,t):t,search:Fi(n),hash:Bi(i)}}function Ai(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?r.length>1&&r.pop():i!=="."&&r.push(i)}),r.length>1?r.join("/"):"/"}function Jt(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ni(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function _n(e){let t=Ni(e);return t.map((r,n)=>n===t.length-1?r.pathname:r.pathnameBase)}function Un(e,t,r,n=!1){let i;typeof e=="string"?i=nt(e):(i={...e},X(!i.pathname||!i.pathname.includes("?"),Jt("?","pathname","search",i)),X(!i.pathname||!i.pathname.includes("#"),Jt("#","pathname","hash",i)),X(!i.search||!i.search.includes("#"),Jt("#","search","hash",i)));let s=e===""||i.pathname==="",a=s?"/":i.pathname,u;if(a==null)u=r;else{let m=t.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),m-=1;i.pathname=g.join("/")}u=m>=0?t[m]:"/"}let c=Di(i,u),d=a&&a!=="/"&&a.endsWith("/"),p=(s||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||p)&&(c.pathname+="/"),c}var Pe=e=>e.join("/").replace(/\/\/+/g,"/"),Oi=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Fi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Bi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Wi(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Gn=["POST","PUT","PATCH","DELETE"];new Set(Gn);var Hi=["GET",...Gn];new Set(Hi);var ot=h.createContext(null);ot.displayName="DataRouter";var _t=h.createContext(null);_t.displayName="DataRouterState";var Yn=h.createContext({isTransitioning:!1});Yn.displayName="ViewTransition";var _i=h.createContext(new Map);_i.displayName="Fetchers";var Ui=h.createContext(null);Ui.displayName="Await";var ke=h.createContext(null);ke.displayName="Navigation";var yt=h.createContext(null);yt.displayName="Location";var Me=h.createContext({outlet:null,matches:[],isDataRoute:!1});Me.displayName="Route";var Rr=h.createContext(null);Rr.displayName="RouteError";function Gi(e,{relative:t}={}){X(bt(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:n}=h.useContext(ke),{hash:i,pathname:s,search:a}=$t(e,{relative:t}),u=s;return r!=="/"&&(u=s==="/"?r:Pe([r,s])),n.createHref({pathname:u,search:a,hash:i})}function bt(){return h.useContext(yt)!=null}function Ge(){return X(bt(),"useLocation() may be used only in the context of a <Router> component."),h.useContext(yt).location}var Vn="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function qn(e){h.useContext(ke).static||h.useLayoutEffect(e)}function Yi(){let{isDataRoute:e}=h.useContext(Me);return e?is():Vi()}function Vi(){X(bt(),"useNavigate() may be used only in the context of a <Router> component.");let e=h.useContext(ot),{basename:t,navigator:r}=h.useContext(ke),{matches:n}=h.useContext(Me),{pathname:i}=Ge(),s=JSON.stringify(_n(n)),a=h.useRef(!1);return qn(()=>{a.current=!0}),h.useCallback((c,d={})=>{if(we(a.current,Vn),!a.current)return;if(typeof c=="number"){r.go(c);return}let p=Un(c,JSON.parse(s),i,d.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:Pe([t,p.pathname])),(d.replace?r.replace:r.push)(p,d.state,d)},[t,r,s,i,e])}h.createContext(null);function $t(e,{relative:t}={}){let{matches:r}=h.useContext(Me),{pathname:n}=Ge(),i=JSON.stringify(_n(r));return h.useMemo(()=>Un(e,JSON.parse(i),n,t==="path"),[e,i,n,t])}function qi(e,t){return Kn(e,t)}function Kn(e,t,r,n){X(bt(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=h.useContext(ke),{matches:s}=h.useContext(Me),a=s[s.length-1],u=a?a.params:{},c=a?a.pathname:"/",d=a?a.pathnameBase:"/",p=a&&a.route;{let y=p&&p.path||"";Xn(c,!p||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let m=Ge(),g;if(t){let y=typeof t=="string"?nt(t):t;X(d==="/"||y.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${y.pathname}" was given in the \`location\` prop.`),g=y}else g=m;let f=g.pathname||"/",v=f;if(d!=="/"){let y=d.replace(/^\//,"").split("/");v="/"+f.replace(/^\//,"").split("/").slice(y.length).join("/")}let x=Bn(e,{pathname:v});we(p||x!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),we(x==null||x[x.length-1].route.element!==void 0||x[x.length-1].route.Component!==void 0||x[x.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let b=Zi(x&&x.map(y=>Object.assign({},y,{params:Object.assign({},u,y.params),pathname:Pe([d,i.encodeLocation?i.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?d:Pe([d,i.encodeLocation?i.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),s,r,n);return t&&b?h.createElement(yt.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},b):b}function Ki(){let e=os(),t=Wi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:n},s={padding:"2px 4px",backgroundColor:n},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=h.createElement(h.Fragment,null,h.createElement("p",null,"💿 Hey developer 👋"),h.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",h.createElement("code",{style:s},"ErrorBoundary")," or"," ",h.createElement("code",{style:s},"errorElement")," prop on your route.")),h.createElement(h.Fragment,null,h.createElement("h2",null,"Unexpected Application Error!"),h.createElement("h3",{style:{fontStyle:"italic"}},t),r?h.createElement("pre",{style:i},r):null,a)}var Xi=h.createElement(Ki,null),Qi=class extends h.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?h.createElement(Me.Provider,{value:this.props.routeContext},h.createElement(Rr.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Ji({routeContext:e,match:t,children:r}){let n=h.useContext(ot);return n&&n.static&&n.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(n.staticContext._deepestRenderedBoundaryId=t.route.id),h.createElement(Me.Provider,{value:e},r)}function Zi(e,t=[],r=null,n=null){if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,s=r?.errors;if(s!=null){let c=i.findIndex(d=>d.route.id&&s?.[d.route.id]!==void 0);X(c>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),i=i.slice(0,Math.min(i.length,c+1))}let a=!1,u=-1;if(r)for(let c=0;c<i.length;c++){let d=i[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=c),d.route.id){let{loaderData:p,errors:m}=r,g=d.route.loader&&!p.hasOwnProperty(d.route.id)&&(!m||m[d.route.id]===void 0);if(d.route.lazy||g){a=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}return i.reduceRight((c,d,p)=>{let m,g=!1,f=null,v=null;r&&(m=s&&d.route.id?s[d.route.id]:void 0,f=d.route.errorElement||Xi,a&&(u<0&&p===0?(Xn("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,v=null):u===p&&(g=!0,v=d.route.hydrateFallbackElement||null)));let x=t.concat(i.slice(0,p+1)),b=()=>{let y;return m?y=f:g?y=v:d.route.Component?y=h.createElement(d.route.Component,null):d.route.element?y=d.route.element:y=c,h.createElement(Ji,{match:d,routeContext:{outlet:c,matches:x,isDataRoute:r!=null},children:y})};return r&&(d.route.ErrorBoundary||d.route.errorElement||p===0)?h.createElement(Qi,{location:r.location,revalidation:r.revalidation,component:f,error:m,children:b(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):b()},null)}function Er(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function es(e){let t=h.useContext(ot);return X(t,Er(e)),t}function ts(e){let t=h.useContext(_t);return X(t,Er(e)),t}function rs(e){let t=h.useContext(Me);return X(t,Er(e)),t}function Mr(e){let t=rs(e),r=t.matches[t.matches.length-1];return X(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function ns(){return Mr("useRouteId")}function os(){let e=h.useContext(Rr),t=ts("useRouteError"),r=Mr("useRouteError");return e!==void 0?e:t.errors?.[r]}function is(){let{router:e}=es("useNavigate"),t=Mr("useNavigate"),r=h.useRef(!1);return qn(()=>{r.current=!0}),h.useCallback(async(i,s={})=>{we(r.current,Vn),r.current&&(typeof i=="number"?e.navigate(i):await e.navigate(i,{fromRouteId:t,...s}))},[e,t])}var qr={};function Xn(e,t,r){!t&&!qr[e]&&(qr[e]=!0,we(!1,r))}h.memo(ss);function ss({routes:e,future:t,state:r}){return Kn(e,void 0,r,t)}function Qn(e){X(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function as({basename:e="/",children:t=null,location:r,navigationType:n="POP",navigator:i,static:s=!1}){X(!bt(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),u=h.useMemo(()=>({basename:a,navigator:i,static:s,future:{}}),[a,i,s]);typeof r=="string"&&(r=nt(r));let{pathname:c="/",search:d="",hash:p="",state:m=null,key:g="default"}=r,f=h.useMemo(()=>{let v=Re(c,a);return v==null?null:{location:{pathname:v,search:d,hash:p,state:m,key:g},navigationType:n}},[a,c,d,p,m,g,n]);return we(f!=null,`<Router basename="${a}"> is not able to match the URL "${c}${d}${p}" because it does not start with the basename, so the <Router> won't render anything.`),f==null?null:h.createElement(ke.Provider,{value:u},h.createElement(yt.Provider,{children:t,value:f}))}function cs({children:e,location:t}){return qi(mr(e),t)}function mr(e,t=[]){let r=[];return h.Children.forEach(e,(n,i)=>{if(!h.isValidElement(n))return;let s=[...t,i];if(n.type===h.Fragment){r.push.apply(r,mr(n.props.children,s));return}X(n.type===Qn,`[${typeof n.type=="string"?n.type:n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),X(!n.props.index||!n.props.children,"An index route cannot have child routes.");let a={id:n.props.id||s.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,hydrateFallbackElement:n.props.hydrateFallbackElement,HydrateFallback:n.props.HydrateFallback,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.hasErrorBoundary===!0||n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=mr(n.props.children,s)),r.push(a)}),r}var Et="get",Mt="application/x-www-form-urlencoded";function Ut(e){return e!=null&&typeof e.tagName=="string"}function ls(e){return Ut(e)&&e.tagName.toLowerCase()==="button"}function ds(e){return Ut(e)&&e.tagName.toLowerCase()==="form"}function us(e){return Ut(e)&&e.tagName.toLowerCase()==="input"}function hs(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ps(e,t){return e.button===0&&(!t||t==="_self")&&!hs(e)}var wt=null;function ms(){if(wt===null)try{new FormData(document.createElement("form"),0),wt=!1}catch{wt=!0}return wt}var fs=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Zt(e){return e!=null&&!fs.has(e)?(we(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Mt}"`),null):e}function gs(e,t){let r,n,i,s,a;if(ds(e)){let u=e.getAttribute("action");n=u?Re(u,t):null,r=e.getAttribute("method")||Et,i=Zt(e.getAttribute("enctype"))||Mt,s=new FormData(e)}else if(ls(e)||us(e)&&(e.type==="submit"||e.type==="image")){let u=e.form;if(u==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||u.getAttribute("action");if(n=c?Re(c,t):null,r=e.getAttribute("formmethod")||u.getAttribute("method")||Et,i=Zt(e.getAttribute("formenctype"))||Zt(u.getAttribute("enctype"))||Mt,s=new FormData(u,e),!ms()){let{name:d,type:p,value:m}=e;if(p==="image"){let g=d?`${d}.`:"";s.append(`${g}x`,"0"),s.append(`${g}y`,"0")}else d&&s.append(d,m)}}else{if(Ut(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Et,n=null,i=Mt,a=e}return s&&i==="text/plain"&&(a=s,s=void 0),{action:n,method:r.toLowerCase(),encType:i,formData:s,body:a}}function zr(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function xs(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ys(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function bs(e,t,r){let n=await Promise.all(e.map(async i=>{let s=t.routes[i.route.id];if(s){let a=await xs(s,r);return a.links?a.links():[]}return[]}));return ks(n.flat(1).filter(ys).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function Kr(e,t,r,n,i,s){let a=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,u=(c,d)=>r[d].pathname!==c.pathname||r[d].route.path?.endsWith("*")&&r[d].params["*"]!==c.params["*"];return s==="assets"?t.filter((c,d)=>a(c,d)||u(c,d)):s==="data"?t.filter((c,d)=>{let p=n.routes[c.route.id];if(!p||!p.hasLoader)return!1;if(a(c,d)||u(c,d))return!0;if(c.route.shouldRevalidate){let m=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function $s(e,t,{includeHydrateFallback:r}={}){return vs(e.map(n=>{let i=t.routes[n.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),r&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function vs(e){return[...new Set(e)]}function ws(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function ks(e,t){let r=new Set;return new Set(t),e.reduce((n,i)=>{let s=JSON.stringify(ws(i));return r.has(s)||(r.add(s),n.push({key:s,link:i})),n},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Ss=new Set([100,101,204,205]);function Cs(e,t){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname="_root.data":t&&Re(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.data`:r.pathname=`${r.pathname.replace(/\/$/,"")}.data`,r}function Jn(){let e=h.useContext(ot);return zr(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function js(){let e=h.useContext(_t);return zr(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Tr=h.createContext(void 0);Tr.displayName="FrameworkContext";function Zn(){let e=h.useContext(Tr);return zr(e,"You must render this element inside a <HydratedRouter> element"),e}function Ps(e,t){let r=h.useContext(Tr),[n,i]=h.useState(!1),[s,a]=h.useState(!1),{onFocus:u,onBlur:c,onMouseEnter:d,onMouseLeave:p,onTouchStart:m}=t,g=h.useRef(null);h.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let x=y=>{y.forEach(C=>{a(C.isIntersecting)})},b=new IntersectionObserver(x,{threshold:.5});return g.current&&b.observe(g.current),()=>{b.disconnect()}}},[e]),h.useEffect(()=>{if(n){let x=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(x)}}},[n]);let f=()=>{i(!0)},v=()=>{i(!1),a(!1)};return r?e!=="intent"?[s,g,{}]:[s,g,{onFocus:at(u,f),onBlur:at(c,v),onMouseEnter:at(d,f),onMouseLeave:at(p,v),onTouchStart:at(m,f)}]:[!1,g,{}]}function at(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Rs({page:e,...t}){let{router:r}=Jn(),n=h.useMemo(()=>Bn(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?h.createElement(Ms,{page:e,matches:n,...t}):null}function Es(e){let{manifest:t,routeModules:r}=Zn(),[n,i]=h.useState([]);return h.useEffect(()=>{let s=!1;return bs(e,t,r).then(a=>{s||i(a)}),()=>{s=!0}},[e,t,r]),n}function Ms({page:e,matches:t,...r}){let n=Ge(),{manifest:i,routeModules:s}=Zn(),{basename:a}=Jn(),{loaderData:u,matches:c}=js(),d=h.useMemo(()=>Kr(e,t,c,i,n,"data"),[e,t,c,i,n]),p=h.useMemo(()=>Kr(e,t,c,i,n,"assets"),[e,t,c,i,n]),m=h.useMemo(()=>{if(e===n.pathname+n.search+n.hash)return[];let v=new Set,x=!1;if(t.forEach(y=>{let C=i.routes[y.route.id];!C||!C.hasLoader||(!d.some(S=>S.route.id===y.route.id)&&y.route.id in u&&s[y.route.id]?.shouldRevalidate||C.hasClientLoader?x=!0:v.add(y.route.id))}),v.size===0)return[];let b=Cs(e,a);return x&&v.size>0&&b.searchParams.set("_routes",t.filter(y=>v.has(y.route.id)).map(y=>y.route.id).join(",")),[b.pathname+b.search]},[a,u,n,i,d,t,e,s]),g=h.useMemo(()=>$s(p,i),[p,i]),f=Es(p);return h.createElement(h.Fragment,null,m.map(v=>h.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...r})),g.map(v=>h.createElement("link",{key:v,rel:"modulepreload",href:v,...r})),f.map(({key:v,link:x})=>h.createElement("link",{key:v,...x})))}function zs(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var eo=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{eo&&(window.__reactRouterVersion="7.6.3")}catch{}function Ts({basename:e,children:t,window:r}){let n=h.useRef();n.current==null&&(n.current=yi({window:r,v5Compat:!0}));let i=n.current,[s,a]=h.useState({action:i.action,location:i.location}),u=h.useCallback(c=>{h.startTransition(()=>a(c))},[a]);return h.useLayoutEffect(()=>i.listen(u),[i,u]),h.createElement(as,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:i})}var to=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ro=h.forwardRef(function({onClick:t,discover:r="render",prefetch:n="none",relative:i,reloadDocument:s,replace:a,state:u,target:c,to:d,preventScrollReset:p,viewTransition:m,...g},f){let{basename:v}=h.useContext(ke),x=typeof d=="string"&&to.test(d),b,y=!1;if(typeof d=="string"&&x&&(b=d,eo))try{let O=new URL(window.location.href),H=d.startsWith("//")?new URL(O.protocol+d):new URL(d),w=Re(H.pathname,v);H.origin===O.origin&&w!=null?d=w+H.search+H.hash:y=!0}catch{we(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let C=Gi(d,{relative:i}),[S,R,$]=Ps(n,g),j=As(d,{replace:a,state:u,target:c,preventScrollReset:p,relative:i,viewTransition:m});function k(O){t&&t(O),O.defaultPrevented||j(O)}let L=h.createElement("a",{...g,...$,href:b||C,onClick:y||s?t:k,ref:zs(f,R),target:c,"data-discover":!x&&r==="render"?"true":void 0});return S&&!x?h.createElement(h.Fragment,null,L,h.createElement(Rs,{page:C})):L});ro.displayName="Link";var Ls=h.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:n="",end:i=!1,style:s,to:a,viewTransition:u,children:c,...d},p){let m=$t(a,{relative:d.relative}),g=Ge(),f=h.useContext(_t),{navigator:v,basename:x}=h.useContext(ke),b=f!=null&&Ws(m)&&u===!0,y=v.encodeLocation?v.encodeLocation(m).pathname:m.pathname,C=g.pathname,S=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;r||(C=C.toLowerCase(),S=S?S.toLowerCase():null,y=y.toLowerCase()),S&&x&&(S=Re(S,x)||S);const R=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let $=C===y||!i&&C.startsWith(y)&&C.charAt(R)==="/",j=S!=null&&(S===y||!i&&S.startsWith(y)&&S.charAt(y.length)==="/"),k={isActive:$,isPending:j,isTransitioning:b},L=$?t:void 0,O;typeof n=="function"?O=n(k):O=[n,$?"active":null,j?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let H=typeof s=="function"?s(k):s;return h.createElement(ro,{...d,"aria-current":L,className:O,ref:p,style:H,to:a,viewTransition:u},typeof c=="function"?c(k):c)});Ls.displayName="NavLink";var Is=h.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:n,replace:i,state:s,method:a=Et,action:u,onSubmit:c,relative:d,preventScrollReset:p,viewTransition:m,...g},f)=>{let v=Fs(),x=Bs(u,{relative:d}),b=a.toLowerCase()==="get"?"get":"post",y=typeof u=="string"&&to.test(u),C=S=>{if(c&&c(S),S.defaultPrevented)return;S.preventDefault();let R=S.nativeEvent.submitter,$=R?.getAttribute("formmethod")||a;v(R||S.currentTarget,{fetcherKey:t,method:$,navigate:r,replace:i,state:s,relative:d,preventScrollReset:p,viewTransition:m})};return h.createElement("form",{ref:f,method:b,action:x,onSubmit:n?c:C,...g,"data-discover":!y&&e==="render"?"true":void 0})});Is.displayName="Form";function Ds(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function no(e){let t=h.useContext(ot);return X(t,Ds(e)),t}function As(e,{target:t,replace:r,state:n,preventScrollReset:i,relative:s,viewTransition:a}={}){let u=Yi(),c=Ge(),d=$t(e,{relative:s});return h.useCallback(p=>{if(ps(p,t)){p.preventDefault();let m=r!==void 0?r:mt(c)===mt(d);u(e,{replace:m,state:n,preventScrollReset:i,relative:s,viewTransition:a})}},[c,u,d,r,n,t,e,i,s,a])}var Ns=0,Os=()=>`__${String(++Ns)}__`;function Fs(){let{router:e}=no("useSubmit"),{basename:t}=h.useContext(ke),r=ns();return h.useCallback(async(n,i={})=>{let{action:s,method:a,encType:u,formData:c,body:d}=gs(n,t);if(i.navigate===!1){let p=i.fetcherKey||Os();await e.fetch(p,r,i.action||s,{preventScrollReset:i.preventScrollReset,formData:c,body:d,formMethod:i.method||a,formEncType:i.encType||u,flushSync:i.flushSync})}else await e.navigate(i.action||s,{preventScrollReset:i.preventScrollReset,formData:c,body:d,formMethod:i.method||a,formEncType:i.encType||u,replace:i.replace,state:i.state,fromRouteId:r,flushSync:i.flushSync,viewTransition:i.viewTransition})},[e,t,r])}function Bs(e,{relative:t}={}){let{basename:r}=h.useContext(ke),n=h.useContext(Me);X(n,"useFormAction must be used inside a RouteContext");let[i]=n.matches.slice(-1),s={...$t(e||".",{relative:t})},a=Ge();if(e==null){s.search=a.search;let u=new URLSearchParams(s.search),c=u.getAll("index");if(c.some(p=>p==="")){u.delete("index"),c.filter(m=>m).forEach(m=>u.append("index",m));let p=u.toString();s.search=p?`?${p}`:""}}return(!e||e===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Pe([r,s.pathname])),mt(s)}function Ws(e,t={}){let r=h.useContext(Yn);X(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:n}=no("useViewTransitionState"),i=$t(e,{relative:t.relative});if(!r.isTransitioning)return!1;let s=Re(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=Re(r.nextLocation.pathname,n)||r.nextLocation.pathname;return At(i.pathname,a)!=null||At(i.pathname,s)!=null}[...Ss];const oo={spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",0:"0px",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",10:"40px",12:"48px",16:"64px"},typography:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontFamilyMono:'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',fontFamilyDigital:'"DigitalFont", "Courier New", "Monaco", monospace',fontSize:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},sizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"24px",xxxl:"32px"},fontWeight:{light:300,normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.2,normal:1.5,relaxed:1.8}},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",lg:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",xl:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",focus:"0 0 0 3px rgba(66, 153, 225, 0.5)",board:"0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",container:"0 4px 6px rgba(0, 0, 0, 0.75)"},borderRadius:{sm:"4px",md:"6px",lg:"8px",xl:"12px",full:"9999px",container:"10px"},breakpoints:{mobilePortrait:"0px",mobileLandscape:"480px",tablet:"768px",desktop:"1024px",large:"1440px"},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out",easing:{easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)"}},zIndices:{dropdown:10,modal:100,overlay:200,tooltip:300,notification:400}},Hs={primary:"#1e40af",primaryHover:"#1d4ed8",primaryActive:"#1e3a8a",secondary:"#6b7280",secondaryHover:"#4b5563",secondaryActive:"#374151",background:"#ffffff",backgroundSecondary:"#f9fafb",backgroundTertiary:"#f3f4f6",surface:"#f3f4f6",surfaceElevated:"#f9fafb",surfaceHover:"#e5e7eb",text:"#111827",textSecondary:"#6b7280",textTertiary:"#9ca3af",textInverse:"#ffffff",border:"#e5e7eb",borderHover:"#d1d5db",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#f0d9b5",chessBoardDark:"#b58863",chessHighlight:"#ffff00",chessLastMove:"#9bc53d",chessCheck:"#ff6b6b",chessLegalMove:"rgba(0, 255, 0, 0.4)",chatOwnMessage:"#dbeafe",chatMention:"#fef3c7",chatSystem:"#f3f4f6",board:{light:"#f0d9b5",dark:"#b58863",border:"#8b7355",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#7fb876",hoverLight:"#f6f8ca",hoverDark:"#c3a562",highlight:"rgba(255, 255, 0, 0.4)",coordinateLight:"#8b7355",coordinateDark:"#f0d9b5"}},_s={primary:"#3b82f6",primaryHover:"#2563eb",primaryActive:"#1d4ed8",secondary:"#9ca3af",secondaryHover:"#d1d5db",secondaryActive:"#e5e7eb",background:"#111827",backgroundSecondary:"#1f2937",backgroundTertiary:"#374151",surface:"#1f2937",surfaceElevated:"#374151",surfaceHover:"#4b5563",text:"#f9fafb",textSecondary:"#d1d5db",textTertiary:"#9ca3af",textInverse:"#111827",border:"#374151",borderHover:"#4b5563",borderFocus:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",chessBoardLight:"#4a5568",chessBoardDark:"#2d3748",chessHighlight:"#ecc94b",chessLastMove:"#68d391",chessCheck:"#fc8181",chessLegalMove:"rgba(104, 211, 145, 0.4)",chatOwnMessage:"#1e3a8a",chatMention:"#92400e",chatSystem:"#374151",board:{light:"#f0d9b5",dark:"#b58863",border:"#5e5248",lastMoveLight:"#cdd26a",lastMoveDark:"#aaa23a",selected:"#646f40",hoverLight:"#f4e5c1",hoverDark:"#a07a4a",highlight:"rgba(255, 235, 0, 0.5)",coordinateLight:"#b58863",coordinateDark:"#f0d9b5"}},io={colors:Hs,...oo},Us={colors:_s,...oo},Gs={light:io,dark:Us},Ys=io;var oe=function(){return oe=Object.assign||function(t){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},oe.apply(this,arguments)};function ft(e,t,r){if(r||arguments.length===2)for(var n=0,i=t.length,s;n<i;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var V="-ms-",pt="-moz-",_="-webkit-",so="comm",Gt="rule",Lr="decl",Vs="@import",ao="@keyframes",qs="@layer",co=Math.abs,Ir=String.fromCharCode,fr=Object.assign;function Ks(e,t){return ne(e,0)^45?(((t<<2^ne(e,0))<<2^ne(e,1))<<2^ne(e,2))<<2^ne(e,3):0}function lo(e){return e.trim()}function je(e,t){return(e=t.exec(e))?e[0]:e}function N(e,t,r){return e.replace(t,r)}function zt(e,t,r){return e.indexOf(t,r)}function ne(e,t){return e.charCodeAt(t)|0}function Ze(e,t,r){return e.slice(t,r)}function $e(e){return e.length}function uo(e){return e.length}function ct(e,t){return t.push(e),e}function Xs(e,t){return e.map(t).join("")}function Xr(e,t){return e.filter(function(r){return!je(r,t)})}var Yt=1,et=1,ho=0,xe=0,J=0,it="";function Vt(e,t,r,n,i,s,a,u){return{value:e,root:t,parent:r,type:n,props:i,children:s,line:Yt,column:et,length:a,return:"",siblings:u}}function Le(e,t){return fr(Vt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ye(e){for(;e.root;)e=Le(e.root,{children:[e]});ct(e,e.siblings)}function Qs(){return J}function Js(){return J=xe>0?ne(it,--xe):0,et--,J===10&&(et=1,Yt--),J}function ye(){return J=xe<ho?ne(it,xe++):0,et++,J===10&&(et=1,Yt++),J}function He(){return ne(it,xe)}function Tt(){return xe}function qt(e,t){return Ze(it,e,t)}function gr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Zs(e){return Yt=et=1,ho=$e(it=e),xe=0,[]}function ea(e){return it="",e}function er(e){return lo(qt(xe-1,xr(e===91?e+2:e===40?e+1:e)))}function ta(e){for(;(J=He())&&J<33;)ye();return gr(e)>2||gr(J)>3?"":" "}function ra(e,t){for(;--t&&ye()&&!(J<48||J>102||J>57&&J<65||J>70&&J<97););return qt(e,Tt()+(t<6&&He()==32&&ye()==32))}function xr(e){for(;ye();)switch(J){case e:return xe;case 34:case 39:e!==34&&e!==39&&xr(J);break;case 40:e===41&&xr(e);break;case 92:ye();break}return xe}function na(e,t){for(;ye()&&e+J!==57;)if(e+J===84&&He()===47)break;return"/*"+qt(t,xe-1)+"*"+Ir(e===47?e:ye())}function oa(e){for(;!gr(He());)ye();return qt(e,xe)}function ia(e){return ea(Lt("",null,null,null,[""],e=Zs(e),0,[0],e))}function Lt(e,t,r,n,i,s,a,u,c){for(var d=0,p=0,m=a,g=0,f=0,v=0,x=1,b=1,y=1,C=0,S="",R=i,$=s,j=n,k=S;b;)switch(v=C,C=ye()){case 40:if(v!=108&&ne(k,m-1)==58){zt(k+=N(er(C),"&","&\f"),"&\f",co(d?u[d-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:k+=er(C);break;case 9:case 10:case 13:case 32:k+=ta(v);break;case 92:k+=ra(Tt()-1,7);continue;case 47:switch(He()){case 42:case 47:ct(sa(na(ye(),Tt()),t,r,c),c);break;default:k+="/"}break;case 123*x:u[d++]=$e(k)*y;case 125*x:case 59:case 0:switch(C){case 0:case 125:b=0;case 59+p:y==-1&&(k=N(k,/\f/g,"")),f>0&&$e(k)-m&&ct(f>32?Jr(k+";",n,r,m-1,c):Jr(N(k," ","")+";",n,r,m-2,c),c);break;case 59:k+=";";default:if(ct(j=Qr(k,t,r,d,p,i,u,S,R=[],$=[],m,s),s),C===123)if(p===0)Lt(k,t,j,j,R,s,m,u,$);else switch(g===99&&ne(k,3)===110?100:g){case 100:case 108:case 109:case 115:Lt(e,j,j,n&&ct(Qr(e,j,j,0,0,i,u,S,i,R=[],m,$),$),i,$,m,u,n?R:$);break;default:Lt(k,j,j,j,[""],$,0,u,$)}}d=p=f=0,x=y=1,S=k="",m=a;break;case 58:m=1+$e(k),f=v;default:if(x<1){if(C==123)--x;else if(C==125&&x++==0&&Js()==125)continue}switch(k+=Ir(C),C*x){case 38:y=p>0?1:(k+="\f",-1);break;case 44:u[d++]=($e(k)-1)*y,y=1;break;case 64:He()===45&&(k+=er(ye())),g=He(),p=m=$e(S=k+=oa(Tt())),C++;break;case 45:v===45&&$e(k)==2&&(x=0)}}return s}function Qr(e,t,r,n,i,s,a,u,c,d,p,m){for(var g=i-1,f=i===0?s:[""],v=uo(f),x=0,b=0,y=0;x<n;++x)for(var C=0,S=Ze(e,g+1,g=co(b=a[x])),R=e;C<v;++C)(R=lo(b>0?f[C]+" "+S:N(S,/&\f/g,f[C])))&&(c[y++]=R);return Vt(e,t,r,i===0?Gt:u,c,d,p,m)}function sa(e,t,r,n){return Vt(e,t,r,so,Ir(Qs()),Ze(e,2,-2),0,n)}function Jr(e,t,r,n,i){return Vt(e,t,r,Lr,Ze(e,0,n),Ze(e,n+1,-1),n,i)}function po(e,t,r){switch(Ks(e,t)){case 5103:return _+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return _+e+e;case 4789:return pt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return _+e+pt+e+V+e+e;case 5936:switch(ne(e,t+11)){case 114:return _+e+V+N(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return _+e+V+N(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return _+e+V+N(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return _+e+V+e+e;case 6165:return _+e+V+"flex-"+e+e;case 5187:return _+e+N(e,/(\w+).+(:[^]+)/,_+"box-$1$2"+V+"flex-$1$2")+e;case 5443:return _+e+V+"flex-item-"+N(e,/flex-|-self/g,"")+(je(e,/flex-|baseline/)?"":V+"grid-row-"+N(e,/flex-|-self/g,""))+e;case 4675:return _+e+V+"flex-line-pack"+N(e,/align-content|flex-|-self/g,"")+e;case 5548:return _+e+V+N(e,"shrink","negative")+e;case 5292:return _+e+V+N(e,"basis","preferred-size")+e;case 6060:return _+"box-"+N(e,"-grow","")+_+e+V+N(e,"grow","positive")+e;case 4554:return _+N(e,/([^-])(transform)/g,"$1"+_+"$2")+e;case 6187:return N(N(N(e,/(zoom-|grab)/,_+"$1"),/(image-set)/,_+"$1"),e,"")+e;case 5495:case 3959:return N(e,/(image-set\([^]*)/,_+"$1$`$1");case 4968:return N(N(e,/(.+:)(flex-)?(.*)/,_+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+_+e+e;case 4200:if(!je(e,/flex-|baseline/))return V+"grid-column-align"+Ze(e,t)+e;break;case 2592:case 3360:return V+N(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,i){return t=i,je(n.props,/grid-\w+-end/)})?~zt(e+(r=r[t].value),"span",0)?e:V+N(e,"-start","")+e+V+"grid-row-span:"+(~zt(r,"span",0)?je(r,/\d+/):+je(r,/\d+/)-+je(e,/\d+/))+";":V+N(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return je(n.props,/grid-\w+-start/)})?e:V+N(N(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return N(e,/(.+)-inline(.+)/,_+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if($e(e)-1-t>6)switch(ne(e,t+1)){case 109:if(ne(e,t+4)!==45)break;case 102:return N(e,/(.+:)(.+)-([^]+)/,"$1"+_+"$2-$3$1"+pt+(ne(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~zt(e,"stretch",0)?po(N(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return N(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,i,s,a,u,c,d){return V+i+":"+s+d+(a?V+i+"-span:"+(u?c:+c-+s)+d:"")+e});case 4949:if(ne(e,t+6)===121)return N(e,":",":"+_)+e;break;case 6444:switch(ne(e,ne(e,14)===45?18:11)){case 120:return N(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+_+(ne(e,14)===45?"inline-":"")+"box$3$1"+_+"$2$3$1"+V+"$2box$3")+e;case 100:return N(e,":",":"+V)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return N(e,"scroll-","scroll-snap-")+e}return e}function Nt(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function aa(e,t,r,n){switch(e.type){case qs:if(e.children.length)break;case Vs:case Lr:return e.return=e.return||e.value;case so:return"";case ao:return e.return=e.value+"{"+Nt(e.children,n)+"}";case Gt:if(!$e(e.value=e.props.join(",")))return""}return $e(r=Nt(e.children,n))?e.return=e.value+"{"+r+"}":""}function ca(e){var t=uo(e);return function(r,n,i,s){for(var a="",u=0;u<t;u++)a+=e[u](r,n,i,s)||"";return a}}function la(e){return function(t){t.root||(t=t.return)&&e(t)}}function da(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Lr:e.return=po(e.value,e.length,r);return;case ao:return Nt([Le(e,{value:N(e.value,"@","@"+_)})],n);case Gt:if(e.length)return Xs(r=e.props,function(i){switch(je(i,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ye(Le(e,{props:[N(i,/:(read-\w+)/,":"+pt+"$1")]})),Ye(Le(e,{props:[i]})),fr(e,{props:Xr(r,n)});break;case"::placeholder":Ye(Le(e,{props:[N(i,/:(plac\w+)/,":"+_+"input-$1")]})),Ye(Le(e,{props:[N(i,/:(plac\w+)/,":"+pt+"$1")]})),Ye(Le(e,{props:[N(i,/:(plac\w+)/,V+"input-$1")]})),Ye(Le(e,{props:[i]})),fr(e,{props:Xr(r,n)});break}return""})}}var ua={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pe={},tt=typeof process<"u"&&pe!==void 0&&(pe.REACT_APP_SC_ATTR||pe.SC_ATTR)||"data-styled",mo="active",fo="data-styled-version",Kt="6.1.19",Dr=`/*!sc*/
`,Ot=typeof window<"u"&&typeof document<"u",ha=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&pe.REACT_APP_SC_DISABLE_SPEEDY!==""?pe.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&pe.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&pe!==void 0&&pe.SC_DISABLE_SPEEDY!==void 0&&pe.SC_DISABLE_SPEEDY!==""&&pe.SC_DISABLE_SPEEDY!=="false"&&pe.SC_DISABLE_SPEEDY),pa={},Xt=Object.freeze([]),rt=Object.freeze({});function go(e,t,r){return r===void 0&&(r=rt),e.theme!==r.theme&&e.theme||t||r.theme}var xo=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ma=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,fa=/(^-|-$)/g;function Zr(e){return e.replace(ma,"-").replace(fa,"")}var ga=/(a)(d)/gi,kt=52,en=function(e){return String.fromCharCode(e+(e>25?39:97))};function yr(e){var t,r="";for(t=Math.abs(e);t>kt;t=t/kt|0)r=en(t%kt)+r;return(en(t%kt)+r).replace(ga,"$1-$2")}var tr,yo=5381,Xe=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},bo=function(e){return Xe(yo,e)};function $o(e){return yr(bo(e)>>>0)}function xa(e){return e.displayName||e.name||"Component"}function rr(e){return typeof e=="string"&&!0}var vo=typeof Symbol=="function"&&Symbol.for,wo=vo?Symbol.for("react.memo"):60115,ya=vo?Symbol.for("react.forward_ref"):60112,ba={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},$a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ko={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},va=((tr={})[ya]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},tr[wo]=ko,tr);function tn(e){return("type"in(t=e)&&t.type.$$typeof)===wo?ko:"$$typeof"in e?va[e.$$typeof]:ba;var t}var wa=Object.defineProperty,ka=Object.getOwnPropertyNames,rn=Object.getOwnPropertySymbols,Sa=Object.getOwnPropertyDescriptor,Ca=Object.getPrototypeOf,nn=Object.prototype;function So(e,t,r){if(typeof t!="string"){if(nn){var n=Ca(t);n&&n!==nn&&So(e,n,r)}var i=ka(t);rn&&(i=i.concat(rn(t)));for(var s=tn(e),a=tn(t),u=0;u<i.length;++u){var c=i[u];if(!(c in $a||r&&r[c]||a&&c in a||s&&c in s)){var d=Sa(t,c);try{wa(e,c,d)}catch{}}}}return e}function _e(e){return typeof e=="function"}function Ar(e){return typeof e=="object"&&"styledComponentId"in e}function We(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function br(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function gt(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function $r(e,t,r){if(r===void 0&&(r=!1),!r&&!gt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=$r(e[n],t[n]);else if(gt(t))for(var n in t)e[n]=$r(e[n],t[n]);return e}function Nr(e,t){Object.defineProperty(e,"toString",{value:t})}function Ue(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ja=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,i=n.length,s=i;t>=s;)if((s<<=1)<0)throw Ue(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=i;a<s;a++)this.groupSizes[a]=0}for(var u=this.indexOfGroup(t+1),c=(a=0,r.length);a<c;a++)this.tag.insertRule(u,r[a])&&(this.groupSizes[t]++,u++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),i=n+r;this.groupSizes[t]=0;for(var s=n;s<i;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],i=this.indexOfGroup(t),s=i+n,a=i;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Dr);return r},e}(),It=new Map,Ft=new Map,Dt=1,St=function(e){if(It.has(e))return It.get(e);for(;Ft.has(Dt);)Dt++;var t=Dt++;return It.set(e,t),Ft.set(t,e),t},Pa=function(e,t){Dt=t+1,It.set(e,t),Ft.set(t,e)},Ra="style[".concat(tt,"][").concat(fo,'="').concat(Kt,'"]'),Ea=new RegExp("^".concat(tt,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ma=function(e,t,r){for(var n,i=r.split(","),s=0,a=i.length;s<a;s++)(n=i[s])&&e.registerName(t,n)},za=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Dr),i=[],s=0,a=n.length;s<a;s++){var u=n[s].trim();if(u){var c=u.match(Ea);if(c){var d=0|parseInt(c[1],10),p=c[2];d!==0&&(Pa(p,d),Ma(e,p,c[3]),e.getTag().insertRules(d,i)),i.length=0}else i.push(u)}}},on=function(e){for(var t=document.querySelectorAll(Ra),r=0,n=t.length;r<n;r++){var i=t[r];i&&i.getAttribute(tt)!==mo&&(za(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Ta(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Co=function(e){var t=document.head,r=e||t,n=document.createElement("style"),i=function(u){var c=Array.from(u.querySelectorAll("style[".concat(tt,"]")));return c[c.length-1]}(r),s=i!==void 0?i.nextSibling:null;n.setAttribute(tt,mo),n.setAttribute(fo,Kt);var a=Ta();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},La=function(){function e(t){this.element=Co(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,i=0,s=n.length;i<s;i++){var a=n[i];if(a.ownerNode===r)return a}throw Ue(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Ia=function(){function e(t){this.element=Co(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Da=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),sn=Ot,Aa={isServer:!Ot,useCSSOMInjection:!ha},Bt=function(){function e(t,r,n){t===void 0&&(t=rt),r===void 0&&(r={});var i=this;this.options=oe(oe({},Aa),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Ot&&sn&&(sn=!1,on(this)),Nr(this,function(){return function(s){for(var a=s.getTag(),u=a.length,c="",d=function(m){var g=function(y){return Ft.get(y)}(m);if(g===void 0)return"continue";var f=s.names.get(g),v=a.getGroup(m);if(f===void 0||!f.size||v.length===0)return"continue";var x="".concat(tt,".g").concat(m,'[id="').concat(g,'"]'),b="";f!==void 0&&f.forEach(function(y){y.length>0&&(b+="".concat(y,","))}),c+="".concat(v).concat(x,'{content:"').concat(b,'"}').concat(Dr)},p=0;p<u;p++)d(p);return c}(i)})}return e.registerId=function(t){return St(t)},e.prototype.rehydrate=function(){!this.server&&Ot&&on(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(oe(oe({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,i=r.target;return r.isServer?new Da(i):n?new La(i):new Ia(i)}(this.options),new ja(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(St(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(St(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(St(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Na=/&/g,Oa=/^\s*\/\/.*$/gm;function jo(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=jo(r.children,t)),r})}function Fa(e){var t,r,n,i=rt,s=i.options,a=s===void 0?rt:s,u=i.plugins,c=u===void 0?Xt:u,d=function(g,f,v){return v.startsWith(r)&&v.endsWith(r)&&v.replaceAll(r,"").length>0?".".concat(t):g},p=c.slice();p.push(function(g){g.type===Gt&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Na,r).replace(n,d))}),a.prefix&&p.push(da),p.push(aa);var m=function(g,f,v,x){f===void 0&&(f=""),v===void 0&&(v=""),x===void 0&&(x="&"),t=x,r=f,n=new RegExp("\\".concat(r,"\\b"),"g");var b=g.replace(Oa,""),y=ia(v||f?"".concat(v," ").concat(f," { ").concat(b," }"):b);a.namespace&&(y=jo(y,a.namespace));var C=[];return Nt(y,ca(p.concat(la(function(S){return C.push(S)})))),C};return m.hash=c.length?c.reduce(function(g,f){return f.name||Ue(15),Xe(g,f.name)},yo).toString():"",m}var Ba=new Bt,vr=Fa(),Po=Z.createContext({shouldForwardProp:void 0,styleSheet:Ba,stylis:vr});Po.Consumer;Z.createContext(void 0);function wr(){return h.useContext(Po)}var Wa=function(){function e(t,r){var n=this;this.inject=function(i,s){s===void 0&&(s=vr);var a=n.name+s.hash;i.hasNameForId(n.id,a)||i.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Nr(this,function(){throw Ue(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=vr),this.name+t.hash},e}(),Ha=function(e){return e>="A"&&e<="Z"};function an(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Ha(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Ro=function(e){return e==null||e===!1||e===""},Eo=function(e){var t,r,n=[];for(var i in e){var s=e[i];e.hasOwnProperty(i)&&!Ro(s)&&(Array.isArray(s)&&s.isCss||_e(s)?n.push("".concat(an(i),":"),s,";"):gt(s)?n.push.apply(n,ft(ft(["".concat(i," {")],Eo(s),!1),["}"],!1)):n.push("".concat(an(i),": ").concat((t=i,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in ua||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ie(e,t,r,n){if(Ro(e))return[];if(Ar(e))return[".".concat(e.styledComponentId)];if(_e(e)){if(!_e(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var i=e(t);return Ie(i,t,r,n)}var s;return e instanceof Wa?r?(e.inject(r,n),[e.getName(n)]):[e]:gt(e)?Eo(e):Array.isArray(e)?Array.prototype.concat.apply(Xt,e.map(function(a){return Ie(a,t,r,n)})):[e.toString()]}function Mo(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(_e(r)&&!Ar(r))return!1}return!0}var _a=bo(Kt),Ua=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Mo(t),this.componentId=r,this.baseHash=Xe(_a,r),this.baseStyle=n,Bt.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))i=We(i,this.staticRulesId);else{var s=br(Ie(this.rules,t,r,n)),a=yr(Xe(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var u=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,u)}i=We(i,a),this.staticRulesId=a}else{for(var c=Xe(this.baseHash,n.hash),d="",p=0;p<this.rules.length;p++){var m=this.rules[p];if(typeof m=="string")d+=m;else if(m){var g=br(Ie(m,t,r,n));c=Xe(c,g+p),d+=g}}if(d){var f=yr(c>>>0);r.hasNameForId(this.componentId,f)||r.insertRules(this.componentId,f,n(d,".".concat(f),void 0,this.componentId)),i=We(i,f)}}return i},e}(),xt=Z.createContext(void 0);xt.Consumer;function Ga(e){var t=Z.useContext(xt),r=h.useMemo(function(){return function(n,i){if(!n)throw Ue(14);if(_e(n)){var s=n(i);return s}if(Array.isArray(n)||typeof n!="object")throw Ue(8);return i?oe(oe({},i),n):n}(e.theme,t)},[e.theme,t]);return e.children?Z.createElement(xt.Provider,{value:r},e.children):null}var nr={};function Ya(e,t,r){var n=Ar(e),i=e,s=!rr(e),a=t.attrs,u=a===void 0?Xt:a,c=t.componentId,d=c===void 0?function(R,$){var j=typeof R!="string"?"sc":Zr(R);nr[j]=(nr[j]||0)+1;var k="".concat(j,"-").concat($o(Kt+j+nr[j]));return $?"".concat($,"-").concat(k):k}(t.displayName,t.parentComponentId):c,p=t.displayName,m=p===void 0?function(R){return rr(R)?"styled.".concat(R):"Styled(".concat(xa(R),")")}(e):p,g=t.displayName&&t.componentId?"".concat(Zr(t.displayName),"-").concat(t.componentId):t.componentId||d,f=n&&i.attrs?i.attrs.concat(u).filter(Boolean):u,v=t.shouldForwardProp;if(n&&i.shouldForwardProp){var x=i.shouldForwardProp;if(t.shouldForwardProp){var b=t.shouldForwardProp;v=function(R,$){return x(R,$)&&b(R,$)}}else v=x}var y=new Ua(r,g,n?i.componentStyle:void 0);function C(R,$){return function(j,k,L){var O=j.attrs,H=j.componentStyle,w=j.defaultProps,F=j.foldedComponentIds,B=j.styledComponentId,D=j.target,U=Z.useContext(xt),ee=wr(),ce=j.shouldForwardProp||ee.shouldForwardProp,Se=go(k,U,w)||rt,K=function(Ce,fe,P){for(var I,z=oe(oe({},fe),{className:void 0,theme:P}),T=0;T<Ce.length;T+=1){var E=_e(I=Ce[T])?I(z):I;for(var M in E)z[M]=M==="className"?We(z[M],E[M]):M==="style"?oe(oe({},z[M]),E[M]):E[M]}return fe.className&&(z.className=We(z.className,fe.className)),z}(O,k,Se),se=K.as||D,ae={};for(var te in K)K[te]===void 0||te[0]==="$"||te==="as"||te==="theme"&&K.theme===Se||(te==="forwardedAs"?ae.as=K.forwardedAs:ce&&!ce(te,se)||(ae[te]=K[te]));var me=function(Ce,fe){var P=wr(),I=Ce.generateAndInjectStyles(fe,P.styleSheet,P.stylis);return I}(H,K),de=We(F,B);return me&&(de+=" "+me),K.className&&(de+=" "+K.className),ae[rr(se)&&!xo.has(se)?"class":"className"]=de,L&&(ae.ref=L),h.createElement(se,ae)}(S,R,$)}C.displayName=m;var S=Z.forwardRef(C);return S.attrs=f,S.componentStyle=y,S.displayName=m,S.shouldForwardProp=v,S.foldedComponentIds=n?We(i.foldedComponentIds,i.styledComponentId):"",S.styledComponentId=g,S.target=n?i.target:e,Object.defineProperty(S,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(R){this._foldedDefaultProps=n?function($){for(var j=[],k=1;k<arguments.length;k++)j[k-1]=arguments[k];for(var L=0,O=j;L<O.length;L++)$r($,O[L],!0);return $}({},i.defaultProps,R):R}}),Nr(S,function(){return".".concat(S.styledComponentId)}),s&&So(S,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),S}function cn(e,t){for(var r=[e[0]],n=0,i=t.length;n<i;n+=1)r.push(t[n],e[n+1]);return r}var ln=function(e){return Object.assign(e,{isCss:!0})};function ve(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(_e(e)||gt(e))return ln(Ie(cn(Xt,ft([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Ie(n):ln(Ie(cn(n,t)))}function kr(e,t,r){if(r===void 0&&(r=rt),!t)throw Ue(1,t);var n=function(i){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,ve.apply(void 0,ft([i],s,!1)))};return n.attrs=function(i){return kr(e,t,oe(oe({},r),{attrs:Array.prototype.concat(r.attrs,i).filter(Boolean)}))},n.withConfig=function(i){return kr(e,t,oe(oe({},r),i))},n}var zo=function(e){return kr(Ya,e)},l=zo;xo.forEach(function(e){l[e]=zo(e)});var Va=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Mo(t),Bt.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,i){var s=i(br(Ie(this.rules,r,n,i)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,i){t>2&&Bt.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,i)},e}();function qa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=ve.apply(void 0,ft([e],t,!1)),i="sc-global-".concat($o(JSON.stringify(n))),s=new Va(n,i),a=function(c){var d=wr(),p=Z.useContext(xt),m=Z.useRef(d.styleSheet.allocateGSInstance(i)).current;return d.styleSheet.server&&u(m,c,d.styleSheet,p,d.stylis),Z.useLayoutEffect(function(){if(!d.styleSheet.server)return u(m,c,d.styleSheet,p,d.stylis),function(){return s.removeStyles(m,d.styleSheet)}},[m,c,d.styleSheet,p,d.stylis]),null};function u(c,d,p,m,g){if(s.isStatic)s.renderStyles(c,pa,p,g);else{var f=oe(oe({},d),{theme:go(d,m,a.defaultProps)});s.renderStyles(c,f,p,g)}}return Z.memo(a)}const To=h.createContext(void 0),Lo=()=>{const e=h.useContext(To);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Ka=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",Xa=q(({children:e})=>{const t=Ae(),r=t.preferences.theme||"system",i=r==="system"?Ka():r,s=Gs[i]||Ys,a={...s,colors:{...s.colors,board:{...s.colors.board,light:t.preferences.lightSquareColor,dark:t.preferences.darkSquareColor,coordinateLight:t.preferences.coordinateColorLight,coordinateDark:t.preferences.coordinateColorDark,lastMoveHighlight:t.preferences.lastMoveHighlightColor,premoveHighlight:t.preferences.premoveHighlightColor}}},u={theme:a,themeName:i,themePreference:r,setTheme:c=>{t.updatePreference("theme",c)},toggleTheme:()=>{const c=i==="light"?"dark":"light";t.updatePreference("theme",c)},isDarkMode:i==="dark"};return h.useEffect(()=>{if(r==="system"&&typeof window<"u"&&window.matchMedia){const c=window.matchMedia("(prefers-color-scheme: dark)"),d=()=>{t.updatePreference("lastSystemThemeCheck",Date.now())};return c.addEventListener("change",d),()=>c.removeEventListener("change",d)}},[r,t]),h.useEffect(()=>{if(typeof document<"u"){const c=document.documentElement;Object.entries(a.colors).forEach(([d,p])=>{typeof p=="string"?c.style.setProperty(`--color-${d}`,p):typeof p=="object"&&p!==null&&Object.entries(p).forEach(([m,g])=>{typeof g=="string"&&c.style.setProperty(`--color-${d}-${m}`,g)})}),Object.entries(a.spacing).forEach(([d,p])=>{c.style.setProperty(`--spacing-${d}`,p)}),document.body.className=document.body.className.replace(/\b(light|dark)-theme\b/g,""),document.body.classList.add(`${i}-theme`)}},[a,i]),o.jsx(To.Provider,{value:u,children:o.jsx(Ga,{theme:a,children:e})})});function Qa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function Ja(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var or=typeof window<"u",Za=function(e){h.useEffect(e,[])},ec=function(e){var t=h.useRef(e);t.current=e,Za(function(){return function(){return t.current()}})},tc=function(e){var t=h.useRef(0),r=h.useState(e),n=r[0],i=r[1],s=h.useCallback(function(a){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){i(a)})},[]);return ec(function(){cancelAnimationFrame(t.current)}),[n,s]},Io=function(e){var t={},r=t.initialWidth,n=r===void 0?1/0:r,i=t.initialHeight,s=i===void 0?1/0:i,a=t.onChange,u=tc({width:or?window.innerWidth:n,height:or?window.innerHeight:s}),c=u[0],d=u[1];return h.useEffect(function(){if(or){var p=function(){var m=window.innerWidth,g=window.innerHeight;d({width:m,height:g}),a&&a(m,g)};return Qa(window,"resize",p),function(){Ja(window,"resize",p)}}},[]),c};const Or=()=>{const{width:e=0,height:t=0}=Io();return{width:e,height:t}},rc=()=>{const{width:e=0,height:t=0}=Io();return e>t?"landscape":"portrait"},nc=()=>{const{width:e}=Or(),{theme:t}=Lo(),r={mobileLandscape:parseInt(t.breakpoints.mobileLandscape),tablet:parseInt(t.breakpoints.tablet),desktop:parseInt(t.breakpoints.desktop),large:parseInt(t.breakpoints.large)};return e>=r.large?"large":e>=r.desktop?"desktop":e>=r.tablet?"tablet":e>=r.mobileLandscape?"mobileLandscape":"mobilePortrait"},Do=()=>{const[e,t]=h.useState(!1);return h.useEffect(()=>{t("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)},[]),e},oc=()=>{const[e,t]=h.useState(!1),r=Do(),{width:n}=Or();return h.useEffect(()=>{t((()=>{const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),u=r&&n<768,c="orientation"in window&&"ondeviceorientation"in window;return a||u&&c})())},[r,n]),e},Ne=()=>{const e=Or(),t=rc(),r=nc(),n=Do(),i=oc();return{orientation:t,breakpoint:r,dimensions:e,isMobile:r==="mobilePortrait"||r==="mobileLandscape",isTablet:r==="tablet",isDesktop:r==="desktop"||r==="large",isTouch:n,isMobileDevice:i}},Ao=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<1200?["chess-only","chat-only"]:["chess-only","chess-and-chat","chat-only"]},No=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?["portrait"]:["portrait","landscape"]},ic=()=>{const e=Ne(),{width:t}=e.dimensions,{isMobileDevice:r}=e;return r||t<768?{viewMode:"chess-only",orientation:"portrait"}:t<1200?{viewMode:"chess-only",orientation:"landscape"}:{viewMode:"chess-and-chat",orientation:"landscape"}},sc=h.createContext(void 0),ac=({children:e})=>{const t=Ae(),r=Ne(),[n,i]=h.useState(!0),[s,a]=h.useState(["chat","moves"]),[u,c]=h.useState(!1),d=t.preferences.layout,p=h.useMemo(()=>d==="auto"?r.orientation:d,[d,r.orientation]),m=h.useMemo(()=>r.isMobile||r.dimensions.width<768,[r.isMobile,r.dimensions.width]),g=x=>{t.updatePreference("layout",x)},f=x=>{a(b=>b.includes(x)?b.filter(y=>y!==x):[...b,x])};h.useEffect(()=>{c(!0),i(b=>{const y=!m;return b!==y?y:b}),a(b=>{if(m&&p==="portrait"){const y=["chat"];return JSON.stringify(b)!==JSON.stringify(y)?y:b}else if(p==="landscape"&&!m){const y=["chat","moves","analysis"];return JSON.stringify(b)!==JSON.stringify(y)?y:b}return b});const x=setTimeout(()=>{c(!1)},300);return()=>clearTimeout(x)},[p,m]);const v={...r,layoutPreference:d,setLayoutPreference:g,activeLayout:p,isCompactMode:m,showSidebar:n,setSidebarVisible:i,activePanels:s,togglePanel:f,isTransitioning:u};return o.jsx(sc.Provider,{value:v,children:e})};l.div`
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

    ${({activeLayout:e,isCompactMode:t})=>e==="portrait"||t?ve`
                flex-direction: column;
            `:ve`
                flex-direction: row;
            `}
`;l.div`
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
`;l.aside`
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
        `)),ve`${n}`}}
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
`;const cc=l.input`
  display: none;
`,lc=l.button`
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
`,dc=({settingId:e,onUpload:t})=>{const r=h.useRef(null),n=s=>{const a=s.target.files?.[0];if(!a)return;if(!["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/webm"].includes(a.type)){alert("Please upload a valid audio file (MP3, WAV, OGG, or WebM)");return}const c=1024*1024;if(a.size>c){alert("File size must be less than 1MB");return}const d=new FileReader;d.onload=p=>{const m=p.target?.result;t(e,m,a.name)},d.readAsDataURL(a),r.current&&(r.current.value="")},i=()=>{r.current?.click()};return o.jsxs(o.Fragment,{children:[o.jsx(cc,{ref:r,type:"file",accept:"audio/*",onChange:n}),o.jsx(lc,{type:"button",onClick:i,children:"Upload"})]})},uc=l.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`,hc=l.div`
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
`,pc=l.div`
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
`,mc=l.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,fc=l.button`
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
`,gc=l.div`
  padding: ${e=>e.theme.spacing[3]};
  padding-bottom: 0;
`,xc=l.input`
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
`,yc=l.div`
  flex: 1;
  display: flex;
  flex-direction: ${e=>e.$isMobile?"column":"row"};
  overflow: hidden;
`,bc=l.div`
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
`,$c=l.button`
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
`,vc=l.span`
  margin-right: ${e=>e.theme.spacing[2]};
`,wc=l.div`
  flex: 1;
  padding: ${e=>e.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`,kc=l.div`
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
`,Sc=l.div`
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
`,Cc=l.div`
  display: flex;
  align-items: center;
  ${e=>e.$fullWidth&&`
    flex: 1;
    max-width: 500px;
  `}
`,jc=l.input`
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
`,Pc=l.select`
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
`,Rc=l.input`
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
`,Ec=l.input`
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
`,Mc=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,zc=l.textarea`
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
`,Tc=l.div`
  font-size: ${e=>e.theme.typography.fontSize.xs};
  color: ${e=>e.theme.colors.error||"#ff0000"};
  margin-top: ${e=>e.theme.spacing[1]};
`,Lc=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,Ic=l.button`
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
`,pn=l.button`
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
`,Dc=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing[4]};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Ac=l.div`
  display: flex;
  gap: ${e=>e.theme.spacing[3]};
`,Nc=l.p`
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
`,Oo=q(({isOpen:e,onClose:t})=>{const r=Ae(),{settingsRegistry:n}=r,i=Ne(),s=i.isMobileDevice||i.dimensions.width<768,[a,u]=h.useState("board"),[c,d]=h.useState(""),[p,m]=h.useState({}),[g,f]=h.useState({x:0,y:0}),[v,x]=h.useState(!1),[b,y]=h.useState({x:0,y:0}),C=h.useRef(null);if(h.useEffect(()=>{if(e&&C.current&&!s){const w=C.current.getBoundingClientRect();f({x:(window.innerWidth-w.width)/2,y:(window.innerHeight-w.height)/2})}},[e,s]),h.useEffect(()=>{if(!v)return;const w=B=>{f({x:B.clientX-b.x,y:B.clientY-b.y})},F=()=>{x(!1)};return document.addEventListener("mousemove",w),document.addEventListener("mouseup",F),()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",F)}},[v,b]),!e)return null;const S=n.getAllCategories(),R=c?n.search(c):n.getByCategory(a),$=(w,F)=>{const B=n.get(w);if(B){if(B.validate){const D=B.validate(F);if(typeof D=="string"){m(U=>({...U,[w]:D}));return}else if(D===!1){m(U=>({...U,[w]:"Invalid value"}));return}}m(D=>{const U={...D};return delete U[w],U}),B.value=F,B.onChange?.(F),w in r.preferences&&r.updatePreference(w,F)}},j=w=>{const F=n.get(w);F&&$(w,F.defaultValue)},k=(w,F,B)=>{const D=JSON.parse(localStorage.getItem("customSounds")||"{}"),U=`custom_${w}_${Date.now()}`;D[U]={dataUrl:F,fileName:B,settingId:w,uploadDate:new Date().toISOString()},localStorage.setItem("customSounds",JSON.stringify(D)),$(w,U);const ee=n.get(w);if(ee&&ee.options){const ce={label:`Custom: ${B}`,value:U},Se=ee.options.filter(K=>!K.value.startsWith("custom_"));ee.options=[...Se,ce]}},L=w=>{if(!(!w||w==="none"))try{let F;if(w.startsWith("custom_")){const U=JSON.parse(localStorage.getItem("customSounds")||"{}")[w];if(U&&U.dataUrl)F=U.dataUrl;else{console.error("Custom sound not found:",w);return}}else F=`/sounds/${w}`;const B=new Audio(F);B.volume=.5,B.play().catch(D=>{console.error("Failed to play sound:",D)})}catch(F){console.error("Error playing sound:",F)}},O=w=>{s||(x(!0),y({x:w.clientX-g.x,y:w.clientY-g.y}))},H=w=>{switch(w.type){case"boolean":return o.jsx(jc,{type:"checkbox",checked:w.value,onChange:D=>$(w.id,D.target.checked),$isMobile:s});case"select":if(w.id.endsWith("SoundFile")){const D=w.options?.find(ce=>ce.value===w.value),U=D?D.label:"None",ee=w.value&&w.value!=="none";return o.jsxs(Mc,{children:[o.jsx(Lc,{children:U}),o.jsx(Ic,{type:"button",onClick:()=>L(w.value),disabled:!ee,title:ee?"Play sound":"No sound selected",children:"▶️ Play"}),o.jsx(dc,{settingId:w.id,onUpload:k})]})}else return o.jsx(Pc,{value:w.value,onChange:D=>$(w.id,D.target.value),children:w.options?.map(D=>o.jsx("option",{value:D.value,children:D.label},D.value))});case"number":return o.jsx(Rc,{type:"number",value:w.value,min:w.min,max:w.max,step:w.step,onChange:D=>$(w.id,Number(D.target.value))});case"color":return o.jsx(Ec,{type:"color",value:w.value,onChange:D=>$(w.id,D.target.value),$isMobile:s});case"text":const B=!!p[w.id];return o.jsxs("div",{style:{width:"100%"},children:[o.jsx(zc,{value:w.value||"",onChange:D=>$(w.id,D.target.value),className:B?"error":"",placeholder:w.placeholder||"",spellCheck:!1}),B&&o.jsx(Tc,{children:p[w.id]})]});default:return null}};return o.jsx(uc,{children:o.jsxs(hc,{ref:C,$x:g.x,$y:g.y,$isMobile:s,children:[o.jsxs(pc,{onMouseDown:O,children:[o.jsx(mc,{children:"⚙️ Settings"}),o.jsx(fc,{onClick:t,onMouseDown:w=>w.stopPropagation(),children:"✕"})]}),o.jsx(gc,{children:o.jsx(xc,{type:"text",placeholder:"Search settings...",value:c,onChange:w=>d(w.target.value)})}),o.jsxs(yc,{$isMobile:s,children:[o.jsx(bc,{$isMobile:s,children:S.map(w=>o.jsxs($c,{$active:a===w.id&&!c,$isMobile:s,onClick:()=>{u(w.id),d("")},children:[o.jsx(vc,{children:w.icon}),!s&&w.label]},w.id))}),o.jsxs(wc,{children:[c&&o.jsxs(Nc,{children:["Found ",R.length,' settings matching "',c,'"']}),o.jsx(kc,{children:R.map(w=>w.type==="text"?o.jsxs(dn,{style:{flexDirection:"column",alignItems:"stretch"},children:[o.jsxs("div",{style:{marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[o.jsxs("div",{children:[o.jsx(un,{children:w.label}),w.description&&o.jsx(hn,{children:w.description})]}),w.value!==w.defaultValue&&o.jsx(pn,{type:"button",onClick:()=>j(w.id),title:"Reset to default",style:{marginLeft:"8px",marginTop:0},children:"↻"})]}),H(w)]},w.id):o.jsxs(dn,{children:[o.jsxs(Sc,{children:[o.jsx(un,{children:w.label}),w.description&&o.jsx(hn,{children:w.description})]}),o.jsxs(Cc,{children:[H(w),w.value!==w.defaultValue&&o.jsx(pn,{type:"button",onClick:()=>j(w.id),title:"Reset to default",children:"↻"})]})]},w.id))})]})]}),o.jsxs(Dc,{children:[o.jsx(ir,{onClick:()=>r.resetToDefaults(),children:"Reset to Defaults"}),o.jsxs(Ac,{children:[o.jsx(ir,{onClick:t,children:"Cancel"}),o.jsx(ir,{$variant:"primary",onClick:t,children:"Done"})]})]})]})})});Oo.displayName="SettingsDialog";const Oc=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  padding: 1rem;
`,Fc=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Bc=l.h3`
  margin: 0;
  font-size: 1.1rem;
`,Wc=l.select`
  background: ${e=>e.theme.colors.backgroundSecondary};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`,Hc=l.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,_c=l.div`
  padding: 0.5rem;
  background: ${e=>e.theme.colors.surface};
  border-radius: 4px;
  border-left: 3px solid ${e=>e.theme.colors.primary};
`,Uc=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.textSecondary};
`,Gc=l.span`
  font-weight: bold;
  color: ${e=>e.theme.colors.primary};
`,Yc=l.span`
  font-size: 0.8rem;
`,Vc=l.div`
  font-size: 0.9rem;
  line-height: 1.4;
`,mn=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.textSecondary};
`,qc=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.error};
`,Kc=l.button`
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
`,Xc=l.div`
  font-size: 0.8rem;
  color: ${e=>e.$healthy?e.theme.colors.success:e.theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`,Qc=l.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$healthy?e.theme.colors.success:e.theme.colors.error};
`,Jc=[39,49,50,10,1,2,36,37,38,40],Zc=q(()=>{const e=Nn(),[t,r]=h.useState(39),[n,i]=h.useState(0),s=50;h.useEffect(()=>{e.loadChannelMessages(t,s,n)},[t,e]);const a=f=>{const v=parseInt(f.target.value);r(v),i(0)},u=()=>{const f=n+s;i(f),e.loadChannelMessages(t,s,f)},c=e.getChannelMessages(t),d=e.isChannelLoading(t),p=e.getChannelError(t),m=f=>new Date(f).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),g=f=>o.jsxs(_c,{children:[o.jsxs(Uc,{children:[o.jsx(Gc,{children:f.username}),o.jsx(Yc,{children:m(f.timestamp)})]}),o.jsx(Vc,{children:f.message})]},f.id);return o.jsxs(Oc,{children:[o.jsxs(Fc,{children:[o.jsx(Bc,{children:"Channel History"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[o.jsx(Wc,{value:t,onChange:a,children:Jc.map(f=>o.jsxs("option",{value:f,children:["Channel ",f]},f))}),o.jsxs(Xc,{$healthy:e.isBackendHealthy,children:[o.jsx(Qc,{$healthy:e.isBackendHealthy}),e.isBackendHealthy?"Connected":"Disconnected"]})]})]}),o.jsxs(Hc,{children:[p&&o.jsxs(qc,{children:["Error: ",p]}),!p&&c.length===0&&!d&&o.jsx(mn,{children:"No messages found for this channel."}),c.map(g),d&&o.jsx(mn,{children:"Loading messages..."}),!d&&c.length>0&&c.length>=n+s&&o.jsx(Kc,{onClick:u,disabled:d,children:"Load More"})]})]})}),el=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  padding: 1rem;
`,tl=l.div`
  margin-bottom: 1rem;
`,rl=l.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`,nl=l.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,ol=l.input`
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
`,il=l.button`
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
`,sl=l.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,al=l.div`
  padding: 0.75rem;
  background: ${e=>e.theme.colors.surface};
  border-radius: 4px;
  border-left: 3px solid ${e=>e.theme.colors.primary};
`,cl=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`,ll=l.div`
  font-weight: bold;
  color: ${e=>e.theme.colors.primary};
`,dl=l.span`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.textSecondary};
`,ul=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  font-size: 0.85rem;
`,Ve=l.div`
  display: flex;
  flex-direction: column;
`,qe=l.span`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 0.8rem;
`,Ke=l.span`
  color: ${e=>e.theme.colors.text};
`,sr=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.textSecondary};
`,hl=l.div`
  text-align: center;
  padding: 2rem;
  color: ${e=>e.theme.colors.error};
`,pl=l.button`
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
`,ml=q(()=>{const e=Nn(),[t,r]=h.useState(""),[n,i]=h.useState(""),[s,a]=h.useState(0),u=50,c=x=>{x.preventDefault(),t.trim()&&(i(t.trim()),a(0),e.loadUserHistory(t.trim(),u,0))},d=()=>{const x=s+u;a(x),e.loadUserHistory(n,u,x)},p=n?e.getUserHistory(n):[],m=n?e.isUserLoading(n):!1,g=n?e.getUserError(n):null,f=x=>new Date(x).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),v=x=>o.jsxs(al,{children:[o.jsxs(cl,{children:[o.jsxs(ll,{children:[x.title&&`${x.title} `,x.username," (",x.rating,")"]}),o.jsx(dl,{children:f(x.timestamp)})]}),o.jsxs(ul,{children:[o.jsxs(Ve,{children:[o.jsx(qe,{children:"Status"}),o.jsx(Ke,{children:x.status})]}),x.rating_type&&o.jsxs(Ve,{children:[o.jsx(qe,{children:"Rating Type"}),o.jsx(Ke,{children:x.rating_type})]}),x.flags&&o.jsxs(Ve,{children:[o.jsx(qe,{children:"Flags"}),o.jsx(Ke,{children:x.flags})]}),x.opponent&&o.jsxs(Ve,{children:[o.jsx(qe,{children:"Opponent"}),o.jsx(Ke,{children:x.opponent})]}),x.time_control&&o.jsxs(Ve,{children:[o.jsx(qe,{children:"Time Control"}),o.jsx(Ke,{children:x.time_control})]}),x.game_info&&o.jsxs(Ve,{children:[o.jsx(qe,{children:"Game Info"}),o.jsx(Ke,{children:x.game_info})]})]})]},x.id);return o.jsxs(el,{children:[o.jsxs(tl,{children:[o.jsx(rl,{children:"User History"}),o.jsxs(nl,{onSubmit:c,children:[o.jsx(ol,{type:"text",placeholder:"Enter username to search...",value:t,onChange:x=>r(x.target.value)}),o.jsx(il,{type:"submit",disabled:!t.trim()||m,children:"Search"})]})]}),o.jsxs(sl,{children:[g&&o.jsxs(hl,{children:["Error: ",g]}),!n&&!g&&o.jsx(sr,{children:"Enter a username to view their history."}),n&&!g&&p.length===0&&!m&&o.jsxs(sr,{children:["No records found for ",n,"."]}),p.map(v),m&&o.jsx(sr,{children:"Loading user history..."}),!m&&p.length>0&&p.length>=s+u&&o.jsx(pl,{onClick:d,disabled:m,children:"Load More"})]})]})}),fl=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${e=>e.theme.colors.background};
`,gl=l.div`
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
`,xl=l.div`
  flex: 1;
  overflow: hidden;
`,yl=()=>{const[e,t]=h.useState("channels");return o.jsxs(fl,{children:[o.jsxs(gl,{children:[o.jsx(fn,{$active:e==="channels",onClick:()=>t("channels"),children:"Channel History"}),o.jsx(fn,{$active:e==="users",onClick:()=>t("users"),children:"User History"})]}),o.jsxs(xl,{children:[e==="channels"&&o.jsx(Zc,{}),e==="users"&&o.jsx(ml,{})]})]})},bl=l.div`
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
`,$l=l.div`
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
`,vl=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,wl=l.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${e=>e.theme.colors.text};
`,kl=l.button`
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
`,Sl=l.div`
  flex: 1;
  overflow: hidden;
`,Cl=({isOpen:e,onClose:t})=>{h.useEffect(()=>{const n=i=>{i.key==="Escape"&&e&&t()};if(e)return document.addEventListener("keydown",n),()=>document.removeEventListener("keydown",n)},[e,t]);const r=n=>{n.target===n.currentTarget&&t()};return e?o.jsx(bl,{$isOpen:e,onClick:r,children:o.jsxs($l,{onClick:n=>n.stopPropagation(),children:[o.jsxs(vl,{children:[o.jsx(wl,{children:"FICS Backend Data"}),o.jsx(kl,{onClick:t,children:"✕"})]}),o.jsx(Sl,{children:o.jsx(yl,{})})]})}):null},jl=l.header`
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
`,Pl=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[3]};
  flex: 1;
`,Rl=l.button`
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
`,El=l.div`
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
`,Oe=l.button`
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
`,Fe=l.div`
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
`,Te=l.button`
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
`;const Ml=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${e=>e.theme.spacing[4]};
  }
`,zl=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing[2]};
`,Tl=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: ${e=>e.theme.spacing[1]};
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
`,Ll=l.div`
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
`,Fo=q(({onMenuClick:e})=>{const{preferencesStore:t}=Ee(),{viewMode:r,chessOrientation:n}=t.preferences,{themePreference:i,setTheme:s}=Lo(),a=Ao(),u=No(),[c,d]=h.useState(!1),[p,m]=h.useState(!1),[g,f]=h.useState(null),[v,x]=h.useState(!1),b=k=>{t.updatePreference("viewMode",k),m(!1),f(null)},y=k=>{t.updatePreference("chessOrientation",k),m(!1),f(null)},C=k=>{s(k),m(!1),f(null)},S=()=>{m(!p),f(null)},R=()=>{d(!0),m(!1),f(null)},$=k=>{f(k)},j=r==="chat-only";return Z.useEffect(()=>{const k=L=>{const O=L.target;p&&!O.closest(".hamburger-menu-container")&&m(!1)};if(p)return document.addEventListener("click",k),()=>document.removeEventListener("click",k)},[p]),Z.useEffect(()=>{const k=L=>{(L.ctrlKey||L.metaKey)&&L.key===","&&(L.preventDefault(),d(!0))};return window.addEventListener("keydown",k),()=>{window.removeEventListener("keydown",k)}},[]),o.jsxs(jl,{children:[o.jsx(Pl,{children:o.jsxs("div",{className:"hamburger-menu-container",style:{position:"relative"},children:[o.jsx(Rl,{onClick:S,"aria-label":"Menu",children:"☰"}),o.jsxs(El,{$isOpen:p,children:[o.jsxs("div",{onMouseEnter:()=>$("theme"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[o.jsxs(Oe,{$hasSubmenu:!0,children:[o.jsx(Fe,{children:"🎨 Theme"}),o.jsx(ar,{children:"▶"})]}),o.jsxs(cr,{$isOpen:g==="theme",children:[o.jsx(Te,{$isActive:i==="light",onClick:()=>C("light"),children:"☀ Light"}),o.jsx(Te,{$isActive:i==="dark",onClick:()=>C("dark"),children:"☾ Dark"}),o.jsx(Te,{$isActive:i==="system",onClick:()=>C("system"),children:"◐ System"})]})]}),o.jsxs("div",{onMouseEnter:()=>$("orientation"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[o.jsxs(Oe,{$hasSubmenu:!0,children:[o.jsx(Fe,{children:"📐 Orientation"}),o.jsx(ar,{children:"▶"})]}),o.jsxs(cr,{$isOpen:g==="orientation",children:[u.includes("landscape")&&o.jsx(Te,{$isActive:n==="landscape",onClick:()=>!j&&y("landscape"),disabled:j,style:{opacity:j?.5:1},children:"▭ Landscape"}),u.includes("portrait")&&o.jsx(Te,{$isActive:n==="portrait",onClick:()=>!j&&y("portrait"),disabled:j,style:{opacity:j?.5:1},children:"▯ Portrait"})]})]}),o.jsxs("div",{onMouseEnter:()=>$("mode"),onMouseLeave:()=>f(null),style:{position:"relative"},children:[o.jsxs(Oe,{$hasSubmenu:!0,children:[o.jsx(Fe,{children:"🎮 View Mode"}),o.jsx(ar,{children:"▶"})]}),o.jsxs(cr,{$isOpen:g==="mode",children:[a.includes("chess-only")&&o.jsx(Te,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),children:"♔ Chess Only"}),a.includes("chess-and-chat")&&o.jsx(Te,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),children:"♔│ Chess & Chat"}),a.includes("chat-only")&&o.jsx(Te,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),children:"▤ Chat Only"})]})]}),o.jsx(gn,{}),o.jsx(Oe,{onClick:R,children:o.jsx(Fe,{children:"⚙️ Settings"})}),o.jsx(Oe,{onClick:()=>{x(!0),m(!1)},children:o.jsx(Fe,{children:"📊 Backend Data"})}),o.jsx(gn,{}),o.jsx(Oe,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface","_blank"),m(!1)},children:o.jsx(Fe,{children:"📖 Documentation"})}),o.jsx(Oe,{onClick:()=>{window.open("https://github.com/cday-with-ai/Simple-FICS-Interface/issues","_blank"),m(!1)},children:o.jsx(Fe,{children:"🐛 Report Issue"})})]})]})}),o.jsx(Ml,{children:o.jsxs(zl,{children:[o.jsx(Tl,{children:"Mode:"}),o.jsxs(Ll,{children:[a.includes("chess-only")&&o.jsx(lr,{$isActive:r==="chess-only",onClick:()=>b("chess-only"),title:"Chess Only",children:"♔"}),a.includes("chess-and-chat")&&o.jsx(lr,{$isActive:r==="chess-and-chat",onClick:()=>b("chess-and-chat"),title:"Chess & Chat",children:"♔│"}),a.includes("chat-only")&&o.jsx(lr,{$isActive:r==="chat-only",onClick:()=>b("chat-only"),title:"Chat Only",children:"▤"})]})]})}),o.jsx(Oo,{isOpen:c,onClose:()=>d(!1)}),o.jsx(Cl,{isOpen:v,onClose:()=>x(!1)})]})});Fo.displayName="AppHeader";const Il=l.img`
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
`,Dl={K:"wK",Q:"wQ",R:"wR",B:"wB",N:"wN",P:"wP",k:"bK",q:"bQ",r:"bR",b:"bB",n:"bN",p:"bP"},Al={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"},Nl=l.div`
  width: 93%;
  height: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$size*.8}px;
  user-select: none;
  cursor: ${e=>e.$isDragging?"grabbing":"grab"};
  filter: ${e=>e.$isDragging?"drop-shadow(0 4px 8px rgba(0,0,0,0.3))":"none"};
`,De=q(({piece:e,size:t,isDragging:r=!1,style:n})=>{const i=Ae(),[s,a]=Z.useState(!1),u=Dl[e];if(!u)return null;const c=i.preferences.pieceSet,d=`/pieces/${c}/${u}.svg`;return Z.useEffect(()=>{a(!1)},[e,c]),s?o.jsx(Nl,{className:"chess-piece-fallback",$isDragging:r,$size:t,style:n,"data-settings":"pieces",children:Al[e]||e}):o.jsx(Il,{className:"chess-piece",src:d,alt:u,$isDragging:r,draggable:!1,style:n,"data-settings":"pieces",onError:()=>a(!0)})});De.displayName="ChessPiece";const Ol=l.div`
  display: ${e=>e.$isOpen?"block":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`,Fl=l.div`
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
`,Bl=l.button`
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
`,Bo=({isOpen:e,color:t,onSelect:r,onCancel:n,position:i})=>{if(!i)return null;const s=["Q","R","B","N"],a=u=>t==="white"?u:u.toLowerCase();return o.jsx(Ol,{$isOpen:e,onClick:n,children:o.jsx(Fl,{$x:i.x,$y:i.y,onClick:u=>u.stopPropagation(),children:s.map(u=>o.jsx(Bl,{onClick:()=>r(u.toLowerCase()),children:o.jsx(De,{piece:a(u),size:50})},u))})})};Bo.displayName="PromotionDialog";const Wl=l.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  position: relative;
  border-radius: ${e=>e.theme.borderRadius.container};
  box-shadow: ${e=>e.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`,Hl=l.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`,_l=l.div`
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
`,Ul=l.div.attrs(e=>({style:{transform:`translate(calc(${e.$x}px - 50%), calc(${e.$y}px - 50%))`,width:`${e.$size}px`,height:`${e.$size}px`}}))`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`,Gl=l.div.attrs(e=>({style:{transform:`translate(
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
`,Qe=["a","b","c","d","e","f","g","h"],Je=["8","7","6","5","4","3","2","1"];function Yl(e,t){return(e+t)%2===0}function Vl(e,t,r){const n=r?Qe[7-e]:Qe[e],i=r?Je[7-t]:Je[t];return`${n}${i}`}function ql(e){const t=new Map,[r]=e.split(" ");return r.split("/").forEach((i,s)=>{let a=0;for(const u of i)if(u>="1"&&u<="8")a+=parseInt(u);else{const c=`${Qe[a]}${Je[s]}`;t.set(c,u),a++}}),t}const Sr=q(({position:e,size:t,flipped:r=!1,showCoordinates:n=!0,onMove:i,onDrop:s,highlightedSquares:a=new Set,lastMove:u,interactive:c=!0,onSizeCalculated:d,selectedCapturedPiece:p,onCapturedPieceSelect:m})=>{Ne();const g=Ae(),f=Wt(),v=h.useRef(null),[x,b]=h.useState(t||200),[y,C]=h.useState(null),[S,R]=h.useState(new Set),[$,j]=h.useState(null),[k,L]=h.useState([]),O=h.useRef(),[H,w]=h.useState(null),[F,B]=h.useState(!1),D=h.useMemo(()=>ql(e),[e]),U=h.useRef(new Map);h.useRef(0);const ee=h.useCallback((P,I)=>{const z=Qe.indexOf(P[0]),T=Je.indexOf(P[1]),E=I/8,M=r?(7-z)*E:z*E,G=r?(7-T)*E:T*E;return{x:M,y:G}},[r]),ce=h.useCallback((P,I,z)=>{const T=P.toLowerCase()==="p",E=z[1];return T&&(E==="8"||E==="1")},[]),Se=h.useCallback(P=>{P.preventDefault(),f.isPlaying&&f.clearPremove()},[f]);h.useEffect(()=>{if(t){b(t);return}const P=()=>{if(!v.current)return;const M=v.current.parentElement;if(!M)return;const{width:G,height:re}=M.getBoundingClientRect();v.current.getBoundingClientRect();const le=16,A=G-le,ie=re-le,Q=Math.floor(Math.min(A,ie)),ue=Math.max(100,Math.floor(Q/8)*8);ue!==x&&b(ue)},I=setTimeout(P,50);P();let z;const T=()=>{clearTimeout(z),z=setTimeout(P,100)};window.addEventListener("resize",T);let E=null;return v.current&&v.current.parentElement&&(E=new ResizeObserver(()=>{T()}),E.observe(v.current.parentElement)),()=>{window.removeEventListener("resize",T),clearTimeout(z),clearTimeout(I),E&&E.disconnect()}},[t,x]),h.useEffect(()=>{d&&x>0&&d(x)},[x,d]);const K=x/8,se=h.useMemo(()=>{if(!g.preferences.animateMoves)return!1;if(f.isPlaying){const P=f.currentGame,I=f.playingColor;if(P&&I){const z=I==="white"?P.white.time:P.black.time,T=g.preferences.disableAnimationsThreshold;if(z<T)return!1}}return!0},[g.preferences.animateMoves,g.preferences.disableAnimationsThreshold,f.isPlaying,f.currentGame,f.playingColor]),ae=h.useRef("");h.useEffect(()=>{if(L([]),!se||F||f.isProcessingServerUpdate){U.current=new Map(D);return}const P=U.current;if(u){const{from:I,to:z}=u,T=`${e}-${I}-${z}`;if(ae.current===T){U.current=new Map(D);return}const E=P.get(I),M=D.get(z);if(E&&M===E&&!D.has(I)){if(f.isPlaying&&f.currentGame){const G=f.gameRelation===1,re=f.playingColor,le=re==="white"&&f.currentGame.turn==="b"||re==="black"&&f.currentGame.turn==="w";if(G||le){U.current=new Map(D),ae.current=T;return}}ae.current=T,setTimeout(()=>{L([{piece:E,from:I,to:z,startTime:Date.now()}])},0)}}U.current=new Map(D)},[D,u,se,F,f.isProcessingServerUpdate,e,f]),h.useEffect(()=>{if(F){const P=setTimeout(()=>{B(!1)},50);return()=>clearTimeout(P)}},[e,F]),h.useEffect(()=>{if(k.length===0)return;const P=()=>{const I=Date.now(),z=g.preferences.animationDuration;L(T=>{const E=T.filter(M=>I-M.startTime<z);return E.length>0&&(O.current=requestAnimationFrame(P)),E})};return O.current=requestAnimationFrame(P),()=>{O.current&&cancelAnimationFrame(O.current)}},[k.length,g.preferences.animationDuration]),h.useEffect(()=>{if(p)try{const P=f.currentPosition;f.chessBoard.getFen()!==P&&f.chessBoard.loadFen(P);const z=f.chessBoard.getLegalMoves().filter(E=>E.from==="@"&&E.san.toLowerCase().startsWith(p.toLowerCase())),T=new Set(z.map(E=>E.to));R(T),C(null)}catch(P){console.error("Error getting drop moves:",P),R(new Set)}},[p,f]);const te=h.useCallback((P,I)=>{if(!c)return;const z=D.get(P);if(p){S.has(P)?(s?.(p,P),m?.(null),R(new Set)):(m?.(null),R(new Set));return}if(y)if(S.has(P)){const T=D.get(y);if(T&&ce(T,y,P)){const E=T===T.toUpperCase()?"white":"black";if(f.isPlaying){const M=g.preferences.autoPromotionPiece;f.isMyTurn?(B(!0),i?.(y,P,M)):f.setPremove(y,P,M)}else{const M=I?.currentTarget.getBoundingClientRect();w({from:y,to:P,color:E,position:M?{x:M.left+M.width/2,y:M.top+M.height/2}:{x:window.innerWidth/2,y:window.innerHeight/2}})}}else f.isPlaying&&!f.isMyTurn?f.setPremove(y,P):(B(!0),i?.(y,P));C(null),R(new Set)}else if(P===y)C(null),R(new Set);else if(z)if(C(P),g.preferences.showLegalMoves)try{const T=f.currentPosition;f.chessBoard.getFen()!==T&&f.chessBoard.loadFen(T);const E=f.chessBoard.getLegalMoves(P),M=new Set(E.map(G=>G.to));R(M)}catch(T){console.error("Error getting legal moves:",T),R(new Set)}else R(new Set);else C(null),R(new Set);else if(z){C(P);try{const T=f.currentPosition;f.chessBoard.getFen()!==T&&f.chessBoard.loadFen(T);const E=z===z.toUpperCase(),M=f.chessBoard.getActiveColor();if(E&&M==="w"||!E&&M==="b")if(g.preferences.showLegalMoves){const re=f.chessBoard.getLegalMoves(P),le=new Set(re.map(A=>A.to));R(le)}else R(new Set);else R(new Set),C(null)}catch(T){console.error("Error getting legal moves:",T),R(new Set)}}},[y,S,D,i,s,c,ce,f,g.preferences.autoPromotionPiece,p,m]),me=h.useCallback((P,I,z)=>{if(!c)return;const T=P.clientX,E=P.clientY;let M=!1,G=!1;const le=P.currentTarget.getBoundingClientRect().width,A=Q=>{const ue=Math.abs(Q.clientX-T),st=Math.abs(Q.clientY-E);(ue>3||st>3)&&z&&!G?(M=!0,G=!0,de(I,z,Q,le)):G&&j(ze=>ze?{...ze,x:Q.clientX,y:Q.clientY}:null)},ie=Q=>{document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",ie),G?Ce(Q,I,z):M?(j(null),C(null),R(new Set)):te(I,P)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",ie)},[c,te]),de=h.useCallback((P,I,z,T)=>{if(C(P),g.preferences.showLegalMoves)try{const M=f.currentPosition;f.chessBoard.getFen()!==M&&f.chessBoard.loadFen(M);const G=I===I.toUpperCase(),re=f.chessBoard.getActiveColor();if(G&&re==="w"||!G&&re==="b"){const A=f.chessBoard.getLegalMoves(P),ie=new Set(A.map(Q=>Q.to));R(ie)}else R(new Set)}catch(M){console.error("Error getting legal moves for drag:",M),R(new Set)}else R(new Set);const E={piece:I,from:P,x:z.clientX,y:z.clientY,size:T};j(E)},[g.preferences.showLegalMoves,f]),Ce=h.useCallback((P,I,z)=>{try{const M=document.elementsFromPoint(P.clientX,P.clientY).find(G=>G.getAttribute("data-square"))?.getAttribute("data-square");if(M&&M!==I)if(ce(z,I,M)){const G=z===z.toUpperCase()?"white":"black";if(f.isPlaying){const re=g.preferences.autoPromotionPiece;f.isMyTurn?(B(!0),i?.(I,M,re)):f.setPremove(I,M,re)}else w({from:I,to:M,color:G,position:{x:P.clientX,y:P.clientY}})}else f.isPlaying&&!f.isMyTurn?f.setPremove(I,M):(B(!0),i?.(I,M))}catch(T){console.error("Error in handleDragEnd:",T)}j(null),C(null),R(new Set)},[i,ce,f,g.preferences.autoPromotionPiece]),fe=h.useMemo(()=>{const P=[];for(let I=0;I<8;I++)for(let z=0;z<8;z++){const T=Yl(z,I),E=Vl(z,I,r),M=D.get(E),G=a.has(E),re=u&&(u.from===E||u.to===E),le=y===E,A=S.has(E),ie=$?.from===E;k.some(ze=>ze.to===E);const Q=k.some(ze=>ze.from===E),ue=n&&I===7,st=n&&z===0;P.push(o.jsxs(_l,{"data-square":E,$isLight:T,$isHighlighted:G,$isLastMoveSquare:!!re,$isSelected:le,$isPossibleMove:A,onMouseDown:ze=>me(ze,E,M),children:[M&&!ie&&!Q&&o.jsx(De,{piece:M,size:K},`${M}-${K}`),ue&&o.jsx(xn,{$type:"file",$isLight:T,$size:K,"data-settings":"coordinates",className:"coordinate-label",children:r?Qe[7-z]:Qe[z]}),st&&o.jsx(xn,{$type:"rank",$isLight:T,$size:K,"data-settings":"coordinates",className:"coordinate-label",children:r?Je[7-I]:Je[I]})]},E))}return P},[r,n,D,a,u,y,S,$,K,te,me]);return o.jsxs(o.Fragment,{children:[o.jsxs(Wl,{ref:v,$size:x,onContextMenu:Se,"data-settings":"board",className:"chess-board",children:[o.jsx(Hl,{children:fe}),k.map((P,I)=>{const z=ee(P.from,x),T=ee(P.to,x),E=Date.now()-P.startTime,M=g.preferences.animationDuration,G=Math.min(E/M,1),le=(A=>A<.5?4*A*A*A:1-Math.pow(-2*A+2,3)/2)(G);return o.jsx(Gl,{$fromX:z.x,$fromY:z.y,$toX:T.x,$toY:T.y,$progress:le,$size:K,children:o.jsx(De,{piece:P.piece,size:K},`${P.piece}-${K}`)},`${P.from}-${P.to}-${P.startTime}`)})]}),$&&o.jsx(o.Fragment,{children:o.jsx(Ul,{$x:$.x,$y:$.y,$size:$.size,children:o.jsx(De,{piece:$.piece,size:$.size,isDragging:!0},`${$.piece}-${$.size}-dragging`)})}),H&&o.jsx(Bo,{isOpen:!0,color:H.color,position:H.position,onSelect:P=>{B(!0),i?.(H.from,H.to,P),w(null)},onCancel:()=>w(null)})]})});Sr.displayName="ChessBoardWithPieces";const Kl=l.div`
    display: inline-block;
    font-family: ${({theme:e})=>e.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme:e})=>e.colors.text};

    ${({size:e})=>{switch(e){case"small":return"font-size: 14px;";case"large":return"font-size: 24px;";case"medium":default:return"font-size: 18px;"}}}
`,Xl=l.span`
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
`,Wo=({time:e,size:t="medium",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:i=30,showTenths:s=!1,className:a,compact:u=!1})=>{const c=p=>{const m=Math.floor(p/3600),g=Math.floor(p%3600/60),f=Math.floor(p%60),v=Math.floor(p%1*10),x=r&&Math.floor(p)%2===0?" ":":";return m>0?`${m}${x}${g.toString().padStart(2,"0")}${x}${f.toString().padStart(2,"0")}`:p<i&&s?`${g}${x}${f.toString().padStart(2,"0")}.${v}`:`${g}${x}${f.toString().padStart(2,"0")}`},d=e<=i&&e>0;return o.jsx(Kl,{size:t,className:a,children:o.jsx(Xl,{$isLowTime:d,$isActive:r,$compact:u,$isFinished:n,children:c(e)})})},Ql=l.span`
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
`,Jl=({time:e,size:t="large",isActive:r=!1,isFinished:n=!1,lowTimeThreshold:i=30,showTenths:s=!1,className:a})=>{const u=p=>{const m=Math.floor(p/3600),g=Math.floor(p%3600/60),f=Math.floor(p%60),v=Math.floor(p%1*10),x=r&&Math.floor(p)%2===0?" ":":";return m>0?`${m}${x}${g.toString().padStart(2,"0")}${x}${f.toString().padStart(2,"0")}`:p<i&&s?`${g}${x}${f.toString().padStart(2,"0")}.${v}`:`${g}${x}${f.toString().padStart(2,"0")}`},c=e<=i&&e>0,d=t==="large"?"48px":t==="medium"?"36px":"24px";return o.jsx(Ql,{className:a,$isLowTime:c,$isActive:r,$isFinished:n,$size:d,children:u(e)})},vt=l(Jl)`
    /* Additional GameClock-specific styles if needed */
`;l(Wo).attrs({size:"small"})`
    font-size: 12px;
`;l(Wo).attrs({size:"medium"})`
    font-size: 16px;
`;const Zl=l.div`
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
`,ed=l.button`
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
`,td=l.div`
  height: 1px;
  background-color: ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing[1]} 0;
`,Fr=q(({playerName:e,position:t,onClose:r})=>{const n=On(),i=Ae(),s=h.useRef(null),a=i.preferences.playerContextCommands||[{label:"Finger",command:"finger {player}"},{label:"History",command:"hi {player}"},{label:"Variables",command:"vars {player}"},{divider:!0},{label:"Censor",command:"+censor {player}"},{label:"No Play",command:"+noplay {player}"}];h.useEffect(()=>{const c=p=>{s.current&&!s.current.contains(p.target)&&r()},d=p=>{p.key==="Escape"&&r()};return setTimeout(()=>{document.addEventListener("mousedown",c),document.addEventListener("keydown",d)},0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}},[r]),h.useEffect(()=>{if(s.current){const c=s.current.getBoundingClientRect(),d=window.innerWidth,p=window.innerHeight;let m=t.x,g=t.y;c.right>d&&(m=d-c.width-10),c.bottom>p&&(g=p-c.height-10),(m!==t.x||g!==t.y)&&(s.current.style.left=`${m}px`,s.current.style.top=`${g}px`)}},[t]);const u=c=>{const d=e.replace(/\([^)]*\)/g,"").trim(),p=c.replace("{player}",d);n.sendCommand(p),r()};return o.jsx(Zl,{ref:s,$x:t.x,$y:t.y,children:a.map((c,d)=>"divider"in c&&c.divider?o.jsx(td,{},d):"command"in c?o.jsx(ed,{onClick:()=>u(c.command),children:c.label},d):null)})});Fr.displayName="PlayerContextMenu";const rd=l.span`
  cursor: pointer;
  transition: color ${e=>e.theme.transitions.fast};
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Ho=({name:e,className:t,style:r,onClick:n})=>{const[i,s]=h.useState(null),a=u=>{u.preventDefault(),u.stopPropagation(),n&&n(),s({x:u.clientX,y:u.clientY})};return o.jsxs(o.Fragment,{children:[o.jsx(rd,{className:t,style:r,onClick:a,children:e}),i&&o.jsx(Fr,{playerName:e,position:i,onClose:()=>s(null)})]})};Ho.displayName="PlayerName";const nd=l.div`
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
`,od=l.div`
  display: flex;
  align-items: center;
  width: 100%;
`,id=l.div`
  display: flex;
  align-items: center;
  flex: 1;
`,sd=l.div`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,ad=l.div`
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
`;const lt=q(({name:e,rating:t,time:r,isActive:n,isWhite:i,orientation:s="horizontal",hideClockInCard:a=!1,onlyInfo:u=!1,compact:c=!1})=>{const d=o.jsxs(o.Fragment,{children:[o.jsx(od,{children:o.jsxs(id,{children:[o.jsx(sd,{children:o.jsx(Ho,{name:e})}),o.jsx(ad,{children:t===-1?"++++":t===-2?"----":t})]})}),!a&&!u&&o.jsx(vt,{time:r,isActive:n,showTenths:r<10,lowTimeThreshold:30,size:s==="horizontal"?"medium":"small"})]});return u?d:o.jsx(nd,{$isActive:n,$orientation:s,$compact:c,children:d})});lt.displayName="PlayerCard";const cd=l.div`
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
`,ge=l.button`
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
`,ld=l.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing[1]};
`,yn=l.div`
  display: flex;
  align-items: center;
  padding: 2px ${e=>e.theme.spacing[1]};
  font-family: ${e=>e.theme.typography.fontFamilyMono};
  font-size: ${e=>e.theme.typography.fontSize.xs};
`,dd=l.span`
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
`,Qt=q(({moves:e,currentMoveIndex:t,onMoveClick:r,onNavigate:n,showHeader:i=!0,extraControls:s,className:a,disableAutoScroll:u=!1})=>{const c=h.useRef(null);h.useEffect(()=>{if(!u&&c.current&&t!==void 0){const p=c.current.querySelector(`[data-move-index="${t}"]`);p&&p.scrollIntoView({behavior:"smooth",block:"nearest"})}},[t,u]);const d=()=>{const p=[];for(let m=0;m<e.length;m+=2){const g=Math.floor(m/2)+1,f=e[m],v=e[m+1];p.push(o.jsxs(yn,{children:[o.jsxs(dd,{children:[g,"."]}),o.jsx(bn,{$isCurrentMove:t===m,onClick:()=>r?.(m),"data-move-index":m,children:hr(f.san)}),v&&o.jsx(bn,{$isCurrentMove:t===m+1,onClick:()=>r?.(m+1),"data-move-index":m+1,children:hr(v.san)})]},m))}return p};return o.jsxs(cd,{className:a,children:[i?o.jsx(dr,{children:o.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("span",{children:"Moves"}),o.jsxs(ur,{children:[o.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),o.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),o.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),o.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]})})}):s?o.jsxs(dr,{children:[s,o.jsxs(ur,{children:[o.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),o.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),o.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),o.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})]}):o.jsx(dr,{children:o.jsxs(ur,{children:[o.jsx(ge,{onClick:()=>n?.("first"),title:"First move",children:"⏮"}),o.jsx(ge,{onClick:()=>n?.("prev"),title:"Previous move",children:"◀"}),o.jsx(ge,{onClick:()=>n?.("next"),title:"Next move",children:"▶"}),o.jsx(ge,{onClick:()=>n?.("last"),title:"Last move",children:"⏭"})]})}),o.jsx(ld,{ref:c,children:e.length===0?o.jsx(yn,{children:o.jsx("span",{style:{color:"var(--color-textSecondary)"},children:"No moves yet"})}):d()})]})});Qt.displayName="MoveList";const ud=l(vt)`
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
`,hd=l(vt)`
    margin-left: ${e=>e.theme.spacing[3]};
    width: fit-content;
`,dt=q(({player:e,isActive:t,size:r="small",compact:n=!0,variant:i="portrait"})=>{const s=Wt(),a=i==="landscape"?hd:ud;return o.jsx(a,{time:e.time,isActive:t,isFinished:s.isGameOver,showTenths:e.time<10,lowTimeThreshold:30,size:r,compact:n,"data-settings":"clock",className:"chess-clock"})});dt.displayName="ObservableClock";const pd=l.div`
  position: relative;
  display: inline-block;
`,md=l.button`
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
`,fd=l.div`
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
`,gd=l.button`
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
`,Br=q(({color:e,size:t="small"})=>{const r=Ae(),[n,i]=h.useState(!1),s=h.useRef(null),a=["Q","R","B","N"],u=r.preferences.autoPromotionPiece,c=m=>e==="white"?m:m.toLowerCase();h.useEffect(()=>{const m=g=>{s.current&&!s.current.contains(g.target)&&i(!1)};if(n)return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[n]);const d=m=>{r.updatePreference("autoPromotionPiece",m),i(!1)},p=t==="small"?28:36;return o.jsxs(pd,{ref:s,children:[o.jsx(md,{$size:t,onClick:()=>i(!n),title:"Select promotion piece",children:o.jsx(De,{piece:c(u),size:p})}),o.jsx(fd,{$isOpen:n,children:a.map(m=>o.jsx(gd,{$size:t,onClick:()=>d(m),title:`Promote to ${m==="Q"?"Queen":m==="R"?"Rook":m==="B"?"Bishop":"Knight"}`,children:o.jsx(De,{piece:c(m),size:p})},m))})]})});Br.displayName="PromotionPieceSelector";const xd=l.div`
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
`,_o=q(({perspective:e,onDraw:t,onResign:r,onAbort:n,onAnalysis:i,onUnobserve:s,onUnexamine:a,onSetupFEN:u,onFlipBoard:c,isAnalysisActive:d,isDrawOffered:p,canAbort:m,className:g})=>{const f=Wt(),v=()=>o.jsxs(o.Fragment,{children:[m&&o.jsx(he,{onClick:n,$variant:"secondary",children:"Abort"}),o.jsx(he,{onClick:t,$variant:"secondary",children:"Draw"}),f.currentGame&&f.currentGame.moveNumber>=2&&o.jsx(he,{onClick:r,$variant:"secondary",children:"Resign"}),o.jsx(Br,{color:f.playingColor||"white",size:"medium"})]}),x=()=>o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:s,$variant:"secondary",children:"Unobserve"}),o.jsx(he,{onClick:i,$variant:"secondary",children:"Analysis"}),o.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),b=()=>o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:a,$variant:"secondary",children:"Unexamine"}),o.jsx(he,{onClick:i,$variant:"secondary",children:"Analysis"}),o.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]}),y=()=>o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:i,$variant:"secondary",children:"Analysis"}),o.jsx(he,{onClick:u,$variant:"secondary",children:"FEN"}),o.jsx(he,{onClick:c,$variant:"secondary",children:"Flip"})]});return o.jsxs(xd,{className:g,children:[e==="playing"&&v(),e==="observing"&&x(),e==="examining"&&b(),e==="freestyle"&&y()]})}),be=l(he)`
  padding: ${e=>e.theme.spacing[1]} ${e=>e.theme.spacing[2]};
  font-size: 11px;
`;_o.displayName="GameControls";const $n=l.div`
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
`,yd=l.div`
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
`,Uo=q(({evaluation:e,percent:t,orientation:r="vertical",className:n})=>{const s=Ht().isBottomPlayerWinning;let a,u,c;if(t===50)a=47,u=6,c=47;else if(t>50){const p=t-50;a=50-p,u=p,c=50}else{const p=50-t;a=50,u=p,c=50-p}const d=t===50?"#FFC107":s?"#2E7D32":"#C62828";if(r==="vertical"){const p=t<20;return o.jsxs($n,{$orientation:r,className:n,children:[o.jsx(vn,{$orientation:r,children:e}),o.jsx(yd,{$needsDarkText:p,children:e}),o.jsxs(wn,{$orientation:r,children:[o.jsx(Ct,{style:{height:`${a}%`}}),o.jsx(kn,{$color:d,style:{height:`${u}%`}}),o.jsx(Ct,{style:{height:`${c}%`}})]})]})}else return o.jsxs($n,{$orientation:r,className:n,children:[o.jsx(vn,{$orientation:r,children:e}),o.jsxs(wn,{$orientation:r,children:[o.jsx(Ct,{style:{width:`${c}%`}}),o.jsx(kn,{$color:d,style:{width:`${u}%`}}),o.jsx(Ct,{style:{width:`${a}%`}})]})]})});Uo.displayName="EvaluationBar";const bd=l.div`
  display: flex;
  align-items: center;
  height: ${e=>e.$boardSize?`${e.$boardSize+e.$boardSize/8*.25}px`:"99.5%"};
  position: relative;
  padding: ${e=>e.theme.spacing[2]} 0;
  padding-top: ${e=>e.theme.spacing[3]};
  box-sizing: border-box;
`,$d=l.div`
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
`,Cr=q(({orientation:e="vertical",boardSize:t})=>{const r=Ht();return o.jsx(bd,{$orientation:e,$boardSize:t,children:o.jsx(Uo,{evaluation:r.evaluation,percent:r.evaluationPercent,orientation:e})})}),jr=q(({className:e})=>{const t=Ht();return o.jsxs($d,{className:e,children:[o.jsxs("div",{className:"depth",children:["Depth ",t.depth||0]}),o.jsx("div",{className:"line",children:t.principalVariation||(t.currentLine?t.currentLine.pv.join(" "):null)||"Calculating..."})]})});Cr.displayName="AnalysisDisplay";jr.displayName="AnalysisInfoDisplay";const vd=l.div`
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
`,wd=l.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.xl};
`,kd=l.h2`
  font-size: ${e=>e.theme.typography.fontSize.xl};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  margin-bottom: ${e=>e.theme.spacing[4]};
  color: ${e=>e.theme.colors.text};
`,Go=l.input`
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
`,Sd=l.div`
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,Cd=l.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  margin-bottom: ${e=>e.theme.spacing[4]};
`,jd=l.div`
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
`,Pd=l.button`
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
`,Rd=l(Go)`
  margin-bottom: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.surfaceElevated};
  cursor: text;
`,Yo=q(({isOpen:e,onClose:t})=>{const{gameStore:r}=Ee(),[n,i]=h.useState(""),[s,a]=h.useState(""),u=r.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=h.useCallback(f=>{i(f.target.value),a("")},[]),d=h.useCallback(()=>{try{r.loadPosition(n.trim())?(t(),i(""),a("")):a("Invalid FEN string. Please check the format.")}catch{a("Invalid FEN string. Please check the format.")}},[n,r,t]),p=h.useCallback(f=>{const v=typeof f=="function"?f():f;i(v),a("");try{r.loadPosition(v)?(t(),i("")):a("Failed to load preset position.")}catch{a("Failed to load preset position.")}},[r,t]),m=h.useCallback(f=>{f.key==="Enter"&&n.trim()?d():f.key==="Escape"&&t()},[n,d,t]),g=[{name:"Starting Position",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{name:"Random Chess960",fen:()=>oi.generateChess960Position()},{name:"Sicilian Dragon",fen:"r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7"}];return e?o.jsx(vd,{$isOpen:e,onClick:t,children:o.jsxs(wd,{onClick:f=>f.stopPropagation(),children:[o.jsx(kd,{children:"Set Position from FEN"}),o.jsx(Cd,{children:"Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position."}),o.jsxs(Cn,{children:[o.jsx(jn,{children:"Current position:"}),o.jsx(Rd,{type:"text",value:u,readOnly:!0,onClick:f=>f.currentTarget.select()})]}),o.jsxs(Cn,{children:[o.jsx(jn,{children:"Preset position:"}),g.map(f=>o.jsx(Pd,{onClick:()=>p(f.fen),children:f.name},f.name))]}),o.jsx(Go,{type:"text",value:n,onChange:c,onKeyDown:m,placeholder:"e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",autoFocus:!0}),s&&o.jsx(Sd,{children:s}),o.jsxs(jd,{children:[o.jsx(Sn,{onClick:t,children:"Cancel"}),o.jsx(Sn,{$variant:"primary",onClick:d,disabled:!n.trim(),children:"Set Position"})]})]})}):null});Yo.displayName="FENDialog";const Ed=l.div`
  display: flex;
  flex-direction: ${e=>e.$orientation==="horizontal"?"row":"column"};
  gap: ${e=>e.$orientation==="horizontal"?e.theme.spacing[1]:0};
  align-items: center;
  ${e=>e.$orientation==="vertical"&&e.$size&&`
    width: ${e.$size+4}px;
  `}
`,Md=l.div`
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
`,zd=l.div`
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
`,Td=l.div`
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
`,Ld=l(De)`
  width: 100%;
  height: 100%;
`,ut=q(({orientation:e="horizontal",isWhitePieces:t=!0,className:r,boardSize:n,onPieceClick:i})=>{const{gameStore:s}=Ee(),a=h.useMemo(()=>{if(s.currentGame?.variant==="crazyhouse")return(t?s.whiteHoldings:s.blackHoldings).toLowerCase().split("");{const m=s.capturedPieces;return t?m.white:m.black}},[s.currentGame?.variant,s.whiteHoldings,s.blackHoldings,s.capturedPieces,t]),u=h.useMemo(()=>{const p={};return a.forEach(m=>{p[m]=(p[m]||0)+1}),p},[a]),c=["p","n","b","r","q"],d=n?n/8:32;return o.jsx(Ed,{$orientation:e,$size:d,className:r,children:o.jsx(Md,{$orientation:e,children:c.map(p=>{const m=u[p]||0,g=t?p.toUpperCase():p;return o.jsx(zd,{$size:d,onClick:m>0&&i?()=>i(g):void 0,style:{cursor:m>0&&i?"pointer":"default"},children:m>0&&o.jsxs(o.Fragment,{children:[o.jsx(Ld,{piece:g,size:d}),m>1&&o.jsx(Td,{children:m})]})},p)})})})});ut.displayName="CapturedPieces";const Id=l.div`
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
`,Dd=l.div`
  background-color: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${e=>e.theme.shadows.xl};
`,Ad=l.h3`
  margin: 0 0 ${e=>e.theme.spacing[4]} 0;
  font-size: ${e=>e.theme.typography.fontSize.lg};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,Nd=l.p`
  margin: 0 0 ${e=>e.theme.spacing[6]} 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  color: ${e=>e.theme.colors.textSecondary};
`,Od=l.div`
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
`,Fd=({isOpen:e,title:t,message:r,confirmText:n="Confirm",cancelText:i="Cancel",onConfirm:s,onCancel:a})=>o.jsx(Id,{$isOpen:e,onClick:a,children:o.jsxs(Dd,{onClick:u=>u.stopPropagation(),children:[o.jsx(Ad,{children:t}),o.jsx(Nd,{children:r}),o.jsxs(Od,{children:[o.jsx(Pn,{$variant:"secondary",onClick:a,children:i}),o.jsx(Pn,{$variant:"primary",onClick:s,children:n})]})]})}),Bd=l.div`
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
    font-size: ${e=>e.theme.typography.fontSize.sm};
    color: ${e=>e.theme.colors.textSecondary};
    white-space: nowrap;
`;const Wd=l.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`,Hd=l.div`
    display: flex;
    flex-direction: row;
    gap: ${e=>e.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`,_d=l.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`,Ud=l.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${e=>e.$squareSize?e.$squareSize*1.2:0}px;
    left: 0;
    right: 0;
`,Vo=l.div`
    display: flex;
    gap: ${e=>e.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`,qo=l.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`,Gd=l(Vo)`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Yd=l(qo)`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    padding: 0 11px;
`,Vd=l(Vo)`
    margin-top: 10px;
    margin-bottom: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`,qd=l.div`
    display: flex;
    gap: ${e=>e.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${e=>e.theme.spacing[2]};
    z-index: 10;
`,Kd=l(qo)`
    margin-top: ${e=>e.theme.spacing[1]};
    padding: 0 30px;
`,En=l.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Mn=l.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,zn=l.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Tn=l.div`
    font-size: ${e=>e.theme.typography.fontSize.xs};
    color: ${e=>e.theme.colors.textTertiary};
    font-weight: ${e=>e.theme.typography.fontWeight.normal};
`,Ln=l.div`
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
`,Xd=l.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`,Qd=l.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`,Jd=l.div`
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
`;const Zd=l.div`
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
`,eu=l.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`,tu=l.div`
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
`;const ru=l.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${e=>e.theme.spacing[2]};
    width: 200px;
    padding: ${e=>e.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${e=>e.$boardSize?`${35+8+e.$boardSize/2-160}px`:"180px"};
`,nu=l.div`
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
`;const ou=l(Qt)`
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
`;const iu=l.div`
    margin-top: ${e=>e.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${e=>e.$chatWidth||0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`,su=l.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${e=>e.theme.spacing[2]};
    padding-top: ${e=>e.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`,au=l.div`
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
`;const cu=l.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`,lu=l.div`
    display: flex;
    align-items: center;
    height: ${e=>e.$boardSize?`${e.$boardSize}px`:"auto"};
    margin-top: 65px; /* Align with board top (top info + player info) */
`,Ko=q(({className:e,hasChat:t=!1,chatWidth:r=0})=>{const n=Wt(),i=Ae(),s=Ht(),a=On(),u=ii();Ne();const[c,d]=h.useState(!1),[p,m]=h.useState(!1),[g,f]=h.useState(0),[v,x]=h.useState(!1),[b,y]=h.useState(!1),[C,S]=h.useState(null),R=i.preferences.chessOrientation==="landscape",$=n.currentPosition||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",k=window.innerWidth/window.innerHeight>1.6,L=h.useMemo(()=>!n.currentGame||n.currentGame.gameId<0?"freestyle":n.isPlaying?"playing":n.isObserving?"observing":n.isExamining?"examining":"observing",[n.currentGame,n.gameRelation]),O=h.useMemo(()=>n.currentGame?.variant==="crazyhouse"?!0:i.preferences.showCapturedPieces,[n.currentGame?.variant,i.preferences.showCapturedPieces]),H=h.useCallback((A,ie,Q)=>{try{n.makeMove(A,ie,Q)||(console.error("Invalid move:",A,ie),u.playIllegal())}catch(ue){console.error("Error making move:",ue),u.playIllegal()}},[n,u]),w=h.useCallback((A,ie)=>{try{const Q=A.toLowerCase();n.makeSANMove(`${A.toUpperCase()}@${ie}`)||(console.error("Invalid drop:",A,ie),u.playIllegal())}catch(Q){console.error("Error making drop:",Q),u.playIllegal()}},[n,u]),F=h.useCallback(A=>{S(C===A?null:A)},[C]);h.useMemo(()=>{if(n.currentGameInfo){const{white:A,black:ie,timeControl:Q,variant:ue}=n.currentGameInfo;return`Game ${n.currentGame?.gameId||"?"} • ${ue} ${Q}`}return"No active game"},[n.currentGameInfo,n.currentGame]);const B=(()=>{const A=n.moveHistory.length;if(A>0){const ie=n.moveHistory[A-1],Q=Math.ceil(A/2),ue=A%2===1,st=hr(ie.san);return`${Q}.${ue?"":".."} ${st}`}return"Starting position"})(),D=n.currentOpening,U=n.currentGame,ee=U||n.lastGameState,ce=ee?.white||{name:"White",rating:1500,time:900},Se=ee?.black||{name:"Black",rating:1500,time:900},K=!U||U.turn==="w",se=n.shouldShowFlippedBoard,ae=se?ce:Se,te=se?Se:ce,me=se,de=L==="freestyle"?!1:se?K:!K,Ce=h.useCallback(A=>{n.goToMove(A)},[n]);h.useEffect(()=>{s.initialize()},[s]),h.useEffect(()=>{b&&n.isPlaying&&n.currentGame&&a.sendCommand("draw")},[n.moveHistory.length,b,n.isPlaying,a]),h.useEffect(()=>{(!n.currentGame||!n.isPlaying)&&y(!1)},[n.currentGame,n.isPlaying]),h.useEffect(()=>{c&&s.isEngineReady?s.startAnalysis($):s.stopAnalysis()},[c,$,s]);const fe=h.useCallback(()=>{d(A=>!A)},[]),P=h.useCallback(()=>{m(!0)},[]),I=h.useCallback(()=>{i.updatePreference("boardFlipped",!i.preferences.boardFlipped)},[i]),z=h.useCallback(()=>{n.currentGame&&a.sendCommand(`unobs ${n.currentGame.gameId}`)},[a,n.currentGame]),T=h.useCallback(()=>{a.sendCommand("unexamine")},[a]),E=h.useCallback(()=>{x(!0)},[]),M=h.useCallback(()=>{a.sendCommand("resign"),x(!1)},[a]),G=h.useCallback(()=>{a.sendCommand("draw"),y(!b)},[a,b]),re=h.useCallback(()=>{a.sendCommand("abort")},[a]),le=()=>o.jsxs(o.Fragment,{children:[o.jsx(Rn,{$orientation:"portrait",children:o.jsx(Xd,{children:o.jsxs(Qd,{children:[c&&o.jsx(lu,{$boardSize:g,children:o.jsx(Cr,{orientation:"vertical",boardSize:g})}),o.jsx(Jd,{children:o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},id:"board-container",children:[o.jsxs(Vd,{children:[o.jsxs(En,{children:["Game #",ee?.gameId||"?"]}),o.jsx(Mn,{children:ee?.timeControl||"?"}),o.jsxs(qd,{children:[L==="playing"&&o.jsxs(o.Fragment,{children:[n.moveHistory.length<=1&&o.jsx(be,{onClick:re,$variant:"secondary",children:"Abort"}),o.jsx(be,{onClick:G,$variant:"secondary",children:"Draw"}),o.jsx(be,{onClick:E,$variant:"secondary",children:"Resign"}),o.jsx(Br,{color:n.playingColor||"white",size:"small"})]}),L==="observing"&&o.jsxs(o.Fragment,{children:[o.jsx(be,{onClick:z,$variant:"secondary",children:"Unobserve"}),o.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),L==="examining"&&o.jsxs(o.Fragment,{children:[o.jsx(be,{onClick:T,$variant:"secondary",children:"Unexamine"}),o.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"})]}),L==="freestyle"&&o.jsxs(o.Fragment,{children:[o.jsx(be,{onClick:fe,$variant:"secondary",children:"Analysis"}),o.jsx(be,{onClick:I,$variant:"secondary",children:"Flip"}),o.jsx(be,{onClick:P,$variant:"secondary",children:"FEN"})]})]})]}),o.jsxs(In,{children:[o.jsx(dt,{player:ae,isActive:de,size:"small",compact:!0}),o.jsx(Dn,{children:o.jsx(lt,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),o.jsx(Ln,{$orientation:"portrait",children:o.jsx(Sr,{position:$,flipped:se,showCoordinates:i.preferences.showCoordinates,onMove:H,onDrop:w,interactive:L==="playing"||L==="freestyle"||L==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:C,onCapturedPieceSelect:S})}),o.jsxs(In,{children:[o.jsx(dt,{player:te,isActive:L==="freestyle"?!1:!de,size:"small",compact:!0}),o.jsx(Dn,{children:o.jsx(lt,{name:te.name,rating:te.rating,time:0,isActive:L==="freestyle"?!1:!de,isWhite:!me,orientation:"horizontal",hideClockInCard:!0,compact:!0})})]}),o.jsxs(Kd,{children:[o.jsx(zn,{children:n.premove?`Premove: ${Wr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,$)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),D&&o.jsx(Tn,{children:D})]}),c&&o.jsx(cu,{children:o.jsx(jr,{})})]})}),O&&o.jsx(_d,{$squareSize:g?g/8:0,children:o.jsxs(Ud,{$squareSize:g?g/8:0,children:[o.jsx(ut,{orientation:"vertical",isWhitePieces:se,boardSize:g,onPieceClick:F}),o.jsx(ut,{orientation:"vertical",isWhitePieces:!se,boardSize:g,onPieceClick:F})]})})]})})}),o.jsx(Zd,{$orientation:"portrait",$boardSize:g,children:o.jsx(Qt,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,disableAutoScroll:!0,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("back 500");break;case"prev":a.sendCommand("back");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 500");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}})})]});return o.jsxs(Bd,{className:e,$orientation:R?"landscape":"portrait",$hasChat:t,children:[R?o.jsx(o.Fragment,{children:o.jsx(Rn,{$orientation:"landscape",children:o.jsxs(eu,{children:[o.jsx(su,{children:c&&o.jsx(au,{$boardSize:g,children:o.jsx(Cr,{orientation:"vertical",boardSize:g})})}),o.jsxs(tu,{$hasAnalysis:c,children:[o.jsxs(Wd,{$isWideAspect:k,children:[o.jsxs(Gd,{$chatWidth:r,$hasAnalysis:c,children:[o.jsxs(En,{children:["Game #",ee?.gameId||"?"]}),o.jsx(Mn,{children:ee?.timeControl||"?"})]}),o.jsx(Hd,{$orientation:"landscape",children:o.jsx(Ln,{$orientation:"landscape",$chatWidth:r,$hasAnalysis:c,children:o.jsx(Sr,{position:$,flipped:se,showCoordinates:i.preferences.showCoordinates,onMove:H,onDrop:w,interactive:L==="playing"||L==="freestyle"||L==="examining",lastMove:n.lastMove||void 0,onSizeCalculated:f,selectedCapturedPiece:C,onCapturedPieceSelect:S})})}),o.jsxs(Yd,{$chatWidth:r,$hasAnalysis:c,children:[o.jsx(zn,{children:n.premove?`Premove: ${Wr(`${n.premove.from}${n.premove.to}${n.premove.promotion||""}`,$)}`:B!=="Starting position"?`Last move: ${B}`:"Last move: none"}),D&&o.jsx(Tn,{children:D})]}),c&&o.jsx(iu,{$chatWidth:r,$hasAnalysis:c,children:o.jsx(jr,{})})]}),o.jsxs(ru,{$isWideAspect:k,$boardSize:g,children:[O&&o.jsx(ut,{orientation:"horizontal",isWhitePieces:me,boardSize:g,onPieceClick:F}),o.jsx(dt,{player:ae,isActive:de,size:"small",compact:!0,variant:"landscape"}),o.jsxs(nu,{children:[o.jsx(lt,{name:ae.name,rating:ae.rating,time:0,isActive:de,isWhite:me,orientation:"vertical",hideClockInCard:!0,compact:!0}),o.jsx(_o,{perspective:L,canAbort:n.moveHistory.length<=1,onAnalysis:fe,onFlipBoard:I,onSetupFEN:P,onUnobserve:z,onUnexamine:T,onResign:E,onDraw:G,onAbort:re,isAnalysisActive:c,isDrawOffered:b}),o.jsx(ou,{moves:n.moveHistory,currentMoveIndex:n.currentMoveIndex,onMoveClick:Ce,showHeader:!1,onNavigate:A=>{if(n.isExamining)switch(A){case"first":a.sendCommand("backward 999");break;case"prev":a.sendCommand("backward");break;case"next":a.sendCommand("forward");break;case"last":a.sendCommand("forward 999");break}else switch(A){case"first":n.goToStart();break;case"prev":n.goToPreviousMove();break;case"next":n.goToNextMove();break;case"last":n.goToEnd();break}}}),o.jsx(lt,{name:te.name,rating:te.rating,time:0,isActive:!de,isWhite:!me,orientation:"vertical",hideClockInCard:!0,compact:!0})]}),o.jsx(dt,{player:te,isActive:L==="freestyle"?!1:!de,size:"small",compact:!0,variant:"landscape"}),O&&o.jsx(ut,{orientation:"horizontal",isWhitePieces:!me,boardSize:g,onPieceClick:F})]})]})]})})}):le(),o.jsx(Yo,{isOpen:p,onClose:()=>m(!1)}),o.jsx(Fd,{isOpen:v,title:"Resign Game",message:"Are you sure you want to resign?",confirmText:"Yes, Resign",cancelText:"Cancel",onConfirm:M,onCancel:()=>x(!1)})]})});Ko.displayName="ChessGameLayout";const du=l.div`
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
`,uu=l.div`
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
`,hu=l.span`
  font-weight: ${e=>e.theme.typography.fontWeight.medium};
`,pu=l.span`
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
`,mu=l.button`
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
`,fu=l.span`
  font-size: 12px;
  opacity: 0.7;
`,Xo=q(()=>{const{chatStore:e}=Ee(),t=e.sortedTabs,[r,n]=Z.useState(null),[i,s]=Z.useState(null),a=(m,g)=>{n(g),m.dataTransfer.effectAllowed="move"},u=(m,g)=>{m.preventDefault(),m.dataTransfer.dropEffect="move",s(g)},c=()=>{s(null)},d=(m,g)=>{m.preventDefault(),r&&r!==g&&e.reorderTabs(r,g),n(null),s(null)},p=()=>{n(null),s(null)};return o.jsx(du,{children:t.map(m=>o.jsxs(uu,{$active:m.id===e.activeTabId,$hasUnread:m.unreadCount>0,$dragging:m.id===r,$dragOver:m.id===i,draggable:!0,onDragStart:g=>a(g,m.id),onDragOver:g=>u(g,m.id),onDragLeave:c,onDrop:g=>d(g,m.id),onDragEnd:p,onClick:()=>e.setActiveTab(m.id),children:[m.type!=="console"&&o.jsx(fu,{$type:m.type}),o.jsx(hu,{children:m.type==="channel"?`(${m.name})`:m.name}),m.unreadCount>0&&o.jsx(pu,{children:m.unreadCount>99?"99+":m.unreadCount}),m.id!=="console"&&o.jsx(mu,{onClick:g=>{g.stopPropagation(),e.closeTab(m.id)},title:"Close tab",children:"×"})]},m.id))})});Xo.displayName="ChatTabs";function gu(e,t=10){return e.scrollHeight<=e.clientHeight+1||e.scrollTop===0&&e.scrollHeight<=e.clientHeight+t?!0:e.scrollHeight-e.scrollTop<=e.clientHeight+t}function xu(e){e.scrollTop=e.scrollHeight}function yu(e,t=10){gu(e,t)&&xu(e)}class Qo{canRender(t){return t.metadata?.consoleType===this.type||t.type===this.type}}class W{constructor(){this.renderers=new Map}register(t){this.renderers.set(t.type,t)}clear(){this.renderers.clear()}getRenderer(t){if(t.metadata?.consoleType){const n=this.renderers.get(t.metadata.consoleType);if(n)return n}const r=this.renderers.get(t.type);if(r)return r;for(const[,n]of this.renderers)if(n.canRender(t))return n;return null}getAllRenderers(){return Array.from(this.renderers.values())}static{this.instance=new W}static register(t){this.instance.register(t)}static getRenderer(t){return this.instance.getRenderer(t)}static getAllRenderers(){return this.instance.getAllRenderers()}static clear(){this.instance.clear()}}const bu=l.pre`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${e=>e.$fontSize}px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${e=>e.theme.colors.text};
`,Be=l.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,$u=l.span`
  display: inline;
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  &:hover a {
    color: ${e=>e.theme.colors.primary};
    text-decoration: underline;
  }
`,Jo=q(({content:e,ansiColors:t=!0,elements:r=[]})=>{const{ficsStore:n,preferencesStore:i}=Ee(),s=i.getChatAppearance(),[a,u]=h.useState(null),c=e.startsWith(`
`)?e.substring(1):e,d=g=>{if(!t)return g;const f={30:"#000000",31:"#CC0000",32:"#4E9A06",33:"#C4A000",34:"#3465A4",35:"#75507B",36:"#06989A",37:"#D3D7CF",90:"#555753",91:"#EF2929",92:"#8AE234",93:"#FCE94F",94:"#729FCF",95:"#AD7FA8",96:"#34E2E2",97:"#EEEEEC"};return g.replace(/\x1b\[(\d+)m/g,(v,x)=>{const b=f[x];return b?`<span style="color: ${b}">`:x==="0"?"</span>":""})},p=g=>{const f=[];if(g.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:|^\s*\w+(?:\([^)]*\))*\((\d+)\):/m)){const x=/(https?:\/\/[^\s]+)\s*$/gm;let b;for(;(b=x.exec(g))!==null;){const y=b[1],C=b.index,S=b.index+b[0].length,R=g.substring(S).match(/^\n\s+([^\s]+)/);if(R&&R[1].match(/[.\/\-?=&]/)){const $=y+R[1],j=S+R[0].length;f.push({start:C,end:j,url:$})}}}return f},m=g=>{const f=d(g),v=p(e),x=[{regex:/(https?:\/\/[^\s]+)/g,handler:($,j)=>{const k=$[0],L=j||k;return o.jsx(Be,{href:L,target:"_blank",rel:"noopener noreferrer",onClick:O=>{O.preventDefault(),window.open(L,"_blank")},children:k})}},{regex:/^(\w+) tells you:/gm,handler:$=>{const j=$[1];return o.jsxs("span",{children:[o.jsx(Be,{onClick:k=>{k.preventDefault(),k.stopPropagation(),u({playerName:j,x:k.clientX,y:k.clientY})},children:j}),$[0].substring(j.length)]},`player-${j}`)}},{regex:/\bGame (\d+)\b/g,handler:$=>o.jsx(Be,{onClick:j=>{j.preventDefault(),n.sendCommand(`observe ${$[1]}`)},children:$[0]})}];if(t&&f!==g)return o.jsx("span",{dangerouslySetInnerHTML:{__html:f}});let b=0;const y=[],C=[],S=[];return r.forEach($=>{const j=c!==e?$.start-1:$.start;if(j>=0&&j<g.length){const k=$.type==="command"&&$.text.includes(":")&&($.text.match(/^\s*\d+\s+/)||$.text.match(/^%\d+:/)||$.text.match(/^\d+:/)),L=(()=>{const O=(()=>{switch($.type){case"command":return o.jsx(Be,{onClick:H=>{H.preventDefault(),n.sendCommand($.action||$.value)},children:$.text});case"player":return o.jsx(Be,{onClick:H=>{H.preventDefault(),H.stopPropagation(),u({playerName:$.text,x:H.clientX,y:H.clientY})},children:$.text});case"gameNumber":return o.jsx(Be,{onClick:H=>{H.preventDefault(),n.sendCommand(`observe ${$.value}`)},children:$.text});default:return $.text}})();return k?o.jsx($u,{children:O}):O})();S.push({start:j,end:j+$.text.length,render:L,priority:20})}}),v.forEach($=>{const j=g.substring($.start).match(/^(https?:\/\/[^\s]+)/);if(j){const k=j[1];S.push({start:$.start,end:$.start+k.length,render:o.jsx(Be,{href:$.url,target:"_blank",rel:"noopener noreferrer",onClick:L=>{L.preventDefault(),window.open($.url,"_blank")},children:k}),priority:10}),C.push([$.start,$.end])}}),x.forEach($=>{const j=new RegExp($.regex);let k;for(;(k=j.exec(g))!==null;){const L=k.index,O=L+k[0].length;C.some(([w,F])=>L>=w&&L<F||O>w&&O<=F)||S.push({start:L,end:O,render:$.handler(k),priority:1})}}),S.sort(($,j)=>$.start!==j.start?$.start-j.start:j.priority-$.priority),S.filter(($,j)=>{if(j===0)return!0;const k=S[j-1];return $.start>=k.end}).forEach(($,j)=>{$.start>b&&y.push(g.substring(b,$.start)),y.push(o.jsx(Z.Fragment,{children:$.render},j)),b=$.end}),b<g.length&&y.push(g.substring(b)),y.length>0?y:g};return o.jsxs(o.Fragment,{children:[o.jsx(bu,{$fontSize:s.fontSize,children:m(c)}),a&&o.jsx(Fr,{playerName:a.playerName,position:{x:a.x,y:a.y},onClose:()=>u(null)})]})}),vu=l.div`
  margin: 0;
`;class wu extends Qo{constructor(){super(...arguments),this.type="default"}canRender(){return!0}render({message:t}){const r=t.metadata?.parsedMessage?.elements;return o.jsx(vu,{children:o.jsx(Jo,{content:t.content,elements:r})})}}class Y extends Qo{render({message:t}){const r=t.metadata?.parsedMessage?.elements;return o.jsx(Jo,{content:t.content,elements:r})}}class ku extends Y{constructor(){super(...arguments),this.type="shout"}}class Su extends Y{constructor(){super(...arguments),this.type="cshout"}}class Cu extends Y{constructor(){super(...arguments),this.type="notification"}}class ju extends Y{constructor(){super(...arguments),this.type="seekAnnouncement"}}class Pu extends Y{constructor(){super(...arguments),this.type="matchRequest"}}class Ru extends Y{constructor(){super(...arguments),this.type="illegalMove"}}class Eu extends Y{constructor(){super(...arguments),this.type="drawOffer"}}class Mu extends Y{constructor(){super(...arguments),this.type="unobserve"}}class zu extends Y{constructor(){super(...arguments),this.type="gameNotification"}}class Tu extends Y{constructor(){super(...arguments),this.type="whoOutput"}}class Lu extends Y{constructor(){super(...arguments),this.type="gamesOutput"}}class Iu extends Y{constructor(){super(...arguments),this.type="fingerOutput"}}class Du extends Y{constructor(){super(...arguments),this.type="historyOutput"}}class Au extends Y{constructor(){super(...arguments),this.type="journalOutput"}}class Nu extends Y{constructor(){super(...arguments),this.type="soughtOutput"}}class Ou extends Y{constructor(){super(...arguments),this.type="channelListOutput"}}class Fu extends Y{constructor(){super(...arguments),this.type="newsOutput"}}class Bu extends Y{constructor(){super(...arguments),this.type="inOutput"}}class Wu extends Y{constructor(){super(...arguments),this.type="login"}}class Hu extends Y{constructor(){super(...arguments),this.type="password"}}class _u extends Y{constructor(){super(...arguments),this.type="guestLoginConfirmation"}}class Uu extends Y{constructor(){super(...arguments),this.type="sessionStart"}}class Gu extends Y{constructor(){super(...arguments),this.type="system"}}class Yu extends Y{constructor(){super(...arguments),this.type="raw"}}class Vu extends Y{constructor(){super(...arguments),this.type="gameEnd"}}class qu extends Y{constructor(){super(...arguments),this.type="gameStart"}}function Ku(){W.clear(),W.register(new ku),W.register(new Su),W.register(new Cu),W.register(new ju),W.register(new Pu),W.register(new Ru),W.register(new Eu),W.register(new Mu),W.register(new zu),W.register(new Tu),W.register(new Lu),W.register(new Iu),W.register(new Du),W.register(new Au),W.register(new Nu),W.register(new Ou),W.register(new Fu),W.register(new Bu),W.register(new Wu),W.register(new Hu),W.register(new _u),W.register(new Uu),W.register(new Gu),W.register(new Yu),W.register(new Vu),W.register(new qu),W.register(new wu)}Ku();const ht=q(({message:e,currentUsername:t,onCommandClick:r,onHover:n})=>{const{preferencesStore:i}=Ee(),s=e.metadata?.consoleType,a=e.metadata?.channelNumber,u=s?i.getConsoleColor(s,a):null,c=s?i.getConsoleFont(s,a):null,d=s?i.getConsoleFontStyle(s,a):null,p={...e,metadata:{...e.metadata,color:u,fontFamily:c,fontStyle:d}},m=W.getRenderer(p);return m?o.jsx("div",{onMouseEnter:()=>n?.(e.timestamp),onMouseLeave:()=>n?.(null),children:m.render({message:p,currentUsername:t,onCommandClick:r,onHover:n})}):(console.warn("No renderer found for message:",e),o.jsx("div",{children:e.content}))});ht.displayName="Message";const jt=l.div`
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
`,Xu=l.div`
  margin-bottom: ${e=>e.theme.spacing[1]};
  min-width: 0;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
`,An=l.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${e=>e.theme.colors.textTertiary};
  font-size: ${e=>e.theme.typography.fontSize.sm};
  font-style: italic;
`,Qu=l.div`
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
`,Zo=q(({onMessageHover:e})=>{const{chatStore:t,ficsStore:r,preferencesStore:n}=Ee(),i=h.useRef(null),s=t.activeTab,a=s?.messages||[],u=r.username||"You",c=p=>{r.sendCommand(p)};if(h.useEffect(()=>{if(i.current&&a.length>0){const p=i.current,m=setTimeout(()=>{s?.type==="console"?p.scrollTop=p.scrollHeight:yu(p,50)},50);return()=>clearTimeout(m)}},[a.length,a[a.length-1]?.id]),h.useEffect(()=>{if(i.current&&a.length>0){const p=i.current;requestAnimationFrame(()=>{p.scrollTop=p.scrollHeight})}},[s?.id]),!s)return o.jsx(jt,{children:o.jsx(Pt,{className:"chat-messages-container",children:o.jsx(An,{children:"No active chat"})})});if(a.length===0)return o.jsx(jt,{children:o.jsx(Pt,{className:"chat-messages-container",children:o.jsx(An,{children:s.type==="channel"?`No messages in (${s.name}) yet`:s.type==="private"?`No messages with ${s.name} yet`:"Connecting to freechess.org..."})})});const d=[];return a.forEach((p,m)=>{const g=m>0?a[m-1]:null,f=g?new Date(p.timestamp).getTime()-new Date(g.timestamp).getTime():1/0;g&&g.sender===p.sender&&g.type===p.type&&f<6e4?d[d.length-1].messages.push(p):d.push({sender:p.sender,timestamp:new Date(p.timestamp),messages:[p]})}),s.type==="console"?o.jsx(jt,{children:o.jsx(Pt,{ref:i,className:"chat-messages-container",children:a.map(p=>o.jsx(Rt,{children:o.jsx(ht,{message:p,currentUsername:u,onCommandClick:c,onHover:e})},p.id))})}):o.jsx(jt,{children:o.jsx(Pt,{ref:i,className:"chat-messages-container",children:d.map((p,m)=>p.messages[0].type==="system"?o.jsx(Qu,{children:p.messages.map(f=>o.jsx(Rt,{children:o.jsx(ht,{message:f,currentUsername:u,onCommandClick:c,onHover:e})},f.id))},m):o.jsx(Xu,{children:p.messages.map((f,v)=>{if(v===0)return o.jsx(Rt,{children:o.jsx(ht,{message:f,currentUsername:u,onCommandClick:c,onHover:e})},f.id);{const x={...f,sender:"",metadata:{...f.metadata,isGroupedMessage:!0}};return o.jsx(Rt,{children:o.jsx(ht,{message:x,currentUsername:u,onCommandClick:c,onHover:e})},f.id)}})},m))})})});Zo.displayName="ChatMessages";const Ju=l.div`
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
`,Zu=l.textarea`
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
`,eh=l.button`
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
`,ei=({value:e,onChange:t,onSend:r,onHistoryNavigate:n,placeholder:i="Type a message...",disabled:s=!1})=>{const a=h.useRef(null),u=d=>{d.key==="Enter"&&!d.shiftKey?(d.preventDefault(),e&&r(e)):d.key==="ArrowUp"&&!e?(d.preventDefault(),n?.("up")):d.key==="ArrowDown"&&(d.preventDefault(),n?.("down"))},c=()=>{e&&r(e)};return o.jsxs(Ju,{children:[o.jsx(Zu,{ref:a,value:e,onChange:d=>t(d.target.value),onKeyDown:u,placeholder:i,disabled:s,autoComplete:"off",spellCheck:"true",rows:1}),o.jsx(eh,{onClick:c,disabled:s||!e,title:"Send message (Enter)",children:"Send"})]})};ei.displayName="ChatInput";const th=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${e=>e.theme.colors.surface};
  overflow: hidden;
  min-height: ${e=>e.$compact?"200px":"300px"};
`,rh=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing[2]};
  background-color: ${e=>e.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,nh=l.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.fontSize.md};
  font-weight: ${e=>e.theme.typography.fontWeight.semibold};
  color: ${e=>e.theme.colors.text};
`,oh=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
`,ih=l.span`
  font-size: ${e=>e.theme.typography.fontSize.sm};
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${e=>e.theme.spacing[4]};
`,sh=l.div`
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
`,ti=q(({className:e,compact:t=!1})=>{const{chatStore:r,ficsStore:n,preferencesStore:i}=Ee(),[s,a]=h.useState(""),[u,c]=h.useState(!1),[d,p]=h.useState(null);Z.useEffect(()=>{!n.connected&&!n.connecting&&(console.log("Auto-connecting to FICS..."),n.connect())},[n]),Z.useEffect(()=>{n.error&&r.addMessage("console",{channel:"console",sender:"System",content:`Error: ${n.error}`,timestamp:new Date,type:"system"})},[n.error,r]);const m=f=>{if(console.log("handleSendMessage called with:",f,"Length:",f.length),!f.trim())return;const v=f.split(`
`);if(v.length>1){v.forEach(x=>{x&&m(x)}),a("");return}if(r.addToHistory(f),f==="/help"||f==="\\help"){r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),r.addMessage("console",{channel:"console",sender:"System",content:`FICS Commands:
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
/help - Show this help`,timestamp:new Date,type:"system"}),a("");return}if(f.startsWith("/")||f.startsWith("\\")){const x=f.substring(1);r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(x)}else{const x=r.activeTab;if(!x)return;if(x.type==="channel"){const b=x.id.replace("channel-","");n.sendCommand(`tell ${b} ${f}`)}else if(x.type==="private")r.addMessage(x.id,{channel:x.id,sender:"You",content:f,timestamp:new Date,type:"message"}),n.sendCommand(`tell ${x.id} ${f}`);else{const b=f.match(/^tell\s+(\w+)\s+(.+)$/);if(b){const[,y,C]=b,S=y.replace(/\([^)]*\)/g,"").trim(),R=/^\d+$/.test(S);if(R&&i.preferences.openChannelsInTabs){const $=`channel-${S}`;r.createTab($,S,"channel")}else if(!R&&i.preferences.openTellsInTabs){const $=S.toLowerCase();r.createTab($,S,"private"),r.addMessage($,{channel:$,sender:"You",content:C,timestamp:new Date,type:"message"})}}else r.addMessage("console",{channel:"console",sender:"You",content:f,timestamp:new Date,type:"message"});n.sendCommand(f)}}a("")},g=f=>{const v=r.navigateHistory(f);v!==null&&a(v)};return o.jsxs(th,{className:e,$compact:t,children:[!t&&o.jsxs(rh,{children:[o.jsx(nh,{children:"Chat"}),n.averagePing!==null&&o.jsxs(ih,{children:["Ping: ",n.averagePing,"ms"]}),d&&o.jsxs(oh,{children:["Received: ",new Date(d).toLocaleTimeString()]})]}),o.jsxs(sh,{children:[o.jsx(Xo,{}),o.jsx(Zo,{onMessageHover:p}),o.jsx(ei,{value:s,onChange:a,onSend:m,onHistoryNavigate:g,placeholder:r.activeTab?.type==="channel"?`tell ${r.activeTab.name} ...`:r.activeTab?.type==="private"?`tell ${r.activeTab.name} ...`:"Enter command..."})]})]})});ti.displayName="ChatPanel";const ah=l.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${e=>e.theme.colors.surface};
`,ch=l.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`,lh=l.div`
  flex: 1;
  display: ${e=>e.$isVisible?"flex":"none"};
  overflow: hidden;
`,dh=l.div`
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
`,uh=l.div`
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
`,ri=q(()=>{const{preferencesStore:e}=Ee(),{viewMode:t,autoViewMode:r}=e.preferences,n=Ne(),i=Ao(),s=No(),a=ic(),[u,c]=h.useState(600),[d,p]=h.useState(!1),m=h.useRef(!1);h.useEffect(()=>{!m.current&&r&&(m.current=!0,e.updatePreference("viewMode",a.viewMode),e.updatePreference("chessOrientation",a.orientation),e.updatePreference("autoViewMode",!1))},[r,a,e]),h.useEffect(()=>{i.includes(t)||e.updatePreference("viewMode","chess-only")},[i,t,e]),h.useEffect(()=>{const b=e.preferences.chessOrientation;s.includes(b)||e.updatePreference("chessOrientation","portrait")},[s,e]);const g=b=>{b.preventDefault(),p(!0)};h.useEffect(()=>{if(!d)return;const b=C=>{const S=window.innerWidth-C.clientX;c(Math.max(300,Math.min(600,S))),window.dispatchEvent(new Event("resize"))},y=()=>{p(!1)};return document.addEventListener("mousemove",b),document.addEventListener("mouseup",y),()=>{document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",y)}},[d]);const f=t==="chess-only"||t==="chess-and-chat",v=t==="chat-only"||t==="chess-and-chat",x=t==="chess-and-chat"&&!n.isMobile;return o.jsxs(ah,{children:[o.jsx(Fo,{}),o.jsxs(ch,{children:[o.jsx(lh,{$isVisible:f,children:o.jsx(Ko,{hasChat:v,chatWidth:v&&!n.isMobile?u:0})}),x&&o.jsx(uh,{$isVisible:!0,onMouseDown:g,style:{cursor:d?"col-resize":"ew-resize"}}),o.jsx(dh,{$isVisible:v,$fullWidth:t==="chat-only",style:{width:t==="chat-only"?void 0:v&&!n.isMobile?`${u}px`:void 0},children:o.jsx(ti,{})})]})]})});ri.displayName="AppLayout";const hh=qa`
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
`,ph=()=>o.jsx(si,{children:o.jsxs(Xa,{children:[o.jsx(hh,{}),o.jsx(Ts,{children:o.jsx(cs,{children:o.jsx(Qn,{path:"/",element:o.jsx(ac,{children:o.jsx(ri,{})})})})})]})}),ni=document.getElementById("root");if(!ni)throw new Error("Root element not found");const mh=Fn(ni);mh.render(o.jsx(ph,{}));
