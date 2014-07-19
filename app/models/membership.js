/**
 * Ember model for memberships.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {
    type: DS.attr('string'),
    paymentId: DS.attr('string'),
    payerId: DS.attr('string'),
    saleId: DS.attr('string'),
    createdAt: DS.attr('date'),
    expireAt: DS.attr('date'),
    itemCode: DS.attr('string'),
    paymentType: DS.attr('string'),
    total: DS.attr('number'),
    user: DS.belongsTo('user')
});