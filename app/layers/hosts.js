import Ember from 'ember';


export default Ember.Object.extend(EmberLeaflet.LayerMixin,{
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
    },
    requestFeatures(params) {

    }
});