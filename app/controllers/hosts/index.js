/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['countries', 'application', 'departments', 'activities'],

    // Query parameters bound with the URL
    queryParams: ['searchTerm', 'department', 'pendingOnly', 'activities'],

    // Whether the controller is in loading state
    isLoading: false,
    isLoadingMore: false,

    // Search filters
    searchTerm: null,
    department: null,
    activities: [],
    pendingOnly: false,

    // Bindings
    departmentFilterOptions: Ember.computed.alias('controllers.departments'),
    currentUserIsAdmin: Ember.computed.alias('controllers.application.currentUserIsAdmin'),
    allActivities: Ember.computed.alias('controllers.activities.allActivities'),

    // Query parameters
    parameters: function () {
        return {
            'searchTerm': Ember.$.trim(this.get('searchTerm')) || null,
            'department': this.get('department') || null,
            'pendingOnly': this.get('pendingOnly'),
            'activities': this.get('activities') || null
        };
    }.property('searchTerm', 'department', 'pendingOnly', 'activities'),

    actions: {
        loadMoreHosts: function () {

            // Return early if already loading
            if (this.get('isLoadingMore')) {
                return;
            }

            // Set controller loading state
            this.set('isLoadingMore', true);

            // Initialize variables
            var newOffset = this.store.metadataFor('host').offset + 10,
                params = Ember.$.extend(true, this.get('parameters') || {}, { offset: newOffset }),
                self = this;

            // Find next page of content and update
            this.store.find('host', params).then(function (hosts) {
                self.get('content').addObjects(hosts.get('content'));
            }).catch(function () {
                alertify.error('Something went wrong, try again later :(');
            }).finally(function () {
                self.set('isLoadingMore', false);
            });
        }
    }
});
