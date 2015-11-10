/**
 * Ember controller for password update.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';
import request from 'ic-ajax';

export default Ember.Controller.extend(ValidationsMixin, {

    password: null,
    passwordConfirmation: null,
    isLoading: false,

    actions: {
        /**
         * Updates a user's password.
         */
        changePassword: function () {

            if (this.get('isLoading')) {
                return;
            }

            // Validate form
            var self = this;
            this.validate().then(function() {

                // Get the current user id
                var currentUserId = self.get('sessionUser.user.id');
                Ember.assert('User id cannot be null', currentUserId);

                // Set controller in loading state
                self.set('isLoading', true);

                // Prepare URL
                var adapter = self.store.adapterFor('application'),
                    url = [ adapter.get('host'), adapter.get('namespace'), 'users', currentUserId, 'change-password' ].join('/');

                // Update password
                request({
                    type: 'POST',
                    url: url,
                    data: {
                        newPassword: self.get('password')
                    }
                }).then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('index');
                }).catch(function (err) {
                    err = err.jqXHR || err;
                    throw err;
                }).finally(function () {
                    self.set('isLoading', false);
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    },

    validations: {
        password: {
            presence: true,
            length: { minimum: 8, maximum: 25 },
            confirmation: true
        },
        passwordConfirmation: {
            presence: true,
            length: { minimum: 8, maximum: 25 }
        }
    }
});
