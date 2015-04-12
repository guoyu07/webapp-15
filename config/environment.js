/* jshint node: true */

module.exports = function (environment) {
    var ENV = {
        modulePrefix: 'webapp',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        SERVER_BASE_URL: '',
        apiHost: '',
        apiNamespace: 'api',
        urlAfterLogout: '/',
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

        map: {
            defaultLat: 46.78,
            defaultLon: 1.95,
            defaultZoom: 6
        },

        // Configure content security policy headers
        contentSecurityPolicyHeader: 'Content-Security-Policy',
        contentSecurityPolicy: {
            'default-src': "'none'",
            'font-src': "'self' fonts.gstatic.com",
            'connect-src': "'self' capture.trackjs.com",
            'img-src': "'self' data: app.wwoof.fr maps.googleapis.com www.google-analytics.com api.honeybadger.io *.mqcdn.com usage.trackjs.com",
            'style-src': "'self' fonts.googleapis.com 'unsafe-inline'",
            'media-src': "'self'",
            'script-src': "'self' 'unsafe-eval' 'unsafe-inline' www.google-analytics.com *.cloudfront.net"
        }
    };

    // Ember simple auth configuration
    ENV['simple-auth'] = {
        session: 'session:main',
        store: 'simple-auth-session-store:cookie',
        routeAfterAuthentication: 'index',
        authenticationRoute: 'login'
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;

        ENV.SERVER_BASE_URL = 'http://localhost:3333';
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        ENV.urlAfterLogout = 'http://wwoof.fr';
        ENV.googleAnalytics = {
            webPropertyId: 'UA-19885009-2'
        };
    }

    return ENV;
};
