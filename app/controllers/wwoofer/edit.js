import Ember from 'ember';
import Validations from 'webapp/validations/wwoofer';

export default Ember.Controller.extend(Validations, {
  actions: {
    saveWwoofer() {

      // Get wwoofer and address
      let wwoofer = this.get('wwoofer');

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Update wwoofer and address
          wwoofer.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));
            window.scrollTo(0, 0);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        }
      });
    }
  }
});
