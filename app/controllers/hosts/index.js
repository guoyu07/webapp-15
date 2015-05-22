/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';
import config from '../../config/environment';

export default Ember.ArrayController.extend({

    needs: ['countries'],

    activitiesService: Ember.inject.service('activities'),
    monthsService: Ember.inject.service('months'),

    // Query parameters bound with the URL
    queryParams: [
        'searchTerm', 'activities', 'lon', 'lat', 'approvalStatus', 'mapZoom',
        'isSuspended', 'isHidden', 'membershipStatus', 'months'
    ],

    // Whether the controller is in loading state
    isLoading: false,
    isLoadingMore: false,
    activeTab: 'results',

    /**
     * Indicates whether the map should be showed.
     * The map is always visible unless the active tabs is 'filters' and the list is hidden (small devices),
     */
    showMap: function () {
        var showMap = true;
        if (Ember.$('#resultList').is(':hidden') && this.get('activeTab') === 'filters') {
            showMap = false;
        }
        return showMap;
    }.property('activeTab'),

    // Search filters
    searchTerm: '',
    activities: [],
    months: [],
    approvalStatus: "approved",
    membershipStatus: "valid",
    isSuspended: false,
    isHidden: false,

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
     * List of the features displayed in the host list.
     */
    _showedFeatures: [],

    /**
     * List of features currently visible on the map.
     */
    visibleFeatures : [],

    /**
     * Leaflet Host layer.
     */
    hostLayer: null,

    /**
     * Leaflet Map.
     */
    mapLayer: null,

    /**
     * The container for pop-ups.
     */
    popUpContainer: Ember.ContainerView.create(),

    init: function () {
        this.get('popUpContainer').appendTo('body');
        this._super();
    },

    // Query parameters
    parameters: function () {
        return {
            'searchTerm': Ember.$.trim(this.get('searchTerm')),
            'approvalStatus': this.get('approvalStatus') || null,
            'activities': this.get('activities') || null,
            'membershipStatus': this.get('membershipStatus') || null,
            'isSuspended': this.get('isSuspended'),
            'isHidden': this.get('isHidden'),
            'months': this.get('months') || null
        };
    }.property('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden', 'months'),

    /**
     * Indicates whether we can load more hosts.
     */
    cannotLoadMore: function () {
        return this.get('isLoadingMore') || this.get('_showedFeatures.length') === this.get('visibleFeatures.length');
    }.property('isLoadingMore', '_showedFeatures.length'),

    /**
     * Observes changes on filters then send an event to refresh the hosts.
     */
    mapShouldRefresh : function () {
        if (this.get('mapLayer')) {
            this.send('updateHosts');
        }
    }.observes('approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden', 'months'),

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
         * Updates the active tab.
         * @param {String} tab
         */
        updateTab: function (tab) {
            this.set('activeTab', tab);
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
