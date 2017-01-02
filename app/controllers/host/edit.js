import Ember from 'ember';
import Validations from 'webapp/validations/host';

export default Ember.Controller.extend(Validations, {
  actions: {
    saveHost() {

      // Get host
      let host = this.get('host');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Update the host
          host.save().then(()=> {
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
