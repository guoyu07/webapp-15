import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

const featurePageSize = 10;

export default Ember.Controller.extend({

  activitiesService: service('activities'),
  monthsService: service('months'),
  capacitiesService: service('capacities'),
  staysService: service('stays'),
  departmentsService: service('departments'),

  // Query parameters bound with the URL
  queryParams: [
    'searchTerm', 'activities', 'lon', 'lat', 'approvalStatus', 'zoom', 'showMoreFilter',
    'isSuspended', 'isHidden', 'membershipStatus', 'months', 'dptId', 'capacity', 'stay',
    'childrenOk', 'petsOk'
  ],

  /**
   * Search filters.
   */
  months: [],
  capacity: '1',
  stay: 'one-two-weeks',
  activities: [],

  /**
   * Advanced search filters.
   */
  searchTerm: '',
  dptId: null,
  childrenOk: false,
  petsOk: false,

  /**
   * Admin search filters.
   */
  approvalStatus: 'approved',
  membershipStatus: 'valid',
  isSuspended: false,
  isHidden: false,

  /**
   * Map longitude/latitude/zoom.
   */
  lon: null,
  lat: null,
  zoom: null,

  /**
   * Indicates whether the controller is in loading state.
   */
  isLoading: false,
  isLoadingMore: false,

  /**
   * Indicates whether advanced filters are visible.
   */
  showMoreFilter: false,

  /**
   * Indicates whether the map is visible.
   */
  showMap: computed.or('media.isDesktop', 'media.isJumbo'),

  /**
   * List of features currently displayed in the list.
   */
  currentDisplayedFeatureCount: featurePageSize,

  /**
   * List of visible features on the map.
   */
  featuresOnMap: [],

  /**
   * The latest host-coordinates XHR request.
   */
  dataRequest: null,

  department: null,

  // Query parameters
  parameters: computed('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden',
    'months', 'dptId', 'stay', 'capacity', 'childrenOk', 'petsOk', function() {
     return this.getProperties('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden',
      'months', 'dptId', 'stay', 'capacity', 'childrenOk', 'petsOk');
  }),

  /**
   * Indicates whether we can load more hosts.
   */
  cannotLoadMore: computed('isLoadingMore', 'currentDisplayedFeatureCount', 'features.length', function() {
    return this.get('isLoadingMore') || this.get('currentDisplayedFeatureCount') >= this.get('features.length');
  }),

  /**
   * Observes changes on filters then send an event to refresh the hosts.
   */
  mapShouldRefresh: function() {
    this.send('updateHosts');
  }.observes('approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden',
    'months', 'dptId', 'stay', 'capacity', 'childrenOk', 'petsOk'),

  /**
   * Returns the list of features that can be displayed in the list.
   */
  features: computed('featuresOnMap.[]', 'hostCoordinates.features.[]', 'showMap', function () {
    let features = [];

    if (this.get('showMap')) {
      features = this.get('featuresOnMap');
    } else {
      features = this.get('hostCoordinates.features');
    }

    return features;
  }),

  /**
   * Whether the list has visible features.
   */
  hasVisibleFeatures: computed.notEmpty('featuresInList'),

  /**
   * Returns the list of features that are displayed in the list.
   */
  featuresInList: computed('features.[]', 'currentDisplayedFeatureCount', function() {
    let featuresInList = null;
    let features = this.get('features');

    if (Ember.isPresent(features)) {
      let end = Math.min(this.get('currentDisplayedFeatureCount'), features.length);
      featuresInList = features.slice(0, end);
    }

    return featuresInList;
  }),

  selectedMonths: computed('months.[]', function () {
    let months = this.get('months');
    return this.get('monthsService.allMonths').filter(function (month) {
      return months.contains(month.id);
    });
  }),

  selectedCapacity: computed('capacity', function () {
    let capacity = this.get('capacity');
    return this.get('capacitiesService.allCapacities').findBy('id', capacity);
  }),

  selectedStay: computed('stay', function () {
    let stay = this.get('stay');
    return this.get('staysService.allStays').findBy('id', stay);
  }),

  selectedDepartment: computed('dptId', function () {
    let dptId = this.get('dptId');
    return dptId ? this.store.find('department', dptId) : null;
  }),

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
      this.set('featuresOnMap', visibleFeatures);
      this.set('currentDisplayedFeatureCount', featurePageSize);
    },

    /**
     * The map position/zoom has changed.
     */
    mapMoved(latitude, longitude, zoom) {
      this.setProperties({
        lat: latitude,
        lon: longitude,
        zoom: zoom
      });
    },

    /**
     * Displays more hosts in the host list.
     */
    moreHosts() {
      this.set('currentDisplayedFeatureCount', this.get('currentDisplayedFeatureCount') + featurePageSize);
    },

    chooseDepartment(department) {
      var id = department ? department.id : null;
      this.set('dptId', id);
    },

    chooseMonths(months) {
      this.set('months', months.mapBy('id'));
    },

    chooseCapacity(capacity) {
      this.set('capacity', capacity.id);
    },

    chooseStay(stay) {
      this.set('stay', stay.id);
    },

    toggleAdvancedFilters() {
      this.toggleProperty('showMoreFilter');
    }
  }
});
