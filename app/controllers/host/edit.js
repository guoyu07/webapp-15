/**
 * Ember controller for host edition.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'host', 'departments', 'countries', 'user/memberships', 'activities'],

    hasHostMemberships: Ember.computed.oneWay('controllers.user/memberships.hasHostMemberships'),
    latestHostMembership: Ember.computed.oneWay('controllers.user/memberships.latestHostMembership'),
    belongsToCurrentUser: Ember.computed.oneWay('controllers.host.belongsToCurrentUser'),
    allActivities: Ember.computed.oneWay('controllers.activities.allActivities'),

    actions: {
        saveHost: function () {

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Get host and address
            var host = this.get('model'),
                address = host.get('address'),
                user = host.get('user');

            // Reset website to null to pass server-side validation (only accept null, and not empty string)
            if (Ember.isEmpty(host.get('webSite'))) {
                host.set('webSite', null);
            }

            // Initialize validations array
            var validations = Ember.makeArray(host.validate());
            validations.push(address.validate());
            validations.push(user.validate());

            // Validate host and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = Ember.makeArray(host.save());
                updates.push(address.save());
                updates.push(user.save());

                // Update host and address
                Ember.RSVP.all(updates).then(function () {
                    alertify.success('Information updated!');
                    self.transitionToRoute('host', host);
                }).catch(function () {
                    alertify.error('Cannot update the host.');
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    }
});