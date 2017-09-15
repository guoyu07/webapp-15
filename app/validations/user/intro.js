import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'user.intro': [
    validator('presence', true),
    validator('length', {
      max: 2000
    })
  ],
  'user.tripMotivation': [
    validator('presence', true),
    validator('length', {
      max: 2000
    })
  ]
});
