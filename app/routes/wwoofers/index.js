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

  countriesService: Ember.inject.service('countries'),

  beforeModel(transition) {
    this._super(transition);
    this.controllerFor('wwoofers.index').set('isLoading', true);
  },

  model(params) {

    var page = params.page || 1;
    var limit = params.itemsPerPage || 20;
    var offset = (page - 1) * limit;
    var wwooferParams = Ember.merge(params, {
      offset: offset,
      limit: limit
    });

    return Ember.RSVP.hash({
      wwoofers: this.store.find('wwoofer', wwooferParams),
      // Pre-load the countries so the queryParams binding
      // with the select menu work properly
      countries: this.get('countriesService.countries')
    });
  },

  afterModel() {
    this.controllerFor('wwoofers.index').set('isLoading', false);
  },

  setupController(controller, results) {
    controller.set('wwoofers', results.wwoofers);
  },

  actions: {
    search() {
      this.refresh();
    }
  }
});
