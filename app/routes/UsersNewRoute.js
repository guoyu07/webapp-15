/**
 * Ember route for user creation.
 */
App.UsersNewRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('user');
    }
});