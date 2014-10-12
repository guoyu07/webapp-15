/**
 * Ember controller for login.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import config from '../config/environment';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

    needs: ['application'],

    username: null,
    password: null,
    isLoading: false,

    actions: {
        /**
         * Logs a user in.
         */
        login: function () {

            // Prevent multiple login attempts
            if (this.get('isLoading')) {
                return;
            }

            // Validate form then login
            var self = this;
            this.validate().then(function () {

                // Set controller in loading state
                self.set('isLoading', true);

                // Prepare URL
                var url = [ config.apiHost, config.apiNamespace, 'users/login' ].join('/');

                Ember.$.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        username: self.get('username'),
                        password: self.get('password')
                    }
                }).done(function (data) {

                    // Store the user in the local storage
                    self.set('controllers.application.currentUser', data.user);

                    // Notify user
                    alertify.success("Welcome back!");

                    // Go to home page (refresh the page to get fresh data from the API)
                    window.location.replace(config.baseUrl);
                }).fail(function () {
                    // Notify user
                    alertify.error("The email address or password is incorrect.");
                }).always(function () {
                    self.set('isLoading', false);
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    },

    validations: {
        username: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        },
        password: {
            presence: true
        }
    }
});