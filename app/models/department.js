import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

const { computed } = Ember;

export default DS.Model.extend(ValidationsMixin, {
  code: DS.attr('string'),
  name: DS.attr('string'),
  regionCode: DS.attr('string'),
  regionName: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  displayedName: computed('code', 'name', function() {
    return `${this.get('code')} - ${this.get('name')}`;
  })
});
