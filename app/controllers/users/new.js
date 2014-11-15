/**
 * Ember controller for user creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    termsOk: false,
    insuranceOk: false,

    actions: {
        saveUser: function () {
            var user = this.get('model');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Make sure all checkboxes are checked
            if (!this.get('termsOk') || !this.get('insuranceOk')) {
                alertify.error('You must agree to the terms and undertake that you are 18 years old or more.');
                return;
            }

            // Save the user
            var self = this;
            user.validate().then(function () {
                user.save().then(function () {
                    alertify.alert("Your account has been created! You can now log into your account :)");
                    self.transitionToRoute('login');
                }).catch(function (error) {
                    if (error && error.status === 409) {
                        alertify.error('This email address is already associated to an account.');
                    } else {
                        alertify.error('Cannot create user.');
                    }
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    }
});
