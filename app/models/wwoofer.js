import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

const { computed } = Ember;

export default DS.Model.extend(ValidationsMixin, {

  // Attributes
  oldWwooferId: DS.attr('number'),
  firstName2: DS.attr('string'),
  lastName2: DS.attr('string'),
  birthDate2: DS.attr('string'),
  note: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  intro: DS.attr('string'),
  tripMotivation: DS.attr('string'),

  // Relationships
  user: DS.belongsTo('user', { async: true }),
  address: DS.belongsTo('address', { async: false }),

  /**
   * Returns the full name of the second wwoofer.
   */
  fullName2: computed('firstName2', 'lastName2', function() {
    const firstName2 = this.get('firstName2');
    const lastName2 = this.get('lastName2');
    if (firstName2 || lastName2) {
      return `${firstName2} ${lastName2}`;
    }
  }),

  /**
   * Indicates whether the wwoofer profile is complete (i.e. ready for payment).
   */
  isComplete: computed('intro', 'address.id', function() {
    return Ember.isPresent(this.get('intro')) && Ember.isPresent(this.get('address.id'));
  }),
  isIncomplete: computed.not('isComplete'),

  validations: {
    intro: {
      presence: true,
      length: { minimum: 100, maximum: 2000 }
    },
    tripMotivation: {
      presence: true,
      length: { minimum: 100, maximum: 2000 }
    },
    note: {
      length: { maximum: 2000 }
    }
  }
});
