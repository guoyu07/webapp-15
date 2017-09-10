import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({

  // Attributes
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  intro: DS.attr('string'),
  tripMotivation: DS.attr('string'),
  emergencyPhone: DS.attr('string'),

  // Relationships
  user: DS.belongsTo('user', { async: true }),
  address: DS.belongsTo('address', { async: false }),

  /**
   * Indicates whether the wwoofer profile is complete (i.e. ready for payment).
   */
  isComplete: computed('intro', 'address.id', function() {
    return Ember.isPresent(this.get('intro')) && Ember.isPresent(this.get('address.id'));
  }),
  isIncomplete: computed.not('isComplete')
});
