/**
 * Ember route for User memberships.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController: function (controller) {

        // Get user based on current route (can differ from authenticated user)
        var user = this.modelFor('user');

        // Instantiate a local user-memberships service
        var localUserMembershipsService = this.container.lookup('service:user-memberships', { singleton: false });

        // Load memberships for that user
        localUserMembershipsService.loadMemberships(user.get('id'));

        // Set the service in the controller
        controller.set('localUserMembershipsService', localUserMembershipsService);
    }
});
