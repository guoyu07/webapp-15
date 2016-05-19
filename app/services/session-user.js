import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed } = Ember;

export default Ember.Service.extend({

  session: service('session'),

  store: service('store'),

  user: computed('session.data.authenticated.user.id', 'session.data.lastUpdated', function() {
    const userId = this.get('session.data.authenticated.user.id');
    if (!Ember.isEmpty(userId)) {
      return DS.PromiseObject.create({
        promise: this.get('store').findRecord('user', userId)
      });
    }
  }),

  /**
   * Set a new last updated date in local storage to trigger a refresh of the user in session.
   */
  refresh() {
    this.get('session').set('data.lastUpdated', Date.now());
  }
});
