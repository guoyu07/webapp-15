/**
 * Route for User edition.
 */
App.UserEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('user');
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        this.controllerFor('memberships').set('content', this.store.find('membership'));
    },
    renderTemplate: function () {
        this.render('users/new', { controller: 'user.edit' });
    }
});
