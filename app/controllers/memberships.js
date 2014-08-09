/**
 * Ember controller for memberships.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    sortProperties: ['expireAt'],
    sortAscending: false,
    content: [],

    wwoofMemberships: function () {
        return this.get('content').filter(function (membership) {
            return membership.get('type') === 'W';
        });
    }.property('content.@each', 'content.@each.type'),

    hostMemberships: function () {
        return this.get('content').filter(function (membership) {
            return membership.get('type') === 'H';
        });
    }.property('content.@each', 'content.@each.type'),

    hasMemberships: Ember.computed.notEmpty('content'),

    hasWwoofMemberships: Ember.computed.notEmpty('wwoofMemberships'),

    hasHostMemberships: Ember.computed.notEmpty('hostMemberships'),

    /**
     * Returns the user's most recent membership.
     */
    latestMembership: function() {
        return this.get('content.firstObject');
    }.property('content.@each'),

    /**
     * Returns the user's most recent Wwoof membership.
     */
    latestWwoofMembership: function () {
        return this.get('wwoofMemberships.firstObject');
    }.property('wwoofMemberships.@each'),

    /**
     * Returns the user's most recent Host membership.
     */
    latestHostMembership: function () {
        return this.get('hostMemberships.firstObject');
    }.property('hostMemberships.@each')
});