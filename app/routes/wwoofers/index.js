/**
 * Ember route for wwoofers index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function () {
        this.controllerFor('wwoofers.index').set('isLoading', true);
    },
    model: function (params) {
        return this.store.find('wwoofer', params);
    },
    afterModel: function() {
        this.controllerFor('wwoofers.index').set('isLoading', false);
    },
    actions: {
        searchWwoofers: function () {
            this.refresh();
        }
    }
});