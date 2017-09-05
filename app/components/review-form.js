import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  review: null,

  showReplyForm: computed.and('sessionUser.user.isAdmin', 'review.hasReply'),

  actions: {
    setRating(rating) {
      this.set('review.rating', rating);
    }
  }
});
