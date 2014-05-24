App.Address = DS.Model.extend(Ember.Validations.Mixin, {
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
        zipCode: {
            presence: true,
            length: { minimum: 2, maximum: 10 }
        }
    }
});