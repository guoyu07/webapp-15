/**
 * Ember route for wwoofer edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function () {
        this.render('wwoofers/new', { controller: 'wwoofer.edit' });
    }
});
