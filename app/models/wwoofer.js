/**
 * Ember model for Wwoofer.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    oldWwooferId: DS.attr('number'),
    firstName2: DS.attr('string'),
    lastName2: DS.attr('string'),
    birthDate2: DS.attr('string'),
    note: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    intro: DS.attr('string'),
    tripMotivation: DS.attr('string'),

    // Relationships
    user: DS.belongsTo('user', { async: true }),
    address: DS.belongsTo('address'),

    /**
     * Returns the full name of the second wwoofer.
     */
    fullName2: function () {
        if (this.get('firstName2') || this.get('lastName2')) {
            return this.get('firstName2') + ' ' + this.get('lastName2');
        }
    }.property('firstName2', 'lastName2'),

    validations: {
        intro: {
            presence: true,
            length: { minimum: 100, maximum: 2000 }
        },
        tripMotivation: {
            presence: true,
            length: { minimum: 100, maximum: 2000 }
        },
        note: {
            length: { maximum: 2000 }
        }
    }
});
