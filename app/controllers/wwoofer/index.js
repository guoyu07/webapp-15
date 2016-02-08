import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  /**
   * Indicates whether the notes about the wwoofer should be displayed.
   * Only admin can wwoofer host notes.
   */
  showNote: computed.and('model.note', 'sessionUser.user.isAdmin'),

  /**
   * Indicate whether the current viewed wwoofer profile is the one of the current logged user
   */
  isLoggedUserProfile: computed('sessionUser.user.id', 'model.user.id', function() {
    return this.get('sessionUser.user.id') === this.get('model.user.id');
  })
});
