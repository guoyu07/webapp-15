import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    return model.get('fullName');
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
