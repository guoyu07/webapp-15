import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',

  checkout: null,

  didInsertElement() {
    let onPaymentMethodReceived = Ember.run.bind(this, this._onPaymentMethodReceived);
    let onReady = Ember.run.bind(this, this._onReady);
    let token = this.get('token');

    braintree.setup(token, 'dropin', {
      container: 'payment-form',
      onPaymentMethodReceived: onPaymentMethodReceived,
      onReady: onReady
    });
  },

  _onPaymentMethodReceived(nonce) {
    let checkout = this.get('checkout');
    this.sendAction('onSubmit', nonce, checkout);
    return false;
  },

  _onReady(integration) {
    this.set('checkout', integration);
  }
});
