/**
 * Ember route for the App's home page.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {

        // Early exit if user not authenticated
        if (!this.get('session.isAuthenticated')) {
            return Ember.RSVP.resolve();
        }

        // Get the host and the wwoofer for that user
        return this.store.find('user', this.get('session.user.id')).then(function (user) {
            return Ember.RSVP.hash({
                hostProfile: user.get('host'),
                wwooferProfile: user.get('wwoofer')
            });
        });
    }
});
