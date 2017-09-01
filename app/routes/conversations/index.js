import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  titleToken() {
    return this.get('i18n').t('titles.conversations.index');
  },

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    this._super(transition);
    this.controllerFor('conversations.index').set('isLoading', true);
  },

  model(params) {
    let page = params.page || 1;
    let limit = params.itemsPerPage || 5;
    let offset = (page - 1) * limit;
    const conversationParams = Ember.merge(params, {
      offset,
      limit
    });

    return this.store.query('conversation', conversationParams);
  },

  afterModel() {
    this.controllerFor('conversations.index').set('isLoading', false);
  },

  setupController(controller, conservations) {
    controller.set('conversations', conservations);
  },

  actions: {
    search() {
      // Reset pagination
      this.controller.set('page', 1);

      this.refresh();
    }
  }
});
