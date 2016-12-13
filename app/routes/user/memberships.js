import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.user.memberships');
  },

  setupController(controller, user) {
    controller.set('user', user);

    this.controllerFor('user').set('articlesLabel', 'user-memberships');
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      this.controllerFor('user').set('articlesLabel', null);
    }
  }
});
