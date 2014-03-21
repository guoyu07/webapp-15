/**
 * Created by guillaumez on 3/16/14.
 */

App.WwooferIndexRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('wwoofer');
    }
});