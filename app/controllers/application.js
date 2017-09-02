import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  conversationsService: service('conversations'),

  isHostsIndexRoute: computed.equal('currentRouteName', 'hosts.index'),

  /**
   * Indicates whether the current user can see the "Wwoofers" link in the main menu.
   */
  canSeeWwoofersLink: computed.or('sessionUser.user.hasActiveHostMembership', 'sessionUser.user.isAdmin'),

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

    closeNewUserModal() {
      this.toggleProperty('showNewUserModal');
    },

    create(type) {
      this.toggleProperty('showNewUserModal');

      const route = (type === 'W') ? 'wwoofers.new' : 'hosts.new';
      this.transitionToRoute(route);
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
