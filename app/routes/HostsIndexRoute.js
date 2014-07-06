/**
 * Ember route for hosts index.
 */
App.HostsIndexRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('host', this.controllerFor('hosts.index').get('parameters'));
    }
});