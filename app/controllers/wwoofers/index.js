import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  countriesService: Ember.inject.service('countries'),

  queryParams: ['page', 'itemsPerPage', 'searchTerm', 'country'],

  page: 1,
  itemsPerPage: 20,
  searchTerm: '',
  country: null,

  isLoading: false,
  wwoofers: [],

  totalPages: computed('wwoofers.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('wwoofers.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  }),

  actions: {
    countryDidChange(country) {
      // Reset pagination
      this.set('page', 1);
      
      const id = country ? country.id : null;
      this.set('country', id);
      this.set('selectedCountry', country);
    }
  }
});
