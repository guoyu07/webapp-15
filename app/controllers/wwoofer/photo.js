import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  ajax: service('ajax'),

  /**
   * The data-url to send the photo to.
   */
  photoDataUrl: computed('model.user.id', function() {
    return `/api/users/${this.get('model.user.id')}/photo`;
  }),

  actions: {
    /**
     * Deletes the photo of a wwoofer.
     */
    deletePhoto() {

      // Get user
      let user = this.get('model.user');
      let url = this.get('photoDataUrl');

      // Delete the photo
      const deleteRequest = this.get('ajax').delete(url);

      // Handle success
      deleteRequest.then(()=> {
        user.set('photo', null);
        this.get('notify').success(this.get('i18n').t('notify.photoDeleted'));
      });
    }
  }
});
