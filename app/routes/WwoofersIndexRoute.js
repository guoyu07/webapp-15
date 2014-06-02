/**
 * Ember route for wwoofers index.
 */
App.WwoofersIndexRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('wwoofer');
    }
});