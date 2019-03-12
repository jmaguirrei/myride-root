var forgotEmailPassword=e=>()=>{const s=e.get("language"),t=e.get("forgot.email").toLowerCase();return{steps:[()=>(e.set({"forgot.buttonPressed":!0}),e.callServer("isEmailRegistered",{email:t})),n=>{if(!n.isRegistered&&!n.isFBRegistered){const s="EMAIL_IS_NOT_REGISTERED";return e.addAlert({name:s,timeout:4e3}),e.set({"forgot.buttonPressed":!1}),{error:s}}return e.set({user_id:n._id,"forgot.currentStep":1,"forgot.buttonPressed":!1}),e.callServer("sendTokenEmail",{email:t,language:s,tokenField:"forgotToken"})}]}},forgotToken=e=>()=>{const s=e.get("signin.email"),t=e.get("forgot.password"),n=e.get("forgot.tokenDigits");return{steps:[()=>(e.set({"forgot.buttonPressed":!0}),e.callServer("setNewPassword",{email:s,password:t,token:n,tokenField:"forgotToken"})),s=>s.error?(e.set({"forgot.tokenDigits":"","forgot.buttonPressed":!1}),e.addAlert({name:s.error,timeout:4e3})):e.set({"forgot.currentStep":2,"forgot.password":"","forgot.tokenDigits":"","forgot.buttonPressed":!1})]}},signinEmailPassword=e=>()=>{const s=e.get("signin.email").toLowerCase(),t=e.get("signin.password");return{steps:[()=>(e.set({"signin.buttonPressed":!0}),e.callServer("isEmailRegistered",{email:s})),n=>{if(!n.isRegistered&&!n.isFBRegistered){const s="EMAIL_IS_NOT_REGISTERED";return e.addAlert({name:s,timeout:4e3}),{error:s}}return e.callServer("isPasswordCorrect",{email:s,password:t})},s=>(e.set({"signin.buttonPressed":!1}),s.error?e.addAlert({name:s.error,timeout:4e3}):e.route("app",`?user=${s._id}`))]}},signinWithFacebook=e=>({email:s})=>({steps:[()=>e.callServer("signinWithFacebook",{email:s}),s=>s.error?(e.addAlert({name:s.error,timeout:4e3}),{error:s.error}):e.route("app",`?user=${s._id}`)]}),signupEmailPassword=e=>()=>{const s=e.get("language"),t=e.get("signup.name"),n=e.get("signup.email").toLowerCase(),o=e.uid();return{steps:[()=>(e.set({"signup.buttonPressed":!0}),e.callServer("isEmailRegistered",{email:n})),s=>{if(s.isRegistered||s.isFBRegistered){const t=s.isRegistered?"EMAIL_ALREADY_REGISTERED":"ALREADY_FB_REGISTERED";return e.addAlert({name:t,timeout:4e3}),{error:t}}return e.callServer("createUserEntity",{_id:o,name:t,email:n})},()=>(e.set({user_id:o,"signup.currentStep":1,"signup.buttonPressed":!1}),e.callServer("sendTokenEmail",{email:n,language:s,tokenField:"signupToken"}))]}},signupToken=e=>()=>{const s=e.get("user_id"),t=e.get("signup.password"),n=e.get("signup.tokenDigits");return{steps:[()=>e.callServer("signupFinishRegistration",{_id:s,password:t,token:n}),s=>(e.set({"signup.tokenDigits":"","signup.buttonPressed":!1}),s.error?e.addAlert({name:s.error,timeout:4e3}):e.set({"signup.currentStep":2,"signup.name":"","signup.email":"","signup.password":""}))]}},signupWithFacebook=e=>({facebookUserId:s,name:t,email:n,picture:o})=>{const i=e.get("language");return{steps:[()=>e.callServer("signupWithFacebook",{language:i,name:t,email:n,facebookUserId:s,facebookUserPic:o}),s=>e.route("app",`?user=${s._id}`)]}},actions=Object.freeze({forgotEmailPassword:forgotEmailPassword,forgotToken:forgotToken,signinEmailPassword:signinEmailPassword,signinWithFacebook:signinWithFacebook,signupEmailPassword:signupEmailPassword,signupToken:signupToken,signupWithFacebook:signupWithFacebook});const MIN_LENGTH=5,name=e=>{const s=e.trim().length>=5;return{result:s,message:s?null:{en:"Name must have at least 5 characters",es:"El nombre debe tener al menos 5 caracteres"}}},REGEX=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,email=e=>{const s=REGEX.test(e);return{result:s,message:s?null:{en:"The email is not valid",es:"El email no es válido"}}},MIN_LENGTH$1=8,password=e=>{const s=/^\S+$/.test(e);if(0===e.length)return{result:!1,message:{en:"Password is required",es:"Se require la contraseña"}};if(!s)return{result:!1,message:{en:"Password can't contain white spaces",es:"La contraseña no puede contener espacios"}};const t=e.length>=8;return{result:t,message:t?null:{en:"Password must have at least 8 characters",es:"La contraseña debe tener al menos 8 caracteres"}}},LENGTH=6,token=e=>{const s=6===e.length;return{result:s,message:s?null:{en:"Token must have 6 digits",es:"El token debe tener 6 dígitos"}}};var checks=Object.freeze({name:name,email:email,password:password,token:token});const EMAIL_ALREADY_REGISTERED={en:"Email is already registered",es:"Este email ya está registrado"},ALREADY_FB_REGISTERED={en:"Already registered with Facebook",es:"Ya estás registrado con Facebook"},INVALID_SIGNUP_TOKEN={en:"Code is not correct",es:"Código incorrecto"},INVALID_FORGOT_TOKEN={en:"Code is not correct",es:"Código incorrecto"},EMAIL_IS_NOT_REGISTERED={en:"This email is not registered",es:"Este email no está registrado"},USER_NOT_FB_REGISTERED={en:"This user is not registered with Facebook",es:"Este usuario no está registrado con Facebook"},PASSWORD_IS_NOT_CORRECT={en:"Password is not correct",es:"Contraseña incorrecta"},PASSWORD_IS_NOT_DEFINED={en:"Password is not defined, go to 'Change Password'",es:"Contraseña no definida, anda a 'Cambio de Password'"};var alerts=Object.freeze({EMAIL_ALREADY_REGISTERED:EMAIL_ALREADY_REGISTERED,ALREADY_FB_REGISTERED:ALREADY_FB_REGISTERED,INVALID_SIGNUP_TOKEN:INVALID_SIGNUP_TOKEN,INVALID_FORGOT_TOKEN:INVALID_FORGOT_TOKEN,EMAIL_IS_NOT_REGISTERED:EMAIL_IS_NOT_REGISTERED,USER_NOT_FB_REGISTERED:USER_NOT_FB_REGISTERED,PASSWORD_IS_NOT_CORRECT:PASSWORD_IS_NOT_CORRECT,PASSWORD_IS_NOT_DEFINED:PASSWORD_IS_NOT_DEFINED}),store={actions:actions,checks:checks,alerts:alerts,observables:{user_id:"",language:"en",currentPage:"",isMenuOpen:!1,"signup.currentStep":0,"signup.name":"","signup.email":"","signup.password":"","signup.password.isVisible":!1,"signup.tokenDigits":"","signup.buttonPressed":!1,"signin.email":"","signin.password":"","signin.password.isVisible":!1,"signin.buttonPressed":!1,"forgot.currentStep":0,"forgot.email":"","forgot.password":"","forgot.password.isVisible":!1,"forgot.tokenDigits":"","forgot.buttonPressed":!1}},backspace='\n  <svg viewBox="0 0 24 24">\n    <path fill="none" d="M0 0h24v24H0V0z"></path>\n    <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"></path>\n  </svg>\n',chevronLeft='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0z" fill="none">\n    </path>\n    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z">\n    </path>\n  </svg>\n',chevronRight='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0z" fill="none">\n    </path>\n    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z">\n    </path>\n  </svg>\n',eyeOff='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none">\n    </path>\n    <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z">\n    </path>\n  </svg>\n',eyeOn='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0z" fill="none">\n    </path>\n    <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z">\n    </path>\n  </svg>\n',facebook='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0z" fill="white">\n    </path>\n    <path fill="#3B5998" d="M0,0 L0,24 L12.818,24 L12.818,14.706 L9.689,14.706 L9.689,11.085 L12.818,11.085 L12.818,8.41 C12.818,5.311 14.712,3.625 17.477,3.625 C18.802,3.625 19.941,3.722 20.273,3.766 L20.273,7.006 L18.352,7.006 C16.852,7.006 16.56,7.727 16.56,8.777 L16.56,11.088 L20.144,11.088 L19.679,14.718 L16.56,14.718 L16.56,24 L24,24 L24,0 L0,0 Z">\n    </path>\n  </svg>\n',lockOpen='\n  <svg viewbox="0 0 24 24">\n    <path fill="none" d="M0 0h24v24H0V0z"/>\n    <path d="M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-5h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.75-.14.54.18 1.08.72 1.22.53.14 1.08-.18 1.22-.72C9.44 3.93 10.63 3 12 3c1.65 0 3 1.35 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 11c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v8z"/>\n  </svg>\n',signin='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0z" fill="none"></path>\n    <path d="M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12c-2.29.46-4.15 2.29-4.63 4.58C.32 14.57 3.26 18 7 18c2.61 0 4.83-1.67 5.65-4H17v2c0 1.1.9 2 2 2s2-.9 2-2v-2c1.1 0 2-.9 2-2s-.9-2-2-2h-8.35zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>\n  </svg>\n',signup='\n  <svg viewbox="0 0 24 24">\n    <path d="M0 0h24v24H0V0z" fill="none"></path>\n    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"></path>\n  </svg>\n';const Keys={FACEBOOK_APP_ID:"244489929820595",GOOGLEMAPS_API_KEY:"AIzaSyAw0yfR8HmByczJ1Ic1pjCKCGICTYdiII4"},images="https://res.cloudinary.com/jmaguirrei/image/upload/myride",Paths={IMAGES:images,HOME_IMAGES:`${images}/internal/home`,LOGO_LIGHT:`${images}/internal/logo/logo-light`,LOGO_DARK:`${images}/internal/logo/logo-dark`},Colors={GREY_DARK:"hsl(214, 14%, 28%)",GREY_DARKEST:"hsl(214, 14%, 10%)",BLUE_HEADLINE:"hsl(215, 79%, 38%)",BLUE_FACEBOOK:"hsl(221, 44%, 41%)",BLUE_DARK_SIGNIN:"hsl(208, 81%, 34%)",BLUE_SIGNIN:"hsl(201, 80%, 60%)",GREEN_DARK_SIGNUP:"hsl(145, 45%, 27%)",GREEN_SIGNUP:"hsl(145, 45%, 44%)",RED_WARNING:"hsl(0, 70%, 60%)"},Sizes={HEADER_HEIGHT:"55px",TABS_HEIGHT:"50px"},RootControl=e=>{const s=s=>{s===e.get("currentPage")?e.toggle("isMenuOpen"):(e.set({currentPage:s,isMenuOpen:e=>!e}),e.route(s))};return{menuOptions:[{name:"Iniciar Sesión",className:"link",onclick:()=>s("signin")},{name:"Crear una cuenta",className:"link",onclick:()=>s("signup")},{name:"Recuperar Password",className:"link",onclick:()=>s("forgot")},{name:"Home",className:"link",onclick:()=>{e.toggle("isMenuOpen"),e.route("home")}}]}},SigninControl=e=>{const s=e.get("language"),t=e.check("email",e.get("signin.email")),n=e.get("signin.password"),o=e.check("password",n);if(t.result&&n.length>0)e.call("signinEmailPassword");else{const n=t.result?e.utils.get(o,`message.${s}`,""):e.utils.get(t,`message.${s}`,"");e.addAlert({message:n,timeout:5e3})}},SignupControl=e=>{const s=e.get("language"),t=e.get("signup.currentStep");if(0===t){const t=e.check("name",e.get("signup.name")),n=e.check("email",e.get("signup.email")),o=e.check("password",e.get("signup.password"));if(t.result&&n.result&&o.result)e.call("signupEmailPassword");else{const i=t.result?n.result?e.utils.get(o,`message.${s}`,""):e.utils.get(n,`message.${s}`,""):e.utils.get(t,`message.${s}`,"");e.addAlert({message:i,timeout:5e3})}}else if(1===t){const t=e.check("token",e.get("signup.tokenDigits"));if(t.result)e.call("signupToken");else{const n=e.utils.get(t,`message.${s}`,"");e.addAlert({message:n,timeout:5e3})}}else e.route("app")},ForgotControl=e=>{const s=e.get("language"),t=e.get("forgot.currentStep");if(0===t){const t=e.check("email",e.get("forgot.email")),n=e.check("password",e.get("forgot.password"));if(t.result&&n.result)e.call("forgotEmailPassword");else{const o=t.result?e.utils.get(n,`message.${s}`,""):e.utils.get(t,`message.${s}`,"");e.addAlert({message:o,timeout:5e3})}}else if(1===t){const t=e.check("name",e.get("forgot.tokenDigits"));if(t.result)e.call("forgotToken");else{const n=e.utils.get(t,`message.${s}`,"");e.addAlert({message:n,timeout:5e3})}}else e.route("signin"),e.set({currentPage:"signin"}),e.set({"forgot.currentStep":0},{timeout:2e3})},IconsSVGs={backspace:backspace,chevronLeft:chevronLeft,chevronRight:chevronRight,eyeOff:eyeOff,eyeOn:eyeOn,facebook:facebook,lockOpen:lockOpen,signin:signin,signup:signup};var lib=Object.freeze({IconsSVGs:IconsSVGs,Keys:Keys,Paths:Paths,Colors:Colors,Sizes:Sizes,RootControl:RootControl,SigninControl:SigninControl,SignupControl:SignupControl,ForgotControl:ForgotControl});const size=30,transY=Math.ceil(7.5);var MenuIcon=(e,s)=>e.hoc({id:s,classes:!1,styles:{wrapper:({inStyle:e})=>`\n        ${e}\n      `,top:({isOpen:e,color:s})=>`\n        background: ${s};\n        transform: translateY(${e?0:-transY}px) rotateZ(${e?45:0}deg);\n      `,middle:({isOpen:e,color:s})=>`\n        background: ${s};\n        opacity: ${e?0:1};\n      `,bottom:({isOpen:e,color:s})=>`\n        background: ${s};\n        transform: translateY(${e?0:transY}px) rotateZ(${e?-45:0}deg);\n      `},render:({props:s,classes:t,styles:n})=>e.h("div",{style:n.wrapper(s),class:t("wrapper"),onclick:s.onClick},e.h("div",{class:t("line"),style:n.top(s)}),e.h("div",{class:t("line"),style:n.middle(s)}),e.h("div",{class:t("line"),style:n.bottom(s)}))}),Icons=(e,s)=>{const{IconsSVGs:t}=e.lib;return e.hoc({id:s,actions:e=>({onClick:()=>{e.disabled||e.onclick()}}),styles:{div:(e,s,t,n)=>`\n        transition: all .6s ease;\n        width: ${e}px;\n        height: ${e}px;\n        cursor: ${t?"pointer":"auto"};\n        opacity: ${s?.5:1};\n        ${n}\n      `},render({props:s,styles:n,actions:o}){const{icon:i,size:a=32,disabled:r=!1,inStyle:l="",className:c="",onclick:g}=s;return!!t[i]&&e.h("div",{class:c,style:n.div(a,r,g,l),onclick:o.onClick,__innerHTML:t[i]})}})},Separator=(e,s)=>e.hoc({id:s,classes:!1,render({props:s,classes:t}){const{text:n,inStyle:o=""}=s;return e.h("div",{class:t("separator"),style:o},e.h("div",{class:t("line")}),e.h("span",{class:t("text")},n))}}),Input=(e,s)=>e.hoc({id:s,classes:!1,mounted(e){if(e.autoFocus){const s=document.getElementById(e.id);s&&s.focus()}},actions:e=>({onkeydown:s=>{9===s.keyCode&&e.useTabAsEnter&&(s.preventDefault(),e.onEnterPressed())},onpaste:s=>{if(e.onTextChanged){const t=s.clipboardData.getData("text/plain");e.onTextChanged({target:{value:t}})}}}),render({props:s,classes:t,actions:n}){const{type:o="text",placeholder:i="",value:a,inStyle:r="",onTextChanged:l,autocomplete:c}=s;return e.h("input",{id:s.id,type:o,placeholder:i,value:a,autocomplete:c,class:t("input"),style:r,onkeyup:l,onkeydown:n.onkeydown,onpaste:n.onpaste})}}),FacebookButton=(e,s)=>{const{Icons:t}=e.ui.components,n=(e,s)=>new Promise((t,n)=>{window.FB.api(e,"GET",s,e=>{e||n(),t(e)})}),o={fields:"first_name, last_name, name, email"},i={width:720,height:720,redirect:!1};return e.hoc({id:s,actions:e=>({onclick:()=>{window.FB.getLoginStatus(s=>{"connected"===s.status?n("/me",o).then(s=>{e.signinWithFacebook({email:s.email})}):window.FB.login(()=>{Promise.all([n("/me",o),n("/me/picture",i)]).then(s=>{const[t,n]=s,{email:o,name:i,id:a}=t,{width:r,height:l,url:c}=n.data;e.signupWithFacebook({facebookUserId:a,name:i,email:o,picture:{width:r,height:l,url:c}})}).catch(console.log)},{scope:"email"})})}}),mounted(s){window.fbAsyncInit=(()=>{window.FB.init({appId:s.facebookAppId,cookie:!0,xfbml:!0,version:"v3.2"}),window.FB.AppEvents.logPageView()}),e.createScript("facebook-jssdk","https://connect.facebook.net/en_US/sdk.js")},classes:!1,render:({props:s,classes:n,actions:o})=>e.h("div",{onclick:o.onclick,class:n("wrapper")},e.h(t,{icon:"facebook",size:30,inStyle:"position: absolute; right: 12px; bottom: 9px;"}),e.h("div",{class:n("text")},s.text))})},components=Object.freeze({MenuIcon:MenuIcon,Icons:Icons,Separator:Separator,Input:Input,FacebookButton:FacebookButton}),Header=(e,s)=>e.hoc({id:s,classes:!1,styles:{logo:e=>`\n        opacity: ${e?0:1};\n        pointer-events: ${e?"auto":"none"};\n        max-height: 50%;\n      `},render:({props:s,classes:t,styles:n})=>e.h("div",{id:"header",class:t("header")},e.h("img",{src:s.logoSrc,style:n.logo(s.isMenuOpen)}))}),Menu=(e,s)=>e.hoc({id:s,classes:!1,styles:{menu:s=>`\n        background: ${e.lib.Colors.GREY_DARK};\n        opacity: ${s?.99:0};\n        pointer-events: ${s?"auto":"none"};\n      `},render:({props:s,styles:t,classes:n})=>e.h("div",{id:"menu",style:t.menu(s.isMenuOpen),class:n("menu")},e.h("img",{src:s.logoSrc,class:n("logo")}),s.options.map(s=>{const{className:t,name:o,onclick:i}=s;return e.h("div",{class:n(t),onclick:i},o)}))}),Alerts=(e,s)=>e.hoc({id:s,state(e,s){const t=s.alerts.find(e=>e.isVisible);return{alertText:s.utils.get(t,"message","")}},classes:!1,styles:{alert:e=>`\n        opacity: ${e?1:0};\n        transform: translateY(${e?0:-100}%);\n      `},render:({classes:s,styles:t,state:n,utils:o})=>e.h("div",{class:s("alert"),style:t.alert(n.alertText)},o.localize(n.alertText))}),Pages=(e,s)=>e.hoc({id:s,styles:{page:e=>`\n        transition: opacity .3s ease;\n        opacity: ${e?1:0};\n        pointer-events: ${e?"auto":"none"};\n        position: absolute;\n        width: 100%;\n      `},render({props:s,styles:t}){const{pages:n,currentPage:o}=s;return Object.keys(n).map(s=>{const i=n[s];return e.h("div",{style:t.page(s===o)},e.h(i,null))})}}),ForgotPassword=(e,s)=>e.hoc({id:s,actions:(e,s)=>({onclick:()=>s.set({currentPage:"forgot"})}),classes:!1,render:({actions:s,classes:t,utils:n})=>e.h("div",{class:t("forgot"),onclick:s.onclick},n.localize({en:"Forgot password?",es:"¿Olvidaste tu contraseña?"}))}),TogglePassword=(e,s)=>{const{Icons:t}=e.ui.components;return e.hoc({id:s,actions:(e,s)=>({onclick:()=>s.toggle(`${e.page}.password.isVisible`)}),state:(e,s)=>({isPasswordVisible:s.get(`${e.page}.password.isVisible`),isIconVisible:s.get(`${e.page}.password`).length>0}),styles:{icon:(e,s)=>`\n        position: absolute;\n        right: 10px;\n        opacity: ${e?1:0};\n        pointer-events: ${e?"auto":"none"};\n        ${s}\n      `},render({props:s,state:n,actions:o,styles:i}){const{isPasswordVisible:a,isIconVisible:r}=n,{inStyle:l=""}=s;return e.h(t,{icon:a?"eyeOff":"eyeOn",size:22,onclick:r?o.onclick:()=>void 0,inStyle:i.icon(r,l)})}})},fragments=Object.freeze({Header:Header,Menu:Menu,Alerts:Alerts,Pages:Pages,ForgotPassword:ForgotPassword,TogglePassword:TogglePassword}),Email=(e,s)=>{const{Input:t}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({email:s.get("forgot.email")}),actions:(e,s)=>({onTextChanged:e=>{const t=e.target.value;s.set({"forgot.email":t})}}),classes:!1,render({state:s,classes:n,actions:o,utils:i}){const{email:a}=s;return e.h("div",{class:n("wrapper")},e.h(t,{placeholder:i.localize({en:"Registered email",es:"Email registrado"}),value:a,onTextChanged:o.onTextChanged,autocomplete:"email",type:"email",autoFocus:!0,id:"forgot-email-input"}))}})},Password=(e,s)=>{const{Input:t}=e.ui.components,{TogglePassword:n}=e.ui.fragments;return e.hoc({id:s,state:(e,s)=>({password:s.get("forgot.password"),isPasswordVisible:s.get("forgot.password.isVisible")}),actions:(e,s)=>({onTextChanged:e=>{s.set({"forgot.password":e.target.value})}}),classes:!1,render({state:s,classes:o,actions:i,utils:a}){const{password:r,isPasswordVisible:l}=s;return e.h("div",{class:o("wrapper")},e.h(t,{type:l?"text":"password",placeholder:a.localize({en:"New Password",es:"Nueva contraseña"}),value:r,onTextChanged:i.onTextChanged,autocomplete:"new-password"}),e.h(n,{page:"forgot",inStyle:"right: 20px"}))}})},Buttons=(e,s)=>{const{ForgotControl:t}=e.lib;return e.hoc({id:s,state:(e,s)=>({buttonPressed:s.get("forgot.buttonPressed"),currentStep:s.get("forgot.currentStep")}),actions:(e,s)=>({onclick:()=>{t(s)}}),styles:{button:(e,s)=>`\n        opacity: ${e?.5:1};\n        width: ${s>=1?70:98}%;\n      `},classes:!1,render({classes:s,state:t,actions:n,styles:o,utils:i}){const{currentStep:a,buttonPressed:r}=t;return e.h("div",{class:s("wrapper")},e.h("div",{class:s("button"),style:o.button(r,a),onclick:n.onclick},{0:i.localize({en:"Save new password",es:"Guardar nueva contraseña"}),1:i.localize({en:"Validate Token",es:"Validar Token"}),2:i.localize({en:"Login",es:"Entrar"})}[a]))}})},Headline=(e,s)=>{const{Icons:t}=e.ui.components;return e.hoc({id:s,classes:!1,render:({classes:s,utils:n})=>e.h("div",{id:"forgot-headline",class:s("container")},e.h(t,{icon:"lockOpen",size:30,inStyle:`\n              position: absolute;\n              left: 15px;\n              padding: 3px;\n              border: 1px solid hsl(0, 0%, 85%);\n              border-radius: 7px;\n              fill: ${e.lib.Colors.GREEN_SIGNUP};\n            `}),e.h("div",{class:s("title")},n.localize({en:"Create new password",es:"Crear nueva contraseña"})))})},Token=(e,s)=>{const{Input:t}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({tokenDigits:s.get("forgot.tokenDigits")}),actions:(e,s)=>({onTextChanged:e=>{const t=e.target.value;t.length<=6&&s.set({"forgot.tokenDigits":t})}}),classes:!1,render({state:s,classes:n,actions:o,utils:i}){const{tokenDigits:a}=s;return e.h("div",{class:n("wrapper")},e.h("div",{class:n("title")},i.localize({en:"Enter the code received by email",es:"Ingresa el código recibido por email"})),e.h(t,{type:"tel",placeholder:"* * * * * *",value:a,onTextChanged:o.onTextChanged,inStyle:"\n              padding: 12px 18px;\n              width: 70%;\n              font-size: 24px;\n              line-height: 24px;\n              text-align: center;\n            "}))}})},Done=(e,s)=>e.hoc({id:s,classes:!1,render:({classes:s,utils:t})=>e.h("div",{class:s("wrapper")},t.localize({en:"Password successfully changed!",es:"¡La contraseña fue cambiada con éxito!"}))}),Forgot=(e,s)=>{const{Alerts:t}=e.ui.fragments,{ForgotEmail:n,ForgotPassword:o,ForgotDone:i,ForgotToken:a,ForgotButtons:r,ForgotHeadline:l}=e.ui.pages;return e.hoc({id:s,state:(e,s)=>({currentStep:s.get("forgot.currentStep")}),classes:!1,styles:{carrousel:e=>`\n        width: 300%;\n        display: flex;\n        transition: all .6s ease;\n        transform: translateX(${-33.33*e}%);\n      `},render:({styles:s,state:c,classes:g})=>e.h("form",{id:"forgot",class:g("container")},e.h(t,null),e.h(l,null),e.h("div",{style:s.carrousel(c.currentStep)},e.h("div",{id:"forgot-step-0",class:g("step")},e.h(n,null),e.h(o,null)),e.h("div",{id:"forgot-step-1",class:g("step")},e.h(a,null)),e.h("div",{id:"forgot-step-2",class:g("step")},e.h(i,null))),e.h(r,null))})},Email$1=(e,s)=>{const{Input:t}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({email:s.get("signin.email")}),actions:(e,s)=>({onTextChanged:e=>{const t=e.target.value;s.set({"signin.email":t,"forgot.email":t})}}),classes:!1,render({state:s,classes:n,actions:o,utils:i}){const{email:a}=s;return e.h("div",{class:n("wrapper")},e.h(t,{placeholder:i.localize({en:"Registered email",es:"Email registrado"}),value:a,onTextChanged:o.onTextChanged,autocomplete:"email",type:"email",autoFocus:!0,id:"signin-email-input"}))}})},Password$1=(e,s)=>{const{Input:t}=e.ui.components,{ForgotPassword:n,TogglePassword:o}=e.ui.fragments;return e.hoc({id:s,state:(e,s)=>({password:s.get("signin.password"),isPasswordVisible:s.get("signin.password.isVisible")}),actions:(e,s)=>({onTextChanged:e=>{s.set({"signin.password":e.target.value})}}),classes:!1,render({state:s,classes:i,actions:a}){const{password:r,isPasswordVisible:l}=s;return e.h("div",{class:i("wrapper")},e.h("div",{class:i("inputWrapper")},e.h(t,{type:l?"text":"password",placeholder:"Password",value:r,onTextChanged:a.onTextChanged,autocomplete:"current-password"}),e.h(o,{page:"signin"})),e.h(n,null))}})},Buttons$1=(e,s)=>{const{SigninControl:t}=e.lib,{Separator:n,FacebookButton:o}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({buttonPressed:s.get("signin.buttonPressed")}),actions:(e,s)=>({onLogin:()=>{t(s)},onCreate:()=>{s.set({currentPage:"signup",isMenuOpen:!1}),s.route("signup")},signinWithFacebook:e=>{s.call("signinWithFacebook",e)},signupWithFacebook:e=>{s.call("signupWithFacebook",e)}}),styles:{button:e=>`\n        opacity: ${e?.5:1};\n      `},classes:!1,render:({classes:s,state:t,actions:i,styles:a,utils:r})=>e.h("div",{class:s("wrapper")},e.h("div",{class:s("login"),style:a.button(t.buttonPressed),onclick:i.onLogin},r.localize({en:"Login",es:"Entrar"})),e.h(n,{text:"o",inStyle:"margin: 7px 0"}),e.h("div",{class:s("bottomWrapper")},e.h("div",{class:s("create"),onclick:i.onCreate},r.localize({en:"Create an account",es:"Crear una cuenta"})),e.h(o,{text:r.localize({en:"Connect with",es:"Entrar con"}),facebookAppId:e.lib.Keys.FACEBOOK_APP_ID,signinWithFacebook:i.signinWithFacebook,signupWithFacebook:i.signupWithFacebook})))})},Headline$1=(e,s)=>{const{Icons:t}=e.ui.components;return e.hoc({id:s,classes:!1,render:({classes:s,utils:n})=>e.h("div",{id:"signin-headline",class:s("container")},e.h(t,{icon:"signin",size:30,inStyle:`\n              position: absolute;\n              left: 15px;\n              padding: 3px;\n              border: 1px solid hsl(0, 0%, 85%);\n              border-radius: 7px;\n              fill: ${e.lib.Colors.BLUE_SIGNIN};\n            `}),e.h("div",{class:s("title")},n.localize({en:"Welcome!",es:"¡Bienvenido!"})))})},SignIn=(e,s)=>{const{Alerts:t}=e.ui.fragments,{SignInEmail:n,SignInPassword:o,SignInButtons:i,SignInHeadline:a}=e.ui.pages;return e.hoc({id:s,classes:!1,render:({classes:s})=>e.h("form",{id:"sign-in",class:s("container")},e.h(t,null),e.h(a,null),e.h(n,null),e.h(o,null),e.h(i,null))})},Buttons$2=(e,s)=>{const{SignupControl:t}=e.lib;return e.hoc({id:s,state:(e,s)=>({buttonPressed:s.get("signup.buttonPressed"),currentStep:s.get("signup.currentStep")}),actions:(e,s)=>({onClickButton:()=>t(s),onGoToSignin:()=>s.set({currentPage:"signin"})}),styles:{button:(e,s)=>`\n        opacity: ${e?.5:1};\n        width: ${s>=1?70:98}%;\n      `},classes:!1,render({classes:s,state:t,actions:n,styles:o,utils:i}){const{currentStep:a,buttonPressed:r}=t;return e.h("div",{class:s("wrapper")},e.h("div",{class:s("button"),style:o.button(r,a),onclick:n.onClickButton},{0:i.localize({en:"Create Account",es:"Crear Cuenta"}),1:i.localize({en:"Validate Token",es:"Validar Token"}),2:i.localize({en:"Open the App",es:"Ir a la App"})}[a]),e.h("div",{class:s("alreadyRegistered"),onclick:n.onGoToSignin},i.localize({en:"Already registered? Login",es:"¿Ya estás registrado? Entrar"})))}})},Email$2=(e,s)=>{const{Input:t}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({email:s.get("signup.email")}),actions:(e,s)=>({onTextChanged:e=>{const t=e.target.value;s.set({"signup.email":t,"forgot.email":t})}}),classes:!1,render({state:s,classes:n,actions:o,utils:i}){const{email:a}=s;return e.h("div",{class:n("wrapper")},e.h(t,{type:"email",placeholder:i.localize({en:"Your email",es:"Tu email"}),value:a,onTextChanged:o.onTextChanged,autocomplete:"email"}))}})},Headline$2=(e,s)=>{const{Icons:t}=e.ui.components;return e.hoc({id:s,classes:!1,render:({classes:s,utils:n})=>e.h("div",{id:"signup-headline",class:s("container")},e.h(t,{icon:"signup",size:30,inStyle:`\n              position: absolute;\n              left: 15px;\n              padding: 3px;\n              border: 1px solid hsl(0, 0%, 85%);\n              border-radius: 7px;\n              fill: ${e.lib.Colors.GREEN_SIGNUP};\n            `}),e.h("div",{class:s("title")},n.localize({en:"Account registration",es:"Registro de tu cuenta"})))})},Name=(e,s)=>{const{Input:t}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({name:s.get("signup.name")}),actions:(e,s)=>({onTextChanged:e=>{const t=e.target.value;s.set({"signup.name":t})}}),classes:!1,render({state:s,classes:n,actions:o,utils:i}){const{name:a}=s;return e.h("div",{class:n("wrapper")},e.h(t,{id:"signup-name-input",placeholder:i.localize({en:"Your name",es:"Tu nombre"}),value:a,onTextChanged:o.onTextChanged,autoFocus:!0,autocomplete:"name"}))}})},Password$2=(e,s)=>{const{Input:t}=e.ui.components,{TogglePassword:n}=e.ui.fragments;return e.hoc({id:s,state:(e,s)=>({password:s.get("signup.password"),isPasswordVisible:s.get("signup.password.isVisible")}),actions:(e,s)=>({onTextChanged:e=>{s.set({"signup.password":e.target.value})}}),classes:!1,render({state:s,classes:o,actions:i}){const{password:a,isPasswordVisible:r}=s;return e.h("div",{class:o("wrapper")},e.h(t,{type:r?"text":"password",placeholder:"Password",value:a,onTextChanged:i.onTextChanged,autocomplete:"new-password"}),e.h(n,{page:"signup",inStyle:"right: 20px"}))}})},Token$1=(e,s)=>{const{Input:t}=e.ui.components;return e.hoc({id:s,state:(e,s)=>({tokenDigits:s.get("signup.tokenDigits")}),actions:(e,s)=>({onTextChanged:e=>{const t=e.target.value;t.length<=6&&s.set({"signup.tokenDigits":t})}}),classes:!1,render({state:s,classes:n,actions:o,utils:i}){const{tokenDigits:a}=s;return e.h("div",{class:n("wrapper")},e.h("div",{class:n("title")},i.localize({en:"Enter the code received by email",es:"Ingresa el código recibido por email"})),e.h(t,{type:"tel",placeholder:"* * * * * *",value:a,onTextChanged:o.onTextChanged,inStyle:"\n              padding: 12px 18px;\n              width: 70%;\n              font-size: 24px;\n              line-height: 24px;\n              text-align: center;\n            "}))}})},Welcome=(e,s)=>e.hoc({id:s,classes:!1,render:({classes:s,utils:t})=>e.h("div",{id:"welcome",style:s("wrapper")},e.h("div",{class:s("title")},t.localize({en:"Welcome! 🎉🎉",es:"¡Bienvenid@! 🎉🎉"})),e.h("div",{class:s("subtitle")},t.localize({en:"You successfully registered your account",es:"Has registrado exitosamente tu cuenta"})))}),SignUp=(e,s)=>{const{Alerts:t}=e.ui.fragments,{SignUpName:n,SignUpEmail:o,SignUpPassword:i,SignUpToken:a,SignUpButtons:r,SignUpHeadline:l,SignUpWelcome:c}=e.ui.pages;return e.hoc({id:s,state:(e,s)=>({currentStep:s.get("signup.currentStep")}),classes:!1,styles:{carrousel:e=>`\n        width: 300%;\n        display: flex;\n        transform: translateX(${-33.33*e}%);\n        transition: all .6s ease;\n      `},render:({styles:s,state:g,classes:d})=>e.h("form",{id:"sign-up",class:d("container")},e.h(t,null),e.h(l,null),e.h("div",{style:s.carrousel(g.currentStep)},e.h("div",{id:"sign-up-step-0",class:d("step")},e.h(n,null),e.h(o,null),e.h(i,null)),e.h("div",{id:"sign-up-step-1",class:d("step")},e.h(a,null)),e.h("div",{id:"sign-up-step-2",class:d("step")},e.h(c,null))),e.h(r,null))})},pages=Object.freeze({ForgotEmail:Email,ForgotPassword:Password,ForgotButtons:Buttons,ForgotHeadline:Headline,ForgotToken:Token,ForgotDone:Done,Forgot:Forgot,SignInEmail:Email$1,SignInPassword:Password$1,SignInButtons:Buttons$1,SignInHeadline:Headline$1,SignIn:SignIn,SignUpButtons:Buttons$2,SignUpEmail:Email$2,SignUpHeadline:Headline$2,SignUpName:Name,SignUpPassword:Password$2,SignUpToken:Token$1,SignUpWelcome:Welcome,SignUp:SignUp}),rootComponent=(e,s)=>{const{RootControl:t}=e.lib,{MenuIcon:n}=e.ui.components,{Pages:o,Header:i,Menu:a}=e.ui.fragments,{SignIn:r,SignUp:l,Welcome:c,Forgot:g}=e.ui.pages;return e.hoc({id:s,state:(e,s)=>({currentPage:s.get("currentPage")||e.currentPage,isMenuOpen:s.get("isMenuOpen"),menuOptions:t(s).menuOptions}),actions:(e,s)=>({onClickMenu:()=>{s.toggle("isMenuOpen")}}),classes:!1,render({actions:s,state:t,classes:d}){const{onClickMenu:u}=s,{currentPage:p,isMenuOpen:h,menuOptions:m}=t;return e.h("div",{id:"root",class:d("root","safe-area")},e.h(n,{isOpen:h,onClick:u,color:"white",inStyle:"left: 12px; bottom: 15px;"}),e.h(i,{isMenuOpen:h,logoSrc:e.lib.Paths.LOGO_LIGHT}),e.h(a,{isMenuOpen:h,logoSrc:e.lib.Paths.LOGO_LIGHT,options:m}),e.h(o,{currentPage:p,pages:{signin:r,signup:l,forgot:g,welcome:c}}))}})},config={store:store,lib:lib,components:components,fragments:fragments,pages:pages,rootComponent:rootComponent,moduleName:"sign",rootNodeId:"root"};const main=(e,s)=>e.init(config,s);export{main};