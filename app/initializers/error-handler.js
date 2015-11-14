export default {
  name: 'error-handler',

  initialize: function(container, app) {
    // Inject the error handler service in all controllers and routes
    // TODO: improve this by using the new Ember.inject.service()
    app.inject('controller', 'errorHandler', 'service:error-handler');
    app.inject('route', 'errorHandler', 'service:error-handler');
  }
};
