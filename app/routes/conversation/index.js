import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    let conversationId = Ember.get(transition, 'params.conversation.conversation_id');

    let conversation = this.store.findRecord('conversation', conversationId);
    let messages = this.store.query('message', { conversationId });

    return Ember.RSVP.hash({
      conversation,
      messages
    });
  },

  setupController(controller, result) {
    controller.set('conversation', result.conversation);
    controller.set('messages', result.messages);
  }
});
