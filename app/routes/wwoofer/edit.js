import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofer.edit');
  },

  setupController(controller, wwoofer) {
    controller.set('wwoofer', wwoofer);
    this.controllerFor('wwoofer').set('articlesLabel', 'wwoofer-edit');
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      this.controllerFor('wwoofer').set('articlesLabel', null);
    }
  }
});
