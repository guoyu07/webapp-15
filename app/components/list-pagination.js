import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'nav',
  currentPage: 1,
  pageOffset: 1,
  totalPages: null,
  targetRoute: null,

  attributeBindings: ['ariaLabel:aria-label'],
  ariaLabel: t('list-pagination.ariaLabel'),

  previousPage: computed('currentPage', function() {
    return Math.max(this.get('currentPage') - 1, 1);
  }),
  nextPage: computed('currentPage', 'totalPages', function() {
    return Math.min(this.get('currentPage') + 1, this.get('totalPages'));
  }),

  hasPreviousPage: computed('previousPage', 'currentPage', function() {
    return this.get('previousPage') < this.get('currentPage');
  }),
  hasNextPage: computed('nextPage', 'currentPage', function() {
    return this.get('nextPage') > this.get('currentPage');
  }),

  showFirstPage: computed('currentPage', function () {
    return this.get('currentPage') > this.get('displayedPages');
  }),

  showLastPage: computed('currentPage', 'totalPages', function () {
    return this.get('totalPages') > this.get('currentPage') + this.get('displayedPages');
  }),

  showPagination: computed.gt('totalPages', 1),

  displayedPages: computed('pageOffset', function() {
    let pageOffset = this.get('pageOffset');
    return pageOffset * 2 + 1;
  }),

  pages: computed('currentPage', 'totalPages', 'pageOffset', function() {

    let currentPage = this.get('currentPage');
    let totalPages = this.get('totalPages');
    let pageOffset = this.get('pageOffset');
    let displayedPages = this.get('displayedPages');

    // Process the lower and upper bounds
    let firstPage = Math.max(currentPage - pageOffset, 1);
    let lastPage = Math.min(currentPage + pageOffset, totalPages);

    // Extend the lower and upper bounds in case there is not enough pages
    let missingPages = displayedPages - (lastPage - firstPage + 1);
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
