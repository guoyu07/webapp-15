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
    const key = config.googleMapsApiKey;
    const latitude = this.get('latitude') || 0;
    const longitude = this.get('longitude') || 0;
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const url = `${baseUrl}?center=${latitude},${longitude}&zoom=6&size=800x300&key=${key}&markers=color:red|${latitude},${longitude}`;

    return encodeURI(url);
  })
});
