import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  ajax: service('ajax'),

  titleToken() {
    return this.get('i18n').t('titles.memberships.index');
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    includeBooklet: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    this._super(transition);
    this.controllerFor('memberships.index').set('isLoading', true);
  },

  model(params) {
    let limit = params.itemsPerPage || 20;
    let queryParams = {
      offset: (params.page - 1) * limit,
      limit
    };
    if (params.userId) {
      queryParams.userId = params.userId;
    }
    if (params.includeBooklet === true) {
      queryParams.includeBooklet = true;
    }

    return this.store.query('membership', queryParams)
  },

  afterModel() {
    this.controllerFor('memberships.index').set('isLoading', false);
  },

  setupController(controller, memberships) {
    controller.set('memberships', memberships);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
    controller.setProperties({
      includeBooklet: false,
      userId: null
    });
  },

  actions: {
    search() {
      // Reset pagination
      this.controller.set('page', 1);

      this.refresh();
    }
  }
});
