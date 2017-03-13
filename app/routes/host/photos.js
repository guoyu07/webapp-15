import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.host.photos');
  },

  actions: {
    savePhoto(photo) {

      // Validate the form
      photo.validate().then(({ validations })=> {

        photo.set('didValidate', true);
        if (validations.get('isValid')) {

          photo.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    deletePhoto(photo) {
      if (photo.get('isThumbnail')) {
        this.get('notify').error(this.get('i18n').t('notify.cannotDeleteThumbnail'));
        return;
      }

      photo.destroyRecord().then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.photoDeleted'));
      }).catch((err)=> {
        photo.rollbackAttributes();
        throw err;
      });
    },

    setAsThumbnail(host, photo) {
      host.set('thumbnail', photo);
      host.save();
    }
  }
});
