import Ember from 'ember';
import config from '../config/environment';

export default {
    name: 'logger',

    initialize: function (container) {

        // Configure Honeybadger
        Honeybadger.configure({
            api_key: '8655a56d945da48d892e11c4028a4b12', // Public API key
            environment: config.environment
        });

        // Log any error
        Ember.onerror = function (error) {
            try {
                var appController = container.lookup('controller:application');
                var mainSession = container.lookup('simple-auth-session:main');

                var currentRoute = appController ? appController.get('currentPath') : "Unknown";
                var userId = mainSession ? mainSession.get('user.id') : null;
                var userEmail = mainSession ? mainSession.get('user.email') : null;

                // Log error remotely
                Honeybadger.notify(error, { context: {
                    route: currentRoute,
                    user_id: userId,
                    user_email: userEmail,
                    details: error
                } });
            } catch (e) {}

            // Inform the user
            alertify.error(Ember.I18n.t('notify.submissionError'));

            // Log in the console only in dev mode
            if (config.environment === "development") {
                Ember.Logger.assert(false, error);
            }
        };

        // Handle promise errors
        Ember.RSVP.on('error', function(error) {

            // Log in the console only in dev mode
            if (config.environment === "development") {
                Ember.Logger.assert(false, error);
            }

            // Clear the session if 401
            if (error && error.status === 401) {
                var session = container.lookup('simple-auth-session:main');
                if (session && session.isAuthenticated) {
                    session.invalidate();
                } else {
                    window.location.replace("/login");
                }
            }
        });
    }
};
