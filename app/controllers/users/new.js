/**
 * Ember controller for user creation.
 */
import Ember from 'ember';
import Notify from 'ember-notify';

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
                    Notify.alert("We sent you an email with a confirmation link. See you in a bit :)");
                    self.transitionToRoute('login');
                }, function () {
                    Notify.error('Cannot create user.');
                });
            }, function () {
                Notify.error("Your submission is invalid.");
            });
        }
    }
});