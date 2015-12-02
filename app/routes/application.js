/**
 * Ember route for the application.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from 'webapp/config/environment';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {

  translationsFetcher: service('translations-fetcher'),

  model() {
    // Set trackJs user if authenticated
    if (this.get('session.isAuthenticated')) {
      this.get('sessionUser.user').then((user) => {
        this.setTrackJsUser(user.get('id'));
      });
    }

    // Fetch translations from server
    return this.get('translationsFetcher').fetch();
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
