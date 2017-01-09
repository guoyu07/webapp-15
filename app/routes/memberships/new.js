import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  ajax: service('ajax'),

  titleToken() {
    return this.get('i18n').t('titles.memberships.new');
  },

  model() {
    return this.get('ajax').request('api/payment/token');
  },

  setupController(controller, result) {
    if (result) {
      controller.set('token', result.token);
    }
  },

  actions: {
    /**
     * Process a payment.
     * @param {Object} payment The payment object containing the nonce.
     */
    processPayment(payment) {

      payment.itemCode = this.controller.get('itemCode');
      payment.shippingRegion = this.controller.get('shippingRegion');

      // Do not continue if no item code was specified
      if (!payment.itemCode) {
        this.get('notify').error(this.get('i18n').t('notify.noItemCode'));
        return;
      }

      this.controller.set('isProcessing', true);

      let promise = this.get('ajax').post('api/payment/checkout', {
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(payment)
      });

      promise.then((result)=> {
        if (result.success === true) {
          this.get('sessionUser.user').then((user)=> {
            // Refresh the session across all tabs
            this.get('sessionUser').refresh();

            window.location.replace(`/user/${user.id}/memberships`);
          });
        } else {
          this.controller.set('paymentFailureMessage', result.message);
        }
      });
      
      promise.catch((err) => {
        if (Ember.get(err, 'errors.firstObject.status') === '409') {
          this.controller.set('membershipAlreadyActive', true);
        }
      });

      promise.finally(() => {
        this.controller.set('isProcessing', false);
      });
    },

    resetPaymentForm() {
      this.controller.set('paymentFailureMessage', null);
    },

    /**
     * Creates a membership (admin only).
     */
    createMembership() {
      let promise = this.controller.getNewMembership();

      promise = promise.then((newMembership)=> {
        return newMembership.save();
      });

      promise.then((createdMembership)=> {
        this.transitionTo('user.memberships', createdMembership.get('user'));
      });
    },

    membershipOptionChanged(membershipOption) {
      switch (membershipOption) {
        case 'WOB1':
        case 'WOB2':
          if (!this.controller.get('shippingRegion')) {
            this.controller.set('shippingRegion', 'FR');
          }
          break;
        default:
          this.controller.set('shippingRegion', null);
      }
    }
  }
});
