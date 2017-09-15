import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  user: null,
  selectedDate: null,

  noSelectedDate: computed.empty('selectedDate'),
  canEditName: computed.or('user.isNew', 'sessionUser.user.isAdmin'),

  /**
   * Indicates whether the user's birth date can be edited.
   * Legacy users do not have a birth date so give them a chance to set one when editing their info.
   */
  canEditBirthDate: computed.or('user.isNew', 'sessionUser.user.isAdmin', 'noSelectedDate')
});
