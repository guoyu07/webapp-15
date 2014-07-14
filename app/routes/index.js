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
        var self = this;
        return this.store.find('user', currentUserId).then(function (user) {
            var hostId = user.get('host.id');
            var wwooferId = user.get('wwoofer.id');
            return new Ember.RSVP.hash({
                hostProfile: Ember.isEmpty(hostId) ? null : self.store.find('host', hostId),
                wwooferProfile: Ember.isEmpty(wwooferId) ? null : self.store.find('wwoofer', wwooferId)
            });
        });
    },
    setupController: function (controller, model) {
        if (!Ember.isNone(model)) {
            controller.set('hostProfile', model.hostProfile);
            controller.set('wwooferProfile', model.wwooferProfile);
        }
    }
});