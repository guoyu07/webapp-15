import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.user.edit');
  },

  model() {
    let user = this.get('sessionUser.user');
    let address = user.get('address');

    return Ember.RSVP.hash({
      user,
      address
    });
  },

  setupController(controller, models) {
    let selectedDate = null;
    if (models.user.get('birthDate')) {
      selectedDate = moment(models.user.get('birthDate'));
    }
    controller.set('selectedDate', selectedDate);
    controller.setProperties(models);
  }
});
