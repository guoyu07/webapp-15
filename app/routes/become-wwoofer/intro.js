import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofers.new');
  },

  beforeModel(transition) {
    this._super(transition);
    return this.get('sessionUser.user').then((user)=> {
      if (Ember.isPresent(user.get('intro')) && Ember.isPresent(user.get('tripMotivation'))) {
        this.transitionTo('become-wwoofer.contact');
      }
    });
  },

  model() {
    return this.get('sessionUser.user');
  },

  setupController(controller, user) {
    controller.set('user', user);
  }
});
