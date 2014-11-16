/**
 * Ember route for host.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        /**
         * Approves a host after validation.
         * This action can be called either from the host edit or index page.
         */
        approveHost: function () {
            // Update status and save the host
            var host = this.controller.get('model');
            host.set('isPending', false);
            host.save().then(function () {
                alertify.success(Ember.I18n.t('notify.hostApproved'));
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
            });
        }
    }
});
