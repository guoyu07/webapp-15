import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofer.edit');
  },

  setupController(controller, wwoofer) {
    let selectedDate = null;
    if (wwoofer.get('birthDate2')) {
      selectedDate = moment(wwoofer.get('birthDate2'));
    }
    controller.set('selectedDate', selectedDate);

    controller.set('secondWwooferChecked', !Ember.isEmpty(wwoofer.get('firstName2')));
    controller.set('wwoofer', wwoofer);

    this.controllerFor('wwoofer').set('articlesLabel', 'wwoofer-edit');
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      this.controllerFor('wwoofer').set('articlesLabel', null);
    }
  }
});
