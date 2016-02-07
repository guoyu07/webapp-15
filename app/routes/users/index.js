import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.users.index');
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    isSuspended: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    this._super(transition);
    this.controllerFor('users.index').set('isLoading', true);
  },

  model(params) {
    const page = params.page || 1;
    const limit = params.itemsPerPage || 20;
    const offset = (page - 1) * limit;
    const userParams = Ember.merge(params, {
      offset,
      limit
    });

    return this.store.find('user', userParams);
  },

  afterModel() {
    this.controllerFor('users.index').set('isLoading', false);
  },

  setupController(controller, results) {
    controller.set('users', results);
  },

  actions: {
    search() {
      this.refresh();
    }
  }
});
