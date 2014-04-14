/**
 * Created by guillaumez on 3/9/14.
 */

App.Wwoofer = DS.Model.extend({
    firstName2: DS.attr('string'),
    lastName2: DS.attr('string'),
    birthDate2: DS.attr('date'),

    tripMotivation: DS.attr('date'),
    user: DS.belongsTo('user', {embedded: 'load'}),
    address: DS.belongsTo('address', {embedded: 'load'})
});