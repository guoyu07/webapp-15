import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

const { computed } = Ember;

export default Ember.Controller.extend({

  countriesService: Ember.inject.service('countries'),

  countries: computed.readOnly('countriesService.hostCountries'),

  instructions: t('address-form.hostInstructions'),

  actions: {
    saveAddress() {

      let host = this.get('host');
      let address = this.get('address');
      let user = this.get('user');
      const isNewAddress = address.get('isNew');

      // Validate the address
      let promise = [address.validate(), user.validate(), host.validate()];

      Ember.RSVP.all(promise).then(()=> {

        // Create or update the address, update the user
        promise = [address.save(), user.save()];

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
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
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
