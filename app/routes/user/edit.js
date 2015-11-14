/**
 * Ember route for User edition.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, user) {
    controller.set('selectedDate', moment(user.get('birthDate')));
    this._super(controller, user);
  },
  renderTemplate() {
    this.render('user/form', { controller: 'user.edit' });
  }
});
