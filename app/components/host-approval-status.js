/**
 * Ember component for host approval status.
 */
import Ember from 'ember';
import config from 'webapp/config/environment';

export default Ember.Component.extend({

  host: null,

  classNames: ['panel'],
  classNameBindings: ['panelClass', 'host.isPendingApproval:panel-info:panel-danger'],

  actions: {
    /**
     * Approves or rejects a host after validation.
     */
    approveHost(isApproved) {

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
      post.done(()=> {
        if (isApproved) {
          this.get('notify').success(this.get('i18n').t('notify.hostApproved'));
        } else {
          this.get('notify').success(this.get('i18n').t('notify.hostRejected'));
        }
      });

      // Handle failure
      post.fail(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionError'));
      });

      // Always reload host
      post.always(()=> {
        host.reload();
      });
    }
  }
});
