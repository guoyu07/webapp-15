import Ember from 'ember';
import Validations from 'webapp/validations/user/intro';

export default Ember.Controller.extend(Validations, {
  actions: {
    saveWwoofer() {

      let user = this.get('user');

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          user.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));

            // Refresh the session across all tabs
            this.get('sessionUser').refresh();

            this.transitionToRoute('become-wwoofer.contact');
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
