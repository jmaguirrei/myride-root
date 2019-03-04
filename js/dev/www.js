// export { default as changeRoute } from './changeRoute';

var actions = /*#__PURE__*/Object.freeze({

});

var store = {
  actions,
  observables: {
    // Domain properties
    user_id: '',
    language: 'en',
    // pages

    /*      currentPage      -----------      Start with '' because Root component will be using props.currentPage in SSR      Values: home, agreements, faq, help    */
    currentPage: '',
    // Menu
    isMenuOpen: false,
    // Help
    youtubeVideos: [] // players instances

  }
};

const images = 'https://res.cloudinary.com/jmaguirrei/image/upload/myride';
const Paths = {
  IMAGES: images,
  HOME_IMAGES: `${images}/internal/home`,
  LOGO_LIGHT: `${images}/internal/logo/logo-light`,
  LOGO_DARK: `${images}/internal/logo/logo-dark`
};

const Colors = {
  GREY_DARK: 'hsl(214, 14%, 28%)',
  GREY_DARKEST: 'hsl(214, 14%, 10%)',
  BLUE_HEADLINE: 'hsl(215, 79%, 38%)',
  BLUE_FACEBOOK: 'hsl(221, 44%, 41%)',
  BLUE_DARK_SIGNIN: 'hsl(208, 81%, 34%)',
  BLUE_SIGNIN: 'hsl(201, 80%, 60%)',
  GREEN_DARK_SIGNUP: 'hsl(145, 45%, 27%)',
  GREEN_SIGNUP: 'hsl(145, 45%, 44%)',
  RED_WARNING: 'hsl(0, 70%, 60%)'
};

const Sizes = {
  HEADER_HEIGHT: '55px',
  TABS_HEIGHT: '50px'
};

const Home = [{
  type: 'image',
  className: 'hero-image',
  url: `${Paths.HOME_IMAGES}/home-hero-main`
}, {
  type: 'text',
  className: 'headline',
  text: 'Ahorra dinero y viaja más entretenido compartiendo viajes con personas que hacen rutas similares'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/home-save-money`
}, {
  type: 'text',
  className: 'title',
  text: 'Ahorra Dinero'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Comparte gastos con otras personas que realizan rutas similares. Ofrece asientos disponibles en tu auto o súbete una de las miles de rutas que ya hay en la comunidad.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/home-flexible-safe`
}, {
  type: 'text',
  className: 'title',
  text: 'Flexible y Seguro'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Tú decides con quién y cuándo compartir. La integración con Facebook te permite revisar si tienes amigos en común con otra persona o ver su perfil antes de decidir si quieres compartir viajes con ella.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/home-frequent-trips`
}, {
  type: 'text',
  className: 'title',
  text: 'Viajes Frecuentes y Ocasionales'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Viajes diarios al trabajo o estudio, viajes ocasionales fuera de la ciudad. Siempre puedes hacerlo más entretenido y conveniente con MyRide!'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/home-easy-coordination`
}, {
  type: 'text',
  className: 'title',
  text: 'Fácil Coordinación'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Ve en tiempo real dónde viene el conductor o dónde están los demás pasajeros para facilitar el encuentro y la puntualidad.'
}];

const Agreements = [{
  type: 'image',
  className: 'hero-image',
  url: `${Paths.HOME_IMAGES}/agreements-hero`
}, {
  type: 'text',
  className: 'headline',
  text: 'Optimiza el uso de estacionamientos y vehículos en tu organización'
}, {
  type: 'text',
  className: 'big-title',
  text: 'Convenios para empresas'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/agreements-secure`
}, {
  type: 'text',
  className: 'title',
  text: 'Seguridad'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Creamos una red privada para tu organización dentro de la comunidad pública. Validación con correo institucional.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/agreements-stats`
}, {
  type: 'text',
  className: 'title',
  text: 'Estadísticas'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Web de administración para ver en tiempo real reportes, rankings y estadísticas de uso del sistema entre los colaboradores.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/agreements-support`
}, {
  type: 'text',
  className: 'title',
  text: 'Soporte'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Incluye toolkit de implementación, con gráficas, comunicación y políticas recomendadas. Soporte técnico y a usuarios por correo o teléfono.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'image',
  className: 'image',
  url: `${Paths.HOME_IMAGES}/agreements-gift`
}, {
  type: 'text',
  className: 'title',
  text: 'Regalo de Bienvenida'
}, {
  type: 'text',
  className: 'paragraph',
  text: 'Cargamos saldo a los primeros colaboradores registrados para que puedan comenzar de inmediato!'
}];

// import { Paths } from '../constants/paths';
const Faq = [{
  type: 'text',
  className: 'question',
  text: '¿Qué es el carpool o auto compartido?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Se llama carpool o auto compartido a la práctica de compartir viajes en auto con otras personas que hacen rutas similares, permitiendo hacer un uso más eficiente de los vehículos y compartir los gastos del viaje.'
}, {
  type: 'text',
  className: 'answer',
  text: 'El carpool se trata de viajes no comerciales, donde conductores ofrecen asientos disponibles en su auto en rutas que ya están haciendo y seguirán haciendo de todas maneras, como su viaje diario al trabajo o al estudio. Se permite compartir los gastos del viaje con los pasajeros como un incentivo a los conductores a disponibilizar los asientos pero lo recaudado no puede ser mayor que el costo del viaje.'
}, {
  type: 'text',
  className: 'answer',
  text: 'Además de reducir los costos de traslado por persona, el carpool te permite tener una mejor experiencia de viaje compartiendo con gente con la que tú decides viajar. Al no ser viajes comerciales, las personas siempre pueden decidir con quién y cuándo quieren compartir viajes.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Cuál es la diferencia respecto a servicios como Uber o Cabify?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Los servicios como Uber o Cabify corresponden a ride hailing o viajes por demanda, en que un chofer conduce como actividad comercial, transportando pasajeros al lugar donde éstos necesitan ir y recibiendo a cambio una remuneración que apunta a cubrir los costos del viaje y dejar una ganancia económica al chofer por su trabajo.'
}, {
  type: 'text',
  className: 'answer',
  text: 'En el carpool (MyRide), los conductores publican las rutas que ellos ya están realizando por necesidades propias y ofrecen compartir sus asientos disponibles con pasajeros a los que esa ruta les resulte útil. De esta manera pueden tener una experiencia de viaje más entretenida y compartir los gastos del viaje con más personas, sin generar una ganancia económica.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Por qué debo registrarme con Facebook?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Crear una comunidad segura es la prioridad de MyRide. A diferencia de otros medios, el registro por Facebook permite que podamos importar automáticamente el respaldo social de los usuarios a sus perfiles de MyRide.'
}, {
  type: 'text',
  className: 'answer',
  text: 'De esta manera, siempre podrás contar con una base de información relevante antes de decidir si quieres compartir un viaje con otra persona o no, como el número de amigos que tiene en Facebook, si tienen amigos en común, foto de perfil, etc.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Qué pasa con eventuales perfiles falsos?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Si bien es posible que alguien cree un perfil falso en Facebook que le permita registrarse en MyRide, es muy fácil para los usuarios identificarlo. Si recibes por ejemplo una solicitud de seguir tu ruta de una persona que tiene 15 amigos y ninguno de ellos en común contigo nuestra recomendación es simple: no compartas viajes con esa persona. Es posible que sea un perfil legítimo pero ante la duda es mejor no exponerse.'
}, {
  type: 'text',
  className: 'answer',
  text: 'Esto no es posible de lograr abriendo el sistema a registro con correo electrónico personal u otros medios. Sabemos que por distintas razones hay gente que prefiere'
}, {
  type: 'text',
  className: 'answer',
  text: 'no tener cuenta de Facebook y entendemos su decisión, pero queremos dejar en claro que la razón detrás de esta restricción es la seguridad de nuestra comunidad y que las puertas están abiertas si deciden crear una cuenta gratuita en esa red social para sumarse a MyRide.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Quieres proponer más alternativas seguras de registro para que incorporemos?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Escríbenos a soporte@myride.com'
}, {
  type: 'text',
  className: 'answer',
  text: 'Si tu empresa o universidad tiene convenio con MyRide también podrás registrarte con tu correo institucional, aprovechando la validación corporativa (ver más).'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Por qué no puedo elegir el aporte por pasajero?'
}, {
  type: 'text',
  className: 'answer',
  text: 'En esta nueva versión de la aplicación y en base al feedback de nuestros usuarios, MyRide define los aportes de los pasajeros en base a la distancia de la ruta. Esto permite:'
}, {
  type: 'text',
  className: 'answer',
  text: 'Facilitar el proceso de publicación: muchos conductores nos decían que no sabían bien cuánto era un aporte razonable para pedir a los pasajeros ya que al ser un sistema'
}, {
  type: 'text',
  className: 'answer',
  text: 'nuevo no hay una referencia clara. Esto hacía que el proceso de publicar sus rutas fuera más complejo. Además, a muchos les complicaba tener que justificar el aporte que habían elegido y el hecho de que lo defina el sistema les quita esa responsabilidad de encima.'
}, {
  type: 'text',
  className: 'answer',
  text: 'Evitar viajes comerciales: buscamos que el compartir gastos sea un incentivo adicional para que las personas que regularmente viajan en auto estén más dispuestas a compartirlo, pero no está permitido realizar viajes comerciales, es decir, viajes donde se recaude más que el costo y se genere una ganancia económica. Manejar centralizadamente los aportes nos permite asegurar de que no se estén realizando viajes comerciales en nuestra plataforma.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Cómo se definen los aportes por pasajero?'
}, {
  type: 'text',
  className: 'answer',
  text: 'El aporte por pasajero depende de la distancia de la ruta del conductor. El monto final viene de un modelo que construimos utilizando los datos de uso del Beta de la primera versión pública de MyRide.'
}, {
  type: 'text',
  className: 'answer',
  text: 'A partir de los miles de datos recolectados de las expectativas de los conductores y de la disposición a pagar de los pasajeros, ajustamos el modelo de aportes para que refleje el precio justo que los mismos usuarios definieron como comunidad.'
}, {
  type: 'text',
  className: 'answer',
  text: 'Tener la información agregada de todos los usuarios nos permite ir optimizando el modelo y mantener una plataforma de aportes justa de manera mucho más eficiente que si cada usuario lo hace por separado.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Por qué no se puede realizar el aporte con dinero en efectivo?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Hay 3 razones principales por las que no permitimos aportes con dinero en efectivo:'
}, {
  type: 'text',
  className: 'answer',
  text: 'Cobrar a los pasajeros es un momento incómodo para muchos conductores. El pago electrónico ayuda a que no necesites hablar de dinero en tus viajes y solo te dediques a pasarlo bien!'
}, {
  type: 'text',
  className: 'answer',
  text: 'El pago con efectivo es muy poco práctico ya que requiere tener el monto justo por parte del pasajero o tener cambio por parte del conductor.'
}, {
  type: 'text',
  className: 'answer',
  text: 'El sistema de pago electrónico permite facilitar el cobro de los gastos de gestión de la plataforma y financiar su operación, mejoramiento y crecimiento!'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: '¿Hay algún requisito o condiciones mínimas que deba tener mi vehículo para poder participar como conductor en MyRide?'
}, {
  type: 'text',
  className: 'answer',
  text: 'Solo los requisitos que la legislación local exige para poder utilizar el vehículo. MyRide no pide ningún requisito adicional a lo exigido por la Ley respecto a los vehículos.'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: 'Si comparto mi auto, ¿es obligatorio llevar gente todos los días en que hago mi ruta?'
}, {
  type: 'text',
  className: 'answer',
  text: 'No. Sabemos que la flexibilidad es muy importante para nuestros usuarios por lo que tú vas confirmando a los seguidores de tu ruta los días que quieres compartir y ellos van reservando asientos. Si no quieres o no puedes compartir algún día no hay problema 🙂'
},
/* --------------------------------------------------------------------------------------------- */
{
  type: 'text',
  className: 'question',
  text: 'Si comparto mi auto con alguien a la ida, ¿tengo necesariamente que compartirlo a la vuelta?'
}, {
  type: 'text',
  className: 'answer',
  text: 'No. La ida y la vuelta se tratan como rutas independientes (se publican por separado). Puedes publicar solo ida, solo vuelta, o ambas según te acomode. Esto significa que no solo decides qué días quieres compartir cada una como se explica en el punto anterior, sino que incluso puedes tener seguidores distintos para la ida o la vuelta.'
}];

const Help = {
  YoutubeVideos: [{
    name: 'Cómo coordinar en el día a día (conductor)',
    src: 'rNtO3NCOdmE'
  }, {
    name: 'Cómo marcar puntos directo en el mapa',
    src: 'qdg8JtM5Jpw'
  }, {
    name: 'Cómo definir el trayecto de tu ruta (conductor)',
    src: 'WcQ-T1lQ35M'
  }, {
    name: 'Cómo postear tu ruta en Facebook',
    src: 'Jh6DFik3JdE'
  }]
};

const Footer = [{
  type: 'image',
  className: 'logo',
  url: Paths.LOGO_LIGHT
}, {
  type: 'text',
  className: 'text',
  text: 'Billones de personas en todo el mundo pierden mucho tiempo viajando solas al trabajo o estudio cada día, teniendo una experiencia estresante, aburrida y costosa.'
}, {
  type: 'text',
  className: 'text',
  text: 'MyRide cambia esa realidad, haciendo que viajar al trabajo sea entretenido y más barato, ayudándote a compartir viajes y costos con personas que hacen rutas similares y con las que tú decides viajar.'
}, {
  type: 'text',
  className: 'text',
  text: 'Información de Contacto'
}, {
  type: 'text',
  className: 'text',
  text: 'CHILE'
}, {
  type: 'text',
  className: 'text',
  text: 'Los Militares 5150, Las Condes'
}, {
  type: 'text',
  className: 'text',
  text: '+56 9 7967 4974'
}];

const RootControl = store => {
  const onMenuNav = page => {
    if (page === store.get('currentPage')) {
      store.toggle('isMenuOpen');
    } else {
      store.set({
        currentPage: page,
        isMenuOpen: current => !current
      });
      store.route(page);
      setTimeout(() => {
        store.get('youtubeVideos').forEach(video => {
          if (video.getState() === 'playing') video.stop();
        });
      }, 2000);
    }
  };

  const onLogin = () => {
    store.toggle('isMenuOpen');
    store.route('signin');
    store.set({
      currentPage: 'signin'
    });
  };

  return {
    menuOptions: [{
      name: 'Home',
      className: 'link',
      onclick: () => onMenuNav('home')
    }, {
      name: 'Convenios',
      className: 'link',
      onclick: () => onMenuNav('agreements')
    }, {
      name: 'Preguntas Frecuentes',
      className: 'link',
      onclick: () => onMenuNav('faq')
    }, {
      name: 'Ayuda',
      className: 'link',
      onclick: () => onMenuNav('help')
    }, {
      name: 'Entrar a la App',
      className: 'button',
      onclick: onLogin
    }]
  };
};



var lib = /*#__PURE__*/Object.freeze({
  Paths: Paths,
  Colors: Colors,
  Sizes: Sizes,
  Home: Home,
  Agreements: Agreements,
  Faq: Faq,
  Help: Help,
  Footer: Footer,
  RootControl: RootControl
});

const size = 30;
const transY = Math.ceil(0.25 * size);
var MenuIcon = ((client, id) => {
  return client.hoc({
    id,
    classes: false,
    styles: {
      wrapper: ({
        inStyle
      }) => `
        ${inStyle}
      `,
      top: ({
        isOpen,
        color
      }) => `
        background: ${color};
        transform: translateY(${isOpen ? 0 : -transY}px) rotateZ(${isOpen ? 45 : 0}deg);
      `,
      middle: ({
        isOpen,
        color
      }) => `
        background: ${color};
        opacity: ${isOpen ? 0 : 1};
      `,
      bottom: ({
        isOpen,
        color
      }) => `
        background: ${color};
        transform: translateY(${isOpen ? 0 : transY}px) rotateZ(${isOpen ? -45 : 0}deg);
      `
    },

    render({
      props,
      classes,
      styles
    }) {
      return client.h("div", {
        style: styles.wrapper(props),
        "class": classes('wrapper'),
        onclick: props.onClick
      }, client.h("div", {
        "class": classes('line'),
        style: styles.top(props)
      }), client.h("div", {
        "class": classes('line'),
        style: styles.middle(props)
      }), client.h("div", {
        "class": classes('line'),
        style: styles.bottom(props)
      }));
    }

  });
});

var YTPlayer = ((client, id) => {
  return client.hoc({
    id,

    mounted(props) {
      const {
        videoId,
        width,
        height,
        Player,
        onPlaying,
        onMounted
      } = props;
      const player = new Player(`#${videoId}`, {
        height: String(height),
        width: String(width)
      });
      player.load(videoId);
      player.on('playing', () => onPlaying(player));
      onMounted(player);
    },

    render({
      props
    }) {
      return client.h("div", {
        id: props.videoId
      });
    }

  });
});



var components = /*#__PURE__*/Object.freeze({
  MenuIcon: MenuIcon,
  YTPlayer: YTPlayer
});

var Header = ((client, id) => {
  return client.hoc({
    id,
    classes: false,
    styles: {
      logo: isMenuOpen => `
        opacity: ${isMenuOpen ? 0 : 1};
        pointer-events: ${isMenuOpen ? 'auto' : 'none'};
        max-height: 50%;
      `
    },

    render({
      props,
      classes,
      styles
    }) {
      return client.h("div", {
        id: 'header',
        "class": classes('header')
      }, client.h("img", {
        src: props.logoSrc,
        style: styles.logo(props.isMenuOpen)
      }));
    }

  });
});

var Menu = ((client, id) => {
  return client.hoc({
    id,
    classes: false,
    styles: {
      menu: isMenuOpen => `
        background: ${client.lib.Colors.GREY_DARK};
        opacity: ${isMenuOpen ? 0.99 : 0};
        pointer-events: ${isMenuOpen ? 'auto' : 'none'};
      `
    },

    render({
      props,
      styles,
      classes
    }) {
      return client.h("div", {
        id: 'menu',
        style: styles.menu(props.isMenuOpen),
        "class": classes('menu')
      }, client.h("img", {
        src: props.logoSrc,
        "class": classes('logo')
      }), props.options.map(item => {
        const {
          className,
          name,
          onclick
        } = item;
        return client.h("div", {
          "class": classes(className),
          onclick: onclick
        }, name);
      }));
    }

  });
});

var Footer$1 = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      classes
    }) {
      return client.h("div", {
        id: 'footer',
        "class": classes('wrapper')
      }, client.lib.Footer.map(item => {
        const {
          type,
          url,
          text,
          className
        } = item;
        if (type === 'image') return client.h("img", {
          src: url,
          "class": classes(className)
        });
        return client.h("div", {
          "class": classes(className)
        }, text);
      }));
    }

  });
});

var Pages = ((client, id) => {
  const {
    Footer
  } = client.ui.fragments;
  return client.hoc({
    id,
    classes: false,
    styles: {
      page: isSelected => `
        opacity: ${isSelected ? 1 : 0};
        pointer-events: ${isSelected ? 'auto' : 'none'};
      `
    },

    render({
      props,
      classes,
      styles
    }) {
      const {
        pages,
        currentPage
      } = props;
      return Object.keys(pages).map(page => {
        const Page = pages[page];
        return client.h("div", {
          "class": classes('scrollable'),
          style: styles.page(page === currentPage),
          "data-route": page
        }, client.h(Page, null), client.h(Footer, null));
      });
    }

  });
});

// Non-dependant fragments

var fragments = /*#__PURE__*/Object.freeze({
  Header: Header,
  Menu: Menu,
  Footer: Footer$1,
  Pages: Pages
});

var Home$1 = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      classes
    }) {
      return client.h("div", {
        id: 'home-wrapper',
        "class": classes('wrapper')
      }, client.lib.Home.map(item => {
        const {
          type,
          url,
          text,
          className
        } = item;
        if (type === 'image') return client.h("img", {
          src: url,
          "class": classes(className)
        });
        return client.h("div", {
          "class": classes(className)
        }, text);
      }));
    }

  });
});

var Agreements$1 = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      classes
    }) {
      return client.h("div", {
        id: 'agreements-wrapper',
        "class": classes('wrapper')
      }, client.lib.Agreements.map(item => {
        const {
          type,
          url,
          text,
          className
        } = item;
        if (type === 'image') return client.h("img", {
          src: url,
          "class": classes(className)
        });
        return client.h("div", {
          "class": classes(className)
        }, text);
      }));
    }

  });
});

var Faq$1 = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      classes
    }) {
      return client.h("div", {
        id: 'faq-wrapper',
        "class": classes('wrapper')
      }, client.lib.Faq.map((item, i) => {
        const {
          text,
          className
        } = item;
        return client.h("div", {
          id: `faq-${i}`,
          "class": classes(className)
        }, text);
      }));
    }

  });
});

var domain; // This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).

function EventHandlers() {}

EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}
// require('events') === require('events').EventEmitter

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.usingDomains = false;
EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function () {
  this.domain = null;

  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active && !(this instanceof domain.Domain)) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
}; // These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.


function emitNone(handler, isFn, self) {
  if (isFn) handler.call(self);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) listeners[i].call(self);
  }
}

function emitOne(handler, isFn, self, arg1) {
  if (isFn) handler.call(self, arg1);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
  }
}

function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn) handler.call(self, arg1, arg2);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
  }
}

function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn) handler.call(self, arg1, arg2, arg3);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn) handler.apply(self, args);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = type === 'error';
  events = this._events;
  if (events) doError = doError && events.error == null;else if (!doError) return false;
  domain = this.domain; // If there is no 'error' event listener then throw.

  if (doError) {
    er = arguments[1];

    if (domain) {
      if (!er) er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }

    return false;
  }

  handler = events[type];
  if (!handler) return false;
  var isFn = typeof handler === 'function';
  len = arguments.length;

  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;

    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;

    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;

    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower

    default:
      args = new Array(len - 1);

      for (i = 1; i < len; i++) args[i - 1] = arguments[i];

      emitMany(handler, isFn, this, args);
  }
  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  events = target._events;

  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    } // Check for listener leak


    if (!existing.warned) {
      m = $getMaxListeners(target);

      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}

function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function _onceWrap(target, type, listener) {
  var fired = false;

  function g() {
    target.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }

  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // emits a 'removeListener' event iff the listener was removed


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  events = this._events;
  if (!events) return this;
  list = events[type];
  if (!list) return this;

  if (list === listener || list.listener && list.listener === listener) {
    if (--this._eventsCount === 0) this._events = new EventHandlers();else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list[0] = undefined;

      if (--this._eventsCount === 0) {
        this._events = new EventHandlers();
        return this;
      } else {
        delete events[type];
      }
    } else {
      spliceOne(list, position);
    }

    if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events;
  events = this._events;
  if (!events) return this; // not listening for removeListener, no need to emit

  if (!events.removeListener) {
    if (arguments.length === 0) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    } else if (events[type]) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);

    for (var i = 0, key; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = new EventHandlers();
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    do {
      this.removeListener(type, listeners[listeners.length - 1]);
    } while (listeners[0]);
  }

  return this;
};

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;
  if (!events) ret = [];else {
    evlistener = events[type];
    if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
  }
  return ret;
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
}; // About 1.5x faster than the two-arg version of Array#splice().


function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];

  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);

  while (i--) copy[i] = arr[i];

  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

var loadScript2 = load;

function load(src, cb) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;

  if (cb) {
    script.onload = function () {
      script.onerror = script.onload = null;
      cb(null, script);
    };

    script.onerror = function () {
      script.onerror = script.onload = null;
      cb(new Error('Failed to load ' + src), script);
    };
  }

  head.appendChild(script);
}

const EventEmitter$1 = EventEmitter.EventEmitter;



const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';
const YOUTUBE_STATES = {
  '-1': 'unstarted',
  '0': 'ended',
  '1': 'playing',
  '2': 'paused',
  '3': 'buffering',
  '5': 'cued'
};
const YOUTUBE_ERROR = {
  // The request contains an invalid parameter value. For example, this error
  // occurs if you specify a videoId that does not have 11 characters, or if the
  // videoId contains invalid characters, such as exclamation points or asterisks.
  INVALID_PARAM: 2,
  // The requested content cannot be played in an HTML5 player or another error
  // related to the HTML5 player has occurred.
  HTML5_ERROR: 5,
  // The video requested was not found. This error occurs when a video has been
  // removed (for any reason) or has been marked as private.
  NOT_FOUND: 100,
  // The owner of the requested video does not allow it to be played in embedded
  // players.
  UNPLAYABLE_1: 101,
  // This error is the same as 101. It's just a 101 error in disguise!
  UNPLAYABLE_2: 150
};
const loadIframeAPICallbacks = [];
/**
 * YouTube Player. Exposes a better API, with nicer events.
 * @param {HTMLElement|selector} element
 */

class YouTubePlayer extends EventEmitter$1 {
  constructor(element, opts) {
    super();
    const elem = typeof element === 'string' ? document.querySelector(element) : element;

    if (elem.id) {
      this._id = elem.id; // use existing element id
    } else {
      this._id = elem.id = 'ytplayer-' + Math.random().toString(16).slice(2, 8);
    }

    this._opts = Object.assign({
      width: 640,
      height: 360,
      autoplay: false,
      captions: undefined,
      controls: true,
      keyboard: true,
      fullscreen: true,
      annotations: true,
      modestBranding: false,
      related: true,
      info: true,
      timeupdateFrequency: 1000
    }, opts);
    this.videoId = null;
    this.destroyed = false;
    this._api = null;
    this._autoplay = false; // autoplay the first video?

    this._player = null;
    this._ready = false; // is player ready?

    this._queue = [];
    this._interval = null; // Setup listeners for 'timeupdate' events. The YouTube Player does not fire
    // 'timeupdate' events, so they are simulated using a setInterval().

    this._startInterval = this._startInterval.bind(this);
    this._stopInterval = this._stopInterval.bind(this);
    this.on('unstarted', this._stopInterval);
    this.on('ended', this._stopInterval);
    this.on('playing', this._startInterval);
    this.on('paused', this._stopInterval);
    this.on('buffering', this._stopInterval);

    this._loadIframeAPI((err, api) => {
      if (err) return this._destroy(new Error('YouTube Iframe API failed to load'));
      this._api = api; // If load(videoId, [autoplay]) was called before Iframe API loaded, ensure it gets
      // called again now

      if (this.videoId) this.load(this.videoId, this._autoplay);
    });
  }

  load(videoId, autoplay = false) {
    if (this.destroyed) return;
    this.videoId = videoId;
    this._autoplay = autoplay; // If the Iframe API is not ready yet, do nothing. Once the Iframe API is
    // ready, `load(this.videoId)` will be called.

    if (!this._api) return; // If there is no player instance, create one.

    if (!this._player) {
      this._createPlayer(videoId);

      return;
    } // If the player instance is not ready yet, do nothing. Once the player
    // instance is ready, `load(this.videoId)` will be called. This ensures that
    // the last call to `load()` is the one that takes effect.


    if (!this._ready) return; // If the player instance is ready, load the given `videoId`.

    if (autoplay) {
      this._player.loadVideoById(videoId);
    } else {
      this._player.cueVideoById(videoId);
    }
  }

  play() {
    if (this._ready) this._player.playVideo();else this._queueCommand('play');
  }

  pause() {
    if (this._ready) this._player.pauseVideo();else this._queueCommand('pause');
  }

  stop() {
    if (this._ready) this._player.stopVideo();else this._queueCommand('stop');
  }

  seek(seconds) {
    if (this._ready) this._player.seekTo(seconds, true);else this._queueCommand('seek', seconds);
  }

  setVolume(volume) {
    if (this._ready) this._player.setVolume(volume);else this._queueCommand('setVolume', volume);
  }

  getVolume() {
    return this._ready && this._player.getVolume() || 0;
  }

  mute() {
    if (this._ready) this._player.mute();else this._queueCommand('mute');
  }

  unMute() {
    if (this._ready) this._player.unMute();else this._queueCommand('unMute');
  }

  isMuted() {
    return this._ready && this._player.isMuted() || false;
  }

  setSize(width, height) {
    if (this._ready) this._player.setSize(width, height);else this._queueCommand('setSize', width, height);
  }

  setPlaybackRate(rate) {
    if (this._ready) this._player.setPlaybackRate(rate);else this._queueCommand('setPlaybackRate', rate);
  }

  getPlaybackRate() {
    return this._ready && this._player.getPlaybackRate() || 1;
  }

  getAvailablePlaybackRates() {
    return this._ready && this._player.getAvailablePlaybackRates() || [1];
  }

  getDuration() {
    return this._ready && this._player.getDuration() || 0;
  }

  getProgress() {
    return this._ready && this._player.getVideoLoadedFraction() || 0;
  }

  getState() {
    return this._ready && YOUTUBE_STATES[this._player.getPlayerState()] || 'unstarted';
  }

  getCurrentTime() {
    return this._ready && this._player.getCurrentTime() || 0;
  }

  destroy() {
    this._destroy();
  }

  _destroy(err) {
    if (this.destroyed) return;
    this.destroyed = true;

    if (this._player) {
      this._player.stopVideo();

      this._player.destroy();
    }

    this.videoId = null;
    this._id = null;
    this._opts = null;
    this._api = null;
    this._player = null;
    this._ready = false;
    this._queue = null;

    this._stopInterval();

    this._interval = false;
    this.removeListener('playing', this._startInterval);
    this.removeListener('paused', this._stopInterval);
    this.removeListener('buffering', this._stopInterval);
    this.removeListener('unstarted', this._stopInterval);
    this.removeListener('ended', this._stopInterval);
    if (err) this.emit('error', err);
  }

  _queueCommand(command, ...args) {
    if (this.destroyed) return;

    this._queue.push([command, args]);
  }

  _flushQueue() {
    while (this._queue.length) {
      const command = this._queue.shift();

      this[command[0]].apply(this, command[1]);
    }
  }

  _loadIframeAPI(cb) {
    // If API is loaded, there is nothing else to do
    if (window.YT && typeof window.YT.Player === 'function') {
      return cb(null, window.YT);
    } // Otherwise, queue callback until API is loaded


    loadIframeAPICallbacks.push(cb);
    const scripts = Array.from(document.getElementsByTagName('script'));
    const isLoading = scripts.some(script => script.src === YOUTUBE_IFRAME_API_SRC); // If API <script> tag is not present in the page, inject it. Ensures that
    // if user includes a hardcoded <script> tag in HTML for performance, another
    // one will not be added

    if (!isLoading) {
      loadScript2(YOUTUBE_IFRAME_API_SRC, err => {
        if (!err) return;

        while (loadIframeAPICallbacks.length) {
          const loadCb = loadIframeAPICallbacks.shift();
          loadCb(err);
        }
      });
    } // If ready function is not present, create it


    if (typeof window.onYouTubeIframeAPIReady !== 'function') {
      window.onYouTubeIframeAPIReady = () => {
        while (loadIframeAPICallbacks.length) {
          const loadCb = loadIframeAPICallbacks.shift();
          loadCb(null, window.YT);
        }
      };
    }
  }

  _createPlayer(videoId) {
    if (this.destroyed) return;
    const opts = this._opts;
    this._player = new this._api.Player(this._id, {
      width: opts.width,
      height: opts.height,
      videoId: videoId,
      playerVars: {
        // This parameter specifies whether the initial video will automatically
        // start to play when the player loads. Supported values are 0 or 1. The
        // default value is 0.
        autoplay: opts.autoplay ? 1 : 0,
        // Setting the parameter's value to 1 causes closed captions to be shown
        // by default, even if the user has turned captions off. The default
        // behavior is based on user preference.
        cc_load_policy: opts.captions != null ? opts.captions ? 1 : 0 : undefined,
        // default to not setting this option
        // This parameter indicates whether the video player controls are
        // displayed. For IFrame embeds that load a Flash player, it also defines
        // when the controls display in the player as well as when the player
        // will load. Supported values are:
        //   - controls=0 – Player controls do not display in the player. For
        //                  IFrame embeds, the Flash player loads immediately.
        //   - controls=1 – (default) Player controls display in the player. For
        //                  IFrame embeds, the controls display immediately and
        //                  the Flash player also loads immediately.
        //   - controls=2 – Player controls display in the player. For IFrame
        //                  embeds, the controls display and the Flash player
        //                  loads after the user initiates the video playback.
        controls: opts.controls ? 2 : 0,
        // Setting the parameter's value to 1 causes the player to not respond to
        // keyboard controls. The default value is 0, which means that keyboard
        // controls are enabled.
        disablekb: opts.keyboard ? 0 : 1,
        // Setting the parameter's value to 1 enables the player to be
        // controlled via IFrame or JavaScript Player API calls. The default
        // value is 0, which means that the player cannot be controlled using
        // those APIs.
        enablejsapi: 1,
        // Setting this parameter to 0 prevents the fullscreen button from
        // displaying in the player. The default value is 1, which causes the
        // fullscreen button to display.
        fs: opts.fullscreen ? 1 : 0,
        // Setting the parameter's value to 1 causes video annotations to be
        // shown by default, whereas setting to 3 causes video annotations to not
        // be shown by default. The default value is 1.
        iv_load_policy: opts.annotations ? 1 : 3,
        // This parameter lets you use a YouTube player that does not show a
        // YouTube logo. Set the parameter value to 1 to prevent the YouTube logo
        // from displaying in the control bar. Note that a small YouTube text
        // label will still display in the upper-right corner of a paused video
        // when the user's mouse pointer hovers over the player.
        modestbranding: opts.modestBranding ? 1 : 0,
        // This parameter provides an extra security measure for the IFrame API
        // and is only supported for IFrame embeds. If you are using the IFrame
        // API, which means you are setting the enablejsapi parameter value to 1,
        // you should always specify your domain as the origin parameter value.
        origin: window.location.origin,
        // This parameter controls whether videos play inline or fullscreen in an
        // HTML5 player on iOS. Valid values are:
        //   - 0: This value causes fullscreen playback. This is currently the
        //        default value, though the default is subject to change.
        //   - 1: This value causes inline playback for UIWebViews created with
        //        the allowsInlineMediaPlayback property set to TRUE.
        playsinline: 1,
        // This parameter indicates whether the player should show related videos
        // when playback of the initial video ends. Supported values are 0 and 1.
        // The default value is 1.
        rel: opts.related ? 1 : 0,
        // Supported values are 0 and 1. Setting the parameter's value to 0
        // causes the player to not display information like the video title and
        // uploader before the video starts playing. If the player is loading a
        // playlist, and you explicitly set the parameter value to 1, then, upon
        // loading, the player will also display thumbnail images for the videos
        // in the playlist. Note that this functionality is only supported for
        // the AS3 player.
        showinfo: opts.info ? 1 : 0,
        // (Not part of documented API) Allow html elements with higher z-index
        // to be shown on top of the YouTube player.
        wmode: 'opaque'
      },
      events: {
        onReady: () => this._onReady(videoId),
        onStateChange: data => this._onStateChange(data),
        onPlaybackQualityChange: data => this._onPlaybackQualityChange(data),
        onPlaybackRateChange: data => this._onPlaybackRateChange(data),
        onError: data => this._onError(data)
      }
    });
  }
  /**
   * This event fires when the player has finished loading and is ready to begin
   * receiving API calls.
   */


  _onReady(videoId) {
    if (this.destroyed) return;
    this._ready = true; // Once the player is ready, always call `load(videoId, [autoplay])` to handle
    // these possible cases:
    //
    //   1. `load(videoId, true)` was called before the player was ready. Ensure that
    //      the selected video starts to play.
    //
    //   2. `load(videoId, false)` was called before the player was ready. Now the
    //      player is ready and there's nothing to do.
    //
    //   3. `load(videoId, [autoplay])` was called multiple times before the player
    //      was ready. Therefore, the player was initialized with the wrong videoId,
    //      so load the latest videoId and potentially autoplay it.

    this.load(this.videoId, this._autoplay);

    this._flushQueue();
  }
  /**
   * Called when the player's state changes. We emit friendly events so the user
   * doesn't need to use YouTube's YT.PlayerState.* event constants.
   */


  _onStateChange(data) {
    if (this.destroyed) return;
    const state = YOUTUBE_STATES[data.data];

    if (state) {
      // Send a 'timeupdate' anytime the state changes. When the video halts for any
      // reason ('paused', 'buffering', or 'ended') no further 'timeupdate' events
      // should fire until the video unhalts.
      if (['paused', 'buffering', 'ended'].includes(state)) this._onTimeupdate();
      this.emit(state); // When the video changes ('unstarted' or 'cued') or starts ('playing') then a
      // 'timeupdate' should follow afterwards (never before!) to reset the time.

      if (['unstarted', 'playing', 'cued'].includes(state)) this._onTimeupdate();
    } else {
      throw new Error('Unrecognized state change: ' + data);
    }
  }
  /**
   * This event fires whenever the video playback quality changes. Possible
   * values are: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'.
   */


  _onPlaybackQualityChange(data) {
    if (this.destroyed) return;
    this.emit('playbackQualityChange', data.data);
  }
  /**
   * This event fires whenever the video playback rate changes.
   */


  _onPlaybackRateChange(data) {
    if (this.destroyed) return;
    this.emit('playbackRateChange', data.data);
  }
  /**
   * This event fires if an error occurs in the player.
   */


  _onError(data) {
    if (this.destroyed) return;
    const code = data.data; // The HTML5_ERROR error occurs when the YouTube player needs to switch from
    // HTML5 to Flash to show an ad. Ignore it.

    if (code === YOUTUBE_ERROR.HTML5_ERROR) return; // The remaining error types occur when the YouTube player cannot play the
    // given video. This is not a fatal error. Report it as unplayable so the user
    // has an opportunity to play another video.

    if (code === YOUTUBE_ERROR.UNPLAYABLE_1 || code === YOUTUBE_ERROR.UNPLAYABLE_2 || code === YOUTUBE_ERROR.NOT_FOUND || code === YOUTUBE_ERROR.INVALID_PARAM) {
      return this.emit('unplayable', this.videoId);
    } // Unexpected error, does not match any known type


    this._destroy(new Error('YouTube Player Error. Unknown error code: ' + code));
  }
  /**
   * This event fires when the time indicated by the `getCurrentTime()` method
   * has been updated.
   */


  _onTimeupdate() {
    this.emit('timeupdate', this.getCurrentTime());
  }

  _startInterval() {
    this._interval = setInterval(() => this._onTimeupdate(), this._opts.timeupdateFrequency);
  }

  _stopInterval() {
    clearInterval(this._interval);
    this._interval = null;
  }

}

var ytPlayer = YouTubePlayer;

const ratio = 315 / 560;
var Help$1 = ((client, id) => {
  const {
    YTPlayer
  } = client.ui.components;
  return client.hoc({
    id,
    classes: false,

    state() {
      const div = document.getElementById('help-wrapper');
      return {
        width: div ? div.getBoundingClientRect().width : 0
      };
    },

    actions(props, store) {
      return {
        onPlaying: player => {
          store.get('youtubeVideos').forEach(video => {
            // Stop other videos playing
            const isSameVideo = video.videoId === player.videoId;
            if (video.getState() === 'playing' && !isSameVideo) video.stop();
          });
        },
        onMounted: player => {
          store.set({
            youtubeVideos: prevVideos => [...prevVideos, player]
          });
        }
      };
    },

    render({
      state,
      classes,
      actions
    }) {
      return client.h("div", {
        id: 'help-wrapper'
      }, client.lib.Help.YoutubeVideos.map(video => {
        return client.h("div", null, client.h("div", {
          "class": classes('name')
        }, video.name), client.h(YTPlayer, {
          Player: ytPlayer,
          videoId: video.src,
          width: state.width,
          height: Math.floor(state.width * ratio),
          onPlaying: actions.onPlaying,
          onMounted: actions.onMounted
        }));
      }));
    }

  });
});



var pages = /*#__PURE__*/Object.freeze({
  Home: Home$1,
  Agreements: Agreements$1,
  Faq: Faq$1,
  Help: Help$1
});

var rootComponent = ((client, id) => {
  const {
    RootControl
  } = client.lib;
  const {
    MenuIcon
  } = client.ui.components;
  const {
    Pages,
    Header,
    Menu
  } = client.ui.fragments;
  const {
    Home,
    Agreements,
    Faq,
    Help
  } = client.ui.pages;
  return client.hoc({
    id,

    state(props, store) {
      return {
        currentPage: store.get('currentPage') || props.currentPage,
        isMenuOpen: store.get('isMenuOpen'),
        menuOptions: RootControl(store).menuOptions
      };
    },

    actions(props, store) {
      return {
        onClickMenu: () => {
          store.toggle('isMenuOpen');
        }
      };
    },

    classes: false,

    render({
      actions,
      state,
      classes
    }) {
      const {
        onClickMenu
      } = actions;
      const {
        currentPage,
        isMenuOpen,
        menuOptions
      } = state;
      return client.h("div", {
        id: 'root',
        "class": classes('root')
      }, client.h(MenuIcon, {
        isOpen: isMenuOpen,
        onClick: onClickMenu,
        color: 'white',
        inStyle: 'left: 12px; top: 12px;'
      }), client.h(Header, {
        isMenuOpen: isMenuOpen,
        logoSrc: client.lib.Paths.LOGO_LIGHT
      }), client.h(Menu, {
        isMenuOpen: isMenuOpen,
        logoSrc: client.lib.Paths.LOGO_LIGHT,
        options: menuOptions
      }), client.h(Pages, {
        currentPage: currentPage,
        pages: {
          home: Home,
          agreements: Agreements,
          faq: Faq,
          help: Help
        }
      }));
    }

  });
});

var config = {
  store,
  lib,
  components,
  fragments,
  pages,
  rootComponent,
  moduleName: 'www',
  rootNodeId: 'root'
};

const main = (client, isBrowser) => client.init(config, isBrowser);

export { main };
