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
  stay: null,
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
   * List of features currently displayed in the list.
   */
  displayedFeatureCount: featurePageSize,

  /**
   * List of visible features on the map.
   */
  featuresOnMap: [],

  /**
   * Indicates whether the list should only show the hosts visible on map.
   */
  syncMapAndList: true,

  /**
   * The latest host-coordinates XHR request.
   */
  dataRequest: null,

  /**
   * Indicates whether the map is visible.
   */
  showMap: computed.or('media.isDesktop', 'media.isJumbo'),

  // Query parameters
  parameters: computed('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden',
    'months', 'dptId', 'stay', 'capacity', 'childrenOk', 'petsOk', function() {
      return this.getProperties('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended', 'isHidden',
       'months', 'dptId', 'stay', 'capacity', 'childrenOk', 'petsOk');
    }),

  /**
   * Indicates whether we can load more hosts.
   */
  cannotLoadMore: computed('isLoadingMore', 'displayedFeatureCount', 'features.length', function() {
    return this.get('isLoadingMore') || this.get('displayedFeatureCount') >= this.get('features.length');
  }),

  /**
   * Returns the list of features that can be displayed in the list.
   */
  features: computed('featuresOnMap.[]', 'hostCoordinates.features.[]', 'showMap', 'syncMapAndList', function() {
    let features = [];

    if (this.get('showMap') && this.get('syncMapAndList')) {
      features = this.get('featuresOnMap');
    } else {
      features = this.get('hostCoordinates.features');
    }

    return features;
  }),

  /**
   * Indicates whether the "Show Hosts Not on Map" button should be displayed.
   */
  showDisableSyncButton: computed('syncMapAndList', 'hostCoordinates.features.length', function() {
    return this.get('syncMapAndList') && this.get('hostCoordinates.features.length') > 0;
  }),

  /**
   * Whether the list has visible features.
   */
  hasVisibleFeatures: computed.notEmpty('featuresInList'),

  /**
   * Returns the list of features that are displayed in the list.
   */
  featuresInList: computed('features.[]', 'displayedFeatureCount', function() {
    let featuresInList = null;
    let features = this.get('features');

    if (Ember.isPresent(features)) {
      let end = Math.min(this.get('displayedFeatureCount'), features.length);
      featuresInList = features.slice(0, end);
    }

    return featuresInList;
  }),

  selectedMonths: computed('months.[]', 'monthsService.allMonths.[]', function() {
    let months = this.get('months');
    return this.get('monthsService.allMonths').filter(function(month) {
      return months.contains(month.id);
    });
  }),

  selectedCapacity: computed('capacity', 'capacitiesService.allCapacities.[]', function() {
    let capacity = this.get('capacity');
    return this.get('capacitiesService.allCapacities').findBy('id', capacity);
  }),

  selectedStay: computed('stay', 'staysService.allStays.[]', function() {
    let stay = this.get('stay');
    return this.get('staysService.allStays').findBy('id', stay);
  }),

  selectedDepartment: computed('dptId', function() {
    let dptId = this.get('dptId');
    return dptId ? this.store.findRecord('department', dptId) : null;
  }),

  retrieveHosts() {
    this.set('isLoading', true);
    this.set('hostCoordinates', { features: [] });

    // Abort any potential previous request to avoid racing issues
    let dataRequest = this.get('dataRequest');
    if (dataRequest) {
      dataRequest.abort();
    }

    // Prepare params
    let params = this.get('parameters');
    params.limit = 5000;

    // Create GET request
    dataRequest = Ember.$.get('/api/host-coordinates', params);
    this.set('dataRequest', dataRequest);

    dataRequest.done((data)=> {
      this.set('hostCoordinates', data);
      this.set('isLoading', false);
    });
  },

  actions: {
    /**
     * Updates the hosts features.
     */
    updateHosts() {
      this.retrieveHosts();
    },

    /**
     * Updates the host features and toggles the advanced filters visibility.
     */
    applyFilters() {
      this.retrieveHosts();
      this.toggleProperty('showMoreFilter');
    },

    /**
     * Refreshes the list of visible features when yhe map is loaded or was moved.
     */
    visibleFeaturesChanged(visibleFeatures) {
      this.set('featuresOnMap', visibleFeatures);
      this.set('displayedFeatureCount', featurePageSize);
    },

    /**
     * Updates map position/zoom.
     */
    mapMoved(latitude, longitude, zoom) {
      this.setProperties({
        lat: latitude,
        lon: longitude,
        zoom
      });
    },

    /**
     * Displays more hosts in the host list.
     */
    moreHosts() {
      this.set('displayedFeatureCount', this.get('displayedFeatureCount') + featurePageSize);
    },

    chooseDepartment(department) {
      const id = department ? department.id : null;
      this.set('dptId', id);
      this.retrieveHosts();
    },

    chooseMonths(months) {
      this.set('months', months.mapBy('id'));
      this.retrieveHosts();
    },

    chooseCapacity(capacity) {
      this.set('capacity', capacity.id);
      this.retrieveHosts();
    },

    chooseStay(stay) {
      const id = stay ? stay.id : null;
      this.set('stay', id);
      this.retrieveHosts();
    },

    /**
     * Toggles the advanced filters visibility.
     */
    toggleAdvancedFilters() {
      this.toggleProperty('showMoreFilter');
    },

    /**
     * Toggles the synchronisation of the map and the list.
     */
    toggleSyncMapAndList() {
      this.toggleProperty('syncMapAndList');
    },

    toggleIsSuspended() {
      this.toggleProperty('isSuspended');
      this.retrieveHosts();
    },

    toggleIsHidden() {
      this.toggleProperty('isHidden');
      this.retrieveHosts();
    },

    toggleChildrenOk() {
      this.toggleProperty('childrenOk');
      this.retrieveHosts();
    },

    togglePetsOk() {
      this.toggleProperty('petsOk');
      this.retrieveHosts();
    },

    addFavorite(host) {
      if (this.get('session.isAuthenticated')) {
        this.get('sessionUser.user').then((user)=> {
          this.send('addUserFavorite', host, user);
        });
      } else {
        this.send('addUserFavorite', host);
      }
    },

    removeFavorite(host) {
      if (this.get('session.isAuthenticated')) {
        this.get('sessionUser.user').then((user)=> {
          this.send('removeUserFavorite', host, user);
        });
      } else {
        this.send('addUserFavorite', host);
      }
    }
  }
});
