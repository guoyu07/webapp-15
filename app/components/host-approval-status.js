/**
 * Ember component for host approval status.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    host: null,

    /**
     * Returns the CSS class of the alert based on the host's approval status.
     */
    alertClass: function () {
        var isPending = this.get('host.isPending');
        var isAdmin = this.get('session.user.isAdmin');

        var panelClass = 'alert-warning';
        if (isPending && !isAdmin) {
            panelClass = 'alert-info';
        }

        return panelClass;
    }.property('host.isPending', 'session.user.isAdmin')
});
