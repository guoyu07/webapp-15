import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  username: validator('format', {
    allowBlank: false,
    type: 'email'
  }),
  password: validator('presence', true)
});
