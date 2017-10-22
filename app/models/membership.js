import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { computed } = Ember;

export default DS.Model.extend({

  // Attributes
  type: DS.attr('string'),
  paymentId: DS.attr('string'),
  payerId: DS.attr('string'),
  saleId: DS.attr('string'),
  expireAt: DS.attr('date'),
  itemCode: DS.attr('string'),
  includeBooklet: DS.attr('boolean', { defaultValue: false }),
  paymentType: DS.attr('string'),
  total: DS.attr('number'),
  reminderSentAt: DS.attr('date'),
  bookletSentAt: DS.attr('date'),
  firstName2: DS.attr('string'),
  lastName2: DS.attr('string'),
  birthDate2: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  user: DS.belongsTo('user', { async: true }),

  // Computed properties
  isExpired: computed.lt('expireAt', moment()),
  isActive: computed.not('isExpired'),
  isStillActiveInAMonth: computed.gt('expireAt', moment().add(1, 'months')),
  isExpiredInAMonth: computed.not('isStillActiveInAMonth'),
  expiresWithinAMonth: computed.and('isActive', 'isExpiredInAMonth'),
  reminderAlreadySent: computed.notEmpty('reminderSentAt'),

  isWwoofer: computed.equal('type', 'W'),
  isHost: computed.equal('type', 'H'),
  isDuo: computed.equal('itemCode', 'WO2'),

  /**
   * Returns the full name of the second wwoofer.
   */
  fullName2: computed('firstName2', 'lastName2', function() {
    const firstName2 = this.get('firstName2');
    const lastName2 = this.get('lastName2');
    if (firstName2 || lastName2) {
      return `${firstName2} ${lastName2}`;
    }
  }),

  displayedTotal: computed('total', function () {
    let total = this.get('total');
    let displayedTotal = null;
    if (typeof total === 'number') {
      displayedTotal = total.toFixed(2);
    }
    return displayedTotal;
  })
});
