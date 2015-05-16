/**
 * Ember controller for user creation.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

    /**
     * Indicates whether the user's first name, last name and birth date can be edited.
     */
    canEditUser: true,

    termsOk: false,
    insuranceOk: false,
    selectedDate: null,

    actions: {
        saveUser: function () {

            // Get user
            var user = this.get('model');

            // Make sure all checkboxes are checked
            if (!this.get('termsOk') || !this.get('insuranceOk')) {
                alertify.error(Ember.I18n.t('notify.mustAgreeTerms'));
                return;
            }

            // Set birth date
            user.set('birthDate', this.get('selectedDate').format('YYYY-MM-DD'));

            // Initialize validations array
            var validations = [ this.validate(), user.validate() ];

            // Save the user
            var self = this;
            Ember.RSVP.all(validations).then(function () {
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
    },

    validations: {
        selectedDate: {
            'is-18': true
        }
    }
});
