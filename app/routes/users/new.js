import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.users.new');
  },

  model() {
    return this.store.createRecord('user');
  },

  setupController(controller, user) {
    controller.set('selectedDate', moment().subtract(18, 'year'));
    this._super(controller, user);
  }
});
