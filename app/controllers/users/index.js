import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  users: [],

  queryParams: ['page', 'itemsPerPage', 'searchTerm', 'isSuspended'],

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
  isSuspended: false,

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('users.meta.total', 'itemsPerPage', function() {
    var totalItems = this.get('users.meta.total');
    var itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  })
});
