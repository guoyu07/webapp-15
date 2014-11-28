/**
 * Ember route for memberships (admin).
 */
import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    actions: {
        initPayment: function (itemCode, shippingRegion) {

            // Do not continue if no item code was specified
            if (!itemCode) {
                alertify.error(Ember.I18n.t('notify.noItemCode'));
                return;
            }

            // Build the base URL
            var url = config.SERVER_BASE_URL + '/api/payment/start?itemCode=' + itemCode;

            // Add shipping fee code if present
            if (shippingRegion) {
                url += '&shippingRegion=' + shippingRegion;
            }

            // Redirect to server payment route in order to get redirected to PayPal
            window.location.replace(url);
        }
    }
});
