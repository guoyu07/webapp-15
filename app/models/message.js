import DS from 'ember-data';

export default DS.Model.extend({

  // Attributes
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  text: DS.attr('string'),

  // Relationships
  conversation: DS.belongsTo('conversation', { async: false }),
  author: DS.belongsTo('user', { async: true }),
});
