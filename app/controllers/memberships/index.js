import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  queryParams: ['page', 'itemsPerPage', 'userId', 'includeBooklet'],

  page: 1,
  itemsPerPage: 20,
  includeBooklet: false,
  userId: null,

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('memberships.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('memberships.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  })
});
