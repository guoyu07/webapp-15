import Ember from 'ember';
import Validations from 'webapp/validations/users/new';

export default Ember.Controller.extend(Validations, {

  /**
   * Indicates whether the user's first/last name can be edited.
   */
  canEditName: true,

  /**
   * Indicates whether the user's birth date can be edited.
   */
  canEditBirthDate: true,

  termsOk: false,
  insuranceOk: false,
  selectedDate: null,

  actions: {
    saveUser() {

      // Get user
      let user = this.get('user');

      // Make sure all checkboxes are checked
      if (!this.get('termsOk') || !this.get('insuranceOk')) {
        this.get('notify').error(this.get('i18n').t('notify.mustAgreeTerms'));
        return;
      }

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Create the user
          user.save().then(()=> {

            // Authenticate user
            const auth = this.get('session').authenticate('authenticator:passport', {
              username: user.get('email'),
              password: user.get('password')
            });

            // Handle failure
            auth.catch(()=> {
              this.get('notify').error(this.get('i18n').t('notify.userCannotAuthenticate'));
            });

          }).catch((err)=> {
            if (Ember.get(err, 'errors.firstObject.status') === '409') {
              this.get('notify').error(this.get('i18n').t('notify.emailAddressInUse'));
            } else {
              throw err;
            }
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    dateSelected(date) {
      this.set('user.birthDate', date.format('YYYY-MM-DD'));
    }
  }
});
