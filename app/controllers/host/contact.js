import Ember from 'ember';
import Validations from 'webapp/validations/host/contact';

const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  ajax: service('ajax'),

  message: null,
  sendCopy: false,
  showMessageSentModal: false,

  actions: {
    /**
     * Sends a message to a host.
     */
    sendMessage() {
      const message = this.get('message');
      const sendCopy = this.get('sendCopy');
      const host = this.get('model');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Set controller in sending state
          this.set('isSending', true);

          // Prepare URL
          const adapter = this.store.adapterFor('application');
          const url = [adapter.get('host'), adapter.get('namespace'), 'hosts', host.id, 'contact'].join('/');

          // Send email
          const promise = this.get('ajax').post(url, {
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
              message,
              sendCopy
            })
          });

          promise.then(()=> {
            // Reset form
            this.set('message', null);

            // Notify user
            this.toggleProperty('showMessageSentModal');
          });

          promise.finally(()=> {
            this.set('isSending', false);
            this.set('validations.didValidate', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    closeModal() {
      this.toggleProperty('showMessageSentModal');

      // Go back to host index page
      this.transitionToRoute('host.index', this.get('model.id'));
    },

    toggleSendCopy(sendCopy) {
      this.set('sendCopy', sendCopy);
    }
  }
});
