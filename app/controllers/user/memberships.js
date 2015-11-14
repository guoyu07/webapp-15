/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

  // Only show the link to get a membership if the user's host profile was approved
  showGetWwoofMembershipLink: Ember.computed.and('user.wwoofer.id', 'sessionUser.user.isNotAdmin'),
  showGetHostMembershipLink: Ember.computed.and('user.host.isApproved', 'sessionUser.user.isNotAdmin'),

  // Only show the links to create a membership if the current user is admin
  showCreateWwoofMembershipLink: Ember.computed.and('user.wwoofer.id', 'sessionUser.user.isAdmin'),
  showCreateHostMembershipLink: Ember.computed.and('user.host.id', 'sessionUser.user.isAdmin')
});
