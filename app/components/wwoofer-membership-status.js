/**
 * Ember component for wwoofer membership status.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    membershipsService: null,
    wwoofer: null,

    /**
     * Observes changes on the wwoofer and load its memberships.
     */
    wwooferDidChange: function () {
        var userId = this.get('wwoofer.user.id');
        if (!Ember.isEmpty(userId)) {
            this.set('membershipsService', this.container.lookup('service:user-memberships', { singleton: false }));
            this.get('membershipsService').loadMemberships(userId);
        }
    }.observes('wwoofer.user.id').on('init'),

    /**
     * Returns the CSS class of the panel based on the wwoofer's membership status.
     */
    panelClass: function () {
        var hasWwoofMemberships = this.get('membershipsService.hasWwoofMemberships');
        var stillGoodInAMonth = this.get('membershipsService.latestWwoofMembership.isStillValidInAMonth');

        var panelClass = 'panel-success';
        if (!hasWwoofMemberships) {
            panelClass = 'panel-warning';
        } else if (!stillGoodInAMonth) {
            panelClass = 'panel-warning';
        }

        return panelClass;
    }.property('membershipsService.hasWwoofMemberships', 'membershipsService.latestWwoofMembership.isStillValidInAMonth')
});
