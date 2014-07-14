/**
 * Ember route for hosts index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        debugger;
        return this.store.find('host', this.controllerFor('hosts.index').get('parameters'));
    }
});