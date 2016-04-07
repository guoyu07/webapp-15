import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  impersonatedUserEmail: validator('format', {
    allowBlank: false,
    type: 'email'
  })
});
