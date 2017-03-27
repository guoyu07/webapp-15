import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('conversation', {});
  },

  setupController(controller, conservations) {
    controller.set('conversations', conservations);
  }
});
