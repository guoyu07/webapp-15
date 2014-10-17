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
        approveHost: function () {
            // Update status and save the host
            var host = this.controller.get('model');
            host.set('isPending', false);
            host.save().then(function () {
                alertify.success('Host was approved successfully.');
            }).catch(function () {
                alertify.error('Cannot approve host.');
            });
        },
        /**
         * Redirects host to Paypal to take/renew their membership.
         * This action can be called either from the host edit or index page.
         */
        renewMembership: function () {
            // Find the right item code
            var itemCode = this.controller.get('hasHostMemberships') ? "HR" : "H";

            // Hit the payment route in order to get redirected to PayPal
            window.location.replace(config.SERVER_BASE_URL + '/payment/start?itemCode=' + itemCode);
        }
    }
});