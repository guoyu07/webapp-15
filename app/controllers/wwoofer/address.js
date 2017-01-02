import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';
import Validations from 'webapp/validations/wwoofer/address';

export default Ember.Controller.extend(Validations, {

  instructions: t('address-form.wwooferInstructions'),

  actions: {
    saveAddress() {

      let wwoofer = this.get('wwoofer');
      let address = this.get('address');
      let user = this.get('user');
      const isNewAddress = address.get('isNew');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Create or update the address, update the user
          let promise = [address.save(), user.save()];

          // Set the wwoofer's address (now that it has a valid id), then update the wwoofer
          promise = Ember.RSVP.all(promise).then(()=> {
            wwoofer.set('address', address);
            return wwoofer.save();
          });

          promise.then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.addressSaved'));
            if (isNewAddress) {
              const itemCode = Ember.isPresent(wwoofer.get('lastName2')) ? 'WO2' : 'WO1';
              this.transitionToRoute('memberships.new', { queryParams: { type: 'W', itemCode } });
            }
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
