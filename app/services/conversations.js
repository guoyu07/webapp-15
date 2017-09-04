import Ember from 'ember';

const { service } = Ember.inject;

const RELOAD_TIMEOUT = 60 * 1000; // 1 min

export default Ember.Service.extend({

  store: service('store'),

  autoReloadStarted: false,

  conversations: null,

  getConversations(params) {
    return this.get('store').query('conversation', params).then((conversations)=> {
      this.set('conversations', conversations);
    })
  },

  getConversationCounts() {
    this.getConversations({ limit: 1 });
  },

  startCountsAutoReload() {
    if (this.get('autoReloadStarted') === false) {
      this.getConversationCounts();
      // this._initAutoReloadTimer();
      this.set('autoReloadStarted', true);
    }
  },

  _initAutoReloadTimer() {
    Ember.run.later(()=> {
      this.getConversationCounts();
      this._initAutoReloadTimer();
    }, RELOAD_TIMEOUT);
  }
});
