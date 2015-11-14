/**
 * Route for host contact.
 */
import Ember from 'ember';
import request from 'ic-ajax';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render({ into: 'application' });
  },

  actions: {
    /**
     * Sends a message to a host.
     */
    sendMessage() {

      var controller = this.get('controller');
      var message = this.get('controller.message');
      var host = this.get('controller.model');

      // Validate the form
      var self = this;
      controller.validate().then(function() {

        // Set controller in sending state
        controller.set('isSending', true);

        // Prepare URL
        var adapter = self.store.adapterFor('application'),
          url = [adapter.get('host'), adapter.get('namespace'), 'hosts', host.id, 'contact'].join('/');

        // Send email
        request({
          type: 'POST',
          url: url,
          data: {
            message: message
          }
        }).then(function() {
          // Notify user
          alertify.alert(Ember.I18n.t('notify.messageSent'));

          // Reset form
          controller.set('message', null);
          controller.resetValidations();

          // Go back to host index page
          self.transitionTo('host.index', host.id);
        }).finally(function() {
          controller.set('isSending', false);
        });
      }).catch(function() {
        alertify.error(Ember.I18n.t('notify.submissionInvalid'));
      });
    }
  }
});
