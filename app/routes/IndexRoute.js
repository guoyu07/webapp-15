/**
 * Ember route for the App's home page.
 */
App.IndexRoute = Ember.Route.extend({
    setupController: function (controller, model) {

        // Get the current user id (use -1 if user is not logged in)
        var userId = this.controllerFor('application').get('currentUser.id') || -1;

        // Retrieve the user's host profile
        this.store.find('host', { 'userId': userId }).then(function (hosts) {
            controller.set('hosts', hosts);
        });

        // Retrieve the user's wwoofer profile
        this.store.find('wwoofer', { 'userId': userId }).then(function (wwoofers) {
            controller.set('wwoofers', wwoofers);
        });
    }
});