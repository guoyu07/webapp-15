import Ember from 'ember';
import Validations from 'webapp/validations/host';

export default Ember.Controller.extend(Validations, {
  actions: {
    saveHost() {

      // Get the host
      let host = this.get('host');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          // Create the host
          host.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.hostCreated'));

            // Refresh the session across all tabs
            this.get('sessionUser').refresh();

            this.transitionToRoute('host.address', host);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        }
      });
    }
  }
});
