/**
 * Ember route for the application.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function () {
        // All departments are required in most routes and must be loaded BEFORE the models so the
        // binding of department query parameters with the department select works properly
        var promises = {};
        promises.departments = this.store.find('department');

        // The memberships of the current user (if any) are required in most pages
        if (this.controllerFor('application').get('isAuthenticated')) {
            var currentUserId = this.controllerFor('application').get('currentUser.id');
            promises.userMemberships = this.store.find('membership', { userId: currentUserId });
        }

        // Resolve all promises and set data into controllers
        var self = this;
        return Ember.RSVP.hash(promises).then(function (result) {
            self.controllerFor('departments').set('model', result.departments);
            self.controllerFor('memberships').set('model', result.userMemberships || []);
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