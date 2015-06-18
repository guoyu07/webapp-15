/**
 * Ember controller for wwoofers index.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    countriesService: Ember.inject.service('countries'),

    // Query parameters bound with the URL
    queryParams: ['searchTerm', 'country'],

    // Whether the controller is in loading state
    isLoading: false,
    isLoadingMore: false,

    // Search filters
    searchTerm: null,
    country: null,

    // Query parameters
    parameters: function () {
        return {
            'searchTerm': this.get('searchTerm') || null,
            'country': this.get('country') || null
        };
    }.property('searchTerm', 'country'),

    actions: {
        loadMoreWwoofers: function () {

            // Set controller loading state
            this.set('isLoadingMore', true);

            // Initialize variables
            var newOffset = this.store.metadataFor('wwoofer').offset + 20,
                params = Ember.$.extend(true, this.get('parameters') || {}, { offset: newOffset }),
                self = this;

            // Find next page of content and update
            this.store.find('wwoofer', params).then(function (wwoofers) {
                if (wwoofers.get('content').length) {
                    self.get('content').addObjects(wwoofers.get('content'));
                } else {
                    alertify.log(Ember.I18n.t('notify.noMoreWwoofers'));
                }
            }).finally(function () {
                self.set('isLoadingMore', false);
            });
        }
    }
});
