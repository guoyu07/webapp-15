/**
 * Ember controller for password update.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

    needs: ['application'],

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
                var currentUserId = self.get('controllers.application.currentUser.id');
                Ember.assert('User id cannot be null', currentUserId);

                // Set controller in loading state
                self.set('isLoading', true);

                // Prepare URL
                var adapter = self.store.adapterFor('application'),
                    url = [ adapter.get('host'), adapter.get('namespace'), 'users', currentUserId, 'change-password' ].join('/');

                // Update password
                Ember.$.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        newPassword: self.get('password')
                    }
                }).done(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('index');
                }).fail(function () {
                    alertify.error(Ember.I18n.t('notify.submissionError'));
                }).always(function () {
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
