/**
 * Created by guillaumez on 2/26/14.
 */
App.HostEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('host')
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        this.controllerFor('countries').set('content', this.store.find('country'));
        this.controllerFor('departments').set('content', this.store.find('department'));
    },
    renderTemplate: function () {
        this.render('hosts/new', { controller: 'host.edit' })
    }
});
