/**
 * Ember model for Photo.
 */
App.Photo = DS.Model.extend(App.Validations.Mixin, {
    fileName: DS.attr('string'),
    caption: DS.attr('string'),
    host: DS.belongsTo('host'),
    completeUrl: function () {
        return this.get('fileName') ? '/host_photos/' + encodeURIComponent(this.get('fileName')) : '';
    }.property('fileName'),

    validations: {
        caption: {
            presence: true
        }
    }
});