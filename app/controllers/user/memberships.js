/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    // Ordering
    sortProperties: ['expireAt'],
    sortAscending: false,

    wwoofMemberships: Ember.computed.filterBy('arrangedContent', 'type', 'W'),

    hostMemberships: Ember.computed.filterBy('arrangedContent', 'type', 'H'),

    hasMemberships: Ember.computed.notEmpty('model'),

    hasWwoofMemberships: Ember.computed.notEmpty('wwoofMemberships'),

    hasHostMemberships: Ember.computed.notEmpty('hostMemberships'),

    /**
     * Returns the user's most recent membership.
     */
    latestMembership: Ember.computed.alias('arrangedContent.firstObject'),

    /**
     * Returns the user's most recent Wwoof membership.
     */
    latestWwoofMembership: Ember.computed.alias('wwoofMemberships.firstObject'),

    /**
     * Returns the user's most recent Host membership.
     */
    latestHostMembership: Ember.computed.alias('hostMemberships.firstObject'),

    /**
     * Indicates whether the user's most recent Host membership is not expired.
     */
    hasNonExpiredHostMembership: Ember.computed.and('latestHostMembership', 'latestHostMembership.isNotExpired'),

    /**
     * Indicates whether the user's most recent Wwoof membership is not expired.
     */
    hasNonExpiredWwoofMembership: Ember.computed.and('latestWwoofMembership', 'latestWwoofMembership.isNotExpired')
});
