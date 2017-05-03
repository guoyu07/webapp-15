import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const {service} = Ember.inject;

export default DS.Model.extend({

  sessionUser: service('sessionUser'),

  // Attributes
  user1LastReadAt: DS.attr('date'),
  user2LastReadAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  messages: DS.hasMany('message', { async: false }),
  user1: DS.belongsTo('user', { async: true }),
  user2: DS.belongsTo('user', { async: true }),

  createdAtSortingDesc: ['createdAt:desc'],
  sortedMessages: computed.sort('messages', 'createdAtSortingDesc'),

  otherUser: computed('user1.id', 'user2.id', 'sessionUser.user.id', function () {
    let user1Id = this.get('user1.id');
    let user2Id = this.get('user2.id');
    let sessionUserId = this.get('sessionUser.user.id');

    let otherUser;
    if (user1Id === sessionUserId) {
      otherUser = this.get('user2');
    } else if (user2Id === sessionUserId) {
      otherUser = this.get('user1');
    }
    return otherUser;
  }),

  currentUserLastReadAt: computed('user1.id', 'user2.id', 'user1LastReadAt', 'user2LastReadAt', 'sessionUser.user.id', function () {
    let user1Id = this.get('user1.id');
    let user2Id = this.get('user2.id');
    let sessionUserId = this.get('sessionUser.user.id');

    let currentUserLastReadAt;
    if (user1Id === sessionUserId) {
      currentUserLastReadAt = this.get('user1LastReadAt');
    } else if (user2Id === sessionUserId) {
      currentUserLastReadAt = this.get('user2LastReadAt');
    }
    return currentUserLastReadAt;
  }),

  isRead: computed('currentUserLastReadAt', 'sessionUser.user.id', 'sortedMessages.firstObject.createdAt', 'sortedMessages.firstObject.author.id', function () {
    let currentUserLastReadAt = this.get('currentUserLastReadAt');
    let lastMessage = this.get('sortedMessages.firstObject');
    let lastMessageCreatedAt = lastMessage.get('createdAt');
    let isLastMessageAuthor = lastMessage.get('author.id') === this.get('sessionUser.user.id');
    let isRead = false;
    if (isLastMessageAuthor) {
      isRead = true;
    } else if (Ember.isPresent(currentUserLastReadAt) && (currentUserLastReadAt > lastMessageCreatedAt)) {
      isRead = true;
    }
    return isRead;
  })
});
