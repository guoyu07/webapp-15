/**
 * Ember route for memberships index.
 */
App.MembershipsIndexRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('membership');
    },
    setupController: function (controller, model) {
        this.controllerFor('memberships').set('content', model);
    }
});