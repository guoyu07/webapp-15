import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  queryParams: ['page', 'itemsPerPage', 'expireSoon', 'userId', 'includeBooklet'],

  /**
   * The current page.
   */
  page: 1,

  /**
   * Number of memberships displayed per page.
   */
  itemsPerPage: 20,

  /**
   * Whether to filter memberships expiring withing a month.
   */
  expireSoon: false,

  /**
   * Whether to filter memberships including a booklet.
   */
  includeBooklet: false,

  /**
   * Whether to filter memberships belonging to a specific user.
   */
  userId: null,

  /**
   * Whether the top checkbox is checked.
   */
  allChecked: false,

  /**
   * List of selected memberships from the list.
   */
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
  })
});
