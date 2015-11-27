import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
