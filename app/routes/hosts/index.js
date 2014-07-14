/**
 * Ember route for hosts index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return this.store.find('host', this.controllerFor('hosts.index').get('parameters'));
    }
});