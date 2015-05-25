/**
 * Ember component for host membership status.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    membershipsService: null,
    host: null,

    /**
     * Observes changes on the host and load its memberships.
     */
    hostDidChange: function () {
        var userId = this.get('host.user.id');
        if (!Ember.isEmpty(userId)) {
            this.set('membershipsService', this.container.lookup('service:user-memberships', { singleton: false }));
            this.get('membershipsService').loadMemberships(userId);
        }
    }.observes('host.user.id').on('init'),

    /**
     * Returns the CSS class of the panel based on the host's membership status.
     */
    panelClass: function () {
        var hasHostMemberships = this.get('membershipsService.hasHostMemberships');
        var stillGoodInAMonth = this.get('membershipsService.latestHostMembership.isStillValidInAMonth');

        var panelClass = 'panel-success';
        if (!hasHostMemberships) {
            panelClass = 'panel-warning';
        } else if (!stillGoodInAMonth) {
            panelClass = 'panel-warning';
        }

        return panelClass;
    }.property('membershipsService.hasHostMemberships', 'membershipsService.latestHostMembership.isStillValidInAMonth')
});
