function get(e){return t=>o=>(e.methods.subscribe(t,o),e.objects.observables[o])}function subscribe(e){return(t,o)=>{const n=e.objects.listeners.find(e=>e.observable===o);if(!n)return console.log(`Listener not found on observable ${o}`);const r=n.components;r.find(e=>e.registerNumber===t)||r.push({registerNumber:t})}}const isPlainValue=e=>["string","number","boolean"].includes(typeof e),wasChanged=(e,t)=>e!==t,shouldNotify=(e,t)=>!isPlainValue(t)||isPlainValue(t)&&wasChanged(e,t);function set(e){return(t,o={})=>{if(!t)return;const{dynamic:n=!1,timeout:r=0}=o;Object.keys(t).forEach(o=>{const s=e.objects.observables[o],a=Array.isArray(s)?[...s]:"object"==typeof s?{...s}:s,i="function"==typeof t[o]?t[o](a):t[o];typeof s==typeof i||n?shouldNotify(s,i)&&setTimeout(()=>{e.objects.observables[o]=i,e.methods.notify(o)},r):console.warn(`Type does not match previous type in ${o}`)})}}function setItem(e){return(t,o)=>{const n=e.objects.observables[t].findIndex(e=>e.id===o.id);e.objects.observables[t][n]=o,e.methods.notify(t)}}function toggle(e){return(t,o)=>{const n=e.objects.observables[t];void 0===n?console.warn(`Observable [${t}] does not exists.`):"boolean"!=typeof n?console.warn(`Observable [${t}] is not a boolean.`):(e.methods.set({[t]:!n}),o&&o(!n))}}function notify(e){return t=>{t&&Object.keys(e.objects.computed).forEach(o=>{const{take:n}=e.objects.computed[o];n.includes(t)&&e.methods.compute(o)}),e.objects.flags.IS_MOUNTED&&e.render.update()}}function compute(e){return t=>{const{take:o,calc:n}=e.objects.computed[t],r=o.map(t=>e.objects.observables[t]);e.objects.observables[t]=n(...r)}}function computeAll(e){return()=>{Object.keys(e.objects.computed).forEach(t=>{e.methods.compute(t)})}}function emit(e){return(t,o)=>{"MOUNTED"===t&&(e.objects.flags.IS_MOUNTED=!0),e.objects.reactions.filter(e=>e.keepAlive?e.eventStr===t:e.eventStr===t&&!e.done).forEach(e=>{e.done=!0,e.callback(o)})}}function on(e){return(t,o)=>{e.objects.reactions.push({eventStr:t,callback:o,keepAlive:!0})}}function once(e){return(t,o)=>{e.objects.reactions.push({eventStr:t,callback:o,done:!1})}}function check(e,t){return(e,o)=>{const{result:n,message:r}=t[e](o);return{result:n,message:r}}}function alertOn(e,t){return(o={})=>{const n=Math.floor(1e3*Math.random()),r=Date.now(),s=`${r}--${n}`,a=o.name?t[o.name]:o.message||"Alert message not defined";e.objects.alerts.push({_id:s,...o,message:a,timestamp:r,isVisible:!0}),e.methods.notify(null),o.timeout&&setTimeout(()=>{e.methods.alertOff({_id:s})},o.timeout)}}function alertOff(e){return({_id:t})=>{const o=e.objects.alerts.find(e=>e._id===t);o&&(o.isVisible=!1,e.methods.notify(null))}}function callServer(e){return(t,o={})=>new Promise((n,r)=>{const s=new window.XMLHttpRequest;s.open("POST",`${e.router.siteUrl}/api/methods`,!0),s.setRequestHeader("Content-type","application/json"),s.onreadystatechange=(()=>{if(s.readyState===window.XMLHttpRequest.DONE){const e=s.status;if(![200,201].includes(e))return r("XHR request failed");const t=s.responseText;return n(JSON.parse(t))}});const a=JSON.stringify({method:t,args:o});s.send(a)})}function route(e){return(t,o)=>{const{moduleName:n,routes:r,ports:s,isProduction:a,baseUrl:i}=e.router.appData,c=o?`${t}${o}`:t,l=Object.keys(r).reduce((e,o)=>r[o].includes(t)?o:e,!1);if(l&&l===n)window.history.replaceState(null,null,c);else{const e=a?`/${c}`:`https://${i}:${s[l].http}/${c}`;window.location.replace(e)}}}const noop=()=>void 0;function addToQueue(e){return({name:t,steps:o,onError:n})=>{const r=Date.now(),s={_id:r,name:t,steps:o,done:!1,onError:n||noop};e.process.queue.splice(0,0,s),e.process.runTask({_id:r})}}function callProcesses(e,t){if(!t)return()=>void 0;const o={get:t=>e.objects.observables[t],set:e.methods.set,addAlert:e.methods.alertOn,callServer:e.methods.callServer,route:e.router.route,uid:e.utils.uid},n=Object.keys(t).reduce((n,r)=>{const s=t[r];return{...n,[r]:t=>{e.process.addToQueue({name:r,...s(o)(t)})}}},{});return(e,t)=>n[e](t)}function processor(){return({steps:e,onError:t})=>{let o=!0;e.reduce((e,n)=>e.then(e=>{if(o)return n(e)}).catch(e=>{o=!1,console.log("processPromiseChain ERROR -----------------\x3e ",e),t(e)}),Promise.resolve({}))}}function runTask(e){return({_id:t})=>{const o=e.process.queue.find(e=>e._id===t);e.process.processor(o),o.done=!0}}function mount(e){return()=>{const{rootComponent:t,client:o}=e.render,n=t(o)();document.body.innerHTML="",document.body.appendChild(n)}}var range,actualHasAttributeNS,NS_XHTML="http://www.w3.org/1999/xhtml",doc="undefined"==typeof document?void 0:document,testEl=doc?doc.body||doc.createElement("div"):{},hasAttributeNS=actualHasAttributeNS=testEl.hasAttributeNS?function(e,t,o){return e.hasAttributeNS(t,o)}:testEl.hasAttribute?function(e,t,o){return e.hasAttribute(o)}:function(e,t,o){return null!=e.getAttributeNode(t,o)};function toElement(e){var t;return!range&&doc.createRange&&(range=doc.createRange()).selectNode(doc.body),range&&range.createContextualFragment?t=range.createContextualFragment(e):(t=doc.createElement("body")).innerHTML=e,t.childNodes[0]}function compareNodeNames(e,t){var o=e.nodeName,n=t.nodeName;return o===n||!!(t.actualize&&o.charCodeAt(0)<91&&n.charCodeAt(0)>90)&&o===n.toUpperCase()}function createElementNS(e,t){return t&&t!==NS_XHTML?doc.createElementNS(t,e):doc.createElement(e)}function moveChildren(e,t){for(var o=e.firstChild;o;){var n=o.nextSibling;t.appendChild(o),o=n}return t}function morphAttrs(e,t){var o,n,r,s,a,i=t.attributes;for(o=i.length-1;o>=0;--o)r=(n=i[o]).name,s=n.namespaceURI,a=n.value,s?(r=n.localName||r,e.getAttributeNS(s,r)!==a&&e.setAttributeNS(s,r,a)):e.getAttribute(r)!==a&&e.setAttribute(r,a);for(o=(i=e.attributes).length-1;o>=0;--o)!1!==(n=i[o]).specified&&(r=n.name,(s=n.namespaceURI)?(r=n.localName||r,hasAttributeNS(t,s,r)||e.removeAttributeNS(s,r)):hasAttributeNS(t,null,r)||e.removeAttribute(r))}function syncBooleanAttrProp(e,t,o){e[o]!==t[o]&&(e[o]=t[o],e[o]?e.setAttribute(o,""):e.removeAttribute(o,""))}var specialElHandlers={OPTION:function(e,t){syncBooleanAttrProp(e,t,"selected")},INPUT:function(e,t){syncBooleanAttrProp(e,t,"checked"),syncBooleanAttrProp(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),hasAttributeNS(t,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var o=t.value;e.value!==o&&(e.value=o);var n=e.firstChild;if(n){var r=n.nodeValue;if(r==o||!o&&r==e.placeholder)return;n.nodeValue=o}},SELECT:function(e,t){if(!hasAttributeNS(t,null,"multiple")){for(var o=0,n=t.firstChild;n;){var r=n.nodeName;if(r&&"OPTION"===r.toUpperCase()){if(hasAttributeNS(n,null,"selected"))break;o++}n=n.nextSibling}e.selectedIndex=o}}},ELEMENT_NODE=1,TEXT_NODE=3,COMMENT_NODE=8;function noop$1(){}function defaultGetNodeKey(e){return e.id}function morphdomFactory(e){return function(t,o,n){if(n||(n={}),"string"==typeof o)if("#document"===t.nodeName||"HTML"===t.nodeName){var r=o;(o=doc.createElement("html")).innerHTML=r}else o=toElement(o);var s,a=n.getNodeKey||defaultGetNodeKey,i=n.onBeforeNodeAdded||noop$1,c=n.onNodeAdded||noop$1,l=n.onBeforeElUpdated||noop$1,d=n.onElUpdated||noop$1,u=n.onBeforeNodeDiscarded||noop$1,p=n.onNodeDiscarded||noop$1,m=n.onBeforeElChildrenUpdated||noop$1,f=!0===n.childrenOnly,b={};function g(e){s?s.push(e):s=[e]}function h(e,t,o){!1!==u(e)&&(t&&t.removeChild(e),p(e),function e(t,o){if(t.nodeType===ELEMENT_NODE)for(var n=t.firstChild;n;){var r=void 0;o&&(r=a(n))?g(r):(p(n),n.firstChild&&e(n,o)),n=n.nextSibling}}(e,o))}function v(e){c(e);for(var t=e.firstChild;t;){var o=t.nextSibling,n=a(t);if(n){var r=b[n];r&&compareNodeNames(t,r)&&(t.parentNode.replaceChild(r,t),y(r,t))}v(t),t=o}}function y(n,r,s){var c,u=a(r);if(u&&delete b[u],!o.isSameNode||!o.isSameNode(t)){if(!s){if(!1===l(n,r))return;if(e(n,r),d(n),!1===m(n,r))return}if("TEXTAREA"!==n.nodeName){var p,f,S,N,E=r.firstChild,T=n.firstChild;e:for(;E;){for(S=E.nextSibling,p=a(E);T;){if(f=T.nextSibling,E.isSameNode&&E.isSameNode(T)){E=S,T=f;continue e}c=a(T);var w=T.nodeType,_=void 0;if(w===E.nodeType&&(w===ELEMENT_NODE?(p?p!==c&&((N=b[p])?T.nextSibling===N?_=!1:(n.insertBefore(N,T),f=T.nextSibling,c?g(c):h(T,n,!0),T=N):_=!1):c&&(_=!1),(_=!1!==_&&compareNodeNames(T,E))&&y(T,E)):w!==TEXT_NODE&&w!=COMMENT_NODE||(_=!0,T.nodeValue!==E.nodeValue&&(T.nodeValue=E.nodeValue))),_){E=S,T=f;continue e}c?g(c):h(T,n,!0),T=f}if(p&&(N=b[p])&&compareNodeNames(N,E))n.appendChild(N),y(N,E);else{var A=i(E);!1!==A&&(A&&(E=A),E.actualize&&(E=E.actualize(n.ownerDocument||doc)),n.appendChild(E),v(E))}E=S,T=f}for(;T;)f=T.nextSibling,(c=a(T))?g(c):h(T,n,!0),T=f}var D=specialElHandlers[n.nodeName];D&&D(n,r)}}!function e(t){if(t.nodeType===ELEMENT_NODE)for(var o=t.firstChild;o;){var n=a(o);n&&(b[n]=o),e(o),o=o.nextSibling}}(t);var S=t,N=S.nodeType,E=o.nodeType;if(!f)if(N===ELEMENT_NODE)E===ELEMENT_NODE?compareNodeNames(t,o)||(p(t),S=moveChildren(t,createElementNS(o.nodeName,o.namespaceURI))):S=o;else if(N===TEXT_NODE||N===COMMENT_NODE){if(E===N)return S.nodeValue!==o.nodeValue&&(S.nodeValue=o.nodeValue),S;S=o}if(S===o)p(t);else if(y(S,o,f),s)for(var T=0,w=s.length;T<w;T++){var _=b[s[T]];_&&h(_,_.parentNode,!1)}return!f&&S!==t&&t.parentNode&&(S.actualize&&(S=S.actualize(t.ownerDocument||doc)),t.parentNode.replaceChild(S,t)),S}}var morphdom=morphdomFactory(morphAttrs),morphdom_1=morphdom;function update(e){return()=>{const{rootComponent:t,client:o,rootNodeId:n,Events:r}=e.render,s=Object.keys(r),a=t(o)(),i=document.getElementById(n);morphdom_1(i,a,{onBeforeElUpdated(e,t){if(e.hasAttribute("data-skip-morph"))return!1;s.forEach(o=>{e[o]&&(e[o]=t[o])})},onBeforeNodeDiscarded(e){if(e.tagName&&"iframe"===e.tagName.toLowerCase())return!1}})}}var globals={SYSTEM_DB_USER_ID:"0000000-system-000000",WINDOW_APP_DATA:"__appData__",GET_MODEL_DATA_METHOD:"@server-model.getData",IMPORT_STYLIS:"import '/js/dev/3rd/stylis.js';"};function getDataFromServer(e){return t=>{const{instance:o=null,user_id:n,lastTimestamp:r=0,localEntitiesIds:s=[]}=t,a={user_id:n,lastTimestamp:r,localEntitiesIds:s};return new Promise((t,n)=>{e.methods.callServer(globals.GET_MODEL_DATA_METHOD,a).then(e=>{e||n("Could not get data from server");const r=Date.now();return t({instance:o,items:e,newTimestamp:r})}).catch(n)})}}function syncDataToDB({instance:e,items:t,newTimestamp:o}){let n=0;return new Promise(r=>{if(0===t.length)return r({instance:e,counter:n,newTimestamp:o});const s=e.transaction(["model"],"readwrite").objectStore("model"),a=s.getAll();a.onsuccess=(()=>{const i=a.result;t.forEach(a=>{if(0===a.attrs.length)return r({instance:e,counter:n,newTimestamp:o});const c=i.find(e=>e._id===a._id);s.put({_id:a._id,domain:a.domain,attrs:c?[...c.attrs,...a.attrs]:a.attrs}).onsuccess=(()=>{if(++n===t.length)return r({instance:e,counter:n,newTimestamp:o})})})})})}function getDBMetadata({instance:e,user_id:t}){return new Promise((o,n)=>{const r=e.transaction("control").objectStore("control").getAll();r.onsuccess=(()=>{const s=r.result||[],a=s.length>0?s[s.length-1].lastTimestamp:0,i=e.transaction("model").objectStore("model").getAllKeys();i.onsuccess=(()=>{const n=i.result||[];o({instance:e,user_id:t,lastTimestamp:a,localEntitiesIds:n})}),i.onerror=(()=>n("Error getting Model Keys"))}),r.onerror=(()=>n("Error getting Control Records"))})}function updateDBControl({instance:e,counter:t,newTimestamp:o}){return new Promise(n=>{e.transaction(["control"],"readwrite").objectStore("control").put({_id:o,lastTimestamp:o,counter:t}).onsuccess=(()=>n({instance:e}))})}function getModelData({instance:e}){return new Promise(t=>{const o=e.transaction("model").objectStore("model").getAll();o.onsuccess=(()=>t(o.result))})}function start(e,{name:t,version:o,user_id:n}){const r=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;return r?new Promise((e,s)=>{const a=r.open(t,o);a.onsuccess=(()=>e({instance:a.result,user_id:n})),a.onerror=(()=>s(a.error)),a.onupgradeneeded=(e=>{const t=e.target.result;t.model=t.createObjectStore("model",{keyPath:"_id"}),t.control=t.createObjectStore("control",{keyPath:"_id"})})}).then(getDBMetadata).then(getDataFromServer(e)).then(syncDataToDB).then(updateDBControl).then(getModelData).catch(console.log):new Promise((e,t)=>{getDataFromServer({user_id:n}).then(({items:t})=>e(t)).catch(t)})}function getCurrentAttrs(e){return e.reduce((e,t)=>{const{key:o,value:n,timestamp:r}=t;return e[o]||(e[o]={value:n,dbValue:n,status:1,timestamp:r}),{...e,[o]:r>e[o].timestamp?{value:n,dbValue:n,status:1,timestamp:r}:e[o]}},{})}function hydrate(e){return t=>{t&&t.length>0&&(e.db.data=t.reduce((e,t)=>{const{_id:o,domain:n,attrs:r}=t;return e[n]||(e[n]=[]),{...e,[n]:[...e[n],{_id:o,attrs:getCurrentAttrs(r)}]}},{}),e.objects.flags.IS_MOUNTED&&e.render.update())}}function query(e){return t=>e.db.data&&e.db.data[t]||[]}function initSocket({socketUrl:e,user_id:t,onMessage:o}){if(!e)return console.log("SocketUrl not defined"),()=>void 0;if(!("WebSocket"in window))return console.log("WebSocket not supported"),()=>void 0;const n=new window.WebSocket(e),r=e=>n.send(JSON.stringify(e));return n.onopen=(()=>{console.log("WebSocket opened"),t&&r({user_id:t,isInitial:!0})}),n.onclose=(e=>console.log("WebSocket closed",e)),n.onmessage=(e=>{o(JSON.parse(e.data))}),r}function onMessage(e){return t=>{const{data:o,isInitial:n}=t;if(n&&console.log("Socket first message --\x3e ",t),o){const{_id:t,domain:n,attrs:r}=o;e.db.data[n]||(e.db.data[n]=[]);const s=e.db.data[n].find(e=>e._id===t);s?r.forEach(e=>{const{key:t,value:o,timestamp:n}=e;s.attrs[t]={value:o,dbValue:o,status:3,timestamp:n}}):e.db.data[n].push({_id:t,attrs:r.reduce((e,t)=>{const{key:o,value:n,timestamp:r}=t;return{...e,[o]:{value:n,dbValue:n,status:3,timestamp:r}}},{})}),e.methods.render()}}}function connectStoreToServer(e,{user_id:t}){const o=initSocket({socketUrl:e.router.socketUrl,user_id:t,onMessage:onMessage(e)});return e.sockets={sendJSON:o},e.db={data:null,query:query(e)},start(e,{name:"asyncDB",version:1,user_id:t}).then(hydrate(e)).catch(console.log)}function startApp(e){return({appData:t,client:o})=>{const{currentPage:n,query:r,baseUrl:s,moduleName:a,ports:i,isProduction:c,useServiceWorker:l}=t;if(e.router.appData=t,e.router.siteUrl=c?`https://${s}`:`https://${s}:${i[a].http}`,e.router.socketUrl=i[a].socket?c?`wss://${s}`:`ws://${s}:${i[a].socket}`:null,l&&"serviceWorker"in window.navigator){const e=c?"prod":"dev";window.navigator.serviceWorker.register(`js/${e}/sw.js`,{scope:"/"}).then(e=>{console.log("Service Worker registration OK!",e)}).catch(e=>{console.log("Service Worker registration FAILED",e)})}n&&e.methods.set({currentPage:n}),r.user&&e.methods.set({user_id:r.user}),connectStoreToServer(e,{user_id:r.user}).then(()=>{e.render.client=o,e.render.mount(),e.methods.emit("MOUNTED")})}}function registerComponent(e){return t=>{e.render.components[t.id]=t}}function uid(e=6){const t=String(Date.now()),o=Math.ceil(t.length/2),n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",r=n.length;let s="";for(let t=1;t<=e;t++){s+=n.charAt(Math.floor(Math.random()*r))}return`${t.substr(0,o)}-${s}-${t.substr(o)}`}function get$1(e,t,o){if(!e)return o;if("object"==typeof e&&0===Object.keys(e).length)return o;if("number"==typeof t)return void 0===e[t]?o:e[t];const n=t.split(".");let r=!1;return n.reduce((e,t)=>r?o:e[t]?e[t]:(r=!0,o),e)}function localize(e="en"){return t=>{if("string"==typeof t)return t;if(t[e])return t[e];if(t.en)return t.en;const o=Object.keys(t)[0];return o?t[o]:"Error: localize text not found"}}var utils=Object.freeze({uid:uid,get:get$1,localize:localize});function createStore(e){const t={},{observables:o={},computed:n={},actions:r={},alerts:s={},checks:a={},rootNodeId:i,rootComponent:c}=e;return t.utils=utils,t.router={appData:null,siteUrl:null,socketUrl:null,route:route(t)},t.objects={flags:{IS_MOUNTED:!1},observables:o,computed:n,values:{},listeners:[],reactions:[],alerts:[]},t.methods={check:check(t,a),get:get(t),subscribe:subscribe(t),set:set(t),setItem:setItem(t),toggle:toggle(t),notify:notify(t),emit:emit(t),on:on(t),once:once(t),compute:compute(t),computeAll:computeAll(t),alertOn:alertOn(t,s),alertOff:alertOff(t),callServer:callServer(t)},t.render={client:null,components:{},rootComponent:c,rootNodeId:i,registerComponent:registerComponent(t),mount:mount(t),update:update(t),startApp:startApp(t),Events:{}},t.process={queue:[],addToQueue:addToQueue(t),processor:processor(t),runTask:runTask(t),call:callProcesses(t,r)},Object.keys(t.objects.observables).forEach(e=>{t.objects.listeners.push({observable:e,components:[]})}),t.methods.computeAll(),t}function addStylesToHead(e,t,o,n){if(t)if(o&&!n){document.getElementById("component-styles").innerText+=t}else global.__componentStyles||(global.__componentStyles=""),global.__componentStyles+=t}function parseStyleRules(e){return(t,o)=>{if(!e)return`.${t} {${o.replace(/(\s\s\s*)/g," ")}} `;if(t)return e(`.${t}`,o);const n=e("",o);return n.substr(1,n.length-2)}}function getClassNewName(e,t){return`${e}--${t}`}function getClassesRules(e){return(t,o)=>{if(!o)return null;return Object.keys(o).reduce((n,r)=>{const s=getClassNewName(r,t);return`${n}${parseStyleRules(e)(s,o[r])}`},"")}}const prefixes=["","-webkit-","-moz-"],toBePrefixed=["transform","border-radius"];function prefix(e){const t=new RegExp(`(${toBePrefixed.join("|")}):(.+)`,"g");return e.replace(t,(...e)=>((e,t)=>toBePrefixed.includes(e)?prefixes.reduce((o,n)=>`${o}${n}${e}:${t};`,""):`${e}:${t}`)(e[1],e[2])).replace(/^\s+|\s+$|\s+(?=\s)/g,"").replace(/\t/gm,"").replace(/\n/gm,"").replace(/;;/g,";")}function prefixInlineStyles(e={}){return Object.keys(e).reduce((t,o)=>{const n=e[o];return{...t,[o]:(...e)=>prefix(n(...e))}},{})}var styles={getClassesRules:getClassesRules,prefixInlineStyles:prefixInlineStyles,addStylesToHead:addStylesToHead,getClassNewName:getClassNewName};function getFinalProps(e){const{props:t={},store:o,componentDef:n,inlineStyles:r,utils:s}=e;return{props:t,state:n.state?n.state(t,o):{},actions:n.actions?n.actions(t,o):{},styles:r,classes:e=>getClassNewName(e,n.id),utils:s}}function getStore(e,t){return{alerts:e.objects.alerts,addAlert:e.methods.alertOn,check:e.methods.check,toggle:e.methods.toggle,set:e.methods.set,setItem:e.methods.setItem,call:e.process.call,callServer:e.methods.callServer,get:e.methods.get(t),route:e.router.route,values:e.objects.values,utils:{get:e.utils.get,uid:e.utils.uid,localize:e.utils.localize(e.objects.observables.language)},db:e.db?e.db.query:()=>void 0}}var createHoc=(e,{appData:t,isBrowser:o,stylis:n})=>{const{isProduction:r}=t,{addStylesToHead:s,getClassesRules:a,prefixInlineStyles:i}=styles;if(o&&!r){document.getElementById("component-styles").innerText=""}return t=>{t.id||(t.id=1e3),e.render.registerComponent(t);const c=a(n)(t.id,t.classes);s(t.id,c,o,r);const l=getStore(e),d=l.utils,u=i(t.styles);return function(o,n){!e.objects.flags.IS_MOUNTED&&t.mounted&&e.methods.on("MOUNTED",()=>t.mounted(o,l));const r=getFinalProps({props:o,utils:d,store:l,componentDef:t,inlineStyles:u});return t.render(r,n)}}};const isSvgElement=e=>["circle","defs","ellipse","g","line","path","polygon","polyline","rect","svg","text","use"].includes(e),isSpecialProp=e=>["__innerHTML"].includes(e),appendText=(e,t)=>{const o=document.createTextNode(t);e.appendChild(o)},addSpecialProp=(e,t,o)=>{"__innerHTML"===t&&(e.innerHTML=o)},appendArray=(e,t)=>{t.forEach(t=>{Array.isArray(t)?appendArray(e,t):t instanceof window.Element?e.appendChild(t):"string"==typeof t&&appendText(e,t)})};var utils$1={isSvgElement:isSvgElement,isSpecialProp:isSpecialProp,addSpecialProp:addSpecialProp,appendText:appendText,appendArray:appendArray};const NS="http://www.w3.org/2000/svg";var createHDom=(e,t)=>(o,n={},...r)=>{if("function"==typeof o)return n?o({...n},r):o();const s=utils$1.isSvgElement(o)?document.createElementNS(NS,o):document.createElement(o);return r instanceof window.Element?s.appendChild(r):"string"==typeof r?utils$1.appendText(s,r):Array.isArray(r)&&utils$1.appendArray(s,r),n&&Object.keys(n).forEach(r=>{const a=n[r];r.startsWith("on")&&(e.render.Events[r]=!0),"style"!==r||t?"class"===r?s.className=a:r in s?a&&(s[r]=a):utils$1.isSpecialProp(r)?utils$1.addSpecialProp(s,r,a):r.startsWith("data-")?s.setAttribute(r,a):console.warn(`${r} is not a valid property of a <${o}>`):s.setAttribute("data-style",a)}),s};function createScript(e,t){if(document.getElementById(e))return;const o=document.createElement("script");o.id=e,o.src=t,o.async=1,o.defer=1,document.body.appendChild(o)}var addIdToComponents=(e,t,o,n)=>{let r=n;Object.keys(o).forEach(n=>{const s=o[n];e.ui[t][n]=s(e,r),r++})};function createClient(e,t){const{Store:o,lib:n,components:r,fragments:s,pages:a,appData:i}=e,{isBrowser:c,stylis:l}=t,d={h:createHDom(o,c),ui:{components:{},fragments:{},pages:{}},createScript:createScript};return d.hoc=createHoc(o,{appData:i,isBrowser:c,stylis:l}),d.lib=n,addIdToComponents(d,"components",r,4e3),addIdToComponents(d,"fragments",s,3e3),addIdToComponents(d,"pages",a,2e3),d}var init=(e,t)=>{const{store:o,lib:n,rootComponent:r,rootNodeId:s,components:a={},fragments:i={},pages:c={}}=e,{appData:l,isBrowser:d=!1,stylis:u=!1}=t,p=createStore({...o,rootNodeId:s,rootComponent:r});d&&(window.Store=p);const m=d?window[globals.WINDOW_APP_DATA]:l,f=createClient({Store:p,lib:n,components:a,fragments:i,pages:c,appData:m},{isBrowser:d,stylis:u});return d&&(window.onload=(()=>{p.render.startApp({appData:m,client:f})})),f};const client={init:init};export{client};