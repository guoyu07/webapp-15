import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'tr',

  classNameBindings: ['checked:active'],

  membership: null,

  checked: false,

  allChecked: false,

  allCheckedToggled: Ember.observer('allChecked', function() {
    let checked = this.get('checked') || this.get('allChecked');
    this.set('checked', checked);
  }),

  expireAtClass: computed('membership.isExpired', 'membership.isStillActiveInAMonth', function() {
    const isExpired = this.get('membership.isExpired');
    const isStillActiveInAMonth = this.get('membership.isStillActiveInAMonth');

    let cssClass = 'text-success';
    if (isExpired) {
      cssClass = 'text-danger';
    } else if (!isStillActiveInAMonth) {
      cssClass = 'text-warning';
    }
    return cssClass;
  }),

  actions: {
    toggleIsChecked(checked) {
      this.set('checked', checked);

      let membership = this.get('membership');
      this.sendAction('itemToggled', membership, checked);
    },
    markBookletAsSent(membership) {
      membership.set('bookletSentAt', new Date());
      membership.save();
    }
  }
});
