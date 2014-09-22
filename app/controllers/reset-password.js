/**
 * Ember controller for password reset.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

    emailAddress: null,
    isLoading: false,

    actions: {
        /**
         * Resets a user's password then sends the new password to its email address.
         */
        resetPassword: function () {

            if (this.get('isLoading')) {
                return;
            }

            var self = this;
            this.validate().then(function() {

                // Set controller in loading state
                self.set('isLoading', true);

                // Prepare URL
                var adapter = self.store.adapterFor('application'),
                    url = [ adapter.get('host'), adapter.get('namespace'), 'users/reset-password' ].join('/');

                // Send email
                Ember.$.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        email: self.get('emailAddress')
                    }
                }).done(function () {
                    // Notify user
                    alertify.alert("We sent you an email with a temporary password. " +
                        "Use it log in, then update your password.");

                    // Go to login page
                    self.transitionToRoute('login');
                }).fail(function () {
                    // Notify user
                    alertify.error("An error occurred.");
                }).always(function () {
                    self.set('isLoading', false);
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    },

    validations: {
        emailAddress: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        }
    }
});
