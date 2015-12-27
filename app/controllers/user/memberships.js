import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  user: null,

  // Only show the link to get a membership if the user's host profile was approved
  showGetWwooferMembershipLink: computed.and('user.wwoofer.isComplete', 'sessionUser.user.isNotAdmin'),
  showGetHostMembershipLink: computed.and('user.host.isApproved', 'sessionUser.user.isNotAdmin'),

  // Only show the links to create a membership if the current user is admin
  showCreateWwooferMembershipLink: computed.and('user.wwoofer.isComplete', 'sessionUser.user.isAdmin'),
  showCreateHostMembershipLink: computed.and('user.host.isComplete', 'sessionUser.user.isAdmin')
});
