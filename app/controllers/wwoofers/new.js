/**
 * Ember controller for wwoofer creation.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    needs: ['countries', 'departments'],

    // The second wwoofer must be 18 years old or more
    maxDate: moment().subtract(18, 'year'),
    selectedDate: null,
    hasOtherWwoofer: false,

    actions: {
        saveWwoofer: function () {

            // Get wwoofer and address
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Test whether the user has provided a second wwoofer
            var hasSecondWoofer = Ember.isPresent(wwoofer.get('firstName2')) &&
                Ember.isPresent(wwoofer.get('lastName2')) &&
                this.get('hasOtherWwoofer') === true;

            // Handle second wwoofer
            if (hasSecondWoofer) {

                // Set second wwoofer birth date (if any)
                var selectedDate = this.get('selectedDate');
                if (hasSecondWoofer && selectedDate) {

                    // Make sure the wwoofer is 18 years old
                    if (selectedDate.isAfter(this.get('maxDate'))) {
                        alertify.error(Ember.I18n.t('notify.mustBe18'));
                        return;
                    }
                    wwoofer.set('birthDate2', selectedDate.format('YYYY-MM-DD'));
                }
            } else {
                // Erase the other wwoofer info
                wwoofer.set('firstName2', null);
                wwoofer.set('lastName2', null);
                wwoofer.set('birthDate2', null);
            }

            // Initialize validations array
            var validations = [ wwoofer.validate(), address.validate() ];

            // Validate wwoofer and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Create the wwoofer
                var promise = wwoofer.save();

                // Create the address
                promise = promise.then(function () {
                    return address.save();
                });

                // Set the wwoofer's address (now that it has a valid id) and update the wwoofer
                promise = promise.then(function () {
                    wwoofer.set('address', address);
                    return wwoofer.save();
                });

                // Inform and redirect user to payment page
                promise.then(function () {
                    alertify.success(Ember.I18n.t('notify.wwooferCreated'));
                    var itemCode = hasSecondWoofer ? 'WO2': 'WO1';
                    self.transitionToRoute('memberships.new', { queryParams: { type: 'W', itemCode: itemCode } });
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
