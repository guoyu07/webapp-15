/**
 * Ember controller for host edition.
 */
import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({

    needs: ['host', 'departments', 'countries'],

    activitiesService: Ember.inject.service('activities'),
    monthsService: Ember.inject.service('months'),

    belongsToCurrentUser: Ember.computed.readOnly('controllers.host.belongsToCurrentUser'),

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
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = [ host.save(), address.save(), user.save() ];

                // Update host and address
                Ember.RSVP.all(updates).then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('host.index', host);
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        },
        toggleIsHidden: function () {

            // Toggle isHidden property
            this.set('model.isHidden', !this.get('model.isHidden'));

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'hosts', this.get('model.id'), 'changeVisibility' ].join('/');

            // Update approve the host
            var post = Ember.$.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: url,
                data: JSON.stringify({ isHidden: this.get('model.isHidden') })
            });

            // Handle failure
            post.fail(function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
            });
        }
    }
});
