import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  queryParams: ['page', 'itemsPerPage', 'pendingApproval', 'searchTerm'],

  page: 1,
  itemsPerPage: 20,
  pendingApproval: true,
  searchTerm: '',

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('reviews.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('reviews.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  }),

  actions: {
    togglePendingApproval() {
      this.toggleProperty('pendingApproval');
    }
  }
});
