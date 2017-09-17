import Ember from 'ember';
import Validations from 'webapp/validations/review';

export default Ember.Controller.extend(Validations, {

  queryParams: ['revieweeId', 'hostId'],

  revieweeId: null,
  hostId: null,

  review: null,

  actions: {
    submitReview(review) {

      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          review.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.reviewSubmitted'));

            if (review.get('isHostReview')) {
              this.transitionToRoute('host.index', review.get('host.id'));
            } else {
              this.transitionToRoute('user.index', review.get('reviewee.id'));
            }
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
