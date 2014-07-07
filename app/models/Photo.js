/**
 * Ember model for Photo.
 */
App.Photo = DS.Model.extend(App.Validations.Mixin, {

    // Attributes
    fileName: DS.attr('string'),
    caption: DS.attr('string'),

    // Relationships
    host: DS.belongsTo('host'),

    // Computed properties
    completeUrl: function () {
        return this.get('fileName') ? 'http://www.wwoof.fr/loggedon/images/' + encodeURIComponent(this.get('fileName')) : '';
        // return this.get('fileName') ? '/host_photos/' + encodeURIComponent(this.get('fileName')) : '';
    }.property('fileName'),

    // Validations
    validations: {
        caption: {
            presence: true,
            length: { maximum: 255 }
        }
    }
});