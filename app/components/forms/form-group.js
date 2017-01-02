import Ember from 'ember';

const { computed, defineProperty } = Ember;

export default Ember.Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['showErrorClass:has-error'],
  valuePath: '',
  validation: null,

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`validations.attrs.${valuePath}`));
  },

  didValidate: computed.oneWay('validations.didValidate'),
  notValidating: computed.not('validation.isValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showError', 'validation'),
  showError: computed.and('didValidate', 'isInvalid')
});
