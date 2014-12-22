/**
 * Ember route for User edition.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    renderTemplate: function () {
        this.render('user/form', { controller: 'user.edit' });
    }
});
