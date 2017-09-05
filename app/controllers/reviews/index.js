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
      this.set('isApprovingReview', true);

      let url = [config.apiHost, config.apiNamespace, 'reviews', review.get('id'), 'approve'].join('/');
      let promise = this.get('ajax').post(url);

      promise.then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.reviewApproved'));
        this.send('refresh');
      });

      promise.finally(() => {
        review.reload();
        this.set('isApprovingReview', false);
      });
    },
    deleteReview(review) {
      let confirmed = confirm(this.get('i18n').t('reviews.index.areYouSure'));

      if (confirmed) {
        let promise = review.destroyRecord();

        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.reviewDeleted'));
          this.send('refresh');
        });
      }
    },
    approveReply(review) {
      this.set('isApprovingReview', true);

      let url = [config.apiHost, config.apiNamespace, 'reviews', review.get('id'), 'approveReply'].join('/');
      let promise = this.get('ajax').post(url);

      promise.then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.replyApproved'));
        this.send('refresh');
      });

      promise.finally(() => {
        review.reload();
        this.set('isApprovingReview', false);
      });
    },
    deleteReply(review) {
      let confirmed = confirm(this.get('i18n').t('reviews.index.areYouSureReply'));

      if (confirmed) {
        review.set('replyText', null);
        let promise = review.save();

        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.replyDeleted'));
          this.send('refresh');
        });
      }
    }
  }
});
