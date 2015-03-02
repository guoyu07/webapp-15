/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';
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

    // Map context
    lon: null,
    lat: null,
    mapZoom : null,

    // Bindings
    departmentFilterOptions: Ember.computed.alias('controllers.departments'),
    allActivities: Ember.computed.readOnly('controllers.activities.allActivities'),
    visibleFeatures : [],
    popUpContainer: null,

    init: function () {
        this.popUpContainer = Ember.ContainerView.create();
        this.popUpContainer.appendTo('body');
        this._super();
    },

    hasZoomedEnough : function () {
        return this.get('mapZoom') >= 8;
    }.property('mapZoom'),

    hideMoreButton :  function () {
        return this.get('isLoadingMore') || this.get('_showedFeatures.length') == this.get('visibleFeatures.length');
    }.property('isLoadingMore', '_showedFeatures.length'),

    activitiesObserver : function () {
        if (this.get('mapLayer'))
        {
            this.send('updateHosts');
        }
    }.observes('activities'),


    numberShowedFeatures : 10,

    _showedFeatures : [],

    showedFeatures : function () {
        var mapIterator = Math.min(this.get('numberShowedFeatures'), this.get('visibleFeatures.length'));
        for (var i= this.get('_showedFeatures.length'); i < mapIterator; i++){
            this.get('_showedFeatures').pushObject(this.get('visibleFeatures')[i]);
        }
        return this.get('_showedFeatures');
    }.property('visibleFeatures.@each', 'numberShowedFeatures'),

    // Query parameters
    parameters: function () {
        return {
            'searchTerm': Ember.$.trim(this.get('searchTerm')) || null,
            'department': this.get('department') || null,
            'pendingOnly': this.get('pendingOnly'),
            'activities': this.get('activities') || null
        };
    }.property('searchTerm', 'department', 'pendingOnly', 'activities'),

    hasVisibleFeatures: function() {
        return this.get('visibleFeatures').length > 0;
    }.property('visibleFeatures.@each', 'visibleFeatures'),

    computeFeatureVisibility: function () {
        var self = this;
        var mapbounds = this.get('mapLayer').getBounds();
        this.get('hostLayer.geoJsonLayer').eachLayer(function (marker) {
            if (mapbounds.contains(marker.getLatLng()))
            {
                self.get('visibleFeatures').pushObject(marker.feature);
            }
        });
    },

    actions: {
        updateHosts: function () {
            this.set('isLoading', true);
            this.get('hostLayer').updateFeatures(this.get('parameters'));
        },
        updated: function () {
            this.computeFeatureVisibility();
            this.set('isLoading', false);
        },
        mapChanged: function() {
            this.set('visibleFeatures', []);
            this.set('_showedFeatures', []);
            this.set('numberShowedFeatures', 10);
            this.set('mapZoom', this.get('mapLayer').getZoom());
            this.set('lon', this.get('mapLayer').getCenter().lng);
            this.set('lat', this.get('mapLayer').getCenter().lat);
            this.computeFeatureVisibility();
        },
        moreHosts: function () {
            this.set('numberShowedFeatures', this.get('numberShowedFeatures') + 10);
        }
    },

    activitiesDisplayName: function() {
        return Ember.I18n.t('hosts.index.activities');
    }.property()
});
