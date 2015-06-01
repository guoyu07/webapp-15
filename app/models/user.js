/**
 * Ember model for users.
 */
import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    email: DS.attr('string'),
    password: DS.attr('string'), // Only used for sign up
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    birthDate: DS.attr('string'),
    phone: DS.attr('string'),
    isAdmin: DS.attr('boolean'),
    locale: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    photo: DS.attr('string'),

    // Relationships
    host: DS.belongsTo('host', { async: true }),
    wwoofer: DS.belongsTo('wwoofer', { async: true }),
    memberships: DS.hasMany('membership', { async: true }),

    // Computed properties
    completePhotoUrl: function () {
        var photo = this.get('photo');
        if (!Ember.isEmpty(photo)) {
            return 'https://s3.amazonaws.com/wwoof-france/photos/users/' + encodeURIComponent(photo);
        } else {
            return '../assets/images/no-photo.png';
        }
    }.property('photo'),

    /**
     * Returns the full name of the user.
     */
    fullName: function () {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    // Validations
    validations: {
        email: {
            presence: true,
            format: {
                'with': Regex.EMAIL_ADDRESS
            }
        },
        password: {
            presence: {
                'if': 'isNew'
            },
            length: { 'if': 'isNew', minimum: 8, maximum: 25 }
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
            presence: {
                'if': 'isNew' // legacy users do not have a birth date
            }
        }
    }
});
