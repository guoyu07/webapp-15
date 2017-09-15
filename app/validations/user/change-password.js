import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  password: [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 25
    })
  ],
  passwordConfirmation: validator('confirmation', {
    on: 'password'
  })
});
