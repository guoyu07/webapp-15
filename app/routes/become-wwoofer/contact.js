import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.become-wwoofer.contact');
  },

  beforeModel(transition) {
    this._super(transition);
    return this.get('sessionUser.user').then((user)=> {
      if (Ember.isPresent(user.get('address.id'))) {
        this.transitionTo('memberships.new', {
          queryParams: { type: 'W', itemCode: 'WO1' }
        });
      }
    });
  },

  model() {
    let user = this.get('sessionUser.user');
    let address = this.store.createRecord('address');

    return Ember.RSVP.hash({
      user,
      address
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
