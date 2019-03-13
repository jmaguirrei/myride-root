var forgotEmailPassword = (store => () => {
  const language = store.get('language');
  const email = store.get('forgot.email').toLowerCase();
  return {
    steps: [() => {
      store.set({
        'forgot.buttonPressed': true
      });
      return store.callServer('isEmailRegistered', {
        email
      });
    }, res => {
      if (!res.isRegistered && !res.isFBRegistered) {
        const error = 'EMAIL_IS_NOT_REGISTERED';
        store.addAlert({
          name: error,
          timeout: 4000
        });
        store.set({
          'forgot.buttonPressed': false
        });
        return {
          error
        };
      }

      store.set({
        user_id: res._id,
        'forgot.currentStep': 1,
        'forgot.buttonPressed': false
      });
      return store.callServer('sendTokenEmail', {
        email,
        language,
        tokenField: 'forgotToken'
      });
    }]
  };
});

var forgotToken = (store => () => {
  const email = store.get('signin.email');
  const password = store.get('forgot.password');
  const token = store.get('forgot.tokenDigits');
  return {
    steps: [() => {
      store.set({
        'forgot.buttonPressed': true
      });
      return store.callServer('setNewPassword', {
        email,
        password,
        token,
        tokenField: 'forgotToken'
      });
    }, res => {
      if (res.error) {
        store.set({
          'forgot.tokenDigits': '',
          'forgot.buttonPressed': false
        });
        return store.addAlert({
          name: res.error,
          timeout: 4000
        });
      }

      return store.set({
        'forgot.currentStep': 2,
        'forgot.password': '',
        'forgot.tokenDigits': '',
        'forgot.buttonPressed': false
      });
    }]
  };
});

var signinEmailPassword = (store => () => {
  const email = store.get('signin.email').toLowerCase();
  const password = store.get('signin.password');
  return {
    steps: [() => {
      store.set({
        'signin.buttonPressed': true
      });
      return store.callServer('isEmailRegistered', {
        email
      });
    }, res => {
      if (!res.isRegistered && !res.isFBRegistered) {
        const error = 'EMAIL_IS_NOT_REGISTERED';
        store.addAlert({
          name: error,
          timeout: 4000
        });
        return {
          error
        };
      }

      return store.callServer('isPasswordCorrect', {
        email,
        password
      });
    }, res => {
      store.set({
        'signin.buttonPressed': false
      });
      if (res.error) return store.addAlert({
        name: res.error,
        timeout: 4000
      });
      return store.route('app', `?user=${res._id}`);
    }]
  };
});

var signinWithFacebook = (store => ({
  email
}) => {
  // const language = store.get('language');
  return {
    steps: [() => {
      return store.callServer('signinWithFacebook', {
        email
      });
    }, res => {
      if (res.error) {
        store.addAlert({
          name: res.error,
          timeout: 4000
        });
        return {
          error: res.error
        };
      }

      return store.route('app', `?user=${res._id}`);
    }]
  };
});

var signupEmailPassword = (store => () => {
  const language = store.get('language');
  const name = store.get('signup.name');
  const email = store.get('signup.email').toLowerCase();

  const _id = store.uid();

  return {
    steps: [() => {
      store.set({
        'signup.buttonPressed': true
      });
      return store.callServer('isEmailRegistered', {
        email
      });
    }, res => {
      if (res.isRegistered || res.isFBRegistered) {
        const error = res.isRegistered ? 'EMAIL_ALREADY_REGISTERED' : 'ALREADY_FB_REGISTERED';
        store.addAlert({
          name: error,
          timeout: 4000
        });
        return {
          error
        };
      }

      return store.callServer('createUserEntity', {
        _id,
        name,
        email
      });
    }, () => {
      store.set({
        user_id: _id,
        'signup.currentStep': 1,
        'signup.buttonPressed': false
      });
      return store.callServer('sendTokenEmail', {
        email,
        language,
        tokenField: 'signupToken'
      });
    }]
  };
});

var signupToken = (store => () => {
  const _id = store.get('user_id');

  const password = store.get('signup.password');
  const token = store.get('signup.tokenDigits');
  return {
    steps: [() => store.callServer('signupFinishRegistration', {
      _id,
      password,
      token
    }), res => {
      store.set({
        'signup.tokenDigits': '',
        'signup.buttonPressed': false
      });
      if (res.error) return store.addAlert({
        name: res.error,
        timeout: 4000
      });
      return store.set({
        'signup.currentStep': 2,
        'signup.name': '',
        'signup.email': '',
        'signup.password': ''
      });
    }]
  };
});

var signupWithFacebook = (store => ({
  facebookUserId,
  name,
  email,
  picture
}) => {
  const language = store.get('language');
  return {
    steps: [() => {
      return store.callServer('signupWithFacebook', {
        language,
        name,
        email,
        facebookUserId,
        facebookUserPic: picture
      });
    }, res => {
      return store.route('app', `?user=${res._id}`);
    }]
  };
});



var actions = /*#__PURE__*/Object.freeze({
  forgotEmailPassword: forgotEmailPassword,
  forgotToken: forgotToken,
  signinEmailPassword: signinEmailPassword,
  signinWithFacebook: signinWithFacebook,
  signupEmailPassword: signupEmailPassword,
  signupToken: signupToken,
  signupWithFacebook: signupWithFacebook
});

const MIN_LENGTH = 5;
const name = str => {
  const result = str.trim().length >= MIN_LENGTH;
  return {
    result,
    message: result ? null : {
      en: `Name must have at least ${MIN_LENGTH} characters`,
      es: `El nombre debe tener al menos ${MIN_LENGTH} caracteres`
    }
  };
};

const REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = str => {
  const result = REGEX.test(str);
  return {
    result,
    message: result ? null : {
      en: 'The email is not valid',
      es: 'El email no es válido'
    }
  };
};

const MIN_LENGTH$1 = 8;
const password = str => {
  const noSpaces = /^\S+$/.test(str);

  if (str.length === 0) {
    return {
      result: false,
      message: {
        en: 'Password is required',
        es: 'Se require la contraseña'
      }
    };
  }

  if (!noSpaces) {
    return {
      result: false,
      message: {
        en: 'Password can\'t contain white spaces',
        es: 'La contraseña no puede contener espacios'
      }
    };
  }

  const result = str.length >= MIN_LENGTH$1;
  return {
    result,
    message: result ? null : {
      en: `Password must have at least ${MIN_LENGTH$1} characters`,
      es: `La contraseña debe tener al menos ${MIN_LENGTH$1} caracteres`
    }
  };
};

const LENGTH = 6;
const token = str => {
  const result = str.length === LENGTH;
  return {
    result,
    message: result ? null : {
      en: `Token must have ${LENGTH} digits`,
      es: `El token debe tener ${LENGTH} dígitos`
    }
  };
};

/*  Standard checks fields need to pass before proceeding further*/

var checks = /*#__PURE__*/Object.freeze({
  name: name,
  email: email,
  password: password,
  token: token
});

const EMAIL_ALREADY_REGISTERED = {
  en: 'Email is already registered',
  es: 'Este email ya está registrado'
};
const ALREADY_FB_REGISTERED = {
  en: 'Already registered with Facebook',
  es: 'Ya estás registrado con Facebook'
};
const INVALID_SIGNUP_TOKEN = {
  en: 'Code is not correct',
  es: 'Código incorrecto'
};
const INVALID_FORGOT_TOKEN = {
  en: 'Code is not correct',
  es: 'Código incorrecto'
};
const EMAIL_IS_NOT_REGISTERED = {
  en: 'This email is not registered',
  es: 'Este email no está registrado'
};
const USER_NOT_FB_REGISTERED = {
  en: 'This user is not registered with Facebook',
  es: 'Este usuario no está registrado con Facebook'
};
const PASSWORD_IS_NOT_CORRECT = {
  en: 'Password is not correct',
  es: 'Contraseña incorrecta'
};
const PASSWORD_IS_NOT_DEFINED = {
  en: 'Password is not defined, go to \'Change Password\'',
  es: 'Contraseña no definida, anda a \'Cambio de Password\''
};

var alerts = /*#__PURE__*/Object.freeze({
  EMAIL_ALREADY_REGISTERED: EMAIL_ALREADY_REGISTERED,
  ALREADY_FB_REGISTERED: ALREADY_FB_REGISTERED,
  INVALID_SIGNUP_TOKEN: INVALID_SIGNUP_TOKEN,
  INVALID_FORGOT_TOKEN: INVALID_FORGOT_TOKEN,
  EMAIL_IS_NOT_REGISTERED: EMAIL_IS_NOT_REGISTERED,
  USER_NOT_FB_REGISTERED: USER_NOT_FB_REGISTERED,
  PASSWORD_IS_NOT_CORRECT: PASSWORD_IS_NOT_CORRECT,
  PASSWORD_IS_NOT_DEFINED: PASSWORD_IS_NOT_DEFINED
});

var store = {
  actions,
  checks,
  alerts,
  observables: {
    // Domain properties
    user_id: '',
    language: 'en',

    /*      currentPage      -----------      Start with '' because Root component will be using props.currentPage in SSR      Values: signin, signup, forgot    */
    currentPage: '',
    // Menu
    isMenuOpen: false,
    // signup
    'signup.currentStep': 0,
    // 0: Name, Email, Password, 1: Token
    'signup.name': '',
    'signup.email': '',
    'signup.password': '',
    'signup.password.isVisible': false,
    'signup.tokenDigits': '',
    'signup.buttonPressed': false,
    // signin
    // 'signin.name': '', // used ??
    'signin.email': '',
    'signin.password': '',
    'signin.password.isVisible': false,
    'signin.buttonPressed': false,
    // forgot
    'forgot.currentStep': 0,
    // 0: Password, 1: Token
    'forgot.email': '',
    'forgot.password': '',
    'forgot.password.isVisible': false,
    'forgot.tokenDigits': '',
    'forgot.buttonPressed': false
  }
};

var backspace = `
  <svg viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"></path>
  </svg>
`;

var chevronLeft = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none">
    </path>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z">
    </path>
  </svg>
`;

var chevronRight = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none">
    </path>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z">
    </path>
  </svg>
`;

var eyeOff = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none">
    </path>
    <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z">
    </path>
  </svg>
`;

var eyeOn = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none">
    </path>
    <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z">
    </path>
  </svg>
`;

var facebook = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="white">
    </path>
    <path fill="#3B5998" d="M0,0 L0,24 L12.818,24 L12.818,14.706 L9.689,14.706 L9.689,11.085 L12.818,11.085 L12.818,8.41 C12.818,5.311 14.712,3.625 17.477,3.625 C18.802,3.625 19.941,3.722 20.273,3.766 L20.273,7.006 L18.352,7.006 C16.852,7.006 16.56,7.727 16.56,8.777 L16.56,11.088 L20.144,11.088 L19.679,14.718 L16.56,14.718 L16.56,24 L24,24 L24,0 L0,0 Z">
    </path>
  </svg>
`;

var lockOpen = `
  <svg viewbox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z"/>
    <path d="M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-5h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.75-.14.54.18 1.08.72 1.22.53.14 1.08-.18 1.22-.72C9.44 3.93 10.63 3 12 3c1.65 0 3 1.35 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 11c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v8z"/>
  </svg>
`;

var signin = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12c-2.29.46-4.15 2.29-4.63 4.58C.32 14.57 3.26 18 7 18c2.61 0 4.83-1.67 5.65-4H17v2c0 1.1.9 2 2 2s2-.9 2-2v-2c1.1 0 2-.9 2-2s-.9-2-2-2h-8.35zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
  </svg>
`;

var signup = `
  <svg viewbox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"></path>
  </svg>
`;

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

/* ------------------------------------------------------------------------------------------------===== SIGNIN WORFLOW =====0: EMAIL    isRegistered ?    - false: error    - true: continue1: PASSWORD    - ko: error    - ok: => Dashboard!    - forgot => ===== FORGOT WORFLOW =====-------------------------------------------------------------------------------------------------*/
const SigninControl = store => {
  const language = store.get('language');
  const emailCheck = store.check('email', store.get('signin.email'));
  const password = store.get('signin.password');
  const passwordCheck = store.check('password', password);

  if (emailCheck.result && password.length > 0) {
    store.call('signinEmailPassword');
  } else {
    const checkText = !emailCheck.result ? store.utils.get(emailCheck, `message.${language}`, '') : store.utils.get(passwordCheck, `message.${language}`, '');
    store.addAlert({
      message: checkText,
      timeout: 5000
    });
  }
};

/* ------------------------------------------------------------------------------------------------===== SIGNUP WORFLOW =====0: NAME1: EMAIL    isRegistered ?    - true: error    - false: continue2: PASSWORD    sendEmail (signupToken)3: TOKEN    - ko: error    - ok: isRegistered, setPassword => Welcome!-------------------------------------------------------------------------------------------------*/
const SignupControl = store => {
  const language = store.get('language');
  const currentStep = store.get('signup.currentStep');

  if (currentStep === 0) {
    // Create account
    const nameCheck = store.check('name', store.get('signup.name'));
    const emailCheck = store.check('email', store.get('signup.email'));
    const passwordCheck = store.check('password', store.get('signup.password'));

    if (nameCheck.result && emailCheck.result && passwordCheck.result) {
      store.call('signupEmailPassword');
    } else {
      const checkText = !nameCheck.result ? store.utils.get(nameCheck, `message.${language}`, '') : !emailCheck.result ? store.utils.get(emailCheck, `message.${language}`, '') : store.utils.get(passwordCheck, `message.${language}`, '');
      store.addAlert({
        message: checkText,
        timeout: 5000
      });
    }
  } else if (currentStep === 1) {
    // Validate Token
    const tokenCheck = store.check('token', store.get('signup.tokenDigits'));

    if (tokenCheck.result) {
      store.call('signupToken');
    } else {
      const checkText = store.utils.get(tokenCheck, `message.${language}`, '');
      store.addAlert({
        message: checkText,
        timeout: 5000
      });
    }
  } else {
    store.route('app');
  }
};

/* ------------------------------------------------------------------------------------------------===== FORGOT WORFLOW =====0: EMAIL (prepopulate with signin.email)    isRegistered ?    - false: error    - true: continue1: PASSWORD (new)    sendEmail (forgotToken)3: TOKEN    - ko: error    - ok: setPassword => Dashboard!-------------------------------------------------------------------------------------------------*/
const ForgotControl = store => {
  const language = store.get('language');
  const currentStep = store.get('forgot.currentStep');

  if (currentStep === 0) {
    // Define new password account
    const emailCheck = store.check('email', store.get('forgot.email'));
    const passwordCheck = store.check('password', store.get('forgot.password'));

    if (emailCheck.result && passwordCheck.result) {
      store.call('forgotEmailPassword');
    } else {
      const checkText = !emailCheck.result ? store.utils.get(emailCheck, `message.${language}`, '') : store.utils.get(passwordCheck, `message.${language}`, '');
      store.addAlert({
        message: checkText,
        timeout: 5000
      });
    }
  } else if (currentStep === 1) {
    // Validate Token
    const tokenCheck = store.check('name', store.get('forgot.tokenDigits'));

    if (tokenCheck.result) {
      store.call('forgotToken');
    } else {
      const checkText = store.utils.get(tokenCheck, `message.${language}`, '');
      store.addAlert({
        message: checkText,
        timeout: 5000
      });
    }
  } else {
    store.route('signin');
    store.set({
      currentPage: 'signin'
    }); // Wait 2 secs before changing this state

    store.set({
      'forgot.currentStep': 0
    }, {
      timeout: 2000
    });
  }
};

const IconsSVGs = {
  backspace,
  chevronLeft,
  chevronRight,
  eyeOff,
  eyeOn,
  facebook,
  lockOpen,
  signin,
  signup
};

var lib = /*#__PURE__*/Object.freeze({
  IconsSVGs: IconsSVGs,
  Keys: Keys,
  Paths: Paths,
  Colors: Colors,
  Sizes: Sizes,
  RootControl: RootControl,
  SigninControl: SigninControl,
  SignupControl: SignupControl,
  ForgotControl: ForgotControl
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

var Icons = ((client, id) => {
  const {
    IconsSVGs
  } = client.lib;
  return client.hoc({
    id,

    actions(props) {
      return {
        onClick: () => {
          if (!props.disabled) props.onclick();
        }
      };
    },

    styles: {
      div: (size, disabled, onclick, inStyle) => `
        transition: all .6s ease;
        width: ${size}px;
        height: ${size}px;
        cursor: ${onclick ? 'pointer' : 'auto'};
        opacity: ${disabled ? 0.5 : 1};
        ${inStyle}
      `
    },

    render({
      props,
      styles,
      actions
    }) {
      const {
        icon,
        size = 32,
        disabled = false,
        inStyle = '',
        className = '',
        onclick
      } = props;
      if (!IconsSVGs[icon]) return false;
      return client.h("div", {
        "class": className,
        style: styles.div(size, disabled, onclick, inStyle),
        onclick: actions.onClick,
        __innerHTML: IconsSVGs[icon]
      });
    }

  });
});

var Separator = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      props,
      classes
    }) {
      const {
        text,
        inStyle = ''
      } = props;
      return client.h("div", {
        "class": classes('separator'),
        style: inStyle
      }, client.h("div", {
        "class": classes('line')
      }), client.h("span", {
        "class": classes('text')
      }, text));
    }

  });
});

var Input = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    mounted(props) {
      if (props.autoFocus) {
        const node = document.getElementById(props.id);
        if (node) node.focus();
      }
    },

    actions(props) {
      return {
        onkeydown: e => {
          // Tab pressed
          if (e.keyCode === 9 && props.useTabAsEnter) {
            e.preventDefault();
            props.onEnterPressed();
          }
        },
        onpaste: e => {
          if (props.onTextChanged) {
            // onTextChanged expects an e.target.value object...
            const value = e.clipboardData.getData('text/plain');
            props.onTextChanged({
              target: {
                value
              }
            });
          }
        }
      };
    },

    render({
      props,
      classes,
      actions
    }) {
      const {
        type = 'text',
        placeholder = '',
        value,
        inStyle = '',
        onTextChanged,
        autocomplete
      } = props; // ariaLabel={label}

      return client.h("input", {
        id: props.id,
        type: type,
        placeholder: placeholder,
        value: value,
        autocomplete: autocomplete,
        "class": classes('input'),
        style: inStyle,
        onkeyup: onTextChanged,
        onkeydown: actions.onkeydown,
        onpaste: actions.onpaste
      });
    }

  });
});

var FacebookButton = ((client, id) => {
  const {
    Icons
  } = client.ui.components;

  const apiFB = (path, options) => new Promise((resolve, reject) => {
    window.FB.api(path, 'GET', options, response => {
      if (!response) reject();
      resolve(response);
    });
  });

  const userOptions = {
    fields: 'first_name, last_name, name, email'
  };
  const pictureOptions = {
    width: 720,
    height: 720,
    redirect: false
  };
  return client.hoc({
    id,

    actions(props) {
      return {
        onclick: () => {
          window.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
              apiFB('/me', userOptions).then(userInfo => {
                // const facebookUserId = response.authResponse.userID;
                props.signinWithFacebook({
                  email: userInfo.email
                });
              });
            } else {
              window.FB.login(() => {
                Promise.all([apiFB('/me', userOptions), apiFB('/me/picture', pictureOptions)]).then(res => {
                  const [userInfo, pictureInfo] = res;
                  const {
                    email,
                    name,
                    id: facebookUserId
                  } = userInfo;
                  const {
                    width,
                    height,
                    url
                  } = pictureInfo.data;
                  props.signupWithFacebook({
                    facebookUserId,
                    name,
                    email,
                    picture: {
                      width,
                      height,
                      url
                    }
                  });
                }).catch(console.log);
              }, {
                scope: 'email'
              });
            }
          });
        }
      };
    },

    mounted(props) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: props.facebookAppId,
          cookie: true,
          xfbml: true,
          version: 'v3.2'
        });
        window.FB.AppEvents.logPageView();
      };

      client.createScript('facebook-jssdk', 'https://connect.facebook.net/en_US/sdk.js');
    },

    classes: false,

    render({
      props,
      classes,
      actions
    }) {
      return client.h("div", {
        onclick: actions.onclick,
        "class": classes('wrapper')
      }, client.h(Icons, {
        icon: 'facebook',
        size: 30,
        inStyle: 'position: absolute; right: 12px; bottom: 9px;'
      }), client.h("div", {
        "class": classes('text')
      }, props.text));
    }

  });
});

// Root Components
// export { default as Carrousel } from './Carrousel';
// export { default as Progress } from './Progress';
// export { default as Modal } from './Modal';
// export { default as Token } from './Token';
// Dependent Components
// export { default as Navigation } from './Navigation';
// export { default as NumKeyboard } from './NumKeyboard';

var components = /*#__PURE__*/Object.freeze({
  MenuIcon: MenuIcon,
  Icons: Icons,
  Separator: Separator,
  Input: Input,
  FacebookButton: FacebookButton
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

var Alerts = ((client, id) => {
  return client.hoc({
    id,

    state(props, store) {
      const alert = store.alerts.find(item => item.isVisible);
      return {
        alertText: store.utils.get(alert, 'message', '')
      };
    },

    classes: false,
    styles: {
      alert: isVisible => `
        opacity: ${isVisible ? 1 : 0};
        transform: translateY(${isVisible ? 0 : -100}%);
      `
    },

    render({
      classes,
      styles,
      state,
      utils
    }) {
      return client.h("div", {
        "class": classes('alert'),
        style: styles.alert(state.alertText)
      }, utils.localize(state.alertText));
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
        margin-top: ${client.lib.Sizes.HEADER_HEIGHT};
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

var ForgotPassword = ((client, id) => {
  return client.hoc({
    id,

    actions(props, store) {
      return {
        onclick: () => store.set({
          currentPage: 'forgot'
        })
      };
    },

    classes: false,

    render({
      actions,
      classes,
      utils
    }) {
      return client.h("div", {
        "class": classes('forgot'),
        onclick: actions.onclick
      }, utils.localize({
        en: 'Forgot password?',
        es: '¿Olvidaste tu contraseña?'
      }));
    }

  });
});

var TogglePassword = ((client, id) => {
  const {
    Icons
  } = client.ui.components;
  return client.hoc({
    id,

    actions(props, store) {
      return {
        onclick: () => store.toggle(`${props.page}.password.isVisible`)
      };
    },

    state(props, store) {
      return {
        isPasswordVisible: store.get(`${props.page}.password.isVisible`),
        isIconVisible: store.get(`${props.page}.password`).length > 0
      };
    },

    styles: {
      icon: (isVisible, inStyle) => `
        position: absolute;
        right: 10px;
        opacity: ${isVisible ? 1 : 0};
        pointer-events: ${isVisible ? 'auto' : 'none'};
        ${inStyle}
      `
    },

    render({
      props,
      state,
      actions,
      styles
    }) {
      const {
        isPasswordVisible,
        isIconVisible
      } = state;
      const {
        inStyle = ''
      } = props;
      return client.h(Icons, {
        icon: isPasswordVisible ? 'eyeOff' : 'eyeOn',
        size: 22,
        onclick: isIconVisible ? actions.onclick : () => undefined,
        inStyle: styles.icon(isIconVisible, inStyle)
      });
    }

  });
});



var fragments = /*#__PURE__*/Object.freeze({
  Header: Header,
  Menu: Menu,
  Alerts: Alerts,
  Pages: Pages,
  ForgotPassword: ForgotPassword,
  TogglePassword: TogglePassword
});

var Email = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        email: store.get('forgot.email')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          const email = e.target.value;
          store.set({
            'forgot.email': email
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        email
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h(Input, {
        placeholder: utils.localize({
          en: 'Registered email',
          es: 'Email registrado'
        }),
        value: email,
        onTextChanged: actions.onTextChanged,
        autocomplete: 'email',
        type: 'email',
        autoFocus: true,
        id: 'forgot-email-input'
      }));
    }

  });
});

var Password = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  const {
    TogglePassword
  } = client.ui.fragments;
  return client.hoc({
    id,

    state(props, store) {
      return {
        password: store.get('forgot.password'),
        isPasswordVisible: store.get('forgot.password.isVisible')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          store.set({
            'forgot.password': e.target.value
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        password,
        isPasswordVisible
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h(Input, {
        type: isPasswordVisible ? 'text' : 'password',
        placeholder: utils.localize({
          en: 'New Password',
          es: 'Nueva contraseña'
        }),
        value: password,
        onTextChanged: actions.onTextChanged,
        autocomplete: 'new-password'
      }), client.h(TogglePassword, {
        page: 'forgot',
        inStyle: 'right: 20px'
      }));
    }

  });
});

var Buttons = ((client, id) => {
  const {
    ForgotControl
  } = client.lib;
  return client.hoc({
    id,

    state(props, store) {
      return {
        buttonPressed: store.get('forgot.buttonPressed'),
        currentStep: store.get('forgot.currentStep')
      };
    },

    actions(props, store) {
      return {
        onclick: () => {
          ForgotControl(store);
        }
      };
    },

    styles: {
      button: (pressed, currentStep) => `
        opacity: ${pressed ? 0.5 : 1};
        width: ${currentStep >= 1 ? 70 : 98}%;
      `
    },
    classes: false,

    render({
      classes,
      state,
      actions,
      styles,
      utils
    }) {
      const {
        currentStep,
        buttonPressed
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h("div", {
        "class": classes('button'),
        style: styles.button(buttonPressed, currentStep),
        onclick: actions.onclick
      }, {
        0: utils.localize({
          en: 'Save new password',
          es: 'Guardar nueva contraseña'
        }),
        1: utils.localize({
          en: 'Validate Token',
          es: 'Validar Token'
        }),
        2: utils.localize({
          en: 'Login',
          es: 'Entrar'
        })
      }[currentStep]));
    }

  });
});

var Headline = ((client, id) => {
  const {
    Icons
  } = client.ui.components;
  return client.hoc({
    id,
    classes: false,

    render({
      classes,
      utils
    }) {
      return client.h("div", {
        id: 'forgot-headline',
        "class": classes('container')
      }, client.h(Icons, {
        icon: 'lockOpen',
        size: 30,
        inStyle: `
              position: absolute;
              left: 15px;
              padding: 3px;
              border: 1px solid hsl(0, 0%, 85%);
              border-radius: 7px;
              fill: ${client.lib.Colors.GREEN_SIGNUP};
            `
      }), client.h("div", {
        "class": classes('title')
      }, utils.localize({
        en: 'Create new password',
        es: 'Crear nueva contraseña'
      })));
    }

  });
});

var Token = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        tokenDigits: store.get('forgot.tokenDigits')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          const value = e.target.value;
          if (value.length <= 6) store.set({
            'forgot.tokenDigits': value
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        tokenDigits
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h("div", {
        "class": classes('title')
      }, utils.localize({
        en: 'Enter the code received by email',
        es: 'Ingresa el código recibido por email'
      })), client.h(Input, {
        type: 'tel',
        placeholder: '* * * * * *',
        value: tokenDigits,
        onTextChanged: actions.onTextChanged,
        inStyle: `
              padding: 12px 18px;
              width: 70%;
              font-size: 24px;
              line-height: 24px;
              text-align: center;
            `
      }));
    }

  });
});

var Done = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      classes,
      utils
    }) {
      return client.h("div", {
        "class": classes('wrapper')
      }, utils.localize({
        en: 'Password successfully changed!',
        es: '¡La contraseña fue cambiada con éxito!'
      }));
    }

  });
});

var Forgot = ((client, id) => {
  const {
    Alerts
  } = client.ui.fragments;
  const {
    ForgotEmail,
    ForgotPassword,
    ForgotDone,
    ForgotToken,
    ForgotButtons,
    ForgotHeadline
  } = client.ui.pages;
  return client.hoc({
    id,

    state(props, store) {
      return {
        currentStep: store.get('forgot.currentStep')
      };
    },

    classes: false,
    styles: {
      carrousel: currentStep => `
        width: 300%;
        display: flex;
        transition: all .6s ease;
        transform: translateX(${currentStep * -33.33}%);
      `
    },

    render({
      styles,
      state,
      classes
    }) {
      const {
        currentStep
      } = state;
      return client.h("form", {
        id: 'forgot',
        "class": classes('container')
      }, client.h(Alerts, null), client.h(ForgotHeadline, null), client.h("div", {
        "class": classes('noOverflow')
      }, client.h("div", {
        style: styles.carrousel(currentStep)
      }, client.h("div", {
        id: 'forgot-step-0',
        "class": classes('step')
      }, client.h(ForgotEmail, null), client.h(ForgotPassword, null)), client.h("div", {
        id: 'forgot-step-1',
        "class": classes('step')
      }, client.h(ForgotToken, null)), client.h("div", {
        id: 'forgot-step-2',
        "class": classes('step')
      }, client.h(ForgotDone, null)))), client.h(ForgotButtons, null));
    }

  });
});

var Email$1 = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        email: store.get('signin.email')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          const email = e.target.value;
          store.set({
            'signin.email': email,
            'forgot.email': email
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        email
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h(Input, {
        placeholder: utils.localize({
          en: 'Registered email',
          es: 'Email registrado'
        }),
        value: email,
        onTextChanged: actions.onTextChanged,
        autocomplete: 'email',
        type: 'email',
        autoFocus: true,
        id: 'signin-email-input'
      }));
    }

  });
});

var Password$1 = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  const {
    ForgotPassword,
    TogglePassword
  } = client.ui.fragments;
  return client.hoc({
    id,

    state(props, store) {
      return {
        password: store.get('signin.password'),
        isPasswordVisible: store.get('signin.password.isVisible')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          store.set({
            'signin.password': e.target.value
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions
    }) {
      const {
        password,
        isPasswordVisible
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h("div", {
        "class": classes('inputWrapper')
      }, client.h(Input, {
        type: isPasswordVisible ? 'text' : 'password',
        placeholder: 'Password',
        value: password,
        onTextChanged: actions.onTextChanged,
        autocomplete: 'current-password'
      }), client.h(TogglePassword, {
        page: 'signin'
      })), client.h(ForgotPassword, null));
    }

  });
});

var Buttons$1 = ((client, id) => {
  const {
    SigninControl
  } = client.lib;
  const {
    Separator,
    FacebookButton
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        buttonPressed: store.get('signin.buttonPressed')
      };
    },

    actions(props, store) {
      return {
        onLogin: () => {
          SigninControl(store);
        },
        onCreate: () => {
          store.set({
            currentPage: 'signup',
            isMenuOpen: false
          });
          store.route('signup');
        },
        signinWithFacebook: args => {
          store.call('signinWithFacebook', args);
        },
        signupWithFacebook: args => {
          store.call('signupWithFacebook', args);
        }
      };
    },

    styles: {
      button: pressed => `
        opacity: ${pressed ? 0.5 : 1};
      `
    },
    classes: false,

    render({
      classes,
      state,
      actions,
      styles,
      utils
    }) {
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h("div", {
        "class": classes('login'),
        style: styles.button(state.buttonPressed),
        onclick: actions.onLogin
      }, utils.localize({
        en: 'Login',
        es: 'Entrar'
      })), client.h(Separator, {
        text: 'o'
      }), client.h("div", {
        "class": classes('bottomWrapper')
      }, client.h("div", {
        "class": classes('create'),
        onclick: actions.onCreate
      }, utils.localize({
        en: 'Create an account',
        es: 'Crear una cuenta'
      })), client.h(FacebookButton, {
        text: utils.localize({
          en: 'Connect with',
          es: 'Entrar con'
        }),
        facebookAppId: client.lib.Keys.FACEBOOK_APP_ID,
        signinWithFacebook: actions.signinWithFacebook,
        signupWithFacebook: actions.signupWithFacebook
      })));
    }

  });
});

var Headline$1 = ((client, id) => {
  const {
    Icons
  } = client.ui.components;
  return client.hoc({
    id,
    classes: false,

    render({
      classes,
      utils
    }) {
      return client.h("div", {
        id: 'signin-headline',
        "class": classes('container')
      }, client.h(Icons, {
        icon: 'signin',
        size: 30,
        inStyle: `
              position: absolute;
              left: 15px;
              padding: 3px;
              border: 1px solid hsl(0, 0%, 85%);
              border-radius: 7px;
              fill: ${client.lib.Colors.BLUE_SIGNIN};
            `
      }), client.h("div", {
        "class": classes('title')
      }, utils.localize({
        en: 'Welcome!',
        es: '¡Bienvenido!'
      })));
    }

  });
});

var SignIn = ((client, id) => {
  const {
    Alerts
  } = client.ui.fragments;
  const {
    SignInEmail,
    SignInPassword,
    SignInButtons,
    SignInHeadline
  } = client.ui.pages;
  return client.hoc({
    id,
    classes: false,

    render({
      classes
    }) {
      return client.h("form", {
        id: 'sign-in',
        "class": classes('container')
      }, client.h(Alerts, null), client.h(SignInHeadline, null), client.h(SignInEmail, null), client.h(SignInPassword, null), client.h(SignInButtons, null));
    }

  });
});

var Buttons$2 = ((client, id) => {
  const {
    SignupControl
  } = client.lib;
  return client.hoc({
    id,

    state(props, store) {
      return {
        buttonPressed: store.get('signup.buttonPressed'),
        currentStep: store.get('signup.currentStep')
      };
    },

    actions(props, store) {
      return {
        onClickButton: () => SignupControl(store),
        onGoToSignin: () => store.set({
          currentPage: 'signin'
        })
      };
    },

    styles: {
      button: (pressed, currentStep) => `
        opacity: ${pressed ? 0.5 : 1};
        width: ${currentStep >= 1 ? 70 : 98}%;
      `
    },
    classes: false,

    render({
      classes,
      state,
      actions,
      styles,
      utils
    }) {
      const {
        currentStep,
        buttonPressed
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h("div", {
        "class": classes('button'),
        style: styles.button(buttonPressed, currentStep),
        onclick: actions.onClickButton
      }, {
        0: utils.localize({
          en: 'Create Account',
          es: 'Crear Cuenta'
        }),
        1: utils.localize({
          en: 'Validate Token',
          es: 'Validar Token'
        }),
        2: utils.localize({
          en: 'Open the App',
          es: 'Ir a la App'
        })
      }[currentStep]), client.h("div", {
        "class": classes('alreadyRegistered'),
        onclick: actions.onGoToSignin
      }, utils.localize({
        en: 'Already registered? Login',
        es: '¿Ya estás registrado? Entrar'
      })));
    }

  });
});

var Email$2 = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        email: store.get('signup.email')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          const email = e.target.value;
          store.set({
            'signup.email': email,
            'forgot.email': email
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        email
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h(Input, {
        type: 'email',
        placeholder: utils.localize({
          en: 'Your email',
          es: 'Tu email'
        }),
        value: email,
        onTextChanged: actions.onTextChanged,
        autocomplete: 'email'
      }));
    }

  });
});

var Headline$2 = ((client, id) => {
  const {
    Icons
  } = client.ui.components;
  return client.hoc({
    id,
    classes: false,

    render({
      classes,
      utils
    }) {
      return client.h("div", {
        id: 'signup-headline',
        "class": classes('container')
      }, client.h(Icons, {
        icon: 'signup',
        size: 30,
        inStyle: `
              position: absolute;
              left: 15px;
              padding: 3px;
              border: 1px solid hsl(0, 0%, 85%);
              border-radius: 7px;
              fill: ${client.lib.Colors.GREEN_SIGNUP};
            `
      }), client.h("div", {
        "class": classes('title')
      }, utils.localize({
        en: 'Account registration',
        es: 'Registro de tu cuenta'
      })));
    }

  });
});

var Name = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        name: store.get('signup.name')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          const name = e.target.value;
          store.set({
            'signup.name': name
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        name
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h(Input, {
        id: 'signup-name-input',
        placeholder: utils.localize({
          en: 'Your name',
          es: 'Tu nombre'
        }),
        value: name,
        onTextChanged: actions.onTextChanged,
        autoFocus: true,
        autocomplete: 'name'
      }));
    }

  });
});

var Password$2 = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  const {
    TogglePassword
  } = client.ui.fragments;
  return client.hoc({
    id,

    state(props, store) {
      return {
        password: store.get('signup.password'),
        isPasswordVisible: store.get('signup.password.isVisible')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          store.set({
            'signup.password': e.target.value
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions
    }) {
      const {
        password,
        isPasswordVisible
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h(Input, {
        type: isPasswordVisible ? 'text' : 'password',
        placeholder: 'Password',
        value: password,
        onTextChanged: actions.onTextChanged,
        autocomplete: 'new-password'
      }), client.h(TogglePassword, {
        page: 'signup',
        inStyle: 'right: 20px'
      }));
    }

  });
});

var Token$1 = ((client, id) => {
  const {
    Input
  } = client.ui.components;
  return client.hoc({
    id,

    state(props, store) {
      return {
        tokenDigits: store.get('signup.tokenDigits')
      };
    },

    actions(props, store) {
      return {
        onTextChanged: e => {
          const value = e.target.value;
          if (value.length <= 6) store.set({
            'signup.tokenDigits': value
          });
        }
      };
    },

    classes: false,

    render({
      state,
      classes,
      actions,
      utils
    }) {
      const {
        tokenDigits
      } = state;
      return client.h("div", {
        "class": classes('wrapper')
      }, client.h("div", {
        "class": classes('title')
      }, utils.localize({
        en: 'Enter the code received by email',
        es: 'Ingresa el código recibido por email'
      })), client.h(Input, {
        type: 'tel',
        placeholder: '* * * * * *',
        value: tokenDigits,
        onTextChanged: actions.onTextChanged,
        inStyle: `
              padding: 12px 18px;
              width: 70%;
              font-size: 24px;
              line-height: 24px;
              text-align: center;
            `
      }));
    }

  });
});

var Welcome = ((client, id) => {
  return client.hoc({
    id,
    classes: false,

    render({
      classes,
      utils
    }) {
      return client.h("div", {
        id: 'welcome',
        style: classes('wrapper')
      }, client.h("div", {
        "class": classes('title')
      }, utils.localize({
        en: 'Welcome! 🎉🎉',
        es: '¡Bienvenid@! 🎉🎉'
      })), client.h("div", {
        "class": classes('subtitle')
      }, utils.localize({
        en: 'You successfully registered your account',
        es: 'Has registrado exitosamente tu cuenta'
      })));
    }

  });
});

var SignUp = ((client, id) => {
  const {
    Alerts
  } = client.ui.fragments;
  const {
    SignUpName,
    SignUpEmail,
    SignUpPassword,
    SignUpToken,
    SignUpButtons,
    SignUpHeadline,
    SignUpWelcome
  } = client.ui.pages;
  return client.hoc({
    id,

    state(props, store) {
      return {
        currentPage: store.get('currentPage')
      };
    },

    classes: false,
    styles: {
      carrousel: currentStep => `
        width: 300%;
        display: flex;
        transform: translateX(${currentStep * -33.33}%);
        transition: all .6s ease;
      `
    },

    render({
      styles,
      state,
      classes
    }) {
      const {
        currentStep
      } = state;
      return client.h("form", {
        id: 'sign-up',
        "class": classes('container')
      }, client.h(Alerts, null), client.h(SignUpHeadline, null), client.h("div", {
        "class": classes('noOverflow')
      }, client.h("div", {
        style: styles.carrousel(currentStep)
      }, client.h("div", {
        id: 'sign-up-step-0',
        "class": classes('step')
      }, client.h(SignUpName, null), client.h(SignUpEmail, null), client.h(SignUpPassword, null)), client.h("div", {
        id: 'sign-up-step-1',
        "class": classes('step')
      }, client.h(SignUpToken, null)), client.h("div", {
        id: 'sign-up-step-2',
        "class": classes('step')
      }, client.h(SignUpWelcome, null)))), client.h(SignUpButtons, null));
    }

  });
});



var pages = /*#__PURE__*/Object.freeze({
  ForgotEmail: Email,
  ForgotPassword: Password,
  ForgotButtons: Buttons,
  ForgotHeadline: Headline,
  ForgotToken: Token,
  ForgotDone: Done,
  Forgot: Forgot,
  SignInEmail: Email$1,
  SignInPassword: Password$1,
  SignInButtons: Buttons$1,
  SignInHeadline: Headline$1,
  SignIn: SignIn,
  SignUpButtons: Buttons$2,
  SignUpEmail: Email$2,
  SignUpHeadline: Headline$2,
  SignUpName: Name,
  SignUpPassword: Password$2,
  SignUpToken: Token$1,
  SignUpWelcome: Welcome,
  SignUp: SignUp
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
    SignIn,
    SignUp,
    Forgot
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
        inStyle: 'position: fixed; z-index: 20; left: 12px; top: 15px;'
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
          signin: SignIn,
          signup: SignUp,
          forgot: Forgot
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
  moduleName: 'sign',
  rootNodeId: 'root'
};

const main = (client, isBrowser) => client.init(config, isBrowser);

export { main };
