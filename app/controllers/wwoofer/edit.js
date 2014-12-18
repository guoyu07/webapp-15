/**
 * Ember controller for wwoofer edition.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'wwoofer', 'countries', 'departments', 'user/memberships'],

    editMode: true,

    // Default the max date of the birth date datepicker to 18 years old
    maxDate: moment().subtract(18, 'year'),

    // Setup bindings used in partial
    hasWwoofMemberships: Ember.computed.oneWay('controllers.user/memberships.hasWwoofMemberships'),
    latestWwoofMembership: Ember.computed.oneWay('controllers.user/memberships.latestWwoofMembership'),
    belongsToCurrentUser: Ember.computed.oneWay('controllers.wwoofer.belongsToCurrentUser'),

    actions: {
        saveWwoofer: function () {
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Make sure the wwoofer is 18 years old
            if (moment(this.get('birthDate')).isAfter(this.get('maxDate'))) {
                alertify.error(Ember.I18n.t('notify.mustBe18'));
                return;
            }

            // Initialize validations array
            var validations = Ember.makeArray(wwoofer.validate());
            validations.push(address.validate());

            // Validate wwoofer and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = Ember.makeArray(wwoofer.save());
                updates.push(address.save());

                // Update wwoofer and address
                Ember.RSVP.all(updates).then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('index');
                }).catch(function () {
                    alertify.error(Ember.I18n.t('notify.submissionError'));
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
