import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  ajax: service('ajax'),

  queryParams: ['user2Id'],

  user2Id: null,
  newMessage: null,

  textCharLeft: computed('newMessage.length', function () {
    let length = this.get('newMessage.length') || 0;
    return 1000 - length;
  }),

  noCharLeft: computed.lt('textCharLeft', 0),

  createMessage(conversation, newMessage) {
    let message = this.store.createRecord('message', {
      conversation,
      text: newMessage
    });

    let promise = message.save();

    promise.then(()=> {
      this.set('newMessage', null);
    });

    return promise;
  },

  actions: {
    sendMessage(conversation, newMessage) {
      if (!newMessage) {
        return;
      }

      if (conversation.get('isNew')) {
        let promise = conversation.save();

        promise = promise.then(() => {
          return this.createMessage(conversation, newMessage);
        });

        promise.then(()=> {
          this.transitionToRoute('conversation.index', conversation);
        });
      } else {
        this.createMessage(conversation, newMessage);
      }
    }
  }
});
