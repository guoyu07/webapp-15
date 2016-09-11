import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from 'webapp/config/environment';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {

  translationsFetcher: service('translations-fetcher'),
  ajax: service('ajax'),

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

  title(tokens) {
    tokens = Ember.makeArray(tokens);
    tokens.unshift('WWOOF France');
    return tokens.reverse().join(' — ');
  },

  /**
   * Processes whether the new user modal should be visible.
   */
  processNewUserModalVisibility() {
    this.get('sessionUser.user').then((user)=> {
      const promise = Ember.RSVP.hash({
        host: user.get('host'),
        wwoofer: user.get('wwoofer')
      });

      promise.then((results)=> {
        const showModal = Ember.isEmpty(results.host) && Ember.isEmpty(results.wwoofer);
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
    if (userId && this.trackjs) {
      this.trackjs.configure({
        userId: userId.toString()
      });
    }
  },

  /**
   * Performs post-login actions.
   */
  sessionAuthenticated() {
    const attemptedTransition = this.get('session.attemptedTransition');

    if (attemptedTransition) {
      this.get('sessionUser.user').then((user) => {

        if (this.get('i18n.locale') !== user.get('locale')) {
          this.get('translationsFetcher').fetch();
        }

        this.setTrackJsUser(user.get('id'));

        this.processNewUserModalVisibility();

        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      });
    } else {
      window.location.replace(config.urlAfterLogin);
    }
  },

  /**
   * Redirects user after logout.
   * Refreshes the page to reset app state.
   */
  sessionInvalidated() {
    window.location.replace(config.urlAfterLogout);
  },

  getUrl(userId, hostId) {
    return ['api/users', userId, 'favorites', hostId].join('/');
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    userImpersonated() {
      this.store.unloadAll();
      this.transitionTo('hosts.index');
      this.refresh();
    },
    addUserFavorite(host, user) {
      if (!user) {
        this.transitionTo('login');
      } else {
        let url = this.getUrl(user.get('id'), host.get('id'));
        let promise = this.get('ajax').put(url);

        promise.then(() => {
          user.get('favorites').pushObject(host);
        });
      }
    },
    removeUserFavorite(host, user) {
      if (!user) {
        this.transitionTo('login');
      } else {
        let url = this.getUrl(user.get('id'), host.get('id'));
        let promise = this.get('ajax').delete(url);

        promise.then(()=> {
          user.get('favorites').removeObject(host);
        });
      }
    },
    error(err) {
      if (Ember.get(err, 'errors.firstObject.status') === '404') {
        this.transitionTo('404', 'not-found');
      } else {
        this.trackjs.track(err);
      }
    }
  }
});
