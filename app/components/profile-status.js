/**
 * Ember component for profile status icon
 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'span',
    type: 'host',
    classNameBindings: ['profileStatusClass'],

    /**
     * Provide the class name to style the component based on the type
     */
    profileStatusClass : function () {
        return this.get('type') == 'host' ? this.get('hostProfileClass') : this.get('wooferProfileClass');
    }.property('type'),

    /**
     * Provide the class name to style the component for wwoofer profile
     */
    wooferProfileClass: function () {
        return this.get('userMemberships.hasNonExpiredWwoofMembership') ?  'glyphicon glyphicon-ok' : 'glyphicon glyphicon-warning-sign';
    }.property('userMemberships.hasWwoofMemberships'),

    /**
     * Provide the class name to style the component for host profile
     */
    hostProfileClass: function () {
        var host = this.get('session.user.host');

        // Host is not approved: hourglass
        if (host.get('isApproved') === false)
            return'glyphicon glyphicon-hourglass';

        // Host has no active membership: warning
        if (this.get('userMemberships.hasNonExpiredHostMembership') === false)
            return 'glyphicon glyphicon-warning-sign';

        return 'glyphicon glyphicon-ok';
    }.property('session.user.host.isApproved', 'userMemberships.hasNonExpiredHostMembership')
});
