/**
 * Created by BitTitanGuillaumeZ on 2/17/14.
 */

App.Host = DS.Model.extend({
    contact: DS.attr('string'),
    farmName: DS.attr('string'),

    address: DS.attr('string'),
    zipCode: DS.attr('string'),
    city: DS.attr('string'),

    email: DS.attr('string'),
    phone: DS.attr('string'),
    webSite: DS.attr('string'),

    shortDescription: DS.attr('string'),
    fullDescription: DS.attr('string'),
    travelDetails: DS.attr('string'),

    noPhone: DS.attr('boolean'),
    noEmail: DS.attr('boolean'),

    photos: DS.hasMany('photo', {embedded: 'load'}),

    mainPhoto: function () {
        return this.get('photos').objectAt(0);
    }.property('photos.@each')
});