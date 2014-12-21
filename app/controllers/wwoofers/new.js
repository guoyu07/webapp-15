/**
 * Ember controller for wwoofer creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['countries', 'departments'],

    // Default the max date of the birth date datepicker to 18 years old
    maxDate: moment().subtract(18, 'year'),

    actions: {
        saveWwoofer: function () {
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Make sure the wwoofer is 18 years old
            if (wwoofer.get('birthDate2') && moment(wwoofer.get('birthDate2')).isAfter(this.get('maxDate'))) {
                alertify.error(Ember.I18n.t('notify.mustBe18'));
                return;
            }

            // Initialize validations array
            var validations = Ember.makeArray(wwoofer.validate());
            validations.push(address.validate());

            // Validate wwoofer and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Create the wwoofer...
                wwoofer.save().then(function () {
                    // ... and the address
                    return address.save();
                }).then(function () {
                    // Set the wwoofer's address (now that it has a valid id) and save the wwoofer again
                    wwoofer.set('address', address);
                    return wwoofer.save();
                }).then(function () {
                    alertify.success(Ember.I18n.t('notify.wwooferCreated'));

                    // Redirect user to new membership page
                    var itemCode = wwoofer.firstName2 ? 'WO1': 'WO2';
                    self.transitionToRoute('memberships.new', { queryParams: { type: 'W', itemCode: itemCode } });
                }).catch(function () {
                    alertify.error(Ember.I18n.t('notify.submissionError'));
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
