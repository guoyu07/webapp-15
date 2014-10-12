/**
 * Ember route for the App's home page.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {

        // Get the current user id
        var currentUserId = this.controllerFor('application').get('currentUser.id');
        if (Ember.isEmpty(currentUserId)) {
            return;
        }

        // Get the host and the wwoofer for that user
        return this.store.find('user', currentUserId).then(function (user) {
            return Ember.RSVP.hash({
                hostProfile: user.get('host'),
                wwooferProfile: user.get('wwoofer')
            });
        });
    }
});