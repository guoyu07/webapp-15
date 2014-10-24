/**
 * Ember model for users.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    email: DS.attr('string'),
    password: DS.attr('string'), // Only used for sign up
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    birthDate: DS.attr('date'),
    phone: DS.attr('string'),
    isAdmin: DS.attr('boolean'),
    createdAt: DS.attr('date'),

    // Relationships
    host: DS.belongsTo('host'),
    wwoofer: DS.belongsTo('wwoofer'),
    memberships: DS.hasMany('membership', { async: true }),

    // Validations
    validations: {
        email: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        },
        password: {
            presence: {
                if: 'isNew'
            },
            length: { if: 'isNew', minimum: 8, maximum: 25 }
        },
        firstName: {
            presence: true,
            length: { maximum: 255 }
        },
        lastName: {
            presence: true,
            length: { maximum: 255 }
        },
        birthDate: {
            presence: true
        }
    }
});