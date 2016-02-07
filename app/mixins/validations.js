import Ember from 'ember';
import EmberValidations from 'ember-validations';
import Errors from 'ember-validations/errors';

export default Ember.Mixin.create(EmberValidations.Mixin, {
  fieldErrors: function() {
    return this.get('_wwoof_hasBeenValidated') ? this.get('errors') : Errors.create({});
  }.property('_wwoof_hasBeenValidated'),

  validate() {
    this.set('_wwoof_hasBeenValidated', true);
    return this._super.apply(this, arguments);
  },

  revalidate() {
    if (this.get('_wwoof_hasBeenValidated')) {
      this.validate();
    }
  },

  resetValidations() {
    this.set('_wwoof_hasBeenValidated', false);
  },

  isInvalid: function() {
    return !this.get('isValid');
  }.property('isValid')
});
