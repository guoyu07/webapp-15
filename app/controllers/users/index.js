import Ember from 'ember';

export default Ember.Controller.extend({

  users: [],

  queryParams: ['page', 'itemsPerPage', 'searchTerm'],

  /**
   * The current page.
   */
  page: 1,

  /**
   * Number of memberships displayed per page.
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

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: Ember.computed('users.meta.total', 'itemsPerPage', function() {
    var totalItems = this.get('users.meta.total');
    var itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  })
});
