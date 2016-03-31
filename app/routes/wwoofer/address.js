import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofer.address');
  },

  model() {
    const wwoofer = this.modelFor('wwoofer');
    const user = wwoofer.get('user');
    const address = wwoofer.get('address') || this.store.createRecord('address');

    return Ember.RSVP.hash({
      wwoofer,
      user,
      address
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
