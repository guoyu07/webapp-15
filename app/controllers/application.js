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
   * Indicates whether nav items should be marked as active.
   */
  hostsIsActive: computed.match('currentRouteName', /hosts\.index/),
  newHostIsActive: computed.match('currentRouteName', /hosts\.new/),
  newWwooferIsActive: computed.match('currentRouteName', /become-wwoofer/),
  wwoofersIsActive: computed.match('currentRouteName', /wwoofer\.index/),
  inboxIsActive: computed.match('currentRouteName', /conversations\.index|conversations\.new|conversation\.index/),

  isEnglishLocale: computed.equal('i18n.locale', 'en'),

  actions: {
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
