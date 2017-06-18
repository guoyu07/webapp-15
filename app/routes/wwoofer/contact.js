import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  titleToken() {
    return this.get('i18n').t('titles.wwoofer.contact');
  },

  setupController(controller, model) {
    controller.set('wwoofer', model);
  },

  /**
   * Redirects users with no host profile to the create page.
   * Redirects users with no active memberships to the purchase page.
   */
  redirect() {
    this.get('sessionUser.user').then((user)=> {
      if (!user.get('host.id')) {
        this.transitionTo('hosts.new');
      } else if (!user.get('hasActiveMembership')) {
        this.transitionTo('memberships.new', {
          queryParams: { type: 'H', itemCode: 'H' }
        });
      }
    });
  },

  renderTemplate() {
    this.render({ into: 'application' });
  }
});
