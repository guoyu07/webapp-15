import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.wwoofers.new');
  },

  /**
   * Only one wwoofer profile allowed per user.
   * Redirects to wwoofer edit if the user already has a profile.
   */
  beforeModel(transition) {
    this._super(transition);
    return this.get('sessionUser.user').then((user)=> {
      const wwooferId = user.get('wwoofer.id');
      if (wwooferId) {
        this.transitionTo('wwoofer.edit', wwooferId);
      }
    });
  },

  /**
   * Creates a new wwoofer record attached to the current logged in user.
   */
  model() {
    return this.get('sessionUser.user').then((user)=> {
      const address = this.store.createRecord('address');
      return this.store.createRecord('wwoofer', {
        user,
        address
      });
    });
  },

  deactivate() {
    this.get('controller.model').rollbackAttributes();
  }
});
