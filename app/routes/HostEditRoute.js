/**
 * Ember route for host edition.
 */
App.HostEditRoute = Ember.Route.extend({
    renderTemplate: function () {
        this.render('hosts/new', { controller: 'host.edit' })
    }
});