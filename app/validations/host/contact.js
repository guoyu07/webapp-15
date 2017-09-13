import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  message: [
    validator('presence', true),
    validator('length', {
      min: 50,
      max: 5000
    })
  ]
});
