/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    // Local user memberships service (not singleton)
    localUserMembershipsService: null,

    // Only show the link to get a first membership if the host was approved
    showGetHostMembershipLink: Ember.computed.and('model.host.id', 'model.host.isApproved', 'sessionUser.user.isNotAdmin'),
    showGetWwooferMembershipLink: Ember.computed.and('model.wwoofer.id', 'sessionUser.user.isNotAdmin'),

    showCreateWwoofMembershipLink: Ember.computed.and('sessionUser.user.isAdmin', 'model.wwoofer.id'),
    showCreateHostMembershipLink: Ember.computed.and('sessionUser.user.isAdmin', 'model.host.id')
});
