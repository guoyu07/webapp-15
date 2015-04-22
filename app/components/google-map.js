/**
 * Ember component for google map.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Coordinates of the address we want to show the map for.
     */
    latitude: null,
    longitude: null,

    /**
     * URL of the map.
     */
    mapUrl: function () {
        var latitude = this.get('latitude') || 0;
        var longitude = this.get('longitude') || 0;
        var url = '//maps.googleapis.com/maps/api/staticmap?' +
            'center=' + latitude + ','+ longitude +
            '&zoom=6' +
            '&size=800x300' +
            '&markers=color:red|' + latitude + ',' + longitude;
        return encodeURI(url);
    }.property('latitude', 'longitude')
});
