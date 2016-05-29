import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  ajax: service('ajax'),

  titleToken() {
    return this.get('i18n').t('titles.reviews.index');
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    pendingApproval: {
      refreshModel: true
    }
  },

  model(params) {

    let limit = params.itemsPerPage || 20;
    let queryParams = {
      offset: (params.page - 1) * limit,
      limit
    };
    if (params.pendingApproval === true) {
      queryParams.pendingApproval = true;
    }
    if (params.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    // Prepare promises
    let promises = {
      reviews: this.store.query('review', queryParams)
    };
    return Ember.RSVP.hash(promises);
  },

  setupController(controller, result) {
    controller.setProperties(result);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
    controller.setProperties({
      pendingApproval: true,
      searchTerm: ''
    });
  },

  actions: {
    clearFilters() {
      this.resetController(this.controller, false);
    },
    search() {
      // Reset pagination
      this.controller.set('page', 1);

      this.refresh();
    }
  }
});
