/**
 * Created by guillaumez on 4/5/2014.
 */

App.User = DS.Model.extend({
    email: DS.attr('string'),
    password: DS.attr('string'), // Only used for sign up
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    birthDate: DS.attr('date'),
    phone: DS.attr('string'),
    host: DS.belongsTo('host', {embedded: 'load'}),
    wwoofer: DS.belongsTo('wwoofer', {embedded: 'load'})
});