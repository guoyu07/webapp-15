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
  searchTerm: '',
  country: null,

  // Query parameters
  parameters: function() {
    return {
      'searchTerm': this.get('searchTerm') || null,
      'country': this.get('country') || null
    };
  }.property('searchTerm', 'country'),

  actions: {
    loadMoreWwoofers() {

      // Set controller loading state
      this.set('isLoadingMore', true);

      // Initialize variables
      var newOffset = this.store.metadataFor('wwoofer').offset + 20;
      var params = Ember.$.extend(true, this.get('parameters') || {}, { offset: newOffset });

      // Find next page of content and update
      this.store.find('wwoofer', params).then((wwoofers)=> {
        if (wwoofers.get('content').length) {
          this.get('content').addObjects(wwoofers.get('content'));
        } else {
          this.get('notify').log(this.get('i18n').t('notify.noMoreWwoofers'));
        }
      }).finally(()=> {
        this.set('isLoadingMore', false);
      });
    }
  }
});
