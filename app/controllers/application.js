import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

const { computed } = Ember;

export default Ember.Controller.extend(ValidationsMixin, {

  isHostsIndexRoute: computed.equal('currentRouteName', 'hosts.index'),

  /**
   * Indicates whether the current user can see the "Wwoofers" link in the main menu.
   */
  canSeeWwoofersLink: computed.or('sessionUser.user.hasNonExpiredHostMembership', 'sessionUser.user.isAdmin'),

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

  /**
   * Indicates whether the hosts/wwoofers nav item should be marked as active.
   */
  hostsIsActive: computed.match('currentRouteName', /host.index|host.contact/),
  wwoofersIsActive: computed.match('currentRouteName', /wwoofer.index/),

  actions: {
    impersonateUser() {

      const impersonatedUserEmail = this.get('impersonatedUserEmail');

      this.validate().then(()=> {

        // Set controller in loading state
        this.set('isLoading', true);

        // Find the user to impersonate
        const userPromise = this.store.find('user', { email: impersonatedUserEmail });

        // Handle success
        userPromise.then((result)=> {

          // Make sure the user could be found
          const users = result.get('content');
          if (!Ember.isArray(users) || Ember.isEmpty(users)) {
            this.set('isLoading', false);
            this.get('notify').error(this.get('i18n').t('notify.userNotFound'));
            return;
          }

          // Authenticate user
          const auth = this.get('session').authenticate('authenticator:impersonation', {
            impersonatedUserEmail
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

      const route = (type === 'W') ? 'wwoofers.new' : 'hosts.new';
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
