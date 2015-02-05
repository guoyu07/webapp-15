/**
 * Ember view for host index.
 */
import App from '../../app';
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
    ]
});

Ember.$(window).on("resize", function() {
}).trigger("resize");


