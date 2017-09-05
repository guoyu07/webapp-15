import Ember from 'ember';
import Validations from 'webapp/validations/review';

export default Ember.Controller.extend(Validations, {

  queryParams: ['from'],

  from: 'host',

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
            let from = this.get('from');
            if (from === 'host') {
              this.transitionToRoute('host.index', review.get('host.id'));
            } else if (from === 'admin') {
              this.transitionToRoute('reviews.index');
            }
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
