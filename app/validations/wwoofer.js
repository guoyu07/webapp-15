import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'wwoofer.intro': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 100,
      max: 2000
    })
  ],
  'wwoofer.tripMotivation': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 100,
      max: 2000
    })
  ]
});
