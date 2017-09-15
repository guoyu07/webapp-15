import Ember from 'ember';
import UserValidations from 'webapp/validations/user/edit';
import IntroValidations from 'webapp/validations/user/intro';
import AddressValidations from 'webapp/validations/user/address';
import PhoneValidations from 'webapp/validations/user/phone';

const { computed } = Ember;

export default Ember.Controller.extend(UserValidations, IntroValidations, AddressValidations, PhoneValidations, {

  user: null,
  address: null,
  selectedDate: null,

  /**
   * Hosts do not have a user address, skip validation.
   */
  disableAddressValidation: computed.empty('address.id'),

  actions: {
    saveUser() {

      // Get the models
      let user = this.get('user');
      let address = this.get('address');

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          let promises = [user.save()];
          if (address) {
            promises.push(address.save());
          }

          // Save all models
          Ember.RSVP.all(promises).then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));

            // Refresh the session across all tabs
            this.get('sessionUser').refresh();
          }).catch((err)=> {
            if (Ember.get(err, 'errors.firstObject.status') === '409') {
              this.get('notify').error(this.get('i18n').t('notify.emailAddressInUse'));
            } else {
              throw err;
            }
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        }
      });
    },

    dateSelected(date) {
      this.set('user.birthDate', date.format('YYYY-MM-DD'));
    },

    countryDidChange(country) {
      this.set('address.country', country);
    },

    departmentDidChange(department) {
      this.set('address.department', department);
    }
  }
});
