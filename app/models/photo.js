/**
 * Ember model for Photo.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    fileName: DS.attr('string'),
    caption: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),

    // Relationships
    host: DS.belongsTo('host'),

    // Computed properties
    completeUrl: function () {
        return this.get('fileName') ? '//app.wwoof.fr/public/host_photos/' + encodeURIComponent(this.get('fileName')) : '';
    }.property('fileName'),

    /**
     * Returns the image as a CSS background.
     * TODO: fix Ember warning about style attributes binding.
     */
    asBackground: function () {
        return 'background:url('+ this.get('completeUrl') +') center center; background-size:cover;';
    }.property('completeUrl'),

    // Validations
    validations: {
        caption: {
            presence: true,
            length: { maximum: 255 }
        }
    }
});
