import Ember from 'ember';
import config from 'webapp/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({

  /**
   * Host id.
   */
  hostId: null,

  /**
   * Host farm name.
   */
  farmName: null,

  /**
   * Photo file name.
   */
  photo: null,

  /**
   * Returns the photo URL to display based on the photo property.
   */
  photoUrl: computed('photo', function() {
    let fileName = this.get('photo') || 'default.png';
    return `${config.thumbor.baseUrl}/380x253/photos/hosts/${fileName}`;
  })
});
