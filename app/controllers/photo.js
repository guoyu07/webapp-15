/**
 * Ember controller for photo.
 */
App.PhotoController = Ember.ObjectController.extend({

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
            // Get photo
            var photo = this.get('model');
            photo.destroyRecord().then(function () {
                alertify.success('Photo deleted.');
            }).catch(function () {
                photo.rollback();
                // BUG: for some reason, the host must be realoaded in order for the photo to stay in the list
                photo.get('host').reload();
                alertify.error('Cannot delete the photo.');
            });
        }
    }
});