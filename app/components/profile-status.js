/**
 * Ember component for profile status icon
 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'span',
    type: null,
    user: null,
    classNames: ['profile-status'],
    classNameBindings: ['profileStatusClass'],

    /**
     * Provide the class name to style the component based on the type
     */
    profileStatusClass : function () {
        return this.get('type') === 'host' ? this.get('hostProfileClass') : this.get('wwooferProfileClass');
    }.property('type', 'wwooferProfileClass', 'hostProfileClass'),

    /**
     * Provides the class name to style the component for wwoofer profile
     */
    wwooferProfileClass: function () {
        // Host has no active membership: warning
        var hasValidMembership = this.get('user.hasNonExpiredWwoofMembership');
        var isStillValidInAMonth = this.get('user.latestWwoofMembership.isStillValidInAMonth');
        if (!hasValidMembership || !isStillValidInAMonth) {
            return 'glyphicon glyphicon-warning-sign';
        }

        // Membership status ok
        return 'glyphicon glyphicon-ok';
    }.property('user.hasWwoofMemberships', 'user.latestWwoofMembership.isStillValidInAMonth'),

    /**
     * Provides the class name to style the component for host profile
     */
    hostProfileClass: function () {
        var host = this.get('user.host');

        // Return if the Host has not been requested yet
        if (!host) { return; }

        // Host is not approved: hourglass or warning
        if (host.get('isApproved') === false) {
            if (host.get('isPendingApproval')) {
                return'glyphicon glyphicon-hourglass';
            } else {
                return'glyphicon glyphicon-warning-sign';
            }
        }

        // Host has no active membership: warning
        var hasValidMembership = this.get('user.hasNonExpiredHostMembership');
        var isStillValidInAMonth = this.get('user.latestHostMembership.isStillValidInAMonth');
        if (!hasValidMembership || !isStillValidInAMonth) {
            return 'glyphicon glyphicon-warning-sign';
        }

        // Membership status ok
        return 'glyphicon glyphicon-ok';
    }.property('user.host.isPendingApproval', 'user.host.isApproved', 'user.hasNonExpiredHostMembership', 'user.latestHostMembership.isStillValidInAMonth')
});
