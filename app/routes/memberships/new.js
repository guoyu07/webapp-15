/**
 * Ember route for memberships (admin).
 */
import Ember from 'ember';
import config from '../../config/environment';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    actions: {
        /**
         * Initializes a payment flow with PayPal.
         * @param {String} itemCode The item code (WO1, WO2, ...).
         * @param {String} [shippingRegion] The region where the booklet should be sent.
         */
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
        },
        /**
         * Creates a membership (admin only).
         */
        createMembership() {

            var promise = this.controller.getNewMembership();

            promise = promise.then( (newMembership)=> {
                return newMembership.save();
            });

            promise.then( (createdMembership)=> {
                this.transitionTo('user.memberships', createdMembership.get('user'));
            });
        }
    }
});
