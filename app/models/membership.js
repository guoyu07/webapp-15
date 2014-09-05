/**
 * Ember model for memberships.
 */
import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    type: DS.attr('string'),
    paymentId: DS.attr('string'),
    payerId: DS.attr('string'),
    saleId: DS.attr('string'),
    createdAt: DS.attr('date'),
    expireAt: DS.attr('date'),
    itemCode: DS.attr('string'),
    paymentType: DS.attr('string'),
    total: DS.attr('number'),
    reminderSentAt: DS.attr('date'),

    // Relationships
    user: DS.belongsTo('user'),

    // Computed properties
    isExpired: Ember.computed.lt('expireAt', moment()),
    isStillValidInAMonth: Ember.computed.gt('expireAt', moment().add(1, 'months')),
    reminderAlreadySent: Ember.computed.notEmpty('reminderSentAt')
});