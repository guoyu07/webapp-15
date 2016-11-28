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
    'searchTerm', 'activities', 'lon', 'lat', 'approvalStatus', 'zoom', 'showMoreFilter',
    'isSuspended', 'isHidden', 'membershipStatus', 'months', 'dptId', 'capacity', 'stay',
    'childrenOk', 'petsOk', 'page'
  ],

  /**
   * Pagination.
   */
  page: 1,
  itemsPerPage: 10,

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

  /**
   * Indicates whether advanced filters are visible.
   */
  showMoreFilter: false,

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

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('features.length', 'itemsPerPage', function() {
    const totalItems = this.get('features.length');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
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
   * Returns the list of features that are displayed in the list.
   */
  featuresInList: computed('features.[]', 'page', 'itemsPerPage', function() {
    let featuresInList = null;
    let features = this.get('features');

    let page = this.get('page');
    let itemsPerPage = this.get('itemsPerPage');
    if (Ember.isPresent(features)) {
      let start = (page - 1) * itemsPerPage;
      let end = start + itemsPerPage;
      end = Math.min(end, features.length);
      featuresInList = features.slice(start, end);
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
    let params = this.getParameters();
    params.limit = 5000;

    // Create GET request
    dataRequest = Ember.$.get('/api/host-coordinates', params);
    this.set('dataRequest', dataRequest);

    dataRequest.done((data)=> {
      this.set('hostCoordinates', data);
      this.set('isLoading', false);
    });
  },

  getParameters() {
    return this.getProperties('searchTerm', 'approvalStatus', 'activities', 'membershipStatus', 'isSuspended',
      'isHidden', 'months', 'dptId', 'stay', 'capacity', 'childrenOk', 'petsOk');
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
     * Refreshes the list of visible features when the map is loaded or was moved.
     */
    visibleFeaturesChanged(visibleFeatures) {
      this.set('featuresOnMap', visibleFeatures);
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
