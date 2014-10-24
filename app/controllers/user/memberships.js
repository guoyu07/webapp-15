/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['application'],

    // Ordering
    sortProperties: ['expireAt'],
    sortAscending: false,

    wwoofMemberships: Ember.computed.filterBy('model', 'type', 'W'),

    hostMemberships: Ember.computed.filterBy('model', 'type', 'H'),

    hasMemberships: Ember.computed.notEmpty('model'),

    hasWwoofMemberships: Ember.computed.notEmpty('wwoofMemberships'),

    hasHostMemberships: Ember.computed.notEmpty('hostMemberships'),

    /**
     * Returns the user's most recent membership.
     */
    latestMembership: Ember.computed.alias('content.firstObject'),

    /**
     * Returns the user's most recent Wwoof membership.
     */
    latestWwoofMembership: Ember.computed.alias('wwoofMemberships.firstObject'),

    /**
     * Returns the user's most recent Host membership.
     */
    latestHostMembership: Ember.computed.alias('hostMemberships.firstObject')
});