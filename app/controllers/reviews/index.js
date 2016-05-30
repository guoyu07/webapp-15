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

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          let url = [config.apiHost, config.apiNamespace, 'reviews', review.get('id'), 'approve'].join('/');

          this.set('isApprovingReview', true);

          let promise = review.save();

          promise.then(()=> {
            return this.get('ajax').post(url);
          });

          promise.then(()=> {
            this.get('notify').success('The review was approved successfully.');

            this.set('review', null);

            this.send('refresh');
          });

          promise.catch(() => {
            this.get('notify').error({ html: this.get('i18n').t('notify.submissionError') });
          });

          promise.finally(() => {
            this.set('isApprovingReview', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
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
