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
    this.markerClusterGroup = L.markerClusterGroup();
    this.map.addLayer(this.markerClusterGroup);

    // Prepare GeoJSON layer
    this.geoJsonLayer = new L.geoJson(null, {

      // Bind click listener for each feature
      onEachFeature: L.bind(function(feature, layer) {
        layer.on('click', L.bind(this.onFeatureClick, this));
      }, this)
    });

    // Set the tile layer
    L.gridLayer.googleMutant({
      type: 'roadmap'
    }).addTo(this.map);

    // Attach events to the map
    this.map.on('dragend', this.mapDidMove, this);
    this.map.on('zoomend', this.mapDidMove, this);
  },

  /**
   * Centers the map in the middle of France.
   */
  centerMap() {
    const latitude = this.get('latitude');
    const longitude = this.get('longitude');
    const zoom = this.get('zoom');

    if (latitude && longitude) {
      this.map.setView([latitude, longitude], zoom);
    } else {
      this.map.fitBounds([
        [43, -3], // south west
        [50, 7] // north east
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
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

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
    let visibleFeatures = [];
    const mapBounds = this.map.getBounds();
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
    const { properties } = e.target.feature;

    // Set info about the current host
    this.set('hostId', properties.hostId);
    this.set('photo', properties.photo);
    this.set('farmName', properties.farmName);

    Ember.run.later(this, function() {

      // Retrieve the popup content
      let popup = Ember.$('.leaflet-popup').html();

      // Open popup
      e.target.bindPopup(popup, { closeButton: false }).togglePopup();

    }, 100);
  }
});
