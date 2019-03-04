var actions=Object.freeze({}),store={actions:actions,observables:{user_id:"",language:"en",currentPage:"",isMenuOpen:!1,youtubeVideos:[]}};const images="https://res.cloudinary.com/jmaguirrei/image/upload/myride",Paths={IMAGES:images,HOME_IMAGES:`${images}/internal/home`,LOGO_LIGHT:`${images}/internal/logo/logo-light`,LOGO_DARK:`${images}/internal/logo/logo-dark`},Colors={GREY_DARK:"hsl(214, 14%, 28%)",GREY_DARKEST:"hsl(214, 14%, 10%)",BLUE_HEADLINE:"hsl(215, 79%, 38%)",BLUE_FACEBOOK:"hsl(221, 44%, 41%)",BLUE_DARK_SIGNIN:"hsl(208, 81%, 34%)",BLUE_SIGNIN:"hsl(201, 80%, 60%)",GREEN_DARK_SIGNUP:"hsl(145, 45%, 27%)",GREEN_SIGNUP:"hsl(145, 45%, 44%)",RED_WARNING:"hsl(0, 70%, 60%)"},Sizes={HEADER_HEIGHT:"55px",TABS_HEIGHT:"50px"},Home=[{type:"image",className:"hero-image",url:`${Paths.HOME_IMAGES}/home-hero-main`},{type:"text",className:"headline",text:"Ahorra dinero y viaja más entretenido compartiendo viajes con personas que hacen rutas similares"},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/home-save-money`},{type:"text",className:"title",text:"Ahorra Dinero"},{type:"text",className:"paragraph",text:"Comparte gastos con otras personas que realizan rutas similares. Ofrece asientos disponibles en tu auto o súbete una de las miles de rutas que ya hay en la comunidad."},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/home-flexible-safe`},{type:"text",className:"title",text:"Flexible y Seguro"},{type:"text",className:"paragraph",text:"Tú decides con quién y cuándo compartir. La integración con Facebook te permite revisar si tienes amigos en común con otra persona o ver su perfil antes de decidir si quieres compartir viajes con ella."},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/home-frequent-trips`},{type:"text",className:"title",text:"Viajes Frecuentes y Ocasionales"},{type:"text",className:"paragraph",text:"Viajes diarios al trabajo o estudio, viajes ocasionales fuera de la ciudad. Siempre puedes hacerlo más entretenido y conveniente con MyRide!"},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/home-easy-coordination`},{type:"text",className:"title",text:"Fácil Coordinación"},{type:"text",className:"paragraph",text:"Ve en tiempo real dónde viene el conductor o dónde están los demás pasajeros para facilitar el encuentro y la puntualidad."}],Agreements=[{type:"image",className:"hero-image",url:`${Paths.HOME_IMAGES}/agreements-hero`},{type:"text",className:"headline",text:"Optimiza el uso de estacionamientos y vehículos en tu organización"},{type:"text",className:"big-title",text:"Convenios para empresas"},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/agreements-secure`},{type:"text",className:"title",text:"Seguridad"},{type:"text",className:"paragraph",text:"Creamos una red privada para tu organización dentro de la comunidad pública. Validación con correo institucional."},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/agreements-stats`},{type:"text",className:"title",text:"Estadísticas"},{type:"text",className:"paragraph",text:"Web de administración para ver en tiempo real reportes, rankings y estadísticas de uso del sistema entre los colaboradores."},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/agreements-support`},{type:"text",className:"title",text:"Soporte"},{type:"text",className:"paragraph",text:"Incluye toolkit de implementación, con gráficas, comunicación y políticas recomendadas. Soporte técnico y a usuarios por correo o teléfono."},{type:"image",className:"image",url:`${Paths.HOME_IMAGES}/agreements-gift`},{type:"text",className:"title",text:"Regalo de Bienvenida"},{type:"text",className:"paragraph",text:"Cargamos saldo a los primeros colaboradores registrados para que puedan comenzar de inmediato!"}],Faq=[{type:"text",className:"question",text:"¿Qué es el carpool o auto compartido?"},{type:"text",className:"answer",text:"Se llama carpool o auto compartido a la práctica de compartir viajes en auto con otras personas que hacen rutas similares, permitiendo hacer un uso más eficiente de los vehículos y compartir los gastos del viaje."},{type:"text",className:"answer",text:"El carpool se trata de viajes no comerciales, donde conductores ofrecen asientos disponibles en su auto en rutas que ya están haciendo y seguirán haciendo de todas maneras, como su viaje diario al trabajo o al estudio. Se permite compartir los gastos del viaje con los pasajeros como un incentivo a los conductores a disponibilizar los asientos pero lo recaudado no puede ser mayor que el costo del viaje."},{type:"text",className:"answer",text:"Además de reducir los costos de traslado por persona, el carpool te permite tener una mejor experiencia de viaje compartiendo con gente con la que tú decides viajar. Al no ser viajes comerciales, las personas siempre pueden decidir con quién y cuándo quieren compartir viajes."},{type:"text",className:"question",text:"¿Cuál es la diferencia respecto a servicios como Uber o Cabify?"},{type:"text",className:"answer",text:"Los servicios como Uber o Cabify corresponden a ride hailing o viajes por demanda, en que un chofer conduce como actividad comercial, transportando pasajeros al lugar donde éstos necesitan ir y recibiendo a cambio una remuneración que apunta a cubrir los costos del viaje y dejar una ganancia económica al chofer por su trabajo."},{type:"text",className:"answer",text:"En el carpool (MyRide), los conductores publican las rutas que ellos ya están realizando por necesidades propias y ofrecen compartir sus asientos disponibles con pasajeros a los que esa ruta les resulte útil. De esta manera pueden tener una experiencia de viaje más entretenida y compartir los gastos del viaje con más personas, sin generar una ganancia económica."},{type:"text",className:"question",text:"¿Por qué debo registrarme con Facebook?"},{type:"text",className:"answer",text:"Crear una comunidad segura es la prioridad de MyRide. A diferencia de otros medios, el registro por Facebook permite que podamos importar automáticamente el respaldo social de los usuarios a sus perfiles de MyRide."},{type:"text",className:"answer",text:"De esta manera, siempre podrás contar con una base de información relevante antes de decidir si quieres compartir un viaje con otra persona o no, como el número de amigos que tiene en Facebook, si tienen amigos en común, foto de perfil, etc."},{type:"text",className:"question",text:"¿Qué pasa con eventuales perfiles falsos?"},{type:"text",className:"answer",text:"Si bien es posible que alguien cree un perfil falso en Facebook que le permita registrarse en MyRide, es muy fácil para los usuarios identificarlo. Si recibes por ejemplo una solicitud de seguir tu ruta de una persona que tiene 15 amigos y ninguno de ellos en común contigo nuestra recomendación es simple: no compartas viajes con esa persona. Es posible que sea un perfil legítimo pero ante la duda es mejor no exponerse."},{type:"text",className:"answer",text:"Esto no es posible de lograr abriendo el sistema a registro con correo electrónico personal u otros medios. Sabemos que por distintas razones hay gente que prefiere"},{type:"text",className:"answer",text:"no tener cuenta de Facebook y entendemos su decisión, pero queremos dejar en claro que la razón detrás de esta restricción es la seguridad de nuestra comunidad y que las puertas están abiertas si deciden crear una cuenta gratuita en esa red social para sumarse a MyRide."},{type:"text",className:"question",text:"¿Quieres proponer más alternativas seguras de registro para que incorporemos?"},{type:"text",className:"answer",text:"Escríbenos a soporte@myride.com"},{type:"text",className:"answer",text:"Si tu empresa o universidad tiene convenio con MyRide también podrás registrarte con tu correo institucional, aprovechando la validación corporativa (ver más)."},{type:"text",className:"question",text:"¿Por qué no puedo elegir el aporte por pasajero?"},{type:"text",className:"answer",text:"En esta nueva versión de la aplicación y en base al feedback de nuestros usuarios, MyRide define los aportes de los pasajeros en base a la distancia de la ruta. Esto permite:"},{type:"text",className:"answer",text:"Facilitar el proceso de publicación: muchos conductores nos decían que no sabían bien cuánto era un aporte razonable para pedir a los pasajeros ya que al ser un sistema"},{type:"text",className:"answer",text:"nuevo no hay una referencia clara. Esto hacía que el proceso de publicar sus rutas fuera más complejo. Además, a muchos les complicaba tener que justificar el aporte que habían elegido y el hecho de que lo defina el sistema les quita esa responsabilidad de encima."},{type:"text",className:"answer",text:"Evitar viajes comerciales: buscamos que el compartir gastos sea un incentivo adicional para que las personas que regularmente viajan en auto estén más dispuestas a compartirlo, pero no está permitido realizar viajes comerciales, es decir, viajes donde se recaude más que el costo y se genere una ganancia económica. Manejar centralizadamente los aportes nos permite asegurar de que no se estén realizando viajes comerciales en nuestra plataforma."},{type:"text",className:"question",text:"¿Cómo se definen los aportes por pasajero?"},{type:"text",className:"answer",text:"El aporte por pasajero depende de la distancia de la ruta del conductor. El monto final viene de un modelo que construimos utilizando los datos de uso del Beta de la primera versión pública de MyRide."},{type:"text",className:"answer",text:"A partir de los miles de datos recolectados de las expectativas de los conductores y de la disposición a pagar de los pasajeros, ajustamos el modelo de aportes para que refleje el precio justo que los mismos usuarios definieron como comunidad."},{type:"text",className:"answer",text:"Tener la información agregada de todos los usuarios nos permite ir optimizando el modelo y mantener una plataforma de aportes justa de manera mucho más eficiente que si cada usuario lo hace por separado."},{type:"text",className:"question",text:"¿Por qué no se puede realizar el aporte con dinero en efectivo?"},{type:"text",className:"answer",text:"Hay 3 razones principales por las que no permitimos aportes con dinero en efectivo:"},{type:"text",className:"answer",text:"Cobrar a los pasajeros es un momento incómodo para muchos conductores. El pago electrónico ayuda a que no necesites hablar de dinero en tus viajes y solo te dediques a pasarlo bien!"},{type:"text",className:"answer",text:"El pago con efectivo es muy poco práctico ya que requiere tener el monto justo por parte del pasajero o tener cambio por parte del conductor."},{type:"text",className:"answer",text:"El sistema de pago electrónico permite facilitar el cobro de los gastos de gestión de la plataforma y financiar su operación, mejoramiento y crecimiento!"},{type:"text",className:"question",text:"¿Hay algún requisito o condiciones mínimas que deba tener mi vehículo para poder participar como conductor en MyRide?"},{type:"text",className:"answer",text:"Solo los requisitos que la legislación local exige para poder utilizar el vehículo. MyRide no pide ningún requisito adicional a lo exigido por la Ley respecto a los vehículos."},{type:"text",className:"question",text:"Si comparto mi auto, ¿es obligatorio llevar gente todos los días en que hago mi ruta?"},{type:"text",className:"answer",text:"No. Sabemos que la flexibilidad es muy importante para nuestros usuarios por lo que tú vas confirmando a los seguidores de tu ruta los días que quieres compartir y ellos van reservando asientos. Si no quieres o no puedes compartir algún día no hay problema 🙂"},{type:"text",className:"question",text:"Si comparto mi auto con alguien a la ida, ¿tengo necesariamente que compartirlo a la vuelta?"},{type:"text",className:"answer",text:"No. La ida y la vuelta se tratan como rutas independientes (se publican por separado). Puedes publicar solo ida, solo vuelta, o ambas según te acomode. Esto significa que no solo decides qué días quieres compartir cada una como se explica en el punto anterior, sino que incluso puedes tener seguidores distintos para la ida o la vuelta."}],Help={YoutubeVideos:[{name:"Cómo coordinar en el día a día (conductor)",src:"rNtO3NCOdmE"},{name:"Cómo marcar puntos directo en el mapa",src:"qdg8JtM5Jpw"},{name:"Cómo definir el trayecto de tu ruta (conductor)",src:"WcQ-T1lQ35M"},{name:"Cómo postear tu ruta en Facebook",src:"Jh6DFik3JdE"}]},Footer=[{type:"image",className:"logo",url:Paths.LOGO_LIGHT},{type:"text",className:"text",text:"Billones de personas en todo el mundo pierden mucho tiempo viajando solas al trabajo o estudio cada día, teniendo una experiencia estresante, aburrida y costosa."},{type:"text",className:"text",text:"MyRide cambia esa realidad, haciendo que viajar al trabajo sea entretenido y más barato, ayudándote a compartir viajes y costos con personas que hacen rutas similares y con las que tú decides viajar."},{type:"text",className:"text",text:"Información de Contacto"},{type:"text",className:"text",text:"CHILE"},{type:"text",className:"text",text:"Los Militares 5150, Las Condes"},{type:"text",className:"text",text:"+56 9 7967 4974"}],RootControl=e=>{const t=t=>{t===e.get("currentPage")?e.toggle("isMenuOpen"):(e.set({currentPage:t,isMenuOpen:e=>!e}),e.route(t),setTimeout(()=>{e.get("youtubeVideos").forEach(e=>{"playing"===e.getState()&&e.stop()})},2e3))};return{menuOptions:[{name:"Home",className:"link",onclick:()=>t("home")},{name:"Convenios",className:"link",onclick:()=>t("agreements")},{name:"Preguntas Frecuentes",className:"link",onclick:()=>t("faq")},{name:"Ayuda",className:"link",onclick:()=>t("help")},{name:"Entrar a la App",className:"button",onclick:()=>{e.toggle("isMenuOpen"),e.route("signin"),e.set({currentPage:"signin"})}}]}};var lib=Object.freeze({Paths:Paths,Colors:Colors,Sizes:Sizes,Home:Home,Agreements:Agreements,Faq:Faq,Help:Help,Footer:Footer,RootControl:RootControl});const size=30,transY=Math.ceil(7.5);var domain,MenuIcon=(e,t)=>e.hoc({id:t,classes:!1,styles:{wrapper:({inStyle:e})=>`\n        ${e}\n      `,top:({isOpen:e,color:t})=>`\n        background: ${t};\n        transform: translateY(${e?0:-transY}px) rotateZ(${e?45:0}deg);\n      `,middle:({isOpen:e,color:t})=>`\n        background: ${t};\n        opacity: ${e?0:1};\n      `,bottom:({isOpen:e,color:t})=>`\n        background: ${t};\n        transform: translateY(${e?0:transY}px) rotateZ(${e?-45:0}deg);\n      `},render:({props:t,classes:a,styles:s})=>e.h("div",{style:s.wrapper(t),class:a("wrapper"),onclick:t.onClick},e.h("div",{class:a("line"),style:s.top(t)}),e.h("div",{class:a("line"),style:s.middle(t)}),e.h("div",{class:a("line"),style:s.bottom(t)}))}),YTPlayer=(e,t)=>e.hoc({id:t,mounted(e){const{videoId:t,width:a,height:s,Player:o,onPlaying:n,onMounted:r}=e,i=new o(`#${t}`,{height:String(s),width:String(a)});i.load(t),i.on("playing",()=>n(i)),r(i)},render:({props:t})=>e.h("div",{id:t.videoId})}),components=Object.freeze({MenuIcon:MenuIcon,YTPlayer:YTPlayer}),Header=(e,t)=>e.hoc({id:t,classes:!1,styles:{logo:e=>`\n        opacity: ${e?0:1};\n        pointer-events: ${e?"auto":"none"};\n        max-height: 50%;\n      `},render:({props:t,classes:a,styles:s})=>e.h("div",{id:"header",class:a("header")},e.h("img",{src:t.logoSrc,style:s.logo(t.isMenuOpen)}))}),Menu=(e,t)=>e.hoc({id:t,classes:!1,styles:{menu:t=>`\n        background: ${e.lib.Colors.GREY_DARK};\n        opacity: ${t?.99:0};\n        pointer-events: ${t?"auto":"none"};\n      `},render:({props:t,styles:a,classes:s})=>e.h("div",{id:"menu",style:a.menu(t.isMenuOpen),class:s("menu")},e.h("img",{src:t.logoSrc,class:s("logo")}),t.options.map(t=>{const{className:a,name:o,onclick:n}=t;return e.h("div",{class:s(a),onclick:n},o)}))}),Footer$1=(e,t)=>e.hoc({id:t,classes:!1,render:({classes:t})=>e.h("div",{id:"footer",class:t("wrapper")},e.lib.Footer.map(a=>{const{type:s,url:o,text:n,className:r}=a;return"image"===s?e.h("img",{src:o,class:t(r)}):e.h("div",{class:t(r)},n)}))}),Pages=(e,t)=>{const{Footer:a}=e.ui.fragments;return e.hoc({id:t,classes:!1,styles:{page:e=>`\n        opacity: ${e?1:0};\n        pointer-events: ${e?"auto":"none"};\n      `},render({props:t,classes:s,styles:o}){const{pages:n,currentPage:r}=t;return Object.keys(n).map(t=>{const i=n[t];return e.h("div",{class:s("scrollable"),style:o.page(t===r),"data-route":t},e.h(i,null),e.h(a,null))})}})},fragments=Object.freeze({Header:Header,Menu:Menu,Footer:Footer$1,Pages:Pages}),Home$1=(e,t)=>e.hoc({id:t,classes:!1,render:({classes:t})=>e.h("div",{id:"home-wrapper",class:t("wrapper")},e.lib.Home.map(a=>{const{type:s,url:o,text:n,className:r}=a;return"image"===s?e.h("img",{src:o,class:t(r)}):e.h("div",{class:t(r)},n)}))}),Agreements$1=(e,t)=>e.hoc({id:t,classes:!1,render:({classes:t})=>e.h("div",{id:"agreements-wrapper",class:t("wrapper")},e.lib.Agreements.map(a=>{const{type:s,url:o,text:n,className:r}=a;return"image"===s?e.h("img",{src:o,class:t(r)}):e.h("div",{class:t(r)},n)}))}),Faq$1=(e,t)=>e.hoc({id:t,classes:!1,render:({classes:t})=>e.h("div",{id:"faq-wrapper",class:t("wrapper")},e.lib.Faq.map((a,s)=>{const{text:o,className:n}=a;return e.h("div",{id:`faq-${s}`,class:t(n)},o)}))});function EventHandlers(){}function EventEmitter(){EventEmitter.init.call(this)}function $getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}function emitNone(e,t,a){if(t)e.call(a);else for(var s=e.length,o=arrayClone(e,s),n=0;n<s;++n)o[n].call(a)}function emitOne(e,t,a,s){if(t)e.call(a,s);else for(var o=e.length,n=arrayClone(e,o),r=0;r<o;++r)n[r].call(a,s)}function emitTwo(e,t,a,s,o){if(t)e.call(a,s,o);else for(var n=e.length,r=arrayClone(e,n),i=0;i<n;++i)r[i].call(a,s,o)}function emitThree(e,t,a,s,o,n){if(t)e.call(a,s,o,n);else for(var r=e.length,i=arrayClone(e,r),l=0;l<r;++l)i[l].call(a,s,o,n)}function emitMany(e,t,a,s){if(t)e.apply(a,s);else for(var o=e.length,n=arrayClone(e,o),r=0;r<o;++r)n[r].apply(a,s)}function _addListener(e,t,a,s){var o,n,r;if("function"!=typeof a)throw new TypeError('"listener" argument must be a function');if((n=e._events)?(n.newListener&&(e.emit("newListener",t,a.listener?a.listener:a),n=e._events),r=n[t]):(n=e._events=new EventHandlers,e._eventsCount=0),r){if("function"==typeof r?r=n[t]=s?[a,r]:[r,a]:s?r.unshift(a):r.push(a),!r.warned&&(o=$getMaxListeners(e))&&o>0&&r.length>o){r.warned=!0;var i=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+t+" listeners added. Use emitter.setMaxListeners() to increase limit");i.name="MaxListenersExceededWarning",i.emitter=e,i.type=t,i.count=r.length,emitWarning(i)}}else r=n[t]=a,++e._eventsCount;return e}function emitWarning(e){"function"==typeof console.warn?console.warn(e):console.log(e)}function _onceWrap(e,t,a){var s=!1;function o(){e.removeListener(t,o),s||(s=!0,a.apply(e,arguments))}return o.listener=a,o}function listenerCount(e){var t=this._events;if(t){var a=t[e];if("function"==typeof a)return 1;if(a)return a.length}return 0}function spliceOne(e,t){for(var a=t,s=a+1,o=e.length;s<o;a+=1,s+=1)e[a]=e[s];e.pop()}function arrayClone(e,t){for(var a=new Array(t);t--;)a[t]=e[t];return a}function unwrapListeners(e){for(var t=new Array(e.length),a=0;a<t.length;++a)t[a]=e[a].listener||e[a];return t}EventHandlers.prototype=Object.create(null),EventEmitter.EventEmitter=EventEmitter,EventEmitter.usingDomains=!1,EventEmitter.prototype.domain=void 0,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.init=function(){this.domain=null,EventEmitter.usingDomains&&domain.active&&domain.Domain,this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new EventHandlers,this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},EventEmitter.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e,this},EventEmitter.prototype.getMaxListeners=function(){return $getMaxListeners(this)},EventEmitter.prototype.emit=function(e){var t,a,s,o,n,r,i,l="error"===e;if(r=this._events)l=l&&null==r.error;else if(!l)return!1;if(i=this.domain,l){if(t=arguments[1],!i){if(t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}return t||(t=new Error('Uncaught, unspecified "error" event')),t.domainEmitter=this,t.domain=i,t.domainThrown=!1,i.emit("error",t),!1}if(!(a=r[e]))return!1;var d="function"==typeof a;switch(s=arguments.length){case 1:emitNone(a,d,this);break;case 2:emitOne(a,d,this,arguments[1]);break;case 3:emitTwo(a,d,this,arguments[1],arguments[2]);break;case 4:emitThree(a,d,this,arguments[1],arguments[2],arguments[3]);break;default:for(o=new Array(s-1),n=1;n<s;n++)o[n-1]=arguments[n];emitMany(a,d,this,o)}return!0},EventEmitter.prototype.addListener=function(e,t){return _addListener(this,e,t,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(e,t){return _addListener(this,e,t,!0)},EventEmitter.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.removeListener=function(e,t){var a,s,o,n,r;if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');if(!(s=this._events))return this;if(!(a=s[e]))return this;if(a===t||a.listener&&a.listener===t)0==--this._eventsCount?this._events=new EventHandlers:(delete s[e],s.removeListener&&this.emit("removeListener",e,a.listener||t));else if("function"!=typeof a){for(o=-1,n=a.length;n-- >0;)if(a[n]===t||a[n].listener&&a[n].listener===t){r=a[n].listener,o=n;break}if(o<0)return this;if(1===a.length){if(a[0]=void 0,0==--this._eventsCount)return this._events=new EventHandlers,this;delete s[e]}else spliceOne(a,o);s.removeListener&&this.emit("removeListener",e,r||t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,a;if(!(a=this._events))return this;if(!a.removeListener)return 0===arguments.length?(this._events=new EventHandlers,this._eventsCount=0):a[e]&&(0==--this._eventsCount?this._events=new EventHandlers:delete a[e]),this;if(0===arguments.length){for(var s,o=Object.keys(a),n=0;n<o.length;++n)"removeListener"!==(s=o[n])&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=new EventHandlers,this._eventsCount=0,this}if("function"==typeof(t=a[e]))this.removeListener(e,t);else if(t)do{this.removeListener(e,t[t.length-1])}while(t[0]);return this},EventEmitter.prototype.listeners=function(e){var t,a=this._events;return a&&(t=a[e])?"function"==typeof t?[t.listener||t]:unwrapListeners(t):[]},EventEmitter.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]};var loadScript2=load;function load(e,t){var a=document.head||document.getElementsByTagName("head")[0],s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,t&&(s.onload=function(){s.onerror=s.onload=null,t(null,s)},s.onerror=function(){s.onerror=s.onload=null,t(new Error("Failed to load "+e),s)}),a.appendChild(s)}const EventEmitter$1=EventEmitter.EventEmitter,YOUTUBE_IFRAME_API_SRC="https://www.youtube.com/iframe_api",YOUTUBE_STATES={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"cued"},YOUTUBE_ERROR={INVALID_PARAM:2,HTML5_ERROR:5,NOT_FOUND:100,UNPLAYABLE_1:101,UNPLAYABLE_2:150},loadIframeAPICallbacks=[];class YouTubePlayer extends EventEmitter$1{constructor(e,t){super();const a="string"==typeof e?document.querySelector(e):e;a.id?this._id=a.id:this._id=a.id="ytplayer-"+Math.random().toString(16).slice(2,8),this._opts=Object.assign({width:640,height:360,autoplay:!1,captions:void 0,controls:!0,keyboard:!0,fullscreen:!0,annotations:!0,modestBranding:!1,related:!0,info:!0,timeupdateFrequency:1e3},t),this.videoId=null,this.destroyed=!1,this._api=null,this._autoplay=!1,this._player=null,this._ready=!1,this._queue=[],this._interval=null,this._startInterval=this._startInterval.bind(this),this._stopInterval=this._stopInterval.bind(this),this.on("unstarted",this._stopInterval),this.on("ended",this._stopInterval),this.on("playing",this._startInterval),this.on("paused",this._stopInterval),this.on("buffering",this._stopInterval),this._loadIframeAPI((e,t)=>{if(e)return this._destroy(new Error("YouTube Iframe API failed to load"));this._api=t,this.videoId&&this.load(this.videoId,this._autoplay)})}load(e,t=!1){this.destroyed||(this.videoId=e,this._autoplay=t,this._api&&(this._player?this._ready&&(t?this._player.loadVideoById(e):this._player.cueVideoById(e)):this._createPlayer(e)))}play(){this._ready?this._player.playVideo():this._queueCommand("play")}pause(){this._ready?this._player.pauseVideo():this._queueCommand("pause")}stop(){this._ready?this._player.stopVideo():this._queueCommand("stop")}seek(e){this._ready?this._player.seekTo(e,!0):this._queueCommand("seek",e)}setVolume(e){this._ready?this._player.setVolume(e):this._queueCommand("setVolume",e)}getVolume(){return this._ready&&this._player.getVolume()||0}mute(){this._ready?this._player.mute():this._queueCommand("mute")}unMute(){this._ready?this._player.unMute():this._queueCommand("unMute")}isMuted(){return this._ready&&this._player.isMuted()||!1}setSize(e,t){this._ready?this._player.setSize(e,t):this._queueCommand("setSize",e,t)}setPlaybackRate(e){this._ready?this._player.setPlaybackRate(e):this._queueCommand("setPlaybackRate",e)}getPlaybackRate(){return this._ready&&this._player.getPlaybackRate()||1}getAvailablePlaybackRates(){return this._ready&&this._player.getAvailablePlaybackRates()||[1]}getDuration(){return this._ready&&this._player.getDuration()||0}getProgress(){return this._ready&&this._player.getVideoLoadedFraction()||0}getState(){return this._ready&&YOUTUBE_STATES[this._player.getPlayerState()]||"unstarted"}getCurrentTime(){return this._ready&&this._player.getCurrentTime()||0}destroy(){this._destroy()}_destroy(e){this.destroyed||(this.destroyed=!0,this._player&&(this._player.stopVideo(),this._player.destroy()),this.videoId=null,this._id=null,this._opts=null,this._api=null,this._player=null,this._ready=!1,this._queue=null,this._stopInterval(),this._interval=!1,this.removeListener("playing",this._startInterval),this.removeListener("paused",this._stopInterval),this.removeListener("buffering",this._stopInterval),this.removeListener("unstarted",this._stopInterval),this.removeListener("ended",this._stopInterval),e&&this.emit("error",e))}_queueCommand(e,...t){this.destroyed||this._queue.push([e,t])}_flushQueue(){for(;this._queue.length;){const e=this._queue.shift();this[e[0]].apply(this,e[1])}}_loadIframeAPI(e){if(window.YT&&"function"==typeof window.YT.Player)return e(null,window.YT);loadIframeAPICallbacks.push(e),Array.from(document.getElementsByTagName("script")).some(e=>e.src===YOUTUBE_IFRAME_API_SRC)||loadScript2(YOUTUBE_IFRAME_API_SRC,e=>{if(e)for(;loadIframeAPICallbacks.length;){loadIframeAPICallbacks.shift()(e)}}),"function"!=typeof window.onYouTubeIframeAPIReady&&(window.onYouTubeIframeAPIReady=(()=>{for(;loadIframeAPICallbacks.length;){loadIframeAPICallbacks.shift()(null,window.YT)}}))}_createPlayer(e){if(this.destroyed)return;const t=this._opts;this._player=new this._api.Player(this._id,{width:t.width,height:t.height,videoId:e,playerVars:{autoplay:t.autoplay?1:0,cc_load_policy:null!=t.captions?t.captions?1:0:void 0,controls:t.controls?2:0,disablekb:t.keyboard?0:1,enablejsapi:1,fs:t.fullscreen?1:0,iv_load_policy:t.annotations?1:3,modestbranding:t.modestBranding?1:0,origin:window.location.origin,playsinline:1,rel:t.related?1:0,showinfo:t.info?1:0,wmode:"opaque"},events:{onReady:()=>this._onReady(e),onStateChange:e=>this._onStateChange(e),onPlaybackQualityChange:e=>this._onPlaybackQualityChange(e),onPlaybackRateChange:e=>this._onPlaybackRateChange(e),onError:e=>this._onError(e)}})}_onReady(e){this.destroyed||(this._ready=!0,this.load(this.videoId,this._autoplay),this._flushQueue())}_onStateChange(e){if(this.destroyed)return;const t=YOUTUBE_STATES[e.data];if(!t)throw new Error("Unrecognized state change: "+e);["paused","buffering","ended"].includes(t)&&this._onTimeupdate(),this.emit(t),["unstarted","playing","cued"].includes(t)&&this._onTimeupdate()}_onPlaybackQualityChange(e){this.destroyed||this.emit("playbackQualityChange",e.data)}_onPlaybackRateChange(e){this.destroyed||this.emit("playbackRateChange",e.data)}_onError(e){if(this.destroyed)return;const t=e.data;return t!==YOUTUBE_ERROR.HTML5_ERROR?t===YOUTUBE_ERROR.UNPLAYABLE_1||t===YOUTUBE_ERROR.UNPLAYABLE_2||t===YOUTUBE_ERROR.NOT_FOUND||t===YOUTUBE_ERROR.INVALID_PARAM?this.emit("unplayable",this.videoId):void this._destroy(new Error("YouTube Player Error. Unknown error code: "+t)):void 0}_onTimeupdate(){this.emit("timeupdate",this.getCurrentTime())}_startInterval(){this._interval=setInterval(()=>this._onTimeupdate(),this._opts.timeupdateFrequency)}_stopInterval(){clearInterval(this._interval),this._interval=null}}var ytPlayer=YouTubePlayer;const ratio=.5625;var Help$1=(e,t)=>{const{YTPlayer:a}=e.ui.components;return e.hoc({id:t,classes:!1,state(){const e=document.getElementById("help-wrapper");return{width:e?e.getBoundingClientRect().width:0}},actions:(e,t)=>({onPlaying:e=>{t.get("youtubeVideos").forEach(t=>{const a=t.videoId===e.videoId;"playing"!==t.getState()||a||t.stop()})},onMounted:e=>{t.set({youtubeVideos:t=>[...t,e]})}}),render:({state:t,classes:s,actions:o})=>e.h("div",{id:"help-wrapper"},e.lib.Help.YoutubeVideos.map(n=>e.h("div",null,e.h("div",{class:s("name")},n.name),e.h(a,{Player:ytPlayer,videoId:n.src,width:t.width,height:Math.floor(.5625*t.width),onPlaying:o.onPlaying,onMounted:o.onMounted}))))})},pages=Object.freeze({Home:Home$1,Agreements:Agreements$1,Faq:Faq$1,Help:Help$1}),rootComponent=(e,t)=>{const{RootControl:a}=e.lib,{MenuIcon:s}=e.ui.components,{Pages:o,Header:n,Menu:r}=e.ui.fragments,{Home:i,Agreements:l,Faq:c,Help:d}=e.ui.pages;return e.hoc({id:t,state:(e,t)=>({currentPage:t.get("currentPage")||e.currentPage,isMenuOpen:t.get("isMenuOpen"),menuOptions:a(t).menuOptions}),actions:(e,t)=>({onClickMenu:()=>{t.toggle("isMenuOpen")}}),classes:!1,render({actions:t,state:a,classes:u}){const{onClickMenu:p}=t,{currentPage:m,isMenuOpen:h,menuOptions:y}=a;return e.h("div",{id:"root",class:u("root")},e.h(s,{isOpen:h,onClick:p,color:"white",inStyle:"left: 12px; top: 12px;"}),e.h(n,{isMenuOpen:h,logoSrc:e.lib.Paths.LOGO_LIGHT}),e.h(r,{isMenuOpen:h,logoSrc:e.lib.Paths.LOGO_LIGHT,options:y}),e.h(o,{currentPage:m,pages:{home:i,agreements:l,faq:c,help:d}}))}})},config={store:store,lib:lib,components:components,fragments:fragments,pages:pages,rootComponent:rootComponent,moduleName:"www",rootNodeId:"root"};const main=(e,t)=>e.init(config,t);export{main};