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
    birthDate2: DS.attr('date'),
    comment: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    intro: DS.attr('string'),
    tripMotivation: DS.attr('string'),

    // Relationships
    user: DS.belongsTo('user', { async: true }),
    address: DS.belongsTo('address'),

    validations: {
        intro: {
            presence: true,
            length: { minimum: 100, maximum: 2000 }
        },
        tripMotivation: {
            presence: true,
            length: { minimum: 100, maximum: 2000 }
        }
    }
});
