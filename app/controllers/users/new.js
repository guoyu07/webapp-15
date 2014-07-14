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
                    alertify.alert("We sent you an email with a confirmation link. See you in a bit :)");
                    self.transitionToRoute('login');
                }, function () {
                    alertify.error('Cannot create user.');
                });
            }, function () {
                alertify.error("Your submission is invalid.");
            });
        }
    }
});