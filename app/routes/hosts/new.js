import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.hosts.new');
  },

  /**
   * Only one host profile allowed per user.
   * Redirects to host edit if the user already has a profile.
   */
  beforeModel(transition) {
    this._super(transition);
    return this.get('sessionUser.user').then((user)=> {
      const hostId = user.get('host.id');
      if (hostId) {
        this.transitionTo('host.edit', hostId);
      }
    });
  },

  /**
   * Creates a new host record attached to the current user.
   */
  model() {
    return this.get('sessionUser.user').then((user)=> {
      return this.store.createRecord('host', {
        user
      });
    });
  },

  deactivate() {
    this.controller.get('model').rollbackAttributes();
  }
});
