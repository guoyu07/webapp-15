/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'host', 'memberships'],

    hasHostMembershipsBinding: 'controllers.memberships.hasHostMemberships',
    latestHostMembershipBinding: 'controllers.memberships.latestHostMembership',
    belongsToCurrentUserBinding: 'controllers.host.belongsToCurrentUser',

    /**
     * Indicates whether the current user can edit the host.
     * The user must either own the host or be an admin.
     */
    userCanEditHost: function () {
        return this.get('belongsToCurrentUser') || this.get('controllers.application.currentUserIsAdmin');
    }.property('belongsToCurrentUser', 'controllers.application.currentUserIsAdmin')
});