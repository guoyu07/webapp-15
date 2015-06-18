/**
 * Ember controller for host edition.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    activitiesService: Ember.inject.service('activities'),
    monthsService: Ember.inject.service('months'),
    countriesService: Ember.inject.service('countries'),
    departmentsService: Ember.inject.service('departments'),

    actions: {
        saveHost: function () {

            // Get host and address
            var host = this.get('model'),
                address = host.get('address'),
                user = host.get('user');

            // Reset website to null to pass server-side validation (only accept null, and not empty string)
            if (Ember.isEmpty(host.get('webSite'))) {
                host.set('webSite', null);
            }

            // Initialize validations array
            var validations = [ host.validate(), address.validate(), user.validate() ];

            // Validate host and address
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = [ host.save(), address.save(), user.save() ];

                // Update host and address
                Ember.RSVP.all(updates).then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    window.scrollTo(0,0);
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
                window.scrollTo(0,0);
            });
        }
    }
});
