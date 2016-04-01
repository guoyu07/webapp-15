import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  countriesService: Ember.inject.service('countries'),

  queryParams: ['page', 'itemsPerPage', 'searchTerm', 'country'],

  /**
   * The current page.
   */
  page: 1,

  /**
   * Number of users displayed per page.
   */
  itemsPerPage: 20,

  /**
   * Whether the controller is in loading state.
   */
  isLoading: false,

  /**
   * Search filters.
   */
  searchTerm: '',
  country: null,

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('wwoofers.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('wwoofers.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  }),

  actions: {
    countryDidChange(country) {
      const id = country ? country.id : null;
      this.set('country', id);
      this.set('selectedCountry', country);
    }
  }
});
