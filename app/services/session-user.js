import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed } = Ember;

export default Ember.Service.extend({

  session: service('session'),

  store: service('store'),

  user: computed('session.data.authenticated.userId', function() {
    const userId = this.get('session.data.authenticated.userId');
    if (!Ember.isEmpty(userId)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('user', userId)
      });
    }
  })
});
