/**
 * Ember controller for new membership.
 */
import Ember from 'ember';

const { computed, observer } = Ember;

export default Ember.Controller.extend({

    queryParams: ['type', 'itemCode', 'shippingRegion', 'userId'],

    type: null,
    itemCode: null,
    shippingRegion: null,
    userId: null,

    selectedPaymentType: null,
    isFree: false,

    _membershipOptions: [
        { id: 'WO1', type: 'W', name: Ember.I18n.t('memberships.itemCodes.WO1', { price: 25 }), price: 25 },
        { id: 'WO2', type: 'W', name: Ember.I18n.t('memberships.itemCodes.WO2', { price: 30 }), price: 30 },
        { id: 'WOB1', type: 'W', name: Ember.I18n.t('memberships.itemCodes.WOB1', { price: 35 }), price: 35 },
        { id: 'WOB2', type: 'W', name: Ember.I18n.t('memberships.itemCodes.WOB2', { price: 40 }), price: 40 },
        { id: 'H', type: 'H', name: Ember.I18n.t('memberships.itemCodes.H', { price: 35 }), price: 35 },
        { id: 'HR', type: 'H', name: Ember.I18n.t('memberships.itemCodes.HR', { price: 30 }), price: 30 }
    ],

    membershipOptions: computed.filter('_membershipOptions', function (membershipOption) {
        return this.get('type') === membershipOption.type;
    }),

    shippingRegionOptions: [
        { id: 'FR', name: Ember.I18n.t('memberships.shipping.FR', { price: 4.56 }), price: 4.56 },
        { id: 'OM1', name: Ember.I18n.t('memberships.shipping.OM1', { price: 7.66 }), price: 7.66 },
        { id: 'OM2', name: Ember.I18n.t('memberships.shipping.OM2', { price: 11.38 }), price: 11.38 },
        { id: 'EU', name: Ember.I18n.t('memberships.shipping.EU', { price: 8.00 }), price: 8.00 },
        { id: 'WD', name: Ember.I18n.t('memberships.shipping.WD', { price: 11 }), price: 11 }
    ],

    paymentTypeOptions: [
        { id: 'CHQ', name: Ember.I18n.t('memberships.paymentTypes.CHQ') },
        { id: 'ESP', name: Ember.I18n.t('memberships.paymentTypes.ESP') },
        { id: 'VIRT', name: Ember.I18n.t('memberships.paymentTypes.VIRT') },
        { id: 'PPL', name: Ember.I18n.t('memberships.paymentTypes.PPL') }
    ],

    showWwoofMemberships: Ember.computed.equal('type', 'W'),
    showHostMemberships: Ember.computed.equal('type', 'H'),
    itemCodeIncludesShipping: Ember.computed.match('itemCode', /WOB1|WOB2/),

    hasUserId: Ember.computed.notEmpty('userId'),
    isAdminMode: Ember.computed.and('sessionUser.user.isAdmin', 'hasUserId'),

    /**
     * Determines whether the shipping fees menu should be displayed.
     * It is only displayed for Wwoofer memberships that include the book.
     */
    showShippingFees: computed('showWwoofMemberships', 'itemCode', function() {
        var showShippingFees = false;
        if (this.get('showWwoofMemberships') && this.get('itemCodeIncludesShipping')) {
            showShippingFees = true;
        }
        return showShippingFees;
    }),

    /**
     * Processes the total (membership + shipping fee).
     */
    total: computed('itemCode', 'shippingRegion', 'isFree', function () {
        var itemCode = this.get('itemCode');
        var membershipOption = this.get('membershipOptions').filterBy('id', itemCode)[0];
        var itemPrice = membershipOption ? membershipOption.price : 0;

        var shippingRegion = this.get('shippingRegion');
        var shippingRegionOption = this.get('shippingRegionOptions').filterBy('id', shippingRegion)[0];
        var shippingFee = shippingRegionOption ? shippingRegionOption.price : 0;

        var total = (itemPrice + shippingFee).toFixed(2);

        var isFree = this.get('isFree');
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

        var type = this.get('type');
        var itemCode = this.get('itemCode');
        var paymentType = this.get('selectedPaymentType.id');
        var total = this.get('total');
        var isFree = this.get('isFree');
        var userId = this.get('userId');

        // Reset the payment type if the membership is offered
        if (isFree) {
            total = 0;
            paymentType = null;
        }

        return this.store.find('user', userId).then( (user)=> {
            return this.store.createRecord('membership', {
                type: type,
                itemCode: itemCode,
                paymentType: paymentType,
                total: total,
                user: user
            });
        });
    },

    isValid: computed('itemCode', 'itemCodeIncludesShipping', 'shippingRegion', function () {
        let isValid = false;
        let itemCode = this.get('itemCode');

        if (itemCode) {
            if (this.get('itemCodeIncludesShipping')) {
                isValid = Ember.isPresent(this.get('shippingRegion'));
            } else {
                isValid = true;
            }
        }
        return isValid;
    }),

    isInvalid: computed.not('isValid')
});
