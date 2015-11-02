/**
 * Ember controller for wwoofer edition.
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
    showOtherWwoofer: Ember.computed.or('secondWwooferChecked', 'sessionUser.user.isAdmin'),

    /**
     * Indicates whether the second wwoofer can be edited.
     */
    canEditOtherWwoofer: Ember.computed.or('sessionUser.user.isAdmin'),

    actions: {
        saveWwoofer: function () {

            // Get wwoofer and address
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Handle second wwoofer
            if (this.get('secondWwooferChecked')) {
                if (this.get('canEditOtherWwoofer')) {
                    // Set second wwoofer birth date
                    wwoofer.set('birthDate2', this.get('selectedDate').format('YYYY-MM-DD'));
                }
            } else {
                // Erase the other wwoofer info
                wwoofer.set('firstName2', null);
                wwoofer.set('lastName2', null);
                wwoofer.set('birthDate2', null);
            }

            // Initialize validations array
            var validations = [ this.validate(), wwoofer.validate(), address.validate() ];

            // Validate wwoofer and address
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = [ wwoofer.save(), address.save() ];

                // Update wwoofer and address
                Ember.RSVP.all(updates).then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    window.scrollTo(0,0);
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
                window.scrollTo(0,0);
            });
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
