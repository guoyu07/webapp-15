import Ember from 'ember';

/**
 * Leaflet Layer for hosts features
 */
export default Ember.Object.extend(EmberLeaflet.LayerMixin, {
    name: "HostLayer",
    geoJsonLayer: null,
    markers: null,
    requestURI: "/api/host-coordinates",
    resultLimit: 5000,
    disableClusteringAtZoom: 9,

    /**
     * Init Method
     */
    _newLayer: function () {

        // Create Geojson Layer
        this.geoJsonLayer = new L.geoJson(null, {

            // Bind click listener for each feature
            onEachFeature: L.bind(function (feature, layer) {
                layer.on('click', L.bind(this.onFeatureclick, this));
            }, this)
        });

        // Create markerCluster Group
        this.markers = L.markerClusterGroup({disableClusteringAtZoom: this.get('disableClusteringAtZoom')});

        // Request the features
        var params = this.controller.get('parameters');
        this.updateFeatures(params);

        // affect controller's host layer to this
        this.controller.set('hostLayer', this);
        return this.markers;
    },

    /**
     * Update the Hosts features of the layer.
     */
    updateFeatures(params) {

        // Avoid update when not displayed
        if (!this.geoJsonLayer || !this.markers) {
            return;
        }
        // Set controller loading state
        this.controller.set('isLoading', true);

        // Adds limit to query params
        params.limit = this.get('resultLimit');

        // Create GET request
        var dataRequest = Ember.$.get(this.get('requestURI'), params);
        var self = this;
        dataRequest.done(function (data) {

            if (!self.markers || !self.geoJsonLayer) {
                return;
            }

            // Clean previous features
            self.markers.removeLayer(self.geoJsonLayer);
            self.geoJsonLayer.clearLayers();

            // Add new Data to the layers
            self.geoJsonLayer.addData(data);
            self.markers.addLayer(self.geoJsonLayer);

            // Trigger Updated action in the controller
            self.controller.send("updated");
        });
    },

    /**
     * Create and display the popup associated to the clicked feature.
     */
    onFeatureclick : function (e) {

        // Retrieve the popup View
        var popupView = this.container.lookup('view:hosts/popup');

        // Set popup context to current feature
        popupView.set('context', e.target.feature);

        // Remove previous popup from popupContainer
        this.controller.get('popUpContainer').removeAllChildren();

        // Add current popup to popupContainer
        this.controller.get('popUpContainer').addObject(popupView);

        // Open popup
        // $BUG : prevent a bug with Leaflet popup by adding a setTimeout
        setTimeout(function () {
            e.target.bindPopup(popupView.get('element')).togglePopup();
        }, 100);
    }
});
