import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  queryParams: ['page', 'itemsPerPage', 'expireSoon', 'userId', 'includeBooklet'],

  page: 1,
  itemsPerPage: 20,
  expireSoon: false,
  includeBooklet: false,
  userId: null,

  allChecked: false,
  selectedMemberships: Ember.A(),

  /**
   * Selected memberships for which no reminder was sent.
   */
  remindableMemberships: computed.filter('selectedMemberships', function(membership) {
    return membership.get('expiresWithinAMonth') && !membership.get('reminderAlreadySent') && !membership.get('user.isSuspended');
  }),

  remindableMembershipCount: computed.readOnly('remindableMemberships.length'),

  cannotSendReminders: computed.empty('remindableMemberships'),

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('memberships.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('memberships.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  }),

  actions: {
    toggleAllChecked(checked) {
      this.set('allChecked', checked);
      this.get('selectedMemberships').addObjects(this.get('memberships'));
    }
  }
});
