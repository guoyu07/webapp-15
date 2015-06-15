import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

    attributeBindings: ['style'],

    width: '100%',
    height: '400px',
    latitude: config.map.defaultLat,
    longitude: config.map.defaultLon,
    zoom: config.map.defaultZoom,

    map: null,
    markerClusterGroup: null,
    geoJsonLayer: null,

    style: function() {
        return [
            'width:' + this.get('width'),
            'height:' + this.get('height')
        ].join(';');
    }.property('width', 'height'),

    setView: function() {
        this.map.fitBounds([
            [ 41.307, -4.986 ], // south west
            [ 51.225, 9.744 ] // north east
        ]);
    },

    setMarkers: function () {

        if (!this.markers) {
            return;
        }

        // Clean previous features
        this.markerClusterGroup.removeLayer(this.geoJsonLayer);
        this.geoJsonLayer.clearLayers();

        // Add new data to the layers
        this.geoJsonLayer.addData(this.markers);
        this.markerClusterGroup.addLayer(this.geoJsonLayer);

        this.updateVisibleFeatures();

    }.observes('markers.length'),

    didInsertElement: function() {

        // Create the map
        this.map = L.map(this.get('element'), { minZoom: 3, maxZoom: 12 });

        // Prepare the cluster group
        this.markerClusterGroup = L.markerClusterGroup({ disableClusteringAtZoom: 9 });
        this.map.addLayer(this.markerClusterGroup);

        // Prepare GeoJSON layer
        this.geoJsonLayer = new L.geoJson(null, {

            // Bind click listener for each feature
            onEachFeature: L.bind(function (feature, layer) {
                layer.on('click', L.bind(this.onFeatureClick, this));
            }, this)
        });

        // Set the tile layer
        var layer = new L.tileLayer.provider('MapQuestOpen');
        layer._url = 'https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg';
        layer.addTo(this.map);

        // Attach events to the map
        this.map.on('dragend', this.mapDidMove, this);
        this.map.on('zoomend', this.mapDidMove, this);

        // Resize containers to fit the screen size
        this.resizeContainers();
        Ember.$(window).on('resize', this.resizeContainers);
        this.map.invalidateSize();

        // Adjust map to display France
        this.setView();
    },

    willRemoveElement: function() {
        if (this.map) {
            this.map.remove();
        }
    },

    mapDidMove: function() {

        var map    = this.get('map'),
            center = map.getCenter(),
            zoom   = map.getZoom();

        this.setProperties({
            latitude: center.lat,
            longitude: center.lng,
            zoom: zoom
        });

        this.updateVisibleFeatures();
    },

    /**
     * Computes the visibility of the features based on map Extend.
     */
    updateVisibleFeatures: function () {

        if (!this.map || !this.geoJsonLayer) {
            return;
        }

        // Find visible features
        var visibleFeatures = [];
        var mapBounds = this.map.getBounds();
        this.geoJsonLayer.eachLayer(function (marker) {
            if (mapBounds.contains(marker.getLatLng())) {
                visibleFeatures.push(marker.feature);
            }
        });

        this.sendAction('visibleFeaturesChanged', visibleFeatures);
    },

    resizeContainers: function() {

        var windowHeight = Ember.$(window).height();
        var mapTopOffset = Ember.$('.host-index-row').offset().top;
        var listTopOffset = Ember.$('#resultTabContent').offset().top;

        if (Ember.$('#resultList').is(':hidden')) {

            // Resize Map for mobile
            if (Ember.$(".leaflet-container")) {
                Ember.$(".leaflet-container").height(windowHeight - listTopOffset - 30);
            }
        } else {

            // Resize Map for desktop
            if (Ember.$(".leaflet-container")) {
                Ember.$(".leaflet-container").height(windowHeight - mapTopOffset - 20);
            }

            if (Ember.$("#resultList")) {
                Ember.$("#resultList").height(windowHeight - listTopOffset - 40);
            }
        }
    },

    /**
     * Create and display the popup associated to the clicked feature.
     */
    onFeatureClick(e) {

        var feature = e.target.feature;

        // Set values of the current host
        this.set('hostId', feature.properties.hostId);
        this.set('photoId', feature.properties.photoId);
        this.set('farmName', feature.properties.farmName);

        Ember.run.later(this, function() {

            // Retrieve the popup content
            var popup = Ember.$('.leaflet-popup').html();

            // Open popup
            e.target.bindPopup(popup, { closeButton: false }).togglePopup();

        }, 100);
    }
});
