/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    // Local user memberships service (not singleton)
    localUserMembershipsService: null,

    // Only show the link to get a first membership if the host was approved
    showHostMembershipLink: Ember.computed.and('model.host.id', 'model.host.isApproved')
});
