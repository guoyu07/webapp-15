import Ember from 'ember';
import Validations from 'webapp/validations/review';

export default Ember.Controller.extend(Validations, {

  queryParams: ['from'],

  from: '',

  actions: {
    saveReview(review) {

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Update review
          review.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.reviewUpdated'));

            // Redirect user
            if (this.get('from') === 'admin') {
              this.transitionToRoute('reviews.index');
            } else if (review.get('isHostReview')) {
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
