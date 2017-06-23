import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({
  media: service('media'),

  queryParams: ['page', 'itemsPerPage'],

  page: 1,
  itemsPerPage: 5,

  conversations: [],

  totalPages: computed('conversations.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('conversations.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  })
});
