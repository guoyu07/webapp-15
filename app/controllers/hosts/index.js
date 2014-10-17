/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['application', 'departments', 'activities'],

    // Whether the controller is currently loading data
    isLoading: false,

    // Query parameters bound with the URL
    queryParams: ['searchTerm', 'department', 'activities'],

    // Search filters
    searchTerm: null,
    department: null,
    activities: [],
    pendingOnly: false,

    // Bindings
    departmentFilterOptionsBinding: 'controllers.departments',
    currentUserIsAdminBinding: 'controllers.application.currentUserIsAdmin',
    allActivitiesBinding: 'controllers.activities.allActivities',

    parameters: function () {
        return {
            'searchTerm': Ember.$.trim(this.get('searchTerm')) || null,
            'department': this.get('department') || null,
            'pendingOnly': this.get('pendingOnly'),
            'activities': this.get('activities') || null
        };
    }.property('searchTerm', 'department', 'pendingOnly', 'activities'),

    totalHosts: function () {
        return this.store.metadataFor('host').total;
    }.property('model', 'model.@each', 'model.length'),

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
            this.store.find('host', this.get('parameters')).then(function (hosts) {
                self.set('model', hosts);
            }).catch(function () {
                alertify.error('Something went wrong, try again later :(');
            }).finally(function () {
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
                params = Ember.$.extend(true, this.get('parameters') || {}, { offset: newOffset }),
                self = this;

            // Find next page of content and update
            this.store.find('host', params).then(function (hosts) {
                self.get('content').addObjects(hosts.get('content'));
            }).catch(function () {
                alertify.error('Something went wrong, try again later :(');
            }).finally(function () {
                self.set('isLoading', false);
            });
        }
    }
});