import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  user: null,

  isCurrentUserProfile: computed('sessionUser.user.id', 'user.id', function() {
    return this.get('sessionUser.user.id') === this.get('user.id');
  }),

  showNote: computed.and('user.note', 'sessionUser.user.isAdmin'),

  showEditProfileButton: computed.or('sessionUser.user.isAdmin', 'isCurrentUserProfile'),

  hasPhone: computed.notEmpty('user.phone'),
  showPhone: computed.and('hasPhone', 'sessionUser.user.hasActiveMembership'),

  disableNewReview: computed('session.isAuthenticated', 'sessionUser.user.hasHostMemberships',
    'user.receivedReviews.@each.author', 'user.receivedReviews.@each.isNew', 'sessionUser.user.id', function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      if (!this.get('sessionUser.user.hasHostMemberships')) {
        return true;
      }

      // Disable new review button if the host currently authenticated has already reviewed the wwoofer
      let authorIds = this.get('model.receivedReviews').filterBy('isNew', false).mapBy('author.id');
      let userId = this.get('sessionUser.user.id');

      return authorIds.includes(userId);
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

        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.reviewDeleted'));
        });
      }
    },
    saveReviewReply(review) {
      let promise = review.save();

      promise.then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.replySubmitted'));
      });
    }
  }
});
