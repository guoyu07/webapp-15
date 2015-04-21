/**
 * Ember controller for wwoofer edition.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    needs: ['application', 'wwoofer', 'countries', 'departments'],

    // Bindings
    belongsToCurrentUser: Ember.computed.oneWay('controllers.wwoofer.belongsToCurrentUser'),

    /**
     * Indicates whether a second wwoofer was registered
     */
    hasOtherWwoofer: Ember.computed.notEmpty('model.firstName2'),

    actions: {
        saveWwoofer: function () {

            // Get wwoofer and address
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Initialize validations array
            var validations = [ wwoofer.validate(), address.validate() ];

            // Validate wwoofer and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = [ wwoofer.save(), address.save() ];

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
