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

  hasBooklet: computed('itemCode', function() {
    let itemCode = this.get('itemCode');
    return ['WOB1', 'WOB2'].indexOf(itemCode) >= 0;
  })
});
