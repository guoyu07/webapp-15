import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({

  activitiesService: service('activities'),
  monthsService: service('months'),
  capacitiesService: service('capacities'),
  staysService: service('stays'),
  departmentsService: service('departments'),

  // Query parameters bound with the URL
  queryParams: [
    'searchTerm', 'activities', 'lon', 'lat', 'approvalStatus', 'mapZoom', 'showMoreFilter',
    'isSuspended', 'isHidden', 'membershipStatus', 'months', 'dptId', 'capacity', 'stay'
  ],

  // Whether the controller is in loading state
  isLoading: false,
  isLoadingMore: false,
  showMoreFilter: false,

  /**
   * Indicates whether the map should be showed.
   */
  showMap: computed.or('media.isDesktop', 'media.isJumbo'),

  // Search filters
  searchTerm: '',
  activities: [],
  months: [],
  dptId: null,
  capacity: '1',
  stay: 'one-two-weeks',
  approvalStatus: 'approved',
  membershipStatus: 'valid',
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
  currentDisplayedFeatureCount: 10,

  /**
   * List of visible features on the map.
   */
  visibleFeatures: [],

  /**
   * The latest host-coordinates XHR request.
   */
  dataRequest: null,

  department: null,

  // Query parameters
  parameters: computed('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden', 'months', 'dptId', function() {
    return {
      searchTerm: Ember.$.trim(this.get('searchTerm')),
      approvalStatus: this.get('approvalStatus') || null,
      activities: this.get('activities') || null,
      membershipStatus: this.get('membershipStatus') || null,
      isSuspended: this.get('isSuspended'),
      isHidden: this.get('isHidden'),
      months: this.get('months') || null,
      dptId: this.get('dptId') || null
    };
  }),

  /**
   * Indicates whether we can load more hosts.
   */
  cannotLoadMore: computed('isLoadingMore', 'currentDisplayedFeatureCount', 'visibleFeatures.length', function() {
    return this.get('isLoadingMore') || this.get('currentDisplayedFeatureCount') >= this.get('visibleFeatures.length');
  }),

  /**
   * Observes changes on filters then send an event to refresh the hosts.
   */
  mapShouldRefresh: function() {
    this.send('updateHosts');
  }.observes('approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden', 'months', 'dptId'),

  /**
   * Whether the map has visible features.
   */
  hasVisibleFeatures: computed.notEmpty('displayedFeatures'),

  /**
   * Returns the list of features displayed in the list.
   */
  displayedFeatures: computed('visibleFeatures.[]', 'hostCoordinates.features.[]', 'currentDisplayedFeatureCount', 'showMap', function() {
    let visibleFeatures = this.get('visibleFeatures');

    if (!this.get('showMap')) {
      visibleFeatures = this.get('hostCoordinates.features');
    }

    let displayedFeatures = [];

    if (visibleFeatures) {
      let end = Math.min(this.get('currentDisplayedFeatureCount'), visibleFeatures.length);
      displayedFeatures = visibleFeatures.slice(0, end);
    }

    return displayedFeatures;
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
     * Display more hosts in the host list.
     */
    moreHosts() {
      this.set('currentDisplayedFeatureCount', this.get('currentDisplayedFeatureCount') + 10);
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

    toggleFilters() {
      this.toggleProperty('showMoreFilter');
    }
  }
});
