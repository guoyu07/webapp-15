import Ember from 'ember';
import Validations from 'webapp/validations/review';

const { computed } = Ember;

export default Ember.Controller.extend(Validations, {
  /**
   * Indicates whether the host contact info can be displayed to the current user.
   */
  isActiveMember: computed.readOnly('sessionUser.user.hasNonExpiredMembership'),

  /**
   * Indicates whether the notes about the host should be displayed.
   * Only admin can see host notes.
   */
  showNote: computed.and('model.note', 'sessionUser.user.isAdmin'),

  /**
   * Indicates whether the authenticated user owns the current host profile.
   */
  isCurrentUserProfile: computed('sessionUser.user.id', 'model.user.id', function() {
    return this.get('sessionUser.user.id') === this.get('model.user.id');
  }),

  review: null,
  showReviewModal: false,
  showDeleteReviewModal: false,

  /**
   * Indicates whether the edit profile buttons should be displayed.
   */
  showEditProfileButton: computed.or('sessionUser.user.isAdmin', 'isCurrentUserProfile'),

  /**
   * Disable new review button if the current wwoofer has already reviewed the host.
   */
  disableNewReview: computed('session.isAuthenticated', 'sessionUser.user.hasNonExpiredWwooferMembership',
    'model.reviews.@each.author', 'model.reviews.@each.isNew', 'sessionUser.user.id', function () {
    if (!this.get('session.isAuthenticated')) {
      return false;
    }
    if (!this.get('sessionUser.user.hasNonExpiredWwooferMembership')) {
      return true;
    }

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
    /**
     * Submits a review for the current host.
     */
    submitReview(review) {

      this.validate().then(({ m, validations })=> {

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          let isNew = review.get('isNew');
          let promise = review.save();

          promise.then(()=> {
            this.set('review', null);
            this.set('showReviewModal', false);

            if (isNew) {
              this.get('notify').success(this.get('i18n').t('notify.reviewSubmitted'));
            }
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },
    writeNewReview() {
      if (!this.get('session.isAuthenticated')) {
        return this.transitionToRoute('login');
      }

      let review = this.get('review');

      if (!review || !review.get('isNew')) {
        let host = this.get('model');
        let author = this.get('sessionUser.user');

        review = this.store.createRecord('review', {
          host,
          author
        });

        this.set('review', review);
      }

      this.set('showReviewModal', true);
    },
    editReview(review) {
      this.set('review', review);
      this.set('showReviewModal', true);
    },
    deleteReview(review) {
      let promise = review.destroyRecord();

      promise.then(()=> {
        this.set('review', null);
        this.set('showDeleteReviewModal', false);
      });
    },
    openDeleteReviewModal(review) {
      this.set('review', review);
      this.set('showDeleteReviewModal', true);
    },
    closeDeleteReviewModal() {
      this.set('showDeleteReviewModal', false);
    },
    closeReviewModal() {
      this.set('showReviewModal', false);
    },
    saveReviewReply(review) {
      let promise = review.save();

      promise.then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.replySubmitted'));
      });
    }
  }
});
