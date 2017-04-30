import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
