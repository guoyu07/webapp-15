/**
 * Ember controller for wwoofers index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['countries', 'application'],

    // Whether the controller is in loading state
    isLoading: false,

    // Query parameters bound with the URL
    queryParams: ['searchTerm', 'country'],

    // Search filters
    searchTerm: null,
    country: null
});
