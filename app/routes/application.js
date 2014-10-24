/**
 * Ember route for the application.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function () {

        var self = this;
        function getUserMemberships() {
            var controller = self.controllerFor('application');

            if (!controller.get('isAuthenticated')) {
                return Ember.RSVP.resolve();
            }

            return controller.get('currentUser').then(function (user) {
                return user.get('memberships');
            });
        }

        return Ember.RSVP.hash({
            // All departments are required in most routes and must be loaded BEFORE the models so the
            // binding of department query parameters with the department select works properly
            departments: this.store.find('department'),
            countries: this.store.find('country'), // Countries are required in most routes
            userMemberships: getUserMemberships() // The memberships of the current user (if any) are required in most pages
        }).then(function (result) {
            // Set data into controllers
            self.controllerFor('departments').set('model', result.departments);
            self.controllerFor('countries').set('model', result.countries);
            self.controllerFor('user/memberships').set('model', result.userMemberships || []);
        });
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