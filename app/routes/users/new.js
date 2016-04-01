import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.users.new');
  },

  model() {
    return this.store.createRecord('user');
  }
});
