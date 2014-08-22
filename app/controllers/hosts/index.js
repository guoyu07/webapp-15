/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['application', 'departments', 'activities'],

    // Search filters
    pendingOnly: false,
    searchTerm: null,
    departmentFilter: null,
    selectedActivities: [],

    // Bindings
    departmentFilterOptionsBinding: 'controllers.departments',
    currentUserIsAdminBinding: 'controllers.application.currentUserIsAdmin',
    allActivitiesBinding: 'controllers.activities.allActivities',

    parameters: function () {
        return {
            'searchTerm': Ember.$.trim(this.get('searchTerm')) || null,
            'dpt': this.get('departmentFilter.id') || null,
            'pendingOnly': this.get('pendingOnly') || null,
            'selectedActivities': this.get('selectedActivities') || null
        };
    }.property('searchTerm', 'departmentFilter.id', 'pendingOnly', 'selectedActivities'),

    totalHosts: function () {
        return this.store.metadataFor('host').total;
    }.property('content', 'content.@each', 'content.length'),

    actions: {
        searchHosts: function () {
            var self = this;
            this.store
                .find('host', this.get('parameters'))
                .then(function (hosts) {
                    self.set('content', hosts);
                });
        },
        loadMoreHosts: function () {
            // Initialize variables
            var newOffset = this.store.metadataFor('host').offset + 20,
                params = Ember.$.extend(true, this.get('parameters') || {}, {offset: newOffset}),
                self = this;

            // Find next page of content and update
            this.store.find('host', params).then(function (hosts) {
                self.get('content').addObjects(hosts.get('content'));
            });
        }
    }
});