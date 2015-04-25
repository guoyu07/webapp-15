/**
 * Ember view for Leaflet Map.
 */
import Ember from 'ember';
import config from '../../config/environment';
import HostsLayer from '../../layers/hosts';
import OSMLayer from '../../layers/osm';

export default EmberLeaflet.MapView.extend({
    zoom: config.map.defaultZoom,
    center: L.latLng(config.map.defaultLat, config.map.defaultLon),
    options: { minZoom: 3, maxZoom: 12 },
    childLayers: [
        OSMLayer,
        HostsLayer
    ],

    didCreateLayer: function () {

        // Get map init parameters from controller
        this._layer.setView(L.latLng(this.get('controller.lat'), this.get('controller.lon')), this.get('controller.mapZoom'), false);
        this.set('controller.mapLayer', this._layer);

        // declare moveEnd action sender
        this.moveend = function () {
            this.get('controller').send("mapChanged");
        };

        // continue Init
        this._super();
    }
});

// Resize Callback
Ember.$(window).on("resize", function() {
}).trigger("resize");
