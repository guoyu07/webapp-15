/**
 * Ember controller for hosts index.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

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
  showMap: function() {
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
  lon: null,

  /**
   * Current map Latitude.
   */
  lat: null,

  /**
   * Current map Zoom.
   */
  mapZoom: null,

  /**
   * Number of features that are displayed by default.
   */
  defaultDisplayedFeatureCount: 10,

  /**
   * List of features currently displayed in the list.
   */
  currentDisplayedFeatureCount: 0,

  /**
   * List of visible features on the map.
   */
  visibleFeatures: [],

  /**
   * The latest host-coordinates XHR request.
   */
  dataRequest: null,

  // Query parameters
  parameters: function() {
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
  cannotLoadMore: function() {
    return this.get('isLoadingMore') || this.get('currentDisplayedFeatureCount') >= this.get('visibleFeatures.length');
  }.property('isLoadingMore', 'currentDisplayedFeatureCount', 'visibleFeatures.length'),

  /**
   * Observes changes on filters then send an event to refresh the hosts.
   */
  mapShouldRefresh: function() {
    this.send('updateHosts');
  }.observes('approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden', 'months'),

  /**
   * Whether the map has visible features.
   */
  hasVisibleFeatures: Ember.computed.notEmpty('visibleFeatures'),

  /**
   * Returns the list of features displayed in the list.
   */
  displayedFeatures: function() {

    var visibleFeatures = this.get('visibleFeatures');

    if (!visibleFeatures) {
      return;
    }

    var end = Math.min(this.get('currentDisplayedFeatureCount'), visibleFeatures.length);

    return visibleFeatures.slice(0, end);

  }.property('visibleFeatures.length', 'currentDisplayedFeatureCount'),

  actions: {
    /**
     * Update the hosts features.
     */
    updateHosts() {

      this.set('isLoading', true);

      // Abort any potential previous request to avoid racing issues
      var dataRequest = this.get('dataRequest');
      if (dataRequest) {
        dataRequest.abort();
      }

      // Prepare params
      var params = this.get('parameters');
      params.limit = 5000;

      // Create GET request
      dataRequest = Ember.$.get('/api/host-coordinates', params);
      this.set('dataRequest', dataRequest);

      dataRequest.done((data)=> {
        this.set('hostCoordinates', data);
        this.set('isLoading', false);
      });
    },

    /**
     * Refreshes the list of visible features when yhe map is loaded or was moved.
     */
    visibleFeaturesChanged(visibleFeatures) {
      this.set('visibleFeatures', visibleFeatures);
      this.set('currentDisplayedFeatureCount', this.get('defaultDisplayedFeatureCount'));
    },

    /**
     * The map position/zoom has changed.
     */
    mapMoved(latitude, longitude, zoom) {
      this.setProperties({
        lat: latitude,
        lon: longitude,
        mapZoom: zoom
      });
    },

    /**
     * Updates the active tab.
     * @param {String} tab
     */
    updateTab(tab) {
      this.set('activeTab', tab);
    },

    /**
     * Display more hosts in the host list.
     */
    moreHosts() {
      this.set('currentDisplayedFeatureCount', this.get('currentDisplayedFeatureCount') + 10);
    }
  }
});
