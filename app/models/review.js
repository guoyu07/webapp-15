import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  recipient: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host', { async: true }),
  wwoofer: DS.belongsTo('wwoofer', { async: true })
});
