/**
 * Ember route for host photos.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    savePhoto(photo) {
      photo.validate().then(function() {
        photo.save().then(function() {
          alertify.success(Ember.I18n.t('notify.informationUpdated'));
        });
      }).catch(function() {
        alertify.error(Ember.I18n.t('notify.submissionInvalid'));
      });
    },
    deletePhoto(photo) {
      photo.destroyRecord().then(function() {
        alertify.success(Ember.I18n.t('notify.photoDeleted'));
      }).catch(function(err) {
        photo.rollback();
        throw err;
      });
    }
  }
});
