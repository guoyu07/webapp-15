import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  ajax: service('ajax'),

  newMessage: null,

  textCharLeft: computed('newMessage.length', function () {
    let length = this.get('newMessage.length') || 0;
    return 1000 - length;
  }),

  noCharLeft: computed.lt('textCharLeft', 0),

  actions: {
    sendMessage(conversation, newMessage) {
      if (!newMessage) {
        return;
      }

      let message = this.store.createRecord('message', {
        conversation,
        text: newMessage
      });

      let promise = message.save();

      promise.then(()=> {
        this.set('newMessage', null);
      });
    }
  }
});
