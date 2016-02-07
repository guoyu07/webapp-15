import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'nav',
  currentPage: 1,
  pageOffset: 3,
  totalPages: null,
  targetRoute: null,

  previousPage: Ember.computed('currentPage', function() {
    return Math.max(this.get('currentPage') - 1, 1);
  }),
  nextPage: Ember.computed('currentPage', 'totalPages', function() {
    return Math.min(this.get('currentPage') + 1, this.get('totalPages'));
  }),

  hasPreviousPage: Ember.computed('previousPage', 'currentPage', function() {
    return this.get('previousPage') < this.get('currentPage');
  }),
  hasNextPage: Ember.computed('nextPage', 'currentPage', function() {
    return this.get('nextPage') > this.get('currentPage');
  }),

  showPagination: Ember.computed.gt('totalPages', 1),

  pages: Ember.computed('currentPage', 'totalPages', 'pageOffset', function() {

    const currentPage = this.get('currentPage');
    const totalPages = this.get('totalPages');
    const pageOffset = this.get('pageOffset');
    const displayedPages = pageOffset * 2 + 1;

    // Process the lower and upper bounds
    let firstPage = Math.max(currentPage - pageOffset, 1);
    let lastPage = Math.min(currentPage + pageOffset, totalPages);

    // Extend the lower and upper bounds in case there is not enough pages
    const missingPages = displayedPages - (lastPage - firstPage + 1);
    if (missingPages > 0) {
      firstPage = Math.max(firstPage - missingPages, 1);
      lastPage = Math.min(lastPage + missingPages, totalPages);
    }

    // Build the pages array
    let pages = [];
    for (let i = firstPage; i <= lastPage; i++) {
      pages.push({
        number: i,
        isCurrent: (i === currentPage)
      });
    }
    return pages;
  })
});
