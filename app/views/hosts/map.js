/**
 * Ember view for host index.
 */
import Ember from 'ember';
import HostsLayer from '../../layers/hosts';
import OSMLayer from '../../layers/osm';

export default EmberLeaflet.MapView.extend({
    zoom : 6,
    center : L.latLng(46.45, 2.61),
    options : {maxZoom : 12},
    childLayers : [
        OSMLayer,
        HostsLayer
    ],

    didCreateLayer: function () {
        // save map instance
        this.controller.set('mapLayer', this._layer);
        this._super();
    },

    // moveEnd callback
    moveend: function () {
        this.controller.send("mapChanged");
    }
});

Ember.$(window).on("resize", function() {
}).trigger("resize");


