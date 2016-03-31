import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.host.address');
  },

  model() {
    const host = this.modelFor('host');
    const user = host.get('user');
    const address = host.get('address') || this.store.createRecord('address');

    return Ember.RSVP.hash({
      host,
      user,
      address
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
