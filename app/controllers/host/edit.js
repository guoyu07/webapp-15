/**
 * Ember controller for host edition.
 */
import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

    needs: ['hosts', 'departments', 'memberships'],

    hostMembershipsBinding: 'controllers.memberships.hostMemberships',
    hasHostMembershipsBinding: 'controllers.memberships.hasHostMemberships',
    latestHostMembershipBinding: 'controllers.memberships.latestHostMembership',

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

                // Prepare update promises
                var updates = Ember.makeArray(host.save());
                updates.push(address.save());

                // Update host and address
                Ember.RSVP.all(updates).then(function () {
                    Notify.success('Information updated!');
                    self.transitionToRoute('host', host);
                }).catch(function () {
                    Notify.error('Cannot update the host.');
                });
            }).catch(function () {
                Notify.error("Your submission is invalid.");
            });
        },
        renewMembership: function () {
            // Find the right item code
            var itemCode = this.get('hasHostMemberships') ? "HR" : "H";

            // Hit the payment route in order to get redirected to PayPal
            window.location.replace('/payment/start?itemCode=' + itemCode);
        }
    }
});