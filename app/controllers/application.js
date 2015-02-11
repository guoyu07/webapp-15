/**
 * Ember controller for the application.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

    /**
     * Gets or sets the authenticated user.
     */
    currentUser: function () {
        // Get the connected user from session
        var user = this.get('session.user');
        return user ? this.store.find('user', user.id) : null;
    }.property('session.user'),

    /**
     * Indicates whether the current user is authenticated.
     */
    isAuthenticated: Ember.computed.readOnly('session.isAuthenticated'),

    /**
     * Indicates whether the current user is anonymous.
     */
    isAnonymous: Ember.computed.not('isAuthenticated'),

    /**
     * Indicates whether the current user is an administrator.
     */
    currentUserIsAdmin: Ember.computed.and('isAuthenticated', 'currentUser.isAdmin'),

    /**
     * Indicates whether the current user can see the "Wwoofers" link in the main menu.
     */
    canSeeWwoofersLink: Ember.computed.or('userMemberships.hasNonExpiredHostMembership', 'currentUserIsAdmin'),

    /**
     * Email address of the user to impersonate (admins only).
     */
    impersonatedUserEmail: null,

    actions: {
        impersonateUser: function () {

            var self = this;
            this.validate().then(function() {

                // Set controller in loading state
                self.set('isLoading', true);

                // Authenticate user
                var auth = self.get('session').authenticate('authenticator:impersonation', {
                    impersonatedUserEmail: self.get('impersonatedUserEmail')
                });

                // Handle success
                auth.then(function () {
                    alertify.success(Ember.I18n.t('notify.userImpersonated', { email: self.get('impersonatedUserEmail') }));

                    // Refresh the route
                    self.send('userImpersonated');
                });

                // Handle failure
                auth.catch(function () {
                    alertify.error(Ember.I18n.t('notify.submissionError'));
                });

                auth.finally(function () {
                    self.set('isLoading', false);
                    Ember.$('#impersonationModal').modal('hide');
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    },

    validations: {
        impersonatedUserEmail: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        }
    }
});
