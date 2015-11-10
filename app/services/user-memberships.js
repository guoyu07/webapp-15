import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({

    store: service('store'),

    // Unordered memberships
    memberships: [],

    // Order memberships by expiration date (most recent first)
    expireAtSortingDesc: ['expireAt:desc'],
    sortedMemberships: Ember.computed.sort('memberships', 'expireAtSortingDesc'),

    loadMemberships: function(userId) {

        Ember.Logger.assert(userId, "User id must be provided to load the memberships.");

        // Retrieve the user's memberships
        var self = this;
        this.get('store').find('membership', { userId: userId }).then(function (memberships) {
            self.set('memberships', memberships);
        });
    },

    wwoofMemberships: Ember.computed.filterBy('sortedMemberships', 'type', 'W'),

    hostMemberships: Ember.computed.filterBy('sortedMemberships', 'type', 'H'),

    hasMemberships: Ember.computed.notEmpty('sortedMemberships'),

    hasWwoofMemberships: Ember.computed.notEmpty('wwoofMemberships'),

    hasHostMemberships: Ember.computed.notEmpty('hostMemberships'),

    /**
     * Returns the user's most recent membership.
     */
    latestMembership: Ember.computed.alias('sortedMemberships.firstObject'),

    /**
     * Returns the user's most recent Wwoof membership.
     */
    latestWwoofMembership: Ember.computed.alias('wwoofMemberships.firstObject'),

    /**
     * Returns the user's most recent Host membership.
     */
    latestHostMembership: Ember.computed.alias('hostMemberships.firstObject'),

    /**
     * Indicates whether the user's most recent Wwoof membership is not expired.
     */
    hasNonExpiredWwoofMembership: Ember.computed.and('hasWwoofMemberships', 'latestWwoofMembership.isNotExpired'),

    /**
     * Indicates whether the user's most recent Host membership is not expired.
     */
    hasNonExpiredHostMembership: Ember.computed.and('hasHostMemberships', 'latestHostMembership.isNotExpired'),

    /**
     * Indicates whether the user's most recent membership is not expired.
     */
    hasNonExpiredMembership: Ember.computed.and('hasMemberships', 'latestMembership.isNotExpired')
});
