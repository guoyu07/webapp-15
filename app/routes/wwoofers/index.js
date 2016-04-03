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
    const page = params.page || 1;
    const limit = params.itemsPerPage || 20;
    const offset = (page - 1) * limit;
    const wwooferParams = Ember.merge(params, {
      offset,
      limit
    });

    let promises = {
      wwoofers: this.store.query('wwoofer', wwooferParams)
    };

    if (params.country) {
      promises.country = this.store.findRecord('country', params.country);
    }

    return Ember.RSVP.hash(promises);
  },

  afterModel() {
    this.controllerFor('wwoofers.index').set('isLoading', false);
  },

  setupController(controller, results) {
    controller.set('wwoofers', results.wwoofers);
    controller.set('selectedCountry', results.country);
  },

  actions: {
    search() {
      this.refresh();
    }
  }
});
