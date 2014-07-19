/**
 * Ember model for Address.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {
    address1: DS.attr('string'),
    address2: DS.attr('string'),
    zipCode: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    department: DS.belongsTo('department'),
    country: DS.belongsTo('country'),

    validations: {
        address1: {
            presence: true,
            length: { minimum: 5, maximum: 255 }
        },
        address2: {
            length: { maximum: 255 }
        },
        zipCode: {
            presence: true,
            length: { minimum: 2, maximum: 10 }
        },
        city: {
            presence: true,
            length: { minimum: 2, maximum: 255 }
        },
        country: {
            presence: true
        }
    }
});