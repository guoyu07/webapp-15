/**
 * Ember model for Photo.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    fileName: DS.attr('string'),
    caption: DS.attr('string'),

    // Relationships
    host: DS.belongsTo('host'),

    // Computed properties
    completeUrl: function () {
        return this.get('fileName') ? 'http://107.170.27.205/host_photos/' + encodeURIComponent(this.get('fileName')) : '';
    }.property('fileName'),

    // Validations
    validations: {
        caption: {
            presence: true,
            length: { maximum: 255 }
        }
    }
});