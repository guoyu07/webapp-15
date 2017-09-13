import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, user) {
    controller.set('user', user);
  }
});
