import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({

  store: service('store'),

  classNames: ['thumbnail', 'host-item'],

  hostId: null,
  favoriteIds: [],

  /**
   * Returns the current host.
   */
  host: computed('hostId', function() {
    return this.get('store').findRecord('host', this.get('hostId'));
  }),

  /**
   * Indicates whether the host is a favorite.
   */
  isFavorite: computed('favoriteIds.[]', 'host.id', function() {
    let favoritesIds = this.get('favoriteIds');
    let hostId = this.get('host.id');
    let isFavorite = false;
    if (favoritesIds && hostId) {
      isFavorite = favoritesIds.includes(hostId);
    }
    return isFavorite;
  }),

  actions: {
    add(host) {
      host.then((hostModel)=> {
        this.sendAction('addFavorite', hostModel);
      });
    },
    remove(host) {
      host.then((hostModel)=> {
        this.sendAction('removeFavorite', hostModel);
      });
    }
  }
});
