import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

  message: null,

  showMessageSentModal: false,

  messagePlaceholder: function() {
    return 'Bonjour ' + this.get('model.user.firstName') + '!';
  }.property('model.user.firstName'),

  actions: {
    closeModal() {
      this.toggleProperty('showMessageSentModal');

      // Go back to host index page
      this.transitionToRoute('host.index', this.get('model.id'));
    }
  },

  validations: {
    message: {
      presence: true,
      length: { minimum: 50, maximum: 5000 }
    }
  }
});
