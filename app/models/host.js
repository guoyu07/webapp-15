/**
 * Ember model for hosts.
 */
import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from 'webapp/mixins/validations';
import Regex from 'webapp/utils/regex';
import moment from 'moment';

const { computed } = Ember;

export default DS.Model.extend(ValidationsMixin, {

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
  note: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  user: DS.belongsTo('user', { async: true }),
  address: DS.belongsTo('address'),
  photos: DS.hasMany('photo'),

  // First photo
  mainPhoto: computed.readOnly('photos.firstObject'),

  // Translated activities
  displayedActivities: computed('activities.[]', 'i18n.locale', function() {
    return this.get('activities').map((activity)=> {
      return this.get('i18n').t('activities.' + activity);
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
  openingCalendar: computed('openingMonths.[]', 'i18n.locale', function () {
    var openingMonths = this.get('openingMonths');
    var months = [];
    for (var i = 0; i <= 11; i++) {
      var currentMonth = moment().months(i);
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
   * $HACK: isPending seems to be conflicting with PromiseProxy.
   * This alias seems to solve the issue.
   */
  isPendingApproval: computed.alias('isPending'),

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
    note: {
      length: { maximum: 2000 }
    }
  }
});
