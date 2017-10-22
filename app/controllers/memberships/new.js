import Ember from 'ember';
import Validations from 'webapp/validations/membership';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  ajax: service('ajax'),
  membershipsService: service('memberships'),

  queryParams: ['type', 'itemCode', 'userId'],

  type: null,
  itemCode: null,
  shippingRegion: null,
  userId: null,

  membership: null,
  paymentType: null,
  isFree: false,
  selectedDate: null,
  paymentFailureMessage: null,
  membershipAlreadyActive: false,
  isProcessing: false,

  hasUserId: computed.notEmpty('userId'),
  isAdminMode: computed.and('sessionUser.user.isAdmin', 'hasUserId'),

  /**
   * Process the total (membership + shipping fee).
   */
  updateTotal() {
    let itemCode = this.get('membership.itemCode');
    let membershipOption = this.get('membershipsService.membershipOptions').findBy('id', itemCode);
    let itemPrice = membershipOption ? membershipOption.price : 0;

    let shippingRegion = this.get('shippingRegion');
    let shippingRegionOption = this.get('membershipsService.shippingRegionOptions').findBy('id', shippingRegion);
    let shippingFee = shippingRegionOption ? shippingRegionOption.price : 0;

    let bookletPrice = this.get('membership.includeBooklet') ? 17 : 0;

    let total = itemPrice + bookletPrice + shippingFee;

    let isFree = this.get('isFree');
    if (isFree) {
      total = 0;
    }

    this.set('membership.total', total);
  },

  actions: {
    /**
     * Process a payment.
     * @param {Object} payment The payment object containing the nonce.
     * @param {Object} checkout The checkout object to destroy the payment form.
     */
    processPayment(payment, checkout) {

      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          let membership = this.get('membership');
          let shippingRegion = this.get('shippingRegion');

          payment.itemCode = membership.get('itemCode');
          payment.includeBooklet = membership.get('includeBooklet');
          if (shippingRegion) {
            payment.shippingRegion = shippingRegion;
          }
          if (membership.get('isDuo')) {
            payment.firstName2 = membership.get('firstName2');
            payment.lastName2 = membership.get('lastName2');
            payment.birthDate2 = membership.get('birthDate2');
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
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
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
            this.transitionToRoute('user.memberships', createdMembership.get('user'));
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    paymentTypeDidChange(paymentType) {
      const paymentTypeId = paymentType ? paymentType.id : null;
      this.set('paymentType', paymentType);
      this.set('membership.paymentType', paymentTypeId);
    },

    itemCodeChanged(itemCode) {
      this.set('itemCode', itemCode);
      this.set('membership.itemCode', itemCode);

      if (this.get('membership.isDuo') === false) {
        this.set('membership.firstName2', null);
        this.set('membership.lastName2', null);
        this.set('membership.birthDate2', null);
        this.set('selectedDate', null);
      }

      this.updateTotal();
    },

    shippingRegionChanged(shippingRegion) {
      this.set('shippingRegion', shippingRegion);
      this.updateTotal();
    },

    toggleIsFree() {
      this.toggleProperty('isFree');
      this.set('paymentType', null);
      this.updateTotal();
    },

    toggleBookletIncluded() {
      this.toggleProperty('membership.includeBooklet');

      if (this.get('membership.includeBooklet')) {
        let region;
        this.get('membership.user.addresses.firstObject.country').then((country) => {
          region = country.get('isFrance') ? 'FR' : 'WD';
          this.set('shippingRegion', region);
          this.updateTotal();
        });
      } else {
        this.set('shippingRegion', null);
        this.updateTotal();
      }
    },

    dateSelected(date) {
      this.set('membership.birthDate2', date.format('YYYY-MM-DD'));
    }
  }
});
