/* jshint node: true */

module.exports = function (environment) {
    var ENV = {
        environment: environment,
        locationType: 'hash',
        baseUrl: '/',
        SERVER_BASE_URL: '',
        apiHost: '',
        EmberENV: {
            FEATURES: {
                I18N_TRANSLATE_HELPER_SPAN: false
            },
            I18N_COMPILE_WITHOUT_HANDLEBARS: true
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
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

    if (environment === 'production') {

    }

    return ENV;
};
