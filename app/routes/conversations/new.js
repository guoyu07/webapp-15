import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  controllerName: 'conversation.index',

  titleToken() {
    return this.get('i18n').t('titles.users.new');
  },

  beforeModel(transition) {
    this.get('sessionUser.user').then((user)=> {
      if (user.get('hasNoActiveMembership')) {
        transition.abort();
      }
    });
  },

  model(params, transition) {
    let user2Id = params.user2Id;
    if (!user2Id) {
      return transition.abort();
    }

    let user1 = this.get('sessionUser.user');
    let user2 = this.store.findRecord('user', user2Id);
    let previousConversation = this.store.query('conversation', { otherUserId: user2Id });

    return Ember.RSVP.hash({
      user1,
      user2,
      previousConversation
    });
  },

  setupController(controller, results) {
    // Redirect to an existing conversation if we find one
    if (results.previousConversation.get('firstObject')) {
      this.transitionTo('conversation.index', results.previousConversation.get('firstObject'), {
        queryParams: { user2Id: null }
      });
    }

    let conversation = this.store.createRecord('conversation', {
      user1: results.user1,
      user2: results.user2
    });

    controller.set('conversation', conversation);
  },

  renderTemplate() {
    this.render('conversation/index');
  }
});
