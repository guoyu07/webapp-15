/**
 * Ember controller for login.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

    queryParams: ['fromReset'],

    fromReset: null,
    username: null,
    password: null,
    isLoading: false,

    actions: {
        /**
         * Logs a user in.
         */
        login: function () {

            // Prevent multiple login attempts
            if (this.get('isLoading')) { return; }

            // Validate form then login
            this.validate().then(() => {

                // Set controller in loading state
                this.set('isLoading', true);

                // Authenticate user
                var auth = this.get('session').authenticate('authenticator:passport', {
                    username: this.get('username'),
                    password: this.get('password')
                });

                // Handle failure
                auth.catch(function () {
                    alertify.error(Ember.I18n.t('notify.userCannotAuthenticate'));
                });

                auth.finally(() => {
                    this.set('isLoading', false);
                });

            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    },

    validations: {
        username: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        },
        password: {
            presence: true
        }
    }
});
