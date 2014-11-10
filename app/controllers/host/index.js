/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'host', 'user/memberships'],

    // Setup bindings used in partial
    hasHostMemberships: Ember.computed.oneWay('controllers.user/memberships.hasHostMemberships'),
    latestHostMembership: Ember.computed.oneWay('controllers.user/memberships.latestHostMembership'),
    belongsToCurrentUser: Ember.computed.oneWay('controllers.host.belongsToCurrentUser'),

    /**
     * Indicates whether the host contact info can be shown to the current user.
     */
    canSeeContactInfo: function() {
        return this.get('controllers.user/memberships.hasMemberships') && !this.get('controllers.user/memberships.latestMembership.isExpired');
    }.property('controllers.user/memberships.hasMemberships', 'controllers.user/memberships.latestMembership.isExpired'),

    /**
     * Indicates whether the current user can edit the host.
     * The user must either own the host or be an admin.
     */
    canEditHost: Ember.computed.or('belongsToCurrentUser', 'controllers.application.currentUserIsAdmin')
});
