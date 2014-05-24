/**
 * Ember model for Wwoofer.
 */
App.Wwoofer = DS.Model.extend(App.Validations.Mixin, {
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