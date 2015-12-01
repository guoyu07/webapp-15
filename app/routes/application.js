/**
 * Ember route for the application.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from 'webapp/config/environment';
import request from 'ic-ajax';

export default Ember.Route.extend(ApplicationRouteMixin, {

  model() {
    // Set trackJs user if authenticated
    if (this.get('session.isAuthenticated')) {
      this.get('sessionUser.user').then((user) => {
        this.setTrackJsUser(user.get('id'));
      });
    }

    // Get locale file from server
    var promise = request({
      type: 'GET',
      url: 'api/translations'
    });

    // Load translations
    promise.then((translations)=> {

      // Get the locale cookie set during the call the the translation endpoint
      var locale = Ember.$.cookie('locale') || window.navigator.userLanguage || window.navigator.language;

      this.set('i18n.locale', locale);
      this.get('i18n').addTranslations(locale, translations);

      // Set moment locale
      moment.locale(locale);
    });

    promise.catch(function() {
      Ember.Logger.error('Could not load localization file.');
    });

    return promise;
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
