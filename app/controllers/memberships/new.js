/**
 * Ember controller for new membership.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    queryParams: ['type', 'itemCode', 'shippingFee'],

    type: null,
    itemCode: null,
    shippingFee: null,

    selectedItem: null,
    selectedShipping: null,

    wwoofMembershipOptions: [
        { id: 'WO1', name: Ember.I18n.t('memberships.itemCodes.WO1', { price: 25 }), price: 25 },
        { id: 'WO2', name: Ember.I18n.t('memberships.itemCodes.WO2', { price: 30 }), price: 30 },
        { id: 'WOB1', name: Ember.I18n.t('memberships.itemCodes.WOB1', { price: 35 }), price: 35 },
        { id: 'WOB2', name: Ember.I18n.t('memberships.itemCodes.WOB2', { price: 40 }), price: 40 }
    ],

    hostMembershipOptions: [
        { id: 'H', name: Ember.I18n.t('memberships.itemCodes.H', { price: 35 }), price: 35 },
        { id: 'HR', name: Ember.I18n.t('memberships.itemCodes.HR', { price: 30 }), price: 30 }
    ],

    shippingFees: [
        { id: 'FR', name: Ember.I18n.t('memberships.shipping.FR', { price: 3.13 }), price: 3.13 },
        { id: 'OM1', name: Ember.I18n.t('memberships.shipping.OM1', { price: 5.52 }), price: 5.52 },
        { id: 'OM2', name: Ember.I18n.t('memberships.shipping.OM2', { price: 8.52 }), price: 8.52 },
        { id: 'EU', name: Ember.I18n.t('memberships.shipping.EU', { price: 4.00 }), price: 4.00 },
        { id: 'WD', name: Ember.I18n.t('memberships.shipping.WD', { price: 4.35 }), price: 4.35 }
    ],

    showWwoofMemberships: Ember.computed.equal('type', 'W'),
    showHostMemberships: Ember.computed.equal('type', 'H'),

    /**
     * Reset the shipping fees to null if shipping is not available for the current item.
     */
    resetShippingFees: function() {
        if (!this.get('showShippingFees')) {
            this.set('shippingFee', null);
        }
    }.observes('showShippingFees'),

    /**
     * Determines whether the shipping fees menu should be displayed.
     * It is only displayed for Wwoofer memberships that include the book.
     */
    showShippingFees: function () {
        var showShippingFees = false;
        if (this.get('showWwoofMemberships') && this.get('itemCode') === 'WOB1' || this.get('itemCode') === 'WOB2') {
            showShippingFees = true;
        }
        return showShippingFees;
    }.property('showWwoofMemberships', 'itemCode'),

    /**
     * Processes the total (membership + shipping fee).
     */
    total: function() {
        var itemPrice = this.get('selectedItem.price') || 0;
        var shippingFee = this.get('selectedShipping.price') || 0;
        return (itemPrice + shippingFee).toFixed(2);
    }.property('selectedItem.price', 'selectedShipping.price')
});
