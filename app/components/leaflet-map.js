import Ember from 'ember';

export default Ember.Component.extend({

  markers: [],
  latitude: null,
  longitude: null,
  zoom: null,

  map: null,
  markerClusterGroup: null,
  geoJsonLayer: null,

  didInsertElement() {
    // Draw the map
    this.drawMap();

    // Center the map on France
    this.centerMap();

    // If markers are available, show them on the map
    let markers = this.get('markers');
    if (markers) {
      this.setMarkers(markers);
    }
  },

  didReceiveAttrs() {
    let markers = this.getAttr('markers');

    // If markers are available, show them on the map
    if (markers) {
      this.setMarkers(markers);
    }
  },

  drawMap() {
    // Create the map
    this.map = L.map(this.get('elementId'), { minZoom: 3, maxZoom: 12 });

    // Prepare the cluster group
    this.markerClusterGroup = L.markerClusterGroup({ disableClusteringAtZoom: 10 });
    this.map.addLayer(this.markerClusterGroup);

    // Prepare GeoJSON layer
    this.geoJsonLayer = new L.geoJson(null, {

      // Bind click listener for each feature
      onEachFeature: L.bind(function(feature, layer) {
        layer.on('click', L.bind(this.onFeatureClick, this));
      }, this)
    });

    // Set the tile layer
    var tileLayer = new L.tileLayer.provider('MapQuestOpen');
    tileLayer._url = 'https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg';
    tileLayer.addTo(this.map);

    // Attach events to the map
    this.map.on('dragend', this.mapDidMove, this);
    this.map.on('zoomend', this.mapDidMove, this);
  },

  /**
   * Centers the map in the middle of France.
   */
  centerMap() {
    var latitude = this.get('latitude');
    var longitude = this.get('longitude');
    var zoom = this.get('zoom');

    if (latitude && longitude) {
      this.map.setView([latitude, longitude], zoom);
    } else {
      this.map.fitBounds([
        [41.263, -5.466], // south west
        [51.268, 9.868] // north east
      ]);
    }
  },

  /**
   * Set the markers on the map.
   */
  setMarkers(markers) {

    // Only show the markers if the map is ready
    if (!markers || !this.markerClusterGroup || !this.geoJsonLayer) {
      return;
    }

    // Clean previous features
    this.markerClusterGroup.removeLayer(this.geoJsonLayer);
    this.geoJsonLayer.clearLayers();

    // Add new data to the layers
    this.geoJsonLayer.addData(markers);
    this.markerClusterGroup.addLayer(this.geoJsonLayer);

    this.updateVisibleFeatures();
  },

  /**
   * Cleans the layers/events up.
   */
  willDestroyElement() {
    if (this.map) {
      this.map.remove();
    }
    if (this.markerClusterGroup) {
      this.markerClusterGroup.removeLayer(this.geoJsonLayer);
    }
    if (this.geoJsonLayer) {
      this.geoJsonLayer.clearLayers();
    }
  },

  /**
   * Handles moves on the map.
   */
  mapDidMove() {
    var center = this.map.getCenter();
    var zoom = this.map.getZoom();

    this.sendAction('mapMoved', center.lat, center.lng, zoom);

    this.updateVisibleFeatures();
  },

  /**
   * Computes the visibility of the features based on map bounds.
   */
  updateVisibleFeatures() {

    if (!this.map || !this.geoJsonLayer) {
      return;
    }

    // Find visible features
    var visibleFeatures = [];
    var mapBounds = this.map.getBounds();
    this.geoJsonLayer.eachLayer(function(layer) {
      if (mapBounds.contains(layer.getLatLng())) {
        visibleFeatures.push(layer.feature);
      }
    });

    this.sendAction('visibleFeaturesChanged', visibleFeatures);
  },

  /**
   * Create and display the popup associated to the clicked feature.
   */
  onFeatureClick(e) {

    var feature = e.target.feature;
    var hostId = feature.properties.hostId;
    var photo = feature.properties.photo;
    var farmName = feature.properties.farmName;

    // Set info about the current host
    this.set('hostId', hostId);
    this.set('photo', photo);
    this.set('farmName', farmName);

    Ember.run.later(this, function() {

      // Retrieve the popup content
      var popup = Ember.$('.leaflet-popup').html();

      // Open popup
      e.target.bindPopup(popup, { closeButton: false }).togglePopup();

    }, 100);
  }
});
