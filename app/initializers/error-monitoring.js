import Ember from 'ember';

export default {
    name: 'error-monitoring',

    initialize: function (container, app) {

        // Get the error handler service
        var errorHandler = container.lookup('service:error-handler');

        // Forward all Ember and RSVP errors to the error handler
        Ember.onerror = function (err) {
            errorHandler.handleError(err);
        };
        Ember.RSVP.on('error', function(err) {
            errorHandler.handleError(err);
        });

        // Inject the error handler service in all controllers and routes
        // TODO: improve this by using the new Ember.inject.service()
        app.inject('controller', 'errorHandler', 'service:error-handler');
        app.inject('route', 'errorHandler', 'service:error-handler');
    }
};
