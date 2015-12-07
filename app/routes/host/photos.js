/**
 * Ember route for host photos.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    savePhoto(photo) {
      photo.validate().then(()=> {
        photo.save().then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    },

    deletePhoto(photo) {
      photo.destroyRecord().then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.photoDeleted'));
      }).catch((err)=> {
        photo.rollback();
        throw err;
      });
    }
  }
});
