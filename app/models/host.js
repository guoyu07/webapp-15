/**
 * Ember model for hosts.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {

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
    activities: DS.attr('array'),

    // Relationships
    user: DS.belongsTo('user'),
    address: DS.belongsTo('address'),
    photos: DS.hasMany('photo'),

    // Computed properties
    mainPhoto: function () {
        return this.get('photos').objectAt(0);
    }.property('photos.@each'),

    // needed to display background image
    // mainPhotoBackgroundCss: function() {
    //     debugger
    //     return "background-image: url(" + this.get('mainPhoto').completeUrl + ")";
    // }.property('completeUrl'),

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