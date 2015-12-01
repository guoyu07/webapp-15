/**
 * Ember model for memberships.
 */
import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';
import moment from 'moment';

export default DS.Model.extend(ValidationsMixin, {

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
  isExpired: Ember.computed.lt('expireAt', moment()),
  isNotExpired: Ember.computed.not('isExpired'),
  isStillValidInAMonth: Ember.computed.gt('expireAt', moment().add(1, 'months')),
  isNotValidInAMonth: Ember.computed.not('isStillValidInAMonth'),
  expiresWithinAMonth: Ember.computed.and('isNotExpired', 'isNotValidInAMonth'),
  reminderAlreadySent: Ember.computed.notEmpty('reminderSentAt'),

  hasBooklet: Ember.computed('itemCode', function() {
    let itemCode = this.get('itemCode');
    return ['WOB1', 'WOB2'].indexOf(itemCode) >= 0;
  })
});
