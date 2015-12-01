/**
 * Route for host contact.
 */
import Ember from 'ember';
import request from 'ic-ajax';

export default Ember.Route.extend({
  renderTemplate() {
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
      controller.validate().then(()=> {

        // Set controller in sending state
        controller.set('isSending', true);

        // Prepare URL
        var adapter = this.store.adapterFor('application'),
          url = [adapter.get('host'), adapter.get('namespace'), 'hosts', host.id, 'contact'].join('/');

        // Send email
        var promise = request({
          type: 'POST',
          url: url,
          data: {
            message: message
          }
        });

        promise.then(()=> {
          // Notify user
          alertify.alert(this.get('i18n').t('notify.messageSent'));

          // Reset form
          controller.set('message', null);
          controller.resetValidations();

          // Go back to host index page
          this.transitionTo('host.index', host.id);
        });

        promise.finally(()=> {
          controller.set('isSending', false);
        });
      }).catch(()=> {
        alertify.error(this.get('i18n').t('notify.submissionInvalid'));
      });
    }
  }
});
