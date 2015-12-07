/**
 * Ember route for the application.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from 'webapp/config/environment';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {

  translationsFetcher: service('translations-fetcher'),

  beforeModel() {
    // Set trackJs user if authenticated
    if (this.get('session.isAuthenticated')) {
      this.get('sessionUser.user').then((user) => {
        this.setTrackJsUser(user.get('id'));
      });
    }

    // Fetch translations from server
    return this.get('translationsFetcher').fetch();
  },

  setupController() {
    if (this.get('session.isAuthenticated')) {
      this.processNewUserModalVisibility();
    }
  },

  /**
   * Processes whether the new user modal should be visible.
   */
  processNewUserModalVisibility() {
    this.get('sessionUser.user').then((user)=> {
      var promise = Ember.RSVP.hash({
        host: user.get('host'),
        wwoofer: user.get('wwoofer')
      });

      promise.then((results)=> {
        var showModal = Ember.isEmpty(results.host) && Ember.isEmpty(results.wwoofer);
        this.controller.set('showNewUserModal', showModal);
      });
    });
  },

  /**
   * Sets the current user ID for track JS.
   * @param userId
   */
  setTrackJsUser(userId) {
    Ember.assert('User id required to set trackJs user.', userId);
    if (userId && trackJs) {
      trackJs.configure({
        userId: userId.toString()
      });
    }
  },

  /**
   * Performs post-login actions.
   */
  sessionAuthenticated() {
    this.get('sessionUser.user').then((user) => {

      // Fetch translations from server if the preferred locale of the user
      // is different from the current locale
      if (this.get('i18n.locale') !== user.get('locale')) {
        this.get('translationsFetcher').fetch();
      }

      this.setTrackJsUser(user.get('id'));

      this.processNewUserModalVisibility();
    });

    // Redirect user
    this._super(...arguments);
  },

  /**
   * Redirects user after logout.
   * Refreshes the page to reset app state.
   */
  sessionInvalidated() {
    window.location.replace(config.urlAfterLogout);
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    userImpersonated() {
      this.refresh();
    },
    error(err) {
      this.errorHandler.handleError(err);
    }
  }
});
