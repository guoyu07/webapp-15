/**
 * Ember component for profile status icon
 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'span',
    type: null,
    membershipsService: null,
    classNameBindings: ['profileStatusClass'],

    /**
     * Provide the class name to style the component based on the type
     */
    profileStatusClass : function () {
        return this.get('type') === 'host' ? this.get('hostProfileClass') : this.get('wooferProfileClass');
    }.property('type', 'wooferProfileClass', 'hostProfileClass'),

    /**
     * Provides the class name to style the component for wwoofer profile
     */
    wooferProfileClass: function () {
        // Host has no active membership: warning
        var hasValidMembership = this.get('membershipsService.hasNonExpiredWwoofMembership');
        var isStillValidInAMonth = this.get('membershipsService.latestWwoofMembership.isStillValidInAMonth');
        if (!hasValidMembership || !isStillValidInAMonth) {
            return 'glyphicon glyphicon-warning-sign';
        }

        // Membership status ok
        return 'glyphicon glyphicon-ok';
    }.property('membershipsService.hasWwoofMemberships', 'membershipsService.latestWwoofMembership.isStillValidInAMonth'),

    /**
     * Provides the class name to style the component for host profile
     */
    hostProfileClass: function () {
        var host = this.get('session.user.host');

        // Return if the Host has not been requested yet
        if (!host) { return; }

        // Host is not approved: hourglass
        if (host.get('isApproved') === false) {
            return'glyphicon glyphicon-hourglass';
        }

        // Host has no active membership: warning
        var hasValidMembership = this.get('membershipsService.hasNonExpiredHostMembership');
        var isStillValidInAMonth = this.get('membershipsService.latestHostMembership.isStillValidInAMonth');
        if (!hasValidMembership || !isStillValidInAMonth) {
            return 'glyphicon glyphicon-warning-sign';
        }

        // Membership status ok
        return 'glyphicon glyphicon-ok';
    }.property('session.user.host.isApproved', 'membershipsService.hasNonExpiredHostMembership', 'membershipsService.latestHostMembership.isStillValidInAMonth')
});
