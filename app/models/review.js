import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  text: DS.attr('string'),
  recipient: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host', { async: true }),
  wwoofer: DS.belongsTo('wwoofer', { async: true }),

  reviewer: computed('recipient', 'host.user', 'wwoofer.user', function() {
    return this.get('recipient') === 'host' ? this.get('wwoofer.user') : this.get('host.user');
  })
});
