import Ember from 'ember';

export function initialize(application) {

  // Get the error handler service
  var errorHandler = application.container.lookup('service:error-handler');

  // Forward all Ember and RSVP errors to the error handler
  Ember.onerror = function (err) {
    errorHandler.handleError(err);
  };
  Ember.RSVP.on('error', function(err) {
    errorHandler.handleError(err);
  });
}

export default {
  name: 'error-monitoring',
  initialize: initialize
};
