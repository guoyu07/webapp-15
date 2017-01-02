import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  init() {
    this._super.apply(this, arguments);
    Ember.assert('Option values were not supplied.', !!this.get('values'));
  },

  compareProperty: 'id',

  optionValuePath: null,

  values: Ember.A(),

  selected: null,

  options: computed('values.[]', 'selected.[]', 'compareProperty', 'optionValuePath', function() {
    const selected = Ember.makeArray(this.get('selected'));
    const compareProperty = this.get('compareProperty');
    const selectedProperties = selected.mapBy(compareProperty).compact();
    const optionValuePath = this.get('optionValuePath');

    return this.get('values').map(function(value) {
      const selectionValue = optionValuePath ? value.get(optionValuePath) : value;

      return Ember.ObjectProxy.create({
        content: value,
        isSelected: (selectedProperties.includes(Ember.get(selectionValue, compareProperty)) || selected.includes(selectionValue)),
        value: selectionValue,
        label: value.get('label') ? value.get('label') : value
      });
    });
  }),

  actions: {

    clear() {
      let selected = Ember.A();

      // Remove after full switch to DDAU
      this.set('selected', selected);

      this.sendAction('onchange', selected);
    },

    toggleOption(value) {
      let selected = this.get('selected');

      selected = Ember.makeArray(selected);
      if (selected.includes(value)) {
        selected.removeObject(value);
      } else {
        selected.pushObject(value);
      }

      // Remove after full switch to DDAU
      this.set('selected', selected);

      this.sendAction('onchange', selected);
    }
  }
});
