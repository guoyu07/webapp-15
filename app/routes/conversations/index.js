import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    const page = params.page || 1;
    const limit = params.itemsPerPage || 5;
    const offset = (page - 1) * limit;
    const conversationParams = {
      offset,
      limit
    };

    return this.store.query('conversation', conversationParams);
  },

  setupController(controller, conservations) {
    controller.set('conversations', conservations);
  }
});
