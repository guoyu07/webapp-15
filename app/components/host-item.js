import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  /**
   * Host features
   */
  host: null,

  /**
   * Host Id
   */
  hostId: computed.readOnly('host.properties.hostId'),

  /**
   * Host farm name
   */
  farmName: computed('host.properties.farmName', function () {
    return this.get('host.properties.farmName') || 'Unnamed Farm';
  }),

  /**
   * Host description
   */
  description: computed.readOnly('host.properties.description'),

  /**
   * Returns the photo URL to display based on the photo property.
   */
  photoUrl: computed('host.properties.photo', function() {
    var photo = this.get('host.properties.photo');
    var photoUrl;
    if (Ember.isEmpty(photo)) {
      photoUrl = "assets/images/wwoof-no-photo.png";
    } else {
      photoUrl = "https://s3.amazonaws.com/wwoof-france/photos/hosts/" + photo;
    }
    return photoUrl;
  })
});
