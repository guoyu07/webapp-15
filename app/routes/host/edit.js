/**
 * Ember route for host edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function () {
        this.render('hosts/new', { controller: 'host.edit' });
    }
});