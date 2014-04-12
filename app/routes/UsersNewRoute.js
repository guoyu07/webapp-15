/**
 * Created by guillaumez on 4/5/2014.
 */

App.UsersNewRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('user');
    }
});