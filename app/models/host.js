/**
 * Ember model for hosts.
 */
import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

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
    isSuspended: DS.attr('boolean'),
    activities: DS.attr('array'),
    openingMonths: DS.attr('array'),
    note: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),

    // Relationships
    user: DS.belongsTo('user'),
    address: DS.belongsTo('address'),
    photos: DS.hasMany('photo'),

    // First photo
    mainPhoto: Ember.computed.readOnly('photos.firstObject'),

    // Translated activities
    displayedActivities: Ember.computed.map('activities', function(activity) {
        return Ember.I18n.t('activities.' + activity);
    }),

    /**
     * Returns a list of all the months of the year.
     * Each month comes with a boolean indicating whether the host is open.
     */
    openingCalendar: function () {
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
    }.property('openingMonths.@each'),

    /**
     * Indicates whether the host is pending approval or was rejected.
     */
    isPendingOrRejected: function () {
        var isPendingApproval = this.get('isPendingApproval');
        var isApproved = this.get('isApproved');
        return isPendingApproval || !isApproved;
    }.property('isPendingApproval', 'isApproved'),

    /**
     * $HACK: isPending seems to be conflicting with PromiseProxy.
     * This alias seems to solve the issue.
     */
    isPendingApproval: Ember.computed.alias('isPending'),

    // Phone is mandatory for hosts, this binding is used for validation
    phone: Ember.computed.readOnly('user.phone'),

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
