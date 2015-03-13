/**
 * Ember controller for the application.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

    /**
     * Indicates whether the current user can see the "Wwoofers" link in the main menu.
     */
    canSeeWwoofersLink: Ember.computed.or('userMemberships.hasNonExpiredHostMembership', 'session.user.isAdmin'),

    /**
     * Email address of the user to impersonate (admins only).
     */
    impersonatedUserEmail: null,

    wooferProfileClass: function () {
        return this.get('userMemberships.hasWwoofMemberships') ?  'glyphicon glyphicon-ok' : 'glyphicon glyphicon-warning-sign';
    }.property(),

    hostProfileClass: function () {
        return this.get('userMemberships.hasHostMemberships') ?  'glyphicon glyphicon-ok' : 'glyphicon glyphicon-warning-sign';
    }.property(),
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
