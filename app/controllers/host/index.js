import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  isActiveMember: computed.readOnly('sessionUser.user.hasActiveMembership'),

  showNote: computed.and('model.note', 'sessionUser.user.isAdmin'),

  isCurrentUserProfile: computed('sessionUser.user.id', 'model.user.id', function() {
    return this.get('sessionUser.user.id') === this.get('model.user.id');
  }),

  showEditProfileButton: computed.or('sessionUser.user.isAdmin', 'isCurrentUserProfile'),

  disableNewReview: computed('session.isAuthenticated', 'sessionUser.user.hasWwooferMemberships',
    'model.reviews.@each.author', 'model.reviews.@each.isNew', 'sessionUser.user.id', function () {
    if (!this.get('session.isAuthenticated')) {
      return false;
    }
    if (!this.get('sessionUser.user.hasWwooferMemberships')) {
      return true;
    }

    // Disable new review button if the current wwoofer has already reviewed the host
    let authorIds = this.get('model.reviews').filterBy('isNew', false).mapBy('author.id');
    let userId = this.get('sessionUser.user.id');

    return authorIds.includes(userId);
  }),

  actions: {
    /**
     * Adds or removes the host to the user's favorites.
     */
    toggleFavorites(host, user) {
      if (host.get('isFavorite')) {
        this.send('removeUserFavorite', host, user);
      } else {
        this.send('addUserFavorite', host, user);
      }
    },
    writeNewReview() {
      if (!this.get('session.isAuthenticated')) {
        return this.transitionToRoute('login');
      }
      this.transitionToRoute('reviews.new', { queryParams: { hostId: this.get('model.id') } });
    },
    deleteReview(review) {
      let confirmed = confirm(this.get('i18n').t('host.index.areYouSure'));

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
