import Ember from 'ember';

export default Ember.Route.extend({
  titleToken() {
    return this.get('i18n').t('titles.hosts.index');
  },

  setupController(controller) {
    if (Ember.isEmpty(controller.get('hostCoordinates.features'))) {
      controller.retrieveHosts();
    }
  }
});
