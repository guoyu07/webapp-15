/**
 * Route for User edition.
 */
App.UserEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('user');
    },
    renderTemplate: function () {
        this.render('users/new', { controller: 'user.edit' });
    }
});
