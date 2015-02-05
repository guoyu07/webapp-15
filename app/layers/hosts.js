import Ember from 'ember';


export default Ember.Object.extend(EmberLeaflet.LayerMixin,{
    geoJsonLayer : null,
    markers : null,
    requestURI : "/api/host-coordinates",
    resultLimit : 2000,
    _newLayer : function () {
        this.geoJsonLayer = new L.geoJson();
        this.markers = L.markerClusterGroup({ disableClusteringAtZoom: 9 });
        var dataRequest = Ember.$.get( this.get('requestURI') + "?limit=" +this.get('resultLimit'));
        var self = this;
        dataRequest.done(function (data) {
            self.geoJsonLayer.addData(data);
            self.markers.addLayer(self.geoJsonLayer);
        });
        return this.markers;
    },
    updateFeatures(params) {
        var completeURI = this.get('requestURI') + "?limit=" +this.get('resultLimit');
        if (params.searchTerm)
        {
            completeURI = completeURI + "&searchTerm=" + params.searchTerm;
        }
        var dataRequest = Ember.$.get(completeURI);
        var self = this;
        dataRequest.done(function (data) {
            self.geoJsonLayer.clearLayers();
            self.geoJsonLayer.addData(data);
        });
        //http://localhost:3333/api/host-coordinates?limit=2000&searchTerm=test
    }
});