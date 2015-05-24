/**
 * Ember controller for host creation.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    needs: ['departments', 'countries'],

    activitiesService: Ember.inject.service('activities'),
    monthsService: Ember.inject.service('months'),

    actions: {
        saveHost: function () {

            // Get models
            var host = this.get('model');
            var address = host.get('address');
            var user = host.get('user');

            // Reset website to null to pass server-side validation (accepts only null, not empty strings)
            if (Ember.isEmpty(host.get('webSite'))) {
                host.set('webSite', null);
            }

            // Initialize validations array
            var validations = [ host.validate(), address.validate(), user.validate() ];

            // Validate host and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Create the host
                var promise = host.save();

                // Create the address
                promise = promise.then(function () {
                    return address.save();
                });

                // Set the host's address (now that it has a valid id) and update the wwoofer
                promise = promise.then(function () {
                    host.set('address', address);
                    return host.save();
                });

                // Save the user (phone number)
                promise = promise.then (function () {
                    return user.save();
                });

                // Inform and redirect user to the photos page
                promise.then(function () {
                    alertify.success(Ember.I18n.t('notify.hostCreated'));
                    self.transitionToRoute('host.photos', host);
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
