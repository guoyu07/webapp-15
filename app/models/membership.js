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
  isNotExpired: computed.not('isExpired'),
  isStillValidInAMonth: computed.gt('expireAt', moment().add(1, 'months')),
  isNotValidInAMonth: computed.not('isStillValidInAMonth'),
  expiresWithinAMonth: computed.and('isNotExpired', 'isNotValidInAMonth'),
  reminderAlreadySent: computed.notEmpty('reminderSentAt'),

  isWwoofer: computed.equal('type', 'W'),
  isHost: computed.equal('type', 'H'),
  isDuo: computed.match('itemCode', /WO2|WOB2/),
  hasBooklet: computed.match('itemCode', /WOB1|WOB2/),

  displayedTotal: computed('total', function () {
    let total = this.get('total');
    let displayedTotal = null;
    if (typeof total === 'number') {
      displayedTotal = total.toFixed(2);
    }
    return displayedTotal;
  })
});
