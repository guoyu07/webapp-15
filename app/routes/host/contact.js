import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  titleToken() {
    return this.get('i18n').t('titles.host.contact');
  },

  /**
   * Redirects users with no woofer profile to the create page.
   * Redirects users with no active memberships to the purchase page.
   */
  redirect() {
    this.get('sessionUser.user').then((user)=> {
      if (!user.get('wwoofer.id')) {
        this.transitionTo('wwoofers.new');
      } else if (!user.get('hasNonExpiredMembership')) {
        this.transitionTo('memberships.new', {
          queryParams: { type: 'W', itemCode: 'WO1' }
        });
      }
    });
  },

  renderTemplate() {
    this.render({ into: 'application' });
  }
});
