import Ember from 'ember';
import EmberValidations from 'ember-validations';
import Errors from 'ember-validations/errors';

const { computed } = Ember;

export default Ember.Mixin.create(EmberValidations.Mixin, {

  fieldErrors: computed('_wwoof_hasBeenValidated', function() {
    return this.get('_wwoof_hasBeenValidated') ? this.get('errors') : Errors.create({});
  }),

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

  isInvalid: computed('isValid', function() {
    return !this.get('isValid');
  })
});
