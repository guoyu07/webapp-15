import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  user: null,

  isCurrentUserProfile: computed('sessionUser.user.id', 'user.id', function() {
    return this.get('sessionUser.user.id') === this.get('user.id');
  }),

  showNote: computed.and('user.note', 'sessionUser.user.isAdmin'),

  canEditProfile: computed.or('sessionUser.user.isAdmin', 'isCurrentUserProfile'),

  showReviewLink: computed('user.hasWwooferMemberships', 'sessionUser.user.hasHostMemberships', 'user.receivedReviews.@each.author', 'user.receivedReviews.@each.isNew', 'sessionUser.user.id', function() {
    let showReviewLink = false;

    if (!this.get('user.hasWwooferMemberships')) {
      showReviewLink = false;
    } else if (this.get('sessionUser.user.hasHostMemberships')) {

      // Check if the host currently authenticated has already reviewed the wwoofer
      let authorIds = this.get('user.receivedReviews').filterBy('isNew', false).mapBy('author.id');
      let userId = this.get('sessionUser.user.id');

      showReviewLink = !authorIds.includes(userId);
    }

    return showReviewLink;
  }),

  actions: {
    writeNewReview() {
      if (!this.get('session.isAuthenticated')) {
        return this.transitionToRoute('login');
      }
      this.transitionToRoute('reviews.new', {
        queryParams: {
          revieweeId: this.get('user.id')
        }
      });
    },
    deleteReview(review) {
      let confirmed = confirm(this.get('i18n').t('user.index.areYouSure'));

      if (confirmed) {
        let promise = review.destroyRecord();

        promise.then(() => {
          this.get('notify').success(this.get('i18n').t('notify.reviewDeleted'));
        });
      }
    },
    saveReviewReply(review) {
      let promise = review.save();

      promise.then(() => {
        this.get('notify').success(this.get('i18n').t('notify.replySubmitted'));
      });
    }
  }
});
