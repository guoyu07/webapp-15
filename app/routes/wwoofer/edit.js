import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofer.edit');
  },

  setupController(controller, wwoofer) {
    controller.set('selectedDate', moment(wwoofer.get('birthDate2')));
    controller.set('secondWwooferChecked', !Ember.isEmpty(wwoofer.get('firstName2')));
    this._super(controller, wwoofer);
  }
});
