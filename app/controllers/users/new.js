/**
 * Ember controller for user creation.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

  /**
   * Indicates whether the user's first name, last name and birth date can be edited.
   */
  canEditUser: true,

  termsOk: false,
  insuranceOk: false,
  selectedDate: null,

  actions: {
    saveUser() {

      // Get user
      var user = this.get('model');

      // Make sure all checkboxes are checked
      if (!this.get('termsOk') || !this.get('insuranceOk')) {
        this.get('notify').error(this.get('i18n').t('notify.mustAgreeTerms'));
        return;
      }

      // Set birth date
      user.set('birthDate', this.get('selectedDate').format('YYYY-MM-DD'));

      // Initialize validations array
      var validations = [this.validate(), user.validate()];

      // Save the user
      Ember.RSVP.all(validations).then(()=> {
        user.save().then(()=> {
          // Authenticate user
          var auth = this.get('session').authenticate('authenticator:passport', {
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
      this.set('selectedDate', date);
    }
  },

  validations: {
    selectedDate: {
      'is-18': true
    }
  }
});
