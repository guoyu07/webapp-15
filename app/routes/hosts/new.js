/**
 * Ember route for host creation.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {

        // Get the current user id
        var userId = this.controllerFor('application').get('currentUser.id');
        if (!userId) {
            this.transitionTo('index');
        }

        // Create a new host record attached to the current logged in user
        var address = this.store.createRecord('address');
        var self = this;
        return this.store.find('user', userId).then(function (user) {
            return self.store.createRecord('host', {
                farmName: "La Ferme de M. Seguin",
                user: user,
                address: address
            });
        });
    }
});