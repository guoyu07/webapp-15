import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('user', params.user_id);
  },

  actions: {
    addFavorite(host) {
      this.send('addUserFavorite', host, this.controller.get('model'));
    },

    removeFavorite(host) {
      this.send('removeUserFavorite', host, this.controller.get('model'));
    }
  }
});
