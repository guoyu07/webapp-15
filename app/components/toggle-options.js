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
        isSelected: (selectedProperties.contains(Ember.get(selectionValue, compareProperty)) || selected.contains(selectionValue)),
        value: selectionValue,
        label: value.get('label') ? value.get('label') : value
      });
    });
  }),

  actions: {

    clear() {
      let selected = Ember.A();
      this.set('selected', selected);

      // Uncomment to switch to DDAU
      // this.sendAction('onchange', selected);
    },

    toggleOption(value) {
      let selected = this.get('selected');

      selected = Ember.makeArray(selected);
      if (selected.contains(value)) {
        selected.removeObject(value);
      } else {
        selected.pushObject(value);
      }

      // Uncomment to switch to DDAU
      // this.sendAction('onchange', selected);
    }
  }
});
