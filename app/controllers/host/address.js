import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  countriesService: Ember.inject.service('countries'),
  departmentsService: Ember.inject.service('departments'),

  countries: computed.readOnly('countriesService.hostCountries'),

  instructions: computed(function () {
    return Ember.I18n.t('address.form.hostInstructions');
  }),

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
          alertify.success(Ember.I18n.t('notify.addressSaved'));
          if (isNewAddress) {
            this.transitionToRoute('host.photos', host);
          }
        });
      }).catch(function() {
        alertify.error(Ember.I18n.t('notify.submissionInvalid'));
      });
    }
  }
});
