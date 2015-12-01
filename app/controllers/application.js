/**
 * Ember controller for the application.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Controller.extend(ValidationsMixin, {

  setMaxWith: function() {
    return this.get('currentRouteName') !== 'hosts.index';
  }.property('currentRouteName'),

  /**
   * Indicates whether the current user can see the "Wwoofers" link in the main menu.
   */
  canSeeWwoofersLink: Ember.computed.or('sessionUser.user.hasNonExpiredHostMembership', 'sessionUser.user.isAdmin'),

  /**
   * Indicates whether the current user as at least one profile.
   */
  hasWwooferOrHostProfile: Ember.computed.or('sessionUser.user.wwoofer.id', 'sessionUser.user.host.id'),

  /**
   * Email address of the user to impersonate (admins only).
   */
  impersonatedUserEmail: null,

  actions: {
    impersonateUser() {

      var impersonatedUserEmail = this.get('impersonatedUserEmail');

      this.validate().then(()=> {

        // Set controller in loading state
        this.set('isLoading', true);

        // Find the user to impersonate
        var userPromise = this.store.find('user', { email: impersonatedUserEmail });

        // Handle success
        userPromise.then((result)=> {

          // Make sure the user could be found
          var users = result.get('content');
          if (!Ember.isArray(users) || Ember.isEmpty(users)) {
            this.set('isLoading', false);
            alertify.error(this.get('i18n').t('notify.userNotFound'));
            return;
          }

          // Authenticate user
          var auth = this.get('session').authenticate('authenticator:impersonation', {
            impersonatedUserEmail: impersonatedUserEmail
          });

          // Handle success
          auth.then(()=> {
            alertify.success(this.get('i18n').t('notify.userImpersonated', { email: impersonatedUserEmail }));

            // Refresh the route
            this.send('userImpersonated');
          });

          auth.finally(()=> {
            this.set('isLoading', false);
            Ember.$('#impersonationModal').modal('hide');
          });
        });
      }).catch(()=> {
        this.set('isLoading', false);
        alertify.error(this.get('i18n').t('notify.submissionInvalid'));
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
