import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  /**
   * Indicates whether the second wwoofer can be edited.
   */
  canEditOtherWwoofer: computed.or('sessionUser.user.isAdmin', 'wwoofer.isNew')
});
