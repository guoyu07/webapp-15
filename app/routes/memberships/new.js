/**
 * Ember route for memberships (admin).
 */
import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    actions: {
        initPayment: function (itemCode, shippingFee) {

            // Do not continue if no item code specified
            if (!itemCode) {
                alertify.error('No item code specified.');
                return;
            }

            // Build the base URL
            var url = config.SERVER_BASE_URL + '/payment/start?itemCode=' + itemCode;

            // Add shipping fee code if present
            if (shippingFee) {
                url += '&shippingFee=' + shippingFee;
            }

            // Redirect to server payment route in order to get redirected to PayPal
            window.location.replace(url);
        }
    }
});