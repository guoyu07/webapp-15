import Ember from 'ember';
import Validations from 'webapp/validations/application';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  conversationsService: service('conversations'),

  isHostsIndexRoute: computed.equal('currentRouteName', 'hosts.index'),

  /**
   * Indicates whether the current user can see the "Wwoofers" link in the main menu.
   */
  canSeeWwoofersLink: computed.or('sessionUser.user.hasActiveHostMembership', 'sessionUser.user.isAdmin'),

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
   * Indicates whether nav items should be marked as active.
   */
  hostsIsActive: computed.match('currentRouteName', /host.index|host.contact/),
  wwoofersIsActive: computed.match('currentRouteName', /wwoofer.index/),
  inboxIsActive: computed.match('currentRouteName', /conversations.index|conversations.new|conversation.index/),

  isEnglishLocale: computed.equal('i18n.locale', 'en'),

  actions: {
    impersonateUser() {

      const impersonatedUserEmail = this.get('impersonatedUserEmail');

      // Validate the modal
      this.validate().then(({ validations })=> {

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          // Set controller in loading state
          this.set('isLoading', true);

          // Find the user to impersonate
          const userPromise = this.store.queryRecord('user', { email: impersonatedUserEmail });

          // Handle success
          userPromise.then((user)=> {

            // Make sure the user could be found
            if (Ember.isEmpty(user)) {
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
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
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
    },

    /**
     * Collapses the navigation menu on mobile/tablet.
     */
    navBarClicked(target) {
      // Do not collapse on desktop (i.e. if the button navbar toggle is hidden)
      if (Ember.$('button.navbar-toggle').is(':hidden')) {
        return;
      }
      // Do not collapse if target is a sub menu
      if (Ember.$(target).hasClass('dropdown-toggle')) {
        return;
      }

      Ember.$('.navbar-collapse').collapse('hide');
    }
  }
});
