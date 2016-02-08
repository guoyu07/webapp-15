import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';
import request from 'ic-ajax';

const { computed } = Ember;

export default Ember.Controller.extend(ValidationsMixin, {

  /**
   * The data-url to send the photo to.
   */
  photoDataUrl: computed('model.user.id', function() {
    return `api/users/${this.get('model.user.id')}/photo`;
  }),

  actions: {
    /**
     * Deletes the photo of a wwoofer.
     */
    deletePhoto() {

      // Get user
      let user = this.get('model.user');

      // Delete the photo
      const deleteRequest = request({
        type: 'DELETE',
        url: this.get('photoDataUrl')
      });

      // Handle success
      deleteRequest.then(()=> {
        user.set('photo', null);
        this.get('notify').success(this.get('i18n').t('notify.photoDeleted'));
      });
    }
  }
});
