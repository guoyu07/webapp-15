/**
 * Created by guillaumez on 3/16/14.
 */

App.WwooferRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('wwoofer', params.wwoofer_id);
    }
});