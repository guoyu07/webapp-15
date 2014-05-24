/**
 * Ember model for memberships.
 */
App.Membership = DS.Model.extend({
    type: DS.attr('string'),
    paymentId: DS.attr('string'),
    payerId: DS.attr('string'),
    saleId: DS.attr('string'),
    createdAt: DS.attr('date'),
    expireAt: DS.attr('date'),
    itemCode: DS.attr('string'),
    paymentType: DS.attr('string'),
    user: DS.belongsTo('user')
});