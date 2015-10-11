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
    }),

    expireAtClass: Ember.computed('membership.isExpired', 'membership.isStillValidInAMonth', function () {
        var cssClass = 'text-success';
        var isExpired = this.get('membership.isExpired');
        var isStillValidInAMonth = this.get('membership.isStillValidInAMonth');
        if (isExpired) {
            cssClass = 'text-danger';
        } else if (!isStillValidInAMonth) {
            cssClass = 'text-warning';
        }
        return cssClass;
    }),

    actions: {
        markBookletAsSent(membership) {
            membership.set('bookletSentAt', new Date());
            membership.save();
        }
    }
});
