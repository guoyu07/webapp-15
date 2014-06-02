/**
 * Ember route for host creation.
 */
App.HostsNewRoute = Ember.Route.extend({
    model: function () {
        var address = this.store.createRecord('address');
        return this.store.createRecord('host', {
            farmName: "La Ferme de M. Seguin",
            address: address
        });
    }
});