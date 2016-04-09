import DS from 'ember-data';

export default DS.Model.extend({

  // Attributes
  address1: DS.attr('string'),
  address2: DS.attr('string'),
  zipCode: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  department: DS.belongsTo('department', { async: true }),
  country: DS.belongsTo('country', { async: true }),
});
