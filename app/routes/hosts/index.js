import Ember from 'ember';

export default Ember.Route.extend({

  titleToken() {
    return this.get('i18n').t('titles.hosts.index');
  },

  setupController(controller) {
    let hasData = !Ember.isEmpty(controller.get('hostCoordinates.features'));
    if (!hasData) {
      controller.refreshList(controller);
    }
  }
});
