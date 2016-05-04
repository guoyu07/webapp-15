import Ember from 'ember';
import Validations from 'webapp/validations/host/contact';

const { computed } = Ember;

export default Ember.Controller.extend(Validations, {

  message: null,

  sendCopy: false,

  showMessageSentModal: false,

  messagePlaceholder: computed('model.user.firstName', function() {
    return `Bonjour ${this.get('model.user.firstName')} !`;
  }),

  actions: {
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
