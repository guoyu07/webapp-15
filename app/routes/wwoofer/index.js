import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
 * Maintain until December 2017 (at least) to guarantee redirects to user profile.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect(wwoofer) {
    this.transitionTo('user.index', wwoofer.get('user.id'));
  }
});
