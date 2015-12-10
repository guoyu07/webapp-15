import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  /**
   * Indicates whether the host contact info can be displayed to the current user.
   */
  canSeeContactInfo: computed.readOnly('sessionUser.user.hasNonExpiredMembership'),

  /**
   * Indicates whether the notes about the host should be displayed.
   * Only admin can see host notes.
   */
  showNote: computed.and('model.note', 'sessionUser.user.isAdmin'),

  /**
   * Indicates whether the authenticated user owns the current host profile.
   */
  isCurrentUserProfile: computed('sessionUser.user.id', 'model.user.id', function () {
    return this.get('sessionUser.user.id') === this.get('model.user.id');
  }),

  /**
   * Indicates whether the edit profile buttons should be displayed.
   */
  showEditProfileButton: computed.or('sessionUser.user.isAdmin', 'isCurrentUserProfile')
});
