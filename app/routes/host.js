/**
 * Ember route for host.
 */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
    actions: {
        /**
         * Approves a host after validation.
         * This action can be called either from the host edit or index page.
         */
        approveHost: function (isApproved) {

            // Get host
            var host = this.controller.get('model');

            // Hide the validation status
            host.set('isPending', false);

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'hosts', host.get('id'), 'approve' ].join('/');

            // Update approve the host
            var post = Ember.$.ajax({
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                url: url,
                data: JSON.stringify({ isApproved: isApproved })
            });

            // Handle success
            post.done(function () {
                alertify.success(Ember.I18n.t('notify.hostApproved'));
            });

            // Handle failure
            post.fail(function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
            });

            // Always reload host
            post.always(function () {
                host.reload();
            });
        }
    }
});
