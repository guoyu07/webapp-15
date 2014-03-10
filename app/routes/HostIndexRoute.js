/**
 * Created by guillaumez on 2/26/14.
 */

App.HostIndexRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('host');
    }
});