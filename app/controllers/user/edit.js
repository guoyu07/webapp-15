/**
 * Ember controller for user edition.
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

            // Validate and save
            user.validate().then(function () {
                user.save()
                    .then(function () {
                        Notify.success('Information updated!');
                    }).catch(function () {
                        Notify.error('Something went wrong.');
                    });
            }).catch(function (error) {
                console.log(error);
                Notify.error("Your submission is invalid.");
            });
        }
    }
});