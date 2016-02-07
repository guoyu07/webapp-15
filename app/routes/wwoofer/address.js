import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofer.address');
  },

  model() {
    const wwoofer = this.modelFor('wwoofer');
    const address = wwoofer.get('address') || this.store.createRecord('address');

    return Ember.RSVP.hash({
      wwoofer,
      address
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  renderTemplate() {
    this.render('address/form', { controller: 'wwoofer.address' });
  }
});
