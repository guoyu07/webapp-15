/**
 * Ember model for hosts.
 */
App.Host = DS.Model.extend(App.Validations.Mixin, {

    // Attributes
    farmName: DS.attr('string'),
    shortDescription: DS.attr('string'),
    fullDescription: DS.attr('string'),
    webSite: DS.attr('string'),
    travelDetails: DS.attr('string'),
    noPhone: DS.attr('boolean'),
    noEmail: DS.attr('boolean'),
    isPending: DS.attr('boolean'),
    isSuspended: DS.attr('boolean'),

    // Relationships
    user: DS.belongsTo('user', {embedded: 'load'}),
    address: DS.belongsTo('address', {embedded: 'load'}),
    photos: DS.hasMany('photo', {embedded: 'load'}),
    mainPhoto: function () {
        return this.get('photos').objectAt(0);
    }.property('photos.@each'),

    // Validations
    validations: {
        farmName: {
            presence: true,
            length: { minimum: 5, maximum: 50 }
        },
        shortDescription: {
            presence: true,
            length: { minimum: 5, maximum: 255 }
        },
        fullDescription: {
            presence: true,
            length: { minimum: 5, maximum: 1500 }
        },
        webSite: {
            url: { allowBlank: true }
        }
    }
});