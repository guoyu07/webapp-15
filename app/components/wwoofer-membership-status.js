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
    }.observes('wwoofer.user.id').on('init')
});
