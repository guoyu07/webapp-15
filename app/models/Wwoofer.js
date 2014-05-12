/**
 * Ember model for Wwoofer.
 */
App.Wwoofer = DS.Model.extend({
    firstName2: DS.attr('string'),
    lastName2: DS.attr('string'),
    birthDate2: DS.attr('date'),

    tripMotivation: DS.attr('string'),
    user: DS.belongsTo('user', {embedded: 'load'}),
    address: DS.belongsTo('address', {embedded: 'load'})
});