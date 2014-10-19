/**
 * Ember route for wwoofer edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function () {
        this.render('wwoofer/form', { controller: 'wwoofer.edit' });
    }
});
