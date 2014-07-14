/**
 * Ember route for User edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return this.modelFor('user');
    },
    renderTemplate: function () {
        this.render('users/new', { controller: 'user.edit' });
    }
});
