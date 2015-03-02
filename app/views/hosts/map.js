/**
 * Ember view for host index.
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

        // save map instance
        this._layer.setView(L.latLng(this.controller.get('lat'), this.controller.get('lon')), this.controller.get('mapZoom'), false);
        this.controller.set('mapLayer', this._layer);
        this.moveend = function () {
            this.controller.send("mapChanged");
        };
        this._super();
    }
});

Ember.$(window).on("resize", function() {
}).trigger("resize");


