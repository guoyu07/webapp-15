/**
 * Created by guillaumez on 3/11/14.
 */

App.HostsNewRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('host', {
            farmName: "La Ferme de M. Seguin"
        });
    }
});