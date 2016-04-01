import Ember from 'ember';

export default Ember.Controller.extend({

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
      let user = this.get('model');

      // Make sure all checkboxes are checked
      if (!this.get('termsOk') || !this.get('insuranceOk')) {
        this.get('notify').error(this.get('i18n').t('notify.mustAgreeTerms'));
        return;
      }

      // Validate the user
      const validation = user.validate();
      validation.then(()=> {

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
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    },

    dateSelected(date) {
      this.set('model.birthDate', date.format('YYYY-MM-DD'));
    }
  }
});
