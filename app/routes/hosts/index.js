import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.dptId) {
      return this.store.find('department', params.dptId);
    }
  },

  setupController(controller, model) {
    if (model) {
      controller.set('department', model);
    }
  }
});
