/**
 * Ember model for hosts.
 */
App.Host = DS.Model.extend({
    farmName: DS.attr('string'),
    shortDescription: DS.attr('string'),
    fullDescription: DS.attr('string'),
    webSite: DS.attr('string'),
    travelDetails: DS.attr('string'),
    noPhone: DS.attr('boolean'),
    noEmail: DS.attr('boolean'),
    user: DS.belongsTo('user', {embedded: 'load'}),
    address: DS.belongsTo('address', {embedded: 'load'}),
    photos: DS.hasMany('photo', {embedded: 'load'}),
    mainPhoto: function () {
        return this.get('photos').objectAt(0);
    }.property('photos.@each')
});