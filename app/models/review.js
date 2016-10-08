import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { service } = Ember.inject;

export default DS.Model.extend({
  sessionUser: service('sessionUser'),

  text: DS.attr('string'),
  recipient: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host', { async: true }),
  wwoofer: DS.belongsTo('wwoofer', { async: true }),

  isHostReview: computed.equal('recipient', 'host'),
  isWwooferReview: computed.equal('recipient', 'wwoofer'),

  reviewer: computed('recipient', 'host.user', 'wwoofer.user', function() {
    return this.get('recipient') === 'host' ? this.get('wwoofer.user') : this.get('host.user');
  }),

  /**
   * Indicates whether the authenticated user is the reviewer.
   */
  isCurrentUserReviewer: computed('sessionUser.user.id', 'reviewer.id', function() {
    return this.get('sessionUser.user.id') === this.get('reviewer.id');
  }),

  canDelete: computed.or('sessionUser.user.isAdmin', 'isCurrentUserReviewer'),

  canEdit: computed('sessionUser.user.isAdmin', 'isCurrentUserReviewer', 'approvedAt', function () {
    let authorCanEdit = this.get('isCurrentUserReviewer') && Ember.isEmpty(this.get('approvedAt'));
    return this.get('sessionUser.user.isAdmin') || authorCanEdit;
  })
});
