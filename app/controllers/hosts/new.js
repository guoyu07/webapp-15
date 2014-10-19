/**
 * Ember controller for host creation.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['hosts', 'departments', 'countries', 'activities', 'application'],

    allActivitiesBinding: 'controllers.activities.allActivities',

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
                    alertify.success('Host created!');
                    self.transitionToRoute('host.edit', host);
                }).catch(function () {
                    alertify.error('Cannot create the host.');
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    }
});