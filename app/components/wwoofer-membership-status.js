/**
 * Ember component for wwoofer membership status.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    user: null,

    /**
     * Returns the CSS class of the panel based on the wwoofer's membership status.
     */
    panelClass: function () {
        var hasWwoofMemberships = this.get('user.hasWwoofMemberships');
        var stillGoodInAMonth = this.get('user.latestWwoofMembership.isStillValidInAMonth');

        var panelClass = 'panel-success';
        if (!hasWwoofMemberships) {
            panelClass = 'panel-warning';
        } else if (!stillGoodInAMonth) {
            panelClass = 'panel-warning';
        }

        return panelClass;
    }.property('user.hasWwoofMemberships', 'user.latestWwoofMembership.isStillValidInAMonth')
});
