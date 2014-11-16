/**
 * Ember controller for new membership.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    queryParams: ['type', 'itemCode', 'shippingFee'],

    type: null,
    itemCode: null,
    shippingFee: null,

    wwoofMembershipOptions: [
        { id: 'WO1', name: Ember.I18n.t('memberships.itemCodes.WO1') },
        { id: 'WO2', name: Ember.I18n.t('memberships.itemCodes.WO2') },
        { id: 'WOB1', name: Ember.I18n.t('memberships.itemCodes.WOB1') },
        { id: 'WOB2', name: Ember.I18n.t('memberships.itemCodes.WOB2') }
    ],

    hostMembershipOptions: [
        { id: 'H', name: Ember.I18n.t('memberships.itemCodes.H') },
        { id: 'HR', name: Ember.I18n.t('memberships.itemCodes.HR') }
    ],

    shippingFees: [
        { id: 'FR', name: Ember.I18n.t('memberships.shipping.FR') },
        { id: 'OM1', name: Ember.I18n.t('memberships.shipping.OM1') },
        { id: 'OM2', name: Ember.I18n.t('memberships.shipping.OM2') },
        { id: 'EU', name: Ember.I18n.t('memberships.shipping.EU') },
        { id: 'WD', name: Ember.I18n.t('memberships.shipping.WD') }
    ],

    showWwoofMemberships: Ember.computed.equal('type', 'W'),
    showHostMemberships: Ember.computed.equal('type', 'H'),

    showShippingFees: function () {
        var showShippingFees = false;
        if (this.get('showWwoofMemberships') && this.get('itemCode') === 'WOB1' || this.get('itemCode') === 'WOB2') {
            showShippingFees = true;
        }
        return showShippingFees;
    }.property('showWwoofMemberships', 'itemCode')

});
