/**
 * Created by guillaumez on 3/16/14.
 */

App.WwoofersNewRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('wwoofer');
    }
});