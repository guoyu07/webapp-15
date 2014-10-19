/**
 * Ember route for wwoofer creation.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {

        // Get the current user id
        var userId = this.controllerFor('application').get('currentUser.id');
        if (!userId) {
            this.transitionTo('index');
        }

        // Create a new wwoofer record attached to the current logged in user
        var address = this.store.createRecord('address');
        var self = this;
        return this.store.find('user', userId).then(function (user) {
            return self.store.createRecord('wwoofer', {
                user: user,
                address: address
            });
        });
    },
    renderTemplate: function () {
        this.render('wwoofer/form', { controller: 'wwoofers.new' });
    }
});