import Ember from 'ember';

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
  photoUrl: function() {
    const photo = this.get('photo');
    let photoUrl;
    if (Ember.isEmpty(photo)) {
      photoUrl = 'assets/images/wwoof-no-photo.png';
    } else {
      photoUrl = `https://s3.amazonaws.com/wwoof-france/photos/hosts/${photo}`;
    }
    return photoUrl;
  }.property('photo')

});
