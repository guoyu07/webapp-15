import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  caption: validator('length', {
    allowBlank: true,
    max: 100
  })
});
