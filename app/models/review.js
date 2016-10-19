import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { service } = Ember.inject;

export default DS.Model.extend({
  sessionUser: service('sessionUser'),

  text: DS.attr('string'),
  rating: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host', { async: true }),
  wwoofer: DS.belongsTo('wwoofer', { async: true }),
  author: DS.belongsTo('user', { async: true }),

  isHostReview: computed.notEmpty('host.id'),
  isWwooferReview: computed.notEmpty('wwoofer.id'),

  hasOneStar: computed.gte('rating', 1),
  hasTwoStars: computed.gte('rating', 2),
  hasThreeStars: computed.gte('rating', 3),
  hasFourStars: computed.gte('rating', 4),
  hasFiveStars: computed.gte('rating', 5),

  /**
   * Indicates whether the authenticated user is the author of the review.
   */
  isCurrentUserAuthor: computed('sessionUser.user.id', 'author.id', function() {
    return this.get('sessionUser.user.id') === this.get('author.id');
  }),

  canDelete: computed.or('sessionUser.user.isAdmin', 'isCurrentUserAuthor'),

  canEdit: computed('sessionUser.user.isAdmin', 'isCurrentUserAuthor', 'approvedAt', function () {
    let authorCanEdit = this.get('isCurrentUserAuthor') && Ember.isEmpty(this.get('approvedAt'));
    return this.get('sessionUser.user.isAdmin') || authorCanEdit;
  })
});
