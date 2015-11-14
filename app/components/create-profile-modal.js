/**
 * Ember component for create profile modal
 */
import Ember from 'ember';

export default Ember.Component.extend({
  wasDisplayed: false,

  /**
   * Display the create profile modal depending on the user profile status
   */
  displayModal: function() {

    if (!this.get('session.isAuthenticated')) {
      return;
    }

    if (!this.get('sessionUser.user.wwoofer.isFulfilled')) {
      return;
    }

    if (!this.get('sessionUser.user.host.isFulfilled')) {
      return;
    }

    if (this.get('sessionUser.user.wwoofer.id') == null && this.get('sessionUser.user.host.id') == null && this.get('wasDisplayed') === false) {
      Ember.$('#createProfileModal').modal('show');
      this.set('wasDisplayed', true);
    }
  }.observes('sessionUser.user.wwoofer.isFulfilled', 'sessionUser.user.wwoofer.id', 'sessionUser.user.host.isFulfilled', 'sessionUser.user.host.id')
});
