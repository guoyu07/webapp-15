import Ember from 'ember';


export default Ember.Object.extend(EmberLeaflet.LayerMixin,{
    name : "HostLayer",
    geoJsonLayer : null,
    markers : null,
    requestURI : "/api/host-coordinates",
    resultLimit : 2000,
    _newLayer : function () {
        this.geoJsonLayer = new L.geoJson();
        this.markers = L.markerClusterGroup({ disableClusteringAtZoom: 9 });
        var params = this.controller.get('parameters');
        this.updateFeatures(params);
        this.controller.set('hostLayer', this);
        return this.markers;
    },
    updateFeatures(params) {
        var completeURI = this.get('requestURI') + "?limit=" +this.get('resultLimit');
        if (params.searchTerm)
        {
            completeURI = completeURI + "&searchTerm=" + params.searchTerm;
        }
        if (params.pendingOnly)
        {
            completeURI = completeURI + "&pendingOnly=" + params.pendingOnly;
        }
        var activities = this.controller.get('activities');
        if (activities){
            activities.forEach(function (activity) {
                completeURI = completeURI + "&activities[]=" + activity;
            })
        }
        var dataRequest = Ember.$.get(completeURI);
        var self = this;
        dataRequest.done(function (data) {
            self.markers.removeLayer(self.geoJsonLayer);
            self.geoJsonLayer.clearLayers();
            self.geoJsonLayer.addData(data);
            self.markers.addLayer(self.geoJsonLayer);
            self.controller.send("updated");
        });
    }
});