import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',

  didInsertElement() {
    var handler = Ember.run.bind(this, this._handler);
    var token = this.get('token');

    braintree.setup(token, 'dropin', {
      container: 'payment-form',
      onPaymentMethodReceived: handler
    });
  },

  _handler(nonce) {
    this.sendAction('onSubmit', nonce);
    return false;
  }
});
