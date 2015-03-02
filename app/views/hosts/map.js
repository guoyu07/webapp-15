/**
 * Ember view for Leaflet Map.
 */
import Ember from 'ember';
import HostsLayer from '../../layers/hosts';
import OSMLayer from '../../layers/osm';

export default EmberLeaflet.MapView.extend({
    zoom : 6,
    center : L.latLng(46.45, 2.6),
    options : {maxZoom : 12},
    childLayers : [
        OSMLayer,
        HostsLayer
    ],

    didCreateLayer: function () {

        // Get map init parameters from controller
        this._layer.setView(L.latLng(this.controller.get('lat'), this.controller.get('lon')), this.controller.get('mapZoom'), false);
        this.controller.set('mapLayer', this._layer);

        // declare moveEnd action sender
        this.moveend = function () {
            this.controller.send("mapChanged");
        };

        // continue Init
        this._super();
    }
});

// Resize Callback
Ember.$(window).on("resize", function() {
}).trigger("resize");


