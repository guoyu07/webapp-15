import Ember from 'ember';

export default Ember.Route.extend({

  dataRequest: null,

  queryParams: {
    favoritesOnly: {
      refreshModel: true
    }
  },

  titleToken() {
    return this.get('i18n').t('titles.hosts.index');
  },

  beforeModel() {
    let controller = this.controllerFor('hosts.index');
    controller.set('isLoading', true);
  },

  model(params) {
    let controller = this.controllerFor('hosts.index');
    let hasData = !Ember.isEmpty(controller.get('hostCoordinates.features'));
    let favoritesOnlyChanged = controller.get('favoritesOnly') !== params.favoritesOnly;
    if (hasData && !favoritesOnlyChanged) {
      return;
    }

    // Abort any potential previous request to avoid racing issues
    let dataRequest = this.get('dataRequest');
    if (dataRequest) {
      dataRequest.abort();
    }

    // Prepare params
    params.limit = 5000;
    delete params.page;
    delete params.lat;
    delete params.lon;
    delete params.zoom;
    delete params.showMoreFilter;

    // Create GET request
    dataRequest = Ember.$.get('/api/host-coordinates', params);
    this.set('dataRequest', dataRequest);

    return dataRequest;
  },

  afterModel() {
    let controller = this.controllerFor('hosts.index');
    controller.set('isLoading', false);
  },

  setupController(controller, hostCoordinates) {
    if (hostCoordinates) {
      controller.set('hostCoordinates', hostCoordinates);
    }
  },

  actions: {
    search() {
      this.set('controller.hostCoordinates', { features: [] });
      this.set('controller.page', 1);
      this.refresh();
    }
  }
});
