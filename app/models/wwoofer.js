/**
 * Ember model for Wwoofer.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {
    firstName2: DS.attr('string'),
    lastName2: DS.attr('string'),
    birthDate2: DS.attr('date'),

    intro: DS.attr('string'),
    tripMotivation: DS.attr('string'),
    user: DS.belongsTo('user', {embedded: 'load'}),
    address: DS.belongsTo('address', {embedded: 'load'}),

    validations: {
        intro: {
            presence: true,
            length: { minimum: 5, maximum: 1500 }
        },
        tripMotivation: {
            presence: true,
            length: { minimum: 5, maximum: 1500 }
        }
    }
});