import Ember from 'ember';


export default Ember.Object.extend(EmberLeaflet.LayerMixin, {
    name: "HostLayer",
    geoJsonLayer: null,
    markers: null,
    requestURI: "/api/host-coordinates",
    resultLimit: 2000,

    _newLayer: function () {
        this.geoJsonLayer = new L.geoJson(null, {
            onEachFeature: L.bind(this.get('onEachFeature'), this)
        });

        this.markers = L.markerClusterGroup({disableClusteringAtZoom: 9});
        var params = this.controller.get('parameters');
        this.updateFeatures(params);
        this.controller.set('hostLayer', this);
        return this.markers;
    },
    updateFeatures(params) {
        var completeURI = this.get('requestURI') + "?limit=" + this.get('resultLimit');
        if (params.searchTerm) {
            completeURI = completeURI + "&searchTerm=" + params.searchTerm;
        }
        if (params.pendingOnly) {
            completeURI = completeURI + "&pendingOnly=" + params.pendingOnly;
        }
        var activities = this.controller.get('activities');
        if (activities) {
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
    },

    onEachFeature(feature, layer) {
        layer.on('click', L.bind(this.onFeatureclick, this));
    },

    /**
     * Create and display the popup associated to the clicked feature
     * @param e
     */
    onFeatureclick : function (e) {
        var view = this.view = this._parentLayer.createChildView('hosts/popup');
        view.set('context', e.target.feature);
        Ember.View.states.inDOM.enter(view);
        view.createElement();
        e.target.bindPopup(view.get('element')).togglePopup();
        /*e.target.bindPopup("Loading").togglePopup();
        var feature = e.target.feature;
        var html = "<div class=\"popupFarnName\"><a href=\"/host/" + feature.properties.hostId + "\">" + feature.properties.farmName + "</a></div>";
        var imgUrl = "wwoof-no-photo.png";
        if (feature.properties.photo)
        {
            this.container.lookup("store:main").find('photo', feature.properties.photo).then(L.bind(function (data) {
                imgUrl = data.get('completeUrl');
                html = "<div class=\"host-thumb-small\" style=\"background-image:url(" + imgUrl + ")\" > </div>" + html;
                this.bindPopup(html).togglePopup();
            }, e.target))
        } else {
            var self = this;
            setTimeout(function () {
                html = "<div class=\"host-thumb-small\" style=\"background-image:url(" + imgUrl + ")\" > </div>" + html;
                e.target.bindPopup(html).togglePopup();
            }, 100);

        }*/
    }
});