import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  message: [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 50,
      max: 5000
    })
  ]
});
