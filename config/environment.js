/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'webapp',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    apiHost: '',
    apiNamespace: 'api',
    urlAfterLogin: '/hosts',
    urlAfterLogout: '/login',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    i18n: {
      defaultLocale: 'en'
    },

    moment: {
      outputFormat: 'LL',
      includeLocales: ['fr']
    },

    thumbor: {
      baseUrl: 'http://162.243.22.196/unsafe'
    },

    googleMapsApiKey: 'AIzaSyDMCrKYHQ_ymyuWpLEJZT3JyuD9zny_dmE'
  };

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'hosts.index',
    authenticationRoute: 'login'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-19885009-2'
    };
  }

  return ENV;
};
