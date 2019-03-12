// export { default as changeRoute } from './changeRoute';
const dummyAction = null;

var actions = /*#__PURE__*/Object.freeze({
  dummyAction: dummyAction
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
    // Map
    'currentDevicePosition.lat': 0,
    'currentDevicePosition.lng': 0
  }
};

const Keys = {
  FACEBOOK_APP_ID: '244489929820595',
  GOOGLEMAPS_API_KEY: 'AIzaSyAw0yfR8HmByczJ1Ic1pjCKCGICTYdiII4'
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
    }
  };

  const onGoHome = () => {
    store.toggle('isMenuOpen');
    store.route('home');
  };

  return {
    menuOptions: [{
      name: 'Iniciar Sesión',
      className: 'link',
      onclick: () => onMenuNav('signin')
    }, {
      name: 'Crear una cuenta',
      className: 'link',
      onclick: () => onMenuNav('signup')
    }, {
      name: 'Recuperar Password',
      className: 'link',
      onclick: () => onMenuNav('forgot')
    }, {
      name: 'Home',
      className: 'link',
      onclick: onGoHome
    }]
  };
};

// export const IconsSVGs = {

var lib = /*#__PURE__*/Object.freeze({
  Keys: Keys,
  Paths: Paths,
  Colors: Colors,
  Sizes: Sizes,
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

var GoogleMaps = ((client, id) => {
  const initialLatLon = {
    lat: -33.4,
    lng: -70.5
  };
  return client.hoc({
    id,

    mounted(props, store) {
      window.initMap = () => {
        const mapWrapper = document.getElementById('map-wrapper');
        store.values.mapObject = new window.google.maps.Map(mapWrapper, {
          center: initialLatLon,
          zoom: 16,
          disableDefaultUI: true,
          clickableIcons: false,
          styles: [{
            featureType: 'poi.business',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{
              visibility: 'off'
            }]
          }]
        });
        window.navigator.geolocation.getCurrentPosition(position => {
          const {
            latitude,
            longitude
          } = position.coords;
          store.set({
            'currentDevicePosition.lat': latitude,
            'currentDevicePosition.lng': longitude
          });
          store.values.mapObject.setCenter({
            lat: latitude,
            lng: longitude
          });
        });
      };

      const url = `https://maps.googleapis.com/maps/api/js?key=${props.key}&callback=initMap`;
      client.createScript('googlemaps-script', url);
    },

    classes: false,

    render({
      classes,
      actions
    }) {
      return client.h("div", {
        id: 'map-wrapper',
        "class": classes('map'),
        "data-skip-morph": true
      });
    }

  });
});

var MapMarker = ((client, id) => {
  return client.hoc({
    id,

    actions(props, store) {
      return {
        onclick: () => {}
      };
    },

    mounted(props, store) {
      window.initMap = () => {
        const mapWrapper = document.getElementById('map-wrapper');
        store.values.mapObject = new window.google.maps.Map(mapWrapper, {
          center: initialLatLon,
          zoom: 16,
          disableDefaultUI: true
        });
        window.navigator.geolocation.getCurrentPosition(position => {
          const {
            latitude,
            longitude
          } = position.coords;
          store.values.mapObject.setCenter({
            lat: latitude,
            lng: longitude
          });
        });
      };

      const url = `https://maps.googleapis.com/maps/api/js?key=${props.key}&callback=initMap`;
      client.createScript('googlemaps-script', url);
    },

    classes: false,

    render({
      props,
      classes,
      actions
    }) {
      return client.h("div", {
        id: 'map-wrapper',
        "class": classes('map'),
        onclick: actions.onclick
      });
    }

  });
});

// Root Components

var components = /*#__PURE__*/Object.freeze({
  MenuIcon: MenuIcon,
  GoogleMaps: GoogleMaps,
  MapMarker: MapMarker
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

var Pages = ((client, id) => {
  return client.hoc({
    id,
    styles: {
      page: isSelected => `
        transition: opacity .3s ease;
        opacity: ${isSelected ? 1 : 0};
        pointer-events: ${isSelected ? 'auto' : 'none'};
        position: absolute;
        width: 100%;
      `
    },

    render({
      props,
      styles
    }) {
      const {
        pages,
        currentPage
      } = props;
      return Object.keys(pages).map(page => {
        const Page = pages[page];
        return client.h("div", {
          style: styles.page(page === currentPage)
        }, client.h(Page, null));
      });
    }

  });
});

// export { default as Alerts} from './Alerts';

var fragments = /*#__PURE__*/Object.freeze({
  Header: Header,
  Menu: Menu,
  Pages: Pages
});

var App = ((client, id) => {
  const {
    GoogleMaps
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        currentPage: store.get('currentPage')
      };
    },

    styles: {
      app: isVisible => `
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        height: 100%;
        transition: all .6s ease-out;
        overflow: hidden;
        background: hsl(240, 39%, 92%);
        opacity: ${isVisible ? 1 : 0};
        pointer-events: ${isVisible ? 'auto' : 'none'};
      `
    },

    render({
      styles,
      state
    }) {
      return client.h("div", null, client.h(GoogleMaps, {
        key: client.lib.Keys.GOOGLEMAPS_API_KEY
      }));
    }

  });
});



var pages = /*#__PURE__*/Object.freeze({
  App: App
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
    App
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
          app: App
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
  moduleName: 'app',
  rootNodeId: 'root'
};

const main = (client, isBrowser) => client.init(config, isBrowser);

export { main };
