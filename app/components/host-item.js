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
  host: computed('hostId', function() {
    return this.get('store').findRecord('host', this.get('hostId'));
  }),

  userFavorites: [],

  favoritesIds: computed.mapBy('userFavorites', 'id'),

  /**
   * Indicates whether the host is a favorite.
   */
  isFavorite: computed('favoritesIds.[]', 'host.id', function() {
    let favoritesIds = this.get('favoritesIds');
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
