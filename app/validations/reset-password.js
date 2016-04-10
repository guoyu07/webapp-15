import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  email: validator('format', {
    allowBlank: false,
    type: 'email'
  })
});
