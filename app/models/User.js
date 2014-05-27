/**
 * Ember model for users.
 */
App.User = DS.Model.extend(App.Validations.Mixin, {
    email: DS.attr('string'),
    password: DS.attr('string'), // Only used for sign up
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    birthDate: DS.attr('date'),
    phone: DS.attr('string'),
    host: DS.belongsTo('host', {embedded: 'load'}),
    wwoofer: DS.belongsTo('wwoofer', {embedded: 'load'}),

    validations: {
        email: {
            presence: true,
            format: {
                with: App.Regex.EMAIL_ADDRESS
            }
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
//            format: {
//                with: App.Regex.DATE
//            }
        }
    }
});