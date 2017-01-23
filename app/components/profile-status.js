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
  wwooferProfileClass: computed('user.hasNonExpiredWwooferMembership', 'user.latestWwooferMembership.isStillValidInAMonth', function() {
    // Host has no active membership: warning
    const hasValidMembership = this.get('user.hasNonExpiredWwooferMembership');
    const isStillValidInAMonth = this.get('user.latestWwooferMembership.isStillValidInAMonth');
    if (!hasValidMembership || !isStillValidInAMonth) {
      return 'glyphicon glyphicon-exclamation-sign';
    }

    // Membership status ok
    return 'glyphicon glyphicon-ok-sign';
  }),

  /**
   * Provides the class name to style the component for host profile
   */
  hostProfileClass: computed('user.host.isPendingApproval', 'user.host.isApproved', 'user.hasNonExpiredHostMembership', 'user.latestHostMembership.isStillValidInAMonth', function() {
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
    const hasValidMembership = this.get('user.hasNonExpiredHostMembership');
    const isStillValidInAMonth = this.get('user.latestHostMembership.isStillValidInAMonth');
    if (!hasValidMembership || !isStillValidInAMonth) {
      return 'glyphicon glyphicon-exclamation-sign';
    }

    // Membership status ok
    return 'glyphicon glyphicon-ok-sign';
  })
});
