/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'host', 'memberships'],

    coordinates: null,

    // Setup bindings used in partial
    hasHostMembershipsBinding: 'controllers.memberships.hasHostMemberships',
    latestHostMembershipBinding: 'controllers.memberships.latestHostMembership',
    belongsToCurrentUserBinding: 'controllers.host.belongsToCurrentUser',

    /**
     * Indicates whether the host contact info can be shown to the current user.
     */
    canSeeContactInfo: function() {
        return this.get('controllers.memberships.hasMemberships') && !this.get('controllers.memberships.latestMembership.isExpired');
    }.property('controllers.memberships.hasMemberships', 'controllers.memberships.latestMembership'),

    /**
     * Indicates whether the current user can edit the host.
     * The user must either own the host or be an admin.
     */
    canEditHost: function () {
        return this.get('belongsToCurrentUser') || this.get('controllers.application.currentUserIsAdmin');
    }.property('belongsToCurrentUser', 'controllers.application.currentUserIsAdmin'),

    /**
     * URL of the map showing where the farm is located.
     */
    mapUrl: function () {
        var coordinates = this.get('coordinates');
        if (!coordinates) {
            return;
        }
        return 'http://maps.googleapis.com/maps/api/staticmap?center=' + coordinates.lat + ','+ coordinates.lng +'&zoom=6&size=300x300';
    }.property('coordinates')
});