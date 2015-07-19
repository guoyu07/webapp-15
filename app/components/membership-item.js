import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'tr',

    classNameBindings: ['checked:active'],

    membership: null,

    checked: false,

    allChecked: false,

    allCheckedToggled: Ember.observer('allChecked', function () {
        var checked = this.get('checked');
        var allChecked = this.get('allChecked');
        this.set('checked', checked || allChecked);
    }),

    checkedToggled: Ember.observer('checked', function () {
        var checked = this.get('checked');
        var membership = this.get('membership');
        this.sendAction('itemToggled', membership, checked);
    })
});
