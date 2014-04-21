/**
 * Route for Wwoofer edition.
 */
App.WwooferEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('wwoofer');
    },
    renderTemplate: function () {
        this.render('wwoofers/new', { controller: 'wwoofer.edit' })
    }
});
