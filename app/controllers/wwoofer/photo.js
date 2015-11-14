/**
 * Ember controller for wwoofer photo edition.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';
import request from 'ic-ajax';

export default Ember.Controller.extend(ValidationsMixin, {

  /**
   * The data-url to send the photo to.
   */
  photoDataUrl: function() {
    return 'api/users/' + this.get('model.user.id') + '/photo';
  }.property('model.user.id'),

  actions: {
    /**
     * Deletes the photo of a wwoofer.
     */
    deletePhoto: function() {

      // Get user
      var user = this.get('model.user');

      // Delete the photo
      var deleteRequest = request({
        type: 'DELETE',
        url: this.get('photoDataUrl')
      });

      // Handle success
      deleteRequest.then(function() {
        user.set('photo', null);
        alertify.success(Ember.I18n.t('notify.photoDeleted'));
      });
    }
  }
});
