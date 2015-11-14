/**
 * Ember component for host item renderer.
 */
import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Host features
   */
  host: null,

  /**
   * Host Id
   */
  hostId: Ember.computed.readOnly('host.properties.hostId'),

  /**
   * Host farm name
   */
  farmName: Ember.computed.readOnly('host.properties.farmName'),

  /**
   * Host description
   */
  description: Ember.computed.readOnly('host.properties.description'),

  /**
   * Returns the photo URL to display based on the photo property.
   */
  photoUrl: function() {
    var photo = this.get('host.properties.photo');
    var photoUrl;
    if (Ember.isEmpty(photo)) {
      photoUrl = "assets/images/wwoof-no-photo.png";
    } else {
      photoUrl = "https://s3.amazonaws.com/wwoof-france/photos/hosts/" + photo;
    }
    return photoUrl;
  }.property('host.properties.photo')
});
