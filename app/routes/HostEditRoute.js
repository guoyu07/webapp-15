/**
 * Created by guillaumez on 2/26/14.
 */

App.HostEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('host');
    },
    setupController: function(controller, model) {
        this.controllerFor('hosts.new').setProperties({content:model});
    },
    renderTemplate: function() {
        this.render('hosts/new')
    }
});
