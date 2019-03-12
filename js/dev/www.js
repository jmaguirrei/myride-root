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

// export { default as Help } from './<Help>/Help';

var pages = /*#__PURE__*/Object.freeze({
  Home: Home$1,
  Agreements: Agreements$1,
  Faq: Faq$1
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
    Faq
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
        "class": classes('root', 'safe-area')
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
          faq: Faq // help: Help,

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
