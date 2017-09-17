import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  review: null,

  showReplyForm: computed.and('sessionUser.user.isAdmin', 'review.hasReply'),

  titleName: computed('review.isHostReview', 'review.host.farmName', 'review.reviewee.firstName', function () {
    return this.get('review.isHostReview') === true ?
      this.get('review.host.farmName') :
      this.get('review.reviewee.firstName');
  }),

  actions: {
    setRating(rating) {
      this.set('review.rating', rating);
    }
  }
});
