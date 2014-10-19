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
    model: function (params) {
        return this.store.find('host', params);
    },
    actions: {
        searchHosts: function () {
            this.refresh();
        }
    }
});