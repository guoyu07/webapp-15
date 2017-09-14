import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.user.settings');
  },

  setupController(controller, user) {
    controller.set('user', user);
  }
});
