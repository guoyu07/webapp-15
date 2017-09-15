import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';
import AddressValidations from 'webapp/validations/user/address';
import PhoneValidations from 'webapp/validations/user/phone';

export default Ember.Controller.extend(AddressValidations, PhoneValidations, {

  instructions: t('address-form.wwooferInstructions'),

  actions: {
    saveContactInfo() {

      let user = this.get('user');
      let address = this.get('address');

      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          let promise = address.save();

          // Set the users's address (now that it has a valid id), then update the user
          promise = promise.then(()=> {
            user.set('address', address);
            return user.save();
          });

          promise.then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.addressSaved'));

            this.transitionToRoute('memberships.new', {
              queryParams: { type: 'W', itemCode: 'WO1' }
            });
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        }
      });
    },

    countryDidChange(country) {
      this.set('address.country', country);
    },

    departmentDidChange(department) {
      this.set('address.department', department);
    }
  }
});
