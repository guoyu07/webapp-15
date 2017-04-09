import DS from 'ember-data';
import Ember from 'ember';

const { service } = Ember.inject;
const { computed } = Ember;

export default DS.Model.extend({
  sessionUser: service('sessionUser'),

  // Attributes
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  text: DS.attr('string'),

  // Relationships
  conversation: DS.belongsTo('conversation', { async: false }),
  author: DS.belongsTo('user', { async: true }),

  /**
   * Indicates whether the authenticated user is the author of the review.
   */
  isCurrentUserAuthor: computed('sessionUser.user.id', 'author.id', function() {
    return this.get('sessionUser.user.id') === this.get('author.id');
  }),
});
