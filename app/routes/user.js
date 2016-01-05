import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('user', params.user_id);
  },

  actions: {
    addBookmark(host) {
      this.send('addUserBookmark', host, this.controller.get('model'));
    },

    removeBookmark(host) {
      this.send('removeUserBookmark', host, this.controller.get('model'));
    }
  }
});
