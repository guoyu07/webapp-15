import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.user.edit');
  },

  setupController(controller, user) {
    controller.set('selectedDate', moment(user.get('birthDate')));
    controller.set('noBirthDate', Ember.isEmpty(user.get('birthDate')));
    this._super(controller, user);
  },

  renderTemplate() {
    this.render('user/form', { controller: 'user.edit' });
  }
});
