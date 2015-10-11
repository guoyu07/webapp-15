import Ember from 'ember';

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
    remindableMemberships: Ember.computed.filter('selectedMemberships', function(membership) {
        return membership.get('expiresWithinAMonth') && !membership.get('reminderAlreadySent');
    }),

    remindableMembershipCount: Ember.computed.readOnly('remindableMemberships.length'),

    cannotSendReminders: Ember.computed.empty('remindableMemberships'),

    /**
     * Process the total number of pages that can be displayed.
     */
    totalPages: Ember.computed('memberships.meta.total', 'itemsPerPage', function() {
        var totalItems = this.get('memberships.meta.total');
        var itemsPerPage = this.get('itemsPerPage');
        return Math.ceil(totalItems / itemsPerPage);
    })
});
