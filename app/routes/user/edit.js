/**
 * Ember route for User edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function () {
        this.render('user/form', { controller: 'user.edit' });
    }
});
