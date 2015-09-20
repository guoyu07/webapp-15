import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: ['page', 'itemsPerPage'],

    /**
     * The current page.
     */
    page: 1,

    /**
     * Number of memberships displayed per page.
     */
    itemsPerPage: 20,

    /**
     * Process the total number of pages that can be displayed.
     */
    totalPages: Ember.computed('model.meta.total', 'itemsPerPage', function() {
        var totalItems = this.get('model.meta.total');
        var itemsPerPage = this.get('itemsPerPage');
        return Math.ceil(totalItems / itemsPerPage);
    })
});
