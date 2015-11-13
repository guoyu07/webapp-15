/**
 * Ember component for host membership status.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    user: null,

    /**
     * Returns the CSS class of the panel based on the host's membership status.
     */
    panelClass: function () {
        var hasHostMemberships = this.get('user.hasHostMemberships');
        var stillGoodInAMonth = this.get('user.latestHostMembership.isStillValidInAMonth');

        var panelClass = 'panel-success';
        if (!hasHostMemberships) {
            panelClass = 'panel-warning';
        } else if (!stillGoodInAMonth) {
            panelClass = 'panel-warning';
        }

        return panelClass;
    }.property('user.hasHostMemberships', 'user.latestHostMembership.isStillValidInAMonth')
});
