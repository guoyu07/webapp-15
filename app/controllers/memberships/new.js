import Ember from 'ember';
import Validations from 'webapp/validations/membership';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  ajax: service('ajax'),

  queryParams: ['type', 'itemCode', 'shippingRegion', 'userId'],

  type: null,
  itemCode: null,
  shippingRegion: null,
  userId: null,
  paymentType: null,
  isFree: false,
  membership: null,

  paymentFailureMessage: null,
  membershipAlreadyActive: false,
  isProcessing: false,

  hasUserId: computed.notEmpty('userId'),
  isAdminMode: computed.and('sessionUser.user.isAdmin', 'hasUserId'),

  isValid: computed('itemCode', 'hasBooklet', 'shippingRegion', function() {
    let isValid = false;
    const itemCode = this.get('itemCode');

    if (itemCode) {
      if (this.get('hasBooklet')) {
        isValid = Ember.isPresent(this.get('shippingRegion'));
      } else {
        isValid = true;
      }
    }
    return isValid;
  }),

  isInvalid: computed.not('isValid'),

  disableSubmit: computed.or('isProcessing', 'isInvalid'),

  isValidAdmin: computed('isValid', 'paymentType.id', 'isFree', function() {
    return this.get('isValid') && (Ember.isPresent(this.get('paymentType.id')) || this.get('isFree'));
  }),

  isInvalidAdmin: computed.not('isValidAdmin'),

  actions: {
    /**
     * Process a payment.
     * @param {Object} payment The payment object containing the nonce.
     * @param {Object} checkout The checkout object to destroy the payment form.
     */
    processPayment(payment, checkout) {

      payment.itemCode = this.get('itemCode');
      payment.shippingRegion = this.get('shippingRegion');

      // Do not continue if no item code was specified
      if (!payment.itemCode) {
        this.get('notify').error(this.get('i18n').t('notify.noItemCode'));
        return;
      }

      this.set('isProcessing', true);

      let promise = this.get('ajax').post('/api/payment/checkout', {
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(payment)
      });

      promise.then((result)=> {
        checkout.teardown(()=> {
          checkout = null;

          if (result.success === true) {
            this.get('sessionUser.user').then((user)=> {
              // Refresh the session across all tabs
              this.get('sessionUser').refresh();

              window.location.replace(`/user/${user.id}/memberships`);
            });
          } else {
            this.set('paymentFailureMessage', result.message);
          }
        });
      });

      promise.catch((err) => {
        checkout.teardown(()=> {
          checkout = null;

          if (Ember.get(err, 'errors.firstObject.status') === '409') {
            this.set('membershipAlreadyActive', true);
          }
        });
      });

      promise.finally(() => {
        this.set('isProcessing', false);
      });
    },

    resetPaymentForm() {
      this.set('paymentFailureMessage', null);
    },

    /**
     * Creates a membership (admin only).
     */
    createMembership(membership) {

      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          membership.save().then((createdMembership) => {
            this.transitionTo('user.memberships', createdMembership.get('user'));
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    paymentTypeDidChange(paymentType) {
      this.set('paymentType', paymentType);
    },

    itemCodeChanged(membershipOption) {
      this.set('itemCode', membershipOption);
      this.set('membership.itemCode', membershipOption);

      switch (membershipOption) {
        case 'WOB1':
        case 'WOB2':
          if (!this.get('shippingRegion')) {
            this.set('shippingRegion', 'FR');
          }
          break;
        default:
          this.set('shippingRegion', null);
      }
    },

    toggleIsFree() {
      this.toggleProperty('isFree');
      this.set('paymentType', null);
    },

    dateSelected(date) {
      this.set('membership.birthDate2', date.format('YYYY-MM-DD'));
    }
  }
});
