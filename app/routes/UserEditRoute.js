/**
 * Route for User edition.
 */
App.UserEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('user');
    },
    setupController: function (controller, model) {
        this.controllerFor('users.new').setProperties({ content: model });
    },
    renderTemplate: function () {
        this.render('users/new')
    }
});
