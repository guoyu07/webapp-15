/**
 * Created by guillaumez on 3/9/14.
 */

App.Wwoofer = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    birthDate: DS.attr('date'),

    firstName2: DS.attr('string'),
    lastName2: DS.attr('string'),
    birthDate2: DS.attr('date'),

    city: DS.attr('string'),
    postalCode: DS.attr('string'),
    country: DS.attr('string')
});