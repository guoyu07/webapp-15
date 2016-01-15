import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofer.address');
  },

  model() {
    var wwoofer = this.modelFor('wwoofer');
    var address = wwoofer.get('address') || this.store.createRecord('address');

    return Ember.RSVP.hash({
      wwoofer: wwoofer,
      address: address
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  renderTemplate() {
    this.render('address/form', { controller: 'wwoofer.address' });
  }
});
