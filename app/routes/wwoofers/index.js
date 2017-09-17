import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofers.index');
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    country: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    this._super(transition);
    this.controllerFor('wwoofers.index').set('isLoading', true);
  },

  model(params) {
    let page = params.page || 1;
    let limit = params.itemsPerPage || 20;
    let offset = (page - 1) * limit;
    let userParams = {
      offset,
      limit
    };
    let promises = {};

    if (params.searchTerm) {
      userParams.searchTerm = params.searchTerm;
    }
    if (params.country) {
      userParams.country = params.country;
      promises.country = this.store.findRecord('country', params.country);
    }
    promises.users = this.store.query('user', userParams);

    return Ember.RSVP.hash(promises);
  },

  afterModel() {
    this.controllerFor('wwoofers.index').set('isLoading', false);
  },

  setupController(controller, results) {
    controller.set('users', results.users);
    controller.set('selectedCountry', results.country);
  },

  actions: {
    search() {
      // Reset pagination
      this.controller.set('page', 1);

      this.refresh();
    }
  }
});
