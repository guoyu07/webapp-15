/**
 * Ember component for create profile modal
 */
import Ember from 'ember';

export default Ember.Component.extend({
    wasDisplayed: false,

    /**
     * Display the create profile modal depending on the user profile status
     */
    displayModal: function () {

        if (this.get('session.user.wwoofer.isFulfilled') === false) {
            return;
        }

        if (this.get('session.user.host.isFulfilled') === false) {
            return;
        }

        if (this.get('session.user.wwoofer.id') == null && this.get('session.user.host.id') == null && this.get('wasDisplayed') === false) {
            Ember.$('#createProfileModal').modal('show');
            this.set('wasDisplayed', true);
        }
    }.observes('session.user.wwoofer.isFulfilled','session.user.wwoofer.id', 'session.user.host.isFulfilled', 'session.user.host.id')
});