import Ember from 'ember';

export function initialize(application) {
  const handler = application.lookup('service:error-handler');
  Ember.onerror = handler.handleError.bind(handler);
}

export default {
  name: 'error-handler',
  initialize
};
