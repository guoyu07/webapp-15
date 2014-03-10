/**
 * Created by guillaumez on 2/26/14.
 */

App.HostRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('host', params.host_id);
    }
});