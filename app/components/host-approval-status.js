/**
 * Ember component for host approval status.
 */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

  host: null,

  /**
   * Returns the CSS class of the alert based on the host's approval status.
   */
  alertClass: function() {
    var isPendingApproval = this.get('host.isPendingApproval');
    var isAdmin = this.get('sessionUser.user.isAdmin');

    var panelClass = 'alert-warning';
    if (isPendingApproval && !isAdmin) {
      panelClass = 'alert-info';
    }

    return panelClass;
  }.property('host.isPendingApproval', 'sessionUser.user.isAdmin'),

  actions: {
    /**
     * Approves or rejects a host after validation.
     */
    approveHost: function(isApproved) {

      // Get host
      var host = this.get('host');

      // Set the values on the model
      host.set('isPendingApproval', false);
      host.set('isApproved', isApproved);

      // Prepare URL
      var url = [config.apiHost, config.apiNamespace, 'hosts', host.get('id'), 'approve'].join('/');

      // Update approve the host
      var post = Ember.$.ajax({
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        url: url,
        data: JSON.stringify({ isApproved: isApproved })
      });

      // Handle success
      post.done(function() {
        if (isApproved) {
          alertify.success(Ember.I18n.t('notify.hostApproved'));
        } else {
          alertify.success(Ember.I18n.t('notify.hostRejected'));
        }
      });

      // Handle failure
      post.fail(function() {
        alertify.error(Ember.I18n.t('notify.submissionError'));
      });

      // Always reload host
      post.always(function() {
        host.reload();
      });
    }
  }
});
