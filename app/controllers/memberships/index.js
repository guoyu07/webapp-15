import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: ['page', 'itemsPerPage'],

    /**
     * The current page.
     */
    page: 1,

    /**
     * Number of memberships displayed per page.
     */
    itemsPerPage: 20,

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
    remindableMemberships: Ember.computed.filterBy('selectedMemberships', 'reminderSentAt', null),

    remindableMembershipCount: Ember.computed.readOnly('remindableMemberships.length'),

    cannotSendReminders: Ember.computed.equal('remindableMembershipCount', 0),

    /**
     * Process the total number of pages that can be displayed.
     */
    totalPages: Ember.computed('model.meta.total', 'itemsPerPage', function() {
        var totalItems = this.get('model.meta.total');
        var itemsPerPage = this.get('itemsPerPage');
        return Math.ceil(totalItems / itemsPerPage);
    })
});
