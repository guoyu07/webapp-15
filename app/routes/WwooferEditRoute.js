/**
 * Ember route for wwoofer edition.
 */
App.WwooferEditRoute = Ember.Route.extend({
    renderTemplate: function () {
        this.render('wwoofers/new', { controller: 'wwoofer.edit' })
    }
});
