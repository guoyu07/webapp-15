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

        // Get the current authenticated user
        return this.store.find('user', this.get('session.user.id'));
    }
});
