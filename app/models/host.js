import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { computed } = Ember;
const { service } = Ember.inject;

export default DS.Model.extend({

  moment: service('moment'),
  staysService: service('stays'),
  sessionUser: service('sessionUser'),

  // Attributes
  oldHostId: DS.attr('string'),
  farmName: DS.attr('string'),
  shortDescription: DS.attr('string'),
  fullDescription: DS.attr('string'),
  webSite: DS.attr('string'),
  travelDetails: DS.attr('string'),
  noPhone: DS.attr('boolean'),
  noEmail: DS.attr('boolean'),
  isPending: DS.attr('boolean'),
  isApproved: DS.attr('boolean'),
  isHidden: DS.attr('boolean'),
  activities: DS.attr('array'),
  openingMonths: DS.attr('array'),
  stays: DS.attr('array'),
  lodgings: DS.attr('array'),
  capacity: DS.attr('number'),
  childrenOk: DS.attr('boolean'),
  petsOk: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  user: DS.belongsTo('user', { async: true }),
  followers: DS.hasMany('user', {
    inverse: 'favorites',
    async: false
  }),
  thumbnail: DS.belongsTo('photo', {
    inverse: null,
    async: false
  }),
  photos: DS.hasMany('photo', {
    inverse: 'host',
    async: false
  }),
  address: DS.belongsTo('address', { async: false }),
  reviews: DS.hasMany('review', { async: true }),

  // Reviews sorted by creation date (most recent first)
  createdAtSortingDesc: ['createdAt:desc'],
  sortedReviews: computed.sort('reviews', 'createdAtSortingDesc'),

  displayedReviews: computed.filterBy('sortedReviews', 'isNew', false),

  // Photos sorted by "is thumbnail"
  isThumbnailSortingDesc: ['isThumbnail:desc'],
  sortedPhotos: computed.sort('photos', 'isThumbnailSortingDesc'),

  /**
   * Returns the list of activities offered by the host.
   */
  displayedActivities: computed('activities.[]', 'i18n.locale', function() {
    return this.get('activities').map((activity)=> {
      return this.get('i18n').t(`activities.${activity}`);
    });
  }),

  /**
   * Returns the list of stays accepted by the host.
   */
  displayedStays: computed('stays.[]', 'i18n.locale', function() {
    const allStays = this.get('staysService.allStays');
    const stays = this.get('stays');
    return allStays.map(function(stay) {
      return {
        label: stay.get('label'),
        isOk: stays.includes(stay.get('id'))
      };
    });
  }),

  /**
   * Indicates whether the host profile is complete (i.e. ready for payment).
   */
  isComplete: computed('fullDescription', 'address.id', function() {
    return Ember.isPresent(this.get('fullDescription')) && Ember.isPresent(this.get('address.id'));
  }),
  isIncomplete: computed.not('isComplete'),

  /**
   * Returns a list of all the months of the year.
   * Each month comes with a boolean indicating whether the host is open.
   */
  openingCalendar: computed('openingMonths.[]', 'moment.locale', function() {
    const openingMonths = this.get('openingMonths');
    let months = [];
    for (let i = 0; i <= 11; i++) {
      const currentMonth = this.get('moment').moment().month(i);
      months.push({
        label: currentMonth.format('MMMM'),
        isOpen: openingMonths.includes(currentMonth.format('MM'))
      });
    }
    return months;
  }),

  /**
   * Indicates whether the host is pending approval or was rejected.
   */
  isPendingOrRejected: computed('isPendingApproval', 'isApproved', function() {
    const isPendingApproval = this.get('isPendingApproval');
    const isApproved = this.get('isApproved');
    return isPendingApproval || isApproved === false;
  }),

  /**
   * Returns the displayed capacity of the host.
   * Transforms 4 into 4+.
   */
  displayedCapacity: computed('capacity', function() {
    return this.get('capacity') === 4 ? '4+' : this.get('capacity');
  }),

  /**
   * Returns the localized list of lodgings offered by the host.
   */
  displayedLodgings: computed('lodgings.[]', 'i18n.locale', function() {
    return this.get('lodgings').map((lodging) => {
      return this.get('i18n').t(`lodgings.${lodging}`);
    });
  }),

  /**
   * $HACK: isPending seems to be conflicting with PromiseProxy.
   * This alias seems to solve the issue.
   */
  isPendingApproval: computed.alias('isPending'),

  /**
   * Returns the host's displayed name.
   */
  displayedFarmName: computed('farmName', 'shortDescription', function() {
    return this.get('farmName') || this.get('shortDescription') || '[Unnamed Farm]';
  }),

  displayedThumbnail: computed('thumbnail', function() {
    return this.get('thumbnail') || this.store.createRecord('photo');
  }),

  /**
   * Indocates whether the host can upload more photos (max is 10).
   */
  canUploadPhotos: computed.lt('photos.length', 10),

  /**
   * Indicates whether the host is a favorite of the authenticated user.
   */
  isFavorite: computed('followers.[]', 'sessionUser.user.id', function() {
    let followersIds = this.get('followers').mapBy('id');
    let userId = this.get('sessionUser.user.id');
    let isFavorite = false;
    if (followersIds && userId) {
      isFavorite = followersIds.includes(userId);
    }
    return isFavorite;
  }),

  /**
   * Returns the facebook share URL of the host.
   */
  fbShareUrl: computed('id', function() {
    const completeUrl = `https://app.wwoof.fr/host/${this.get('id')}`;
    const encodedUrl = encodeURIComponent(completeUrl);
    return `http://www.facebook.com/sharer.php?u=${encodedUrl}`;
  }),

  isRecent: computed('createdAt', function() {
    return moment().subtract(3, 'month').isBefore(this.get('createdAt'));
  })
});
