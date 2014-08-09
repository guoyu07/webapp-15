/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'host', 'memberships'],

    // Setup bindings used in partial
    hasHostMembershipsBinding: 'controllers.memberships.hasHostMemberships',
    latestHostMembershipBinding: 'controllers.memberships.latestHostMembership',
    belongsToCurrentUserBinding: 'controllers.host.belongsToCurrentUser',

    /**
     * Indicates whether the host contact info can be shown to the current user.
     */
    canShowContactInfo: function() {
        return this.get('controllers.memberships.hasMemberships') && !this.get('controllers.memberships.latestMembership.isExpired');
    }.property('controllers.memberships.hasMemberships', 'controllers.memberships.latestMembership.isExpired'),

    /**
     * Returns the host's phone number that will be displayed to the current user.
     */
    displayedPhone: function() {
        if (this.get('canShowContactInfo')) {
            return this.get('user.phone');
        } else {
            return '*******';
        }
    }.property('user.phone', 'canShowContactInfo'),

    /**
     * Returns the host's email address that will be displayed to the current user.
     */
    displayedEmail: function() {
        if (this.get('canShowContactInfo')) {
            return this.get('user.email');
        } else {
            return '*******';
        }
    }.property('user.email', 'canShowContactInfo'),

    /**
     * Indicates whether the current user can edit the host.
     * The user must either own the host or be an admin.
     */
    userCanEditHost: function () {
        return this.get('belongsToCurrentUser') || this.get('controllers.application.currentUserIsAdmin');
    }.property('belongsToCurrentUser', 'controllers.application.currentUserIsAdmin')
});