import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

const { computed } = Ember;

export default Ember.Controller.extend({

  countriesService: Ember.inject.service('countries'),
  departmentsService: Ember.inject.service('departments'),

  countries: computed.readOnly('countriesService.hostCountries'),

  instructions: t('address.form.hostInstructions'),

  actions: {
    saveAddress() {

      var host = this.get('host');
      var address = this.get('address');
      var isNewAddress = address.get('isNew');

      // Validate the address
      var promise = address.validate();

      promise.then(()=> {

        // Create or update the address
        promise = address.save();

        // Set the host's address (now that it has a valid id), then update the host
        if (isNewAddress) {
          promise = promise.then(()=> {
            host.set('address', address);
            return host.save();
          });
        }

        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.addressSaved'));
          if (isNewAddress) {
            this.transitionToRoute('host.photos', host);
          }
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    }
  }
});
