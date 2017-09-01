import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

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
    let page = params.page || 1;
    let limit = params.itemsPerPage || 20;
    let offset = (page - 1) * limit;
    let membershipsParams = {
      offset,
      limit
    };
    if (params.userId) {
      membershipsParams.userId = params.userId;
    }
    if (params.includeBooklet === true) {
      membershipsParams.includeBooklet = true;
    }

    return this.store.query('membership', membershipsParams)
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
      userId: ''
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
