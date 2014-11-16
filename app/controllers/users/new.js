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
                alertify.error(Ember.I18n.t('notify.mustAgreeTerms'));
                return;
            }

            // Save the user
            var self = this;
            user.validate().then(function () {
                user.save().then(function () {
                    alertify.alert(Ember.I18n.t('notify.accountCreated'));
                    self.transitionToRoute('login');
                }).catch(function (error) {
                    if (error && error.status === 409) {
                        alertify.error(Ember.I18n.t('notify.emailAddressInUse'));
                    } else {
                        alertify.error(Ember.I18n.t('notify.submissionError'));
                    }
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
