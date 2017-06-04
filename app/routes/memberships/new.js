import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  ajax: service('ajax'),

  titleToken() {
    return this.get('i18n').t('titles.memberships.new');
  },

  model(params) {
    let membership = this.store.createRecord('membership', {
      type: params.type,
      itemCode: params.itemCode
    });

    let user = params.userId ?
      this.store.findRecord('user', params.userId) :
      this.get('sessionUser.user');

    return Ember.RSVP.hash({
      paymentToken: this.get('ajax').request('api/payment/token'),
      user,
      membership
    });
  },

  setupController(controller, result) {
    if (result && result.paymentToken) {
      result.membership.set('user', result.user);
      controller.set('token', result.paymentToken.token);
      controller.set('membership', result.membership);
    }
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      if (controller.get('membership.isNew')) {
        controller.get('membership').rollbackAttributes();
      }
      controller.set('membership', null);
      controller.set('token', null);
    }
  }
});
