/**
 * Ember controller for memberships.
 */
App.MembershipsController = Ember.ArrayController.extend({
    sortProperties: ['expireAt'],
    sortAscending: false,
    // itemController: 'membership',

    wwoofMemberships: function () {
        return this.get('content').filter(function (membership) {
            return membership.get('type') === 'W';
        })
    }.property('content.@each', 'content.@each.type'),

    hostMemberships: function () {
        return this.get('content').filter(function (membership) {
            return membership.get('type') === 'H';
        })
    }.property('content.@each', 'content.@each.type'),

    hasHostMemberships: Ember.computed.notEmpty('hostMemberships')
});