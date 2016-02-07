import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {

  // Attributes
  code: DS.attr('string'),
  name: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Computed properties
  isFrance: function() {
    return this.get('code') === 'FR';
  }.property('id', 'code')
});
