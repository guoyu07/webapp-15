import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Check that options and selected values were provided.
   *
   * @event init
   */
  init() {
    this._super.apply(this, arguments);
    Ember.assert('Option values were not supplied.', !!this.get('values'));
  },

  /**
   * Whether this set of options can have multiple options selected or just one.
   *
   * @property selectOne
   * @type Boolean
   * @default false
   */
  selectOne: false,

  /**
   * Path to use when comparing selection options to tell if they are selected.
   *
   * Only used when the option values are objects.
   *
   * @property compareProperty
   * @type string
   * @default 'id'
   */
  compareProperty: 'id',

  /**
   * The path to the option values.
   *
   * For example, specifying 'id' will select the 'id' value of the option
   * when selecting.
   *
   * @property optionValuePath
   * @type {string}
   */
  optionValuePath: null,

  /**
   * List of all the options that we could possibly be toggling.
   *
   * @property values
   * @type Array
   * @default Ember.A()
   */
  values: Ember.A(),

  /**
   * List of the values that are toggled 'on'.
   *
   * @property selected
   * @type Array
   * @default Ember.A()
   */
  selected: null,

  /**
   * List of the possible toggle options, stuffed into objects that indicate whether
   * they are toggled 'on' or 'off' based on their presence in the array stored on
   * this view's `selected` property.
   *
   * @property options
   * @type Array
   * @readOnly
   */
  options: function() {
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
  }.property('values.length', 'values', 'selected.length', 'selected'),

  actions: {

    /**
     * Clears the current selection.
     * @method clear
     */
    clear() {
      const isSingle = this.get('selectOne');
      this.set('selected', isSingle ? null : Ember.A());
    },

    /**
     * Toggles the passed option on and other options off.
     *
     * @method select
     * @param {Object} option Option to switch on.
     */
    select(option) {
      let selected = this.get('selected');
      const newSelection = option.get('value');
      const isSingle = this.get('selectOne');

      if (isSingle) {
        this.set('selected', newSelection);
      } else {
        selected = Ember.makeArray(selected);
        if (selected.contains(newSelection)) {
          selected = selected.without(newSelection);
        } else {
          selected.pushObject(newSelection);
        }
        this.set('selected', selected);
      }
      this.triggerAction();

      this.sendAction('onchange');
    }
  }
});
