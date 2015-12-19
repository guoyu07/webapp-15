import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    if (Ember.isEmpty(controller.get('hostCoordinates.features'))) {
      controller.retrieveHosts();
    }
  }
});
