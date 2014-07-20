/**
 * Ember controller for memberships.
 */
import Ember from 'ember';
import MembershipController from '../controllers/membership';

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

    hasWwoofMemberships: Ember.computed.notEmpty('wwoofMemberships'),

    hasHostMemberships: Ember.computed.notEmpty('hostMemberships'),

    latestWwoofMembership: function () {
        return MembershipController.create({
            content: this.get('wwoofMemberships.firstObject')
        });
    }.property('wwoofMemberships.@each'),

    latestHostMembership: function () {
        return MembershipController.create({
            content: this.get('hostMemberships.firstObject')
        });
    }.property('hostMemberships.@each')
});