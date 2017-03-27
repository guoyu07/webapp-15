import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    let conversationId = Ember.get(transition, 'params.conversation.conversation_id');
    return this.store.query('message', { conversationId });
  },

  setupController(controller, messages) {
    controller.set('messages', messages);
  }
});
