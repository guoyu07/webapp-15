import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  queryParams: ['page', 'itemsPerPage'],

  user: null,

  page: 1,
  itemsPerPage: 20,
  isLoading: false,

  currentFavorites: computed('user.favorites.length', 'itemsPerPage', 'page', function () {
    let currentFavorites = null;
    let favorites = this.get('user.favorites');
    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');

    if (Ember.isPresent(favorites)) {
      let end = page * itemsPerPage;
      let start = Math.max(0, end - itemsPerPage);
      currentFavorites = favorites.slice(start, end);
    }

    return currentFavorites;
  }),

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('user.favorites.length', 'itemsPerPage', function() {
    const totalItems = this.get('user.favorites.length');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  })
});
