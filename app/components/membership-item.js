import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'tr',

  membership: null,

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
    markBookletAsSent(membership) {
      membership.set('bookletSentAt', new Date());
      membership.save();
    }
  }
});
