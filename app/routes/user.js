import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    return model.get('fullName');
  },

  model(params) {
    return this.store.find('user', params.userId);
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
