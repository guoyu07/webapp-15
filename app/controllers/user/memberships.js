/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    // Only show the link to get a first membership if the user's host profile was approved
    showGetHostMembershipLink: Ember.computed.and('user.host.id', 'user.host.isApproved', 'sessionUser.user.isNotAdmin'),
    showGetWwooferMembershipLink: Ember.computed.and('user.wwoofer.id', 'sessionUser.user.isNotAdmin'),

    // Only show the links to create a membership of the current user is admin
    showCreateWwoofMembershipLink: Ember.computed.and('sessionUser.user.isAdmin', 'user.wwoofer.id'),
    showCreateHostMembershipLink: Ember.computed.and('sessionUser.user.isAdmin', 'user.host.id')
});
