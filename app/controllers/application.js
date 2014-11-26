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
        if (localStorage["user"]) {
            var user = JSON.parse(localStorage["user"]);
            return this.store.find('user', user.id);
        } else {
            return null;
        }
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
    currentUserIsAdmin: Ember.computed.and('isAuthenticated', 'currentUser.isAdmin'),

    /**
     * Email address of the user to impersonate (admins only).
     */
    impersonatedUserEmail: null,

    actions: {
        logout: function () {

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'users/logout' ].join('/');

            // Log the user out and refresh the page
            var post = Ember.$.ajax({
                type: 'POST',
                url: url
            });

            // Handle success
            var self = this;
            post.done(function () {

                // Clear the user
                self.set('currentUser', null);

                // Redirect user (refresh the page to clear all data in the store)
                var redirectUrl = (document.location.hostname === "localhost") ? config.baseURL : "http://wwoof.fr";
                window.location.replace(redirectUrl);
            });

            // Handle failure
            post.fail(function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
            });
        },
        impersonateUser: function () {

            var self = this;
            this.validate().then(function() {

                // Set controller in loading state
                self.set('isLoading', true);

                // Prepare URL
                var url = [ config.apiHost, config.apiNamespace, 'users/impersonate' ].join('/');

                // Impersonate the user
                Ember.$.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        email: self.get('impersonatedUserEmail')
                    }
                }).done(function (data) {

                    // Notify user
                    alertify.success(Ember.I18n.t('notify.userImpersonated', { email: self.get('impersonatedUserEmail') }));

                    // Go to home page (refresh the page to get user data from the API)
                    self.send('userImpersonated');
                    self.transitionToRoute('index');

                    // Store the user in the local storage
                    self.set('currentUser', data.user);
                }).fail(function () {
                    // Notify user
                    alertify.error(Ember.I18n.t('notify.submissionError'));
                }).always(function () {
                    self.set('isLoading', false);
                    Ember.$('#impersonationModal').modal('hide');
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
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
