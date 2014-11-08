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
        { id: 'WO1', name: 'WWOOF Book Online - Individual (20 Euro)' },
        { id: 'WO2', name: 'WWOOF Book Online - Two People (25 Euro)' },
        { id: 'WOB1', name: 'Printed & Online WWOOF Book - Individual (30 Euro)' },
        { id: 'WOB2', name: 'Printed & Online WWOOF Book - Two people (35 Euro)' }
    ],

    hostMembershipOptions: [
        { id: 'H', name: 'Host First Membership (35 Euro)' },
        { id: 'HR', name: 'Host Renewal (30 Euro)' }
    ],

    shippingFees: [
        { id: 'FR', name: 'France (+ 3.13 Euro)' },
        { id: 'OM1', name: 'Guyane, Guadeloupe, Martinique, Mayotte, Reunion, St. Pierre et Miquelon (+ 5.52 Euro)' },
        { id: 'OM2', name: 'Antarctique, Polynésie Française, Nouvelle Calédonie, Wallis et Futuna (+ 8.52 Euro)' },
        { id: 'EU', name: 'European Union and Switzerland (+ 4.00 Euro)' },
        { id: 'WD', name: 'Rest of the World (+ 4.35 Euro)' }
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