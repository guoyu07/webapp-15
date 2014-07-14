/**
 * Ember route for the App's login page.
 */
App.LoginRoute = Ember.Route.extend({
    setupController: function (controller) {
        controller.set('content', App.LoginData.create());
    }
});