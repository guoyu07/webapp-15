/**
 * Ember component for google map.
 */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

    /**
     * Id of the address we want to show the map for.
     */
    addressId: null,

    /**
     * URL of the map.
     */
    mapUrl: function () {
        var coordinates = this.get('coordinates') || { lat: 46, lng: 3 };
        var url = '//maps.googleapis.com/maps/api/staticmap?' +
            'center=' + coordinates.lat + ','+ coordinates.lng +
            '&zoom=6' +
            '&size=523x300' +
            '&markers=color:red|' + coordinates.lat + ','+ coordinates.lng;
        return encodeURI(url);
    }.property('coordinates'),

    /**
     * Gets the coordinates of the address.
     */
    coordinates: function () {

        if (!this.get('addressId')) {
            return;
        }

        // Prepare URL
        var url = [ config.apiHost, config.apiNamespace, 'addresses', this.get('addressId'), 'get-coordinates' ].join('/');

        // Get the coordinates of the map
        var get = Ember.$.get(url);
        var self = this;
        get.done(function (data) {
            self.set('coordinates', data.coordinates);
        });
    }.property('addressId')
});
