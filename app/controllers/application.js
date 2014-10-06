/**
 * Ember controller for the application.
 */
import Ember from 'ember';
import config from '../config/environment';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

    /**
     * Gets or sets the authenticated user.
     */
    currentUser: function (key, value) {

        // Set the connected user
        if (arguments.length > 1) {
            if (value) {
                localStorage["user"] = JSON.stringify(value);
            } else {
                localStorage.removeItem("user");
            }
        }

        // Get the connected user from local storage (if any)
        return localStorage["user"] ? JSON.parse(localStorage["user"]) : null;
    }.property(),

    /**
     * Indicates whether the current user is authenticated.
     */
    isAuthenticated: Ember.computed.notEmpty('currentUser'),

    /**
     * Indicates whether the current user is anonymous.
     */
    isAnonymous: Ember.computed.not('isAuthenticated'),

    /**
     * Indicates whether the current user is an administrator.
     */
    currentUserIsAdmin: function () {
        var currentuser = this.get('currentUser');
        return currentuser && currentuser.isAdmin;
    }.property('currentUser'),

    /**
     * Email address of the user to impersonate (admins only).
     */
    impersonatedUserEmail: null,

    actions: {
        logout: function () {

            // Clear the user
            this.set('currentUser', null);

            // Prepare URL
            var adapter = this.store.adapterFor('application'),
                url = [ adapter.get('host'), adapter.get('namespace'), 'users/logout' ].join('/');

            // Logs the user out and refresh the page
            Ember.$.ajax({
                type: 'POST',
                url: url
            }).done(function () {
                // Go to home page (refresh the page to get fresh data from the API)
                window.location.replace(config.baseUrl);
            }).fail(function () {
                // Notify user
                alertify.error("Something went wrong.");
            });
        },
        impersonateUser: function () {

            var self = this;
            this.validate().then(function() {

                // Set controller in loading state
                self.set('isLoading', true);

                // Prepare URL
                var adapter = self.store.adapterFor('application'),
                    url = [ adapter.get('host'), adapter.get('namespace'), 'users/impersonate' ].join('/');

                // Impersonate the user
                Ember.$.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        email: self.get('impersonatedUserEmail')
                    }
                }).done(function (data) {

                    // Notify user
                    alertify.success("You are now authenticated as " + self.get('impersonatedUserEmail') + ".");

                    // Go to home page (refresh the page to get user data from the API)
                    self.send('userImpersonated');
                    self.transitionToRoute('index');

                    // Store the user in the local storage
                    self.set('currentUser', data.user);
                }).fail(function () {
                    // Notify user
                    alertify.error("Something went wrong.");
                }).always(function () {
                    self.set('isLoading', false);
                    Ember.$('#impersonationModal').modal('hide');
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    },

    validations: {
        impersonatedUserEmail: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        }
    }
});