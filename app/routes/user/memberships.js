/**
 * Ember route for User memberships.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        var user = this.modelFor('user');
        return user.get('memberships');
    }
});
