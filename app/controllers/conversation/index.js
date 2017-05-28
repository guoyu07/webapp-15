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
    let message = {
      recipientId: conversation.get('otherUser.id'),
      text: newMessage
    };

    let promise = this.get('ajax').post('api/messages', {
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({ message })
    });

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

      let promise = this.createMessage(conversation, newMessage);

      promise.then((response)=> {
        this.get('store').pushPayload(response);
        if (conversation.get('isNew')) {
          this.transitionToRoute('conversation.index', response.message.conversationId);
        }
      });
    }
  }
});
