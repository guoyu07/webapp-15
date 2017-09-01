import Ember from 'ember';
import moment from 'moment';
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
    userId: {
      refreshModel: true
    },
    includeBooklet: {
      refreshModel: true
    }
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

  setupController(controller, result) {
    controller.set('memberships', result);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
    controller.setProperties({
      includeBooklet: false,
      userId: null
    });
  }
});
