/**
 * Ember controller for user creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        saveUser: function () {
            var user = this.get('model');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Save the user
            var self = this;
            user.validate().then(function () {
                user.save().then(function () {
                    alertify.alert("Your account has been created! You can now log into your account :)");
                    self.transitionToRoute('login');
                }).catch(function (error) {
                    if (error && error.status && error.status === 409) {
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