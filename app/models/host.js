import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from 'webapp/mixins/validations';
import Regex from 'webapp/utils/regex';

const { computed } = Ember;
const { service } = Ember.inject;

export default DS.Model.extend(ValidationsMixin, {

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
  capacity: DS.attr('number'),
  childrenOk: DS.attr('boolean'),
  petsOk: DS.attr('boolean'),
  note: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  user: DS.belongsTo('user', { async: true }),
  address: DS.belongsTo('address'),
  photos: DS.hasMany('photo'),
  followers: DS.hasMany('user', {
    inverse: 'favorites'
  }),

  // First photo
  mainPhoto: computed.readOnly('photos.firstObject'),

  /**
   * Returns the list of activities offered by the host.
   */
  displayedActivities: computed('activities.[]', 'i18n.locale', function() {
    return this.get('activities').map((activity)=> {
      return this.get('i18n').t('activities.' + activity);
    });
  }),

  /**
   * Returns the list of stays accepted by the host.
   */
  displayedStays: computed('stays.[]', 'i18n.locale', function() {
    var allStays = this.get('staysService.allStays');
    var stays = this.get('stays');
    return allStays.map(function (stay) {
      return {
        label: stay.get('label'),
        isOk: stays.contains(stay.get('id'))
      };
    });
  }),

  /**
   * Indicates whether the host profile is complete (i.e. ready for payment).
   */
  isComplete: computed('fullDescription', 'address.id', function () {
    return Ember.isPresent(this.get('fullDescription')) && Ember.isPresent(this.get('address.id'));
  }),
  isIncomplete: computed.not('isComplete'),

  /**
   * Returns a list of all the months of the year.
   * Each month comes with a boolean indicating whether the host is open.
   */
  openingCalendar: computed('openingMonths.[]', 'moment.locale', function () {
    var openingMonths = this.get('openingMonths');
    var months = [];
    for (var i = 0; i <= 11; i++) {
      var currentMonth = this.get('moment').moment().month(i);
      months.push({
        label: currentMonth.format("MMMM"),
        isOpen: openingMonths.contains(currentMonth.format("MM"))
      });
    }
    return months;
  }),

  /**
   * Indicates whether the host is pending approval or was rejected.
   */
  isPendingOrRejected: computed('isPendingApproval', 'isApproved', function() {
    var isPendingApproval = this.get('isPendingApproval');
    var isApproved = this.get('isApproved');
    return isPendingApproval || isApproved === false;
  }),

  /**
   * Returns the displayed capacity of the host.
   * Transforms 4 into 4+.
   */
  displayedCapacity: computed('capacity', function () {
    return this.get('capacity') === 4 ? '4+' : this.get('capacity');
  }),

  /**
   * $HACK: isPending seems to be conflicting with PromiseProxy.
   * This alias seems to solve the issue.
   */
  isPendingApproval: computed.alias('isPending'),

  /**
   * Returns the host's displayed name.
   */
  displayedFarmName: computed('farmName', 'shortDescription', function () {
    return this.get('farmName') || this.get('shortDescription') || '[Unnamed Farm]';
  }),

  /**
   * Returns the host's first photo URL.
   */
  firstPhotoUrl: computed('photos.firstObject.completeUrl', function() {
    var photoUrl = this.get('photos.firstObject.completeUrl');
    if (Ember.isEmpty(photoUrl)) {
      photoUrl = 'assets/images/wwoof-no-photo.png';
    }
    return photoUrl;
  }),

  /**
   * Indicates whether the host is a favorite of the authenticated user.
   */
  isFavorite: computed('followers.[]', 'sessionUser.user.id', function() {
    let followersIds = this.get('followers').mapBy('id');
    let userId = this.get('sessionUser.user.id');
    let isFavorite = false;
    if (followersIds && userId) {
      isFavorite = followersIds.contains(userId);
    }
    return isFavorite;
  }),

  // Phone is mandatory for hosts, this binding is used for validation
  phone: computed.readOnly('user.phone'),

  // Validations
  validations: {
    farmName: {
      presence: true,
      length: { minimum: 5, maximum: 50 }
    },
    shortDescription: {
      presence: true,
      length: { minimum: 5, maximum: 255 }
    },
    fullDescription: {
      presence: true,
      length: { minimum: 300, maximum: 5000 }
    },
    webSite: {
      format: {
        with: Regex.URL,
        allowBlank: true
      }
    },
    phone: {
      presence: true
    },
    stays: {
      presence: true
    },
    capacity: {
      presence: true
    },
    note: {
      length: { maximum: 2000 }
    }
  }
});
