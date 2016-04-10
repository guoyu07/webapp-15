import Ember from 'ember';

const { computed, defineProperty } = Ember;

export default Ember.Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['showErrorClass:has-error'],
  valuePath: '',
  validation: null,

  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`targetObject.validations.attrs.${valuePath}`));
  },

  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showError', 'validation'),
  showError: computed.and('didValidate', 'isInvalid')
});
