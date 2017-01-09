import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({

  notify: service('notify'),

  tagName: 'form',

  hostedFields: null,

  cardNumberIsValid: null,
  cvvIsValid: null,
  expirationDateIsValid: null,

  isValid: computed.and('cardNumberIsValid', 'cvvIsValid', 'expirationDateIsValid'),

  disableSubmitInternal: computed('disableSubmit', 'isValid', function () {
    return this.get('disableSubmit') === true || this.get('isValid') !== true;
  }),

  cardNumberClass: computed('cardNumberIsValid', function () {
    let isValid = this.get('cardNumberIsValid');
    return isValid === true ? 'has-success' : isValid === false ? 'has-error' : null;
  }),
  cvvClass: computed('cvvIsValid', function () {
    let isValid = this.get('cvvIsValid');
    return isValid === true ? 'has-success' : isValid === false ? 'has-error' : null;
  }),
  expirationDateClass: computed('expirationDateIsValid', function () {
    let isValid = this.get('expirationDateIsValid');
    return isValid === true ? 'has-success' : isValid === false ? 'has-error' : null;
  }),

  didInsertElement() {
    let token = this.get('token');

    braintree.client.create({
      authorization: token
    }, Ember.run.bind(this, this.clientDidCreate));
  },

  clientDidCreate(err, client) {
    if (err) {
      this.get('notify').error({ html: this.get('i18n').t('notify.unexpectedError') });
      return;
    }

    let expirationDatePlaceholder = this.get('i18n').t('payment-form.expirationDate.placeholder').string;
    braintree.hostedFields.create({
      client,
      styles: {
        'input': {
          'font-size': '14px',
          'color': '#555',
          'font-family': 'Roboto, Helvetica, Arial'
        }
      },
      fields: {
        number: {
          selector: '#cardNumber',
          placeholder: '1111 1111 1111 1111'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '123'
        },
        expirationDate: {
          selector: '#expirationDate',
          placeholder: expirationDatePlaceholder
        }
      }
    }, Ember.run.bind(this, this.hostedFieldsDidCreate));
  },

  hostedFieldsDidCreate(err, hostedFields) {
    if (err) {
      this.get('notify').error({ html: this.get('i18n').t('notify.unexpectedError') });
      return;
    }

    hostedFields.on('validityChange', Ember.run.bind(this, this.onValidityChange));

    this.set('hostedFields', hostedFields);
  },

  onValidityChange(event) {
    let field = event.fields[event.emittedBy];
    let isValid = field.isValid === true ? true : field.isPotentiallyValid === true ? null : false;

    switch (event.emittedBy) {
      case 'number':
        this.set('cardNumberIsValid', isValid);
        break;
      case 'cvv':
        this.set('cvvIsValid', isValid);
        break;
      case 'expirationDate':
        this.set('expirationDateIsValid', isValid);
        break;
    }
  },

  actions: {
    submitPayment(hostedFields) {
      hostedFields.tokenize((err, payload)=> {
        if (err) {
          this.get('notify').error(err.message);
          return;
        }

        this.sendAction('onSubmit', payload);
      });
    }
  }
});
