import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.user.edit');
  },

  setupController(controller, user) {
    var selectedDate = null;
    if (user.get('birthDate')) {
      selectedDate = moment(user.get('birthDate'));
    }
    controller.set('selectedDate', selectedDate);
    controller.set('user', user);
  },

  renderTemplate() {
    this.render('user/form', { controller: 'user.edit' });
  }
});
