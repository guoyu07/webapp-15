import Ember from 'ember';
import Validations from 'webapp/validations/wwoofer';

export default Ember.Controller.extend(Validations, {
  actions: {
    saveWwoofer() {

      // Get the wwoofer
      let wwoofer = this.get('wwoofer');

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Create the wwoofer
          wwoofer.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.wwooferCreated'));

            // Refresh the session across all tabs
            this.get('sessionUser').refresh();
            
            this.transitionToRoute('wwoofer.address', wwoofer);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
