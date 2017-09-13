import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'user.phone': [
    validator('presence', {
      presence: true,
      disabled: Ember.computed(function() {
        return Ember.isEmpty(this.get('model.user.host.id'));
      }).volatile()
    }),
    validator('length', {
      max: 50
    })
  ],
  'user.emergencyPhone': validator('length', {
    max: 50
  })
});
