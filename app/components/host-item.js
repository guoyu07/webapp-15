import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({

  store: service('store'),

  classNames: ['thumbnail host-item'],

  hostId: null,

  /**
   * Returns the current host.
   */
  host: computed('hostId', function () {
    return this.get('store').findRecord('host', this.get('hostId'));
  }),

  actions: {
    add(host) {
      host.then((hostModel)=> {
        this.sendAction('addBookmark', hostModel);
      });
    },
    remove(host) {
      host.then((hostModel)=> {
        this.sendAction('removeBookmark', hostModel);
      });
    }
  }
});
