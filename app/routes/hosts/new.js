/**
 * Ember route for host creation.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  /**
   * Only one host profile allowed per user.
   * Redirects to host edit if the user already has a profile.
   */
  beforeModel(transition) {
    this._super(transition);
    var route = this;
    return this.get('sessionUser.user').then(function(user) {
      var hostId = user.get('host.id');
      if (hostId) {
        route.transitionTo('host.edit', hostId);
      }
    });
  },

  /**
   * Creates a new host record attached to the current user.
   */
  model() {
    return this.get('sessionUser.user').then((user)=> {
      return this.store.createRecord('host', {
        user: user
      });
    });
  },

  renderTemplate: function() {
    this.render('host/form', { controller: 'hosts.new' });
  },

  deactivate() {
    this.controller.get('model').rollback();
  }
});
