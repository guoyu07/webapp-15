import Ember from 'ember';

export default Ember.Object.extend({

    // Unordered memberships
    memberships: [],

    // Order memberships by expiration date (most recent first)
    expireAtSortingDesc: ['expireAt:desc'],
    sortedMemberships: Ember.computed.sort('memberships', 'expireAtSortingDesc'),

    loadMemberships: function(userId) {

        Ember.Logger.assert(userId, "User id must be provided to load the memberships.");

        // Get the session and store
        var store = this.container.lookup('store:main');

        // Retrieve the user
        var self = this;
        store.find('user', userId).then(function (user) {

            // Retrieve the user memberships
            user.get('memberships').then(function (memberships) {

                // Set content
                self.set('memberships', memberships.get('content'));
            });
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