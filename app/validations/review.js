import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'review.text': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      max: 1000
    })
  ]
});
