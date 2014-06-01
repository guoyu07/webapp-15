/**
 * Ember route for hosts index.
 */
App.HostsIndexRoute = Ember.Route.extend({
    setupController: function (controller) {
        this.store
            .find('host', controller.get('parameters'))
            .then(function (hosts) {
                controller.set('content', hosts);
            });
    }
});