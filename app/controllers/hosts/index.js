/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['application', 'departments', 'activities'],

    // Whether the controller is currently loading data
    isLoading: false,

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

            // Return early if already loading
            if (this.get('isLoading')) {
                return;
            }

            // Set controller loading state
            this.set('isLoading', true);

            // Find hosts
            var self = this;
            this.store
                .find('host', this.get('parameters'))
                .then(function (hosts) {
                    self.set('content', hosts);
                    self.set('isLoading', false);
                });
        },
        loadMoreHosts: function () {

            // Return early if already loading
            if (this.get('isLoading')) {
                return;
            }

            // Set controller loading state
            this.set('isLoading', true);

            // Initialize variables
            var newOffset = this.store.metadataFor('host').offset + 20,
                params = Ember.$.extend(true, this.get('parameters') || {}, {offset: newOffset}),
                self = this;

            // Find next page of content and update
            this.store.find('host', params).then(function (hosts) {
                self.get('content').addObjects(hosts.get('content'));
                self.set('isLoading', false);
            });
        }
    }
});