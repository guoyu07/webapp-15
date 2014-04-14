/**
 * Created by guillaumez on 2/24/14.
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