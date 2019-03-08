
const secretsFile = require('./secrets.json');
const isProduction = process.env.NODE_ENV === 'production';
const env = isProduction ? 'production' : 'development';

const {
  MONGO_URI,
  SENDGRID_API_KEY,
} = secretsFile[env];

export const config = path => ({

  www: {
    defaultRoute: 'home',
    routes: [ 'home', 'agreements', 'faq', 'help' ],
    httpPort: 4001,
    socketPort: null,
    useManifest: false,
    // useServiceWorker: false,
    useServiceWorker: isProduction,
  },

  sign: {
    defaultRoute: 'signin',
    routes: [ 'signin', 'signup', 'forgot' ],
    httpPort: 4011,
    socketPort: null,
    useManifest: false,
    useServiceWorker: isProduction,
  },

  app: {
    defaultRoute: 'app',
    routes: [ 'app' ],
    httpPort: 4021,
    socketPort: 4022,
    useManifest: true,
    useServiceWorker: isProduction,
  },

  _root: {
    baseUrl: isProduction ? 'jmaguirre.com/myride' : 'localhost',
    // baseUrl: 'localhost',
    sendrigApiKey: SENDGRID_API_KEY,
    mongoURI: MONGO_URI,
    rootFolder: path.join(__dirname, '../'),
    localCertKeyFile: path.join(__dirname, './server.key'),
    localCertCrtFile: path.join(__dirname, './server.crt'),
  },

});


