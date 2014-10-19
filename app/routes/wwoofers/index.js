/**
 * Ember route for wwoofers index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return this.store.find('wwoofer', params);
    },
    actions: {
        searchWwoofers: function () {
            this.refresh();
        }
    }
});