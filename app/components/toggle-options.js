import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Check that options and selected values were provided.
     *
     * @event init
     */
    init: function () {
        this._super.apply(this, arguments);
        Ember.assert('Option values were not supplied.', !!this.get('values'));
    },

    /**
     * Modify event propagation to prevent dropdown from closing on click
     *
     * @event didInsertElement
     */
    didInsertElement: function () {
        var self = this;
        Ember.$('.dropdown-menu[name="activities"]').click(function(event){
            event.stopPropagation();
        });

        Ember.$('#clear-button').click(function() {
            self.triggerAction({
                action:'clear',
                target: self
            });
        });
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
     * The display name to show on the dropDown button
     *
     * @property buttonDisplayName
     * @type String
     */
    buttonDisplayName: null,

    /**
     * List of the possible toggle options, stuffed into objects that indicate whether
     * they are toggled 'on' or 'off' based on their presence in the array stored on
     * this view's `selected` property.
     *
     * @property options
     * @type Array
     * @readOnly
     */
    options: function () {
        var selected = Ember.makeArray(this.get('selected'));
        var compareProperty = this.get('compareProperty');
        var selectedProperties = selected.mapBy(compareProperty).compact();
        var optionValuePath = this.get('optionValuePath');

        return this.get('values').map(function (value) {
            var selectionValue = optionValuePath ? value.get(optionValuePath) : value;

            return Ember.ObjectProxy.create({
                content: value,
                isSelected: (selectedProperties.contains(Ember.get(selectionValue, compareProperty)) || selected.contains(selectionValue)),
                value: selectionValue,
                label: Ember.I18n.t('activities.' + selectionValue)
            });
        });
    }.property('values.length', 'values', 'selected.length', 'selected'),

    actions: {

        /**
         * Clears the current selection.
         * @method clear
         */
        clear: function () {
            var isSingle = this.get('selectOne');
            this.set('selected', isSingle ? null : Ember.A());
        },

        /**
         * Toggles the passed option on and other options off.
         *
         * @method select
         * @param {Object} option Option to switch on.
         */
        select: function (option) {
            var selected = this.get('selected');
            var newSelection = option.get('value');
            var isSingle = this.get('selectOne');

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
        }
    }
});