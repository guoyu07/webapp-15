/**
 * Ember route for user creation.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return this.store.createRecord('user');
    },
    renderTemplate: function () {
        this.render('user/form', { controller: 'users.new' });
    }
});
