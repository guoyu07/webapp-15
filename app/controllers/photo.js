/**
 * Ember controller for photo.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    cannotSave: function () {
        return this.get('isSaving') || !this.get('isDirty');
    }.property('isSaving', 'isDirty'),

    actions: {
        savePhoto: function () {

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Get photo
            var photo = this.get('model');

            // Validate and save
            photo.validate().then(function () {
                photo.save().then(function () {
                    // $BUG: for some reason, the host needs to be reloaded, otherwise its photo list gets nuked
                    photo.get('host').reload();
                    alertify.success('Information updated!');
                }).catch(function () {
                    alertify.error('Cannot update the photo.');
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        },
        deletePhoto: function () {
            // Get photo and host
            var photo = this.get('model'),
                host = photo.get('host');

            photo.destroyRecord().then(function () {
                alertify.success('Photo deleted.');
            }).catch(function () {
                // BUG: for some reason, the host must be realoaded in order for the photo to stay in the list
                photo.rollback();
                host.reload();
                alertify.error('Cannot delete the photo.');
            });
        }
    }
});