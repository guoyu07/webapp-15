/**
 * Created by guillaumez on 3/9/14.
 */

App.Wwoofer = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    city: DS.attr('string'),
    postalCode: DS.attr('string'),
    country: DS.attr('string')
});