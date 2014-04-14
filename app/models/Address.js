App.Address = DS.Model.extend({
    address1: DS.attr('string'),
    address2: DS.attr('string'),
    zipCode: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string')
});