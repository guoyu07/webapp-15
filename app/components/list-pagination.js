import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'nav',
    currentPage: 1,
    pageOffset: 3,
    totalPages: null,
    targetRoute: null,

    previousPage: Ember.computed('currentPage', function () {
        return Math.max(this.get('currentPage') - 1, 1);
    }),
    nextPage: Ember.computed('currentPage', 'totalPages', function () {
        return Math.min(this.get('currentPage') + 1, this.get('totalPages'));
    }),

    hasPreviousPage: Ember.computed('previousPage', 'currentPage', function () {
        return this.get('previousPage') < this.get('currentPage');
    }),
    hasNextPage: Ember.computed('nextPage', 'currentPage', function () {
        return this.get('nextPage') > this.get('currentPage');
    }),

    pages: Ember.computed('currentPage', 'totalPages', 'pageOffset', function () {

        var currentPage = this.get('currentPage');
        var totalPages = this.get('totalPages');
        var pageOffset = this.get('pageOffset');
        var displayedPages = pageOffset * 2 + 1;

        // Process the lower and upper bounds
        var firstPage = Math.max(currentPage - pageOffset, 1);
        var lastPage = Math.min(currentPage + pageOffset, totalPages);

        // Extend the lower and upper bounds in case there is not enough pages
        var missingPages = displayedPages - (lastPage - firstPage + 1);
        if (missingPages > 0) {
            firstPage = Math.max(firstPage - missingPages, 1);
            lastPage = Math.min(lastPage + missingPages, totalPages);
        }

        // Build the pages array
        var pages = [];
        for (var i = firstPage; i <= lastPage; i++) {
            pages.push({
                number: i,
                isCurrent: (i === currentPage)
            });
        }
        return pages;
    })
});
