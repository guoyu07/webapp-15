/**
 * Ember controller for wwoofer creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['countries', 'departments'],

    // The second wwoofer must be 18 years old or more
    maxDate: moment().subtract(18, 'year'),
    selectedDate: null,
    hasOtherWwoofer: false,

    actions: {
        saveWwoofer: function () {
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Prevent multiple save attempts
            if (this.get('isSaving')) { return; }

            // Erease the other wwoofer info if not checked
            if (this.get('hasOtherWwoofer') === false) {
                this.set('model.firstName2', null);
                this.set('model.lastName2', null);
                this.set('model.birthDate2', null);
            }

            // Set second wwoofer birth date (if any)
            var hasSecondWoofer = Ember.isPresent(wwoofer.get('firstName2')) && Ember.isPresent(wwoofer.get('lastName2'));
            var selectedDate = this.get('selectedDate');
            if (hasSecondWoofer && selectedDate) {

                // Make sure the wwoofer is 18 years old
                if (selectedDate.isAfter(this.get('maxDate'))) {
                    alertify.error(Ember.I18n.t('notify.mustBe18'));
                    return;
                }
                this.set('birthDate2', selectedDate.format('YYYY-MM-DD'));
            }

            // Initialize validations array
            var validations = Ember.makeArray(wwoofer.validate());
            validations.push(address.validate());

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
                promise = promise.then(function () {
                    alertify.success(Ember.I18n.t('notify.wwooferCreated'));
                    var itemCode = wwoofer.firstName2 ? 'WO1': 'WO2';
                    self.transitionToRoute('memberships.new', { queryParams: { type: 'W', itemCode: itemCode } });
                });

                // Handle errors
                promise.catch(function (error) {
                    if (error && !error.message) {
                        error.message = "Cannot create wwoofer.";
                    }
                    Ember.onerror(error);
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
