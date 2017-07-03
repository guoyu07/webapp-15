import Ember from 'ember';
import config from 'webapp/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({

  /**
   * Coordinates of the address we want to show the map for.
   */
  latitude: null,
  longitude: null,

  /**
   * URL of the map.
   */
  mapUrl: computed('latitude', 'longitude', function() {
    let key = config.googleMapsApiKey;
    let latitude = this.get('latitude') || 0;
    let longitude = this.get('longitude') || 0;
    let baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    let url = `${baseUrl}?center=${latitude},${longitude}&zoom=6&size=300x300&key=${key}&markers=color:red|${latitude},${longitude}`;

    return encodeURI(url);
  })
});
