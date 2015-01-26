/**
 * Ember view for host index.
 */
import App from '../../app';
import Ember from 'ember';

App.HostsLayer =  Ember.Object.extend(EmberLeaflet.LayerMixin,{
    geoJsonLayer : null,
    markers : null,
    _newLayer : function () {
        this.geoJsonLayer = new L.geoJson();
        this.markers = L.markerClusterGroup({ disableClusteringAtZoom: 9 });
        var dataRequest = Ember.$.get("/api/host-coordinates?limit=2000");
        var self = this;
        dataRequest.done(function (data) {
            self.geoJsonLayer.addData(data);
            self.markers.addLayer(self.geoJsonLayer);
        });
        return this.markers;
    }
});

App.OSMLayer = Ember.Object.extend(EmberLeaflet.LayerMixin,{
    _newLayer : function() {
        return new L.tileLayer.provider('MapQuestOpen');
    }
});

export default EmberLeaflet.MapView.extend({
    zoom : 6,
    center : L.latLng(46.45, 2.61),
    options : {maxZoom : 12},
    childLayers : [
        App.OSMLayer,
        App.HostsLayer
    ]
});

Ember.$(window).on("resize", function() {
    if (Ember.$(".leaflet-container")) {
        Ember.$(".leaflet-container").height(Ember.$(window).height() - Ember.$("nav .container").height() - 20);
    }
}).trigger("resize");


