import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  queryParams: ['type', 'itemCode', 'shippingRegion', 'userId', 'gateway'],

  type: null,
  itemCode: null,
  shippingRegion: null,
  userId: null,
  paymentType: null,
  isFree: false,
  gateway: 'braintree',

  isBraintree: computed.equal('gateway', 'braintree'),

  _membershipOptions: computed('i18n.locale', function() {
    return [
      { id: 'WO1', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WO1', { price: 25 }), price: 25 },
      { id: 'WO2', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WO2', { price: 30 }), price: 30 },
      { id: 'WOB1', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WOB1', { price: 42 }), price: 42 },
      { id: 'WOB2', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WOB2', { price: 47 }), price: 47 },
      { id: 'H', type: 'H', name: this.get('i18n').t('memberships.itemCodes.H', { price: 35 }), price: 35 },
      { id: 'HR', type: 'H', name: this.get('i18n').t('memberships.itemCodes.HR', { price: 30 }), price: 30 }
    ];
  }),

  membershipOptions: computed('_membershipOptions.[]', 'type', function() {
    return this.get('_membershipOptions').filterBy('type', this.get('type'));
  }),

  shippingRegionOptions: computed('i18n.locale', function() {
    return [
      { id: 'FR', name: this.get('i18n').t('memberships.shipping.FR', { price: 4.80 }), price: 4.80 },
      { id: 'OM1', name: this.get('i18n').t('memberships.shipping.OM1', { price: 8.55 }), price: 8.55 },
      { id: 'OM2', name: this.get('i18n').t('memberships.shipping.OM2', { price: 13.05 }), price: 13.05 },
      { id: 'EU', name: this.get('i18n').t('memberships.shipping.EU', { price: 9.30 }), price: 9.30 },
      { id: 'WD', name: this.get('i18n').t('memberships.shipping.WD', { price: 11.45 }), price: 11.45 }
    ];
  }),

  paymentTypeOptions: computed('i18n.locale', function() {
    return [
      { id: 'CHQ', name: this.get('i18n').t('memberships.paymentTypes.CHQ') },
      { id: 'ESP', name: this.get('i18n').t('memberships.paymentTypes.ESP') },
      { id: 'VIRT', name: this.get('i18n').t('memberships.paymentTypes.VIRT') },
      { id: 'PPL', name: this.get('i18n').t('memberships.paymentTypes.PPL') }
    ];
  }),

  isWwooferMembership: computed.equal('type', 'W'),
  isHostMembership: computed.equal('type', 'H'),
  itemCodeIncludesShipping: computed.match('itemCode', /WOB1|WOB2/),

  hasUserId: computed.notEmpty('userId'),
  isAdminMode: computed.and('sessionUser.user.isAdmin', 'hasUserId'),

  /**
   * Determines whether the shipping fees menu should be displayed.
   * It is only displayed for Wwoofer memberships that include the book.
   */
  showShippingFees: computed('isWwooferMembership', 'itemCode', function() {
    let showShippingFees = false;
    if (this.get('isWwooferMembership') && this.get('itemCodeIncludesShipping')) {
      showShippingFees = true;
    }
    return showShippingFees;
  }),

  /**
   * Processes the total (membership + shipping fee).
   */
  total: computed('itemCode', 'shippingRegion', 'isFree', function() {
    const itemCode = this.get('itemCode');
    const membershipOption = this.get('membershipOptions').findBy('id', itemCode);
    const itemPrice = membershipOption ? membershipOption.price : 0;

    const shippingRegion = this.get('shippingRegion');
    const shippingRegionOption = this.get('shippingRegionOptions').findBy('id', shippingRegion);
    const shippingFee = shippingRegionOption ? shippingRegionOption.price : 0;

    let total = (itemPrice + shippingFee).toFixed(2);

    const isFree = this.get('isFree');
    if (isFree) {
      total = 0;
    }
    return total;
  }),

  /**
   * Returns a new membership model for creation (admins only).
   * @returns {Promise}
   */
  getNewMembership() {
    const type = this.get('type');
    const itemCode = this.get('itemCode');
    let paymentType = this.get('paymentType.id');
    let total = this.get('total');
    const isFree = this.get('isFree');
    const userId = this.get('userId');

    // Reset the payment type if the membership is offered
    if (isFree) {
      total = 0;
      paymentType = null;
    }

    return this.store.findRecord('user', userId).then((user)=> {
      return this.store.createRecord('membership', {
        type,
        itemCode,
        paymentType,
        total,
        user
      });
    });
  },

  isValid: computed('itemCode', 'itemCodeIncludesShipping', 'shippingRegion', function() {
    let isValid = false;
    const itemCode = this.get('itemCode');

    if (itemCode) {
      if (this.get('itemCodeIncludesShipping')) {
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
    paymentTypeDidChange(paymentType) {
      this.set('paymentType', paymentType);
    }
  }
});
