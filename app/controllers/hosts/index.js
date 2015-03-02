/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';
import config from '../../config/environment';
import Popup from '../../views/hosts/popup';

export default Ember.ArrayController.extend({

    needs: ['countries', 'departments', 'activities'],

    // Query parameters bound with the URL
    queryParams: ['searchTerm', 'department', 'pendingOnly', 'activities', 'lon', 'lat', 'mapZoom'],

    // Whether the controller is in loading state
    isLoading: false,
    isLoadingMore: false,

    // Search filters
    searchTerm: null,
    department: null,
    activities: [],
    pendingOnly: false,

    /**
     * Current map longitude.
     */
    lon: config.map.defaultLon,

    /**
     * Current map Latitude.
     */
    lat: config.map.defaultLat,

    /**
     * Current map Zoom.
     */
    mapZoom: config.map.defaultZoom,

    /**
     * Number of features that are currently displayed.
     */
    numberShowedFeatures: 10,

    /**
     * List of the features displayed in the Host list.
     */
    _showedFeatures: [],

    /**
     * Leaflet Host layer.
     */
    hostLayer: null,

    /**
     * Leaflet Map.
     */
    mapLayer: null,

    // Bindings
    departmentFilterOptions: Ember.computed.alias('controllers.departments'),
    allActivities: Ember.computed.readOnly('controllers.activities.allActivities'),
    visibleFeatures : [],
    popUpContainer: Ember.ContainerView.create(),

    init: function () {
        this.get('popUpContainer').appendTo('body');
        this._super();
    },

    // Query parameters
    parameters: function () {
        return {
            'searchTerm': Ember.$.trim(this.get('searchTerm')) || null,
            'department': this.get('department') || null,
            'pendingOnly': this.get('pendingOnly'),
            'activities': this.get('activities') || null
        };
    }.property('searchTerm', 'department', 'pendingOnly', 'activities'),

    /**
     * Is the "Load more" button should be disabled.
     */
    hideMoreButton :  function () {
        return this.get('isLoadingMore') || this.get('_showedFeatures.length') == this.get('visibleFeatures.length');
    }.property('isLoadingMore', '_showedFeatures.length'),

    /**
     * Observe the activities selected to send a request to refresh hosts.
     */
    activitiesObserver : function () {
        if (this.get('mapLayer')) {
            this.send('updateHosts');
        }
    }.observes('activities'),

    /**
     * Observe the pendingOnly flag to send a request to refresh hosts.
     */
    pendingOnlyObserver : function () {
        if (this.get('mapLayer')) {
            this.send('updateHosts');
        }
    }.observes('pendingOnly'),

    /**
     * List of the features displayed in the Host list.
     */
    showedFeatures : function () {
        var mapIterator = Math.min(this.get('numberShowedFeatures'), this.get('visibleFeatures.length'));
        for (var i= this.get('_showedFeatures.length'); i < mapIterator; i++){
            this.get('_showedFeatures').pushObject(this.get('visibleFeatures')[i]);
        }
        return this.get('_showedFeatures');
    }.property('visibleFeatures.@each', 'numberShowedFeatures'),

    /**
     * Is the map has visible features.
     */
    hasVisibleFeatures: function() {
        return this.get('visibleFeatures').length > 0;
    }.property('visibleFeatures.@each', 'visibleFeatures'),

    /**
     * Activities display name
     */
    activitiesDisplayName: function() {
        return Ember.I18n.t('hosts.index.activities');
    }.property(),

    /**
     * Compute the visibility of the features based on map Extend.
     */
    computeFeatureVisibility: function () {

        // Reset features list
        this.set('visibleFeatures', []);
        this.set('_showedFeatures', []);
        this.set('numberShowedFeatures', 10);

        // For each feature determine if inside map Extend
        var self = this;
        var mapbounds = this.get('mapLayer').getBounds();
        this.get('hostLayer.geoJsonLayer').eachLayer(function (marker) {
            if (mapbounds.contains(marker.getLatLng())) {
                self.get('visibleFeatures').pushObject(marker.feature);
            }
        });
    },

    actions: {
        /**
         * Update the hosts features.
         */
        updateHosts: function () {
            this.set('isLoading', true);
            this.get('hostLayer').updateFeatures(this.get('parameters'));
        },

        /**
         * The hosts features have been updated.
         */
        updated: function () {
            this.computeFeatureVisibility();
            this.set('isLoading', false);
        },

        /**
         * The map position/zoom has changed.
         */
        mapChanged: function() {

            // Update query params based on map
            this.set('mapZoom', this.get('mapLayer').getZoom());
            this.set('lon', this.get('mapLayer').getCenter().lng);
            this.set('lat', this.get('mapLayer').getCenter().lat);

            // Recompute feature visibility
            this.computeFeatureVisibility();
        },

        /**
         * Display more hosts in the host list.
         */
        moreHosts: function () {
            this.set('numberShowedFeatures', this.get('numberShowedFeatures') + 10);
        }
    }
});
