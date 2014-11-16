/**
 * Ember controller for host creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['hosts', 'departments', 'countries', 'activities', 'application'],

    allActivities: Ember.computed.readOnly('controllers.activities.allActivities'),

    actions: {
        saveHost: function () {

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Get host and address
            var host = this.get('model');
            var address = host.get('address');

            // Reset website to null to pass server-side validation (only accept null, and not empty string)
            if (host.get('webSite') === '') {
                host.set('webSite', null);
            }

            // Initialize validations array
            var validations = Ember.makeArray(host.validate());
            validations.push(address.validate());

            // Validate host and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Create the host...
                host.save().then(function () {
                    // ... and the address
                    return address.save();
                }).then(function () {
                    // Set the host's address (now that it has a valid id) and save the host again
                    host.set('address', address);
                    return host.save();
                }).then(function () {
                    alertify.success(Ember.I18n.t('notify.hostCreated'));
                    self.transitionToRoute('host.edit', host);
                }).catch(function () {
                    self.alerts.error(Ember.I18n.t('notify.submissionError'));
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
