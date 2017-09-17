import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { service } = Ember.inject;

export default DS.Model.extend({
  sessionUser: service('sessionUser'),

  text: DS.attr('string'),
  rating: DS.attr('number'),
  approvedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  replyText: DS.attr('string'),
  replyApprovedAt: DS.attr('date'),

  // Relationships
  author: DS.belongsTo('user', { async: true }),
  reviewee: DS.belongsTo('user', { async: true }),
  host: DS.belongsTo('host', { async: true }),

  isHostReview: computed.notEmpty('host.id'),
  isWwooferReview: computed.not('isHostReview'),

  hasOneStar: computed.gte('rating', 1),
  hasTwoStars: computed.gte('rating', 2),
  hasThreeStars: computed.gte('rating', 3),
  hasFourStars: computed.gte('rating', 4),
  hasFiveStars: computed.gte('rating', 5),

  hasReply: computed.notEmpty('replyText'),
  isApproved: computed.notEmpty('approvedAt'),
  isReplyApproved: computed.notEmpty('replyApprovedAt'),

  /**
   * Indicates whether the authenticated user is the author of the review.
   */
  isCurrentUserAuthor: computed('sessionUser.user.id', 'author.id', function() {
    return this.get('sessionUser.user.id') === this.get('author.id');
  }),

  canDelete: computed.or('sessionUser.user.isAdmin', 'isCurrentUserAuthor'),

  canEdit: computed('sessionUser.user.isAdmin', 'isCurrentUserAuthor', 'isApproved', function () {
    let canEdit = false;
    if (this.get('isCurrentUserAuthor') === true && this.get('isApproved') === false) {
      canEdit = true;
    } else if (this.get('sessionUser.user.isAdmin')) {
      canEdit = true;
    }
    return canEdit;
  }),

  canViewReply: computed('sessionUser.user.isAdmin', 'hasReply', 'isReplyApproved', function () {
    let canViewReply = false;
    if (this.get('hasReply')) {
      if (this.get('isReplyApproved')) {
        canViewReply = true;
      } else if (this.get('sessionUser.user.isAdmin')) {
        canViewReply = true;
      }
    }
    return canViewReply;
  }),

  textCharLeft: computed('text.length', function () {
    let length = this.get('text.length') || 0;
    return Math.max(0, 1000 - length);
  }),

  replyTextCharLeft: computed('replyText.length', function () {
    let length = this.get('replyText.length') || 0;
    return Math.max(0, 1000 - length);
  }),

  revieweeName: computed('isHostReview', 'host.farmName', 'wwoofer.user.firstName', function () {
    return this.get('isHostReview') === true ? this.get('host.farmName') : this.get('wwoofer.user.firstName');
  })
});
