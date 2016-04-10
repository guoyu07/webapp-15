import Ember from 'ember';
import config from 'webapp/config/environment';

const { service } = Ember.inject;

export default Ember.Component.extend({

  ajax: service('ajax'),
  notify: service('notify'),

  host: null,

  classNames: ['panel'],
  classNameBindings: ['panelClass', 'host.isPendingApproval:panel-info:panel-danger'],

  actions: {
    /**
     * Approves or rejects a host after validation.
     */
    approveHost(isApproved) {

      // Get host
      let host = this.get('host');

      this.set('isProcessing', true);

      // Prepare URL
      let url = [config.apiHost, config.apiNamespace, 'hosts', host.get('id'), 'approve'].join('/');

      // Approve/reject the host
      let promise = this.get('ajax').request(url, {
        method: 'POST',
        data: {
          isApproved
        }
      });

      // Handle success
      promise.then(()=> {
        if (isApproved) {
          this.get('notify').success(this.get('i18n').t('notify.hostApproved'));
        } else {
          this.get('notify').success(this.get('i18n').t('notify.hostRejected'));
        }
      });

      // Always reload host
      promise.finally(()=> {
        host.reload();
        this.set('isProcessing', false);
      });
    }
  }
});
