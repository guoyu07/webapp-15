/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    needs: ['countries', 'application', 'departments', 'activities'],

    // Query parameters bound with the URL
    queryParams: ['searchTerm', 'department', 'pendingOnly', 'activities'],

    // Whether the controller is in loading state
    isLoading: false,
    isLoadingMore: false,

    // Search filters
    searchTerm: null,
    department: null,
    activities: [],
    pendingOnly: false,

    // Bindings
    departmentFilterOptions: Ember.computed.alias('controllers.departments'),
    currentUserIsAdmin: Ember.computed.readOnly('controllers.application.currentUserIsAdmin'),
    allActivities: Ember.computed.readOnly('controllers.activities.allActivities'),

    visibleFeatures : [],
    mapZoom : 0,

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

    actions: {
        updateHosts: function () {
            this.set('isLoading', true);
            this.get('hostLayer').updateFeatures(this.get('parameters'));
        },
        updated: function () {
            //this.get('mapLayer').fitBounds(this.get('hostLayer.geoJsonLayer').getBounds());
            this.set('isLoading', false);
        },
        mapChanged: function() {
            this.set('visibleFeatures', []);
            this.set('_showedFeatures', []);
            this.set('numberShowedFeatures', 10);
            this.set('mapZoom', this.get('mapLayer').getZoom());
            if ( !this.get('hasZoomedEnough') && this.get('hostLayer.geoJsonLayer').getLayers().length > 40 ) {
                return;
            }
            var self = this;
            var mapbounds = this.get('mapLayer').getBounds();
            this.get('hostLayer.geoJsonLayer').eachLayer(function (marker) {
                if (mapbounds.contains(marker.getLatLng()))
                {
                    self.get('visibleFeatures').push(marker.feature);
                }
            });
        },
        moreHosts: function () {
            this.set('numberShowedFeatures', this.get('numberShowedFeatures') + 10);
        }
    },

    activitiesDisplayName: function() {
        return Ember.I18n.t('hosts.index.activities');
    }.property()
});
