import Ember from 'ember';
// import Validations from 'webapp/validations/host/address';

// const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  ajax: service('ajax'),

  actions: {
    sendMessage(conversation, newMessage) {
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
