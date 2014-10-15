/**
 * Ember route for hosts index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return this.store.find('host', params);
    }
});