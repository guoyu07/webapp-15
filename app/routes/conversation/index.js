import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params, transition) {
    let conversationId = Ember.get(transition, 'params.conversation.conversation_id');

    let user = this.get('sessionUser.user');
    let conversation = this.store.findRecord('conversation', conversationId);
    let messages = this.store.query('message', { conversationId });

    return Ember.RSVP.hash({
      user,
      conversation,
      messages
    });
  },

  setupController(controller, result) {
    controller.set('conversation', result.conversation);
    controller.set('messages', result.messages);

    // Mark conversation as read for current user
    if (result.user.get('id') === result.conversation.get('user1.id')) {
      result.conversation.set('user1LastReadAt', new Date());
      result.conversation.save();
    } else if (result.user.get('id') === result.conversation.get('user2.id')) {
      result.conversation.set('user2LastReadAt', new Date());
      result.conversation.save();
    }
  }
});
