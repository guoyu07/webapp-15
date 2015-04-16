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
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        },
        deletePhoto: function () {
            // Get photo and host
            var photo = this.get('model'),
                host = photo.get('host');

            photo.destroyRecord().then(function () {
                alertify.success(Ember.I18n.t('notify.photoDeleted'));
            }).catch(function (err) {
                // BUG: for some reason, the host must be reloaded in order for the photo to stay in the list
                photo.rollback();
                host.reload();
                throw err;
            });
        }
    }
});
