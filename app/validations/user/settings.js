import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'user.locale': validator('presence', true),
  'user.note': validator('length', {
    max: 2000
  })
});
