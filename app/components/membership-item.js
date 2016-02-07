import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'tr',

  classNameBindings: ['checked:active'],

  membership: null,

  checked: false,

  allChecked: false,

  allCheckedToggled: Ember.observer('allChecked', function() {
    let checked = this.get('checked');
    const allChecked = this.get('allChecked');
    this.set('checked', checked || allChecked);
  }),

  checkedToggled: Ember.observer('checked', function() {
    const checked = this.get('checked');
    const membership = this.get('membership');
    this.sendAction('itemToggled', membership, checked);
  }),

  expireAtClass: Ember.computed('membership.isExpired', 'membership.isStillValidInAMonth', function() {
    const isExpired = this.get('membership.isExpired');
    const isStillValidInAMonth = this.get('membership.isStillValidInAMonth');

    let cssClass = 'text-success';
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
