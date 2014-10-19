/**
 * Ember route for host edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function () {
        this.render('host/form', { controller: 'host.edit' });
    }
});