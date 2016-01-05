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

  userBookmarks: [],

  bookmarksIds: computed.mapBy('userBookmarks', 'id'),

  /**
   * Indicates whether the host is bookmarked by the provided user.
   */
  isBookmarked: computed('bookmarksIds.[]', 'host.id', function() {
    let bookmarksIds = this.get('bookmarksIds');
    let hostId = this.get('host.id');
    let isBookmarked = false;
    if (bookmarksIds && hostId) {
      isBookmarked = bookmarksIds.contains(hostId);
    }
    return isBookmarked;
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
