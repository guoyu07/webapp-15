/**
 * Ember route for Wwoofer edition.
 */
App.WwooferEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('wwoofer');
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        this.controllerFor('countries').set('content', this.store.find('country'));
        this.controllerFor('departments').set('content', this.store.find('department'));
    },
    renderTemplate: function () {
        this.render('wwoofers/new', { controller: 'wwoofer.edit' })
    }
});
