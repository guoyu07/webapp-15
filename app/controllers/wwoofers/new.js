/**
 * Ember controller for wwoofer creation.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

    countriesService: Ember.inject.service('countries'),
    departmentsService: Ember.inject.service('departments'),

    selectedDate: null,

    /**
     * Indicates whether a second wwoofer was specified.
     */
    secondWwooferChecked: false,

    /**
     * Indicates whether the fields for the second wwoofer must be shown.
     */
    showOtherWwoofer: Ember.computed.readOnly('secondWwooferChecked'),

    /**
     * Indicates whether the second wwoofer can be edited.
     */
    canEditOtherWwoofer: true,

    actions: {
        saveWwoofer() {

            // Get wwoofer and address
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');
            var secondWwooferChecked = this.get('secondWwooferChecked');

            // Handle second wwoofer
            if (secondWwooferChecked) {
                // Set second wwoofer birth date (if any)
                wwoofer.set('birthDate2', this.get('selectedDate').format('YYYY-MM-DD'));
            } else {
                // Erase the other wwoofer info
                wwoofer.set('firstName2', null);
                wwoofer.set('lastName2', null);
                wwoofer.set('birthDate2', null);
            }

            // Initialize validations array
            var validations = [ this.validate(), wwoofer.validate(), address.validate() ];

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
                    var itemCode = secondWwooferChecked ? 'WO2': 'WO1';
                    self.transitionToRoute('memberships.new', { queryParams: { type: 'W', itemCode: itemCode } });
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        },

        dateSelected(date) {
            this.set('selectedDate', date);
        }
    },

    validations: {
        'model.firstName2': {
            presence: {
                'if': 'secondWwooferChecked'
            },
            length: { maximum: 255 }
        },
        'model.lastName2': {
            presence: {
                'if': 'secondWwooferChecked'
            },
            length: { maximum: 255 }
        },
        selectedDate: {
            'is-18': {
                'if': 'secondWwooferChecked'
            }
        }
    }
});
