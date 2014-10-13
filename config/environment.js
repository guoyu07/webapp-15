/* jshint node: true */

module.exports = function (environment) {
    var ENV = {
        modulePrefix: 'webapp',
        environment: environment,
        locationType: 'hash',
        baseUrl: '/',
        SERVER_BASE_URL: '',
        apiHost: '',
        apiNamespace: 'api',
        EmberENV: {
            FEATURES: {
                I18N_TRANSLATE_HELPER_SPAN: false
            },
            I18N_COMPILE_WITHOUT_HANDLEBARS: true
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        // Configure content security policy headers
        contentSecurityPolicyHeader: 'Content-Security-Policy',
        contentSecurityPolicy: {
            'default-src': "'none'",
            'font-src': "'self' fonts.gstatic.com",
            'connect-src': "'self'",
            'img-src': "'self' data: app.wwoof.fr maps.googleapis.com",
            'style-src': "'self' fonts.googleapis.com 'unsafe-inline'",
            'media-src': "'self'"
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        ENV.APP.LOG_VIEW_LOOKUPS = true;

        ENV.SERVER_BASE_URL = 'http://localhost:3333';
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'auto';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
