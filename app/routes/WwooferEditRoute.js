/**
 * Created by guillaumez on 3/16/14.
 */

App.WwooferEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('wwoofer');
    },
    setupController: function(controller, model) {
        this.controllerFor('wwoofers.new').setProperties({ content:model });
    },
    renderTemplate: function() {
        this.render('wwoofers/new')
    }
});
