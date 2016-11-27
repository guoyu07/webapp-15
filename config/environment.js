/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'webapp',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiHost: '',
    apiNamespace: 'api',
    urlAfterLogin: '/hosts',
    urlAfterLogout: '/login',
    EmberENV: {

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

    trackJs: {
      config: {
        token: '48bf177fb24447f19be94f292931ff05'
      }
    },

    // Configure content security policy headers
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' capture.trackjs.com",
      'img-src': "'self' data: https://app.wwoof.fr https://maps.googleapis.com www.google-analytics.com " +
      "https://*.mqcdn.com https://usage.trackjs.com https://s3.amazonaws.com/wwoof-france/",
      'style-src': "'self' fonts.googleapis.com 'unsafe-inline'",
      'media-src': "'self'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' www.google-analytics.com"
    }
  };

  // Ember simple auth configuration
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

    ENV.trackJs.config.enabled = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.trackJs.config.enabled = false;
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-19885009-2'
    };
  }

  return ENV;
};
