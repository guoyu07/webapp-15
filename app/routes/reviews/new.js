import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  titleToken() {
    return this.get('i18n').t('titles.reviews.new');
  },

  model(params) {
    let promises = {
      author: this.get('sessionUser.user'),
      reviewee: this.store.findRecord('user', params.revieweeId)
    };
    if (params.hostId) {
      promises.host = this.store.findRecord('host', params.hostId);
    }

    return Ember.RSVP.hash(promises).then((result)=> {
      return this.store.createRecord('review', result);
    });
  },

  setupController(controller, review) {
    controller.set('review', review);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      if (controller.get('review.isNew')) {
        controller.get('review').rollbackAttributes();
      }
      controller.set('review', null);
      controller.set('validations.didValidate', false);
    }
  }
});
