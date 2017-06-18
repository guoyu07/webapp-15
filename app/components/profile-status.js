import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'span',
  type: null,
  user: null,
  classNames: ['profile-status'],
  classNameBindings: ['profileStatusClass'],

  /**
   * Provide the class name to style the component based on the type
   */
  profileStatusClass: computed('type', 'wwooferProfileClass', 'hostProfileClass', function() {
    return this.get('type') === 'host' ? this.get('hostProfileClass') : this.get('wwooferProfileClass');
  }),

  /**
   * Provides the class name to style the component for wwoofer profile
   */
  wwooferProfileClass: computed('user.hasActiveWwooferMembership', 'user.latestWwooferMembership.isStillActiveInAMonth', function() {
    // Host has no active membership: warning
    const hasValidMembership = this.get('user.hasActiveWwooferMembership');
    const isStillActiveInAMonth = this.get('user.latestWwooferMembership.isStillActiveInAMonth');
    if (!hasValidMembership || !isStillActiveInAMonth) {
      return 'glyphicon glyphicon-exclamation-sign';
    }

    // Membership status ok
    return 'glyphicon glyphicon-ok-sign';
  }),

  /**
   * Provides the class name to style the component for host profile
   */
  hostProfileClass: computed('user.host.isPendingApproval', 'user.host.isApproved', 'user.hasActiveHostMembership', 'user.latestHostMembership.isStillActiveInAMonth', function() {
    const host = this.get('user.host');

    // Return if the Host has not been requested yet
    if (!host) {
      return;
    }

    // Host is not approved: hourglass or ban
    if (host.get('isApproved') === false) {
      if (host.get('isPendingApproval')) {
        return 'glyphicon glyphicon-hourglass';
      } else {
        return 'glyphicon glyphicon-remove-sign';
      }
    }

    // Host has no active membership: warning
    const hasValidMembership = this.get('user.hasActiveHostMembership');
    const isStillActiveInAMonth = this.get('user.latestHostMembership.isStillActiveInAMonth');
    if (!hasValidMembership || !isStillActiveInAMonth) {
      return 'glyphicon glyphicon-exclamation-sign';
    }

    // Membership status ok
    return 'glyphicon glyphicon-ok-sign';
  })
});
