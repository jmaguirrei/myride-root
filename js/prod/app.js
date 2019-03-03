const dummyAction=null;var actions=Object.freeze({dummyAction:null}),store={actions:actions,observables:{user_id:"",language:"en",currentPage:"",isMenuOpen:!1}};const Keys={FACEBOOK_APP_ID:"244489929820595",GOOGLEMAPS_API_KEY:"AIzaSyAw0yfR8HmByczJ1Ic1pjCKCGICTYdiII4"},images="https://res.cloudinary.com/jmaguirrei/image/upload/myride",Paths={IMAGES:images,HOME_IMAGES:`${images}/internal/home`,LOGO_LIGHT:`${images}/internal/logo/logo-light`,LOGO_DARK:`${images}/internal/logo/logo-dark`},Colors={GREY_DARK:"hsl(214, 14%, 28%)",GREY_DARKEST:"hsl(214, 14%, 10%)",BLUE_HEADLINE:"hsl(215, 79%, 38%)",BLUE_FACEBOOK:"hsl(221, 44%, 41%)",BLUE_DARK_SIGNIN:"hsl(208, 81%, 34%)",BLUE_SIGNIN:"hsl(201, 80%, 60%)",GREEN_DARK_SIGNUP:"hsl(145, 45%, 27%)",GREEN_SIGNUP:"hsl(145, 45%, 44%)",RED_WARNING:"hsl(0, 70%, 60%)"},Sizes={HEADER_HEIGHT:"55px",TABS_HEIGHT:"50px"},RootControl=e=>{const n=n=>{n===e.get("currentPage")?e.toggle("isMenuOpen"):(e.set({currentPage:n,isMenuOpen:e=>!e}),e.route(n))};return{menuOptions:[{name:"Iniciar Sesión",className:"link",onclick:()=>n("signin")},{name:"Crear una cuenta",className:"link",onclick:()=>n("signup")},{name:"Recuperar Password",className:"link",onclick:()=>n("forgot")},{name:"Home",className:"link",onclick:()=>{e.toggle("isMenuOpen"),e.route("home")}}]}};var lib=Object.freeze({Keys:Keys,Paths:Paths,Colors:Colors,Sizes:Sizes,RootControl:RootControl});const size=30,transY=Math.ceil(7.5);var MenuIcon=(e,n)=>e.hoc({id:n,classes:!1,styles:{wrapper:({inStyle:e})=>`\n        ${e}\n      `,top:({isOpen:e,color:n})=>`\n        background: ${n};\n        transform: translateY(${e?0:-transY}px) rotateZ(${e?45:0}deg);\n      `,middle:({isOpen:e,color:n})=>`\n        background: ${n};\n        opacity: ${e?0:1};\n      `,bottom:({isOpen:e,color:n})=>`\n        background: ${n};\n        transform: translateY(${e?0:transY}px) rotateZ(${e?-45:0}deg);\n      `},render:({props:n,classes:o,styles:s})=>e.h("div",{style:s.wrapper(n),class:o("wrapper"),onclick:n.onClick},e.h("div",{class:o("line"),style:s.top(n)}),e.h("div",{class:o("line"),style:s.middle(n)}),e.h("div",{class:o("line"),style:s.bottom(n)}))}),GoogleMaps=(e,n)=>{const o={lat:-33.4,lng:-70.5};return e.hoc({id:n,actions:(e,n)=>({onclick:()=>{window.navigator.geolocation.getCurrentPosition(e=>{const{latitude:o,longitude:s}=e.coords;console.log("latitude, longitude",o,s),console.log(n.get("mapObject"))})}}),mounted(n,s){window.initMap=(()=>{new window.google.maps.Map(document.getElementById("map-wrapper"),{center:o,zoom:12})});const t=`https://maps.googleapis.com/maps/api/js?key=${n.key}&callback=initMap`;e.createScript("googlemaps-script",t)},classes:!1,render:({props:n,classes:o,actions:s})=>e.h("div",{id:"map-wrapper",class:o.map,onclick:s.onclick})})},components=Object.freeze({MenuIcon:MenuIcon,GoogleMaps:GoogleMaps}),Header=(e,n)=>e.hoc({id:n,classes:!1,styles:{logo:e=>`\n        opacity: ${e?0:1};\n        pointer-events: ${e?"auto":"none"};\n        max-height: 50%;\n      `},render:({props:n,classes:o,styles:s})=>e.h("div",{id:"header",class:o("header")},e.h("img",{src:n.logoSrc,style:s.logo(n.isMenuOpen)}))}),Menu=(e,n)=>e.hoc({id:n,classes:!1,styles:{menu:n=>`\n        background: ${e.lib.Colors.GREY_DARK};\n        opacity: ${n?.99:0};\n        pointer-events: ${n?"auto":"none"};\n      `},render:({props:n,styles:o,classes:s})=>e.h("div",{id:"menu",style:o.menu(n.isMenuOpen),class:s("menu")},e.h("img",{src:n.logoSrc,class:s("logo")}),n.options.map(n=>{const{className:o,name:t,onclick:a}=n;return e.h("div",{class:s(o),onclick:a},t)}))}),Pages=(e,n)=>e.hoc({id:n,styles:{page:e=>`\n        transition: opacity .3s ease;\n        opacity: ${e?1:0};\n        pointer-events: ${e?"auto":"none"};\n        position: absolute;\n        width: 100%;\n      `},render({props:n,styles:o}){const{pages:s,currentPage:t}=n;return Object.keys(s).map(n=>{const a=s[n];return e.h("div",{style:o.page(n===t)},e.h(a,null))})}}),fragments=Object.freeze({Header:Header,Menu:Menu,Pages:Pages}),App=(e,n)=>{const{GoogleMaps:o}=e.ui.components;return e.hoc({id:n,state:(e,n)=>({currentPage:n.get("currentPage")}),styles:{app:e=>`\n        display: flex;\n        position: absolute;\n        justify-content: center;\n        align-items: center;\n        min-width: 100%;\n        height: 100%;\n        transition: all .6s ease-out;\n        overflow: hidden;\n        background: hsl(240, 39%, 92%);\n        opacity: ${e?1:0};\n        pointer-events: ${e?"auto":"none"};\n      `},render:({styles:n,state:s})=>e.h("div",null,e.h(o,{key:e.lib.Keys.GOOGLEMAPS_API_KEY}))})},pages=Object.freeze({App:App}),rootComponent=(e,n)=>{const{RootControl:o}=e.lib,{MenuIcon:s}=e.ui.components,{Pages:t,Header:a,Menu:i}=e.ui.fragments,{App:r}=e.ui.pages;return e.hoc({id:n,state:(e,n)=>({currentPage:n.get("currentPage")||e.currentPage,isMenuOpen:n.get("isMenuOpen"),menuOptions:o(n).menuOptions}),actions:(e,n)=>({onClickMenu:()=>{n.toggle("isMenuOpen")}}),classes:!1,render({actions:n,state:o,classes:l}){const{onClickMenu:c}=n,{currentPage:p,isMenuOpen:g,menuOptions:u}=o;return e.h("div",{id:"root",class:l.root},e.h(s,{isOpen:g,onClick:c,color:"white",inStyle:"left: 12px; top: 12px;"}),e.h(a,{isMenuOpen:g,logoSrc:e.lib.Paths.LOGO_LIGHT}),e.h(i,{isMenuOpen:g,logoSrc:e.lib.Paths.LOGO_LIGHT,options:u}),e.h(t,{currentPage:p,pages:{app:r}}))}})},config={store:store,lib:lib,components:components,fragments:fragments,pages:pages,rootComponent:rootComponent,moduleName:"app",rootNodeId:"root"};const main=(e,n)=>e.init(config,n);export{main};