/**
 * Ember controller for wwoofer edition.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'wwoofer', 'countries', 'departments'],

    // Bindings
    belongsToCurrentUser: Ember.computed.oneWay('controllers.wwoofer.belongsToCurrentUser'),

    /**
     * Indicates whether a second wwoofer was registered
     */
    hasOtherWwoofer: Ember.computed.notEmpty('firstName2'),

    actions: {
        saveWwoofer: function () {
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
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
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
