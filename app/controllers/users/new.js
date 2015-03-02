/**
 * Ember controller for user creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    termsOk: false,
    insuranceOk: false,

    // The user must be 18 years old or more
    maxDate: moment().subtract(18, 'year'),
    selectedDate: null,

    selectedDateDidChange: function() {
        var selectedDate = this.get('selectedDate');
        if (selectedDate) {
            this.set('birthDate', selectedDate.format('YYYY-MM-DD'));
        }
    }.observes('selectedDate'),

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

            // Make sure the wwoofer is 18 years old
            if (moment(this.get('birthDate')).isAfter(this.get('maxDate'))) {
                alertify.error(Ember.I18n.t('notify.mustBe18'));
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
