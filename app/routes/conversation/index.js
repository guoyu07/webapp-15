import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  conversationsService: service('conversations'),

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
    let updateField;
    if (result.user.get('id') === result.conversation.get('user1.id')) {
      updateField = 'user1LastReadAt';
    } else if (result.user.get('id') === result.conversation.get('user2.id')) {
      updateField = 'user2LastReadAt';
    }
    if (updateField) {
      result.conversation.set(updateField, new Date());
      result.conversation.save().then(() => {
        this.get('conversationsService').getConversationCounts();
      });
    }
  }
});
