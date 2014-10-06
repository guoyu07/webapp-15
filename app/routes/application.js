/**
 * Ember route for the application.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        if (this.controllerFor('application').get('isAuthenticated')) {
            return this.store.find('membership', { userId: this.controllerFor('application').get('currentUser.id') });
        }
    },
    setupController: function (controller, model) {
        this.controllerFor('memberships').set('model', model || []);
    },
    actions: {
        error: function(err) {
            // Redirect to login if we get a 401 from the API
            if (err && err.status === 401) {

                // Notify user
                alertify.error("You must be logged into your account to access that page.");

                // Clear the user (just in case)
                localStorage.removeItem("user");

                // Prepare URL
                var adapter = this.store.adapterFor('application'),
                    url = [ adapter.get('host'), adapter.get('namespace'), 'users/logout' ].join('/');

                // Log the user out (just in case) and redirect to login
                var self = this;
                Ember.$.ajax({
                    type: 'POST',
                    url: url
                }).done(function () {
                    self.transitionTo('login');
                });
            }
        },
        userImpersonated: function() {
            this.refresh();
        }
    }
});