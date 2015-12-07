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
   * Email address of the user to impersonate (admins only).
   */
  impersonatedUserEmail: null,

  /**
   * Whether the impersonation modal should be visible.
   */
  showImpersonationModal: false,

  /**
   * Whether the new user modal should be visible.
   */
  showNewUserModal: false,

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
            this.get('notify').error(this.get('i18n').t('notify.userNotFound'));
            return;
          }

          // Authenticate user
          var auth = this.get('session').authenticate('authenticator:impersonation', {
            impersonatedUserEmail: impersonatedUserEmail
          });

          // Handle success
          auth.then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.userImpersonated', { email: impersonatedUserEmail }));

            // Refresh the route
            this.send('userImpersonated');
          });

          auth.finally(()=> {
            this.set('isLoading', false);
            this.toggleProperty('showImpersonationModal');
          });
        });
      }).catch(()=> {
        this.set('isLoading', false);
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    },

    closeNewUserModal() {
      this.toggleProperty('showNewUserModal');
    },

    create(type) {
      this.toggleProperty('showNewUserModal');

      var route = (type === 'W') ? 'wwoofers.new' : 'hosts.new';
      this.transitionToRoute(route);
    },

    toggleImpersonationModal() {
      this.toggleProperty('showImpersonationModal');
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
