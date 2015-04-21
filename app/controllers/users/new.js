/**
 * Ember controller for user creation.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    termsOk: false,
    insuranceOk: false,

    // The user must be 18 years old or more
    maxDate: moment().subtract(18, 'year'),
    selectedDate: null,

    actions: {
        saveUser: function () {
            var user = this.get('model');

            // Make sure all checkboxes are checked
            if (!this.get('termsOk') || !this.get('insuranceOk')) {
                alertify.error(Ember.I18n.t('notify.mustAgreeTerms'));
                return;
            }

            // Make sure the user is 18 years old
            var selectedDate = this.get('selectedDate');
            if (selectedDate.isAfter(this.get('maxDate'))) {
                alertify.error(Ember.I18n.t('notify.mustBe18'));
                return;
            }
            user.set('birthDate', selectedDate.format('YYYY-MM-DD'));

            // Save the user
            var self = this;
            user.validate().then(function () {
                user.save().then(function () {
                    // Authenticate user
                    var auth = self.get('session').authenticate('authenticator:passport', {
                        username: user.get('email'),
                        password: user.get('password')
                    });

                    // Handle success
                    auth.then(function () {
                        alertify.success(Ember.I18n.t('notify.userAuthenticated'));
                    });

                    // Handle failure
                    auth.catch(function () {
                        alertify.error(Ember.I18n.t('notify.userCannotAuthenticate'));
                    });

                }).catch(function (err) {
                    if (err && err.status === 409) {
                        alertify.error(Ember.I18n.t('notify.emailAddressInUse'));
                    } else {
                        throw err;
                    }
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
