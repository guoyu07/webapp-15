/**
 * Ember model for Photo.
 */
import Ember from 'ember';
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
        var fileName = this.get('fileName');
        if (!Ember.isEmpty(fileName)) {
            return 'https://app.wwoof.fr/public/host_photos/' + encodeURIComponent(fileName);
        }
    }.property('fileName'),

    /**
     * Returns true if the photo is in a state where it cannot be saved.
     */
    cannotSave: function () {
        return this.get('isSaving') || !this.get('isDirty');
    }.property('isSaving', 'isDirty'),

    // Validations
    validations: {
        caption: {
            presence: true,
            length: { maximum: 255 }
        }
    }
});
