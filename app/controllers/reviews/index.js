import Ember from 'ember';
import config from 'webapp/config/environment';
import Validations from 'webapp/validations/review';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  ajax: service('ajax'),

  queryParams: ['page', 'itemsPerPage', 'pendingApproval', 'searchTerm'],

  page: 1,
  itemsPerPage: 20,
  pendingApproval: true,
  searchTerm: '',

  review: null,
  isApprovingReview: false,

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('reviews.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('reviews.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  }),

  actions: {
    togglePendingApproval() {
      this.toggleProperty('pendingApproval');
    },
    approveReview(review) {

      this.validate().then(({ m, validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          this.set('isApprovingReview', true);
          let promise = review.save();

          promise = promise.then(()=> {
            let action = review.get('approvedAt') ? 'approveReply' : 'approve';
            let url = [config.apiHost, config.apiNamespace, 'reviews', review.get('id'), action].join('/');
            return this.get('ajax').post(url);
          });

          promise.then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.reviewApproved'));
            this.set('review', null);
            this.send('refresh');
          });

          promise.finally(() => {
            review.reload();
            this.set('isApprovingReview', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },
    deleteReview(review) {
      let promise = review.destroyRecord();

      promise.then(()=> {
        this.set('review', null);
        this.send('refresh');
      });
    },
    openReviewModal(review) {
      this.set('review', review);
    },
    closeReviewModal() {
      this.set('review', null);
    }
  }
});
