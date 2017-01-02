import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';
import Validations from 'webapp/validations/host/address';

const { computed } = Ember;

export default Ember.Controller.extend(Validations, {

  countriesService: Ember.inject.service('countries'),

  countries: computed.readOnly('countriesService.hostCountries'),

  instructions: t('address-form.hostInstructions'),

  actions: {
    saveAddress() {

      let host = this.get('host');
      let address = this.get('address');
      let user = this.get('user');
      const isNewAddress = address.get('isNew');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Create or update the address, update the user
          let promise = [address.save(), user.save()];

          // Set the host's address (now that it has a valid id), then update the host
          promise = Ember.RSVP.all(promise).then(()=> {
            host.set('address', address);
            return host.save();
          });

          promise.then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.addressSaved'));
            if (isNewAddress) {
              this.transitionToRoute('host.photos', host);
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
