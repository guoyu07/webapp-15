/**
 * Ember controller for host edition.
 */
import Ember from 'ember';
import config from '../../config/environment';

export default Ember.ObjectController.extend({

    needs: ['application', 'host', 'departments', 'countries', 'user/memberships', 'activities'],

    hasHostMemberships: Ember.computed.readOnly('controllers.user/memberships.hasHostMemberships'),
    latestHostMembership: Ember.computed.readOnly('controllers.user/memberships.latestHostMembership'),
    belongsToCurrentUser: Ember.computed.readOnly('controllers.host.belongsToCurrentUser'),
    allActivities: Ember.computed.readOnly('controllers.activities.allActivities'),

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
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('host.index', host);
                }).catch(function () {
                    alertify.error(Ember.I18n.t('notify.submissionError'));
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        },
        toggleIsHidden: function () {

            // Toggle isHidden property
            this.set('isHidden', !this.get('isHidden'));

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'hosts', this.get('model.id'), 'changeVisibility' ].join('/');

            // Update approve the host
            var post = Ember.$.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: url,
                data: JSON.stringify({ isHidden: this.get('isHidden') })
            });

            // Handle failure
            post.fail(function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
            });
        }
    }
});
