/**
 * Ember route for host edition.
 */
App.HostEditRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        this._super(controller, model);
        this.controllerFor('memberships').set('content', this.store.find('membership'));
    },
    renderTemplate: function () {
        this.render('hosts/new', { controller: 'host.edit' })
    }
});