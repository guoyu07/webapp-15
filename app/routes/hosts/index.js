/**
 * Ember route for hosts index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        department: {
            refreshModel: true
        },
        activities: {
            refreshModel: true
        },
        pendingOnly: {
            refreshModel: true
        }
    },
    beforeModel: function () {
        this.controllerFor('hosts.index').set('isLoading', true);
    },
    model: function (params) {
        return this.store.find('host', params);
    },
    afterModel: function() {
        this.controllerFor('hosts.index').set('isLoading', false);
    },
    actions: {
        searchHosts: function () {
            this.refresh();
        }
    }
});