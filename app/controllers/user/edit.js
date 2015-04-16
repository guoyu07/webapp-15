/**
 * Ember controller for user edition.
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

            // Validate and save
            var self = this;
            user.validate().then(function () {
                user.save().then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('index');
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
