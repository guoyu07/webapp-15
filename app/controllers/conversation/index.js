import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  ajax: service('ajax'),

  queryParams: ['user2Id'],

  user2Id: null,
  newMessage: null,
  sending: false,

  newMessagePlaceholder: computed('conversation.isNew', function () {
    let isNew = this.get('conversation.isNew');
    let firstName = this.get('conversation.otherUser.firstName');

    let placeholder;
    if (isNew) {
      placeholder = this.get('i18n').t('host.contact.details', { firstName });
    }
    return placeholder;
  }),

  textCharLeft: computed('newMessage.length', function () {
    let length = this.get('newMessage.length') || 0;
    return 1000 - length;
  }),

  noCharLeft: computed.lt('textCharLeft', 0),
  disableSend: computed.or('noCharLeft', 'sending'),

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

      this.set('sending', true);
      let promise = this.createMessage(conversation, newMessage);

      promise.then((response)=> {
        this.get('store').pushPayload(response);
        if (conversation.get('isNew')) {
          this.transitionToRoute('conversation.index', response.message.conversationId);
        }
      });

      promise.finally(() => {
        this.set('sending', false);
      })
    }
  }
});
