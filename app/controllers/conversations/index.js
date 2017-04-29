import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  conversations: [],

  queryParams: ['page', 'itemsPerPage'],

  page: 1,
  itemsPerPage: 5,

  totalPages: computed('conversations.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('conversations.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  })
});
